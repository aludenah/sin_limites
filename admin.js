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
const provider=new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt:'select_account'});

const ADMIN_EMAIL='alexludenah@gmail.com';
const app=document.getElementById('adminApp');
let allStudents=[];
const TRACKED_CHAPTERS={
  ...Object.fromEntries((window.VERBAL_CHAPTERS||[]).map(c=>[c.progressId,{label:'Razonamiento Verbal · Capítulo '+c.number+' · '+c.title,items:10}])),
  ...Object.fromEntries((window.ECONOMY_CHAPTERS||[]).map(c=>[c.progressId,{label:'Economía · Capítulo '+c.number+' · '+c.title,items:10}])),
  ...Object.fromEntries((window.CIVICS_CHAPTERS||[]).map(c=>[c.progressId,{label:'Educación Cívica · Capítulo '+c.number+' · '+c.title,items:10}])),
  ...Object.fromEntries((window.LANGUAGE_CHAPTERS||[]).map(c=>[c.progressId,{label:'Lenguaje · Capítulo '+c.number+' · '+c.title,items:10}])),
  ...Object.fromEntries((window.PERU_CHAPTERS||[]).map(c=>[c.progressId,{history:c,label:'Historia del Perú · Capítulo '+c.number+' · '+c.title,items:10}])),
  ...Object.fromEntries((window.HISTORY_CHAPTERS||[]).map(c=>[c.progressId,{history:c,label:'Historia Universal · Capítulo '+c.number+' · '+c.title,items:10}])),
  'fisica-capitulo-01':{label:'Física · Capítulo 1 · Análisis dimensional',items:10},
  'fisica-capitulo-02':{label:'Física · Capítulo 2 · Vectores',items:10}
};
let selectedChapter='historia-universal-presentacion-01';
let dashboardLoad=0;
function changeTrackedChapter(id){if(!TRACKED_CHAPTERS[id])return;selectedChapter=id;reloadDashboard()}


const esc=v=>String(v??'').replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&#039;');
const pct=v=>Math.min(Math.max(Number(v)||0,0),100);

function isAdmin(user){
  return Boolean(user&&String(user.email||'').toLowerCase()===ADMIN_EMAIL);
}

function timestampMillis(value){
  if(!value)return 0;
  if(typeof value.toMillis==='function')return value.toMillis();
  if(value.seconds)return Number(value.seconds)*1000;
  const d=new Date(value);
  return Number.isNaN(d.getTime())?0:d.getTime();
}

function formatDate(value){
  const ms=timestampMillis(value);
  if(!ms)return 'Sin registro';
  return new Intl.DateTimeFormat('es-PE',{dateStyle:'medium',timeStyle:'short'}).format(new Date(ms));
}

function sumAttempts(obj){
  if(!obj||typeof obj!=='object')return 0;
  return Object.values(obj).reduce((sum,value)=>sum+(Number(value)||0),0);
}

function renderLogin(message=''){
  app.innerHTML=`<main class="min-h-screen bg-gradient-to-br from-blue-950 via-blue-900 to-slate-950 flex items-center justify-center p-5"><div class="w-full max-w-md bg-white rounded-[2rem] p-8 shadow-2xl"><div class="w-14 h-14 rounded-2xl bg-blue-950 text-white flex items-center justify-center font-black text-xl"><img src="assets/logo-sin-limites.jpg" alt="Logo de SIN LÍMITES" width="56" height="56" style="display:block;width:100%;height:100%;object-fit:contain;border-radius:inherit"></div><p class="mt-6 text-xs font-bold uppercase tracking-[.2em] text-red-600">Panel docente</p><h1 class="mt-2 text-3xl font-black text-slate-900">SIN LÍMITES</h1><p class="mt-3 text-sm leading-relaxed text-slate-500">Inicia sesión con la cuenta administradora para consultar el avance de los estudiantes.</p>${message?`<div class="mt-5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">${esc(message)}</div>`:''}<button onclick="loginAdmin()" class="mt-7 w-full rounded-2xl bg-blue-950 px-5 py-3.5 font-bold text-white hover:bg-blue-900">Continuar con Google</button><a href="index.html" class="mt-4 block text-center text-sm font-semibold text-slate-500 hover:text-blue-950">Volver a la academia</a></div></main>`;
}

