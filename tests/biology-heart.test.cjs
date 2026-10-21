const assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const {harness}=require('./study-entry.test.cjs');
const root=path.join(__dirname,'..'),id='biologia-capitulo-11';
const files=['biologia-capitulo-11-practice.js','biologia-catalog.js','history-progress.js','biologia-capitulo-11-data.js','history-chapter.js'];
async function test(){
 const cloud=new Map(),local=new Map(),h=harness(files,{cloud,local});
 h.run("window.StudyMode.choose('bio-student','progressive')");
 await h.signIn({uid:'bio-student'});await h.run("window.StudyMode.save('bio-student',db)");
 assert.equal(h.run('COURSE_ID'),18);assert.equal(h.run('CHAPTER_NUMBER'),11);
 assert.equal(h.run('LESSONS.length'),6);assert.equal(h.run('COURSE_CHAPTERS.length'),1);
 const qs=JSON.parse(h.run('JSON.stringify(window.ChapterPractice.questions(CHAPTER_ID))'));
 assert.equal(qs.length,10);assert.equal(new Set(qs.map(q=>q.id)).size,10);
 for(const q of qs){assert.equal(q.options.length,5);assert.equal(new Set(q.options).size,5);assert.ok(q.options[q.answer]);assert.ok(q.solution.length>30);}
 assert.equal(h.run("window.ChapterPractice.choose(CHAPTER_ID,P.practice10,'bio11-p02',0,P.studyMode)"),false);
 for(const q of qs){h.run(`window.ChapterPractice.choose(CHAPTER_ID,P.practice10,'${q.id}',${q.answer},P.studyMode);checkPractice('${q.id}')`);}
 await h.run('persist()');
 const record=cloud.get('users/bio-student/progress/'+id);
 assert.equal(record.percent,100);assert.equal(record.chapterCompleted,true);assert.equal(record.courseId,18);assert.equal(record.chapterNumber,11);
 h.events.get('biology-heart-progress')({detail:{visitedParts:['aortic-arch','right-atrium'],routeStep:5,routeComplete:true,view:'internal',visitedSteps:[0,1,2,3,4,5],selectedPart:'right-atrium',tab:'route'}});
 await h.run('persist()');
 assert.deepEqual(cloud.get('users/bio-student/progress/'+id).heartExploration.visitedParts,['aortic-arch','right-atrium']);
 assert.equal(cloud.get('users/bio-student/progress/'+id).heartExploration.routeComplete,true);
 const fresh=harness(files,{cloud});await fresh.signIn({uid:'bio-student'});
 assert.equal(fresh.run('P.practice10.mastered.length'),10);
 assert.equal(fresh.run('P.heartExploration.routeStep'),5);
 assert.equal(fresh.run('P.heartExploration.view'),'internal');assert.equal(fresh.run('P.heartExploration.visitedSteps.length'),6);assert.equal(fresh.run('P.heartExploration.selectedPart'),'right-atrium');
 fresh.run("window.StudyMode.choose('second','free')");await fresh.signIn({uid:'second'});
 assert.equal(fresh.run('P.practice10.mastered.length'),0);assert.equal(fresh.run('P.heartExploration?.visitedParts?.length||0'),0);
 assert.equal(fresh.run("window.ChapterPractice.canOpen(CHAPTER_ID,P.practice10,9,P.studyMode)"),true);
 const homeFiles=['courses.js','history-catalog.js','peru-catalog.js','lenguaje-catalog.js','economia-catalog.js','educacion-civica-catalog.js','razonamiento-verbal-catalog.js','razonamiento-matematico-catalog.js','fisica-catalog.js','biologia-catalog.js','biologia-capitulo-11-practice.js','history-progress.js','app.js'];
 const home=harness(homeFiles,{search:'?chapter='+id});await home.signIn({uid:'entry'});
 home.run("selectStudyMode('free')");assert.match(home.redirects.at(-1),/biologia-capitulo-11\.html/);
 home.run('openCourse(18)');assert.equal(home.run('state.activeTopicIndex'),10);
 assert.match(home.elements.get('app').innerHTML,/Explorar el corazón 3D/);
 home.run('setTopic(10)');assert.match(home.redirects.at(-1),/biologia-capitulo-11\.html/);
 const context={window:{}};for(const f of homeFiles.filter(f=>f.endsWith('catalog.js')))vm.runInNewContext(fs.readFileSync(path.join(root,f),'utf8'),context);
 const admin=fs.readFileSync(path.join(root,'admin.js'),'utf8');vm.runInNewContext(admin.slice(admin.indexOf('const TRACKED_CHAPTERS='),admin.indexOf('let selectedChapter='))+';window.tracked=TRACKED_CHAPTERS;',context);
 assert.equal(context.window.tracked[id].items,10);assert.match(context.window.tracked[id].label,/Biología · Capítulo 11/);
 const model=fs.readFileSync(path.join(root,'assets/biologia-corazon.glb'));
 assert.equal(model.readUInt32LE(0),0x46546c67);assert.equal(model.readUInt32LE(8),model.length);
 const gltf=JSON.parse(model.subarray(20,20+model.readUInt32LE(12)).toString());
 assert.equal(gltf.meshes.length,11);assert.equal(gltf.animations?.length||0,0);
 for(const name of ['right-atrium','left-atrium','right-ventricle','left-ventricle','ventricular-wall'])assert.ok(gltf.nodes.some(n=>n.name===name));
 console.log('PASS: Biología 11 navigation, 10 questions, progressive/free modes, grading, cloud round-trip, heart exploration, account isolation, teacher tracking and anatomical GLB integrity.');
}
test().catch(e=>{console.error(e);process.exitCode=1;});
