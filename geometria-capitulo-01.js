'use strict';
const CONTENT=window.GEOMETRY_CONTENT;
const CHAPTER_ID='geometria-capitulo-01';
const LESSONS=CONTENT.lessons;

const CONFIG={apiKey:'AIzaSyCurhmnJ21SMqGM6G54t8QM8jcqO8jV0OE',authDomain:'sin-limites-12f07.firebaseapp.com',projectId:'sin-limites-12f07',storageBucket:'sin-limites-12f07.firebasestorage.app',messagingSenderId:'757098079298',appId:'1:757098079298:web:068a9a7ea93149bfef79db'};
const root=document.getElementById('chapter-app');
const escapeHTML=value=>String(value??'').replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&#039;');
let user=null,db=null,cloudReady=false,saveChain=Promise.resolve(),saveVersion=0,authEpoch=0;
let saveMessage='',notice='',P=emptyProgress(),saveTimer=null;

function emptyProgress(){return {studyMode:null,currentItem:0,readingItem:0,contentVersion:1,activeTab:'intro',practice10:window.ChapterPractice.normalize(CHAPTER_ID),updatedMs:0};}



function normalized(data={}){
 data=data&&typeof data==='object'&&!Array.isArray(data)?data:{};
 const p=emptyProgress();
 const lessonIndex=index=>Number.isInteger(index)?Math.max(0,Math.min(LESSONS.length-1,index)):0;
 p.studyMode=window.StudyMode?.get(user?.uid)||(['free','progressive'].includes(data.studyMode)?data.studyMode:null);
 p.currentItem=lessonIndex(data.currentItem);
 p.readingItem=Number.isInteger(data.readingItem)?lessonIndex(data.readingItem):p.currentItem;
 p.activeTab=data.activeTab==='exam'?'practice':['intro','theory','examples','proposed','practice'].includes(data.activeTab)?data.activeTab:'intro';
 p.practice10=window.ChapterPractice.normalize(CHAPTER_ID,data);
 p.updatedMs=Number.isFinite(data.updatedMs)?Math.max(0,data.updatedMs):0;
 return p;
}

