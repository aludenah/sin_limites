'use strict';
const assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const root=path.join(__dirname,'..');
const files=[
 'practice-bank.js','historia-del-peru-capitulo-09-practice.js','quimica-capitulo-18-practice.js',
 'biologia-capitulo-11-practice.js','fisica-capitulo-13-practice.js','fisica-capitulo-17-practice.js',
 'geometria-capitulo-17-practice.js','chapter-practice.js','courses.js','history-catalog.js',
 'peru-catalog.js','lenguaje-catalog.js','economia-catalog.js','educacion-civica-catalog.js',
 'razonamiento-verbal-catalog.js','razonamiento-matematico-catalog.js','fisica-catalog.js',
 'geometria-catalog.js','quimica-catalog.js','biologia-catalog.js','history-progress.js',
 'study-mode.js','student-progress.js','app.js'
];
function harness({local=new Map(),cloud=new Map(),offline=false,hash='',search=''}={}){
 const elements=new Map(),events=new Map(),redirects=[],writes=[],listeners=[],held=new Map();
 let authCallback;
 const element=()=>({innerHTML:'',textContent:'',value:'',hidden:false,dataset:{},classList:{toggle(){}},addEventListener(){},setAttribute(){},focus(){},scrollIntoView(){}});
 const document={activeElement:null,getElementById(id){if(!elements.has(id))elements.set(id,element());return elements.get(id);},querySelector:()=>null,querySelectorAll:()=>[],addEventListener(){}};
 const snapshot=key=>({exists:cloud.has(key),data:()=>structuredClone(cloud.get(key)),metadata:{fromCache:false}});
 function ref(key){return {collection:n=>ref(key+'/'+n),doc:n=>ref(key+'/'+n),async get(){if(held.has(key))await held.get(key).promise;if(offline)throw Error('offline');return snapshot(key);},async set(data,options){if(offline)throw Error('offline');writes.push({key,data:structuredClone(data)});cloud.set(key,{...(options?.merge?cloud.get(key):{}),...structuredClone(data)});},onSnapshot(fn,error){const listener={key,fn,error};listeners.push(listener);if(offline)error?.(Error('offline'));else fn(snapshot(key));return ()=>{listener.stopped=true;};}};}
 const db={collection:n=>ref(n)};
 const auth={onAuthStateChanged:fn=>authCallback=fn,signOut:async()=>authCallback(null)};
 const authFactory=Object.assign(()=>auth,{GoogleAuthProvider:class{setCustomParameters(){}},Auth:{Persistence:{LOCAL:'local'}}});
 const storage={getItem:key=>local.get(key)||null,setItem:(key,value)=>local.set(key,value)};
 const location={search,hash,pathname:'/index.html',replace:url=>redirects.push(url),assign:url=>redirects.push(url)};
 const history={pushState(_a,_b,url){location.hash=String(url).includes('#')?'#'+String(url).split('#')[1]:'';},replaceState(_a,_b,url){location.hash=String(url).includes('#')?'#'+String(url).split('#')[1]:'';}};
 const window={location,history,localStorage:storage,scrollTo(){},addEventListener:(event,fn)=>events.set(event,fn)};
 const firestore=Object.assign(()=>db,{FieldValue:{serverTimestamp:()=>123}});
 const context=vm.createContext({window,document,localStorage:storage,URLSearchParams,URL,firebase:{initializeApp(){},auth:authFactory,firestore},lucide:{createIcons(){}},console:{error(){}},queueMicrotask,setTimeout:()=>1,clearTimeout(){}});
 window.firebase=context.firebase;
 for(const file of files)vm.runInContext(fs.readFileSync(path.join(root,file),'utf8'),context,{filename:file});
 const run=source=>vm.runInContext(source,context);
 return {run,json:source=>JSON.parse(run('JSON.stringify('+source+')')),signIn:user=>authCallback(user),local,cloud,elements,events,redirects,writes,listeners,
  setOffline:value=>offline=value,
  hold(key){let release;const promise=new Promise(resolve=>release=resolve);held.set(key,{promise,release});return ()=>{held.delete(key);release();};},
  staleSnapshot(key,data){const listener=listeners.find(l=>l.key===key);assert.ok(listener,'Expected a subscribed progress record');listener.fn({exists:true,data:()=>structuredClone(data),metadata:{fromCache:false}});}
 };
}
function practice(h,id,masteredIndices){
 return h.json(`({practice10:{version:1,answers:{},results:{},attempts:{},mastered:${JSON.stringify(masteredIndices)}.map(i=>window.ChapterPractice.questions(${JSON.stringify(id)})[i].id)}})`);
}
const cloudKey=(uid,id)=>'users/'+uid+'/progress/'+id;
const localKey=(uid,id)=>'sin-limites:'+uid+':'+id;
const model=h=>h.json('window.StudentProgress.model(academicCourses(),academicChapterProgress)');

