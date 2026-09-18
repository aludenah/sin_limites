const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const {harness}=require('./study-entry.test.cjs');
const root=path.join(__dirname,'..');
const catalogs=['history-catalog.js','peru-catalog.js','lenguaje-catalog.js','economia-catalog.js','educacion-civica-catalog.js','razonamiento-verbal-catalog.js','razonamiento-matematico-catalog.js'];
const appFiles=['courses.js',...catalogs,'history-progress.js','app.js'];
const chapterFiles=n=>['razonamiento-verbal-catalog.js','history-progress.js',`razonamiento-verbal-capitulo-0${n}-data.js`,'history-chapter.js'];
const titles=['Relaciones semánticas','Series verbales y términos excluidos','Analogías','Oraciones incompletas','Conectores lógicos','La comprensión lectora y la jerarquía textual'];

function contentAndAssets(){
 const ctx={window:{}};
 for(const f of ['courses.js','practice-bank.js',...catalogs])vm.runInNewContext(fs.readFileSync(path.join(root,f),'utf8'),ctx);
 assert.equal(ctx.window.COURSES.length,18,'Replace the verbal outline without duplicating the course');
 const course=ctx.window.COURSES.find(c=>c.id===1);
 assert.equal(course.name,'Razonamiento Verbal');
 assert.equal(ctx.window.VERBAL_SYLLABUS.length,15);assert.equal(ctx.window.VERBAL_CHAPTERS.length,6);
 assert.deepEqual(Array.from(ctx.window.VERBAL_SYLLABUS.slice(0,6),c=>c.page),[9,27,41,49,57,70]);
 assert.equal(JSON.stringify(course.topics),JSON.stringify(ctx.window.VERBAL_SYLLABUS.map(c=>c.title)));
 const images=new Set(),hashes=new Set();
 for(let n=1;n<=6;n++){
  const id=`razonamiento-verbal-capitulo-0${n}`,html=fs.readFileSync(path.join(root,id+'.html'),'utf8');
  for(const f of [...chapterFiles(n),'practice-bank.js','chapter-practice.js','study-mode.js'])assert.ok(html.includes(f));
  vm.runInNewContext(fs.readFileSync(path.join(root,id+'-data.js'),'utf8'),ctx);
  const c=ctx.window.HISTORY_CONTENT;assert.equal(c.title,titles[n-1]);assert.equal(c.courseId,1);assert.equal(c.progressId,id);
  assert.match(c.sourceNote,/Lumbreras Editores, 2022/);
  assert.equal(c.lessons.length,5);assert.ok(c.lessons.every(l=>l.examples.length===1&&l.examples[0].steps.length===3));
  const blocks=c.lessons.flatMap(l=>l.blocks);assert.equal(new Set(blocks.map(b=>b.id)).size,10);
  const visuals=blocks.filter(b=>b.illustration).map(b=>b.illustration);assert.equal(visuals.length,3);
  for(const v of visuals){
   assert.match(v.credit,/Ilustración referencial creada con IA/);assert.ok(v.alt&&v.caption);
   assert.ok(!images.has(v.src));images.add(v.src);
   const bitmap=fs.readFileSync(path.join(root,v.src));assert.equal(bitmap.toString('ascii',0,4),'RIFF');assert.equal(bitmap.toString('ascii',8,12),'WEBP');
   assert.ok(bitmap.length>20000);hashes.add(require('node:crypto').createHash('sha256').update(bitmap).digest('hex'));
  }
  const qs=ctx.window.CHAPTER_PRACTICES[id].problems;assert.equal(qs.length,10);
  for(const q of qs){assert.equal(new Set(q.options).size,5);assert.ok(q.answer>=0&&q.answer<5);assert.ok(q.solution.length>50);}
 }
 assert.equal(images.size,18);assert.equal(hashes.size,18);
 assert.ok(!fs.existsSync(path.join(root,'razonamiento-verbal-capitulo-07.html')));
 assert.equal(Object.keys(ctx.window.CHAPTER_PRACTICES).filter(k=>k.startsWith('razonamiento-verbal-')).length,6);
 const admin=fs.readFileSync(path.join(root,'admin.js'),'utf8');
 vm.runInNewContext(admin.slice(admin.indexOf('const TRACKED_CHAPTERS='),admin.indexOf('let selectedChapter='))+';window.tracked=TRACKED_CHAPTERS;',ctx);
 assert.equal(Object.keys(ctx.window.tracked).length,44);
 for(let n=1;n<=6;n++){const x=ctx.window.tracked[`razonamiento-verbal-capitulo-0${n}`];assert.equal(x.items,10);assert.ok(x.label.includes(titles[n-1]));}
 for(const f of ['index.html','admin.html'])assert.ok(fs.readFileSync(path.join(root,f),'utf8').includes('razonamiento-verbal-catalog.js'));
}

