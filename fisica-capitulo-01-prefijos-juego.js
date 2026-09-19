(function(){
 'use strict';
 const escape=value=>String(value??'').replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&#039;');
 const shuffle=(values,random)=>{const copy=[...values];for(let i=copy.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[copy[i],copy[j]]=[copy[j],copy[i]];}return copy;};
 const categories=['prefix','length','mass','time','powers'];
 const categoryNames={prefix:'Símbolos y potencias',length:'Longitud',mass:'Masa',time:'Tiempo',powers:'Área y volumen'};
 const question=(id,category,prompt,labels,explanation,power=1)=>Object.freeze({id,category,prompt,power,options:Object.freeze(labels.map((label,index)=>Object.freeze({id:`${id}-${index}`,label}))),answer:`${id}-0`,explanation});
 const questions=Object.freeze([
  question('mili','prefix','¿Qué factor representa el prefijo mili (m)?',['10⁻³','10⁶','10³','10⁻⁶'],'Mili se escribe con m minúscula y representa una milésima: 10⁻³ = 0,001. Mega se escribe M mayúscula y representa 10⁶.'),
  question('mega','prefix','¿Qué factor representa el prefijo mega (M)?',['10⁶','10⁻³','10³','10⁻⁶'],'Mega usa M mayúscula y equivale a un millón: 10⁶ = 1 000 000. La m minúscula corresponde a mili.'),
  question('micro','prefix','¿Cuál es el símbolo del prefijo micro (10⁻⁶)?',['µ','m','M','n'],'Micro se representa con µ y equivale a 10⁻⁶. Por ejemplo, 1 µm = 0,000001 m. Mili (m) es 10⁻³ y nano (n) es 10⁻⁹.'),
  question('kilo','prefix','¿Qué prefijo y símbolo representan el factor 10³?',['kilo (k)','mega (M)','mili (m)','hecto (h)'],'Kilo se escribe k minúscula y equivale a mil: 10³ = 1 000. Por eso 1 km = 1 000 m.'),
  question('kilometros','length','Convierte 2,5 km a metros.',['2 500 m','0,0025 m','250 m','25 000 m'],'Cada kilómetro contiene 1 000 metros. Multiplica por 10³: 2,5 × 1 000 = 2 500 m.'),
  question('centimetros','length','Convierte 450 cm a metros.',['4,5 m','45 000 m','45 m','0,45 m'],'Centi representa 10⁻²: 1 cm = 0,01 m. Por tanto, 450 × 0,01 = 4,5 m.'),
  question('milimetros','length','Convierte 0,008 m a milímetros.',['8 mm','0,000008 mm','0,8 mm','80 mm'],'Un metro contiene 1 000 milímetros. Multiplica por 1 000: 0,008 × 1 000 = 8 mm.'),
  question('micrometros','length','Convierte 3,2 µm a metros.',['0,0000032 m','3 200 000 m','0,0032 m','0,0000000032 m'],'Micro representa 10⁻⁶. Multiplica por una millonésima: 3,2 × 10⁻⁶ = 0,0000032 m.'),
  question('kilogramos','mass','Convierte 0,75 kg a gramos.',['750 g','0,00075 g','75 g','7 500 g'],'Un kilogramo equivale a 1 000 gramos. Entonces 0,75 × 1 000 = 750 g.'),
  question('miligramos','mass','Convierte 2 500 mg a gramos.',['2,5 g','2 500 000 g','25 g','0,25 g'],'Mili representa 10⁻³, de modo que 1 mg = 0,001 g. Multiplica: 2 500 × 0,001 = 2,5 g.'),
  question('kg-mg','mass','Convierte 0,004 kg a miligramos.',['4 000 mg','4 mg','0,000004 mg','400 mg'],'Primero: 0,004 kg × 1 000 = 4 g. Luego: 4 g × 1 000 = 4 000 mg. Entre kg y mg hay un factor de 10⁶.'),
  question('g-kg','mass','Convierte 120 g a kilogramos.',['0,12 kg','120 000 kg','1,2 kg','0,012 kg'],'Como 1 kg = 1 000 g, divide entre 1 000: 120 ÷ 1 000 = 0,12 kg.'),
  question('milisegundos','time','Convierte 350 ms a segundos.',['0,35 s','350 000 s','3,5 s','0,00035 s'],'Un milisegundo es una milésima de segundo: 1 ms = 10⁻³ s. Así, 350 × 0,001 = 0,35 s.'),
  question('microsegundos','time','Convierte 800 µs a segundos.',['0,0008 s','0,8 s','800 000 000 s','0,0000008 s'],'Micro representa 10⁻⁶: 800 × 0,000001 = 0,0008 s. No lo confundas con mili, que representa 10⁻³.'),
  question('s-ms','time','Convierte 0,025 s a milisegundos.',['25 ms','0,000025 ms','2,5 ms','250 ms'],'Un segundo contiene 1 000 milisegundos. Multiplica: 0,025 × 1 000 = 25 ms.'),
  question('ms-us','time','Convierte 3 ms a microsegundos.',['3 000 µs','0,003 µs','3 000 000 µs','300 µs'],'Un milisegundo equivale a 1 000 microsegundos: 10⁻³ ÷ 10⁻⁶ = 10³. Por eso 3 ms = 3 000 µs.'),
  question('area-cm','powers','Convierte 25 cm² a metros cuadrados.',['0,0025 m²','0,25 m²','250 000 m²','0,000025 m²'],'En un área se eleva al cuadrado todo el factor: 1 cm² = (10⁻² m)² = 10⁻⁴ m². Así, 25 × 10⁻⁴ = 0,0025 m²; no basta multiplicar por 10⁻².',2),
  question('area-m','powers','Convierte 2 m² a centímetros cuadrados.',['20 000 cm²','200 cm²','0,0002 cm²','2 000 000 cm²'],'Como 1 m = 100 cm, al elevar al cuadrado se obtiene 1 m² = (100 cm)² = 10 000 cm². Entonces 2 × 10 000 = 20 000 cm².',2),
  question('volumen-cm','powers','Convierte 8 cm³ a metros cúbicos.',['0,000008 m³','0,08 m³','0,0008 m³','8 000 000 m³'],'En un volumen se eleva al cubo todo el factor: 1 cm³ = (10⁻² m)³ = 10⁻⁶ m³. Entonces 8 × 10⁻⁶ = 0,000008 m³.',3),
  question('volumen-m','powers','Convierte 0,003 m³ a centímetros cúbicos.',['3 000 cm³','0,3 cm³','30 cm³','0,000000003 cm³'],'Como 1 m = 100 cm, un metro cúbico equivale a (100 cm)³ = 1 000 000 cm³. Multiplica: 0,003 × 1 000 000 = 3 000 cm³.',3)
 ]);

 function createSession(items=questions,random=Math.random){
  let state;
  const reset=()=>{state={phase:'ready',rounds:[],index:0,points:0,answers:[],selected:null,graded:false,message:''};};
  reset();
  function start(){
   // Two questions per category, moving from prefix recognition to squared/cubed conversions.
   const pools=categories.slice(0,-1).map(category=>items.filter(item=>item.category===category));
   const powerPools=[2,3].map(power=>items.filter(item=>item.category==='powers'&&item.power===power));
   if(pools.some(pool=>pool.length<2)||powerPools.some(pool=>!pool.length))return false;
   const chosen=[...pools.flatMap(pool=>shuffle(pool,random).slice(0,2)),...powerPools.map(pool=>shuffle(pool,random)[0])];
   reset();state.phase='playing';
   state.rounds=chosen.map(item=>({item,options:shuffle(item.options,random)}));
   return true;
  }
  function choose(value){
   if(state.phase!=='playing'||state.graded||!state.rounds[state.index].options.some(option=>option.id===value))return false;
   state.selected=value;state.message='';return true;
  }
  function check(){
   if(state.phase!=='playing'||state.graded)return false;
   if(!state.selected){state.message='Elige una respuesta antes de comprobar.';return false;}
   const {item}=state.rounds[state.index],correct=state.selected===item.answer;
   state.points+=Number(correct);state.graded=true;state.message='';
   state.answers.push({item,selected:state.selected,correct});return true;
  }
  function next(){
   if(state.phase!=='playing'||!state.graded)return false;
   if(state.index===state.rounds.length-1){state.phase='finished';return true;}
   state.index++;state.selected=null;state.graded=false;state.message='';return true;
  }
  return {start,choose,check,next,reset,snapshot:()=>JSON.parse(JSON.stringify(state))};
 }

 let session;
 const getSession=()=>session||(session=createSession());
 const answerLabel=(item,id)=>item.options.find(option=>option.id===id)?.label||'';
 function choiceButton(option,s,item){
  const selected=s.selected===option.id,correct=s.graded&&option.id===item.answer,incorrect=s.graded&&selected&&!correct;
  return `<button type="button" class="prefix-game-choice${selected?' is-selected':''}${correct?' is-correct':''}${incorrect?' is-incorrect':''}" data-action="prefix-game-choice" data-value="${escape(option.id)}" aria-pressed="${selected}" ${s.graded?'disabled':''}><span>${escape(option.label)}</span>${correct?'<small>✓ Respuesta correcta</small>':incorrect?'<small>✗ Tu respuesta</small>':''}</button>`;
 }
 function inner(){
  const s=getSession().snapshot();
  const header='<p class="eyebrow">Aprende jugando</p><h3 id="prefix-game-title">El reto de los prefijos</h3>';
  if(s.phase==='ready')return `${header}<p>Explora el cuadro de prefijos y practica cómo convertir unidades. Empieza con símbolos y potencias; termina con un reto de áreas y volúmenes.</p><div class="prefix-game-badges"><span>10 rondas</span><span>10 puntos posibles</span><span>Sin límite de tiempo</span></div><p class="prefix-game-note">Elige una respuesta y compruébala. Cada acierto vale un punto y cada ronda incluye una explicación.</p><button type="button" class="button" data-action="prefix-game-start">Comenzar juego →</button>`;
  if(s.phase==='finished'){
   const review=s.answers.filter(answer=>!answer.correct);
   return `${header}<div class="prefix-game-finish" tabindex="-1" id="prefix-game-result"><p class="eyebrow">Partida completada</p><p class="prefix-game-score">${s.points}<span> / 10 puntos</span></p><h4>${s.points===10?'¡Dominaste los prefijos y las conversiones!':s.points>=7?'¡Buen trabajo! Sigue practicando.':'Cada intento te ayuda a aprender.'}</h4><p>${s.points} de 10 respuestas correctas.</p>${review.length?`<details><summary>Repasar mis errores (${review.length})</summary><ol>${review.map(answer=>`<li><strong>${escape(answer.item.prompt)}</strong><p>Tu respuesta: ${escape(answerLabel(answer.item,answer.selected))}.<br>Respuesta correcta: <b>${escape(answerLabel(answer.item,answer.item.answer))}</b>.</p><p>${escape(answer.item.explanation)}</p></li>`).join('')}</ol></details>`:'<p>Reconociste los prefijos y aplicaste correctamente los factores de conversión.</p>'}</div><button type="button" class="button" data-action="prefix-game-start">Jugar otra vez ↻</button><p class="prefix-game-note">Este juego es para repasar. Tu avance del capítulo se obtiene en la pestaña Práctica.</p>`;
  }
  const round=s.rounds[s.index],item=round.item,last=s.answers[s.answers.length-1];
  const feedback=s.graded?`<div id="prefix-game-feedback" class="prefix-game-feedback ${last.correct?'is-correct':'needs-review'}" tabindex="-1" role="status"><strong>${last.correct?'✓ ¡Respuesta correcta!':'Revisemos la respuesta.'}</strong>${last.correct?'':`<p>Tu respuesta: ${escape(answerLabel(item,s.selected))}.</p>`}<p>Respuesta correcta: <b>${escape(answerLabel(item,item.answer))}</b>.</p><p>${escape(item.explanation)}</p></div>`:'';
  return `${header}<div class="prefix-game-status"><span>Ronda ${s.index+1} de 10</span><strong>${s.points} / 10 puntos</strong></div><progress value="${s.answers.length}" max="10" aria-label="Rondas completadas">${s.answers.length} de 10</progress><div class="prefix-game-target"><span>${categoryNames[item.category]}</span><h4 id="prefix-game-target" tabindex="-1">${escape(item.prompt)}</h4></div><fieldset><legend>Elige una respuesta</legend><div class="prefix-game-options">${round.options.map(option=>choiceButton(option,s,item)).join('')}</div></fieldset><p class="prefix-game-message" id="prefix-game-message" role="status" aria-live="polite">${escape(s.message)}</p>${feedback}<div class="actions">${s.graded?`<button type="button" class="button" data-action="prefix-game-next">${s.index===9?'Ver resultado':'Siguiente ronda →'}</button>`:'<button type="button" class="button" data-action="prefix-game-check">Comprobar respuesta</button>'}</div>`;
 }
 function render(){return `<section id="prefix-game" class="prefix-game" aria-labelledby="prefix-game-title">${inner()}</section>`;}
 function refresh(focusId){
  const host=document.getElementById('prefix-game');if(!host)return;
  host.innerHTML=inner();
  if(focusId)document.getElementById(focusId)?.focus({preventScroll:true});
 }
 function handleAction(button){
  if(!button?.dataset||button.disabled)return false;
  const {action,value}=button.dataset;
  if(!['prefix-game-start','prefix-game-choice','prefix-game-check','prefix-game-next'].includes(action))return false;
  const game=getSession();
  if(action==='prefix-game-choice'){
   if(game.choose(value)){
    document.getElementById('prefix-game')?.querySelectorAll('[data-action="prefix-game-choice"]').forEach(choice=>{const selected=choice.dataset.value===value;choice.setAttribute('aria-pressed',String(selected));choice.classList.toggle('is-selected',selected);});
    const message=document.getElementById('prefix-game-message');if(message)message.textContent='';
   }
  }else if(action==='prefix-game-start'){
   if(game.start())refresh('prefix-game-target');
  }else if(action==='prefix-game-check'){
   if(game.check())refresh('prefix-game-feedback');
   else{const message=document.getElementById('prefix-game-message');if(message)message.textContent=game.snapshot().message;}
  }else if(game.next())refresh(game.snapshot().phase==='finished'?'prefix-game-result':'prefix-game-target');
  return true;
 }
 window.PrefixGame={render,handleAction,reset(){session=null;},createSession,questions,bank:questions};
})();
