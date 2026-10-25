'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const project=path.join(__dirname,'..');
const source=()=>fs.readFileSync(path.join(project,'wave-examples-animations.js'),'utf8');
function events(object={}){
 const handlers=new Map();
 return Object.assign(object,{
  addEventListener(type,fn,options={}){if(options.signal?.aborted)return;if(!handlers.has(type))handlers.set(type,new Set());handlers.get(type).add(fn);options.signal?.addEventListener('abort',()=>handlers.get(type)?.delete(fn),{once:true});},
  removeEventListener(type,fn){handlers.get(type)?.delete(fn);},
  emit(type,event={}){for(const fn of [...(handlers.get(type)||[])])fn(event);},
  listenerCount(){return [...handlers.values()].reduce((sum,set)=>sum+set.size,0);}
 });
}
function attributes(text){return Object.fromEntries([...text.matchAll(/([\w-]+)(?:="([^"]*)")?/g)].map(match=>[match[1],match[2]??'']));}
function node(attrs={},tag='div'){
 const result=events({attrs:{...attrs},dataset:{},tagName:tag.toUpperCase(),textContent:'',innerHTML:'',hidden:false,isConnected:true,disabled:false,
  setAttribute(name,value){this.attrs[name]=String(value);},getAttribute(name){return this.attrs[name]??null;},removeAttribute(name){delete this.attrs[name];},
  matches(selector){const match=/\[([^=\]]+)(?:="([^"]*)")?\]/.exec(selector);return !!match&&Object.hasOwn(this.attrs,match[1])&&(match[2]===undefined||this.attrs[match[1]]===match[2]);},
  closest(selector){return selector==='button'&&tag==='button'||this.matches(selector)?this:null;},getBoundingClientRect(){return {top:0,bottom:400,left:0,right:900,width:900,height:400};}
 });
 for(const [name,value] of Object.entries(attrs))if(name.startsWith('data-'))result.dataset[name.slice(5).replace(/-([a-z])/g,(_,letter)=>letter.toUpperCase())]=value;
 return result;
}
function surface(kinds){
 const views=kinds.map(kind=>{
  const placeholder=node({'data-wave-animation':kind}),parts=new Map(),buttons=[];let html='';
  Object.defineProperty(placeholder,'innerHTML',{get:()=>html,set(value){
   html=value;const opening=/<section\s+([^>]+)>/.exec(value);assert.ok(opening,'Animation has an accessible section');
   const section=node(attributes(opening[1]),'section');placeholder.firstElementChild=section;buttons.length=0;
   for(const match of value.matchAll(/<button\s+([^>]+)>([\s\S]*?)<\/button>/g)){const button=node(attributes(match[1]),'button');button.textContent=match[2];buttons.push(button);}
   section.querySelector=selector=>{
    const button=buttons.find(b=>b.matches(selector));if(button)return button;
    if(!parts.has(selector))parts.set(selector,node());return parts.get(selector);
   };
   section.querySelectorAll=selector=>buttons.filter(button=>button.matches(selector));
  }});
  return {kind,placeholder,buttons,parts,get host(){return placeholder.firstElementChild;},q(selector){return this.host.querySelector(selector);},click(action){
   const button=buttons.find(b=>b.dataset.waveExampleAction===action);assert.ok(button,'Control exists: '+action);
   const event={target:button,preventDefault(){},stopPropagation(){this.stopped=true;}};button.emit('click',event);if(!event.stopped)this.host.emit('click',event);
  }};
 });
 const root=node();root.querySelectorAll=selector=>selector==='[data-wave-animation]'?views.map(v=>v.placeholder):[];
 return {root,views};
}
function harness(options={}){
 const frames=new Map(),observers=[],errors=[];let now=0,sequence=0;
 const document=events({hidden:!!options.hidden}),media=events({matches:!!options.reduced});
 class IntersectionObserver{
  constructor(callback){this.callback=callback;this.disconnected=false;observers.push(this);}
  observe(host){this.host=host;}
  disconnect(){this.disconnected=true;}
  intersect(visible){this.callback([{target:this.host,isIntersecting:visible,intersectionRatio:visible?1:0}]);}
 }
 const window=events({document,IntersectionObserver,matchMedia:()=>media,innerHeight:900,performance:{now:()=>now},console:{error:(...args)=>errors.push(args)},
  requestAnimationFrame(fn){frames.set(++sequence,fn);return sequence;},cancelAnimationFrame(id){frames.delete(id);}
 });
 vm.runInNewContext(source(),{window,document,AbortController,performance:window.performance,console:window.console});
 const api=window.WaveExampleAnimations;
 const state=()=>JSON.parse(JSON.stringify(api.getState()));
 function frame(milliseconds=40){now+=milliseconds;const pending=[...frames.values()];frames.clear();for(const callback of pending)callback(now);}
 function advance(milliseconds){for(let count=0;count<Math.ceil(milliseconds/40);count++)frame(40);}
 return {window,document,api,frames,observers,errors,state,frame,advance,mount(kinds=['rope','sound','water']){const view=surface(kinds);api.mount(view.root);return view;}};
}
function modelsAndScenes(){
 const h=harness(),api=h.api;assert.deepEqual(Array.from(api.kinds),['rope','sound','water','transverse','longitudinal']);
 const initialScenes=new Set();
 for(const kind of api.kinds){
  initialScenes.add(api.renderScene(kind,2,'audit-'+kind));
  for(const time of [0,.2,.8,1.4,2.5,4,6,12,40]){
   const scene=api.renderScene(kind,time,'audit-'+kind);assert.match(scene,/<svg/);assert.doesNotMatch(scene,/NaN|Infinity|undefined/,'Finite '+kind+' scene at '+time);
  }
  assert.notEqual(api.renderScene(kind,.2,'same'),api.renderScene(kind,2.8,'same'),kind+' must visibly animate, rather than display a static drawing');
 }
 assert.equal(initialScenes.size,5,'Each example has its own physical representation');
 const rope0=api.sample('rope',0),ropeTimes=Array.from({length:80},(_,i)=>api.sample('rope',i*rope0.cycleDuration/80));
 assert.ok(api.sample('rope',1.4).front>api.sample('rope',1).front,'The rope disturbance travels away from its source');
 assert.ok(ropeTimes.some(p=>Math.abs(p.marker.displacement)>1e-4),'The marked rope point actually moves when the pulse passes');
 for(const p of ropeTimes){assert.equal(p.marker.x,p.marker.x0,'The rope marker never rides with the pulse');assert.equal(p.marker.y0,rope0.marker.y0);for(const point of p.points)assert.equal(point.x,point.x0);}
 const sound0=api.sample('sound',0),soundTimes=Array.from({length:80},(_,i)=>api.sample('sound',i*sound0.cycleDuration/80));
 assert.ok(soundTimes.some(p=>p.particles.some(q=>Math.abs(q.displacement)>1e-4)),'Air particles oscillate');
 for(const p of soundTimes){
  assert.deepEqual(p.particles.map(q=>q.x0),sound0.particles.map(q=>q.x0),'Particles keep their own equilibrium positions');
  for(const particle of p.particles){assert.equal(particle.y,particle.y0,'Air displacement is longitudinal in this view');if(!particle.active)assert.ok(Math.abs(particle.displacement)<1e-9,'Air beyond the advancing disturbance remains undisturbed');}
  const rows=new Map();for(const particle of p.particles){if(!rows.has(particle.y0))rows.set(particle.y0,[]);rows.get(particle.y0).push(particle);}
  for(const row of rows.values()){row.sort((a,b)=>a.x0-b.x0);for(let i=1;i<row.length;i++)assert.ok(row[i].x>row[i-1].x,'Air particles do not cross while oscillating');}
 }
 let verifiedDensity=false;
 for(const p of soundTimes){
  const row=p.particles.filter(q=>q.y0===p.particles[0].y0).sort((a,b)=>a.x-b.x);
  const spacingAt=x=>{
   let index=0;for(let i=1;i<row.length;i++)if(Math.abs(row[i].x-x)<Math.abs(row[index].x-x))index=i;
   if(index<2||index>row.length-3||row.slice(index-2,index+3).some(q=>!q.active))return null;
   return (row[index+2].x-row[index-2].x)/4;
  };
  for(const compression of p.compressions)for(const rarefaction of p.rarefactions){
   const dense=spacingAt(compression),sparse=spacingAt(rarefaction);if(dense===null||sparse===null)continue;
   assert.ok(dense<sparse,'The region called compression really has smaller particle spacing than a rarefaction');verifiedDensity=true;
  }
 }
 assert.ok(verifiedDensity,'At least one frame compares visible compression and rarefaction density');
 const water0=api.sample('water',0),before=api.sample('water',water0.impactTime-.01),after=api.sample('water',water0.impactTime+.6),later=api.sample('water',water0.impactTime+.9);
 assert.equal(before.rings.length,0,'Water fronts cannot precede the stone impact');
 assert.ok(after.rings.length>0,'Impact generates circular disturbances');
 assert.ok(later.rings[0].radius>after.rings[0].radius,'The first front expands away from the impact');
 assert.equal(before.float.x,before.float.x0,'The float keeps its horizontal location');
 const beforeFloat=api.sample('water',Math.max(0,water0.float.arrival-.01));assert.ok(Math.abs(beforeFloat.float.displacement)<1e-9,'The float cannot respond before the wave arrives');
 const waterTimes=Array.from({length:80},(_,i)=>api.sample('water',i*water0.cycleDuration/80));
 assert.ok(waterTimes.some(p=>Math.abs(p.float.displacement)>1e-4),'The float responds after the arriving ripple');
 for(const p of waterTimes){assert.equal(p.float.x,p.float.x0,'The float does not drift outward with a ring');for(const ring of p.rings){assert.ok(ring.age>=0);assert.ok(ring.radius>=0);}}
}
function typeWaveModels(){
 const {api}=harness();
 const close=(actual,expected,message,tolerance=1e-9)=>assert.ok(Math.abs(actual-expected)<tolerance,message+' ('+actual+' versus '+expected+')');
 for(const kind of ['transverse','longitudinal']){
  const initial=api.sample(kind,0),frames=Array.from({length:96},(_,i)=>api.sample(kind,i*initial.cycleDuration/96));
  close(initial.speed,initial.frequency*initial.wavelength,kind+' propagation speed agrees with its wavelength and frequency');
  const afterCycle=api.sample(kind,initial.cycleDuration);
  for(let i=0;i<initial.particles.length;i++){
   close(afterCycle.particles[i].x,initial.particles[i].x,kind+' has no material-position jump at the loop');
   close(afterCycle.particles[i].y,initial.particles[i].y,kind+' has no transverse jump at the loop');
  }
  const nearSeam=api.sample(kind,initial.cycleDuration-1e-5),pastSeam=api.sample(kind,initial.cycleDuration+1e-5);
  for(let i=0;i<initial.particles.length;i++){
   close(nearSeam.particles[i].x,pastSeam.particles[i].x,kind+' horizontal movement is continuous at the loop',1e-3);
   close(nearSeam.particles[i].y,pastSeam.particles[i].y,kind+' vertical movement is continuous at the loop',1e-3);
  }
  const dx=initial.particles[1].x0-initial.particles[0].x0,t=.7;
  const first=api.sample(kind,t),next=api.sample(kind,t+dx/initial.speed);
  for(let i=1;i<first.particles.length-2;i++)close(first.particles[i].displacement,next.particles[i+1].displacement,kind+' pattern travels to the right, independently of each material point');
  assert.ok(frames.some(frame=>frame.marker.displacement>1e-3),kind+' marked material point moves in one direction');
  assert.ok(frames.some(frame=>frame.marker.displacement< -1e-3),kind+' marked material point returns in the opposite direction');
  for(const frame of frames){
   assert.deepEqual(frame.particles.map(p=>p.x0),initial.particles.map(p=>p.x0),kind+' equilibrium locations stay fixed');
   for(let i=0;i<frame.particles.length;i++){
    const p=frame.particles[i];
    if(kind==='transverse')assert.equal(p.x,p.x0,'Transverse particles have no horizontal travel with the wave');
    else assert.equal(p.y,p.y0,'Longitudinal particles move only along the propagation direction');
    if(i)assert.ok(p.x>frame.particles[i-1].x,'Material elements never cross in '+kind+' demonstration');
   }
  }
  if(kind==='transverse'){
   for(const frame of frames)assert.equal(frame.marker.x,frame.marker.x0,'The transverse P marker stays at its own horizontal location');
   continue;
  }
  let densityFrames=0;
  const equilibriumSpacing=initial.particles[1].x0-initial.particles[0].x0;
  for(const frame of frames){
   const spacingAt=center=>{
    let index=0;for(let i=1;i<frame.particles.length;i++)if(Math.abs(frame.particles[i].x-center)<Math.abs(frame.particles[index].x-center))index=i;
    return index<2||index>frame.particles.length-3?null:(frame.particles[index+2].x-frame.particles[index-2].x)/4;
   };
   const dense=frame.compressions.map(spacingAt).filter(value=>value!==null),sparse=frame.rarefactions.map(spacingAt).filter(value=>value!==null);
   if(!dense.length||!sparse.length)continue;
   assert.ok(dense.every(value=>value<equilibriumSpacing),'Every labelled compression really has coil spacing below equilibrium');
   assert.ok(sparse.every(value=>value>equilibriumSpacing),'Every labelled rarefaction really has coil spacing above equilibrium');
   assert.ok(Math.max(...dense)<Math.min(...sparse),'Compressions are visibly denser than rarefactions');densityFrames++;
  }
  assert.ok(densityFrames>40,'The longitudinal model supplies verifiable moving compressions throughout its cycle');
 }
}
function independentPlayback(kinds=['rope','sound','water']){
 const h=harness(),view=h.mount(kinds);assert.equal(h.state().length,3);
 for(const item of view.views){
  assert.match(item.placeholder.innerHTML,/data-activity-fullscreen/);
  assert.equal(item.buttons.length,2,'Only playback and restart controls belong to the animation');
  assert.doesNotMatch(item.placeholder.innerHTML,/<input|<select|<audio|<video|puntaje|misión|comprobar respuesta|ganaste/i);
 }
 h.advance(320);assert.ok(h.state().every(p=>p.time>0),'All visible animations advance');
 const rope=view.views[0],beforePause=h.state();rope.click('play');h.advance(240);const paused=h.state();
 assert.equal(paused[0].time,beforePause[0].time);assert.equal(paused[0].playing,false);
 assert.ok(paused[1].time>beforePause[1].time,'Pausing the introduction does not pause the second animation');assert.ok(paused[2].time>beforePause[2].time,'Pausing the introduction does not pause the third animation');
 rope.click('restart');assert.equal(h.state()[0].time,0);assert.equal(h.state()[1].time,paused[1].time,'Restarting rope leaves the other clock untouched');
 if(!h.state()[0].playing)rope.click('play');h.advance(200);assert.ok(h.state()[0].time>0);
 const scene=rope.q('[data-wave-example-scene]').innerHTML;h.advance(200);assert.notEqual(rope.q('[data-wave-example-scene]').innerHTML,scene,'RAF redraws the visible scene');
 h.api.destroy();assert.deepEqual(h.state(),[]);assert.equal(h.frames.size,0);assert.equal(h.document.listenerCount(),0);
 for(const observer of h.observers)assert.equal(observer.disconnected,true);for(const item of view.views)assert.equal(item.host.listenerCount(),0);
 assert.deepEqual(h.errors,[]);
}
function visibilityReducedMotionAndReplacement(kinds=['rope','sound','water']){
 const h=harness(),first=h.mount(kinds);h.advance(200);
 const observer=h.observers.find(o=>o.host===first.views[1].host);assert.ok(observer);observer.intersect(false);
 const offscreen=h.state()[1].time;h.advance(200);assert.equal(h.state()[1].time,offscreen,'An offscreen animation stops independently');
 h.document.hidden=true;h.document.emit('visibilitychange');const hidden=h.state().map(p=>p.time);h.advance(400);assert.deepEqual(h.state().map(p=>p.time),hidden,'The hidden page runs no animation clock');
 h.document.hidden=false;h.document.emit('visibilitychange');h.advance(200);assert.equal(h.state()[1].time,offscreen,'Showing the tab does not wake an offscreen scene');assert.ok(h.state()[0].time>hidden[0]);
 observer.intersect(true);h.advance(160);assert.ok(h.state()[1].time>offscreen);
 const second=h.mount(['water']);assert.equal(h.state().length,1);assert.ok(h.observers.slice(0,3).every(o=>o.disconnected));assert.ok(first.views.every(v=>v.host.listenerCount()===0));
 const before=h.state();first.views[0].click('play');assert.deepEqual(h.state(),before,'Controls detached by a lesson change cannot affect the new lesson');
 h.api.mount(surface([]).root);assert.equal(h.state().length,0);assert.equal(h.frames.size,0,'A lesson without these examples retains no old RAF');assert.equal(h.document.listenerCount(),0);assert.equal(second.views[0].host.listenerCount(),0);
 const reduced=harness({reduced:true}),still=reduced.mount(kinds);assert.ok(reduced.state().every(p=>p.playing===false));assert.equal(reduced.frames.size,0,'Reduced-motion visitors see a meaningful static frame first');
 assert.ok(reduced.state().every(p=>p.time>0),'Initial reduced-motion frames show the phenomenon rather than a blank initial state');
 still.views[2].click('play');reduced.advance(200);assert.ok(reduced.state()[2].playing);assert.ok(reduced.state()[2].time>0);assert.equal(reduced.state()[0].playing,false);reduced.api.destroy();
 const background=harness({hidden:true});background.mount(kinds);background.advance(300);assert.ok(background.state().every(p=>p.time===0));assert.equal(background.frames.size,0);background.api.destroy();h.api.destroy();
}
modelsAndScenes();typeWaveModels();independentPlayback();independentPlayback(['rope','transverse','longitudinal']);visibilityReducedMotionAndReplacement();visibilityReducedMotionAndReplacement(['rope','transverse','longitudinal']);
console.log('PASS: five supported animations, causal rope/sound/water models and both wave-type demonstrations, independent playback, no game or audio controls, fullscreen markers, visibility/reduced-motion behavior and complete cleanup.');
