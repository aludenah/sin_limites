'use strict';
const CONTENT=window.ELECTROMAGNETISM_CONTENT;
const CHAPTER_ID='fisica-capitulo-17';
const LESSONS=CONTENT.lessons;

const CONFIG={apiKey:'AIzaSyCurhmnJ21SMqGM6G54t8QM8jcqO8jV0OE',authDomain:'sin-limites-12f07.firebaseapp.com',projectId:'sin-limites-12f07',storageBucket:'sin-limites-12f07.firebasestorage.app',messagingSenderId:'757098079298',appId:'1:757098079298:web:068a9a7ea93149bfef79db'};
const root=document.getElementById('chapter-app');
const escapeHTML=value=>String(value??'').replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&#039;');
let user=null,db=null,cloudReady=false,saveChain=Promise.resolve(),saveVersion=0,authEpoch=0;
let saveMessage='',notice='',P=emptyProgress(),saveTimer=null;

function emptyProgress(){return {studyMode:null,currentItem:0,readingItem:0,contentVersion:2,activeTab:'theory',practice10:window.ChapterPractice.normalize(CHAPTER_ID),updatedMs:0};}



const INDUCTION={id:'induction-lab'};
function normalized(data={}){
 const p={...data,...emptyProgress()};
 const legacy=['generador','campo-magnetico','fuerzas-magneticas','flujo-faraday','ley-lenz','generador'];
 const lessonIndex=index=>{
  if(!Number.isInteger(index))return 0;
  if(Number(data.contentVersion)>=2)return Math.max(0,Math.min(LESSONS.length-1,index));
  return Math.max(0,LESSONS.findIndex(x=>x.id===legacy[index]));
 };
 p.studyMode=window.StudyMode?.get(user?.uid)||(['free','progressive'].includes(data.studyMode)?data.studyMode:null);
 p.currentItem=lessonIndex(data.currentItem);p.readingItem=Number.isInteger(data.readingItem)?lessonIndex(data.readingItem):p.currentItem;
 p.activeTab=data.activeTab==='exam'?'practice':['theory','examples','practice'].includes(data.activeTab)?data.activeTab:'theory';
 p.practice10=window.ChapterPractice.normalize(CHAPTER_ID,data);p.inductionLab=inductionProgress(data.inductionLab);p.updatedMs=Math.max(0,Number(data.updatedMs)||0);return p;
}
function inductionProgress(value={}){
 value=value&&typeof value==='object'&&!Array.isArray(value)?value:{};
 const number=(n,fallback,min,max)=>typeof n==='number'&&Number.isFinite(n)?Math.max(min,Math.min(max,n)):fallback;
 const tabs=['induction','generator','missions'];
 const ids=(items,allowed)=>[...new Set((Array.isArray(items)?items:[]).filter(x=>allowed.includes(x)))];
 const o=value.observations&&typeof value.observations==='object'?value.observations:{};
 const observations=Object.fromEntries(['moved','stopped','reversed','openEmf','generator'].map(key=>[key,o[key]===true]));
 return {experience:INDUCTION?.id||'',tab:tabs.includes(value.tab)?value.tab:'induction',position:number(value.position,-.2,-.25,.25),speed:number(value.speed,.2,.1,.5),direction:value.direction===-1?-1:1,polarity:value.polarity===-1?-1:1,turns:Number.isInteger(value.turns)?number(value.turns,150,50,300):150,resistance:number(value.resistance,20,10,100),closed:value.closed!==false,angle:number(value.angle,0,0,2*Math.PI),angularSpeed:number(value.angularSpeed,4,1,12),completedChallenges:ids(value.completedChallenges,['still','reverse','open']),visitedTabs:ids(value.visitedTabs,tabs),observations,updatedMs:number(value.updatedMs,0,0,Number.MAX_SAFE_INTEGER)};
}
function mergeInduction(a={},b={}){
 const x=inductionProgress(a),y=inductionProgress(b),latest=y.updatedMs>=x.updatedMs?y:x;
 const observations=Object.fromEntries(Object.keys(x.observations).map(key=>[key,x.observations[key]||y.observations[key]]));
 return inductionProgress({...latest,observations,completedChallenges:[...x.completedChallenges,...y.completedChallenges],visitedTabs:[...x.visitedTabs,...y.visitedTabs]});
}

