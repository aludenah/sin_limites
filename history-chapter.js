'use strict';
const CONTENT=window.HISTORY_CONTENT;
const CHAPTER_ID=CONTENT.progressId||CONTENT.id;
const CHAPTER_META=window.HISTORY_CHAPTERS.find(c=>c.number===CONTENT.number);
const HISTORY_CHAPTERS=window.HISTORY_CHAPTERS;
const CHAPTER_NUMBER=CONTENT.number;
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
  p.studyMode=window.StudyMode?.get(user?.uid)||(['free','progressive'].includes(data.studyMode)?data.studyMode:null);
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
function legacyLocal(uid){
  const records={};
  for(const source of CHAPTER_META.legacySources||[]){
    try{records[source.id]=JSON.parse(localStorage.getItem('sin-limites:'+uid+':'+source.id)||'null')?.progress||{};}catch{records[source.id]={};}
  }
  return records;
}
async function legacyCloud(uid){
  const records=legacyLocal(uid);
  await Promise.all((CHAPTER_META.legacySources||[]).map(async source=>{
    const snap=await db.collection('users').doc(uid).collection('progress').doc(source.id).get();
    records[source.id]=window.HistoryProgress.merge(snap.exists?snap.data():{},records[source.id]);
  }));
  return records;
}
function importLegacy(current,records){return normalized(window.HistoryProgress.combine(CHAPTER_META,current,records));}
function localKey(){return 'sin-limites:'+user.uid+':'+CHAPTER_ID;}
function readLocal(){try{return JSON.parse(localStorage.getItem(localKey())||'null');}catch{return null;}}
function storeLocal(pending=true){
  try{localStorage.setItem(localKey(),JSON.stringify({progress:P,pending}));return true;}
  catch{return false;}
}
function record(uid=user.uid){return db.collection('users').doc(uid).collection('progress').doc(CHAPTER_ID);}
function cloudPayload(){return {...P,courseId:12,courseName:'Historia Universal',chapterNumber:CHAPTER_NUMBER,chapterName:CONTENT.title,unlockedItem:progressiveLimit(),percent:progressPercent(),chapterCompleted:chapterComplete(),schemaVersion:1,updatedAt:firebase.firestore.FieldValue.serverTimestamp()};}
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
    const [snap,legacy]=await Promise.all([record().get(),legacyCloud(user.uid)]);if(epoch!==authEpoch)return;
    P=importLegacy(mergeProgress(snap.exists?snap.data():{},P),legacy);cloudReady=true;
    markChanged();render();await persist();
  }catch(error){if(epoch!==authEpoch)return;cloudReady=false;setSaveStatus('No se pudo conectar. Tu avance local se conserva si el navegador permite guardarlo.');}
}
function header(){return `<a class="skip" href="#chapter-content">Ir al contenido</a><header class="top"><div class="wrap"><a class="brand" href="index.html"><span class="logo"><img src="assets/logo-sin-limites.jpg" alt="Logo de SIN LÍMITES" width="56" height="56" style="display:block;width:100%;height:100%;object-fit:contain;border-radius:inherit"></span><span>SIN <em>LÍMITES</em><small>ACADEMIA VIRTUAL</small></span></a><a class="back" href="index.html?course=12">← Temario de Historia Universal</a></div></header>`;}
function modePicker(){return `${header()}<main id="chapter-content" class="access card"><p class="eyebrow">Historia Universal · Capítulo ${CHAPTER_NUMBER} de ${window.HISTORY_SYLLABUS.length}</p><h1>${escapeHTML(CONTENT.title)}</h1><p>${CONTENT.intro}</p><p class="muted">Elige tu recorrido. Puedes cambiarlo después sin perder tus resultados.</p><div class="modes"><button class="mode-card" data-action="mode" data-value="progressive"><b>Estudio progresivo</b><span>Aprueba las dos preguntas de cada tema para abrir el siguiente. Después accede a la práctica y la evaluación.</span></button><button class="mode-card free" data-action="mode" data-value="free"><b>Estudio libre</b><span>Explora cualquier tema, la práctica y la evaluación desde el inicio.</span></button></div><p class="resource-note" style="margin-top:24px">El avance cuenta los ${LESSONS.length} temas aprobados y la evaluación con al menos 7 de 10 respuestas correctas. La práctica es de entrenamiento.</p><a href="index.html?course=12">Elegir otro capítulo</a><p class="save-line" id="save-status" role="status">${escapeHTML(saveMessage)}</p></main>`;}
function chronology(){return `<section class="chronology"><h3>Referencias para ubicarnos</h3><ol>${CONTENT.timeline.map(([date,text])=>`<li><b>${date}</b><span>${text}</span></li>`).join('')}</ol><p class="resource-note">Guía de referencias; los intervalos no están dibujados a escala.</p></section>`;}
function lessonView(){const i=P.currentItem,x=LESSONS[i];return `<p class="eyebrow">Tema ${i+1} de ${LESSONS.length} · ${x.subtitle}</p><h2>${x.title}</h2><div class="goal"><strong>Al terminar:</strong> ${x.goal}</div><div class="content">${x.body}</div><div class="key"><b>Qué debes recordar</b>${x.key}</div>${x.examples.map(e=>`<section class="example"><p class="eyebrow">Caso guiado</p><h3>${e.title}</h3><p>${e.question}</p><details><summary>Ver el análisis paso a paso</summary><ol>${e.steps.map(s=>`<li>${s}</li>`).join('')}</ol></details></section>`).join('')}${topicQuiz()}<div class="actions"><button class="button secondary" data-action="lesson" data-index="${i-1}" ${i===0?'disabled':''}>← Tema anterior</button>${i<LESSONS.length-1?`<button class="button" data-action="lesson" data-index="${i+1}" ${!canOpen(i+1)?'disabled':''}>Siguiente tema →</button>`:`<button class="button" data-action="tab" data-value="practice" ${!canApply()?'disabled':''}>Ir a la práctica →</button>`}</div>`;}
function practiceView(){return `<p class="eyebrow">Aplica lo aprendido</p><h2>Práctica dirigida</h2><p>Cinco actividades con explicación. Marca una alternativa y comprueba tu razonamiento. Tus aciertos se conservan.</p><div class="goal"><b>${P.practiceMastered.length} de ${CONTENT.practice.length}</b> actividades resueltas correctamente. Esta práctica no bloquea la evaluación.</div>${CONTENT.practice.map((q,i)=>`<section class="practice-item"><span class="level">${q.level}${P.practiceMastered.includes(q.id)?' · ✓ Resuelto':''}</span>${question(q,'practice',P.practiceAnswers,i)}<button class="button secondary" data-action="check-practice" data-id="${q.id}">Comprobar actividad ${i+1}</button>${validOption(q,P.practiceResults[q.id])?`<div class="feedback ${P.practiceResults[q.id]===q.answer?'success':''}">${solution(q,P.practiceResults[q.id])}</div>`:''}</section>`).join('')}<button class="button" data-action="tab" data-value="exam">Ir a la evaluación →</button>`;}
function chapterLinks(){return `<nav class="chapter-links" aria-label="Cambiar de capítulo"><a href="historia-universal-capitulo-${String(CHAPTER_NUMBER-1).padStart(2,'0')}.html">← Capítulo ${CHAPTER_NUMBER-1}</a>${CHAPTER_NUMBER<6?`<a href="historia-universal-capitulo-${String(CHAPTER_NUMBER+1).padStart(2,'0')}.html">Capítulo ${CHAPTER_NUMBER+1} →</a>`:'<a href="index.html?course=12">Volver al temario →</a>'}</nav>`;}
function examView(){const r=P.examResult;if(r)return `<p class="eyebrow">Evaluación · Resultado</p><h2>${r.score>=PASS_SCORE?'¡Evaluación aprobada!':'Una oportunidad para seguir aprendiendo'}</h2><div class="feedback ${r.score>=PASS_SCORE?'success':''}"><p class="result-number">${r.score} / 10</p><p>Mejor resultado: <b>${P.examBest}/10</b> · Intentos: ${P.examAttempts}</p><p>${r.score>=PASS_SCORE?'Has superado el mínimo de 7 respuestas correctas.':'Revisa las explicaciones y vuelve a intentarlo.'}</p></div>${chapterComplete()?'<div class="completion"><b>✓ Capítulo completado</b><p>Aprobaste todos los temas y la evaluación. ¡Buen trabajo!</p></div>':`<p class="muted">Temas aprobados: ${P.completedItems.length}/${LESSONS.length}. Para completar el capítulo también debes aprobar todos los controles de teoría.</p>`}<div class="actions"><button class="button" data-action="retry-exam">Nuevo intento</button><button class="button secondary" data-action="tab" data-value="theory">Repasar la teoría</button></div>${chapterLinks()}<h3 style="margin-top:32px">Solucionario de tu intento</h3>${CONTENT.exam.map((q,i)=>`<section class="practice-item"><p><b>${i+1}.</b> ${q.prompt}</p><p class="muted">Marcaste ${String.fromCharCode(65+r.answers[q.id])}: ${q.options[r.answers[q.id]]}</p><div class="feedback ${r.answers[q.id]===q.answer?'success':''}">${solution(q,r.answers[q.id])}</div></section>`).join('')}`;return `<p class="eyebrow">Comprueba tu aprendizaje</p><h2>Evaluación del capítulo</h2><p>Responde las diez preguntas. Al enviar verás la nota y el solucionario. Se aprueba con <b>7 de 10</b>; puedes reintentar y se conserva tu mejor resultado.</p><div class="goal">Respondidas: <b id="exam-count">${Object.keys(P.examDraft).length}</b>/10. Puedes salir y continuar después.</div>${CONTENT.exam.map((q,i)=>question(q,'exam',P.examDraft,i)).join('')}<button class="button" data-action="submit-exam">Enviar evaluación</button>`;}
function resourcesView(){return chronology()+CONTENT.resources;}
function render(){if(!user)return;if(!P.studyMode){root.innerHTML=modePicker();return;}const percent=progressPercent();root.innerHTML=`${header()}<section class="hero history-hero"><div class="wrap"><div><p class="eyebrow">Historia Universal · Capítulo ${CHAPTER_NUMBER} de ${window.HISTORY_SYLLABUS.length}</p><h1>${escapeHTML(CONTENT.title)}</h1><p>${CONTENT.intro}</p><div class="badges"><span class="badge">${LESSONS.length} temas</span><span class="badge">${LESSONS.length} casos guiados</span><span class="badge">${LESSONS.length*2+15} preguntas</span></div></div><div class="history-seal" aria-hidden="true"><span>HISTORIA UNIVERSAL</span><b>${String(CHAPTER_NUMBER).padStart(2,'0')}</b><small>Evidencias · Procesos · Contextos</small></div></div></section><div class="wrap"><section class="card chapter-picker"><label for="chapter-select">Capítulos desarrollados</label><select id="chapter-select">${HISTORY_CHAPTERS.map(c=>`<option value="${c.number}" ${c.number===CHAPTER_NUMBER?'selected':''}>${c.number}. ${escapeHTML(c.title)}</option>`).join('')}</select></section><section class="card overview"><div><div class="progress-head"><span>Mi avance en el capítulo</span><strong>${percent}%</strong></div><progress max="100" value="${percent}" aria-label="Avance del capítulo">${percent}%</progress><small>${P.completedItems.length}/${LESSONS.length} temas aprobados · Evaluación: ${P.examBest>=PASS_SCORE?'aprobada':P.examAttempts?P.examBest+'/10 (mejor nota)':'pendiente'}</small><p id="save-status" class="save-line ${cloudReady?'':'warning'}" role="status">${escapeHTML(saveMessage)}</p><button id="retry-save" class="button secondary small" data-action="sync" ${cloudReady?'hidden':''}>Reintentar sincronización</button></div><div><label class="mode-label" for="study-mode">Modo de estudio</label><select id="study-mode"><option value="progressive" ${P.studyMode==='progressive'?'selected':''}>Progresivo · avanza tema a tema</option><option value="free" ${P.studyMode==='free'?'selected':''}>Libre · explora sin candados</option></select><small>${P.studyMode==='free'?'Los controles registran tu aprendizaje; puedes explorar todo.':'Aprueba 2 de 2 preguntas para abrir el siguiente tema.'}</small></div></section><div class="layout"><aside class="card sidebar"><p class="eyebrow">Tu ruta de aprendizaje</p><nav class="route" aria-label="Temas del capítulo">${side()}</nav><p class="hint">El 100% requiere todos los temas y al menos 7/10 en la evaluación. La práctica sirve para entrenar.</p></aside><main class="workspace" id="chapter-content"><nav class="card tabs" aria-label="Secciones del capítulo">${[['theory','Teoría'],['practice','Práctica'],['exam','Evaluación'],['resources','Materiales']].map(([id,title])=>`<button data-action="tab" data-value="${id}" class="${P.activeTab===id?'active':''}" ${P.activeTab===id?'aria-current="page"':''} ${['practice','exam'].includes(id)&&!canApply()?'disabled':''}>${title}${['practice','exam'].includes(id)&&!canApply()?' 🔒':''}</button>`).join('')}</nav><article class="card article">${notice?`<div role="alert" class="feedback" id="notice">${escapeHTML(notice)}</div>`:''}${P.activeTab==='theory'?lessonView():P.activeTab==='practice'?practiceView():P.activeTab==='exam'?examView():resourcesView()}</article>${chapterLinks()}</main></div></div><footer class="footer">SIN LÍMITES · Historia Universal · ${escapeHTML(CONTENT.title)}</footer>`;}

