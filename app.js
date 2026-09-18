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
const LANGUAGE_CHAPTERS=window.LANGUAGE_CHAPTERS||[];
const HISTORY_CHAPTERS=window.HISTORY_CHAPTERS||[];
const PERU_CHAPTERS=window.PERU_CHAPTERS||[];
const PHYSICS_CHAPTERS=window.PHYSICS_CHAPTERS||[];
const PHYSICS_REVIEWS=window.PHYSICS_REVIEWS||[{number:1,topicIndex:0,title:'Análisis dimensional',progressId:'fisica-capitulo-01',sourceLabel:'Repaso complementario',kind:'review'},{number:2,topicIndex:0,title:'Vectores',progressId:'fisica-capitulo-02',sourceLabel:'Repaso complementario',kind:'review'}];
const PHYSICS_MODULES=[...PHYSICS_REVIEWS,...PHYSICS_CHAPTERS];
const SOCIAL_COURSES={
  2:{name:'Razonamiento Matemático',prefix:'razonamiento-matematico',chapters:window.MATH_REASONING_CHAPTERS||[],syllabus:window.MATH_REASONING_SYLLABUS||[]},
  1:{name:'Razonamiento Verbal',prefix:'razonamiento-verbal',chapters:window.VERBAL_CHAPTERS||[],syllabus:window.VERBAL_SYLLABUS||[]},
  10:{name:'Educación Cívica',prefix:'educacion-civica',chapters:window.CIVICS_CHAPTERS||[],syllabus:window.CIVICS_SYLLABUS||[]},
  14:{name:'Economía',prefix:'economia',chapters:window.ECONOMY_CHAPTERS||[],syllabus:window.ECONOMY_SYLLABUS||[]}
};
const CATALOG_VERSION=9;
const CATEGORIES=['Todos',...new Set(COURSES.map(c=>c.category))];
const TAB_INFO={
  Teoría:{icon:'book-open',title:'Teoría del capítulo',text:'Aquí se incorporará el desarrollo conceptual, definiciones, propiedades, ejemplos y fórmulas esenciales de este capítulo.'},
  Práctica:{icon:'pencil-ruler',title:'Práctica · 10 problemas',text:'Este capítulo tendrá una práctica de 10 problemas con alternativas, explicación de las respuestas y registro de avance.'},
  Materiales:{icon:'folder-open',title:'Materiales',text:'Aquí se podrán enlazar PDFs, videos, infografías, solucionarios y recursos complementarios.'}
};

const state={view:'mode',studyMode:null,activeCourseId:null,activeTopicIndex:0,activeModuleId:null,activeTab:'Teoría',category:'Todos',search:''};
let currentUser=null;
let accountEpoch=0,pendingEntry=null;
let authMessage='';
let cloudProgressReady=false;
let navigationProgress={};
let chapterProgress={percent:0,completedItems:[],unlockedItem:0,currentItem:0,chapterCompleted:false,attempts:{},itemScores:{}};
let progressUnsubscribe=null;
let physicsProgress={percent:0,completedItems:[],unlockedItem:0,chapterCompleted:false,examBest:0};
let vectorsProgress={...physicsProgress};
let physicsExtraProgress={};
let historyProgress={},historyRecords={},peruProgress={},languageProgress={},socialProgress={};

const esc=v=>String(v??'').replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&#039;');
const clamp=(value,min,max)=>Math.min(Math.max(Number(value)||0,min),max);

function restoredTopicIndex(course,index,topicName,catalogVersion){
  // Catalog 9 follows the 18 chapters in Física.pdf. Preserve navigation by subject.
  if(course.id===16){
    const named=course.topics.indexOf(topicName);if(named>=0)return named;
    if(!(Number(catalogVersion)>=9)){
      const oldIndex=clamp(index,0,Number(catalogVersion)>=2?24:23);
      const splitIndex=Number(catalogVersion)>=2?oldIndex:(oldIndex===0?0:oldIndex+1);
      // Thermal topics are absent from this volume and return to its opening chapter.
      return [0,0,1,1,2,3,4,7,7,6,7,7,8,9,9,0,0,12,12,13,13,14,15,10,17][splitIndex];
    }
    return clamp(index,0,course.topics.length-1);
  }
  // Catalog 8 aligns mathematical reasoning with the supplied Lumbreras volume.
  if(course.id===2&&!(Number(catalogVersion)>=8)){
    const previous=[22,1,4,3,0,5,1,16,9,13,11,20,14,15,17,20,19,19,19,19,23,1,2,6];
    return previous[clamp(index,0,23)];
  }
  // Catalog 7 replaces the Habilidad Verbal outline with the supplied Razonamiento Verbal volume.
  if(course.id===1&&!(Number(catalogVersion)>=7)){
    const previous=[13,12,7,5,5,5,5,6,6,6,6,0,0,0,0,7,7,7,7,7,7,7,7,7];
    return previous[clamp(index,0,23)];
  }
  // Catalog 4 replaces Peru's earlier generic 24-topic outline with the PDF's 35 chapters.
  if(course.id===11&&!(Number(catalogVersion)>=4)){
    const previous=[1,2,4,5,6,7,8,8,9,12,12,13,14,15,15,16,17,17,19,20,21,23,28,30];
    return previous[clamp(index,0,23)];
  }
  // Catalog 5 replaces Lenguaje's generic 24-topic outline with the PDF's 34 chapters.
  if(course.id===7&&!(Number(catalogVersion)>=5)){
    const previous=[0,2,2,3,3,5,7,7,7,9,9,10,10,13,14,16,19,19,22,25,32,8,11,12];
    return previous[clamp(index,0,23)];
  }
  // Catalog 6 follows the supplied Economía–Educación Cívica volume.
  if([10,14].includes(course.id)&&!(Number(catalogVersion)>=6)){
    const previous=course.id===10?[2,2,2,2,2,2,3,3,8,8,8,8,9,8,8,8,8,4,4,5,5,6,9,7]:[0,2,0,1,11,5,12,10,14,6,6,6,17,18,15,21,20,22,16,24,23,26,9,9];
    return previous[clamp(index,0,23)];
  }
  const namedIndex=course.topics.indexOf(topicName);
  if(namedIndex>=0)return namedIndex;
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
    activeModuleId:state.activeModuleId,
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
      state.activeModuleId=course.id===16?restoredPhysicsModuleId(s):null;
      const module=PHYSICS_MODULES.find(m=>m.progressId===state.activeModuleId);
      navigationProgress={lastCourseId:course.id,lastCourseName:course.name,lastTopicIndex:state.activeTopicIndex,lastChapterNumber:state.activeTopicIndex+1,lastChapterName:module?.kind==='review'?'Repaso: '+module.title:course.topics[state.activeTopicIndex],lastModuleId:state.activeModuleId,catalogVersion:CATALOG_VERSION};
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
      lastModuleId:state.activeModuleId,
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
        state.activeModuleId=course.id===16?restoredPhysicsModuleId(p):null;
        const module=PHYSICS_MODULES.find(m=>m.progressId===state.activeModuleId);
        navigationProgress={...p,lastTopicIndex:state.activeTopicIndex,lastChapterNumber:state.activeTopicIndex+1,lastChapterName:module?.kind==='review'?'Repaso: '+module.title:course.topics[state.activeTopicIndex],lastModuleId:state.activeModuleId,catalogVersion:CATALOG_VERSION};
        saveLocalProgress();
      }
    }
    cloudProgressReady=true;
  }catch(e){console.error('Firestore progress load:',e)}
}