function progressiveLimit(p=P){return window.ChapterPractice.limit(CHAPTER_ID,p.practice10);}
function canOpen(i){return Number.isInteger(i)&&i>=0&&i<LESSONS.length;}
function canApply(){return true;}
function progressPercent(p=P){return p.practice10.mastered.length*10;}
function chapterComplete(p=P){return p.practice10.mastered.length===10;}
function mergeProgress(a={},b={}){const merged=window.ChapterPractice.merge(CHAPTER_ID,normalized(a),normalized(b));merged.inductionLab=mergeInduction(a.inductionLab,b.inductionLab);return normalized(merged);}
function localKey(){return 'sin-limites:'+user.uid+':'+CHAPTER_ID;}
function readLocal(){try{return JSON.parse(localStorage.getItem(localKey())||'null');}catch{return null;}}
function storeLocal(pending=true){
  try{localStorage.setItem(localKey(),JSON.stringify({progress:P,pending}));return true;}
  catch{return false;}
}
function record(uid=user.uid){return db.collection('users').doc(uid).collection('progress').doc(CHAPTER_ID);}
function cloudPayload(){return {...P,...window.ChapterPractice.summary(CHAPTER_ID,P),courseId:16,courseName:'Física',chapterNumber:17,topicIndex:16,catalogVersion:10,contentType:'chapter',moduleId:CHAPTER_ID,chapterName:CONTENT.title,schemaVersion:3,updatedAt:firebase.firestore.FieldValue.serverTimestamp()};}
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
    const snap=await record().get();if(epoch!==authEpoch)return;
    P=mergeProgress(snap.exists?snap.data():{},P);cloudReady=true;
    markChanged();render();await persist();
  }catch(error){if(epoch!==authEpoch)return;cloudReady=false;setSaveStatus('No se pudo conectar. Tu avance local se conserva si el navegador permite guardarlo.');}
}
function renderMath(){
  if(typeof window.renderMathInElement==='function')window.renderMathInElement(root,{delimiters:[{left:'\\[',right:'\\]',display:true},{left:'\\(',right:'\\)',display:false}],throwOnError:false,trust:false});
}
function header(){return '<a class="skip" href="#chapter-content">Ir al contenido</a><header class="top"><div class="wrap"><a class="brand" href="index.html?v=20260919-fisica19"><span class="logo"><img src="assets/logo-sin-limites.jpg" alt="Logo de SIN LÍMITES" width="56" height="56" style="display:block;width:100%;height:100%;object-fit:contain;border-radius:inherit"></span><span>SIN <em>LÍMITES</em><small>ACADEMIA VIRTUAL</small></span></a><a class="back" href="index.html?course=16&v=20260919-fisica19">← Temario de Física · 19 capítulos</a></div></header>';}

function side(){return LESSONS.map((lesson,i)=>{const active=P.activeTab==='theory'&&P.currentItem===i;return '<button data-action="lesson" data-index="'+i+'" '+(active?'aria-current="step"':'')+' class="'+(active?'active':'')+'"><span class="stepno">'+String(i+1).padStart(2,'0')+'</span><span>'+lesson.title+'</span></button>';}).join('');}



