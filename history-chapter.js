'use strict';
const CONTENT=window.HISTORY_CONTENT;
const CHAPTER_ID=CONTENT.progressId||CONTENT.id;
const COURSE_ID=CONTENT.courseId||12;
const COURSE_NAME=CONTENT.courseName||'Historia Universal';
const COURSE_CONFIG={
  4:{prefix:'geometria',chapters:window.GEOMETRY_CHAPTERS||[]},
  17:{prefix:'quimica',chapters:window.CHEMISTRY_CHAPTERS||[]},
  18:{prefix:'biologia',chapters:window.BIOLOGY_CHAPTERS||[]},
  16:{prefix:'fisica',chapters:window.PHYSICS_CHAPTERS||[]},
  2:{prefix:'razonamiento-matematico',chapters:window.MATH_REASONING_CHAPTERS||[]},
  1:{prefix:'razonamiento-verbal',chapters:window.VERBAL_CHAPTERS||[]},
  7:{prefix:'lenguaje',chapters:window.LANGUAGE_CHAPTERS||[]},
  10:{prefix:'educacion-civica',chapters:window.CIVICS_CHAPTERS||[]},
  14:{prefix:'economia',chapters:window.ECONOMY_CHAPTERS||[]},
  11:{prefix:'historia-del-peru',chapters:window.PERU_CHAPTERS||[]},
  12:{prefix:'historia-universal',chapters:window.HISTORY_CHAPTERS||[]}
}[COURSE_ID]||{prefix:'historia-universal',chapters:window.HISTORY_CHAPTERS||[]};
const CHAPTER_PREFIX=COURSE_CONFIG.prefix;
const COURSE_CHAPTERS=COURSE_CONFIG.chapters;
const CHAPTER_META=COURSE_CHAPTERS.find(c=>c.progressId===CHAPTER_ID)||COURSE_CHAPTERS.find(c=>c.number===CONTENT.number)||{legacySources:[]};
const CHAPTER_NUMBER=CHAPTER_META.number||CONTENT.number;
const CHAPTER_TOPIC_INDEX=CHAPTER_META.topicIndex??(CHAPTER_NUMBER-1);
const CHAPTER_LABEL=CHAPTER_META.sourceLabel||'Capítulo '+CHAPTER_NUMBER;
const LESSONS=CONTENT.lessons;
const EXPLORATION=CONTENT.exploration||null;
const LABORATORY=CONTENT.laboratory||null;
const DETECTIVE=CONTENT.detective||null;
const WORKSHOP=CONTENT.workshop||null;
const INDUCTION=CONTENT.induction||null;
const ENTRY_VERSION=CHAPTER_ID==='biologia-capitulo-11'?'20261021-heartsection1':INDUCTION?'20261021-induction1':WORKSHOP?'20261021-polyhedra1':DETECTIVE?'20261021-detective1':'20260918-social1';
const SITE_VERSION=CHAPTER_ID==='biologia-capitulo-11'?'20261021-heartsection1':INDUCTION?'20261021-induction1':WORKSHOP?'20261021-polyhedra1':DETECTIVE?'20261021-detective1':'20260919-fisica19';

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
function explorationProgress(value={}){
 value=value&&typeof value==='object'&&!Array.isArray(value)?value:{};
 const safeList=items=>[...new Set((Array.isArray(items)?items:[]).filter(x=>typeof x==='string'&&/^[a-z0-9_-]{1,80}$/i.test(x)))].slice(0,80);
 const safeId=id=>typeof id==='string'&&/^[a-z0-9_-]{1,80}$/i.test(id)?id:null;
 return {experience:EXPLORATION?.id||'',visitedSites:safeList(value.visitedSites),visitedObjects:safeList(value.visitedObjects),completedChallenges:safeList(value.completedChallenges),selectedSite:safeId(value.selectedSite),selectedObject:safeId(value.selectedObject),tab:safeId(value.tab)||'map',updatedMs:Number.isFinite(Number(value.updatedMs))?Math.max(0,Number(value.updatedMs)):0};
}
function mergeExploration(a={},b={}){
 const x=explorationProgress(a),y=explorationProgress(b),latest=y.updatedMs>=x.updatedMs?y:x;
 return explorationProgress({...latest,visitedSites:[...x.visitedSites,...y.visitedSites],visitedObjects:[...x.visitedObjects,...y.visitedObjects],completedChallenges:[...x.completedChallenges,...y.completedChallenges]});
}
function laboratoryProgress(value={}){
 value=value&&typeof value==='object'&&!Array.isArray(value)?value:{};
 const number=(n,fallback,min,max)=>typeof n==='number'&&Number.isFinite(n)?Math.min(max,Math.max(min,n)):fallback;
 const id=x=>typeof x==='string'&&/^[a-z0-9_-]{1,80}$/i.test(x)?x:null;
 const list=a=>[...new Set((Array.isArray(a)?a:[]).map(id).filter(Boolean))].slice(0,30);
 const experiment=x=>{x=x&&typeof x==='object'?x:{};return {sampleType:x.sampleType==='base'?'base':'acid',sampleVolumeMl:number(x.sampleVolumeMl,20,1,100),sampleConcentrationM:number(x.sampleConcentrationM,.1,0,1),titrantConcentrationM:number(x.titrantConcentrationM,.1,.001,1),addedVolumeMl:number(x.addedVolumeMl,0,0,200),indicator:['none','bromothymol','phenolphthalein','universal'].includes(x.indicator)?x.indicator:'bromothymol'};};
 return {experience:LABORATORY?.id||'',completedChallenges:list(value.completedChallenges),visitedViews:list(value.visitedViews),experiment:experiment(value.experiment),selectedChallenge:id(value.selectedChallenge),tab:id(value.tab)||'laboratory',records:(Array.isArray(value.records)?value.records:[]).filter(x=>x&&typeof x==='object'&&Number.isFinite(x.pH)).slice(0,5).map(x=>({...experiment(x),pH:number(x.pH,7,0,14)})),updatedMs:number(value.updatedMs,0,0,Number.MAX_SAFE_INTEGER)};
}
function mergeLaboratory(a={},b={}){
 const x=laboratoryProgress(a),y=laboratoryProgress(b),latest=y.updatedMs>=x.updatedMs?y:x;
 return laboratoryProgress({...latest,completedChallenges:[...x.completedChallenges,...y.completedChallenges],visitedViews:[...x.visitedViews,...y.visitedViews]});
}
function detectiveProgress(value={}){
 value=value&&typeof value==='object'&&!Array.isArray(value)?value:{};
 const cases=Array.isArray(window.TEXT_DETECTIVE_CASES)?window.TEXT_DETECTIVE_CASES:[];
 const allQuestions=cases.flatMap(c=>c.questions||[]),allDocuments=cases.flatMap(c=>c.documents||[]);
 const ids=(items,allowed)=>[...new Set((Array.isArray(items)?items:[]).filter(x=>typeof x==='string'&&allowed.includes(x)))];
 const activeCase=cases.find(c=>c.id===value.activeCase)||cases[0];
 const answers={};
 for(const c of cases)for(const q of c.questions||[]){
  const item=value.answers&&typeof value.answers==='object'?value.answers[q.id]:null;
  if(!item||typeof item!=='object'||Array.isArray(item))continue;
  const sentences=c.documents.flatMap(d=>d.sentences.map(s=>s.id));
  answers[q.id]={evidence:ids(item.evidence,sentences),choice:q.options.some(o=>o.id===item.choice)?item.choice:null,attempts:typeof item.attempts==='number'&&Number.isFinite(item.attempts)?Math.max(0,Math.min(999,Math.floor(item.attempts))):0};
 }
 return {experience:DETECTIVE?.id||'',activeCase:activeCase?.id||null,activeQuestion:activeCase?.questions.some(q=>q.id===value.activeQuestion)?value.activeQuestion:activeCase?.questions[0]?.id||null,activeDocument:activeCase?.documents.some(d=>d.id===value.activeDocument)?value.activeDocument:activeCase?.documents[0]?.id||null,answers,completedQuestions:ids(value.completedQuestions,allQuestions.map(q=>q.id)),visitedDocuments:ids(value.visitedDocuments,allDocuments.map(d=>d.id)),updatedMs:typeof value.updatedMs==='number'&&Number.isFinite(value.updatedMs)?Math.max(0,Math.min(Number.MAX_SAFE_INTEGER,value.updatedMs)):0};
}
function mergeDetective(a={},b={}){
 const x=detectiveProgress(a),y=detectiveProgress(b),latest=y.updatedMs>=x.updatedMs?y:x,other=latest===y?x:y;
 return detectiveProgress({...latest,answers:{...other.answers,...latest.answers},completedQuestions:[...x.completedQuestions,...y.completedQuestions],visitedDocuments:[...x.visitedDocuments,...y.visitedDocuments]});
}
function workshopProgress(value={}){
 value=value&&typeof value==='object'&&!Array.isArray(value)?value:{};
 const number=(n,fallback,min,max)=>typeof n==='number'&&Number.isFinite(n)?Math.max(min,Math.min(max,n)):fallback;
 const solids=['cube','tetrahedron','octahedron','dodecahedron','icosahedron','pyramid'],tabs=['explore','unfold','slice','missions'];
 const ids=(items,allowed)=>[...new Set((Array.isArray(items)?items:[]).filter(x=>allowed.includes(x)))];
 const solid=solids.includes(value.solid)?value.solid:'cube',slice=value.slice&&typeof value.slice==='object'?value.slice:{};
 let selection=null;
 try{
  const model=window.PolyhedraEngine?.getModel(solid),s=value.selection;
  if(model&&s&&typeof s==='object'&&['face','edge','vertex'].includes(s.kind)){
   const allowed=s.kind==='face'?model.faces.map(f=>f.id):s.kind==='edge'?model.edges.map(e=>e.id):model.vertices.map((_,i)=>'v'+i);
   if(allowed.includes(s.id))selection={kind:s.kind,id:s.id};
  }
 }catch{}
 const answers=value.missionAnswers&&typeof value.missionAnswers==='object'?value.missionAnswers:{},euler=answers.euler&&typeof answers.euler==='object'?answers.euler:{};
 const integer=n=>Number.isInteger(n)&&n>=0&&n<=100?n:null;
 return {experience:WORKSHOP?.id||'',tab:tabs.includes(value.tab)?value.tab:'explore',solid,netSolid:['cube','pyramid'].includes(value.netSolid)?value.netSolid:'cube',yaw:number(value.yaw,35,-180,180),pitch:number(value.pitch,-20,-85,85),transparent:value.transparent===true,selection,unfold:number(value.unfold,0,0,1),slice:{azimuth:number(slice.azimuth,0,-180,180),elevation:number(slice.elevation,90,-90,90),offset:number(slice.offset,0,-1.8,1.8)},completedChallenges:ids(value.completedChallenges,['euler','net','hexagon']),visitedTabs:ids(value.visitedTabs,tabs),missionAnswers:{euler:{vertices:integer(euler.vertices),edges:integer(euler.edges),faces:integer(euler.faces)},net:integer(answers.net),section:integer(answers.section)},updatedMs:number(value.updatedMs,0,0,Number.MAX_SAFE_INTEGER)};
}
function mergeWorkshop(a={},b={}){
 const x=workshopProgress(a),y=workshopProgress(b),latest=y.updatedMs>=x.updatedMs?y:x;
 return workshopProgress({...latest,completedChallenges:[...x.completedChallenges,...y.completedChallenges],visitedTabs:[...x.visitedTabs,...y.visitedTabs]});
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
function mergeProgress(a={},b={}){
 const merged=window.ChapterPractice.merge(CHAPTER_ID,a,b);
 if(INDUCTION)merged.inductionLab=mergeInduction(a.inductionLab,b.inductionLab);
 if(WORKSHOP)merged.polyhedraWorkshop=mergeWorkshop(a.polyhedraWorkshop,b.polyhedraWorkshop);
 if(DETECTIVE)merged.textDetective=mergeDetective(a.textDetective,b.textDetective);
 if(LABORATORY)merged.chemistryLab=mergeLaboratory(a.chemistryLab,b.chemistryLab);
 if(EXPLORATION)merged.historyExploration=mergeExploration(a.historyExploration,b.historyExploration);
 if(COURSE_ID===18){
  const first=a.heartExploration||{},second=b.heartExploration||{};
  const latest=Number(second.updatedMs||0)>Number(first.updatedMs||0)?second:first;
  merged.heartExploration={...first,...second,...latest,presentation:latest.presentation==='section'?'section':'model',visitedParts:[...new Set([...(Array.isArray(first.visitedParts)?first.visitedParts:[]),...(Array.isArray(second.visitedParts)?second.visitedParts:[])])],visitedSteps:[...new Set([...(Array.isArray(first.visitedSteps)?first.visitedSteps:[]),...(Array.isArray(second.visitedSteps)?second.visitedSteps:[])])].filter(n=>Number.isInteger(n)&&n>=0&&n<8),routeComplete:Boolean(first.routeComplete||second.routeComplete)};
 }
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
function cloudPayload(){return {...P,...window.ChapterPractice.summary(CHAPTER_ID,P),courseId:COURSE_ID,courseName:COURSE_NAME,chapterNumber:CHAPTER_NUMBER,chapterName:CONTENT.title,...(COURSE_ID===16?{contentType:'chapter',moduleId:CHAPTER_ID,topicIndex:CHAPTER_TOPIC_INDEX,catalogVersion:10}:{}),schemaVersion:3,format:'reading',updatedAt:firebase.firestore.FieldValue.serverTimestamp()};}
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
const chapterHref=n=>`${(COURSE_ID===16?COURSE_CHAPTERS.find(c=>c.number===n)?.progressId:null)||CHAPTER_PREFIX+'-capitulo-'+String(n).padStart(2,'0')}.html?v=${COURSE_ID===16&&n===17?'20261021-induction1#induction-lab':COURSE_ID===16?'20260919-fisica19':'20260918-social1'}`;
function header(){return `<header class="topbar"><a class="brand" href="index.html?v=${SITE_VERSION}"><img src="assets/logo-sin-limites.jpg" width="40" height="40" alt="Logo de SIN LÍMITES"><span>SIN <em>LÍMITES</em></span></a><span class="course-label">${escapeHTML(COURSE_NAME)} · ${escapeHTML(CHAPTER_LABEL)}</span><a class="button secondary" href="index.html?course=${COURSE_ID}&v=${SITE_VERSION}">← Volver al temario</a></header>`;}
function chapterLinks(){const previous=COURSE_CHAPTERS.some(c=>c.number===CHAPTER_NUMBER-1),next=COURSE_CHAPTERS.some(c=>c.number===CHAPTER_NUMBER+1);return `<nav class="finish-actions" aria-label="Cambiar de capítulo">${previous?`<a class="button secondary" href="${chapterHref(CHAPTER_NUMBER-1)}">← Capítulo ${CHAPTER_NUMBER-1}</a>`:''}${next?`<a class="button" href="${chapterHref(CHAPTER_NUMBER+1)}">Capítulo ${CHAPTER_NUMBER+1} →</a>`:`<a class="button" href="index.html?course=${COURSE_ID}&v=${SITE_VERSION}">Volver al temario →</a>`}</nav>`;}
function contents(){return '<aside class="lesson-sidebar"><details class="lesson-index" open><summary>En este capítulo</summary><nav aria-label="Temas del capítulo"><a href="#learning-goals">Antes de empezar</a>'+LESSONS.map((x,i)=>'<a href="#lesson-'+i+'"><span>'+String(i+1).padStart(2,'0')+'</span>'+escapeHTML(x.title)+'</a>').join('')+'<a class="activities-link" href="#activities">Práctica · 10 problemas</a></nav></details><p class="index-hint">Lee a tu ritmo y vuelve al tema que necesites consultar.</p></aside>';}
function illustration(block){const v=block.illustration;if(!v)return '';return `<figure class="topic-image"><button class="image-button" data-action="image" data-id="${block.id}" aria-label="Ampliar imagen: ${escapeHTML(v.caption)}"><img src="${escapeHTML(v.src)}" alt="${escapeHTML(v.alt)}" width="1448" height="1086" loading="lazy" decoding="async"><span>Ampliar ⊕</span></button><figcaption>${escapeHTML(v.caption)}<small>${escapeHTML(v.credit||'Reconstrucción didáctica creada con IA')}</small></figcaption></figure>`;}
function theoryBlock(block){
 const figures=block.figures||[];
 const figureAt=index=>figures.map((v,j)=>v.afterParagraph===index?window.ChapterPractice.renderFigure(v,'theory:'+block.id+':'+j):'').join('');
 const text=block.paragraphs.map((p,i)=>`<p>${escapeHTML(p)}</p>${figureAt(i)}`).join('')+figures.map((v,j)=>Number.isInteger(v.afterParagraph)?'':window.ChapterPractice.renderFigure(v,'theory:'+block.id+':'+j)).join('');
 const cards=block.cards?`<div class="concept-grid count-${block.cards.length}">${block.cards.map(c=>`<section class="concept-card"><h4>${escapeHTML(c.title)}</h4><p>${escapeHTML(c.text)}</p></section>`).join('')}</div>`:'';
 const table=block.rows?`<div class="table-wrap" tabindex="0" role="region" aria-label="${escapeHTML(block.title)}"><table><thead><tr>${block.headers.map(h=>`<th scope="col">${escapeHTML(h)}</th>`).join('')}</tr></thead><tbody>${block.rows.map(row=>`<tr>${row.map((x,i)=>i?`<td>${escapeHTML(x)}</td>`:`<th scope="row">${escapeHTML(x)}</th>`).join('')}</tr>`).join('')}</tbody></table></div>`:'';
 const interactive=block.interactive&&window.ChapterInteractions?window.ChapterInteractions.render(block.interactive):'';
 return `<section class="topic" id="${block.id}" tabindex="-1"><h3>${escapeHTML(block.title)}</h3><div class="topic-layout ${block.illustration?'with-image':''}"><div class="topic-prose">${text}</div>${illustration(block)}</div>${interactive}${cards}${table}${block.sources?.length?`<p class="source-note">Para profundizar: ${block.sources.map(source=>`<a href="${escapeHTML(source.url)}" target="_blank" rel="noopener noreferrer">${escapeHTML(source.label)}</a>`).join(' · ')}</p>`:''}${block.takeaway?`<p class="takeaway">${escapeHTML(block.takeaway)}</p>`:''}</section>`;
}
function exampleView(e,i,j){
 const figures=e.solutionFigures||[];
 const figureAt=step=>figures.map((v,k)=>v.afterStep===step?window.ChapterPractice.renderFigure(v,'solution:'+i+':'+j+':'+k):'').join('');
 const title=e.number?'Aplicación '+e.number+': '+escapeHTML(e.title):'Caso guiado: '+escapeHTML(e.title);
 return `<details class="guided-case"><summary>${title}</summary><p>${e.question}</p>${e.figure?window.ChapterPractice.renderFigure(e.figure,'example:'+i+':'+j):''}<ol>${e.steps.map((s,k)=>`<li>${s}${figureAt(k)}</li>`).join('')}</ol>${figures.map((v,k)=>Number.isInteger(v.afterStep)?'':window.ChapterPractice.renderFigure(v,'solution:'+i+':'+j+':'+k)).join('')}</details>`;
}
function lessonView(i=P.currentItem){const x=LESSONS[i];return `<section class="reading-section" id="lesson-${i}" data-reading-item="${i}" tabindex="-1" aria-labelledby="lesson-title-${i}"><header class="section-heading"><span>${String(i+1).padStart(2,'0')}</span><h2 id="lesson-title-${i}">${escapeHTML(x.title)}</h2></header>${x.blocks.map(theoryBlock).join('')}${x.examples.map((e,j)=>exampleView(e,i,j)).join('')}</section>`;}
function chronology(){const title=CONTENT.sequenceTitle||'Cronología para orientarte',note=CONTENT.sequenceNote||'Referencias aproximadas; los intervalos no están dibujados a escala.';return `<details class="chapter-chronology"><summary>${escapeHTML(title)}</summary><ol class="era-list">${CONTENT.timeline.map(([date,text])=>`<li><span class="era-date">${escapeHTML(date)}</span><p>${escapeHTML(text)}</p></li>`).join('')}</ol><p class="question-note">${escapeHTML(note)}</p></details>`;}
function progressSummary(){return P.practice10.mastered.length+' de 10 problemas resueltos correctamente';}
function finishContent(){return '<h2>'+(chapterComplete()?'¡Completaste la práctica!':'Tu avance en el capítulo')+'</h2><p>'+progressSummary()+'</p><p class="question-note">Completa los 10 problemas para alcanzar el 100%. Puedes repasar y volver a responder sin perder tus aciertos.</p>'+chapterLinks();}
function render(){
 window.ChapterInteractions?.unmount?.();
 if(!user)return;if(!P.studyMode){window.location.replace('index.html?chapter='+CONTENT.id+'&v='+ENTRY_VERSION);return;}
 root.innerHTML=`${header()}<main id="chapter-content"><header class="chapter-hero" id="chapter-top"><div><p class="eyebrow">${escapeHTML(COURSE_NAME)} · Capítulo ${String(CHAPTER_NUMBER).padStart(2,'0')}</p><h1>${escapeHTML(CONTENT.title)}</h1></div></header><section class="${P.studyMode==='progressive'?'progress-panel':'chapter-tools'}"${P.studyMode==='progressive'?' aria-label="Avance del capítulo"':''}>${P.studyMode==='progressive'?`<div class="progress-heading"><span>Mi avance en el capítulo</span><strong id="progress-count">${progressPercent()}%</strong></div><progress id="chapter-progress" max="100" value="${progressPercent()}" aria-label="Avance del capítulo"></progress><p class="question-note" id="progress-description">${progressSummary()}</p>`:''}<div class="save-state"><span id="save-status" role="status">${escapeHTML(saveMessage)}</span><button id="retry-save" data-action="sync" ${cloudReady?'hidden':''}>Reintentar sincronización</button></div><div class="hero-actions">${INDUCTION?`<a class="button secondary" href="#${escapeHTML(INDUCTION.anchor)}">${escapeHTML(INDUCTION.label)}</a>`:WORKSHOP?`<a class="button secondary" href="#${escapeHTML(WORKSHOP.anchor)}">${escapeHTML(WORKSHOP.label)}</a>`:DETECTIVE?`<a class="button secondary" href="#${escapeHTML(DETECTIVE.anchor)}">${escapeHTML(DETECTIVE.label)}</a>`:LABORATORY?`<a class="button secondary" href="#${escapeHTML(LABORATORY.anchor)}">${escapeHTML(LABORATORY.label)}</a>`:EXPLORATION?`<a class="button secondary" href="#${escapeHTML(EXPLORATION.anchor)}">${escapeHTML(EXPLORATION.label)}</a>`:COURSE_ID===18?'<a class="button secondary" href="#heart-lab">Explorar el corazón 3D</a>':''}${P.readingItem>0?`<button class="button secondary" data-action="resume" data-index="${P.readingItem}">Retomar lectura</button>`:''}<a class="button" href="#activities">Ir a la práctica →</a></div></section><div class="reading-layout">${contents()}<article class="chapter-article"><section class="learning-goals" id="learning-goals"><p class="eyebrow">Antes de empezar</p><h2>¿Qué aprenderás?</h2><ul>${CONTENT.goals.map(g=>`<li><strong>${escapeHTML(g.title)}.</strong> ${escapeHTML(g.text)}</li>`).join('')}</ul>${chronology()}${CONTENT.sourceNote?`<p class="source-note">${escapeHTML(CONTENT.sourceNote)}</p>`:''}</section>${LESSONS.map((_,i)=>lessonView(i)).join('')}<section class="activities-section" id="activities"><div id="activities-list">${practiceView()}</div></section><section class="chapter-finish" id="chapter-finish">${finishContent()}</section></article></div></main><footer class="page-footer">SIN LÍMITES · ${escapeHTML(COURSE_NAME)} · ${escapeHTML(CONTENT.title)}</footer><dialog id="image-dialog" aria-labelledby="image-title"></dialog>`;
 observeReading();
 renderMath(root);
 window.ChapterInteractions?.mount?.(root,{saved:INDUCTION?inductionProgress(P.inductionLab):WORKSHOP?workshopProgress(P.polyhedraWorkshop):DETECTIVE?detectiveProgress(P.textDetective):LABORATORY?laboratoryProgress(P.chemistryLab):EXPLORATION?explorationProgress(P.historyExploration):P.heartExploration||{}});
 const interaction=INDUCTION||WORKSHOP||DETECTIVE||LABORATORY||EXPLORATION;if(interaction&&window.location.hash==='#'+interaction.anchor)scrollToBlock(interaction.anchor);
}



function renderMath(scope){
 if(CONTENT.math&&scope&&typeof window.renderMathInElement==='function')window.renderMathInElement(scope,{delimiters:[{left:'\\[',right:'\\]',display:true},{left:'\\(',right:'\\)',display:false}],throwOnError:false,trust:false});
}

function practiceView(){return window.ChapterPractice.render(CHAPTER_ID,P.practice10,P.studyMode,notice);}

function renderAssessments(){const list=document.getElementById('activities-list');if(list)list.innerHTML=practiceView();const count=document.getElementById('progress-count');if(count)count.textContent=progressPercent()+'%';const bar=document.getElementById('chapter-progress');if(bar)bar.value=progressPercent();const desc=document.getElementById('progress-description');if(desc)desc.textContent=progressSummary();const finish=document.getElementById('chapter-finish');if(finish)finish.innerHTML=finishContent();renderMath(list);}
function scrollToBlock(id,focus=false){const el=document.getElementById(id);el?.scrollIntoView({behavior:'instant',block:'start'});if(focus)el?.focus?.({preventScroll:true});}
function showNotice(message,target='notice'){notice=message;renderAssessments();scrollToBlock(target,true);}
function goLesson(i){if(!canOpen(i))return;P.currentItem=i;P.readingItem=i;P.activeTab='theory';notice='';markChanged();renderAssessments();persist();scrollToBlock('lesson-'+i,true);}
function goTab(tab){if(!['theory','practice'].includes(tab))return;P.activeTab=tab;notice='';saveSoon();scrollToBlock(tab==='practice'?'activities':'lesson-'+P.readingItem);}

function checkPractice(id){const result=window.ChapterPractice.check(CHAPTER_ID,P.practice10,id,P.studyMode);if(result==='locked'||result==='unchanged')return;notice=result==='missing'?'Selecciona una alternativa antes de comprobar.':'';if(result==='graded')markChanged();renderAssessments();if(result==='graded'){persist();scrollToBlock('practice-feedback-'+id,true);}else document.querySelector('input[name="practice10-'+id+'"]')?.focus();}


function observeReading(){
 readingObserver?.disconnect();if(typeof window.IntersectionObserver!=='function')return;
 readingObserver=new window.IntersectionObserver(entries=>{const active=entries.filter(e=>e.isIntersecting).sort((a,b)=>a.boundingClientRect.top-b.boundingClientRect.top)[0];if(!active||!user)return;const i=Number(active.target.dataset.readingItem);if(Number.isInteger(i)&&i>=0&&i<LESSONS.length&&i!==P.readingItem){P.readingItem=i;saveSoon();}},{rootMargin:'-12% 0px -45% 0px',threshold:0});
 document.querySelectorAll('[data-reading-item]').forEach(el=>readingObserver.observe(el));
}
function openImage(id){const block=LESSONS.flatMap(l=>l.blocks).find(b=>b.id===id),v=block?.illustration,d=document.getElementById('image-dialog');if(!v||!d)return;d.innerHTML=`<div class="dialog-heading"><h2 id="image-title">${escapeHTML(block.title)}</h2><button class="button secondary" data-action="close-image" aria-label="Cerrar imagen">Cerrar ×</button></div><img class="expanded-image" src="${escapeHTML(v.src)}" alt="${escapeHTML(v.alt)}"><p>${escapeHTML(v.caption)} · ${escapeHTML(v.credit||'Reconstrucción didáctica creada con IA')}.</p>`;d.showModal();}
function openMathFigure(id){
 const parts=String(id).split(':');
 const v=parts[0]==='practice'?window.ChapterPractice.questions(CHAPTER_ID).find(q=>q.id===parts[1])?.figure:parts[0]==='example'?LESSONS[Number(parts[1])]?.examples[Number(parts[2])]?.figure:parts[0]==='theory'?LESSONS.flatMap(l=>l.blocks).find(b=>b.id===parts[1])?.figures?.[Number(parts[2])]:parts[0]==='solution'?LESSONS[Number(parts[1])]?.examples[Number(parts[2])]?.solutionFigures?.[Number(parts[3])]:null;
 const d=document.getElementById('image-dialog');if(!v||!d)return;
 d.innerHTML=`<div class="dialog-heading"><h2 id="image-title">${escapeHTML(v.caption)}</h2><button class="button secondary" data-action="close-image" aria-label="Cerrar figura">Cerrar ×</button></div><p class="question-note">Desplaza la figura si no cabe en tu pantalla.</p><div class="math-figure-zoom" tabindex="0" role="region" aria-label="Figura ampliada" style="--natural-width:${Number(v.width)||760}px"><img class="expanded-image math-expanded" src="${escapeHTML(v.src)}" alt="${escapeHTML(v.alt)}"></div><p>${escapeHTML(v.credit||'Esquema matemático · SIN LÍMITES')}.</p>`;d.showModal();
}
root.addEventListener('click',event=>{
const button=event.target.closest('[data-action]');if(!button||button.disabled||!user)return;if(window.ChapterInteractions?.handleClick?.(button))return;const {action,index,id}=button.dataset;if(action==='check-practice10')checkPractice(id);else if(action==='sync')retrySync();else if(action==='image')openImage(id);else if(action==='math-figure')openMathFigure(id);else if(action==='close-image')document.getElementById('image-dialog').close();else if(action==='resume')scrollToBlock('lesson-'+Number(index),true);
});
window.addEventListener('biology-heart-progress',event=>{
 if(!user||COURSE_ID!==18)return;
 const value=event.detail||{},previous=P.heartExploration||{};
 const visited=Array.isArray(value.visitedParts)?value.visitedParts.filter(x=>typeof x==='string'&&x.length<80).slice(0,30):[];
 const steps=Array.isArray(value.visitedSteps)?value.visitedSteps.filter(n=>Number.isInteger(n)&&n>=0&&n<8):[];
 P.heartExploration={...previous,visitedParts:[...new Set([...(Array.isArray(previous.visitedParts)?previous.visitedParts:[]),...visited])],visitedSteps:[...new Set([...(Array.isArray(previous.visitedSteps)?previous.visitedSteps:[]),...steps])],selectedPart:typeof value.selectedPart==='string'?value.selectedPart.slice(0,80):null,tab:value.tab==='route'?'route':'explore',routeStep:Math.min(30,Math.max(0,Number(value.routeStep)||0)),routeComplete:Boolean(previous.routeComplete||value.routeComplete),view:value.view==='internal'?'internal':'external',presentation:value.presentation==='section'?'section':'model',sectionType:['frontal','right','left','transverse'].includes(value.sectionType)?value.sectionType:'frontal',updatedMs:Date.now()};
 saveSoon();
});
window.addEventListener('history-exploration-progress',event=>{
 if(!user||!EXPLORATION||event.detail?.experience!==EXPLORATION.id)return;
 P.historyExploration=mergeExploration(P.historyExploration,{...event.detail,updatedMs:Date.now()});
 saveSoon();
});
window.addEventListener('induction-lab-progress',event=>{
 if(!user||COURSE_ID!==16||CHAPTER_ID!=='fisica-capitulo-17'||!INDUCTION||event.detail?.experience!==INDUCTION.id)return;
 P.inductionLab=mergeInduction(P.inductionLab,{...event.detail,updatedMs:Date.now()});
 saveSoon();
});
window.addEventListener('polyhedra-workshop-progress',event=>{
 if(!user||COURSE_ID!==4||CHAPTER_ID!=='geometria-capitulo-17'||!WORKSHOP||event.detail?.experience!==WORKSHOP.id)return;
 P.polyhedraWorkshop=mergeWorkshop(P.polyhedraWorkshop,{...event.detail,updatedMs:Date.now()});
 saveSoon();
});
window.addEventListener('text-detective-progress',event=>{
 if(!user||COURSE_ID!==1||CHAPTER_ID!=='razonamiento-verbal-capitulo-06'||!DETECTIVE||event.detail?.experience!==DETECTIVE.id)return;
 P.textDetective=mergeDetective(P.textDetective,{...event.detail,updatedMs:Date.now()});
 saveSoon();
});
window.addEventListener('chemistry-lab-progress',event=>{
 if(!user||!LABORATORY||COURSE_ID!==17||event.detail?.experience!==LABORATORY.id)return;
 P.chemistryLab=mergeLaboratory(P.chemistryLab,{...event.detail,updatedMs:Date.now()});
 saveSoon();
});
root.addEventListener('change',event=>{
if(!user)return;const input=event.target;if(input.dataset.group==='practice10'&&window.ChapterPractice.choose(CHAPTER_ID,P.practice10,input.dataset.question,Number(input.value),P.studyMode))saveSoon();
});
window.addEventListener('pagehide',()=>{if(user){clearTimeout(saveTimer);persist();}});

async function signedIn(u){
  window.ChapterInteractions?.unmount?.();
  readingObserver?.disconnect();
  const epoch=++authEpoch;clearTimeout(saveTimer);user=u;P=emptyProgress();cloudReady=false;saveVersion=0;saveChain=Promise.resolve();notice='';
  if(!u){root.innerHTML=`${header()}<main id="chapter-content" class="guest-view"><p class="eyebrow">${escapeHTML(COURSE_NAME)} · Capítulo ${CHAPTER_NUMBER}</p><h1>${escapeHTML(CONTENT.title)}</h1><p>Inicia sesión en la academia para estudiar y guardar tu avance.</p><a class="button" href="index.html?chapter=${CONTENT.id}&v=${ENTRY_VERSION}">Continuar con Google</a></main>`;return;}
 if(window.StudyMode&&!await window.StudyMode.requireChoice(u.uid,db,CONTENT.id,()=>epoch===authEpoch,ENTRY_VERSION))return;
 if(epoch!==authEpoch)return;
  const local=readLocal();P=importLegacy(local?.progress||{},legacyLocal(u.uid));
  try{
    const [snap,legacy]=await Promise.all([record().get(),legacyCloud(user.uid)]);if(epoch!==authEpoch)return;
    P=importLegacy(mergeProgress(snap.exists?snap.data():{},P),legacy);cloudReady=true;setSaveStatus('Tu avance está actualizado.');
  }catch(error){if(epoch!==authEpoch)return;console.error('Chapter load:',error);setSaveStatus('No se pudo cargar el avance en la nube. Puedes continuar y reintentar la sincronización.');}
  render();
  if(cloudReady){markChanged();await persist();}
  if(epoch!==authEpoch)return;
  // The navigation document lets the catalog and teacher panel resume this chapter.
  const navigation={catalogVersion:10,lastCourseId:COURSE_ID,lastCourseName:COURSE_NAME,lastModuleId:COURSE_ID===16?CHAPTER_ID:null,lastTopicIndex:CHAPTER_TOPIC_INDEX,lastChapterNumber:CHAPTER_NUMBER,lastChapterName:CONTENT.title};
  try{localStorage.setItem('academia-sm-state',JSON.stringify({catalogVersion:10,activeCourseId:COURSE_ID,activeModuleId:COURSE_ID===16?CHAPTER_ID:null,activeTopicIndex:CHAPTER_TOPIC_INDEX,activeTopicName:CONTENT.title}));}catch{}
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

