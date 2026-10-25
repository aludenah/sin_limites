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
 const placeholder=node({'data-standing-wave-harmonics':''}),parts=new Map(),buttons=[];let html='';
 Object.defineProperty(placeholder,'innerHTML',{get:()=>html,set(value){
  html=value;const opening=/<section\s+([^>]+)>/.exec(value);assert.ok(opening,'The animation has a named section');
  const host=node(attributes(opening[1]),'section');placeholder.firstElementChild=host;buttons.length=0;
  for(const m of value.matchAll(/<button\s+([^>]+)>([\s\S]*?)<\/button>/g)){const b=node(attributes(m[1]),'button');b.textContent=m[2];buttons.push(b);}
  for(const m of value.matchAll(/<(canvas|output|div|span|p|strong|h3|h4)\s+([^>]*(?:data-swh-[^>]+))>/g)){
   const attrs=attributes(m[2]),part=node(attrs,m[1]);
   if(m[1]==='canvas'){const ctx=context2d(counter);ctx.canvas=part;part.getContext=()=>ctx;}
   for(const name of Object.keys(attrs))if(name.startsWith('data-swh-'))parts.set('['+name+(attrs[name]?'="'+attrs[name]+'"':'')+']',part);
  }
  host.querySelector=selector=>buttons.find(b=>b.matches(selector))||parts.get(selector)||((parts.set(selector,node()),parts.get(selector)));
  host.querySelectorAll=selector=>[...buttons,...parts.values()].filter(n=>n.matches(selector));
 }});
 const root=node();root.querySelectorAll=selector=>selector==='[data-standing-wave-harmonics]'?[placeholder]:[];
 return {root,placeholder,buttons,get host(){return placeholder.firstElementChild;},q(selector){return this.host.querySelector(selector);},
  choose(n){const b=buttons.find(b=>Number(b.dataset.swhMode)===n);assert.ok(b,'Requested harmonic exists');this.host.emit('click',{target:b,preventDefault(){}});},
  play(){const b=buttons.find(b=>b.dataset.swhAction==='play');assert.ok(b,'Playback control exists');this.host.emit('click',{target:b,preventDefault(){}});}
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
 vm.runInNewContext(fs.readFileSync(path.join(project,'standing-wave-harmonics.js'),'utf8'),{window,document,Image,AbortController,performance:window.performance,console});
 const api=window.StandingWaveHarmonics;
 function frame(ms=40){now+=ms;const pending=[...frames.values()];frames.clear();for(const fn of pending)fn(now);}
 const advance=ms=>{for(let i=0;i<Math.ceil(ms/40);i++)frame();};
 const state=()=>JSON.parse(JSON.stringify(api.getState()));
 const mount=()=>{const view=surface(counter);api.mount(view.root);return view;};
 return {window,document,api,frames,intersections,resizes,images,counter,state,frame,advance,mount};
}
const close=(actual,expected,message,tolerance=1e-8)=>assert.ok(Math.abs(actual-expected)<tolerance,message+' ('+actual+' versus '+expected+')');
function normalModes(){
 const {api}=harness();assert.equal(api.constants.length,4);assert.equal(api.constants.amplitude,.22);assert.equal(api.constants.fundamental,1);assert.equal(api.constants.timeScale,.25);
 for(let n=1;n<=5;n++){
  const mode=api.sample({n},0),quarter=api.sample({n},1/(4*mode.frequency)),half=api.sample({n},1/(2*mode.frequency));
  assert.equal(mode.n,n);assert.equal(mode.nodes.length,n+1,'The two fixed ends are counted as nodes');assert.equal(mode.antinodes.length,n,'Every loop has one antinode');
  close(mode.frequency,n*api.constants.fundamental,'Frequencies are integer multiples of the fundamental');close(mode.wavelength,2*mode.length/n,'The string contains n half wavelengths');close(mode.frequency*mode.wavelength,8,'Changing harmonic preserves wave speed');close(mode.amplitude,.22,'Every mode uses the same vertical scale');
  close(mode.nodes[0],0,'The left end is a node');close(mode.nodes.at(-1),4,'The right end is a node');
  for(let j=1;j<mode.nodes.length;j++)close(mode.nodes[j]-mode.nodes[j-1],mode.wavelength/2,'Adjacent nodes are half a wavelength apart');
  for(let j=0;j<n;j++)close(mode.antinodes[j],(mode.nodes[j]+mode.nodes[j+1])/2,'Each antinode lies halfway between its neighboring nodes');
  for(const sample of [mode,quarter,half]){
   close(sample.points[0].y,0,'The left end never moves');close(sample.points.at(-1).y,0,'The right end never moves');
   assert.ok(sample.points.every(p=>Number.isFinite(p.x)&&Number.isFinite(p.y)&&Math.abs(p.y)<=.22+1e-8));
   for(const x of mode.nodes){const p=sample.points.reduce((a,b)=>Math.abs(a.x-x)<Math.abs(b.x-x)?a:b);assert.ok(Math.abs(p.y)<=.22*n*Math.PI/4*Math.abs(p.x-x)+1e-8,'A sampled point at or near each declared node remains at or near equilibrium');}
  }
  assert.ok(Math.max(...mode.points.map(p=>Math.abs(p.y)))>.21,'The same maximum amplitude is visible in every mode');
  assert.ok(quarter.points.every(p=>Math.abs(p.y)<1e-8),'After one quarter period the complete string passes through equilibrium');
  half.points.forEach((p,i)=>{close(p.x,mode.points[i].x,'Rope material does not travel horizontally');close(p.y,-mode.points[i].y,'After half a period every loop reverses its displacement');});
 }
 for(const p of [null,undefined,{},-10,99,NaN,{n:Infinity},{n:3.8}]){const s=api.sample(p,NaN);assert.ok(Number.isInteger(s.n)&&s.n>=1&&s.n<=5);assert.ok(s.points.every(p=>Number.isFinite(p.y)));}
}
function selectionAndPlayback(){
 const h=harness(),v=h.mount(),modes=v.buttons.filter(b=>b.dataset.swhMode);
 assert.deepEqual(modes.map(b=>Number(b.dataset.swhMode)),[1,2,3,4,5]);assert.ok(modes.every(b=>b.getAttribute('aria-label')),'Each harmonic selector has a descriptive accessible name');
 assert.doesNotMatch(v.placeholder.innerHTML,/<(?:input|select|audio|video)\b|puntaje|comprobar respuesta/i,'The harmonic is the only adjustable physical parameter');assert.match(v.placeholder.innerHTML,/data-activity-fullscreen/);assert.match(v.placeholder.innerHTML,/×\s*4|4\s*veces|ralentizad/i,'Slow motion is identified');
 h.advance(400);v.play();const paused=h.state()[0];assert.equal(paused.playing,false);assert.ok(paused.time>0);
 for(const n of [2,3,4,5,1]){
  v.choose(n);const s=h.state()[0];assert.equal(s.n,n);assert.deepEqual(s.parameters,{n});assert.equal(s.playing,false,'Choosing a harmonic respects pause');close(s.time,0,'A new harmonic begins at its maximum profile');
  assert.equal(modes.filter(b=>b.getAttribute('aria-pressed')==='true').length,1,'Exactly one mode is selected');assert.equal(modes[n-1].getAttribute('aria-pressed'),'true');
  assert.match(v.q('[data-swh-nodes]').textContent,new RegExp(String(n+1)));assert.match(v.q('[data-swh-antinodes]').textContent,new RegExp(String(n)));
 }
 v.play();h.frame();const start=h.state()[0];h.advance(200);close(h.state()[0].time-start.time,.05,'A quarter of wall time advances the physical clock');
 h.api.destroy();
}
function visibilityAndCleanup(){
 const h=harness(),v=h.mount();h.advance(200);assert.ok(h.state()[0].time>0);
 h.intersections[0].intersect(false);const offscreen=h.state()[0].time;h.advance(200);close(h.state()[0].time,offscreen,'Offscreen animations suspend');h.intersections[0].intersect(true);h.advance(160);assert.ok(h.state()[0].time>offscreen);
 h.document.hidden=true;h.document.emit('visibilitychange');const hidden=h.state()[0].time;h.advance(160);close(h.state()[0].time,hidden,'Hidden tabs suspend');assert.equal(h.frames.size,0);h.document.hidden=false;h.document.emit('visibilitychange');h.advance(160);assert.ok(h.state()[0].time>hidden);
 const replacement=h.mount();assert.equal(v.host.listenerCount(),0);const current=h.state();v.choose(5);assert.deepEqual(h.state(),current,'Detached selectors cannot change the replacement');
 h.api.destroy();const draws=h.counter.calls;for(const image of h.images)image.load();for(const observer of h.resizes)observer.resize(320);
 assert.deepEqual(h.state(),[]);assert.equal(h.frames.size,0);assert.equal(h.counter.calls,draws,'Late callbacks do not redraw a destroyed animation');assert.equal(h.document.listenerCount(),0);assert.equal(h.window.listenerCount(),0);assert.equal(replacement.host.listenerCount(),0);assert.ok(h.intersections.every(o=>o.disconnected));assert.ok(h.resizes.every(o=>o.disconnected));
 const reduced=harness({reduced:true}),still=reduced.mount();assert.equal(reduced.state()[0].playing,false);assert.equal(reduced.frames.size,0);still.choose(3);assert.equal(reduced.state()[0].n,3);still.play();reduced.advance(160);assert.ok(reduced.state()[0].time>0);reduced.api.destroy();
 const page=harness();page.mount();page.advance(160);page.window.emit('pagehide');assert.deepEqual(page.state(),[]);assert.equal(page.frames.size,0);assert.equal(page.document.listenerCount(),0);assert.equal(page.window.listenerCount(),0);
}
normalModes();selectionAndPlayback();visibilityAndCleanup();
console.log('PASS: five harmonic modes, fixed nodes, alternating displacement, correct frequencies and wavelengths, single mode selector, playback, slow motion, visibility/reduced motion and cleanup.');