function lessonBody(lesson){
 return (lesson.body||'').replace('<div data-wire-field-lab></div>',()=>window.WireFieldLab?.render()||'<p>Recarga la página para abrir el simulador.</p>')
 .replace('<div data-induction-lab></div>',()=>window.ChapterInteractions?.render('induction-lab')||'<p>Recarga la página para abrir el laboratorio de inducción.</p>');
}
function lessonFigures(){return '';}
function lessonActivity(lesson){
 return (lesson.examples||[]).map(e=>`<section class="example"><p class="eyebrow">Ejemplo resuelto</p><h3>${e.title}</h3><p>${e.question}</p><ol>${e.steps.map(s=>`<li>${s}</li>`).join('')}</ol></section>`).join('');
}
function lessonSections(lesson){
 return (lesson.sections||[]).map(section=>{
  const heading=section.title?`<h3 id="section-${section.id}">${escapeHTML(section.title)}</h3>`:'';
  const label=section.title?` aria-labelledby="section-${section.id}"`:'';
  return `<section${label}>${heading}<div class="content">${lessonBody(section)}${lessonFigures(section.id)}</div>${lessonActivity(section)}</section>`;
 }).join('');
}
function lessonView(){
  const i=P.currentItem,x=LESSONS[i];
  return `<p class="eyebrow">Tema ${i+1} de ${LESSONS.length} · ${x.subtitle}</p><h2>${x.title}</h2><div class="content">${lessonBody(x)}${lessonFigures(x.id)}</div>${lessonSections(x)}${lessonActivity(x)}<div class="actions"><button class="button secondary" data-action="lesson" data-index="${i-1}" ${i===0?'disabled':''}>← Tema anterior</button>${i<LESSONS.length-1?`<button class="button" data-action="lesson" data-index="${i+1}" ${!canOpen(i+1)?'disabled':''}>Siguiente tema →</button>`:`<button class="button" data-action="tab" data-value="practice" ${!canApply()?'disabled':''}>Ir a la práctica →</button>`}</div>`;
}
function practiceView(){return window.ChapterPractice.render(CHAPTER_ID,P.practice10,P.studyMode,notice);}

function workedExamplesView(){
 return `<p class="eyebrow">Aplicamos lo aprendido</p><h2>${CONTENT.workedExamples.length} problemas resueltos</h2><p>Intenta resolver cada problema y abre su solución para comparar el procedimiento.</p>${(CONTENT.workedExamples||[]).map(e=>`<section class="example worked-example" id="electromagnetismo-resuelto-${e.number}"><p class="eyebrow">Problema ${e.number}</p><h3>${e.title}</h3><p>${e.question}</p><details><summary>Ver solución paso a paso</summary><ol>${e.steps.map(step=>`<li>${step}</li>`).join('')}</ol></details></section>`).join('')}`;
}

