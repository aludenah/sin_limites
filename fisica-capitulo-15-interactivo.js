'use strict';
(function(){
 const state={closed:false,paused:false};
 const id='fis15-circuito-simple';
 const status=()=>state.closed?'Circuito cerrado · foco encendido':'Circuito abierto · foco apagado';
 const explanation=()=>state.closed
  ?'El interruptor une los contactos. La batería mantiene una corriente en el circuito y el foco se enciende.'
  :'El interruptor separa los contactos. El circuito está abierto, no circula corriente y el foco permanece apagado.';
 const description=()=>`Circuito con imágenes realistas de una batería, un interruptor de cuchilla y un foco sobre su portalámparas, conectados en serie. ${status()}.`;
 const actionLabel=()=>state.closed?'Abrir interruptor':'Cerrar interruptor';
 const motionLabel=()=>state.paused?'Reanudar movimiento':'Pausar movimiento';
 const assets='assets/fisica-capitulo-15/realistas/';
 // Cable ends coincide with the photographed screw terminals. All component
 // states are loaded together; changing state never starts another download.
 const positiveWire='M400 375 C342 339 279 412 176 401 C89 391 64 340 64 291 C64 244 87 220 128 219';
 const lampWire='M383 219 C447 209 509 246 579 258';
 const returnWire='M791 258 C852 270 854 326 819 370 C761 452 651 433 583 388 C550 359 526 358 500 375';

 function render(kind){
  if(kind==='electron-drift')return window.ElectronDrift.render(kind);
  if(kind!=='simple-circuit')return '';
  return `<section class="circuit-sim" id="${id}" data-circuit-demo data-state="${state.closed?'closed':'open'}" data-motion="${state.paused?'paused':'running'}" aria-labelledby="${id}-title">
   <p class="circuit-kicker">Explora el circuito</p>
   <h4 id="${id}-title">¿Qué sucede al cerrar el interruptor?</h4>
   <p class="circuit-instruction">Pulsa el interruptor o utiliza el botón.</p>
   <div class="circuit-stage">
    <svg class="circuit-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 660" width="900" height="660" role="img" aria-labelledby="${id}-svg-title ${id}-svg-desc" focusable="false">
     <title id="${id}-svg-title">Circuito con componentes de apariencia realista</title>
     <desc id="${id}-svg-desc" data-circuit-desc="">${description()}</desc>
     <rect width="900" height="660" fill="#ffffff"/>
     <g aria-hidden="true">
      <image class="circuit-photo-off" href="${assets}interruptor-abierto.webp" x="50" y="20" width="410" height="273.33" preserveAspectRatio="xMidYMid meet"/>
      <image class="circuit-photo-on" href="${assets}interruptor-cerrado.webp" x="50" y="28.3" width="410" height="273.33" preserveAspectRatio="xMidYMid meet"/>
      <image class="circuit-photo-off" href="${assets}foco-apagado.webp" x="515" y="35" width="340" height="340" preserveAspectRatio="xMidYMid meet"/>
      <image class="circuit-photo-on" href="${assets}foco-encendido.webp" x="515" y="35" width="340" height="340" preserveAspectRatio="xMidYMid meet"/>
      <image href="${assets}bateria.webp" x="310" y="350" width="280" height="280" preserveAspectRatio="xMidYMid meet"/>
     </g>
     <g fill="none" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="${positiveWire} ${lampWire} ${returnWire}" stroke="#15222b" stroke-opacity=".14" stroke-width="9" transform="translate(0 3)"/>
      <path d="${positiveWire} ${lampWire}" stroke="#6b2926" stroke-width="9"/>
      <path d="${positiveWire} ${lampWire}" stroke="#c94c40" stroke-width="6"/>
      <path d="${returnWire}" stroke="#172630" stroke-width="9"/>
      <path d="${returnWire}" stroke="#495057" stroke-width="5"/>
      <path class="circuit-flow" d="${positiveWire} ${lampWire} ${returnWire}"/>
     </g>
     <g class="circuit-labels" fill="#172630" font-family="Arial, sans-serif" font-size="30" text-anchor="middle">
      <text x="255" y="321">Interruptor</text>
      <text x="685" y="380">Foco</text>
      <text x="450" y="644">Batería</text>
      <text x="370" y="365" font-size="33" fill="#a42e26">+</text>
      <text x="534" y="365" font-size="33">−</text>
     </g>
    </svg>
    <button type="button" class="circuit-switch-hit" data-action="toggle-simple-circuit" role="switch" aria-checked="${state.closed}" aria-label="Interruptor de la imagen" aria-controls="${id}-status" title="${actionLabel()}"><span class="sr-only">${actionLabel()}</span></button>
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
  const motion=root.querySelector('[data-action="circuit-motion"]');
  motion.disabled=!state.closed;
  motion.textContent=motionLabel();
 }

 function handleClick(button){
  if(window.ElectronDrift?.handleClick(button))return true;
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
 window.ChapterInteractions={render,handleClick,mount:root=>window.ElectronDrift?.mount(root),unmount:()=>window.ElectronDrift?.unmount()};
})();
