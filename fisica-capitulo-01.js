'use strict';
const CONTENT=window.DIMENSIONAL_CONTENT;
const CHAPTER_ID='fisica-capitulo-01';
const LESSONS=CONTENT.lessons;
const PASS_SCORE=7;
const CONFIG={apiKey:'AIzaSyCurhmnJ21SMqGM6G54t8QM8jcqO8jV0OE',authDomain:'sin-limites-12f07.firebaseapp.com',projectId:'sin-limites-12f07',storageBucket:'sin-limites-12f07.firebasestorage.app',messagingSenderId:'757098079298',appId:'1:757098079298:web:068a9a7ea93149bfef79db'};
const root=document.getElementById('chapter-app');
const escapeHTML=value=>String(value??'').replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&#039;');
let user=null,db=null,cloudReady=false,saveChain=Promise.resolve(),saveVersion=0,authEpoch=0;
let saveMessage='',notice='',P=emptyProgress(),saveTimer=null;

function emptyProgress(){return {studyMode:null,currentItem:0,activeTab:'theory',completedItems:[],attempts:{},itemScores:{},quizAnswers:{},quizResults:{},practiceAnswers:{},practiceResults:{},practiceMastered:[],examDraft:{},examResult:null,examBest:0,examAttempts:0,updatedMs:0};}
function validOption(q,value){return Number.isInteger(value)&&value>=0&&value<q.options.length;}
function cleanAnswers(questions,answers={}){return Object.fromEntries(questions.filter(q=>validOption(q,answers?.[q.id])).map(q=>[q.id,answers[q.id]]));}
function resultScore(questions,answers){return questions.reduce((score,q)=>score+(answers[q.id]===q.answer?1:0),0);}
function normalized(data={}){
  const p={...emptyProgress()};
  p.studyMode=['free','progressive'].includes(data.studyMode)?data.studyMode:null;
  p.completedItems=[...new Set(Array.isArray(data.completedItems)?data.completedItems:[])].filter(n=>Number.isInteger(n)&&n>=0&&n<LESSONS.length).sort((a,b)=>a-b);
  for(const field of ['attempts','itemScores'])for(let i=0;i<LESSONS.length;i++){
    const key='item_'+(i+1),value=Number(data[field]?.[key]);
    if(Number.isFinite(value)&&value>=0)p[field][key]=field==='itemScores'?Math.min(100,value):Math.floor(value);
  }
  for(const [i,lesson] of LESSONS.entries()){
    p.quizAnswers[i]=cleanAnswers(lesson.quiz,data.quizAnswers?.[i]);
    if(data.quizResults?.[i])p.quizResults[i]=cleanAnswers(lesson.quiz,data.quizResults[i]);
  }
  p.practiceAnswers=cleanAnswers(CONTENT.practice,data.practiceAnswers);
  p.practiceResults=cleanAnswers(CONTENT.practice,data.practiceResults);
  p.practiceMastered=[...new Set(Array.isArray(data.practiceMastered)?data.practiceMastered:[])].filter(id=>CONTENT.practice.some(q=>q.id===id));
  p.examDraft=cleanAnswers(CONTENT.exam,data.examDraft);
  if(data.examResult?.answers){
    const answers=cleanAnswers(CONTENT.exam,data.examResult.answers);
    if(Object.keys(answers).length===CONTENT.exam.length)p.examResult={answers,score:resultScore(CONTENT.exam,answers)};
  }
  p.examBest=Math.max(p.examResult?.score||0,Math.min(CONTENT.exam.length,Math.max(0,Math.floor(Number(data.examBest)||0))));
  p.examAttempts=Math.max(0,Math.floor(Number(data.examAttempts)||0));
  p.updatedMs=Math.max(0,Number(data.updatedMs)||0);
  p.currentItem=Number.isInteger(data.currentItem)?Math.max(0,Math.min(LESSONS.length-1,data.currentItem)):0;
  p.activeTab=['theory','practice','exam','resources'].includes(data.activeTab)?data.activeTab:'theory';
  if(p.studyMode!=='free'&&p.currentItem>progressiveLimit(p))p.currentItem=progressiveLimit(p);
  if(p.studyMode!=='free'&&p.completedItems.length<LESSONS.length&&['practice','exam'].includes(p.activeTab))p.activeTab='theory';
  return p;
}
function progressiveLimit(p=P){let next=0;while(next<LESSONS.length&&p.completedItems.includes(next))next++;return Math.min(next,LESSONS.length-1);}
function canOpen(i){return Number.isInteger(i)&&i>=0&&i<LESSONS.length&&(P.studyMode==='free'||i<=progressiveLimit());}
function canApply(){return P.studyMode==='free'||P.completedItems.length===LESSONS.length;}
function progressPercent(p=P){return Math.round((p.completedItems.length+(p.examBest>=PASS_SCORE?1:0))/(LESSONS.length+1)*100);}
function chapterComplete(p=P){return p.completedItems.length===LESSONS.length&&p.examBest>=PASS_SCORE;}
function mergeProgress(remote,local){
  const a=normalized(remote),b=normalized(local);
  const latest=b.updatedMs>a.updatedMs?b:a;
  const merged={...latest,completedItems:[...new Set([...a.completedItems,...b.completedItems])],practiceMastered:[...new Set([...a.practiceMastered,...b.practiceMastered])],examBest:Math.max(a.examBest,b.examBest),examAttempts:Math.max(a.examAttempts,b.examAttempts),attempts:{},itemScores:{}};
  for(const field of ['attempts','itemScores'])for(const key of new Set([...Object.keys(a[field]),...Object.keys(b[field])]))merged[field][key]=Math.max(a[field][key]||0,b[field][key]||0);
  return normalized(merged);
}
function localKey(){return 'sin-limites:'+user.uid+':'+CHAPTER_ID;}
function readLocal(){try{return JSON.parse(localStorage.getItem(localKey())||'null');}catch{return null;}}
function storeLocal(pending=true){
  try{localStorage.setItem(localKey(),JSON.stringify({progress:P,pending}));return true;}
  catch{return false;}
}
function record(uid=user.uid){return db.collection('users').doc(uid).collection('progress').doc(CHAPTER_ID);}
function cloudPayload(){return {...P,courseId:16,courseName:'Física',chapterNumber:1,chapterName:CONTENT.title,unlockedItem:progressiveLimit(),percent:progressPercent(),chapterCompleted:chapterComplete(),schemaVersion:1,updatedAt:firebase.firestore.FieldValue.serverTimestamp()};}
function setSaveStatus(message){saveMessage=message;const el=document.getElementById('save-status');if(el){el.textContent=message;el.classList.toggle('warning',!cloudReady);}const retry=document.getElementById('retry-save');if(retry)retry.hidden=cloudReady;}
function markChanged(){
  P.updatedMs=Date.now();saveVersion++;
  const localOK=storeLocal(true);
  setSaveStatus(cloudReady?'Guardando tu avance…':localOK?'Avance guardado en este dispositivo. Pendiente de sincronizar.':'No se pudo guardar. Mantén esta página abierta y reintenta.');
}
function persist(){
  clearTimeout(saveTimer);
  if(!user||!cloudReady)return Promise.resolve();
  const snapshot=cloudPayload(),version=saveVersion,uid=user.uid,epoch=authEpoch;
  saveChain=saveChain.catch(()=>{}).then(async()=>{
    if(epoch!==authEpoch||!cloudReady)return;
    try{
      await record(uid).set(snapshot,{merge:true});
      if(epoch===authEpoch&&version===saveVersion){storeLocal(false);setSaveStatus('Avance guardado y sincronizado.');}
    }catch(error){
      console.error('Chapter save:',error);
      if(epoch===authEpoch){cloudReady=false;const ok=storeLocal(true);setSaveStatus(ok?'Avance guardado en este dispositivo. No se pudo sincronizar.':'No se pudo guardar. Mantén esta página abierta y reintenta.');}
    }
  });
  return saveChain;
}
function saveSoon(){markChanged();saveTimer=setTimeout(()=>persist(),500);}
async function retrySync(){
  if(!user)return;
  const epoch=authEpoch;
  setSaveStatus('Sincronizando…');
  try{
    const snap=await record().get();if(epoch!==authEpoch)return;
    P=mergeProgress(snap.exists?snap.data():{},P);cloudReady=true;
    markChanged();render();await persist();
  }catch(error){if(epoch!==authEpoch)return;cloudReady=false;setSaveStatus('No se pudo conectar. Tu avance local se conserva si el navegador permite guardarlo.');}
}
function renderMath(){
  if(typeof window.renderMathInElement==='function')window.renderMathInElement(root,{delimiters:[{left:'\\[',right:'\\]',display:true},{left:'\\(',right:'\\)',display:false}],throwOnError:false,trust:false});
}
function header(){return '<a class="skip" href="#chapter-content">Ir al contenido</a><header class="top"><div class="wrap"><a class="brand" href="index.html"><span class="logo"><img src="assets/logo-sin-limites.jpg" alt="Logo de SIN LÍMITES" width="56" height="56" style="display:block;width:100%;height:100%;object-fit:contain;border-radius:inherit"></span><span>SIN <em>LÍMITES</em><small>ACADEMIA VIRTUAL</small></span></a><a class="back" href="index.html?course=16">← Los 25 capítulos de Física</a></div></header>';}
function modePicker(){return `${header()}<main id="chapter-content" class="access card"><p class="eyebrow">Física · Capítulo 01 de 25</p><h1>Análisis dimensional</h1><p>Aprende a leer las dimensiones de una fórmula y a comprobar si tiene sentido físico.</p><p class="muted">Elige tu recorrido. Puedes cambiarlo después sin perder tus resultados.</p><div class="modes"><button class="mode-card" data-action="mode" data-value="progressive"><b>Estudio progresivo</b><span>Aprueba las dos preguntas de cada tema para abrir el siguiente. Después accede a la práctica y la evaluación.</span></button><button class="mode-card free" data-action="mode" data-value="free"><b>Estudio libre</b><span>Explora cualquier tema, la práctica y la evaluación desde el inicio. Avanza en el orden que prefieras.</span></button></div><p class="resource-note" style="margin-top:24px">El avance cuenta los 6 temas aprobados y una evaluación con al menos 7 de 10 respuestas correctas. La práctica es de entrenamiento.</p><p class="save-line" id="save-status" role="status">${escapeHTML(saveMessage)}</p></main>`;}
function chooseMode(mode){
  if(!['free','progressive'].includes(mode))return;
  P.studyMode=mode;P=normalized(P);notice='';markChanged();render();persist();
}
function side(){return LESSONS.map((lesson,i)=>{
  const done=P.completedItems.includes(i),active=P.activeTab==='theory'&&P.currentItem===i;
  return `<button data-action="lesson" data-index="${i}" ${!canOpen(i)?'disabled':''} ${active?'aria-current="step"':''} class="${active?'active ':''}${done?'done':''}"><span class="stepno">${done?'✓':!canOpen(i)?'🔒':String(i+1).padStart(2,'0')}</span><span>${lesson.title}</span></button>`;
}).join('');}
function question(q,group,answers,index){return `<fieldset class="question" id="question-${q.id}"><legend>${index+1}. ${q.prompt}</legend><div class="choices">${q.options.map((o,i)=>`<label class="choice"><input type="radio" name="${group}-${q.id}" value="${i}" data-group="${group}" data-question="${q.id}" ${answers[q.id]===i?'checked':''}><span><b class="option-letter">${String.fromCharCode(65+i)}.</b> ${o}</span></label>`).join('')}</div></fieldset>`;}
function solution(q,chosen){return `<div class="check-result"><h4>${chosen===q.answer?'✓ Correcto':'Revisa este resultado'} · Alternativa ${String.fromCharCode(65+q.answer)}</h4><div>${q.solution}</div></div>`;}
function topicQuiz(){
  const lesson=LESSONS[P.currentItem],answers=P.quizAnswers[P.currentItem]||{},previous=P.quizResults[P.currentItem],done=P.completedItems.includes(P.currentItem);
  return `<section class="quiz"><p class="eyebrow">Comprueba lo aprendido</p><h3>Dos preguntas para consolidar este tema</h3><p class="muted">Responde ambas correctamente para registrar el tema como aprobado. Puedes reintentarlo.</p>${done?'<div class="feedback success">✓ Tema aprobado. Puedes repasarlo y volver a responder sin perder el avance.</div>':''}${lesson.quiz.map((q,i)=>question(q,'quiz',answers,i)).join('')}<button class="button" data-action="check-quiz">Comprobar respuestas</button>${previous?`<div class="feedback ${resultScore(lesson.quiz,previous)===2?'success':''}" role="status">${lesson.quiz.map(q=>solution(q,previous[q.id])).join('')}</div>`:''}</section>`;
}
function lab(){return '<section class="lab"><p class="eyebrow">Explora una fórmula</p><h3>¿Qué potencia de tiempo falta?</h3><p>La velocidad se expresa como \\(v=v_0+at^n\\). Cambia el exponente para que el término de aceleración tenga dimensión de velocidad.</p><label for="power-slider">Exponente n: <output id="power-value">0</output></label><input id="power-slider" type="range" min="0" max="3" step="1" value="0"><div id="lab-result" aria-live="polite"></div></section>';}
function updateLab(n){
  const output=document.getElementById('power-value'),el=document.getElementById('lab-result');if(!el)return;
  output.textContent=n;el.innerHTML=`<div class="equation">\\[[at^{${n}}]=LT^{${n-2}}\\]</div><p>${n===1?'✓ Con n = 1, ambos términos tienen dimensión de velocidad.':'Todavía no coincide con '+String.raw`\(LT^{-1}\)`+'. Prueba otro exponente.'}</p>`;renderMath();
}
function lessonView(){
  const i=P.currentItem,x=LESSONS[i];
  return `<p class="eyebrow">Tema ${i+1} de ${LESSONS.length} · ${x.subtitle}</p><h2>${x.title}</h2><div class="goal"><strong>Al terminar:</strong> ${x.goal}</div><div class="content">${x.body}</div><div class="key"><b>Qué debes recordar</b>${x.key}</div>${x.examples.map(e=>`<section class="example"><p class="eyebrow">Ejemplo resuelto</p><h3>${e.title}</h3><p>${e.question}</p><ol>${e.steps.map(s=>`<li>${s}</li>`).join('')}</ol></section>`).join('')}${i===3?lab():''}${topicQuiz()}<div class="actions"><button class="button secondary" data-action="lesson" data-index="${i-1}" ${i===0?'disabled':''}>← Tema anterior</button>${i<LESSONS.length-1?`<button class="button" data-action="lesson" data-index="${i+1}" ${!canOpen(i+1)?'disabled':''}>Siguiente tema →</button>`:`<button class="button" data-action="tab" data-value="practice" ${!canApply()?'disabled':''}>Ir a la práctica →</button>`}</div>`;
}
function practiceView(){return `<p class="eyebrow">Entrena y comprende</p><h2>Práctica dirigida</h2><p>Diez ejercicios de menor a mayor dificultad. Marca una alternativa y comprueba el procedimiento. Tus aciertos se conservan.</p><div class="goal"><b>${P.practiceMastered.length} de ${CONTENT.practice.length}</b> ejercicios resueltos correctamente. Esta práctica no bloquea la evaluación.</div>${CONTENT.practice.map((q,i)=>`<section class="practice-item"><span class="level">${q.level}${P.practiceMastered.includes(q.id)?' · ✓ Resuelto':''}</span>${question(q,'practice',P.practiceAnswers,i)}<button class="button secondary" data-action="check-practice" data-id="${q.id}">Comprobar ejercicio ${i+1}</button>${validOption(q,P.practiceResults[q.id])?`<div class="feedback ${P.practiceResults[q.id]===q.answer?'success':''}">${solution(q,P.practiceResults[q.id])}</div>`:''}</section>`).join('')}<button class="button" data-action="tab" data-value="exam">Ir a la evaluación →</button>`;}
function examView(){
  const r=P.examResult;
  if(r)return `<p class="eyebrow">Evaluación · Resultado</p><h2>${r.score>=PASS_SCORE?'¡Evaluación aprobada!':'Una oportunidad para seguir aprendiendo'}</h2><div class="feedback ${r.score>=PASS_SCORE?'success':''}"><p class="result-number">${r.score} / ${CONTENT.exam.length}</p><p>Mejor resultado: <b>${P.examBest}/10</b> · Intentos: ${P.examAttempts}</p><p>${r.score>=PASS_SCORE?'Has superado el mínimo de 7 respuestas correctas.':'Revisa las soluciones, repasa los temas necesarios y vuelve a intentarlo.'}</p></div>${chapterComplete()?'<div class="completion"><b>✓ Capítulo completado</b><p>Aprobaste los seis temas y la evaluación. ¡Buen trabajo!</p></div>':`<p class="muted">Temas aprobados: ${P.completedItems.length}/6. Para completar el capítulo también debes aprobar los seis controles de teoría.</p>`}<div class="actions"><button class="button" data-action="retry-exam">Nuevo intento</button><button class="button secondary" data-action="tab" data-value="theory">Repasar la teoría</button></div><h3 style="margin-top:32px">Solucionario de tu intento</h3>${CONTENT.exam.map((q,i)=>`<section class="practice-item"><p><b>${i+1}.</b> ${q.prompt}</p><p class="muted">Marcaste ${String.fromCharCode(65+r.answers[q.id])}: ${q.options[r.answers[q.id]]}</p><div class="feedback ${r.answers[q.id]===q.answer?'success':''}">${solution(q,r.answers[q.id])}</div></section>`).join('')}`;
  return `<p class="eyebrow">Aplica lo aprendido</p><h2>Evaluación del capítulo</h2><p>Responde las diez preguntas. Al enviar verás la nota y el solucionario completo. Se aprueba con <b>7 de 10</b>; puedes reintentar y se conserva tu mejor resultado.</p><div class="goal">Respondidas: <b id="exam-count">${Object.keys(P.examDraft).length}</b>/10. Puedes salir y continuar después.</div>${CONTENT.exam.map((q,i)=>question(q,'exam',P.examDraft,i)).join('')}<button class="button" data-action="submit-exam">Enviar evaluación</button>`;
}
function resourcesView(){return `<p class="eyebrow">Consulta rápida</p><h2>Formulario y estrategia</h2><p>Usa estas tablas para repasar. Intenta reconstruir cada fórmula dimensional antes de consultarla.</p>${CONTENT.derivedTable}<h3>Reglas esenciales</h3><div class="equation">\\[[AB]=[A][B],\\qquad[A/B]=\\frac{[A]}{[B]},\\qquad[A^n]=[A]^n\\]</div><ul class="resource-list"><li>En una suma o resta, todos los términos deben tener la misma dimensión.</li><li>Los números puros tienen dimensión uno. Las constantes físicas pueden tener dimensiones.</li><li>El argumento de una función trigonométrica, exponencial o logarítmica debe ser adimensional.</li><li>Una ecuación homogénea puede ser físicamente incorrecta. Los factores numéricos no se obtienen solo por dimensiones.</li></ul><h3>Ruta para resolver un problema</h3><ol class="resource-list"><li>Identifica qué representa cada símbolo.</li><li>Escribe sus dimensiones a partir de relaciones conocidas.</li><li>Sustituye y aplica las leyes de exponentes.</li><li>Usa homogeneidad o compara exponentes de M, L y T.</li><li>Comprueba el resultado y sus límites físicos.</li></ol><details><summary>Las siete magnitudes base del SI</summary>${CONTENT.baseTable}</details><h3>Referencias para ampliar</h3><ul class="resource-list"><li><a href="https://www.bipm.org/en/measurement-units" target="_blank" rel="noopener noreferrer">BIPM · Sistema Internacional de Unidades</a></li><li><a href="https://openstax.org/books/university-physics-volume-1/pages/1-4-dimensional-analysis" target="_blank" rel="noopener noreferrer">OpenStax · Análisis dimensional (en inglés)</a></li></ul><p class="resource-note">Teoría, ejemplos y ejercicios redactados para este capítulo. Las referencias permiten ampliar los fundamentos.</p>`;}
function render(){
  if(!user)return;
  if(!P.studyMode){root.innerHTML=modePicker();return;}
  const percent=progressPercent();
  root.innerHTML=`${header()}<section class="hero"><div class="wrap"><div><p class="eyebrow">Física · Capítulo 01 de 25</p><h1>Análisis dimensional</h1><p>Descubre el lenguaje de las magnitudes. Comprueba fórmulas, encuentra dimensiones y construye relaciones físicas.</p><div class="badges"><span class="badge">6 temas</span><span class="badge">8 ejemplos resueltos</span><span class="badge">32 preguntas</span></div></div><div class="dimension-visual" aria-label="Masa, longitud y tiempo: las tres dimensiones principales de la mecánica"><div class="letters"><div class="letter"><b>M</b><small>Masa</small></div><div class="letter"><b>L</b><small>Longitud</small></div><div class="letter"><b>T</b><small>Tiempo</small></div></div><div class="equation">\\[[F]=MLT^{-2}\\]</div></div></div></section><div class="wrap"><section class="card overview"><div><div class="progress-head"><span>Mi avance en el capítulo</span><strong>${percent}%</strong></div><progress max="100" value="${percent}" aria-label="Avance del capítulo">${percent}%</progress><small>${P.completedItems.length}/6 temas aprobados · Evaluación: ${P.examBest>=PASS_SCORE?'aprobada':P.examAttempts?P.examBest+'/10 (mejor nota)':'pendiente'}</small><p id="save-status" class="save-line ${cloudReady?'':'warning'}" role="status">${escapeHTML(saveMessage)}</p><button id="retry-save" class="button secondary small" data-action="sync" ${cloudReady?'hidden':''}>Reintentar sincronización</button></div><div><label class="mode-label" for="study-mode">Modo de estudio</label><select id="study-mode"><option value="progressive" ${P.studyMode==='progressive'?'selected':''}>Progresivo · avanza tema a tema</option><option value="free" ${P.studyMode==='free'?'selected':''}>Libre · explora sin candados</option></select><small>${P.studyMode==='free'?'Los controles registran tu aprendizaje; puedes explorar todo.':'Aprueba 2 de 2 preguntas para abrir el siguiente tema.'}</small></div></section><div class="layout"><aside class="card sidebar"><p class="eyebrow">Tu ruta de aprendizaje</p><nav class="route" aria-label="Temas del capítulo">${side()}</nav><p class="hint">El 100% requiere los seis temas y al menos 7/10 en la evaluación. La práctica sirve para entrenar.</p></aside><main class="workspace" id="chapter-content"><nav class="card tabs" aria-label="Secciones del capítulo">${[['theory','Teoría'],['practice','Práctica'],['exam','Evaluación'],['resources','Materiales']].map(([id,title])=>`<button data-action="tab" data-value="${id}" class="${P.activeTab===id?'active':''}" ${P.activeTab===id?'aria-current="page"':''} ${['practice','exam'].includes(id)&&!canApply()?'disabled':''}>${title}${['practice','exam'].includes(id)&&!canApply()?' 🔒':''}</button>`).join('')}</nav><article class="card article">${notice?`<div role="alert" class="feedback" id="notice">${escapeHTML(notice)}</div>`:''}${P.activeTab==='theory'?lessonView():P.activeTab==='practice'?practiceView():P.activeTab==='exam'?examView():resourcesView()}</article></main></div></div><footer class="footer">SIN LÍMITES · Física · Análisis dimensional</footer>`;
  renderMath();if(P.activeTab==='theory'&&P.currentItem===3)updateLab(0);
}
function scrollContent(){document.getElementById('chapter-content')?.scrollIntoView({behavior:'smooth',block:'start'});}
function showNotice(message){notice=message;render();document.getElementById('notice')?.scrollIntoView({block:'center',behavior:'smooth'});}
function goLesson(i){if(!canOpen(i))return;P.currentItem=i;P.activeTab='theory';notice='';markChanged();render();persist();scrollContent();}
function goTab(tab){if(!['theory','practice','exam','resources'].includes(tab)||(['practice','exam'].includes(tab)&&!canApply()))return;P.activeTab=tab;notice='';markChanged();render();persist();scrollContent();}
function checkQuiz(){
  const i=P.currentItem;if(P.activeTab!=='theory'||!canOpen(i))return;
  const qs=LESSONS[i].quiz,answers=P.quizAnswers[i]||{};
  if(!qs.every(q=>validOption(q,answers[q.id])))return showNotice('Responde las dos preguntas antes de comprobar.');
  const score=resultScore(qs,answers),key='item_'+(i+1);
  P.attempts[key]=(P.attempts[key]||0)+1;P.itemScores[key]=Math.max(P.itemScores[key]||0,score*50);P.quizResults[i]={...answers};
  if(score===2&&!P.completedItems.includes(i))P.completedItems.push(i);
  notice='';markChanged();render();persist();document.querySelector('.quiz .feedback:last-child')?.scrollIntoView({block:'center',behavior:'smooth'});
}
function checkPractice(id){
  if(P.activeTab!=='practice'||!canApply())return;
  const q=CONTENT.practice.find(q=>q.id===id);if(!q)return;
  if(!validOption(q,P.practiceAnswers[id]))return showNotice('Marca una alternativa en el ejercicio que quieres comprobar.');
  P.practiceResults[id]=P.practiceAnswers[id];if(P.practiceAnswers[id]===q.answer&&!P.practiceMastered.includes(id))P.practiceMastered.push(id);
  notice='';markChanged();render();persist();document.getElementById('question-'+id)?.scrollIntoView({block:'center',behavior:'smooth'});
}
function submitExam(){
  if(P.activeTab!=='exam'||!canApply()||P.examResult)return;
  const missing=CONTENT.exam.find(q=>!validOption(q,P.examDraft[q.id]));
  if(missing){showNotice('Falta responder una o más preguntas. Completa las diez antes de enviar.');document.getElementById('question-'+missing.id)?.scrollIntoView({block:'center',behavior:'smooth'});return;}
  const score=resultScore(CONTENT.exam,P.examDraft);
  P.examResult={answers:{...P.examDraft},score};P.examBest=Math.max(P.examBest,score);P.examAttempts++;
  notice='';markChanged();render();persist();scrollContent();
}
function retryExam(){if(!canApply()||!P.examResult)return;P.examDraft={};P.examResult=null;notice='';markChanged();render();persist();scrollContent();}