function render(){
  if(!user)return;
  if(!P.studyMode){window.location.replace('index.html?chapter='+CHAPTER_ID);return;}
  window.WireFieldLab?.destroy();window.ChapterInteractions?.unmount();
  const percent=progressPercent();
  root.innerHTML=`${header()}<section class="hero"><div class="wrap"><p class="eyebrow">Física · Capítulo 17 de 19</p><h1>Electromagnetismo</h1></div></section><div class="wrap"><section class="card overview"><div><div class="progress-head"><span>Mi avance en el capítulo</span><strong>${percent}%</strong></div><progress max="100" value="${percent}" aria-label="Avance del capítulo">${percent}%</progress><small>${P.practice10.mastered.length}/10 problemas resueltos correctamente</small><p id="save-status" class="save-line ${cloudReady?'':'warning'}" role="status">${escapeHTML(saveMessage)}</p><button id="retry-save" class="button secondary small" data-action="sync" ${cloudReady?'hidden':''}>Reintentar sincronización</button><div class="actions em-lab-shortcuts"><button class="button secondary small" data-action="lab" data-value="wire-field-lab">Explorar conductor rectilíneo</button><button class="button secondary small" data-action="lab" data-value="induction-lab">Laboratorio de inducción</button></div></div></section><div class="layout"><aside class="card sidebar"><p class="eyebrow">Tu ruta de aprendizaje</p><nav class="route" aria-label="Temas del capítulo">${side()}</nav><p class="hint">Completa los 10 problemas de la práctica para alcanzar el 100%. La teoría está disponible para consultar.</p></aside><main class="workspace" id="chapter-content"><nav class="card tabs" aria-label="Secciones del capítulo">${[['theory','Teoría'],['examples','Resueltos · '+CONTENT.workedExamples.length],['practice','Práctica · 10 problemas']].map(([id,title])=>`<button data-action="tab" data-value="${id}" class="${P.activeTab===id?'active':''}" ${P.activeTab===id?'aria-current="page"':''} >${title}</button>`).join('')}</nav><article class="card article">${notice?`<div role="alert" class="feedback" id="notice">${escapeHTML(notice)}</div>`:''}${P.activeTab==='examples'?workedExamplesView():P.activeTab==='practice'?practiceView():lessonView()}</article></main></div></div><footer class="footer">SIN LÍMITES · Física · Electromagnetismo</footer>`;
  renderMath();
  window.WireFieldLab?.mount(root);window.ChapterInteractions?.mount(root,{saved:P.inductionLab});
}
function scrollContent(){document.getElementById('chapter-content')?.scrollIntoView({behavior:'smooth',block:'start'});}
function showNotice(message){notice=message;render();document.getElementById('notice')?.scrollIntoView({block:'center',behavior:'smooth'});}
function clearAnchor(){if(window.location.hash&&window.history?.replaceState)window.history.replaceState(null,'',window.location.pathname+window.location.search);}
function goLesson(i){if(!canOpen(i))return;clearAnchor();P.currentItem=i;P.activeTab='theory';notice='';markChanged();render();persist();scrollContent();}
function goTab(tab){if(!['theory','examples','practice'].includes(tab))return;clearAnchor();P.activeTab=tab;notice='';markChanged();render();persist();scrollContent();}

function checkPractice(id){if(P.activeTab!=='practice')return;const result=window.ChapterPractice.check(CHAPTER_ID,P.practice10,id,P.studyMode);if(result==='locked'||result==='unchanged')return;notice=result==='missing'?'Selecciona una alternativa antes de comprobar.':'';if(result==='graded')markChanged();render();if(result==='graded'){persist();const feedback=document.getElementById('practice-feedback-'+id);feedback?.focus({preventScroll:true});feedback?.scrollIntoView({block:'nearest',behavior:'instant'});}else document.querySelector('input[name="practice10-'+id+'"]')?.focus();}



root.addEventListener('click',event=>{
const button=event.target.closest('[data-action]');if(!button||button.disabled||!user)return;
const {action,value,index,id}=button.dataset;if(action==='lab')openLab(value);else if(action==='lesson')goLesson(Number(index));else if(action==='tab')goTab(value);else if(action==='check-practice10')checkPractice(id);else if(action==='sync')retrySync();
});
root.addEventListener('change',event=>{
if(!user)return;const input=event.target;

if(input.dataset.group==='practice10'&&window.ChapterPractice.choose(CHAPTER_ID,P.practice10,input.dataset.question,Number(input.value),P.studyMode))saveSoon();
});
window.addEventListener('pagehide',()=>{if(user&&saveTimer){clearTimeout(saveTimer);persist();}});

