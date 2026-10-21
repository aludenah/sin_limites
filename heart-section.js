(function (global) {
  'use strict';
  // Original teaching illustration. The outflow tracts are separated to show
  // connections; this is an anterior schematic section, not one strict CT plane.
  const states = new WeakMap();
  const STEP_PARTS = [
    ['superior-vena-cava','right-atrium'], ['right-atrium','right-ventricle'],
    ['right-ventricle','pulmonary-trunk'], [], ['left-atrium'],
    ['left-atrium','left-ventricle'], ['left-ventricle','ascending-aorta','aortic-arch'],
    ['superior-vena-cava','right-atrium']
  ];
  const PART_NAMES = {
    'right-atrium':'Aurícula derecha', 'left-atrium':'Aurícula izquierda',
    'right-ventricle':'Ventrículo derecho', 'left-ventricle':'Ventrículo izquierdo',
    'superior-vena-cava':'Vena cava superior', 'pulmonary-trunk':'Tronco pulmonar',
    'ascending-aorta':'Aorta ascendente', 'aortic-arch':'Arco aórtico',
    'ventricular-wall':'Pared ventricular'
  };
  const paths = [
    {steps:[0,7],oxygen:'poor',d:'M225 147V235Q225 264 263 281'},
    {steps:[0,7],oxygen:'poor',d:'M168 434Q148 366 213 314L253 291'},
    {steps:[1],oxygen:'poor',d:'M270 289Q264 320 272 350Q279 393 292 431'},
    {steps:[2],oxygen:'poor',d:'M291 455Q331 440 345 391L350 339V190Q350 151 296 145L150 132'},
    {steps:[2],oxygen:'poor',d:'M350 196Q348 165 402 161L603 146'},
    {steps:[4],oxygen:'rich',d:'M613 252L532 252Q498 252 474 279'},
    {steps:[4],oxygen:'rich',d:'M611 291L535 291Q502 291 474 279'},
    {steps:[4],oxygen:'rich',d:'M410 244L436 254Q456 261 474 279'},
    {steps:[4],oxygen:'rich',d:'M409 300L438 296Q458 290 474 279'},
    {steps:[5],oxygen:'rich',d:'M477 291Q482 319 473 350Q461 389 462 447'},
    {steps:[6],oxygen:'rich',d:'M463 478Q447 450 426 413Q400 384 400 351V173Q396 111 440 101Q487 89 526 118L553 141'}
  ];
  function part(id, markup, extra='') {
    return '<g class="bh-section-part" data-bh-section-part="'+id+'" data-bh-action="part" data-value="'+id+'" role="button" tabindex="0" aria-label="'+PART_NAMES[id]+'" aria-pressed="false" '+extra+'><title>'+PART_NAMES[id]+'</title>'+markup+'</g>';
  }
  function txt(x,y,lines,fill='#e3edf4',size=19,anchor='middle',weight=650) {
    return '<text x="'+x+'" y="'+y+'" fill="'+fill+'" font-size="'+size+'" font-weight="'+weight+'" text-anchor="'+anchor+'">'+lines.map((line,i)=>'<tspan x="'+x+'" dy="'+(i?size*1.18:0)+'">'+line+'</tspan>').join('')+'</text>';
  }
  function valve(n,x,y,label,markup) {
    const longitudinal=x===262||x===481;
    const closed=longitudinal?([1,3].includes(n)?'M279 309Q311 321 343 309':'M431 303Q449 311 468 303'):n===1?'M257 339Q278 347 300 339':n===2?'M337 338Q350 345 363 338':n===3?'M455 337Q473 345 490 337':'M388 358Q400 365 412 358';
    return '<g class="bh-section-valve" data-bh-section-valve="'+n+'"><title>Válvula '+label+'</title><g data-bh-leaflets="">'+markup+'</g><path data-bh-valve-closed="" d="'+closed+'" fill="none" stroke="#ffe6bc" stroke-width="5" visibility="hidden"/><circle cx="'+x+'" cy="'+y+'" r="11" fill="#f4dab1" stroke="#402a33" stroke-width="2"/><text x="'+x+'" y="'+(y+4)+'" text-anchor="middle" fill="#302333" stroke="none" font-size="13" font-weight="800">'+n+'</text></g>';
  }
  function renderFrontal() {
    return `<svg data-bh-section-type="frontal" class="bh-section-svg" data-bh-section-svg="" viewBox="0 0 760 680" xmlns="http://www.w3.org/2000/svg" role="group" aria-labelledby="bh-section-title bh-section-desc">
      <title id="bh-section-title">Corazón humano: vista anterior en sección longitudinal frontal (esquemática)</title>
      <desc id="bh-section-desc">Las cavidades derechas están a la izquierda de la imagen. Se muestran cuatro cavidades separadas por tabiques, cuatro válvulas y los grandes vasos. La pared del ventrículo izquierdo es más gruesa. Los trayectos de salida se separan esquemáticamente para poder seguirlos; no es una sección coronal estricta.</desc>
      <defs>
        <linearGradient id="hs-tissue" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#f8c6ac"/><stop offset=".22" stop-color="#d7867e"/><stop offset=".6" stop-color="#a74c61"/><stop offset="1" stop-color="#f2ad96"/></linearGradient><radialGradient id="hs-depth"><stop stop-color="#071829"/><stop offset=".72" stop-color="#193b50"/><stop offset="1" stop-color="#527985"/></radialGradient><linearGradient id="hs-chord" x1="0" x2="1"><stop stop-color="#bfa991"/><stop offset=".5" stop-color="#fff2cd"/><stop offset="1" stop-color="#c5ac99"/></linearGradient><linearGradient id="hs-wall" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#f3a0a0"/><stop offset=".4" stop-color="#a94964"/><stop offset=".75" stop-color="#ce6e7d"/><stop offset="1" stop-color="#783b54"/></linearGradient>
        <linearGradient id="hs-poor" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#285b78"/><stop offset=".65" stop-color="#102f50"/><stop offset="1" stop-color="#36738a"/></linearGradient>
        <linearGradient id="hs-rich" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#b5536d"/><stop offset=".55" stop-color="#552840"/><stop offset="1" stop-color="#963b5c"/></linearGradient>
        <linearGradient id="hs-vein" x1="0" y1="0" x2="1" y2="0"><stop stop-color="#487f9c"/><stop offset=".4" stop-color="#83becd"/><stop offset="1" stop-color="#345f83"/></linearGradient>
        <linearGradient id="hs-artery" x1="0" y1="0" x2="1" y2="0"><stop stop-color="#ab4e65"/><stop offset=".45" stop-color="#ee9c9b"/><stop offset="1" stop-color="#a84d66"/></linearGradient>
        <radialGradient id="hs-background"><stop stop-color="#203c52"/><stop offset="1" stop-color="#0a1e34"/></radialGradient>
        <pattern id="hs-muscle" width="12" height="12" patternUnits="userSpaceOnUse" patternTransform="rotate(-25)"><path d="M0 0V12" stroke="#ffdbca" stroke-opacity=".14" stroke-width="3"/></pattern>
        <marker id="hs-poor-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="m1 1 8 4-8 4" fill="none" stroke="#96dae4" stroke-width="1.8"/></marker>
        <marker id="hs-rich-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="m1 1 8 4-8 4" fill="none" stroke="#ffb4b2" stroke-width="1.8"/></marker>
      </defs>
      <rect width="760" height="680" rx="18" fill="url(#hs-background)"/>
      <ellipse cx="386" cy="583" rx="205" ry="20" fill="#020c1c" opacity=".22"/>
      ${txt(205,33,['DERECHA ANATÓMICA'],'#b6d8e3',15)}
      ${txt(521,33,['IZQUIERDA ANATÓMICA'],'#e9c0c8',15)}
      <path d="M355 22v17" stroke="#9bb2c3" stroke-opacity=".4"/>
      <g data-bh-section-lungs="">
        <rect x="30" y="53" width="145" height="55" rx="11" fill="#14384b" stroke="#507d91"/>
        ${txt(102,75,['EN LOS PULMONES'],'#c5e5e7',12)}
        ${txt(102,94,['Intercambio de gases'],'#8fb7c7',11,'middle',500)}
      </g>
      ${txt(605,92,['Hacia el cuerpo'],'#efb8bb',15)}
      ${txt(90,173,['A los pulmones'],'#a9d9e3',14)}
      ${txt(650,183,['A los pulmones'],'#a9d9e3',14)}
      <g fill="none" stroke-linecap="round" stroke-linejoin="round">
        ${part('aortic-arch','<path d="M400 175V156Q392 106 431 91Q489 69 535 115L554 139" stroke="#562a40" stroke-width="53"/><path d="M400 175V156Q392 106 431 91Q489 69 535 115L554 139" stroke="url(#hs-artery)" stroke-width="43"/><path d="M443 91l-6-33m37 31 4-35m27 48 15-29" stroke="url(#hs-artery)" stroke-width="17"/>')}
      </g>
      ${part('ventricular-wall','<path d="M207 238C239 195 307 199 358 221C396 204 462 198 518 228C587 266 602 352 577 444C558 513 500 578 421 605C357 594 278 568 229 514C179 460 152 388 168 313C175 278 188 256 207 238Z" fill="url(#hs-wall)" stroke="#f2b8aa" stroke-opacity=".55" stroke-width="2"/><path d="M207 238C239 195 307 199 358 221C396 204 462 198 518 228C587 266 602 352 577 444C558 513 500 578 421 605C357 594 278 568 229 514C179 460 152 388 168 313C175 278 188 256 207 238Z" fill="url(#hs-muscle)"/>')}
      <g fill="none" stroke-linecap="round" stroke-linejoin="round">
        ${part('superior-vena-cava','<path d="M225 148V238" stroke="#24445d" stroke-width="40"/><path d="M225 148V238" stroke="url(#hs-vein)" stroke-width="31"/>')}
        <path d="M168 434Q148 372 204 322L230 306" stroke="#24445d" stroke-width="37"/><path d="M168 434Q148 372 204 322L230 306" stroke="url(#hs-vein)" stroke-width="28"/>
      </g>
      ${part('right-atrium','<path d="M230 224C260 207 308 222 321 247C337 272 331 310 305 327L271 343C246 339 219 330 210 307C199 284 202 245 230 224Z" fill="url(#hs-poor)" stroke="#a0d4df" stroke-width="3"/>')}
      ${part('left-atrium','<path d="M429 228C453 212 494 221 516 237C538 256 541 295 517 315L477 344C450 338 421 326 411 305C401 285 404 247 429 228Z" fill="url(#hs-rich)" stroke="#f4b4b4" stroke-width="3"/>')}
      <g fill="none" stroke-linecap="round"><path d="M412 244L432 252M412 301l24-7M535 252h77M534 291h78" stroke="#70364f" stroke-width="23"/><path d="M412 244L432 252M412 301l24-7M535 252h77M534 291h78" stroke="url(#hs-artery)" stroke-width="16"/></g>
      ${part('right-ventricle','<path d="M237 363C263 351 309 352 339 375C356 401 362 448 379 548C330 548 274 509 247 470C224 437 210 390 237 363Z" fill="url(#hs-poor)" stroke="#8fc8d8" stroke-width="3"/><path d="M248 413q12 18 15 43m21-66q18 29 18 65m18-42q9 38 17 70" fill="none" stroke="#91bfd0" stroke-opacity=".28" stroke-width="4"/>')}
      ${part('left-ventricle','<path d="M421 369C448 352 482 356 507 377C527 408 522 461 499 503C481 539 454 559 426 572C412 537 411 490 405 446C399 411 399 386 421 369Z" fill="url(#hs-rich)" stroke="#f0abae" stroke-width="4"/><path d="M435 395q-9 23-7 51m54-48q14 27 6 57m-39 12 4 49" fill="none" stroke="#f1b7b5" stroke-opacity=".25" stroke-width="5"/>')}
      <path d="M365 336C384 380 379 444 398 549" fill="none" stroke="#f0a3a0" stroke-width="18" stroke-linecap="round"/>
      <path d="M365 336C384 380 379 444 398 549" fill="none" stroke="#ffdbbd" stroke-opacity=".34" stroke-width="3"/>
      <g fill="none" stroke-linecap="round" stroke-linejoin="round">
        ${part('ascending-aorta','<path d="M426 405Q399 383 400 351V175" stroke="#63314a" stroke-width="38"/><path d="M426 405Q399 383 400 351V175" stroke="url(#hs-artery)" stroke-width="29"/>')}
        ${part('pulmonary-trunk','<path d="M338 398Q352 369 350 339V190Q353 152 296 145L150 132M350 196Q348 165 402 161L603 146" stroke="#214b64" stroke-width="39"/><path d="M338 398Q352 369 350 339V190Q353 152 296 145L150 132M350 196Q348 165 402 161L603 146" stroke="url(#hs-vein)" stroke-width="29"/>')}
      </g>
      <g fill="none" stroke="#ffe7ce" stroke-linecap="round" stroke-linejoin="round" stroke-width="4">
        ${valve(1,243,350,'tricúspide','<path d="m257 337 12 18 10-18m-10 18 10 20m-3-40 12 18 10-17"/><path d="m269 355-3 30m23-32 8 29" stroke-width="1.4" opacity=".7"/>')}
        ${valve(2,326,324,'pulmonar','<path d="M337 338q7-13 13 0 7-13 13 0"/>')}
        ${valve(3,506,348,'mitral','<path d="m455 336 17 20 18-20m-18 20-9 25m9-25 8 26"/>')}
        ${valve(4,420,345,'aórtica','<path d="M388 358q6-12 12 0 6-12 12 0"/>')}
      </g>
      <g class="hs-fine-anatomy" pointer-events="none">
        <path d="M190 284C157 397 222 526 355 570M196 271C171 384 231 516 364 562M559 285C591 382 555 503 440 582M568 299C588 397 539 514 434 589" fill="none" stroke="#ffc6ac" stroke-opacity=".48" stroke-width="2"/>
        <path d="M228 384q-7 38 18 61t28 45m-30-112q-7 39 19 62t29 48m26-105q-6 30 15 70l17 44M510 391q-8 22-8 51t-28 77m-60-110q12 39 7 61l13 57" fill="none" stroke="#e9b39e" stroke-opacity=".54" stroke-width="4" stroke-linecap="round"/>
        <path d="M267 488q-14-29-8-49 13-10 19 14l8 46m45 24q-11-29-5-47 11-10 16 12l7 43M431 520q-15-37-8-61 13-12 19 14l10 55m30-17q17-31 13-51-12-11-19 18l-8 42" fill="url(#hs-tissue)" stroke="#f8c5a9" stroke-width="1.5"/>
        <path d="M266 440 259 359m7 81 9-81m-9 81 20-84m46 122-51-121m51 121-34-123M430 461l29-105m-29 105 14-111m-14 111 43-103m18 102-14-105m14 105-5-108m5 108 3-112" fill="none" stroke="url(#hs-chord)" stroke-width="1.5" opacity=".85"/>
        <path d="M217 261q24-12 33-26m-35 41q24-12 39-29m-34 44q25-12 41-30m249-14q-25-13-45-14m53 29q-29-15-47-12" fill="none" stroke="#c2cdd0" stroke-width="2" opacity=".36"/>
        ${txt(640,387,['Cuerdas','tendinosas'],'#e6d4b6',13)}<path d="M596 386l-101 21" fill="none" stroke="#b5a18b"/>
        ${txt(635,451,['Músculos','papilares'],'#e6d4b6',13)}<path d="M591 451l-93 32" fill="none" stroke="#b5a18b"/>
      </g><g class="bh-section-flow-paths" fill="none" stroke-linecap="round" stroke-linejoin="round">
        ${paths.map((p,i)=>'<path data-bh-section-path="'+i+'" d="'+p.d+'" stroke="'+(p.oxygen==='poor'?'#91d6e2':'#ffb5b4')+'" stroke-width="3.5" opacity=".26" marker-end="url(#hs-'+p.oxygen+'-arrow)"/>').join('')}
      </g>
      <g class="bh-section-particles" pointer-events="none">${paths.map((p,i)=>'<circle data-bh-section-particle="'+i+'" r="5" fill="'+(p.oxygen==='poor'?'#b7f0f3':'#ffd2c6')+'" stroke="#fff" stroke-width="1.3" visibility="hidden"/>').join('')}</g>
      <g class="bh-section-labels" pointer-events="none" font-family="Inter,system-ui,sans-serif">
        ${txt(267,266,['Aurícula','derecha'],'#d6edf2',18)}
        ${txt(472,268,['Aurícula','izquierda'],'#ffe0dd',18)}
        ${txt(288,409,['Ventrículo','derecho'],'#d6edf2',17)}
        ${txt(466,410,['Ventrículo','izquierdo'],'#ffe0dd',17)}
        ${txt(173,190,['Vena cava','superior'],'#add3e1',14,'end')}
        <path d="M180 191h24" stroke="#7396ac" fill="none"/>
        ${txt(115,464,['Vena cava','inferior'],'#add3e1',14)}
        <path d="M145 443l16-8" stroke="#7396ac" fill="none"/>
        ${txt(656,245,['Venas','pulmonares'],'#edbdc5',14)}
        <path d="M624 275h13" stroke="#b78a99" fill="none"/>
        ${txt(291,99,['Tronco','pulmonar'],'#add3e1',14)}
        <path d="M302 120l24 25" stroke="#7396ac" fill="none"/>
        ${txt(601,48,['Arco aórtico'],'#edbdc5',14)}
        <path d="M563 53l-51 46" stroke="#b78a99" fill="none"/>
        ${txt(608,526,['Pared ventricular','izquierda más gruesa'],'#e8c7c4',13)}
        <path d="M552 516l-31-24" stroke="#bd8c91" fill="none"/>
        ${txt(354,586,['Tabique'],'#c6d6de',13)}
        <path d="M365 567l16-31" stroke="#93adbd" fill="none"/>
      </g>
      <path d="M40 625H720" stroke="#7794ab" stroke-opacity=".25"/>
      ${[['1','Tricúspide',125],['2','Pulmonar',297],['3','Mitral',466],['4','Aórtica',630]].map(([n,label,x])=>'<circle cx="'+(x-50)+'" cy="648" r="10" fill="#f4dab1"/><text x="'+(x-50)+'" y="652" text-anchor="middle" fill="#302333" font-size="12" font-weight="800">'+n+'</text>'+txt(x+5,653,[label],'#dce8ef',15)).join('')}
    </svg>`;
  }
  // Original vector atlas. Anatomy and valve phases checked against OpenStax
  // A&P 2e, sections 19.1 and 19.3. The cuts remain schematic, not CT planes.
  const VIEWS=Object.freeze({
    frontal:{label:'Frontal',title:'Corazón humano: vista anterior en sección longitudinal frontal (esquemática)',orientation:'Vista desde adelante: derecha anatómica a la izquierda de la imagen e izquierda anatómica a la derecha.',note:'Se retiran esquemáticamente las paredes anteriores para mostrar las cuatro cavidades. La orientación oblicua del corazón impide representar todo mediante un único plano coronal estricto.'},
    right:{label:'Longitudinal derecho',title:'Corazón humano: sección longitudinal del lado derecho (esquemática)',orientation:'Detalle del circuito derecho: venas cavas → aurícula derecha → tricúspide → ventrículo derecho → válvula pulmonar.',note:'Sección oblicua didáctica que reúne la entrada y la salida del lado derecho. Permite distinguir la válvula, sus cuerdas tendinosas y los músculos papilares.'},
    left:{label:'Longitudinal izquierdo',title:'Corazón humano: sección longitudinal del lado izquierdo (esquemática)',orientation:'Detalle del circuito izquierdo: venas pulmonares → aurícula izquierda → mitral → ventrículo izquierdo → válvula aórtica.',note:'Sección oblicua didáctica que reúne la entrada y la salida del lado izquierdo. Observa el espesor del miocardio y la continuidad entre el ventrículo y la aorta.'},
    transverse:{label:'Transversal ventricular',title:'Corazón humano: sección transversal de los ventrículos (esquemática)',orientation:'Vista desde la base hacia el ápex: anterior arriba; derecha anatómica a la izquierda de la imagen.',note:'Corte a nivel medio de los ventrículos. El derecho tiene forma semilunar y rodea parcialmente al izquierdo. Las válvulas quedan fuera de este nivel; los símbolos indican flujo perpendicular al corte.'}
  });
  function typeOf(value){return Object.hasOwn(VIEWS,value)?value:'frontal';}
  function phaseAt(time=0,speed=1){
    const rate=[.5,1,1.5].includes(speed)?speed:1;
    const u=(((Number.isFinite(time)?Math.max(0,time):0)*rate/7000)%1+1)%1;
    if(u<.42)return {id:'filling',label:'Llenado ventricular · diástole',av:true,sl:false,u:u/.42};
    if(u<.50)return {id:'contraction',label:'Contracción isovolumétrica · válvulas cerradas',av:false,sl:false,u:(u-.42)/.08};
    if(u<.84)return {id:'ejection',label:'Eyección ventricular · sístole',av:false,sl:true,u:(u-.50)/.34};
    return {id:'relaxation',label:'Relajación isovolumétrica · válvulas cerradas',av:false,sl:false,u:(u-.84)/.16};
  }
  const FRONT_PATHS=paths.map((p,i)=>({...p,phase:[2,9].includes(i)?'filling':[3,4,10].includes(i)?'ejection':'return'}));
  function flowMarkup(routes){
    return '<g class="bh-section-flow-paths" fill="none" stroke-linecap="round">'+routes.map((p,i)=>'<path data-bh-section-path="'+i+'" d="'+p.d+'" stroke="'+(p.oxygen==='poor'?'#7ce8ff':'#ff9b9b')+'" stroke-width="3.5" opacity=".26" marker-end="url(#hs-'+p.oxygen+'-arrow)"/>').join('')+'</g><g class="bh-section-particles" pointer-events="none">'+routes.map((p,i)=>'<ellipse data-bh-section-particle="'+i+'" rx="6" ry="3.8" fill="'+(p.oxygen==='poor'?'#8fefff':'#ffafb0')+'" stroke="#fff" stroke-width="1" visibility="hidden"/>').join('')+'</g>';
  }
  function trails(routes){return '<g class="hs-blood-cells" pointer-events="none">'+routes.map((p,i)=>Array.from({length:5},(_,j)=>'<g data-bh-rbc="'+i+'" data-bh-rbc-offset="'+((j+1)/6)+'" visibility="hidden"><ellipse rx="5.7" ry="3.6" fill="'+(p.oxygen==='poor'?'#5edcf4':'#ff858b')+'" stroke="'+(p.oxygen==='poor'?'#ccfaff':'#ffd2c8')+'" stroke-width=".8"/><ellipse rx="2.7" ry="1.5" fill="'+(p.oxygen==='poor'?'#267c9a':'#aa3d58')+'" opacity=".65"/></g>').join('')).join('')+'</g>';}
  const LONG_PATHS={
    right:[{steps:[0,7],oxygen:'poor',phase:'return',d:'M255 86V192Q252 224 300 246'},{steps:[0,7],oxygen:'poor',phase:'return',d:'M225 511V333Q222 275 300 246'},{steps:[1],oxygen:'poor',phase:'filling',d:'M310 251Q315 310 306 342Q280 404 317 480'},{steps:[2],oxygen:'poor',phase:'ejection',d:'M316 479Q381 462 415 393Q461 297 450 216V92'}],
    left:[{steps:[4],oxygen:'rich',phase:'return',d:'M190 167H262Q299 166 320 237'},{steps:[4],oxygen:'rich',phase:'return',d:'M184 215H265Q298 218 320 237'},{steps:[5],oxygen:'rich',phase:'filling',d:'M323 249Q318 304 306 348Q271 419 332 503'},{steps:[6],oxygen:'rich',phase:'ejection',d:'M333 503Q402 462 427 386Q456 308 447 195V140Q455 83 501 112L548 151'}]
  };
  function frame(type,body,routes=[]){
    const defs=renderFrontal().match(/<defs>([\s\S]*?)<\/defs>/)[1];
    return '<svg data-bh-section-type="'+type+'" class="bh-section-svg" data-bh-section-svg="" viewBox="0 0 760 680" xmlns="http://www.w3.org/2000/svg" role="group" aria-labelledby="bh-section-title bh-section-desc"><title id="bh-section-title">'+VIEWS[type].title+'</title><desc id="bh-section-desc">'+VIEWS[type].orientation+' '+VIEWS[type].note+'</desc><defs>'+defs+'</defs><rect width="760" height="680" rx="18" fill="url(#hs-background)"/>'+body+flowMarkup(routes)+trails(routes)+'</svg>';
  }
  function longSection(side){
    const right=side==='right',chamber=right?'right':'left',blood=right?'hs-poor':'hs-rich';
    const atrium=right?'Aurícula derecha':'Aurícula izquierda',ventricle=right?'Ventrículo derecho':'Ventrículo izquierdo',av=right?'Tricúspide':'Mitral',out=right?'Pulmonar':'Aórtica';
    const body=`${txt(380,38,[right?'LADO DERECHO · HACIA LOS PULMONES':'LADO IZQUIERDO · HACIA EL CUERPO'],'#d3e7ed',17)}
      <ellipse cx="358" cy="596" rx="176" ry="17" fill="#020c17" opacity=".4"/>
      ${part('ventricular-wall','<path d="M239 199C277 158 355 164 402 204C469 224 500 297 490 387C479 482 430 556 352 598C276 561 224 501 201 417C178 335 196 246 239 199Z" fill="url(#hs-wall)" stroke="#efc1aa" stroke-width="3"/>')}
      <path d="M222 274C193 378 218 494 343 575M231 269C205 368 226 494 350 568M468 288C492 392 454 500 369 565" fill="none" stroke="#ffd1b2" stroke-opacity=".4" stroke-width="2"/>
      ${part(chamber+'-atrium','<path d="M251 194C286 176 343 187 367 215C388 245 371 284 339 302L298 319C266 307 235 295 228 263C220 235 229 210 251 194Z" fill="url(#'+blood+')" stroke="#e5bcaa" stroke-width="3"/>')}
      ${part(chamber+'-ventricle',right?'<path d="M259 337C306 321 359 342 391 371C422 413 395 494 349 552C302 532 263 492 246 445C227 398 231 357 259 337Z" fill="url(#hs-poor)" stroke="#89bccc" stroke-width="3"/>':'<path d="M277 343C309 328 354 343 375 373C410 416 393 492 350 544C307 519 274 475 260 429C248 393 252 359 277 343Z" fill="url(#hs-rich)" stroke="#f8b1b1" stroke-width="3"/>')}
      <g fill="none" stroke-linecap="round" stroke-linejoin="round">
      ${right?part('superior-vena-cava','<path d="M255 85V198" stroke="#234559" stroke-width="48"/><path d="M255 85V198" stroke="url(#hs-vein)" stroke-width="36"/>')+'<path d="M225 511V333Q216 282 248 270" stroke="#234559" stroke-width="38"/><path d="M225 511V333Q216 282 248 270" stroke="url(#hs-vein)" stroke-width="28"/>':'<path d="M185 167H257M185 215H249" stroke="#5a293e" stroke-width="30"/><path d="M185 167H257M185 215H249" stroke="url(#hs-artery)" stroke-width="21"/>'}
      ${part(right?'pulmonary-trunk':'ascending-aorta',right?'<path d="M377 433Q454 335 450 216V92" stroke="#21475e" stroke-width="47"/><path d="M377 433Q454 335 450 216V92" stroke="url(#hs-vein)" stroke-width="35"/>':'<path d="M375 439Q460 340 447 195V140Q455 83 501 112L548 151" stroke="#54263d" stroke-width="47"/><path d="M375 439Q460 340 447 195V140Q455 83 501 112L548 151" stroke="url(#hs-artery)" stroke-width="35"/>')}
      </g>
      <g class="hs-fine-anatomy" pointer-events="none">
        <path d="M256 379q-8 31 16 66t37 50m-43-127q-8 28 18 62m92-36q13 36-8 72m-30 18-15 37" fill="none" stroke="#d7a997" stroke-opacity=".48" stroke-width="5" stroke-linecap="round"/>
        <path d="M283 478q-21-30-12-56 14-13 23 12l16 58m38 24q24-38 17-67-14-13-22 22l-8 40" fill="url(#hs-tissue)" stroke="#ffd9b8" stroke-width="2"/>
        <path d="M279 425 289 317m-10 108 28-101m-28 101 42-99m41 125-40-124m40 124-25-132m25 132-11-120" fill="none" stroke="url(#hs-chord)" stroke-width="2"/>
        <path d="M246 233q17-18 36-21m-33 38q19-18 39-22m-34 38q21-20 41-21" stroke="#c2dfd8" stroke-width="2" opacity=".45" fill="none"/>
      </g>
      <g fill="none" stroke="#ffe6bc" stroke-linejoin="round" stroke-width="4">
        ${valve(right?1:3,262,322,av.toLowerCase(),'<path d="m279 305 23 32 18-28m-18 28 20-32 21 21"/>')}
        ${valve(right?2:4,481,291,out.toLowerCase(),'<path d="M431 305q9-20 18 0 10-20 19 0"/>')}
      </g>
      ${txt(303,242,[atrium.split(' ')[0],atrium.split(' ')[1]],'#f1e6dd',20)}
      ${txt(317,392,[ventricle.split(' ')[0],ventricle.split(' ')[1]],'#f1e6dd',18)}
      ${txt(132,125,[right?'Vena cava':'Venas',right?'superior':'pulmonares'],'#badce5',16)}
      <path d="M189 130l44-19" fill="none" stroke="#769caf"/>
      ${txt(557,213,[right?'Tronco':'Aorta',right?'pulmonar':'ascendente'],'#e6d2ca',16)}<path d="M510 216l-43-20" fill="none" stroke="#ad9293"/>
      ${txt(124,340,[av],'#e6d4b6',17)}<path d="M171 337l92-13" fill="none" stroke="#ab9988"/>
      ${txt(590,313,['Válvula',out.toLowerCase()],'#e6d4b6',16)}<path d="M539 309l-43-15" fill="none" stroke="#ab9988"/>
      ${txt(586,390,['Cuerdas','tendinosas'],'#e6d4b6',16)}<path d="M532 388l-178 3" fill="none" stroke="#ab9988"/>
      ${txt(583,467,['Músculos','papilares'],'#e6d4b6',16)}<path d="M527 462l-157 18" fill="none" stroke="#ab9988"/>
      ${txt(580,543,['Miocardio',right?'Pared más delgada':'Pared más gruesa'],'#e6c0b1',15)}<path d="M519 536l-83-57" fill="none" stroke="#ab9988"/>
      ${txt(380,637,[right?'Aurícula → tricúspide → ventrículo → válvula pulmonar':'Aurícula → mitral → ventrículo → válvula aórtica'],'#bdd3dd',15)}
    `;
    return frame(side,body,LONG_PATHS[side]);
  }
  function transverse(){
    const body=`${txt(380,38,['CORTE A NIVEL MEDIO DE LOS VENTRÍCULOS'],'#d3e7ed',17)}
      ${txt(380,87,['ANTERIOR'],'#9eb9c8',14)}${txt(380,585,['POSTERIOR'],'#9eb9c8',14)}
      ${txt(115,127,['DERECHA'],'#a5dfe9',14)}${txt(644,127,['IZQUIERDA'],'#edc3c3',14)}
      <ellipse cx="384" cy="541" rx="236" ry="19" fill="#020e1c" opacity=".4"/>
      ${part('ventricular-wall','<path d="M178 187C246 121 395 118 500 165C592 198 636 278 608 375C587 458 493 521 380 524C269 526 172 474 140 390C105 307 120 238 178 187Z" fill="url(#hs-wall)" stroke="#ffd0b5" stroke-width="4"/>')}
      <path d="M164 208C112 289 149 434 278 490M177 200C132 284 160 421 284 481M513 183C613 237 622 366 535 452M522 199C602 249 603 361 530 440" fill="none" stroke="#ffcfb1" stroke-opacity=".46" stroke-width="3"/>
      ${part('right-ventricle','<path d="M198 225C239 176 348 159 414 188C337 200 294 247 283 306C267 381 297 423 344 455C255 456 190 411 172 352C154 296 167 259 198 225Z" fill="url(#hs-poor)" stroke="#8dc9d8" stroke-width="4"/>')}
      ${part('left-ventricle','<ellipse cx="450" cy="330" rx="111" ry="125" fill="url(#hs-rich)" stroke="#f3b8ad" stroke-width="5"/>')}
      <path d="M333 220C292 280 291 382 344 437" stroke="#f1a191" stroke-width="22" fill="none"/>
      <path d="M333 220C292 280 291 382 344 437" stroke="#ffd5b6" stroke-width="3" fill="none" opacity=".6"/>
      <path d="M187 289q15 8 19 34m-13 27q19 1 28 29m25 35q20-9 34 7" fill="none" stroke="#d3a58f" stroke-width="7" stroke-linecap="round"/>
      <g fill="url(#hs-tissue)" stroke="#ffd5b6" stroke-width="2"><ellipse cx="389" cy="288" rx="17" ry="23" transform="rotate(-27 389 288)"/><ellipse cx="506" cy="381" rx="18" ry="25" transform="rotate(-27 506 381)"/></g>
      ${txt(226,280,['Ventrículo','derecho'],'#c9edf3',17)}${txt(455,318,['Ventrículo','izquierdo'],'#ffe2da',18)}
      ${txt(117,487,['Pared derecha','más delgada'],'#c4d6dd',15)}<path d="M177 470l15-56" stroke="#99b3ba" fill="none"/>
      ${txt(644,482,['Pared izquierda','más gruesa'],'#e6b9af',15)}<path d="M591 462l-27-30" stroke="#b48c8b" fill="none"/>
      ${txt(328,557,['Tabique interventricular'],'#e2c8b8',16)}<path d="M325 535l-11-143" stroke="#bba495" fill="none"/>
      ${['right','left'].map((side,i)=>'<g data-bh-through="'+side+'" transform="translate('+(i?451:229)+' '+(i?374:349)+')"><circle r="17" fill="'+(i?'#63273e':'#173f58')+'" stroke="'+(i?'#ffb5af':'#8ee6f5')+'" stroke-width="2"/><circle data-bh-through-dot="" r="5" fill="'+(i?'#ffb5af':'#8ee6f5')+'"/><path data-bh-through-cross="" d="m-7-7 14 14m0-14-14 14" stroke="'+(i?'#ffb5af':'#8ee6f5')+'" stroke-width="3" visibility="hidden"/></g>').join('')}
      ${txt(380,619,['⊙ Hacia el observador     ⊗ Se aleja del observador'],'#c2d6de',15)}
      ${txt(380,648,['El flujo cruza el plano del corte; no atraviesa el tabique.'],'#91b1c2',13)}
    `;return frame('transverse',body);
  }
  function render(type='frontal'){
    type=typeOf(type);if(type==='right'||type==='left')return longSection(type);if(type==='transverse')return transverse();
    return renderFrontal().replace('</svg>',trails(FRONT_PATHS)+'</svg>');
  }
  function svgFor(host){return host?.matches?.('[data-bh-section-svg]')?host:host?.querySelector?.('[data-bh-section-svg]');}
  function routesFor(type){return type==='transverse'?[]:LONG_PATHS[type]||FRONT_PATHS;}
  function enabled(route,state,phase){
    if(state.mode==='step')return state.route&&route.steps.includes(state.step);
    return route.phase==='return'||route.phase===phase.id;
  }
  function update(host,options={}){
    const svg=svgFor(host);if(!svg)return;
    const type=typeOf(svg.getAttribute('data-bh-section-type')),routes=routesFor(type),previous=states.get(svg);
    const step=Number.isInteger(options.step)?Math.max(0,Math.min(7,options.step)):0;
    const route=options.tab==='route',selected=typeof options.selectedPart==='string'?options.selectedPart:null,mode=options.mode==='cycle'?'cycle':'step';
    const highlighted=mode==='cycle'?[]:route?STEP_PARTS[step]:selected?[selected]:[];
    for(const node of svg.querySelectorAll('[data-bh-section-part]')){
      const id=node.getAttribute('data-bh-section-part'),on=highlighted.includes(id);
      node.setAttribute('aria-pressed',String(id===selected));node.classList.toggle('is-active',on);node.style.filter=on?'brightness(1.25)':'';node.style.opacity=highlighted.length&&!on?'.65':'1';
    }
    const pathNodes=Array.from(svg.querySelectorAll('[data-bh-section-path]'));
    const state={type,routes,step,route,mode,flow:options.flow===true,frozen:options.flow!==true&&Boolean(previous?.flow||previous?.frozen),speed:[.5,1,1.5].includes(options.speed)?options.speed:1,phase:previous?.phase||null,lastTime:previous?.lastTime||0,
      pathNodes,particles:[...svg.querySelectorAll('[data-bh-section-particle]'),...svg.querySelectorAll('[data-bh-rbc]')],
      geometry:pathNodes.map(node=>{try{return {node,length:node.getTotalLength()};}catch{return {node,length:0};}})};
    states.set(svg,state);
    for(const node of state.particles)node.setAttribute('visibility','hidden');
    const lungs=svg.querySelector('[data-bh-section-lungs]');if(lungs){lungs.classList.toggle('is-active',route&&step===3);lungs.style.filter=route&&step===3?'brightness(1.5)':'';}
    paint(svg,state,state.lastTime,true);
  }
  function paint(svg,state,time,force=false){
    const phase=phaseAt(time,state.speed),stepMode=state.mode==='step';
    const phaseKey=stepMode?'step-'+state.step:phase.id;
    if(force||state.phase!==phaseKey){
      state.phase=phaseKey;svg.setAttribute('data-bh-phase',phaseKey);
      for(let i=0;i<state.pathNodes.length;i++){const on=enabled(state.routes[i],state,phase);state.pathNodes[i].setAttribute('opacity',on?'.95':'.12');state.pathNodes[i].setAttribute('stroke-width',on?'5':'2.5');}
      const avOpen=stepMode?[1,5].includes(state.step):phase.av,slOpen=stepMode?[2,6].includes(state.step):phase.sl;
      for(const valve of svg.querySelectorAll('[data-bh-section-valve]')){const n=Number(valve.getAttribute('data-bh-section-valve')),open=[1,3].includes(n)?avOpen:slOpen;valve.setAttribute('data-bh-valve-open',String(open));valve.style.opacity='1';valve.querySelector?.('[data-bh-leaflets]')?.setAttribute('visibility',open?'visible':'hidden');valve.querySelector?.('[data-bh-valve-closed]')?.setAttribute('visibility',open?'hidden':'visible');}
      for(const glyph of svg.querySelectorAll('[data-bh-through]')){
        const side=glyph.getAttribute('data-bh-through');const eject=stepMode?state.step===(side==='right'?2:6):phase.sl,fill=stepMode?state.step===(side==='right'?1:5):phase.av;
        glyph.style.opacity=eject||fill?'1':'.3';glyph.querySelector?.('[data-bh-through-dot]')?.setAttribute('visibility',eject?'visible':'hidden');glyph.querySelector?.('[data-bh-through-cross]')?.setAttribute('visibility',fill?'visible':'hidden');
      }
    }
    for(const cell of state.particles){
      const key=cell.getAttribute('data-bh-section-particle')??cell.getAttribute('data-bh-rbc'),i=Number(key),p=state.routes[i],geom=state.geometry[i];
      const visible=(state.flow||state.frozen)&&p&&enabled(p,state,phase);cell.setAttribute('visibility',visible?'visible':'hidden');if(!visible||!geom?.length)continue;
      const offset=Number(cell.getAttribute('data-bh-rbc-offset'))||0;
      // Pulsed paths finish at the valve; no particle can cross a closed valve.
      const u=stepMode?((time*state.speed/2800+i*.17+offset)%1+1)%1:p.phase==='return'?((time*state.speed/3300+offset)%1+1)%1:Math.max(0,Math.min(.999,(phase.u*1.65-offset)));
      if(!stepMode&&p.phase!=='return'&&(phase.u*1.65<offset||phase.u*1.65-offset>1)){cell.setAttribute('visibility','hidden');continue;}
      try{const point=geom.node.getPointAtLength(geom.length*u),ahead=geom.node.getPointAtLength(Math.min(geom.length,geom.length*u+1)),angle=Math.atan2(ahead.y-point.y,ahead.x-point.x)*180/Math.PI;
        if(cell.getAttribute('data-bh-rbc')!==null)cell.setAttribute('transform','translate('+point.x+' '+point.y+') rotate('+angle+')');else{cell.setAttribute('cx',point.x);cell.setAttribute('cy',point.y);cell.setAttribute('transform','rotate('+angle+' '+point.x+' '+point.y+')');}
      }catch{}
    }
    const scope=svg.closest?.('[data-biology-heart]')||svg.closest?.('[data-bh-section]'),label=scope?.querySelector?.('[data-bh-cycle-phase]');
    if(label){const text=stepMode?'Recorrido guiado · paso '+(state.step+1)+' de 8':phase.label;if(label.textContent!==text)label.textContent=text;}
  }
  function animate(host,time){const svg=svgFor(host),state=svg&&states.get(svg);if(!state||!state.flow)return;state.lastTime=Number.isFinite(time)?time:0;paint(svg,state,state.lastTime);}
  const api=Object.freeze({render,update,animate,views:VIEWS,phaseAt});
  if(typeof module==='object'&&module.exports)module.exports=api;
  if(global)global.HeartSection=api;
})(typeof window!=='undefined'?window:typeof globalThis!=='undefined'?globalThis:this);