root.addEventListener('click',event=>{
  const button=event.target.closest('[data-action]');if(!button||button.disabled||!user)return;
  const {action,value,index,id}=button.dataset;
  if(action==='mode')chooseMode(value);
  else if(action==='lesson')goLesson(Number(index));
  else if(action==='tab')goTab(value);
  else if(action==='check-quiz')checkQuiz();
  else if(action==='check-practice')checkPractice(id);
  else if(action==='submit-exam')submitExam();
  else if(action==='retry-exam')retryExam();
  else if(action==='sync')retrySync();
});
root.addEventListener('change',event=>{
  if(!user)return;const el=event.target;
  if(el.id==='study-mode'){chooseMode(el.value);return;}
  const {group,question:id}=el.dataset;if(!id)return;
  const value=Number(el.value);
  const questions=group==='quiz'?LESSONS[P.currentItem].quiz:group==='practice'?CONTENT.practice:group==='exam'?CONTENT.exam:[];
  const q=questions.find(q=>q.id===id);if(!q||!validOption(q,value))return;
  if(group==='quiz'){
    P.quizAnswers[P.currentItem]??={};P.quizAnswers[P.currentItem][id]=value;
  }else if(group==='practice'&&canApply())P.practiceAnswers[id]=value;
  else if(group==='exam'&&canApply()&&!P.examResult){P.examDraft[id]=value;const count=document.getElementById('exam-count');if(count)count.textContent=Object.keys(P.examDraft).length;}
  else return;
  saveSoon();
});
root.addEventListener('input',event=>{if(event.target.id==='power-slider')updateLab(Number(event.target.value));});
window.addEventListener('pagehide',()=>{if(user&&saveTimer){clearTimeout(saveTimer);persist();}});