async function signedIn(u){
  const epoch=++authEpoch;clearTimeout(saveTimer);user=u;P=emptyProgress();cloudReady=false;saveVersion=0;saveChain=Promise.resolve();notice='';
  window.WireFieldLab?.destroy();window.ChapterInteractions?.unmount();
  if(!u){root.innerHTML=`${header()}<main id="chapter-content" class="access card"><p class="eyebrow">Física · Capítulo 17 de 19</p><h1>Electromagnetismo</h1><p>Inicia sesión en la academia para estudiar y guardar tu avance.</p><a class="button" href="index.html?chapter=fisica-capitulo-17">Continuar con Google</a></main>`;return;}
 if(window.StudyMode&&!await window.StudyMode.requireChoice(u.uid,db,'fisica-capitulo-17',()=>epoch===authEpoch))return;
 if(epoch!==authEpoch)return;
  const local=readLocal();P=normalized(local?.progress||{});
  try{
    const snap=await record().get();if(epoch!==authEpoch)return;
    P=mergeProgress(snap.exists?snap.data():{},P);cloudReady=true;setSaveStatus('Tu avance está actualizado.');
  }catch(error){if(epoch!==authEpoch)return;console.error('Chapter load:',error);setSaveStatus('No se pudo cargar el avance en la nube. Puedes continuar y reintentar la sincronización.');}
  applyAnchor(false);render();
  if(window.location.hash)scrollAnchor();
  if(cloudReady){markChanged();await persist();}
  if(epoch!==authEpoch)return;
  // The navigation document lets the catalog and teacher panel resume this chapter.
  const navigation={catalogVersion:10,lastCourseId:16,lastCourseName:'Física',lastTopicIndex:16,lastChapterNumber:17,lastModuleId:CHAPTER_ID,lastChapterName:CONTENT.title};
  try{localStorage.setItem('academia-sm-state',JSON.stringify({catalogVersion:10,activeCourseId:16,activeTopicIndex:16,activeModuleId:CHAPTER_ID,activeTopicName:CONTENT.title}));}catch{}
  if(cloudReady)try{await db.collection('users').doc(u.uid).collection('progress').doc('navigation').set({...navigation,updatedAt:firebase.firestore.FieldValue.serverTimestamp()},{merge:true});}catch(error){console.error('Navigation save:',error);}
}
if(!window.firebase){root.innerHTML='<main class="access card"><h1>No se pudo cargar la sesión</h1><p>Revisa tu conexión y vuelve a abrir este capítulo.</p><a class="button" href="fisica-capitulo-17.html?v=20260918-social1">Reintentar</a></main>';}
else{firebase.initializeApp(CONFIG);db=firebase.firestore();firebase.auth().onAuthStateChanged(signedIn);}


function refreshStudyMode(){
 if(!user||!window.StudyMode)return;
 const mode=window.StudyMode.get(user.uid);
 if(mode&&mode!==P.studyMode){P=normalized(P);notice='';markChanged();render();persist();}
}
window.addEventListener('pageshow',()=>{refreshStudyMode();});
window.addEventListener('storage',event=>{if(user&&window.StudyMode&&event.key===window.StudyMode.key(user.uid))refreshStudyMode();});

function openLab(id){
 const target=id==='induction-lab'?'generador':'laboratorio-conductor',i=LESSONS.findIndex(x=>x.id===target);
 if(i<0)return;P.currentItem=i;P.activeTab='theory';notice='';markChanged();render();persist();
 if(window.history?.replaceState)window.history.replaceState(null,'','#'+id);scrollAnchor(id);
}
function applyAnchor(draw=true){
 const hash=window.location.hash;if(!hash)return;
 const id=hash.slice(1),target=id==='wire-field-lab'?'laboratorio-conductor':id==='induction-lab'?'generador':null;
 if(target){P.currentItem=Math.max(0,LESSONS.findIndex(x=>x.id===target));P.activeTab='theory';if(draw){render();scrollAnchor(id);}}
}
function scrollAnchor(id=window.location.hash?.slice(1)){document.getElementById(id)?.scrollIntoView({block:'start',behavior:'instant'});}
window.addEventListener('hashchange',()=>{if(user)applyAnchor();});
window.addEventListener('induction-lab-progress',event=>{
 if(!user||event.detail?.experience!=='induction-lab')return;
 P.inductionLab=mergeInduction(P.inductionLab,{...event.detail,updatedMs:Date.now()});saveSoon();
});
