/* Exploración de dos magnitudes: amplitud y frecuencia, con rapidez fija. */
(function(global){
 'use strict';
 const document=global.document,TAU=2*Math.PI;
 const constants=Object.freeze({speed:4,length:12,markerX:6,amplitude:Object.freeze({min:0,max:.3,step:.01,default:.2}),frequency:Object.freeze({min:.25,max:1.25,step:.05,default:.75})});
 let instances=[],frame=0,sequence=0,sharedCleanups=[];
 const numeric=(value,fallback)=>Number.isFinite(Number(value))?Number(value):fallback;
 const clamp=(value,min,max)=>Math.min(max,Math.max(min,value));
 const round=value=>Number(value).toFixed(3);
 const format=(value,digits=2)=>Number(value).toLocaleString('es-ES',{minimumFractionDigits:digits,maximumFractionDigits:digits});
 const escape=value=>String(value??'').replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
 function sanitize(parameters={}){
  parameters=parameters&&typeof parameters==='object'?parameters:{};
  return {amplitude:clamp(numeric(parameters.amplitude??parameters.A,constants.amplitude.default),constants.amplitude.min,constants.amplitude.max),frequency:clamp(numeric(parameters.frequency??parameters.f,constants.frequency.default),constants.frequency.min,constants.frequency.max)};
 }
 function sample(parameters={},time=0){
  parameters=parameters&&typeof parameters==='object'?parameters:{};
  const p=sanitize(parameters),elapsed=Math.max(0,numeric(time,0)),cycles=numeric(parameters.cycles,0)+p.frequency*elapsed;
  const at=x0=>{const displacement=p.amplitude*Math.sin(TAU*(p.frequency*(x0-constants.markerX)/constants.speed-cycles));return {x0,x:x0,y0:0,y:displacement,displacement};};
  return {...p,speed:constants.speed,lambda:constants.speed/p.frequency,period:1/p.frequency,time:elapsed,cycles,points:Array.from({length:241},(_,i)=>at(i*constants.length/240)),marker:at(constants.markerX)};
 }
 function line(x1,y1,x2,y2,color,width=1.5,extra=''){return `<path d="M${round(x1)} ${round(y1)}L${round(x2)} ${round(y2)}" fill="none" stroke="${color}" stroke-width="${width}" ${extra}/>`;}
 function arrow(x1,y1,x2,y2,color,both=false){
  const angle=Math.atan2(y2-y1,x2-x1),head=(x,y,a)=>`<path d="M${round(x)} ${round(y)}l${round(-11*Math.cos(a)+5*Math.sin(a))} ${round(-11*Math.sin(a)-5*Math.cos(a))}l${round(-10*Math.sin(a))} ${round(10*Math.cos(a))}Z" fill="${color}"/>`;
  return line(x1,y1,x2,y2,color,2.5)+head(x2,y2,angle)+(both?head(x1,y1,angle+Math.PI):'');
 }
 function renderScene(parameters={},time=0,id='waf-scene'){
  id=String(id).replace(/[^a-zA-Z0-9_-]/g,'-');
  const s=sample(parameters,time),px=x=>96+x*63,py=y=>220-y*280;
  const path=s.points.map((p,i)=>(i?'L':'M')+round(px(p.x))+' '+round(py(p.y))).join('');
  const markerX=px(s.marker.x),markerY=py(s.marker.y),top=py(s.amplitude),bottom=py(-s.amplitude);
  let guides=line(96,220,852,220,'#a6b8bb',1.5,'stroke-dasharray="5 7"');
  if(s.amplitude>0){
   guides+=line(96,top,852,top,'#d9e5e3',1,'stroke-dasharray="3 8"')+line(96,bottom,852,bottom,'#d9e5e3',1,'stroke-dasharray="3 8"');
   guides+=arrow(64,220,64,top,'#a47736',true)+line(64,top,88,top,'#b99962',1.5)+line(64,220,88,220,'#b99962',1.5);
  }else guides+=line(53,220,75,220,'#a47736',3);
  const tickLabels=[0,3,6,9,12].map(x=>`<text class="waf-detail" x="${px(x)}" y="342" text-anchor="middle" fill="#73848b" font-size="19">${x}</text>`).join('');
  return `<svg class="waf-svg" viewBox="0 0 900 390" width="900" height="390" role="img" aria-label="Onda transversal de amplitud ${escape(format(s.amplitude))} metros y frecuencia ${escape(format(s.frequency))} hertz. El punto P oscila verticalmente sin avanzar con la onda." xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="${id}-paper" x2="0" y2="1"><stop stop-color="#fcfdfb"/><stop offset="1" stop-color="#f0f5f2"/></linearGradient><linearGradient id="${id}-wave" x2="0" y2="1"><stop stop-color="#2c9a9b"/><stop offset="1" stop-color="#146779"/></linearGradient><radialGradient id="${id}-point" cx=".3" cy=".22"><stop stop-color="#fff6cf"/><stop offset=".35" stop-color="#f1ca6b"/><stop offset="1" stop-color="#b68532"/></radialGradient></defs><rect width="900" height="390" fill="url(#${id}-paper)"/>${guides}<text x="39" y="${round(220-(s.amplitude*280)/2+8)}" fill="#98702e" font-size="25" font-weight="650" text-anchor="middle">A</text><path d="${path}" transform="translate(0 7)" fill="none" stroke="#829a91" stroke-opacity=".09" stroke-width="9" stroke-linecap="round"/><path d="${path}" fill="none" stroke="url(#${id}-wave)" stroke-width="5.5" stroke-linecap="round" stroke-linejoin="round"/>${line(markerX,117,markerX,305,'#c6af79',1.3,'stroke-dasharray="4 6"')}<circle cx="${round(markerX)}" cy="220" r="7" fill="none" stroke="#baa573" stroke-width="1.5"/><circle cx="${round(markerX)}" cy="${round(markerY)}" r="11" fill="url(#${id}-point)" stroke="#b18c42" stroke-width="1.2"/><text x="${round(markerX-22)}" y="${round(markerY-19)}" fill="#8b682c" font-size="25" font-weight="700" text-anchor="middle">P</text>${arrow(641,66,806,66,'#287c83')}<text class="waf-detail" x="722" y="43" fill="#3e646e" font-size="23" text-anchor="middle">La onda avanza</text>${tickLabels}<text class="waf-detail" x="474" y="375" fill="#73848b" font-size="20" text-anchor="middle">Posición en la cuerda (m)</text></svg>`;
 }
 function active(a){return !a.disposed&&a.playing&&a.visible&&!document?.hidden&&a.host.isConnected!==false;}
 function listen(target,event,handler,cleanups){if(!target?.addEventListener)return;target.addEventListener(event,handler);cleanups.push(()=>target.removeEventListener(event,handler));}
 function render(a){if(!a.disposed)a.host.querySelector('[data-waf-scene]').innerHTML=renderScene({...a.parameters,cycles:a.cycles},0,a.id);}
 function sync(a){
  if(a.disposed)return;
  for(const [name,unit] of [['amplitude','m'],['frequency','Hz']]){
   const value=a.parameters[name],input=a.host.querySelector(`[data-waf-param="${name}"]`);
   input.value=String(value);input.setAttribute('aria-valuetext',format(value)+' '+unit);
   a.host.querySelector(`[data-waf-output="${name}"]`).textContent=format(value)+' '+unit;
  }
  const p=sample(a.parameters,0);
  a.host.querySelector('[data-waf-readouts]').innerHTML=`<div><span>Longitud de onda</span><strong>${format(p.lambda)} <small>m</small></strong></div><div><span>Período</span><strong>${format(p.period)} <small>s</small></strong></div>`;
  const play=a.host.querySelector('[data-waf-action="play"]');
  play.textContent=a.playing?'Ⅱ Pausar':'▶ Reproducir';play.setAttribute('aria-pressed',String(a.playing));play.setAttribute('aria-label',a.playing?'Pausar la onda':'Reproducir la onda');
 }
 function schedule(){
  if(frame&&!instances.some(active)){global.cancelAnimationFrame(frame);frame=0;}
  if(!frame&&instances.some(active))frame=global.requestAnimationFrame(tick);
 }
 function tick(now){
  frame=0;
  for(const a of instances){
   if(!active(a)){a.last=null;a.pending=0;continue;}
   if(a.last!==null)a.pending+=Math.min(.1,Math.max(0,(now-a.last)/1000));
   a.last=now;
   if(now-a.drawAt>=1000/30-1){const dt=a.pending;a.pending=0;a.time+=dt;a.cycles=(a.cycles+a.parameters.frequency*dt)%1;a.drawAt=now;render(a);}
  }
  schedule();
 }
 function destroy(){
  if(frame){global.cancelAnimationFrame(frame);frame=0;}
  for(const cleanup of sharedCleanups)cleanup();sharedCleanups=[];
  for(const a of instances){a.disposed=true;a.observer?.disconnect();for(const cleanup of a.cleanups)cleanup();}
  instances=[];
 }
 function mount(root){
  destroy();
  const placeholders=root?.matches?.('[data-wave-amplitude-frequency]')?[root]:Array.from(root?.querySelectorAll?.('[data-wave-amplitude-frequency]')||[]);
  const reduced=!!global.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  for(const placeholder of placeholders){
   const id='wave-amplitude-frequency-'+(++sequence);
   placeholder.innerHTML=`<section class="waf-lab" id="${id}" data-activity-fullscreen aria-labelledby="${id}-title"><header class="waf-header"><p class="waf-eyebrow">Explora la onda</p><h3 id="${id}-title">Amplitud y frecuencia</h3><p class="waf-intro">Mueve las barras y observa cómo cambia la onda.</p></header><div class="waf-workspace"><div class="waf-scene" data-waf-scene></div><div class="waf-panel"><label class="waf-control" for="${id}-amplitude"><span class="waf-control-heading"><span>Amplitud <i>A</i></span><output data-waf-output="amplitude" for="${id}-amplitude"></output></span><input id="${id}-amplitude" type="range" data-waf-param="amplitude" min="0" max="0.3" step="0.01" value="0.2" aria-label="Amplitud"><span class="waf-range-ends"><span>0 m</span><span>0,30 m</span></span></label><label class="waf-control" for="${id}-frequency"><span class="waf-control-heading"><span>Frecuencia <i>f</i></span><output data-waf-output="frequency" for="${id}-frequency"></output></span><input id="${id}-frequency" type="range" data-waf-param="frequency" min="0.25" max="1.25" step="0.05" value="0.75" aria-label="Frecuencia"><span class="waf-range-ends"><span>0,25 Hz</span><span>1,25 Hz</span></span></label><div class="waf-readouts" data-waf-readouts></div></div></div><p class="waf-caption">El punto dorado <strong>P</strong> oscila en un lugar fijo. La amplitud cambia su separación máxima del equilibrio; la frecuencia cambia cuántas oscilaciones realiza por segundo.</p><footer class="waf-footer"><div class="waf-playback"><button type="button" data-waf-action="play"></button><button type="button" data-waf-action="restart" aria-label="Reiniciar la onda">↺ Reiniciar</button></div><p>Rapidez fija en este modelo ideal: <strong>4 m/s</strong>.</p></footer></section>`;
   const host=placeholder.firstElementChild;
   const a={id,host,parameters:sanitize(),cycles:0,time:0,playing:!reduced,visible:!document?.hidden,last:null,pending:0,drawAt:-Infinity,disposed:false,cleanups:[]};instances.push(a);
   listen(host,'input',event=>{
    const input=event.target;if(a.disposed||!input.matches?.('[data-waf-param]'))return;
    const name=input.dataset.wafParam;if(!['amplitude','frequency'].includes(name))return;
    a.parameters=sanitize({...a.parameters,[name]:Number(input.value)});a.last=null;a.pending=0;sync(a);render(a);schedule();
   },a.cleanups);
   listen(host,'click',event=>{
    const button=event.target.closest?.('[data-waf-action]');if(!button||a.disposed)return;
    const action=button.dataset.wafAction;
    if(action==='play')a.playing=!a.playing;
    else if(action==='restart'){a.cycles=0;a.time=0;}
    else return;
    a.last=null;a.pending=0;sync(a);render(a);schedule();
   },a.cleanups);
   if(typeof global.IntersectionObserver==='function'){
    a.observer=new global.IntersectionObserver(entries=>{if(a.disposed)return;a.visible=entries.some(entry=>entry.isIntersecting);a.last=null;a.pending=0;schedule();},{threshold:0});a.observer.observe(host);
   }
   sync(a);render(a);
  }
  if(instances.length){
   listen(document,'visibilitychange',()=>{for(const a of instances){a.last=null;a.pending=0;}schedule();},sharedCleanups);
   listen(global,'pagehide',destroy,sharedCleanups);
  }
  schedule();
 }
 function getState(){return instances.map(a=>({parameters:{...a.parameters},cycles:a.cycles,time:a.time,playing:a.playing,visible:a.visible}));}
 global.WaveAmplitudeFrequency=Object.freeze({mount,destroy,getState,sample,renderScene,sanitize,constants});
})(window);
