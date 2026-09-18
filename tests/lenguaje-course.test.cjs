const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const {harness}=require('./study-entry.test.cjs');
const root=path.join(__dirname,'..');
const files=['courses.js','history-catalog.js','peru-catalog.js','lenguaje-catalog.js','economia-catalog.js','educacion-civica-catalog.js','razonamiento-verbal-catalog.js','razonamiento-matematico-catalog.js','fisica-catalog.js','history-progress.js','app.js'];
const chapterFiles=n=>['lenguaje-catalog.js','history-progress.js',`lenguaje-capitulo-0${n}-data.js`,'history-chapter.js'];
const expectedSyllabus=[
 'La comunicación','El lenguaje','Planos del lenguaje','La realidad lingüística del Perú','Historia de la lengua española','Fonología y Fonética','Uso de grafías','La sílaba','Uso de las letras mayúsculas y minúsculas','Acentuación escrita','La morfología','La semántica','Relaciones semánticas','Frase nominal','El sustantivo','Accidentes del sustantivo','El adjetivo','Determinantes','Pronombre','El verbo','Clasificación morfológica del verbo','Clasificación semántico-sintáctica del verbo','El adverbio','La preposición','La conjunción','Sintaxis','El sujeto','El predicado','Concordancia','Oración compuesta coordinada','Oración compuesta subordinada I','Oración compuesta subordinada II','Signos de puntuación','El texto'
];
const expectedPages=[9,16,21,27,32,37,47,52,58,68,77,87,94,102,108,113,118,124,130,136,145,153,157,163,168,174,181,186,195,202,207,212,218,227];

function validateCatalog(){
 const ctx={window:{}};
 vm.runInNewContext(fs.readFileSync(path.join(root,'lenguaje-catalog.js'),'utf8'),ctx);
 const syllabus=JSON.parse(JSON.stringify(ctx.window.LANGUAGE_SYLLABUS));
 const chapters=JSON.parse(JSON.stringify(ctx.window.LANGUAGE_CHAPTERS));
 assert.deepEqual(syllabus.map(x=>x.title),expectedSyllabus);
 assert.deepEqual(syllabus.map(x=>x.number),Array.from({length:34},(_,i)=>i+1));
 assert.deepEqual(syllabus.map(x=>x.page),expectedPages);
 assert.equal(chapters.length,6);
 chapters.forEach((chapter,i)=>{
  const number=i+1,id=`lenguaje-capitulo-0${number}`;
  assert.equal(chapter.number,number);assert.equal(chapter.title,expectedSyllabus[i]);assert.equal(chapter.progressId,id);
  assert.equal(chapter.format,'reading');assert.equal(chapter.practiceCount,10);assert.equal(chapter.assessmentFormat,'practice-10');assert.ok(chapter.items>0);
 });
}

