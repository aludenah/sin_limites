(function(global){
  'use strict';

  const RATES=[.85,1,1.15],START_TIMEOUT=8000;

  function sentences(text){
    const result=[];
    for(let sentence of String(text||'').match(/[^.!?]+(?:[.!?]+|$)/g)||[]){
      sentence=sentence.trim();
      while(sentence.length>160){
        const space=sentence.lastIndexOf(' ',160),end=space>0?space:160;
        result.push(sentence.slice(0,end).trim());sentence=sentence.slice(end).trim();
      }
      if(sentence)result.push(sentence);
    }
    return result;
  }

  function create(options={}){
    const steps=(Array.isArray(options.steps)?options.steps:[]).map(step=>({title:String(step?.title||'').trim(),text:String(step?.text||'').trim()}));
    const synth=global.speechSynthesis,Utterance=global.SpeechSynthesisUtterance;
    const supported=Boolean(steps.length&&synth&&typeof synth.speak==='function'&&typeof synth.cancel==='function'&&typeof Utterance==='function');
    const later=global.setTimeout?.bind(global)||setTimeout,clear=global.clearTimeout?.bind(global)||clearTimeout;
    let disposed=false,session=0,utterance=null,ownsSpeech=false,watchdog=null,phrase=0,chunks=[],voices=[];
    const state={status:supported?'idle':'unavailable',index:0,rate:1,autoAdvance:true,supported,message:supported?'Audio listo. Pulsa Escuchar recorrido para empezar.':'Tu navegador no dispone de narración de voz. Puedes seguir los pasos en pantalla.'};
    const getState=()=>({...state});
    const callback=(name,...args)=>{try{options[name]?.(...args);}catch(error){global.console?.error?.('No se pudo actualizar la guía de audio.',error);}};
    const emit=(status,message)=>{
      if(disposed)return;
      if(status)state.status=status;if(message)state.message=message;
      callback('onState',getState());
    };
    const clamp=value=>Math.max(0,Math.min(steps.length-1,Number.isFinite(Number(value))?Math.trunc(Number(value)):0));
    const clearWatchdog=()=>{if(watchdog!==null){clear(watchdog);watchdog=null;}};
    function cancelOwned(){
      session++;clearWatchdog();
      const cancel=ownsSpeech;ownsSpeech=false;utterance=null;
      // Cancelling is global to speechSynthesis. Never cancel someone else's
      // speech merely because this activity mounts, stops while idle, or exits.
      if(cancel){try{synth.cancel();}catch{}}
    }
    function refreshVoices(){
      try{voices=typeof synth?.getVoices==='function'?Array.from(synth.getVoices()||[]):[];}catch{voices=[];}
      return voices;
    }
    function spanishVoice(){
      const spanish=refreshVoices().filter(v=>/^es(?:[-_]|$)/i.test(v.lang||''));
      for(const locale of ['es-pe','es-mx','es-us','es-es']){
        const match=spanish.find(v=>String(v.lang).replace('_','-').toLowerCase()===locale);if(match)return match;
      }
      return spanish[0]||null;
    }
    function fail(message){
      cancelOwned();emit('error',message);
    }
    function speechError(code){
      if(code==='not-allowed')return 'El navegador bloqueó el audio. Pulsa Escuchar recorrido para volver a intentarlo.';
      if(code==='language-unavailable'||code==='voice-unavailable')return 'No hay una voz en español disponible. Activa una voz en español en tu dispositivo y vuelve a intentarlo.';
      if(code==='network')return 'No se pudo cargar la voz. Comprueba tu conexión y vuelve a intentarlo.';
      if(code==='audio-hardware')return 'No se pudo reproducir la voz. Comprueba la salida de audio de tu dispositivo.';
      if(code==='interrupted'||code==='canceled')return 'El audio se interrumpió. Pulsa Escuchar recorrido para volver a intentarlo.';
      return 'No se pudo reproducir la narración. Pulsa Escuchar recorrido para volver a intentarlo.';
    }
    function stepChunks(index){
      const step=steps[index],title=step.title.replace(/[.!?]+$/,'');
      return sentences('Paso '+(index+1)+' de '+steps.length+'. '+(title?title+'. ':'')+step.text);
    }
    function current(id,item){return !disposed&&id===session&&utterance===item&&['loading','playing'].includes(state.status);}
    function speakPhrase(id){
      if(disposed||id!==session||!supported||!['loading','playing'].includes(state.status))return;
      if(phrase>=chunks.length){
        if(state.index===steps.length-1){
          emit('ended','Recorrido finalizado. Puedes volver a escucharlo o elegir cualquier paso.');
          if(!disposed&&id===session)callback('onComplete');
        }else if(state.autoAdvance)startStep(state.index+1);
        else emit('ended','Paso '+(state.index+1)+' terminado. Puedes repetirlo o continuar al siguiente.');
        return;
      }
      const voice=spanishVoice();
      if(voices.length&&!voice){fail(speechError('voice-unavailable'));return;}
      let item;
      try{item=new Utterance(chunks[phrase]);}catch{fail(speechError());return;}
      item.lang=voice?.lang||'es-PE';if(voice)item.voice=voice;
      item.rate=state.rate;item.pitch=1;item.volume=1;
      utterance=item;ownsSpeech=true;
      item.onstart=()=>{
        if(!current(id,item))return;
        clearWatchdog();
        const words=item.text.trim().split(/\s+/).length;
        watchdog=later(()=>{if(current(id,item))fail('La narración se detuvo antes de terminar. Pulsa Escuchar recorrido para volver a intentarlo.');},Math.min(45000,Math.max(15000,words*1000/state.rate+12000)));
        emit('playing','Escuchando el paso '+(state.index+1)+' de '+steps.length+'.');
      };
      item.onend=()=>{
        if(!current(id,item))return;
        clearWatchdog();ownsSpeech=false;utterance=null;phrase++;speakPhrase(id);
      };
      item.onerror=event=>{if(current(id,item))fail(speechError(event?.error));};
      watchdog=later(()=>{if(current(id,item))fail('No se pudo iniciar la voz. Pulsa Escuchar recorrido para volver a intentarlo.');},START_TIMEOUT);
      try{synth.speak(item);}catch{if(current(id,item))fail(speechError());}
    }
    function startStep(index){
      if(disposed||!supported)return;
      cancelOwned();state.index=clamp(index);phrase=0;chunks=stepChunks(state.index);
      const id=session;
      emit('loading','Preparando audio del paso '+(state.index+1)+' de '+steps.length+'.');
      if(disposed||id!==session||state.status!=='loading')return;
      callback('onStep',state.index);
      if(!disposed&&id===session&&state.status==='loading')speakPhrase(id);
    }
    function play(index=state.index){startStep(index);}
    function pause(){
      if(disposed||!['loading','playing'].includes(state.status))return;
      // Repeating the current short sentence on resume works on engines whose
      // native pause/resume methods cannot reliably resume an utterance.
      cancelOwned();emit('paused','Audio en pausa. Pulsa Continuar audio para seguir.');
    }
    function resume(){
      if(disposed||!supported||state.status!=='paused')return;
      cancelOwned();if(!chunks.length)chunks=stepChunks(state.index);
      const id=session;emit('loading','Preparando audio del paso '+(state.index+1)+' de '+steps.length+'.');
      if(!disposed&&id===session&&state.status==='loading')speakPhrase(id);
    }
    function repeat(){startStep(state.index);}
    function stop(){
      if(disposed)return;cancelOwned();phrase=0;chunks=[];
      if(supported)emit('idle','Audio detenido. Puedes escuchar de nuevo este paso cuando quieras.');
    }
    function goTo(index){
      if(disposed||!supported)return;
      const wasPlaying=['loading','playing'].includes(state.status),wasPaused=state.status==='paused';
      if(wasPlaying){startStep(index);return;}
      cancelOwned();state.index=clamp(index);phrase=0;chunks=stepChunks(state.index);
      emit(wasPaused?'paused':'idle',wasPaused?'Audio en pausa. Pulsa Continuar audio para escuchar este paso.':'Audio listo para el paso '+(state.index+1)+' de '+steps.length+'.');
    }
    function setRate(value){
      if(disposed)return;
      const rate=RATES.includes(Number(value))?Number(value):1;if(state.rate===rate)return;
      state.rate=rate;
      if(['loading','playing'].includes(state.status)){
        cancelOwned();const id=session;emit('loading','Preparando audio del paso '+(state.index+1)+' de '+steps.length+'.');
        if(!disposed&&id===session&&state.status==='loading')speakPhrase(id);
      }else emit();
    }
    function setAutoAdvance(value){if(!disposed){state.autoAdvance=value===true;emit();}}
    function dispose(){
      if(disposed)return;disposed=true;cancelOwned();
      if(supported){state.status='idle';state.message='Audio detenido.';}
      synth?.removeEventListener?.('voiceschanged',refreshVoices);
    }
    if(supported){refreshVoices();synth.addEventListener?.('voiceschanged',refreshVoices);}
    emit();
    return Object.freeze({play,pause,resume,repeat,stop,goTo,setRate,setAutoAdvance,dispose,getState});
  }

  const api=Object.freeze({create});
  if(typeof module==='object'&&module.exports)module.exports=api;
  if(global)global.HeartNarration=api;
})(typeof window!=='undefined'?window:globalThis);