function renderDenied(user){
  app.innerHTML=`<main class="min-h-screen flex items-center justify-center p-5"><div class="w-full max-w-lg bg-white rounded-3xl border border-slate-200 p-8 text-center shadow-sm"><div class="w-14 h-14 mx-auto rounded-2xl bg-red-50 text-red-600 flex items-center justify-center"><i data-lucide="shield-x" class="w-7 h-7"></i></div><h1 class="mt-5 text-2xl font-black text-slate-900">Acceso restringido</h1><p class="mt-3 text-sm text-slate-500">La cuenta <strong>${esc(user?.email||'')}</strong> no tiene permisos de administrador.</p><div class="mt-6 flex flex-col sm:flex-row gap-3 justify-center"><a href="index.html" class="rounded-xl border border-slate-200 px-4 py-3 text-sm font-bold text-slate-600">Volver a la academia</a><button onclick="logoutAdmin()" class="rounded-xl bg-blue-950 px-4 py-3 text-sm font-bold text-white">Cambiar de cuenta</button></div></div></main>`;
  lucide.createIcons();
}

function renderShell(user){
  app.innerHTML=`<header class="sticky top-0 z-30 border-b border-slate-200 bg-white"><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-20 flex items-center justify-between gap-4"><div class="flex items-center gap-3"><div class="w-11 h-11 rounded-2xl bg-blue-950 text-white flex items-center justify-center font-black"><img src="assets/logo-sin-limites.jpg" alt="Logo de SIN LÍMITES" width="56" height="56" style="display:block;width:100%;height:100%;object-fit:contain;border-radius:inherit"></div><div><div class="font-black text-blue-950">SIN <span class="text-red-600">LÍMITES</span></div><div class="text-[11px] uppercase tracking-[.18em] text-slate-400">Panel docente</div></div></div><div class="flex items-center gap-2"><a href="index.html" class="hidden sm:inline-flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-xs font-bold text-slate-600 hover:border-blue-300"><i data-lucide="graduation-cap" class="w-4 h-4"></i>Academia</a><div class="hidden md:block text-right"><div class="text-xs font-bold text-slate-700">${esc(user.displayName||'Administrador')}</div><div class="text-[11px] text-slate-400">${esc(user.email||'')}</div></div><button onclick="logoutAdmin()" class="rounded-xl border border-slate-200 px-3 py-2 text-xs font-bold text-slate-500 hover:text-red-600">Salir</button></div></div></header><main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"><section class="rounded-[2rem] bg-gradient-to-br from-blue-950 via-blue-900 to-slate-900 p-6 sm:p-8 text-white"><p class="text-xs font-bold uppercase tracking-[.2em] text-red-300">Seguimiento académico</p><h1 class="mt-2 text-3xl sm:text-4xl font-black">Progreso de estudiantes</h1><p class="mt-3 max-w-2xl text-sm sm:text-base text-blue-100">Consulta los problemas resueltos y el avance por capítulo de cada estudiante.</p></section><div class="mt-5"><label for="trackedChapter" class="block text-sm font-bold text-slate-600 mb-2">Capítulo a consultar</label><select id="trackedChapter" onchange="changeTrackedChapter(this.value)" class="w-full rounded-xl border border-slate-300 bg-white p-3 text-sm">${Object.entries(TRACKED_CHAPTERS).map(([id,x])=>`<option value="${id}" ${selectedChapter===id?'selected':''}>${x.label}</option>`).join('')}</select></div><div id="dashboardBody" class="mt-6"><div class="rounded-3xl border border-slate-200 bg-white p-10 text-center"><div class="w-10 h-10 mx-auto rounded-full border-4 border-slate-200 border-t-blue-950 animate-spin"></div><p class="mt-4 text-sm text-slate-500">Cargando estudiantes…</p></div></div></main>`;
  lucide.createIcons();
}

function renderPermissionError(){
  document.getElementById('dashboardBody').innerHTML=`<div class="rounded-3xl border border-amber-200 bg-amber-50 p-6"><div class="flex items-start gap-4"><div class="w-11 h-11 shrink-0 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center"><i data-lucide="shield-alert" class="w-5 h-5"></i></div><div><h2 class="font-extrabold text-amber-950">Falta habilitar la lectura administrativa en Firestore</h2><p class="mt-2 text-sm leading-relaxed text-amber-800">Publica las reglas administrativas de Firestore con la cuenta ${ADMIN_EMAIL} y vuelve a cargar esta página.</p></div></div></div>`;
  lucide.createIcons();
}

