const firebaseConfig={
  apiKey:'AIzaSyCurhmnJ21SMqGM6G54t8QM8jcqO8jV0OE',
  authDomain:'sin-limites-12f07.firebaseapp.com',
  projectId:'sin-limites-12f07',
  storageBucket:'sin-limites-12f07.firebasestorage.app',
  messagingSenderId:'757098079298',
  appId:'1:757098079298:web:068a9a7ea93149bfef79db'
};

firebase.initializeApp(firebaseConfig);
const auth=firebase.auth();
const db=firebase.firestore();
auth.languageCode='es';

const googleProvider=new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({prompt:'select_account'});

const COURSES=window.COURSES||[];
const HISTORY_CHAPTERS=window.HISTORY_CHAPTERS||[];
const CATALOG_VERSION=3;
const CATEGORIES=['Todos',...new Set(COURSES.map(c=>c.category))];
const TAB_INFO={
  Teoría:{icon:'book-open',title:'Teoría del capítulo',text:'Aquí se incorporará el desarrollo conceptual, definiciones, propiedades, ejemplos y fórmulas esenciales de este capítulo.'},
  Práctica:{icon:'pencil-ruler',title:'Práctica dirigida',text:'Aquí se incorporarán ejercicios graduados, problemas tipo admisión y actividades de aplicación.'},
  Evaluación:{icon:'badge-check',title:'Evaluación',text:'Aquí se incorporará una evaluación breve con retroalimentación y registro de progreso.'},
  Materiales:{icon:'folder-open',title:'Materiales',text:'Aquí se podrán enlazar PDFs, videos, infografías, solucionarios y recursos complementarios.'}
};

const state={view:'mode',studyMode:null,activeCourseId:null,activeTopicIndex:0,activeTab:'Teoría',category:'Todos',search:''};
let currentUser=null;
let accountEpoch=0,pendingEntry=null;
let authMessage='';
let cloudProgressReady=false;
let navigationProgress={};
let chapterProgress={percent:0,completedItems:[],unlockedItem:0,currentItem:0,chapterCompleted:false,attempts:{},itemScores:{}};
let progressUnsubscribe=null;
let physicsProgress={percent:0,completedItems:[],unlockedItem:0,chapterCompleted:false,examBest:0};
let vectorsProgress={...physicsProgress};
let historyProgress={},historyRecords={};

const esc=v=>String(v??'').replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&#039;');
const clamp=(value,min,max)=>Math.min(Math.max(Number(value)||0,min),max);

function restoredTopicIndex(course,index,topicName,catalogVersion){
  const namedIndex=course.topics.indexOf(topicName);
  if(namedIndex>=0)return namedIndex;
  // Version 2 splits Física's first chapter and shifts the remaining chapters.
  if(course.id===16&&!(Number(catalogVersion)>=2)){
    const oldIndex=clamp(index,0,23);
    return oldIndex===0?0:oldIndex+1;
  }
  if(course.id===12&&!(Number(catalogVersion)>=3)){
    const map=[0,0,1,2,2,3,5,7,8,9,10,11,13,16,18,17,19,21,22,23,24,26,28,30];
    return map[clamp(index,0,23)]||0;
  }
  return clamp(index,0,course.topics.length-1);
}

function saveLocalProgress(){
  const course=COURSES.find(c=>c.id===state.activeCourseId);
  try{localStorage.setItem('academia-sm-state',JSON.stringify({
    activeCourseId:state.activeCourseId,
    activeTopicIndex:state.activeTopicIndex,
    activeTopicName:course?.topics[state.activeTopicIndex]||'',
    catalogVersion:CATALOG_VERSION
  }))}catch(e){}
}

function loadLocalProgress(){
  try{
    const s=JSON.parse(localStorage.getItem('academia-sm-state')||'null');
    const course=s&&COURSES.find(c=>c.id===s.activeCourseId);
    if(course){
      state.activeCourseId=course.id;
      state.activeTopicIndex=restoredTopicIndex(course,s.activeTopicIndex,s.activeTopicName,s.catalogVersion);
      saveLocalProgress();
    }
  }catch(e){}
}

async function ensureUserProfile(user){
  if(!user)return;
  try{
    await db.collection('users').doc(user.uid).set({
      displayName:user.displayName||'',
      email:user.email||'',
      photoURL:user.photoURL||'',
      provider:(user.providerData&&user.providerData[0]&&user.providerData[0].providerId)||'google.com',
      lastLoginAt:firebase.firestore.FieldValue.serverTimestamp(),
      updatedAt:firebase.firestore.FieldValue.serverTimestamp()
    },{merge:true});
  }catch(e){console.error('Firestore profile:',e)}
}

async function saveCloudProgress(){
  if(!currentUser||state.activeCourseId==null)return;
  const course=COURSES.find(c=>c.id===state.activeCourseId);
  if(!course)return;
  try{
    const payload={
      catalogVersion:CATALOG_VERSION,
      lastCourseId:course.id,
      lastCourseName:course.name,
      lastTopicIndex:state.activeTopicIndex,
      lastChapterNumber:state.activeTopicIndex+1,
      lastChapterName:course.topics[state.activeTopicIndex]||'',
      updatedAt:firebase.firestore.FieldValue.serverTimestamp()
    };
    await db.collection('users').doc(currentUser.uid).collection('progress').doc('navigation').set(payload,{merge:true});
    navigationProgress={...navigationProgress,...payload};
    cloudProgressReady=true;
  }catch(e){console.error('Firestore progress save:',e)}
}

