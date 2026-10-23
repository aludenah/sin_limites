/* A voluntary spoken guide for the currently displayed waves lesson. */
(function(global){
 'use strict';
 const STYLE_ID='wave-lesson-audio-style';
 let current=null;
 const escape=value=>String(value??'').replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
 const speaker='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><path d="M4 9h4l5-4v14l-5-4H4Z"/><path d="M16 8a6 6 0 0 1 0 8m3-11a10 10 0 0 1 0 14"/></svg>';
 function addStyle(){
  const doc=global.document;if(!doc||doc.getElementById(STYLE_ID))return;
  const style=doc.createElement('style');style.id=STYLE_ID;style.textContent=`
.wave-audio{margin:0 0 24px;padding:20px;border:1px solid #bfd9df;border-radius:18px;background:linear-gradient(115deg,#e9f6f2,#f1f6fc);color:#183b50;min-width:0}
.wave-audio *{box-sizing:border-box;min-width:0}.wave-audio h3,.wave-audio h4,.wave-audio p{margin:0}.wave-audio-header{display:flex;gap:12px;align-items:center}.wave-audio-icon{display:grid;place-items:center;flex:none;width:42px;height:42px;border-radius:13px;background:#d3ede5;color:#126b62}.wave-audio-icon svg{width:24px;height:24px}.wave-audio .wave-audio-title{font-size:18px;line-height:1.4;color:#153b50}.wave-audio .wave-audio-intro{font-size:13px;line-height:1.6;color:#4f6d7d;margin-top:3px}.wave-audio-parts{display:flex;gap:8px;margin:15px 0 12px}.wave-audio-parts button{flex:1;min-height:44px;padding:9px;border:1px solid #bed4dd;border-radius:10px;color:#426475;background:#fff;font:inherit;font-size:12px;font-weight:750;line-height:1.4;cursor:pointer}.wave-audio-parts button[aria-current=step]{background:#164f64;border-color:#164f64;color:#fff}.wave-audio-reading{background:#ffffffc9;border:1px solid #d4e4e9;border-radius:12px;padding:15px}.wave-audio .wave-audio-part-title{font-size:16px;line-height:1.5}.wave-audio .wave-audio-part-text{margin-top:6px;font-size:14px;line-height:1.8;color:#36586b;overflow-wrap:anywhere}.wave-audio-controls{display:flex;flex-wrap:wrap;align-items:center;gap:9px;margin-top:13px}.wave-audio-controls button,.wave-audio-reading-nav button{min-height:44px;display:inline-flex;align-items:center;justify-content:center;gap:7px;padding:10px 12px;border:1px solid #b7cfd8;border-radius:10px;background:#fff;color:#204c63;font:inherit;font-size:12px;font-weight:750;line-height:1.4;cursor:pointer}.wave-audio-controls .wave-audio-play{background:#126b62;border-color:#126b62;color:#fff;min-width:178px}.wave-audio-controls .wave-audio-play:hover{background:#0a5750}.wave-audio-controls button:disabled,.wave-audio-reading-nav button:disabled{opacity:.48;cursor:default}.wave-audio-controls svg{width:16px;height:16px;flex:none}.wave-audio-rate{display:flex;align-items:center;gap:7px;color:#31586a;font-size:12px;font-weight:700}.wave-audio-rate select{min-height:44px;padding:8px;border:1px solid #b7cfd8;border-radius:9px;font:inherit;background:#fff;color:#204c63}.wave-audio-auto{display:flex;align-items:center;gap:8px;min-height:44px;font-size:12px;line-height:1.5;color:#31586a;cursor:pointer}.wave-audio-auto input{width:18px;height:18px;flex:none;accent-color:#126b62}.wave-audio-reading-nav{display:flex;align-items:center;justify-content:space-between;gap:9px;margin-top:10px}.wave-audio-counter{font-size:12px;font-weight:750;color:#527384}.wave-audio .wave-audio-status{margin-top:11px;font-size:12px;line-height:1.65;color:#315d6c;overflow-wrap:anywhere}.wave-audio[data-state=error] .wave-audio-status,.wave-audio[data-state=unavailable] .wave-audio-status{color:#85532b}.wave-audio button:focus-visible,.wave-audio select:focus-visible,.wave-audio input:focus-visible{outline:3px solid #e5a533;outline-offset:3px}
@media(max-width:650px){.wave-audio{padding:16px}.wave-audio-parts{gap:6px}.wave-audio-parts button{padding:8px 5px;font-size:11px}.wave-audio-controls{display:grid;grid-template-columns:1fr 1fr;gap:8px}.wave-audio-controls .wave-audio-play{grid-column:1/-1;width:100%}.wave-audio-rate{justify-content:space-between}.wave-audio-auto{font-size:11px}.wave-audio .wave-audio-title{font-size:17px}.wave-audio .wave-audio-intro{font-size:12px}.wave-audio-reading-nav button{font-size:11px;padding:9px}.wave-audio-counter{text-align:center;font-size:11px}}
@media(max-width:360px){.wave-audio-controls{grid-template-columns:1fr}.wave-audio-controls .wave-audio-play{grid-column:auto}.wave-audio-parts{flex-direction:column}.wave-audio-reading-nav{flex-wrap:wrap}.wave-audio-counter{width:100%;order:-1}}
`;
  doc.head.appendChild(style);
 }
 function mount(root,options={}){
  destroy();
  const host=root?.matches?.('[data-wave-lesson-audio]')?root:root?.querySelector?.('[data-wave-lesson-audio]');
  const lesson=options.lesson,steps=(Array.isArray(lesson?.audioSegments)?lesson.audioSegments:[]).filter(s=>s&&typeof s.text==='string'&&s.text.trim()).map(s=>({title:String(s.title||'Explicación'),text:s.text.trim()}));
  if(!host||!steps.length){if(host)host.innerHTML='';return;}
  addStyle();
  const a={host,disposed:false,started:false,index:0,controller:null,cleanups:[],status:'idle'};current=a;
  host.innerHTML=`<section class="wave-audio" data-wave-audio-box data-wave-audio-lesson="${escape(lesson.id||'')}" aria-label="Guía de audio del tema ${escape(lesson.title||'Ondas mecánicas')}"><header class="wave-audio-header"><span class="wave-audio-icon">${speaker}</span><div><h3 class="wave-audio-title">Escucha y observa</h3><p class="wave-audio-intro">Una explicación en español para explorar la animación de este tema.</p></div></header><div class="wave-audio-parts" role="group" aria-label="Partes de la explicación">${steps.map((step,index)=>`<button type="button" data-wa-action="part" data-wa-index="${index}" aria-label="Parte ${index+1}: ${escape(step.title)}"${index===0?' aria-current="step"':''}>${index+1} · ${escape(step.title)}</button>`).join('')}</div><div class="wave-audio-reading" data-wa-reading aria-live="polite" aria-atomic="true"><h4 class="wave-audio-part-title" data-wa-title>${escape(steps[0].title)}</h4><p class="wave-audio-part-text" data-wa-text>${escape(steps[0].text)}</p></div><div class="wave-audio-reading-nav"><button type="button" data-wa-action="previous" disabled>← Parte anterior</button><span class="wave-audio-counter" data-wa-counter>Parte 1 de ${steps.length}</span><button type="button" data-wa-action="next"${steps.length===1?' disabled':''}>Parte siguiente →</button></div><div class="wave-audio-controls"><button type="button" class="wave-audio-play" data-wa-action="play">${speaker}<span data-wa-play-label>Escuchar explicación</span></button><button type="button" data-wa-action="repeat" disabled>Repetir parte</button><button type="button" data-wa-action="stop" disabled>Detener audio</button><label class="wave-audio-rate">Velocidad de voz<select data-wa-rate aria-label="Velocidad de la explicación"><option value="0.85">Pausada</option><option value="1" selected>Normal</option><option value="1.15">Rápida</option></select></label><label class="wave-audio-auto"><input type="checkbox" data-wa-auto checked>Continuar las partes de este tema</label></div><p class="wave-audio-status" data-wa-status role="status" aria-live="polite">Pulsa Escuchar explicación para comenzar. El texto está disponible sin audio.</p></section>`;
  const q=selector=>host.querySelector(selector),all=selector=>Array.from(host.querySelectorAll(selector));
  a.q=q;
  const alive=()=>current===a&&!a.disposed;
  const motion=value=>{if(alive()&&a.started)global.MechanicalWaveLabs?.setPlaying?.(value);};
  function show(index){
   if(!alive())return;a.index=Math.max(0,Math.min(steps.length-1,Number(index)||0));
   q('[data-wa-title]').textContent=steps[a.index].title;q('[data-wa-text]').textContent=steps[a.index].text;q('[data-wa-counter]').textContent='Parte '+(a.index+1)+' de '+steps.length;
   all('[data-wa-action="part"]').forEach((button,i)=>{if(i===a.index)button.setAttribute('aria-current','step');else button.removeAttribute('aria-current');});
   q('[data-wa-action="previous"]').disabled=a.index===0;q('[data-wa-action="next"]').disabled=a.index===steps.length-1;
  }
  function sync(state){
   if(!alive())return;a.status=state.status;
   const busy=['playing','loading'].includes(state.status),unavailable=state.status==='unavailable';
   q('[data-wave-audio-box]').setAttribute('data-state',state.status);
   const play=q('[data-wa-action="play"]');play.disabled=unavailable;play.setAttribute('aria-pressed',String(busy));q('[data-wa-play-label]').textContent=busy?'Pausar audio':state.status==='paused'?'Continuar audio':state.status==='ended'?'Escuchar de nuevo':'Escuchar explicación';
   q('[data-wa-action="repeat"]').disabled=unavailable||!a.started;q('[data-wa-action="stop"]').disabled=unavailable||!a.started;q('[data-wa-rate]').disabled=unavailable;q('[data-wa-auto]').disabled=unavailable;
   q('[data-wa-reading]').setAttribute('aria-live',busy?'off':'polite');
   const status=q('[data-wa-status]');status.setAttribute('aria-live',busy?'off':'polite');
   status.textContent=String(state.message||'').replace(/Escuchar recorrido/g,'Escuchar explicación').replace(/Recorrido finalizado/g,'Explicación finalizada').replace(/recorrido/g,'explicación').replace(/paso/gi,match=>match==='Paso'?'Parte':'parte');
   if(a.started&&['playing','paused','ended','error','unavailable','idle'].includes(state.status))motion(state.status==='playing');
  }
  a.controller=global.HeartNarration?.create?.({steps,onStep:show,onState:sync,onComplete:()=>{if(alive())q('[data-wa-status]').textContent='Explicación terminada. Puedes repetir una parte o seguir explorando la animación.';}})||null;
  if(!a.controller)sync({status:'unavailable',message:'El audio no está disponible en este navegador. Puedes leer las partes de la explicación y explorar la animación.'});
  const listen=(target,event,fn)=>{if(!target?.addEventListener)return;target.addEventListener(event,fn);a.cleanups.push(()=>target.removeEventListener(event,fn));};
  function jump(index){
   if(!alive())return;show(index);const state=a.controller?.getState();
   if(a.started&&state?.status==='ended')a.controller.play(a.index);else a.controller?.goTo(a.index);
  }
  listen(host,'click',event=>{
   const button=event.target.closest?.('[data-wa-action]');if(!button||button.disabled||!alive())return;
   const action=button.dataset.waAction,state=a.controller?.getState();
   if(action==='part')jump(Number(button.dataset.waIndex));
   else if(action==='previous')jump(a.index-1);
   else if(action==='next')jump(a.index+1);
   else if(action==='play'&&a.controller){
    if(['playing','loading'].includes(state.status))a.controller.pause();
    else if(state.status!=='unavailable'){a.started=true;if(state.status==='paused')a.controller.resume();else a.controller.play(state.status==='ended'&&state.autoAdvance&&a.index===steps.length-1?0:a.index);}
   }else if(action==='repeat'&&a.controller){a.started=true;a.controller.repeat();}
   else if(action==='stop'&&a.controller){motion(false);a.started=false;a.controller.stop();}
  });
  listen(host,'change',event=>{
   if(!alive())return;
   if(event.target.matches?.('[data-wa-rate]'))a.controller?.setRate(Number(event.target.value));
   if(event.target.matches?.('[data-wa-auto]'))a.controller?.setAutoAdvance(event.target.checked);
  });
  const pause=()=>{if(alive())a.controller?.pause();};
  listen(global.document,'visibilitychange',()=>{if(global.document.hidden)pause();});listen(global,'pagehide',pause);
  listen(root,'wave-lab-playchange',event=>{
   if(!alive()||!a.started||event.detail?.source!=='user')return;
   const state=a.controller?.getState();if(!state)return;
   if(event.detail.playing===false&&['playing','loading'].includes(state.status))a.controller.pause();
   else if(event.detail.playing===true&&state.status==='paused')a.controller.resume();
  });
 }
 function destroy(){
  const a=current;if(!a)return;current=null;a.disposed=true;
  a.cleanups.forEach(cleanup=>cleanup());a.cleanups.length=0;a.controller?.dispose();
  if(a.started)global.MechanicalWaveLabs?.setPlaying?.(false);
  a.host.innerHTML='';
 }
 global.WaveLessonAudio=Object.freeze({mount,destroy});
})(window);
