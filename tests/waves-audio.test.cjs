'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const project=path.join(__dirname,'..');
function events(object={}){
 const handlers=new Map();
 return Object.assign(object,{handlers,addEventListener(type,fn){if(!handlers.has(type))handlers.set(type,new Set());handlers.get(type).add(fn);},removeEventListener(type,fn){handlers.get(type)?.delete(fn);},emit(type,event={}){for(const fn of [...(handlers.get(type)||[])])fn(event);},listenerCount(){return [...handlers.values()].reduce((count,set)=>count+set.size,0);}});
}
function node(selector='',dataset={}){
 const attributes=new Map();
 return events({selector,dataset,disabled:false,checked:true,value:'1',textContent:'',innerHTML:'',setAttribute(key,value){attributes.set(key,String(value));},getAttribute:key=>attributes.get(key)??null,removeAttribute:key=>attributes.delete(key),matches(value){return value===selector;},closest(value){return value==='[data-wa-action]'&&this.dataset.waAction?this:null;}});
}
function lesson(id='intro'){
 return {id,title:'Ondas mecánicas',audioSegments:[{title:'Observa el medio',text:'La perturbación viaja por el medio. Observa cómo oscila cada partícula.'},{title:'Compara la onda',text:'El medio transporta energía. Las partículas no viajan con la onda.'},{title:'Explora y comprueba',text:'Modifica la amplitud y la frecuencia. Identifica qué propiedades cambian.'}]};
}
function harness(options={}){
 const timers=new Map(),styles=new Map(),spoken=[],motion=[],controllers=[];let timerId=0;
 const document=events({hidden:false,getElementById:id=>styles.get(id),createElement:()=>node(),head:{appendChild(item){styles.set(item.id,item);}}});
 const synth=events({current:null,cancelCount:0,speak(item){spoken.push(item);this.current=item;},cancel(){this.cancelCount++;this.current=null;},getVoices:()=>options.voices??[{lang:'es-PE',name:'Español'}]});
 const window=events({document,console:{error(){}},MechanicalWaveLabs:{setPlaying:value=>motion.push(value)},setTimeout(fn,delay){timers.set(++timerId,{fn,delay});return timerId;},clearTimeout:id=>timers.delete(id)});
 if(options.supported!==false){window.speechSynthesis=synth;window.SpeechSynthesisUtterance=class{constructor(text){this.text=text;}};}
 const context={window,document,setTimeout:window.setTimeout,clearTimeout:window.clearTimeout,console:{error(){}}};
 if(options.module!==false){vm.runInNewContext(fs.readFileSync(path.join(project,'heart-narration.js'),'utf8'),context);const engine=window.HeartNarration;window.HeartNarration={create(value){const controller=engine.create(value);controllers.push(controller);return controller;}};}
 vm.runInNewContext(fs.readFileSync(path.join(project,'wave-lesson-audio.js'),'utf8'),context);
 function surface(){
  const nodes=new Map(),parts=[0,1,2].map(index=>node('[data-wa-action="part"]',{waAction:'part',waIndex:String(index)}));
  const q=selector=>{
   if(!nodes.has(selector)){
    const action=/^\[data-wa-action="(.+)"\]$/.exec(selector)?.[1],item=node(selector,action?{waAction:action}:{});
    if(action==='previous')item.disabled=true;
    nodes.set(selector,item);
   }
   return nodes.get(selector);
  };
  const host=node('[data-wave-lesson-audio]');host.querySelector=q;host.querySelectorAll=selector=>selector==='[data-wa-action="part"]'?parts:[];
  const root=node();root.querySelector=selector=>selector==='[data-wave-lesson-audio]'?host:null;
  function click(action,index){host.emit('click',{target:action==='part'?parts[index]:q('[data-wa-action="'+action+'"]')});}
  function change(selector,value){const target=q(selector);if(typeof value==='boolean')target.checked=value;else target.value=value;host.emit('change',{target});}
  return {root,host,q,parts,click,change};
 }
 let view=surface();
 function mount(value=lesson(),replacement=false){if(replacement)view=surface();window.WaveLessonAudio.mount(view.root,{lesson:value});return view;}
 function start(){const item=synth.current;assert.ok(item,'A spoken phrase is queued');item.onstart?.();return item;}
 function finishPhrase(){const item=start();synth.current=null;item.onend?.();return item;}
 function finishPart(){const state=controllers.at(-1).getState(),index=state.index;for(let count=0;count<100;count++){finishPhrase();const next=controllers.at(-1).getState();if(next.index!==index||next.status==='ended'||next.status==='error')return;}throw Error('Part did not finish');}
 function finishAll(){for(let count=0;count<100;count++){const state=controllers.at(-1).getState();if(['ended','error'].includes(state.status))return;finishPhrase();}throw Error('Guide did not finish');}
 mount();
 return {window,document,synth,spoken,motion,controllers,timers,styles,get view(){return view;},mount,start,finishPhrase,finishPart,finishAll,state:()=>controllers.at(-1)?.getState(),destroy:()=>window.WaveLessonAudio.destroy()};
}
function voluntaryAndSynchronized(){
 const h=harness(),v=h.view;
 assert.equal(h.spoken.length,0,'Mount never speaks');assert.deepEqual(h.motion,[],'Mount never changes a running lab');assert.equal(h.synth.cancelCount,0,'Mount does not cancel unrelated speech');
 assert.equal(v.q('[data-wa-action="repeat"]').disabled,true);assert.equal(v.q('[data-wa-action="stop"]').disabled,true);assert.equal(h.styles.size,1);
 v.click('play');assert.equal(h.state().status,'loading');assert.equal(h.spoken.at(-1).lang,'es-PE');assert.deepEqual(h.motion,[],'A loading voice does not animate before speaking');assert.equal(v.q('[data-wa-reading]').getAttribute('aria-live'),'off');assert.equal(v.q('[data-wa-counter]').textContent,'Parte 1 de 3');
 const first=h.start();assert.equal(h.state().status,'playing');assert.equal(h.motion.at(-1),true);assert.equal(v.q('[data-wa-play-label]').textContent,'Pausar audio');assert.equal(v.q('[data-wa-status]').getAttribute('aria-live'),'off','Live announcements do not compete with spoken explanation');
 v.click('play');assert.equal(h.state().status,'paused');assert.equal(h.motion.at(-1),false);assert.equal(v.q('[data-wa-reading]').getAttribute('aria-live'),'polite');const count=h.spoken.length;
 first.onend?.();assert.equal(h.spoken.length,count,'A cancelled speech callback cannot progress');
 v.click('play');h.start();assert.equal(h.state().status,'playing');assert.equal(h.motion.at(-1),true);assert.equal(h.spoken.at(-1).text,first.text,'Resume repeats only the interrupted short phrase');
 h.finishPart();assert.equal(h.state().index,1);assert.match(h.spoken.at(-1).text,/Paso 2 de 3/);assert.equal(v.q('[data-wa-title]').textContent,'Compara la onda');
 h.finishAll();assert.equal(h.state().index,2);assert.equal(h.state().status,'ended');assert.equal(h.motion.at(-1),false);assert.match(v.q('[data-wa-status]').textContent,/Explicación terminada/);assert.equal(h.spoken.filter(item=>/^Paso \d de 3/.test(item.text)).length,4,'Only three parts are visited, with the first phrase resumed once');assert.equal(h.spoken.some(item=>/Paso 4/.test(item.text)),false);
 v.click('play');assert.equal(h.state().index,0,'Replay of the complete guide begins with its first part');h.start();v.click('stop');assert.equal(h.state().status,'idle');assert.equal(h.motion.at(-1),false);const afterStop=h.spoken.length;v.root.emit('wave-lab-playchange',{detail:{source:'user',playing:true}});assert.equal(h.spoken.length,afterStop,'Playing the lab does not restart a stopped guide');
 h.destroy();assert.equal(h.timers.size,0);
}
function manualControlsAndRate(){
 const h=harness(),v=h.view;
 v.click('part',1);assert.equal(h.state().index,1);assert.equal(h.spoken.length,0,'Part selection before starting is silent');assert.deepEqual(h.motion,[]);assert.equal(v.parts[1].getAttribute('aria-current'),'step');
 v.click('play');h.start();v.click('play');const count=h.spoken.length;v.click('part',2);assert.equal(h.state().index,2);assert.equal(h.state().status,'paused');assert.equal(h.spoken.length,count,'Choosing a part while paused remains silent');assert.equal(v.q('[data-wa-action="next"]').disabled,true);
 v.click('play');h.start();assert.match(h.spoken.at(-1).text,/Paso 3 de 3/);
 const previous=h.spoken.at(-1);v.change('[data-wa-rate]','0.85');assert.equal(h.spoken.at(-1).rate,.85);const newest=h.spoken.at(-1);previous.onend?.();assert.equal(h.spoken.at(-1),newest,'Rate changes discard stale phrase callbacks');
 h.start();v.click('repeat');assert.match(h.spoken.at(-1).text,/Paso 3 de 3/);assert.equal(h.spoken.at(-1).rate,.85);
 v.click('previous');assert.equal(h.state().index,1);assert.match(h.spoken.at(-1).text,/Paso 2 de 3/);v.change('[data-wa-auto]',false);h.finishPart();assert.equal(h.state().status,'ended');assert.equal(h.state().index,1,'The automatic option stays within the selected part when disabled');assert.equal(h.motion.at(-1),false);
 v.click('next');assert.equal(h.state().index,2);assert.equal(h.state().status,'loading','Manual next starts the requested part after a completed part');h.destroy();assert.equal(h.timers.size,0);
}
function labAndPageLifecycle(){
 const h=harness(),v=h.view;
 v.root.emit('wave-lab-playchange',{detail:{source:'user',playing:false}});assert.equal(h.spoken.length,0);
 v.click('play');h.start();v.root.emit('wave-lab-playchange',{detail:{source:'program',playing:false}});assert.equal(h.state().status,'playing');
 v.root.emit('wave-lab-playchange',{detail:{kind:'transverse',source:'user',playing:false}});assert.equal(h.state().status,'paused');assert.equal(h.motion.at(-1),false);
 const count=h.spoken.length;v.root.emit('wave-lab-playchange',{detail:{kind:'transverse',source:'user',playing:true}});assert.equal(h.spoken.length,count+1);h.start();assert.equal(h.state().status,'playing');
 for(const action of [()=>{h.document.hidden=true;h.document.emit('visibilitychange');},()=>h.window.emit('pagehide')]){action();assert.equal(h.state().status,'paused');assert.equal(h.motion.at(-1),false);v.click('play');h.start();}
 const oldPhrase=h.synth.current,oldController=h.controllers.at(-1),oldRoot=v.root;const replacement=h.mount(lesson('second'),true);assert.equal(oldController.getState().status,'idle');assert.equal(oldRoot.listenerCount(),0);assert.equal(v.host.listenerCount(),0);assert.equal(v.host.innerHTML,'');assert.equal(h.state().status,'idle');assert.equal(replacement.q('[data-wa-action="repeat"]').disabled,true);assert.equal(h.styles.size,1,'Style is shared across mounted topics');
 const spokenCount=h.spoken.length,motionCount=h.motion.length;oldPhrase.onstart?.();oldPhrase.onend?.();oldPhrase.onerror?.({error:'network'});oldRoot.emit('wave-lab-playchange',{detail:{source:'user',playing:true}});assert.equal(h.spoken.length,spokenCount);assert.equal(h.motion.length,motionCount,'Old callbacks cannot pause or play the replacement lab');
 h.destroy();assert.equal(h.window.listenerCount(),0);assert.equal(h.document.listenerCount(),0);assert.equal(replacement.root.listenerCount(),0);assert.equal(replacement.host.listenerCount(),0);assert.equal(h.synth.listenerCount(),0);assert.equal(h.timers.size,0);
}
function failuresAndReadableFallback(){
 for(const options of [{supported:false},{module:false}]){
  const h=harness(options),v=h.view;assert.equal(v.q('[data-wa-action="play"]').disabled,true);assert.match(v.q('[data-wa-status]').textContent,/navegador/);v.click('part',2);assert.equal(v.q('[data-wa-title]').textContent,'Explora y comprueba');assert.equal(v.q('[data-wa-text]').textContent,lesson().audioSegments[2].text);assert.equal(h.spoken.length,0);assert.deepEqual(h.motion,[]);h.destroy();assert.deepEqual(h.motion,[],'Disposing an unused guide does not alter the lab');
 }
 const foreign=harness({voices:[{lang:'en-US',name:'English'}]});foreign.view.click('play');assert.equal(foreign.state().status,'error');assert.match(foreign.view.q('[data-wa-status]').textContent,/voz en español/);assert.equal(foreign.spoken.length,0);assert.equal(foreign.motion.at(-1),false);foreign.destroy();
 const h=harness(),v=h.view;v.click('play');const phrase=h.start();phrase.onerror({error:'network'});assert.equal(h.state().status,'error');assert.equal(h.motion.at(-1),false);assert.match(v.q('[data-wa-status]').textContent,/conexión/);const count=h.spoken.length;phrase.onend?.();assert.equal(h.spoken.length,count);assert.equal(v.q('[data-wa-play-label]').textContent,'Escuchar explicación');h.destroy();assert.equal(h.timers.size,0);
 const watchdog=harness();watchdog.view.click('play');const timeout=[...watchdog.timers.values()][0];assert.equal(timeout.delay,8000);timeout.fn();assert.equal(watchdog.state().status,'error');assert.match(watchdog.view.q('[data-wa-status]').textContent,/iniciar la voz/);watchdog.destroy();
}
function escapedContent(){
 const h=harness(),unsafe=lesson('" onmouseover="alert(1)');unsafe.title='<img src=x onerror=alert(1)>';unsafe.audioSegments[0]={title:'<b>Escucha</b>',text:'<img src=x onerror=alert(1)> & observa.'};const v=h.mount(unsafe);
 assert.equal(v.host.innerHTML.includes('<img'),false);assert.ok(v.host.innerHTML.includes('&lt;img'));assert.ok(v.host.innerHTML.includes('&quot; onmouseover=&quot;'));v.click('part',0);assert.equal(v.q('[data-wa-title]').textContent,unsafe.audioSegments[0].title);assert.equal(v.q('[data-wa-text]').textContent,unsafe.audioSegments[0].text);h.destroy();
 h.window.WaveLessonAudio.mount(v.root,{lesson:{id:'empty',audioSegments:[]}});assert.equal(v.host.innerHTML,'');assert.equal(h.timers.size,0);
}
voluntaryAndSynchronized();manualControlsAndRate();labAndPageLifecycle();failuresAndReadableFallback();escapedContent();
console.log('PASS: waves narration is voluntary, follows only the current three-part lesson, coordinates lab pause/resume, keeps readable fallbacks, and releases speech and listeners on replacement.');
