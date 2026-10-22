'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const source=fs.readFileSync(path.join(__dirname,'..','heart-narration.js'),'utf8');
const steps=Array.from({length:8},(_,i)=>({title:'Etapa '+(i+1),text:'La sangre sigue el recorrido. Observa la estructura resaltada.'}));

function harness({supported=true,voices=[{lang:'es-MX',name:'Español'}],settings={}}={}){
  let timerId=0,time=0;const timers=new Map(),events=[],history=[],listeners=new Map();
  const clock={
    setTimeout(fn,delay){const id=++timerId;timers.set(id,{fn,at:time+delay});return id;},
    clearTimeout(id){timers.delete(id);},
    advance(ms){time+=ms;for(const [id,timer] of [...timers])if(timer.at<=time){timers.delete(id);timer.fn();}}
  };
  const engine={current:null,cancels:0,voices,
    speak(item){events.push(['speak',item.text]);history.push(item);this.current=item;},
    cancel(){this.cancels++;const old=this.current;this.current=null;old?.onerror?.({error:'interrupted'});},
    getVoices(){return this.voices;},
    addEventListener(name,fn){listeners.set(name,fn);},removeEventListener(name,fn){if(listeners.get(name)===fn)listeners.delete(name);},
    start(){assert.ok(this.current);this.current.onstart?.();},
    end(){const old=this.current;assert.ok(old);this.current=null;old.onend?.();return old;},
    error(code){assert.ok(this.current);this.current.onerror?.({error:code});}
  };
  const win={...clock,console};if(supported){win.speechSynthesis=engine;win.SpeechSynthesisUtterance=function(text){this.text=text;};}
  vm.runInNewContext(source,{window:win,setTimeout:clock.setTimeout,clearTimeout:clock.clearTimeout},{filename:'heart-narration.js'});
  const states=[],visited=[];let completed=0;
  const api=win.HeartNarration.create({steps,onStep(index){events.push(['step',index]);visited.push(index);},onState:s=>states.push(s),onComplete(){completed++;},...settings});
  const finish=()=>{let count=0;while(engine.current){if(++count>100)throw Error('Narration did not stop');engine.start();engine.end();}};
  return {api,engine,clock,timers,states,visited,events,history,listeners,finish,get completed(){return completed;}};
}

