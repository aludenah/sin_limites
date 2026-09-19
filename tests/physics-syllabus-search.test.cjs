const assert=require('node:assert/strict');
const {harness}=require('./study-entry.test.cjs');
const files=['courses.js','history-catalog.js','peru-catalog.js','lenguaje-catalog.js','economia-catalog.js','educacion-civica-catalog.js','razonamiento-verbal-catalog.js','razonamiento-matematico-catalog.js','fisica-catalog.js','history-progress.js','app.js'];
// The first former topic is split; the other eighteen-chapter source topics keep their order.
const titles=['Análisis Dimensional','Análisis Vectorial','Cinemática y Movimiento rectilíneo uniforme','Aceleración y Movimiento rectilíneo uniformemente variado','Movimiento vertical de caída libre y Movimiento parabólico de caída libre','Movimiento curvilíneo: movimiento circunferencial uniforme','Aceleración angular y Movimiento circunferencial uniformemente variado','Estática: equilibrio mecánico de traslación y de rotación','Dinámica rectilínea y Dinámica circunferencial','Trabajo mecánico','Energía y Potencia','Movimiento armónico simple','Ondas mecánicas','Hidrostática e Hidrodinámica','Electrostática','Electrodinámica','Electromagnetismo','Ondas electromagnéticas','Física moderna'];
const parse=(h,code)=>JSON.parse(h.run('JSON.stringify('+code+')'));
const navigation='users/student/progress/navigation';
const achieved={updatedMs:10,practice10:{version:1,mastered:['p01','p02'],attempts:{p01:2,p02:1}}};

async function searchAndSyllabus(){
 const h=harness(files);await h.signIn({uid:'student'});h.run("selectStudyMode('free')");
 assert.deepEqual(parse(h,'COURSES.find(c=>c.id===16).topics'),titles);
 assert.deepEqual(parse(h,'window.PHYSICS_SYLLABUS.map(c=>c.page)'),[1,9,21,35,45,64,76,88,109,127,138,154,168,182,200,217,237,262,274]);
 assert.equal(h.run('window.PHYSICS_SYLLABUS[15].number'),16);assert.deepEqual(parse(h,'PHYSICS_CHAPTERS.map(c=>[c.number,c.topicIndex,c.progressId])'),[[1,0,'fisica-capitulo-01'],[2,1,'fisica-capitulo-02'],[16,15,'fisica-capitulo-15']]);
 const html=h.elements.get('app').innerHTML;
 assert.ok(html.indexOf('id="searchInput"')<html.indexOf('class="course-card'));
 assert.doesNotMatch(html,/Sigue desde donde te quedaste/);
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
 const courseHTML=h.elements.get('app').innerHTML;assert.match(courseHTML,/19 capítulos/);assert.doesNotMatch(courseHTML,/18 capítulos|25 capítulos|Repasos complementarios|Temario del PDF/);
 for(const title of titles)assert.ok(courseHTML.includes(title));assert.match(courseHTML,/Estudiar Análisis Dimensional/);
 const count=h.redirects.length;h.run('setTopic(2)');assert.equal(h.redirects.length,count);assert.match(h.elements.get('app').innerHTML,/Cinemática y Movimiento rectilíneo uniforme/);
 for(const [index,id] of [[0,'01'],[1,'02'],[15,'15']]){h.run('setTopic('+index+')');assert.equal(h.redirects.at(-1),'fisica-capitulo-'+id+'.html?v=20260919-fisica19');}
 // Migrate both prior outlines and never shift current indices twice.
 for(const [oldIndex,newIndex] of [[0,0],[1,1],[3,2],[4,3],[5,4],[9,7],[12,9],[14,10],[17,13],[19,14],[20,14],[21,15],[22,16],[24,18]])assert.equal(h.run(`restoredTopicIndex(COURSES.find(c=>c.id===16),${oldIndex},'',8)`),newIndex);
 for(let previous=0;previous<18;previous++)assert.equal(h.run(`restoredTopicIndex(COURSES.find(c=>c.id===16),${previous},'',9)`),previous===0?0:previous+1);
 for(let current=0;current<19;current++)assert.equal(h.run(`restoredTopicIndex(COURSES.find(c=>c.id===16),${current},'',10)`),current);
 assert.equal(h.run("restoredTopicIndex(COURSES.find(c=>c.id===16),20,'',1)"),15);
 assert.equal(h.run("restoredTopicIndex(COURSES.find(c=>c.id===16),21,'Electrodinámica',8)"),15);
 assert.equal(h.run("restoredTopicIndex(COURSES.find(c=>c.id===16),14,'Electrodinámica',9)"),15);
 assert.equal(h.run("restoredTopicIndex(COURSES.find(c=>c.id===16),0,'Repaso: Vectores',9)"),1);
 assert.equal(h.run("restoredPhysicsModuleId({catalogVersion:2,lastChapterName:'Vectores',lastModuleId:'fisica-capitulo-15'})"),'fisica-capitulo-02');
 assert.equal(h.run("restoredPhysicsModuleId({catalogVersion:8,lastChapterName:'Electrodinámica y circuitos eléctricos',lastModuleId:'fisica-capitulo-02'})"),'fisica-capitulo-15');
 assert.equal(h.run("restoredPhysicsModuleId({catalogVersion:9,lastChapterName:'Electromagnetismo',lastModuleId:'fisica-capitulo-15'})"),null);
 console.log('PASS: nineteen chapters, developed-module links, catalog search, v1/v8/v9/v10 navigation migration and stale-ID precedence.');
}