function saveProgress(){saveLocalProgress();saveCloudProgress()}

async function loadCloudProgress(){
  if(!currentUser)return;
  try{
    const snap=await db.collection('users').doc(currentUser.uid).collection('progress').doc('navigation').get();
    if(snap.exists){
      const p=snap.data()||{};
      navigationProgress=p;
      const courseId=Number(p.lastCourseId);
      if(COURSES.some(c=>c.id===courseId)){
        state.activeCourseId=courseId;
        const course=COURSES.find(c=>c.id===courseId);
        state.activeTopicIndex=restoredTopicIndex(course,p.lastTopicIndex,p.lastChapterName,p.catalogVersion);
        navigationProgress={...p,lastTopicIndex:state.activeTopicIndex,lastChapterNumber:state.activeTopicIndex+1,lastChapterName:course.topics[state.activeTopicIndex],catalogVersion:CATALOG_VERSION};
        saveLocalProgress();
      }
    }
    cloudProgressReady=true;
  }catch(e){console.error('Firestore progress load:',e)}
}

function applyChapterProgress(data={}){
  const total=HISTORY_CHAPTERS.find(c=>c.number===1)?.items||7;
  chapterProgress={
    percent:clamp(data.percent,0,100),
    completedItems:Array.isArray(data.completedItems)?data.completedItems:[],
    unlockedItem:clamp(data.unlockedItem,0,total-1),
    currentItem:clamp(data.currentItem,0,total-1),
    chapterCompleted:Boolean(data.chapterCompleted),
    attempts:data.attempts&&typeof data.attempts==='object'?data.attempts:{},
    itemScores:data.itemScores&&typeof data.itemScores==='object'?data.itemScores:{}
  };
}

function applyPhysicsProgress(data={}){
  physicsProgress={...data,percent:clamp(data.percent,0,100),completedItems:Array.isArray(data.completedItems)?data.completedItems:[],unlockedItem:clamp(data.unlockedItem,0,5),chapterCompleted:Boolean(data.chapterCompleted),examBest:clamp(data.examBest,0,10)};
}

function applyVectorsProgress(data={}){
  vectorsProgress={...data,percent:clamp(data.percent,0,100),completedItems:Array.isArray(data.completedItems)?data.completedItems:[],unlockedItem:clamp(data.unlockedItem,0,5),chapterCompleted:Boolean(data.chapterCompleted),examBest:clamp(data.examBest,0,10)};
}
function activePhysicsNumber(){
  return Number(navigationProgress.lastCourseId)===16&&(Number(navigationProgress.lastChapterNumber)===2||Number(navigationProgress.lastTopicIndex)===1||navigationProgress.lastChapterName==='Vectores')?2:1;
}

function applyHistoryProgress(number,data={}){
  if(number===1){applyChapterProgress(data);return;}
  const total=HISTORY_CHAPTERS.find(c=>c.number===number)?.items||5;
  historyProgress[number]={...data,percent:clamp(data.percent,0,100),completedItems:Array.isArray(data.completedItems)?data.completedItems:[],unlockedItem:clamp(data.unlockedItem,0,total-1),chapterCompleted:Boolean(data.chapterCompleted),examBest:clamp(data.examBest,0,10)};
}
function historyChapterProgress(number){return number===1?chapterProgress:(historyProgress[number]||{percent:0,completedItems:[],unlockedItem:0,chapterCompleted:false,examBest:0});}
function activeHistoryNumber(){const n=Number(navigationProgress.lastChapterNumber)||Number(navigationProgress.lastTopicIndex)+1;return Number(navigationProgress.lastCourseId)===12&&HISTORY_CHAPTERS.some(c=>c.number===n)?n:1;}
function applyHistoryRecord(id,data={}){
  let local={};
  try{local=JSON.parse(localStorage.getItem('sin-limites:'+currentUser.uid+':'+id)||'null')?.progress||{};}catch{}
  historyRecords[id]=window.HistoryProgress.merge(data,local);
  for(const c of HISTORY_CHAPTERS){
    const progress=window.HistoryProgress.combine(c,historyRecords[c.progressId]||{},historyRecords);
    applyHistoryProgress(c.number,progress);
  }
}
function trackedProgressReaders(){
  const ids=[...new Set(HISTORY_CHAPTERS.flatMap(c=>window.HistoryProgress.ids(c)))];
  return [...ids.map(id=>[id,data=>applyHistoryRecord(id,data)]),['fisica-capitulo-01',applyPhysicsProgress],['fisica-capitulo-02',applyVectorsProgress]];
}

async function loadChapterProgress(){
  if(!currentUser)return;
  const ref=db.collection('users').doc(currentUser.uid).collection('progress');
  await Promise.all(trackedProgressReaders().map(async ([id,apply])=>{
    try{const snap=await ref.doc(id).get();apply(snap.exists?snap.data():{})}
    catch(e){console.error('Chapter progress load:',id,e)}
  }));
}

function startProgressListener(){
  if(progressUnsubscribe){progressUnsubscribe();progressUnsubscribe=null}
  if(!currentUser)return;
  const ref=db.collection('users').doc(currentUser.uid).collection('progress');
  const listeners=trackedProgressReaders().map(([id,apply])=>ref.doc(id).onSnapshot(snap=>{
    apply(snap.exists?snap.data():{});
    if(state.view==='catalog')render();
  },e=>console.error('Chapter progress listener:',id,e)));
  progressUnsubscribe=()=>listeners.forEach(unsubscribe=>unsubscribe());
}