// A user gesture starts the first stage; completed utterances, never elapsed
// animation time, drive the next highlighted stage.
{
 const h=harness();assert.equal(h.api.getState().status,'idle');assert.equal(h.engine.cancels,0);assert.equal(h.history.length,0);
 h.api.play(0);assert.deepEqual(h.events.slice(0,2),[['step',0],['speak','Paso 1 de 8.']]);
 assert.equal(h.api.getState().status,'loading');assert.equal(h.history[0].lang,'es-MX');assert.equal(h.history[0].rate,1);
 h.finish();assert.deepEqual(h.visited,[0,1,2,3,4,5,6,7]);assert.equal(h.completed,1);assert.equal(h.api.getState().status,'ended');assert.equal(h.api.getState().index,7);assert.equal(h.timers.size,0);
 assert.ok(h.history.every(u=>u.text.length<=160));assert.ok(h.history.some(u=>u.text==='Etapa 8.'));
}
// Pause uses cancellation, even on platforms without native pause/resume.
// Late native events cannot finish a phrase or advance a cancelled stage.
{
 const h=harness();h.api.play(2);h.engine.start();h.engine.end();const spoken=h.engine.current;
 h.engine.start();h.api.pause();assert.equal(h.api.getState().status,'paused');assert.equal(h.engine.current,null);assert.equal(h.timers.size,0);
 spoken.onend();spoken.onerror({error:'network'});assert.equal(h.api.getState().status,'paused');assert.deepEqual(h.visited,[2]);
 h.api.resume();assert.equal(h.engine.current.text,spoken.text);assert.deepEqual(h.visited,[2],'Resume retains the stage and its highlight');
 h.api.pause();h.api.goTo(5);assert.equal(h.api.getState().index,5);assert.equal(h.api.getState().status,'paused');assert.equal(h.engine.current,null);
 h.api.resume();assert.equal(h.engine.current.text,'Paso 6 de 8.');
}
// Manual jumps, repeat and speed changes replace only owned speech and retain
// one live session, even if cancel() synchronously emits an error.
{
 const h=harness();h.api.goTo(3);assert.equal(h.api.getState().status,'idle');assert.equal(h.history.length,0);
 h.api.play();const stale=h.engine.current;h.api.goTo(6);assert.equal(h.engine.current.text,'Paso 7 de 8.');stale.onend();assert.equal(h.api.getState().index,6);
 h.engine.start();h.engine.end();const before=h.engine.current;h.api.setRate(.85);assert.equal(h.engine.current.text,before.text);assert.equal(h.engine.current.rate,.85);assert.equal(h.api.getState().index,6);
 before.onend();assert.equal(h.api.getState().index,6);h.api.repeat();assert.equal(h.engine.current.text,'Paso 7 de 8.');
 h.api.stop();assert.equal(h.api.getState().status,'idle');assert.equal(h.engine.current,null);assert.equal(h.timers.size,0);
 const cancels=h.engine.cancels;h.api.stop();h.api.dispose();assert.equal(h.engine.cancels,cancels,'Idle stop/dispose never cancel external speech');
}
{
 const h=harness();h.api.setAutoAdvance(false);h.api.play(1);h.finish();assert.deepEqual(h.visited,[1]);assert.equal(h.completed,0);assert.equal(h.api.getState().status,'ended');assert.equal(h.api.getState().index,1);
 h.api.goTo(7);h.api.play();h.finish();assert.equal(h.completed,1);assert.equal(h.api.getState().index,7);
}
// Voice lists often arrive asynchronously. They affect future phrases without
// replacing a phrase already being spoken or starting speech on their own.
{
 const h=harness({voices:[]});h.api.play(0);assert.equal(h.engine.current.lang,'es-PE');assert.equal(h.engine.current.voice,undefined);
 h.engine.voices=[{lang:'en-US'},{lang:'es-ES'},{lang:'es-PE'}];h.listeners.get('voiceschanged')();assert.equal(h.history.length,1);
 h.engine.start();h.engine.end();assert.equal(h.engine.current.voice.lang,'es-PE');
 h.api.dispose();assert.equal(h.listeners.size,0);assert.equal(h.timers.size,0);assert.equal(h.api.getState().status,'idle');const last=h.history.at(-1);last.onend();assert.equal(h.history.length,2);assert.equal(h.completed,0);
 const idle=harness(),external={text:'Voz de otra actividad'};idle.engine.current=external;idle.api.dispose();assert.equal(idle.engine.cancels,0);assert.equal(idle.engine.current,external);
}
{
 const h=harness();h.api.play();h.engine.error('not-allowed');assert.equal(h.api.getState().status,'error');assert.match(h.api.getState().message,/bloqueó/);assert.deepEqual(h.visited,[0]);assert.equal(h.timers.size,0);
 const old=h.history[0];old.onend();assert.equal(h.api.getState().index,0);assert.equal(h.completed,0);
 h.api.play();h.engine.error('network');assert.match(h.api.getState().message,/conexión/);
 const onlyEnglish=harness({voices:[{lang:'en-US'}]});onlyEnglish.api.play();assert.equal(onlyEnglish.api.getState().status,'error');assert.match(onlyEnglish.api.getState().message,/español/);assert.equal(onlyEnglish.history.length,0);
}
{
 const h=harness({supported:false});assert.equal(h.api.getState().status,'unavailable');h.api.play();h.api.pause();h.api.resume();h.api.repeat();h.api.goTo(4);h.api.stop();h.api.dispose();assert.equal(h.history.length,0);assert.equal(h.engine.cancels,0);
 const missingStart=harness();missingStart.api.play();const stale=missingStart.engine.current;missingStart.clock.advance(8000);assert.equal(missingStart.api.getState().status,'error');assert.match(missingStart.api.getState().message,/iniciar/);assert.equal(missingStart.timers.size,0);stale.onend();assert.deepEqual(missingStart.visited,[0]);
 const missingEnd=harness();missingEnd.api.play();missingEnd.engine.start();missingEnd.clock.advance(45000);assert.equal(missingEnd.api.getState().status,'error');assert.match(missingEnd.api.getState().message,/antes de terminar/);assert.equal(missingEnd.completed,0);assert.equal(missingEnd.timers.size,0);
}
console.log('PASS: Spanish heart narration, eight end-driven steps, short phrases, cancellation-safe pause/resume and manual navigation, repeat/rate controls, delayed voices, errors, watchdogs and cleanup.');