async function previousCatalogMigration(){
 // v9 review pages stored the combined first-topic name locally plus a stable module ID.
 for(const [id,index,title] of [['fisica-capitulo-01',0,'Análisis Dimensional'],['fisica-capitulo-02',1,'Análisis Vectorial'],['fisica-capitulo-15',15,'Electrodinámica']]){
  const priorIndex=id==='fisica-capitulo-15'?14:0;
  const local=new Map([['academia-sm-state',JSON.stringify({catalogVersion:9,activeCourseId:16,activeTopicIndex:priorIndex,activeModuleId:id,activeTopicName:priorIndex===0?'Magnitudes y análisis vectorial':title})],['sin-limites:student:study-mode','free'],['sin-limites:student:'+id,JSON.stringify({progress:achieved})]]);
  const offline=harness(files,{local,search:'?course=16'});offline.setOffline(true);await offline.signIn({uid:'student'});
  assert.equal(offline.run('state.activeTopicIndex'),index);assert.equal(offline.run('activePhysicsModule().progressId'),id);
  assert.equal(offline.run('physicsChapterProgress('+(index+1)+').percent'),20);
  const saved=JSON.parse(local.get('academia-sm-state'));assert.equal(saved.catalogVersion,10);assert.equal(saved.activeTopicIndex,index);assert.equal(saved.activeTopicName,title);
  const reopened=harness(files,{local,search:'?course=16'});reopened.setOffline(true);await reopened.signIn({uid:'student'});assert.equal(reopened.run('state.activeTopicIndex'),index,'Current local navigation must not migrate a second time');
 }
 // v9 field-free navigation moves all later chapters once, including the final topic.
 for(const [oldIndex,nextIndex] of [[1,2],[14,15],[17,18]]){
  const cloud=new Map([[navigation,{catalogVersion:9,lastCourseId:16,lastTopicIndex:oldIndex,studyMode:'free'}]]);
  const catalog=harness(files,{cloud,search:'?course=16'});await catalog.signIn({uid:'student'});assert.equal(catalog.run('state.activeTopicIndex'),nextIndex);
 }
 console.log('PASS: version-nine offline modules, preserved achievements, last-chapter bounds and idempotent return visits.');
}

