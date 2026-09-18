'use strict';
(function(){
 const state={closed:false,paused:false};
 const id='fis15-circuito-simple';
 const status=()=>state.closed?'Circuito cerrado · foco encendido':'Circuito abierto · foco apagado';
 const explanation=()=>state.closed
  ?'El interruptor une los contactos. La batería mantiene una corriente en el circuito y el foco se enciende.'
  :'El interruptor separa los contactos. El circuito está abierto, no circula corriente y el foco permanece apagado.';
 const description=()=>`Circuito simple con una batería, un interruptor y un foco conectados en serie. ${status()}.`;
 const actionLabel=()=>state.closed?'Abrir interruptor':'Cerrar interruptor';
 const motionLabel=()=>state.paused?'Reanudar movimiento':'Pausar movimiento';
 const bladeTransform=()=>`rotate(${state.closed?0:-32} 195 120)`;

 function render(kind){
  if(kind!=='simple-circuit')return '';
  return `<section class="circuit-sim" id="${id}" data-circuit-demo data-state="${state.closed?'closed':'open'}" data-motion="${state.paused?'paused':'running'}" aria-labelledby="${id}-title">
   <p class="circuit-kicker">Explora el circuito</p>
   <h4 id="${id}-title">¿Qué sucede al cerrar el interruptor?</h4>
   <p class="circuit-instruction">Pulsa el interruptor del dibujo o utiliza el botón.</p>
   <div class="circuit-stage">
    <svg class="circuit-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 430" width="720" height="430" role="img" aria-labelledby="${id}-svg-title ${id}-svg-desc" focusable="false">
     <title id="${id}-svg-title">Batería, interruptor y foco</title>
     <desc id="${id}-svg-desc" data-circuit-desc="">${description()}</desc>
     <rect width="720" height="430" fill="#ffffff"/>
     <g fill="none" stroke="#172630" stroke-width="4" stroke-linecap="round" stroke-linejoin="round">
      <path class="circuit-wire" d="M340 330 H100 V120 H195 M285 120 H468 M552 120 H620 V330 H360"/>
      <path class="circuit-flow" d="M340 330 H100 V120 H195 M285 120 H468 M552 120 H620 V330 H360"/>
      <g class="circuit-direction" fill="#176c62" stroke="none" aria-hidden="true">
       <path d="M100 209 l-7 13 h14 Z M390 120 l-13 -7 v14 Z M620 240 l-7 -13 h14 Z"/>
      </g>
      <g class="circuit-switch-blade" data-circuit-blade="" transform="${bladeTransform()}"><path d="M195 120 H285"/></g>
      <circle cx="195" cy="120" r="6" fill="#fff"/>
      <circle cx="285" cy="120" r="6" fill="#fff"/>
      <circle class="circuit-glow" cx="510" cy="120" r="68" fill="#fff1aa" stroke="none"/>
      <g class="circuit-rays" stroke="#c28312" stroke-width="3" aria-hidden="true">
       <path d="M510 58 V45 M510 182 V195 M448 120 H435 M572 120 H585 M466 76 l-9 -9 M554 76 l9 -9 M466 164 l-9 9 M554 164 l9 9"/>
      </g>
      <circle class="circuit-lamp" cx="510" cy="120" r="42" fill="#ffffff"/>
      <path class="circuit-filament" d="M480 90 L540 150 M480 150 L540 90"/>
      <path d="M340 300 V360 M360 314 V346"/>
     </g>
     <g class="circuit-labels" fill="#172630" font-family="Arial, sans-serif" font-size="27" text-anchor="middle">
      <text x="240" y="199">Interruptor</text>
      <text x="510" y="237">Foco</text>
      <text x="350" y="402">Batería</text>
      <text x="307" y="308" font-size="31">+</text>
      <text x="392" y="308" font-size="31">−</text>
     </g>
    </svg>
    <button type="button" class="circuit-switch-hit" data-action="toggle-simple-circuit" role="switch" aria-checked="${state.closed}" aria-label="Interruptor del dibujo" aria-controls="${id}-status" title="${actionLabel()}"><span class="sr-only">${actionLabel()}</span></button>
   </div>
   <div class="circuit-controls">
    <button type="button" class="button circuit-toggle" data-action="toggle-simple-circuit" role="switch" aria-checked="${state.closed}" aria-label="Interruptor del circuito" aria-controls="${id}-status"><span class="circuit-toggle-track" aria-hidden="true"></span><span data-circuit-action>${actionLabel()}</span></button>
    <button type="button" class="button secondary circuit-motion" data-action="circuit-motion" ${state.closed?'':'disabled'}>${motionLabel()}</button>
   </div>
   <div class="circuit-feedback" id="${id}-status" role="status" aria-live="polite" aria-atomic="true">
    <p class="circuit-status"><span class="circuit-status-dot" aria-hidden="true"></span><strong data-circuit-status>${status()}</strong></p>
    <p data-circuit-explanation>${explanation()}</p>
   </div>
   <p class="circuit-note">Al cerrar el circuito, las marcas animadas muestran el sentido convencional de la corriente: del polo + al polo − por el circuito externo.</p>
  </section>`;
 }

 function update(root){
  root.dataset.state=state.closed?'closed':'open';
  root.dataset.motion=state.paused?'paused':'running';
  for(const button of root.querySelectorAll('[data-action="toggle-simple-circuit"]')){
   button.setAttribute('aria-checked',String(state.closed));
   button.title=actionLabel();
   const label=button.querySelector('[data-circuit-action], .sr-only');
   if(label)label.textContent=actionLabel();
  }
  root.querySelector('[data-circuit-status]').textContent=status();
  root.querySelector('[data-circuit-explanation]').textContent=explanation();
  root.querySelector('[data-circuit-desc]').textContent=description();
  root.querySelector('[data-circuit-blade]').setAttribute('transform',bladeTransform());
  const motion=root.querySelector('[data-action="circuit-motion"]');
  motion.disabled=!state.closed;
  motion.textContent=motionLabel();
 }

 function handleClick(button){
  const action=button.dataset.action;
  if(!['toggle-simple-circuit','circuit-motion'].includes(action))return false;
  const root=button.closest('[data-circuit-demo]');
  if(!root||button.disabled)return false;
  if(action==='toggle-simple-circuit')state.closed=!state.closed;
  else if(state.closed)state.paused=!state.paused;
  update(root);
  return true;
 }

 // State lasts through chapter re-renders; it does not change study progress.
 window.ChapterInteractions={render,handleClick};
})();