function progressiveLimit(p=P){return window.ChapterPractice.limit(CHAPTER_ID,p.practice10);}
function canOpen(i){return Number.isInteger(i)&&i>=0&&i<LESSONS.length;}
function canApply(){return true;}
function progressPercent(p=P){return p.practice10.mastered.length*10;}
function chapterComplete(p=P){return p.practice10.mastered.length===10;}
function mergeProgress(a={},b={}){return normalized(window.ChapterPractice.merge(CHAPTER_ID,normalized(a),normalized(b)));}
function localKey(){return 'sin-limites:'+user.uid+':'+CHAPTER_ID;}
function readLocal(){try{return JSON.parse(localStorage.getItem(localKey())||'null');}catch{return null;}}
function storeLocal(pending=true){
  try{localStorage.setItem(localKey(),JSON.stringify({progress:P,pending}));return true;}
  catch{return false;}
}
function record(uid=user.uid){return db.collection('users').doc(uid).collection('progress').doc(CHAPTER_ID);}
function cloudPayload(){return {...P,...window.ChapterPractice.summary(CHAPTER_ID,P),courseId:4,courseName:'Geometría',chapterNumber:1,topicIndex:0,catalogVersion:10,contentType:'chapter',moduleId:CHAPTER_ID,chapterName:CONTENT.title,schemaVersion:3,updatedAt:firebase.firestore.FieldValue.serverTimestamp()};}
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
function header(){return '<a class="skip" href="#chapter-content">Ir al contenido</a><header class="top"><div class="wrap"><a class="brand" href="index.html"><span class="logo"><img src="assets/logo-sin-limites.jpg" alt="Logo de SIN LÍMITES" width="56" height="56"></span><span>SIN <em>LÍMITES</em><small>ACADEMIA VIRTUAL</small></span></a><a class="back" href="index.html?course=4">← Temario de Geometría · 24 capítulos</a></div></header>';}
function side(){return `<button data-action="intro" ${P.activeTab==='intro'?'aria-current="step"':''} class="${P.activeTab==='intro'?'active':''}"><span class="stepno" aria-hidden="true">✦</span><span>Antes de empezar</span></button>`+LESSONS.map((lesson,i)=>`<button data-action="lesson" data-index="${i}" ${P.activeTab==='theory'&&P.currentItem===i?'aria-current="step"':''} class="${P.activeTab==='theory'&&P.currentItem===i?'active':''}"><span class="stepno">${String(i+1).padStart(2,'0')}</span><span>${escapeHTML(lesson.title)}</span></button>`).join('');}
function introView(){return `${window.ChapterLearningGoals.render(CONTENT)}<p class="geometry-source">${escapeHTML(CONTENT.sourceNote)}</p><div class="actions"><button class="button" data-action="lesson" data-index="0">Comenzar capítulo →</button></div>`;}
function lessonView(){
 const i=P.currentItem,x=LESSONS[i];
 const body=x.body.replace(/__FIGURE_(\w+)__/g,(_,key)=>window.ChapterPractice.renderFigure(CONTENT.inlineFigures[key],'inline:'+key)).replace('__SHAPE_CAROUSEL__',()=>window.GeometryShapeCarousel?.render(CONTENT.shapeGallery)||'').replace('__PLANE_SHAPE_CAROUSEL__',()=>window.GeometryShapeCarousel?.render(CONTENT.planeShapeGallery,{id:'geometria-plana-figuras',label:'Ejemplos de geometría plana'})||'').replace('__SPACE_SHAPE_CAROUSEL__',()=>window.GeometryShapeCarousel?.render(CONTENT.spaceShapeGallery,{id:'geometria-espacio-figuras',label:'Ejemplos de geometría del espacio'})||'');
 return `<p class="eyebrow">Tema ${i+1} de ${LESSONS.length}</p><h2 id="${escapeHTML(x.id)}">${escapeHTML(x.title)}</h2><div class="content">${body}${x.visuals.map((v,j)=>window.ChapterPractice.renderFigure(v,'theory:'+x.id+':'+j)).join('')}</div><div class="actions"><button class="button secondary" data-action="${i===0?'intro':'lesson'}" data-index="${i-1}">${i===0?'← Antes de empezar':'← Tema anterior'}</button>${i<LESSONS.length-1?`<button class="button" data-action="lesson" data-index="${i+1}">Siguiente tema →</button>`:'<button class="button" data-action="tab" data-value="examples">Ver problemas resueltos →</button>'}</div>`;
}
function workedExamplesView(){return `<p class="eyebrow">Aplicamos lo aprendido</p><h2>4 problemas resueltos</h2><p>Lee el enunciado y observa el gráfico. Después abre la solución para seguir el razonamiento paso a paso.</p>${CONTENT.workedExamples.map(e=>`<section class="example worked-example" id="geometria-resuelto-${e.number}"><p class="eyebrow">Problema resuelto ${e.number} · ${escapeHTML(e.source)}</p><h3>${escapeHTML(e.title)}</h3><p>${e.question}</p>${window.ChapterPractice.renderFigure(e.figure,'worked:'+e.number)}<details><summary>Ver solución paso a paso</summary><ol>${e.steps.map(step=>'<li>'+step+'</li>').join('')}</ol></details></section>`).join('')}`;}
function proposedView(){return `<p class="eyebrow">Problemas del material</p><h2>35 problemas propuestos</h2><p>Estudia los enunciados del capítulo, organizados por nivel. La práctica final reúne diez de estos problemas para comprobar tus respuestas.</p><nav class="geometry-problem-levels" aria-label="Niveles de los problemas"><a href="#propuestos-basicos">Nivel básico · 1 al 17</a><a href="#propuestos-intermedios">Nivel intermedio · 18 al 35</a></nav>${CONTENT.proposed.map(q=>`${q.number===1||q.number===18?`<h3 class="geometry-level-heading" id="${q.number===1?'propuestos-basicos':'propuestos-intermedios'}">Nivel ${q.number===1?'básico':'intermedio'}</h3>`:''}<section class="geometry-proposed" id="geometria-propuesto-${q.number}"><p class="eyebrow">Problema ${q.number}</p><h4 class="sr-only">Problema propuesto ${q.number}</h4><p>${q.prompt}</p>${q.figure?window.ChapterPractice.renderFigure(q.figure,'proposed:'+q.number):''}<ol class="geometry-proposed-options" type="A">${q.options.map(option=>'<li>'+option+'</li>').join('')}</ol>${q.reviewNote?'<p class="geometry-review-note"><strong>Para revisar.</strong> '+escapeHTML(q.reviewNote)+'</p>':''}</section>`).join('')}<div class="actions"><button class="button" data-action="tab" data-value="practice">Ir a la práctica →</button></div>`;}
function practiceView(){return window.ChapterPractice.render(CHAPTER_ID,P.practice10,P.studyMode,notice);}

