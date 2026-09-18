const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const {harness}=require('./study-entry.test.cjs');
const root=path.join(__dirname,'..');
const appFiles=['courses.js','history-catalog.js','peru-catalog.js','lenguaje-catalog.js','economia-catalog.js','educacion-civica-catalog.js','razonamiento-verbal-catalog.js','history-progress.js','app.js'];
const configs=[
 {prefix:'economia',id:14,name:'Economía',variable:'ECONOMY',count:30,pages:[11,18,25,33,40,47],titles:['La ciencia económica','División de la economía','Necesidades y pobreza','Bienes y servicios','Proceso económico y sectores productivos','Teoría de la producción y costos de producción']},
 {prefix:'educacion-civica',id:10,name:'Educación Cívica',variable:'CIVICS',count:11,pages:[243,250,256,264,270,277],titles:['Educación cívica y las normas','La Constitución Política','Los derechos y mecanismos de protección','Ciudadanía y mecanismos de participación y de control ciudadanos','El Estado y el Gobierno','El Poder Legislativo y el Poder Ejecutivo']}
];
const chapterFiles=(c,n)=>[`${c.prefix}-catalog.js`,'history-progress.js',`${c.prefix}-capitulo-0${n}-data.js`,'history-chapter.js'];
function validateContent(){
 const ctx={window:{}};for(const file of ['courses.js','practice-bank.js',...configs.map(c=>`${c.prefix}-catalog.js`)])vm.runInNewContext(fs.readFileSync(path.join(root,file),'utf8'),ctx);
 const images=new Set(),imageHashes=new Set();
 for(const c of configs){
  const syllabus=ctx.window[`${c.variable}_SYLLABUS`],chapters=ctx.window[`${c.variable}_CHAPTERS`];
  assert.equal(syllabus.length,c.count);assert.equal(chapters.length,6);
  assert.deepEqual(Array.from(syllabus.slice(0,6),x=>x.title),c.titles);
  assert.deepEqual(Array.from(syllabus.slice(0,6),x=>x.page),c.pages);
  assert.equal(JSON.stringify(ctx.window.COURSES.find(x=>x.id===c.id).topics),JSON.stringify(syllabus.map(x=>x.title)));
  for(let n=1;n<=6;n++){
   const id=`${c.prefix}-capitulo-0${n}`,html=fs.readFileSync(path.join(root,`${id}.html`),'utf8');
   for(const file of ['practice-bank.js','chapter-practice.js',`${c.prefix}-catalog.js`,`${id}-data.js`,'study-mode.js','history-progress.js','history-chapter.js'])assert.ok(html.includes(file));
   vm.runInNewContext(fs.readFileSync(path.join(root,`${id}-data.js`),'utf8'),ctx);const content=ctx.window.HISTORY_CONTENT;
   assert.equal(content.id,id);assert.equal(content.progressId,id);assert.equal(content.courseId,c.id);assert.equal(content.courseName,c.name);assert.equal(content.title,c.titles[n-1]);
   assert.equal(content.lessons.length,5);assert.equal(chapters[n-1].items,5);assert.match(content.sourceNote,/Lumbreras Editores, 2021/);
   const blocks=content.lessons.flatMap(l=>l.blocks);assert.equal(blocks.length,10);assert.equal(new Set(blocks.map(b=>b.id)).size,10);
   assert.ok(blocks.flatMap(b=>b.paragraphs).join(' ').split(/\s+/).length>=600,'Substantive theory in each chapter');
   assert.ok(content.lessons.every(l=>l.examples.length&&l.examples[0].steps.length>=3));
   const visuals=blocks.filter(b=>b.illustration).map(b=>b.illustration);assert.equal(visuals.length,3);
   for(const visual of visuals){
    assert.ok(visual.alt&&visual.caption);assert.match(visual.credit,/Ilustración referencial creada con IA/);
    assert.ok(!images.has(visual.src));images.add(visual.src);
    assert.match(visual.src,/\.webp$/);
    const bitmap=fs.readFileSync(path.join(root,visual.src));assert.equal(bitmap.toString('ascii',0,4),'RIFF');assert.equal(bitmap.toString('ascii',8,12),'WEBP');assert.ok(bitmap.length>20000,'Referential image is a full raster asset');
    const hash=require('node:crypto').createHash('sha256').update(bitmap).digest('hex');assert.ok(!imageHashes.has(hash));imageHashes.add(hash);
   }
   const practice=ctx.window.CHAPTER_PRACTICES[id];assert.equal(practice.problems.length,10);
   assert.deepEqual(Array.from(practice.problems,q=>q.id),Array.from({length:10},(_,i)=>`p${String(i+1).padStart(2,'0')}`));
   assert.equal(new Set(practice.problems.map(q=>q.prompt)).size,10);
   for(const q of practice.problems){assert.equal(q.options.length,5);assert.equal(new Set(q.options).size,5);assert.ok(Number.isInteger(q.answer)&&q.answer>=0&&q.answer<5);assert.ok(q.solution.length>50);}
  }
 }
 assert.equal(images.size,36);assert.equal(imageHashes.size,36);
 // Independent answer anchors for numerical calculations and updated constitutional rules.
 const expected={
  'economia-capitulo-01':{p03:'S/ 70.',p04:'S/ 85.'},
  'economia-capitulo-02':{p06:'Aumentaron las ventas nominales, pero no la cantidad vendida.'},
  'economia-capitulo-03':{p04:'6 unidades de utilidad.',p08:'Pobre monetario no extremo.',p09:'S/ 1920.'},
  'economia-capitulo-04':{p08:'S/ 40.'},
  'economia-capitulo-05':{p05:'S/ 400.',p10:'S/ 400.'},
  'economia-capitulo-06':{p03:'30 unidades por trabajador.',p04:'15 unidades.',p06:'S/ 400.',p07:'S/ 20 por unidad.',p08:'S/ 12 por unidad.',p10:'CFMe = 5; CVMe = 9; CMe = 14.'},
  'educacion-civica-capitulo-02':{p08:'Más de dos tercios en cada cámara en dos legislaturas ordinarias sucesivas.',p09:'0,3% de la población electoral.'},
  'educacion-civica-capitulo-06':{p02:'60 senadores y 130 diputados.',p03:'Cámara de Diputados.',p10:'El Senado no puede ser disuelto por el presidente.'}
 };
 for(const [id,answers] of Object.entries(expected))for(const [qid,answer] of Object.entries(answers)){const q=ctx.window.CHAPTER_PRACTICES[id].problems.find(q=>q.id===qid);assert.equal(q.options[q.answer],answer);}
 const civics6=fs.readFileSync(path.join(root,'educacion-civica-capitulo-06-data.js'),'utf8');assert.match(civics6,/Esa exposición no da lugar al planteamiento de cuestión de confianza/);assert.match(civics6,/Ley 31988/);
}
async function validateNavigation(){
 for(const c of configs){
  const home=harness(appFiles);await home.signIn({uid:'student'});home.run(`openCourse(${c.id})`);assert.equal(home.run('state.view'),'mode');
  home.run(`selectStudyMode('free');openCourse(${c.id})`);assert.match(home.elements.get('app').innerHTML,new RegExp(`${c.name}: ${c.count} capítulos; contenido desarrollado del 1 al 6`));
  for(let n=1;n<=6;n++){home.run(`setTopic(${n-1})`);assert.equal(home.redirects.at(-1),`${c.prefix}-capitulo-0${n}.html?v=20260918-social1`);}
  const count=home.redirects.length;home.run('setTopic(6)');assert.equal(home.redirects.length,count);assert.equal(home.run('state.activeTopicIndex'),6);
  for(let n=1;n<=6;n++){
   const id=`${c.prefix}-capitulo-0${n}`,direct=harness(chapterFiles(c,n));await direct.signIn({uid:'new'});assert.deepEqual(direct.redirects,[`index.html?chapter=${id}&v=20260918-social1`]);
   const entry=harness(appFiles,{search:`?chapter=${id}`});await entry.signIn({uid:'new'});entry.run("selectStudyMode('progressive')");assert.equal(entry.redirects.at(-1),`${id}.html?v=20260918-social1`);
   const study=harness(chapterFiles(c,n),{local:home.local,cloud:home.cloud});await study.signIn({uid:'student'});
   assert.match(study.elements.get('chapter-app').innerHTML,/Ilustración referencial creada con IA/);assert.doesNotMatch(study.elements.get('chapter-app').innerHTML,/Esquema didáctico|Reconstrucción didáctica creada con IA/);
   study.run("goLesson(4);window.ChapterPractice.choose(CHAPTER_ID,P.practice10,'p01',window.ChapterPractice.questions(CHAPTER_ID)[0].answer,P.studyMode);checkPractice('p01')");await study.run('persist()');
   const nav=study.cloud.get('users/student/progress/navigation');assert.equal(nav.lastCourseId,c.id);assert.equal(nav.lastChapterNumber,n);assert.equal(nav.catalogVersion,7);
   const restored=harness(chapterFiles(c,n),{local:home.local,cloud:home.cloud});await restored.signIn({uid:'student'});assert.equal(restored.run('P.readingItem'),4);assert.equal(restored.run('progressPercent()'),10);
   const catalog=harness(appFiles,{local:home.local,cloud:home.cloud,search:`?course=${c.id}`});await catalog.signIn({uid:'student'});assert.equal(catalog.run('state.activeTopicIndex'),n-1);assert.equal(catalog.run(`socialChapterProgress(${c.id},${n}).percent`),10);assert.equal(catalog.run(`socialChapterProgress(${c.id===10?14:10},${n}).percent`),0);
   assert.match(catalog.run('renderProgressPanel()'),new RegExp(`${c.name} · Capítulo ${n}`));catalog.run('openProgressChapter()');assert.equal(catalog.redirects.at(-1),`${id}.html?v=20260918-social1`);
   const links=study.run('chapterLinks()');assert.doesNotMatch(links,/capitulo-00|capitulo-07|historia-universal|lenguaje-capitulo/);
   await catalog.signIn({uid:'another'});assert.equal(catalog.run(`socialChapterProgress(${c.id},${n}).percent`),0);
  }
 }
 const h=harness(appFiles);assert.equal(h.run("restoredTopicIndex(COURSES.find(c=>c.id===10),19,'Poder Legislativo',5)"),5);assert.equal(h.run("restoredTopicIndex(COURSES.find(c=>c.id===14),4,'Demanda y elasticidades',5)"),11);assert.equal(h.run("restoredTopicIndex(COURSES.find(c=>c.id===14),5,'Teoría de la producción y costos de producción',6)"),5);
}
function validateTeacher(){
 const ctx={window:{}};for(const f of appFiles.filter(f=>f.includes('catalog')))vm.runInNewContext(fs.readFileSync(path.join(root,f),'utf8'),ctx);
 const admin=fs.readFileSync(path.join(root,'admin.js'),'utf8');vm.runInNewContext(admin.slice(admin.indexOf('const TRACKED_CHAPTERS='),admin.indexOf('let selectedChapter='))+';window.tracked=TRACKED_CHAPTERS;',ctx);
 assert.equal(Object.keys(ctx.window.tracked).length,38);
 for(const c of configs)for(let n=1;n<=6;n++){const t=ctx.window.tracked[`${c.prefix}-capitulo-0${n}`];assert.equal(t.items,10);assert.ok(t.label.startsWith(`${c.name} · Capítulo ${n} ·`));}
 for(const file of ['index.html','admin.html'])for(const c of configs)assert.ok(fs.readFileSync(path.join(root,file),'utf8').includes(`${c.prefix}-catalog.js`));
}
(async()=>{validateContent();await validateNavigation();validateTeacher();console.log('PASS: Economía 30 / Cívica 11 chapters, 12 developed routes, 120 practices, 36 unique referential images, source corrections, resume, course/account isolation and teacher tracking.');})().catch(e=>{console.error(e);process.exitCode=1;});
