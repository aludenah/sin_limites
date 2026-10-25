/* Un selector de armónicos para la misma cuerda fija en ambos extremos. */
(function(global){
 'use strict';
 const document=global.document,TAU=2*Math.PI;
 const constants=Object.freeze({length:4,amplitude:.22,fundamental:1,timeScale:.25,texture:Object.freeze({src:'assets/string-rope-photoreal.webp',x:0,y:434,width:1536,height:147})});
 const names=['Primer armónico','Segundo armónico','Tercer armónico','Cuarto armónico','Quinto armónico'];
 let instances=[],frame=0,sequence=0,sharedCleanups=[];
 const numeric=(value,fallback)=>value!==null&&value!==''&&Number.isFinite(Number(value))?Number(value):fallback;
 const clamp=(value,min,max)=>Math.min(max,Math.max(min,value));
 function sanitize(parameters={}){const value=parameters&&typeof parameters==='object'?parameters.n:parameters;return {n:clamp(Math.round(numeric(value,1)),1,5)};}
 function sample(parameters={},time=0){
  const {n}=sanitize(parameters),elapsed=Math.max(0,numeric(time,0)),frequency=n*constants.fundamental,wavelength=2*constants.length/n;
  const at=x=>{const spatial=Math.sin(n*Math.PI*x/constants.length);return {x,y:Math.abs(spatial)<1e-12?0:constants.amplitude*spatial*Math.cos(TAU*frequency*elapsed)};};
  return {n,frequency,wavelength,length:constants.length,amplitude:constants.amplitude,time:elapsed,points:Array.from({length:401},(_,i)=>at(i*constants.length/400)),nodes:Array.from({length:n+1},(_,j)=>j*constants.length/n),antinodes:Array.from({length:n},(_,j)=>(j+.5)*constants.length/n)};
 }
 function line(ctx,x1,y1,x2,y2,color,width=1){ctx.beginPath();ctx.moveTo(x1,y1);ctx.lineTo(x2,y2);ctx.strokeStyle=color;ctx.lineWidth=width;ctx.stroke();}
 function bead(ctx,x,y,r,color){
  const light=ctx.createRadialGradient(x-r*.35,y-r*.4,0,x,y,r);light.addColorStop(0,color==='gold'?'#fff5cc':'#c3f5ea');light.addColorStop(.4,color==='gold'?'#e8bf62':'#57b9a6');light.addColorStop(1,color==='gold'?'#987334':'#257c70');
  ctx.beginPath();ctx.arc(x,y,r,0,TAU);ctx.fillStyle=light;ctx.fill();ctx.lineWidth=1;ctx.strokeStyle=color==='gold'?'#8c6b34':'#286e63';ctx.stroke();
 }
 function drawScene(canvas,parameters={},time=0,options={}){
  const ctx=canvas?.getContext?.('2d');if(!ctx)return;
  const s=sample(parameters,time),width=Math.max(180,numeric(options.width,canvas.clientWidth||900)),compact=width<480,height=Math.max(200,numeric(options.height,canvas.clientHeight||(compact?290:360))),dpr=clamp(numeric(global.devicePixelRatio,1),1,2);
  if(canvas.width!==Math.round(width*dpr)||canvas.height!==Math.round(height*dpr)){canvas.width=Math.round(width*dpr);canvas.height=Math.round(height*dpr);}
  ctx.setTransform(dpr,0,0,dpr,0,0);ctx.clearRect(0,0,width,height);
  const margin=compact?25:54,span=width-2*margin,baseline=height*.53,ampPx=Math.min(height*.19,width*.12),diameter=compact?7.5:11.5,temporal=Math.cos(TAU*s.frequency*s.time);
  const px=x=>margin+x*span/constants.length,py=x=>baseline-ampPx*Math.sin(s.n*Math.PI*x/constants.length)*temporal;
  const background=ctx.createLinearGradient(0,0,width*.3,height);background.addColorStop(0,'#f9faf5');background.addColorStop(.6,'#edf1e8');background.addColorStop(1,'#dce5d9');ctx.fillStyle=background;ctx.fillRect(0,0,width,height);
  const light=ctx.createRadialGradient(width*.35,0,0,width*.35,0,width);light.addColorStop(0,'rgba(255,255,249,.9)');light.addColorStop(1,'rgba(255,255,249,0)');ctx.fillStyle=light;ctx.fillRect(0,0,width,height);
  // The support, equilibrium axis and node positions never move with time.
  ctx.save();ctx.setLineDash([4,6]);line(ctx,margin,baseline,width-margin,baseline,'#9baea0',1.1);ctx.restore();
  for(const x of s.antinodes){const screen=px(x);ctx.save();ctx.setLineDash([2,5]);line(ctx,screen,baseline-ampPx,screen,baseline+ampPx,'rgba(53,128,112,.3)',1);ctx.restore();line(ctx,screen-4,baseline-ampPx,screen+4,baseline-ampPx,'rgba(53,128,112,.36)',1);line(ctx,screen-4,baseline+ampPx,screen+4,baseline+ampPx,'rgba(53,128,112,.36)',1);}
  const clampWidth=compact?13:19,clampHeight=compact?57:76;
  for(const x of [margin,width-margin]){
   const metal=ctx.createLinearGradient(x-clampWidth/2,0,x+clampWidth/2,0);metal.addColorStop(0,'#707e7b');metal.addColorStop(.28,'#d4ded7');metal.addColorStop(.58,'#a2b1a7');metal.addColorStop(1,'#626f69');ctx.fillStyle=metal;ctx.fillRect(x-clampWidth/2,baseline-clampHeight/2,clampWidth,clampHeight);ctx.strokeStyle='#6f7d70';ctx.lineWidth=1;ctx.strokeRect(x-clampWidth/2,baseline-clampHeight/2,clampWidth,clampHeight);line(ctx,x-clampWidth*.22,baseline-clampHeight*.32,x+clampWidth*.22,baseline-clampHeight*.32,'#667266',2);line(ctx,x-clampWidth*.22,baseline+clampHeight*.32,x+clampWidth*.22,baseline+clampHeight*.32,'#667266',2);
  }
  const path=(offset=0)=>{ctx.beginPath();for(let screen=margin;screen<=width-margin;screen+=1.5){const x=(screen-margin)*constants.length/span,y=py(x)+offset;if(screen===margin)ctx.moveTo(screen,y);else ctx.lineTo(screen,y);}ctx.lineTo(width-margin,baseline+offset);};
  ctx.save();path(10);ctx.lineWidth=diameter+1;ctx.strokeStyle='rgba(57,75,55,.10)';ctx.shadowColor='rgba(42,63,38,.13)';ctx.shadowBlur=11;ctx.stroke();ctx.restore();
  const texture=options.image,photoReady=texture&&texture.complete&&texture.naturalWidth>0;
  if(photoReady){
   const crop=constants.texture,sourcePerScreen=crop.height/diameter;
   // A given horizontal material coordinate keeps its fibres as it moves vertically.
   for(let screen=margin;screen<width-margin;screen+=1.5){
    const x=(screen-margin)*constants.length/span,y=py(x),slope=-ampPx*s.n*Math.PI/span*Math.cos(s.n*Math.PI*x/constants.length)*temporal,angle=Math.atan(slope),dw=1.5*Math.sqrt(1+slope*slope)+1.3;
    const sourceX=((screen-margin)*sourcePerScreen)%crop.width,sourceWidth=Math.min(1.5*sourcePerScreen+1,crop.width-sourceX);
    ctx.save();ctx.translate(screen,y);ctx.rotate(angle);ctx.drawImage(texture,crop.x+sourceX,crop.y,sourceWidth,crop.height,-dw/2,-diameter/2,dw,diameter);ctx.restore();
   }
  }else{
   path();ctx.lineCap='round';ctx.strokeStyle='#917449';ctx.lineWidth=diameter;ctx.stroke();path(-1);ctx.strokeStyle='#d4be8b';ctx.lineWidth=diameter-2;ctx.stroke();path(-diameter*.2);ctx.strokeStyle='#f5e4b7';ctx.lineWidth=diameter*.22;ctx.stroke();
   for(let screen=margin;screen<width-margin;screen+=4){const x=(screen-margin)*constants.length/span,y=py(x);ctx.save();ctx.translate(screen,y);const slope=-ampPx*s.n*Math.PI/span*Math.cos(s.n*Math.PI*x/constants.length)*temporal;ctx.rotate(Math.atan(slope));line(ctx,-2,-diameter*.32,2,diameter*.32,'#9c8257',.7);ctx.restore();}
  }
  for(const x of s.nodes)bead(ctx,px(x),baseline,compact?4.8:6.2,'gold');
  for(const x of s.antinodes)bead(ctx,px(x),py(x),compact?4.6:6.2,'teal');
  ctx.textAlign='center';ctx.fillStyle='#61776b';ctx.font='600 '+(compact?12:14)+'px Inter, system-ui, sans-serif';ctx.fillText('Extremos fijos',width/2,compact?32:39);
  const ruler=height-(compact?38:36);line(ctx,margin,ruler,width-margin,ruler,'rgba(91,116,98,.4)',1);line(ctx,margin,ruler-4,margin,ruler+5,'#879c86',1);line(ctx,width-margin,ruler-4,width-margin,ruler+5,'#879c86',1);
  ctx.font='500 '+(compact?12:13)+'px Georgia, serif';ctx.fillStyle='#6b806c';ctx.fillText('0',margin,ruler+22);ctx.fillText('l',width-margin,ruler+22);ctx.font='500 '+(compact?11:12)+'px Inter, system-ui, sans-serif';ctx.fillText('Misma longitud de cuerda',width/2,ruler+22);
 }
 function active(a){return !a.disposed&&a.playing&&a.visible&&!document?.hidden&&a.host.isConnected!==false;}
 function listen(target,event,handler,cleanups){if(!target?.addEventListener)return;target.addEventListener(event,handler);cleanups.push(()=>target.removeEventListener(event,handler));}
 function render(a){if(a.disposed)return;const canvas=a.host.querySelector('[data-swh-canvas]');drawScene(canvas,a.parameters,a.time,{width:numeric(canvas?.clientWidth,a.host.clientWidth||900),image:a.image});}
 function sync(a){
  if(a.disposed)return;const {n}=a.parameters,s=sample(a.parameters,a.time);
  for(const button of a.host.querySelectorAll('[data-swh-mode]'))button.setAttribute('aria-pressed',String(Number(button.dataset.swhMode)===n));
  a.host.querySelector('[data-swh-name]').textContent=names[n-1];a.host.querySelector('[data-swh-nodes]').textContent=String(n+1);a.host.querySelector('[data-swh-antinodes]').textContent=String(n);
  a.host.querySelector('[data-swh-frequency]').textContent=n===1?'f₁':n+' f₁';a.host.querySelector('[data-swh-wavelength]').textContent=['2l','l','2l/3','l/2','2l/5'][n-1];
  const play=a.host.querySelector('[data-swh-action="play"]');play.textContent=a.playing?'Ⅱ Pausar':'▶ Reproducir';play.setAttribute('aria-label',a.playing?'Pausar los armónicos':'Reproducir los armónicos');play.setAttribute('aria-pressed',String(a.playing));
  a.host.querySelector('[data-swh-canvas]')?.setAttribute('aria-label',names[n-1]+' de una cuerda fija en ambos extremos: '+s.nodes.length+' nodos inmóviles y '+(n===1?'1 vientre que oscila. Frecuencia igual a la fundamental.':s.antinodes.length+' vientres que oscilan. Frecuencia '+n+' veces la fundamental.'));
 }
 function schedule(){if(frame&&!instances.some(active)){global.cancelAnimationFrame(frame);frame=0;}if(!frame&&instances.some(active))frame=global.requestAnimationFrame(tick);}
 function tick(now){
  frame=0;for(const a of instances){if(!active(a)){a.last=null;a.pending=0;continue;}if(a.last!==null)a.pending+=Math.min(.1,Math.max(0,(now-a.last)/1000));a.last=now;if(now-a.drawAt>=1000/30-1){a.time+=a.pending*constants.timeScale;a.pending=0;a.drawAt=now;render(a);}}schedule();
 }
 function destroy(){
  if(frame){global.cancelAnimationFrame(frame);frame=0;}for(const cleanup of sharedCleanups)cleanup();sharedCleanups=[];
  for(const a of instances){a.disposed=true;a.observer?.disconnect();a.resizeObserver?.disconnect();if(a.image){a.image.onload=null;a.image.onerror=null;}for(const cleanup of a.cleanups)cleanup();}instances=[];
 }
 function mount(root){
  destroy();const placeholders=root?.matches?.('[data-standing-wave-harmonics]')?[root]:Array.from(root?.querySelectorAll?.('[data-standing-wave-harmonics]')||[]),reduced=!!global.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  for(const placeholder of placeholders){
   const id='standing-wave-harmonics-'+(++sequence);
   placeholder.innerHTML=`<section class="swh-lab" id="${id}" data-activity-fullscreen aria-labelledby="${id}-title"><header class="swh-header"><p class="swh-eyebrow">Una cuerda, cinco modos</p><h3 id="${id}-title">Compara los armónicos</h3><p>Selecciona un armónico y observa cuántos nodos y vientres aparecen.</p></header><div class="swh-controls"><div class="swh-selector" role="group" aria-label="Selecciona un armónico">${names.map((name,i)=>`<button type="button" data-swh-mode="${i+1}" aria-label="${name}" aria-pressed="${i===0}">${i+1}.º</button>`).join('')}</div><button type="button" class="swh-play" data-swh-action="play"></button></div><div class="swh-current" aria-live="polite" aria-atomic="true"><strong data-swh-name>Primer armónico</strong><span>Misma cuerda · extremos fijos</span></div><div class="swh-stage"><canvas class="swh-canvas" data-swh-canvas role="img"></canvas></div><div class="swh-readouts"><div><span>Nodos</span><strong data-swh-nodes>2</strong></div><div><span>Vientres</span><strong data-swh-antinodes>1</strong></div><div><span>Frecuencia</span><strong data-swh-frequency>f₁</strong></div><div><span>Longitud de onda</span><strong data-swh-wavelength>2l</strong></div></div><footer class="swh-footer"><div class="swh-legend"><span><i class="swh-dot swh-node"></i>Nodo: permanece quieto</span><span><i class="swh-dot swh-antinode"></i>Vientre: máxima oscilación</span></div><p>La longitud, la rapidez y la amplitud máxima se mantienen. Al aumentar el armónico hay más vientres y la cuerda oscila más rápido. <strong>Cámara lenta ×4.</strong></p></footer></section>`;
   const host=placeholder.firstElementChild,a={id,host,parameters:sanitize(),time:0,playing:!reduced,visible:!document?.hidden,last:null,pending:0,drawAt:-Infinity,disposed:false,cleanups:[],image:null};instances.push(a);
   listen(host,'click',event=>{
    if(a.disposed)return;const mode=event.target.closest?.('[data-swh-mode]'),play=event.target.closest?.('[data-swh-action="play"]');
    if(mode){const next=sanitize({n:Number(mode.dataset.swhMode)});if(next.n===a.parameters.n)return;a.parameters=next;a.time=0;}
    else if(play)a.playing=!a.playing;else return;
    a.last=null;a.pending=0;a.drawAt=-Infinity;sync(a);render(a);schedule();
   },a.cleanups);
   if(typeof global.Image==='function'){a.image=new global.Image();a.image.onload=()=>{if(!a.disposed)render(a);};a.image.onerror=()=>{if(!a.disposed)render(a);};a.image.src=constants.texture.src;}
   if(typeof global.IntersectionObserver==='function'){a.observer=new global.IntersectionObserver(entries=>{if(a.disposed)return;a.visible=entries.some(entry=>entry.isIntersecting);a.last=null;a.pending=0;schedule();},{threshold:0});a.observer.observe(host);}
   if(typeof global.ResizeObserver==='function'){a.resizeObserver=new global.ResizeObserver(()=>{if(!a.disposed)render(a);});a.resizeObserver.observe(host);}
   sync(a);render(a);
  }
  if(instances.length){listen(document,'visibilitychange',()=>{for(const a of instances){a.last=null;a.pending=0;}schedule();},sharedCleanups);listen(global,'resize',()=>{for(const a of instances)render(a);},sharedCleanups);listen(global,'pagehide',destroy,sharedCleanups);}schedule();
 }
 function getState(){return instances.map(a=>({n:a.parameters.n,parameters:{...a.parameters},time:a.time,playing:a.playing,visible:a.visible}));}
 global.StandingWaveHarmonics=Object.freeze({mount,destroy,getState,sample,sanitize,constants,drawScene});
})(window);