function chapterProgressView(){
  const tools=`<p id="save-status" class="save-line ${cloudReady?'':'warning'}" role="status">${escapeHTML(saveMessage)}</p><button id="retry-save" class="button secondary small" data-action="sync" ${cloudReady?'hidden':''}>Reintentar sincronización</button>`;
  if(P.studyMode!=='progressive')return `<div class="chapter-utilities">${tools}</div>`;
  const percent=progressPercent();
  return `<section class="card overview"><div><div class="progress-head"><span>Mi avance en el capítulo</span><strong>${percent}%</strong></div><progress max="100" value="${percent}" aria-label="Avance del capítulo">${percent}%</progress><small>${P.practice10.mastered.length}/10 problemas resueltos correctamente</small>${tools}</div></section>`;
}

function render(){
 if(!user)return;
 if(!P.studyMode){window.location.replace('index.html?chapter='+CHAPTER_ID);return;}
 window.GeometryShapeCarousel?.destroy();
 root.innerHTML=`${header()}<section class="hero"><div class="wrap"><p class="eyebrow">Geometría · Capítulo 1 de 24</p><h1>Segmentos y ángulos</h1></div></section><div class="wrap">${chapterProgressView()}<div class="layout"><aside class="card sidebar"><p class="eyebrow">Tu ruta de aprendizaje</p><nav class="route" aria-label="Temas del capítulo">${side()}</nav><p class="hint">${P.studyMode==='progressive'?'Completa los 10 problemas de la práctica para alcanzar el 100%. La teoría y los propuestos están disponibles para consultar.':'Explora la teoría y los problemas en el orden que prefieras.'}</p></aside><main class="workspace" id="chapter-content"><nav class="card tabs geometry-tabs" aria-label="Secciones del capítulo">${[['theory','Teoría'],['examples','Resueltos · 4'],['proposed','Propuestos · 35'],['practice','Práctica · 10']].map(([id,title])=>`<button data-action="tab" data-value="${id}" class="${P.activeTab===id||id==='theory'&&P.activeTab==='intro'?'active':''}" ${P.activeTab===id||id==='theory'&&P.activeTab==='intro'?'aria-current="page"':''}>${title}</button>`).join('')}</nav><article class="card article">${notice&&P.activeTab!=='practice'?`<div role="alert" class="feedback" id="notice">${escapeHTML(notice)}</div>`:''}${P.activeTab==='intro'?introView():P.activeTab==='examples'?workedExamplesView():P.activeTab==='proposed'?proposedView():P.activeTab==='practice'?practiceView():lessonView()}</article></main></div></div><footer class="footer">SIN LÍMITES · Geometría · Segmentos y ángulos</footer><dialog id="geometry-figure-dialog" class="geometry-figure-dialog" aria-labelledby="geometry-figure-title"></dialog>`;
 renderMath();
 window.GeometryShapeCarousel?.mount(root);
}
function scrollContent(){document.getElementById('chapter-content')?.scrollIntoView({behavior:'smooth',block:'start'});}
function showNotice(message){notice=message;render();document.getElementById('notice')?.scrollIntoView({block:'center',behavior:'smooth'});}
function clearAnchor(){if(window.location.hash&&window.history?.replaceState)window.history.replaceState(null,'',window.location.pathname+window.location.search);}
function goIntro(){clearAnchor();P.activeTab='intro';notice='';markChanged();render();persist();scrollContent();}
function applyIntroAnchor(draw=true){if(!['learning-goals','antes-de-empezar'].includes(window.location.hash?.slice(1)))return false;P.activeTab='intro';if(draw){notice='';markChanged();render();persist();scrollContent();}return true;}
function goLesson(i){if(!canOpen(i))return;clearAnchor();P.currentItem=i;P.readingItem=i;P.activeTab='theory';notice='';markChanged();render();persist();scrollContent();}
function goTab(tab){if(!['theory','examples','proposed','practice'].includes(tab))return;clearAnchor();P.activeTab=tab;notice='';markChanged();render();persist();scrollContent();}

