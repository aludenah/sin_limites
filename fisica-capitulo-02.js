'use strict';
const CONTENT=window.VECTOR_CONTENT;
const CHAPTER_ID='fisica-capitulo-02';
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
function cloudPayload(){return {...P,...window.ChapterPractice.summary(CHAPTER_ID,P),courseId:16,courseName:'Física',chapterNumber:2,topicIndex:1,catalogVersion:10,contentType:'chapter',moduleId:CHAPTER_ID,chapterName:CONTENT.title,schemaVersion:3,updatedAt:firebase.firestore.FieldValue.serverTimestamp()};}
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



function lab(){return `<section class="lab"><p class="eyebrow">Laboratorio de vectores</p><h3>Construye una resultante</h3><p>Cambia las componentes de dos vectores en las mismas unidades. La flecha R representa su suma; el segmento discontinuo traslada B hasta la punta de A.</p><div class="vector-controls">${[['ax','Aₓ',4],['ay','Aᵧ',0],['bx','Bₓ',0],['by','Bᵧ',3]].map(([id,label,value])=>`<label for="vector-${id}">${label}: <output id="value-${id}">${value}</output><input id="vector-${id}" type="range" min="-10" max="10" step="1" value="${value}" data-vector="${id}"></label>`).join('')}</div><div class="vector-legend"><span>A · azul</span><span>B · verde</span><span>R = A + B · rojo</span></div><div id="vector-plot"></div><div id="lab-result" aria-live="polite"></div><p class="resource-note">Prueba estos casos: vectores perpendiculares, dos vectores iguales y dos vectores opuestos. Los controles del laboratorio no cuentan como preguntas de evaluación.</p></section>`;}
function vectorResult(ax,ay,bx,by){
  const x=ax+bx,y=ay+by,magnitude=Math.hypot(x,y);
  return {x,y,magnitude,angle:magnitude===0?null:(Math.atan2(y,x)*180/Math.PI+360)%360};
}
function updateLab(){
  const el=document.getElementById('lab-result'),plot=document.getElementById('vector-plot');if(!el||!plot)return;
  const values=['ax','ay','bx','by'].map(id=>{
    const input=document.getElementById('vector-'+id),raw=Number(input.value);
    const value=Number.isFinite(raw)?Math.min(10,Math.max(-10,Math.round(raw))):0;
    input.value=value;document.getElementById('value-'+id).textContent=value;return value;
  });
  const [ax,ay,bx,by]=values,r=vectorResult(...values);
  const format=n=>n.toLocaleString('es-PE',{maximumFractionDigits:2});
  const bound=Math.max(10,Math.abs(ax)+2,Math.abs(ay)+2,Math.abs(bx)+2,Math.abs(by)+2,Math.abs(r.x)+2,Math.abs(r.y)+2),scale=120/bound;
  const point=(x,y)=>[180+x*scale,160-y*scale];
  const line=(x1,y1,x2,y2,color,dashed=false)=>{
    const [a,b]=point(x1,y1),[c,d]=point(x2,y2);
    if(x1===x2&&y1===y2)return '';
    return `<line x1="${a}" y1="${b}" x2="${c}" y2="${d}" stroke="${color}" stroke-width="${dashed?2:3}" ${dashed?'stroke-dasharray="5 4"':`marker-end="url(#lab-${color.slice(1)})"`}/>`;
  };
  const markers=['#285c9b','#188269','#cf4151'].map(color=>`<marker id="lab-${color.slice(1)}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0 L10 5 L0 10 Z" fill="${color}"/></marker>`).join('');
  const description=`A = (${ax}, ${ay}); B = (${bx}, ${by}); resultante = (${r.x}, ${r.y}).`;
  plot.innerHTML=`<svg class="vector-chart" viewBox="0 0 360 320" role="img" aria-label="${description}"><defs>${markers}</defs><path d="M30 160 H330 M180 15 V300" fill="none" stroke="#afbdcc"/><text x="332" y="153">x</text><text x="189" y="23">y</text><text x="165" y="179">0</text><text x="294" y="181">${bound}</text><text x="48" y="181">−${bound}</text><text x="188" y="44">${bound}</text><text x="188" y="284">−${bound}</text>${line(0,0,ax,ay,'#285c9b')}${line(0,0,bx,by,'#188269')}${line(ax,ay,r.x,r.y,'#188269',true)}${line(0,0,r.x,r.y,'#cf4151')}<circle cx="180" cy="160" r="3" fill="#122744"/></svg>`;
  el.innerHTML=`<div class="lab-answer"><b>R = (${r.x}; ${r.y})</b><span>Módulo: ${format(r.magnitude)} unidades</span><span>${r.angle===null?'Sin dirección: vector nulo.':'Ángulo desde +x: '+format(r.angle)+'° (antihorario).'}</span></div>`;
}
function lessonView(){
  const i=P.currentItem,x=LESSONS[i];
  return `<p class="eyebrow">Tema ${i+1} de ${LESSONS.length} · ${x.subtitle}</p><h2>${x.title}</h2><div class="content">${x.body}</div>${x.examples.map(e=>`<section class="example"><p class="eyebrow">Ejemplo resuelto</p><h3>${e.title}</h3><p>${e.question}</p><ol>${e.steps.map(s=>`<li>${s}</li>`).join('')}</ol></section>`).join('')}${i===3?lab():''}<div class="actions"><button class="button secondary" data-action="lesson" data-index="${i-1}" ${i===0?'disabled':''}>← Tema anterior</button>${i<LESSONS.length-1?`<button class="button" data-action="lesson" data-index="${i+1}" ${!canOpen(i+1)?'disabled':''}>Siguiente tema →</button>`:`<button class="button" data-action="tab" data-value="practice" ${!canApply()?'disabled':''}>Ir a la práctica →</button>`}</div>`;
}
function practiceView(){return window.ChapterPractice.render(CHAPTER_ID,P.practice10,P.studyMode,notice);}