async function test(){
 // The actual catalogs define what can be measured, rather than the full unfinished syllabus.
 const h=harness();await h.signIn({uid:'learner',displayName:'Ana <López>'});
 const initial=model(h);
 assert.equal(initial.courses.length,11);
 assert.equal(initial.chapters.length,51);
 assert.equal(initial.total,510);
 assert.equal(initial.solved,0);
 assert.equal(initial.completed,0);
 const header=h.run('renderHeader()');
 assert.match(header,/<button[^>]+onclick="showAcademicProgress\(\)"/);
 assert.match(header,/Ana &lt;López&gt;/,'Student names are escaped');
 h.run('showAcademicProgress()');
 assert.equal(h.run('state.view'),'progress');
 assert.equal(h.run('state.studyMode'),null,'New students can inspect the panel before choosing a mode');
 assert.match(h.elements.get('app').innerHTML,/Mi avance académico/);
 h.run('leaveAcademicProgress()');assert.equal(h.run('state.view'),'mode');

 // Inspecting the panel is read-only, including when the chosen mode is free.
 h.run("selectStudyMode('free')");await h.run("window.StudyMode.save('learner',db)");
 const priorWrites=h.writes.length;
 h.run('showAcademicProgress()');
 assert.equal(h.run('state.studyMode'),'free');
 assert.equal(h.writes.length,priorWrites);
 assert.equal(h.run("window.StudyMode.get('learner')"),'free');
 h.run('setAcademicCourse(16)');h.run("setAcademicStatus('pending')");
 assert.match(h.elements.get('app').innerHTML,/Física/);
 h.run("setAcademicCourse('not-a-course')");h.run("setAcademicStatus('arbitrary')");
 assert.equal(h.run('academicState.courseId'),'16');assert.equal(h.run('academicState.status'),'pending');
 h.run("setAcademicStatus('completed')");
 assert.match(h.elements.get('app').innerHTML,/No hay capítulos con estos filtros/);
 h.run("setAcademicStatus('pending')");
 assert.equal(h.run('state.view'),'progress','Invalid filters do not leave the panel');

 // Mastery may be noncontiguous after free study. It counts without skipping the first pending lock.
 const id='fisica-capitulo-13',record=practice(h,id,[0,3]);
 const learnerCloud=new Map([[cloudKey('progress',id),record],[cloudKey('progress','navigation'),{studyMode:'free',studyModeUpdatedMs:1}]]);
 const saved=harness({cloud:learnerCloud});await saved.signIn({uid:'progress'});
 const summary=model(saved),chapter=summary.chapters.find(c=>c.progressId===id);
 assert.equal(summary.solved,2);assert.equal(chapter.solved,2);assert.equal(chapter.percent,20);
 assert.equal(chapter.questions[1].available,true,'Problem2 follows the first mastered problem');
 assert.equal(chapter.questions[2].available,false,'Problem3 remains locked until problem2 is mastered');
 assert.equal(chapter.questions[3].mastered,true,'A later saved acierto is retained');
 assert.equal(chapter.questions[3].available,false,'Retained mastery does not bypass the preceding lock');
 assert.equal(chapter.nextProblem,2);

 // Only a deliberate continue action changes the mode; URLs use existing chapter routing.
 saved.run('showAcademicProgress()');
 const before=JSON.stringify(learnerCloud.get(cloudKey('progress',id)));
 saved.run("continueAcademicChapter('not-a-chapter')");assert.equal(saved.redirects.length,0);
 assert.equal(saved.run('state.studyMode'),'free');
 saved.run("continueAcademicChapter('historia-universal-pdf-02')");
 assert.match(saved.redirects.at(-1),/^historia-universal-capitulo-02\.html\?/);
 assert.equal(saved.run('state.studyMode'),'progressive');
 assert.equal(JSON.stringify(learnerCloud.get(cloudKey('progress',id))),before,'Continuing does not reset scores');
 saved.run("continueAcademicChapter('fisica-capitulo-15')");
 assert.match(saved.redirects.at(-1),/^fisica-capitulo-15\.html\?/,'Chapter16 retains its stable existing URL');

 // An incorrect attempt starts a chapter without granting an acierto or releasing a lock.
 const wrong=h.json(`({practice10:{version:1,answers:{},results:{},mastered:[],attempts:{[window.ChapterPractice.questions('${id}')[0].id]:1}}})`);
 const attempted=harness({cloud:new Map([[cloudKey('attempt',id),wrong]])});await attempted.signIn({uid:'attempt'});
 const attemptedModel=model(attempted),attemptedChapter=attemptedModel.chapters.find(c=>c.progressId===id);
 assert.equal(attemptedModel.started,1);assert.equal(attemptedModel.solved,0);
 assert.equal(attemptedChapter.nextProblem,1);assert.equal(attemptedChapter.questions[1].available,false);

 // Completed chapter summary uses the actual ten-question bank, not old lesson percentages.
 const all=practice(h,id,Array.from({length:10},(_,i)=>i));
 const done=harness({cloud:new Map([[cloudKey('done',id),{...all,percent:1,chapterCompleted:false}]])});
 await done.signIn({uid:'done'});
 assert.equal(model(done).completed,1);assert.equal(model(done).solved,10);
 assert.equal(model(done).chapters.find(c=>c.progressId===id).percent,100);

 // Failed cloud reads still show this student's local achievements; another account gets none.
 const local=new Map([[localKey('offline',id),JSON.stringify({progress:record,pending:true})]]);
 const cached=harness({local,offline:true});await cached.signIn({uid:'offline'});
 assert.equal(model(cached).solved,2);
 await cached.signIn({uid:'other'});assert.equal(model(cached).solved,0);
 await done.signIn({uid:'new-account'});assert.equal(model(done).solved,0,'Direct account changes clear prior stores');

 // A listener firing after unsubscribe must not inject the previous account's aciertos.
 const race=harness({cloud:new Map([[cloudKey('first',id),record]])});await race.signIn({uid:'first'});
 await race.signIn({uid:'second'});
 race.staleSnapshot(cloudKey('first',id),all);
 assert.equal(model(race).solved,0,'Stale account subscriptions cannot mutate the active account');
 race.cloud.set(cloudKey('slow',id),all);
 const release=race.hold(cloudKey('slow',id));
 const slow=race.signIn({uid:'slow'});await race.signIn({uid:'fast'});release();await slow;
 assert.equal(race.run('currentUser.uid'),'fast');assert.equal(model(race).solved,0);

 // A bookmarked panel opens after authentication and does not force progressive mode.
 const direct=harness({hash:'#mi-avance'});await direct.signIn({uid:'bookmark'});
 assert.equal(direct.run('state.view'),'progress');
 assert.equal(direct.run('state.studyMode'),null);
 console.log('PASS: academic panel, 51 chapters/510 problems, saved mastery and progressive locks, explicit continuation, routing, read-only views, offline fallback and account isolation.');
}
module.exports={harness};
if(require.main===module)test().catch(error=>{console.error(error);process.exitCode=1;});
