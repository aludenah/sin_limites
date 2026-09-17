const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const {harness}=require('./study-entry.test.cjs');
const root=path.join(__dirname,'..'),files=['courses.js','history-catalog.js','peru-catalog.js','lenguaje-catalog.js','economia-catalog.js','educacion-civica-catalog.js','history-progress.js','app.js'];
const chapterFiles=n=>['peru-catalog.js','history-progress.js',`historia-del-peru-capitulo-0${n}-data.js`,'history-chapter.js'];
async function test(){
 const h=harness(files),run=h.run;await h.signIn({uid:'student'});
 assert.equal(run('state.view'),'mode');run('openCourse(11)');assert.equal(run('state.view'),'mode');
 run("selectStudyMode('free');openCourse(11)");
 assert.equal(run('state.activeCourseId'),11);assert.equal(run('COURSES.find(c=>c.id===11).topics.length'),35);
 assert.equal(run('window.PERU_CHAPTERS.length'),6);
 assert.equal(run('JSON.stringify(COURSES.find(c=>c.id===11).topics)'),run('JSON.stringify(window.PERU_SYLLABUS.map(c=>c.title))'));
 assert.match(h.elements.get('app').innerHTML,/Historia del Perú: 35 capítulos; contenido desarrollado del 1 al 6/);
 assert.doesNotMatch(h.elements.get('app').innerHTML,/onclick="showStudyModes/);
 for(let n=1;n<=6;n++){run('setTopic('+(n-1)+')');assert.equal(h.redirects.at(-1),`historia-del-peru-capitulo-0${n}.html?v=20260918-social1`);}
 run('setTopic(6)');assert.equal(run('state.activeTopicIndex'),6);assert.match(h.elements.get('app').innerHTML,/Imperio Wari/);assert.match(h.elements.get('app').innerHTML,/Estructura académica creada/);
 assert.equal(run("restoredTopicIndex(COURSES.find(c=>c.id===11),2,'Periodo formativo',3)"),4);
 assert.equal(run("restoredTopicIndex(COURSES.find(c=>c.id===11),23,'Fujimorato',3)"),30);
 assert.equal(run("restoredTopicIndex(COURSES.find(c=>c.id===11),4,'Formativo andino',4)"),4);
 const c=harness(chapterFiles(3),{local:h.local,cloud:h.cloud});await c.signIn({uid:'student'});
 c.run("goLesson(4);window.ChapterPractice.choose(CHAPTER_ID,P.practice10,'p01',window.ChapterPractice.questions(CHAPTER_ID)[0].answer,P.studyMode);checkPractice('p01')");await c.run('persist()');
 assert.equal(c.cloud.get('users/student/progress/navigation').lastCourseId,11);
 assert.equal(c.cloud.get('users/student/progress/navigation').catalogVersion,6);
 assert.equal(c.cloud.get('users/student/progress/historia-del-peru-capitulo-03').readingItem,4);
 const reload=harness(chapterFiles(3),{local:h.local,cloud:h.cloud});await reload.signIn({uid:'student'});assert.equal(reload.run('P.readingItem'),4);
 const home=harness(files,{local:h.local,cloud:h.cloud});await home.signIn({uid:'student'});
 assert.equal(home.run('peruChapterProgress(3).percent'),10);assert.equal(home.run('historyChapterProgress(3).percent'),0,'Courses do not share academic progress');
 assert.match(home.run('renderProgressPanel()'),/Historia del Perú · Capítulo 3/);home.run('openProgressChapter()');assert.equal(home.redirects.at(-1),'historia-del-peru-capitulo-03.html?v=20260918-social1');
 await home.signIn({uid:'other'});assert.equal(home.run('peruChapterProgress(3).percent'),0,'Account isolation in the catalog');
 for(let n=1;n<=6;n++){
  const direct=harness(chapterFiles(n));await direct.signIn({uid:'new'});
  assert.deepEqual(direct.redirects,[`index.html?chapter=historia-del-peru-capitulo-0${n}&v=20260918-social1`]);
  const entry=harness(files,{search:`?chapter=historia-del-peru-capitulo-0${n}`});await entry.signIn({uid:'new'});assert.equal(entry.run('state.view'),'mode');entry.run("selectStudyMode('progressive')");assert.equal(entry.redirects.at(-1),`historia-del-peru-capitulo-0${n}.html?v=20260918-social1`);
  const content=harness(chapterFiles(n));content.run("window.StudyMode.choose('student','free')");await content.signIn({uid:'student'});
  const links=content.run('chapterLinks()');assert.doesNotMatch(links,/capitulo-00|capitulo-07|historia-universal/);
 }
 const ctx={window:{}};for(const f of ['peru-catalog.js','history-catalog.js','lenguaje-catalog.js','economia-catalog.js','educacion-civica-catalog.js'])vm.runInNewContext(fs.readFileSync(path.join(root,f),'utf8'),ctx);
 const admin=fs.readFileSync(path.join(root,'admin.js'),'utf8');const declaration=admin.slice(admin.indexOf('const TRACKED_CHAPTERS='),admin.indexOf("let selectedChapter="));vm.runInNewContext(declaration+';window.tracked=TRACKED_CHAPTERS;',ctx);
 assert.equal(Object.keys(ctx.window.tracked).length,32);for(let n=1;n<=6;n++)assert.equal(ctx.window.tracked[`historia-del-peru-capitulo-0${n}`].items,10);
 const images=new Set();for(let n=1;n<=6;n++){vm.runInNewContext(fs.readFileSync(path.join(root,`historia-del-peru-capitulo-0${n}-data.js`),'utf8'),ctx);const c=ctx.window.HISTORY_CONTENT;for(const b of c.lessons.flatMap(l=>l.blocks)){if(!b.illustration)continue;assert.ok(!images.has(b.illustration.src),'Each image used once');images.add(b.illustration.src);assert.ok(fs.existsSync(path.join(root,b.illustration.src)));}}
 assert.equal(images.size,18);
 console.log('PASS: Peru PDF syllabus, six chapter routes, mode choice, catalog migration, reading resume, isolated course progress, account switching, teacher tracking and 18 unique images.');
}
test().catch(e=>{console.error(e);process.exitCode=1});