function practiceProgress(id,data={}){let local={};try{if(currentUser?.uid)local=JSON.parse(localStorage.getItem('sin-limites:'+currentUser.uid+':'+id)||'null')?.progress||{};}catch{}const merged=window.ChapterPractice.merge(id,data,local);return {...merged,...window.ChapterPractice.summary(id,merged)};}
function applyChapterProgress(data={}){chapterProgress=practiceProgress('historia-universal-presentacion-01',data);}

function applyPhysicsProgress(data={}){physicsProgress=practiceProgress('fisica-capitulo-01',data);}

function applyVectorsProgress(data={}){vectorsProgress=practiceProgress('fisica-capitulo-02',data);}
function physicsChapterProgress(number){return number===1?physicsProgress:number===2?vectorsProgress:physicsExtraProgress[number]||window.ChapterPractice.summary(PHYSICS_CHAPTERS.find(c=>c.number===number)?.progressId||'',{});}
function restoredPhysicsModuleId(record){
 const name=record.lastChapterName||record.activeTopicName;
 const named=PHYSICS_MODULES.find(m=>[m.title,'Repaso: '+m.title].includes(name));
 if(named)return named.progressId;
 // Older clients do not clear module IDs when merging navigation records.
 const id=record.lastModuleId||record.activeModuleId;
 return Number(record.catalogVersion)>=9&&PHYSICS_MODULES.some(m=>m.progressId===id)?id:null;
}
function activePhysicsModule(){
 if(Number(navigationProgress.lastCourseId)!==16)return null;
 return PHYSICS_MODULES.find(m=>m.progressId===navigationProgress.lastModuleId)||PHYSICS_CHAPTERS.find(m=>m.topicIndex===Number(navigationProgress.lastTopicIndex))||null;
}
function activePhysicsNumber(){return activePhysicsModule()?.number||(Number(navigationProgress.lastTopicIndex)||0)+1;}

