(function(global){
  'use strict';

  const PARTS=[
    {id:'right-atrium',name:'Aurícula derecha',short:'Aurícula derecha',group:'Cavidades',color:'#6fc7d2',text:'Recibe la sangre que regresa del cuerpo. Se comunica con el ventrículo derecho a través de la válvula tricúspide.',function:'Recibir el retorno venoso y conducirlo al ventrículo derecho.'},
    {id:'left-atrium',name:'Aurícula izquierda',short:'Aurícula izquierda',group:'Cavidades',color:'#ec8191',text:'Recibe por las venas pulmonares la sangre que se ha oxigenado en los pulmones. La envía al ventrículo izquierdo a través de la válvula mitral.',function:'Recibir sangre oxigenada procedente de los pulmones.'},
    {id:'right-ventricle',name:'Ventrículo derecho',short:'Ventrículo derecho',group:'Cavidades',color:'#62b8ca',internal:true,text:'Impulsa la sangre hacia los pulmones a través del tronco pulmonar. En la vista interna se muestra la superficie que delimita su cavidad.',function:'Iniciar la circulación pulmonar al contraerse.'},
    {id:'left-ventricle',name:'Ventrículo izquierdo',short:'Ventrículo izquierdo',group:'Cavidades',color:'#eb637b',internal:true,text:'Impulsa la sangre hacia la aorta y el resto del cuerpo. Su pared muscular es más gruesa que la del ventrículo derecho porque trabaja contra una mayor presión.',function:'Iniciar la circulación sistémica al contraerse.'},
    {id:'superior-vena-cava',name:'Vena cava superior',short:'Cava superior',group:'Grandes vasos',color:'#70b4db',text:'Transporta hacia la aurícula derecha la sangre que retorna de la cabeza, el cuello, los miembros superiores y parte del tórax.',function:'Llevar sangre desde la parte superior del cuerpo al corazón.'},
    {id:'pulmonary-trunk',name:'Tronco pulmonar',short:'Tronco pulmonar',group:'Grandes vasos',color:'#75a9df',text:'Sale del ventrículo derecho y se divide en las arterias pulmonares. Aunque es una arteria, lleva sangre con poco oxígeno hacia los pulmones.',function:'Conducir sangre del ventrículo derecho a la circulación pulmonar.'},
    {id:'ascending-aorta',name:'Aorta ascendente',short:'Aorta ascendente',group:'Grandes vasos',color:'#e97489',text:'Es el primer tramo de la aorta. Recibe la sangre expulsada por el ventrículo izquierdo a través de la válvula aórtica.',function:'Recibir la sangre impulsada por el ventrículo izquierdo.'},
    {id:'aortic-arch',name:'Arco aórtico',short:'Arco aórtico',group:'Grandes vasos',color:'#eea0a7',text:'Es la curva que continúa a la aorta ascendente. Sus grandes ramas distribuyen sangre hacia la cabeza, el cuello y los miembros superiores.',function:'Distribuir sangre hacia ramas sistémicas y continuar hacia la aorta descendente.'},
    {id:'ventricular-wall',name:'Pared ventricular',short:'Pared ventricular',group:'Pared y coronarias',color:'#dd6476',text:'Representa la pared muscular de ambos ventrículos. Al retirarla en la vista interna, se hacen visibles las superficies de las cavidades ventriculares.',function:'La contracción del miocardio genera la fuerza que impulsa la sangre.'},
    {id:'left-coronary',name:'Arteria coronaria izquierda',short:'Coronaria izquierda',group:'Pared y coronarias',color:'#f0b588',text:'Nace de la aorta y sus ramas irrigan gran parte del lado izquierdo del corazón. La sangre del interior de las cavidades no sustituye esta irrigación.',function:'Aportar oxígeno y nutrientes a buena parte del músculo cardíaco.'},
    {id:'right-coronary',name:'Arteria coronaria derecha',short:'Coronaria derecha',group:'Pared y coronarias',color:'#e9c390',text:'Nace de la aorta y aporta sangre al territorio cardíaco derecho y a otras regiones, según la distribución de sus ramas.',function:'Irrigar el músculo cardíaco a través de sus ramas.'}
  ];
  const ROUTE=[
    {title:'La sangre vuelve del cuerpo',text:'Después de entregar oxígeno a los tejidos, la sangre retorna por las venas cavas y entra en la aurícula derecha.',parts:['superior-vena-cava','right-atrium'],focus:'superior-vena-cava',label:'Venas cavas → aurícula derecha',oxygen:'poor',node:'body',line:'body-ra',view:'external'},
    {title:'Pasa al ventrículo derecho',text:'La sangre atraviesa la válvula tricúspide y pasa de la aurícula derecha al ventrículo derecho. La válvula ayuda a evitar el retroceso durante la contracción.',parts:['right-atrium','right-ventricle'],focus:'right-ventricle',label:'Aurícula derecha → tricúspide → ventrículo derecho',oxygen:'poor',node:'ra',line:'ra-rv',view:'internal'},
    {title:'El corazón la impulsa a los pulmones',text:'El ventrículo derecho se contrae. La sangre sale por la válvula pulmonar hacia el tronco pulmonar y las arterias pulmonares.',parts:['right-ventricle','pulmonary-trunk'],focus:'pulmonary-trunk',label:'Ventrículo derecho → tronco pulmonar → pulmones',oxygen:'poor',node:'rv',line:'rv-lungs',view:'internal'},
    {title:'En los pulmones se oxigena',text:'En los capilares que rodean los alvéolos, la sangre libera dióxido de carbono y recibe oxígeno. Este intercambio ocurre en los pulmones, fuera del corazón.',parts:[],focus:null,label:'Capilares pulmonares: intercambio de gases',oxygen:'rich',node:'lungs',line:'lungs-la',view:'external'},
    {title:'Regresa a la aurícula izquierda',text:'Las venas pulmonares devuelven al corazón la sangre oxigenada. Desembocan en la aurícula izquierda; son venas porque llevan la sangre hacia el corazón.',parts:['left-atrium'],focus:'left-atrium',label:'Venas pulmonares → aurícula izquierda',oxygen:'rich',node:'la',line:'lungs-la',view:'external'},
    {title:'Llena el ventrículo izquierdo',text:'La sangre pasa de la aurícula izquierda al ventrículo izquierdo a través de la válvula mitral. Ambos lados del corazón mantienen separados los dos circuitos.',parts:['left-atrium','left-ventricle'],focus:'left-ventricle',label:'Aurícula izquierda → mitral → ventrículo izquierdo',oxygen:'rich',node:'lv',line:'la-lv',view:'internal'},
    {title:'Sale por la aorta',text:'El ventrículo izquierdo se contrae y la sangre atraviesa la válvula aórtica. Recorre la aorta ascendente, el arco aórtico y las ramas que la distribuyen por el cuerpo.',parts:['left-ventricle','ascending-aorta','aortic-arch'],focus:'ascending-aorta',label:'Ventrículo izquierdo → válvula aórtica → aorta',oxygen:'rich',node:'lv',line:'lv-body',view:'internal'},
    {title:'El circuito vuelve a empezar',text:'En los tejidos, la sangre entrega oxígeno y recoge dióxido de carbono. Después retorna por las venas al lado derecho del corazón. La circulación pulmonar y la sistémica forman un recorrido continuo.',parts:['superior-vena-cava','right-atrium'],focus:'right-atrium',label:'Tejidos → venas → venas cavas → aurícula derecha',oxygen:'poor',node:'body',line:'body-ra',view:'external'}
  ];
  const INDEX=Object.fromEntries(PARTS.map(p=>[p.id,p]));
  const ICONS={cube:'<path d="m12 3 8 4.5v9L12 21l-8-4.5v-9L12 3Z"/><path d="m4 7.5 8 4.5 8-4.5M12 12v9"/>',route:'<circle cx="6" cy="5" r="2"/><circle cx="18" cy="19" r="2"/><path d="M6 7v5a4 4 0 0 0 4 4h4a4 4 0 0 0 0-8h-2"/>',reset:'<path d="M3 11a9 9 0 1 1 2.6 7M3 4v7h7"/>',rotate:'<path d="M20 7a9 9 0 0 0-15-2L2 8m0-6v6h6M4 17a9 9 0 0 0 15 2l3-3m0 6v-6h-6"/>',pause:'<path d="M8 5v14M16 5v14"/>',play:'<path d="m8 4 12 8-12 8V4Z"/>',eye:'<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/>'};
  const icon=name=>'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+(ICONS[name]||ICONS.cube)+'</svg>';
  let current=null,imports=null;

  function flowMap(){
    return `<svg class="bh-flow-map" viewBox="0 0 800 210" role="img" aria-label="Circuito esquemático: cuerpo, aurícula derecha, ventrículo derecho, pulmones, aurícula izquierda, ventrículo izquierdo y cuerpo."><defs><marker id="bh-arrow-poor" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="m1 1 8 4-8 4" fill="none" stroke="#6aa0b5" stroke-width="1.5"/></marker><marker id="bh-arrow-rich" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="m1 1 8 4-8 4" fill="none" stroke="#d68999" stroke-width="1.5"/></marker></defs>
      <path id="bh-flow-body-ra" data-bh-line="body-ra" class="bh-flow-line" d="M112 75H247" marker-end="url(#bh-arrow-poor)"/>
      <path id="bh-flow-ra-rv" data-bh-line="ra-rv" class="bh-flow-line" d="M315 75H465" marker-end="url(#bh-arrow-poor)"/>
      <path id="bh-flow-rv-lungs" data-bh-line="rv-lungs" class="bh-flow-line" d="M533 75H668" marker-end="url(#bh-arrow-poor)"/>
      <path id="bh-flow-lungs-la" data-bh-line="lungs-la" class="bh-flow-line bh-rich-line" d="M668 145H533" marker-end="url(#bh-arrow-rich)"/>
      <path id="bh-flow-la-lv" data-bh-line="la-lv" class="bh-flow-line bh-rich-line" d="M465 145H315" marker-end="url(#bh-arrow-rich)"/>
      <path id="bh-flow-lv-body" data-bh-line="lv-body" class="bh-flow-line bh-rich-line" d="M247 145H112" marker-end="url(#bh-arrow-rich)"/>
      <g class="bh-flow-node" data-bh-node="body"><rect x="16" y="62" width="96" height="96" rx="16"/><circle cx="64" cy="87" r="4"/><text x="64" y="111">CUERPO</text><text x="64" y="128" style="font-size:8px;font-weight:500">Tejidos</text></g>
      <g class="bh-flow-node" data-bh-node="ra"><rect x="247" y="49" width="68" height="52" rx="11"/><text x="281" y="71">Aurícula</text><text x="281" y="85">derecha</text></g>
      <g class="bh-flow-node" data-bh-node="rv"><rect x="465" y="49" width="68" height="52" rx="11"/><text x="499" y="71">Ventrículo</text><text x="499" y="85">derecho</text></g>
      <g class="bh-flow-node" data-bh-node="lungs"><rect x="668" y="62" width="96" height="96" rx="16"/><circle cx="716" cy="87" r="4"/><text x="716" y="111">PULMONES</text><text x="716" y="128" style="font-size:8px;font-weight:500">Intercambio gaseoso</text></g>
      <g class="bh-flow-node" data-bh-node="la"><rect x="465" y="119" width="68" height="52" rx="11"/><text x="499" y="141">Aurícula</text><text x="499" y="155">izquierda</text></g>
      <g class="bh-flow-node" data-bh-node="lv"><rect x="247" y="119" width="68" height="52" rx="11"/><text x="281" y="141">Ventrículo</text><text x="281" y="155">izquierdo</text></g>
      <text x="172" y="61" fill="#7294a7" text-anchor="middle" font-size="8">venas cavas</text><text x="390" y="61" fill="#7294a7" text-anchor="middle" font-size="8">válvula tricúspide</text><text x="601" y="61" fill="#7294a7" text-anchor="middle" font-size="8">arterias pulmonares</text>
      <text x="601" y="165" fill="#b47484" text-anchor="middle" font-size="8">venas pulmonares</text><text x="390" y="165" fill="#b47484" text-anchor="middle" font-size="8">válvula mitral</text><text x="172" y="165" fill="#b47484" text-anchor="middle" font-size="8">aorta</text>
      <text x="603" y="91" fill="#7294a7" text-anchor="middle" font-size="7">a través de la válvula pulmonar</text><text x="172" y="180" fill="#b47484" text-anchor="middle" font-size="7">a través de la válvula aórtica</text>
      ${['body-ra','ra-rv','rv-lungs','lungs-la','la-lv','lv-body'].map((id,i)=>`<circle class="bh-flow-bead ${i>=3?'bh-rich-bead':''}" data-bh-bead="${id}" r="4.2"/>`).join('')}
    </svg>`;
  }

  function fallbackSVG(){return `<svg viewBox="0 0 340 300" role="img" aria-label="Esquema de las cuatro cavidades del corazón: aurícula y ventrículo derechos a la izquierda del dibujo; aurícula y ventrículo izquierdos a la derecha."><defs><marker id="bh-fallback-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="m1 1 8 4-8 4" fill="none" stroke="#d2e7ee" stroke-width="1.6"/></marker></defs><path d="M80 39c-45 17-51 82-20 143 17 34 50 72 110 105 55-44 87-87 99-128 18-61 2-106-35-123-23-12-46-2-64 12-26-20-62-26-90-9Z" fill="#162f4b" stroke="#6e92ad" stroke-width="1.5"/><path d="M169 54v201" fill="none" stroke="#b1c5d4" stroke-width="4"/><rect data-bh-fallback="right-atrium" x="57" y="62" width="98" height="70" rx="24" fill="#21536c" stroke="#69b7c9"/><rect data-bh-fallback="left-atrium" x="184" y="62" width="98" height="70" rx="24" fill="#693d58" stroke="#df9aab"/><path data-bh-fallback="right-ventricle" d="M65 152h85v93c-44-22-78-55-85-93Z" fill="#21536c" stroke="#69b7c9"/><path data-bh-fallback="left-ventricle" d="M188 152h85c-5 34-35 70-85 101Z" fill="#693d58" stroke="#df9aab"/><g fill="#e2edf6" font-family="Inter,system-ui,sans-serif" font-size="10" text-anchor="middle"><text x="106" y="89">Aurícula</text><text x="106" y="104">derecha</text><text x="233" y="89">Aurícula</text><text x="233" y="104">izquierda</text><text x="114" y="181">Ventrículo</text><text x="114" y="196">derecho</text><text x="225" y="181">Ventrículo</text><text x="225" y="196">izquierdo</text></g><g fill="none" stroke="#d2e7ee" stroke-width="2" marker-end="url(#bh-fallback-arrow)"><path d="M107 112v41"/><path d="M233 112v41"/><path d="M107 61V22"/><path d="M231 61V22"/></g><text x="169" y="18" fill="#abc5d9" font-size="9" text-anchor="middle">Esquema orientativo · sin escala anatómica</text><text x="170" y="296" fill="#87abc5" font-size="8" text-anchor="middle">Derecha e izquierda corresponden a la persona</text></svg>`;}

  function render(id){
    if((typeof id==='object'?id.id:id)!=='biology-heart')return '';
    const groups=['Cavidades','Grandes vasos','Pared y coronarias'];
    return `<section class="bh-heart" id="heart-lab" data-biology-heart aria-labelledby="bh-title"><header class="bh-header"><div><p class="bh-eyebrow">Laboratorio de anatomía · Biología</p><h3 id="bh-title">Explora el corazón humano</h3><p class="bh-subtitle">Gíralo, entra en sus cavidades y sigue el viaje de la sangre. Selecciona una estructura en el modelo o en la lista para descubrir su función.</p></div><div class="bh-spec"><strong>3D</strong>11 estructuras<br>2 circuitos conectados</div></header>
      <div class="bh-tabs" role="tablist" aria-label="Actividad del corazón"><button type="button" role="tab" class="bh-tab" id="bh-tab-explore" aria-controls="bh-explore" aria-selected="true" data-bh-action="tab" data-value="explore">${icon('cube')}Explorar anatomía</button><button type="button" role="tab" class="bh-tab" id="bh-tab-route" aria-controls="bh-route" aria-selected="false" tabindex="-1" data-bh-action="tab" data-value="route">${icon('route')}Recorrido de la sangre</button></div>
      <div class="bh-layout"><div class="bh-viewer"><div class="bh-stage"><div class="bh-canvas" data-bh-canvas></div><div class="bh-topline"><span class="bh-status" data-bh-status>Preparando modelo 3D</span><span class="bh-orientation">DERECHA E IZQUIERDA<br>de la persona representada</span></div><div class="bh-view-switch" aria-label="Vista del corazón"><button type="button" data-bh-action="view" data-value="external" aria-pressed="true">Vista externa</button><button type="button" data-bh-action="view" data-value="internal" aria-pressed="false">Vista interna</button></div><div class="bh-tools" role="group" aria-label="Controles del modelo"><button type="button" class="bh-icon-btn" data-bh-action="zoom-in" title="Acercar" aria-label="Acercar"><span aria-hidden="true">+</span></button><button type="button" class="bh-icon-btn" data-bh-action="zoom-out" title="Alejar" aria-label="Alejar"><span aria-hidden="true">−</span></button><button type="button" class="bh-icon-btn" data-bh-action="rotate" aria-pressed="false" title="Activar giro automático" aria-label="Activar giro automático">${icon('rotate')}</button><button type="button" class="bh-icon-btn" data-bh-action="reset-camera" title="Restablecer cámara" aria-label="Restablecer cámara">${icon('reset')}</button></div><span class="bh-label-marker" data-bh-marker aria-hidden="true"></span><div class="bh-selected-label"><small data-bh-label-kicker>Modelo anatómico</small><strong data-bh-label>Corazón humano</strong></div><p class="bh-view-note" data-bh-view-note><b>Arrastra para girar.</b> Acerca con dos dedos o la rueda. También puedes usar las flechas del teclado.</p><div class="bh-loading" data-bh-loading><div class="bh-spinner" aria-hidden="true"></div><span>Cargando anatomía real…</span><small>Preparando las 11 estructuras del modelo</small></div></div><div class="bh-viewer-bottom"><span data-bh-view-caption>Geometría anatómica · no es una imagen plana</span><button type="button" class="bh-quality" data-bh-action="quality" aria-pressed="false" title="Reduce el consumo de recursos del modelo">Modo ligero</button><div class="bh-pose" role="group" aria-label="Orientación de la cámara"><button type="button" data-bh-action="pose" data-value="anterior">Anterior</button><button type="button" data-bh-action="pose" data-value="posterior">Posterior</button><button type="button" data-bh-action="pose" data-value="lateral">Lateral</button></div></div><div class="bh-render-error" data-bh-error hidden><p data-bh-error-message></p><button type="button" data-bh-action="retry">Reintentar 3D en modo ligero</button></div></div>
      <div class="bh-side"><div class="bh-side-content" id="bh-explore" role="tabpanel" aria-labelledby="bh-tab-explore"><div class="bh-panel-heading"><h4>Conoce sus partes</h4><span class="bh-explored" data-bh-explored>0 de 11 exploradas</span></div><div class="bh-parts">${groups.map(group=>`<div><p class="bh-group-title">${group}</p><div class="bh-part-grid">${PARTS.filter(p=>p.group===group).map(p=>`<button type="button" class="bh-part" data-bh-action="part" data-value="${p.id}" aria-pressed="false" style="--part-color:${p.color}"><i class="bh-part-dot" aria-hidden="true"></i><span>${p.short}</span><span class="bh-part-check" data-bh-visited="${p.id}" aria-hidden="true"></span></button>`).join('')}</div></div>`).join('')}</div><div class="bh-description" aria-live="polite" aria-atomic="true"><h4 class="bh-description-title" data-bh-part-title>Un órgano, dos bombas</h4><p data-bh-part-text>El lado derecho envía sangre a los pulmones y el izquierdo la impulsa hacia el cuerpo. La orientación de sus partes siempre corresponde a la persona, no a quien observa.</p><div class="bh-function"><small data-bh-function-label>Empieza por aquí</small><span data-bh-part-function>Selecciona una cavidad, un vaso o una arteria coronaria.</span></div></div><div class="bh-side-actions"><button type="button" class="bh-mini-button" data-bh-action="isolate" aria-pressed="false" disabled>Aislar estructura</button><button type="button" class="bh-mini-button" data-bh-action="clear">Ver todo el corazón</button></div><p class="bh-isolated-note" data-bh-isolated hidden>Solo se muestra la estructura seleccionada.</p></div>
      <div class="bh-route-panel" id="bh-route" role="tabpanel" aria-labelledby="bh-tab-route" hidden><div class="bh-step-kicker"><span>Un recorrido completo</span><b data-bh-step-count>Paso 1 de 8</b></div><div class="bh-step-dots" role="group" aria-label="Pasos del recorrido">${ROUTE.map((s,i)=>`<button type="button" data-bh-action="step" data-value="${i}" aria-label="Paso ${i+1}: ${s.title}" ${i===0?'aria-current="step"':''}></button>`).join('')}</div><div aria-live="polite" aria-atomic="true"><h4 class="bh-route-title" data-bh-route-title>${ROUTE[0].title}</h4><p class="bh-route-text" data-bh-route-text>${ROUTE[0].text}</p></div><span class="bh-blood-tag" data-bh-oxygen>Sangre con poco oxígeno</span><div class="bh-route-structure" data-bh-route-label>${ROUTE[0].label}</div><div class="bh-route-actions"><button type="button" data-bh-action="previous" disabled>← Anterior</button><button type="button" class="bh-restart" data-bh-action="restart" aria-label="Reiniciar recorrido" title="Reiniciar recorrido">${icon('reset')}</button><button type="button" class="bh-next" data-bh-action="next">Siguiente →</button></div><div class="bh-route-finish" data-bh-finish hidden><span aria-hidden="true">✓</span><span>Recorrido explorado. La circulación es <strong>doble, cerrada y completa</strong> en el ser humano.</span></div><p class="bh-route-footnote">El modelo incluye cavidades ventriculares, pero no las válvulas, las venas pulmonares ni la vena cava inferior. Estas estructuras sí aparecen explicadas en el recorrido. La vista interna retira la pared ventricular.</p></div></div></div>
      <section class="bh-flow-section" aria-labelledby="bh-flow-title"><div class="bh-flow-head"><div><h4 id="bh-flow-title">Dos circuitos, un solo recorrido</h4><p>La animación señala la dirección. No representa velocidad, escala ni latido.</p></div><button type="button" class="bh-flow-toggle" data-bh-action="flow" aria-pressed="true">${icon('pause')}<span data-bh-flow-label>Pausar flujo</span></button></div><div class="bh-flow-scroll" tabindex="0" role="region" aria-label="Esquema de circulación. Desliza horizontalmente para ver todo el recorrido.">${flowMap()}</div><div class="bh-legend"><span><i style="background:#6aa0b5"></i>Sangre con poco oxígeno</span><span><i style="background:#df98a5"></i>Sangre oxigenada</span><small>Colores convencionales; toda la sangre es roja.</small></div><p class="bh-motion-note" data-bh-motion-note hidden>La animación está pausada para respetar tu preferencia de movimiento reducido.</p></section>
      <footer class="bh-footer"><span><strong>Modelo anatómico real</strong> · BodyParts3D / organui · <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noopener noreferrer">CC BY 4.0</a></span></footer><span class="bh-sr-only" aria-live="polite" data-bh-live></span></section>`;
  }

  async function modules(){
    // Same-origin, pinned bundle: no import map or third-party CDN at runtime.
    if(!imports)imports=import('./vendor/heart-three-160.mjs?v=20261021-mobile1').catch(error=>{imports=null;throw error;});
    return imports;
  }

  function prefersLightMode(){
    return Boolean(global.matchMedia?.('(pointer: coarse)').matches||
      (global.navigator?.deviceMemory&&global.navigator.deviceMemory<=4)||
      (global.navigator?.maxTouchPoints>0&&global.innerWidth<=1100));
  }

  function mount(root,options={}){
    unmount();
    const host=root?.matches?.('[data-biology-heart]')?root:root?.querySelector?.('[data-biology-heart]');
    if(!host)return;
    const saved=options.saved||{},reduce=global.matchMedia?.('(prefers-reduced-motion: reduce)').matches||false,light=prefersLightMode();
    const active={host,root,saved,disposed:false,controller:new AbortController(),selected:INDEX[saved.selectedPart]?saved.selectedPart:null,visited:new Set((Array.isArray(saved.visitedParts)?saved.visitedParts:[]).filter(id=>INDEX[id])),routeVisited:new Set((Array.isArray(saved.visitedSteps)?saved.visitedSteps:[]).filter(n=>Number.isInteger(n)&&n>=0&&n<ROUTE.length)),step:Math.min(7,Math.max(0,Number(saved.routeStep)||0)),routeComplete:saved.routeComplete===true,view:saved.view==='internal'?'internal':'external',tab:saved.tab==='route'?'route':'explore',flow:!reduce&&!light,rotate:false,isolate:false,reduce,light,attempt:0,scene:null,renderer:null,controls:null,frame:0,dirty:0,flowDirty:true,lastFrame:-Infinity,visible:true,interacting:false,meshes:[],meshByPart:new Map(),materials:[],marker:null,focus:null,transition:null,flowStart:performance.now(),beads:[],partCenters:new Map()};
    current=active;
    const q=selector=>host.querySelector(selector),all=selector=>Array.from(host.querySelectorAll(selector));
    active.q=q;active.all=all;
    const notify=()=>{
      if(active.disposed)return;
      const detail={visitedParts:[...active.visited],visitedSteps:[...active.routeVisited].sort((a,b)=>a-b),selectedPart:active.selected,routeStep:active.step,routeComplete:active.routeComplete,view:active.view,tab:active.tab};
      host.dispatchEvent(new CustomEvent('biology-heart-progress',{detail,bubbles:true}));
    };
    active.notify=notify;
    const listen=(target,event,fn,extra={})=>target.addEventListener(event,fn,{...extra,signal:active.controller.signal});
    active.listen=listen;
    all('[data-bh-bead]').forEach(bead=>{const path=q('[data-bh-line="'+bead.dataset.bhBead+'"]');if(path)active.beads.push({bead,path,length:path.getTotalLength()});});
    function announce(text){q('[data-bh-live]').textContent=text;}
    function setView(view,emit=true){
      active.view=view==='internal'?'internal':'external';
      all('[data-bh-action="view"]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.value===active.view)));
      q('[data-bh-view-note]').innerHTML=active.view==='internal'?'<b>Pared ventricular retirada.</b> Se muestran las cavidades de los ventrículos. Las válvulas no forman parte de este modelo.':'<b>Arrastra para girar.</b> Acerca con dos dedos o la rueda. También puedes usar las flechas del teclado.';
      updateMaterials(active);invalidate(active);if(emit)notify();
    }
    function selectPart(id,emit=true){
      const p=INDEX[id];if(!p)return;
      active.selected=id;active.visited.add(id);
      if(p.internal)setView('internal',false);else if(id==='ventricular-wall')setView('external',false);
      all('[data-bh-action="part"]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.value===id)));
      q('[data-bh-part-title]').textContent=p.name;q('[data-bh-part-text]').textContent=p.text;q('[data-bh-part-function]').textContent=p.function;q('[data-bh-function-label]').textContent='Su función';
      q('[data-bh-label-kicker]').textContent='Estructura seleccionada';q('[data-bh-label]').textContent=p.name;
      q('[data-bh-action="isolate"]').disabled=Boolean(active.fallback);
      active.visited.forEach(key=>{const e=q('[data-bh-visited="'+key+'"]');if(e)e.textContent='✓';});
      q('[data-bh-explored]').textContent=active.visited.size+' de 11 exploradas';
      all('[data-bh-fallback]').forEach(n=>n.setAttribute('stroke-width',n.dataset.bhFallback===id?'3':'1'));
      updateMaterials(active);focusPart(active,id);if(emit)notify();
    }
    function clearSelection(){
      active.selected=null;active.isolate=false;
      all('[data-bh-action="part"]').forEach(b=>b.setAttribute('aria-pressed','false'));
      q('[data-bh-part-title]').textContent='Un órgano, dos bombas';q('[data-bh-part-text]').textContent='El lado derecho envía sangre a los pulmones y el izquierdo la impulsa hacia el cuerpo. La orientación de sus partes siempre corresponde a la persona, no a quien observa.';
      q('[data-bh-part-function]').textContent='Selecciona una cavidad, un vaso o una arteria coronaria.';q('[data-bh-function-label]').textContent='Empieza por aquí';
      q('[data-bh-label-kicker]').textContent='Modelo anatómico';q('[data-bh-label]').textContent='Corazón humano';q('[data-bh-action="isolate"]').disabled=true;q('[data-bh-action="isolate"]').setAttribute('aria-pressed','false');q('[data-bh-isolated]').hidden=true;
      updateMaterials(active);pose(active,'anterior');notify();
    }
    function setStep(n,emit=true,mark=true){
      active.step=Math.min(ROUTE.length-1,Math.max(0,n));const step=ROUTE[active.step];
      if(mark)active.routeVisited.add(active.step);
      active.routeComplete=active.routeComplete||active.routeVisited.size===ROUTE.length;
      q('[data-bh-step-count]').textContent='Paso '+(active.step+1)+' de '+ROUTE.length;
      q('[data-bh-route-title]').textContent=step.title;q('[data-bh-route-text]').textContent=step.text;q('[data-bh-route-label]').textContent=step.label;
      const tag=q('[data-bh-oxygen]');tag.textContent=step.oxygen==='rich'?'Sangre oxigenada':'Sangre con poco oxígeno';tag.classList.toggle('oxygen-rich',step.oxygen==='rich');
      all('[data-bh-action="step"]').forEach((b,i)=>{b.classList.toggle('is-past',active.routeVisited.has(i));if(i===active.step)b.setAttribute('aria-current','step');else b.removeAttribute('aria-current');});
      q('[data-bh-action="previous"]').disabled=active.step===0;
      const next=q('[data-bh-action="next"]');next.disabled=active.step===ROUTE.length-1;next.textContent=active.step===ROUTE.length-1?'Recorrido finalizado':'Siguiente →';
      q('[data-bh-finish]').hidden=!active.routeComplete;
      all('[data-bh-node]').forEach(n=>n.classList.toggle('is-active',n.dataset.bhNode===step.node));
      all('[data-bh-line]').forEach(n=>n.classList.toggle('bh-path-active',n.dataset.bhLine===step.line));
      if(active.tab==='route'){
        active.isolate=false;q('[data-bh-action="isolate"]').setAttribute('aria-pressed','false');q('[data-bh-isolated]').hidden=true;
        setView(step.view,false);active.selected=step.focus;
        q('[data-bh-label-kicker]').textContent=step.focus?'Sigue el recorrido':'Fuera del corazón';q('[data-bh-label]').textContent=step.focus?INDEX[step.focus].name:'Intercambio gaseoso en los pulmones';
        updateMaterials(active);if(step.focus)focusPart(active,step.focus);else pose(active,'anterior');
      }
      invalidate(active);if(emit)notify();
    }
    function setTab(tab,emit=true){
      active.tab=tab==='route'?'route':'explore';
      all('[role="tab"]').forEach(b=>{const selected=b.dataset.value===active.tab;b.setAttribute('aria-selected',String(selected));b.tabIndex=selected?0:-1;});
      q('#bh-explore').hidden=active.tab!=='explore';q('#bh-route').hidden=active.tab!=='route';
      if(active.tab==='route')setStep(active.step,false,true);else if(active.selected)selectPart(active.selected,false);else updateMaterials(active);
      if(emit)notify();
    }
    listen(host,'click',event=>{
      const button=event.target.closest('[data-bh-action]');if(!button||button.disabled)return;const action=button.dataset.bhAction,value=button.dataset.value;
      if(action==='tab')setTab(value);
      else if(action==='view'){setView(value);announce(value==='internal'?'Vista interna: pared ventricular retirada.':'Vista externa del corazón.');}
      else if(action==='part')selectPart(value);
      else if(action==='clear')clearSelection();
      else if(action==='isolate'){active.isolate=!active.isolate;button.setAttribute('aria-pressed',String(active.isolate));q('[data-bh-isolated]').hidden=!active.isolate;updateMaterials(active);invalidate(active);}
      else if(action==='previous')setStep(active.step-1);
      else if(action==='next')setStep(active.step+1);
      else if(action==='step')setStep(Number(value));
      else if(action==='restart'){active.routeVisited.clear();active.routeComplete=false;setStep(0);announce('Recorrido reiniciado. Paso 1 de 8.');}
      else if(action==='zoom-in')zoom(active,.8);
      else if(action==='zoom-out')zoom(active,1.25);
      else if(action==='reset-camera')pose(active,'anterior');
      else if(action==='pose')pose(active,value);
      else if(action==='rotate'){active.rotate=!active.rotate;button.setAttribute('aria-pressed',String(active.rotate));button.setAttribute('aria-label',active.rotate?'Pausar giro automático':'Activar giro automático');button.title=button.getAttribute('aria-label');invalidate(active);}
      else if(action==='flow'){active.flow=!active.flow;active.flowDirty=true;syncMotion();schedule(active);}
      else if(action==='quality'){active.light=!active.light;start3D(active);}
      else if(action==='retry'){active.light=true;start3D(active);}
    });
    listen(host,'keydown',event=>{
      const tab=event.target.closest('[role="tab"]');if(!tab||!['ArrowLeft','ArrowRight','Home','End'].includes(event.key))return;
      event.preventDefault();const value=event.key==='Home'?'explore':event.key==='End'?'route':active.tab==='explore'?'route':'explore';setTab(value);q('[role="tab"][data-value="'+value+'"]').focus();
    });
    function syncMotion(){const b=q('[data-bh-action="flow"]');b.setAttribute('aria-pressed',String(active.flow));b.innerHTML=icon(active.flow?'pause':'play')+'<span data-bh-flow-label>'+(active.flow?'Pausar flujo':'Animar flujo')+'</span>';q('[data-bh-motion-note]').hidden=!reduce||active.flow;}
    const vis=()=>{active.visible=!document.hidden&&host.isConnected;invalidate(active);};listen(document,'visibilitychange',vis);
    if(typeof IntersectionObserver==='function'){active.observer=new IntersectionObserver(es=>{active.visible=es[0].isIntersecting&&!document.hidden;if(active.visible)invalidate(active);},{rootMargin:'180px'});active.observer.observe(host);}
    active.setView=setView;active.selectPart=selectPart;active.setStep=setStep;
    setView(active.view,false);if(active.selected)selectPart(active.selected,false);setTab(active.tab,false);syncMotion();
    q('[data-bh-explored]').textContent=active.visited.size+' de 11 exploradas';active.visited.forEach(id=>{const e=q('[data-bh-visited="'+id+'"]');if(e)e.textContent='✓';});
    setStep(active.step,false,false);
    start3D(active);
    invalidate(active);
  }

  function updateMaterials(a){
    if(a.disposed)return;
    const highlighted=a.tab==='route'?ROUTE[a.step].parts:a.selected?[a.selected]:[];
    for(const mesh of a.meshes){
      const id=mesh.userData.bhPart,isCavity=id==='right-ventricle'||id==='left-ventricle',isWall=id==='ventricular-wall';
      mesh.visible=(!isCavity||a.view==='internal')&&(!isWall||a.view==='external')&&(!a.isolate||id===a.selected);
      for(const m of Array.isArray(mesh.material)?mesh.material:[mesh.material]){
        const selected=highlighted.includes(id),dim=highlighted.length>0&&!selected;
        m.color.copy(m.userData.bhColor);
        if(m.emissive)m.emissive.set(selected?'#9f443d':'#000000');
        if(m.emissiveIntensity!==undefined)m.emissiveIntensity=selected ? .20 : 0;
        // On mobile, opaque dimming avoids drawing overlapping surfaces twice.
        const transparent=dim&&!a.light;
        if(dim&&a.light)m.color.multiplyScalar(.42);
        if(m.transparent!==transparent){m.transparent=transparent;m.needsUpdate=true;}
        m.opacity=transparent ? .24 : 1;m.depthWrite=!transparent;
      }
    }
    invalidate(a);
  }

  function disposeObject(object){
    const geometries=new Set(),materials=new Set(),textures=new Set();
    object?.traverse(o=>{if(o.geometry)geometries.add(o.geometry);for(const m of o.material?(Array.isArray(o.material)?o.material:[o.material]):[]){materials.add(m);for(const val of Object.values(m))if(val?.isTexture)textures.add(val);}});
    textures.forEach(t=>t.dispose());materials.forEach(m=>m.dispose());geometries.forEach(g=>g.dispose());
  }

  function release3D(a){
    a.attempt++;a.loadController?.abort();a.renderController?.abort();
    a.renderCleanups?.forEach(fn=>fn());a.renderCleanups=[];
    a.resizeObserver?.disconnect();a.resizeObserver=null;
    a.transition=null;a.interacting=false;
    a.controls?.dispose();a.controls=null;
    if(a.scene)disposeObject(a.scene);if(a.model&&!a.wrapper)disposeObject(a.model);a.scene=null;a.model=null;a.wrapper=null;
    a.materials.forEach(m=>m.dispose());a.materials.length=0;
    a.meshes.length=0;a.meshByPart.clear();a.partCenters.clear();
    if(a.renderer){a.renderer.dispose();a.renderer.forceContextLoss();a.renderer.domElement.remove();}a.renderer=null;a.camera=null;
  }

  function start3D(a){
    if(a.disposed)return;
    release3D(a);a.fallback=false;const attempt=a.attempt;
    a.q('[data-bh-canvas]').replaceChildren();
    a.q('[data-bh-error]').hidden=true;a.q('[data-bh-loading]').hidden=false;
    a.q('[data-bh-loading] span').textContent='Cargando anatomía real…';
    a.q('[data-bh-status]').textContent=a.light?'Preparando 3D ligero':'Preparando modelo 3D';
    a.q('[data-bh-action="quality"]').setAttribute('aria-pressed',String(a.light));
    a.q('[data-bh-marker]').style.display='none';
    a.all('[data-bh-action="zoom-in"],[data-bh-action="zoom-out"],[data-bh-action="rotate"],[data-bh-action="reset-camera"],[data-bh-action="pose"],[data-bh-action="isolate"]').forEach(b=>b.disabled=true);
    a.loadController=new AbortController();a.renderController=new AbortController();
    a.renderListen=(target,event,fn)=>{target.addEventListener(event,fn,{signal:a.renderController.signal});a.renderCleanups.push(()=>target.removeEventListener(event,fn));};
    initialize3D(a,attempt).catch(error=>{if(!a.disposed&&a.attempt===attempt)showFallback(a,error);});
  }

  async function initialize3D(a,attempt){
    const live=()=>!a.disposed&&!a.fallback&&a.attempt===attempt;
    let bundle;
    try{bundle=await modules();}catch(error){error.bhReason='network';throw error;}
    if(!live())return;
    const {THREE,OrbitControls,GLTFLoader}=bundle;
    const asset=global.BIOLOGY_HEART_ASSET||{};
    // Fetch is abortable; a failed or superseded attempt cannot attach a late model.
    let bytes;const loadController=a.loadController;
    const timer=setTimeout(()=>loadController.abort(),45000);
    try{
      const response=await fetch(asset.url||'assets/biologia-corazon.glb',{signal:loadController.signal});
      if(!response.ok)throw new Error('HTTP '+response.status);
      bytes=await response.arrayBuffer();
    }catch(error){error.bhReason='network';throw error;}finally{clearTimeout(timer);}
    if(!live())return;
    a.q('[data-bh-loading] span').textContent='Preparando gráficos del corazón…';
    const gltf=await new GLTFLoader().parseAsync(bytes,'');
    if(!live()){disposeObject(gltf.scene);return;}
    a.model=gltf.scene;
    a.THREE=THREE;
    const canvasHost=a.q('[data-bh-canvas]');
    let renderer;
    try{renderer=new THREE.WebGLRenderer({antialias:!a.light,alpha:true,powerPreference:'default',stencil:false});}
    catch(error){disposeObject(gltf.scene);a.model=null;error.bhReason='compatibility';throw error;}
    a.renderer=renderer;
    // r160 supports WebGL 1 as well as WebGL 2. Never force high-DPI on phones.
    renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=a.light?THREE.NoToneMapping:THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.16;
    canvasHost.appendChild(renderer.domElement);renderer.domElement.tabIndex=0;renderer.domElement.setAttribute('role','img');renderer.domElement.setAttribute('aria-label','Corazón anatómico tridimensional. Flechas para girar; más y menos para acercar o alejar; cero para restablecer. Selecciona las partes también mediante la lista.');
    const scene=new THREE.Scene();a.scene=scene;
    scene.add(new THREE.HemisphereLight(0xe2f5ff,0x223a52,a.light?1.8:2.4));
    const lights=a.light?[[0xffefe8,2,[4,5,6]]]:[[0xffefe8,3.2,[4,5,6]],[0x79c9e1,1.9,[-4,1,3]],[0xffa19c,2.6,[1,3,-5]]];
    for(const [color,intensity,position] of lights){const l=new THREE.DirectionalLight(color,intensity);l.position.set(...position);scene.add(l);}
    const camera=new THREE.PerspectiveCamera(36,1,.01,100);camera.position.set(0,.25,8.3);a.camera=camera;
    const controls=new OrbitControls(camera,renderer.domElement);a.controls=controls;controls.enablePan=false;controls.enableDamping=true;controls.dampingFactor=.10;controls.minDistance=3.5;controls.maxDistance=13;controls.rotateSpeed=.65;controls.zoomSpeed=.8;controls.target.set(0,0,0);controls.update();
    a.renderListen(controls,'change',()=>invalidate(a));a.renderListen(controls,'start',()=>{a.interacting=true;a.transition=null;invalidate(a);});a.renderListen(controls,'end',()=>{a.interacting=false;invalidate(a);});
    const resize=()=>{if(!live())return;const w=canvasHost.clientWidth,h=canvasHost.clientHeight;if(w<1||h<1)return;const ratio=Math.min(global.devicePixelRatio||1,a.light?1:1.7,Math.sqrt((a.light?500000:1500000)/(w*h)));renderer.setPixelRatio(ratio);renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix();invalidate(a);};
    if(typeof ResizeObserver==='function'){a.resizeObserver=new ResizeObserver(resize);a.resizeObserver.observe(canvasHost);}else a.renderListen(global,'resize',resize);resize();
    const raycaster=new THREE.Raycaster(),pointer=new THREE.Vector2();let start=null;
    a.renderListen(renderer.domElement,'pointerdown',event=>{start={x:event.clientX,y:event.clientY};});
    a.renderListen(renderer.domElement,'pointerup',event=>{
      if(!start||Math.hypot(event.clientX-start.x,event.clientY-start.y)>7){start=null;return;}start=null;if(a.tab==='route')return;
      const r=renderer.domElement.getBoundingClientRect();pointer.set((event.clientX-r.left)/r.width*2-1,-(event.clientY-r.top)/r.height*2+1);raycaster.setFromCamera(pointer,camera);
      const hit=raycaster.intersectObjects(a.meshes.filter(m=>m.visible),false)[0];if(hit?.object.userData.bhPart)a.selectPart(hit.object.userData.bhPart);
    });
    a.renderListen(renderer.domElement,'keydown',event=>{
      if(['ArrowLeft','ArrowRight','ArrowUp','ArrowDown','+','=','-','0','Home'].includes(event.key))event.preventDefault();else return;
      a.transition=null;const delta=camera.position.clone().sub(controls.target),s=new THREE.Spherical().setFromVector3(delta);
      if(event.key==='ArrowLeft')s.theta-=Math.PI/12;if(event.key==='ArrowRight')s.theta+=Math.PI/12;if(event.key==='ArrowUp')s.phi=Math.max(.15,s.phi-Math.PI/15);if(event.key==='ArrowDown')s.phi=Math.min(Math.PI-.15,s.phi+Math.PI/15);
      if(event.key==='+'||event.key==='=')s.radius=Math.max(controls.minDistance,s.radius*.85);if(event.key==='-')s.radius=Math.min(controls.maxDistance,s.radius*1.18);
      if(event.key==='0'||event.key==='Home'){pose(a,'anterior');return;}camera.position.copy(controls.target).add(new THREE.Vector3().setFromSpherical(s));controls.update();invalidate(a);
    });
    a.renderListen(renderer.domElement,'webglcontextlost',event=>{event.preventDefault();const error=new Error('context-lost');error.bhReason='context';if(!a.light){a.light=true;start3D(a);}else showFallback(a,error);});
    const model=gltf.scene;a.model=model;
    if(Array.isArray(asset.rotation)&&asset.rotation.length===3)model.rotation.set(...asset.rotation);
    const box=new THREE.Box3().setFromObject(model),size=box.getSize(new THREE.Vector3()),center=box.getCenter(new THREE.Vector3());
    if(!Number.isFinite(size.length())||size.length()===0)throw new Error('empty-model');
    const wrapper=new THREE.Group();wrapper.add(model);const scale=4.15/Math.max(size.x,size.y,size.z);wrapper.scale.setScalar(scale);model.position.sub(center);scene.add(wrapper);a.wrapper=wrapper;
    model.traverse(mesh=>{
      if(!mesh.isMesh)return;
      let node=mesh,id=null;while(node&&!id){id=INDEX[node.name]?node.name:null;node=node.parent;}
      if(!id){id=Object.keys(INDEX).find(key=>mesh.name.toLowerCase().replaceAll('_','-').includes(key))||null;}
      mesh.userData.bhPart=id;
      const old=Array.isArray(mesh.material)?mesh.material:[mesh.material];const mats=old.map(m=>{const cloned=a.light?new THREE.MeshPhongMaterial({color:m.color,shininess:24,specular:0x30475b}):m.clone();cloned.side=THREE.DoubleSide;cloned.forceSinglePass=true;cloned.userData.bhColor=cloned.color.clone();if(cloned.roughness!==undefined)cloned.roughness=.6;if(cloned.metalness!==undefined)cloned.metalness=.02;return cloned;});
      mesh.material=Array.isArray(mesh.material)?mats:mats[0];a.materials.push(...old);a.meshes.push(mesh);
      if(id){if(!a.meshByPart.has(id))a.meshByPart.set(id,[]);a.meshByPart.get(id).push(mesh);}
    });
    wrapper.updateMatrixWorld(true);
    for(const [id,meshes] of a.meshByPart){const b=new THREE.Box3();for(const m of meshes)b.union(new THREE.Box3().setFromObject(m));a.partCenters.set(id,b.getCenter(new THREE.Vector3()));}
    updateMaterials(a);a.q('[data-bh-loading]').hidden=true;a.q('[data-bh-status]').textContent=a.light?'Modelo 3D · modo ligero':'Modelo anatómico 3D';
    a.q('[data-bh-view-caption]').textContent=a.light?'11 estructuras · optimizado para móviles':'Geometría anatómica · no es una imagen plana';
    a.all('[data-bh-action="zoom-in"],[data-bh-action="zoom-out"],[data-bh-action="rotate"],[data-bh-action="reset-camera"],[data-bh-action="pose"]').forEach(b=>b.disabled=false);
    a.q('[data-bh-action="isolate"]').disabled=!a.selected;
    if(a.selected)focusPart(a,a.selected);invalidate(a);
  }

  function focusPart(a,id){
    if(!a.controls||!a.camera)return;const target=a.partCenters.get(id);if(!target)return;
    const offset=a.camera.position.clone().sub(a.controls.target).normalize().multiplyScalar(6.6),look=target.clone().multiplyScalar(.72),to=look.clone().add(offset);
    transitionCamera(a,to,look);a.focus=id;
  }
  function transitionCamera(a,position,target){
    if(!a.camera||!a.controls)return;
    if(a.reduce){a.controls.target.copy(target);a.camera.position.copy(position);a.controls.update();a.transition=null;}
    else a.transition={start:performance.now(),from:a.camera.position.clone(),to:position,fromTarget:a.controls.target.clone(),toTarget:target};
    invalidate(a);
  }
  function pose(a,name){
    if(!a.camera||!a.THREE)return;const T=a.THREE,p=name==='posterior'?new T.Vector3(0,.25,-8.3):name==='lateral'?new T.Vector3(8.3,.25,0):new T.Vector3(0,.25,8.3);transitionCamera(a,p,new T.Vector3(0,0,0));
  }
  function zoom(a,factor){if(!a.controls||!a.camera)return;const delta=a.camera.position.clone().sub(a.controls.target);delta.setLength(Math.min(a.controls.maxDistance,Math.max(a.controls.minDistance,delta.length()*factor)));transitionCamera(a,a.controls.target.clone().add(delta),a.controls.target.clone());}
  function schedule(a){if(!a.disposed&&!a.frame&&a.visible)a.frame=requestAnimationFrame(t=>draw(a,t));}
  function invalidate(a){if(a.disposed)return;a.dirty=Math.max(a.dirty,2);schedule(a);}
  function draw(a,time){
    a.frame=0;if(a.disposed||!a.visible||!a.host.isConnected)return;
    const interval=1000/(a.light?30:60);
    if(time-a.lastFrame<interval-1){schedule(a);return;}a.lastFrame=time;
    // The independent SVG flow must never cause an unchanged GLB to render.
    const needs3D=a.dirty>0||a.rotate||a.transition||a.interacting;
    if(needs3D&&a.renderer&&a.scene&&a.camera&&a.controls){
      if(a.transition){const t=Math.min(1,(time-a.transition.start)/650),e=t*t*(3-2*t);a.camera.position.lerpVectors(a.transition.from,a.transition.to,e);a.controls.target.lerpVectors(a.transition.fromTarget,a.transition.toTarget,e);if(t===1)a.transition=null;}
      a.controls.autoRotate=a.rotate;a.controls.autoRotateSpeed=.65;a.controls.update();
      const renderer=a.renderer;
      try{renderer.render(a.scene,a.camera);}catch(error){showFallback(a,error);return;}
      if(a.renderer!==renderer)return; // A context-loss handler may replace it synchronously.
      const marker=a.q('[data-bh-marker]'),center=a.selected?a.partCenters.get(a.selected):null;
      if(center){const p=center.clone().project(a.camera),r=a.renderer.domElement;marker.style.left=((p.x*.5+.5)*r.clientWidth)+'px';marker.style.top=((-p.y*.5+.5)*r.clientHeight)+'px';marker.style.display=p.z<1&&Math.abs(p.x)<1&&Math.abs(p.y)<1?'block':'none';}else marker.style.display='none';
    }
    if(a.flow||a.flowDirty){
      for(let i=0;i<a.beads.length;i++){const {bead,path,length}=a.beads[i],u=a.flow?((time-a.flowStart)/3700+i*.19)%1:.48,point=path.getPointAtLength(Math.max(0,u)*length);bead.setAttribute('cx',point.x.toFixed(2));bead.setAttribute('cy',point.y.toFixed(2));}
      a.flowDirty=false;
    }
    a.dirty=Math.max(0,a.dirty-1);
    if(a.flow||a.rotate||a.transition||a.interacting||a.dirty>0)schedule(a);
  }

  function showFallback(a,error){
    if(a.disposed||a.fallback)return;a.fallback=true;
    release3D(a);
    a.q('[data-bh-canvas]').innerHTML='<div class="bh-fallback">'+fallbackSVG()+'<p class="bh-fallback-title">Continúa con el esquema</p><p>La lista de estructuras y el recorrido paso a paso<br>siguen disponibles sin el modelo 3D.</p></div>';
    a.q('[data-bh-loading]').hidden=true;a.q('[data-bh-status]').textContent='Esquema accesible 2D';a.q('[data-bh-view-caption]').textContent='Esquema educativo · no representa la anatomía en escala';
    const warning=a.q('[data-bh-error]');warning.hidden=false;
    const reason=error?.bhReason;
    a.q('[data-bh-error-message]').textContent=(reason==='network'?'No se pudo completar la descarga del modelo. Comprueba tu conexión y vuelve a intentarlo.':reason==='context'?'El equipo interrumpió los gráficos 3D para liberar recursos. Puedes volver a intentarlo en modo ligero.':reason==='compatibility'?'Este navegador no pudo iniciar los gráficos 3D. Reintenta en modo ligero o abre el capítulo en Chrome actualizado.':'No se pudo preparar el modelo 3D. Puedes volver a intentarlo en modo ligero.')+' La anatomía y el recorrido siguen disponibles mediante el esquema.';
    a.all('[data-bh-action="zoom-in"],[data-bh-action="zoom-out"],[data-bh-action="rotate"],[data-bh-action="reset-camera"],[data-bh-action="pose"],[data-bh-action="isolate"]').forEach(b=>b.disabled=true);
    a.q('[data-bh-marker]').style.display='none';a.rotate=false;invalidate(a);
    if(global.console)console.info('Modelo anatómico no disponible:',error?.message||'WebGL');
  }
  function unmount(){
    const a=current;if(!a)return;current=null;a.disposed=true;
    a.controller.abort();a.observer?.disconnect();if(a.frame)cancelAnimationFrame(a.frame);a.frame=0;
    release3D(a);a.beads.length=0;
  }
  global.ChapterInteractions={render,mount,unmount};
})(window);
