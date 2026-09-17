'use strict';
const CONTENT=window.DIMENSIONAL_CONTENT;
const CHAPTER_ID='fisica-capitulo-01';
const LESSONS=CONTENT.lessons;

const CONFIG={apiKey:'AIzaSyCurhmnJ21SMqGM6G54t8QM8jcqO8jV0OE',authDomain:'sin-limites-12f07.firebaseapp.com',projectId:'sin-limites-12f07',storageBucket:'sin-limites-12f07.firebasestorage.app',messagingSenderId:'757098079298',appId:'1:757098079298:web:068a9a7ea93149bfef79db'};
const root=document.getElementById('chapter-app');
const escapeHTML=value=>String(value??'').replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&#039;');
let user=null,db=null,cloudReady=false,saveChain=Promise.resolve(),saveVersion=0,authEpoch=0;
let saveMessage='',notice='',P=emptyProgress(),saveTimer=null;

function emptyProgress(){return {studyMode:null,currentItem:0,readingItem:0,activeTab:'theory',practice10:window.ChapterPractice.normalize(CHAPTER_ID),updatedMs:0};}



function normalized(data={}){const p={...data,...emptyProgress()};p.studyMode=window.StudyMode?.get(user?.uid)||(['free','progressive'].includes(data.studyMode)?data.studyMode:null);p.currentItem=Number.isInteger(data.currentItem)?Math.max(0,Math.min(LESSONS.length-1,data.currentItem)):0;p.readingItem=Number.isInteger(data.readingItem)?Math.max(0,Math.min(LESSONS.length-1,data.readingItem)):p.currentItem;p.activeTab=data.activeTab==='exam'?'practice':['theory','practice','resources'].includes(data.activeTab)?data.activeTab:'theory';p.practice10=window.ChapterPractice.normalize(CHAPTER_ID,data);p.updatedMs=Math.max(0,Number(data.updatedMs)||0);return p;}
function progressiveLimit(p=P){return window.ChapterPractice.limit(CHAPTER_ID,p.practice10);}
function canOpen(i){return Number.isInteger(i)&&i>=0&&i<LESSONS.length;}
function canApply(){return true;}
function progressPercent(p=P){return p.practice10.mastered.length*10;}
function chapterComplete(p=P){return p.practice10.mastered.length===10;}
function mergeProgress(a={},b={}){return normalized(window.ChapterPractice.merge(CHAPTER_ID,a,b));}
function localKey(){return 'sin-limites:'+user.uid+':'+CHAPTER_ID;}
function readLocal(){try{return JSON.parse(localStorage.getItem(localKey())||'null');}catch{return null;}}
function storeLocal(pending=true){
  try{localStorage.setItem(localKey(),JSON.stringify({progress:P,pending}));return true;}
  catch{return false;}
}
function record(uid=user.uid){return db.collection('users').doc(uid).collection('progress').doc(CHAPTER_ID);}
function cloudPayload(){return {...P,...window.ChapterPractice.summary(CHAPTER_ID,P),courseId:16,courseName:'Física',chapterNumber:1,chapterName:CONTENT.title,schemaVersion:3,updatedAt:firebase.firestore.FieldValue.serverTimestamp()};}
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
function header(){return '<a class="skip" href="#chapter-content">Ir al contenido</a><header class="top"><div class="wrap"><a class="brand" href="index.html"><span class="logo"><img src="assets/logo-sin-limites.jpg" alt="Logo de SIN LÍMITES" width="56" height="56" style="display:block;width:100%;height:100%;object-fit:contain;border-radius:inherit"></span><span>SIN <em>LÍMITES</em><small>ACADEMIA VIRTUAL</small></span></a><a class="back" href="index.html?course=16">← Los 25 capítulos de Física</a></div></header>';}

function side(){return LESSONS.map((lesson,i)=>{const active=P.activeTab==='theory'&&P.currentItem===i;return '<button data-action="lesson" data-index="'+i+'" '+(active?'aria-current="step"':'')+' class="'+(active?'active':'')+'"><span class="stepno">'+String(i+1).padStart(2,'0')+'</span><span>'+lesson.title+'</span></button>';}).join('');}



