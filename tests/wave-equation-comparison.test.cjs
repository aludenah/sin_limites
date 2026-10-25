'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const project=path.join(__dirname,'..');
function events(object={}){
 const listeners=new Map();
 return Object.assign(object,{
  addEventListener(type,fn,options={}){if(options.signal?.aborted)return;if(!listeners.has(type))listeners.set(type,new Set());listeners.get(type).add(fn);options.signal?.addEventListener('abort',()=>listeners.get(type)?.delete(fn),{once:true});},
  removeEventListener(type,fn){listeners.get(type)?.delete(fn);},
  emit(type,event={}){for(const fn of [...(listeners.get(type)||[])])fn(event);},
  listenerCount(){return [...listeners.values()].reduce((sum,set)=>sum+set.size,0);}
 });
}
const attributes=text=>Object.fromEntries([...text.matchAll(/([\w-]+)(?:="([^"]*)")?/g)].map(m=>[m[1],m[2]??'']));
function node(attrs={},tag='div'){
 const classes=new Set();
 const result=events({attrs:{...attrs},dataset:{},tagName:tag.toUpperCase(),textContent:'',innerHTML:'',value:attrs.value??'',min:attrs.min??'',max:attrs.max??'',step:attrs.step??'',type:attrs.type??'',disabled:false,isConnected:true,
  classList:{add(...names){names.forEach(name=>classes.add(name));},remove(...names){names.forEach(name=>classes.delete(name));},contains(name){return classes.has(name);},toggle(name,force){const add=force??!classes.has(name);if(add)classes.add(name);else classes.delete(name);return add;}},
  setAttribute(name,value){this.attrs[name]=String(value);},getAttribute(name){return this.attrs[name]??null;},removeAttribute(name){delete this.attrs[name];},
  matches(selector){if(selector===tag)return true;const m=/\[([^=\]]+)(?:="([^"]*)")?\]/.exec(selector);return !!m&&Object.hasOwn(this.attrs,m[1])&&(m[2]===undefined||this.attrs[m[1]]===m[2]);},
  closest(selector){return selector==='button'&&tag==='button'||this.matches(selector)?this:null;},
  getBoundingClientRect(){return {top:0,bottom:400,left:0,right:900,width:900,height:400};}
 });
 for(const [name,value] of Object.entries(attrs))if(name.startsWith('data-'))result.dataset[name.slice(5).replace(/-([a-z])/g,(_,c)=>c.toUpperCase())]=value;
 return result;
}
function surface(){
 const placeholder=node({'data-wave-equation-comparison':''}),parts=new Map(),controls=[],buttons=[];let html='';
 Object.defineProperty(placeholder,'innerHTML',{get:()=>html,set(value){
  html=value;const opening=/<section\s+([^>]+)>/.exec(value);assert.ok(opening,'The interactive widget has a named section');
  const host=node(attributes(opening[1]),'section');placeholder.firstElementChild=host;controls.length=0;buttons.length=0;
  for(const m of value.matchAll(/<(input|select)\s+([^>]+)>/g))controls.push(node(attributes(m[2]),m[1]));
  for(const m of value.matchAll(/<button\s+([^>]+)>([\s\S]*?)<\/button>/g)){const b=node(attributes(m[1]),'button');b.textContent=m[2];buttons.push(b);}
  for(const m of value.matchAll(/<(?:output|div|span|p)\s+([^>]*(?:data-wec-[^>]+))>/g)){const attrs=attributes(m[1]);for(const name of Object.keys(attrs))if(name.startsWith('data-wec-'))parts.set('['+name+(attrs[name]?'="'+attrs[name]+'"':'')+']',node(attrs));}
  host.querySelector=selector=>controls.find(c=>c.matches(selector))||buttons.find(b=>b.matches(selector))||parts.get(selector)||((parts.set(selector,node()),parts.get(selector)));
  host.querySelectorAll=selector=>[...controls,...buttons,...parts.values()].filter(c=>c.matches(selector));
 }});
 const root=node();root.querySelectorAll=selector=>selector==='[data-wave-equation-comparison]'?[placeholder]:[];
 return {root,placeholder,controls,buttons,parts,get host(){return placeholder.firstElementChild;},q(selector){return this.host.querySelector(selector);},
  input(name,value){const input=controls.find(c=>c.dataset.wecParam===name);assert.ok(input,'Physics control exists: '+name);input.value=String(value);this.host.emit(input.tagName==='SELECT'?'change':'input',{target:input});},
  click(action){const button=buttons.find(b=>b.dataset.wecAction===action);assert.ok(button,'Playback control exists: '+action);this.host.emit('click',{target:button,preventDefault(){}});}
 };
}
function harness(options={}){
 const frames=new Map(),observers=[];let now=0,sequence=0;
 const document=events({hidden:!!options.hidden});
 class IntersectionObserver{
  constructor(callback){this.callback=callback;observers.push(this);this.disconnected=false;}
  observe(host){this.host=host;}
  disconnect(){this.disconnected=true;}
  intersect(visible){this.callback([{target:this.host,isIntersecting:visible,intersectionRatio:visible?1:0}]);}
 }
 const window=events({document,IntersectionObserver,matchMedia:()=>({matches:!!options.reduced}),performance:{now:()=>now},console,
  requestAnimationFrame(fn){frames.set(++sequence,fn);return sequence;},cancelAnimationFrame(id){frames.delete(id);}
 });
 vm.runInNewContext(fs.readFileSync(path.join(project,'wave-equation-comparison.js'),'utf8'),{window,document,AbortController,performance:window.performance,console});
 const api=window.WaveEquationComparison;
 function frame(ms=40){now+=ms;const pending=[...frames.values()];frames.clear();for(const fn of pending)fn(now);}
 const advance=ms=>{for(let i=0;i<Math.ceil(ms/40);i++)frame();};
 const state=()=>JSON.parse(JSON.stringify(api.getState()));
 const mount=()=>{const view=surface();api.mount(view.root);return view;};
 return {window,document,api,frames,observers,state,frame,advance,mount};
}
const close=(actual,expected,message,tolerance=1e-8)=>assert.ok(Math.abs(actual-expected)<tolerance,message+' ('+actual+' versus '+expected+')');
function wavePath(svg){
 const paths=[...svg.matchAll(/<path\b[^>]*\bd="([^"]+)"/g)].map(m=>m[1]);
 assert.ok(paths.length,'A continuous wave profile is drawn');
 return paths.sort((a,b)=>b.length-a.length)[0];
}
function physicalModel(){
 const {api}=harness(),TAU=2*Math.PI,reference={amplitude:.3,omega:2,k:1,sign:-1,phase:0};
 assert.deepEqual(JSON.parse(JSON.stringify(api.constants.reference)),reference,'The reference uses the stated fixed parameters');
 for(const amplitude of [0,.12,.3,.6])for(const omega of [.5,2,6])for(const k of [.5,1,4])for(const sign of [-1,1]){
  const p={amplitude,omega,k,sign,phase:0},start=api.sample(p,0),quarter=api.sample(p,start.period/4),half=api.sample(p,start.period/2),end=api.sample(p,start.period);
  close(start.points[0].y,amplitude,'At the origin and zero phase, displacement is the amplitude');
  close(quarter.points[0].y,0,'One-quarter period puts the origin at equilibrium');
  close(half.points[0].y,-amplitude,'One-half period puts the origin at the opposite extreme');
  close(start.wavelength*k,TAU,'Wavelength is 2π/k');close(start.period*omega,TAU,'Period is 2π/ω');close(start.speed,omega/k,'Speed is ω/k');close(start.velocity,-sign*omega/k,'Spatial sign reverses propagation velocity');
  for(let i=0;i<start.points.length;i++)close(end.points[i].y,start.points[i].y,'One period returns the entire profile');
  for(const t of [0,.17,.63,2.4]){
   const s=api.sample(p,t);assert.equal(s.marker.x,s.marker.x0,'The marked material point stays at fixed horizontal position');
   for(const point of s.points){assert.ok(Number.isFinite(point.x)&&Number.isFinite(point.y));assert.ok(Math.abs(point.y)<=amplitude+1e-9);}
  }
 }
 const curveStart=svg=>{const d=wavePath(svg),match=/^M\s*([-\d.]+)[ ,]+([-\d.]+)/.exec(d);assert.ok(match);return {x:Number(match[1]),y:Number(match[2])};};
 const flat=curveStart(api.renderScene({...reference,amplitude:0},0,'scale-edited'));
 const normal=curveStart(api.renderScene(reference,0,'scale-reference'));
 const tall=curveStart(api.renderScene({...reference,amplitude:.6},0,'scale-edited'));
 close(flat.x,normal.x,'Both plots use the same horizontal origin');close(tall.x,normal.x,'Amplitude changes do not move the horizontal origin');
 close(flat.y-tall.y,2*(flat.y-normal.y),'Doubling amplitude doubles the rendered vertical displacement on the fixed shared scale',.002);
 const baseline=api.sample(reference,0),inverted=api.sample({...reference,phase:Math.PI},0),quadrature=api.sample({...reference,phase:Math.PI/2},0);
 for(let i=0;i<baseline.points.length;i++)close(inverted.points[i].y,-baseline.points[i].y,'A π phase shift inverts every displacement');
 close(quadrature.points[0].y,0,'A π/2 phase shift starts the origin at equilibrium');
 const doubledK=api.sample({...reference,k:2},.2),doubledOmega=api.sample({...reference,omega:4},.2);
 close(doubledK.wavelength,baseline.wavelength/2,'Changing k alone halves wavelength');close(doubledK.period,baseline.period,'Changing k does not alter temporal period');
 close(doubledOmega.period,baseline.period/2,'Changing ω alone halves period');close(doubledOmega.wavelength,baseline.wavelength,'Changing ω does not alter wavelength');
 for(const sign of [-1,1]){
  const p={...reference,sign},first=api.sample(p,.37),dx=first.points[1].x-first.points[0].x,next=api.sample(p,.37+dx/first.speed),shift=-sign;
  for(let i=1;i<first.points.length-1;i++)close(first.points[i].y,next.points[i+shift].y,'The phase profile travels in the selected direction');
 }
 for(const p of [{amplitude:NaN,omega:NaN,k:NaN,phase:NaN},{amplitude:-9,omega:0,k:0,phase:Infinity},{amplitude:Infinity,omega:Infinity,k:Infinity,sign:'invalid'}]){
  const s=api.sample(p,NaN);assert.ok(Number.isFinite(s.amplitude)&&s.amplitude>=0);assert.ok(Number.isFinite(s.omega)&&s.omega>0);assert.ok(Number.isFinite(s.k)&&s.k>0);assert.ok(Number.isFinite(s.phase));assert.ok([1,-1].includes(s.sign));assert.ok(Number.isFinite(s.speed)&&Number.isFinite(s.period));
  assert.ok(s.points.every(point=>Number.isFinite(point.y)),'Invalid input never creates a broken curve');
 }
 for(const p of [reference,{amplitude:.6,omega:6,k:4,sign:1,phase:Math.PI},{amplitude:0,omega:.5,k:.5,sign:-1,phase:-Math.PI}])for(const time of [0,.25,1,100]){
  const scene=api.renderScene(p,time,'test-plot');assert.match(scene,/<svg/);assert.doesNotMatch(scene,/NaN|Infinity|undefined/);assert.equal(wavePath(scene).split('M').length,2,'The travelling profile is one continuous path');
 }
}
function adjustmentsAndComparison(){
 const h=harness(),v=h.mount();
 assert.deepEqual(v.controls.map(c=>c.dataset.wecParam).sort(),['amplitude','k','omega','phase','sign'],'Exactly the requested five physical parameters can be changed');
 assert.equal(v.controls.filter(c=>c.tagName==='INPUT'&&c.type==='range').length,4);assert.equal(v.controls.filter(c=>c.tagName==='SELECT').length,1);
 assert.ok(v.controls.every(c=>c.getAttribute('aria-label')),'Every native physical control has an accessible name');
 assert.match(v.placeholder.innerHTML,/data-activity-fullscreen/);assert.doesNotMatch(v.placeholder.innerHTML,/<audio|puntaje|comprobar respuesta/i);
 const initial=h.state()[0];assert.deepEqual(initial.parameters,initial.reference,'The two waves initially use identical parameters');
 assert.equal(wavePath(v.q('[data-wec-scene="reference"]').innerHTML),wavePath(v.q('[data-wec-scene="edited"]').innerHTML),'The two initial wave profiles coincide on their shared scale');
 h.advance(400);v.click('play');const paused=h.state()[0];assert.equal(paused.playing,false);
 const refBefore=v.q('[data-wec-scene="reference"]').innerHTML,editedBefore=v.q('[data-wec-scene="edited"]').innerHTML;
 v.input('amplitude',.6);assert.equal(h.state()[0].parameters.amplitude,.6);assert.notEqual(v.q('[data-wec-scene="edited"]').innerHTML,editedBefore,'Edits redraw the second curve immediately while paused');
 assert.equal(v.q('[data-wec-scene="reference"]').innerHTML,refBefore,'Changing amplitude leaves the reference untouched at the same time');
 v.input('omega',4);v.input('k',2);v.input('sign',1);v.input('phase',90);const changed=h.state()[0];
 assert.equal(changed.parameters.omega,4);assert.equal(changed.parameters.k,2);assert.equal(changed.parameters.sign,1);close(changed.parameters.phase,Math.PI/2,'The 90° slider position is converted to π/2 radians in the equation');
 close(changed.time,paused.time,'Changing parameters does not reset the shared clock');assert.deepEqual(changed.reference,initial.reference,'Every edit keeps the reference parameters fixed');assert.equal(v.q('[data-wec-scene="reference"]').innerHTML,refBefore);
 assert.match(v.q('[data-wec-output="phase"]').textContent,/90/);assert.match(v.q('[data-wec-equation="edited"]').innerHTML+v.q('[data-wec-equation="edited"]').textContent,/4/,'The edited equation reflects the new angular frequency');
 const frameReference=wavePath(v.q('[data-wec-scene="reference"]').innerHTML),frameEdited=wavePath(v.q('[data-wec-scene="edited"]').innerHTML);
 assert.equal(frameReference,wavePath(h.api.renderScene(changed.reference,changed.time,'independent')),'The reference is evaluated at the common displayed time');
 assert.equal(frameEdited,wavePath(h.api.renderScene(changed.parameters,changed.time,'independent')),'The edited wave is evaluated at exactly the same displayed time');
 v.input('amplitude',0);assert.ok(h.api.sample(h.state()[0].parameters,h.state()[0].time).points.every(p=>Math.abs(p.y)<1e-12),'Zero amplitude produces an equilibrium line');
 v.input('phase',-180);close(h.state()[0].parameters.phase,-Math.PI,'Negative phase limits use radians correctly');
 v.click('zero');close(h.state()[0].time,0,'Returning to t=0 resets the common clock');assert.equal(h.state()[0].parameters.amplitude,0,'Returning to t=0 preserves the edited parameters');assert.equal(h.state()[0].playing,false);
 v.click('reset');assert.deepEqual(h.state()[0].parameters,initial.reference,'Restoring parameters returns both curves to the same reference');close(h.state()[0].time,0,'Restoring parameters starts comparison at zero time');assert.equal(h.state()[0].playing,false,'Restoring parameters preserves pause');
 assert.equal(wavePath(v.q('[data-wec-scene="reference"]').innerHTML),wavePath(v.q('[data-wec-scene="edited"]').innerHTML));
 h.api.destroy();
}
function playbackAndLifecycle(){
 const h=harness(),v=h.mount();h.advance(320);let s=h.state()[0];assert.ok(s.time>0,'The visible comparison advances');
 const reference=v.q('[data-wec-scene="reference"]').innerHTML,edited=v.q('[data-wec-scene="edited"]').innerHTML;h.advance(200);assert.notEqual(v.q('[data-wec-scene="reference"]').innerHTML,reference);assert.notEqual(v.q('[data-wec-scene="edited"]').innerHTML,edited,'Both waves animate on the shared clock');
 v.click('play');s=h.state()[0];h.advance(240);close(h.state()[0].time,s.time,'Pause freezes both waves');v.click('play');h.advance(160);assert.ok(h.state()[0].time>s.time);
 h.observers[0].intersect(false);s=h.state()[0];h.advance(240);close(h.state()[0].time,s.time,'Offscreen comparison is suspended');h.observers[0].intersect(true);h.advance(200);assert.ok(h.state()[0].time>s.time);
 h.document.hidden=true;h.document.emit('visibilitychange');s=h.state()[0];h.advance(240);close(h.state()[0].time,s.time,'A hidden document does not advance either wave');assert.equal(h.frames.size,0);h.document.hidden=false;h.document.emit('visibilitychange');h.advance(160);assert.ok(h.state()[0].time>s.time);
 const replacement=h.mount();assert.equal(v.host.listenerCount(),0,'Remount removes the preceding handlers');assert.ok(h.observers[0].disconnected);const current=h.state();v.click('play');assert.deepEqual(h.state(),current,'Detached controls cannot affect the replacement');
 h.api.destroy();assert.deepEqual(h.state(),[]);assert.equal(h.frames.size,0);assert.equal(h.document.listenerCount(),0);assert.equal(h.window.listenerCount(),0);assert.equal(replacement.host.listenerCount(),0);assert.ok(h.observers.every(o=>o.disconnected));
 const reduced=harness({reduced:true}),still=reduced.mount();assert.equal(reduced.state()[0].playing,false);assert.equal(reduced.frames.size,0,'Reduced-motion preference starts with a still comparison');still.input('phase',90);close(reduced.state()[0].parameters.phase,Math.PI/2,'Controls remain available with reduced motion');still.click('play');reduced.advance(160);assert.ok(reduced.state()[0].time>0);reduced.api.destroy();
 const hidden=harness({hidden:true});hidden.mount();const time=hidden.state()[0].time;hidden.advance(200);close(hidden.state()[0].time,time,'An initially hidden widget remains still');hidden.api.destroy();
 const page=harness();page.mount();page.advance(160);page.window.emit('pagehide');assert.deepEqual(page.state(),[]);assert.equal(page.frames.size,0);assert.equal(page.window.listenerCount(),0);assert.equal(page.document.listenerCount(),0);
 const empty=harness();empty.mount();empty.api.mount({querySelectorAll:()=>[]});assert.deepEqual(empty.state(),[],'A different lesson retains no comparison');assert.equal(empty.frames.size,0);empty.api.destroy();
}
physicalModel();adjustmentsAndComparison();playbackAndLifecycle();
console.log('PASS: exact travelling-wave equation, five parameter controls, fixed reference at a shared time and scale, phase degrees/radians, sign direction, immediate paused edits, playback, visibility, reduced motion and cleanup.');
