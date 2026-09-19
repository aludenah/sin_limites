const assert=require('node:assert/strict');
const {harness}=require('./study-entry.test.cjs');
const {testChapters}=require('./practice-ten.test.cjs');
const files=['fisica-capitulo-01-data.js','fisica-capitulo-01.js'];
async function sourceContentAndResume(){
 const id='fisica-capitulo-01',record='users/student/progress/'+id;
 const local=new Map([['sin-limites:student:study-mode',JSON.stringify({mode:'free',updatedMs:1})],['sin-limites:student:'+id,JSON.stringify({progress:{contentVersion:4,currentItem:0,updatedMs:5}})]]);
 const cloud=new Map([[record,{currentItem:3,readingItem:3,updatedMs:10,practice10:{version:1,mastered:['p01'],attempts:{p01:2}}}]]);
 const h=harness(files,{local,cloud});await h.signIn({uid:'student'});
 assert.equal(h.run('LESSONS[P.currentItem].id'),'dim-homogeneidad','A newer legacy cloud bookmark is migrated before merging with the new local schema');
 assert.equal(h.run('progressPercent()'),10);assert.equal(h.run('P.practice10.attempts.p01'),2);
 assert.equal(cloud.get(record).chapterNumber,1);assert.equal(cloud.get(record).contentVersion,4);
 assert.equal(h.run('LESSONS.length'),7);assert.equal(h.run('LESSONS[0].id'),'dim-magnitudes');
 assert.equal(h.run("LESSONS.some(lesson=>['dim-fisica','dim-naturaleza'].includes(lesson.id))"),false);
 assert.equal(h.run('CONTENT.workedExamples.length'),25);
 for(let i=0;i<7;i++){h.run(`goLesson(${i})`);assert.ok(h.elements.get('chapter-app').innerHTML.includes(h.run(`LESSONS[${i}].title`)));}
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
 const local=new Map([['sin-limites:student:study-mode',JSON.stringify({mode:'free',updatedMs:1})],['sin-limites:student:'+id,JSON.stringify({progress:{contentVersion:4,currentItem:0,updatedMs:5}})]]);
 const cloud=new Map([[record,{contentVersion:2,currentItem:7,readingItem:8,updatedMs:10,practice10:{version:1,mastered:['p01'],attempts:{p01:2}}}]]);
 const h=harness(files,{local,cloud});await h.signIn({uid:'student'});
 assert.equal(h.run('P.currentItem'),5,'Version 2 bookmarks shift past both removed topics');
 assert.equal(h.run('LESSONS[P.currentItem].id'),'dim-homogeneidad');
 assert.equal(h.run('P.readingItem'),6);assert.equal(h.run('LESSONS[P.readingItem].id'),'dim-exponentes');
 assert.equal(h.run('progressPercent()'),10);assert.equal(h.run('P.practice10.attempts.p01'),2);
 assert.equal(cloud.get(record).contentVersion,4);
 assert.equal(h.run('normalized({contentVersion:2,currentItem:0,readingItem:0}).currentItem'),0,'The removed topic resumes at the new first topic');
 assert.equal(h.run('normalized({contentVersion:2,currentItem:3,readingItem:3}).currentItem'),2,'The second removed topic resumes at dimensions');
 await h.run('persist()');
 const restored=harness(files,{local,cloud});await restored.signIn({uid:'student'});
 assert.equal(restored.run('P.currentItem'),5);assert.equal(restored.run('P.readingItem'),6,'Migration is not repeated on subsequent visits');
 assert.equal(restored.run('progressPercent()'),10);
 console.log('PASS: removed-topic bookmarks migrate once and preserve practice achievements.');
}
async function thirdTopicMigration(){
 const id='fisica-capitulo-01',record='users/student/progress/'+id,key='sin-limites:student:'+id;
 const expected=['dim-magnitudes','dim-si','dim-dimensiones','dim-dimensiones','dim-deducciones','dim-reglas','dim-homogeneidad','dim-exponentes'];
 const clone=value=>JSON.parse(JSON.stringify(value));
 for(const source of ['local','cloud'])for(let index=0;index<expected.length;index++){
  const readingIndex=expected.length-1-index;
  const progress={contentVersion:3,currentItem:index,readingItem:readingIndex,activeTab:'theory',updatedMs:10,
   practice10:{version:1,mastered:['p01'],attempts:{p01:3}},examBest:8,examAttempts:2,itemScores:{item_4:7}};
  const local=new Map([['sin-limites:student:study-mode',JSON.stringify({mode:'free',updatedMs:1})]]);
  const cloud=new Map();
  if(source==='local')local.set(key,JSON.stringify({progress,pending:true}));else cloud.set(record,progress);
  const h=harness(files,{local,cloud});await h.signIn({uid:'student'});
  const label=`${source} version 3 bookmark ${index}`;
  assert.equal(h.run('LESSONS[P.currentItem].id'),expected[index],label);
  assert.equal(h.run('LESSONS[P.readingItem].id'),expected[readingIndex],label+' keeps the independent reading bookmark');
  assert.equal(h.run('P.contentVersion'),4);
  assert.equal(h.run('progressPercent()'),10,label+' preserves mastery');
  assert.equal(h.run('P.practice10.attempts.p01'),3);
  assert.equal(h.run('P.examBest'),8);assert.equal(h.run('P.examAttempts'),2);
  assert.deepEqual(clone(h.run('P.itemScores')),{item_4:7});
  assert.doesNotMatch(h.elements.get('chapter-app').innerHTML,/data-index="7"/,'The menu contains seven topics');
  await h.run('persist()');
  const saved=JSON.parse(local.get(key)).progress,remote=cloud.get(record);
  for(const copy of [saved,remote]){
   assert.equal(copy.contentVersion,4);assert.equal(copy.currentItem,h.run('P.currentItem'));
   assert.equal(copy.readingItem,h.run('P.readingItem'));assert.equal(copy.examBest,8);
  }
  const normalized=clone(h.run('normalized(P)'));
  assert.equal(normalized.currentItem,saved.currentItem,'Version 4 normalization is idempotent');
  assert.equal(normalized.readingItem,saved.readingItem);
  const reopened=harness(files,{local,cloud});await reopened.signIn({uid:'student'});
  assert.equal(reopened.run('LESSONS[P.currentItem].id'),expected[index],label+' survives reopening');
  assert.equal(reopened.run('LESSONS[P.readingItem].id'),expected[readingIndex]);
  assert.equal(reopened.run('P.examBest'),8);assert.equal(reopened.run('P.practice10.attempts.p01'),3);
 }
 const h=harness(files);
 const legacy=['dim-magnitudes','dim-dimensiones','dim-reglas','dim-homogeneidad','dim-homogeneidad','dim-exponentes'];
 for(let index=0;index<legacy.length;index++)for(const version of ['', 'contentVersion:1,']){
  assert.equal(h.run(`LESSONS[normalized({${version}currentItem:${index}}).currentItem].id`),legacy[index]);
 }
 for(const version of [4,5])for(let index=0;index<7;index++){
  assert.equal(h.run(`normalized({contentVersion:${version},currentItem:${index}}).currentItem`),index);
 }
 console.log('PASS: all version 3 local/cloud bookmarks migrate once, the deleted topic resumes at dimensions, and grades and legacy bookmarks survive.');
}
sourceContentAndResume().then(removedLessonMigration).then(thirdTopicMigration).then(()=>testChapters(['fisica-capitulo-01'])).catch(error=>{console.error(error);process.exitCode=1;});
