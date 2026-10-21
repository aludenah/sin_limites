const assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path');
const {harness}=require('./study-entry.test.cjs');
const root=path.join(__dirname,'..'),chapterId='fisica-capitulo-17';
const read=file=>fs.readFileSync(path.join(root,file),'utf8');
const plain=(h,expression)=>JSON.parse(h.run('JSON.stringify('+expression+')'));
const chapterFiles=['fisica-capitulo-17-practice.js','fisica-catalog.js','history-progress.js','fisica-capitulo-17-data.js','induction-engine.js','history-chapter.js'];
const catalogs=['history-catalog.js','peru-catalog.js','lenguaje-catalog.js','economia-catalog.js','educacion-civica-catalog.js','razonamiento-verbal-catalog.js','razonamiento-matematico-catalog.js','fisica-catalog.js','biologia-catalog.js','quimica-catalog.js','geometria-catalog.js'];
const homeFiles=['quimica-capitulo-18-practice.js','geometria-capitulo-17-practice.js','fisica-capitulo-17-practice.js','courses.js',...catalogs,'history-progress.js','app.js'];
const event=(h,detail={})=>h.events.get('induction-lab-progress')({detail:{experience:'induction-lab',...detail}});
const state={tab:'generator',position:.12,speed:.3,direction:-1,polarity:-1,turns:200,resistance:40,closed:false,angle:Math.PI/3,angularSpeed:6,completedChallenges:['still'],visitedTabs:['induction','generator'],observations:{moved:true,stopped:true,reversed:false,openEmf:false,generator:true}};

async function contentAndPractice(){
 const h=harness(chapterFiles);h.run("window.StudyMode.choose('physicist','progressive')");await h.signIn({uid:'physicist'});await h.run("window.StudyMode.save('physicist',db)");
 assert.equal(h.run('COURSE_ID'),16);assert.equal(h.run('CHAPTER_NUMBER'),17);assert.equal(h.run('CHAPTER_ID'),chapterId);assert.equal(h.run('CHAPTER_TOPIC_INDEX'),16);
 assert.equal(h.run('INDUCTION.id'),'induction-lab');assert.equal(h.run('LESSONS.length'),6);assert.equal(h.run("LESSONS.flatMap(l=>l.blocks).filter(b=>b.interactive==='induction-lab').length"),1);
 assert.match(h.elements.get('chapter-app').innerHTML,/#induction-lab/);
 const questions=plain(h,'window.ChapterPractice.questions(CHAPTER_ID)');assert.equal(questions.length,10);assert.equal(new Set(questions.map(q=>q.id)).size,10);assert.equal(new Set(questions.map(q=>q.prompt)).size,10);
 const counts=[0,0,0,0,0];for(const q of questions){assert.equal(q.options.length,5);assert.equal(new Set(q.options).size,5);assert.ok(Number.isInteger(q.answer)&&q.answer>=0&&q.answer<5);counts[q.answer]++;assert.ok(q.solution.length>35);}assert.deepEqual(counts,[2,2,2,2,2]);
 assert.equal(h.run(`window.ChapterPractice.choose(CHAPTER_ID,P.practice10,'${questions[1].id}',0,P.studyMode)`),false,'The second problem remains locked until the first is mastered');
 const first=questions[0];h.run(`window.ChapterPractice.choose(CHAPTER_ID,P.practice10,'${first.id}',${(first.answer+1)%5},P.studyMode);checkPractice('${first.id}')`);assert.equal(h.run('progressPercent()'),0);
 for(const q of questions)h.run(`window.ChapterPractice.choose(CHAPTER_ID,P.practice10,'${q.id}',${q.answer},P.studyMode);checkPractice('${q.id}')`);
 await h.run('persist()');const saved=h.cloud.get('users/physicist/progress/'+chapterId);assert.equal(saved.courseId,16);assert.equal(saved.chapterNumber,17);assert.equal(saved.practiceCompleted,10);assert.equal(saved.practiceTotal,10);assert.equal(saved.percent,100);assert.equal(saved.chapterCompleted,true);
 const reload=harness(chapterFiles,{cloud:h.cloud});await reload.signIn({uid:'physicist'});assert.equal(reload.run('P.practice10.mastered.length'),10);
 const free=harness(chapterFiles);free.run("window.StudyMode.choose('free-physicist','free')");await free.signIn({uid:'free-physicist'});assert.equal(free.run('window.ChapterPractice.canOpen(CHAPTER_ID,P.practice10,9,P.studyMode)'),true);
 const old=plain(h,"window.PHYSICS_CHAPTERS.find(c=>c.number===16)");assert.equal(old.progressId,'fisica-capitulo-15');assert.equal(old.topicIndex,15,'The preceding chapter keeps its stable legacy ID');
}

function assetReferences(){
 const html=read(chapterId+'.html');for(const filename of ['fisica-capitulo-17-practice.js','fisica-catalog.js','induction-engine.js','induction-lab.js','induction-lab.css'])assert.ok(html.includes(filename),'Chapter declares '+filename);
 assert.ok(html.indexOf('induction-engine.js')<html.indexOf('induction-lab.js'));assert.ok(html.indexOf('induction-lab.js')<html.indexOf('history-chapter.js'));
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
 const destination=chapterId+'.html?v=20261021-induction1#induction-lab';
 const guest=harness(chapterFiles);await guest.signIn(null);assert.ok(guest.elements.get('chapter-app').innerHTML.includes('index.html?chapter='+chapterId+'&v=20261021-induction1'));
 const first=harness(chapterFiles);await first.signIn({uid:'new-experimenter'});assert.equal(first.redirects.at(-1),'index.html?chapter='+chapterId+'&v=20261021-induction1');
 const picker=harness(homeFiles,{search:'?chapter='+chapterId});await picker.signIn({uid:'new-experimenter'});assert.equal(picker.run('state.view'),'mode');picker.run("selectStudyMode('progressive')");assert.equal(picker.redirects.at(-1),destination);
 picker.run('state.activeCourseId=16;setTopic(16)');assert.equal(picker.redirects.at(-1),destination);picker.run("navigationProgress={lastCourseId:16,lastModuleId:'fisica-capitulo-17',lastChapterNumber:17,lastTopicIndex:16};openProgressChapter()");assert.equal(picker.redirects.at(-1),destination);
 picker.run('openCourse(16);state.activeTopicIndex=16;render()');assert.match(picker.elements.get('app').innerHTML,/Electromagnetismo/);await picker.run("window.StudyMode.save('new-experimenter',db)");const returning=harness(homeFiles,{cloud:picker.cloud,search:'?chapter='+chapterId});await returning.signIn({uid:'new-experimenter'});assert.equal(returning.redirects.at(-1),destination);
 const admin=harness(['fisica-capitulo-17-practice.js',...catalogs,'history-progress.js','admin.js']);assert.ok(admin.run('TRACKED_CHAPTERS["'+chapterId+'"]'));assert.equal(admin.run('TRACKED_CHAPTERS["'+chapterId+'"].items'),10);
}

(async()=>{await contentAndPractice();await labPersistence();progressSanitization();await navigationAndTeacher();assetReferences();console.log('PASS: Physics 17 content, ten-question grading, progressive/free modes, lab persistence and offline merge, sanitization, account isolation, catalog routing and teacher tracking.');})().catch(error=>{console.error(error);process.exitCode=1;});