function lab(){return '<section class="lab"><p class="eyebrow">Explora una fórmula</p><h3>¿Qué potencia de tiempo falta?</h3><p>La velocidad se expresa como \\(v=v_0+at^n\\). Cambia el exponente para que el término de aceleración tenga dimensión de velocidad.</p><label for="power-slider">Exponente n: <output id="power-value">0</output></label><input id="power-slider" type="range" min="0" max="3" step="1" value="0"><div id="lab-result" aria-live="polite"></div></section>';}
function updateLab(n){
  const output=document.getElementById('power-value'),el=document.getElementById('lab-result');if(!el)return;
  output.textContent=n;el.innerHTML=`<div class="equation">\\[[at^{${n}}]=LT^{${n-2}}\\]</div><p>${n===1?'✓ Con n = 1, ambos términos tienen dimensión de velocidad.':'Todavía no coincide con '+String.raw`\(LT^{-1}\)`+'. Prueba otro exponente.'}</p>`;renderMath();
}
function lessonView(){
  const i=P.currentItem,x=LESSONS[i];
  return `<p class="eyebrow">Tema ${i+1} de ${LESSONS.length} · ${x.subtitle}</p><h2>${x.title}</h2><div class="goal"><strong>Al terminar:</strong> ${x.goal}</div><div class="content">${x.body}</div><div class="key"><b>Qué debes recordar</b>${x.key}</div>${x.examples.map(e=>`<section class="example"><p class="eyebrow">Ejemplo resuelto</p><h3>${e.title}</h3><p>${e.question}</p><ol>${e.steps.map(s=>`<li>${s}</li>`).join('')}</ol></section>`).join('')}${i===3?lab():''}<div class="actions"><button class="button secondary" data-action="lesson" data-index="${i-1}" ${i===0?'disabled':''}>← Tema anterior</button>${i<LESSONS.length-1?`<button class="button" data-action="lesson" data-index="${i+1}" ${!canOpen(i+1)?'disabled':''}>Siguiente tema →</button>`:`<button class="button" data-action="tab" data-value="practice" ${!canApply()?'disabled':''}>Ir a la práctica →</button>`}</div>`;
}
function practiceView(){return window.ChapterPractice.render(CHAPTER_ID,P.practice10,P.studyMode,notice);}

