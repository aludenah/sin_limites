const assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const root=path.join(__dirname,'..');

function harness(files,{local=new Map(),cloud=new Map(),search=''}={}){
 const elements=new Map(),redirects=[],events=new Map();let callback,offline=false;
 const element=()=>({innerHTML:'',textContent:'',hidden:false,dataset:{},classList:{toggle(){}},addEventListener(){},setAttribute(){},focus(){},scrollIntoView(){}});
 const document={getElementById(id){if(!elements.has(id))elements.set(id,element());return elements.get(id);},querySelector:s=>s==='dialog[open]'?null:element(),querySelectorAll:()=>[],addEventListener(){}};
 function ref(key){return {collection:name=>ref(key+'/'+name),doc:name=>ref(key+'/'+name),async get(){if(offline)throw Error('offline');return {exists:cloud.has(key),data:()=>structuredClone(cloud.get(key))};},async set(data,options){if(offline)throw Error('offline');cloud.set(key,{...(options?.merge?cloud.get(key):{}),...structuredClone(data)});},onSnapshot(fn){fn({exists:cloud.has(key),data:()=>cloud.get(key)});return ()=>{};}};}
 const db={collection:name=>ref(name)};
 const auth={onAuthStateChanged:fn=>callback=fn};
 const authFactory=Object.assign(()=>auth,{GoogleAuthProvider:class{setCustomParameters(){}},Auth:{Persistence:{LOCAL:'local'}}});
 const firestore=Object.assign(()=>db,{FieldValue:{serverTimestamp:()=>123}});
 const storage={getItem:key=>local.get(key)||null,setItem:(key,value)=>local.set(key,value)};
 const window={location:{search,replace:url=>redirects.push(url),assign:url=>redirects.push(url)},localStorage:storage,scrollTo(){},addEventListener:(event,fn)=>events.set(event,fn)};
 const context=vm.createContext({window,document,localStorage:storage,URLSearchParams,firebase:{initializeApp(){},auth:authFactory,firestore},lucide:{createIcons(){}},console:{error(){}},setTimeout:()=>1,clearTimeout(){}});
 window.firebase=context.firebase;
 for(const file of ['practice-bank.js','chapter-practice.js','study-mode.js',...files])vm.runInContext(fs.readFileSync(path.join(root,file),'utf8'),context);
 return {run:s=>vm.runInContext(s,context),signIn:u=>callback(u),cloud,local,elements,redirects,events,setOffline:value=>offline=value};
}
const appFiles=['courses.js','history-catalog.js','history-progress.js','app.js'];
const presentations=['historia-universal-capitulo-01-content.js','history-reading.js'];
const physics=n=>[`fisica-capitulo-0${n}-data.js`,`fisica-capitulo-0${n}.js`];
const history=n=>['history-catalog.js','history-progress.js',`historia-universal-capitulo-0${n}-data.js`,'history-chapter.js'];