function checkPractice(id){if(P.activeTab!=='practice')return;const result=window.ChapterPractice.check(CHAPTER_ID,P.practice10,id,P.studyMode);if(result==='locked'||result==='unchanged')return;notice=result==='missing'?'Selecciona una alternativa antes de comprobar.':'';if(result==='graded')markChanged();render();if(result==='graded'){persist();const feedback=document.getElementById('practice-feedback-'+id);feedback?.focus({preventScroll:true});feedback?.scrollIntoView({block:'nearest',behavior:'instant'});}else document.querySelector('input[name="practice10-'+id+'"]')?.focus();}



root.addEventListener('click',event=>{
const button=event.target.closest('[data-action]');if(!button||button.disabled||!user)return;
const {action,value,index,id}=button.dataset;if(action==='figure-fullscreen')fullscreenFigure();else if(action==='math-figure')openFigure(id);else if(action==='close-figure')closeFigure();else if(action==='intro')goIntro();else if(action==='lesson')goLesson(Number(index));else if(action==='tab')goTab(value);else if(action==='check-practice10')checkPractice(id);else if(action==='sync')retrySync();
});
root.addEventListener('change',event=>{
if(!user)return;const input=event.target;

if(input.dataset.group==='practice10'&&window.ChapterPractice.choose(CHAPTER_ID,P.practice10,input.dataset.question,Number(input.value),P.studyMode))saveSoon();
});
window.addEventListener('pagehide',()=>{window.GeometryShapeCarousel?.destroy();if(user&&saveTimer){clearTimeout(saveTimer);persist();}});

async function signedIn(u){
  window.GeometryShapeCarousel?.destroy();
  const epoch=++authEpoch;clearTimeout(saveTimer);user=u;P=emptyProgress();cloudReady=false;saveVersion=0;saveChain=Promise.resolve();notice='';
  
  if(!u){root.innerHTML=`${header()}<main id="chapter-content" class="access card"><p class="eyebrow">Geometría · Capítulo 1 de 24</p><h1>Segmentos y ángulos</h1><p>Inicia sesión en la academia para estudiar y guardar tu avance.</p><a class="button" href="index.html?chapter=geometria-capitulo-01">Continuar con Google</a></main>`;return;}
 if(window.StudyMode&&!await window.StudyMode.requireChoice(u.uid,db,'geometria-capitulo-01',()=>epoch===authEpoch))return;
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
  const navigation={catalogVersion:10,lastCourseId:4,lastCourseName:'Geometría',lastTopicIndex:0,lastChapterNumber:1,lastModuleId:CHAPTER_ID,lastChapterName:CONTENT.title};
  try{localStorage.setItem('academia-sm-state',JSON.stringify({catalogVersion:10,activeCourseId:4,activeTopicIndex:0,activeModuleId:CHAPTER_ID,activeTopicName:CONTENT.title}));}catch{}
  if(cloudReady)try{await db.collection('users').doc(u.uid).collection('progress').doc('navigation').set({...navigation,updatedAt:firebase.firestore.FieldValue.serverTimestamp()},{merge:true});}catch(error){console.error('Navigation save:',error);}
}
if(!window.firebase){root.innerHTML='<main class="access card"><h1>No se pudo cargar la sesión</h1><p>Revisa tu conexión y vuelve a abrir este capítulo.</p><a class="button" href="geometria-capitulo-01.html?v=20261103-geometry1">Reintentar</a></main>';}
else{firebase.initializeApp(CONFIG);db=firebase.firestore();firebase.auth().onAuthStateChanged(signedIn);}