function resourcesView(){return `<p class="eyebrow">Consulta rápida</p><h2>Formulario y estrategia</h2><p>Usa estas tablas para repasar. Intenta reconstruir cada fórmula dimensional antes de consultarla.</p>${CONTENT.derivedTable}<h3>Reglas esenciales</h3><div class="equation">\\[[AB]=[A][B],\\qquad[A/B]=\\frac{[A]}{[B]},\\qquad[A^n]=[A]^n\\]</div><ul class="resource-list"><li>En una suma o resta, todos los términos deben tener la misma dimensión.</li><li>Los números puros tienen dimensión uno. Las constantes físicas pueden tener dimensiones.</li><li>El argumento de una función trigonométrica, exponencial o logarítmica debe ser adimensional.</li><li>Una ecuación homogénea puede ser físicamente incorrecta. Los factores numéricos no se obtienen solo por dimensiones.</li></ul><h3>Ruta para resolver un problema</h3><ol class="resource-list"><li>Identifica qué representa cada símbolo.</li><li>Escribe sus dimensiones a partir de relaciones conocidas.</li><li>Sustituye y aplica las leyes de exponentes.</li><li>Usa homogeneidad o compara exponentes de M, L y T.</li><li>Comprueba el resultado y sus límites físicos.</li></ol><details><summary>Las siete magnitudes base del SI</summary>${CONTENT.baseTable}</details><h3>Referencias para ampliar</h3><ul class="resource-list"><li><a href="https://www.bipm.org/en/measurement-units" target="_blank" rel="noopener noreferrer">BIPM · Sistema Internacional de Unidades</a></li><li><a href="https://openstax.org/books/university-physics-volume-1/pages/1-4-dimensional-analysis" target="_blank" rel="noopener noreferrer">OpenStax · Análisis dimensional (en inglés)</a></li></ul><p class="resource-note">Teoría, ejemplos y ejercicios redactados para este capítulo. Las referencias permiten ampliar los fundamentos.</p>`;}
function render(){
  if(!user)return;
  if(!P.studyMode){window.location.replace('index.html?chapter='+CHAPTER_ID);return;}
  const percent=progressPercent();
  root.innerHTML=`${header()}<section class="hero"><div class="wrap"><div><p class="eyebrow">Física · Capítulo 01 de 25</p><h1>Análisis dimensional</h1><p>Descubre el lenguaje de las magnitudes. Comprueba fórmulas, encuentra dimensiones y construye relaciones físicas.</p></div><div class="dimension-visual" aria-label="Masa, longitud y tiempo: las tres dimensiones principales de la mecánica"><div class="letters"><div class="letter"><b>M</b><small>Masa</small></div><div class="letter"><b>L</b><small>Longitud</small></div><div class="letter"><b>T</b><small>Tiempo</small></div></div><div class="equation">\\[[F]=MLT^{-2}\\]</div></div></div></section><div class="wrap"><section class="card overview"><div><div class="progress-head"><span>Mi avance en el capítulo</span><strong>${percent}%</strong></div><progress max="100" value="${percent}" aria-label="Avance del capítulo">${percent}%</progress><small>${P.practice10.mastered.length}/10 problemas resueltos correctamente</small><p id="save-status" class="save-line ${cloudReady?'':'warning'}" role="status">${escapeHTML(saveMessage)}</p><button id="retry-save" class="button secondary small" data-action="sync" ${cloudReady?'hidden':''}>Reintentar sincronización</button></div></section><div class="layout"><aside class="card sidebar"><p class="eyebrow">Tu ruta de aprendizaje</p><nav class="route" aria-label="Temas del capítulo">${side()}</nav><p class="hint">Completa los 10 problemas de la práctica para alcanzar el 100%. La teoría está disponible para consultar.</p></aside><main class="workspace" id="chapter-content"><nav class="card tabs" aria-label="Secciones del capítulo">${[['theory','Teoría'],['practice','Práctica · 10 problemas'],['resources','Materiales']].map(([id,title])=>`<button data-action="tab" data-value="${id}" class="${P.activeTab===id?'active':''}" ${P.activeTab===id?'aria-current="page"':''} >${title}</button>`).join('')}</nav><article class="card article">${notice?`<div role="alert" class="feedback" id="notice">${escapeHTML(notice)}</div>`:''}${P.activeTab==='theory'?lessonView():P.activeTab==='practice'?practiceView():resourcesView()}</article></main></div></div><footer class="footer">SIN LÍMITES · Física · Análisis dimensional</footer>`;
  renderMath();if(P.activeTab==='theory'&&P.currentItem===3)updateLab(0);
}
function scrollContent(){document.getElementById('chapter-content')?.scrollIntoView({behavior:'smooth',block:'start'});}
function showNotice(message){notice=message;render();document.getElementById('notice')?.scrollIntoView({block:'center',behavior:'smooth'});}
function goLesson(i){if(!canOpen(i))return;P.currentItem=i;P.activeTab='theory';notice='';markChanged();render();persist();scrollContent();}
function goTab(tab){if(!['theory','practice','resources'].includes(tab))return;P.activeTab=tab;notice='';markChanged();render();persist();scrollContent();}

function checkPractice(id){if(P.activeTab!=='practice')return;const result=window.ChapterPractice.check(CHAPTER_ID,P.practice10,id,P.studyMode);if(result==='locked'||result==='unchanged')return;notice=result==='missing'?'Selecciona una alternativa antes de comprobar.':'';if(result==='graded')markChanged();render();if(result==='graded'){persist();const feedback=document.getElementById('practice-feedback-'+id);feedback?.focus({preventScroll:true});feedback?.scrollIntoView({block:'nearest',behavior:'instant'});}else document.querySelector('input[name="practice10-'+id+'"]')?.focus();}



