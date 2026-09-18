const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const {harness}=require('./study-entry.test.cjs');
const root=path.join(__dirname,'..');
const files=['courses.js','history-catalog.js','peru-catalog.js','lenguaje-catalog.js','economia-catalog.js','educacion-civica-catalog.js','razonamiento-verbal-catalog.js','razonamiento-matematico-catalog.js','fisica-catalog.js','history-progress.js','app.js'];
// Transcribed from the supplied PDF's printed index, not the former web outline.
const titles=['Magnitudes y análisis vectorial','Cinemática y Movimiento rectilíneo uniforme','Aceleración y Movimiento rectilíneo uniformemente variado','Movimiento vertical de caída libre y Movimiento parabólico de caída libre','Movimiento curvilíneo: movimiento circunferencial uniforme','Aceleración angular y Movimiento circunferencial uniformemente variado','Estática: equilibrio mecánico de traslación y de rotación','Dinámica rectilínea y Dinámica circunferencial','Trabajo mecánico','Energía y Potencia','Movimiento armónico simple','Ondas mecánicas','Hidrostática e Hidrodinámica','Electrostática','Electrodinámica','Electromagnetismo','Ondas electromagnéticas','Física moderna'];
const parse=(h,code)=>JSON.parse(h.run('JSON.stringify('+code+')'));
const navigation='users/student/progress/navigation';
const achieved={updatedMs:10,practice10:{version:1,mastered:['p01','p02'],attempts:{p01:2,p02:1}}};

async function searchAndSyllabus(){
 const h=harness(files);await h.signIn({uid:'student'});h.run("selectStudyMode('free')");
 assert.deepEqual(parse(h,'COURSES.find(c=>c.id===16).topics'),titles);
 assert.deepEqual(parse(h,'window.PHYSICS_SYLLABUS.map(c=>c.page)'),[9,21,35,45,64,76,88,109,127,138,154,168,182,200,217,237,262,274]);
 assert.equal(h.run('window.PHYSICS_SYLLABUS[14].number'),15);assert.equal(h.run('PHYSICS_CHAPTERS[0].topicIndex'),14);
 const html=h.elements.get('app').innerHTML;
 assert.ok(html.indexOf('id="searchInput"')<html.indexOf('class="course-card'));
 assert.ok(html.indexOf('id="searchInput"')<html.indexOf('Sigue desde donde te quedaste'));
 assert.match(html,/<label for="searchInput"[^>]*>Buscar curso<\/label>/);assert.match(html,/type="search"/);
 h.run("document.getElementById('searchInput').value='fisica'");const input=h.elements.get('searchInput'),initialMarkup=h.elements.get('app').innerHTML;
 for(const [query,ids] of [['fisica',[16]],['FÍSICA',[16]],['  algebra  ',[5]],['educacion civica',[10]],['peru',[11]],['raz mat',[2]],['RM',[2]],['razonamiento',[1,2]],['noexiste',[]]]){
  h.run('setSearch('+JSON.stringify(query)+')');assert.deepEqual(parse(h,'filteredCourses().map(c=>c.id)'),ids,query);
  assert.equal(h.elements.get('app').innerHTML,initialMarkup,'Typing updates results without replacing the search input or its caret');
  assert.equal(h.elements.get('searchInput'),input);
 }
 assert.match(h.elements.get('courseResults').innerHTML,/No encontramos cursos/);
 h.run("clearCourseSearch(true)");assert.equal(input.value,'');assert.equal(h.run('filteredCourses().length'),18);assert.equal(h.elements.get('clearCourseSearch').hidden,true);
 h.run("setCategory('Ciencias');setSearch('fisica')");assert.deepEqual(parse(h,'filteredCourses().map(c=>c.id)'),[16]);
 h.run('openSearchResult()');assert.equal(h.run('state.activeCourseId'),16);assert.equal(h.run('state.view'),'course');
 const courseHTML=h.elements.get('app').innerHTML;assert.match(courseHTML,/18 capítulos en el orden del PDF/);assert.doesNotMatch(courseHTML,/25 capítulos|Capítulo 02 de 25/);
 for(const title of titles)assert.ok(courseHTML.includes(title));assert.match(courseHTML,/Repasos complementarios/);
 const count=h.redirects.length;h.run('setTopic(1)');assert.equal(h.redirects.length,count);assert.match(h.elements.get('app').innerHTML,/Cinemática y Movimiento rectilíneo uniforme/);
 h.run('setTopic(14)');assert.equal(h.redirects.at(-1),'fisica-capitulo-15.html?v=20260918-catalog9');
 // Existing topic indices move by subject; current PDF indices never shift twice.
 for(const [oldIndex,newIndex] of [[0,0],[1,0],[3,1],[4,2],[5,3],[9,6],[12,8],[14,9],[17,12],[19,13],[20,13],[21,14],[22,15],[24,17]])assert.equal(h.run(`restoredTopicIndex(COURSES.find(c=>c.id===16),${oldIndex},'',8)`),newIndex);
 assert.equal(h.run("restoredTopicIndex(COURSES.find(c=>c.id===16),20,'',1)"),14);
 assert.equal(h.run("restoredTopicIndex(COURSES.find(c=>c.id===16),21,'Electrodinámica',8)"),14);
 assert.equal(h.run("restoredTopicIndex(COURSES.find(c=>c.id===16),14,'Electrodinámica',9)"),14);
 assert.equal(h.run("restoredPhysicsModuleId({catalogVersion:2,lastChapterName:'Vectores',lastModuleId:'fisica-capitulo-15'})"),'fisica-capitulo-02');
 assert.equal(h.run("restoredPhysicsModuleId({catalogVersion:8,lastChapterName:'Electrodinámica y circuitos eléctricos',lastModuleId:'fisica-capitulo-02'})"),null);
 console.log('PASS: all 18 PDF titles/pages, chapter numbering, accent-insensitive name search, partial names, clear/empty states, stable input, category filter and course selection.');
}

