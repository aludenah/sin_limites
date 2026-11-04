/* Galería de ejemplos geométricos: navegación manual, teclado, gesto y pantalla completa. */
(function(global){
 'use strict';
 const instances=new Map();
 const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const arrow=direction=>`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="${direction==='left'?'M15 5 8 12l7 7':'M9 5l7 7-7 7'}"/></svg>`;
 function render(items=[]){
  if(!Array.isArray(items)||!items.length)return '';
  return `<section class="geometry-shape-carousel" id="figuras-geometricas" role="region" aria-roledescription="carrusel" aria-label="Ejemplos de figuras geométricas"><div class="geometry-shape-head"><p>Ejemplos</p><button type="button" class="geometry-shape-fullscreen" data-shape-action="fullscreen" aria-label="Pantalla completa" title="Pantalla completa"><span aria-hidden="true">⛶</span><span class="geometry-shape-fullscreen-label">Pantalla completa</span></button></div><div class="geometry-shape-viewport" tabindex="0" aria-label="Usa las flechas izquierda y derecha para cambiar de figura"><div class="geometry-shape-track">${items.map((item,i)=>`<figure class="geometry-shape-slide" role="group" aria-roledescription="diapositiva" aria-label="${i+1} de ${items.length}: ${esc(item.name)}" ${i?'aria-hidden="true" inert':''}><img src="${esc(item.src)}" alt="${esc(item.alt)}" width="600" height="480" draggable="false" decoding="async"><figcaption><h4>${esc(item.name)}</h4></figcaption></figure>`).join('')}</div></div><div class="geometry-shape-controls"><button type="button" class="geometry-shape-arrow" data-shape-action="previous" aria-label="Figura anterior">${arrow('left')}</button><div class="geometry-shape-pagination"><div class="geometry-shape-dots" aria-label="Elegir figura">${items.map((item,i)=>`<button type="button" data-shape-action="select" data-shape-index="${i}" aria-label="Mostrar ${esc(item.name)}" ${i?'':'aria-current="true"'}><span></span></button>`).join('')}</div><p class="geometry-shape-status" aria-live="polite" aria-atomic="true">1 de ${items.length}</p></div><button type="button" class="geometry-shape-arrow" data-shape-action="next" aria-label="Siguiente figura">${arrow('right')}</button></div></section>`;
 }
 function mount(scope=document){
  for(const node of scope.querySelectorAll('.geometry-shape-carousel')){
   if(instances.has(node))continue;
   const track=node.querySelector('.geometry-shape-track'),slides=[...node.querySelectorAll('.geometry-shape-slide')],dots=[...node.querySelectorAll('[data-shape-action="select"]')],status=node.querySelector('.geometry-shape-status'),fullButton=node.querySelector('[data-shape-action="fullscreen"]');
   let current=0,start=null,disposed=false,bodyOverflow=null;
   function show(index){
    current=(index+slides.length)%slides.length;track.style.transform=`translateX(${-100*current}%)`;
    slides.forEach((slide,i)=>{slide.setAttribute('aria-hidden',String(i!==current));slide.inert=i!==current;});
    dots.forEach((dot,i)=>i===current?dot.setAttribute('aria-current','true'):dot.removeAttribute('aria-current'));
    status.textContent=`${current+1} de ${slides.length}`;
   }
   function expanded(on){
    node.classList.toggle('is-fullscreen',on);
    if(on&&bodyOverflow===null){bodyOverflow=document.body.style.overflow;document.body.style.overflow='hidden';}
    if(!on&&bodyOverflow!==null){document.body.style.overflow=bodyOverflow;bodyOverflow=null;}
    const label=on?'Salir de pantalla completa':'Pantalla completa';fullButton.setAttribute('aria-label',label);fullButton.title=label;fullButton.querySelector('.geometry-shape-fullscreen-label').textContent=label;
   }
   async function exitFullscreen(){if(document.fullscreenElement===node)try{await document.exitFullscreen();}catch{}expanded(false);}
   async function fullscreen(){
    if(node.classList.contains('is-fullscreen'))return exitFullscreen();
    expanded(true);
    try{if(node.requestFullscreen)await node.requestFullscreen();}catch{ /* La galería conserva la vista de ventana completa. */ }
    if(disposed&&document.fullscreenElement===node)try{await document.exitFullscreen();}catch{}
   }
   function click(event){const button=event.target.closest('[data-shape-action]');if(!button||!node.contains(button))return;const action=button.dataset.shapeAction;if(action==='next')show(current+1);else if(action==='previous')show(current-1);else if(action==='select'){const n=Number(button.dataset.shapeIndex);if(Number.isInteger(n)&&n>=0&&n<slides.length)show(n);}else if(action==='fullscreen')fullscreen();}
   function key(event){if(event.altKey||event.ctrlKey||event.metaKey)return;if(event.key==='ArrowRight'){event.preventDefault();show(current+1);}else if(event.key==='ArrowLeft'){event.preventDefault();show(current-1);}else if(event.key==='Home'){event.preventDefault();show(0);}else if(event.key==='End'){event.preventDefault();show(slides.length-1);}else if(event.key==='Escape'&&node.classList.contains('is-fullscreen')){event.preventDefault();exitFullscreen();}}
   function down(event){if(event.button!==0||event.target.closest('button'))return;start={x:event.clientX,y:event.clientY,id:event.pointerId};}
   function up(event){if(!start||event.pointerId!==start.id)return;const dx=event.clientX-start.x,dy=event.clientY-start.y;start=null;if(Math.abs(dx)>=45&&Math.abs(dx)>Math.abs(dy)*1.25)show(current+(dx<0?1:-1));}
   const cancel=()=>{start=null;};
   const fullscreenChange=()=>{if(document.fullscreenElement!==node&&node.classList.contains('is-fullscreen'))expanded(false);};
   node.addEventListener('click',click);node.addEventListener('keydown',key);node.addEventListener('pointerdown',down);node.addEventListener('pointerup',up);node.addEventListener('pointercancel',cancel);document.addEventListener('fullscreenchange',fullscreenChange);
   instances.set(node,()=>{disposed=true;expanded(false);if(document.fullscreenElement===node)document.exitFullscreen?.().catch(()=>{});node.removeEventListener('click',click);node.removeEventListener('keydown',key);node.removeEventListener('pointerdown',down);node.removeEventListener('pointerup',up);node.removeEventListener('pointercancel',cancel);document.removeEventListener('fullscreenchange',fullscreenChange);});
  }
 }
 function destroy(){for(const dispose of instances.values())dispose();instances.clear();}
 global.GeometryShapeCarousel=Object.freeze({render,mount,destroy});
})(window);