function chooseMode(mode){
  if(!['free','progressive'].includes(mode))return;
  if(window.StudyMode){window.StudyMode.choose(user.uid,mode);window.StudyMode.save(user.uid,db);}
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
  if(el.id==='chapter-select'){const n=Number(el.value);if(HISTORY_CHAPTERS.some(c=>c.number===n))window.location.assign('historia-universal-capitulo-'+String(n).padStart(2,'0')+'.html');return;}
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

window.addEventListener('pagehide',()=>{if(user&&saveTimer){clearTimeout(saveTimer);persist();}});


async function signedIn(u){
  const epoch=++authEpoch;clearTimeout(saveTimer);user=u;P=emptyProgress();cloudReady=false;saveVersion=0;saveChain=Promise.resolve();notice='';
  if(!u){root.innerHTML=`${header()}<main id="chapter-content" class="access card"><p class="eyebrow">Historia Universal · Capítulo ${CHAPTER_NUMBER}</p><h1>${escapeHTML(CONTENT.title)}</h1><p>Inicia sesión en la academia para estudiar y guardar tu avance.</p><a class="button" href="index.html?chapter=${CONTENT.id}">Continuar con Google</a></main>`;return;}
 if(window.StudyMode&&!await window.StudyMode.requireChoice(u.uid,db,CONTENT.id,()=>epoch===authEpoch))return;
 if(epoch!==authEpoch)return;
  const local=readLocal();P=importLegacy(local?.progress||{},legacyLocal(u.uid));
  try{
    const [snap,legacy]=await Promise.all([record().get(),legacyCloud(user.uid)]);if(epoch!==authEpoch)return;
    P=importLegacy(mergeProgress(snap.exists?snap.data():{},P),legacy);cloudReady=true;setSaveStatus('Tu avance está actualizado.');
  }catch(error){if(epoch!==authEpoch)return;console.error('Chapter load:',error);setSaveStatus('No se pudo cargar el avance en la nube. Puedes continuar y reintentar la sincronización.');}
  render();
  if(cloudReady&&(local?.pending||CHAPTER_META.legacySources.length)){markChanged();await persist();}
  if(epoch!==authEpoch)return;
  // The navigation document lets the catalog and teacher panel resume this chapter.
  const navigation={catalogVersion:3,lastCourseId:12,lastCourseName:'Historia Universal',lastTopicIndex:CHAPTER_NUMBER-1,lastChapterNumber:CHAPTER_NUMBER,lastChapterName:CONTENT.title};
  try{localStorage.setItem('academia-sm-state',JSON.stringify({catalogVersion:3,activeCourseId:12,activeTopicIndex:CHAPTER_NUMBER-1,activeTopicName:CONTENT.title}));}catch{}
  if(cloudReady)try{await db.collection('users').doc(u.uid).collection('progress').doc('navigation').set({...navigation,updatedAt:firebase.firestore.FieldValue.serverTimestamp()},{merge:true});}catch(error){console.error('Navigation save:',error);}
}
if(!window.firebase){root.innerHTML='<main class="access card"><h1>No se pudo cargar la sesión</h1><p>Revisa tu conexión y vuelve a abrir este capítulo.</p><a class="button" href="">Reintentar</a></main>';}
else{firebase.initializeApp(CONFIG);db=firebase.firestore();firebase.auth().onAuthStateChanged(signedIn);}




function refreshStudyMode(){
 if(!user||!window.StudyMode)return;
 const mode=window.StudyMode.get(user.uid);
 if(mode&&mode!==P.studyMode){P=normalized(P);notice='';markChanged();render();persist();}
}
window.addEventListener('pageshow',refreshStudyMode);
window.addEventListener('storage',event=>{if(user&&window.StudyMode&&event.key===window.StudyMode.key(user.uid))refreshStudyMode();});