root.addEventListener('click',event=>{
const button=event.target.closest('[data-action]');if(!button||button.disabled||!user)return;const {action,value,index,id}=button.dataset;if(action==='lesson')goLesson(Number(index));else if(action==='tab')goTab(value);else if(action==='check-practice10')checkPractice(id);else if(action==='sync')retrySync();
});
root.addEventListener('change',event=>{
if(!user)return;const input=event.target;if(input.dataset.group==='practice10'&&window.ChapterPractice.choose(CHAPTER_ID,P.practice10,input.dataset.question,Number(input.value),P.studyMode))saveSoon();
});
root.addEventListener('input',event=>{if(event.target.id==='power-slider')updateLab(Number(event.target.value));});
window.addEventListener('pagehide',()=>{if(user&&saveTimer){clearTimeout(saveTimer);persist();}});

async function signedIn(u){
  const epoch=++authEpoch;clearTimeout(saveTimer);user=u;P=emptyProgress();cloudReady=false;saveVersion=0;saveChain=Promise.resolve();notice='';
  if(!u){root.innerHTML=`${header()}<main id="chapter-content" class="access card"><p class="eyebrow">Física · Capítulo 1</p><h1>Análisis dimensional</h1><p>Inicia sesión en la academia para estudiar y guardar tu avance.</p><a class="button" href="index.html?chapter=fisica-capitulo-01">Continuar con Google</a></main>`;return;}
 if(window.StudyMode&&!await window.StudyMode.requireChoice(u.uid,db,'fisica-capitulo-01',()=>epoch===authEpoch))return;
 if(epoch!==authEpoch)return;
  const local=readLocal();P=normalized(local?.progress||{});
  try{
    const snap=await record().get();if(epoch!==authEpoch)return;
    P=mergeProgress(snap.exists?snap.data():{},P);cloudReady=true;setSaveStatus('Tu avance está actualizado.');
  }catch(error){if(epoch!==authEpoch)return;console.error('Chapter load:',error);setSaveStatus('No se pudo cargar el avance en la nube. Puedes continuar y reintentar la sincronización.');}
  render();
  if(cloudReady){markChanged();await persist();}
  if(epoch!==authEpoch)return;
  // The navigation document lets the catalog and teacher panel resume this chapter.
  const navigation={catalogVersion:2,lastCourseId:16,lastCourseName:'Física',lastTopicIndex:0,lastChapterNumber:1,lastChapterName:CONTENT.title};
  try{localStorage.setItem('academia-sm-state',JSON.stringify({catalogVersion:2,activeCourseId:16,activeTopicIndex:0,activeTopicName:CONTENT.title}));}catch{}
  if(cloudReady)try{await db.collection('users').doc(u.uid).collection('progress').doc('navigation').set({...navigation,updatedAt:firebase.firestore.FieldValue.serverTimestamp()},{merge:true});}catch(error){console.error('Navigation save:',error);}
}
if(!window.firebase){root.innerHTML='<main class="access card"><h1>No se pudo cargar la sesión</h1><p>Revisa tu conexión y vuelve a abrir este capítulo.</p><a class="button" href="fisica-capitulo-01.html?v=20260918-social1">Reintentar</a></main>';}
else{firebase.initializeApp(CONFIG);db=firebase.firestore();firebase.auth().onAuthStateChanged(signedIn);}


function refreshStudyMode(){
 if(!user||!window.StudyMode)return;
 const mode=window.StudyMode.get(user.uid);
 if(mode&&mode!==P.studyMode){P=normalized(P);notice='';markChanged();render();persist();}
}
window.addEventListener('pageshow',refreshStudyMode);
window.addEventListener('storage',event=>{if(user&&window.StudyMode&&event.key===window.StudyMode.key(user.uid))refreshStudyMode();});
