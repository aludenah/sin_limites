'use strict';
const DECK=window.HISTORY_READING;
const SLIDES=DECK.blocks;
const QUESTIONS=SLIDES.filter(s=>s.question).map(s=>s.question);
const ROOT=document.getElementById('reading-app');
const CFG={apiKey:'AIzaSyCurhmnJ21SMqGM6G54t8QM8jcqO8jV0OE',authDomain:'sin-limites-12f07.firebaseapp.com',projectId:'sin-limites-12f07',storageBucket:'sin-limites-12f07.firebasestorage.app',messagingSenderId:'757098079298',appId:'1:757098079298:web:068a9a7ea93149bfef79db'};
const esc=v=>String(v??'').replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&#039;');
let user=null,db=null,authEpoch=0,cloudReady=false,saveChain=Promise.resolve(),saveTimer=null,saveVersion=0,saveMessage='',notice='',P=emptyProgress();
const iconPaths={
 search:'<circle cx="10" cy="10" r="6"/><path d="m15 15 6 6M7 10h6M10 7v6"/>',
 book:'<path d="M12 6c-4-3-8-2-10-1v15c4-2 7-1 10 1 3-2 6-3 10-1V5c-2-1-6-2-10 1v15M5 9l4 1M15 10l4-1M5 13l4 1M15 14l4-1"/>',
 archive:'<rect x="3" y="4" width="18" height="5" rx="1"/><path d="M5 9v12h14V9M9 13h6M9 17h6"/>',
 layers:'<path d="m12 2 10 5-10 5L2 7l10-5ZM2 12l10 5 10-5M2 17l10 5 10-5"/>',
 compare:'<path d="M3 6h17l-4-4M20 6l-4 4M21 18H4l4-4M4 18l4 4"/>',
 coin:'<ellipse cx="12" cy="6" rx="9" ry="4"/><path d="M3 6v6c0 5 18 5 18 0V6M3 12v6c0 5 18 5 18 0v-6M8 9v11M16 9v11"/>',
 people:'<circle cx="12" cy="6" r="3"/><path d="M7 22v-6c0-5 10-5 10 0v6M3 22v-5c0-3 2-4 4-4M21 22v-5c0-3-2-4-4-4"/><circle cx="3" cy="9" r="2"/><circle cx="21" cy="9" r="2"/>',
 person:'<circle cx="12" cy="6" r="4"/><path d="M4 22v-3c0-8 16-8 16 0v3Z"/>',
 column:'<path d="m2 7 10-5 10 5H2ZM3 10h18M5 10v9M10 10v9M14 10v9M19 10v9M3 19h18v3H3Z"/>',
 compass:'<circle cx="12" cy="12" r="10"/><path d="m16 8-3 5-5 3 3-5 5-3Z"/>',
 clock:'<circle cx="12" cy="12" r="10"/><path d="M12 5v7l5 3"/>',
 vase:'<path d="M8 2h8v4l-2 2c0 3 6 4 6 9 0 6-16 6-16 0 0-5 6-6 6-9L8 6V2ZM7 13h10M5 17h14"/>',
 speech:'<path d="M21 4H3v13h4v5l6-5h8V4ZM7 8h10M7 12h7"/>',
 camera:'<path d="M3 6h4l2-3h6l2 3h4v15H3V6Z"/><circle cx="12" cy="13" r="4"/>',
 globe:'<circle cx="12" cy="12" r="10"/><ellipse cx="12" cy="12" rx="4" ry="10"/><path d="M2 12h20M5 6h14M5 18h14"/>',
 tool:'<path d="m4 21 11-11M14 2c5-1 9 3 8 8l-5-3-3 3 3 5c-5 1-9-3-8-8M2 19l3 3"/>',
 back:'<path d="m14 5-7 7 7 7M7 12h15"/>',next:'<path d="m10 5 7 7-7 7M17 12H2"/>',
 menu:'<path d="M8 5h14M8 12h14M8 19h14M2 5h1M2 12h1M2 19h1"/>',
 full:'<path d="M3 9V3h6M15 3h6v6M21 15v6h-6M9 21H3v-6"/>',close:'<path d="m5 5 14 14M5 19 14-14"/>'
};
function icon(name){return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${iconPaths[name]||iconPaths.book}</svg>`;}

let readingObserver=null;
// These legacy field names preserve the reading position and seven saved activity results.
function emptyProgress(){return {currentSlide:0,visitedSlides:[],answers:{},results:{},completedItems:[],attempts:{},itemScores:{},studyMode:'free',updatedMs:0};}
function validAnswer(q,a){return Number.isInteger(a)&&a>=0&&a<q.options.length;}
function allowedSlide(i,p=P){if(!Number.isInteger(i)||i<0||i>=SLIDES.length)return false;if(p.studyMode==='free')return true;return SLIDES.slice(0,i).every(s=>!s.question||p.completedItems.includes(s.question.index));}
function normalized(data={}){
 const p={...emptyProgress(),studyMode:window.StudyMode?.get(user?.uid)||(data.studyMode==='progressive'?'progressive':'free')};
 p.currentSlide=Number.isInteger(data.currentSlide)?Math.min(SLIDES.length-1,Math.max(0,data.currentSlide)):0;
 p.visitedSlides=[...new Set(Array.isArray(data.visitedSlides)?data.visitedSlides:[])].filter(n=>Number.isInteger(n)&&n>=0&&n<SLIDES.length);
 p.completedItems=[...new Set(Array.isArray(data.completedItems)?data.completedItems:[])].filter(n=>Number.isInteger(n)&&n>=0&&n<QUESTIONS.length).sort((a,b)=>a-b);
 for(const q of QUESTIONS){
  if(validAnswer(q,data.answers?.[q.id]))p.answers[q.id]=data.answers[q.id];
  if(validAnswer(q,data.results?.[q.id]))p.results[q.id]=data.results[q.id];
  const key='item_'+(q.index+1);p.attempts[key]=Math.max(0,Math.floor(Number(data.attempts?.[key])||0));p.itemScores[key]=Math.max(0,Math.min(100,Number(data.itemScores?.[key])||0));
 }
 p.updatedMs=Math.max(0,Number(data.updatedMs)||0);
 if(!allowedSlide(p.currentSlide,p))p.currentSlide=SLIDES.findIndex(s=>s.question&&!p.completedItems.includes(s.question.index));
 return p;
}
function mergeProgress(a={},b={}){
 a=normalized(a);b=normalized(b);const newer=b.updatedMs>a.updatedMs?b:a,older=newer===a?b:a;
 const m={...newer,answers:{...older.answers,...newer.answers},results:{...older.results,...newer.results},visitedSlides:[...new Set([...a.visitedSlides,...b.visitedSlides])],completedItems:[...new Set([...a.completedItems,...b.completedItems])],attempts:{},itemScores:{}};
 for(const q of QUESTIONS)for(const f of ['attempts','itemScores']){const k='item_'+(q.index+1);m[f][k]=Math.max(a[f][k]||0,b[f][k]||0);}
 return normalized(m);
}
function percent(){return Math.round(P.completedItems.length/QUESTIONS.length*100);}
function key(uid=user.uid){return 'sin-limites:'+uid+':'+DECK.id;}
function readLocal(){try{return JSON.parse(localStorage.getItem(key())||'null');}catch{return null;}}
function writeLocal(pending){try{localStorage.setItem(key(),JSON.stringify({progress:P,pending}));return true;}catch{return false;}}
function record(uid=user.uid){return db.collection('users').doc(uid).collection('progress').doc(DECK.id);}
function setStatus(message){saveMessage=message;const s=document.getElementById('save-status');if(s)s.textContent=message;const r=document.getElementById('retry-sync');if(r)r.hidden=cloudReady;}
function markChanged(){P.updatedMs=Date.now();saveVersion++;const saved=writeLocal(true);setStatus(cloudReady?'Guardando avance…':saved?'Guardado en este dispositivo · pendiente de sincronizar':'No se pudo guardar. Mantén esta página abierta y reintenta.');}
function payload(){let next=0;while(next<QUESTIONS.length&&P.completedItems.includes(next))next++;return {...P,percent:percent(),currentItem:Math.min(next,QUESTIONS.length-1),unlockedItem:Math.min(next,QUESTIONS.length-1),chapterCompleted:P.completedItems.length===QUESTIONS.length,courseId:12,courseName:'Historia Universal',chapterNumber:1,chapterName:DECK.title,format:'reading',schemaVersion:2,updatedAt:firebase.firestore.FieldValue.serverTimestamp()};}
function persist(){
 clearTimeout(saveTimer);saveTimer=null;if(!user||!cloudReady)return Promise.resolve();
 const uid=user.uid,epoch=authEpoch,version=saveVersion,data=payload();
 saveChain=saveChain.catch(()=>{}).then(async()=>{if(epoch!==authEpoch||!cloudReady)return;try{await record(uid).set(data,{merge:true});if(epoch===authEpoch&&version===saveVersion){writeLocal(false);setStatus('Avance guardado y sincronizado.');}}catch(error){console.error('Reading save:',error);if(epoch===authEpoch){cloudReady=false;const saved=writeLocal(true);setStatus(saved?'Guardado en este dispositivo · pendiente de sincronizar':'No se pudo guardar. Reintenta antes de cerrar.');}}});
 return saveChain;
}
function saveSoon(){markChanged();clearTimeout(saveTimer);saveTimer=setTimeout(persist,350);}
async function retrySync(){if(!user||!db)return;const epoch=authEpoch;setStatus('Sincronizando…');try{const snap=await record().get();if(epoch!==authEpoch)return;P=mergeProgress(snap.exists?snap.data():{},P);cloudReady=true;markChanged();render();await persist();}catch(error){if(epoch===authEpoch){cloudReady=false;setStatus('No se pudo conectar. Tu avance local sigue disponible.');}}}

// Removed blocks keep their position so saved reading points and activity indices remain valid.
const THEORY=SLIDES.filter(s=>!['cover','finish','question','removed'].includes(s.kind)&&s.id!=='s2');
const GROUPS=[...new Set(THEORY.map(s=>s.section))];
const blockIndex=id=>SLIDES.findIndex(s=>s.id===id);
const questionIndex=id=>SLIDES.findIndex(s=>s.question?.id===id);
const blockTarget=i=>SLIDES[i]?.kind==='removed'?'activities':i===0?'chapter-top':i===1?'learning-goals':i===SLIDES.length-1?'chapter-finish':'block-'+SLIDES[i].id;

function header(){return `<header class="topbar"><a class="brand" href="index.html?v=20260917-reading3"><img src="assets/logo-sin-limites.jpg" width="40" height="40" alt="Logo de SIN LÍMITES"><span>SIN <em>LÍMITES</em></span></a><span class="course-label">Historia Universal · Capítulo 1</span><a class="button secondary" href="index.html?course=12&v=20260917-reading3">${icon('back')} Volver al temario</a></header>`;}
function contents(){return `<aside class="lesson-sidebar"><details class="lesson-index" open><summary>En este capítulo</summary><nav aria-label="Temas del capítulo"><a href="#learning-goals">Antes de empezar</a>${GROUPS.map((group,i)=>`<a href="#section-${i+1}"><span>${String(i+1).padStart(2,'0')}</span>${esc(group)}</a>`).join('')}<a class="activities-link" href="#activities">${icon('check')} Actividades</a></nav></details><p class="index-hint">Lee a tu ritmo y vuelve al tema que necesites consultar.</p></aside>`;}
function cards(block){return `<div class="concept-grid count-${block.cards.length}">${block.cards.map(c=>`<section class="concept-card">${c.tag?`<span class="tag">${esc(c.tag)}</span>`:''}<h4>${esc(c.title)}</h4><p>${esc(c.text)}</p></section>`).join('')}</div>`;}
function body(block){
 if(block.kind==='table')return `<div class="table-wrap" tabindex="0" role="region" aria-label="${esc(block.title)}"><table><thead><tr>${block.headers.map(h=>`<th scope="col">${esc(h)}</th>`).join('')}</tr></thead><tbody>${block.rows.map(row=>`<tr>${row.map((cell,i)=>`<${i?'td':'th scope="row"'}>${esc(cell)}</${i?'td':'th'}>`).join('')}</tr>`).join('')}</tbody></table></div>`;
 if(block.kind==='duration')return `<div class="duration-list">${block.cards.map(c=>`<section><div><span class="tag">${esc(c.tag)}</span><h4>${esc(c.title)}</h4></div><p>${esc(c.text)}</p></section>`).join('')}</div>`;
 if(block.kind==='eras')return `<ol class="era-list">${block.cards.map(c=>`<li><span class="era-date">${esc(c.tag)}</span><div><h4>${esc(c.title)}</h4><p>${esc(c.text)}</p></div></li>`).join('')}</ol>`;
 return cards(block);
}
function illustration(block){
 const v=block.illustration;if(!v)return '';
 return `<figure class="topic-image"><button class="image-button" data-action="image" data-block="${block.id}" aria-label="Ampliar imagen: ${esc(v.caption)}"><img src="${esc(v.src)}" alt="${esc(v.alt)}" width="1280" height="960" loading="lazy" decoding="async"><span>Ampliar ${icon('search')}</span></button><figcaption>${esc(v.caption)}<small>Ilustración creada con IA</small></figcaption></figure>`;
}
function topic(block){
 return `<section class="topic kind-${block.kind}" id="block-${block.id}" data-reading-block="${blockIndex(block.id)}" tabindex="-1"><h3>${esc(block.title)}</h3>${block.lead?`<p class="topic-lead">${esc(block.lead)}</p>`:''}<div class="topic-layout ${block.illustration?'with-image':''}"><div>${body(block)}</div>${illustration(block)}</div><p class="topic-explanation">${esc(block.notes)}</p>${block.takeaway?`<p class="takeaway">${esc(block.takeaway)}</p>`:''}</section>`;
}
function questionCard(q){
 const i=questionIndex(q.id),available=allowedSlide(i),answered=validAnswer(q,P.results[q.id]),right=P.results[q.id]===q.answer,done=P.completedItems.includes(q.index);
 const title=`<header class="question-heading"><span class="question-number">${String(q.index+1).padStart(2,'0')}</span><div><p class="tag">Actividad ${q.index+1} de ${QUESTIONS.length}</p><h3>${esc(q.topic)}</h3></div>${done?'<span class="approved">Aprobada</span>':''}</header>`;
 if(!available)return `<section class="exercise-card locked" id="block-${SLIDES[i].id}" tabindex="-1" aria-label="Actividad ${q.index+1}, pendiente de desbloquear">${title}<p>Aprueba la actividad anterior para habilitar esta pregunta.</p></section>`;
 return `<section class="exercise-card" id="block-${SLIDES[i].id}" data-reading-block="${i}" tabindex="-1">${title}<p class="question-prompt">${esc(q.prompt)}</p>${q.statements?`<ul class="statements">${q.statements.map(x=>`<li>${esc(x)}</li>`).join('')}</ul>`:''}<fieldset class="choices"><legend class="sr-only">${esc(q.prompt)}</legend>${q.options.map((o,n)=>`<label class="choice"><input type="radio" name="${q.id}" value="${n}" data-question="${q.id}" ${P.answers[q.id]===n?'checked':''} ${answered?'disabled':''}><span class="choice-letter">${String.fromCharCode(65+n)}.</span><span>${esc(o)}</span></label>`).join('')}</fieldset>${notice&&P.currentSlide===i?`<p class="answer-notice" role="alert">${esc(notice)}</p>`:''}${answered?`<div class="feedback ${right?'correct':''}" id="feedback-${q.id}" tabindex="-1" role="status"><strong>${right?'Respuesta correcta':'Revisa tu respuesta'} · Alternativa ${String.fromCharCode(65+q.answer)}</strong><p>${esc(q.solution)}</p></div><button class="button secondary" data-action="retry-question" data-question="${q.id}">Volver a responder</button>`:`<button class="button" data-action="check" data-question="${q.id}">Comprobar respuesta ${icon('check')}</button>`}<p class="question-note">${done?'Tu acierto se conserva aunque vuelvas a responder.':'Puedes volver a intentarlo; tus aciertos se guardan.'}</p></section>`;
}
function finishContent(){return `<div><p class="tag">Tu avance en el capítulo</p><h2>${P.completedItems.length===QUESTIONS.length?'¡Completaste las actividades!':'Comprueba lo aprendido'}</h2><p>${P.completedItems.length} de ${QUESTIONS.length} actividades aprobadas.</p></div><div class="finish-actions"><a class="button secondary" href="#activities">Repasar actividades</a><a class="button" href="historia-universal-capitulo-02.html?v=20260917-reading3">Capítulo 2 ${icon('next')}</a></div>`;}
function render(){
 if(!user)return;
 ROOT.setAttribute('aria-busy','false');
 const goals=SLIDES.find(s=>s.id==='s2');
 ROOT.innerHTML=`${header()}<main id="chapter-content"><header class="chapter-hero" id="chapter-top"><div><p class="eyebrow">Historia Universal · Capítulo 01</p><h1>${esc(DECK.title)}</h1><p class="hero-intro">Comprender el pasado. Interpretar el presente. Pensar el futuro.</p></div><div class="hero-actions">${P.currentSlide>1?`<button class="button secondary" data-action="resume" data-index="${P.currentSlide}">${icon('book')} Retomar lectura</button>`:''}<a class="button" href="#activities">Ir a las actividades ${icon('next')}</a></div></header><section class="progress-panel" aria-label="Avance del capítulo"><div class="progress-heading"><span>Actividades aprobadas</span><strong id="progress-count">${P.completedItems.length} / ${QUESTIONS.length}</strong></div><progress id="chapter-progress" max="${QUESTIONS.length}" value="${P.completedItems.length}" aria-label="Actividades aprobadas"></progress><div class="save-state"><span id="save-status" role="status">${esc(saveMessage)}</span><button id="retry-sync" data-action="sync" ${cloudReady?'hidden':''}>Reintentar sincronización</button></div></section><div class="reading-layout">${contents()}<article class="chapter-article"><section class="learning-goals" id="learning-goals" data-reading-block="1" tabindex="-1"><p class="eyebrow">Antes de empezar</p><h2>${esc(goals.title)}</h2><ul>${goals.cards.map(c=>`<li><strong>${esc(c.title)}.</strong> ${esc(c.text)}</li>`).join('')}</ul></section>${GROUPS.map((group,n)=>`<section class="reading-section" id="section-${n+1}" aria-labelledby="section-heading-${n+1}"><header class="section-heading"><span>${String(n+1).padStart(2,'0')}</span><h2 id="section-heading-${n+1}">${esc(group)}</h2></header>${THEORY.filter(b=>b.section===group).map(topic).join('')}</section>`).join('')}<section class="activities-section" id="activities" aria-labelledby="activities-title"><header class="section-heading"><span>${icon('check')}</span><h2 id="activities-title">Comprueba lo aprendido</h2></header><p class="section-intro">Elige una alternativa en cada actividad y comprueba tu respuesta. La explicación te ayudará a revisar el tema.</p><div id="activities-list">${QUESTIONS.map(questionCard).join('')}</div></section><section class="chapter-finish" id="chapter-finish">${finishContent()}</section></article></div></main><footer class="page-footer">SIN LÍMITES · Historia Universal · La ciencia histórica</footer><dialog id="image-dialog" aria-labelledby="image-title"></dialog>`;
 observeReading();
}
function guest(message='Inicia sesión para estudiar el capítulo y guardar tu avance.'){
 readingObserver?.disconnect();ROOT.setAttribute('aria-busy','false');
 ROOT.innerHTML=`${header()}<main class="guest-view" id="chapter-content"><p class="eyebrow">Historia Universal · Capítulo 01</p><h1>${esc(DECK.title)}</h1><p>Teoría organizada por temas, imágenes didácticas y actividades con explicación.</p><p>${esc(message)}</p><a class="button" href="index.html?chapter=historia-universal-capitulo-01&v=20260917-reading3">Continuar con Google ${icon('next')}</a></main>`;
}
function rememberBlock(i){
 if(!user||!allowedSlide(i))return;
 const changed=P.currentSlide!==i||!P.visitedSlides.includes(i);
 P.currentSlide=i;if(!P.visitedSlides.includes(i))P.visitedSlides.push(i);
 if(changed)saveSoon();
}
function observeReading(){
 readingObserver?.disconnect();
 if(typeof window.IntersectionObserver!=='function')return;
 readingObserver=new window.IntersectionObserver(entries=>{
  const active=entries.filter(e=>e.isIntersecting).sort((a,b)=>a.boundingClientRect.top-b.boundingClientRect.top)[0];
  if(active)rememberBlock(Number(active.target.dataset.readingBlock));
 },{rootMargin:'-12% 0px -45% 0px',threshold:0});
 document.querySelectorAll('[data-reading-block]').forEach(el=>readingObserver.observe(el));
}
function visit(i,focus=true){
 if(!user||!allowedSlide(i))return;notice='';rememberBlock(i);
 const target=document.getElementById(blockTarget(i));target?.scrollIntoView({block:'start',behavior:'instant'});if(focus)target?.focus({preventScroll:true});
}
function renderActivities(){
 const list=document.getElementById('activities-list');if(list)list.innerHTML=QUESTIONS.map(questionCard).join('');
 const count=document.getElementById('progress-count');if(count)count.textContent=`${P.completedItems.length} / ${QUESTIONS.length}`;
 const progress=document.getElementById('chapter-progress');if(progress)progress.value=P.completedItems.length;
 const finish=document.getElementById('chapter-finish');if(finish)finish.innerHTML=finishContent();
 observeReading();
}
function checkAnswer(id=SLIDES[P.currentSlide]?.question?.id){
 const q=QUESTIONS.find(q=>q.id===id),i=questionIndex(id);
 if(!user||!q||!allowedSlide(i)||validAnswer(q,P.results[q.id]))return;
 P.currentSlide=i;
 const answer=P.answers[q.id];
 if(!validAnswer(q,answer)){notice='Selecciona una alternativa antes de comprobar.';renderActivities();document.querySelector(`input[name="${q.id}"]`)?.focus();return;}
 P.results[q.id]=answer;const k='item_'+(q.index+1);P.attempts[k]=(P.attempts[k]||0)+1;
 if(answer===q.answer){if(!P.completedItems.includes(q.index))P.completedItems.push(q.index);P.itemScores[k]=100;}
 notice='';markChanged();renderActivities();persist();
 const feedback=document.getElementById('feedback-'+q.id);feedback?.focus({preventScroll:true});feedback?.scrollIntoView({block:'nearest',behavior:'instant'});
}
function retryQuestion(id){
 const q=QUESTIONS.find(q=>q.id===id),i=questionIndex(id);if(!user||!q||!allowedSlide(i))return;
 P.currentSlide=i;delete P.answers[id];delete P.results[id];notice='';saveSoon();renderActivities();document.querySelector(`input[name="${id}"]`)?.focus();
}
function openImage(id){
 const block=SLIDES.find(s=>s.id===id),v=block?.illustration,d=document.getElementById('image-dialog');if(!v||!d)return;
 d.innerHTML=`<div class="dialog-heading"><h2 id="image-title">${esc(block.title)}</h2><button class="button secondary" data-action="close-image" aria-label="Cerrar imagen">${icon('close')}</button></div><img class="expanded-image" src="${esc(v.src)}" alt="${esc(v.alt)}"><p>${esc(v.caption)} · Ilustración creada con IA.</p>`;
 d.showModal();
}
ROOT.addEventListener('click',event=>{
 const button=event.target.closest('[data-action]');if(!button||button.disabled||!user)return;
 const {action,question,block,index}=button.dataset;
 if(action==='check')checkAnswer(question);
 else if(action==='retry-question')retryQuestion(question);
 else if(action==='resume')visit(Number(index));
 else if(action==='image')openImage(block);
 else if(action==='close-image')document.getElementById('image-dialog').close();
 else if(action==='sync')retrySync();
});
ROOT.addEventListener('change',event=>{
 if(!user)return;const input=event.target,q=QUESTIONS.find(q=>q.id===input.dataset.question);
 if(!q||!allowedSlide(questionIndex(q.id))||validAnswer(q,P.results[q.id])||!validAnswer(q,Number(input.value)))return;
 P.currentSlide=questionIndex(q.id);P.answers[q.id]=Number(input.value);saveSoon();
});
window.addEventListener('pagehide',()=>{if(user){clearTimeout(saveTimer);persist();}});
async function saveNavigation(uid,epoch){
 const nav={catalogVersion:3,lastCourseId:12,lastCourseName:'Historia Universal',lastTopicIndex:0,lastChapterNumber:1,lastChapterName:DECK.title};
 try{localStorage.setItem('academia-sm-state',JSON.stringify({catalogVersion:3,activeCourseId:12,activeTopicIndex:0,activeTopicName:DECK.title}));}catch{}
 if(cloudReady&&epoch===authEpoch)try{await db.collection('users').doc(uid).collection('progress').doc('navigation').set({...nav,updatedAt:firebase.firestore.FieldValue.serverTimestamp()},{merge:true});}catch(error){console.error('Reading navigation:',error);}
}
async function signedIn(u){
 const epoch=++authEpoch;clearTimeout(saveTimer);user=u;P=emptyProgress();cloudReady=false;saveVersion=0;saveChain=Promise.resolve();notice='';
 if(!u){guest();return;}
 if(window.StudyMode&&!await window.StudyMode.requireChoice(u.uid,db,'historia-universal-capitulo-01',()=>epoch===authEpoch))return;
 if(epoch!==authEpoch)return;
 const local=readLocal();P=normalized(local?.progress||{});if(!P.visitedSlides.includes(P.currentSlide))P.visitedSlides.push(P.currentSlide);saveMessage='Cargando el avance guardado…';render();
 try{
  const snap=await record(u.uid).get();if(epoch!==authEpoch)return;
  P=mergeProgress(snap.exists?snap.data():{},P);if(!P.visitedSlides.includes(P.currentSlide))P.visitedSlides.push(P.currentSlide);
  cloudReady=true;markChanged();render();await persist();
 }catch(error){if(epoch!==authEpoch)return;cloudReady=false;const saved=writeLocal(true);setStatus(saved?'Guardado en este dispositivo · pendiente de sincronizar':'No se pudo guardar. Mantén esta página abierta y reintenta.');}
 if(epoch===authEpoch)saveNavigation(u.uid,epoch);
}
if(!window.firebase)guest('No se pudo cargar la sesión. Revisa tu conexión y vuelve a abrir el capítulo.');
else{firebase.initializeApp(CFG);db=firebase.firestore();firebase.auth().onAuthStateChanged(signedIn);}


function refreshStudyMode(){
 if(!user||!window.StudyMode)return;
 const mode=window.StudyMode.get(user.uid);
 if(mode&&mode!==P.studyMode){P=normalized(P);notice='';markChanged();render();persist();}
}
window.addEventListener('pageshow',refreshStudyMode);
window.addEventListener('storage',event=>{if(user&&window.StudyMode&&event.key===window.StudyMode.key(user.uid))refreshStudyMode();});
