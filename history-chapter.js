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

function emptyProgress(){return {studyMode:null,currentItem:0,readingItem:0,activeTab:'theory',completedItems:[],attempts:{},itemScores:{},quizAnswers:{},quizResults:{},practiceAnswers:{},practiceResults:{},practiceMastered:[],examDraft:{},examResult:null,examBest:0,examAttempts:0,updatedMs:0};}
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
  p.readingItem=Number.isInteger(data.readingItem)?Math.max(0,Math.min(LESSONS.length-1,data.readingItem)):p.currentItem;
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
function cloudPayload(){return {...P,courseId:12,courseName:'Historia Universal',chapterNumber:CHAPTER_NUMBER,chapterName:CONTENT.title,unlockedItem:progressiveLimit(),percent:progressPercent(),chapterCompleted:chapterComplete(),schemaVersion:2,format:'reading',updatedAt:firebase.firestore.FieldValue.serverTimestamp()};}
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
function saveSoon(){clearTimeout(saveTimer);markChanged();saveTimer=setTimeout(()=>persist(),500);}
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

let readingObserver=null;
const chapterHref=n=>`historia-universal-capitulo-${String(n).padStart(2,'0')}.html?v=20260917-six5`;
function header(){return `<header class="topbar"><a class="brand" href="index.html?v=20260917-six5"><img src="assets/logo-sin-limites.jpg" width="40" height="40" alt="Logo de SIN LÍMITES"><span>SIN <em>LÍMITES</em></span></a><span class="course-label">Historia Universal · Capítulo ${CHAPTER_NUMBER}</span><a class="button secondary" href="index.html?course=12&v=20260917-six5">← Volver al temario</a></header>`;}
function chapterLinks(){return `<nav class="finish-actions" aria-label="Cambiar de capítulo"><a class="button secondary" href="${chapterHref(CHAPTER_NUMBER-1)}">← Capítulo ${CHAPTER_NUMBER-1}</a>${CHAPTER_NUMBER<6?`<a class="button" href="${chapterHref(CHAPTER_NUMBER+1)}">Capítulo ${CHAPTER_NUMBER+1} →</a>`:'<a class="button" href="index.html?course=12&v=20260917-six5">Volver al temario →</a>'}</nav>`;}
function contents(){return `<aside class="lesson-sidebar"><details class="lesson-index" open><summary>En este capítulo</summary><nav aria-label="Temas del capítulo"><a href="#learning-goals">Antes de empezar</a>${LESSONS.map((x,i)=>`<a href="#lesson-${i}"><span>${String(i+1).padStart(2,'0')}</span>${escapeHTML(x.title)}</a>`).join('')}<a class="activities-link" href="#activities">Actividades</a><a href="#practice">Práctica dirigida</a><a href="#exam">Evaluación</a></nav></details><p class="index-hint">Lee a tu ritmo y vuelve al tema que necesites consultar.</p></aside>`;}
function illustration(block){const v=block.illustration;if(!v)return '';return `<figure class="topic-image"><button class="image-button" data-action="image" data-id="${block.id}" aria-label="Ampliar imagen: ${escapeHTML(v.caption)}"><img src="${escapeHTML(v.src)}" alt="${escapeHTML(v.alt)}" width="1448" height="1086" loading="lazy" decoding="async"><span>Ampliar ⊕</span></button><figcaption>${escapeHTML(v.caption)}<small>Reconstrucción didáctica creada con IA</small></figcaption></figure>`;}
function theoryBlock(block){
 const text=block.paragraphs.map(p=>`<p>${escapeHTML(p)}</p>`).join('');
 const cards=block.cards?`<div class="concept-grid count-${block.cards.length}">${block.cards.map(c=>`<section class="concept-card"><h4>${escapeHTML(c.title)}</h4><p>${escapeHTML(c.text)}</p></section>`).join('')}</div>`:'';
 const table=block.rows?`<div class="table-wrap" tabindex="0" role="region" aria-label="${escapeHTML(block.title)}"><table><thead><tr>${block.headers.map(h=>`<th scope="col">${escapeHTML(h)}</th>`).join('')}</tr></thead><tbody>${block.rows.map(row=>`<tr>${row.map((x,i)=>i?`<td>${escapeHTML(x)}</td>`:`<th scope="row">${escapeHTML(x)}</th>`).join('')}</tr>`).join('')}</tbody></table></div>`:'';
 return `<section class="topic" id="${block.id}" tabindex="-1"><h3>${escapeHTML(block.title)}</h3><div class="topic-layout ${block.illustration?'with-image':''}"><div class="topic-prose">${text}</div>${illustration(block)}</div>${cards}${table}${block.takeaway?`<p class="takeaway">${escapeHTML(block.takeaway)}</p>`:''}</section>`;
}
function lessonView(i=P.currentItem){const x=LESSONS[i];return `<section class="reading-section" id="lesson-${i}" data-reading-item="${i}" tabindex="-1" aria-labelledby="lesson-title-${i}"><header class="section-heading"><span>${String(i+1).padStart(2,'0')}</span><h2 id="lesson-title-${i}">${escapeHTML(x.title)}</h2></header>${x.blocks.map(theoryBlock).join('')}${x.examples.map(e=>`<details class="guided-case"><summary>Caso guiado: ${escapeHTML(e.title)}</summary><p>${e.question}</p><ol>${e.steps.map(s=>`<li>${s}</li>`).join('')}</ol></details>`).join('')}</section>`;}
function chronology(){return `<details class="chapter-chronology"><summary>Cronología para orientarte</summary><ol class="era-list">${CONTENT.timeline.map(([date,text])=>`<li><span class="era-date">${escapeHTML(date)}</span><p>${escapeHTML(text)}</p></li>`).join('')}</ol><p class="question-note">Referencias aproximadas; los intervalos no están dibujados a escala.</p></details>`;}
function progressSummary(){return `${P.completedItems.length} de ${LESSONS.length} temas aprobados · Evaluación: ${P.examAttempts?P.examBest+'/10 (mejor nota)':'pendiente'}`;}
function finishContent(){return `<h2>${chapterComplete()?'¡Completaste el capítulo!':'Tu avance en el capítulo'}</h2><p>${progressSummary()}</p><p class="question-note">El capítulo se completa al aprobar los controles de cada tema y obtener al menos 7 de 10 en la evaluación. La práctica sirve para entrenar.</p>${chapterLinks()}`;}
function render(){
 if(!user)return;if(!P.studyMode){window.location.replace('index.html?chapter='+CONTENT.id+'&v=20260917-six5');return;}
 root.innerHTML=`${header()}<main id="chapter-content"><header class="chapter-hero" id="chapter-top"><div><p class="eyebrow">Historia Universal · Capítulo ${String(CHAPTER_NUMBER).padStart(2,'0')}</p><h1>${escapeHTML(CONTENT.title)}</h1><p class="hero-intro">${escapeHTML(CONTENT.intro)}</p></div><div class="hero-actions">${P.readingItem>0?`<button class="button secondary" data-action="resume" data-index="${P.readingItem}">Retomar lectura</button>`:''}<a class="button" href="#activities">Ir a las actividades →</a></div></header><section class="progress-panel" aria-label="Avance del capítulo"><div class="progress-heading"><span>Mi avance en el capítulo</span><strong id="progress-count">${progressPercent()}%</strong></div><progress id="chapter-progress" max="100" value="${progressPercent()}" aria-label="Avance del capítulo"></progress><p class="question-note" id="progress-description">${progressSummary()}</p><div class="save-state"><span id="save-status" role="status">${escapeHTML(saveMessage)}</span><button id="retry-save" data-action="sync" ${cloudReady?'hidden':''}>Reintentar sincronización</button></div></section><div class="reading-layout">${contents()}<article class="chapter-article"><section class="learning-goals" id="learning-goals"><p class="eyebrow">Antes de empezar</p><h2>¿Qué aprenderás?</h2><ul>${CONTENT.goals.map(g=>`<li><strong>${escapeHTML(g.title)}.</strong> ${escapeHTML(g.text)}</li>`).join('')}</ul>${chronology()}</section>${LESSONS.map((_,i)=>lessonView(i)).join('')}<section class="activities-section" id="activities" aria-labelledby="activities-title"><header class="section-heading"><h2 id="activities-title">Comprueba lo aprendido</h2></header><p class="section-intro">Cada tema tiene dos preguntas. Responde ambas correctamente para registrarlo como aprobado; puedes volver a intentarlo y tus aciertos se conservan.</p><p id="notice" class="feedback" role="alert" tabindex="-1" hidden></p><div id="activities-list">${LESSONS.map((_,i)=>topicQuiz(i)).join('')}</div></section><section class="assessment-section" id="practice"><details id="practice-details"><summary>Práctica dirigida</summary><div id="practice-body">${practiceView()}</div></details></section><section class="assessment-section" id="exam"><details id="exam-details"><summary>Evaluación del capítulo</summary><div id="exam-body">${examView()}</div></details></section><section class="chapter-finish" id="chapter-finish">${finishContent()}</section></article></div></main><footer class="page-footer">SIN LÍMITES · Historia Universal · ${escapeHTML(CONTENT.title)}</footer><dialog id="image-dialog" aria-labelledby="image-title"></dialog>`;
 observeReading();
}
function question(q,group,answers,index,lessonIndex=null){return `<fieldset class="question" id="question-${q.id}"><legend>${index+1}. ${q.prompt}</legend><div class="choices">${q.options.map((o,i)=>`<label class="choice"><input type="radio" name="${group}-${q.id}" value="${i}" data-group="${group}" data-question="${q.id}" ${lessonIndex===null?'':`data-lesson="${lessonIndex}"`} ${answers[q.id]===i?'checked':''}><span><b class="option-letter">${String.fromCharCode(65+i)}.</b> ${o}</span></label>`).join('')}</div></fieldset>`;}
function solution(q,chosen){return `<div class="check-result"><h4>${chosen===q.answer?'Correcto':'Revisa este resultado'} · Alternativa ${String.fromCharCode(65+q.answer)}</h4><div>${q.solution}</div></div>`;}
function topicQuiz(i=P.currentItem){
 const lesson=LESSONS[i],answers=P.quizAnswers[i]||{},previous=P.quizResults[i],done=P.completedItems.includes(i);
 const heading=`<header class="question-heading"><span class="question-number">${String(i+1).padStart(2,'0')}</span><h3>${escapeHTML(lesson.title)}</h3>${done?'<span class="approved">Aprobado</span>':''}</header>`;
 if(!canOpen(i))return `<section class="exercise-card locked" id="quiz-${i}" tabindex="-1">${heading}<p>Aprueba las actividades del tema anterior para habilitar este control.</p></section>`;
 return `<section class="exercise-card" id="quiz-${i}" tabindex="-1">${heading}${lesson.quiz.map((q,n)=>question(q,'quiz',answers,n,i)).join('')}<button class="button" data-action="check-quiz" data-index="${i}">Comprobar respuestas</button>${previous?`<div id="quiz-feedback-${i}" class="feedback ${resultScore(lesson.quiz,previous)===2?'correct':''}" role="status" tabindex="-1">${lesson.quiz.map(q=>solution(q,previous[q.id])).join('')}</div>`:''}<p class="question-note">${done?'La aprobación se conserva aunque vuelvas a responder.':'Puedes revisar la teoría y volver a intentarlo.'}</p></section>`;
}
function practiceView(){if(!canApply())return '<p class="section-intro">Aprueba los controles de todos los temas para habilitar la práctica.</p>';return `<p class="section-intro">Elige una alternativa y comprueba tu razonamiento. Esta práctica no bloquea la evaluación.</p><p class="takeaway">${P.practiceMastered.length} de ${CONTENT.practice.length} actividades resueltas correctamente.</p>${CONTENT.practice.map((q,i)=>`<section class="practice-item"><p class="tag">${escapeHTML(q.level)}${P.practiceMastered.includes(q.id)?' · Resuelta':''}</p>${question(q,'practice',P.practiceAnswers,i)}<button class="button secondary" data-action="check-practice" data-id="${q.id}">Comprobar actividad ${i+1}</button>${validOption(q,P.practiceResults[q.id])?`<div id="practice-feedback-${q.id}" class="feedback ${P.practiceResults[q.id]===q.answer?'correct':''}" role="status" tabindex="-1">${solution(q,P.practiceResults[q.id])}</div>`:''}</section>`).join('')}<button class="button" data-action="tab" data-value="exam">Ir a la evaluación →</button>`;}
function examView(){
 if(!canApply())return '<p class="section-intro">Aprueba los controles de todos los temas para habilitar la evaluación.</p>';
 const r=P.examResult;
 if(r)return `<div class="feedback ${r.score>=PASS_SCORE?'correct':''}" id="exam-result" tabindex="-1" role="status"><h3>${r.score>=PASS_SCORE?'¡Evaluación aprobada!':'Revisa y vuelve a intentarlo'}</h3><p class="result-number">${r.score} / 10</p><p>Mejor resultado: <b>${P.examBest}/10</b> · Intentos: ${P.examAttempts}</p></div><button class="button" data-action="retry-exam">Nuevo intento</button><h3 class="answer-key-title">Explicación de las respuestas</h3>${CONTENT.exam.map((q,i)=>`<section class="practice-item"><p class="question-prompt">${i+1}. ${q.prompt}</p><p>Marcaste ${String.fromCharCode(65+r.answers[q.id])}: ${q.options[r.answers[q.id]]}</p><div class="feedback ${r.answers[q.id]===q.answer?'correct':''}">${solution(q,r.answers[q.id])}</div></section>`).join('')}`;
 return `<p class="section-intro">Responde las diez preguntas y envía la evaluación para ver tu nota y las explicaciones. Se aprueba con 7 de 10; tu mejor resultado se conserva.</p><p class="takeaway">Respondidas: <b id="exam-count">${Object.keys(P.examDraft).length}</b>/10. Puedes salir y continuar después.</p>${CONTENT.exam.map((q,i)=>question(q,'exam',P.examDraft,i)).join('')}<button class="button" data-action="submit-exam">Enviar evaluación</button>`;
}
function renderAssessments(){
 const sections={'activities-list':()=>LESSONS.map((_,i)=>topicQuiz(i)).join(''),'practice-body':practiceView,'exam-body':examView,'chapter-finish':finishContent};
 for(const [id,html] of Object.entries(sections)){const el=document.getElementById(id);if(el)el.innerHTML=html();}
 const count=document.getElementById('progress-count');if(count)count.textContent=progressPercent()+'%';
 const bar=document.getElementById('chapter-progress');if(bar)bar.value=progressPercent();
 const desc=document.getElementById('progress-description');if(desc)desc.textContent=progressSummary();
 const n=document.getElementById('notice');if(n){n.textContent=notice;n.hidden=!notice;}
}
function scrollToBlock(id,focus=false){const el=document.getElementById(id);el?.scrollIntoView({behavior:'instant',block:'start'});if(focus)el?.focus?.({preventScroll:true});}
function showNotice(message,target='notice'){notice=message;renderAssessments();scrollToBlock(target,true);}
function goLesson(i){if(!canOpen(i))return;P.currentItem=i;P.readingItem=i;P.activeTab='theory';notice='';markChanged();renderAssessments();persist();scrollToBlock('lesson-'+i,true);}
function goTab(tab){if(!['theory','practice','exam','resources'].includes(tab)||(['practice','exam'].includes(tab)&&!canApply()))return;P.activeTab=tab;notice='';markChanged();renderAssessments();persist();if(['practice','exam'].includes(tab)){const el=document.getElementById(tab+'-details');if(el)el.open=true;scrollToBlock(tab);}else scrollToBlock('lesson-'+P.readingItem);}
function checkQuiz(i=P.currentItem){
 if(!Number.isInteger(i)||!canOpen(i))return;
 P.currentItem=i;P.activeTab='theory';
 const qs=LESSONS[i].quiz,answers=P.quizAnswers[i]||{};
 if(!qs.every(q=>validOption(q,answers[q.id])))return showNotice('Responde las dos preguntas del tema antes de comprobar.');
 const score=resultScore(qs,answers),key='item_'+(i+1);
 P.attempts[key]=(P.attempts[key]||0)+1;P.itemScores[key]=Math.max(P.itemScores[key]||0,score*50);P.quizResults[i]={...answers};
 if(score===2&&!P.completedItems.includes(i))P.completedItems.push(i);
 notice='';markChanged();renderAssessments();persist();scrollToBlock('quiz-feedback-'+i,true);
}
function checkPractice(id){
 if(!canApply())return;P.activeTab='practice';const q=CONTENT.practice.find(q=>q.id===id);if(!q)return;
 if(!validOption(q,P.practiceAnswers[id]))return showNotice('Marca una alternativa en la actividad que quieres comprobar.');
 P.practiceResults[id]=P.practiceAnswers[id];if(P.practiceAnswers[id]===q.answer&&!P.practiceMastered.includes(id))P.practiceMastered.push(id);
 notice='';markChanged();renderAssessments();persist();scrollToBlock('practice-feedback-'+id,true);
}
function submitExam(){
 if(!canApply()||P.examResult)return;P.activeTab='exam';
 const missing=CONTENT.exam.find(q=>!validOption(q,P.examDraft[q.id]));
 if(missing){showNotice('Falta responder una o más preguntas. Completa las diez antes de enviar.');scrollToBlock('question-'+missing.id);return;}
 const score=resultScore(CONTENT.exam,P.examDraft);P.examResult={answers:{...P.examDraft},score};P.examBest=Math.max(P.examBest,score);P.examAttempts++;
 notice='';markChanged();renderAssessments();persist();scrollToBlock('exam-result',true);
}
function retryExam(){if(!canApply()||!P.examResult)return;P.examDraft={};P.examResult=null;notice='';markChanged();renderAssessments();persist();scrollToBlock('exam');}
function observeReading(){
 readingObserver?.disconnect();if(typeof window.IntersectionObserver!=='function')return;
 readingObserver=new window.IntersectionObserver(entries=>{const active=entries.filter(e=>e.isIntersecting).sort((a,b)=>a.boundingClientRect.top-b.boundingClientRect.top)[0];if(!active||!user)return;const i=Number(active.target.dataset.readingItem);if(Number.isInteger(i)&&i>=0&&i<LESSONS.length&&i!==P.readingItem){P.readingItem=i;saveSoon();}},{rootMargin:'-12% 0px -45% 0px',threshold:0});
 document.querySelectorAll('[data-reading-item]').forEach(el=>readingObserver.observe(el));
}
function openImage(id){const block=LESSONS.flatMap(l=>l.blocks).find(b=>b.id===id),v=block?.illustration,d=document.getElementById('image-dialog');if(!v||!d)return;d.innerHTML=`<div class="dialog-heading"><h2 id="image-title">${escapeHTML(block.title)}</h2><button class="button secondary" data-action="close-image" aria-label="Cerrar imagen">Cerrar ×</button></div><img class="expanded-image" src="${escapeHTML(v.src)}" alt="${escapeHTML(v.alt)}"><p>${escapeHTML(v.caption)} · Reconstrucción didáctica creada con IA.</p>`;d.showModal();}
root.addEventListener('click',event=>{
 const button=event.target.closest('[data-action]');if(!button||button.disabled||!user)return;const {action,value,index,id}=button.dataset;
 if(action==='lesson')goLesson(Number(index));else if(action==='tab')goTab(value);else if(action==='check-quiz')checkQuiz(Number(index));else if(action==='check-practice')checkPractice(id);else if(action==='submit-exam')submitExam();else if(action==='retry-exam')retryExam();else if(action==='sync')retrySync();else if(action==='image')openImage(id);else if(action==='close-image')document.getElementById('image-dialog').close();else if(action==='resume')scrollToBlock('lesson-'+Number(index),true);
});
root.addEventListener('change',event=>{
 if(!user)return;const el=event.target,{group,question:id}=el.dataset;if(!id)return;const value=Number(el.value),i=Number(el.dataset.lesson);
 if(group==='quiz'){
  if(!Number.isInteger(i)||!canOpen(i))return;const q=LESSONS[i].quiz.find(q=>q.id===id);if(!q||!validOption(q,value))return;
  P.currentItem=i;P.activeTab='theory';P.quizAnswers[i]??={};P.quizAnswers[i][id]=value;
 }else if(group==='practice'&&canApply()){
  const q=CONTENT.practice.find(q=>q.id===id);if(!q||!validOption(q,value))return;P.activeTab='practice';P.practiceAnswers[id]=value;
 }else if(group==='exam'&&canApply()&&!P.examResult){
  const q=CONTENT.exam.find(q=>q.id===id);if(!q||!validOption(q,value))return;P.activeTab='exam';P.examDraft[id]=value;const count=document.getElementById('exam-count');if(count)count.textContent=Object.keys(P.examDraft).length;
 }else return;saveSoon();
});
window.addEventListener('pagehide',()=>{if(user){clearTimeout(saveTimer);persist();}});

