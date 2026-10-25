/* Dos ondas armónicas con un reloj común y escalas constantes. */
(function(global){
 'use strict';
 const document=global.document,TAU=2*Math.PI;
 const reference=Object.freeze({amplitude:.3,omega:2,k:1,sign:-1,phase:0});
 const constants=Object.freeze({length:12,markerX:6,verticalLimit:.6,reference,
  amplitude:Object.freeze({min:0,max:.6,step:.02,default:.3}),
  omega:Object.freeze({min:.5,max:6,step:.1,default:2}),
  k:Object.freeze({min:.5,max:4,step:.1,default:1}),
  phase:Object.freeze({min:-Math.PI,max:Math.PI,step:Math.PI/36,default:0})});
 let instances=[],frame=0,sequence=0,sharedCleanups=[];
 const numeric=(value,fallback)=>value!==null&&value!==''&&Number.isFinite(Number(value))?Number(value):fallback;
 const clamp=(value,min,max)=>Math.min(max,Math.max(min,value));
 const round=value=>Number(value).toFixed(3);
 const format=(value,digits=2)=>Number(value).toLocaleString('es-ES',{minimumFractionDigits:digits,maximumFractionDigits:digits});
 const escape=value=>String(value??'').replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
 function sanitize(parameters={}){
  const p=parameters&&typeof parameters==='object'?parameters:{};
  return {amplitude:clamp(numeric(p.amplitude??p.A,reference.amplitude),0,.6),omega:clamp(numeric(p.omega,reference.omega),.5,6),k:clamp(numeric(p.k,reference.k),.5,4),sign:Number(p.sign)===1?1:-1,phase:clamp(numeric(p.phase??p.phi,reference.phase),-Math.PI,Math.PI)};
 }
 function sample(parameters={},time=0){
  const p=sanitize(parameters),elapsed=Math.max(0,numeric(time,0));
  const at=x0=>{const displacement=p.amplitude*Math.cos(p.omega*elapsed+p.sign*p.k*x0+p.phase);return {x0,x:x0,y0:0,y:displacement,displacement};};
  return {...p,time:elapsed,wavelength:TAU/p.k,period:TAU/p.omega,speed:p.omega/p.k,velocity:-p.sign*p.omega/p.k,points:Array.from({length:361},(_,i)=>at(i*constants.length/360)),marker:at(constants.markerX)};
 }
 function line(x1,y1,x2,y2,color,width=1,extra=''){return `<path d="M${round(x1)} ${round(y1)}L${round(x2)} ${round(y2)}" fill="none" stroke="${color}" stroke-width="${width}" ${extra}/>`;}
 function renderScene(parameters={},time=0,id='wec-scene',compact=false){
  id=String(id).replace(/[^a-zA-Z0-9_-]/g,'-');
  const s=sample(parameters,time),edited=id.includes('edited'),color=edited?'#c96c57':'#237e88';
  const width=compact?360:840,height=compact?245:270,left=compact?50:65,rightEdge=compact?340:803,axisY=compact?112:128,scaleY=compact?120:140,top=compact?40:44,bottom=compact?184:212;
  const px=x=>left+x*(rightEdge-left)/12,py=y=>axisY-y*scaleY;
  const path=s.points.map((p,i)=>(i?'L':'M')+round(px(p.x))+' '+round(py(p.y))).join('');
  let grid='';
  for(const y of [-.6,-.3,0,.3,.6])grid+=line(left,py(y),rightEdge,py(y),y===0?'#91a8aa':'#dce7e3',y===0?1.5:1,y===0?'stroke-dasharray="5 6"':'');
  for(const x of (compact?[0,6,12]:[0,3,6,9,12]))grid+=line(px(x),top,px(x),bottom,'#e2eae7',1)+`<text x="${px(x)}" y="${compact?214:240}" text-anchor="middle" fill="#71868b" font-size="${compact?18:19}">${x}</text>`;
  const ticks=[.6,0,-.6].map(y=>`<text x="${left-(compact?9:14)}" y="${py(y)+6}" text-anchor="end" fill="#71868b" font-size="18">${format(y,1)}</text>`).join('');
  const right=s.sign===-1,arrowStart=compact?258:658,arrowEnd=compact?333:783,ax1=right?arrowStart:arrowEnd,ax2=right?arrowEnd:arrowStart;
  const tip=right?`M${arrowEnd-10} 13L${arrowEnd+2} 20L${arrowEnd-10} 27`:`M${arrowStart+10} 13L${arrowStart-2} 20L${arrowStart+10} 27`;
  const mx=px(s.marker.x),my=py(s.marker.y);
  return `<svg class="wec-svg${compact?' wec-svg-compact':''}" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}" role="img" aria-label="${edited?'Onda modificable':'Onda de referencia'}: amplitud ${escape(format(s.amplitude))} metros, frecuencia angular ${escape(format(s.omega))} radianes por segundo, número de onda ${escape(format(s.k))} radianes por metro, fase inicial ${escape(format(s.phase))} radianes. Avanza hacia la ${right?'derecha':'izquierda'}." xmlns="http://www.w3.org/2000/svg"><rect width="${width}" height="${height}" fill="${edited?'#fffaf7':'#f4faf9'}"/>${grid}${ticks}<text x="${left+1}" y="24" fill="#637d83" font-size="18">y (m)</text><text x="${rightEdge}" y="${compact?238:263}" text-anchor="end" fill="#637d83" font-size="18">x (m)</text>${line(ax1,20,ax2,20,color,3)}<path d="${tip}" fill="none" stroke="${color}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><text class="wec-direction-label" x="${arrowStart-17}" y="26" text-anchor="end" fill="${color}" font-size="18">${right?'+x':'−x'}</text>${line(mx,top-4,mx,bottom+4,'#c5af77',1.2,'stroke-dasharray="4 5"')}<path data-wec-wave d="${path}" fill="none" stroke="${color}" stroke-width="${compact?3:4.5}" stroke-linecap="round" stroke-linejoin="round"/><circle cx="${round(mx)}" cy="${axisY}" r="${compact?4:5}" fill="none" stroke="#b5a579" stroke-width="1.3"/><circle cx="${round(mx)}" cy="${round(my)}" r="${compact?5:7.5}" fill="#e7ba58" stroke="#9d7b35" stroke-width="1.2"/><text x="${round(mx-13)}" y="${round(my-12)}" text-anchor="end" fill="#8d6929" font-size="20" font-weight="700">P</text></svg>`;
 }
 function equation(p){return `y(x, t) = ${format(p.amplitude)} cos(${format(p.omega)}t ${p.sign<0?'−':'+'} ${format(p.k)}x ${p.phase<0?'−':'+'} ${format(Math.abs(p.phase))})`;}
 function readouts(p){const s=sample(p);return `<div><span>λ = 2π/k</span><strong>${format(s.wavelength)} <small>m</small></strong></div><div><span>T = 2π/ω</span><strong>${format(s.period)} <small>s</small></strong></div><div><span>v = ω/k</span><strong>${format(s.speed)} <small>m/s</small></strong></div>`;}
 function range(id,name,label,min,max,step,value,unit){return `<label class="wec-control" for="${id}-${name}"><span class="wec-control-heading"><span>${label}</span><output data-wec-output="${name}" for="${id}-${name}"></output></span><input id="${id}-${name}" type="range" data-wec-param="${name}" min="${min}" max="${max}" step="${step}" value="${value}" aria-label="${name==='amplitude'?'Amplitud':name==='omega'?'Frecuencia angular':name==='k'?'Número de onda':'Fase inicial'}"><span class="wec-range-ends"><span>${format(min,name==='phase'?0:2)} ${unit}</span><span>${format(max,name==='phase'?0:2)} ${unit}</span></span></label>`;}
 function active(a){return !a.disposed&&a.playing&&a.visible&&!document?.hidden&&a.host.isConnected!==false;}
 function listen(target,event,handler,cleanups){if(!target?.addEventListener)return;target.addEventListener(event,handler);cleanups.push(()=>target.removeEventListener(event,handler));}
 function render(a){
  if(a.disposed)return;
  const width=numeric(a.host.clientWidth,numeric(a.host.getBoundingClientRect?.().width,900)),compact=width>0&&width<=480;
  a.host.querySelector('[data-wec-scene="reference"]').innerHTML=renderScene(reference,a.time,a.id+'-reference',compact);
  a.host.querySelector('[data-wec-scene="edited"]').innerHTML=renderScene(a.parameters,a.time,a.id+'-edited',compact);
  a.host.querySelector('[data-wec-time]').textContent=format(a.time)+' s';
 }
 function sync(a){
  if(a.disposed)return;
  const p=a.parameters;
  for(const name of ['amplitude','omega','k','phase']){
   const input=a.host.querySelector(`[data-wec-param="${name}"]`),value=name==='phase'?p.phase*180/Math.PI:p[name];
   const text=name==='phase'?format(value,0)+'° · '+format(p.phase)+' rad':format(value)+' '+({amplitude:'m',omega:'rad/s',k:'rad/m'}[name]);
   input.value=String(value);input.setAttribute('aria-valuetext',text);
   a.host.querySelector(`[data-wec-output="${name}"]`).textContent=text;
  }
  a.host.querySelector('[data-wec-param="sign"]').value=String(p.sign);
  a.host.querySelector('[data-wec-equation="reference"]').textContent=equation(reference);
  a.host.querySelector('[data-wec-equation="edited"]').textContent=equation(p);
  a.host.querySelector('[data-wec-readouts="reference"]').innerHTML=readouts(reference);
  a.host.querySelector('[data-wec-readouts="edited"]').innerHTML=readouts(p);
  a.host.querySelector('[data-wec-direction]').textContent=p.sign===-1?'−kx → derecha (+x).':'+kx → izquierda (−x).';
  const play=a.host.querySelector('[data-wec-action="play"]');play.textContent=a.playing?'Ⅱ Pausar ambas':'▶ Reproducir ambas';play.setAttribute('aria-pressed',String(a.playing));play.setAttribute('aria-label',a.playing?'Pausar ambas ondas':'Reproducir ambas ondas');
 }
 function schedule(){if(frame&&!instances.some(active)){global.cancelAnimationFrame(frame);frame=0;}if(!frame&&instances.some(active))frame=global.requestAnimationFrame(tick);}
 function tick(now){
  frame=0;
  for(const a of instances){
   if(!active(a)){a.last=null;a.pending=0;continue;}
   if(a.last!==null)a.pending+=Math.min(.1,Math.max(0,(now-a.last)/1000));a.last=now;
   if(now-a.drawAt>=1000/30-1){a.time+=a.pending;a.pending=0;a.drawAt=now;render(a);}
  }
  schedule();
 }
 function destroy(){
  if(frame){global.cancelAnimationFrame(frame);frame=0;}
  for(const cleanup of sharedCleanups)cleanup();sharedCleanups=[];
  for(const a of instances){a.disposed=true;a.observer?.disconnect();a.resizeObserver?.disconnect();for(const cleanup of a.cleanups)cleanup();}instances=[];
 }
 function mount(root){
  destroy();
  const placeholders=root?.matches?.('[data-wave-equation-comparison]')?[root]:Array.from(root?.querySelectorAll?.('[data-wave-equation-comparison]')||[]),reduced=!!global.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  for(const placeholder of placeholders){
   const id='wave-equation-comparison-'+(++sequence);
   const plot=(kind,title)=>`<section class="wec-plot wec-plot-${kind}" aria-label="${title}"><div class="wec-plot-heading"><h4>${title}</h4><span>${kind==='reference'?'Parámetros fijos':'Tus parámetros'}</span></div><p class="wec-equation" data-wec-equation="${kind}"></p><div class="wec-scene" data-wec-scene="${kind}"></div><div class="wec-readouts" data-wec-readouts="${kind}"></div></section>`;
   placeholder.innerHTML=`<section class="wec-lab" id="${id}" data-activity-fullscreen aria-labelledby="${id}-title"><header class="wec-header"><p class="wec-eyebrow">Compara y descubre</p><h3 id="${id}-title">Explora la ecuación de onda</h3><p class="wec-intro">Cambia un parámetro y compara la segunda onda con la referencia.</p><div class="wec-general-equation">y(x, t) = A cos(ωt ± kx + φ₀)</div></header><div class="wec-toolbar"><div class="wec-timing"><p>Mismo instante: <strong data-wec-time>0,00 s</strong></p><span>Mismas escalas en ambas gráficas</span></div><div class="wec-playback"><button type="button" data-wec-action="play"></button><button type="button" data-wec-action="zero" aria-label="Volver al instante inicial">↺ Volver a t = 0</button><button type="button" data-wec-action="reset" aria-label="Restablecer los parámetros de la onda">Restablecer parámetros</button></div></div><div class="wec-workspace"><div class="wec-plots">${plot('reference','Onda de referencia')}${plot('edited','Onda modificable')}</div><div class="wec-panel"><h4>Modifica la segunda onda</h4>${range(id,'amplitude','Amplitud <i>A</i>',0,.6,.02,.3,'m')}${range(id,'omega','Frecuencia angular <i>ω</i>',.5,6,.1,2,'rad/s')}${range(id,'k','Número de onda <i>k</i>',.5,4,.1,1,'rad/m')}<label class="wec-control" for="${id}-sign"><span class="wec-control-heading"><span>Signo del término <i>kx</i></span></span><select id="${id}-sign" data-wec-param="sign" aria-label="Signo del término espacial"><option value="-1">−kx · hacia la derecha</option><option value="1">+kx · hacia la izquierda</option></select></label>${range(id,'phase','Fase inicial <i>φ₀</i>',-180,180,5,0,'°')}<p class="wec-direction" data-wec-direction></p></div></div><p class="wec-caption">Las dos ondas comienzan iguales. La referencia conserva sus parámetros; solo cambia la onda coral. Puedes pausar y volver a <strong>t = 0</strong> para estudiar la fase inicial. El punto <strong>P</strong> conserva su posición horizontal.</p><footer class="wec-footer"><p><strong>ω</strong> cambia el ritmo temporal; <strong>k</strong> cambia la separación entre crestas. Al variarlos de forma independiente también puede cambiar v = ω/k. Reproduce para observar el sentido: con fase cero, los perfiles de ambos signos coinciden en t = 0.</p></footer></section>`;
   const host=placeholder.firstElementChild,a={id,host,parameters:sanitize(),time:0,playing:!reduced,visible:!document?.hidden,last:null,pending:0,drawAt:-Infinity,disposed:false,cleanups:[]};instances.push(a);
   const change=event=>{
    const input=event.target;if(a.disposed||!input.matches?.('[data-wec-param]'))return;
    const name=input.dataset.wecParam;if(!['amplitude','omega','k','sign','phase'].includes(name))return;
    const value=name==='phase'?Number(input.value)*Math.PI/180:Number(input.value);
    a.parameters=sanitize({...a.parameters,[name]:value});a.last=null;a.pending=0;sync(a);render(a);schedule();
   };
   listen(host,'input',change,a.cleanups);listen(host,'change',change,a.cleanups);
   listen(host,'click',event=>{
    const button=event.target.closest?.('[data-wec-action]');if(!button||a.disposed)return;
    const action=button.dataset.wecAction;
    if(action==='play')a.playing=!a.playing;
    else if(action==='zero')a.time=0;
    else if(action==='reset'){a.parameters=sanitize();a.time=0;}
    else return;
    a.last=null;a.pending=0;sync(a);render(a);schedule();
   },a.cleanups);
   if(typeof global.IntersectionObserver==='function'){
    a.observer=new global.IntersectionObserver(entries=>{if(a.disposed)return;a.visible=entries.some(entry=>entry.isIntersecting);a.last=null;a.pending=0;schedule();},{threshold:0});a.observer.observe(host);
   }
   if(typeof global.ResizeObserver==='function'){a.resizeObserver=new global.ResizeObserver(()=>{if(!a.disposed)render(a);});a.resizeObserver.observe(host);}
   sync(a);render(a);
  }
  if(instances.length){listen(document,'visibilitychange',()=>{for(const a of instances){a.last=null;a.pending=0;}schedule();},sharedCleanups);listen(global,'pagehide',destroy,sharedCleanups);}
  schedule();
 }
 function getState(){return instances.map(a=>({parameters:{...a.parameters},reference:{...reference},time:a.time,playing:a.playing,visible:a.visible}));}
 global.WaveEquationComparison=Object.freeze({mount,destroy,getState,sample,renderScene,sanitize,constants});
})(window);