function resourcesView(){return CONTENT.resources;}
function render(){
  if(!user)return;
  if(!P.studyMode){window.location.replace('index.html?chapter='+CHAPTER_ID);return;}
  const percent=progressPercent();
  root.innerHTML=`${header()}<section class="hero"><div class="wrap"><p class="eyebrow">Física · Capítulo 2 de 19</p><h1>Análisis Vectorial</h1></div></section><div class="wrap"><section class="card overview"><div><div class="progress-head"><span>Mi avance en el capítulo</span><strong>${percent}%</strong></div><progress max="100" value="${percent}" aria-label="Avance del capítulo">${percent}%</progress><small>${P.practice10.mastered.length}/10 problemas resueltos correctamente</small><p id="save-status" class="save-line ${cloudReady?'':'warning'}" role="status">${escapeHTML(saveMessage)}</p><button id="retry-save" class="button secondary small" data-action="sync" ${cloudReady?'hidden':''}>Reintentar sincronización</button></div></section><div class="layout"><aside class="card sidebar"><p class="eyebrow">Tu ruta de aprendizaje</p><nav class="route" aria-label="Temas del capítulo">${side()}</nav><p class="hint">Completa los 10 problemas de la práctica para alcanzar el 100%. La teoría está disponible para consultar.</p></aside><main class="workspace" id="chapter-content"><nav class="card tabs" aria-label="Secciones del capítulo">${[['theory','Teoría'],['practice','Práctica · 10 problemas'],['resources','Materiales']].map(([id,title])=>`<button data-action="tab" data-value="${id}" class="${P.activeTab===id?'active':''}" ${P.activeTab===id?'aria-current="page"':''} >${title}</button>`).join('')}</nav><article class="card article">${notice?`<div role="alert" class="feedback" id="notice">${escapeHTML(notice)}</div>`:''}${P.activeTab==='theory'?lessonView():P.activeTab==='practice'?practiceView():resourcesView()}</article></main></div></div><footer class="footer">SIN LÍMITES · Física · Análisis Vectorial</footer>`;
  renderMath();if(P.activeTab==='theory'&&P.currentItem===3)updateLab();
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
root.addEventListener('input',event=>{if(event.target.dataset.vector)updateLab();});
window.addEventListener('pagehide',()=>{if(user&&saveTimer){clearTimeout(saveTimer);persist();}});

async function signedIn(u){
  const epoch=++authEpoch;clearTimeout(saveTimer);user=u;P=emptyProgress();cloudReady=false;saveVersion=0;saveChain=Promise.resolve();notice='';
  if(!u){root.innerHTML=`${header()}<main id="chapter-content" class="access card"><p class="eyebrow">Física · Capítulo 2 de 19</p><h1>Análisis Vectorial</h1><p>Inicia sesión en la academia para estudiar y guardar tu avance.</p><a class="button" href="index.html?chapter=fisica-capitulo-02">Continuar con Google</a></main>`;return;}
 if(window.StudyMode&&!await window.StudyMode.requireChoice(u.uid,db,'fisica-capitulo-02',()=>epoch===authEpoch))return;
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
  const navigation={catalogVersion:10,lastCourseId:16,lastCourseName:'Física',lastTopicIndex:1,lastChapterNumber:2,lastModuleId:CHAPTER_ID,lastChapterName:CONTENT.title};
  try{localStorage.setItem('academia-sm-state',JSON.stringify({catalogVersion:10,activeCourseId:16,activeTopicIndex:1,activeModuleId:CHAPTER_ID,activeTopicName:CONTENT.title}));}catch{}
  if(cloudReady)try{await db.collection('users').doc(u.uid).collection('progress').doc('navigation').set({...navigation,updatedAt:firebase.firestore.FieldValue.serverTimestamp()},{merge:true});}catch(error){console.error('Navigation save:',error);}
}
if(!window.firebase){root.innerHTML='<main class="access card"><h1>No se pudo cargar la sesión</h1><p>Revisa tu conexión y vuelve a abrir este capítulo.</p><a class="button" href="fisica-capitulo-02.html?v=20260918-social1">Reintentar</a></main>';}
else{firebase.initializeApp(CONFIG);db=firebase.firestore();firebase.auth().onAuthStateChanged(signedIn);}


function refreshStudyMode(){
 if(!user||!window.StudyMode)return;
 const mode=window.StudyMode.get(user.uid);
 if(mode&&mode!==P.studyMode){P=normalized(P);notice='';markChanged();render();persist();}
}
window.addEventListener('pageshow',refreshStudyMode);
window.addEventListener('storage',event=>{if(user&&window.StudyMode&&event.key===window.StudyMode.key(user.uid))refreshStudyMode();});