async function signedIn(u){
  readingObserver?.disconnect();
  const epoch=++authEpoch;clearTimeout(saveTimer);user=u;P=emptyProgress();cloudReady=false;saveVersion=0;saveChain=Promise.resolve();notice='';
  if(!u){root.innerHTML=`${header()}<main id="chapter-content" class="guest-view"><p class="eyebrow">Historia Universal · Capítulo ${CHAPTER_NUMBER}</p><h1>${escapeHTML(CONTENT.title)}</h1><p>Inicia sesión en la academia para estudiar y guardar tu avance.</p><a class="button" href="index.html?chapter=${CONTENT.id}&v=20260917-six5">Continuar con Google</a></main>`;return;}
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
if(!window.firebase){root.innerHTML='<main class="guest-view"><h1>No se pudo cargar la sesión</h1><p>Revisa tu conexión y vuelve a abrir este capítulo.</p><a class="button" href="">Reintentar</a></main>';}
else{firebase.initializeApp(CONFIG);db=firebase.firestore();firebase.auth().onAuthStateChanged(signedIn);}




function refreshStudyMode(){
 if(!user||!window.StudyMode)return;
 const mode=window.StudyMode.get(user.uid);
 if(mode&&mode!==P.studyMode){P=normalized(P);notice='';markChanged();render();persist();}
}
window.addEventListener('pageshow',refreshStudyMode);
window.addEventListener('storage',event=>{if(user&&window.StudyMode&&event.key===window.StudyMode.key(user.uid))refreshStudyMode();});