async function progressMigration(){
 const cloud=new Map([[navigation,{catalogVersion:8,lastCourseId:16,lastCourseName:'Física',lastTopicIndex:21,lastChapterNumber:15,lastChapterName:'Electrodinámica',studyMode:'free'}],['users/student/progress/fisica-capitulo-15',structuredClone(achieved)]]);
 const h=harness(files,{cloud,search:'?course=16'});await h.signIn({uid:'student'});
 assert.equal(h.run('state.activeTopicIndex'),14);assert.equal(h.run('physicsChapterProgress(15).percent'),20);h.run('openProgressChapter()');assert.equal(h.redirects.at(-1),'fisica-capitulo-15.html?v=20260918-catalog9');
 assert.deepEqual(cloud.get('users/student/progress/fisica-capitulo-15'),achieved,'Navigation migration never overwrites practice data');
 for(const [n,title] of [[1,'Análisis dimensional'],[2,'Vectores']]){
  const id=`fisica-capitulo-0${n}`,oldCloud=new Map([[navigation,{catalogVersion:2,lastCourseId:16,lastCourseName:'Física',lastTopicIndex:n-1,lastChapterNumber:n,lastChapterName:title,studyMode:'free'}],['users/student/progress/'+id,structuredClone(achieved)]]);
  const catalog=harness(files,{cloud:oldCloud,search:'?course=16'});await catalog.signIn({uid:'student'});
  assert.equal(catalog.run('state.activeTopicIndex'),0);assert.equal(catalog.run('activePhysicsModule().progressId'),id);assert.equal(catalog.run(`physicsChapterProgress(${n}).percent`),20);assert.match(catalog.run('renderProgressPanel()'),/Repaso complementario/);
  catalog.run('openProgressChapter()');assert.equal(catalog.redirects.at(-1),id+'.html?v=20260918-catalog9');
  const review=harness([id+'-data.js',id+'.js'],{local:catalog.local,cloud:oldCloud});await review.signIn({uid:'student'});assert.equal(review.run('progressPercent()'),20);assert.match(review.elements.get('chapter-app').innerHTML,/Física · Repaso complementario/);assert.doesNotMatch(review.elements.get('chapter-app').innerHTML,/de 25|Capítulo 0?[12]/);
  const nav=oldCloud.get(navigation);assert.equal(nav.catalogVersion,9);assert.equal(nav.lastTopicIndex,0);assert.equal(nav.lastModuleId,id);assert.equal(nav.lastChapterNumber,1);
  assert.equal(oldCloud.get('users/student/progress/'+id).contentType,'review');assert.equal(oldCloud.get('users/student/progress/'+id).chapterNumber,null);
  const offline=harness(files,{local:catalog.local,search:'?course=16'});offline.setOffline(true);await offline.signIn({uid:'student'});assert.equal(offline.run('activePhysicsModule().progressId'),id);assert.equal(offline.run(`physicsChapterProgress(${n}).percent`),20);
  const returned=harness(files,{local:catalog.local,cloud:oldCloud,search:'?course=16'});await returned.signIn({uid:'student'});assert.equal(returned.run('activePhysicsModule().progressId'),id);
  await returned.signIn({uid:'other'});assert.equal(returned.run(`physicsChapterProgress(${n}).percent`),0);
 }
 const admin=fs.readFileSync(path.join(root,'admin.js'),'utf8');assert.match(admin,/Física · Repaso · Vectores/);assert.doesNotMatch(admin,/Física · Capítulo 2 · Vectores/);
 console.log('PASS: cloud and offline migration, source chapter 15, both legacy reviews, unchanged mastery/attempts, correct resume links and isolated student progress.');
}
searchAndSyllabus().then(progressMigration).catch(error=>{console.error(error);process.exitCode=1;});
