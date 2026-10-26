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
 const result=events({attrs:{...attrs},dataset:{},tagName:tag.toUpperCase(),textContent:'',innerHTML:'',isConnected:true,clientWidth:900,clientHeight:360,width:900,height:360,style:{},
  setAttribute(name,value){this.attrs[name]=String(value);},getAttribute(name){return this.attrs[name]??null;},removeAttribute(name){delete this.attrs[name];},
  matches(selector){if(selector.includes(','))return selector.split(',').some(s=>this.matches(s.trim()));const m=/\[([^=\]]+)(?:="([^"]*)")?\]/.exec(selector);return selector===tag||!!m&&Object.hasOwn(this.attrs,m[1])&&(m[2]===undefined||this.attrs[m[1]]===m[2]);},
  closest(selector){return this.matches(selector)?this:null;},
  getBoundingClientRect(){return {top:0,bottom:this.clientHeight,left:0,right:this.clientWidth,width:this.clientWidth,height:this.clientHeight};}
 });
 for(const [name,value] of Object.entries(attrs))if(name.startsWith('data-'))result.dataset[name.slice(5).replace(/-([a-z])/g,(_,c)=>c.toUpperCase())]=value;
 return result;
}
function context2d(counter){
 const gradient={addColorStop(){}};
 return new Proxy({canvas:null,measureText:text=>({width:String(text).length*8}),createLinearGradient:()=>gradient,createRadialGradient:()=>gradient},
  {get(target,key){return key in target?target[key]:(..._args)=>{counter.calls++;};},set(target,key,value){target[key]=value;return true;}});
}
function surface(counter){
 const placeholder=node({'data-standing-wave-superposition':''}),parts=new Map(),buttons=[];let html='';
 Object.defineProperty(placeholder,'innerHTML',{get:()=>html,set(value){
  html=value;const opening=/<section\s+([^>]+)>/.exec(value);assert.ok(opening,'The animation has a named section');
  const host=node(attributes(opening[1]),'section');placeholder.firstElementChild=host;buttons.length=0;
  for(const m of value.matchAll(/<button\s+([^>]+)>([\s\S]*?)<\/button>/g)){const b=node(attributes(m[1]),'button');b.textContent=m[2];buttons.push(b);}
  for(const m of value.matchAll(/<(canvas|output|div|span|p|strong|h3|h4)\s+([^>]*(?:data-swsp-[^>]+))>/g)){
   const attrs=attributes(m[2]),part=node(attrs,m[1]);
   if(m[1]==='canvas'){const ctx=context2d(counter);ctx.canvas=part;part.getContext=()=>ctx;}
   for(const name of Object.keys(attrs))if(name.startsWith('data-swsp-'))parts.set('['+name+(attrs[name]?'="'+attrs[name]+'"':'')+']',part);
  }
  host.querySelector=selector=>buttons.find(b=>b.matches(selector))||parts.get(selector)||((parts.set(selector,node()),parts.get(selector)));
  host.querySelectorAll=selector=>[...buttons,...parts.values()].filter(n=>n.matches(selector));
 }});
 const root=node();root.querySelectorAll=selector=>selector==='[data-standing-wave-superposition]'?[placeholder]:[];
 return {root,placeholder,buttons,get host(){return placeholder.firstElementChild;},q(selector){return this.host.querySelector(selector);},
  click(action){const b=buttons.find(b=>b.dataset.swspAction===action);assert.ok(b,'Playback control exists: '+action);this.host.emit('click',{target:b,preventDefault(){}});}
 };
}
function harness(options={}){
 const frames=new Map(),intersections=[],resizes=[],images=[],counter={calls:0};let now=0,sequence=0;
 const document=events({hidden:!!options.hidden,createElement(tag){const n=node({},tag);if(tag==='canvas'){const ctx=context2d(counter);ctx.canvas=n;n.getContext=()=>ctx;}return n;}});
 class IntersectionObserver{constructor(callback){this.callback=callback;this.disconnected=false;intersections.push(this);}observe(host){this.host=host;}disconnect(){this.disconnected=true;}intersect(visible){this.callback([{target:this.host,isIntersecting:visible}]);}}
 class ResizeObserver{constructor(callback){this.callback=callback;this.disconnected=false;resizes.push(this);}observe(host){this.host=host;}disconnect(){this.disconnected=true;}resize(width){this.host.clientWidth=width;this.callback([{target:this.host,contentRect:{width,height:360}}]);}}
 class Image{constructor(){events(this);this.complete=false;this.naturalWidth=1536;this.naturalHeight=1024;images.push(this);}load(){this.complete=true;this.onload?.();this.emit('load');}}
 const window=events({document,IntersectionObserver,ResizeObserver,Image,devicePixelRatio:2,matchMedia:()=>({matches:!!options.reduced}),performance:{now:()=>now},console,
  requestAnimationFrame(fn){frames.set(++sequence,fn);return sequence;},cancelAnimationFrame(id){frames.delete(id);}
 });
 vm.runInNewContext(fs.readFileSync(path.join(project,'standing-wave-superposition.js'),'utf8'),{window,document,Image,AbortController,performance:window.performance,console});
 const api=window.StandingWaveSuperposition;
 function frame(ms=40){now+=ms;const pending=[...frames.values()];frames.clear();for(const fn of pending)fn(now);}
 const advance=ms=>{for(let i=0;i<Math.ceil(ms/40);i++)frame();};
 const state=()=>JSON.parse(JSON.stringify(api.getState()));
 const mount=()=>{const view=surface(counter);api.mount(view.root);return view;};
 return {window,document,api,frames,intersections,resizes,images,counter,state,frame,advance,mount};
}
const close=(actual,expected,message,tolerance=1e-8)=>assert.ok(Math.abs(actual-expected)<tolerance,message+' ('+actual+' versus '+expected+')');
function physicalSuperposition(){
 const {api}=harness(),c=api.constants;
 assert.equal(c.length,4);assert.equal(c.amplitude,.12);assert.equal(c.frequency,1);assert.equal(c.markerX,.5);assert.equal(c.timeScale,.25);
 const k=2*Math.PI/4,omega=2*Math.PI,speed=4;
 for(const time of [0,.125,.25,.5,.73,1]){
  const s=api.sample(time);close(s.time,time,'The model uses physical time');close(s.amplitude,.12,'Each travelling wave has the same amplitude');close(s.frequency,1,'The travelling waves share their frequency');close(s.wavelength,4,'The second harmonic on four metres has wavelength four metres');
  assert.deepEqual(Array.from(s.nodes),[0,2,4],'Both endpoints and the midpoint are stationary nodes');
  for(const p of [...s.points,s.marker]){
   close(p.y1,c.amplitude*Math.sin(k*p.x-omega*time),'The first travelling wave advances to the right');
   close(p.y2,c.amplitude*Math.sin(k*p.x+omega*time),'The second travelling wave advances to the left');
   close(p.y,p.y1+p.y2,'Every displayed result is the pointwise sum at the same position and time');
   close(p.y,2*c.amplitude*Math.sin(k*p.x)*Math.cos(omega*time),'The sum is the standing-wave product');
   assert.ok(Math.abs(p.y1)<=c.amplitude+1e-9&&Math.abs(p.y2)<=c.amplitude+1e-9&&Math.abs(p.y)<=2*c.amplitude+1e-9);
  }
  close(s.marker.x,.5,'The comparison point remains at the same material coordinate');
  for(const x of s.nodes){const p=s.points.find(p=>Math.abs(p.x-x)<1e-9);assert.ok(p,'Declared nodes are included in the profile');close(p.y,0,'All nodes remain at equilibrium');close(p.y1,-p.y2,'The travelling contributions cancel at a node');}
 }
 const zero=api.sample(0),quarter=api.sample(.25),half=api.sample(.5);
 close(zero.marker.y1,zero.marker.y2,'The marked point initially reinforces');assert.ok(zero.marker.y>0);
 assert.ok(quarter.points.every(p=>Math.abs(p.y)<1e-9),'At a quarter period the complete result passes through equilibrium');assert.ok(Math.abs(quarter.marker.y1)>.08&&Math.abs(quarter.marker.y2)>.08,'Cancellation occurs despite nonzero individual contributions');
 half.points.forEach((p,i)=>close(p.y,-zero.points[i].y,'A half period reverses the stationary profile without shifting it'));
 const dt=.05,shift=speed*dt,later=api.sample(dt);
 for(let i=0;i<zero.points.length;i+=25){
  const p=zero.points[i],right=later.points.find(q=>Math.abs(q.x-(p.x+shift))<1e-9),left=later.points.find(q=>Math.abs(q.x-(p.x-shift))<1e-9);
  if(right)close(right.y1,p.y1,'A feature of wave one translates right at the shared speed');if(left)close(left.y2,p.y2,'A feature of wave two translates left at the shared speed');
 }
 for(const bad of [NaN,Infinity,-1]){const s=api.sample(bad);assert.ok(Number.isFinite(s.time)&&s.time>=0);assert.ok(s.points.every(p=>Number.isFinite(p.y1)&&Number.isFinite(p.y2)&&Number.isFinite(p.y)));}
}
const signedNumber=text=>Number(/[-−+]?\s*\d+(?:[.,]\d+)?/.exec(text)?.[0].replace(/\s/g,'').replace('−','-').replace(',','.'));
function playbackAndReadouts(){
 const h=harness(),v=h.mount();
 assert.deepEqual(v.buttons.map(b=>b.dataset.swspAction).sort(),['play','restart','step'],'Only animation playback controls are offered');
 assert.ok(v.buttons.every(b=>b.getAttribute('aria-label')),'Playback buttons have descriptive accessible names');
 assert.doesNotMatch(v.placeholder.innerHTML,/<(?:input|select|audio|video)\b|puntaje|comprobar respuesta/i,'No physical parameter or game controls are introduced');assert.match(v.placeholder.innerHTML,/data-activity-fullscreen/);assert.match(v.placeholder.innerHTML,/×\s*4|4\s*veces|ralentizad/i,'The slowed display is identified');
 h.advance(400);assert.ok(h.state()[0].time>0);v.click('play');const paused=h.state()[0].time;assert.equal(h.state()[0].playing,false);h.advance(200);close(h.state()[0].time,paused,'Pause freezes all three profiles on the same physical instant');
 v.click('restart');close(h.state()[0].time,0,'Restart restores the initial standing profile');
 for(let step=1;step<=4;step++){
  v.click('step');const state=h.state()[0],sample=h.api.sample(state.time);close(state.time,step/8,'One step advances one eighth of a physical period');assert.equal(state.playing,false,'Stepping pauses the animation');
  for(const [selector,value] of [['[data-swsp-y1]',sample.marker.y1],['[data-swsp-y2]',sample.marker.y2],['[data-swsp-sum]',sample.marker.y]])close(signedNumber(v.q(selector).textContent),value*100,'The signed readout agrees with the marked point to its displayed tenth of a centimetre',.051);
 }
 v.click('play');h.frame();const start=h.state()[0].time;h.advance(200);close(h.state()[0].time-start,.05,'The common physical clock advances at one quarter of wall time');
 h.api.destroy();
}
function visibilityAndCleanup(){
 const h=harness(),v=h.mount();h.advance(200);assert.ok(h.state()[0].time>0);
 h.intersections[0].intersect(false);const offscreen=h.state()[0].time;h.advance(200);close(h.state()[0].time,offscreen,'Offscreen animations suspend');h.intersections[0].intersect(true);h.advance(160);assert.ok(h.state()[0].time>offscreen);
 h.document.hidden=true;h.document.emit('visibilitychange');const hidden=h.state()[0].time;h.advance(160);close(h.state()[0].time,hidden,'Hidden tabs suspend');assert.equal(h.frames.size,0);h.document.hidden=false;h.document.emit('visibilitychange');h.advance(160);assert.ok(h.state()[0].time>hidden);
 const replacement=h.mount();assert.equal(v.host.listenerCount(),0);const current=h.state();v.click('step');assert.deepEqual(h.state(),current,'Detached playback buttons cannot change the replacement');
 h.api.destroy();const draws=h.counter.calls;for(const image of h.images)image.load();for(const observer of h.resizes)observer.resize(320);
 assert.deepEqual(h.state(),[]);assert.equal(h.frames.size,0);assert.equal(h.counter.calls,draws,'Late image and resize callbacks do not redraw after destroy');assert.equal(h.document.listenerCount(),0);assert.equal(h.window.listenerCount(),0);assert.equal(replacement.host.listenerCount(),0);assert.ok(h.intersections.every(o=>o.disconnected));assert.ok(h.resizes.every(o=>o.disconnected));
 const reduced=harness({reduced:true}),still=reduced.mount();assert.equal(reduced.state()[0].playing,false);assert.equal(reduced.frames.size,0);still.click('step');close(reduced.state()[0].time,.125,'Reduced-motion mode supports a deliberate frame step');still.click('play');reduced.advance(160);assert.ok(reduced.state()[0].time>.125);reduced.api.destroy();
 const page=harness();page.mount();page.advance(160);page.window.emit('pagehide');assert.deepEqual(page.state(),[]);assert.equal(page.frames.size,0);assert.equal(page.document.listenerCount(),0);assert.equal(page.window.listenerCount(),0);
}
physicalSuperposition();playbackAndReadouts();visibilityAndCleanup();
console.log('PASS: pointwise travelling-wave sum, propagation directions, fixed nodes, synchronized result and signed readouts, playback and stepping, slow motion, visibility/reduced motion and cleanup.');