function refreshStudyMode(){
 if(!user||!window.StudyMode)return;
 const mode=window.StudyMode.get(user.uid);
 if(mode&&mode!==P.studyMode){P=normalized(P);notice='';markChanged();render();persist();}
}
window.addEventListener('pageshow',event=>{refreshStudyMode();if(event.persisted&&user)render();});
window.addEventListener('storage',event=>{if(user&&window.StudyMode&&event.key===window.StudyMode.key(user.uid))refreshStudyMode();});

// Explicit links select a view without changing lesson numbering.
function applyAnchor(draw=true){
 if(applyIntroAnchor(draw))return;
 const id=window.location.hash?.slice(1);if(!id)return;
 const index=['figuras-geometricas','geometria-plana-figuras','geometria-espacio-figuras'].includes(id)?0:LESSONS.findIndex(l=>l.id===id);
 if(index>=0){P.currentItem=index;P.readingItem=index;P.activeTab='theory';}
 else if(/^geometria-resuelto-\d+$/.test(id))P.activeTab='examples';
 else if(/^geometria-propuesto-\d+$/.test(id)||['propuestos-basicos','propuestos-intermedios'].includes(id))P.activeTab='proposed';
 else return;
 if(draw){notice='';markChanged();render();persist();scrollAnchor(id);}
}
function scrollAnchor(id=window.location.hash?.slice(1)){document.getElementById(id)?.scrollIntoView({block:'start',behavior:'instant'});}
window.addEventListener('hashchange',()=>{if(user)applyAnchor();});
function openFigure(id){
 const [kind,key,part]=String(id).split(':');
 const item=kind==='worked'?CONTENT.workedExamples.find(e=>e.number===Number(key)):kind==='proposed'?CONTENT.proposed.find(e=>e.number===Number(key)):window.ChapterPractice.questions(CHAPTER_ID).find(q=>q.id===key);
 const figure=kind==='inline'?CONTENT.inlineFigures[key]:kind==='theory'?LESSONS.find(l=>l.id===key)?.visuals?.[Number(part)||0]:item?.figure;
 const dialog=document.getElementById('geometry-figure-dialog');if(!figure||!dialog)return;
 dialog.innerHTML=`<header><h2 id="geometry-figure-title">${escapeHTML(figure.caption)}</h2><div><button class="button secondary" data-action="figure-fullscreen">⛶ Pantalla completa</button><button class="button secondary" data-action="close-figure" autofocus>Cerrar</button></div></header><img src="${escapeHTML(figure.src)}" alt="${escapeHTML(figure.alt)}" width="${figure.width}" height="${figure.height}">`;
 dialog.showModal();
}
async function fullscreenFigure(){const dialog=document.getElementById('geometry-figure-dialog');if(!dialog?.open)return;dialog.classList.add('is-fullscreen');try{if(!document.fullscreenElement&&document.documentElement.requestFullscreen)await document.documentElement.requestFullscreen();}catch{ /* La vista ampliada ocupa la ventana en navegadores sin esta API. */ }}
function closeFigure(){const dialog=document.getElementById('geometry-figure-dialog');if(document.fullscreenElement===document.documentElement)document.exitFullscreen?.().catch(()=>{});dialog?.classList.remove('is-fullscreen');dialog?.close();}
document.addEventListener('fullscreenchange',()=>{if(!document.fullscreenElement)document.getElementById('geometry-figure-dialog')?.classList.remove('is-fullscreen');});