async function signedIn(u){
  const epoch=++authEpoch;clearTimeout(saveTimer);user=u;P=emptyProgress();cloudReady=false;saveVersion=0;saveChain=Promise.resolve();notice='';
  if(!u){root.innerHTML=`${header()}<main id="chapter-content" class="access card"><p class="eyebrow">Física · Capítulo 1</p><h1>Análisis dimensional</h1><p>Inicia sesión en la academia para estudiar y guardar tu avance.</p><a class="button" href="index.html?chapter=fisica-capitulo-01">Continuar con Google</a></main>`;return;}
  const local=readLocal();P=normalized(local?.progress||{});
  try{
    const snap=await record().get();if(epoch!==authEpoch)return;
    P=mergeProgress(snap.exists?snap.data():{},P);cloudReady=true;setSaveStatus('Tu avance está actualizado.');
  }catch(error){if(epoch!==authEpoch)return;console.error('Chapter load:',error);setSaveStatus('No se pudo cargar el avance en la nube. Puedes continuar y reintentar la sincronización.');}
  render();
  if(cloudReady&&local?.pending){markChanged();await persist();}
  if(epoch!==authEpoch)return;
  // The navigation document lets the catalog and teacher panel resume this chapter.
  const navigation={catalogVersion:2,lastCourseId:16,lastCourseName:'Física',lastTopicIndex:0,lastChapterNumber:1,lastChapterName:CONTENT.title};
  try{localStorage.setItem('academia-sm-state',JSON.stringify({catalogVersion:2,activeCourseId:16,activeTopicIndex:0,activeTopicName:CONTENT.title}));}catch{}
  if(cloudReady)try{await db.collection('users').doc(u.uid).collection('progress').doc('navigation').set({...navigation,updatedAt:firebase.firestore.FieldValue.serverTimestamp()},{merge:true});}catch(error){console.error('Navigation save:',error);}
}
if(!window.firebase){root.innerHTML='<main class="access card"><h1>No se pudo cargar la sesión</h1><p>Revisa tu conexión y vuelve a abrir este capítulo.</p><a class="button" href="fisica-capitulo-01.html">Reintentar</a></main>';}
else{firebase.initializeApp(CONFIG);db=firebase.firestore();firebase.auth().onAuthStateChanged(signedIn);}