function applyHistoryProgress(number,data={}){if(number===1){applyChapterProgress(data);return;}const meta=HISTORY_CHAPTERS.find(c=>c.number===number);if(meta)historyProgress[number]=practiceProgress(meta.progressId,data);}
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
function applyPeruProgress(number,data={}){const meta=PERU_CHAPTERS.find(c=>c.number===number);if(meta)peruProgress[number]=practiceProgress(meta.progressId,data);}
function peruChapterProgress(number){const meta=PERU_CHAPTERS.find(c=>c.number===number);return peruProgress[number]||window.ChapterPractice.summary(meta?.progressId||'',{});}
function activePeruNumber(){const n=Number(navigationProgress.lastChapterNumber)||Number(navigationProgress.lastTopicIndex)+1;return Number(navigationProgress.lastCourseId)===11&&PERU_CHAPTERS.some(c=>c.number===n)?n:1;}
function applyLanguageProgress(number,data={}){const meta=LANGUAGE_CHAPTERS.find(c=>c.number===number);if(meta)languageProgress[number]=practiceProgress(meta.progressId,data);}
function languageChapterProgress(number){const meta=LANGUAGE_CHAPTERS.find(c=>c.number===number);return languageProgress[number]||window.ChapterPractice.summary(meta?.progressId||'',{});}
function activeLanguageNumber(){const n=Number(navigationProgress.lastChapterNumber)||Number(navigationProgress.lastTopicIndex)+1;return Number(navigationProgress.lastCourseId)===7&&LANGUAGE_CHAPTERS.some(c=>c.number===n)?n:1;}
function applySocialProgress(courseId,number,data={}){const meta=SOCIAL_COURSES[courseId]?.chapters.find(c=>c.number===number);if(meta){socialProgress[courseId]||={};socialProgress[courseId][number]=practiceProgress(meta.progressId,data);}}
function socialChapterProgress(courseId,number){const meta=SOCIAL_COURSES[courseId]?.chapters.find(c=>c.number===number);return socialProgress[courseId]?.[number]||window.ChapterPractice.summary(meta?.progressId||'',{});}
function activeSocialNumber(courseId){const n=Number(navigationProgress.lastChapterNumber)||Number(navigationProgress.lastTopicIndex)+1;return Number(navigationProgress.lastCourseId)===Number(courseId)&&SOCIAL_COURSES[courseId]?.chapters.some(c=>c.number===n)?n:1;}
function trackedProgressReaders(){
  const ids=[...new Set(HISTORY_CHAPTERS.flatMap(c=>window.HistoryProgress.ids(c)))];
  return [...ids.map(id=>[id,data=>applyHistoryRecord(id,data)]),...PERU_CHAPTERS.map(c=>[c.progressId,data=>applyPeruProgress(c.number,data)]),...LANGUAGE_CHAPTERS.map(c=>[c.progressId,data=>applyLanguageProgress(c.number,data)]),...Object.entries(SOCIAL_COURSES).flatMap(([id,course])=>course.chapters.map(c=>[c.progressId,data=>applySocialProgress(id,c.number,data)])),['fisica-capitulo-01',applyPhysicsProgress],['fisica-capitulo-02',applyVectorsProgress],...PHYSICS_CHAPTERS.filter(c=>c.number>2).map(c=>[c.progressId,data=>{physicsExtraProgress[c.number]=practiceProgress(c.progressId,data);}])];
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
  return `${renderHeader()}<main class="study-entry"><ol class="study-steps" aria-label="Pasos para empezar"><li aria-current="step"><b>1</b> Modo de estudio</li><li><b>2</b> Curso</li><li><b>3</b> Capítulo</li></ol><p class="study-eyebrow">Tú eliges cómo aprender</p><h1>¿Cómo quieres estudiar?</h1><p class="study-intro">Primero elige tu modo de estudio. Después podrás escoger el curso y el capítulo.</p><div class="study-mode-grid"><button class="study-choice study-choice-free" data-study-mode="free" onclick="selectStudyMode('free')"><span class="study-choice-icon"><i data-lucide="compass"></i></span><span class="study-choice-title">Estudio libre</span><span class="study-choice-description">Explora los temas y las actividades en el orden que prefieras.</span><span class="study-choice-detail">Puedes leer cualquier tema y resolver los problemas en el orden que prefieras.</span><span class="study-choice-action">Elegir libre <i data-lucide="arrow-right"></i></span>${previous==='free'?'<small>Tu elección anterior</small>':''}</button><button class="study-choice study-choice-progressive" data-study-mode="progressive" onclick="selectStudyMode('progressive')"><span class="study-choice-icon"><i data-lucide="route"></i></span><span class="study-choice-title">Estudio progresivo</span><span class="study-choice-description">Practica en secuencia y avanza al resolver cada problema.</span><span class="study-choice-detail">Lee la teoría a tu ritmo. Cada respuesta correcta habilita el siguiente problema.</span><span class="study-choice-action">Elegir progresivo <i data-lucide="arrow-right"></i></span>${previous==='progressive'?'<small>Tu elección anterior</small>':''}</button></div><p class="study-entry-note"><i data-lucide="circle-check"></i>Tu elección se aplica a todos los cursos. Puedes cambiarla sin perder tu avance.</p></main>`;
}
function showStudyModes(){pendingEntry=null;state.view='mode';window.scrollTo(0,0);render();}
function entryDestination(){
  const entry=new URLSearchParams(window.location.search);
  const chapters=[...PHYSICS_MODULES.map(c=>c.progressId),...HISTORY_CHAPTERS.map(c=>'historia-universal-capitulo-'+String(c.number).padStart(2,'0')),...PERU_CHAPTERS.map(c=>'historia-del-peru-capitulo-'+String(c.number).padStart(2,'0')),...LANGUAGE_CHAPTERS.map(c=>'lenguaje-capitulo-'+String(c.number).padStart(2,'0')),...Object.values(SOCIAL_COURSES).flatMap(course=>course.chapters.map(c=>c.progressId))];
  return {chapter:chapters.includes(entry.get('chapter'))?entry.get('chapter'):null,course:COURSES.some(c=>c.id===Number(entry.get('course')))?Number(entry.get('course')):null,choose:entry.get('mode')==='choose'};
}
function continueStudyEntry(){
  if(!state.studyMode){state.view='mode';render();return;}
  const entry=pendingEntry;pendingEntry=null;state.view='catalog';
  if(entry?.chapter){window.location.replace(entry.chapter+'.html?v='+(entry.chapter.startsWith('fisica-')?'20260918-catalog9':'20260918-social1'));return;}
  if(entry?.course){state.activeCourseId=entry.course;state.activeTopicIndex=entry.course===16?clamp(navigationProgress.lastTopicIndex,0,17):entry.course===12?Math.max(0,activeHistoryNumber()-1):entry.course===11?Math.max(0,activePeruNumber()-1):entry.course===7?Math.max(0,activeLanguageNumber()-1):SOCIAL_COURSES[entry.course]?activeSocialNumber(entry.course)-1:0;state.activeTab='Teoría';state.view='course';}
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
  const peru=Number(navigationProgress.lastCourseId)===11;
  const language=Number(navigationProgress.lastCourseId)===7;
  const social=SOCIAL_COURSES[Number(navigationProgress.lastCourseId)];
  const chapterNumber=social?activeSocialNumber(navigationProgress.lastCourseId):physics?activePhysicsNumber():peru?activePeruNumber():language?activeLanguageNumber():activeHistoryNumber();
  const activeProgress=social?socialChapterProgress(navigationProgress.lastCourseId,chapterNumber):physics?(activePhysicsModule()?physicsChapterProgress(chapterNumber):window.ChapterPractice.summary('',{})):peru?peruChapterProgress(chapterNumber):language?languageChapterProgress(chapterNumber):historyChapterProgress(chapterNumber);
  const activeCourseName=social?social.name:physics?'Física':peru?'Historia del Perú':language?'Lenguaje':'Historia Universal';
  const activeChapterName=social?social.chapters.find(c=>c.number===chapterNumber)?.title:physics?(activePhysicsModule()?.title||COURSES.find(c=>c.id===16).topics[navigationProgress.lastTopicIndex||0]):((peru?PERU_CHAPTERS:language?LANGUAGE_CHAPTERS:HISTORY_CHAPTERS).find(c=>c.number===chapterNumber)?.title||'La ciencia histórica');
  const total=10;
  const percent=clamp(activeProgress.percent,0,100);
  const completed=activeProgress.practiceCompleted||0;
  const status=activeProgress.chapterCompleted?'Completado':percent>0?'En progreso':'Por comenzar';
  const cta=activeProgress.chapterCompleted?'Repasar capítulo':percent>0?'Continuar estudiando':'Comenzar ruta';
  const lastCourse=navigationProgress.lastCourseName||'Aún sin actividad';
  const lastChapter=navigationProgress.lastChapterName||'Explora un curso para comenzar';
  return `<section class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8"><div class="bg-white rounded-3xl border border-slate-200 shadow-xl shadow-slate-900/5 overflow-hidden"><div class="p-5 sm:p-7"><div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5"><div><div class="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[.18em] text-red-600"><i data-lucide="chart-no-axes-column-increasing" class="w-4 h-4"></i>Mi progreso</div><h2 class="mt-2 text-2xl sm:text-3xl font-black text-slate-900">Sigue desde donde te quedaste</h2><p class="mt-2 text-sm text-slate-500">Tu avance se guarda automáticamente en la nube y te acompaña en cualquier dispositivo.</p></div><div class="flex items-center gap-3 rounded-2xl bg-slate-50 border border-slate-200 px-4 py-3 min-w-[210px]"><div class="w-10 h-10 rounded-xl bg-blue-950 text-white flex items-center justify-center"><i data-lucide="history" class="w-5 h-5"></i></div><div class="min-w-0"><div class="text-[11px] uppercase tracking-wider font-bold text-slate-400">Última visita</div><div class="text-sm font-bold text-slate-800 truncate">${esc(lastCourse)}</div><div class="text-xs text-slate-500 truncate">${esc(lastChapter)}</div></div></div></div><div class="mt-6 grid lg:grid-cols-[1fr_auto] gap-5 items-stretch"><div class="rounded-3xl bg-gradient-to-br from-blue-950 to-blue-900 text-white p-5 sm:p-6"><div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4"><div><div class="text-xs font-bold uppercase tracking-[.18em] text-blue-200">Ruta activa</div><h3 class="mt-2 text-xl sm:text-2xl font-black">${activeCourseName} · ${physics?esc(activePhysicsModule()?.sourceLabel||'Capítulo '+chapterNumber):'Capítulo '+chapterNumber}</h3><p class="mt-1 text-sm text-blue-100">${activeChapterName}</p></div><div class="text-left sm:text-right"><div class="text-4xl font-black">${percent}%</div><div class="text-xs text-blue-200 mt-1">${status}</div></div></div><div class="mt-5 h-3 rounded-full bg-white/15 overflow-hidden"><div class="h-full rounded-full bg-red-400 transition-all duration-500" style="width:${percent}%"></div></div><div class="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-xs text-blue-100"><span class="inline-flex items-center gap-1.5"><i data-lucide="circle-check-big" class="w-4 h-4 text-emerald-300"></i>${completed} de ${total} problemas resueltos</span><span class="inline-flex items-center gap-1.5"><i data-lucide="unlock" class="w-4 h-4 text-amber-300"></i>Problema ${Math.min(activeProgress.unlockedItem+1,total)} disponible</span></div></div><div class="rounded-3xl border border-slate-200 bg-slate-50 p-5 sm:p-6 lg:w-72 flex flex-col justify-between"><div><div class="w-11 h-11 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center"><i data-lucide="graduation-cap" class="w-5 h-5"></i></div><h3 class="mt-4 font-extrabold text-slate-900">${cta}</h3><p class="mt-2 text-sm leading-relaxed text-slate-500">${state.studyMode==='free'?'Explora la teoría, practica y comprueba lo aprendido a tu ritmo.':'Continúa la ruta con teoría breve, actividades y desbloqueo progresivo.'}</p></div><button onclick="openProgressChapter()" class="mt-5 w-full inline-flex items-center justify-center gap-2 rounded-xl bg-blue-950 px-4 py-3 text-sm font-bold text-white hover:bg-blue-900">${cta}<i data-lucide="arrow-right" class="w-4 h-4"></i></button></div></div></div><div class="px-5 sm:px-7 py-3 border-t border-slate-100 bg-slate-50 text-xs text-slate-400">Seguimiento disponible en Razonamiento Matemático, Razonamiento Verbal, Economía, Educación Cívica, Lenguaje, Historia del Perú e Historia Universal · Capítulos 1 al 6; y Física · Capítulo 15: Electrodinámica y repasos complementarios.</div></div></section>`;
}

