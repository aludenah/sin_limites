/* El patrón longitudinal avanza; cada elemento del aire oscila localmente. */
(function(global){
 'use strict';
 const document=global.document,TAU=2*Math.PI;
 const constants=Object.freeze({start:0,length:4,wavelength:1.6,frequency:.4,amplitude:.06,timeScale:1,columns:65,rows:7,materialStart:-.125,materialEnd:4.125,markerX:2,k:TAU/1.6,omega:TAU*.4});
 let instances=[],frame=0,sequence=0,sharedCleanups=[];
 const numeric=(value,fallback)=>value!==null&&value!==''&&Number.isFinite(Number(value))?Number(value):fallback;
 const clamp=(value,min,max)=>Math.min(max,Math.max(min,value));
 const clean=value=>Math.abs(value)<1e-12?0:value;
 function sample(time=0){
  const elapsed=Math.max(0,numeric(time,0)),phase=constants.omega*(elapsed%(1/constants.frequency)),a=constants.amplitude,k=constants.k;
  const at=(x0,y0,row,column)=>{const angle=k*x0-phase,displacement=clean(a*Math.sin(angle));return {x0,x:x0+displacement,y0,y:y0,displacement,densityRatio:1/(1+a*k*Math.cos(angle)),row,column};};
  const particles=[];
  for(let column=0;column<constants.columns;column++)for(let row=0;row<constants.rows;row++)particles.push(at(constants.materialStart+column*(constants.materialEnd-constants.materialStart)/(constants.columns-1),(row-(constants.rows-1)/2)*.2,row,column));
  const centers=offset=>{const base=phase/k+offset,list=[];for(let j=Math.ceil((constants.start-base)/constants.wavelength);j<=Math.floor((constants.length-base)/constants.wavelength);j++)list.push(clean(base+j*constants.wavelength));return list;};
  return {time:elapsed,frequency:constants.frequency,wavelength:constants.wavelength,speed:constants.frequency*constants.wavelength,sourceDisplacement:clean(a*Math.sin(-phase)),particles,marker:at(constants.markerX,0,3,32),compressions:centers(constants.wavelength/2),rarefactions:centers(0)};
 }
 function line(ctx,x1,y1,x2,y2,color,width=1){ctx.beginPath();ctx.moveTo(x1,y1);ctx.lineTo(x2,y2);ctx.strokeStyle=color;ctx.lineWidth=width;ctx.stroke();}
 function arrow(ctx,x1,y,x2,color,both=false){const sign=Math.sign(x2-x1);line(ctx,x1,y,x2,y,color,2);line(ctx,x2-sign*6,y-4,x2,y,color,2);line(ctx,x2-sign*6,y+4,x2,y,color,2);if(both){line(ctx,x1+sign*6,y-4,x1,y,color,2);line(ctx,x1+sign*6,y+4,x1,y,color,2);}}
 function bead(ctx,x,y,r){const g=ctx.createRadialGradient(x-r*.35,y-r*.4,0,x,y,r);g.addColorStop(0,'#fff4c4');g.addColorStop(.38,'#e7bf5d');g.addColorStop(1,'#9b7130');ctx.beginPath();ctx.arc(x,y,r,0,TAU);ctx.fillStyle=g;ctx.fill();ctx.strokeStyle='#927039';ctx.lineWidth=1;ctx.stroke();}
 function drawScene(canvas,time=0,options={}){
  const ctx=canvas?.getContext?.('2d');if(!ctx)return;
  const s=sample(time),width=Math.max(180,numeric(options.width,canvas.clientWidth||900)),compact=width<480,height=Math.max(330,numeric(options.height,canvas.clientHeight||(compact?420:400))),dpr=clamp(numeric(global.devicePixelRatio,1),1,2);
  if(canvas.width!==Math.round(width*dpr)||canvas.height!==Math.round(height*dpr)){canvas.width=Math.round(width*dpr);canvas.height=Math.round(height*dpr);}
  ctx.setTransform(dpr,0,0,dpr,0,0);ctx.clearRect(0,0,width,height);
  const left=compact?66:139,right=width-(compact?17:35),scaleX=(right-left)/constants.length,top=78,bottom=Math.max(top+110,height-160),mid=(top+bottom)/2,scaleY=(bottom-top-24)/1.2,px=x=>left+x*scaleX,py=y=>mid+y*scaleY;
  const bg=ctx.createLinearGradient(0,0,width*.25,height);bg.addColorStop(0,'#fcfdfb');bg.addColorStop(1,'#eaf3ee');ctx.fillStyle=bg;ctx.fillRect(0,0,width,height);
  ctx.textAlign='left';ctx.fillStyle='#39706b';ctx.font='650 '+(compact?12:15)+'px Inter, system-ui, sans-serif';ctx.fillText('El sonido avanza',compact?16:left,32);arrow(ctx,compact?width-88:width-211,27,right,'#31897d');
  ctx.fillStyle='rgba(242,249,247,.9)';ctx.fillRect(left,top,right-left,bottom-top);ctx.strokeStyle='#cedfd8';ctx.lineWidth=1;ctx.strokeRect(left,top,right-left,bottom-top);
  ctx.save();ctx.beginPath();ctx.rect(left,top,right-left,bottom-top);ctx.clip();
  for(const x of s.compressions){ctx.fillStyle='rgba(42,135,126,.13)';ctx.fillRect(px(x)-.12*scaleX,top,.24*scaleX,bottom-top);}
  for(const x of s.rarefactions){ctx.fillStyle='rgba(129,164,184,.055)';ctx.fillRect(px(x)-.12*scaleX,top,.24*scaleX,bottom-top);}
  for(const p of s.particles){ctx.beginPath();ctx.arc(px(p.x),py(p.y),compact?1.15:2.6,0,TAU);ctx.fillStyle='#518fa5';ctx.globalAlpha=clamp(.65+(p.densityRatio-1)*.45,.5,.95);ctx.fill();}ctx.globalAlpha=1;
  const markerY=py(s.marker.y),markerX=px(s.marker.x),meanX=px(s.marker.x0);
  ctx.save();ctx.setLineDash([3,5]);line(ctx,meanX,top,meanX,bottom,'rgba(173,139,66,.38)',1);ctx.restore();ctx.beginPath();ctx.arc(meanX,markerY,compact?5.5:8,0,TAU);ctx.strokeStyle='#b49c69';ctx.lineWidth=1.2;ctx.stroke();bead(ctx,markerX,markerY,compact?4.4:6.5);ctx.restore();
  ctx.textAlign='center';ctx.font='750 '+(compact?12:15)+'px Inter, system-ui, sans-serif';
  for(const [list,label,color] of [[s.compressions,'C','#247e70'],[s.rarefactions,'R','#758fa4']])for(const x of list){const screen=px(x);if(screen<left+7||screen>right-7)continue;ctx.fillStyle=color;ctx.fillText(label,screen,top-11);line(ctx,screen,top-6,screen,top-1,color,1);}
  ctx.fillStyle='#876a32';ctx.font='700 '+(compact?12:15)+'px Georgia, serif';ctx.fillText('P',markerX,markerY-(compact?12:15));
  // The diaphragm follows the displacement at the source; the enclosure stays still.
  const cabinetX=compact?10:31,cabinetW=compact?25:53,coneRest=left-(compact?10:18),faceX=coneRest+s.sourceDisplacement*scaleX,bodyH=(bottom-top)*.82,bodyTop=mid-bodyH/2;
  const cabinet=ctx.createLinearGradient(cabinetX,0,cabinetX+cabinetW,0);cabinet.addColorStop(0,'#183a49');cabinet.addColorStop(.35,'#436672');cabinet.addColorStop(1,'#193d4a');ctx.fillStyle=cabinet;ctx.fillRect(cabinetX,bodyTop,cabinetW,bodyH);ctx.strokeStyle='#64808a';ctx.lineWidth=1;ctx.strokeRect(cabinetX,bodyTop,cabinetW,bodyH);
  const metal=ctx.createLinearGradient(cabinetX+cabinetW,bodyTop,faceX,bodyTop+bodyH);metal.addColorStop(0,'#5a727a');metal.addColorStop(.4,'#dce4df');metal.addColorStop(.67,'#819b9b');metal.addColorStop(1,'#435f69');ctx.beginPath();ctx.moveTo(cabinetX+cabinetW,mid-bodyH*.35);ctx.lineTo(faceX,mid-bodyH*.49);ctx.lineTo(faceX,mid+bodyH*.49);ctx.lineTo(cabinetX+cabinetW,mid+bodyH*.35);ctx.closePath();ctx.fillStyle=metal;ctx.fill();
  const face=ctx.createRadialGradient(faceX-(compact?2:4),mid-bodyH*.12,1,faceX,mid,bodyH*.5);face.addColorStop(0,'#718b92');face.addColorStop(.4,'#264a59');face.addColorStop(1,'#0e2b3c');ctx.beginPath();ctx.ellipse(faceX,mid,compact?6.5:13,bodyH*.49,0,0,TAU);ctx.fillStyle=face;ctx.fill();ctx.strokeStyle='#b9cfcb';ctx.lineWidth=compact?2:3;ctx.stroke();ctx.beginPath();ctx.ellipse(faceX,mid,compact?3.5:7,bodyH*.18,0,0,TAU);ctx.fillStyle='#6c8992';ctx.fill();
  // A labelled magnified detail makes the same local motion readable on phones.
  const zoomY=height-72,zoomX=width/2,zoomA=compact?26:48,zoomDisplacement=s.marker.displacement/constants.amplitude*zoomA;
  line(ctx,16,bottom+24,width-16,bottom+24,'#d4e2d9',1);ctx.font='650 '+(compact?12:14)+'px Inter, system-ui, sans-serif';ctx.fillStyle='#6e795e';ctx.textAlign='center';ctx.fillText('P: detalle ampliado',zoomX,height-111);
  ctx.save();ctx.setLineDash([3,4]);line(ctx,zoomX-zoomA-12,zoomY,zoomX+zoomA+12,zoomY,'#b7c4b2',1);line(ctx,zoomX,zoomY-17,zoomX,zoomY+17,'#c8b37f',1);ctx.restore();ctx.beginPath();ctx.arc(zoomX,zoomY,7,0,TAU);ctx.strokeStyle='#b39a61';ctx.lineWidth=1.5;ctx.stroke();bead(ctx,zoomX+zoomDisplacement,zoomY,compact?7:9);arrow(ctx,zoomX-zoomA-10,height-37,zoomX+zoomA+10,'#ac883d',true);ctx.font='500 '+(compact?12:13)+'px Inter, system-ui, sans-serif';ctx.fillStyle='#7f795e';ctx.fillText('Va y viene; no avanza con la onda',zoomX,height-12);
 }
 function active(a){return !a.disposed&&a.playing&&a.visible&&!document?.hidden&&a.host.isConnected!==false;}
 function listen(target,event,handler,cleanups){if(!target?.addEventListener)return;target.addEventListener(event,handler);cleanups.push(()=>target.removeEventListener(event,handler));}
 function render(a){if(a.disposed)return;const canvas=a.host.querySelector('[data-spa-canvas]');drawScene(canvas,a.time,{width:numeric(canvas?.clientWidth,a.host.clientWidth||900)});canvas?.setAttribute('aria-label','Un parlante origina una onda longitudinal. Las compresiones C y las rarefacciones R avanzan hacia la derecha. Las partículas azules y la partícula dorada P solo oscilan horizontalmente alrededor de posiciones de equilibrio. El detalle inferior amplía el movimiento de P.');}
 function sync(a){const play=a.host.querySelector('[data-spa-action="play"]');play.textContent=a.playing?'Ⅱ Pausar':'▶ Reproducir';play.setAttribute('aria-label',a.playing?'Pausar la propagación del sonido':'Reproducir la propagación del sonido');play.setAttribute('aria-pressed',String(a.playing));}
 function schedule(){if(frame&&!instances.some(active)){global.cancelAnimationFrame(frame);frame=0;}if(!frame&&instances.some(active))frame=global.requestAnimationFrame(tick);}
 function tick(now){frame=0;for(const a of instances){if(!active(a)){a.last=null;a.pending=0;continue;}if(a.last!==null)a.pending+=Math.min(.1,Math.max(0,(now-a.last)/1000));a.last=now;if(now-a.drawAt>=1000/30-1){a.time+=a.pending*constants.timeScale;a.pending=0;a.drawAt=now;render(a);}}schedule();}
 function destroy(){if(frame){global.cancelAnimationFrame(frame);frame=0;}for(const cleanup of sharedCleanups)cleanup();sharedCleanups=[];for(const a of instances){a.disposed=true;a.observer?.disconnect();a.resizeObserver?.disconnect();for(const cleanup of a.cleanups)cleanup();}instances=[];}
 function mount(root){
  destroy();const placeholders=root?.matches?.('[data-sound-propagation-animation]')?[root]:Array.from(root?.querySelectorAll?.('[data-sound-propagation-animation]')||[]),reduced=!!global.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  for(const placeholder of placeholders){
   const id='sound-propagation-'+(++sequence);
   placeholder.innerHTML=`<section class="spa-lab" id="${id}" data-activity-fullscreen aria-labelledby="${id}-title"><header class="spa-header"><p class="spa-eyebrow">La perturbación viaja; el aire oscila</p><h3 id="${id}-title">Así se propaga el sonido</h3><p>Observa cómo avanza el patrón mientras cada partícula permanece cerca de su posición inicial.</p></header><div class="spa-controls"><button type="button" data-spa-action="play"></button><button type="button" data-spa-action="restart" aria-label="Reiniciar la propagación del sonido">↺ Reiniciar</button></div><div class="spa-stage"><canvas class="spa-canvas" data-spa-canvas role="img"></canvas></div><div class="spa-legend"><div><strong><i class="spa-letter spa-compression">C</i>Compresión</strong><span>Partículas más próximas.</span></div><div><strong><i class="spa-letter spa-rarefaction">R</i>Rarefacción</strong><span>Partículas más separadas.</span></div></div><footer class="spa-footer"><p>La partícula dorada <strong>P</strong> oscila de ida y vuelta; el detalle inferior amplía ese movimiento. Las zonas de compresión y rarefacción se desplazan hacia la derecha.</p><p>Se representa un tramo del aire con una onda plana ideal. <strong>Movimiento ralentizado; no representa la frecuencia real del sonido.</strong></p></footer></section>`;
   const host=placeholder.firstElementChild,a={id,host,time:0,playing:!reduced,visible:!document?.hidden,last:null,pending:0,drawAt:-Infinity,disposed:false,cleanups:[]};instances.push(a);
   listen(host,'click',event=>{if(a.disposed)return;const button=event.target.closest?.('[data-spa-action]');if(!button)return;const action=button.dataset.spaAction;if(action==='play')a.playing=!a.playing;else if(action==='restart')a.time=0;else return;a.last=null;a.pending=0;a.drawAt=-Infinity;sync(a);render(a);schedule();},a.cleanups);
   if(typeof global.IntersectionObserver==='function'){a.observer=new global.IntersectionObserver(entries=>{if(a.disposed)return;a.visible=entries.some(entry=>entry.isIntersecting);a.last=null;a.pending=0;schedule();},{threshold:0});a.observer.observe(host);}
   if(typeof global.ResizeObserver==='function'){a.resizeObserver=new global.ResizeObserver(()=>{if(!a.disposed)render(a);});a.resizeObserver.observe(host);}
   sync(a);render(a);
  }
  if(instances.length){listen(document,'visibilitychange',()=>{for(const a of instances){a.last=null;a.pending=0;}schedule();},sharedCleanups);listen(global,'resize',()=>{for(const a of instances)render(a);},sharedCleanups);listen(global,'pagehide',destroy,sharedCleanups);}schedule();
 }
 function getState(){return instances.map(a=>({time:a.time,playing:a.playing,visible:a.visible}));}
 global.SoundPropagationAnimation=Object.freeze({mount,destroy,getState,sample,constants,drawScene});
})(window);