function renderDashboard(){
  const students=allStudents;
  const count=students.length;
  const withProgress=students.filter(s=>s.percent>0).length;
  const completed=students.filter(s=>s.percent>=100).length;
  const average=count?Math.round(students.reduce((a,s)=>a+s.percent,0)/count):0;
  document.getElementById('dashboardBody').innerHTML=`<section class="grid sm:grid-cols-2 lg:grid-cols-4 gap-4"><div class="rounded-3xl bg-white border border-slate-200 p-5"><div class="text-xs font-bold uppercase tracking-wider text-slate-400">Estudiantes</div><div class="mt-2 text-3xl font-black text-slate-900">${count}</div></div><div class="rounded-3xl bg-white border border-slate-200 p-5"><div class="text-xs font-bold uppercase tracking-wider text-slate-400">Avance promedio</div><div class="mt-2 text-3xl font-black text-blue-950">${average}%</div></div><div class="rounded-3xl bg-white border border-slate-200 p-5"><div class="text-xs font-bold uppercase tracking-wider text-slate-400">Con avance</div><div class="mt-2 text-3xl font-black text-amber-600">${withProgress}</div></div><div class="rounded-3xl bg-white border border-slate-200 p-5"><div class="text-xs font-bold uppercase tracking-wider text-slate-400">Capítulo completo</div><div class="mt-2 text-3xl font-black text-emerald-600">${completed}</div></div></section><section class="mt-6 rounded-3xl border border-slate-200 bg-white overflow-hidden"><div class="p-5 border-b border-slate-100 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4"><div><h2 class="text-xl font-black text-slate-900">Detalle de estudiantes</h2><p class="mt-1 text-sm text-slate-500">${TRACKED_CHAPTERS[selectedChapter].label}</p></div><div class="flex flex-col sm:flex-row gap-2"><div class="relative"><i data-lucide="search" class="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2"></i><input id="studentSearch" oninput="filterStudents()" placeholder="Buscar estudiante…" class="w-full sm:w-64 rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-9 pr-3 text-sm outline-none focus:border-blue-400"></div><button onclick="exportCSV()" class="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-bold text-slate-600 hover:border-blue-300"><i data-lucide="download" class="w-4 h-4"></i>Exportar CSV</button><button onclick="reloadDashboard()" class="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-950 px-4 py-2.5 text-sm font-bold text-white"><i data-lucide="refresh-cw" class="w-4 h-4"></i>Actualizar</button></div></div><div class="overflow-x-auto custom-scrollbar"><table class="min-w-full text-sm"><thead class="bg-slate-50 text-left text-[11px] uppercase tracking-wider text-slate-400"><tr><th class="px-5 py-3">Estudiante</th><th class="px-5 py-3">Avance</th><th class="px-5 py-3">Problemas resueltos</th><th class="px-5 py-3">Intentos</th><th class="px-5 py-3">Último contenido</th><th class="px-5 py-3">Última actividad</th></tr></thead><tbody id="studentRows" class="divide-y divide-slate-100"></tbody></table></div></section>`;
  renderRows(students);
  lucide.createIcons();
}

function renderRows(students){
  const body=document.getElementById('studentRows');
  if(!students.length){
    body.innerHTML='<tr><td colspan="6" class="px-5 py-10 text-center text-slate-400">No hay estudiantes para mostrar.</td></tr>';
    return;
  }
  body.innerHTML=students.map(s=>`<tr class="hover:bg-slate-50"><td class="px-5 py-4"><div class="font-bold text-slate-800">${esc(s.displayName||'Sin nombre')}</div><div class="mt-0.5 text-xs text-slate-400">${esc(s.email||'')}</div></td><td class="px-5 py-4 min-w-48"><div class="flex items-center justify-between gap-3"><span class="font-extrabold ${s.percent>=100?'text-emerald-600':s.percent>0?'text-blue-950':'text-slate-400'}">${s.percent}%</span><span class="text-[11px] font-bold text-slate-400">${s.percent>=100?'Completado':s.percent>0?'En progreso':'Sin iniciar'}</span></div><div class="mt-2 h-2 rounded-full bg-slate-100 overflow-hidden"><div class="h-full rounded-full ${s.percent>=100?'bg-emerald-500':'bg-red-500'}" style="width:${s.percent}%"></div></div></td><td class="px-5 py-4 font-bold text-slate-700">${s.completedItems}/${TRACKED_CHAPTERS[selectedChapter].items}</td><td class="px-5 py-4 font-bold text-slate-700">${s.attempts}</td><td class="px-5 py-4"><div class="font-semibold text-slate-700">${esc(s.lastCourse||'—')}</div><div class="text-xs text-slate-400 mt-0.5 max-w-56 truncate">${esc(s.lastChapter||'Sin actividad')}</div></td><td class="px-5 py-4 text-xs text-slate-500 whitespace-nowrap">${esc(formatDate(s.lastActivity))}</td></tr>`).join('');
}

function filterStudents(){
  const q=String(document.getElementById('studentSearch')?.value||'').trim().toLowerCase();
  const filtered=!q?allStudents:allStudents.filter(s=>`${s.displayName} ${s.email}`.toLowerCase().includes(q));
  renderRows(filtered);
}