async function progressMigration(){
 const cloud=new Map([[navigation,{catalogVersion:8,lastCourseId:16,lastCourseName:'Física',lastTopicIndex:21,lastChapterNumber:15,lastChapterName:'Electrodinámica',studyMode:'free'}],['users/student/progress/fisica-capitulo-15',structuredClone(achieved)]]);
 const h=harness(files,{cloud,search:'?course=16'});await h.signIn({uid:'student'});
 assert.equal(h.run('state.activeTopicIndex'),15);assert.equal(h.run('physicsChapterProgress(16).percent'),20);h.run('openProgressChapter()');assert.equal(h.redirects.at(-1),'fisica-capitulo-15.html?v=20260919-fisica19');
 assert.deepEqual(cloud.get('users/student/progress/fisica-capitulo-15'),achieved,'Navigation migration never overwrites practice data');
 const reader=harness(['fisica-catalog.js','history-progress.js','fisica-capitulo-15-data.js','history-chapter.js'],{cloud,local:h.local});await reader.signIn({uid:'student'});
 assert.equal(reader.run('CHAPTER_ID'),'fisica-capitulo-15');assert.equal(reader.run('CHAPTER_NUMBER'),16);assert.equal(reader.run('CHAPTER_TOPIC_INDEX'),15);assert.equal(reader.run('progressPercent()'),20);
 assert.match(reader.elements.get('chapter-app').innerHTML,/Física · Capítulo 16/);assert.equal(reader.run('chapterHref(16)'),'fisica-capitulo-15.html?v=20260919-fisica19');
 assert.equal(cloud.get(navigation).lastChapterNumber,16);assert.equal(cloud.get(navigation).lastTopicIndex,15);assert.equal(cloud.get(navigation).lastModuleId,'fisica-capitulo-15');
 for(const [id,count] of Object.entries(achieved.practice10.attempts))assert.equal(cloud.get('users/student/progress/fisica-capitulo-15').practice10.attempts[id],count);
 assert.deepEqual(cloud.get('users/student/progress/fisica-capitulo-15').practice10.mastered,achieved.practice10.mastered);
 assert.equal(cloud.get('users/student/progress/fisica-capitulo-15').moduleId,'fisica-capitulo-15');assert.equal(cloud.get('users/student/progress/fisica-capitulo-15').topicIndex,15);assert.equal(cloud.get('users/student/progress/fisica-capitulo-15').catalogVersion,10);
 const history=harness(['history-catalog.js','history-progress.js','historia-universal-capitulo-02-data.js','history-chapter.js']);assert.equal(history.run('chapterHref(2)'),'historia-universal-capitulo-02.html?v=20260918-social1','Other courses retain their page URLs, which differ from progress IDs');
 for(const [n,title] of [[1,'Análisis dimensional'],[2,'Vectores']]){
  const id=`fisica-capitulo-0${n}`,oldCloud=new Map([[navigation,{catalogVersion:2,lastCourseId:16,lastCourseName:'Física',lastTopicIndex:n-1,lastChapterNumber:n,lastChapterName:title,studyMode:'free'}],['users/student/progress/'+id,structuredClone(achieved)]]);
  const catalog=harness(files,{cloud:oldCloud,search:'?course=16'});await catalog.signIn({uid:'student'});
  assert.equal(catalog.run('state.activeTopicIndex'),n-1);assert.equal(catalog.run('activePhysicsModule().progressId'),id);assert.equal(catalog.run(`physicsChapterProgress(${n}).percent`),20);assert.match(catalog.run('renderProgressPanel()'),new RegExp('Física · Capítulo '+n));
  catalog.run('openProgressChapter()');assert.equal(catalog.redirects.at(-1),id+'.html?v=20260919-fisica19');
  const review=harness(['fisica-catalog.js',id+'-data.js',id+'.js'],{local:catalog.local,cloud:oldCloud});await review.signIn({uid:'student'});assert.equal(review.run('progressPercent()'),20);assert.match(review.elements.get('chapter-app').innerHTML,new RegExp('Física · Capítulo 0?'+n));assert.doesNotMatch(review.elements.get('chapter-app').innerHTML,/Repaso complementario|de 25/);
  const nav=oldCloud.get(navigation);assert.equal(nav.catalogVersion,10);assert.equal(nav.lastTopicIndex,n-1);assert.equal(nav.lastModuleId,id);assert.equal(nav.lastChapterNumber,n);
  assert.equal(oldCloud.get('users/student/progress/'+id).contentType,'chapter');assert.equal(oldCloud.get('users/student/progress/'+id).chapterNumber,n);
  const offline=harness(files,{local:catalog.local,search:'?course=16'});offline.setOffline(true);await offline.signIn({uid:'student'});assert.equal(offline.run('activePhysicsModule().progressId'),id);assert.equal(offline.run(`physicsChapterProgress(${n}).percent`),20);
  const returned=harness(files,{local:catalog.local,cloud:oldCloud,search:'?course=16'});await returned.signIn({uid:'student'});assert.equal(returned.run('activePhysicsModule().progressId'),id);
  await returned.signIn({uid:'other'});assert.equal(returned.run(`physicsChapterProgress(${n}).percent`),0);
 }
 const admin=harness(['fisica-catalog.js','admin.js']);assert.equal(admin.run("TRACKED_CHAPTERS['fisica-capitulo-01'].label"),'Física · Capítulo 1 · Análisis Dimensional');assert.equal(admin.run("TRACKED_CHAPTERS['fisica-capitulo-02'].label"),'Física · Capítulo 2 · Análisis Vectorial');assert.equal(admin.run("TRACKED_CHAPTERS['fisica-capitulo-15'].label"),'Física · Capítulo 16 · Electrodinámica');
 console.log('PASS: cloud/offline migration, chapters 1/2/16, stable progress IDs and attempts, correct teacher labels, resume links and account isolation.');
}
searchAndSyllabus().then(previousCatalogMigration).then(progressMigration).catch(error=>{console.error(error);process.exitCode=1;});
