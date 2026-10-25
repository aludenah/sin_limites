'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const project=path.join(__dirname,'..');
function events(object={}){
 const listeners=new Map();
 return Object.assign(object,{
  addEventListener(type,fn){if(!listeners.has(type))listeners.set(type,new Set());listeners.get(type).add(fn);},
  removeEventListener(type,fn){listeners.get(type)?.delete(fn);},
  emit(type,event={}){for(const fn of [...(listeners.get(type)||[])])fn(event);},
  listenerCount(){return [...listeners.values()].reduce((sum,set)=>sum+set.size,0);}
 });
}
const attributes=text=>Object.fromEntries([...text.matchAll(/([\w-]+)(?:="([^"]*)")?/g)].map(m=>[m[1],m[2]??'']));
function node(attrs={},tag='div'){
 const result=events({attrs:{...attrs},dataset:{},tagName:tag.toUpperCase(),textContent:'',innerHTML:'',value:attrs.value??'',min:attrs.min??'',max:attrs.max??'',step:attrs.step??'',type:attrs.type??'',isConnected:true,clientWidth:900,clientHeight:400,width:900,height:400,style:{},
  setAttribute(name,value){this.attrs[name]=String(value);},getAttribute(name){return this.attrs[name]??null;},removeAttribute(name){delete this.attrs[name];},
  matches(selector){if(selector===tag)return true;const m=/\[([^=\]]+)(?:="([^"]*)")?\]/.exec(selector);return !!m&&Object.hasOwn(this.attrs,m[1])&&(m[2]===undefined||this.attrs[m[1]]===m[2]);},
  closest(selector){return selector==='button'&&tag==='button'||this.matches(selector)?this:null;},
  getBoundingClientRect(){return {top:0,bottom:this.clientHeight,left:0,right:this.clientWidth,width:this.clientWidth,height:this.clientHeight};}
 });
 for(const [name,value] of Object.entries(attrs))if(name.startsWith('data-'))result.dataset[name.slice(5).replace(/-([a-z])/g,(_,c)=>c.toUpperCase())]=value;
 return result;
}
function context2d(counter){
 const gradient={addColorStop(){}},pattern={setTransform(){}};
 return new Proxy({canvas:null,measureText:text=>({width:String(text).length*8}),createLinearGradient:()=>gradient,createRadialGradient:()=>gradient,createPattern:()=>pattern},
  {get(target,key){if(key in target)return target[key];return (..._args)=>{counter.calls++;};},set(target,key,value){target[key]=value;return true;}});
}
function surface(counter){
 const placeholder=node({'data-string-wave-speed':''}),parts=new Map(),controls=[],buttons=[];let html='';
 Object.defineProperty(placeholder,'innerHTML',{get:()=>html,set(value){
  html=value;const opening=/<section\s+([^>]+)>/.exec(value);assert.ok(opening,'The rope activity has a named section');
  const host=node(attributes(opening[1]),'section');placeholder.firstElementChild=host;controls.length=0;buttons.length=0;
  for(const m of value.matchAll(/<(input|select)\s+([^>]+)>/g))controls.push(node(attributes(m[2]),m[1]));
  for(const m of value.matchAll(/<button\s+([^>]+)>([\s\S]*?)<\/button>/g)){const b=node(attributes(m[1]),'button');b.textContent=m[2];buttons.push(b);}
  for(const m of value.matchAll(/<(canvas|output|div|span|p|strong)\s+([^>]*(?:data-sws-[^>]+))>/g)){
   const attrs=attributes(m[2]),part=node(attrs,m[1]);
   if(m[1]==='canvas'){const ctx=context2d(counter);ctx.canvas=part;part.getContext=()=>ctx;}
   for(const name of Object.keys(attrs))if(name.startsWith('data-sws-'))parts.set('['+name+(attrs[name]?'="'+attrs[name]+'"':'')+']',part);
  }
  host.querySelector=selector=>controls.find(c=>c.matches(selector))||buttons.find(b=>b.matches(selector))||parts.get(selector)||((parts.set(selector,node()),parts.get(selector)));
  host.querySelectorAll=selector=>[...controls,...buttons,...parts.values()].filter(c=>c.matches(selector));
 }});
 const root=node();root.querySelectorAll=selector=>selector==='[data-string-wave-speed]'?[placeholder]:[];
 return {root,placeholder,parts,controls,buttons,get host(){return placeholder.firstElementChild;},q(selector){return this.host.querySelector(selector);},
  input(name,value){const input=controls.find(c=>c.dataset.swsParam===name);assert.ok(input,'Requested physics control exists: '+name);input.value=String(value);this.host.emit('input',{target:input});},
  click(action){const button=buttons.find(b=>b.dataset.swsAction===action);assert.ok(button,'Playback action exists: '+action);this.host.emit('click',{target:button,preventDefault(){}});}
 };
}
function harness(options={}){
 const frames=new Map(),intersections=[],resizes=[],images=[],counter={calls:0};let now=0,sequence=0;
 const document=events({hidden:!!options.hidden,createElement(tag){const n=node({},tag);if(tag==='canvas'){const ctx=context2d(counter);ctx.canvas=n;n.getContext=()=>ctx;}return n;}});
 class IntersectionObserver{
  constructor(callback){this.callback=callback;this.disconnected=false;intersections.push(this);}observe(host){this.host=host;}disconnect(){this.disconnected=true;}intersect(visible){this.callback([{target:this.host,isIntersecting:visible,intersectionRatio:visible?1:0}]);}
 }
 class ResizeObserver{
  constructor(callback){this.callback=callback;this.disconnected=false;resizes.push(this);}observe(host){this.host=host;}disconnect(){this.disconnected=true;}resize(width){this.host.clientWidth=width;this.callback([{target:this.host,contentRect:{width,height:400}}]);}
 }
 class Image{
  constructor(){events(this);this.complete=false;this.naturalWidth=1536;this.naturalHeight=1024;images.push(this);}
  load(){this.complete=true;this.onload?.();this.emit('load');}
  fail(){this.onerror?.();this.emit('error');}
 }
 const window=events({document,IntersectionObserver,ResizeObserver,Image,devicePixelRatio:2,matchMedia:()=>({matches:!!options.reduced}),performance:{now:()=>now},console,
  requestAnimationFrame(fn){frames.set(++sequence,fn);return sequence;},cancelAnimationFrame(id){frames.delete(id);}
 });
 vm.runInNewContext(fs.readFileSync(path.join(project,'string-wave-speed.js'),'utf8'),{window,document,Image,AbortController,performance:window.performance,console});
 const api=window.StringWaveSpeed;
 function frame(ms=40){now+=ms;const pending=[...frames.values()];frames.clear();for(const fn of pending)fn(now);}
 const advance=ms=>{for(let i=0;i<Math.ceil(ms/40);i++)frame();};
 const state=()=>JSON.parse(JSON.stringify(api.getState()));
 const mount=()=>{const view=surface(counter);api.mount(view.root);return view;};
 return {window,document,api,frames,intersections,resizes,images,counter,state,frame,advance,mount};
}
const close=(actual,expected,message,tolerance=1e-8)=>assert.ok(Math.abs(actual-expected)<tolerance,message+' ('+actual+' versus '+expected+')');
function physicalModel(){
 const {api}=harness(),base={tension:16,linearDensity:.04},reference=api.sample(base,0);
 close(reference.speed,20,'Default propagation speed is sqrt(16/.04)');close(reference.travelTime,.4,'Eight metres takes .4 physical seconds at 20m/s');
 close(api.sample({...base,tension:64},0).speed,2*reference.speed,'Quadrupling tension doubles speed at fixed linear density');
 close(api.sample({...base,linearDensity:.16},0).speed,reference.speed/2,'Quadrupling linear density halves speed at fixed tension');
 close(api.constants.slowMotionFactor,.1,'A tenth of physical time is simulated per real second');assert.equal(api.constants.length,8);
 for(const tension of [4,16,32,64])for(const linearDensity of [.01,.04,.08,.16]){
  const p={tension,linearDensity},start=api.sample(p,0),later=api.sample(p,.01);
  close(start.speed,Math.sqrt(tension/linearDensity),'Speed follows the source equation');close(start.travelTime*start.speed,8,'Readonly traversal time follows L/v');
  close((later.center-start.center)/.01,start.speed,'The actual pulse travels the stated distance per physical second');
  close(later.distance,start.speed*.01,'Sample time is physical time, not wall time');
  const displaced=api.sample({...p,distance:2},99);
  close(displaced.center,api.sample({...base,distance:2},0).center,'At the same integrated distance, settings do not reshape or shift the pulse');
  for(const point of displaced.points){assert.equal(point.x,point.x0,'Rope material points move transversely, not along the rope');assert.ok(Number.isFinite(point.y)&&point.y>=-1e-10&&point.y<=api.constants.amplitude+1e-9);}
  assert.equal(displaced.marker.x,displaced.marker.x0);assert.equal(displaced.marker.x0,4);
 }
 const atMarker=api.sample({...base,distance:4-reference.center},0);close(atMarker.marker.y,api.constants.amplitude,'The marked material point rises to the pulse amplitude as the crest passes');
 const low=api.sample({...base,distance:2},0),high=api.sample({tension:64,linearDensity:.16,distance:2},0);assert.deepEqual(JSON.parse(JSON.stringify(low.points)),JSON.parse(JSON.stringify(high.points)),'The same pulse profile is used for every material and tension setting');
 for(const p of [null,{}, {tension:-1,linearDensity:0},{tension:NaN,linearDensity:Infinity},{tension:1e30,linearDensity:-1}])for(const t of [0,NaN,1e6]){
  const sample=api.sample(p,t);assert.ok(Number.isFinite(sample.speed)&&sample.speed>0);assert.ok(sample.tension>=4&&sample.tension<=64);assert.ok(sample.linearDensity>=.01&&sample.linearDensity<=.16);assert.ok(sample.points.every(point=>Number.isFinite(point.y)));assert.ok(Number.isFinite(sample.center));
 }
}
function parameterAdjustments(){
 const h=harness(),v=h.mount();
 assert.deepEqual(v.controls.map(c=>c.dataset.swsParam).sort(),['linearDensity','tension'],'Only tension and linear density are adjustable physical parameters');assert.equal(v.controls.filter(c=>c.type==='range').length,2);assert.ok(v.controls.every(c=>c.getAttribute('aria-label')));
 for(const [name,min,max,step] of [['tension',4,64,4],['linearDensity',.01,.16,.01]]){const control=v.controls.find(c=>c.dataset.swsParam===name);assert.equal(Number(control.min),min);assert.equal(Number(control.max),max,'Density is in kilograms per metre, not a hundredfold larger value');assert.equal(Number(control.step),step);}
 assert.match(v.placeholder.innerHTML,/data-activity-fullscreen/);assert.match(v.placeholder.innerHTML,/cámara lenta|c[aá]mara.*10|10.*lenta|×\s*10/i,'Slowed display is explicitly identified');assert.doesNotMatch(v.placeholder.innerHTML,/<audio|puntaje|comprobar respuesta/i);
 h.advance(400);v.click('play');const paused=h.state()[0];assert.equal(paused.playing,false);assert.ok(paused.distance>0);
 v.input('tension',64);let changed=h.state()[0];assert.equal(changed.parameters.tension,64);close(changed.distance,paused.distance,'Editing tension preserves the pulse location');close(changed.time,paused.time,'Editing tension preserves physical elapsed time');close(changed.center,paused.center,'Editing tension does not teleport the pulse');assert.match(v.q('[data-sws-speed]').textContent,/40/,'Speed readout immediately reflects tension');
 v.input('linearDensity',.16);changed=h.state()[0];assert.equal(changed.parameters.linearDensity,.16);close(changed.center,paused.center,'Editing density also preserves position');assert.match(v.q('[data-sws-speed]').textContent,/20/,'The speed uses both current parameters');
 v.click('play');h.frame();const runningStart=h.state()[0];h.advance(200);const running=h.state()[0];close(running.distance-runningStart.distance,(running.time-runningStart.time)*20,'Runtime movement integrates the new physical speed');close(running.time-runningStart.time,.02,'Two hundred wall milliseconds correspond to twenty physical milliseconds in 10× slow motion',1e-8);
 v.click('play');v.click('restart');const restarted=h.state()[0];close(restarted.time,0,'Restart resets the physical clock');close(restarted.distance,0,'Restart sends a new pulse');assert.deepEqual(restarted.parameters,changed.parameters,'Restart preserves the two physics settings');assert.equal(restarted.playing,false);
 v.click('reset');const reset=h.state()[0];assert.deepEqual(reset.parameters,{tension:16,linearDensity:.04});close(reset.time,0,'Defaults begin a new experiment');close(reset.distance,0,'Defaults reset travel');assert.equal(reset.playing,false);
 h.api.destroy();
}
function playbackAndCleanup(){
 const h=harness(),v=h.mount();h.advance(320);let s=h.state()[0];assert.ok(s.time>0&&s.distance>0,'Visible animation advances');
 v.click('play');s=h.state()[0];h.advance(240);close(h.state()[0].distance,s.distance,'Pause freezes propagation');v.click('play');h.advance(160);assert.ok(h.state()[0].distance>s.distance);
 h.intersections[0].intersect(false);s=h.state()[0];h.advance(240);close(h.state()[0].distance,s.distance,'Offscreen animation suspends');h.intersections[0].intersect(true);h.advance(160);assert.ok(h.state()[0].distance>s.distance);
 h.document.hidden=true;h.document.emit('visibilitychange');s=h.state()[0];h.advance(240);close(h.state()[0].distance,s.distance,'Hidden tabs do not propagate');assert.equal(h.frames.size,0);h.document.hidden=false;h.document.emit('visibilitychange');h.advance(160);assert.ok(h.state()[0].distance>s.distance);
 const replacement=h.mount();assert.equal(v.host.listenerCount(),0);assert.ok(h.intersections[0].disconnected);const current=h.state();v.click('play');assert.deepEqual(h.state(),current,'Detached controls cannot change the replacement');
 h.api.destroy();const drawCalls=h.counter.calls;for(const image of h.images)image.load();for(const observer of h.resizes)observer.resize(320);
 assert.deepEqual(h.state(),[]);assert.equal(h.frames.size,0);assert.equal(h.counter.calls,drawCalls,'Late image and resize callbacks cannot redraw a destroyed activity');assert.equal(h.document.listenerCount(),0);assert.equal(h.window.listenerCount(),0);assert.equal(replacement.host.listenerCount(),0);assert.ok(h.intersections.every(observer=>observer.disconnected));assert.ok(h.resizes.every(observer=>observer.disconnected));
 const reduced=harness({reduced:true}),still=reduced.mount();assert.equal(reduced.state()[0].playing,false);assert.equal(reduced.frames.size,0);still.input('tension',64);assert.equal(reduced.state()[0].parameters.tension,64);still.click('play');reduced.advance(160);assert.ok(reduced.state()[0].distance>0);reduced.api.destroy();
 const hidden=harness({hidden:true});hidden.mount();hidden.advance(160);close(hidden.state()[0].distance,0,'Initially hidden activities remain still');hidden.api.destroy();
 const page=harness();page.mount();page.advance(160);page.window.emit('pagehide');assert.deepEqual(page.state(),[]);assert.equal(page.frames.size,0);assert.equal(page.document.listenerCount(),0);assert.equal(page.window.listenerCount(),0);
 const empty=harness();empty.mount();empty.api.mount({querySelectorAll:()=>[]});assert.deepEqual(empty.state(),[]);assert.equal(empty.frames.size,0);empty.api.destroy();
}
physicalModel();parameterAdjustments();playbackAndCleanup();
console.log('PASS: string-speed equation, square-root effects, physical travel with explicit slow motion, exactly two controls, continuous pulse position on edits, restart, visibility/reduced motion and complete cleanup.');
