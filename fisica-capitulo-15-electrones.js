'use strict';
(function(){
 const id='fis15-electrones';
 const motionPreference=window.matchMedia?.('(prefers-reduced-motion: reduce)');
 const state={enabled:false,direction:1,paused:!!motionPreference?.matches};
 const model=window.ElectronDriftModel.create({width:720,height:218,count:60});
 let runtime=null,trail=[];
 const status=()=>state.enabled?'Con campo: movimiento caótico + deriva':'Sin campo: movimiento caótico';
 const explanation=()=>state.enabled
  ?`Los electrones siguen cambiando de dirección, pero el conjunto se desplaza hacia la ${state.direction===1?'izquierda':'derecha'}. Esta deriva es opuesta al campo eléctrico porque los electrones tienen carga negativa.`
  :'Los electrones se mueven en todas las direcciones. Sus movimientos se compensan en promedio: no hay desplazamiento neto ni corriente eléctrica.';
 const fieldLabel=()=>state.enabled?`Hacia la ${state.direction===1?'derecha':'izquierda'}`:'Apagado · E = 0';
 const driftLabel=()=>state.enabled?`Hacia la ${state.direction===1?'izquierda':'derecha'}`:'Sin deriva neta';
 const pauseLabel=()=>state.paused?'Reanudar movimiento':'Pausar movimiento';
 const arrow=(direction)=>direction===1?'→':'←';
 function particle(p,i){
  return `<g data-electron="${i}" transform="translate(${p.x.toFixed(2)} ${p.y.toFixed(2)})"><circle r="${i===0?9:6.5}" fill="${i===0?'#a65c08':'#216d9f'}" stroke="#ffffff" stroke-width="1.5"/><path d="M-2.5 0H2.5" stroke="#ffffff" stroke-width="1.4"/></g>`;
 }
 function render(kind){
  if(kind!=='electron-drift')return '';
  const ions=Array.from({length:24},(_,i)=>{const x=46+(i%8)*90,y=32+Math.floor(i/8)*77;return `<g transform="translate(${x} ${y})"><circle r="15" fill="#f0f3f5" stroke="#bcc9cf" stroke-width="1.4"/><path d="M-4 0H4M0-4V4" stroke="#8a9ba5" stroke-width="1.5"/></g>`;}).join('');
  return `<section class="electron-sim" id="${id}" data-electron-demo="" data-field="${state.enabled?'on':'off'}" aria-labelledby="${id}-title">
   <p class="electron-kicker">Explora el interior del conductor</p>
   <h4 id="${id}-title">¿Cómo se mueven los electrones?</h4>
   <p class="electron-instruction">Activa el campo eléctrico y compara el movimiento.</p>
   <div class="electron-direction electron-field"><strong>Campo eléctrico E</strong><span data-electron-field-arrow="" aria-hidden="true">${state.enabled?arrow(state.direction):'—'}</span><span data-electron-field-label="">${fieldLabel()}</span></div>
   <svg class="electron-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 430" width="800" height="430" role="img" aria-labelledby="${id}-svg-title ${id}-svg-desc" focusable="false">
    <title id="${id}-svg-title">Cable conductor con una vista microscópica ampliada</title>
    <desc id="${id}-svg-desc" data-electron-desc="">${explanation()} Los círculos azules representan electrones; el naranja deja una trayectoria. Los círculos grises representan iones de la red metálica.</desc>
    <defs>
     <linearGradient id="${id}-copper" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ae633b"/><stop offset=".3" stop-color="#f5c5a3"/><stop offset=".52" stop-color="#da966b"/><stop offset="1" stop-color="#8d4828"/></linearGradient>
     <clipPath id="${id}-clip"><rect width="720" height="218" rx="4"/></clipPath>
    </defs>
    <rect width="800" height="430" fill="#ffffff"/>
    <g aria-hidden="true">
     <text class="electron-svg-label" x="400" y="28" text-anchor="middle" font-family="Arial, sans-serif" font-size="26" fill="#526677">Cable conductor</text>
     <path d="M100 48H697A17 30 0 0 1 697 108H100Z" fill="url(#${id}-copper)" stroke="#8e573a" stroke-width="1.6"/>
     <ellipse cx="100" cy="78" rx="17" ry="30" fill="#c48256" stroke="#8e573a" stroke-width="1.6"/>
     <ellipse cx="100" cy="78" rx="10" ry="21" fill="#e5ac7b"/>
     <path d="M128 64H680" stroke="#fff3de" stroke-width="2" opacity=".6"/>
     <rect x="350" y="42" width="100" height="73" rx="9" fill="#ffffff" fill-opacity=".13" stroke="#216d9f" stroke-width="2.5"/>
     <path d="M350 115L28 180M450 115L772 180" fill="none" stroke="#a5b8c4" stroke-width="1.7" stroke-dasharray="5 5"/>
     <rect x="310" y="129" width="180" height="34" rx="17" fill="#ffffff"/>
     <text class="electron-svg-label" x="400" y="153" text-anchor="middle" font-family="Arial, sans-serif" font-size="25" fill="#216d9f">Acercamiento</text>
     <rect x="28" y="180" width="744" height="242" rx="16" fill="#ffffff" stroke="#a5b8c4" stroke-width="2"/>
     <g transform="translate(40 192)" clip-path="url(#${id}-clip)">
      ${ions}
      <path data-electron-trail="" fill="none" stroke="#b97318" stroke-width="2.5" stroke-opacity=".7" stroke-linejoin="round" stroke-linecap="round"/>
      ${model.particles.map(particle).join('')}
     </g>
    </g>
   </svg>
   <div class="electron-direction electron-drift"><strong>Deriva de electrones</strong><span data-electron-drift-arrow="" aria-hidden="true">${state.enabled?arrow(-state.direction):'—'}</span><span data-electron-drift-label="">${driftLabel()}</span></div>
   <div class="electron-legend" aria-label="Leyenda"><span><i class="electron-dot" aria-hidden="true"></i>Electrón</span><span><i class="electron-dot electron-dot-ion" aria-hidden="true">+</i>Ion de la red</span><span><i class="electron-dot electron-dot-tracked" aria-hidden="true"></i>Electrón con trayectoria</span></div>
   <div class="electron-controls">
    <button type="button" class="button" data-action="electron-field" role="switch" aria-checked="${state.enabled}" aria-label="Campo eléctrico" aria-controls="${id}-status"><span data-electron-toggle-label="">${state.enabled?'Desactivar campo':'Activar campo eléctrico'}</span></button>
    <button type="button" class="button secondary" data-action="electron-reverse" ${state.enabled?'':'disabled'}>Invertir campo</button>
    <button type="button" class="button secondary" data-action="electron-motion" aria-pressed="${state.paused}">${pauseLabel()}</button>
   </div>
   <div class="electron-feedback" id="${id}-status" role="status" aria-live="polite" aria-atomic="true"><strong data-electron-status="">${status()}</strong><p data-electron-explanation="">${explanation()}</p></div>
   <p class="electron-note">Modelo esquemático: tamaños y velocidades no están a escala. Se exagera la deriva para poder observarla. Los electrones que salen de la ampliación continúan por el conductor; otros entran.</p>
  </section>`;
 }
 function update(root){
  root.dataset.field=state.enabled?'on':'off';
  const write=(selector,value)=>{root.querySelector(selector).textContent=value;};
  root.querySelector('[data-action="electron-field"]').setAttribute('aria-checked',String(state.enabled));
  write('[data-electron-toggle-label]',state.enabled?'Desactivar campo':'Activar campo eléctrico');
  root.querySelector('[data-action="electron-reverse"]').disabled=!state.enabled;
  const motion=root.querySelector('[data-action="electron-motion"]');
  motion.textContent=pauseLabel();motion.setAttribute('aria-pressed',String(state.paused));
  write('[data-electron-field-arrow]',state.enabled?arrow(state.direction):'—');
  write('[data-electron-field-label]',fieldLabel());
  write('[data-electron-drift-arrow]',state.enabled?arrow(-state.direction):'—');
  write('[data-electron-drift-label]',driftLabel());
  write('[data-electron-status]',status());
  write('[data-electron-explanation]',explanation());
  write('[data-electron-desc]',explanation()+' El electrón naranja deja una trayectoria; los círculos grises representan iones de la red metálica.');
 }
 function handleClick(button){
  const action=button.dataset.action;
  if(!['electron-field','electron-reverse','electron-motion'].includes(action))return false;
  const root=button.closest('[data-electron-demo]');
  if(!root||button.disabled)return false;
  if(action==='electron-field')state.enabled=!state.enabled;
  if(action==='electron-reverse')state.direction*=-1;
  if(action==='electron-motion')state.paused=!state.paused;
  if(action!=='electron-motion'){trail=[];root.querySelector('[data-electron-trail]').setAttribute('d','');}
  update(root);runtime?.sync();return true;
 }
 function unmount(){if(runtime){runtime.destroy();runtime=null;}}
 function mount(container){
  unmount();
  const root=container.querySelector?.('[data-electron-demo]');
  if(!root||!window.requestAnimationFrame)return;
  const nodes=[...root.querySelectorAll('[data-electron]')],trace=root.querySelector('[data-electron-trail]');
  let frame=0,last=null,visible=!window.IntersectionObserver,observer;
  const canRun=()=>!state.paused&&visible&&!document.hidden&&root.isConnected!==false;
  const stop=()=>{if(frame)window.cancelAnimationFrame(frame);frame=0;last=null;};
  function sync(){
   if(root.isConnected===false){unmount();return;}
   if(!canRun()){stop();return;}
   if(!frame)frame=window.requestAnimationFrame(tick);
  }
  function tick(time){
   frame=0;
   if(!canRun()){sync();return;}
   const dt=last===null?0:Math.min((time-last)/1000,.05);last=time;
   model.step(dt,state.enabled?state.direction:0);
   const tracked=model.particles[0],previous=trail.at(-1);
   if(previous&&Math.abs(tracked.x-previous.x)>360)trail=[];
   if(dt>0){trail.push({x:tracked.x,y:tracked.y});if(trail.length>85)trail.shift();}
   nodes.forEach((node,i)=>{const p=model.particles[i];node.setAttribute('transform',`translate(${p.x.toFixed(2)} ${p.y.toFixed(2)})`);});
   trace.setAttribute('d',trail.map((p,i)=>`${i?'L':'M'}${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' '));
   sync();
  }
  const preferenceChanged=event=>{if(event.matches){state.paused=true;update(root);sync();}};
  runtime={sync,destroy(){stop();observer?.disconnect();document.removeEventListener('visibilitychange',sync);window.removeEventListener('pagehide',stop);window.removeEventListener('pageshow',sync);motionPreference?.removeEventListener?.('change',preferenceChanged);}};
  if(window.IntersectionObserver){observer=new window.IntersectionObserver(entries=>{visible=entries.some(entry=>entry.isIntersecting);sync();},{threshold:0});observer.observe(root);}
  document.addEventListener('visibilitychange',sync);
  window.addEventListener('pagehide',stop);window.addEventListener('pageshow',sync);
  motionPreference?.addEventListener?.('change',preferenceChanged);
  update(root);sync();
 }
 window.ElectronDrift={render,handleClick,mount,unmount};
})();
