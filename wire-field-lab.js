(function(global){
'use strict';
let active=null,remembered=null;
const E=global.WireFieldEngine;
const VIEWS={"3d":"Perspectiva 3D",xy:"Transversal · plano xy",xz:"Longitudinal · plano xz",yz:"Longitudinal · plano yz"};
const initial=()=>({view:'3d',current:5,radius:5,angle:90,earth:false,azimuth:-70,elevation:24,zoom:1,playing:!global.matchMedia?.('(prefers-reduced-motion: reduce)').matches,phase:0});
const fmt=(n,d=1)=>Number(Math.abs(n)<1e-9?0:n).toLocaleString('es-ES',{minimumFractionDigits:d,maximumFractionDigits:d});
function render(){return `<section class="wfl" id="wire-field-lab" aria-labelledby="wfl-title">
<header class="wfl-head"><div><span class="wfl-kicker">Laboratorio de electromagnetismo</span><h3 id="wfl-title">Un hilo, un campo circular</h3><p>Explora el campo de un conductor rectilíneo largo. Cambia de plano y comprueba la regla de la mano derecha.</p></div><button type="button" data-wf-action="fullscreen">⛶ Pantalla completa</button></header>
<div class="wfl-layout">
<aside class="wfl-controls" aria-label="Controles del conductor y del campo">
<div class="wfl-group"><span class="wfl-label">01 · Elige una vista</span><div class="wfl-views">${Object.entries(VIEWS).map(([id,label])=>`<button type="button" data-wf-action="view" data-value="${id}" aria-pressed="${id==='3d'}">${label}</button>`).join('')}</div><div data-wf-orbit-controls><label class="wfl-control-title" for="wfl-azimuth">Giro horizontal</label><input id="wfl-azimuth" type="range" min="-180" max="180" value="-70" step="1" data-wf-field="azimuth"><label class="wfl-control-title" for="wfl-elevation">Inclinación</label><input id="wfl-elevation" type="range" min="-60" max="80" value="24" step="1" data-wf-field="elevation"><p class="wfl-caption">Arrastra el dibujo para girarlo. La rueda permite desplazarte por la página.</p></div></div>
<div class="wfl-group"><span class="wfl-label">02 · Corriente convencional</span><label class="wfl-control-title" for="wfl-current">Intensidad I <output data-wf-current for="wfl-current">+5,0 A</output></label><input id="wfl-current" type="range" min="-10" max="10" step="0.5" value="5" data-wf-field="current"><div class="wfl-pair"><button type="button" data-wf-action="reverse">Invertir I</button><button type="button" data-wf-action="off">I = 0</button></div><p class="wfl-caption">El signo elige el sentido a lo largo del eje z.</p></div>
<div class="wfl-group"><span class="wfl-label">03 · Punto de observación</span><label class="wfl-control-title" for="wfl-radius">Distancia r <output data-wf-radius for="wfl-radius">5,0 cm</output></label><input id="wfl-radius" type="range" min="1" max="12" step="0.5" value="5" data-wf-field="radius"><label class="wfl-control-title" for="wfl-angle">Posición angular <output data-wf-angle for="wfl-angle">90°</output></label><input id="wfl-angle" type="range" min="0" max="360" step="5" value="90" data-wf-field="angle"><label class="wfl-checkbox"><input type="checkbox" data-wf-field="earth">Añadir campo terrestre horizontal de 25 μT hacia +y</label><button type="button" data-wf-action="oersted" style="width:100%;margin-top:10px">Experimento de Oersted</button></div>
<div class="wfl-group"><span class="wfl-label">04 · Visualización</span><div class="wfl-zoom"><button type="button" data-wf-action="zoom-out" aria-label="Alejar">−</button><output data-wf-zoom>100 %</output><button type="button" data-wf-action="zoom-in" aria-label="Acercar">+</button></div><div class="wfl-pair"><button type="button" data-wf-action="play" aria-pressed="true">Pausar flechas</button><button type="button" data-wf-action="reset">Restablecer</button></div></div>
</aside>
<div class="wfl-scene"><div class="wfl-stage-top"><span class="wfl-tag" data-wf-view-label>Perspectiva 3D · hilo en el eje z</span><span class="wfl-tag" data-wf-direction>I hacia +z</span></div><svg class="wfl-viewport" data-wf-stage role="img" aria-label="Campo circular alrededor del hilo" viewBox="0 0 640 560" tabindex="0" data-orbit="true"></svg><div class="wfl-scene-note" data-wf-scene-note>El campo rodea al conductor en planos perpendiculares. Las flechas indican su sentido.</div></div>
<aside class="wfl-readout" aria-label="Medición y explicación del campo"><div class="wfl-metric"><span class="wfl-label">Campo del hilo en P</span><strong data-wf-b>20,0 μT</strong><small>Magnitud de B · fuera del conductor</small></div><div class="wfl-formula"><div class="wfl-equation">B = μ₀ |I| / (2πr)</div><p data-wf-substitution>r = 0,050 m</p></div><div class="wfl-teaching"><h4>Vector en el punto P</h4><p class="wfl-vector" data-wf-vector></p><h4>Regla de la mano derecha</h4><div class="wfl-sense" data-wf-sense></div><h4>La brújula</h4><p data-wf-compass></p><h4>Prueba una predicción</h4><p>Duplica I: ¿qué ocurre con B? Duplica r: ¿aumenta o disminuye? Invierte I: ¿cambia la magnitud o el sentido?</p></div></aside>
</div><div class="wfl-legend"><span><i class="wfl-swatch"></i>Campo del hilo B</span><span><i class="wfl-swatch current"></i>Corriente convencional I</span><span><i class="wfl-swatch probe"></i>Punto de observación P</span><span>⊙ sale de la pantalla · ⊗ entra</span></div>
<details class="wfl-details"><summary>Qué representa este modelo</summary><p>El hilo se aproxima como muy largo y delgado, en el vacío. Se estudia solo su exterior: r se mide desde su eje y nunca se toma igual a cero. El dibujo muestra un segmento de un hilo idealmente largo. Las curvas no son trayectorias de partículas: representan la dirección del campo en cada punto; sus flechas animadas son una guía visual, no una propagación ni una corriente de materia. La brújula es ideal y su extremo rojo indica el campo horizontal resultante. El campo terrestre de 25 μT es una componente horizontal de ejemplo, no una medición local.</p></details><p class="wfl-status" role="status" aria-live="polite" data-wf-status></p></section>`;}
function destroy(){if(!active)return;remembered={...active.s};active.dispose();active=null;}
function mount(host){
 destroy();if(!host)return;
 let section=host.matches?.('.wfl')?host:host.querySelector?.('.wfl');
 if(!section&&host.matches?.('[data-wire-field-lab]')){host.innerHTML=render();section=host.querySelector('.wfl');}
 if(!section)return;if(!E){section.innerHTML='<p>No se pudo cargar el modelo del campo. Recarga el capítulo.</p>';return;}
 const s={...(remembered||initial())},controller=new AbortController(),q=selector=>section.querySelector(selector),all=selector=>Array.from(section.querySelectorAll(selector));
 const svg=q('[data-wf-stage]');let frame=0,last=0,disposed=false,intersects=true,drag=null,expanded=false,bodyOverflow='',returnFocus=null;
 const listen=(el,type,fn,options={})=>el.addEventListener(type,fn,{...options,signal:controller.signal});
 const announce=message=>{q('[data-wf-status]').textContent=message;};
 function setExpanded(value,restoreFocus=true){
  if(expanded===value)return;expanded=value;section.classList.toggle('wfl-expanded',value);
  if(value){bodyOverflow=document.body.style.overflow;document.body.style.overflow='hidden';returnFocus=document.activeElement;section.setAttribute('role','dialog');section.setAttribute('aria-modal','true');q('[data-wf-action="fullscreen"]').focus({preventScroll:true});announce('Vista ampliada a toda la ventana. Pulsa Salir de pantalla completa o Esc para volver.');}
  else{document.body.style.overflow=bodyOverflow;section.removeAttribute('role');section.removeAttribute('aria-modal');if(restoreFocus&&returnFocus?.isConnected)returnFocus.focus({preventScroll:true});returnFocus=null;}
  const fs=q('[data-wf-action="fullscreen"]');fs.textContent=value?'⛶ Salir de pantalla completa':'⛶ Pantalla completa';fs.setAttribute('aria-expanded',String(value||document.fullscreenElement===section));
 }

 const project=p=>E.project(p,s.view,s.azimuth,s.elevation,s.zoom);
 const point=p=>{const v=project(p);return `${v.x.toFixed(2)},${v.y.toFixed(2)}`;};
 const line=(a,b,cls,extra='')=>`<line x1="${project(a).x.toFixed(2)}" y1="${project(a).y.toFixed(2)}" x2="${project(b).x.toFixed(2)}" y2="${project(b).y.toFixed(2)}" class="${cls}" ${extra}/>`;
 const path=points=>'M'+points.map(point).join(' L');
 const ring=(r,z)=>Array.from({length:97},(_,i)=>[r*Math.cos(i/96*Math.PI*2),r*Math.sin(i/96*Math.PI*2),z]);
 function arrow(a,b,color,width=2.5){const p=project(a),v=project(b),dx=v.x-p.x,dy=v.y-p.y,len=Math.hypot(dx,dy);if(len<.5)return '';const ux=dx/len,uy=dy/len,size=7;return `<path d="M${p.x.toFixed(2)},${p.y.toFixed(2)}L${v.x.toFixed(2)},${v.y.toFixed(2)}" stroke="${color}" stroke-width="${width}" fill="none"/><path d="M${v.x.toFixed(2)},${v.y.toFixed(2)}l${(-ux*size-uy*size*.5).toFixed(2)},${(-uy*size+ux*size*.5).toFixed(2)}l${(uy*size).toFixed(2)},${(-ux*size).toFixed(2)}Z" fill="${color}"/>`;}
 function circleArrow(r,z,t,color){const sign=Math.sign(s.current),a=[r*Math.cos(t),r*Math.sin(t),z],b=[r*Math.cos(t+sign*.16),r*Math.sin(t+sign*.16),z];return arrow(a,b,color,2);}
 function label(p,text,cls='wfl-axistext',dx=0,dy=0){const v=project(p);return `<text x="${(v.x+dx).toFixed(2)}" y="${(v.y+dy).toFixed(2)}" class="${cls}">${text}</text>`;}
 function draw(){
 if(disposed)return;const current=s.current,sign=Math.sign(current),r=s.radius/8,phi=s.angle*Math.PI/180,probe=[r*Math.cos(phi),r*Math.sin(phi),0];
 let out=`<defs><linearGradient id="wfl-copper" x1="0" x2="1"><stop stop-color="#a95223"/><stop offset=".35" stop-color="#ffd2a1"/><stop offset=".65" stop-color="#df8a45"/><stop offset="1" stop-color="#9d4d24"/></linearGradient></defs>`;
 if(s.view==='3d'||s.view==='xy'){
 const bound=1.75;out+=`<path class="wfl-gridedge" d="${path([[-bound,-bound,0],[bound,-bound,0],[bound,bound,0],[-bound,bound,0],[-bound,-bound,0]])}"/>`;
 for(let i=-1.5;i<=1.51;i+=.5)out+=line([-bound,i,0],[bound,i,0],'wfl-gridline')+line([i,-bound,0],[i,bound,0],'wfl-gridline');
 out+=line([-1.9,0,0],[1.95,0,0],'wfl-axis')+line([0,-1.9,0],[0,1.95,0],'wfl-axis')+label([1.94,0,0],'+x','wfl-axistext',5,3)+label([0,1.95,0],'+y','wfl-axistext',4,-5);
 }
 if(s.view==='3d'){
 out+=line([0,0,-1.9],[0,0,1.9],'wfl-axis')+label([0,0,1.99],'+z','wfl-axistext',11,3);
 if(current!==0)for(const z of [-1.1,1.1]){out+=`<path class="wfl-field" opacity=".26" d="${path(ring(.85,z))}"/>`;for(let j=0;j<3;j++)out+=circleArrow(.85,z,s.phase+sign*j*Math.PI*2/3,'#2d8d8c');}
 out+=line([0,0,-1.7],[0,0,1.7],'wfl-wire',`style="stroke:url(#wfl-copper)"`);
 }
 if(s.view==='3d'||s.view==='xy'){
 if(current!==0){for(const rr of [.4,.8,1.2,1.6]){out+=`<path class="wfl-field" opacity="${.35+Math.min(Math.abs(current)/10,.6)}" d="${path(ring(rr,0))}"/>`;for(let j=0;j<3;j++)out+=circleArrow(rr,0,s.phase+sign*j*2*Math.PI/3,'#50e8d2');}out+=`<path d="${path(ring(r,0))}" stroke="#ffe28d" stroke-opacity=".7" stroke-dasharray="5 5" fill="none" stroke-width="1.5"/>`;}
 if(s.view==='xy'){const c=project([0,0,0]);out+=`<circle cx="${c.x}" cy="${c.y}" r="15" fill="#d6894f" stroke="#ffc185" stroke-width="2"/>`;if(current!==0)out+=`<text x="${c.x}" y="${c.y+7}" text-anchor="middle" font-size="26" font-weight="750" fill="#fff3db">${current>0?'⊙':'⊗'}</text>`;else out+=`<circle cx="${c.x}" cy="${c.y}" r="4" fill="#63432d"/>`;out+=label([0,0,0],current===0?'I = 0':current>0?'I sale (+z)':'I entra (−z)','wfl-axistext',23,6);}
 if(s.view==='3d'&&current!==0){for(const z of [-.95,.4])out+=arrow([0,0,z],[0,0,z+sign*.45],'#fff0c9',4);}
 out+=line([0,0,0],probe,'wfl-axis','style="stroke:#ffe28d;stroke-opacity:.65;stroke-dasharray:5 5"');
 const c=project(probe);out+=`<circle class="wfl-probe" cx="${c.x.toFixed(2)}" cy="${c.y.toFixed(2)}" r="5.5"/>`;
 out+=label(probe,'P','wfl-probelabel',s.view==='xy'?32:9,s.view==='xy'?-20:-11);
 if(current!==0){const tangent=[-Math.sin(phi)*sign,Math.cos(phi)*sign,0];out+=arrow(probe,probe.map((x,i)=>x+tangent[i]*.48),'#ffdf7e',3);}
 // The compass lies in the xy plane. Its red half follows the horizontal resultant field.
 const m=E.field(current,s.radius,s.angle,s.earth),mag=m.total;
 if(s.view==='xy'){
 const compassCenter=[probe[0],probe[1],0],rad=.22;
 out+=`<path d="${path(ring(rad,0).map(p=>[p[0]+compassCenter[0],p[1]+compassCenter[1],0]))}" fill="#0a2639e6" stroke="#d6e8eb" stroke-width="1.2"/>`;
 if(mag>1e-14){const needle=[m.totalX/mag*rad*.86,m.totalY/mag*rad*.86,0];out+=arrow(compassCenter,compassCenter.map((x,i)=>x+needle[i]),'#ff7770',3);out+=line(compassCenter,compassCenter.map((x,i)=>x-needle[i]),'wfl-current','style="stroke:#d8e6f2;stroke-width:3"');}
 else out+=line([probe[0]-.12,probe[1],0],[probe[0]+.12,probe[1],0],'wfl-axis','style="stroke:#97afbd;stroke-dasharray:2 3"');
 if(s.earth)out+=`<text x="30" y="500" fill="#aabbe7" font-size="12">Campo terrestre: +y (N magnético)</text><path d="M42 474L42 432l-5 8m5-8l5 8" stroke="#aabbe7" fill="none" stroke-width="2"/>`;
 }
 }else{
 // Longitudinal cuts must not draw circular lines as if they lay in this plane.
 const view=s.view,axis=view==='xz'?'x':'y';
 out+=`<path class="wfl-gridedge" d="M80,70H560V515H80Z"/>`;
 for(let x=100;x<=540;x+=55)out+=`<line class="wfl-gridline" x1="${x}" x2="${x}" y1="70" y2="515"/>`;
 for(let y=90;y<=500;y+=55)out+=`<line class="wfl-gridline" x1="80" x2="560" y1="${y}" y2="${y}"/>`;
 const horizontal=a=>view==='xz'?[a,0,0]:[0,a,0];
 out+=line(horizontal(-1.9),horizontal(1.95),'wfl-axis')+label(horizontal(1.95),'+'+axis,'wfl-axistext',4,-8)+label([0,0,1.95],'+z','wfl-axistext',12,0)+line([0,0,-1.7],[0,0,1.7],'wfl-wire','style="stroke:url(#wfl-copper)"');
 if(current!==0){for(const z of [-.9,.4])out+=arrow([0,0,z],[0,0,z+sign*.45],'#fff0c9',4);
 for(const a of [-1.25,-.65,.65,1.25])for(const z of [-1.05,0,1.05]){const p=project(horizontal(a).map((v,i)=>i===2?z:v)),symbol=E.longitudinalSymbol(current,a)==='into'?'⊗':'⊙';out+=`<text x="${p.x.toFixed(2)}" y="${(p.y+10).toFixed(2)}" text-anchor="middle" fill="#4ee0cb" opacity="${.45+Math.min(Math.abs(current)/10,.5)}" font-size="30">${symbol}</text>`;}
 }
 // Show both intersections with the cylindrical observation surface at the selected distance.
 for(const a of [-r,r]){const p=project(horizontal(a));out+=`<circle cx="${p.x.toFixed(2)}" cy="${p.y.toFixed(2)}" r="21" stroke="#ffe28d" stroke-dasharray="4 4" fill="none"/>`;}
 out+=label(horizontal(r),'P+','wfl-probelabel',-10,40)+label(horizontal(-r),'P−','wfl-probelabel',-10,40);
 }
 if(current===0)out+=`<text x="320" y="525" text-anchor="middle" fill="#c5d7e5" font-size="14">I = 0 A → campo del hilo B = 0</text>`;
 svg.innerHTML=out;
 }
 function sync(){
 const isCut=s.view==='xz'||s.view==='yz',effectiveAngle=isCut?(s.view==='xz'?0:90):s.angle,m=E.field(s.current,s.radius,effectiveAngle,s.earth);
 all('[data-wf-field]').forEach(input=>{const k=input.dataset.wfField;if(input.type==='checkbox')input.checked=s[k];else input.value=s[k];});
 all('[data-wf-action="view"]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.value===s.view)));
 q('[data-wf-current]').textContent=(s.current>0?'+':'')+fmt(s.current)+' A';q('[data-wf-radius]').textContent=fmt(s.radius)+' cm';q('[data-wf-angle]').textContent=effectiveAngle+'°';q('#wfl-angle').disabled=isCut;q('#wfl-angle').title=isCut?'Este plano fija la posición angular. Cambia a 3D o xy para mover P.':'';q('[data-wf-b]').textContent=fmt(m.microtesla)+' μT';
 q('[data-wf-substitution]').textContent='r = '+fmt(m.radiusM,3)+' m · |I| = '+fmt(Math.abs(s.current))+' A';
 q('[data-wf-vector]').innerHTML=`Bₓ = ${fmt(m.bx*1e6)} μT<br>Bᵧ = ${fmt(m.by*1e6)} μT<br>B𝓏 = 0 μT${isCut?'<br><small>Componentes en P+, sobre el semieje positivo; P− tiene el campo opuesto.</small>':''}`;
 q('[data-wf-view-label]').textContent=VIEWS[s.view]+(s.view==='xy'?' · observas desde +z':s.view==='xz'?' · observas desde −y':s.view==='yz'?' · observas desde +x':' · hilo en el eje z');
 q('[data-wf-direction]').textContent=s.current===0?'Sin corriente':s.current>0?'I hacia +z':'I hacia −z';
 q('[data-wf-sense]').textContent=s.current===0?'Sin corriente, el campo producido por el hilo es nulo.':`Pulgar hacia ${s.current>0?'+z':'−z'}. Los dedos rodean el hilo: ${s.current>0?'antihorario':'horario'} al observar desde +z.`;
 q('[data-wf-compass]').textContent=s.earth?`El extremo rojo sigue B del hilo + B terrestre. Campo horizontal resultante: ${fmt(m.total*1e6)} μT. Con I = 0 vuelve hacia +y (norte magnético).`:s.current===0?'Sin campo del hilo ni campo terrestre añadido, la brújula ideal no tiene una orientación preferente.':'Sin campo terrestre, el extremo rojo es tangente a la circunferencia y sigue el campo del hilo. Abre la vista transversal para observarlo.';
 q('[data-wf-scene-note]').innerHTML=s.view==='3d'?'<b>Volumen y planos.</b> Cada circunferencia está en un plano perpendicular al hilo. Arrastra o usa los controles de giro.':s.view==='xy'?'<b>Plano perpendicular xy.</b> Ves circunferencias concéntricas. El extremo rojo de la brújula indica el campo horizontal resultante.':`<b>Plano ${s.view} que contiene al hilo.</b> El campo cruza este plano: ⊙ sale y ⊗ entra. P+ y P− están a la misma distancia r del eje; sus campos tienen igual magnitud y sentidos opuestos.`;
 q('[data-wf-orbit-controls]').hidden=s.view!=='3d';svg.dataset.orbit=String(s.view==='3d');
 svg.setAttribute('aria-label',`${VIEWS[s.view]}. Corriente ${fmt(s.current)} amperios. Campo del hilo ${fmt(m.microtesla)} microteslas a ${fmt(s.radius)} centímetros. ${s.current===0?'Campo del hilo nulo.':s.current>0?'Sentido antihorario desde más z.':'Sentido horario desde más z.'}`);
 q('[data-wf-zoom]').textContent=Math.round(s.zoom*100)+' %';q('[data-wf-action="zoom-out"]').disabled=s.zoom<=.75;q('[data-wf-action="zoom-in"]').disabled=s.zoom>=1.5;
 const play=q('[data-wf-action="play"]');play.textContent=s.playing?'Pausar flechas':'Animar flechas';play.setAttribute('aria-pressed',String(s.playing));
 const fs=q('[data-wf-action="fullscreen"]');fs.textContent=(document.fullscreenElement===section||expanded)?'⛶ Salir de pantalla completa':'⛶ Pantalla completa';fs.setAttribute('aria-expanded',String(document.fullscreenElement===section||expanded));draw();schedule();
 }
 function tick(t){frame=0;if(disposed||!s.playing||document.hidden||!intersects)return;if(last&&t-last<40){schedule();return;}const dt=last?Math.min((t-last)/1000,.1):0;last=t;s.phase+=Math.sign(s.current)*dt*.6;draw();schedule();}
 function schedule(){if(!disposed&&s.playing&&intersects&&!document.hidden&&!frame)frame=requestAnimationFrame(tick);}
 function stopFrame(){if(frame)cancelAnimationFrame(frame);frame=0;last=0;}
 listen(section,'click',async event=>{const b=event.target.closest('[data-wf-action]');if(!b||!section.contains(b)||b.disabled)return;const action=b.dataset.wfAction;
 if(action==='view'){s.view=b.dataset.value;announce(VIEWS[s.view]);}
 if(action==='reverse'){s.current=-s.current;announce(s.current===0?'La corriente es cero. Aumenta su intensidad para invertir el campo.':'Corriente invertida: se invierte el sentido del campo.');}
 if(action==='off'){s.current=0;announce('Corriente cero. El campo del hilo es nulo.');}
 if(action==='play'){s.playing=!s.playing;if(!s.playing)stopFrame();}
 if(action==='zoom-in')s.zoom=E.clamp(Number((s.zoom+.15).toFixed(2)),.75,1.5);
 if(action==='zoom-out')s.zoom=E.clamp(Number((s.zoom-.15).toFixed(2)),.75,1.5);
 if(action==='reset'){Object.assign(s,initial());stopFrame();announce('Valores iniciales restablecidos.');}
 if(action==='oersted'){Object.assign(s,{view:'xy',current:5,radius:5,angle:90,earth:true,zoom:1});announce('Brújula y campo terrestre preparados. Pulsa I = 0 y después aumenta o invierte la corriente para comparar la desviación.');}
 if(action==='fullscreen'){
  if(expanded){setExpanded(false);return;}
  if(document.fullscreenElement===section){await document.exitFullscreen();return;}
  try{if(section.requestFullscreen){await section.requestFullscreen();if(document.fullscreenElement!==section&&!disposed)setExpanded(true);}else setExpanded(true);}catch{if(!disposed)setExpanded(true);}return;
 }
 sync();
 });
 listen(section,'input',event=>{const k=event.target.dataset.wfField;if(!k)return;s[k]=event.target.type==='checkbox'?event.target.checked:Number(event.target.value);sync();});
 listen(svg,'pointerdown',event=>{if(s.view!=='3d'||event.button>0)return;drag={id:event.pointerId,x:event.clientX,y:event.clientY,az:s.azimuth,el:s.elevation,moved:false,type:event.pointerType};});
 listen(svg,'pointermove',event=>{if(!drag||event.pointerId!==drag.id)return;const dx=event.clientX-drag.x,dy=event.clientY-drag.y;if(drag.type==='touch'&&!drag.moved&&Math.abs(dy)>Math.abs(dx))return;if(!drag.moved&&Math.hypot(dx,dy)<7)return;drag.moved=true;svg.setPointerCapture?.(event.pointerId);event.preventDefault();s.azimuth=((drag.az-dx*.4+540)%360)-180;s.elevation=E.clamp(drag.el+dy*.3,-60,80);q('#wfl-azimuth').value=s.azimuth;q('#wfl-elevation').value=s.elevation;draw();},{passive:false});
 const endDrag=e=>{if(drag?.id!==e.pointerId)return;if(svg.hasPointerCapture?.(e.pointerId))svg.releasePointerCapture(e.pointerId);drag=null;};listen(svg,'pointerup',endDrag);listen(svg,'pointercancel',endDrag);
 listen(svg,'keydown',event=>{if(s.view!=='3d'||!['ArrowLeft','ArrowRight','ArrowUp','ArrowDown'].includes(event.key))return;event.preventDefault();if(event.key==='ArrowLeft')s.azimuth-=10;if(event.key==='ArrowRight')s.azimuth+=10;if(event.key==='ArrowUp')s.elevation=E.clamp(s.elevation+5,-60,80);if(event.key==='ArrowDown')s.elevation=E.clamp(s.elevation-5,-60,80);s.azimuth=((s.azimuth+540)%360)-180;sync();});
 listen(document,'fullscreenchange',()=>{const fs=q('[data-wf-action="fullscreen"]');fs.textContent=(document.fullscreenElement===section||expanded)?'⛶ Salir de pantalla completa':'⛶ Pantalla completa';fs.setAttribute('aria-expanded',String(document.fullscreenElement===section||expanded));});
 listen(document,'keydown',event=>{
  if(!expanded)return;
  if(event.key==='Escape'){event.preventDefault();setExpanded(false);return;}
  if(event.key==='Tab'){
   const focusable=all('button:not(:disabled), input:not(:disabled), select:not(:disabled), summary, [tabindex="0"]').filter(el=>el.getClientRects().length>0),first=focusable[0],last=focusable[focusable.length-1];
   if(event.shiftKey&&(document.activeElement===first||!section.contains(document.activeElement))){event.preventDefault();last?.focus();}
   else if(!event.shiftKey&&(document.activeElement===last||!section.contains(document.activeElement))){event.preventDefault();first?.focus();}
  }
 });
 listen(document,'visibilitychange',()=>{if(document.hidden)stopFrame();else schedule();});
 let observer;if(typeof IntersectionObserver==='function'){observer=new IntersectionObserver(entries=>{intersects=entries[0]?.isIntersecting!==false;if(intersects)schedule();else stopFrame();});observer.observe(section);}
 const media=global.matchMedia?.('(prefers-reduced-motion: reduce)');if(media?.addEventListener)listen(media,'change',event=>{if(event.matches){s.playing=false;stopFrame();sync();}});
 active={s,dispose(){if(expanded)setExpanded(false,false);disposed=true;stopFrame();controller.abort();observer?.disconnect();drag=null;}};sync();
}
global.WireFieldLab={render,mount,destroy,unmount:destroy,getState:()=>active?{...active.s}:null};
})(window);