async function loadProgress(){
  loadLocalProgress();
  await Promise.all([loadCloudProgress(),loadChapterProgress()]);
}

function renderLogin(){
  return `<main class="min-h-screen bg-gradient-to-br from-blue-950 via-blue-900 to-slate-950 flex items-center justify-center p-5 relative overflow-hidden"><div class="absolute inset-0 opacity-10" style="background-image:radial-gradient(circle at 1px 1px,white 1px,transparent 0);background-size:28px 28px"></div><div class="relative w-full max-w-md bg-white rounded-[2rem] shadow-2xl p-7 sm:p-9"><div class="w-14 h-14 rounded-2xl bg-blue-950 text-white flex items-center justify-center font-black text-xl"><img src="assets/logo-sin-limites.jpg" alt="Logo de SIN LÍMITES" width="56" height="56" style="display:block;width:100%;height:100%;object-fit:contain;border-radius:inherit"></div><p class="mt-6 text-xs font-bold uppercase tracking-[.2em] text-red-600">Academia Virtual Saco Oliveros</p><h1 class="mt-2 text-4xl font-black text-slate-900 tracking-tight">SIN LÍMITES</h1><p class="mt-3 text-sm leading-relaxed text-slate-500">Ingresa con tu cuenta de Google, personal o institucional, para acceder a los cursos y continuar tu ruta de aprendizaje.</p>${authMessage?`<div class="mt-5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">${esc(authMessage)}</div>`:''}<button onclick="loginWithGoogle()" class="mt-7 w-full flex items-center justify-center gap-3 rounded-2xl border border-slate-200 bg-white px-5 py-3.5 font-bold text-slate-700 shadow-sm hover:border-blue-300 hover:bg-slate-50 transition"><span class="w-7 h-7 rounded-full border border-slate-200 flex items-center justify-center font-black text-blue-600">G</span>Continuar con Google</button><p class="mt-5 text-center text-xs text-slate-400">Se admiten cuentas de Google de cualquier dominio.</p></div></main>`;
}

function renderHeader(){
  const u=currentUser||{};
  return `<header class="bg-white border-b border-slate-200 sticky top-0 z-40"><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-20 py-3 flex items-center justify-between gap-4"><button onclick="goHome()" class="flex items-center gap-3 min-w-0 text-left"><div class="w-11 h-11 rounded-2xl bg-blue-950 text-white flex items-center justify-center shrink-0 shadow-sm font-black"><img src="assets/logo-sin-limites.jpg" alt="Logo de SIN LÍMITES" width="56" height="56" style="display:block;width:100%;height:100%;object-fit:contain;border-radius:inherit"></div><div class="min-w-0"><div class="font-black text-blue-950 tracking-tight leading-tight truncate">SIN <span class="text-red-600">LÍMITES</span></div><div class="text-[11px] uppercase tracking-[0.18em] text-slate-400 truncate">Academia Virtual · Admisión 2026-II</div></div></button><div class="flex items-center gap-2 sm:gap-3">${state.studyMode&&state.view==='catalog'?`<button onclick="showStudyModes()" class="px-3 py-2 rounded-xl border border-blue-200 bg-blue-50 text-xs font-bold text-blue-950" aria-label="Cambiar modo de estudio">${state.studyMode==='free'?'Libre':'Progresivo'} · Cambiar</button>`:''}<span class="hidden lg:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-bold"><i data-lucide="cloud-check" class="w-3.5 h-3.5"></i>Progreso en la nube</span>${u.photoURL?`<img src="${esc(u.photoURL)}" alt="Perfil" class="w-9 h-9 rounded-full border border-slate-200 object-cover">`:'<div class="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center"><i data-lucide="user" class="w-4 h-4"></i></div>'}<div class="hidden md:block text-right max-w-44"><div class="text-xs font-bold text-slate-700 truncate">${esc(u.displayName||'Estudiante')}</div><div class="text-[11px] text-slate-400 truncate">${esc(u.email||'')}</div></div><button onclick="logout()" class="inline-flex items-center gap-2 px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-500 hover:text-red-600 hover:border-red-200"><i data-lucide="log-out" class="w-4 h-4"></i><span class="hidden sm:inline">Salir</span></button></div></div></header>`;
}