function validateFilesAndImages(){
 const catalogContext={window:{}};vm.runInNewContext(fs.readFileSync(path.join(root,'lenguaje-catalog.js'),'utf8'),catalogContext);
 const images=new Set();
 for(let n=1;n<=6;n++){
  const id=`lenguaje-capitulo-0${n}`,htmlPath=path.join(root,`${id}.html`),dataPath=path.join(root,`${id}-data.js`);
  assert.ok(fs.existsSync(htmlPath),`${id}.html exists`);assert.ok(fs.existsSync(dataPath),`${id}-data.js exists`);
  const html=fs.readFileSync(htmlPath,'utf8');
  for(const dependency of ['practice-bank.js','chapter-practice.js','lenguaje-catalog.js',`${id}-data.js`,'history-progress.js','study-mode.js','history-chapter.js'])assert.match(html,new RegExp(dependency.replaceAll('.','\\.')));
  const ctx={window:{}};vm.runInNewContext(fs.readFileSync(dataPath,'utf8'),ctx);
  const content=JSON.parse(JSON.stringify(ctx.window.HISTORY_CONTENT));
  assert.equal(content.id,id);assert.equal(content.progressId,id);assert.equal(content.courseId,7);assert.equal(content.courseName,'Lenguaje');
  assert.equal(content.number,n);assert.equal(content.title,expectedSyllabus[n-1]);assert.equal(content.format,'reading');assert.equal(content.assessmentFormat,'practice-10');
  assert.ok(content.goals.length>0);assert.ok(content.timeline.length>0);assert.ok(content.lessons.length>0);
  assert.equal(catalogContext.window.LANGUAGE_CHAPTERS[n-1].items,content.lessons.length);
  const chapterImages=content.lessons.flatMap(lesson=>lesson.blocks).filter(block=>block.illustration).map(block=>block.illustration);
  assert.equal(chapterImages.length,3,`Chapter ${n} has three contextual illustrations`);
  for(const illustration of chapterImages){
   assert.match(illustration.src,/^assets\/lenguaje-ai\/.+\.webp$/);assert.ok(illustration.alt?.trim());assert.ok(illustration.caption?.trim());
   assert.ok(!images.has(illustration.src),`Image is not reused: ${illustration.src}`);images.add(illustration.src);
   assert.ok(fs.existsSync(path.join(root,illustration.src)),`Image exists: ${illustration.src}`);
  }
 }
 assert.equal(images.size,18);
}

function validatePractices(){
 const ctx={window:{}};vm.runInNewContext(fs.readFileSync(path.join(root,'practice-bank.js'),'utf8'),ctx);
 for(let n=1;n<=6;n++){
  const id=`lenguaje-capitulo-0${n}`,practice=ctx.window.CHAPTER_PRACTICES[id];
  assert.ok(practice,`Practice exists: ${id}`);assert.equal(practice.problems.length,10);
  assert.equal(practice.problems.map(x=>x.id).join(','),Array.from({length:10},(_,i)=>`p${String(i+1).padStart(2,'0')}`).join(','));
  assert.equal(new Set(practice.problems.map(x=>x.prompt)).size,10);
  for(const problem of practice.problems){
   assert.equal(problem.options.length,5);assert.equal(new Set(problem.options).size,5);
   assert.ok(Number.isInteger(problem.answer)&&problem.answer>=0&&problem.answer<5);assert.ok(problem.solution.length>20);
  }
 }
}

