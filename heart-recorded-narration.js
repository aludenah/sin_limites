(function(global){
  'use strict';

  const RATES=[.85,1,1.15];

  function create(options={}){
    const steps=(Array.isArray(options.steps)?options.steps:[]).map(step=>({title:String(step?.title||''),text:String(step?.text||''),audioSrc:String(step?.audioSrc||'').trim()}));
    let audio=null;
    try{audio=typeof options.audioFactory==='function'?options.audioFactory():typeof global.Audio==='function'?new global.Audio():null;}catch{}
    const supported=Boolean(steps.length&&audio&&typeof audio.play==='function'&&typeof audio.pause==='function'&&typeof audio.addEventListener==='function'&&typeof audio.removeEventListener==='function');
    let disposed=false,session=0,listeners=[],expectedSrc='',intent=false,notifyStepOnResume=false;
    const state={status:supported?'idle':'unavailable',index:0,rate:1,autoAdvance:true,supported,message:supported?'Audio listo. Pulsa Escuchar recorrido para empezar.':'Este navegador no puede reproducir los audios. Puedes seguir los pasos en pantalla.'};
    if(audio)audio.preload='none';
    const getState=()=>({...state});
    const callback=(name,...args)=>{try{options[name]?.(...args);}catch(error){global.console?.error?.('No se pudo actualizar la guía de audio.',error);}};
    function emit(status,message){if(disposed)return;if(status)state.status=status;if(message)state.message=message;callback('onState',getState());}
    const clamp=value=>Math.max(0,Math.min(steps.length-1,Number.isFinite(Number(value))?Math.trunc(Number(value)):0));
    function detach(){for(const [name,fn] of listeners)audio?.removeEventListener(name,fn);listeners=[];}
    function invalidate(){session++;intent=false;detach();try{audio?.pause();}catch{}}
    function resetTime(){try{audio.currentTime=0;}catch{}}
    function fail(message){invalidate();emit('error',message);}
    function sourceMatches(){return !audio?.currentSrc||audio.currentSrc===expectedSrc;}
    function pendingAttempt(id){return !disposed&&id===session&&intent&&['loading','playing'].includes(state.status);}
    function current(id){return pendingAttempt(id)&&sourceMatches();}
    function applyRate(){
      audio.playbackRate=state.rate;
      if('preservesPitch' in audio)audio.preservesPitch=true;
      if('webkitPreservesPitch' in audio)audio.webkitPreservesPitch=true;
    }
    function mediaMessage(){
      const code=audio?.error?.code;
      if(code===2)return 'No se pudo descargar el audio. Comprueba tu conexión y vuelve a intentarlo.';
      if(code===3||code===4)return 'No se pudo reproducir este archivo de audio. Puedes continuar con el texto de este paso.';
      return 'El audio se interrumpió. Pulsa Escuchar recorrido para volver a intentarlo.';
    }
    function prepareSource(index){
      const src=steps[index]?.audioSrc;
      if(!src){fail('El audio de este paso todavía no está disponible. Puedes seguir su explicación en pantalla.');return false;}
      try{audio.preload='auto';audio.src=src;expectedSrc=audio.src;resetTime();applyRate();return true;}
      catch{fail('No se pudo preparar el audio de este paso. Puedes continuar con su explicación en pantalla.');return false;}
    }
    function attachAndPlay(id){
      if(disposed||id!==session||!supported)return;
      intent=true;
      const bind=(name,fn)=>{audio.addEventListener(name,fn);listeners.push([name,fn]);};
      bind('playing',()=>{if(current(id))emit('playing','Escuchando el paso '+(state.index+1)+' de '+steps.length+'.');});
      bind('waiting',()=>{if(current(id))emit('loading','Cargando audio del paso '+(state.index+1)+' de '+steps.length+'.');});
      bind('error',()=>{if(current(id)&&audio.error)fail(mediaMessage());});
      bind('ended',()=>{
        if(!current(id)||audio.ended!==true)return;
        intent=false;detach();
        if(state.index===steps.length-1){emit('ended','Recorrido finalizado. Puedes volver a escucharlo o elegir cualquier paso.');if(!disposed&&id===session)callback('onComplete');}
        else if(state.autoAdvance)startStep(state.index+1);
        else emit('ended','Paso '+(state.index+1)+' terminado. Puedes repetirlo o continuar al siguiente.');
      });
      try{
        const pending=audio.play();
        if(pending&&typeof pending.catch==='function')pending.catch(error=>{
          if(!pendingAttempt(id))return;
          fail(error?.name==='NotAllowedError'?'El navegador bloqueó el audio. Pulsa Escuchar recorrido para volver a intentarlo.':'No se pudo iniciar el audio. Comprueba tu conexión y vuelve a intentarlo.');
        });
      }catch{if(pendingAttempt(id))fail('No se pudo iniciar el audio. Pulsa Escuchar recorrido para volver a intentarlo.');}
    }
    function startStep(index){
      if(disposed||!supported)return;
      invalidate();state.index=clamp(index);notifyStepOnResume=false;
      if(!prepareSource(state.index))return;
      const id=session;emit('loading','Preparando audio del paso '+(state.index+1)+' de '+steps.length+'.');
      if(disposed||id!==session||state.status!=='loading')return;
      callback('onStep',state.index);
      if(!disposed&&id===session&&state.status==='loading')attachAndPlay(id);
    }
    function play(index=state.index){startStep(index);}
    function pause(){if(disposed||!['loading','playing'].includes(state.status))return;invalidate();emit('paused','Audio en pausa. Pulsa Continuar audio para seguir.');}
    function resume(){
      if(disposed||!supported||state.status!=='paused')return;
      const id=session;emit('loading','Preparando audio del paso '+(state.index+1)+' de '+steps.length+'.');
      if(disposed||id!==session||state.status!=='loading')return;
      if(notifyStepOnResume){notifyStepOnResume=false;callback('onStep',state.index);}
      if(!disposed&&id===session&&state.status==='loading')attachAndPlay(id);
    }
    function repeat(){startStep(state.index);}
    function stop(){if(disposed)return;invalidate();resetTime();notifyStepOnResume=false;if(supported)emit('idle','Audio detenido. Puedes escuchar de nuevo este paso cuando quieras.');}
    function goTo(index){
      if(disposed||!supported)return;
      const wasPlaying=['loading','playing'].includes(state.status),wasPaused=state.status==='paused',next=clamp(index);
      if(wasPlaying){startStep(next);return;}
      invalidate();state.index=next;notifyStepOnResume=wasPaused;
      if(!prepareSource(next))return;
      emit(wasPaused?'paused':'idle',wasPaused?'Audio en pausa. Pulsa Continuar audio para escuchar este paso.':'Audio listo para el paso '+(next+1)+' de '+steps.length+'.');
    }
    function setRate(value){if(disposed)return;state.rate=RATES.includes(Number(value))?Number(value):1;if(supported)applyRate();emit();}
    function setAutoAdvance(value){if(!disposed){state.autoAdvance=value===true;emit();}}
    function dispose(){
      if(disposed)return;disposed=true;invalidate();
      if(audio){try{audio.removeAttribute?.('src');audio.load?.();}catch{}audio=null;}
      state.status='idle';state.message='Audio detenido.';
    }
    emit();
    return Object.freeze({play,pause,resume,repeat,stop,goTo,setRate,setAutoAdvance,dispose,getState});
  }

  const api=Object.freeze({create});
  if(typeof module==='object'&&module.exports)module.exports=api;
  if(global)global.HeartRecordedNarration=api;
})(typeof window!=='undefined'?window:globalThis);
