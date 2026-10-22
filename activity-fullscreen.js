/* Shared, same-node full screen for SIN LÍMITES activities. */
(function(global){
 'use strict';
 if(global.ActivityFullscreen)return;
 const document=global.document;
 const SELECTORS=[
  '#stone-explorer','#magnitude-game','#prefix-game','#dimension-game','#geometry-derivation',
  '.constant-derivation','#prefix-explorer','#measurement-lab','.lab',
  '[data-electron-demo]','[data-circuit-demo]','#induction-lab',
  '#egypt-expedition','#inca-expedition','[data-text-detective]',
  '[data-chemistry-ph-lab]','[data-polyhedra-workshop]',
  '#activities-list','.unified-practice','[data-activity-fullscreen]'
 ];
 const SELECTOR=SELECTORS.join(',');
 const TOGGLE='[data-activity-fullscreen-toggle]';
 let active=null,observer=null,queued=false,started=false,sequence=0;
 const attr=(element,name)=>element.getAttribute(name);
 const restore=(element,name,value)=>value===null?element.removeAttribute(name):element.setAttribute(name,value);
 const toolbar=root=>Array.from(root.children).find(el=>el.classList.contains('activity-fs-toolbar'))||null;
 function matches(root){
  if(!root?.matches?.(SELECTOR)||root.closest('#heart-lab, #wire-field-lab'))return false;
  if(root.matches('.lab')&&!root.querySelector('#vector-ax'))return false;
  if(root.id==='activities-list')return Boolean(root.querySelector('.unified-practice'));
  if(root.matches('.unified-practice')&&root.closest('#activities-list'))return false;
  return true;
 }
 function key(root){
  if(root.id==='activities-list'||root.matches('.unified-practice'))return 'practice';
  if(root.id)return 'id:'+root.id;
  if(root.matches('.lab'))return 'vector-lab';
  for(const selector of SELECTORS)if(root.matches(selector))return 'selector:'+selector;
  return null;
 }
 function title(root){
  if(key(root)==='practice')return 'Práctica del capítulo';
  const named=attr(root,'aria-labelledby');
  const label=named&&named.split(/\s+/).map(id=>document.getElementById(id)?.textContent||'').join(' ').trim();
  return (label||attr(root,'aria-label')||root.querySelector('h2, h3, h4')?.textContent||'Actividad interactiva').replace(/\s+/g,' ').trim().slice(0,110);
 }
 function addToolbar(root){
  let bar=toolbar(root);
  if(!bar){
   bar=document.createElement('div');bar.className='activity-fs-toolbar';
   const caption=document.createElement('span');caption.className='activity-fs-caption';caption.textContent=title(root);bar.appendChild(caption);
   const button=document.createElement('button');button.type='button';button.className='activity-fs-toggle';button.setAttribute('data-activity-fullscreen-toggle','');
   button.setAttribute('aria-expanded','false');
   bar.appendChild(button);root.insertBefore(bar,root.firstChild);
  }
  const button=bar.querySelector(TOGGLE),isOpen=active?.element===root;
  if(button){
   const label=isOpen?'Salir de pantalla completa':'Pantalla completa';
   const text=(isOpen?'↙ ':'⛶ ')+label;
   if(button.textContent!==text)button.textContent=text;
   button.setAttribute('aria-label',label+' · '+title(root));button.setAttribute('aria-expanded',String(isOpen));
   if(root.id)button.setAttribute('aria-controls',root.id);
  }
  return button;
 }
 function notifyResize(){global.dispatchEvent?.(new global.Event('resize'));}
 function decorate(state,root){
  state.element=root;state.native=false;
  state.attributes={role:attr(root,'role'),modal:attr(root,'aria-modal'),label:attr(root,'aria-label')};
  state.background=root.style.getPropertyValue('--activity-fs-background');
  let background=global.getComputedStyle?.(root)?.backgroundColor;
  if(!background||background==='transparent'||background==='rgba(0, 0, 0, 0)')background='#fff';
  root.style.setProperty('--activity-fs-background',background);
  root.classList.add('activity-fs-active');root.setAttribute('role','dialog');root.setAttribute('aria-modal','true');
  if(!attr(root,'aria-labelledby')&&!attr(root,'aria-label'))root.setAttribute('aria-label',title(root));
  addToolbar(root);root.scrollTop=0;
 }
 function undecorate(state){
  const root=state.element;if(!root)return;
  root.classList.remove('activity-fs-active');
  restore(root,'role',state.attributes.role);restore(root,'aria-modal',state.attributes.modal);restore(root,'aria-label',state.attributes.label);
  if(state.background)root.style.setProperty('--activity-fs-background',state.background);else root.style.removeProperty('--activity-fs-background');
 }
 function focus(element){try{element?.focus?.({preventScroll:true});}catch{element?.focus?.();}}
 function finish({restoreFocus=true,exitNative=true}={}){
  const state=active;if(!state)return;
  active=null;undecorate(state);addToolbar(state.element);
  if(!state.lockWasPresent)document.documentElement.classList.remove('activity-fs-open');
  if(exitNative&&document.fullscreenElement===state.element)Promise.resolve(document.exitFullscreen?.()).catch(()=>{});
  if(restoreFocus)focus(state.opener?.isConnected?state.opener:toolbar(state.element)?.querySelector(TOGGLE));
  global.scrollTo?.({left:state.scrollX,top:state.scrollY,behavior:'instant'});notifyResize();
 }
 async function open(root){
  if(!matches(root))return false;
  if(active?.element===root){finish();return false;}
  if(active)finish({restoreFocus:false});
  const state={element:root,key:key(root),token:++sequence,opener:document.activeElement,scrollX:global.scrollX||0,scrollY:global.scrollY||0,lockWasPresent:document.documentElement.classList.contains('activity-fs-open'),native:false};
  active=state;document.documentElement.classList.add('activity-fs-open');decorate(state,root);focus(toolbar(root)?.querySelector(TOGGLE));notifyResize();
  if(typeof root.requestFullscreen==='function'){
   try{
    await root.requestFullscreen();
    if(active===state&&state.element===root){state.native=document.fullscreenElement===root;notifyResize();}
    else if(document.fullscreenElement===root)await document.exitFullscreen?.();
   }catch{/* The same-node viewport mode remains fully usable. */}
  }
  return active===state;
 }
 function refresh(){
  queued=false;
  const roots=Array.from(document.querySelectorAll(SELECTOR)).filter(matches);
  const unique=[...new Set(roots)];
  if(active&&!active.element.isConnected){
   const replacement=unique.find(root=>key(root)===active.key);
   if(replacement){
    const state=active;undecorate(state);decorate(state,replacement);focus(toolbar(replacement)?.querySelector(TOGGLE));notifyResize();
   }else finish();
  }
  unique.forEach(addToolbar);
  return unique.length;
 }
 function queueRefresh(){if(!queued){queued=true;global.queueMicrotask?global.queueMicrotask(refresh):Promise.resolve().then(refresh);}}
 function observe(records){
  if(active&&!active.element.isConnected){queueRefresh();return;}
  for(const record of records){
   if(matches(record.target)&&!toolbar(record.target)){queueRefresh();return;}
   for(const node of [...record.addedNodes,...record.removedNodes]){
    if(node.nodeType===1&&(node.matches?.(SELECTOR)||node.querySelector?.(SELECTOR))){queueRefresh();return;}
   }
  }
 }
 function click(event){
  const button=event.target?.closest?.(TOGGLE);if(!button)return;
  const root=button.parentElement?.parentElement;if(!matches(root))return;
  event.preventDefault();event.stopPropagation();
  if(active?.element===root)finish();else open(root);
 }
 function keydown(event){
  const state=active;if(!state)return;
  const nestedDialog=document.querySelector('dialog[open]');
  if(nestedDialog&&!state.element.contains(nestedDialog))return;
  if(event.key==='Escape'){event.preventDefault();event.stopPropagation();finish();return;}
  if(event.key!=='Tab')return;
  const controls=Array.from(state.element.querySelectorAll('a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),summary,[tabindex="0"]')).filter(el=>!el.hidden&&el.getClientRects().length>0);
  const first=controls[0],last=controls[controls.length-1];
  if(event.shiftKey&&(document.activeElement===first||!state.element.contains(document.activeElement))){event.preventDefault();focus(last);}
  else if(!event.shiftKey&&(document.activeElement===last||!state.element.contains(document.activeElement))){event.preventDefault();focus(first);}
 }
 function fullscreenchange(){
  if(!active)return;
  if(document.fullscreenElement===active.element){active.native=true;return;}
  if(active.native){
   const previous=active.element;
   if(!previous.isConnected){refresh();if(!active||active.element!==previous)return;}
   finish({exitNative:false});
  }
 }
 function start(){
  if(started)return;started=true;refresh();
  document.addEventListener('click',click,true);document.addEventListener('keydown',keydown,true);document.addEventListener('fullscreenchange',fullscreenchange);
  if(global.MutationObserver){observer=new global.MutationObserver(observe);observer.observe(document.documentElement,{childList:true,subtree:true});}
 }
 function stop(){
  finish();observer?.disconnect();observer=null;
  document.removeEventListener('click',click,true);document.removeEventListener('keydown',keydown,true);document.removeEventListener('fullscreenchange',fullscreenchange);started=false;
 }
 global.ActivityFullscreen={start,stop,refresh,open,close:finish,getState:()=>active?{key:active.key,element:active.element,native:active.native}:null};
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
})(window);