function renderStudyModePicker(){
  const previous=window.StudyMode.get(currentUser?.uid);
  return `${renderHeader()}<main class="study-entry"><ol class="study-steps" aria-label="Pasos para empezar"><li aria-current="step"><b>1</b> Modo de estudio</li><li><b>2</b> Curso</li><li><b>3</b> Capítulo</li></ol><p class="study-eyebrow">Tú eliges cómo aprender</p><h1>¿Cómo quieres estudiar?</h1><p class="study-intro">Primero elige tu modo de estudio. Después podrás escoger el curso y el capítulo.</p><div class="study-mode-grid"><button class="study-choice study-choice-free" data-study-mode="free" onclick="selectStudyMode('free')"><span class="study-choice-icon"><i data-lucide="compass"></i></span><span class="study-choice-title">Estudio libre</span><span class="study-choice-description">Explora los temas y las actividades en el orden que prefieras.</span><span class="study-choice-detail">Puedes entrar a cualquier tema, practicar o ir a la evaluación desde el inicio.</span><span class="study-choice-action">Elegir libre <i data-lucide="arrow-right"></i></span>${previous==='free'?'<small>Tu elección anterior</small>':''}</button><button class="study-choice study-choice-progressive" data-study-mode="progressive" onclick="selectStudyMode('progressive')"><span class="study-choice-icon"><i data-lucide="route"></i></span><span class="study-choice-title">Estudio progresivo</span><span class="study-choice-description">Sigue una secuencia y avanza al aprobar las actividades.</span><span class="study-choice-detail">Los temas y las evaluaciones se habilitan a medida que completas los pasos del capítulo.</span><span class="study-choice-action">Elegir progresivo <i data-lucide="arrow-right"></i></span>${previous==='progressive'?'<small>Tu elección anterior</small>':''}</button></div><p class="study-entry-note"><i data-lucide="circle-check"></i>Tu elección se aplica a todos los cursos. Puedes cambiarla sin perder tu avance.</p></main>`;
}
function showStudyModes(){pendingEntry=null;state.view='mode';window.scrollTo(0,0);render();}
function entryDestination(){
  const entry=new URLSearchParams(window.location.search);
  const chapters=['fisica-capitulo-01','fisica-capitulo-02',...HISTORY_CHAPTERS.map(c=>'historia-universal-capitulo-'+String(c.number).padStart(2,'0'))];
  return {chapter:chapters.includes(entry.get('chapter'))?entry.get('chapter'):null,course:COURSES.some(c=>c.id===Number(entry.get('course')))?Number(entry.get('course')):null,choose:entry.get('mode')==='choose'};
}
function continueStudyEntry(){
  if(!state.studyMode){state.view='mode';render();return;}
  const entry=pendingEntry;pendingEntry=null;state.view='catalog';
  if(entry?.chapter){window.location.replace(entry.chapter+'.html?v=20260917-reading3');return;}
  if(entry?.course){state.activeCourseId=entry.course;state.activeTopicIndex=entry.course===12?Math.max(0,activeHistoryNumber()-1):0;state.activeTab='Teoría';state.view='course';}
  window.scrollTo(0,0);render();
}
function selectStudyMode(mode){
  if(!currentUser||!window.StudyMode.valid(mode))return;
  state.studyMode=window.StudyMode.choose(currentUser.uid,mode);
  window.StudyMode.save(currentUser.uid,db);
  continueStudyEntry();
}
function readyToChooseCourse(){
  if(state.studyMode)return true;
  state.view='mode';render();return false;
}

function renderProgressPanel(){
  const physics=Number(navigationProgress.lastCourseId)===16;
  const chapterNumber=physics?activePhysicsNumber():activeHistoryNumber();
  const activeProgress=physics?(chapterNumber===2?vectorsProgress:physicsProgress):historyChapterProgress(chapterNumber);
  const activeCourseName=physics?'Física':'Historia Universal';
  const activeChapterName=physics?(chapterNumber===2?'Vectores':'Análisis dimensional'):(HISTORY_CHAPTERS.find(c=>c.number===chapterNumber)?.title||'La ciencia histórica');
  const total=physics?6:(HISTORY_CHAPTERS.find(c=>c.number===chapterNumber)?.items||5);
  const percent=clamp(activeProgress.percent,0,100);
  const completed=[...new Set(activeProgress.completedItems)].length;
  const status=activeProgress.chapterCompleted?'Completado':percent>0?'En progreso':'Por comenzar';
  const cta=activeProgress.chapterCompleted?'Repasar capítulo':percent>0?'Continuar estudiando':'Comenzar ruta';
  const lastCourse=navigationProgress.lastCourseName||'Aún sin actividad';
  const lastChapter=navigationProgress.lastChapterName||'Explora un curso para comenzar';
  return `<section class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8"><div class="bg-white rounded-3xl border border-slate-200 shadow-xl shadow-slate-900/5 overflow-hidden"><div class="p-5 sm:p-7"><div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5"><div><div class="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[.18em] text-red-600"><i data-lucide="chart-no-axes-column-increasing" class="w-4 h-4"></i>Mi progreso</div><h2 class="mt-2 text-2xl sm:text-3xl font-black text-slate-900">Sigue desde donde te quedaste</h2><p class="mt-2 text-sm text-slate-500">Tu avance se guarda automáticamente en la nube y te acompaña en cualquier dispositivo.</p></div><div class="flex items-center gap-3 rounded-2xl bg-slate-50 border border-slate-200 px-4 py-3 min-w-[210px]"><div class="w-10 h-10 rounded-xl bg-blue-950 text-white flex items-center justify-center"><i data-lucide="history" class="w-5 h-5"></i></div><div class="min-w-0"><div class="text-[11px] uppercase tracking-wider font-bold text-slate-400">Última visita</div><div class="text-sm font-bold text-slate-800 truncate">${esc(lastCourse)}</div><div class="text-xs text-slate-500 truncate">${esc(lastChapter)}</div></div></div></div><div class="mt-6 grid lg:grid-cols-[1fr_auto] gap-5 items-stretch"><div class="rounded-3xl bg-gradient-to-br from-blue-950 to-blue-900 text-white p-5 sm:p-6"><div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4"><div><div class="text-xs font-bold uppercase tracking-[.18em] text-blue-200">Ruta activa</div><h3 class="mt-2 text-xl sm:text-2xl font-black">${activeCourseName} · Capítulo ${chapterNumber}</h3><p class="mt-1 text-sm text-blue-100">${activeChapterName}</p></div><div class="text-left sm:text-right"><div class="text-4xl font-black">${percent}%</div><div class="text-xs text-blue-200 mt-1">${status}${physics||chapterNumber>1?` · Evaluación: ${activeProgress.examBest}/10`:""}</div></div></div><div class="mt-5 h-3 rounded-full bg-white/15 overflow-hidden"><div class="h-full rounded-full bg-red-400 transition-all duration-500" style="width:${percent}%"></div></div><div class="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-xs text-blue-100"><span class="inline-flex items-center gap-1.5"><i data-lucide="circle-check-big" class="w-4 h-4 text-emerald-300"></i>${completed} de ${total} ${!physics&&chapterNumber===1?'actividades aprobadas':'temas aprobados'}</span><span class="inline-flex items-center gap-1.5"><i data-lucide="unlock" class="w-4 h-4 text-amber-300"></i>${!physics&&chapterNumber===1?'Actividad':'Ítem'} ${Math.min(activeProgress.unlockedItem+1,total)} disponible</span></div></div><div class="rounded-3xl border border-slate-200 bg-slate-50 p-5 sm:p-6 lg:w-72 flex flex-col justify-between"><div><div class="w-11 h-11 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center"><i data-lucide="graduation-cap" class="w-5 h-5"></i></div><h3 class="mt-4 font-extrabold text-slate-900">${cta}</h3><p class="mt-2 text-sm leading-relaxed text-slate-500">${state.studyMode==='free'?'Explora la teoría, practica y comprueba lo aprendido a tu ritmo.':'Continúa la ruta con teoría breve, actividades y desbloqueo progresivo.'}</p></div><button onclick="openProgressChapter()" class="mt-5 w-full inline-flex items-center justify-center gap-2 rounded-xl bg-blue-950 px-4 py-3 text-sm font-bold text-white hover:bg-blue-900">${cta}<i data-lucide="arrow-right" class="w-4 h-4"></i></button></div></div></div><div class="px-5 sm:px-7 py-3 border-t border-slate-100 bg-slate-50 text-xs text-slate-400">Seguimiento disponible en Historia Universal · Capítulos 1 al 6 y Física · Capítulos 1 y 2.</div></div></section>`;
}