async function navigationAndProgress(){
 const home=harness(appFiles);await home.signIn({uid:'student'});
 home.run('openCourse(1)');assert.equal(home.run('state.view'),'mode');
 home.run("selectStudyMode('free');openCourse(1)");
 assert.match(home.elements.get('app').innerHTML,/Razonamiento Verbal: 15 capítulos; contenido desarrollado del 1 al 6/);
 for(let n=1;n<=6;n++){
  const id=`razonamiento-verbal-capitulo-0${n}`;
  home.run(`setTopic(${n-1})`);assert.equal(home.redirects.at(-1),id+'.html?v=20260918-social1');
  const direct=harness(chapterFiles(n));await direct.signIn({uid:'new'});
  assert.equal(direct.redirects.at(-1),`index.html?chapter=${id}&v=20260918-social1`);
  const entry=harness(appFiles,{search:'?chapter='+id});await entry.signIn({uid:'new'});entry.run("selectStudyMode('progressive')");
  assert.equal(entry.redirects.at(-1),id+'.html?v=20260918-social1');
  const study=harness(chapterFiles(n),{local:home.local,cloud:home.cloud});await study.signIn({uid:'student'});
  const html=study.elements.get('chapter-app').innerHTML;
  assert.equal((html.match(/class="topic-image"/g)||[]).length,3);
  assert.equal((html.match(/class="guided-case"/g)||[]).length,5);
  assert.equal((html.match(/class="practice-card"/g)||[]).length,10);
  if(n===6)assert.ok(html.includes('class="practice-passage"'),'Reading passages are legible blocks');
  for(const id of JSON.parse(study.run('JSON.stringify(LESSONS.flatMap(l=>l.blocks).filter(b=>b.illustration).map(b=>b.id))'))){
   study.run(`document.getElementById('image-dialog').showModal=()=>{};openImage('${id}')`);
   assert.match(study.elements.get('image-dialog').innerHTML,/expanded-image/);
  }
  study.run("goLesson(4);window.ChapterPractice.choose(CHAPTER_ID,P.practice10,'p01',window.ChapterPractice.questions(CHAPTER_ID)[0].answer,P.studyMode);checkPractice('p01')");await study.run('persist()');
  const nav=study.cloud.get('users/student/progress/navigation');assert.equal(nav.lastCourseId,1);assert.equal(nav.lastChapterNumber,n);assert.equal(nav.catalogVersion,8);
  const restored=harness(chapterFiles(n),{local:home.local,cloud:home.cloud});await restored.signIn({uid:'student'});
  assert.equal(restored.run('P.readingItem'),4);assert.equal(restored.run('progressPercent()'),10);
  const catalog=harness(appFiles,{local:home.local,cloud:home.cloud,search:'?course=1'});await catalog.signIn({uid:'student'});
  assert.equal(catalog.run('state.activeTopicIndex'),n-1);assert.equal(catalog.run(`socialChapterProgress(1,${n}).percent`),10);
  assert.equal(catalog.run(`socialChapterProgress(14,${n}).percent`),0);assert.equal(catalog.run(`socialChapterProgress(10,${n}).percent`),0);
  assert.match(catalog.run('renderProgressPanel()'),new RegExp(`Razonamiento Verbal · Capítulo ${n}`));
  catalog.run('openProgressChapter()');assert.equal(catalog.redirects.at(-1),id+'.html?v=20260918-social1');
  assert.doesNotMatch(study.run('chapterLinks()'),/capitulo-00|capitulo-07|historia-universal|lenguaje-capitulo/);
  await catalog.signIn({uid:'other'});assert.equal(catalog.run(`socialChapterProgress(1,${n}).percent`),0);
 }
 const before=home.redirects.length;home.run('setTopic(6)');assert.equal(home.redirects.length,before,'Chapter 7 remains undeveloped');
 const h=harness(appFiles);
 assert.equal(h.run("restoredTopicIndex(COURSES.find(c=>c.id===1),11,'Sinonimia contextual',6)"),0);
 assert.equal(h.run("restoredTopicIndex(COURSES.find(c=>c.id===1),4,'Idea principal',6)"),5);
 assert.equal(h.run("restoredTopicIndex(COURSES.find(c=>c.id===1),4,'Conectores lógicos',7)"),4);
 const oldCloud=new Map([['users/legacy/progress/navigation',{lastCourseId:1,lastTopicIndex:4,lastChapterName:'Idea principal',catalogVersion:6,studyMode:'free'}]]);
 const migrated=harness(appFiles,{cloud:oldCloud,search:'?course=1'});await migrated.signIn({uid:'legacy'});
 assert.equal(migrated.run('state.activeTopicIndex'),5);
}

(async()=>{contentAndAssets();await navigationAndProgress();console.log('PASS: Razonamiento Verbal chapters 1–6, 60 practices, 18 reference images, 30 guided examples, syllabus migration, direct links, reading resume, account/course isolation, image dialogs and teacher tracking.');})().catch(e=>{console.error(e);process.exitCode=1;});
