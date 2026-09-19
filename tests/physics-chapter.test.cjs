const assert=require('node:assert/strict');
const {harness}=require('./study-entry.test.cjs');
const {testChapters}=require('./practice-ten.test.cjs');
const files=['fisica-capitulo-01-data.js','fisica-capitulo-01.js'];
async function sourceContentAndResume(){
 const id='fisica-capitulo-01',record='users/student/progress/'+id;
 const local=new Map([['sin-limites:student:study-mode',JSON.stringify({mode:'free',updatedMs:1})],['sin-limites:student:'+id,JSON.stringify({progress:{contentVersion:2,currentItem:0,updatedMs:5}})]]);
 const cloud=new Map([[record,{currentItem:3,readingItem:3,updatedMs:10,practice10:{version:1,mastered:['p01'],attempts:{p01:2}}}]]);
 const h=harness(files,{local,cloud});await h.signIn({uid:'student'});
 assert.equal(h.run('LESSONS[P.currentItem].id'),'dim-homogeneidad','A newer legacy cloud bookmark is migrated before merging with the new local schema');
 assert.equal(h.run('progressPercent()'),10);assert.equal(h.run('P.practice10.attempts.p01'),2);
 assert.equal(cloud.get(record).chapterNumber,1);assert.equal(cloud.get(record).contentVersion,2);
 assert.equal(h.run('LESSONS.length'),9);assert.equal(h.run('CONTENT.workedExamples.length'),25);
 for(let i=0;i<9;i++){h.run(`goLesson(${i})`);assert.ok(h.elements.get('chapter-app').innerHTML.includes(h.run(`LESSONS[${i}].title`)));}
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
sourceContentAndResume().then(()=>testChapters(['fisica-capitulo-01'])).catch(error=>{console.error(error);process.exitCode=1;});
