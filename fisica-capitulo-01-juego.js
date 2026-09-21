(function(){
 'use strict';
 const escape=value=>String(value??'').replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&#039;');
 const shuffle=(values,random)=>{const copy=[...values];for(let i=copy.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[copy[i],copy[j]]=[copy[j],copy[i]];}return copy;};
 const category=kind=>kind==='base'?'Fundamental':'Derivada';
 const math=dimension=>`<span class="magnitude-game-dimension">\\(${escape(dimension)}\\)</span>`;
 const fullyCorrect=answer=>answer.kindCorrect&&answer.dimensionCorrect&&answer.unitCorrect;
 function reviewFields(answer){
  const fields=[!answer.kindCorrect&&'la clasificación',!answer.dimensionCorrect&&'la dimensión',!answer.unitCorrect&&'la unidad'].filter(Boolean);
  return fields.length<2?fields.join(''):fields.slice(0,-1).join(', ')+' y '+fields[fields.length-1];
 }

 function createSession(items,random=Math.random){
  let state;
  const reset=()=>{state={phase:'ready',rounds:[],index:0,points:0,answers:[],kind:null,dimension:null,unit:null,graded:false,message:''};};
  reset();
  function start(){
   const pool=shuffle([...shuffle(items.filter(x=>x.kind==='base'),random).slice(0,5),...shuffle(items.filter(x=>x.kind==='derived'),random).slice(0,5)],random);
   if(pool.length!==10)return false;
   reset();state.phase='playing';
   const dimensions=[...new Set(items.map(item=>item.dimension))];
   state.rounds=pool.map(item=>{
    // Do not offer dimensionally equivalent units (e.g. joule and newton metre).
    const candidates=items.filter(x=>x.dimension!==item.dimension&&x.symbol!==item.symbol);
    const distractors=shuffle([...new Map(candidates.map(x=>[x.symbol,x])).values()],random).slice(0,2);
    // Shared dimensions (e.g. energy and torque) appear only once among the choices.
    const dimensionDistractors=shuffle(dimensions.filter(value=>value!==item.dimension),random).slice(0,2);
    return {item,options:shuffle([item,...distractors],random),dimensionOptions:shuffle([item.dimension,...dimensionDistractors],random)};
   });
   return true;
  }
  function choose(field,value){
   if(state.phase!=='playing'||state.graded)return false;
   const round=state.rounds[state.index];
   if(field==='kind'&&!['base','derived'].includes(value))return false;
   if(field==='dimension'&&!round.dimensionOptions.includes(value))return false;
   if(field==='unit'&&!round.options.some(x=>x.id===value))return false;
   if(!['kind','dimension','unit'].includes(field))return false;
   state[field]=value;state.message='';return true;
  }
  function check(){
   if(state.phase!=='playing'||state.graded)return false;
   if(!state.kind||!state.dimension||!state.unit){state.message='Elige una clasificación, una dimensión y una unidad antes de comprobar.';return false;}
   const {item}=state.rounds[state.index];
   const kindCorrect=state.kind===item.kind,dimensionCorrect=state.dimension===item.dimension,unitCorrect=state.unit===item.id;
   state.points+=Number(kindCorrect)+Number(dimensionCorrect)+Number(unitCorrect);state.graded=true;state.message='';
   state.answers.push({item,kindCorrect,dimensionCorrect,unitCorrect});return true;
  }
  function next(){
   if(state.phase!=='playing'||!state.graded)return false;
   if(state.index===state.rounds.length-1){state.phase='finished';return true;}
   state.index++;state.kind=null;state.dimension=null;state.unit=null;state.graded=false;state.message='';return true;
  }
  return {start,choose,check,next,reset,snapshot:()=>JSON.parse(JSON.stringify(state))};
 }

 let session;
 const getSession=()=>session||(session=createSession(window.MagnitudeExplorer?.items||[]));
 function choiceButton(field,value,label,selected,disabled){
  return `<button type="button" class="magnitude-game-choice${selected?' is-selected':''}" data-action="magnitude-game-choice" data-field="${field}" data-value="${escape(value)}" aria-pressed="${selected}" ${disabled?'disabled':''}>${label}</button>`;
 }
 function feedback(s,item){
  if(!s.graded)return '';
  const last=s.answers[s.answers.length-1],count=Number(last.kindCorrect)+Number(last.dimensionCorrect)+Number(last.unitCorrect);
  const message=count===3?'¡Las tres respuestas son correctas!':count===2?'Acertaste dos respuestas. Revisemos la que falta.':count===1?'Acertaste una respuesta. Revisemos las otras dos.':'Esta ronda es una oportunidad para aprender.';
  return `<div id="magnitude-game-feedback" class="magnitude-game-feedback ${fullyCorrect(last)?'is-correct':'needs-review'}" tabindex="-1"><strong>${message}</strong><p>${last.kindCorrect?'✓':'✗'} Clasificación: <b>${category(item.kind).toLowerCase()}</b>.<br>${last.dimensionCorrect?'✓':'✗'} Dimensión: ${math(item.dimension)}.<br>${last.unitCorrect?'✓':'✗'} Unidad SI: <b>${escape(item.unit)} (${escape(item.symbol)})</b>.</p><p>${escape(item.explanation)}</p></div>`;
 }
 function inner(){
  const s=getSession().snapshot();
  const header='<p class="eyebrow">Aprende jugando</p><h3 id="magnitude-game-title">Clasificación, dimensión y unidad</h3>';
  if(s.phase==='ready')return `${header}<p>Consulta los cuadros de arriba y pon a prueba lo aprendido. En cada ronda, identifica el tipo de magnitud, su dimensión y su unidad del SI.</p><div class="magnitude-game-badges"><span>10 rondas</span><span>30 puntos posibles</span><span>Sin límite de tiempo</span></div><p class="magnitude-game-note">Un punto por la clasificación, otro por la dimensión y otro por la unidad. Recibirás una explicación después de cada respuesta.</p><button type="button" class="button" data-action="magnitude-game-start">Comenzar juego →</button>`;
  if(s.phase==='finished'){
   const review=s.answers.filter(answer=>!fullyCorrect(answer));
   return `${header}<div class="magnitude-game-finish" tabindex="-1" id="magnitude-game-result"><p class="eyebrow">Partida completada</p><p class="magnitude-game-score">${s.points}<span> / 30 puntos</span></p><h4>${s.points===30?'¡Dominaste las magnitudes!':s.points>=21?'¡Buen trabajo! Sigue afinando tus respuestas.':'Ya diste un paso más. Repasa y vuelve a jugar.'}</h4><p>${s.answers.filter(fullyCorrect).length} de 10 rondas con las tres respuestas correctas.</p>${review.length?`<details><summary>Repasar mis respuestas (${review.length})</summary><ul>${review.map(answer=>`<li><strong>${escape(answer.item.name)}</strong>: ${category(answer.item.kind).toLowerCase()} · ${math(answer.item.dimension)} · ${escape(answer.item.unit)} (${escape(answer.item.symbol)}).<br><small>Revisa ${reviewFields(answer)}.</small></li>`).join('')}</ul></details>`:'<p>Reconociste la clasificación, la dimensión y la unidad en todas las rondas.</p>'}</div><button type="button" class="button" data-action="magnitude-game-start">Jugar otra vez ↻</button><p class="magnitude-game-note">Este juego es para repasar. Tu avance del capítulo se obtiene en la pestaña Práctica.</p>`;
  }
  const round=s.rounds[s.index],item=round.item;
  return `${header}<div class="magnitude-game-status"><span>Ronda ${s.index+1} de 10</span><strong>${s.points} / 30 puntos</strong></div><progress value="${s.answers.length}" max="10" aria-label="Rondas completadas">${s.answers.length} de 10</progress><div class="magnitude-game-target"><span>Tu magnitud</span><h4 id="magnitude-game-target" tabindex="-1">${escape(item.name)}</h4></div><fieldset><legend>¿Es fundamental o derivada?</legend><div class="magnitude-game-options">${choiceButton('kind','base','Fundamental',s.kind==='base',s.graded)}${choiceButton('kind','derived','Derivada',s.kind==='derived',s.graded)}</div></fieldset><fieldset><legend>¿Cuál es su dimensión?</legend><div class="magnitude-game-options dimension-options">${round.dimensionOptions.map(value=>choiceButton('dimension',value,math(value),s.dimension===value,s.graded)).join('')}</div></fieldset><fieldset><legend>¿Cuál es su unidad en el SI?</legend><div class="magnitude-game-options unit-options">${round.options.map(x=>choiceButton('unit',x.id,`<b>${escape(x.symbol)}</b><span>${escape(x.unit)}</span>`,s.unit===x.id,s.graded)).join('')}</div></fieldset><p class="magnitude-game-message" id="magnitude-game-message" role="status">${escape(s.message)}</p>${feedback(s,item)}<div class="actions">${s.graded?`<button type="button" class="button" data-action="magnitude-game-next">${s.index===9?'Ver resultado':'Siguiente ronda →'}</button>`:'<button type="button" class="button" data-action="magnitude-game-check">Comprobar respuesta</button>'}</div>`;
 }
 function render(){return `<section id="magnitude-game" class="magnitude-game" aria-labelledby="magnitude-game-title">${inner()}</section>`;}
 function refresh(focusId){
  const host=document.getElementById('magnitude-game');if(!host)return;
  host.innerHTML=inner();
  if(typeof window.renderMathInElement==='function')window.renderMathInElement(host,{delimiters:[{left:'\\(',right:'\\)',display:false}],throwOnError:false,trust:false});
  if(focusId)document.getElementById(focusId)?.focus({preventScroll:true});
 }
 function handleAction(button){
  if(!button?.dataset||button.disabled)return false;
  const {action,field,value}=button.dataset;
  if(!['magnitude-game-start','magnitude-game-choice','magnitude-game-check','magnitude-game-next'].includes(action))return false;
  const game=getSession();
  if(action==='magnitude-game-choice'){
   if(game.choose(field,value)){
    const host=document.getElementById('magnitude-game');
    host?.querySelectorAll(`[data-action="magnitude-game-choice"][data-field="${field}"]`).forEach(choice=>{const selected=choice.dataset.value===value;choice.setAttribute('aria-pressed',String(selected));choice.classList.toggle('is-selected',selected);});
    const message=document.getElementById('magnitude-game-message');if(message)message.textContent='';
   }
  }else if(action==='magnitude-game-start'){
   if(game.start())refresh('magnitude-game-target');
  }else if(action==='magnitude-game-check'){
   if(game.check())refresh('magnitude-game-feedback');
   else{const message=document.getElementById('magnitude-game-message');if(message)message.textContent=game.snapshot().message;}
  }else if(game.next())refresh(game.snapshot().phase==='finished'?'magnitude-game-result':'magnitude-game-target');
  return true;
 }
 window.MagnitudeGame={render,handleAction,reset(){session=null;},createSession};
})();