async function test(){
 const local=new Map(),cloud=new Map(),home=harness(appFiles,{local,cloud});
 await home.signIn({uid:'student'});
 assert.match(home.elements.get('app').innerHTML,/¿Cómo quieres estudiar\?/);
 assert.doesNotMatch(home.elements.get('app').innerHTML,/class="course-card/);
 home.run('openCourse(16)');assert.equal(home.run('state.view'),'mode','Courses cannot open before the choice');
 home.run("selectStudyMode('free')");
 assert.equal(home.run('state.view'),'catalog');
 assert.match(home.elements.get('app').innerHTML,/class="course-card/);
 home.run('openCourse(16)');assert.equal(home.run('state.view'),'course');
 assert.doesNotMatch(home.elements.get('app').innerHTML,/onclick="showStudyModes\(\)"/);
 await home.run("window.StudyMode.save('student',db)");
 assert.equal(cloud.get('users/student/progress/navigation').studyMode,'free');
 const oldProgress={studyMode:'progressive',currentItem:0,completedItems:[0],examBest:7,updatedMs:100};
 for(let n=1;n<=2;n++)cloud.set(`users/student/progress/fisica-capitulo-0${n}`,structuredClone(oldProgress));
 for(let n=2;n<=6;n++)cloud.set(`users/student/progress/historia-universal-pdf-0${n}`,structuredClone(oldProgress));
 cloud.set('users/student/progress/historia-universal-presentacion-01',{studyMode:'progressive',completedItems:[0],currentSlide:0,updatedMs:100});
 for(const files of [physics(1),physics(2),...Array.from({length:5},(_,i)=>history(i+2)),presentations]){
  const chapter=harness(files,{local,cloud});await chapter.signIn({uid:'student'});
  assert.equal(chapter.run('P.studyMode'),'free','The chosen mode overrides a previous chapter mode');
  const chapterHTML=chapter.elements.get(files===presentations?'reading-app':'chapter-app').innerHTML;
  assert.doesNotMatch(chapterHTML,/id="study-mode"|data-action="mode"|Cambiar diapositiva|Pantalla completa/);
  assert.equal(chapter.run('P.completedItems.includes(0)'),true,'Existing achievements remain');
  if(files===presentations){assert.equal(chapter.run('allowedSlide(32)'),true);chapter.run('visit(32)');}
  else{assert.equal(chapter.run('canOpen(LESSONS.length-1)'),true);assert.equal(chapter.run('canApply()'),true);chapter.run("goTab('practice')");}
  home.run("window.StudyMode.choose('student','progressive')");
  chapter.events.get('storage')({key:'sin-limites:student:study-mode'});
  assert.equal(chapter.run('P.studyMode'),'progressive');
  assert.equal(chapter.run('P.completedItems.includes(0)'),true);
  if(files===presentations){assert.equal(chapter.run('allowedSlide(32)'),true);assert.equal(chapter.run('P.currentSlide'),32);}
  else{assert.equal(chapter.run('canApply()'),true);assert.equal(chapter.run('P.activeTab'),'practice');assert.equal(chapter.run('P.examBest'),7);}
  await chapter.run('saveChain');
  home.run("window.StudyMode.choose('student','free')");
 }
 // A direct link asks first, then resumes the requested chapter after the choice.
 const direct=harness(presentations);await direct.signIn({uid:'new'});
 assert.deepEqual(direct.redirects,['index.html?chapter=historia-universal-capitulo-01&v=20260917-practice6']);
 const entry=harness(appFiles,{search:'?chapter=historia-universal-capitulo-01'});await entry.signIn({uid:'new'});
 assert.equal(entry.redirects.length,0);assert.equal(entry.run('state.view'),'mode');
 entry.run("selectStudyMode('progressive')");assert.deepEqual(entry.redirects,['historia-universal-capitulo-01.html?v=20260917-practice6']);
 await entry.run("window.StudyMode.save('new',db)");
 const nextDevice=harness(physics(1),{cloud:entry.cloud});await nextDevice.signIn({uid:'new'});
 assert.equal(nextDevice.run('P.studyMode'),'progressive','Preference also loads on another device');
 assert.equal(nextDevice.run('canOpen(1)'),true);assert.equal(nextDevice.run("window.ChapterPractice.canOpen(CHAPTER_ID,P.practice10,1,P.studyMode)"),false);
 // Changing courses/account does not silently reuse another student's preference.
 await home.signIn({uid:'other'});assert.equal(home.run('state.studyMode'),null);
 assert.match(home.elements.get('app').innerHTML,/¿Cómo quieres estudiar\?/);
 home.setOffline(true);home.run("selectStudyMode('progressive')");
 assert.equal(home.run('state.view'),'catalog');
 const offline=harness(physics(2),{local});offline.setOffline(true);await offline.signIn({uid:'other'});
 assert.equal(offline.run('P.studyMode'),'progressive');assert.equal(offline.redirects.length,0);
 const back=harness(appFiles,{local,search:'?course=12'});back.setOffline(true);await back.signIn({uid:'other'});
 assert.equal(back.run('state.view'),'course');assert.equal(back.run('state.activeCourseId'),12);
 const forced=harness(appFiles,{local,search:'?course=12&mode=choose'});forced.setOffline(true);await forced.signIn({uid:'other'});
 assert.equal(forced.run('state.view'),'mode');forced.run("selectStudyMode('free')");assert.equal(forced.run('state.view'),'course');
 const slides=home.run('window.COURSES.length');assert.ok(slides>2);
 const check=harness(presentations);const visuals=JSON.parse(check.run('JSON.stringify(SLIDES.filter(s=>s.illustration).map(s=>s.illustration.src))'));
 assert.equal(visuals.length,8);assert.equal(new Set(visuals).size,8,'Each illustration is used once');
 assert.equal(check.run('QUESTIONS.length'),10);assert.equal(check.run('SLIDES.filter(s=>s.question).length'),0);
 console.log('PASS: mode before courses, all eight chapters inherit the choice, direct links, account isolation, offline use, cross-device preference, preserved scores and eight unique illustrations.');
}
module.exports={harness};
if(require.main===module)test().catch(error=>{console.error(error);process.exitCode=1});