function filteredCourses(){
  const t=state.search.trim().toLowerCase();
  return COURSES.filter(c=>(state.category==='Todos'||c.category===state.category)&&(!t||c.name.toLowerCase().includes(t)||c.topics.some(x=>x.toLowerCase().includes(t))));
}

function renderCatalog(){
  const courses=filteredCourses();
  const cats=CATEGORIES.map(cat=>`<button onclick="setCategory('${esc(cat)}')" class="px-4 py-2 rounded-full text-sm font-semibold border transition ${state.category===cat?'bg-blue-950 text-white border-blue-950':'bg-white text-slate-600 border-slate-200 hover:border-blue-300 hover:text-blue-950'}">${esc(cat)}</button>`).join('');
  const cards=courses.map(c=>{
    const tracked=c.id===16?[[1,physicsProgress],[2,vectorsProgress]]:c.id===12?HISTORY_CHAPTERS.map(h=>[h.number,historyChapterProgress(h.number)]):[];
    const detailed=tracked.map(([number,progress])=>`<div class="mt-4"><div class="flex items-center justify-between text-[11px] font-bold"><span class="text-slate-400">Cap. ${number}${c.id===16?' · '+(number===2?'Vectores':'Análisis dimensional'):''}</span><span class="text-red-600">${clamp(progress.percent,0,100)}%</span></div><div class="mt-1.5 h-1.5 rounded-full bg-slate-100 overflow-hidden"><div class="h-full bg-red-500 rounded-full" style="width:${clamp(progress.percent,0,100)}%"></div></div></div>`).join('');
    return `<button onclick="openCourse(${c.id})" class="course-card bg-white rounded-3xl border border-slate-200 p-5 text-left group w-full"><div class="flex items-start justify-between gap-4"><div class="w-12 h-12 rounded-2xl bg-blue-50 text-blue-950 flex items-center justify-center group-hover:bg-blue-950 group-hover:text-white transition"><i data-lucide="${esc(c.icon)}" class="w-6 h-6"></i></div><span class="text-[11px] font-bold uppercase tracking-wider text-slate-400 bg-slate-50 px-2.5 py-1 rounded-full">${esc(c.category)}</span></div><h3 class="mt-5 text-lg font-extrabold text-slate-900 leading-snug">${esc(c.name)}</h3><p class="mt-2 text-sm text-slate-500 line-clamp-2">${esc(c.topics[0])} · ${esc(c.topics[1])} · …</p>${detailed}<div class="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between"><div class="flex items-center gap-2 text-sm font-semibold text-slate-500"><i data-lucide="layers-3" class="w-4 h-4"></i>${c.topics.length} capítulos</div><span class="text-blue-950 group-hover:text-red-600 transition"><i data-lucide="arrow-right" class="w-5 h-5"></i></span></div></button>`;
  }).join('');
  return `${renderHeader()}<main><section class="relative overflow-hidden bg-gradient-to-br from-blue-950 via-blue-900 to-slate-900 text-white pb-10"><div class="absolute inset-0 opacity-10" style="background-image:radial-gradient(circle at 1px 1px,white 1px,transparent 0);background-size:28px 28px"></div><div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20"><div class="max-w-3xl"><div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/10 text-xs font-semibold mb-6"><i data-lucide="target" class="w-4 h-4 text-red-400"></i>Temario estructurado para la Prueba General de Admisión 2026-II</div><h1 class="text-4xl sm:text-6xl font-black tracking-tight leading-[1.04]">Tu ruta de estudio,<br><span class="text-red-400">curso por curso.</span></h1><p class="mt-6 text-base sm:text-lg text-blue-100 max-w-2xl leading-relaxed">Los contenidos del temario han sido organizados en ${COURSES.length} cursos. Historia Universal cuenta con ${COURSES.find(c=>c.id===12).topics.length} capítulos; Física tiene ${COURSES.find(c=>c.id===16).topics.length}. Los demás cursos mantienen 24 capítulos.</p></div></div></section>${renderProgressPanel()}<section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10"><div class="bg-white border border-slate-200 rounded-3xl p-4 sm:p-5 shadow-sm"><div class="relative"><i data-lucide="search" class="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2"></i><input id="searchInput" value="${esc(state.search)}" oninput="setSearch(this.value)" placeholder="Buscar curso o capítulo..." class="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900 text-sm"></div><div class="mt-4 flex flex-wrap gap-2">${cats}</div></div><div class="mt-8 flex items-end justify-between gap-4"><div><p class="text-sm font-semibold text-red-600 uppercase tracking-wider">Malla académica</p><h2 class="text-2xl sm:text-3xl font-black text-slate-900 mt-1">${courses.length} curso${courses.length===1?'':'s'}</h2></div><p class="hidden sm:block text-sm text-slate-500">Selecciona un curso para ver sus capítulos.</p></div><div class="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">${cards||'<div class="sm:col-span-2 lg:col-span-3 xl:col-span-4 bg-white border border-dashed border-slate-300 rounded-3xl p-12 text-center">No encontramos coincidencias.</div>'}</div></section></main><footer class="border-t border-slate-200 bg-white mt-8"><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-7 text-xs text-slate-400 flex flex-col sm:flex-row gap-2 justify-between"><span>SIN LÍMITES · Academia Virtual</span><span>${COURSES.length} cursos · ${COURSES.reduce((total,c)=>total+c.topics.length,0)} capítulos</span></div></footer>`;
}

