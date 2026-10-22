const assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path');
const {harness}=require('./study-entry.test.cjs');
const root=path.join(__dirname,'..'),chapterId='fisica-capitulo-17';
const read=file=>fs.readFileSync(path.join(root,file),'utf8');
const plain=(h,expression)=>JSON.parse(h.run('JSON.stringify('+expression+')'));
const chapterFiles=['fisica-capitulo-17-practice.js','fisica-catalog.js','history-progress.js','fisica-capitulo-17-data.js','induction-engine.js','fisica-capitulo-17.js'];
const catalogs=['history-catalog.js','peru-catalog.js','lenguaje-catalog.js','economia-catalog.js','educacion-civica-catalog.js','razonamiento-verbal-catalog.js','razonamiento-matematico-catalog.js','fisica-catalog.js','biologia-catalog.js','quimica-catalog.js','geometria-catalog.js'];
const homeFiles=['quimica-capitulo-18-practice.js','geometria-capitulo-17-practice.js','fisica-capitulo-17-practice.js','courses.js',...catalogs,'history-progress.js','app.js'];
const event=(h,detail={})=>h.events.get('induction-lab-progress')({detail:{experience:'induction-lab',...detail}});
const state={tab:'generator',position:.12,speed:.3,direction:-1,polarity:-1,turns:200,resistance:40,closed:false,angle:Math.PI/3,angularSpeed:6,completedChallenges:['still'],visitedTabs:['induction','generator'],observations:{moved:true,stopped:true,reversed:false,openEmf:false,generator:true}};

async function contentAndPractice(){
 const h=harness(chapterFiles);h.run("window.StudyMode.choose('physicist','progressive')");await h.signIn({uid:'physicist'});await h.run("window.StudyMode.save('physicist',db)");
 assert.equal(h.run('cloudPayload().courseId'),16);assert.equal(h.run('cloudPayload().chapterNumber'),17);assert.equal(h.run('CHAPTER_ID'),chapterId);assert.equal(h.run('cloudPayload().topicIndex'),16);
 assert.equal(h.run('INDUCTION.id'),'induction-lab');assert.equal(h.run('LESSONS.length'),13);assert.equal(h.run("LESSONS.filter(l=>l.body.includes('<div data-induction-lab></div>')).length"),1);
 assert.equal(h.run("LESSONS.filter(l=>l.body.includes('<div data-wire-field-lab></div>')).length"),1);
 assert.match(h.elements.get('chapter-app').innerHTML,/data-value="induction-lab"/);
 h.run("goTab('practice')");
 const questions=plain(h,'window.ChapterPractice.questions(CHAPTER_ID)');assert.equal(questions.length,10);assert.equal(new Set(questions.map(q=>q.id)).size,10);assert.equal(new Set(questions.map(q=>q.prompt)).size,10);
 for(const q of questions){assert.equal(q.options.length,5);assert.equal(new Set(q.options).size,5);assert.ok(Number.isInteger(q.answer)&&q.answer>=0&&q.answer<5);assert.ok(q.solution.length>35);}assert.deepEqual(questions.map(q=>q.answer),[2,3,0,2,3,1,4,1,3,1],'Answer key follows chapter XVIII of the supplied material');
 assert.equal(h.run(`window.ChapterPractice.choose(CHAPTER_ID,P.practice10,'${questions[1].id}',0,P.studyMode)`),false,'The second problem remains locked until the first is mastered');
 const first=questions[0];h.run(`window.ChapterPractice.choose(CHAPTER_ID,P.practice10,'${first.id}',${(first.answer+1)%5},P.studyMode);checkPractice('${first.id}')`);assert.equal(h.run('progressPercent()'),0);
 for(const q of questions)h.run(`window.ChapterPractice.choose(CHAPTER_ID,P.practice10,'${q.id}',${q.answer},P.studyMode);checkPractice('${q.id}')`);
 await h.run('persist()');const saved=h.cloud.get('users/physicist/progress/'+chapterId);assert.equal(saved.courseId,16);assert.equal(saved.chapterNumber,17);assert.equal(saved.practiceCompleted,10);assert.equal(saved.practiceTotal,10);assert.equal(saved.percent,100);assert.equal(saved.chapterCompleted,true);
 const reload=harness(chapterFiles,{cloud:h.cloud});await reload.signIn({uid:'physicist'});assert.equal(reload.run('P.practice10.mastered.length'),10);
 const free=harness(chapterFiles);free.run("window.StudyMode.choose('free-physicist','free')");await free.signIn({uid:'free-physicist'});assert.equal(free.run('window.ChapterPractice.canOpen(CHAPTER_ID,P.practice10,9,P.studyMode)'),true);
 const old=plain(h,"window.PHYSICS_CHAPTERS.find(c=>c.number===16)");assert.equal(old.progressId,'fisica-capitulo-15');assert.equal(old.topicIndex,15,'The preceding chapter keeps its stable legacy ID');
}

