'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const source=fs.readFileSync(path.join(__dirname,'..','heart-recorded-narration.js'),'utf8');
const steps=Array.from({length:8},(_,i)=>({title:'Etapa '+(i+1),text:'Explicación '+(i+1),audioSrc:'assets/heart-audio/paso-0'+(i+1)+'.mp3'}));
class FakeAudio{
 constructor(){this.events=new Map();this.currentTime=0;this.currentSrc='';this.paused=true;this.ended=false;this.error=null;this.playbackRate=1;this.preservesPitch=false;this.playCalls=0;this.pauseCalls=0;this.loadCalls=0;this.pending=[];this._src='';}
 set src(value){this._src=value;this.currentSrc=value;this.currentTime=0;this.ended=false;this.error=null;}
 get src(){return this._src;}
 addEventListener(name,fn){if(!this.events.has(name))this.events.set(name,new Set());this.events.get(name).add(fn);}
 removeEventListener(name,fn){this.events.get(name)?.delete(fn);}
 play(){this.playCalls++;return new Promise((resolve,reject)=>this.pending.push({resolve,reject}));}
 pause(){this.pauseCalls++;this.paused=true;}
 load(){this.loadCalls++;if(!this.src)this.currentSrc='';}
 removeAttribute(name){if(name==='src')this.src='';}
 emit(name){for(const fn of [...this.events.get(name)||[]])fn({type:name});}
 playing(){this.paused=false;this.pending.shift()?.resolve();this.emit('playing');}
 end(){this.currentTime=20;this.ended=true;this.paused=true;this.emit('ended');}
 fail(code=2){this.error={code};this.emit('error');}
}
function harness(override={}){
 const audio=new FakeAudio(),events=[],states=[],context={window:{console:{error(){}}}};let factories=0;
 vm.runInNewContext(source,context,{filename:'heart-recorded-narration.js'});
 const api=context.window.HeartRecordedNarration.create({steps,audioFactory:()=>{factories++;return audio;},onStep:index=>events.push({type:'step',index,playCalls:audio.playCalls}),onState:state=>states.push(state),onComplete:()=>events.push({type:'complete'}),...override});
 return {audio,api,events,states,get factories(){return factories;}};
}
const tick=async()=>{await Promise.resolve();await Promise.resolve();};
async function test(){
 const h=harness();assert.equal(h.audio.playCalls,0);assert.equal(h.audio.src,'');assert.equal(h.audio.loadCalls,0);assert.equal(h.api.getState().status,'idle');assert.equal(h.factories,1);
 h.api.play();assert.equal(h.events[0].type,'step');assert.equal(h.events[0].playCalls,0,'Highlight must precede the audio request');assert.equal(h.api.getState().status,'loading');
 for(let i=0;i<8;i++){
  assert.equal(h.api.getState().index,i);assert.equal(h.audio.src,steps[i].audioSrc);h.audio.playing();assert.equal(h.api.getState().status,'playing');
  if(i===0){h.audio.emit('waiting');assert.equal(h.api.getState().status,'loading');h.audio.playing();assert.equal(h.api.getState().status,'playing');h.audio.emit('ended');assert.equal(h.api.getState().index,0,'An unrelated ended event cannot complete a playing resource');}
  h.audio.end();
 }
 assert.equal(h.api.getState().status,'ended');assert.deepEqual(h.events.filter(e=>e.type==='step').map(e=>e.index),[0,1,2,3,4,5,6,7]);assert.equal(h.events.filter(e=>e.type==='complete').length,1);assert.equal(h.audio.playCalls,8);assert.equal(h.factories,1,'One element retains the user-activated media session across steps');

 const pause=harness();pause.api.play(2);pause.audio.playing();pause.audio.currentTime=7.125;const lateEnded=[...pause.audio.events.get('ended')];pause.api.pause();assert.equal(pause.api.getState().status,'paused');assert.equal(pause.audio.currentTime,7.125);pause.audio.ended=true;lateEnded[0]();assert.equal(pause.api.getState().index,2);pause.audio.ended=false;
 pause.api.resume();assert.equal(pause.audio.currentTime,7.125,'Resume must preserve the exact media position');pause.audio.playing();assert.equal(pause.events.filter(e=>e.type==='step').length,1,'Resume must not reset the highlighted animation');
 const beforeRate=pause.audio.playCalls;pause.api.setRate(.85);assert.equal(pause.audio.playbackRate,.85);assert.equal(pause.audio.currentTime,7.125);assert.equal(pause.audio.playCalls,beforeRate);assert.equal(pause.audio.preservesPitch,true);pause.api.setRate(1.15);assert.equal(pause.audio.playbackRate,1.15);
 pause.api.repeat();assert.equal(pause.audio.currentTime,0);assert.equal(pause.api.getState().index,2);assert.equal(pause.audio.playCalls,beforeRate+1);
 pause.audio.playing();pause.api.goTo(4);assert.equal(pause.api.getState().index,4);assert.equal(pause.audio.src,steps[4].audioSrc);pause.api.pause();const beforeGo=pause.audio.playCalls;pause.api.goTo(6);assert.equal(pause.api.getState().status,'paused');assert.equal(pause.audio.playCalls,beforeGo);assert.equal(pause.audio.currentTime,0);pause.api.resume();assert.equal(pause.events.at(-1).index,6);assert.equal(pause.audio.playCalls,beforeGo+1);
 pause.api.stop();assert.equal(pause.audio.currentTime,0);assert.equal(pause.api.getState().status,'idle');const beforeIdle=pause.audio.playCalls;pause.api.goTo(1);assert.equal(pause.audio.playCalls,beforeIdle);assert.equal(pause.api.getState().index,1);

 const manual=harness();manual.api.setAutoAdvance(false);manual.api.play(3);manual.audio.playing();manual.audio.end();assert.equal(manual.api.getState().index,3);assert.equal(manual.api.getState().status,'ended');assert.equal(manual.audio.playCalls,1);
 const stale=harness();stale.api.play(0);const oldError=[...stale.audio.events.get('error')],oldEnd=[...stale.audio.events.get('ended')],rejected=stale.audio.pending[0];stale.api.goTo(5);oldError[0]();oldEnd[0]();rejected.reject(new Error('old download'));await tick();assert.equal(stale.api.getState().index,5);assert.equal(stale.api.getState().status,'loading');stale.audio.currentSrc=steps[0].audioSrc;stale.audio.ended=true;stale.audio.emit('ended');assert.equal(stale.api.getState().index,5,'A prior source cannot finish the newly selected step');stale.audio.currentSrc=steps[5].audioSrc;stale.audio.ended=false;
 stale.audio.fail(2);assert.equal(stale.api.getState().status,'error');assert.match(stale.api.getState().message,/conexión/);assert.equal(stale.api.getState().index,5);
 const denied=harness();denied.api.play(0);denied.audio.pending[0].reject(Object.assign(new Error('blocked'),{name:'NotAllowedError'}));await tick();assert.equal(denied.api.getState().status,'error');assert.match(denied.api.getState().message,/bloqueó/);assert.equal(denied.api.getState().index,0);
 const pendingPause=harness();pendingPause.api.play(0);const latePlaying=[...pendingPause.audio.events.get('playing')],pausedPromise=pendingPause.audio.pending[0];pendingPause.audio.currentTime=2.375;pendingPause.api.pause();pausedPromise.resolve();latePlaying[0]();await tick();assert.equal(pendingPause.api.getState().status,'paused');assert.equal(pendingPause.audio.currentTime,2.375);assert.equal(pendingPause.audio.playCalls,1);
 const network=harness();network.api.play(4);network.audio.currentSrc=steps[0].audioSrc;network.audio.pending[0].reject(Object.assign(new Error('download failed'),{name:'NetworkError'}));await tick();assert.equal(network.api.getState().status,'error');assert.match(network.api.getState().message,/conexión/);assert.equal(network.api.getState().index,4,'A failed request cannot count as a completed stage');
 const missing=harness({steps:[{title:'Sin archivo',text:'Texto'}]});missing.api.play();assert.equal(missing.api.getState().status,'error');assert.match(missing.api.getState().message,/todavía no está disponible/);assert.equal(missing.audio.playCalls,0);assert.equal(missing.events.length,0);
 const unsupported=harness({audioFactory:()=>null});assert.equal(unsupported.api.getState().status,'unavailable');unsupported.api.play();assert.equal(unsupported.events.length,0);
 const disposed=harness();disposed.api.play(1);const late=[...disposed.audio.events.get('ended')],pending=disposed.audio.pending[0],count=disposed.states.length;disposed.api.dispose();assert.equal(disposed.audio.src,'');assert.equal(disposed.audio.loadCalls,1);assert.ok([...disposed.audio.events.values()].every(set=>set.size===0));late[0]();pending.reject(new Error('late failure'));disposed.api.play(4);await tick();assert.equal(disposed.states.length,count);assert.equal(disposed.audio.playCalls,1);assert.equal(disposed.api.getState().status,'idle');
 console.log('PASS: recorded Spanish heart audio uses real media completion, exact pause/resume, safe manual navigation, pitch-preserving rate changes, eight end-driven steps, errors and complete cleanup.');
}
test().catch(error=>{console.error(error);process.exitCode=1;});