function specialHistoryContent(course){
  if(course.id===16&&state.activeTopicIndex===1)return `<section class="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8"><p class="text-xs font-bold uppercase tracking-wider text-red-600">Capítulo 02 de 25 · Contenido desarrollado</p><h2 class="mt-3 text-3xl font-black text-blue-950">Vectores</h2><p class="mt-4 text-slate-600">Elementos de un vector: módulo y dirección; suma y resta, componentes, resultante y equilibrante, producto escalar y producto vectorial.</p><p class="mt-3 text-sm text-slate-500">6 temas · 12 ejemplos resueltos · laboratorio interactivo · 12 preguntas de control · 10 ejercicios · evaluación de 10 preguntas</p><a href="fisica-capitulo-02.html?v=20260917-reading3" class="inline-flex mt-6 rounded-xl bg-blue-950 px-5 py-3 text-sm font-bold text-white">Estudiar Vectores →</a></section>`;
  if(course.id===16&&state.activeTopicIndex===0)return `<section class="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8"><p class="text-xs font-bold uppercase tracking-wider text-red-600">Capítulo 01 de 25 · Contenido desarrollado</p><h2 class="mt-3 text-3xl font-black text-blue-950">Análisis dimensional</h2><p class="mt-4 text-slate-600">Magnitudes y unidades, fórmulas dimensionales, álgebra dimensional, homogeneidad, coeficientes y cálculo de exponentes.</p><p class="mt-3 text-sm text-slate-500">6 temas · 8 ejemplos resueltos · 12 preguntas de control · 10 ejercicios · evaluación de 10 preguntas</p><a href="fisica-capitulo-01.html?v=20260917-reading3" class="inline-flex mt-6 rounded-xl bg-blue-950 px-5 py-3 text-sm font-bold text-white">Estudiar el capítulo →</a></section>`;
  if(course.id===12&&state.activeTopicIndex===0)return `<section class="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8"><p class="text-xs font-bold uppercase tracking-wider text-red-600">Capítulo 1 de 40 · Teoría y actividades</p><h2 class="mt-3 text-3xl font-black text-blue-950">La ciencia histórica</h2><p class="mt-4 text-slate-600">Estudia la ciencia histórica con explicaciones, ejemplos e imágenes: concepto e importancia, tiempo histórico, protagonistas, fuentes, ciencias auxiliares, historiografía y periodización.</p><p class="mt-3 text-sm text-slate-500">Teoría organizada por temas · 8 ilustraciones · 7 actividades con solución · avance guardado</p><a href="historia-universal-capitulo-01.html?v=20260917-reading3" class="inline-flex mt-6 rounded-xl bg-blue-950 px-5 py-3 text-sm font-bold text-white">Estudiar el capítulo →</a></section>`;
  if(course.id===12&&state.activeTopicIndex>=1&&state.activeTopicIndex<=5){
    const c=HISTORY_CHAPTERS.find(h=>h.number===state.activeTopicIndex+1);
    if(c)return `<section class="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8"><p class="text-xs font-bold uppercase tracking-wider text-red-600">Capítulo ${c.number} de ${window.HISTORY_SYLLABUS.length} · Contenido desarrollado</p><h2 class="mt-3 text-3xl font-black text-blue-950">${esc(c.title)}</h2><p class="mt-4 text-slate-600">${esc(c.intro)}</p><p class="mt-3 text-sm text-slate-500">${c.items} temas · ${c.items} casos guiados · ${c.items*2} preguntas de control · 5 actividades · evaluación de 10 preguntas</p><a href="historia-universal-capitulo-${String(c.number).padStart(2,'0')}.html?v=20260917-reading3" class="inline-flex mt-6 rounded-xl bg-blue-950 px-5 py-3 text-sm font-bold text-white">Estudiar el capítulo →</a></section>`;
  }
  return null;
}