function assetReferences(){
 for(const file of fs.readdirSync(root).filter(name=>name.endsWith('.html'))){
  assert.ok(read(file).includes('activity-fullscreen.js'),'Shared fullscreen declared in '+file);
  assert.ok(read(file).includes('activity-fullscreen.css'),'Shared fullscreen style declared in '+file);
 }
 const html=read(chapterId+'.html');for(const filename of ['fisica-capitulo-17-practice.js','fisica-capitulo-17.js','fisica-capitulo-01.css','wire-field-engine.js','wire-field-lab.js','wire-field-lab.css','induction-engine.js','induction-lab.js','induction-lab.css'])assert.ok(html.includes(filename),'Chapter declares '+filename);
 assert.ok(html.indexOf('induction-engine.js')<html.indexOf('induction-lab.js'));assert.ok(html.indexOf('induction-lab.js')<html.indexOf('fisica-capitulo-17.js'));
 for(const match of html.matchAll(/(?:src|href)="([^"#?]+)(?:\?[^"#]*)?(?:#[^"]*)?"/g)){const file=match[1];if(!/^https?:/.test(file))assert.ok(fs.existsSync(path.join(root,file)),'Local chapter reference exists: '+file);}
 for(const file of ['index.html','admin.html']){assert.ok(read(file).includes('fisica-capitulo-17-practice.js'));assert.ok(read(file).indexOf('fisica-capitulo-17-practice.js')<read(file).indexOf('chapter-practice.js'));}
}

async function labPersistence(){
 const local=new Map(),cloud=new Map(),h=harness(chapterFiles,{local,cloud});h.run("window.StudyMode.choose('experimenter','free')");await h.signIn({uid:'experimenter'});await h.run("window.StudyMode.save('experimenter',db)");
 event(h,state);await h.run('persist()');let saved=cloud.get('users/experimenter/progress/'+chapterId);
 assert.deepEqual(saved.inductionLab.completedChallenges,['still']);assert.deepEqual(saved.inductionLab.visitedTabs,['induction','generator']);
 for(const key of ['tab','position','speed','direction','polarity','turns','resistance','closed','angle','angularSpeed'])assert.equal(saved.inductionLab[key],state[key]);
 assert.deepEqual(saved.inductionLab.observations,state.observations);assert.equal(saved.percent,0,'Lab missions cannot increase the academic practice grade');assert.equal(saved.chapterCompleted,false);
 const before=JSON.stringify(saved.inductionLab);event(h,{experience:'a-different-lab',completedChallenges:['open']});await h.run('persist()');assert.equal(JSON.stringify(cloud.get('users/experimenter/progress/'+chapterId).inductionLab),before);
 const reload=harness(chapterFiles,{cloud});await reload.signIn({uid:'experimenter'});assert.deepEqual(plain(reload,'P.inductionLab.completedChallenges'),['still']);
 reload.run("window.ChapterInteractions={render:()=>'',unmount(){},mount:(root,options)=>{window.restoredInduction=options.saved;}};render()");assert.equal(reload.run('window.restoredInduction.turns'),200);assert.equal(reload.run('window.restoredInduction.closed'),false);assert.equal(reload.run('window.restoredInduction.observations.generator'),true);
 h.setOffline(true);event(h,{...state,tab:'missions',turns:250,completedChallenges:['reverse'],visitedTabs:['missions'],observations:{moved:true,stopped:false,reversed:true,openEmf:false,generator:false}});await h.run('persist()');assert.equal(h.run('cloudReady'),false);assert.equal(JSON.parse(local.get('sin-limites:experimenter:'+chapterId)).pending,true);
 saved=cloud.get('users/experimenter/progress/'+chapterId);cloud.set('users/experimenter/progress/'+chapterId,{...saved,inductionLab:{...saved.inductionLab,completedChallenges:['still','open'],visitedTabs:['generator'],observations:{moved:true,stopped:true,reversed:false,openEmf:true,generator:true},updatedMs:1}});
 h.setOffline(false);await h.run('retrySync()');const merged=cloud.get('users/experimenter/progress/'+chapterId).inductionLab;
 assert.deepEqual(new Set(merged.completedChallenges),new Set(['still','reverse','open']));assert.deepEqual(new Set(merged.visitedTabs),new Set(['induction','generator','missions']));assert.equal(merged.turns,250);assert.deepEqual(merged.observations,{moved:true,stopped:true,reversed:true,openEmf:true,generator:true});assert.equal(JSON.parse(local.get('sin-limites:experimenter:'+chapterId)).pending,false);
 h.run("window.StudyMode.choose('another-experimenter','free')");await h.signIn({uid:'another-experimenter'});assert.equal(h.run('P.inductionLab.completedChallenges.length'),0);assert.equal(h.run('P.inductionLab.observations.moved'),false);assert.equal(cloud.get('users/experimenter/progress/'+chapterId).inductionLab.turns,250);
 const other=harness(['quimica-capitulo-18-practice.js','quimica-catalog.js','history-progress.js','quimica-capitulo-18-data.js','history-chapter.js'],{local,cloud});await other.signIn({uid:'experimenter'});event(other,state);await other.run('persist()');assert.equal(cloud.get('users/experimenter/progress/quimica-capitulo-18').inductionLab,undefined,'Lab events cannot enter another course');
 await h.signIn(null);const count=cloud.size;event(h,state);await h.run('persist()');assert.equal(cloud.size,count,'Signed-out visitors cannot write laboratory records');
}

function progressSanitization(){
 const h=harness(chapterFiles);assert.doesNotThrow(()=>h.run('mergeInduction(null,null)'));
 const result=plain(h,"inductionProgress({tab:'<bad>',position:Infinity,speed:NaN,direction:0,polarity:'-1',turns:9999,resistance:-9,closed:'false',angle:Infinity,angularSpeed:0,completedChallenges:['still','still','foreign'],visitedTabs:['missions','foreign'],observations:{moved:'true',stopped:true,reversed:1,openEmf:false,generator:true},updatedMs:Infinity})");
 assert.equal(result.tab,'induction');assert.ok(Number.isFinite(result.position)&&result.position>=-.25&&result.position<=.25);assert.ok(Number.isFinite(result.speed)&&result.speed>=.1&&result.speed<=.5);assert.ok([1,-1].includes(result.direction));assert.ok([1,-1].includes(result.polarity));assert.ok(Number.isInteger(result.turns)&&result.turns>=50&&result.turns<=300);assert.ok(result.resistance>=10&&result.resistance<=100);assert.equal(result.closed,true);assert.ok(Number.isFinite(result.angle));assert.ok(result.angularSpeed>=1&&result.angularSpeed<=12);assert.equal(result.updatedMs,0);assert.deepEqual(result.completedChallenges,['still']);assert.deepEqual(result.visitedTabs,['missions']);assert.deepEqual(result.observations,{moved:false,stopped:true,reversed:false,openEmf:false,generator:true});
 const nulls=plain(h,'inductionProgress({observations:null})');assert.equal(Object.values(nulls.observations).every(value=>value===false),true);
 const latest=plain(h,"mergeInduction({turns:100,completedChallenges:['still'],visitedTabs:['induction'],observations:{moved:true},updatedMs:100},{turns:300,completedChallenges:['open'],visitedTabs:['generator'],observations:{openEmf:true},updatedMs:200})");assert.equal(latest.turns,300);assert.deepEqual(new Set(latest.completedChallenges),new Set(['still','open']));assert.deepEqual(new Set(latest.visitedTabs),new Set(['induction','generator']));assert.equal(latest.observations.moved,true);assert.equal(latest.observations.openEmf,true);
}

async function navigationAndTeacher(){
 const destination=chapterId+'.html?v=20261021-em-pdf3';
 const guest=harness(chapterFiles);await guest.signIn(null);assert.ok(guest.elements.get('chapter-app').innerHTML.includes('index.html?chapter='+chapterId));
 const first=harness(chapterFiles);await first.signIn({uid:'new-experimenter'});assert.match(first.redirects.at(-1),new RegExp('^index\\.html\\?chapter='+chapterId+'(?:&v=[a-zA-Z0-9-]+)?$'));
 const picker=harness(homeFiles,{search:'?chapter='+chapterId});await picker.signIn({uid:'new-experimenter'});assert.equal(picker.run('state.view'),'mode');picker.run("selectStudyMode('progressive')");assert.equal(picker.redirects.at(-1),destination);
 picker.run('state.activeCourseId=16;setTopic(16)');assert.equal(picker.redirects.at(-1),destination);picker.run("navigationProgress={lastCourseId:16,lastModuleId:'fisica-capitulo-17',lastChapterNumber:17,lastTopicIndex:16};openProgressChapter()");assert.equal(picker.redirects.at(-1),destination);
 picker.run('openCourse(16);state.activeTopicIndex=16;render()');assert.match(picker.elements.get('app').innerHTML,/Electromagnetismo/);assert.equal(picker.run('studyChapterHref(\"fisica-capitulo-17\")'),destination);assert.ok(!destination.includes('#'),'Chapter entry begins with the chapter-one theory layout');assert.match(picker.run('inductionLabCard()'),/fisica-capitulo-17\.html\?v=[^\"]*#induction-lab/,'The explicit induction card still opens its lab');assert.equal(picker.run('PHYSICS_CHAPTERS.find(c=>c.number===17).items'),13);await picker.run("window.StudyMode.save('new-experimenter',db)");const returning=harness(homeFiles,{cloud:picker.cloud,search:'?chapter='+chapterId});await returning.signIn({uid:'new-experimenter'});assert.equal(returning.redirects.at(-1),destination);
 const admin=harness(['fisica-capitulo-17-practice.js',...catalogs,'history-progress.js','admin.js']);assert.ok(admin.run('TRACKED_CHAPTERS["'+chapterId+'"]'));assert.equal(admin.run('TRACKED_CHAPTERS["'+chapterId+'"].items'),10);
}


function chapterOneTemplate(){
 const h=harness(chapterFiles);
 const content=plain(h,'CONTENT');
 assert.equal(content.title,'Electromagnetismo');
 assert.equal(content.workedExamples.length,10);
 const ordered=['magnetismo-imanes','campo-magnetico','experimento-oersted','laboratorio-conductor','biot-savart','fuerzas-magneticas','fuerza-conductores','movimiento-particula','induccion-electromagnetica','flujo-magnetico','flujo-faraday','ley-lenz','generador'];
 assert.deepEqual(content.lessons.map(l=>l.id),ordered,'Theory follows the supplied material in order');
 for(const lesson of content.lessons){assert.ok(Array.isArray(lesson.sourcePages)&&lesson.sourcePages.length>0);assert.ok(lesson.sourcePages.every(n=>Number.isInteger(n)&&n>=1&&n<=16));}
 assert.doesNotMatch(content.lessons.map(l=>l.body).join(' '),/dominios magn[eé]ticos|integral vectorial|OpenStax/i,'Theory contains no supplemental external topics');
 assert.deepEqual(content.workedExamples.map(e=>e.number),Array.from({length:10},(_,i)=>i+1));
 assert.equal(content.source.filename,'electromagnetismo.pdf');
 assert.deepEqual(content.source.theoryPages,Array.from({length:16},(_,i)=>i+1));
 assert.deepEqual(content.source.workedPages,[17,18,19,20,21]);
 assert.deepEqual(content.source.proposedPages,[22,23]);assert.equal(content.source.answerKeyPage,24);
 for(const [i,e] of content.workedExamples.entries()){
  assert.ok(e.question.length>20&&e.steps.length>=3);
  assert.equal(e.sourceKind,i<8?'problema-resuelto':'ejemplo-teoria');
  assert.equal(e.sourceProblem,i<8?i+1:1);
  assert.ok(e.sourcePages.every(n=>i<8?n>=17&&n<=21:[5,10].includes(n)));
  assert.ok(e.figure,'Worked problem '+e.number+' preserves its source diagram');
  assert.ok(fs.existsSync(path.join(root,e.figure.src)),'Worked diagram exists: '+e.figure.src);
  assert.ok(e.figure.alt.length>20&&e.figure.caption.length>10);
  assert.ok(e.figure.width>0&&e.figure.height>0);
  assert.doesNotMatch(e.question,/<figure|<img/,'Question text keeps its diagram in structured figure data');
 }
 assert.deepEqual(content.workedExamples.slice(8).map(e=>e.sourcePages),[[5],[10]],'Two extra solved items are already worked theoretical examples in the material');
 const html=read(chapterId+'.html');
 assert.match(html,/href="fisica-capitulo-01\.css\?/,'Uses the same base style sheet as Análisis dimensional');
 assert.doesNotMatch(html,/href="history-(reading|chapter)\.css/);
 assert.ok(!html.includes('src="history-chapter.js'),'Uses its subject-specific chapter-one renderer');
 const source=read(chapterId+'.js');
 for(const label of ['Teoría','Resueltos · ','Práctica · 10 problemas'])assert.ok(source.includes(label));
 for(const className of ['class="layout"','class="card sidebar"','class="workspace"','class="card tabs"','class="card article"'])assert.ok(source.includes(className));
 const legacy=['generador','campo-magnetico','fuerzas-magneticas','flujo-faraday','ley-lenz','generador'];
 legacy.forEach((expected,i)=>{
  assert.equal(h.run(`LESSONS[normalized({contentVersion:1,currentItem:${i}}).currentItem].id`),expected,'Legacy theory bookmark '+i);
  assert.equal(h.run(`LESSONS[normalized({contentVersion:1,readingItem:${i}}).readingItem].id`),expected,'Legacy reading bookmark '+i);
 });
 assert.equal(h.run("normalized({activeTab:'exam'}).activeTab"),'practice');
 const version2=['magnetismo-imanes','campo-magnetico','experimento-oersted','biot-savart','laboratorio-conductor','fuerzas-magneticas','flujo-faraday','ley-lenz','generador'];
 version2.forEach((expected,i)=>{
  assert.equal(h.run(`LESSONS[normalized({contentVersion:2,currentItem:${i}}).currentItem].id`),expected,'Previous nine-topic bookmark '+i);
  assert.equal(h.run(`LESSONS[normalized({contentVersion:2,readingItem:${i}}).readingItem].id`),expected,'Previous nine-topic reading bookmark '+i);
 });
 assert.equal(h.run("normalized({contentVersion:3,currentItem:4}).currentItem"),4);
 assert.equal(h.run("normalized({contentVersion:3,currentItem:999}).currentItem"),content.lessons.length-1);
 assert.equal(h.run("normalized({contentVersion:1,currentItem:-20}).currentItem"),0);
}

async function workedAndProposedViews(){
 const h=harness(chapterFiles);h.run("window.StudyMode.choose('reader','free')");await h.signIn({uid:'reader'});
 h.run("goTab('examples')");let html=h.elements.get('chapter-app').innerHTML;
 assert.equal((html.match(/class="example worked-example"/g)||[]).length,10);
 assert.equal((html.match(/Ver solución paso a paso/g)||[]).length,10);
 const workedSections=[...html.matchAll(/<section class="example worked-example"[^>]*>([\s\S]*?)<\/section>/g)];
 assert.equal(workedSections.length,10);
 workedSections.forEach(([,section],i)=>{
  assert.equal((section.match(/<img\b/g)||[]).length,1,'One source diagram per worked problem');
  assert.equal((section.match(/data-action="math-figure"/g)||[]).length,1,'One functioning diagram enlargement control per worked problem');
  assert.ok(section.includes('data-id="worked:'+(i+1)+'"'));
 });
 assert.match(html,/Resueltos · 10/);assert.match(html,/Práctica · 10 problemas/);
 h.run("goTab('practice')");html=h.elements.get('chapter-app').innerHTML;
 assert.equal((html.match(/class="practice-card"/g)||[]).length,10);
 assert.equal((html.match(/Comprobar respuesta/g)||[]).length,10);
 assert.equal((html.match(/type="radio"/g)||[]).length,50);
 h.run("openLab('wire-field-lab')");assert.equal(h.run('LESSONS[P.currentItem].id'),'laboratorio-conductor');assert.equal(h.run('P.activeTab'),'theory');
 h.run("openLab('induction-lab')");assert.equal(h.run('LESSONS[P.currentItem].id'),'generador');
 h.run("window.location.hash='#wire-field-lab';applyAnchor()");assert.equal(h.run('LESSONS[P.currentItem].id'),'laboratorio-conductor');
}

async function previousPracticeMastery(){
 const cloud=new Map(),local=new Map(),key='users/returning/progress/'+chapterId;
 const legacyIds=Array.from({length:10},(_,i)=>'fis17-p'+String(i+1).padStart(2,'0'));
 cloud.set(key,{contentVersion:1,currentItem:2,updatedMs:10,practice10:{version:1,mastered:legacyIds,answers:{},results:{},attempts:{}}});
 const h=harness(chapterFiles,{cloud,local});h.run("window.StudyMode.choose('returning','free')");await h.signIn({uid:'returning'});
 assert.equal(h.run('P.practice10.mastered.length'),0,'Old answers cannot be credited to the ten replacement questions from the material');
 assert.deepEqual(plain(h,'P.practiceArchive.beforeSourcePDF.mastered'),legacyIds,'All prior achievements are retained in the pre-source archive');
 assert.deepEqual(cloud.get(key).practiceArchive.beforeSourcePDF.mastered,legacyIds,'The pre-source archive is persisted with the new bank');
 assert.equal(h.run('LESSONS[P.currentItem].id'),'fuerzas-magneticas');
 assert.equal(h.run('progressPercent()'),0);
 h.run("goTab('practice');window.ChapterPractice.choose(CHAPTER_ID,P.practice10,'fis17-pdf-p01',2,P.studyMode);checkPractice('fis17-pdf-p01')");await h.run('persist()');
 assert.equal(h.run('P.practice10.mastered.length'),1);
 // A stale remote snapshot cannot erase local practice mastery during retry synchronization.
 h.setOffline(true);h.run("window.ChapterPractice.choose(CHAPTER_ID,P.practice10,'fis17-pdf-p02',3,P.studyMode);checkPractice('fis17-pdf-p02')");await h.run('persist()');
 const localProgress=JSON.parse(local.get('sin-limites:returning:'+chapterId));assert.equal(localProgress.pending,true);
 cloud.set(key,{...cloud.get(key),updatedMs:1,practice10:{version:1,mastered:['fis17-p03'],answers:{},results:{},attempts:{}}});
 h.setOffline(false);await h.run('retrySync()');
 assert.equal(h.run('P.practice10.mastered.length'),2,'Local correct answers to the material survive an older remote version');
 assert.equal(cloud.get(key).practiceCompleted,2);assert.equal(JSON.parse(local.get('sin-limites:returning:'+chapterId)).pending,false);
 assert.deepEqual(plain(h,'P.practiceArchive.beforeSourcePDF.mastered'),legacyIds,'An older remote version cannot erase the original achievement archive');
}

(async()=>{chapterOneTemplate();await workedAndProposedViews();await previousPracticeMastery();await contentAndPractice();await labPersistence();progressSanitization();await navigationAndTeacher();assetReferences();console.log('PASS: Physics 17 content, ten-question grading, progressive/free modes, lab persistence and offline merge, sanitization, account isolation, catalog routing and teacher tracking.');})().catch(error=>{console.error(error);process.exitCode=1;});