async function fetchStudents(chapter=selectedChapter){
  const snap=await db.collection('users').get();
  const rows=await Promise.all(snap.docs.map(async userDoc=>{
    const profile=userDoc.data()||{};
    const email=String(profile.email||'').toLowerCase();
    if(email===ADMIN_EMAIL)return null;
    const ref=db.collection('users').doc(userDoc.id).collection('progress');
    const [navSnap,progressSnap]=await Promise.all([
      ref.doc('navigation').get(),
      ref.doc(chapter).get()
    ]);
    const nav=navSnap.exists?navSnap.data()||{}:{};
    let progress=progressSnap.exists?progressSnap.data()||{}:{};
    const meta=TRACKED_CHAPTERS[chapter].history;
    if(meta){
      const records={};
      await Promise.all((meta.legacySources||[]).map(async source=>{const s=await ref.doc(source.id).get();records[source.id]=s.exists?s.data():{};}));
      progress=window.HistoryProgress.combine(meta,progress,records);
    }
    progress={...progress,...window.ChapterPractice.summary(chapter,progress),practice10:window.ChapterPractice.normalize(chapter,progress)};
    const completed=progress.practiceCompleted;
    const candidates=[profile.lastLoginAt,profile.updatedAt,nav.updatedAt,progress.updatedAt];
    const lastActivity=candidates.reduce((best,value)=>timestampMillis(value)>timestampMillis(best)?value:best,null);
    return {
      uid:userDoc.id,
      displayName:profile.displayName||'',
      email:profile.email||'',
      percent:pct(progress.percent),
      completedItems:completed,
      attempts:sumAttempts(progress.practice10.attempts),
      examBest:Math.min(10,Math.max(0,Number(progress.examBest)||0)),
      lastCourse:nav.lastCourseName||'',
      lastChapter:nav.lastChapterName||'',
      lastActivity
    };
  }));
  return rows.filter(Boolean).sort((a,b)=>timestampMillis(b.lastActivity)-timestampMillis(a.lastActivity));
}

async function reloadDashboard(){
  const request=++dashboardLoad,chapter=selectedChapter;
  const body=document.getElementById('dashboardBody');
  if(body)body.innerHTML='<div class="rounded-3xl border border-slate-200 bg-white p-10 text-center"><div class="w-10 h-10 mx-auto rounded-full border-4 border-slate-200 border-t-blue-950 animate-spin"></div><p class="mt-4 text-sm text-slate-500">Actualizando información…</p></div>';
  try{
    const rows=await fetchStudents(chapter);
    if(request!==dashboardLoad)return;
    allStudents=rows;
    renderDashboard();
  }catch(e){
    console.error('Admin dashboard:',e);
    if(request!==dashboardLoad)return;
    if(e&&e.code==='permission-denied')renderPermissionError();
    else document.getElementById('dashboardBody').innerHTML=`<div class="rounded-3xl border border-red-200 bg-red-50 p-6 text-sm text-red-700">No se pudo cargar el panel${e?.code?` (${esc(e.code)})`:''}. Intenta nuevamente.</div>`;
  }
}

function exportCSV(){
  const header=['Nombre','Correo','Capítulo consultado','Avance (%)','Problemas resueltos (/10)','Intentos','Último curso','Último capítulo','Última actividad'];
  const rows=allStudents.map(s=>[s.displayName,s.email,TRACKED_CHAPTERS[selectedChapter].label,s.percent,s.completedItems,s.attempts,s.lastCourse,s.lastChapter,formatDate(s.lastActivity)]);
  const csv=[header,...rows].map(row=>row.map(value=>`"${String(value??'').replaceAll('"','""')}"`).join(',')).join('\n');
  const blob=new Blob(['\ufeff'+csv],{type:'text/csv;charset=utf-8;'});
  const url=URL.createObjectURL(blob);
  const a=document.createElement('a');
  a.href=url;
  a.download=`sin-limites-progreso-${new Date().toISOString().slice(0,10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

async function loginAdmin(){
  try{
    await auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);
    await auth.signInWithPopup(provider);
  }catch(e){
    if(e?.code==='auth/popup-closed-by-user')return;
    renderLogin(`No se pudo iniciar sesión${e?.code?` (${e.code})`:''}.`);
  }
}

async function logoutAdmin(){
  await auth.signOut();
}

auth.onAuthStateChanged(async user=>{
  if(!user){renderLogin();return;}
  if(!isAdmin(user)){renderDenied(user);return;}
  renderShell(user);
  await reloadDashboard();
});


