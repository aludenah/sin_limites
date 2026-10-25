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
 const placeholder=node({'data-wave-amplitude-frequency':''}),parts=new Map(),controls=[],buttons=[];let html='';
 Object.defineProperty(placeholder,'innerHTML',{get:()=>html,set(value){
  html=value;const opening=/<section\s+([^>]+)>/.exec(value);assert.ok(opening,'The interactive widget has a named section');
  const host=node(attributes(opening[1]),'section');placeholder.firstElementChild=host;controls.length=0;buttons.length=0;
  for(const m of value.matchAll(/<input\s+([^>]+)>/g))controls.push(node(attributes(m[1]),'input'));
  for(const m of value.matchAll(/<button\s+([^>]+)>([\s\S]*?)<\/button>/g)){const b=node(attributes(m[1]),'button');b.textContent=m[2];buttons.push(b);}
  for(const m of value.matchAll(/<(?:output|div|span|p)\s+([^>]*(?:data-waf-[^>]+))>/g)){const attrs=attributes(m[1]);for(const name of Object.keys(attrs))if(name.startsWith('data-waf-'))parts.set('['+name+(attrs[name]?'="'+attrs[name]+'"':'')+']',node(attrs));}
  host.querySelector=selector=>controls.find(c=>c.matches(selector))||buttons.find(b=>b.matches(selector))||parts.get(selector)||((parts.set(selector,node()),parts.get(selector)));
  host.querySelectorAll=selector=>[...controls,...buttons,...parts.values()].filter(c=>c.matches(selector));
 }});
 const root=node();root.querySelectorAll=selector=>selector==='[data-wave-amplitude-frequency]'?[placeholder]:[];
 return {root,placeholder,controls,buttons,parts,get host(){return placeholder.firstElementChild;},q(selector){return this.host.querySelector(selector);},
  input(name,value){const input=controls.find(c=>c.dataset.wafParam===name);assert.ok(input,'Physics control exists: '+name);input.value=String(value);this.host.emit('input',{target:input});},
  click(action){const button=buttons.find(b=>b.dataset.wafAction===action);assert.ok(button,'Playback control exists: '+action);this.host.emit('click',{target:button,preventDefault(){}});}
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
 vm.runInNewContext(fs.readFileSync(path.join(project,'wave-amplitude-frequency.js'),'utf8'),{window,document,AbortController,performance:window.performance,console});
 const api=window.WaveAmplitudeFrequency;
 function frame(ms=40){now+=ms;const pending=[...frames.values()];frames.clear();for(const fn of pending)fn(now);}
 const advance=ms=>{for(let i=0;i<Math.ceil(ms/40);i++)frame();};
 const state=()=>JSON.parse(JSON.stringify(api.getState()));
 const mount=()=>{const view=surface();api.mount(view.root);return view;};
 return {window,document,api,frames,observers,state,frame,advance,mount};
}
const close=(actual,expected,message,tolerance=1e-8)=>assert.ok(Math.abs(actual-expected)<tolerance,message+' ('+actual+' versus '+expected+')');
function physicalModel(){
 const {api}=harness();assert.equal(typeof api.sample,'function');
 for(const amplitude of [0,.05,.2,.3])for(const frequency of [.25,.5,.75,1.25]){
  const p={amplitude,frequency},initial=api.sample(p,0),quarter=api.sample(p,initial.period/4),period=api.sample(p,initial.period);
  close(initial.speed,4,'The medium has the same fixed propagation speed for every adjustment');
  close(initial.lambda*frequency,initial.speed,'Wavelength follows v = lambda f');close(initial.period*frequency,1,'Period is reciprocal to frequency');
  close(Math.abs(quarter.marker.displacement),amplitude,'One-quarter oscillation reaches the chosen amplitude');
  close(period.marker.y,initial.marker.y,'One period returns the material point to its initial displacement');
  for(const t of [0,.1,.4,.9,2.3]){
   const sample=api.sample(p,t);assert.equal(sample.marker.x,sample.marker.x0,'P never travels horizontally with the wave');
   for(const point of sample.points){assert.equal(point.x,point.x0);assert.ok(Number.isFinite(point.y));assert.ok(Math.abs(point.displacement)<=amplitude+1e-9);}
  }
 }
 const low=api.sample({amplitude:.2,frequency:.5},.2),high=api.sample({amplitude:.2,frequency:1},.2);
 close(high.cycles,2*low.cycles,'Doubling frequency doubles elapsed oscillation cycles');close(high.lambda,low.lambda/2,'At fixed speed doubling frequency halves wavelength');
 const first=api.sample({amplitude:.2,frequency:.75},.37),dx=first.points[1].x0-first.points[0].x0,next=api.sample({amplitude:.2,frequency:.75},.37+dx/first.speed);
 for(let i=1;i<first.points.length-2;i++)close(first.points[i].y,next.points[i+1].y,'The profile moves right at the model speed');
 for(const p of [{amplitude:NaN,frequency:NaN},{amplitude:-3,frequency:0},{amplitude:Infinity,frequency:Infinity}]){
  const sample=api.sample(p,.2);assert.ok(Number.isFinite(sample.amplitude)&&sample.amplitude>=0);assert.ok(Number.isFinite(sample.frequency)&&sample.frequency>0);assert.ok(Number.isFinite(sample.lambda)&&Number.isFinite(sample.marker.y));
 }
}
function onlyTwoAdjustmentsAndImmediateResponse(){
 const h=harness(),v=h.mount();
 assert.deepEqual(v.controls.map(c=>c.dataset.wafParam).sort(),['amplitude','frequency'],'Only amplitude and frequency are adjustable physics quantities');
 assert.ok(v.controls.every(c=>c.type==='range'&&c.getAttribute('aria-label')),'Both native range controls have accessible names');
 assert.match(v.placeholder.innerHTML,/data-activity-fullscreen/);assert.doesNotMatch(v.placeholder.innerHTML,/<select|<audio|puntaje|comprobar respuesta|data-waf-param="(?:lambda|speed|phase|direction)"/i);
 h.advance(360);v.click('play');const paused=h.state()[0];assert.equal(paused.playing,false);
 const sceneBefore=v.q('[data-waf-scene]').innerHTML;
 v.input('amplitude',.3);const amplitudeState=h.state()[0];close(amplitudeState.parameters.amplitude,.3,'Amplitude responds to the input event without submitting');
 assert.notEqual(v.q('[data-waf-scene]').innerHTML,sceneBefore,'Amplitude immediately redraws the wave even while paused');
 close(amplitudeState.parameters.frequency,paused.parameters.frequency,'Amplitude does not alter frequency');
 assert.equal(v.q('[data-waf-output="amplitude"]').textContent,'0,30 m','The visible amplitude output includes the adjusted value and unit');
 const markerBefore=h.api.sample({...amplitudeState.parameters,cycles:amplitudeState.cycles}).marker.y;
 const shapeBefore=v.q('[data-waf-scene]').innerHTML;
 v.input('frequency',1.25);const frequencyState=h.state()[0];
 close(frequencyState.parameters.frequency,1.25,'Frequency responds to the input event');close(frequencyState.parameters.amplitude,.3,'Frequency does not alter amplitude');
 assert.equal(v.q('[data-waf-output="frequency"]').textContent,'1,25 Hz','The visible frequency output includes the adjusted value and unit');
 assert.match(v.q('[data-waf-readouts]').innerHTML,/3,20/,'The read-only wavelength updates with the fixed-speed relation');
 close(frequencyState.cycles,amplitudeState.cycles,'A paused frequency adjustment preserves accumulated phase');
 close(h.api.sample({...frequencyState.parameters,cycles:frequencyState.cycles}).marker.y,markerBefore,'Frequency adjustment does not teleport P vertically');
 assert.notEqual(v.q('[data-waf-scene]').innerHTML,shapeBefore,'Changing frequency updates wavelength immediately');
 v.input('amplitude',0);assert.ok(h.api.sample({...h.state()[0].parameters,cycles:h.state()[0].cycles}).points.every(p=>Math.abs(p.y)<1e-12),'Zero amplitude produces a straight equilibrium profile');
 h.advance(240);close(h.state()[0].cycles,frequencyState.cycles,'Inputs do not start a paused activity');
 h.api.destroy();
}
function playbackAndLifecycle(){
 const h=harness(),v=h.mount();h.advance(320);let s=h.state()[0];assert.ok(s.time>0&&s.cycles>0,'The visible widget progresses in time');
 const svg=v.q('[data-waf-scene]').innerHTML;h.advance(200);assert.notEqual(v.q('[data-waf-scene]').innerHTML,svg,'RAF renders physical motion');
 v.click('play');s=h.state()[0];h.advance(240);close(h.state()[0].time,s.time,'Pause freezes the clock');close(h.state()[0].cycles,s.cycles,'Pause freezes integrated phase');
 v.click('restart');close(h.state()[0].time,0,'Restart resets elapsed time');close(h.state()[0].cycles,0,'Restart resets phase');assert.equal(h.state()[0].playing,false,'Restart preserves the paused state');
 v.click('play');h.advance(200);assert.ok(h.state()[0].time>0);
 h.observers[0].intersect(false);s=h.state()[0];h.advance(300);close(h.state()[0].cycles,s.cycles,'Offscreen state suspends phase');
 h.observers[0].intersect(true);h.advance(200);assert.ok(h.state()[0].cycles>s.cycles);
 h.document.hidden=true;h.document.emit('visibilitychange');s=h.state()[0];h.advance(300);close(h.state()[0].cycles,s.cycles,'A hidden document does not run the wave');assert.equal(h.frames.size,0);
 h.document.hidden=false;h.document.emit('visibilitychange');h.advance(160);assert.ok(h.state()[0].cycles>s.cycles);
 const replacement=h.mount();assert.equal(v.host.listenerCount(),0,'Remount removes old handlers');assert.ok(h.observers[0].disconnected);
 const newState=h.state();v.click('play');assert.deepEqual(h.state(),newState,'Detached controls cannot alter the replacement');
 h.api.destroy();assert.deepEqual(h.state(),[]);assert.equal(h.frames.size,0);assert.equal(h.document.listenerCount(),0);assert.equal(h.window.listenerCount(),0);assert.equal(replacement.host.listenerCount(),0);assert.ok(h.observers.every(o=>o.disconnected));
 const reduced=harness({reduced:true}),still=reduced.mount();assert.equal(reduced.state()[0].playing,false);assert.equal(reduced.frames.size,0,'Reduced-motion starts without running RAF');still.input('amplitude',.1);assert.equal(reduced.state()[0].parameters.amplitude,.1);still.click('play');reduced.advance(160);assert.ok(reduced.state()[0].cycles>0);reduced.api.destroy();
 const hidden=harness({hidden:true});hidden.mount();const hiddenCycles=hidden.state()[0].cycles;hidden.advance(200);close(hidden.state()[0].cycles,hiddenCycles,'A background mount is initially still');hidden.api.destroy();
 const page=harness();page.mount();page.advance(160);page.window.emit('pagehide');assert.deepEqual(page.state(),[],'Page exit releases the standalone widget');assert.equal(page.frames.size,0);assert.equal(page.window.listenerCount(),0);assert.equal(page.document.listenerCount(),0);
 const empty=harness();empty.mount();empty.api.mount({querySelectorAll:()=>[]});assert.deepEqual(empty.state(),[],'A lesson without this host retains no previous interactive activity');assert.equal(empty.frames.size,0);empty.api.destroy();
}
physicalModel();onlyTwoAdjustmentsAndImmediateResponse();playbackAndLifecycle();
console.log('PASS: amplitude/frequency are the only physics adjustments, fixed-speed wave relations, immediate input rendering, continuous marked-point phase, playback, reduced motion, visibility and cleanup.');
