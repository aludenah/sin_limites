'use strict';
const DECK=window.HISTORY_PRESENTATION;
const SLIDES=DECK.slides;
const QUESTIONS=SLIDES.filter(s=>s.question).map(s=>s.question);
const ROOT=document.getElementById('presentation-app');
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
function coverArt(){return `<div class="cover-art" aria-hidden="true"><svg viewBox="0 0 500 440" fill="none"><circle cx="272" cy="214" r="182" fill="#183c4d"/><circle cx="272" cy="214" r="149" stroke="#78958e" stroke-dasharray="3 11"/><path d="M95 368h350M122 379h303" stroke="#718e91" stroke-width="2"/><path d="M184 126h197l-98-60-99 60Z" fill="#e8bc67"/><path d="M174 132h214v21H174zM185 334h192v20H185z" fill="#d7ae65"/><path d="M196 160h31v165h-31zM265 160h31v165h-31zM334 160h31v165h-31z" fill="#e9d4ad"/><path d="M207 170v145M276 170v145M345 170v145" stroke="#b89963" stroke-width="3"/><path d="M84 251c32-9 73 0 91 15v94c-23-20-59-23-91-14v-95Z" fill="#b7d5c5"/><path d="M175 266c25-18 64-18 91-10v91c-32-7-62 2-91 13v-94Z" fill="#e5eee1"/><path d="m100 271 52 8m-52 10 52 8m-52 10 52 8M194 281l52-7m-52 27 52-7m-52 27 52-7" stroke="#75968b" stroke-width="3"/><circle cx="373" cy="300" r="48" fill="#102c3e" stroke="#e8bc67" stroke-width="5"/><circle cx="373" cy="300" r="31" stroke="#587b80"/><path d="m408 335 40 39" stroke="#e8bc67" stroke-width="11" stroke-linecap="round"/><path d="M373 277v25l17 11" stroke="#e8bc67" stroke-width="3" stroke-linecap="round"/><circle cx="127" cy="128" r="8" fill="#abccc0"/><path d="M109 195h27m-14-13v27M400 95h19m-9-9v18" stroke="#789d95" stroke-width="2"/></svg></div>`;}
function emptyProgress(){return {currentSlide:0,visitedSlides:[],answers:{},results:{},completedItems:[],attempts:{},itemScores:{},studyMode:'free',updatedMs:0};}
function validAnswer(q,a){return Number.isInteger(a)&&a>=0&&a<q.options.length;}
function allowedSlide(i,p=P){if(!Number.isInteger(i)||i<0||i>=SLIDES.length)return false;if(p.studyMode==='free')return true;return SLIDES.slice(0,i).every(s=>!s.question||p.completedItems.includes(s.question.index));}
function normalized(data={}){
 const p={...emptyProgress(),studyMode:data.studyMode==='progressive'?'progressive':'free'};
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
function payload(){let next=0;while(next<QUESTIONS.length&&P.completedItems.includes(next))next++;return {...P,percent:percent(),currentItem:Math.min(next,QUESTIONS.length-1),unlockedItem:Math.min(next,QUESTIONS.length-1),chapterCompleted:P.completedItems.length===QUESTIONS.length,courseId:12,courseName:'Historia Universal',chapterNumber:1,chapterName:DECK.title,format:'presentation',schemaVersion:1,updatedAt:firebase.firestore.FieldValue.serverTimestamp()};}
function persist(){
 clearTimeout(saveTimer);saveTimer=null;if(!user||!cloudReady)return Promise.resolve();
 const uid=user.uid,epoch=authEpoch,version=saveVersion,data=payload();
 saveChain=saveChain.catch(()=>{}).then(async()=>{if(epoch!==authEpoch||!cloudReady)return;try{await record(uid).set(data,{merge:true});if(epoch===authEpoch&&version===saveVersion){writeLocal(false);setStatus('Avance guardado y sincronizado.');}}catch(error){console.error('Presentation save:',error);if(epoch===authEpoch){cloudReady=false;const saved=writeLocal(true);setStatus(saved?'Guardado en este dispositivo · pendiente de sincronizar':'No se pudo guardar. Reintenta antes de cerrar.');}}});
 return saveChain;
}
function saveSoon(){markChanged();clearTimeout(saveTimer);saveTimer=setTimeout(persist,350);}
async function retrySync(){if(!user||!db)return;const epoch=authEpoch;setStatus('Sincronizando…');try{const snap=await record().get();if(epoch!==authEpoch)return;P=mergeProgress(snap.exists?snap.data():{},P);cloudReady=true;markChanged();render();await persist();}catch(error){if(epoch===authEpoch){cloudReady=false;setStatus('No se pudo conectar. Tu avance local sigue disponible.');}}}
function header(guest=false){return `<header class="topbar"><a class="brand" href="index.html"><span class="brand-mark">SL</span><span>SIN <em>LÍMITES</em></span></a><span class="course-label">Historia Universal / Capítulo 1</span><nav aria-label="Herramientas de la presentación"><a class="tool" href="index.html?course=12" aria-label="Volver al temario">${icon('back')}<span>Temario</span></a>${guest?'':`<button class="tool" data-action="index" aria-label="Abrir índice">${icon('menu')}<span>Índice</span></button><button class="tool" data-action="fullscreen" aria-label="Alternar pantalla completa" title="Pantalla completa">${icon('full')}<span class="tool-label">Pantalla completa</span></button>`}</nav></header>`;}
function cards(s){return `<div class="card-grid count-${s.cards.length}">${s.cards.map(c=>`<section class="idea-card">${c.icon?`<div class="icon">${icon(c.icon)}</div>`:''}${c.tag?`<span class="tag">${esc(c.tag)}</span>`:''}<h3>${esc(c.title)}</h3><p>${esc(c.text)}</p></section>`).join('')}</div>`;}
function questionView(q){const answered=validAnswer(q,P.results[q.id]),right=P.results[q.id]===q.answer,done=P.completedItems.includes(q.index);return `<div class="question-layout"><div><p class="question-topic">${esc(q.topic)}</p><p class="question-prompt">${esc(q.prompt)}</p>${q.statements?`<ul class="statements">${q.statements.map(x=>`<li>${esc(x)}</li>`).join('')}</ul>`:''}${answered?`<div class="feedback ${right?'correct':''}" role="status"><strong>${right?'✓ Respuesta correcta':'Revisa tu respuesta'} · Alternativa ${String.fromCharCode(65+q.answer)}</strong>${esc(q.solution)}</div>`:''}</div><div><fieldset class="choices"><legend>${esc(q.prompt)}</legend>${q.options.map((o,i)=>`<label class="choice"><input type="radio" name="${q.id}" value="${i}" data-question="${q.id}" ${P.answers[q.id]===i?'checked':''} ${answered?'disabled':''}><span class="choice-letter">${String.fromCharCode(65+i)}.</span><span>${esc(o)}</span></label>`).join('')}</fieldset>${answered?`<button class="button secondary" data-action="retry-question">Volver a responder</button>`:`<button class="button" data-action="check">Comprobar respuesta ${icon('next')}</button>`}<p class="question-note">${done?'✓ Actividad aprobada. Tu acierto se conserva.':'Puedes reintentar. Los aciertos se guardan.'}</p>${notice?`<p class="notice" role="alert">${esc(notice)}</p>`:''}</div></div>`;}
function body(s){
 if(s.kind==='question')return questionView(s.question);
 if(s.kind==='duration')return `<div class="duration-list">${s.cards.map((c,i)=>`<section class="duration-row"><div><span class="tag">${esc(c.tag)}</span><h3>${esc(c.title)}</h3><div class="duration-track" aria-hidden="true"><span style="width:${[18,52,100][i]}%"></span></div></div><p>${esc(c.text)}</p></section>`).join('')}</div>`;
 if(s.kind==='reveal')return `<div class="card-grid count-3">${s.cards.map(c=>`<details class="idea-card reveal-card"><summary><div class="icon">${icon(c.icon)}</div>${esc(c.title)}</summary><p>${esc(c.text)}</p></details>`).join('')}</div>`;
 if(s.kind==='table')return `<div class="table-wrap"><table><thead><tr>${s.headers.map(h=>`<th scope="col">${esc(h)}</th>`).join('')}</tr></thead><tbody>${s.rows.map(row=>`<tr>${row.map((cell,i)=>`<td data-label="${esc(s.headers[i])}">${esc(cell)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
 if(s.kind==='eras')return `<div class="era-list">${s.cards.map(c=>`<section class="era-card"><div class="era-date">${esc(c.tag)}</div><h3>${esc(c.title)}</h3><p>${esc(c.text)}</p></section>`).join('')}</div>`;
 return cards(s);
}
function slideMarkup(s,index=P.currentSlide){
 const cover=s.kind==='cover'||s.kind==='finish';
 let content;
 if(cover){const finish=s.kind==='finish';content=`<div class="cover-layout"><div><span class="cover-label">HISTORIA UNIVERSAL · CAPÍTULO 01</span><h${finish?'2':'1'} id="slide-title" tabindex="-1">${esc(s.title)}</h${finish?'2':'1'}><p class="lead">${esc(s.lead)}</p>${finish?`<p class="finish-stats">${P.completedItems.length} / ${QUESTIONS.length} actividades</p><p class="guest-message">${P.completedItems.length===QUESTIONS.length?'Completaste las siete actividades. Puedes volver a cualquier idea para repasarla.':'Revisa las actividades pendientes y comprueba lo aprendido.'}</p><div class="button-row"><button class="button light" data-action="review">Repasar actividades</button><a class="button light" href="historia-universal-capitulo-02.html">Capítulo 2 ${icon('next')}</a></div>`:`<button class="button light" data-action="next">Comenzar ${icon('next')}</button><p class="cover-meta">${SLIDES.length} diapositivas · 8 apartados · 7 actividades</p>`}</div>${coverArt()}</div>`;}
 else content=`<p class="eyebrow">${esc(s.section)}</p><h2 id="slide-title" tabindex="-1">${esc(s.title)}</h2>${s.lead?`<p class="lead">${esc(s.lead)}</p>`:''}<div class="slide-body">${body(s)}${s.takeaway?`<p class="takeaway">${esc(s.takeaway)}</p>`:''}</div>`;
 return `<article class="slide-frame kind-${s.kind} ${cover?'cover':''} ${s.kind==='finish'?'finish':''}" aria-labelledby="slide-title"><div class="slide-content">${content}</div><footer class="slide-foot"><span>Base: Historia Universal · Lumbreras · p. ${esc(s.page)}</span><span class="folio">${String(index+1).padStart(2,'0')} / ${SLIDES.length}</span></footer></article>`;
}
function render(){
 if(!user)return;const s=SLIDES[P.currentSlide];
 ROOT.setAttribute('aria-busy','false');
 ROOT.innerHTML=`${header()}<main class="stage"><div class="stage-meta"><label>Recorrido<select id="study-mode" aria-label="Modo de estudio"><option value="free" ${P.studyMode==='free'?'selected':''}>Libre · explora las diapositivas</option><option value="progressive" ${P.studyMode==='progressive'?'selected':''}>Progresivo · actividades en orden</option></select></label><div class="state-line"><span id="save-status" role="status">${esc(saveMessage)}</span><button id="retry-sync" data-action="sync" ${cloudReady?'hidden':''}>Reintentar</button></div></div>${slideMarkup(s)}<nav class="player-controls" aria-label="Cambiar diapositiva"><button class="notes-button" data-action="notes">${icon('book')} Ampliar explicación</button><div class="nav-cluster"><button class="button secondary" data-action="previous" ${P.currentSlide===0?'disabled':''} aria-label="Diapositiva anterior">${icon('back')} Anterior</button><span class="slide-counter" aria-live="polite">${P.currentSlide+1} de ${SLIDES.length}</span><button class="button" data-action="next" ${!allowedSlide(P.currentSlide+1)?'disabled':''} aria-label="Diapositiva siguiente">Siguiente ${icon('next')}</button></div><span class="kbd-hint">← → para cambiar de diapositiva</span></nav><div class="reading-bar" aria-hidden="true"><span style="width:${(P.currentSlide+1)/SLIDES.length*100}%"></span></div><div class="progress-caption"><span>${P.visitedSlides.length} de ${SLIDES.length} diapositivas visitadas</span><span>${P.completedItems.length} de ${QUESTIONS.length} actividades aprobadas · ${percent()}%</span></div></main><dialog id="slide-dialog" aria-labelledby="dialog-title"></dialog>`;
}
function guest(message='Inicia sesión para recorrer las diapositivas y guardar tu avance.'){
 ROOT.setAttribute('aria-busy','false');ROOT.innerHTML=`${header(true)}<main class="stage guest"><article class="slide-frame cover"><div class="slide-content"><div class="cover-layout"><div><span class="cover-label">PRESENTACIÓN INTERACTIVA · CAPÍTULO 01</span><h1 id="slide-title" tabindex="-1">${esc(DECK.title)}</h1><p class="lead">Comprender el pasado. Interpretar el presente. Pensar el futuro.</p><p class="guest-message">${esc(message)}</p><a class="button light" href="index.html?chapter=historia-universal-capitulo-01">Continuar con Google ${icon('next')}</a><p class="cover-meta">33 diapositivas · 8 apartados · 7 actividades</p></div>${coverArt()}</div></div><footer class="slide-foot"><span>Basado en Historia Universal · Lumbreras · pp. 9–17</span><span>01</span></footer></article></main>`;
}
function visit(i,focus=true){if(!user||!allowedSlide(i))return;P.currentSlide=i;if(!P.visitedSlides.includes(i))P.visitedSlides.push(i);notice='';saveSoon();render();if(focus)document.getElementById('slide-title')?.focus({preventScroll:true});window.scrollTo({top:0,behavior:'instant'});}
function checkAnswer(){
 const q=SLIDES[P.currentSlide].question;if(!user||!q||validAnswer(q,P.results[q.id]))return;
 const answer=P.answers[q.id];if(!validAnswer(q,answer)){notice='Selecciona una alternativa antes de comprobar.';render();return;}
 P.results[q.id]=answer;const k='item_'+(q.index+1);P.attempts[k]=(P.attempts[k]||0)+1;
 if(answer===q.answer){if(!P.completedItems.includes(q.index))P.completedItems.push(q.index);P.itemScores[k]=100;}
 notice='';markChanged();render();persist();document.querySelector('.feedback')?.scrollIntoView({block:'nearest',behavior:'smooth'});
}
function dialog(type){
 const d=document.getElementById('slide-dialog');if(!d)return;
 let content,title;
 if(type==='notes'){const s=SLIDES[P.currentSlide];title=s.title;content=`<p>${esc(s.notes)}</p><p class="source-note">${esc(DECK.source)} · Referencia de esta diapositiva: p. ${esc(s.page)}. Explicación adaptada y ampliada.</p>`;}
 else{title='Índice de la presentación';const groups=[...new Set(SLIDES.map(s=>s.section))];content=groups.map(group=>`<section class="index-group"><h3>${esc(group)}</h3><div class="index-list">${SLIDES.map((s,i)=>s.section===group?`<button data-action="jump" data-index="${i}" ${!allowedSlide(i)?'disabled':''} ${P.currentSlide===i?'aria-current="page"':''}><span class="index-number">${String(i+1).padStart(2,'0')}</span><span>${esc(s.title)}${s.question&&P.completedItems.includes(s.question.index)?' ✓':''}</span></button>`:'').join('')}</div></section>`).join('');}
 d.innerHTML=`<div class="dialog-head"><h2 id="dialog-title">${esc(title)}</h2><button class="tool" data-action="close-dialog" aria-label="Cerrar">${icon('close')}</button></div><div class="dialog-body">${content}</div>`;
 d.showModal();
}
async function fullscreen(){try{if(document.fullscreenElement)await document.exitFullscreen();else if(document.documentElement.requestFullscreen)await document.documentElement.requestFullscreen();else setStatus('Este navegador no admite pantalla completa.');}catch{setStatus('No se pudo activar pantalla completa. Abre el capítulo en una pestaña propia.');}}
ROOT.addEventListener('click',e=>{
 const b=e.target.closest('[data-action]');if(!b||b.disabled||!user)return;
 const a=b.dataset.action;
 if(a==='next')visit(P.currentSlide+1);else if(a==='previous')visit(P.currentSlide-1);
 else if(a==='index'||a==='notes')dialog(a);
 else if(a==='close-dialog')document.getElementById('slide-dialog').close();
 else if(a==='jump'){document.getElementById('slide-dialog').close();visit(Number(b.dataset.index));}
 else if(a==='check')checkAnswer();
 else if(a==='retry-question'){const q=SLIDES[P.currentSlide].question;delete P.answers[q.id];delete P.results[q.id];notice='';saveSoon();render();}
 else if(a==='review'){const pending=SLIDES.findIndex(s=>s.question&&!P.completedItems.includes(s.question.index));visit(pending<0?SLIDES.findIndex(s=>s.question):pending);}
 else if(a==='sync')retrySync();else if(a==='fullscreen')fullscreen();
});
ROOT.addEventListener('change',e=>{
 if(!user)return;const el=e.target;
 if(el.id==='study-mode'){P.studyMode=el.value==='progressive'?'progressive':'free';P=normalized(P);notice='';saveSoon();render();return;}
 const q=SLIDES[P.currentSlide].question;
 if(q&&el.dataset.question===q.id&&validAnswer(q,Number(el.value))&&!validAnswer(q,P.results[q.id])){P.answers[q.id]=Number(el.value);saveSoon();}
});
document.addEventListener('keydown',e=>{
 if(!user||document.querySelector('dialog[open]')||e.altKey||e.ctrlKey||e.metaKey||e.shiftKey)return;
 if(e.target.closest?.('input,select,textarea,button,a,summary,[contenteditable="true"]'))return;
 if(e.key==='ArrowRight'||e.key==='PageDown'){e.preventDefault();visit(P.currentSlide+1);}
 else if(e.key==='ArrowLeft'||e.key==='PageUp'){e.preventDefault();visit(P.currentSlide-1);}
 else if(e.key==='Home'){e.preventDefault();visit(0);}else if(e.key==='End'){e.preventDefault();visit(SLIDES.length-1);}
});
window.addEventListener('pagehide',()=>{if(user){clearTimeout(saveTimer);persist();}});
async function saveNavigation(uid,epoch){
 const nav={catalogVersion:3,lastCourseId:12,lastCourseName:'Historia Universal',lastTopicIndex:0,lastChapterNumber:1,lastChapterName:DECK.title};
 try{localStorage.setItem('academia-sm-state',JSON.stringify({catalogVersion:3,activeCourseId:12,activeTopicIndex:0,activeTopicName:DECK.title}));}catch{}
 if(cloudReady&&epoch===authEpoch)try{await db.collection('users').doc(uid).collection('progress').doc('navigation').set({...nav,updatedAt:firebase.firestore.FieldValue.serverTimestamp()},{merge:true});}catch(error){console.error('Presentation navigation:',error);}
}
async function signedIn(u){
 const epoch=++authEpoch;clearTimeout(saveTimer);user=u;P=emptyProgress();cloudReady=false;saveVersion=0;saveChain=Promise.resolve();notice='';
 if(!u){guest();return;}
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
