/* Rapidez en una cuerda: modelo físico y textura fotográfica en movimiento. */
(function(global){
 'use strict';
 const document=global.document;
 const constants=Object.freeze({length:8,markerX:4,amplitude:.16,halfWidth:.65,initialCenter:.8,slowMotionFactor:.1,
  tension:Object.freeze({min:4,max:64,step:4,default:16}),linearDensity:Object.freeze({min:.01,max:.16,step:.01,default:.04}),
  texture:Object.freeze({src:'assets/string-rope-photoreal.webp',x:0,y:434,width:1536,height:147})});
 let instances=[],frame=0,sequence=0,sharedCleanups=[];
 const numeric=(value,fallback)=>value!==null&&value!==''&&Number.isFinite(Number(value))?Number(value):fallback;
 const clamp=(value,min,max)=>Math.min(max,Math.max(min,value));
 const format=(value,digits=2)=>Number(value).toLocaleString('es-ES',{minimumFractionDigits:digits,maximumFractionDigits:digits});
 function sanitize(parameters={}){
  const p=parameters&&typeof parameters==='object'?parameters:{};
  return {tension:clamp(numeric(p.tension??p.FT,16),4,64),linearDensity:clamp(numeric(p.linearDensity??p.mu,.04),.01,.16)};
 }
 function pulse(x,center){const z=(x-center)/constants.halfWidth;return Math.abs(z)<1?constants.amplitude*Math.cos(Math.PI*z/2)**2:0;}
 function sample(parameters={},time=0){
  const p=sanitize(parameters),elapsed=Math.max(0,numeric(time,0)),speed=Math.sqrt(p.tension/p.linearDensity);
  const distance=Math.max(0,numeric(parameters?.distance,speed*elapsed)),cycleDistance=constants.length+2*constants.halfWidth;
  const center=((constants.initialCenter+distance+constants.halfWidth)%cycleDistance)-constants.halfWidth;
  const at=x0=>{const y=pulse(x0,center);return {x0,x:x0,y0:0,y,displacement:y};};
  return {...p,time:elapsed,distance,center,position:center,cycleDistance,speed,travelTime:constants.length/speed,points:Array.from({length:321},(_,i)=>at(i*constants.length/320)),marker:at(constants.markerX)};
 }
 function line(ctx,x1,y1,x2,y2,color,width=1){ctx.beginPath();ctx.moveTo(x1,y1);ctx.lineTo(x2,y2);ctx.strokeStyle=color;ctx.lineWidth=width;ctx.stroke();}
 function arrow(ctx,x1,y1,x2,y2,color,width=2){
  const angle=Math.atan2(y2-y1,x2-x1),size=7;
  line(ctx,x1,y1,x2,y2,color,width);ctx.beginPath();ctx.moveTo(x2,y2);ctx.lineTo(x2-size*Math.cos(angle-.5),y2-size*Math.sin(angle-.5));ctx.lineTo(x2-size*Math.cos(angle+.5),y2-size*Math.sin(angle+.5));ctx.closePath();ctx.fillStyle=color;ctx.fill();
 }
 function drawScene(canvas,parameters={},time=0,options={}){
  const ctx=canvas?.getContext?.('2d');if(!ctx)return;
  const s=sample(parameters,time),width=Math.max(180,numeric(options.width,canvas.clientWidth||900)),compact=width<480,height=Math.max(240,numeric(options.height,canvas.clientHeight||(compact?300:410))),dpr=clamp(numeric(global.devicePixelRatio,1),1,2);
  if(canvas.width!==Math.round(width*dpr)||canvas.height!==Math.round(height*dpr)){canvas.width=Math.round(width*dpr);canvas.height=Math.round(height*dpr);}
  ctx.setTransform(dpr,0,0,dpr,0,0);ctx.clearRect(0,0,width,height);
  const margin=compact?19:44,scaleX=(width-2*margin)/constants.length,baseline=height*.58,scaleY=compact?145:290,diameter=compact?17:25;
  const px=x=>margin+x*scaleX,py=x=>baseline-pulse(x,s.center)*scaleY;
  const studio=ctx.createLinearGradient(0,0,width*.3,height);studio.addColorStop(0,'#f4f2e9');studio.addColorStop(.48,'#e2e7dd');studio.addColorStop(1,'#b7c3b8');ctx.fillStyle=studio;ctx.fillRect(0,0,width,height);
  const light=ctx.createRadialGradient(width*.2,0,0,width*.2,0,width*.9);light.addColorStop(0,'rgba(255,255,247,.8)');light.addColorStop(1,'rgba(255,255,247,0)');ctx.fillStyle=light;ctx.fillRect(0,0,width,height);
  // Subtle horizontal grain belongs to the studio surface, not to the moving pulse.
  for(let i=0;i<48;i++){const y=(i*47.3)%height;line(ctx,0,y,width,y,'rgba(91,103,88,.025)',.6);}
  const floor=ctx.createLinearGradient(0,height*.77,0,height);floor.addColorStop(0,'rgba(180,178,154,0)');floor.addColorStop(1,'rgba(129,135,116,.22)');ctx.fillStyle=floor;ctx.fillRect(0,height*.77,width,height*.23);
  // The rope continues beyond both sides; there is no fixed endpoint to reflect the pulse.
  const path=(offset=0)=>{ctx.beginPath();for(let x=-15;x<=width+15;x+=2){const x0=(x-margin)/scaleX,y=py(x0)+offset;if(x===-15)ctx.moveTo(x,y);else ctx.lineTo(x,y);}};
  ctx.save();path(17);ctx.lineCap='round';ctx.lineWidth=diameter+3;ctx.strokeStyle='rgba(57,66,49,.10)';ctx.shadowColor='rgba(42,53,38,.18)';ctx.shadowBlur=16;ctx.stroke();ctx.restore();
  const texture=options.image,photoReady=texture&&texture.complete&&texture.naturalWidth>0;
  if(photoReady){
   const crop=constants.texture,photoScale=diameter/crop.height,sourcePerScreen=1/photoScale;
   // A fixed material x always samples the same photographic fibres. The texture never travels with the pulse.
   for(let x=-12;x<=width+12;x+=2){
    const x0=(x-margin)/scaleX,y=py(x0),dy=py(x0+.005)-py(x0-.005),dx=.01*scaleX,angle=Math.atan2(dy,dx),stretch=Math.sqrt(1+(dy/dx)**2),dw=2*stretch+1.3;
    const sourceX=((x*sourcePerScreen)%crop.width+crop.width)%crop.width,sourceWidth=Math.min(2*sourcePerScreen+1,crop.width-sourceX);
    ctx.save();ctx.translate(x,y);ctx.rotate(angle);ctx.drawImage(texture,crop.x+sourceX,crop.y,sourceWidth,crop.height,-dw/2,-diameter/2,dw,diameter);ctx.restore();
   }
  }else{
   path();ctx.strokeStyle='#7d6846';ctx.lineWidth=diameter;ctx.lineCap='round';ctx.stroke();path(-1);ctx.strokeStyle='#bdab7c';ctx.lineWidth=diameter-3;ctx.stroke();path(-diameter*.2);ctx.strokeStyle='#eadbb1';ctx.lineWidth=diameter*.26;ctx.stroke();
   for(let x=-10;x<width+10;x+=4){const x0=(x-margin)/scaleX,y=py(x0),slope=(py(x0+.01)-py(x0-.01))/(.02*scaleX),angle=Math.atan(slope);ctx.save();ctx.translate(x,y);ctx.rotate(angle);line(ctx,-3,-diameter*.36,3,diameter*.36,'#8e7b54',1.1);line(ctx,-2,-diameter*.31,4,diameter*.24,'#f3e7c7',.7);ctx.restore();}
  }
  const mx=px(constants.markerX),my=py(constants.markerX);
  ctx.save();ctx.setLineDash([3,5]);line(ctx,mx,baseline-65,mx,baseline+32,'rgba(151,123,61,.4)',1);ctx.restore();
  const bead=ctx.createRadialGradient(mx-2,my-3,0,mx,my,compact?8:10);bead.addColorStop(0,'#fff5c5');bead.addColorStop(.38,'#eacb6c');bead.addColorStop(1,'#98702f');ctx.beginPath();ctx.arc(mx,my,compact?6:8,0,2*Math.PI);ctx.fillStyle=bead;ctx.fill();ctx.strokeStyle='#8d6b35';ctx.lineWidth=1;ctx.stroke();
  ctx.font='700 '+(compact?14:17)+'px Inter, system-ui, sans-serif';ctx.fillStyle='#795c2e';ctx.textAlign='center';ctx.fillText('P',mx-14,my-diameter*.55-10);
  const headY=compact?43:52;ctx.font='600 '+(compact?12:14)+'px Inter, system-ui, sans-serif';ctx.fillStyle='#4a6868';ctx.textAlign='left';ctx.fillText('El pulso avanza',margin,headY);arrow(ctx,compact?width-78:width-150,headY-5,width-margin,headY-5,'#27777c',2.5);
  if(!compact){ctx.fillStyle='#897348';ctx.font='600 13px Inter, system-ui, sans-serif';ctx.textAlign='left';ctx.fillText('Fₜ',margin+32,baseline+67);arrow(ctx,margin+24,baseline+62,margin-13,baseline+62,'#9b8050',2);ctx.textAlign='right';ctx.fillText('Fₜ',width-margin-32,baseline+67);arrow(ctx,width-margin-24,baseline+62,width-margin+13,baseline+62,'#9b8050',2);}
  const rulerY=height-(compact?42:39);line(ctx,margin,rulerY,width-margin,rulerY,'rgba(74,98,89,.4)',1);
  ctx.font='500 '+(compact?12:13)+'px Inter, system-ui, sans-serif';ctx.fillStyle='#596f68';ctx.textAlign='center';
  for(let metre=0;metre<=8;metre++){const x=px(metre),major=metre%4===0;line(ctx,x,rulerY-4,x,rulerY+(major?7:4),'rgba(74,98,89,.5)',1);if(!compact||major)ctx.fillText(metre+(metre===8?' m':''),x,rulerY+23);}
 }
 function active(a){return !a.disposed&&a.playing&&a.visible&&!document?.hidden&&a.host.isConnected!==false;}
 function listen(target,event,handler,cleanups){if(!target?.addEventListener)return;target.addEventListener(event,handler);cleanups.push(()=>target.removeEventListener(event,handler));}
 function render(a){
  if(a.disposed)return;const s=sample({...a.parameters,distance:a.distance},a.time),canvas=a.host.querySelector('[data-sws-canvas]');
  const width=numeric(canvas?.clientWidth,numeric(a.host.clientWidth,900));
  drawScene(canvas,{...a.parameters,distance:a.distance},a.time,{width,image:a.image});
  canvas?.setAttribute('aria-label','Pulso que avanza hacia la derecha en una cuerda larga. Rapidez real: '+format(s.speed)+' metros por segundo. Movimiento mostrado diez veces más lento. El punto P conserva su posición horizontal.');
  a.host.querySelector('[data-sws-time]').textContent=format(a.time,2)+' s';
 }
 function sync(a){
  const s=sample({...a.parameters,distance:a.distance},a.time);
  for(const name of ['tension','linearDensity']){const input=a.host.querySelector('[data-sws-param="'+name+'"]'),unit=name==='tension'?'N':'kg/m',digits=name==='tension'?0:2,value=a.parameters[name];input.value=String(value);input.setAttribute('aria-valuetext',format(value,digits)+' '+unit);a.host.querySelector('[data-sws-output="'+name+'"]').textContent=format(value,digits)+' '+unit;}
  a.host.querySelector('[data-sws-speed]').textContent=format(s.speed);
  a.host.querySelector('[data-sws-travel-time]').textContent=format(s.travelTime,3)+' s';
  a.host.querySelector('[data-sws-mass]').textContent=format(s.linearDensity*1000,0)+' g por cada metro';
  a.host.querySelector('[data-sws-equation]').textContent='v = √('+format(s.tension,0)+' / '+format(s.linearDensity)+') = '+format(s.speed)+' m/s';
  const play=a.host.querySelector('[data-sws-action="play"]');play.textContent=a.playing?'Ⅱ Pausar':'▶ Reproducir';play.setAttribute('aria-label',a.playing?'Pausar el pulso':'Reproducir el pulso');play.setAttribute('aria-pressed',String(a.playing));
 }
 function schedule(){if(frame&&!instances.some(active)){global.cancelAnimationFrame(frame);frame=0;}if(!frame&&instances.some(active))frame=global.requestAnimationFrame(tick);}
 function tick(now){
  frame=0;
  for(const a of instances){
   if(!active(a)){a.last=null;a.pending=0;continue;}
   if(a.last!==null)a.pending+=Math.min(.1,Math.max(0,(now-a.last)/1000));a.last=now;
   if(now-a.drawAt>=1000/30-1){const physicalDt=a.pending*constants.slowMotionFactor;a.time+=physicalDt;a.distance+=Math.sqrt(a.parameters.tension/a.parameters.linearDensity)*physicalDt;a.pending=0;a.drawAt=now;render(a);}
  }
  schedule();
 }
 function destroy(){
  if(frame){global.cancelAnimationFrame(frame);frame=0;}for(const cleanup of sharedCleanups)cleanup();sharedCleanups=[];
  for(const a of instances){a.disposed=true;a.observer?.disconnect();a.resizeObserver?.disconnect();if(a.image){a.image.onload=null;a.image.onerror=null;}for(const cleanup of a.cleanups)cleanup();}instances=[];
 }
 function mount(root){
  destroy();const placeholders=root?.matches?.('[data-string-wave-speed]')?[root]:Array.from(root?.querySelectorAll?.('[data-string-wave-speed]')||[]),reduced=!!global.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  for(const placeholder of placeholders){
   const id='string-wave-speed-'+(++sequence);
   placeholder.innerHTML=`<section class="sws-lab" id="${id}" data-activity-fullscreen aria-labelledby="${id}-title"><header class="sws-header"><p class="sws-eyebrow">Una cuerda, dos parámetros</p><h3 id="${id}-title">Tensión, densidad lineal y rapidez</h3><p class="sws-intro">Modifica la cuerda y observa con qué rapidez avanza el mismo pulso.</p></header><div class="sws-toolbar"><div class="sws-motion"><strong>Cámara lenta ×10</strong><span>Tiempo físico: <b data-sws-time>0,00 s</b></span></div><div class="sws-playback"><button type="button" data-sws-action="play"></button><button type="button" data-sws-action="restart" aria-label="Reiniciar el pulso">↺ Reiniciar pulso</button><button type="button" data-sws-action="reset" aria-label="Restablecer tensión y densidad">Restablecer</button></div></div><div class="sws-workspace"><div class="sws-visual"><div class="sws-stage"><canvas class="sws-canvas" data-sws-canvas role="img"></canvas></div><p class="sws-scene-note">Tramo de una cuerda larga · <strong>8 m</strong></p></div><div class="sws-panel"><div class="sws-result"><span>Rapidez real de propagación</span><strong><output data-sws-speed></output> <small>m/s</small></strong></div><p class="sws-equation" data-sws-equation></p><label class="sws-control" for="${id}-tension"><span class="sws-control-heading"><span>Fuerza de tensión <i>Fₜ</i></span><output for="${id}-tension" data-sws-output="tension"></output></span><input id="${id}-tension" type="range" data-sws-param="tension" min="4" max="64" step="4" value="16" aria-label="Fuerza de tensión"><span class="sws-range-ends"><span>4 N</span><span>64 N</span></span></label><label class="sws-control" for="${id}-linearDensity"><span class="sws-control-heading"><span>Densidad lineal <i>μ</i></span><output for="${id}-linearDensity" data-sws-output="linearDensity"></output></span><input id="${id}-linearDensity" type="range" data-sws-param="linearDensity" min="0.01" max="0.16" step="0.01" value="0.04" aria-label="Densidad lineal"><span class="sws-range-ends"><span>0,01 kg/m</span><span>0,16 kg/m</span></span></label><p class="sws-density-note" data-sws-mass></p><div class="sws-travel"><span>Tiempo para recorrer 8 m</span><strong data-sws-travel-time></strong><small>Si se mantienen estos valores.</small></div></div></div><p class="sws-caption">El pulso conserva su forma: una mayor tensión lo hace avanzar más rápido; una mayor masa por metro lo hace avanzar más lento. El punto <strong>P</strong> solo sube y baja.</p><footer class="sws-footer"><p>Modelo ideal: <strong>v = √(Fₜ/μ)</strong>. La cámara lenta permite seguir el pulso; la rapidez y los tiempos indicados son reales. La deformación se amplía para observarla. El pulso continúa fuera de la vista y después comienza un nuevo recorrido.</p></footer></section>`;
   const host=placeholder.firstElementChild,a={id,host,parameters:sanitize(),distance:0,time:0,playing:!reduced,visible:!document?.hidden,last:null,pending:0,drawAt:-Infinity,disposed:false,cleanups:[],image:null};instances.push(a);
   const change=event=>{const input=event.target;if(a.disposed||!input.matches?.('[data-sws-param]'))return;const name=input.dataset.swsParam;if(!['tension','linearDensity'].includes(name))return;a.parameters=sanitize({...a.parameters,[name]:Number(input.value)});a.last=null;a.pending=0;sync(a);render(a);schedule();};
   listen(host,'input',change,a.cleanups);listen(host,'change',change,a.cleanups);
   listen(host,'click',event=>{const button=event.target.closest?.('[data-sws-action]');if(!button||a.disposed)return;const action=button.dataset.swsAction;if(action==='play')a.playing=!a.playing;else if(action==='restart'){a.distance=0;a.time=0;}else if(action==='reset'){a.parameters=sanitize();a.distance=0;a.time=0;}else return;a.last=null;a.pending=0;sync(a);render(a);schedule();},a.cleanups);
   if(typeof global.Image==='function'){a.image=new global.Image();a.image.onload=()=>{if(!a.disposed)render(a);};a.image.onerror=()=>{if(!a.disposed)render(a);};a.image.src=constants.texture.src;}
   if(typeof global.IntersectionObserver==='function'){a.observer=new global.IntersectionObserver(entries=>{if(a.disposed)return;a.visible=entries.some(entry=>entry.isIntersecting);a.last=null;a.pending=0;schedule();},{threshold:0});a.observer.observe(host);}
   if(typeof global.ResizeObserver==='function'){a.resizeObserver=new global.ResizeObserver(()=>{if(!a.disposed)render(a);});a.resizeObserver.observe(host);}
   sync(a);render(a);
  }
  if(instances.length){listen(document,'visibilitychange',()=>{for(const a of instances){a.last=null;a.pending=0;}schedule();},sharedCleanups);listen(global,'pagehide',destroy,sharedCleanups);}schedule();
 }
 function getState(){return instances.map(a=>({parameters:{...a.parameters},time:a.time,distance:a.distance,center:sample({...a.parameters,distance:a.distance},a.time).center,playing:a.playing,visible:a.visible}));}
 global.StringWaveSpeed=Object.freeze({mount,destroy,getState,sample,sanitize,constants,drawScene});
})(window);
