'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const project=path.join(__dirname,'..'),engine=require('../mechanical-wave-engine.js');
const source=fs.readFileSync(path.join(project,'mechanical-wave-labs.js'),'utf8');
function events(object={}){
 const listeners=new Map();
 return Object.assign(object,{addEventListener(type,fn,options={}){if(options.signal?.aborted)return;if(!listeners.has(type))listeners.set(type,new Set());listeners.get(type).add(fn);options.signal?.addEventListener('abort',()=>listeners.get(type)?.delete(fn),{once:true});},emit(type,event={}){for(const fn of [...(listeners.get(type)||[])])fn(event);},listenerCount(){return [...listeners.values()].reduce((sum,set)=>sum+set.size,0);}});
}
function attributes(text){const result={};for(const match of text.matchAll(/([\w-]+)(?:="([^"]*)")?/g))result[match[1]]=match[2]??'';return result;}
function node(attrs={},tag='div'){
 const result=events({attrs:{...attrs},tagName:tag.toUpperCase(),dataset:{},textContent:'',innerHTML:'',hidden:false,isConnected:true,checked:Object.hasOwn(attrs,'checked'),value:attrs.value??'',type:attrs.type??'',setAttribute(key,value){this.attrs[key]=String(value);},getAttribute(key){return this.attrs[key]??null;},matches(selector){return selector==='[data-wave-param]'&&this.dataset.waveParam!==undefined;},closest(selector){if(selector==='button')return tag==='button'?this:null;if(selector==='.wave-control')return this.control;return null;},dispatchEvent(event){this.emit(event.type,event);return true;}});
 for(const [key,value] of Object.entries(attrs))if(key.startsWith('data-'))result.dataset[key.slice(5).replace(/-([a-z])/g,(_,letter)=>letter.toUpperCase())]=value;
 return result;
}
function surface(kind){
 const placeholder=node({'data-wave-lab':kind}),parts=new Map(),buttons=[],inputs=[];let html='';
 Object.defineProperty(placeholder,'innerHTML',{get:()=>html,set(value){
  html=value;const section=node(attributes(/<section\s+([^>]+)>/.exec(value)[1]));placeholder.firstElementChild=section;
  for(const match of value.matchAll(/<button\s+([^>]+)>([\s\S]*?)<\/button>/g)){const button=node(attributes(match[1]),'button');button.textContent=match[2];buttons.push(button);}
  for(const match of value.matchAll(/<input\s+([^>]+)>/g)){const input=node(attributes(match[1]),'input');input.control=node();inputs.push(input);}
  section.querySelector=selector=>{
   let match;if((match=/^\[data-wave-action="(.+)"\]$/.exec(selector)))return buttons.find(b=>b.dataset.waveAction===match[1])??null;
   if((match=/^\[data-wave-param="(.+)"\]$/.exec(selector)))return inputs.find(input=>input.dataset.waveParam===match[1])??null;
   if(!parts.has(selector))parts.set(selector,node());return parts.get(selector);
  };
  section.querySelectorAll=selector=>{const match=/^\[data-wave-choice="(.+)"\]$/.exec(selector);return match?buttons.filter(b=>b.dataset.waveChoice===match[1]):[];};
 }});
 const root=node();root.querySelectorAll=selector=>selector==='[data-wave-lab]'?[placeholder]:[];
 const q=selector=>placeholder.firstElementChild.querySelector(selector);
 return {root,placeholder,parts,buttons,inputs,q,get host(){return placeholder.firstElementChild;},click(action){const button=buttons.find(b=>b.dataset.waveAction===action);assert.ok(button,'Button exists: '+action);this.host.emit('click',{target:button});},choice(name,value){const button=buttons.find(b=>b.dataset.waveChoice===name&&b.dataset.value===String(value));assert.ok(button,'Choice exists: '+name+'='+value);this.host.emit('click',{target:button});},input(name,value){const input=inputs.find(n=>n.dataset.waveParam===name);assert.ok(input,'Input exists: '+name);if(input.type==='checkbox')input.checked=value;else input.value=String(value);this.host.emit('input',{target:input});}};
}
function harness(options={}){
 const frames=new Map(),observers=[],errors=[],contexts=[];let nextFrame=0,now=0;
 const document=events({hidden:!!options.hidden});
 class IntersectionObserver{constructor(callback){this.callback=callback;this.disconnected=false;observers.push(this);}observe(host){this.host=host;}disconnect(){this.disconnected=true;}intersect(visible){this.callback([{isIntersecting:visible}]);}}
 class AudioContext{constructor(){this.currentTime=0;this.closed=false;this.stopped=false;this.destination={};contexts.push(this);}resume(){return Promise.resolve();}close(){this.closed=true;return Promise.resolve();}createOscillator(){const self=this;return {type:'',frequency:{value:0,setValueAtTime(value){this.value=value;}},connect(){},start(){},stop(){self.stopped=true;},disconnect(){}};}createGain(){return {gain:{value:0},connect(){},disconnect(){}};}}
 const window={document,MechanicalWaveEngine:engine,IntersectionObserver,AudioContext,console:{error:error=>errors.push(error)},matchMedia:()=>({matches:!!options.reduced}),requestAnimationFrame(fn){frames.set(++nextFrame,fn);return nextFrame;},cancelAnimationFrame(id){frames.delete(id);}};
 const context={window,document,AbortController,CustomEvent:class{constructor(type,value){this.type=type;Object.assign(this,value);}}};
 vm.runInNewContext(source.replace('global.MechanicalWaveLabs=Object.freeze','global.__wavesAudit={scene,readouts,DESCRIPTIONS,endTime};global.MechanicalWaveLabs=Object.freeze'),context);
 function frame(milliseconds=40){now+=milliseconds;const work=[...frames.values()];frames.clear();for(const callback of work)callback(now);}
 function advance(milliseconds){for(let count=0;count<Math.ceil(milliseconds/40);count++)frame(40);}
 const api=window.MechanicalWaveLabs;
 return {window,document,api,frames,observers,contexts,errors,frame,advance,audit:window.__wavesAudit,state:()=>JSON.parse(JSON.stringify(api.getState())),mount(kind){const view=surface(kind);api.mount(view.root);return view;}};
}
function playbackAndParameters(){
 const h=harness(),v=h.mount('parameters');
 assert.match(v.placeholder.innerHTML,/id="wave-lab-parameters"/);assert.match(v.placeholder.innerHTML,/data-activity-fullscreen/);
 assert.equal(h.state()[0].time,0);h.advance(240);const running=h.state()[0].time;assert.ok(running>.15,'The actual RAF loop advances time');assert.notEqual(v.q('[data-wave-time]').textContent,'0 s','The visible clock follows simulation time');
 v.click('play');assert.equal(h.state()[0].playing,false);h.advance(400);assert.equal(h.state()[0].time,running,'User pause freezes both clock and physics');
 v.input('lambda',3);v.input('f',1.2);assert.match(v.q('[data-wave-readouts]').innerHTML,/3[,.]6 m\/s/,'Readout recomputes v=λf from the controls');
 const wave=v.q('[data-wave-scene]').innerHTML;v.click('step');assert.ok(h.state()[0].time>running);assert.notEqual(v.q('[data-wave-scene]').innerHTML,wave,'One step computes a different wave snapshot');assert.equal(h.state()[0].playing,false);
 v.click('reset');assert.equal(h.state()[0].time,0);assert.equal(h.state()[0].parameters.lambda,3,'Reset keeps the experiment conditions for a fair comparison');assert.equal(h.state()[0].playing,false);
 h.api.setPlaying(true);h.advance(160);assert.ok(h.state()[0].time>0,'Narration can resume the lab through the public API');h.api.setPlaying(false);const paused=h.state()[0].time;h.advance(160);assert.equal(h.state()[0].time,paused);
 h.api.destroy();assert.equal(h.frames.size,0);assert.equal(v.host.listenerCount(),0);assert.equal(h.document.listenerCount(),0);assert.equal(h.observers[0].disconnected,true);assert.deepEqual(h.state(),[]);assert.deepEqual(h.errors,[]);
 const restored=h.mount('parameters');assert.equal(h.state()[0].parameters.lambda,3);assert.equal(h.state()[0].time,paused,'Returning from full screen or a lesson preserves the experiment state');restored.click('reset');h.api.destroy();
}
function lifecycleAndReducedMotion(){
 const background=harness({hidden:true});background.mount('parameters');background.advance(400);assert.equal(background.state()[0].time,0,'A lab mounted in a background tab remains frozen');assert.equal(background.frames.size,0);background.api.destroy();
 const h=harness({reduced:true}),old=h.mount('reflection');assert.equal(h.state()[0].playing,false);assert.equal(h.frames.size,0,'Reduced motion begins with a static, explorable diagram');
 old.click('step');assert.equal(h.state()[0].time,.1);old.choice('boundary','free');assert.equal(h.state()[0].time,0,'Changing the boundary restarts before collision');assert.equal(h.state()[0].parameters.boundary,'free');
 old.click('play');h.advance(160);assert.ok(h.state()[0].time>0);const observer=h.observers[0];observer.intersect(false);const frozen=h.state()[0].time;h.advance(400);assert.equal(h.state()[0].time,frozen,'Offscreen labs stop computing');
 h.document.hidden=true;h.document.emit('visibilitychange');h.document.hidden=false;h.document.emit('visibilitychange');h.advance(160);assert.equal(h.state()[0].time,frozen,'Tab visibility does not wake an offscreen lab');
 observer.intersect(true);h.advance(160);assert.ok(h.state()[0].time>frozen);h.document.hidden=true;h.document.emit('visibilitychange');const hidden=h.state()[0].time;h.advance(160);assert.equal(h.state()[0].time,hidden);
 const replacement=h.mount('doppler');assert.equal(observer.disconnected,true);assert.equal(old.host.listenerCount(),0);assert.equal(h.document.listenerCount(),1,'Only the current activity retains a visibility listener');
 const before=h.state();old.click('play');old.input('speed',2.2);assert.deepEqual(h.state(),before,'Detached controls cannot alter the replacement lab');replacement.input('sourceVelocity',-100);assert.equal(h.state()[0].parameters.sourceVelocity,-100);h.api.destroy();assert.equal(h.document.listenerCount(),0);
}
async function optionalToneAndCleanup(){
 const h=harness(),v=h.mount('sound');assert.equal(h.contexts.length,0,'Mount never starts a tone');v.click('tone');await new Promise(resolve=>setImmediate(resolve));assert.equal(h.contexts.length,1);assert.equal(v.q('[data-wave-action="tone"]').getAttribute('aria-pressed'),'true');
 h.observers[0].intersect(false);assert.equal(h.contexts[0].closed,true);assert.equal(h.contexts[0].stopped,true,'Leaving the viewport stops and releases the tone');
 h.observers[0].intersect(true);v.click('tone');await new Promise(resolve=>setImmediate(resolve));const context=h.contexts.at(-1);h.api.destroy();assert.equal(context.closed,true);assert.equal(context.stopped,true);assert.equal(v.host.listenerCount(),0);assert.equal(h.frames.size,0);
}
function allKindsAndControlExtremes(){
 const h=harness();assert.equal(h.api.kinds.length,11);const initialScenes=new Set();
 for(const kind of h.api.kinds){const v=h.mount(kind);initialScenes.add(v.q('[data-wave-scene]').innerHTML.replaceAll(/wave-[\w-]+-\d+/g,'id'));for(const position of ['min','max']){for(const input of v.inputs)if(input.type==='range')v.input(input.dataset.waveParam,Number(input.attrs[position]));v.click('step');assert.doesNotMatch(v.q('[data-wave-scene]').innerHTML,/NaN|Infinity|undefined/,'Finite scene at '+kind+' '+position);assert.doesNotMatch(v.q('[data-wave-readouts]').innerHTML,/NaN|Infinity|undefined/,'Finite measurements at '+kind+' '+position);}}
 assert.equal(initialScenes.size,11,'Every topic has its own visual model');assert.deepEqual(h.errors,[]);h.api.destroy();
}
function geometry(){
 const h=harness(),audit=h.audit;
 const snapshot=(kind,p={},t=.1)=>audit.scene({kind,id:'audit-'+kind,p:{...audit.DESCRIPTIONS[kind].defaults,...p},t});
 function segments(svg,color,width){const result=[];for(const match of svg.matchAll(/<path\s+([^>]+)\/>/g)){const a=attributes(match[1]),coords=/^M([-\d.e]+) ([-\d.e]+)L([-\d.e]+) ([-\d.e]+)$/.exec(a.d);if(a.stroke===color&&Number(a['stroke-width'])===width&&coords){const values=coords.slice(1).map(Number);result.push({x:(values[0]+values[2])/2,y:(values[1]+values[3])/2,a});}}return result;}
 for(const mode of ['reflection','refraction']){
  const early=segments(snapshot('wavefronts',{mode,angle:65},.1),'#8dbdff',2.5),later=segments(snapshot('wavefronts',{mode,angle:65},.6),'#8dbdff',2.5);
  assert.ok(Math.hypot(360-later[0].x,190-later[0].y)<Math.hypot(360-early[0].x,190-early[0].y),'Incident fronts move toward the interface in '+mode);assert.match(early[0].a['clip-path'],/-upper\)/,'Incident front remains in its original medium');
 }
 const refracted=snapshot('wavefronts',{mode:'refraction',angle:35,v2:1.2},.3),inc=segments(refracted,'#8dbdff',2.5),out=segments(refracted,'#53dfc6',2.5);
 const gap=(first,second)=>Math.hypot(first.x-second.x,first.y-second.y);assert.ok(Math.abs(gap(out[0],out[1])/gap(inc[0],inc[1])-.6)<1e-9,'At fixed frequency λ₂/λ₁ equals v₂/v₁');assert.match(out[0].a['clip-path'],/-lower\)/,'Transmitted front remains in medium2');
 const d1=snapshot('wavefronts',{mode:'diffraction',aperture:1},.1),d2=snapshot('wavefronts',{mode:'diffraction',aperture:1},.6),first=segments(d1,'#8dbdff',3),second=segments(d2,'#8dbdff',3);
 assert.ok(second[0].x>first[0].x,'Incident fronts approach the slit');const incidentLambda=Math.abs(first[0].x-first[1].x),radii=[...d1.matchAll(/A([-\d.e]+) [-\d.e]+ 0 0 1/g)].map(m=>Number(m[1]));assert.ok(Math.abs((radii[1]-radii[0])-incidentLambda)<1e-9,'Diffraction in one medium preserves wavelength');
 const barriers=[...d1.matchAll(/<rect\s+([^>]+)\/>/g)].map(m=>attributes(m[1])).filter(a=>a.x==='324');const opening=Number(barriers[1].y)-(Number(barriers[0].y)+Number(barriers[0].height));assert.ok(Math.abs(opening-incidentLambda)<1e-9,'The a/λ=1 slit actually has width one wavelength');
 for(const sourceVelocity of [-100,0,100]){const time=2,svg=snapshot('doppler',{sourceVelocity},time),sourceX=260+sourceVelocity/340*90*time,circles=[...svg.matchAll(/<circle\s+([^>]+)\/>/g)].map(m=>attributes(m[1])).filter(a=>a.stroke==='#53dfc6');assert.ok(circles.length>=2);for(const circle of circles)assert.ok(Math.abs(sourceX-Number(circle.cx)-sourceVelocity/340*Number(circle.r))<1e-8,'Doppler fronts keep their historical emission center for vs='+sourceVelocity);}
}
(async()=>{playbackAndParameters();lifecycleAndReducedMotion();await optionalToneAndCleanup();allKindsAndControlExtremes();geometry();console.log('PASS: eleven wave labs run and pause, retain parameters, release audio/listeners/RAF, respect offscreen/reduced motion, and preserve wavefront direction, wavelength and Doppler emission centers.');})().catch(error=>{console.error(error);process.exitCode=1;});