async function validateAppAndProgress(){
 const h=harness(files),run=h.run;await h.signIn({uid:'student'});
 assert.equal(run('state.view'),'mode');run('openCourse(7)');assert.equal(run('state.view'),'mode');
 run("selectStudyMode('free');openCourse(7)");
 assert.equal(run('state.activeCourseId'),7);assert.equal(run('COURSES.find(c=>c.id===7).topics.length'),34);
 assert.equal(run('window.LANGUAGE_CHAPTERS.length'),6);
 assert.equal(run('JSON.stringify(COURSES.find(c=>c.id===7).topics)'),run('JSON.stringify(window.LANGUAGE_SYLLABUS.map(c=>c.title))'));
 assert.match(h.elements.get('app').innerHTML,/Lenguaje: 34 capítulos; contenido desarrollado del 1 al 6/);
 assert.doesNotMatch(h.elements.get('app').innerHTML,/onclick="showStudyModes/);
 for(let n=1;n<=6;n++){run(`setTopic(${n-1})`);assert.equal(h.redirects.at(-1),`lenguaje-capitulo-0${n}.html?v=20260918-social1`);}
 const routed=h.redirects.length;run('setTopic(6)');assert.equal(h.redirects.length,routed);assert.equal(run('state.activeTopicIndex'),6);assert.match(h.elements.get('app').innerHTML,/Uso de grafías/);
 assert.equal(run("restoredTopicIndex(COURSES.find(c=>c.id===7),2,'Variedades de la lengua',4)"),2);
 assert.equal(run("restoredTopicIndex(COURSES.find(c=>c.id===7),20,'Signos de puntuación',4)"),32);
 assert.equal(run("restoredTopicIndex(COURSES.find(c=>c.id===7),4,'La realidad lingüística del Perú',5)"),3);

 const c=harness(chapterFiles(3),{local:h.local,cloud:h.cloud});await c.signIn({uid:'student'});
 const last=c.run('CONTENT.lessons.length-1');
 c.run(`goLesson(${last});window.ChapterPractice.choose(CHAPTER_ID,P.practice10,'p01',window.ChapterPractice.questions(CHAPTER_ID)[0].answer,P.studyMode);checkPractice('p01')`);await c.run('persist()');
 assert.equal(c.cloud.get('users/student/progress/navigation').lastCourseId,7);
 assert.equal(c.cloud.get('users/student/progress/navigation').catalogVersion,8);
 assert.equal(c.cloud.get('users/student/progress/lenguaje-capitulo-03').readingItem,last);
 const reload=harness(chapterFiles(3),{local:h.local,cloud:h.cloud});await reload.signIn({uid:'student'});assert.equal(reload.run('P.readingItem'),last);
 const home=harness(files,{local:h.local,cloud:h.cloud});await home.signIn({uid:'student'});
 assert.equal(home.run('languageChapterProgress(3).percent'),10);assert.equal(home.run('peruChapterProgress(3).percent'),0);assert.equal(home.run('historyChapterProgress(3).percent'),0,'Courses do not share academic progress');
 assert.match(home.run('renderProgressPanel()'),/Lenguaje · Capítulo 3/);home.run('openProgressChapter()');assert.equal(home.redirects.at(-1),'lenguaje-capitulo-03.html?v=20260918-social1');
 await home.signIn({uid:'other'});assert.equal(home.run('languageChapterProgress(3).percent'),0,'Account isolation in the catalog');

 for(let n=1;n<=6;n++){
  const id=`lenguaje-capitulo-0${n}`,direct=harness(chapterFiles(n));await direct.signIn({uid:'new'});
  assert.deepEqual(direct.redirects,[`index.html?chapter=${id}&v=20260918-social1`]);
  const entry=harness(files,{search:`?chapter=${id}`});await entry.signIn({uid:'new'});assert.equal(entry.run('state.view'),'mode');entry.run("selectStudyMode('progressive')");assert.equal(entry.redirects.at(-1),`${id}.html?v=20260918-social1`);
  const content=harness(chapterFiles(n));content.run("window.StudyMode.choose('student','free')");await content.signIn({uid:'student'});
  const links=content.run('chapterLinks()');assert.doesNotMatch(links,/lenguaje-capitulo-00|lenguaje-capitulo-07|historia-(?:universal|del-peru)/);
 }
}

function validateTeacherTracking(){
 const ctx={window:{}};for(const f of ['peru-catalog.js','history-catalog.js','lenguaje-catalog.js','economia-catalog.js','educacion-civica-catalog.js'])vm.runInNewContext(fs.readFileSync(path.join(root,f),'utf8'),ctx);
 const admin=fs.readFileSync(path.join(root,'admin.js'),'utf8');const declaration=admin.slice(admin.indexOf('const TRACKED_CHAPTERS='),admin.indexOf('let selectedChapter='));vm.runInNewContext(declaration+';window.tracked=TRACKED_CHAPTERS;',ctx);
 assert.equal(Object.keys(ctx.window.tracked).length,32);
 for(let n=1;n<=6;n++){const tracked=ctx.window.tracked[`lenguaje-capitulo-0${n}`];assert.equal(tracked.items,10);assert.match(tracked.label,new RegExp(`^Lenguaje · Capítulo ${n} ·`));}
}

async function test(){
 validateCatalog();validateFilesAndImages();validatePractices();await validateAppAndProgress();validateTeacherTracking();
 console.log('PASS: Language 34-topic syllabus, six developed routes, study mode, progress isolation/resume, teacher tracking and 18 unique images.');
}
if(require.main===module)test().catch(error=>{console.error(error);process.exitCode=1});