function renderCourse(){
  const course=COURSES.find(c=>c.id===state.activeCourseId)||COURSES[0];
  const topic=course.topics[state.activeTopicIndex];
  const tab=TAB_INFO[state.activeTab];
  const syllabusNote=course.id===12?'<p class="mt-3 text-sm text-slate-500">Historia Universal: 40 capítulos; contenido desarrollado del 1 al 6.</p>':'';
  const chapterButtons=syllabusNote+course.topics.map((name,idx)=>`<button onclick="setTopic(${idx})" class="chapter-btn w-full flex items-center gap-3 px-3 py-3 rounded-xl text-left ${idx===state.activeTopicIndex?'bg-blue-950 text-white':'text-slate-600 hover:bg-slate-100'}"><span class="text-[11px] font-bold w-7 shrink-0 ${idx===state.activeTopicIndex?'text-red-300':'text-slate-400'}">${String(idx+1).padStart(2,'0')}</span><span class="text-sm font-medium leading-snug">${esc(name)}</span></button>`).join('');
  const special=specialHistoryContent(course);
  const tabs=Object.keys(TAB_INFO).map(name=>`<button onclick="setTab('${name}')" class="px-4 py-3 text-sm font-semibold whitespace-nowrap border-b-2 transition ${state.activeTab===name?'text-blue-950 border-red-600':'text-slate-400 border-transparent hover:text-slate-700'}">${name}</button>`).join('');
  const prevDisabled=state.activeTopicIndex===0;
  const nextDisabled=state.activeTopicIndex===course.topics.length-1;
  const standard=`<div class="bg-white rounded-3xl border border-slate-200 overflow-hidden"><div class="p-6 sm:p-8 bg-gradient-to-r from-blue-950 to-blue-900 text-white"><p class="text-xs font-bold uppercase tracking-[.18em] text-blue-200">Capítulo ${String(state.activeTopicIndex+1).padStart(2,'0')} de ${course.topics.length}</p><h2 class="mt-3 text-2xl sm:text-4xl font-black leading-tight">${esc(topic)}</h2><p class="mt-3 text-sm text-blue-100">${esc(course.name)} · Temario 2026-II</p></div><div class="px-4 sm:px-6 border-b border-slate-100 overflow-x-auto custom-scrollbar"><div class="flex min-w-max">${tabs}</div></div><div class="p-6 sm:p-8"><div class="fade-in"><div class="w-12 h-12 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center"><i data-lucide="${tab.icon}" class="w-6 h-6"></i></div><h3 class="mt-5 text-xl font-extrabold text-slate-900">${tab.title}</h3><p class="mt-2 text-slate-600 leading-relaxed max-w-3xl">${tab.text}</p><div class="mt-7 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-5 sm:p-6"><div class="flex items-start gap-3"><i data-lucide="construction" class="w-5 h-5 text-amber-500 mt-0.5 shrink-0"></i><div><p class="font-semibold text-slate-700">Estructura académica creada</p><p class="mt-1 text-sm text-slate-500">El capítulo ya forma parte de la malla. En la siguiente etapa podemos incorporar el contenido académico de esta sección.</p></div></div></div></div></div></div>`;
  return `${renderHeader()}<main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6"><div class="mb-5 flex flex-wrap items-center gap-3"><button onclick="goHome()" class="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-white border border-slate-200 text-sm font-semibold text-slate-600 hover:text-blue-950"><i data-lucide="arrow-left" class="w-4 h-4"></i> Cursos</button><span class="text-xs font-bold uppercase tracking-wider text-slate-400">${esc(course.category)}</span></div><div class="grid lg:grid-cols-[330px_1fr] gap-6 min-h-[72vh]"><aside class="bg-white rounded-3xl border border-slate-200 overflow-hidden lg:sticky lg:top-24 lg:h-[calc(100vh-7.5rem)]"><div class="p-5 border-b border-slate-100"><div class="flex items-center gap-3"><div class="w-11 h-11 rounded-2xl bg-blue-50 text-blue-950 flex items-center justify-center shrink-0"><i data-lucide="${esc(course.icon)}" class="w-5 h-5"></i></div><div><h1 class="font-extrabold text-slate-900 leading-tight">${esc(course.name)}</h1><p class="text-xs text-slate-400 mt-1">${course.topics.length} capítulos</p></div></div></div><div class="p-3 overflow-y-auto custom-scrollbar h-[calc(100%-86px)]">${chapterButtons}</div></aside><section class="min-w-0">${special||standard}<div class="mt-4 px-2 py-3 flex items-center justify-between gap-4"><button onclick="moveTopic(-1)" ${prevDisabled?'disabled':''} class="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold border border-slate-200 ${prevDisabled?'text-slate-300 cursor-not-allowed':'text-slate-600 hover:text-blue-950 hover:border-blue-300'}"><i data-lucide="chevron-left" class="w-4 h-4"></i> Anterior</button><div class="hidden sm:block text-xs text-slate-400">${state.activeTopicIndex+1} / ${course.topics.length}</div><button onclick="moveTopic(1)" ${nextDisabled?'disabled':''} class="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold border border-slate-200 ${nextDisabled?'text-slate-300 cursor-not-allowed':'text-slate-600 hover:text-blue-950 hover:border-blue-300'}">Siguiente <i data-lucide="chevron-right" class="w-4 h-4"></i></button></div></section></div></main>`;
}

