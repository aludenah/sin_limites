/* Dos ondas viajeras, una sola suma sincronizada y un patrón estacionario. */
(function(global){
 'use strict';
 const document=global.document,TAU=2*Math.PI;
 const constants=Object.freeze({length:4,amplitude:.12,frequency:1,markerX:.5,timeScale:.25,k:Math.PI/2,wavelength:4,period:1,texture:Object.freeze({src:'assets/string-rope-photoreal.webp',x:0,y:434,width:1536,height:147})});
 const BLUE='#397fa8',CORAL='#c57565',TEAL='#287c6a',MARKER='#274e64';
 let instances=[],frame=0,sequence=0,sharedCleanups=[];
 const numeric=(value,fallback)=>value!==null&&value!==''&&Number.isFinite(Number(value))?Number(value):fallback;
 const clamp=(value,min,max)=>Math.min(max,Math.max(min,value));
 const clean=value=>Math.abs(value)<1e-12?0:value;
 const format=(value,digits=1)=>Number(value).toLocaleString('es-ES',{minimumFractionDigits:digits,maximumFractionDigits:digits});
 const signed=value=>{const cm=clean(value*100);return Math.abs(cm)<.005?'0,00':(cm>0?'+':'−')+format(Math.abs(cm),2);};
 function sample(time=0){
  const elapsed=Math.max(0,numeric(time,0)),phase=TAU*constants.frequency*elapsed;
  const at=x=>{const y1=clean(constants.amplitude*Math.sin(constants.k*x-phase)),y2=clean(constants.amplitude*Math.sin(constants.k*x+phase));return {x,y1,y2,y:clean(y1+y2)};};
  return {time:elapsed,amplitude:constants.amplitude,length:constants.length,frequency:constants.frequency,wavelength:constants.wavelength,period:constants.period,points:Array.from({length:401},(_,i)=>at(i*constants.length/400)),nodes:[0,2,4],antinodes:[1,3],marker:at(constants.markerX)};
 }
 function line(ctx,x1,y1,x2,y2,color,width=1){ctx.beginPath();ctx.moveTo(x1,y1);ctx.lineTo(x2,y2);ctx.strokeStyle=color;ctx.lineWidth=width;ctx.stroke();}
 function arrow(ctx,x1,y,x2,color){const sign=Math.sign(x2-x1);line(ctx,x1,y,x2,y,color,2);line(ctx,x2-sign*6,y-4,x2,y,color,2);line(ctx,x2-sign*6,y+4,x2,y,color,2);}
 function dot(ctx,x,y,r,color){ctx.beginPath();ctx.arc(x,y,r,0,TAU);ctx.fillStyle=color;ctx.fill();ctx.strokeStyle='#fffdf4';ctx.lineWidth=1.5;ctx.stroke();}
 function drawScene(canvas,time=0,options={}){
  const ctx=canvas?.getContext?.('2d');if(!ctx)return;
  const s=sample(time),width=Math.max(180,numeric(options.width,canvas.clientWidth||900)),compact=width<480,height=Math.max(360,numeric(options.height,canvas.clientHeight||(compact?550:510))),dpr=clamp(numeric(global.devicePixelRatio,1),1,2);
  if(canvas.width!==Math.round(width*dpr)||canvas.height!==Math.round(height*dpr)){canvas.width=Math.round(width*dpr);canvas.height=Math.round(height*dpr);}
  ctx.setTransform(dpr,0,0,dpr,0,0);ctx.clearRect(0,0,width,height);
  const margin=compact?23:50,span=width-2*margin,rowHeight=(height-26)/3,baselines=[0,1,2].map(i=>i*rowHeight+rowHeight*.59),amplitudePx=Math.min(rowHeight*.29,68),scaleY=amplitudePx/(2*constants.amplitude),px=x=>margin+x*span/constants.length;
  const bg=ctx.createLinearGradient(0,0,width*.3,height);bg.addColorStop(0,'#fcfdf9');bg.addColorStop(1,'#edf3e9');ctx.fillStyle=bg;ctx.fillRect(0,0,width,height);
  const specs=[{key:'y1',label:'Onda 1 · y₁',color:BLUE},{key:'y2',label:'Onda 2 · y₂',color:CORAL},{key:'y',label:'Resultado · y₁ + y₂',color:TEAL}];
  const at=(x,key)=>{const phase=TAU*constants.frequency*s.time,a=constants.amplitude,k=constants.k;return key==='y1'?a*Math.sin(k*x-phase):key==='y2'?a*Math.sin(k*x+phase):2*a*Math.sin(k*x)*Math.cos(phase);};
  const path=(key,row,offset=0)=>{ctx.beginPath();for(let screen=margin;screen<=width-margin;screen+=1.5){const x=(screen-margin)*constants.length/span,y=baselines[row]-at(x,key)*scaleY+offset;if(screen===margin)ctx.moveTo(screen,y);else ctx.lineTo(screen,y);}ctx.lineTo(width-margin,baselines[row]-at(constants.length,key)*scaleY+offset);};
  // Every row uses the same horizontal positions, clock and vertical displacement scale.
  for(let row=0;row<3;row++){
   const spec=specs[row],top=row*rowHeight,baseline=baselines[row];
   ctx.textAlign='left';ctx.fillStyle=spec.color;ctx.font='700 '+(compact?12:15)+'px Inter, system-ui, sans-serif';ctx.fillText(spec.label,margin,top+21);
   if(row<2){const end=width-margin,start=end-(compact?39:81);arrow(ctx,row===0?start:end,top+17,row===0?end:start,spec.color);}
   else if(!compact){ctx.fillStyle='#738b79';ctx.font='500 12px Inter, system-ui, sans-serif';ctx.textAlign='right';ctx.fillText('Patrón fijo',width-margin,top+21);}
   ctx.save();ctx.setLineDash([4,6]);line(ctx,margin,baseline,width-margin,baseline,'#a9b9ad',1);ctx.restore();
   if(row<2){path(spec.key,row,2);ctx.strokeStyle=spec.color+'15';ctx.lineWidth=7;ctx.stroke();path(spec.key,row);ctx.strokeStyle=spec.color;ctx.lineWidth=compact?2.8:3.5;ctx.lineCap='round';ctx.lineJoin='round';ctx.stroke();}
   else{
    const diameter=compact?6:8.5,photo=options.image,ready=photo&&photo.complete&&photo.naturalWidth>0;
    for(const x of [0,constants.length]){const sx=px(x),metal=ctx.createLinearGradient(sx-6,0,sx+6,0);metal.addColorStop(0,'#829585');metal.addColorStop(.35,'#d9e0d5');metal.addColorStop(1,'#798c7c');ctx.fillStyle=metal;ctx.fillRect(sx-6,baseline-22,12,44);ctx.strokeStyle='#8ca08c';ctx.lineWidth=1;ctx.strokeRect(sx-6,baseline-22,12,44);}
    ctx.save();path('y',row,6);ctx.strokeStyle='rgba(70,99,63,.1)';ctx.lineWidth=diameter;ctx.shadowColor='rgba(53,76,46,.1)';ctx.shadowBlur=7;ctx.stroke();ctx.restore();
    if(ready){const crop=constants.texture,ratio=crop.height/diameter;for(let screen=margin;screen<width-margin;screen+=1.5){const x=(screen-margin)*constants.length/span,y=baseline-at(x,'y')*scaleY,slope=-2*constants.amplitude*constants.k*Math.cos(constants.k*x)*Math.cos(TAU*s.frequency*s.time)*scaleY*constants.length/span,sourceX=((screen-margin)*ratio)%crop.width,sw=Math.min(1.5*ratio+1,crop.width-sourceX),dw=1.5*Math.sqrt(1+slope*slope)+1.2;ctx.save();ctx.translate(screen,y);ctx.rotate(Math.atan(slope));ctx.drawImage(photo,crop.x+sourceX,crop.y,sw,crop.height,-dw/2,-diameter/2,dw,diameter);ctx.restore();}}
    else{path('y',row);ctx.strokeStyle='#8f794d';ctx.lineWidth=diameter;ctx.stroke();path('y',row,-.8);ctx.strokeStyle='#dfcca0';ctx.lineWidth=diameter-2;ctx.stroke();}
    for(const x of s.nodes)dot(ctx,px(x),baseline,compact?4.3:5.4,'#d2ab50');
   }
   const markerY=baseline-s.marker[spec.key]*scaleY,markerX=px(constants.markerX);
   ctx.save();ctx.setLineDash([2,4]);line(ctx,markerX,top+43,markerX,baseline+amplitudePx+7,'rgba(118,137,112,.48)',1);ctx.restore();
   if(Math.abs(markerY-baseline)>2)line(ctx,markerX,baseline,markerX,markerY,spec.color,2);
   const markerRadius=compact?5:6;ctx.beginPath();ctx.moveTo(markerX,markerY-markerRadius);ctx.lineTo(markerX+markerRadius,markerY);ctx.lineTo(markerX,markerY+markerRadius);ctx.lineTo(markerX-markerRadius,markerY);ctx.closePath();ctx.fillStyle=MARKER;ctx.fill();ctx.strokeStyle='#fffdf4';ctx.lineWidth=1.2;ctx.stroke();ctx.textAlign='right';ctx.fillStyle=MARKER;ctx.font='700 '+(compact?11:13)+'px Georgia, serif';ctx.fillText('P',markerX-8,markerY-7);
   if(row<2)line(ctx,16,(row+1)*rowHeight-1,width-16,(row+1)*rowHeight-1,'#dce6d8',1);
  }
  const rulerY=height-23;line(ctx,margin,rulerY,width-margin,rulerY,'#b5c4b2',1);ctx.font='500 '+(compact?11:12)+'px Inter, system-ui, sans-serif';ctx.fillStyle='#7c8f7b';ctx.textAlign='center';for(const x of [0,2,4]){line(ctx,px(x),rulerY-3,px(x),rulerY+3,'#a7bba2',1);ctx.fillText(x===4?'4 m':String(x),px(x),height-6);}
 }
 function active(a){return !a.disposed&&a.playing&&a.visible&&!document?.hidden&&a.host.isConnected!==false;}
 function listen(target,event,handler,cleanups){if(!target?.addEventListener)return;target.addEventListener(event,handler);cleanups.push(()=>target.removeEventListener(event,handler));}
 function render(a){
  if(a.disposed)return;const s=sample(a.time),canvas=a.host.querySelector('[data-swsp-canvas]');drawScene(canvas,a.time,{width:numeric(canvas?.clientWidth,a.host.clientWidth||900),image:a.image});
  for(const [key,value] of [['y1',s.marker.y1],['y2',s.marker.y2],['sum',s.marker.y]])a.host.querySelector('[data-swsp-'+key+']').textContent=signed(value);
  a.host.querySelector('[data-swsp-time]').textContent=format(a.time,2)+' s';
  let state='Se suman los desplazamientos en P.';if(Math.abs(s.marker.y)<.0002)state='En P, las contribuciones se cancelan.';else if(Math.abs(s.marker.y1)<1e-12||Math.abs(s.marker.y2)<1e-12)state='En P, una contribución es nula.';else if(s.marker.y1*s.marker.y2>0)state='En P, las contribuciones se refuerzan.';else state='En P, las contribuciones se reducen.';
  a.host.querySelector('[data-swsp-phase]').textContent=state;
  canvas?.setAttribute('aria-label','Dos ondas viajeras en sentidos opuestos y su suma estacionaria, en tres perfiles alineados. El punto P conserva la posición 0,5 metros. Onda 1: '+signed(s.marker.y1)+' centímetros; onda 2: '+signed(s.marker.y2)+' centímetros; suma: '+signed(s.marker.y)+' centímetros. Los nodos de la resultante permanecen en 0, 2 y 4 metros.');
 }
 function sync(a){const play=a.host.querySelector('[data-swsp-action="play"]');play.textContent=a.playing?'Ⅱ Pausar':'▶ Reproducir';play.setAttribute('aria-label',a.playing?'Pausar la superposición':'Reproducir la superposición');play.setAttribute('aria-pressed',String(a.playing));}
 function schedule(){if(frame&&!instances.some(active)){global.cancelAnimationFrame(frame);frame=0;}if(!frame&&instances.some(active))frame=global.requestAnimationFrame(tick);}
 function tick(now){frame=0;for(const a of instances){if(!active(a)){a.last=null;a.pending=0;continue;}if(a.last!==null)a.pending+=Math.min(.1,Math.max(0,(now-a.last)/1000));a.last=now;if(now-a.drawAt>=1000/30-1){a.time+=a.pending*constants.timeScale;a.pending=0;a.drawAt=now;render(a);}}schedule();}
 function destroy(){if(frame){global.cancelAnimationFrame(frame);frame=0;}for(const cleanup of sharedCleanups)cleanup();sharedCleanups=[];for(const a of instances){a.disposed=true;a.observer?.disconnect();a.resizeObserver?.disconnect();if(a.image){a.image.onload=null;a.image.onerror=null;}for(const cleanup of a.cleanups)cleanup();}instances=[];}
 function mount(root){
  destroy();const placeholders=root?.matches?.('[data-standing-wave-superposition]')?[root]:Array.from(root?.querySelectorAll?.('[data-standing-wave-superposition]')||[]),reduced=!!global.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  for(const placeholder of placeholders){
   const id='standing-wave-superposition-'+(++sequence);
   placeholder.innerHTML=`<section class="swsp-lab" id="${id}" data-activity-fullscreen aria-labelledby="${id}-title"><header class="swsp-header"><p class="swsp-eyebrow">Dos ondas, una sola cuerda</p><h3 id="${id}-title">Así se forma la onda estacionaria</h3><p>Las ondas viajan en sentidos opuestos. Sus desplazamientos se suman en cada punto.</p></header><div class="swsp-controls"><button type="button" data-swsp-action="play"></button><button type="button" data-swsp-action="restart" aria-label="Reiniciar la superposición">↺ Reiniciar</button><button type="button" data-swsp-action="step" aria-label="Avanzar un octavo del período">Paso T/8</button></div><div class="swsp-clock"><strong>Cámara lenta ×4</strong><span>Tiempo: <b data-swsp-time>0,00 s</b></span></div><div class="swsp-stage"><canvas class="swsp-canvas" data-swsp-canvas role="img"></canvas></div><div class="swsp-point"><strong>En el mismo punto P · x = 0,5 m</strong><div class="swsp-addition"><div class="swsp-value swsp-blue"><span>y₁(P)</span><strong data-swsp-y1></strong><small>cm</small></div><b class="swsp-operator">+</b><div class="swsp-value swsp-coral"><span>y₂(P)</span><strong data-swsp-y2></strong><small>cm</small></div><b class="swsp-operator" aria-label="aproximadamente igual">≈</b><div class="swsp-value swsp-teal"><span>y(P)</span><strong data-swsp-sum></strong><small>cm</small></div></div><p data-swsp-phase></p><small class="swsp-rounding">Valores redondeados a 0,01 cm.</small></div><footer class="swsp-footer"><p>Las tres filas representan el <strong>mismo tramo de cuerda</strong>: primero separamos las dos contribuciones y después mostramos su suma. Las gráficas usan la <strong>misma escala</strong>.</p><p>Los puntos dorados son <strong>nodos</strong> de la resultante: permanecen inmóviles mientras el resto de la cuerda oscila. <strong>Paso T/8</strong> permite observar la suma por etapas.</p></footer></section>`;
   const host=placeholder.firstElementChild,a={id,host,time:0,playing:!reduced,visible:!document?.hidden,last:null,pending:0,drawAt:-Infinity,disposed:false,cleanups:[],image:null};instances.push(a);
   listen(host,'click',event=>{if(a.disposed)return;const button=event.target.closest?.('[data-swsp-action]');if(!button)return;const action=button.dataset.swspAction;if(action==='play')a.playing=!a.playing;else if(action==='restart')a.time=0;else if(action==='step'){a.playing=false;a.time+=constants.period/8;}else return;a.last=null;a.pending=0;a.drawAt=-Infinity;sync(a);render(a);schedule();},a.cleanups);
   if(typeof global.Image==='function'){a.image=new global.Image();a.image.onload=()=>{if(!a.disposed)render(a);};a.image.onerror=()=>{if(!a.disposed)render(a);};a.image.src=constants.texture.src;}
   if(typeof global.IntersectionObserver==='function'){a.observer=new global.IntersectionObserver(entries=>{if(a.disposed)return;a.visible=entries.some(entry=>entry.isIntersecting);a.last=null;a.pending=0;schedule();},{threshold:0});a.observer.observe(host);}
   if(typeof global.ResizeObserver==='function'){a.resizeObserver=new global.ResizeObserver(()=>{if(!a.disposed)render(a);});a.resizeObserver.observe(host);}
   sync(a);render(a);
  }
  if(instances.length){listen(document,'visibilitychange',()=>{for(const a of instances){a.last=null;a.pending=0;}schedule();},sharedCleanups);listen(global,'resize',()=>{for(const a of instances)render(a);},sharedCleanups);listen(global,'pagehide',destroy,sharedCleanups);}schedule();
 }
 function getState(){return instances.map(a=>({time:a.time,playing:a.playing,visible:a.visible}));}
 global.StandingWaveSuperposition=Object.freeze({mount,destroy,getState,sample,constants,drawScene});
})(window);