const searchText=value=>String(value||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().trim().replace(/\s+/g,' ');
function filteredCourses(){
  const words=searchText(state.search).split(' ').filter(Boolean),aliases={1:'rv',2:'rm',10:'civica',11:'hp historia peru',12:'hu',14:'eco'};
  return COURSES.filter(c=>(state.category==='Todos'||c.category===state.category)&&words.every(word=>searchText(c.name+' '+(aliases[c.id]||'')).includes(word)));
}
function renderCourseCategories(){
 return CATEGORIES.map(cat=>`<button onclick="setCategory('${esc(cat)}')" aria-pressed="${state.category===cat}" class="px-4 py-2 rounded-full text-sm font-semibold border transition ${state.category===cat?'bg-blue-950 text-white border-blue-950':'bg-white text-slate-600 border-slate-200 hover:border-blue-300 hover:text-blue-950'}">${esc(cat)}</button>`).join('');
}
function renderCourseCards(courses){
  return courses.map(c=>{
    const tracked=SOCIAL_COURSES[c.id]?SOCIAL_COURSES[c.id].chapters.map(h=>[h.number,socialChapterProgress(c.id,h.number)]):c.id===16?PHYSICS_MODULES.map(h=>[h.number,physicsChapterProgress(h.number)]):c.id===12?HISTORY_CHAPTERS.map(h=>[h.number,historyChapterProgress(h.number)]):c.id===11?PERU_CHAPTERS.map(h=>[h.number,peruChapterProgress(h.number)]):c.id===7?LANGUAGE_CHAPTERS.map(h=>[h.number,languageChapterProgress(h.number)]):[];
    const detailed=tracked.map(([number,progress])=>`<div class="mt-4"><div class="flex items-center justify-between text-[11px] font-bold"><span class="text-slate-400">${c.id===16?esc(PHYSICS_MODULES.find(h=>h.number===number)?.sourceLabel||'Capítulo '+number)+' · '+esc(PHYSICS_MODULES.find(h=>h.number===number)?.title):'Cap. '+number}</span><span class="text-red-600">${clamp(progress.percent,0,100)}%</span></div><div class="mt-1.5 h-1.5 rounded-full bg-slate-100 overflow-hidden"><div class="h-full bg-red-500 rounded-full" style="width:${clamp(progress.percent,0,100)}%"></div></div></div>`).join('');
    return `<button onclick="openCourse(${c.id})" class="course-card bg-white rounded-3xl border border-slate-200 p-5 text-left group w-full"><div class="flex items-start justify-between gap-4"><div class="w-12 h-12 rounded-2xl bg-blue-50 text-blue-950 flex items-center justify-center group-hover:bg-blue-950 group-hover:text-white transition"><i data-lucide="${esc(c.icon)}" class="w-6 h-6"></i></div><span class="text-[11px] font-bold uppercase tracking-wider text-slate-400 bg-slate-50 px-2.5 py-1 rounded-full">${esc(c.category)}</span></div><h3 class="mt-5 text-lg font-extrabold text-slate-900 leading-snug">${esc(c.name)}</h3><p class="mt-2 text-sm text-slate-500 line-clamp-2">${esc(c.topics[0])} · ${esc(c.topics[1])} · …</p>${detailed}<div class="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between"><div class="flex items-center gap-2 text-sm font-semibold text-slate-500"><i data-lucide="layers-3" class="w-4 h-4"></i>${c.topics.length} capítulos</div><span class="text-blue-950 group-hover:text-red-600 transition"><i data-lucide="arrow-right" class="w-5 h-5"></i></span></div></button>`;
  }).join('');
}
function renderCourseResults(){
 const courses=filteredCourses();
 return `<div class="flex flex-wrap items-center justify-between gap-3"><h2 class="text-xl sm:text-2xl font-black text-slate-900">Cursos disponibles</h2><p role="status" aria-live="polite" aria-atomic="true" class="text-sm text-slate-500">${courses.length} curso${courses.length===1?'':'s'} encontrado${courses.length===1?'':'s'}</p></div><div class="mt-5 grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">${renderCourseCards(courses)||'<div class="sm:col-span-2 lg:col-span-3 xl:col-span-4 bg-white border border-dashed border-slate-300 rounded-3xl p-8 text-center"><p class="font-bold text-slate-800">No encontramos cursos con ese nombre.</p><p class="mt-2 text-sm text-slate-500">Prueba con otra palabra o muestra todos los cursos.</p><button onclick="clearCourseSearch(true)" class="mt-4 rounded-xl bg-blue-950 px-5 py-3 font-bold text-sm text-white">Mostrar todos los cursos</button></div>'}</div>`;
}
function renderCatalog(){
 return `${renderHeader()}<main><section class="bg-gradient-to-br from-blue-950 via-blue-900 to-slate-900 text-white"><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10"><p class="text-xs font-bold uppercase tracking-[.18em] text-red-300">Tu ruta de aprendizaje</p><h1 class="mt-2 text-3xl sm:text-4xl font-black">¿Qué curso quieres estudiar?</h1><p class="mt-3 text-blue-100">Escribe el nombre del curso y elige dónde continuar.</p><div role="search" aria-label="Buscar cursos" class="mt-6 max-w-3xl"><label for="searchInput" class="block text-sm font-bold mb-2">Buscar curso</label><div class="flex items-center gap-2 rounded-2xl bg-white p-2 shadow-lg"><i data-lucide="search" class="w-5 h-5 text-slate-500 ml-2 shrink-0" aria-hidden="true"></i><input id="searchInput" type="search" autocomplete="off" value="${esc(state.search)}" oninput="setSearch(this.value)" onkeydown="if(event.key==='Enter')openSearchResult()" placeholder="Ej.: Física, Álgebra o Razonamiento Matemático" aria-controls="courseResults" class="w-full min-w-0 rounded-xl bg-white px-2 py-3 text-base text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-800"><button id="clearCourseSearch" onclick="clearCourseSearch()" ${state.search?'':'hidden'} class="rounded-xl px-3 py-2 text-sm font-bold text-blue-950 hover:bg-slate-100" aria-label="Borrar búsqueda">Borrar</button></div><p class="mt-2 text-xs text-blue-200">Puedes escribir con o sin tildes. Los resultados aparecen al escribir.</p></div></div></section><section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-7"><div id="courseCategories" class="flex flex-wrap gap-2 mb-7" aria-label="Filtrar por área">${renderCourseCategories()}</div><div id="courseResults">${renderCourseResults()}</div></section>${renderProgressPanel()}</main><footer class="border-t border-slate-200 bg-white mt-8"><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-7 text-xs text-slate-400 flex flex-col sm:flex-row gap-2 justify-between"><span>SIN LÍMITES · Academia Virtual</span><span>${COURSES.length} cursos · ${COURSES.reduce((total,c)=>total+c.topics.length,0)} capítulos</span></div></footer>`;
}

function specialHistoryContent(course){
  const physics=course.id===16?PHYSICS_CHAPTERS.find(c=>c.topicIndex===state.activeTopicIndex&&c.format==='reading'):null;
  if(physics)return `<section class="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8"><p class="text-xs font-bold uppercase tracking-wider text-red-600">${esc(physics.sourceLabel)} · Contenido desarrollado</p><h2 class="mt-3 text-3xl font-black text-blue-950">${esc(physics.title)}</h2><p class="mt-4 text-slate-600">${esc(physics.intro)}</p><p class="mt-3 text-sm text-slate-500">Teoría y ejemplos resueltos · circuitos y gráficas ampliables · 10 problemas con solución</p><a href="${physics.progressId}.html?v=20260918-catalog9" class="inline-flex mt-6 rounded-xl bg-blue-950 px-5 py-3 text-sm font-bold text-white">Estudiar Electrodinámica →</a></section>`;
  const social=SOCIAL_COURSES[course.id],chapter=social?.chapters.find(c=>c.number===state.activeTopicIndex+1);
  if(chapter)return `<section class="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8"><p class="text-xs font-bold uppercase tracking-wider text-red-600">Capítulo ${chapter.number} de ${social.syllabus.length} · Contenido desarrollado</p><h2 class="mt-3 text-3xl font-black text-blue-950">${esc(chapter.title)}</h2><p class="mt-4 text-slate-600">${esc(chapter.intro)}</p><p class="mt-3 text-sm text-slate-500">Teoría por temas · ${course.id===2?'figuras matemáticas en los enunciados':'imágenes referenciales ampliables'} · práctica de 10 problemas con explicación</p><a href="${chapter.progressId}.html?v=20260918-social1" class="inline-flex mt-6 rounded-xl bg-blue-950 px-5 py-3 text-sm font-bold text-white">Estudiar el capítulo →</a></section>`;
  if(course.id===7&&state.activeTopicIndex>=0&&state.activeTopicIndex<6){
    const c=LANGUAGE_CHAPTERS.find(h=>h.number===state.activeTopicIndex+1);
    if(c)return `<section class="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8"><p class="text-xs font-bold uppercase tracking-wider text-red-600">Capítulo ${c.number} de ${window.LANGUAGE_SYLLABUS.length} · Contenido desarrollado</p><h2 class="mt-3 text-3xl font-black text-blue-950">${esc(c.title)}</h2><p class="mt-4 text-slate-600">${esc(c.intro)}</p><p class="mt-3 text-sm text-slate-500">Teoría por temas · imágenes ampliables · práctica de 10 problemas con explicación</p><a href="lenguaje-capitulo-${String(c.number).padStart(2,'0')}.html?v=20260918-social1" class="inline-flex mt-6 rounded-xl bg-blue-950 px-5 py-3 text-sm font-bold text-white">Estudiar el capítulo →</a></section>`;
  }
  if(course.id===11&&state.activeTopicIndex>=0&&state.activeTopicIndex<6){
    const c=PERU_CHAPTERS.find(h=>h.number===state.activeTopicIndex+1);
    if(c)return `<section class="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8"><p class="text-xs font-bold uppercase tracking-wider text-red-600">Capítulo ${c.number} de ${window.PERU_SYLLABUS.length} · Contenido desarrollado</p><h2 class="mt-3 text-3xl font-black text-blue-950">${esc(c.title)}</h2><p class="mt-4 text-slate-600">${esc(c.intro)}</p><p class="mt-3 text-sm text-slate-500">Teoría por temas · imágenes ampliables · práctica de 10 problemas con explicación</p><a href="historia-del-peru-capitulo-${String(c.number).padStart(2,'0')}.html?v=20260918-social1" class="inline-flex mt-6 rounded-xl bg-blue-950 px-5 py-3 text-sm font-bold text-white">Estudiar el capítulo →</a></section>`;
  }
  if(course.id===12&&state.activeTopicIndex===0)return `<section class="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8"><p class="text-xs font-bold uppercase tracking-wider text-red-600">Capítulo 1 de 40 · Teoría y actividades</p><h2 class="mt-3 text-3xl font-black text-blue-950">La ciencia histórica</h2><p class="mt-4 text-slate-600">Estudia la ciencia histórica con explicaciones, ejemplos e imágenes: concepto e importancia, tiempo histórico, protagonistas, fuentes, ciencias auxiliares, historiografía y periodización.</p><p class="mt-3 text-sm text-slate-500">Teoría e imágenes didácticas · práctica de 10 problemas con explicación · avance guardado</p><a href="historia-universal-capitulo-01.html?v=20260918-social1" class="inline-flex mt-6 rounded-xl bg-blue-950 px-5 py-3 text-sm font-bold text-white">Estudiar el capítulo →</a></section>`;
  if(course.id===12&&state.activeTopicIndex>=1&&state.activeTopicIndex<=5){
    const c=HISTORY_CHAPTERS.find(h=>h.number===state.activeTopicIndex+1);
    if(c)return `<section class="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8"><p class="text-xs font-bold uppercase tracking-wider text-red-600">Capítulo ${c.number} de ${window.HISTORY_SYLLABUS.length} · Contenido desarrollado</p><h2 class="mt-3 text-3xl font-black text-blue-950">${esc(c.title)}</h2><p class="mt-4 text-slate-600">${esc(c.intro)}</p><p class="mt-3 text-sm text-slate-500">Teoría por temas · imágenes ampliables · práctica de 10 problemas con explicación</p><a href="historia-universal-capitulo-${String(c.number).padStart(2,'0')}.html?v=20260918-social1" class="inline-flex mt-6 rounded-xl bg-blue-950 px-5 py-3 text-sm font-bold text-white">Estudiar el capítulo →</a></section>`;
  }
  return null;
}

function renderCourse(){
  const course=COURSES.find(c=>c.id===state.activeCourseId)||COURSES[0];
  const topic=course.topics[state.activeTopicIndex];
  const tab=TAB_INFO[state.activeTab]||TAB_INFO.Teoría;
  const syllabusNote=course.id===16?'<p class="mt-3 mb-3 text-sm text-slate-500">18 capítulos en el orden del PDF. Desarrollado: capítulo 15, Electrodinámica.</p>':SOCIAL_COURSES[course.id]?`<p class="mt-3 text-sm text-slate-500">${esc(course.name)}: ${course.topics.length} capítulos; contenido desarrollado del 1 al 6.</p>`:course.id===12?'<p class="mt-3 text-sm text-slate-500">Historia Universal: 40 capítulos; contenido desarrollado del 1 al 6.</p>':course.id===11?'<p class="mt-3 text-sm text-slate-500">Historia del Perú: 35 capítulos; contenido desarrollado del 1 al 6.</p>':course.id===7?'<p class="mt-3 text-sm text-slate-500">Lenguaje: 34 capítulos; contenido desarrollado del 1 al 6.</p>':'';
  const chapterButtons=syllabusNote+course.topics.map((name,idx)=>`<button onclick="setTopic(${idx})" class="chapter-btn w-full flex items-center gap-3 px-3 py-3 rounded-xl text-left ${idx===state.activeTopicIndex?'bg-blue-950 text-white':'text-slate-600 hover:bg-slate-100'}"><span class="text-[11px] font-bold w-7 shrink-0 ${idx===state.activeTopicIndex?'text-red-300':'text-slate-400'}">${String(idx+1).padStart(2,'0')}</span><span class="text-sm font-medium leading-snug">${esc(name)}${course.id===16&&PHYSICS_CHAPTERS.find(c=>c.topicIndex===idx)?.sourceLabel?`<small class="block mt-1">Contenido desarrollado</small>`:''}</span></button>`).join('');
  const reviews=course.id===16?`<section class="mt-6 rounded-2xl border border-blue-100 bg-blue-50 p-5"><h2 class="font-bold text-blue-950">Repasos complementarios</h2><p class="mt-2 text-sm text-slate-600">Refuerza tus bases con teoría, ejemplos y práctica.</p><div class="mt-3 flex flex-wrap gap-3">${PHYSICS_REVIEWS.map(m=>`<a class="rounded-xl bg-white border border-blue-200 px-4 py-3 text-sm font-bold text-blue-950" href="${m.progressId}.html?v=20260918-catalog9">${esc(m.title)} →</a>`).join('')}</div></section>`:'';
  const special=specialHistoryContent(course);
  const tabs=Object.keys(TAB_INFO).map(name=>`<button onclick="setTab('${name}')" class="px-4 py-3 text-sm font-semibold whitespace-nowrap border-b-2 transition ${state.activeTab===name?'text-blue-950 border-red-600':'text-slate-400 border-transparent hover:text-slate-700'}">${name}</button>`).join('');
  const prevDisabled=state.activeTopicIndex===0;
  const nextDisabled=state.activeTopicIndex===course.topics.length-1;
  const standard=`<div class="bg-white rounded-3xl border border-slate-200 overflow-hidden"><div class="p-6 sm:p-8 bg-gradient-to-r from-blue-950 to-blue-900 text-white"><p class="text-xs font-bold uppercase tracking-[.18em] text-blue-200">Capítulo ${String(state.activeTopicIndex+1).padStart(2,'0')} de ${course.topics.length}</p><h2 class="mt-3 text-2xl sm:text-4xl font-black leading-tight">${esc(topic)}</h2><p class="mt-3 text-sm text-blue-100">${esc(course.name)} · ${course.id===16?'Temario del PDF':'Temario 2026-II'}</p></div><div class="px-4 sm:px-6 border-b border-slate-100 overflow-x-auto custom-scrollbar"><div class="flex min-w-max">${tabs}</div></div><div class="p-6 sm:p-8"><div class="fade-in"><div class="w-12 h-12 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center"><i data-lucide="${tab.icon}" class="w-6 h-6"></i></div><h3 class="mt-5 text-xl font-extrabold text-slate-900">${tab.title}</h3><p class="mt-2 text-slate-600 leading-relaxed max-w-3xl">${tab.text}</p><div class="mt-7 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-5 sm:p-6"><div class="flex items-start gap-3"><i data-lucide="construction" class="w-5 h-5 text-amber-500 mt-0.5 shrink-0"></i><div><p class="font-semibold text-slate-700">Estructura académica creada</p><p class="mt-1 text-sm text-slate-500">El capítulo ya forma parte de la malla. En la siguiente etapa podemos incorporar el contenido académico de esta sección.</p></div></div></div></div></div></div>`;
  return `${renderHeader()}<main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6"><div class="mb-5 flex flex-wrap items-center gap-3"><button onclick="goHome()" class="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-white border border-slate-200 text-sm font-semibold text-slate-600 hover:text-blue-950"><i data-lucide="arrow-left" class="w-4 h-4"></i> Cursos</button><span class="text-xs font-bold uppercase tracking-wider text-slate-400">${esc(course.category)}</span></div><div class="grid lg:grid-cols-[330px_1fr] gap-6 min-h-[72vh]"><aside class="bg-white rounded-3xl border border-slate-200 overflow-hidden lg:sticky lg:top-24 lg:h-[calc(100vh-7.5rem)]"><div class="p-5 border-b border-slate-100"><div class="flex items-center gap-3"><div class="w-11 h-11 rounded-2xl bg-blue-50 text-blue-950 flex items-center justify-center shrink-0"><i data-lucide="${esc(course.icon)}" class="w-5 h-5"></i></div><div><h1 class="font-extrabold text-slate-900 leading-tight">${esc(course.name)}</h1><p class="text-xs text-slate-400 mt-1">${course.topics.length} capítulos</p></div></div></div><div class="p-3 overflow-y-auto custom-scrollbar h-[calc(100%-86px)]">${chapterButtons}</div></aside><section class="min-w-0">${special||standard}${reviews}<div class="mt-4 px-2 py-3 flex items-center justify-between gap-4"><button onclick="moveTopic(-1)" ${prevDisabled?'disabled':''} class="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold border border-slate-200 ${prevDisabled?'text-slate-300 cursor-not-allowed':'text-slate-600 hover:text-blue-950 hover:border-blue-300'}"><i data-lucide="chevron-left" class="w-4 h-4"></i> Anterior</button><div class="hidden sm:block text-xs text-slate-400">${state.activeTopicIndex+1} / ${course.topics.length}</div><button onclick="moveTopic(1)" ${nextDisabled?'disabled':''} class="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold border border-slate-200 ${nextDisabled?'text-slate-300 cursor-not-allowed':'text-slate-600 hover:text-blue-950 hover:border-blue-300'}">Siguiente <i data-lucide="chevron-right" class="w-4 h-4"></i></button></div></section></div></main>`;
}

function render(){
  document.getElementById('app').innerHTML=!currentUser?renderLogin():!state.studyMode||state.view==='mode'?renderStudyModePicker():state.view==='course'?renderCourse():renderCatalog();
  lucide.createIcons();
}

function openCourse(id){
  if(!readyToChooseCourse()||!COURSES.some(c=>c.id===id))return;
  state.activeCourseId=id;
  state.activeTopicIndex=0;
  state.activeModuleId=null;
  state.activeTab='Teoría';
  state.view='course';
  saveProgress();
  window.scrollTo(0,0);
  render();
}

function openProgressChapter(){if(!readyToChooseCourse())return;if(Number(navigationProgress.lastCourseId)===16){const module=activePhysicsModule();if(module){window.location.assign(module.progressId+'.html?v=20260918-catalog9');return;}state.activeCourseId=16;state.activeTopicIndex=clamp(navigationProgress.lastTopicIndex,0,17);state.view='course';render();window.scrollTo(0,0);return;}const course=Number(navigationProgress.lastCourseId),prefix=SOCIAL_COURSES[course]?.prefix||(course===16?'fisica':course===11?'historia-del-peru':course===7?'lenguaje':'historia-universal'),number=SOCIAL_COURSES[course]?activeSocialNumber(course):course===16?activePhysicsNumber():course===11?activePeruNumber():course===7?activeLanguageNumber():activeHistoryNumber();window.location.assign(prefix+'-capitulo-'+String(number).padStart(2,'0')+'.html?v=20260918-social1');}
function goHome(){state.view='catalog';window.scrollTo(0,0);render()}
function setTopic(i){if(!readyToChooseCourse())return;const physics=state.activeCourseId===16?PHYSICS_CHAPTERS.find(c=>c.topicIndex===i):null;if(physics){window.location.assign(physics.progressId+'.html?v=20260918-catalog9');return;}const social=SOCIAL_COURSES[state.activeCourseId],chapter=social?.chapters.find(c=>c.number===i+1);if(chapter){window.location.assign(chapter.progressId+'.html?v=20260918-social1');return;}if(state.activeCourseId===7&&Number.isInteger(i)&&i>=0&&i<6){window.location.assign('lenguaje-capitulo-'+String(i+1).padStart(2,'0')+'.html?v=20260918-social1');return;}if(state.activeCourseId===11&&Number.isInteger(i)&&i>=0&&i<6){window.location.assign('historia-del-peru-capitulo-'+String(i+1).padStart(2,'0')+'.html?v=20260918-social1');return;}if(state.activeCourseId===12&&Number.isInteger(i)&&i>=0&&i<=5){window.location.assign('historia-universal-capitulo-'+String(i+1).padStart(2,'0')+'.html?v=20260918-social1');return}state.activeTopicIndex=i;state.activeModuleId=null;state.activeTab='Teoría';saveProgress();render();window.scrollTo({top:0,behavior:'smooth'})}
function moveTopic(d){const c=COURSES.find(c=>c.id===state.activeCourseId),n=state.activeTopicIndex+d;if(n>=0&&n<c.topics.length)setTopic(n)}
function setTab(t){if(TAB_INFO[t]){state.activeTab=t;render()}}
function updateCourseResults(){
 const results=document.getElementById('courseResults');if(results)results.innerHTML=renderCourseResults();
 const categories=document.getElementById('courseCategories');if(categories)categories.innerHTML=renderCourseCategories();
 const clear=document.getElementById('clearCourseSearch');if(clear)clear.hidden=!state.search;
 lucide.createIcons();
}
function setCategory(c){if(CATEGORIES.includes(c)){state.category=c;updateCourseResults();}}
function setSearch(value){state.search=String(value);updateCourseResults();}
function clearCourseSearch(all=false){state.search='';if(all)state.category='Todos';const input=document.getElementById('searchInput');if(input){input.value='';input.focus();}updateCourseResults();}
function openSearchResult(){const courses=filteredCourses();if(courses.length===1)openCourse(courses[0].id);}

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
    historyProgress={};historyRecords={};peruProgress={};languageProgress={};socialProgress={};physicsExtraProgress={};
    applyChapterProgress({});
    applyPhysicsProgress({});
    applyVectorsProgress({});
    if(progressUnsubscribe){progressUnsubscribe();progressUnsubscribe=null}
    document.getElementById('app').innerHTML=renderLogin();
    lucide.createIcons();
  }
});
