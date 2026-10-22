'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const root=path.join(__dirname,'..');
function classes(){const s=new Set();return {add:(...xs)=>xs.forEach(x=>s.add(x)),remove:(...xs)=>xs.forEach(x=>s.delete(x)),contains:x=>s.has(x),toggle(x,v){v=v??!s.has(x);v?s.add(x):s.delete(x);return v;}};}
function events(object={}){const handlers=new Map();return Object.assign(object,{handlers,addEventListener(type,fn,opts={}){if(!handlers.has(type))handlers.set(type,new Set());handlers.get(type).add(fn);opts.signal?.addEventListener('abort',()=>handlers.get(type)?.delete(fn),{once:true});},removeEventListener(type,fn){handlers.get(type)?.delete(fn);},emit(type,event={}){for(const fn of [...(handlers.get(type)||[])])fn(event);}});}
function node(dataset={}){const attrs=new Map(),values=new Map();return events({dataset,classList:classes(),style:{setProperty:(k,v)=>values.set(k,v),getPropertyValue:k=>values.get(k)||'',getPropertyPriority:()=>'',removeProperty:k=>values.delete(k)},hidden:false,disabled:false,isConnected:true,clientWidth:700,clientHeight:600,scrollLeft:0,scrollTop:0,textContent:'',innerHTML:'',setAttribute(k,v){attrs.set(k,String(v));},getAttribute:k=>attrs.get(k)||null,removeAttribute:k=>attrs.delete(k),focus(){},getClientRects:()=>[{}],matches(selector){return selector==='[data-biology-heart]'?false:selector===this.selector;},closest(selector){return selector==='[data-bh-action]'&&this.dataset.bhAction?this:null;}});}
function harness(){
 const nodes=new Map(),groups=new Map(),updates=[],timers=new Map();let nextTimer=0,frame=0,intersection;
 const q=selector=>{if(!nodes.has(selector)){const n=node();n.selector=selector;nodes.set(selector,n);}return nodes.get(selector);};
 const makeGroup=(selector,values,key)=>{const items=values.map(v=>node({[key]:v}));groups.set(selector,items);return items;};
 makeGroup('[role="tab"]',['explore','route'],'value');
 makeGroup('[data-bh-action="view"]',['external','internal','section'],'value');
 makeGroup('[data-bh-action="section-type"]',['frontal','right','left','transverse'],'value');
 makeGroup('[data-bh-action="step"]',Array.from({length:8},(_,i)=>String(i)),'value');
 const flowNodes=makeGroup('[data-bh-node]',['body','ra','rv','lungs','la','lv'],'bhNode');
 makeGroup('[data-bh-line]',['body-ra','ra-rv','rv-lungs','lungs-la','la-lv','lv-body'],'bhLine');
 const host=events(node());host.matches=s=>s==='[data-biology-heart]';host.querySelector=q;host.querySelectorAll=s=>groups.get(s)||[];host.dispatchEvent=()=>true;host.contains=()=>true;
 const document=events({hidden:false,activeElement:null,fullscreenElement:null,body:node(),documentElement:node()});
 const spoken=[],synth=events({cancelCount:0,speak(item){spoken.push(item);item.onstart?.();},cancel(){this.cancelCount++;},getVoices:()=>[{lang:'es-PE',name:'Español'}]});
 const window=events({navigator:{},innerWidth:1200,console:{error(){}},speechSynthesis:synth,SpeechSynthesisUtterance:class{constructor(text){this.text=text;}},setTimeout(fn,delay){timers.set(++nextTimer,{fn,delay});return nextTimer;},clearTimeout:id=>timers.delete(id)});
 window.HeartSection={views:{frontal:{label:'Frontal',title:'Frontal',orientation:'Anterior',note:'Esquema'},right:{label:'Derecha',title:'Derecha'},left:{label:'Izquierda',title:'Izquierda'},transverse:{label:'Transversal',title:'Transversal'}},render:()=>'<svg></svg>',update(_,state){updates.push({...state});},animate(){}};
 const context={window,document,AbortController,IntersectionObserver:class{constructor(fn){intersection=fn;}observe(){}disconnect(){}},CustomEvent:class{constructor(type,init){this.type=type;this.detail=init.detail;}},performance:{now:()=>0},requestAnimationFrame:()=>++frame,cancelAnimationFrame(){},setTimeout:window.setTimeout,clearTimeout:window.clearTimeout,console:{info(){},error(){}}};
 vm.runInNewContext(fs.readFileSync(path.join(root,'heart-narration.js'),'utf8'),context);
 let source=fs.readFileSync(path.join(root,'heart-3d.js'),'utf8').replace('global.ChapterInteractions={render,mount,unmount};','global.ChapterInteractions={render,mount,unmount};global.__integration={active:()=>current,draw};');
 vm.runInNewContext(source,context);
 window.ChapterInteractions.mount(host,{saved:{presentation:'section',sectionType:'left'}});
 const a=window.__integration.active();
 // The route also works on devices where 3D has fallen back to the SVG atlas.
 a.fallback=true;
 function click(action,value){const b=q('[data-bh-action="'+action+'"]');b.dataset.bhAction=action;if(value!==undefined)b.dataset.value=value;host.emit('click',{target:b});}
 function change(selector,value){const target=q(selector);if(typeof value==='boolean')target.checked=value;else target.value=value;host.emit('change',{target});}
 function finishStep(){const index=a.step;for(let safety=0;safety<50;safety++){const item=spoken.at(-1);if(!item)throw Error('No current speech');item.onend?.();if(a.step!==index||a.narration.getState().status==='ended')return;}throw Error('Speech did not complete');}
 return {a,q,click,change,window,document,spoken,synth,updates,timers,flowNodes,finishStep,observeVisibility:value=>intersection([{isIntersecting:value}])};
}
function synchronizedRoute(){
 const h=harness();assert.equal(h.spoken.length,0,'Mounting is silent');
 h.click('narration-play');assert.equal(h.a.presentation,'section');assert.equal(h.a.sectionType,'frontal');assert.equal(h.a.tab,'route');assert.equal(h.a.flowMode,'step');assert.equal(h.a.flow,true);
 assert.match(h.spoken.at(-1).text,/Paso 1 de 8/);assert.equal(h.a.step,0);assert.equal(h.q('[data-bh-route-title]').textContent,'La sangre vuelve del cuerpo');
 h.finishStep();assert.equal(h.a.step,1);assert.equal(h.updates.at(-1).step,1);assert.equal(h.updates.at(-1).selectedPart,'right-ventricle');assert.equal(h.updates.at(-1).flow,true);assert.equal(h.flowNodes.find(n=>n.dataset.bhNode==='ra').classList.contains('is-active'),true);
 const cancelled=h.spoken.at(-1);h.click('next');assert.equal(h.a.step,2);assert.match(h.spoken.at(-1).text,/Paso 3 de 8/);const newest=h.spoken.at(-1);cancelled.onend?.();assert.equal(h.spoken.at(-1),newest,'A cancelled prior step cannot advance the next one');
 h.click('narration-play');assert.equal(h.a.narration.getState().status,'paused');assert.equal(h.a.flow,false);const count=h.spoken.length;
 h.click('next');assert.equal(h.a.step,3);assert.equal(h.a.narration.getState().status,'paused');assert.equal(h.spoken.length,count,'Manual navigation while paused stays silent');
 h.click('narration-play');assert.equal(h.a.flow,true);assert.match(h.spoken.at(-1).text,/Paso 4 de 8/);assert.equal(h.updates.at(-1).selectedPart,null,'Pulmonary exchange remains outside the heart');
 h.change('[data-bh-narration-auto]',false);h.finishStep();assert.equal(h.a.step,3);assert.equal(h.a.flow,false);assert.equal(h.a.narration.getState().status,'ended');h.click('next');assert.equal(h.a.step,4);assert.match(h.spoken.at(-1).text,/Paso 5 de 8/);assert.equal(h.a.flow,true,'Manual next narrates the requested next step');
 h.click('narration-repeat');assert.match(h.spoken.at(-1).text,/Paso 5 de 8/);h.change('[data-bh-narration-rate]','0.85');assert.equal(h.spoken.at(-1).rate,.85);
 h.click('narration-stop');assert.equal(h.a.flow,false);assert.equal(h.a.guideEngaged,false);assert.equal(h.a.narration.getState().status,'idle');h.window.ChapterInteractions.unmount();assert.equal(h.timers.size,0);
}
function interruptionLifecycle(){
 for(const leave of [h=>h.click('tab','explore'),h=>h.change('[data-bh-flow-mode]','cycle'),h=>h.click('view','external'),h=>h.click('section-type','right')]){
  const h=harness();h.click('narration-play');const previous=h.spoken.at(-1);leave(h);assert.equal(h.a.narration.getState().status,'idle');assert.equal(h.a.guideEngaged,false);previous.onend?.();assert.equal(h.a.step,0,'A stopped guide cannot advance after another view is selected');h.window.ChapterInteractions.unmount();
 }
 for(const event of ['visibilitychange','pagehide','offscreen']){
  const h=harness();h.click('narration-play');const item=h.spoken.at(-1);if(event==='visibilitychange'){h.document.hidden=true;h.document.emit(event);}else if(event==='offscreen')h.observeVisibility(false);else h.window.emit(event);
  assert.equal(h.a.narration.getState().status,'paused');assert.equal(h.a.flow,false);item.onend?.();assert.equal(h.a.step,0);h.window.ChapterInteractions.unmount();
 }
 const failure=harness();failure.click('narration-play');failure.spoken.at(-1).onerror({error:'network'});assert.equal(failure.a.flow,false,'Speech failure freezes the corresponding animation');assert.equal(failure.a.step,0);assert.equal(failure.a.narration.getState().status,'error');failure.window.ChapterInteractions.unmount();
 const h=harness();h.click('narration-play');const item=h.spoken.at(-1),count=h.spoken.length;h.click('fullscreen');assert.equal(h.a.fullscreenMode,'expanded');assert.equal(h.spoken.length,count);assert.equal(h.a.narration.getState().status,'playing','Fullscreen retains the same ongoing narration');
 h.window.ChapterInteractions.unmount();assert.equal(h.timers.size,0);const step=h.a.step;item.onend?.();assert.equal(h.a.step,step);assert.ok(h.synth.cancelCount>0,'Unmount cancels its own active speech');
}
synchronizedRoute();interruptionLifecycle();
console.log('PASS: spoken heart route follows its highlighted step, pauses flow, handles manual/automatic navigation, cancels stale speech, preserves fullscreen and cleans up on view, page and activity changes.');
