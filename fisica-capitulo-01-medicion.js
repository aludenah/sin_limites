(function(){
 'use strict';
 const ASSET_BASE='assets/fisica-capitulo-01/medir-realista/';
 const layout={
  scaleLCD:{x:288,y:591,width:449,height:98},
  clockLCD:{x:281,y:350,width:463,height:239},
  tray:{x:270,y:365,width:480},
  pencil:{x:21,y:430,width:982,height:130}
 };
 const validMasses=[100,500,1000],MAX_MASS=5000,MAX_WEIGHTS=6;
 const finite=(value,fallback)=>Number.isFinite(Number(value))?Number(value):fallback;
 const clamp=(value,min,max)=>Math.max(min,Math.min(max,value));
 const decimal=(number,digits=1)=>Number(number).toLocaleString('es-ES',{maximumFractionDigits:digits,useGrouping:false});
 const clockText=milliseconds=>(Math.floor(milliseconds/100)/10).toFixed(1).replace('.',',');

 // This model uses integer grams, tenths of centimetres and a monotonic clock.
 // It has no dependency on lesson progress, authentication or the DOM.
 function createModel(now=()=>performance.now()){
  let tab='mass',weights=[],massUnit='g',lengthTenths=120,positionTenths=0,lengthUnit='cm';
  let elapsed=0,started=null;
  const time=()=>elapsed+(started===null?0:Math.max(0,now()-started));
  const total=()=>weights.reduce((sum,mass)=>sum+mass,0);
  const pause=()=>{if(started!==null){elapsed=time();started=null;}};
  const canAdd=mass=>validMasses.includes(mass)&&weights.length<MAX_WEIGHTS&&total()+mass<=MAX_MASS;
  return {
   state:()=>({tab,weights:weights.slice(),mass:total(),massUnit,length:lengthTenths/10,position:positionTenths/10,end:(lengthTenths+positionTenths)/10,lengthUnit,elapsed:time(),running:started!==null}),
   canAdd,
   setTab(value){if(!['mass','length','time'].includes(value))return false;pause();tab=value;return true;},
   addMass(mass){mass=Number(mass);if(!canAdd(mass))return false;weights.push(mass);return true;},
   removeMass(mass){const index=weights.lastIndexOf(Number(mass));if(index<0)return false;weights.splice(index,1);return true;},
   resetMass(){weights=[];},
   setMassUnit(unit){if(!['g','kg'].includes(unit))return false;massUnit=unit;return true;},
   setLength(value){lengthTenths=clamp(Math.round(finite(value,12)*10),40,180);},
   setPosition(value){positionTenths=clamp(Math.round(finite(value,0)*10),0,20);},
   setLengthUnit(unit){if(!['cm','mm'].includes(unit))return false;lengthUnit=unit;return true;},
   start(){if(tab!=='time'||started!==null)return false;started=now();return true;},
   pause,
   resetTime(){started=null;elapsed=0;},
   reset(){pause();tab='mass';weights=[];massUnit='g';lengthTenths=120;positionTenths=0;lengthUnit='cm';elapsed=0;}
  };
 }
 const model=createModel();
 let mounted=null,frame=null,lastTenth=-1;
 const actionButton=(action,label,extra='',classes='')=>`<button type="button" class="measure-button ${classes}" data-action="measurement-lab" data-measure-action="${action}" ${extra}>${label}</button>`;
 const choice=(action,value,label,active)=>actionButton(action,label,`data-value="${value}" aria-pressed="${active}"`,active?'is-selected':'');
 const lcdFont=(rect,text)=>Math.min(rect.height*.67,rect.width*.72/(Math.max(text.length,4)*.64));
 function lcd(rect,text,unit){
  return `<g class="measure-lcd"><rect x="${rect.x}" y="${rect.y}" width="${rect.width}" height="${rect.height}" rx="7" fill="#c9d3b1"/><rect x="${rect.x+3}" y="${rect.y+3}" width="${rect.width-6}" height="${rect.height-6}" rx="5" fill="url(#measure-lcd-glass)"/><text data-measure-digits="" x="${rect.x+rect.width*.46}" y="${rect.y+rect.height*.68}" text-anchor="middle" fill="#243323" font-family="ui-monospace,monospace" font-weight="600" font-size="${lcdFont(rect,text)}">${text}</text><text x="${rect.x+rect.width*.90}" y="${rect.y+rect.height*.69}" text-anchor="middle" fill="#243323" font-family="sans-serif" font-size="${rect.height*.28}">${unit}</text></g>`;
 }
 const svgDefs=()=>`<defs><linearGradient id="measure-lcd-glass" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#edf2dc"/><stop offset=".42" stop-color="#cbd5b7"/><stop offset="1" stop-color="#acb992"/></linearGradient><linearGradient id="measure-steel" x1="0" y1="0" x2="1" y2="0"><stop stop-color="#47535d"/><stop offset=".25" stop-color="#dbe0e2"/><stop offset=".5" stop-color="#9da7ad"/><stop offset=".72" stop-color="#edf1f1"/><stop offset="1" stop-color="#59646d"/></linearGradient><linearGradient id="measure-ruler" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#f4e7c8"/><stop offset=".4" stop-color="#e6cea0"/><stop offset="1" stop-color="#cda976"/></linearGradient></defs>`;
 function weight(mass,index,count){
  const columns=Math.min(3,count),row=Math.floor(index/3),column=index%3;
  const baseSize=mass===1000?1:mass===500?.8:.61,scale=baseSize*1.2;
  const gap=layout.tray.width/3,x=layout.tray.x+gap*(column+.5)+(3-columns)*gap/2;
  const y=layout.tray.y+row*42;
  return `<g transform="translate(${x} ${y}) scale(${scale})"><ellipse cy="2" rx="49" ry="12" fill="#122744" opacity=".17"/><path d="M-43-13L-32-87Q0-106 32-87L43-13Q0 8-43-13Z" fill="url(#measure-steel)" stroke="#58626a" stroke-width="2"/><ellipse cy="-87" rx="32" ry="10" fill="#d0d6d9" stroke="#6c7981" stroke-width="2"/><path d="M-11-93V-110Q0-119 11-110V-93" fill="url(#measure-steel)" stroke="#59656f" stroke-width="3"/><text y="-40" text-anchor="middle" fill="#25313a" font-family="sans-serif" font-size="${mass===1000?18:16}" font-weight="700">${mass===1000?'1 kg':mass+' g'}</text></g>`;
 }
 function massScene(s){
  const value=s.massUnit==='g'?s.mass:s.mass/1000;
  return `<svg class="measure-photo-stage" viewBox="0 0 1024 1024" role="img" aria-labelledby="measure-scale-title"><title id="measure-scale-title">Balanza de laboratorio con ${s.weights.length} pesas: ${decimal(value)} ${s.massUnit}.</title>${svgDefs()}<image href="${ASSET_BASE}balanza.webp" width="1024" height="1024"/>${s.weights.map((m,i)=>weight(m,i,s.weights.length)).join('')}${lcd(layout.scaleLCD,decimal(value),s.massUnit)}</svg>`;
 }
 function massControls(s){
  return `<p class="measure-instruction">Coloca o retira pesas y observa la lectura de la balanza.</p><div class="measure-weights">${validMasses.map(mass=>{const count=s.weights.filter(m=>m===mass).length,label=mass===1000?'1 kg':mass+' g';return `<div class="measure-weight-control"><strong>${label}</strong><span>${count} ${count===1?'pesa':'pesas'}</span><div>${actionButton('remove-mass','−',`data-value="${mass}" aria-label="Retirar una pesa de ${label}" ${count?'':'disabled'}`)}${actionButton('add-mass','+',`data-value="${mass}" aria-label="Agregar una pesa de ${label}" ${model.canAdd(mass)?'':'disabled'}`)}</div></div>`;}).join('')}</div><div class="measure-control-row"><div class="measure-unit-group" role="group" aria-label="Unidad de masa">${choice('mass-unit','g','Gramos · g',s.massUnit==='g')}${choice('mass-unit','kg','Kilogramos · kg',s.massUnit==='kg')}</div>${actionButton('reset-mass','Vaciar balanza')}</div><p class="measure-note">Capacidad del laboratorio: hasta 6 pesas y 5 kg. La unidad base de masa del SI es el kilogramo.</p>`;
 }
 function lengthScene(s){
  const left=70,scale=44.2,start=left+s.position*scale,end=left+s.end*scale,p=layout.pencil;
  const tickLabels=Array.from({length:201},(_,i)=>{const x=left+i*scale/10,major=i%10===0,half=i%5===0;return `<path d="M${x} 220v${major?40:half?28:17}" stroke="#3b3327" stroke-width="${major?1.8:1}"/>${i%20===0?`<text x="${x}" y="288" text-anchor="middle" fill="#3b3327" font-family="sans-serif" font-size="32">${s.lengthUnit==='mm'?i:i/10}</text>`:''}`;}).join('');
  return `<svg class="measure-length-stage" viewBox="0 0 1024 390" role="img" aria-labelledby="measure-ruler-title"><title id="measure-ruler-title">Lápiz desde ${decimal(s.position)} hasta ${decimal(s.end)} centímetros. Longitud: ${decimal(s.length)} centímetros.</title>${svgDefs()}<rect x="48" y="218" width="930" height="99" rx="8" fill="url(#measure-ruler)" stroke="#b09062" stroke-width="2"/><path d="M60 305H961M63 308H935" stroke="#af8956" opacity=".35"/>${tickLabels}<text x="955" y="305" text-anchor="end" fill="#4f422e" font-family="sans-serif" font-size="15">${s.lengthUnit}</text><defs><clipPath id="measure-pencil-clip"><rect x="${start}" y="108" width="${s.length*scale}" height="73"/></clipPath></defs><g clip-path="url(#measure-pencil-clip)"><svg x="${start}" y="108" width="${s.length*scale}" height="73" viewBox="${p.x} ${p.y} ${p.width} ${p.height}" preserveAspectRatio="none" overflow="hidden"><image href="${ASSET_BASE}lapiz.webp" width="1024" height="1024"/></svg></g><path d="M${start} 183V321M${end} 183V321" stroke="#275c90" stroke-width="2" stroke-dasharray="5 4"/><path d="M${start} 75H${end}M${start+9} 70L${start} 75L${start+9} 80M${end-9} 70L${end} 75L${end-9} 80" fill="none" stroke="#275c90" stroke-width="2.5"/><text x="${(start+end)/2}" y="52" text-anchor="middle" fill="#122744" font-family="sans-serif" font-size="22" font-weight="700">Longitud: ${decimal(s.length*(s.lengthUnit==='mm'?10:1))} ${s.lengthUnit}</text><text x="${start}" y="351" text-anchor="middle" fill="#275c90" font-family="sans-serif" font-size="17">Inicio</text><text x="${end}" y="351" text-anchor="middle" fill="#275c90" font-family="sans-serif" font-size="17">Final</text></svg>`;
 }
 function lengthControls(s){
  const factor=s.lengthUnit==='mm'?10:1;
  return `<p class="measure-instruction">Cambia la longitud del lápiz y desplázalo sobre la regla. ¿Debe empezar siempre en cero?</p><div class="measure-sliders"><label for="measure-length">Longitud del lápiz <output data-measure-length-label for="measure-length">${decimal(s.length)} cm</output><input id="measure-length" data-measure-input="length" type="range" min="4" max="18" step="0.1" value="${s.length}" aria-valuetext="${decimal(s.length)} centímetros"></label><label for="measure-position">Posición inicial <output data-measure-position-label for="measure-position">${decimal(s.position)} cm</output><input id="measure-position" data-measure-input="position" type="range" min="0" max="2" step="0.1" value="${s.position}" aria-valuetext="${decimal(s.position)} centímetros"></label></div><div class="measure-unit-group" role="group" aria-label="Unidad de longitud">${choice('length-unit','cm','Centímetros · cm',s.lengthUnit==='cm')}${choice('length-unit','mm','Milímetros · mm',s.lengthUnit==='mm')}</div><p class="measure-subtraction" data-measure-subtraction>Longitud = lectura final − lectura inicial<br><strong>${decimal(s.end*factor)} ${s.lengthUnit} − ${decimal(s.position*factor)} ${s.lengthUnit} = ${decimal(s.length*factor)} ${s.lengthUnit}</strong></p><p class="measure-note">Cada división pequeña vale 1 mm. Desplazar el lápiz cambia las lecturas, pero no su longitud.</p>`;
 }
 function timeScene(s){return `<svg class="measure-photo-stage" viewBox="0 0 1024 1024" role="img" aria-labelledby="measure-clock-title"><title id="measure-clock-title">Cronómetro digital. La lectura en segundos también aparece debajo del instrumento.</title>${svgDefs()}<image href="${ASSET_BASE}cronometro.webp" width="1024" height="1024"/>${lcd(layout.clockLCD,clockText(s.elapsed),'s')}</svg>`;}
 function timeControls(s){
  return `<p class="measure-instruction">Mide un intervalo: inicia el cronómetro, espera unos segundos y páusalo para leer el resultado.</p><div class="measure-control-row">${actionButton(s.running?'pause-time':'start-time',s.running?'Pausar':'Iniciar','',s.running?'':'is-primary')}${actionButton('reset-time','Reiniciar')}</div><p class="measure-timer-state" data-measure-timer-state>${s.running?'Midiendo…':s.elapsed>0?'Cronómetro en pausa.':'Cronómetro preparado.'}</p><p class="measure-note">La lectura muestra décimas de segundo. Al cambiar de instrumento, de tema o de pestaña del navegador, el cronómetro se pausa.</p>`;
 }
 function result(s){
  const mass=s.tab==='mass',length=s.tab==='length';
  const value=mass?decimal(s.mass/(s.massUnit==='kg'?1000:1)):length?decimal(s.length*(s.lengthUnit==='mm'?10:1)):clockText(s.elapsed);
  const unit=mass?s.massUnit:length?s.lengthUnit:'s',name=mass?'Masa':length?'Longitud':'Tiempo';
  return `<div class="measure-result"><p class="measure-result-equation"><strong>${name} = <span data-measure-value>${value}</span> <span data-measure-unit>${unit}</span></strong></p><dl><div><dt>Magnitud</dt><dd>${name}</dd></div><div><dt>Valor numérico</dt><dd data-measure-result-number>${value}</dd></div><div><dt>Unidad</dt><dd>${unit}</dd></div></dl></div>`;
 }
 function panel(){const s=model.state();return `<div class="measure-stage" data-measure-stage>${s.tab==='mass'?massScene(s):s.tab==='length'?lengthScene(s):timeScene(s)}</div><div class="measure-controls">${s.tab==='mass'?massControls(s):s.tab==='length'?lengthControls(s):timeControls(s)}</div><div data-measure-result>${result(s)}</div>`;}
 function render(){
  const s=model.state();
  return `<section class="measurement-lab" id="measurement-lab" aria-labelledby="measurement-lab-title"><header class="measure-header"><span class="measure-kicker">Laboratorio interactivo</span><h3 id="measurement-lab-title">Medir: comparar con una unidad</h3><p>Explora instrumentos, cambia las medidas y descubre cómo se expresa cada magnitud.</p></header><div class="measure-instruments" role="group" aria-label="Elige un instrumento">${[['mass','Masa','Balanza'],['length','Longitud','Regla'],['time','Tiempo','Cronómetro']].map(([id,title,instrument])=>actionButton('instrument',`<strong>${title}</strong><span>${instrument}</span>`,`data-value="${id}" aria-pressed="${s.tab===id}" aria-controls="measure-panel"`,s.tab===id?'is-selected':'')).join('')}</div><div id="measure-panel">${panel()}</div><p class="measure-status sr-only" data-measure-status role="status" aria-live="polite"></p><p class="measure-footnote">Simulación educativa: las medidas cambian al manipular los controles.</p></section>`;
 }
 function cancelFrame(){if(frame!==null){window.cancelAnimationFrame(frame);frame=null;}}
 function paintTime(){
  if(!mounted)return;
  const s=model.state(),value=clockText(s.elapsed);
  for(const selector of ['[data-measure-digits]','[data-measure-value]','[data-measure-result-number]']){
   const node=mounted.querySelector(selector);if(node){node.textContent=value;if(selector==='[data-measure-digits]')node.setAttribute('font-size',String(lcdFont(layout.clockLCD,value)));}
  }
 }
 function schedule(){
  cancelFrame();
  if(!mounted||model.state().tab!=='time'||!model.state().running||document.hidden)return;
  frame=window.requestAnimationFrame(function tick(){
   frame=null;
   if(!mounted||document.hidden||model.state().tab!=='time'){model.pause();return;}
   const s=model.state();if(!s.running)return;
   const tenth=Math.floor(s.elapsed/100);if(tenth!==lastTenth){lastTenth=tenth;paintTime();}
   frame=window.requestAnimationFrame(tick);
  });
 }
 function announce(message){const status=mounted?.querySelector('[data-measure-status]');if(status)status.textContent=message;}
 function repaint(action,value){
  if(!mounted)return;
  const previous=document.activeElement,hadFocus=!!previous&&mounted.contains(previous);
  const s=model.state();
  mounted.querySelector('#measure-panel').innerHTML=panel();
  for(const button of mounted.querySelectorAll('[data-measure-action="instrument"]')){
   const active=button.dataset.value===s.tab;button.setAttribute('aria-pressed',String(active));button.classList.toggle('is-selected',active);
  }
  if(hadFocus&&action&&action!=='instrument'){
   const selector=`[data-measure-action="${action}"]${value!==undefined?`[data-value="${value}"]`:''}`;
   const next=mounted.querySelector(selector);
   if(next&&!next.disabled)next.focus({preventScroll:true});
   else if(s.tab==='time')mounted.querySelector('[data-measure-action="'+(s.running?'pause-time':'start-time')+'"]')?.focus({preventScroll:true});
   else mounted.querySelector('[data-measure-action="reset-mass"]')?.focus({preventScroll:true});
  }
  schedule();
 }
 function handleAction(button){
  const action=button?.dataset?.measureAction;if(!action)return false;
  if(!mounted||!mounted.contains(button)||button.disabled)return true;
  const value=button.dataset.value;
  if(action==='instrument')model.setTab(value);
  else if(action==='add-mass')model.addMass(value);
  else if(action==='remove-mass')model.removeMass(value);
  else if(action==='reset-mass')model.resetMass();
  else if(action==='mass-unit')model.setMassUnit(value);
  else if(action==='length-unit')model.setLengthUnit(value);
  else if(action==='start-time'){if(!document.hidden)model.start();}
  else if(action==='pause-time')model.pause();
  else if(action==='reset-time')model.resetTime();
  else return false;
  repaint(action,value);
  const s=model.state();
  if(s.tab==='mass')announce(`Masa: ${decimal(s.mass/(s.massUnit==='kg'?1000:1))} ${s.massUnit}. ${s.weights.length} pesas en la balanza.`);
  else if(s.tab==='length')announce('Regla seleccionada. Modifica la longitud y la posición con los controles.');
  else announce(s.running?'Cronómetro iniciado.':`Cronómetro en pausa: ${clockText(s.elapsed)} segundos.`);
  return true;
 }
 function handleInput(input){
  const field=input?.dataset?.measureInput;if(!['length','position'].includes(field))return false;
  if(!mounted||!mounted.contains(input)||model.state().tab!=='length')return true;
  if(field==='length')model.setLength(input.value);else model.setPosition(input.value);
  const s=model.state(),factor=s.lengthUnit==='mm'?10:1;
  mounted.querySelector('[data-measure-stage]').innerHTML=lengthScene(s);
  mounted.querySelector('[data-measure-result]').innerHTML=result(s);
  mounted.querySelector('[data-measure-length-label]').textContent=decimal(s.length)+' cm';
  mounted.querySelector('[data-measure-position-label]').textContent=decimal(s.position)+' cm';
  input.setAttribute('aria-valuetext',decimal(s[field])+' centímetros');
  mounted.querySelector('[data-measure-subtraction]').innerHTML=`Longitud = lectura final − lectura inicial<br><strong>${decimal(s.end*factor)} ${s.lengthUnit} − ${decimal(s.position*factor)} ${s.lengthUnit} = ${decimal(s.length*factor)} ${s.lengthUnit}</strong>`;
  return true;
 }
 function onVisibility(){if(document.hidden){model.pause();cancelFrame();if(mounted&&model.state().tab==='time'){repaint();announce('Cronómetro pausado al salir de la página.');}}}
 function mount(){
  const element=document.getElementById('measurement-lab');
  if(mounted===element)return;
  unmount();mounted=element;
  if(mounted){document.addEventListener('visibilitychange',onVisibility);if(model.state().tab==='time')repaint();}
 }
 function unmount(){model.pause();cancelFrame();document.removeEventListener('visibilitychange',onVisibility);mounted=null;lastTenth=-1;}
 function reset(){unmount();model.reset();}
 window.MeasurementLab={render,handleAction,handleInput,mount,unmount,reset,createModel,layout};
})();
