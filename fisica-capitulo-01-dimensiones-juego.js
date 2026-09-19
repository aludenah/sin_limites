(function(){
 'use strict';
 const fields=['M','L','T','I'];
 const fieldNames={M:'Masa',L:'Longitud',T:'Tiempo',I:'Corriente eléctrica'};
 const exponentValues=[-3,-2,-1,0,1,2,3];
 const escape=value=>String(value??'').replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&#039;');
 const shuffle=(values,random)=>{const copy=[...values];for(let i=copy.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[copy[i],copy[j]]=[copy[j],copy[i]];}return copy;};
 const emptySelection=()=>({M:null,L:null,T:null,I:null,unit:null});
 const sameDimension=(a,b)=>fields.every(field=>a.exponents[field]===b.exponents[field]);
 function formatDimension(exponents){
  return ['M','L','I','T'].map(field=>{
   const value=exponents[field];
   if(value===null||value===undefined)return `${field}^{\\square}`;
   return value===0?'':value===1?field:`${field}^{${value}}`;
  }).filter(Boolean).join('')||'1';
 }
 const math=tex=>`\\(${escape(tex)}\\)`;
 function createSession(items=window.DimensionExplorer?.items||[],random=Math.random){
  let state;
  function reset(){state={phase:'ready',rounds:[],index:0,points:0,answers:[],selected:emptySelection(),graded:false,message:''};}
  reset();
  function start(){
   const pool=[...new Map(items.map(item=>[item.id,item])).values()];
   const charge=pool.find(item=>item.id==='carga');
   if(pool.length<10||!charge)return false;
   const chosen=shuffle([charge,...shuffle(pool.filter(item=>item.id!=='carga'),random).slice(0,9)],random);
   const rounds=chosen.map(item=>{
    // SI expressions with the same dimension are never offered as incorrect units.
    const alternatives=[...new Map(pool.filter(other=>!sameDimension(item,other)&&other.unit!==item.unit).map(other=>[other.unit,other])).values()];
    const options=shuffle([item,...shuffle(alternatives,random).slice(0,2)],random).map(option=>({value:option.unit,label:option.unit,name:option.unitName}));
    return {item,options};
   });
   if(rounds.some(round=>round.options.length!==3))return false;
   reset();state.phase='playing';state.rounds=rounds;return true;
  }
  function choose(field,value){
   if(state.phase!=='playing'||state.graded)return false;
   if(field==='unit'){
    if(!state.rounds[state.index].options.some(option=>option.value===value))return false;
    state.selected.unit=value;
   }else if(fields.includes(field)){
    if(value==='')state.selected[field]=null;
    else{
     if(!exponentValues.some(exponent=>String(exponent)===String(value)))return false;
     state.selected[field]=Number(value);
    }
   }else return false;
   state.message='';return true;
  }
  function check(){
   if(state.phase!=='playing'||state.graded)return false;
   if(fields.some(field=>state.selected[field]===null)||state.selected.unit===null){state.message='Elige los cuatro exponentes y una unidad antes de comprobar. Usa 0 cuando una dimensión no interviene.';return false;}
   const {item}=state.rounds[state.index];
   const dimensionCorrect=fields.every(field=>state.selected[field]===item.exponents[field]);
   const unitCorrect=state.selected.unit===item.unit;
   state.points+=Number(dimensionCorrect)+Number(unitCorrect);
   state.answers.push({item,selected:{...state.selected},dimensionCorrect,unitCorrect});
   state.graded=true;state.message='';return true;
  }
  function next(){
   if(state.phase!=='playing'||!state.graded)return false;
   if(state.index===state.rounds.length-1){state.phase='finished';return true;}
   state.index++;state.selected=emptySelection();state.graded=false;state.message='';return true;
  }
  return {start,choose,check,next,reset,snapshot:()=>JSON.parse(JSON.stringify(state))};
 }
 let session;
 const getSession=()=>session||(session=createSession());
 function renderMath(host){
  if(host&&typeof window.renderMathInElement==='function')window.renderMathInElement(host,{delimiters:[{left:'\\[',right:'\\]',display:true},{left:'\\(',right:'\\)',display:false}],throwOnError:false,trust:false});
 }
 function preview(selected){
  const complete=fields.every(field=>selected[field]!==null);
  return `<span>Tu dimensión</span><strong>${math(formatDimension(selected))}</strong><small>${complete?'Los factores con exponente 0 se omiten.':'Completa las casillas de los cuatro exponentes.'}</small>`;
 }
 function exponentSelect(field,s,item){
  const wrong=s.graded&&s.selected[field]!==item.exponents[field];
  return `<label class="dimension-game-exponent${s.graded?(wrong?' needs-review':' is-correct'):''}" for="dimension-game-${field}"><span><b>${field}</b> ${fieldNames[field]}</span><select id="dimension-game-${field}" data-action="dimension-game-exponent" data-field="${field}" aria-describedby="dimension-game-exponent-help" ${s.graded?'disabled':''}><option value="" ${s.selected[field]===null?'selected':''}>Elegir</option>${exponentValues.map(value=>`<option value="${value}" ${s.selected[field]===value?'selected':''}>${value}</option>`).join('')}</select>${s.graded?`<small>${wrong?`Revisa: corresponde ${item.exponents[field]}`:'✓ Correcto'}</small>`:''}</label>`;
 }
 function unitButton(option,s,item){
  const selected=s.selected.unit===option.value,correct=s.graded&&option.value===item.unit,incorrect=s.graded&&selected&&!correct;
  return `<button type="button" class="dimension-game-choice${selected?' is-selected':''}${correct?' is-correct':''}${incorrect?' is-incorrect':''}" data-action="dimension-game-choice" data-field="unit" data-value="${escape(option.value)}" aria-pressed="${selected}" ${s.graded?'disabled':''}><b>${escape(option.label)}</b><span>${escape(option.name)}</span>${correct?'<small>✓ Unidad correcta</small>':incorrect?'<small>✗ Tu respuesta</small>':''}</button>`;
 }
 function feedback(answer){
  const {item,selected,dimensionCorrect,unitCorrect}=answer;
  return `<div id="dimension-game-feedback" class="dimension-game-feedback${dimensionCorrect&&unitCorrect?' is-correct':' needs-review'}" tabindex="-1" role="status"><strong>${dimensionCorrect&&unitCorrect?'✓ ¡Dimensión y unidad correctas!':dimensionCorrect||unitCorrect?'¡Un punto! Revisa la parte que falta.':'Vamos a reconstruir la respuesta.'}</strong><p><b>${dimensionCorrect?'✓ Dimensión correcta (+1 punto).':'✗ Revisa los exponentes.'}</b>${dimensionCorrect?'':` Elegiste ${math(formatDimension(selected))}; corresponde ${math(item.dimension)}.`}</p><p><b>${unitCorrect?'✓ Unidad correcta (+1 punto).':'✗ Revisa la unidad.'}</b>${unitCorrect?'':` Elegiste ${escape(selected.unit)}.`} La unidad es ${escape(item.unit)} (${escape(item.unitName)}).</p><div class="dimension-game-derivation">${math(item.derivation)}</div><p>${escape(item.explanation)}</p></div>`;
 }
 function inner(){
  const s=getSession().snapshot();
  const header='<p class="eyebrow">Aprende jugando</p><h3 id="dimension-game-title">Construye la dimensión</h3>';
  if(s.phase==='ready')return `${header}<p>¿Puedes reconocer una magnitud por sus dimensiones? Construye su expresión y elige su unidad. Usarás M, L, T e I: cuatro de las siete dimensiones base del SI.</p><div class="dimension-game-badges"><span>10 rondas</span><span>20 puntos posibles</span><span>Sin límite de tiempo</span></div><p class="dimension-game-note">Cada ronda vale 2 puntos: uno por la dimensión completa y otro por la unidad. Puedes consultar el explorador de arriba antes de responder.</p><button type="button" class="button" data-action="dimension-game-start">Comenzar juego →</button>`;
  if(s.phase==='finished'){
   const review=s.answers.filter(answer=>!answer.dimensionCorrect||!answer.unitCorrect);
   return `${header}<div id="dimension-game-result" class="dimension-game-finish" tabindex="-1"><p class="eyebrow">Partida completada</p><p class="dimension-game-score">${s.points}<span> / 20 puntos</span></p><h4>${s.points===20?'¡Construiste todas las dimensiones!':s.points>=14?'¡Buen trabajo! Sigue practicando.':'Cada intento te ayuda a comprender las dimensiones.'}</h4><p>${s.answers.filter(answer=>answer.dimensionCorrect).length} dimensiones y ${s.answers.filter(answer=>answer.unitCorrect).length} unidades correctas.</p>${review.length?`<details><summary>Repasar mis errores (${review.length} ${review.length===1?'ronda':'rondas'})</summary><ol>${review.map(answer=>`<li><strong>${escape(answer.item.name)}</strong><p>${answer.dimensionCorrect?'✓ Dimensión correcta.':`Tu dimensión: ${math(formatDimension(answer.selected))}.<br>Dimensión correcta: ${math(answer.item.dimension)}.`}</p><p>${answer.unitCorrect?'✓ Unidad correcta.':`Tu unidad: ${escape(answer.selected.unit)}.<br>Unidad correcta: ${escape(answer.item.unit)} (${escape(answer.item.unitName)}).`}</p><div class="dimension-game-derivation">${math(answer.item.derivation)}</div><p>${escape(answer.item.explanation)}</p></li>`).join('')}</ol></details>`:'<p>Relacionaste correctamente las magnitudes con sus dimensiones y unidades.</p>'}</div><button type="button" class="button" data-action="dimension-game-start">Jugar otra vez ↻</button><p class="dimension-game-note">Este juego es para repasar. Tu avance del capítulo se obtiene en la pestaña Práctica.</p>`;
  }
  const {item,options}=s.rounds[s.index];
  return `${header}<div class="dimension-game-status"><span>Ronda ${s.index+1} de 10</span><strong>${s.points} / 20 puntos</strong></div><progress value="${s.answers.length}" max="10" aria-label="Rondas completadas">${s.answers.length} de 10</progress><div class="dimension-game-target"><span>Construye la dimensión de</span><h4 id="dimension-game-target" tabindex="-1">${escape(item.name)}</h4><p>Recuerda: ${math(item.relation)}</p></div><fieldset><legend>1. Elige los exponentes</legend><p id="dimension-game-exponent-help" class="dimension-game-help">Usa 0 si la dimensión no interviene. Por ejemplo, ${math('M^0=1')}. Los exponentes negativos indican factores en el denominador.</p><div class="dimension-game-exponents">${fields.map(field=>exponentSelect(field,s,item)).join('')}</div><div id="dimension-game-preview" class="dimension-game-preview" aria-live="polite" aria-atomic="true">${preview(s.selected)}</div></fieldset><fieldset><legend>2. Elige su unidad en el SI</legend><div class="dimension-game-options">${options.map(option=>unitButton(option,s,item)).join('')}</div></fieldset><p id="dimension-game-message" class="dimension-game-message" role="status" aria-live="polite">${escape(s.message)}</p>${s.graded?feedback(s.answers[s.answers.length-1]):''}<div class="actions">${s.graded?`<button type="button" class="button" data-action="dimension-game-next">${s.index===9?'Ver resultado':'Siguiente ronda →'}</button>`:'<button type="button" class="button" data-action="dimension-game-check">Comprobar respuesta</button>'}</div>`;
 }
 function render(){return `<section id="dimension-game" class="dimension-game" aria-labelledby="dimension-game-title">${inner()}</section>`;}
 function refresh(focusId){
  const host=document.getElementById('dimension-game');if(!host)return;
  host.innerHTML=inner();renderMath(host);
  if(focusId)document.getElementById(focusId)?.focus({preventScroll:true});
 }
 function clearMessage(){const message=document.getElementById('dimension-game-message');if(message)message.textContent='';}
 function handleAction(button){
  if(!button?.dataset||button.disabled)return false;
  const {action,value}=button.dataset;
  if(!['dimension-game-start','dimension-game-choice','dimension-game-check','dimension-game-next'].includes(action))return false;
  const game=getSession();
  if(action==='dimension-game-choice'){
   if(game.choose('unit',value)){
    document.getElementById('dimension-game')?.querySelectorAll('[data-action="dimension-game-choice"]').forEach(choice=>{const selected=choice.dataset.value===value;choice.setAttribute('aria-pressed',String(selected));choice.classList.toggle('is-selected',selected);});
    clearMessage();
   }
  }else if(action==='dimension-game-start'){
   if(game.start())refresh('dimension-game-target');
  }else if(action==='dimension-game-check'){
   if(game.check())refresh('dimension-game-feedback');
   else{const message=document.getElementById('dimension-game-message');if(message)message.textContent=game.snapshot().message;}
  }else if(game.next())refresh(game.snapshot().phase==='finished'?'dimension-game-result':'dimension-game-target');
  return true;
 }
 function handleInput(input){
  if(input?.dataset?.action!=='dimension-game-exponent'||input.disabled)return false;
  if(getSession().choose(input.dataset.field,input.value)){
   const host=document.getElementById('dimension-game-preview');
   if(host){host.innerHTML=preview(getSession().snapshot().selected);renderMath(host);}
   clearMessage();
  }
  return true;
 }
 window.DimensionGame=Object.freeze({render,handleAction,handleInput,reset(){session=null;},createSession,formatDimension});
})();