function render(){
  document.getElementById('app').innerHTML=!currentUser?renderLogin():!state.studyMode||state.view==='mode'?renderStudyModePicker():state.view==='course'?renderCourse():renderCatalog();
  lucide.createIcons();
}

function openCourse(id){
  if(!readyToChooseCourse()||!COURSES.some(c=>c.id===id))return;
  state.activeCourseId=id;
  state.activeTopicIndex=0;
  state.activeTab='Teoría';
  state.view='course';
  saveProgress();
  window.scrollTo(0,0);
  render();
}

function openProgressChapter(){if(!readyToChooseCourse())return;const physics=Number(navigationProgress.lastCourseId)===16;window.location.assign(physics?'fisica-capitulo-0'+activePhysicsNumber()+'.html?v=20260917-reading3':'historia-universal-capitulo-'+String(activeHistoryNumber()).padStart(2,'0')+'.html?v=20260917-reading3')}
function goHome(){state.view='catalog';window.scrollTo(0,0);render()}
function setTopic(i){if(!readyToChooseCourse())return;if(state.activeCourseId===12&&Number.isInteger(i)&&i>=0&&i<=5){window.location.assign('historia-universal-capitulo-'+String(i+1).padStart(2,'0')+'.html?v=20260917-reading3');return}if(state.activeCourseId===16&&[0,1].includes(i)){window.location.assign('fisica-capitulo-0'+(i+1)+'.html?v=20260917-reading3');return}state.activeTopicIndex=i;state.activeTab='Teoría';saveProgress();render();window.scrollTo({top:0,behavior:'smooth'})}
function moveTopic(d){const c=COURSES.find(c=>c.id===state.activeCourseId),n=state.activeTopicIndex+d;if(n>=0&&n<c.topics.length)setTopic(n)}
function setTab(t){if(TAB_INFO[t]){state.activeTab=t;render()}}
function setCategory(c){state.category=c;render()}
function setSearch(v){state.search=v;render();const i=document.getElementById('searchInput');if(i){i.focus();i.setSelectionRange(i.value.length,i.value.length)}}

async function loginWithGoogle(){
  authMessage='';
  try{
    await auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);
    await auth.signInWithPopup(googleProvider);
  }catch(e){
    console.error('Firebase Authentication:',e);
    const code=e&&e.code?e.code:'';
    if(code==='auth/popup-closed-by-user'||code==='auth/cancelled-popup-request')return;
    const messages={
      'auth/popup-blocked':'El navegador bloqueó la ventana de Google. Permite las ventanas emergentes para este sitio e inténtalo nuevamente.',
      'auth/unauthorized-domain':'El dominio de esta página no está autorizado en Firebase Authentication.',
      'auth/operation-not-allowed':'El acceso con Google todavía no está habilitado en Firebase Authentication.',
      'auth/network-request-failed':'No se pudo conectar con Google/Firebase. Revisa tu conexión e inténtalo nuevamente.',
      'auth/web-storage-unsupported':'El navegador está bloqueando el almacenamiento necesario para iniciar sesión.',
      'auth/internal-error':'Firebase encontró un error interno durante el inicio de sesión.'
    };
    authMessage=messages[code]||`No se pudo iniciar sesión${code?` (${code})`:''}. Intenta nuevamente.`;
    document.getElementById('app').innerHTML=renderLogin();
    lucide.createIcons();
  }
}

async function logout(){
  try{await auth.signOut()}catch(e){}
}

auth.onAuthStateChanged(async user=>{
  const epoch=++accountEpoch;
  if(user){
    authMessage='';
    currentUser=user;
    state.view='mode';state.studyMode=null;
    await Promise.all([ensureUserProfile(user),loadProgress(),window.StudyMode.load(user.uid,db)]);
    if(epoch!==accountEpoch)return;
    state.studyMode=window.StudyMode.get(user.uid);
    pendingEntry=entryDestination();
    startProgressListener();
    if(state.studyMode&&!pendingEntry.choose&&(pendingEntry.chapter||pendingEntry.course))continueStudyEntry();
    else render();
  }else{
    currentUser=null;state.studyMode=null;state.view='mode';pendingEntry=null;
    cloudProgressReady=false;
    navigationProgress={};
    historyProgress={};historyRecords={};
    applyChapterProgress({});
    applyPhysicsProgress({});
    applyVectorsProgress({});
    if(progressUnsubscribe){progressUnsubscribe();progressUnsubscribe=null}
    document.getElementById('app').innerHTML=renderLogin();
    lucide.createIcons();
  }
});




