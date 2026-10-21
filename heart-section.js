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
    return '<g class="bh-section-valve" data-bh-section-valve="'+n+'"><title>Válvula '+label+'</title>'+markup+'<circle cx="'+x+'" cy="'+y+'" r="11" fill="#f4dab1" stroke="#402a33" stroke-width="2"/><text x="'+x+'" y="'+(y+4)+'" text-anchor="middle" fill="#302333" stroke="none" font-size="13" font-weight="800">'+n+'</text></g>';
  }
  function render() {
    return `<svg class="bh-section-svg" data-bh-section-svg="" viewBox="0 0 760 680" xmlns="http://www.w3.org/2000/svg" role="group" aria-labelledby="bh-section-title bh-section-desc">
      <title id="bh-section-title">Corazón humano: vista anterior en sección longitudinal frontal (esquemática)</title>
      <desc id="bh-section-desc">Las cavidades derechas están a la izquierda de la imagen. Se muestran cuatro cavidades separadas por tabiques, cuatro válvulas y los grandes vasos. La pared del ventrículo izquierdo es más gruesa. Los trayectos de salida se separan esquemáticamente para poder seguirlos; no es una sección coronal estricta.</desc>
      <defs>
        <linearGradient id="hs-wall" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#f3a0a0"/><stop offset=".4" stop-color="#a94964"/><stop offset=".75" stop-color="#ce6e7d"/><stop offset="1" stop-color="#783b54"/></linearGradient>
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
      <g class="bh-section-flow-paths" fill="none" stroke-linecap="round" stroke-linejoin="round">
        ${paths.map((p,i)=>'<path data-bh-section-path="'+i+'" d="'+p.d+'" stroke="'+(p.oxygen==='poor'?'#91d6e2':'#ffb5b4')+'" stroke-width="3.5" opacity=".26" marker-end="url(#hs-'+p.oxygen+'-arrow)"/>').join('')}
      </g>
      <g class="bh-section-particles" pointer-events="none">${paths.map((p,i)=>'<circle data-bh-section-particle="'+i+'" r="5" fill="'+(p.oxygen==='poor'?'#b7f0f3':'#ffd2c6')+'" stroke="#fff" stroke-width="1.3" visibility="hidden"/>').join('')}</g>
      <g class="bh-section-labels" pointer-events="none" font-family="Inter,system-ui,sans-serif">
        ${txt(267,266,['Aurícula','derecha'],'#d6edf2',18)}
        ${txt(472,268,['Aurícula','izquierda'],'#ffe0dd',18)}
        ${txt(288,436,['Ventrículo','derecho'],'#d6edf2',17)}
        ${txt(462,441,['Ventrículo','izquierdo'],'#ffe0dd',17)}
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
  function svgFor(host) {
    return host?.matches?.('[data-bh-section-svg]') ? host : host?.querySelector?.('[data-bh-section-svg]');
  }
  function update(host, options={}) {
    const svg=svgFor(host);if(!svg)return;
    const step=Number.isInteger(options.step)?Math.max(0,Math.min(7,options.step)):0;
    const route=options.tab==='route', selected=typeof options.selectedPart==='string'?options.selectedPart:null;
    const highlighted=route?STEP_PARTS[step]:selected?[selected]:[];
    for(const node of svg.querySelectorAll('[data-bh-section-part]')){
      const id=node.getAttribute('data-bh-section-part'), on=highlighted.includes(id);
      node.setAttribute('aria-pressed',String(id===selected));
      node.classList.toggle('is-active',on);
      node.style.filter=on?'brightness(1.3)':'';
      node.style.opacity=highlighted.length&&!on?'.65':'1';
    }
    const flow=options.flow===true;
    states.set(svg,{step,route,flow});
    for(const node of svg.querySelectorAll('[data-bh-section-path]')){
      const i=Number(node.getAttribute('data-bh-section-path')),active=route&&paths[i].steps.includes(step);
      node.setAttribute('opacity',active?'.95':route?'.10':'.27');
      node.setAttribute('stroke-width',active?'5':'3.5');
    }
    for(const node of svg.querySelectorAll('[data-bh-section-particle]')){
      const i=Number(node.getAttribute('data-bh-section-particle'));
      node.setAttribute('visibility',flow&&route&&paths[i].steps.includes(step)?'visible':'hidden');
    }
    const lungs=svg.querySelector('[data-bh-section-lungs]');
    if(lungs){lungs.classList.toggle('is-active',route&&step===3);lungs.style.filter=route&&step===3?'brightness(1.5)':'';}
    animate(svg,0);
  }
  function animate(host,time) {
    const svg=svgFor(host),state=svg&&states.get(svg);if(!state||!state.flow||!state.route)return;
    const finiteTime=typeof time==='number'&&Number.isFinite(time)?time:0;
    for(const node of svg.querySelectorAll('[data-bh-section-particle]')){
      const i=Number(node.getAttribute('data-bh-section-particle'));if(!paths[i].steps.includes(state.step))continue;
      const path=svg.querySelector('[data-bh-section-path="'+i+'"]');if(!path?.getTotalLength||!path?.getPointAtLength)continue;
      try{const length=path.getTotalLength(),progress=((finiteTime/2400+i*.17)%1+1)%1,point=path.getPointAtLength(length*progress);node.setAttribute('cx',point.x);node.setAttribute('cy',point.y);}catch{}
    }
  }
  const api=Object.freeze({render,update,animate});
  if(typeof module==='object'&&module.exports)module.exports=api;
  if(global)global.HeartSection=api;
})(typeof window!=='undefined'?window:typeof globalThis!=='undefined'?globalThis:this);
