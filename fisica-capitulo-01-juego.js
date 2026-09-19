(function(){
 'use strict';
 const escape=value=>String(value??'').replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&#039;');
 const shuffle=(values,random)=>{const copy=[...values];for(let i=copy.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[copy[i],copy[j]]=[copy[j],copy[i]];}return copy;};
 const category=kind=>kind==='base'?'Fundamental':'Derivada';

 function createSession(items,random=Math.random){
  let state;
  const reset=()=>{state={phase:'ready',rounds:[],index:0,points:0,answers:[],kind:null,unit:null,graded:false,message:''};};
  reset();
  function start(){
   const pool=shuffle([...shuffle(items.filter(x=>x.kind==='base'),random).slice(0,5),...shuffle(items.filter(x=>x.kind==='derived'),random).slice(0,5)],random);
   if(pool.length!==10)return false;
   reset();state.phase='playing';
   state.rounds=pool.map(item=>{
    // Do not offer dimensionally equivalent units (e.g. joule and newton metre).
    const candidates=items.filter(x=>x.dimension!==item.dimension&&x.symbol!==item.symbol);
    const distractors=shuffle([...new Map(candidates.map(x=>[x.symbol,x])).values()],random).slice(0,2);
    return {item,options:shuffle([item,...distractors],random)};
   });
   return true;
  }
  function choose(field,value){
   if(state.phase!=='playing'||state.graded)return false;
   if(field==='kind'&&!['base','derived'].includes(value))return false;
   if(field==='unit'&&!state.rounds[state.index].options.some(x=>x.id===value))return false;
   if(!['kind','unit'].includes(field))return false;
   state[field]=value;state.message='';return true;
  }
  function check(){
   if(state.phase!=='playing'||state.graded)return false;
   if(!state.kind||!state.unit){state.message='Elige una clasificación y una unidad antes de comprobar.';return false;}
   const {item}=state.rounds[state.index],kindCorrect=state.kind===item.kind,unitCorrect=state.unit===item.id;
   state.points+=Number(kindCorrect)+Number(unitCorrect);state.graded=true;state.message='';
   state.answers.push({item,kindCorrect,unitCorrect});return true;
  }
  function next(){
   if(state.phase!=='playing'||!state.graded)return false;
   if(state.index===state.rounds.length-1){state.phase='finished';return true;}
   state.index++;state.kind=null;state.unit=null;state.graded=false;state.message='';return true;
  }
  return {start,choose,check,next,reset,snapshot:()=>JSON.parse(JSON.stringify(state))};
 }

 let session;
 const getSession=()=>session||(session=createSession(window.MagnitudeExplorer?.items||[]));
 function choiceButton(field,value,label,selected,disabled){
  return `<button type="button" class="magnitude-game-choice${selected?' is-selected':''}" data-action="magnitude-game-choice" data-field="${field}" data-value="${escape(value)}" aria-pressed="${selected}" ${disabled?'disabled':''}>${label}</button>`;
 }
 function inner(){
  const s=getSession().snapshot();
  const header='<p class="eyebrow">Aprende jugando</p><h3 id="magnitude-game-title">Clasifica y encuentra su unidad</h3>';
  if(s.phase==='ready')return `${header}<p>Investiga los cuadros de arriba y pon a prueba lo aprendido. En cada ronda, identifica el tipo de magnitud y su unidad del SI.</p><div class="magnitude-game-badges"><span>10 rondas</span><span>20 puntos posibles</span><span>Sin límite de tiempo</span></div><p class="magnitude-game-note">Un punto por la clasificación y otro por la unidad. Recibirás una explicación después de cada respuesta.</p><button type="button" class="button" data-action="magnitude-game-start">Comenzar juego →</button>`;
  if(s.phase==='finished'){
   const review=s.answers.filter(x=>!x.kindCorrect||!x.unitCorrect);
   return `${header}<div class="magnitude-game-finish" tabindex="-1" id="magnitude-game-result"><p class="eyebrow">Partida completada</p><p class="magnitude-game-score">${s.points}<span> / 20 puntos</span></p><h4>${s.points===20?'¡Dominaste las magnitudes!':s.points>=14?'¡Buen trabajo! Sigue afinando tus respuestas.':'Ya diste un paso más. Repasa y vuelve a jugar.'}</h4><p>${s.answers.filter(x=>x.kindCorrect&&x.unitCorrect).length} de 10 rondas con las dos respuestas correctas.</p>${review.length?`<details><summary>Repasar mis respuestas (${review.length})</summary><ul>${review.map(x=>`<li><strong>${escape(x.item.name)}</strong>: ${category(x.item.kind).toLowerCase()} · ${escape(x.item.unit)} (${escape(x.item.symbol)}).<br><small>Revisa ${!x.kindCorrect&&!x.unitCorrect?'la clasificación y la unidad':!x.kindCorrect?'la clasificación':'la unidad'}.</small></li>`).join('')}</ul></details>`:'<p>Reconociste las magnitudes y sus unidades en todas las rondas.</p>'}</div><button type="button" class="button" data-action="magnitude-game-start">Jugar otra vez ↻</button><p class="magnitude-game-note">Este juego es para repasar. Tu avance del capítulo se obtiene en la pestaña Práctica.</p>`;
  }
  const round=s.rounds[s.index],item=round.item,last=s.answers[s.answers.length-1];
  const feedback=s.graded?`<div id="magnitude-game-feedback" class="magnitude-game-feedback ${last.kindCorrect&&last.unitCorrect?'is-correct':'needs-review'}" tabindex="-1"><strong>${last.kindCorrect&&last.unitCorrect?'¡Las dos respuestas son correctas!':last.kindCorrect||last.unitCorrect?'Acertaste una respuesta. Revisemos la otra.':'Esta ronda es una oportunidad para aprender.'}</strong><p>${last.kindCorrect?'✓':'✗'} Clasificación: <b>${category(item.kind).toLowerCase()}</b>.<br>${last.unitCorrect?'✓':'✗'} Unidad SI: <b>${escape(item.unit)} (${escape(item.symbol)})</b>.</p><p>${escape(item.explanation)}</p></div>`:'';
  return `${header}<div class="magnitude-game-status"><span>Ronda ${s.index+1} de 10</span><strong>${s.points} / 20 puntos</strong></div><progress value="${s.answers.length}" max="10" aria-label="Rondas completadas">${s.answers.length} de 10</progress><div class="magnitude-game-target"><span>Tu magnitud</span><h4 id="magnitude-game-target" tabindex="-1">${escape(item.name)}</h4></div><fieldset><legend>¿Es fundamental o derivada?</legend><div class="magnitude-game-options">${choiceButton('kind','base','Fundamental',s.kind==='base',s.graded)}${choiceButton('kind','derived','Derivada',s.kind==='derived',s.graded)}</div></fieldset><fieldset><legend>¿Cuál es su unidad en el SI?</legend><div class="magnitude-game-options unit-options">${round.options.map(x=>choiceButton('unit',x.id,`<b>${escape(x.symbol)}</b><span>${escape(x.unit)}</span>`,s.unit===x.id,s.graded)).join('')}</div></fieldset><p class="magnitude-game-message" id="magnitude-game-message" role="status">${escape(s.message)}</p>${feedback}<div class="actions">${s.graded?`<button type="button" class="button" data-action="magnitude-game-next">${s.index===9?'Ver resultado':'Siguiente ronda →'}</button>`:'<button type="button" class="button" data-action="magnitude-game-check">Comprobar respuesta</button>'}</div>`;
 }
 function render(){return `<section id="magnitude-game" class="magnitude-game" aria-labelledby="magnitude-game-title">${inner()}</section>`;}
 function refresh(focusId){
  const host=document.getElementById('magnitude-game');if(!host)return;
  host.innerHTML=inner();
  if(focusId)document.getElementById(focusId)?.focus({preventScroll:true});
 }
 function handleAction(button){
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
