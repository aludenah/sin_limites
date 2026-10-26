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
 const placeholder=node({'data-sound-propagation-animation':''}),parts=new Map(),buttons=[];let html='';
 Object.defineProperty(placeholder,'innerHTML',{get:()=>html,set(value){
  html=value;const opening=/<section\s+([^>]+)>/.exec(value);assert.ok(opening,'The animation has a named section');
  const host=node(attributes(opening[1]),'section');placeholder.firstElementChild=host;buttons.length=0;
  for(const m of value.matchAll(/<button\s+([^>]+)>([\s\S]*?)<\/button>/g)){const b=node(attributes(m[1]),'button');b.textContent=m[2];buttons.push(b);}
  for(const m of value.matchAll(/<(canvas|output|div|span|p|strong|h3|h4)\s+([^>]*(?:data-spa-[^>]+))>/g)){
   const attrs=attributes(m[2]),part=node(attrs,m[1]);
   if(m[1]==='canvas'){const ctx=context2d(counter);ctx.canvas=part;part.getContext=()=>ctx;}
   for(const name of Object.keys(attrs))if(name.startsWith('data-spa-'))parts.set('['+name+(attrs[name]?'="'+attrs[name]+'"':'')+']',part);
  }
  host.querySelector=selector=>buttons.find(b=>b.matches(selector))||parts.get(selector)||((parts.set(selector,node()),parts.get(selector)));
  host.querySelectorAll=selector=>[...buttons,...parts.values()].filter(n=>n.matches(selector));
 }});
 const root=node();root.querySelectorAll=selector=>selector==='[data-sound-propagation-animation]'?[placeholder]:[];
 return {root,placeholder,buttons,get host(){return placeholder.firstElementChild;},q(selector){return this.host.querySelector(selector);},
  click(action){const b=buttons.find(b=>b.dataset.spaAction===action);assert.ok(b,'Playback control exists: '+action);this.host.emit('click',{target:b,preventDefault(){}});}
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
 vm.runInNewContext(fs.readFileSync(path.join(project,'sound-propagation-animation.js'),'utf8'),{window,document,Image,AbortController,performance:window.performance,console});
 const api=window.SoundPropagationAnimation;
 function frame(ms=40){now+=ms;const pending=[...frames.values()];frames.clear();for(const fn of pending)fn(now);}
 const advance=ms=>{for(let i=0;i<Math.ceil(ms/40);i++)frame();};
 const state=()=>JSON.parse(JSON.stringify(api.getState()));
 const mount=()=>{const view=surface(counter);api.mount(view.root);return view;};
 return {window,document,api,frames,intersections,resizes,images,counter,state,frame,advance,mount};
}
const close=(actual,expected,message,tolerance=1e-8)=>assert.ok(Math.abs(actual-expected)<tolerance,message+' ('+actual+' versus '+expected+')');
function physicalPropagation(){
 const {api}=harness(),c=api.constants,k=2*Math.PI/c.wavelength,omega=2*Math.PI*c.frequency,period=1/c.frequency;
 assert.equal(c.length,4);assert.equal(c.wavelength,1.6);assert.equal(c.frequency,.4);assert.equal(c.amplitude,.06);assert.equal(c.markerX,2);assert.equal(c.timeScale,1);
 assert.ok(c.amplitude*k<1,'The material-coordinate map stays monotonic, so particles never cross');
 const low=1/(1+c.amplitude*k),high=1/(1-c.amplitude*k);
 for(const time of [0,.15,period/4,period/2,period,.73]){
  const s=api.sample(time);close(s.time,time,'Sample uses the same animation clock');close(s.speed,c.frequency*c.wavelength,'Compression patterns move at lambda times frequency');
  assert.ok(s.particles.length>=300,'Several material rows make density bands visible');
  for(const p of [...s.particles,s.marker]){
   const phase=k*p.x0-omega*time,expected=c.amplitude*Math.sin(phase);
   close(p.displacement,expected,'Every material element performs the prescribed longitudinal oscillation');close(p.x,p.x0+expected,'Position is equilibrium plus local displacement');close(p.y,p.y0,'Air particles never move vertically in this longitudinal view');
   close(p.densityRatio,1/(1+c.amplitude*k*Math.cos(phase)),'Density follows the positive Jacobian of the material map');
   assert.ok(p.densityRatio>=low-1e-9&&p.densityRatio<=high+1e-9);assert.ok(Math.abs(p.x-p.x0)<=c.amplitude+1e-9);
  }
  close(s.marker.x0,2,'The marked particle has the same equilibrium position in every frame');
  close(s.sourceDisplacement,c.amplitude*Math.sin(k*c.start-omega*time),'The source vibrates with the same phase as the boundary material');
  for(const [positions,sign] of [[s.compressions,-1],[s.rarefactions,1]])for(const x of positions){
   assert.ok(x>=-1e-9&&x<=c.length+1e-9,'Density labels remain inside the visible medium');close(Math.cos(k*x-omega*time),sign,'Every labelled density extremum is correctly located');close(Math.sin(k*x-omega*time),0,'At the band centre displacement is zero, although neighbouring particles crowd or separate');
  }
  const row=s.particles.filter(p=>p.row===s.marker.row).sort((a,b)=>a.x0-b.x0);
  for(let i=1;i<row.length;i++)assert.ok(row[i].x>row[i-1].x,'Neighbours retain their order; the illustration has no particle crossings');
 }
 const initial=api.sample(0),later=api.sample(.1),shift=initial.speed*.1;
 for(const field of ['compressions','rarefactions'])for(const x of initial[field])if(x+shift<c.length-1e-8)assert.ok(later[field].some(q=>Math.abs(q-x-shift)<1e-8),'Both density patterns travel to the right at the stated speed');
 const afterPeriod=api.sample(period);initial.particles.forEach((p,i)=>close(afterPeriod.particles[i].x,p.x,'A complete oscillation returns each particle without net transport'));
 for(const bad of [NaN,Infinity,-10]){const s=api.sample(bad);assert.ok(Number.isFinite(s.time)&&s.time>=0);assert.ok(s.particles.every(p=>Number.isFinite(p.x)&&Number.isFinite(p.y)&&Number.isFinite(p.densityRatio)));}
}
function playback(){
 const h=harness(),v=h.mount();
 assert.deepEqual(v.buttons.map(b=>b.dataset.spaAction).sort(),['play','restart'],'Only playback controls are offered');
 assert.ok(v.buttons.every(b=>b.getAttribute('aria-label')),'Playback actions have descriptive accessible names');
 assert.doesNotMatch(v.placeholder.innerHTML,/<(?:input|select|audio|video)\b|puntaje|comprobar respuesta|Escuchar tono/i,'The animation adds no parameter controls, games or sound playback');assert.match(v.placeholder.innerHTML,/data-activity-fullscreen/);assert.match(v.placeholder.innerHTML,/ralentizad/i,'The illustrated motion is identified as slowed');assert.match(v.placeholder.innerHTML,/frecuencia real/i,'The visual frequency is not presented as an audible acoustic frequency');
 h.advance(400);assert.ok(h.state()[0].time>0);v.click('play');const paused=h.state()[0].time;assert.equal(h.state()[0].playing,false);h.advance(200);close(h.state()[0].time,paused,'Pause freezes the source and the medium together');
 v.click('restart');close(h.state()[0].time,0,'Restart restores the initial phase');assert.equal(h.state()[0].playing,false,'Restart preserves an intentional pause');
 v.click('play');h.frame();const start=h.state()[0].time;h.advance(200);close(h.state()[0].time-start,.2,'The model clock advances consistently with its visual time scale');h.api.destroy();
}
function visibilityAndCleanup(){
 const h=harness(),v=h.mount();h.advance(200);assert.ok(h.state()[0].time>0);
 h.intersections[0].intersect(false);const offscreen=h.state()[0].time;h.advance(200);close(h.state()[0].time,offscreen,'Offscreen animation suspends');h.intersections[0].intersect(true);h.advance(160);assert.ok(h.state()[0].time>offscreen);
 h.document.hidden=true;h.document.emit('visibilitychange');const hidden=h.state()[0].time;h.advance(160);close(h.state()[0].time,hidden,'A hidden tab suspends');assert.equal(h.frames.size,0);h.document.hidden=false;h.document.emit('visibilitychange');h.advance(160);assert.ok(h.state()[0].time>hidden);
 const replacement=h.mount();assert.equal(v.host.listenerCount(),0);const current=h.state();v.click('restart');assert.deepEqual(h.state(),current,'Detached controls cannot affect the replacement animation');
 h.api.destroy();const draws=h.counter.calls;for(const image of h.images)image.load();for(const observer of h.resizes)observer.resize(320);
 assert.deepEqual(h.state(),[]);assert.equal(h.frames.size,0);assert.equal(h.counter.calls,draws,'Late callbacks do not redraw after destroy');assert.equal(h.document.listenerCount(),0);assert.equal(h.window.listenerCount(),0);assert.equal(replacement.host.listenerCount(),0);assert.ok(h.intersections.every(o=>o.disconnected));assert.ok(h.resizes.every(o=>o.disconnected));
 const reduced=harness({reduced:true}),still=reduced.mount();assert.equal(reduced.state()[0].playing,false);assert.equal(reduced.frames.size,0);still.click('play');reduced.advance(160);assert.ok(reduced.state()[0].time>0);reduced.api.destroy();
 const page=harness();page.mount();page.advance(160);page.window.emit('pagehide');assert.deepEqual(page.state(),[]);assert.equal(page.frames.size,0);assert.equal(page.document.listenerCount(),0);assert.equal(page.window.listenerCount(),0);
}
physicalPropagation();playback();visibilityAndCleanup();
console.log('PASS: local longitudinal particle motion, density extrema and travelling compression bands, source synchronization, playback, visibility/reduced motion and cleanup.');
