const assert=require('node:assert/strict');
const {harness}=require('./study-entry.test.cjs');
const {testChapters}=require('./practice-ten.test.cjs');
const files=['fisica-capitulo-01-data.js','fisica-capitulo-01-deducciones-figuras.js','fisica-capitulo-01-geometria.js','fisica-capitulo-01-constantes.js','fisica-capitulo-01.js'];
const lessonIds=['dim-magnitudes','dim-si','dim-dimensiones','dim-homogeneidad','dim-exponentes'];
const clone=value=>JSON.parse(JSON.stringify(value));
async function sourceContentAndResume(){
 const id='fisica-capitulo-01',record='users/student/progress/'+id;
 const local=new Map([['sin-limites:student:study-mode',JSON.stringify({mode:'free',updatedMs:1})],['sin-limites:student:'+id,JSON.stringify({progress:{contentVersion:5,currentItem:0,updatedMs:5}})]]);
 const cloud=new Map([[record,{currentItem:3,readingItem:3,updatedMs:10,practice10:{version:1,mastered:['p01'],attempts:{p01:2}}}]]);
 const h=harness(files,{local,cloud});await h.signIn({uid:'student'});
 assert.equal(h.run('LESSONS[P.currentItem].id'),'dim-homogeneidad','A newer legacy cloud bookmark is migrated before merging with the new local schema');
 assert.equal(h.run('progressPercent()'),10);assert.equal(h.run('P.practice10.attempts.p01'),2);
 assert.equal(cloud.get(record).chapterNumber,1);assert.equal(cloud.get(record).contentVersion,5);
 assert.deepEqual(clone(h.run('LESSONS.map(lesson=>lesson.id)')),lessonIds);
 assert.equal(h.run("LESSONS.some(lesson=>['dim-fisica','dim-naturaleza'].includes(lesson.id))"),false);
 assert.equal(h.run('CONTENT.workedExamples.length'),25);
 for(let i=0;i<5;i++){
  h.run(`goLesson(${i})`);const rendered=h.elements.get('chapter-app').innerHTML;
  assert.ok(rendered.includes(h.run(`LESSONS[${i}].title`)));
  assert.match(rendered,new RegExp(`Tema ${i+1} de 5`));
 }
 h.run("goTab('examples')");const html=h.elements.get('chapter-app').innerHTML;
 assert.equal((html.match(/class="example worked-example"/g)||[]).length,25);
 assert.equal((html.match(/Ver solución paso a paso/g)||[]).length,25);
 assert.doesNotMatch(html,/<details\s+open/,'Worked solutions stay collapsed until the student opens them');
 await h.run('persist()');
 const restored=harness(files,{local,cloud});await restored.signIn({uid:'student'});
 assert.equal(restored.run('P.activeTab'),'examples');assert.equal(restored.run('LESSONS[P.currentItem].id'),'dim-exponentes');
 assert.equal(restored.run('progressPercent()'),10,'Reading solved problems does not award practice mastery');
 console.log('PASS: source theory and solved-problem access, legacy reading migration, stable bookmarks and unchanged achievements.');
}
async function removedLessonMigration(){
 const id='fisica-capitulo-01',record='users/student/progress/'+id;
 const local=new Map([['sin-limites:student:study-mode',JSON.stringify({mode:'free',updatedMs:1})],['sin-limites:student:'+id,JSON.stringify({progress:{contentVersion:5,currentItem:0,updatedMs:5}})]]);
 const cloud=new Map([[record,{contentVersion:2,currentItem:7,readingItem:8,updatedMs:10,practice10:{version:1,mastered:['p01'],attempts:{p01:2}}}]]);
 const h=harness(files,{local,cloud});await h.signIn({uid:'student'});
 assert.equal(h.run('P.currentItem'),3,'Version 2 bookmarks shift past removed and merged topics');
 assert.equal(h.run('LESSONS[P.currentItem].id'),'dim-homogeneidad');
 assert.equal(h.run('P.readingItem'),4);assert.equal(h.run('LESSONS[P.readingItem].id'),'dim-exponentes');
 assert.equal(h.run('progressPercent()'),10);assert.equal(h.run('P.practice10.attempts.p01'),2);
 assert.equal(cloud.get(record).contentVersion,5);
 assert.equal(h.run('normalized({contentVersion:2,currentItem:0,readingItem:0}).currentItem'),0,'The removed topic resumes at the new first topic');
 assert.equal(h.run('normalized({contentVersion:2,currentItem:3,readingItem:3}).currentItem'),2,'The second removed topic resumes at dimensions');
 await h.run('persist()');
 const restored=harness(files,{local,cloud});await restored.signIn({uid:'student'});
 assert.equal(restored.run('P.currentItem'),3);assert.equal(restored.run('P.readingItem'),4,'Migration is not repeated on subsequent visits');
 assert.equal(restored.run('progressPercent()'),10);
 console.log('PASS: removed-topic bookmarks migrate once and preserve practice achievements.');
}
async function mergedTopicMigration(){
 const id='fisica-capitulo-01',record='users/student/progress/'+id,key='sin-limites:student:'+id;
 const previousVersions={2:[0,0,1,2,2,2,2,3,4],3:[0,1,2,2,2,2,3,4],4:[0,1,2,2,2,3,4]};
 for(const [version,mappedIndexes] of Object.entries(previousVersions))for(const source of ['local','cloud'])for(let index=0;index<mappedIndexes.length;index++){
  const expected=mappedIndexes.map(i=>lessonIds[i]);
  const readingIndex=expected.length-1-index;
  const progress={contentVersion:Number(version),currentItem:index,readingItem:readingIndex,activeTab:'theory',updatedMs:10,
   practice10:{version:1,mastered:['p01'],attempts:{p01:3}},examBest:8,examAttempts:2,itemScores:{item_4:7}};
  const local=new Map([['sin-limites:student:study-mode',JSON.stringify({mode:'free',updatedMs:1})]]);
  const cloud=new Map();
  if(source==='local')local.set(key,JSON.stringify({progress,pending:true}));else cloud.set(record,progress);
  const h=harness(files,{local,cloud});await h.signIn({uid:'student'});
  const label=`${source} version ${version} bookmark ${index}`;
  assert.equal(h.run('LESSONS[P.currentItem].id'),expected[index],label);
  assert.equal(h.run('LESSONS[P.readingItem].id'),expected[readingIndex],label+' keeps the independent reading bookmark');
  assert.equal(h.run('P.contentVersion'),5);
  assert.equal(h.run('progressPercent()'),10,label+' preserves mastery');
  assert.equal(h.run('P.practice10.attempts.p01'),3);
  assert.equal(h.run('P.examBest'),8);assert.equal(h.run('P.examAttempts'),2);
  assert.deepEqual(clone(h.run('P.itemScores')),{item_4:7});
  const menu=h.elements.get('chapter-app').innerHTML.match(/<nav class="route"[^>]*>([\s\S]*?)<\/nav>/)[1];
  assert.deepEqual([...menu.matchAll(/data-index="(\d+)"/g)].map(m=>Number(m[1])),[0,1,2,3,4],'The menu contains five topics');
  await h.run('persist()');
  const saved=JSON.parse(local.get(key)).progress,remote=cloud.get(record);
  for(const copy of [saved,remote]){
   assert.equal(copy.contentVersion,5);assert.equal(copy.currentItem,h.run('P.currentItem'));
   assert.equal(copy.readingItem,h.run('P.readingItem'));assert.equal(copy.examBest,8);
  }
  const normalized=clone(h.run('normalized(P)'));
  assert.equal(normalized.currentItem,saved.currentItem,'Version 5 normalization is idempotent');
  assert.equal(normalized.readingItem,saved.readingItem);
  const reopened=harness(files,{local,cloud});await reopened.signIn({uid:'student'});
  assert.equal(reopened.run('LESSONS[P.currentItem].id'),expected[index],label+' survives reopening');
  assert.equal(reopened.run('LESSONS[P.readingItem].id'),expected[readingIndex]);
  assert.equal(reopened.run('P.examBest'),8);assert.equal(reopened.run('P.practice10.attempts.p01'),3);
 }
 const h=harness(files);
 const legacy=['dim-magnitudes','dim-dimensiones','dim-dimensiones','dim-homogeneidad','dim-homogeneidad','dim-exponentes'];
 for(let index=0;index<legacy.length;index++)for(const version of ['', 'contentVersion:1,']){
  assert.equal(h.run(`LESSONS[normalized({${version}currentItem:${index}}).currentItem].id`),legacy[index]);
 }
 for(const version of [5,6])for(let index=0;index<5;index++){
  assert.equal(h.run(`normalized({contentVersion:${version},currentItem:${index}}).currentItem`),index);
 }
 console.log('PASS: version 2–4 local/cloud bookmarks migrate once into five topics; reading, grades, practice and older bookmarks survive.');
}
async function mergedContent(){
 const h=harness(files);h.run("window.StudyMode.choose('student','free')");await h.signIn({uid:'student'});h.run('goLesson(2)');
 const merged=clone(h.run('LESSONS[2]')),rendered=h.elements.get('chapter-app').innerHTML;
 assert.equal(merged.title,'Análisis dimensional: deducciones y reglas');
 assert.doesNotMatch(rendered,/Tabla de consulta interactiva|id="dimension-explorer"|data-dimension-explorer/);
 assert.deepEqual(merged.sections.map(s=>s.id),['dim-deducciones','dim-reglas']);
 assert.deepEqual(merged.sections.map(s=>s.examples.length),[1,1],'One block per group remains');
 assert.deepEqual(merged.sections[0].examples.map(example=>example.interactive),['physical-constants'],'The three physical constants share one interactive walkthrough');
 assert.deepEqual(merged.sections[1].examples.map(example=>example.interactive),['dimension-one'],'The rules section groups the three dimension-one examples');
 assert.doesNotMatch(rendered,/Aplicación 6\. Once magnitudes derivadas|Ejemplo complementario\. Impulso y cantidad de movimiento|Las siguientes once deducciones/,'The two removed cards and their introductory reference are absent');
 for(const title of ['Constantes físicas: de menor a mayor dificultad','Dimensión uno: de menor a mayor dificultad'])assert.ok(rendered.includes(title),'The constants and dimension-one groups are available');
 assert.equal((rendered.match(/id="constant-derivation-physical-constants"/g)||[]).length,1,'The constants block is mounted only once');
 assert.equal((rendered.match(/id="constant-derivation-dimension-one"/g)||[]).length,1,'The dimension-one block is mounted only once');
 assert.doesNotMatch(rendered,/id="constant-derivation-(?:spring|gravity-planck|friction|sine)"|Ejemplo complementario\. Constante de un resorte|Ejemplo complementario\. Gravitación y constante de Planck|Dimensión uno: coeficiente de rozamiento|Dimensión uno: una función seno/,'The previous separate example blocks are removed');
 assert.deepEqual([...rendered.matchAll(/data-constant="([^"]+)"/g)].map(match=>match[1]),['spring','planck','gravity','friction','sine','exponential'],'Both groups are ordered from least to most difficult');
 assert.doesNotMatch(rendered,/Aplicación 7\. Una expresión con presión y área|Ejemplo complementario\. Productos y cocientes/,'The previous rule examples no longer appear in theory');
 assert.match(merged.body,/siete magnitudes fundamentales del SI/);
 assert.doesNotMatch(rendered,/La dimensión no depende de la unidad elegida|La longitud puede expresarse en metros|Una ecuación dimensional describe una propiedad|Compartir dimensión no significa ser la misma magnitud|Deducción de dimensiones/,'The highlighted block and the deductions heading are removed');
 assert.equal(merged.sections[0].title,'','The deductions section keeps its content without a heading');
 assert.match(merged.sections[0].body,/Para deducir una dimensión/);
 const rules=merged.sections[1].body;
 assert.match(rules,/class="table-scroll dimensional-rules"/,'The dimensional rules use a static reference table');
 const tableHead=rules.match(/<thead>([\s\S]*?)<\/thead>/)?.[1],tableBody=rules.match(/<tbody>([\s\S]*?)<\/tbody>/)?.[1];
 assert.ok(tableHead&&tableBody,'The table separates column headings and rule rows');
 assert.deepEqual([...tableHead.matchAll(/<th\b[^>]*scope="col"[^>]*>(.*?)<\/th>/g)].map(match=>match[1]),['Regla','Expresión']);
 assert.equal((tableBody.match(/<tr\b/g)||[]).length,6,'The summary has six rules');
 assert.deepEqual([...tableBody.matchAll(/<th\b[^>]*scope="row"[^>]*>(.*?)<\/th>/g)].map(match=>match[1]),['Suma y resta','Multiplicación','División','Potencias y raíces','Número','Funciones matemáticas']);
 assert.doesNotMatch(rules,/<(?:button|input|select)\b/,'The rules table has no interactive controls');
 let lastPosition=rendered.indexOf('Para deducir una dimensión');
 assert.ok(lastPosition>rendered.indexOf('siete magnitudes fundamentales del SI'),'Deductions follow the original introduction');
 for(const section of merged.sections){
  if(section.title){
   assert.ok([...rendered.matchAll(/<h3\b[^>]*>(.*?)<\/h3>/g)].some(match=>match[1]===section.title),'Named sections retain their headings');
  }else{
   assert.doesNotMatch(rendered,new RegExp('(?:id|aria-labelledby)="section-'+section.id+'"|<h3\\b[^>]*>\\s*</h3>'),'An untitled section has no empty heading or dangling heading reference');
  }
  assert.ok(rendered.includes(h.run(`lessonBody(LESSONS[2].sections[${merged.sections.indexOf(section)}])`)),'All theory paragraphs and replacement activities are rendered');
  for(const example of section.examples){
   const position=rendered.indexOf(example.title);assert.ok(position>lastPosition,'Examples retain the source order');lastPosition=position;
   assert.ok(rendered.includes(example.question));
   if(example.interactive){
    assert.match(rendered,new RegExp('id="constant-derivation-'+example.interactive+'"'),'Each example has an independent interactive card');
    assert.ok(example.steps.some(step=>!rendered.includes(step)),'The complete solution is not exposed before advancing');
   }else{
    for(const step of example.steps)assert.ok(rendered.includes(step),'The other examples preserve their solution steps');
   }
  }
 }
 assert.doesNotMatch(rendered,/magnitudes-derivadas\.svg/,'The old derived-magnitudes image is removed');
 assert.match(rendered,/id="geometry-derivation"/,'The area and volume step-by-step activity replaces it');
 assert.deepEqual([...rendered.matchAll(/data-action="geometry-derivation-select" data-shape="([^"]+)"/g)].map(match=>match[1]),['area','volume','density','velocity','acceleration','force'],'All six interactive derivations remain');
 assert.ok(rendered.indexOf('id="geometry-derivation"')<rendered.indexOf(merged.sections[0].examples[0].title),'The interactive derivation appears before the existing examples');
 assert.ok(rendered.indexOf('Recarga la página para abrir el juego de dimensiones.')>lastPosition,'The dimension activity follows the merged content');
 const before=h.run('P.currentItem');h.run('goLesson(5)');assert.equal(h.run('P.currentItem'),before,'Removed menu positions cannot be opened');
 h.run('goLesson(3)');assert.equal(h.run('LESSONS[P.currentItem].id'),'dim-homogeneidad');
 assert.match(h.elements.get('chapter-app').innerHTML,/id="constant-derivation-homogeneity"/,'The homogeneity examples share an interactive block on topic 4');
 assert.doesNotMatch(h.elements.get('chapter-app').innerHTML,/homogeneidad\.svg|id="power-slider"|Explora una fórmula/,'The previous homogeneity picture and formula game are removed');
 console.log('PASS: merged dimensions, deductions and rules retain two groups with three ordered examples each, six interactive derivations, activity order and five-topic navigation.');
}
sourceContentAndResume().then(removedLessonMigration).then(mergedTopicMigration).then(mergedContent).then(()=>testChapters(['fisica-capitulo-01'])).catch(error=>{console.error(error);process.exitCode=1;});
