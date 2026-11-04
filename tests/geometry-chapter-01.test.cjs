'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const {harness}=require('./study-entry.test.cjs');
const root=path.join(__dirname,'..'),files=['geometria-capitulo-01-practice.js','geometria-capitulo-01-data.js','chapter-learning-goals.js','geometria-capitulo-01.js'];
const plain=(h,e)=>JSON.parse(h.run('JSON.stringify('+e+')'));
async function main(){
 for(const mode of ['free','progressive']){
  const h=harness(files);h.run(`window.StudyMode.choose('geo-student','${mode}')`);await h.signIn({uid:'geo-student'});
  assert.equal(h.run('CONTENT.title'),'Segmentos y ángulos');assert.equal(h.run('LESSONS.length'),8);assert.equal(h.run('CONTENT.workedExamples.length'),4);
  const data=plain(h,'CONTENT'),practice=plain(h,'window.ChapterPractice.questions(CHAPTER_ID)');assert.deepEqual(data.proposed.map(q=>q.number),Array.from({length:35},(_,i)=>i+1));
  assert.equal(data.proposed.filter(q=>q.level==='Básico').length,17);assert.equal(data.proposed.filter(q=>q.level==='Intermedio').length,18);assert.equal(practice.length,10);
  assert.deepEqual(data.proposed.filter(q=>q.reviewNote).map(q=>q.number),[10,11]);assert.ok(practice.every(q=>![10,11].includes(q.sourceNumber)));
  assert.equal(h.run('P.activeTab'),'intro');let html=h.elements.get('chapter-app').innerHTML;assert.equal((html.match(/id="learning-goals"/g)||[]).length,1);assert.ok(html.indexOf('data-action="intro"')<html.indexOf('data-index="0"'));
  for(let i=0;i<8;i++){h.run('goLesson('+i+')');html=h.elements.get('chapter-app').innerHTML;assert.ok(html.includes(data.lessons[i].title));assert.doesNotMatch(html,/id="learning-goals"/);}
  h.run("goTab('examples')");html=h.elements.get('chapter-app').innerHTML;assert.equal((html.match(/class="example worked-example"/g)||[]).length,4);assert.match(html,/Ver solución paso a paso/);
  h.run("goTab('proposed')");html=h.elements.get('chapter-app').innerHTML;assert.equal((html.match(/class="geometry-proposed"/g)||[]).length,35);assert.equal((html.match(/geometry-review-note/g)||[]).length,2);
  h.run("goTab('practice')");
  for(const q of practice){h.run(`window.ChapterPractice.choose(CHAPTER_ID,P.practice10,'${q.id}',${q.answer},P.studyMode);checkPractice('${q.id}')`);}
  assert.equal(h.run('progressPercent()'),100);await h.run('saveChain');const record=h.cloud.get('users/geo-student/progress/geometria-capitulo-01');assert.equal(record.courseId,4);assert.equal(record.chapterNumber,1);assert.equal(record.topicIndex,0);assert.equal(record.practiceCompleted,10);
  h.run('goIntro()');assert.equal(h.run('progressPercent()'),100);const before=h.run('P.currentItem');h.run("window.location.hash='#segmentos-y-punto-medio';applyAnchor()");assert.equal(h.run('P.currentItem'),2);assert.equal(h.run('P.activeTab'),'theory');
  h.run("window.location.hash='#geometria-propuesto-35';applyAnchor()");assert.equal(h.run('P.activeTab'),'proposed');h.run("window.location.hash='#learning-goals';applyAnchor()");assert.equal(h.run('P.activeTab'),'intro');assert.equal(h.run('P.currentItem'),2);
  const images=[...data.lessons.flatMap(l=>l.visuals),...Object.values(data.inlineFigures),...data.workedExamples.map(q=>q.figure),...data.proposed.map(q=>q.figure).filter(Boolean)];
  assert.equal(new Set(images.map(f=>f.src)).size,22);
  for(const f of images){assert.ok(fs.existsSync(path.join(root,f.src)),f.src);const svg=fs.readFileSync(path.join(root,f.src),'utf8');assert.match(svg,/<svg[^>]*viewBox="0 0 600 /);assert.doesNotMatch(svg,/<image|<script/);}
  await h.signIn({uid:'other'});assert.equal(h.run('P.practice10.mastered.length'),0,'Accounts remain isolated');
 }
 const source=fs.readFileSync(path.join(root,'geometria-capitulo-01.js'),'utf8');assert.match(source,/requestFullscreen/);assert.match(source,/courseId:4,courseName:'Geometría',chapterNumber:1,topicIndex:0/);
 const c={window:{}};vm.runInNewContext(fs.readFileSync(path.join(root,'courses.js'),'utf8'),c);vm.runInNewContext(fs.readFileSync(path.join(root,'geometria-catalog.js'),'utf8'),c);assert.equal(c.window.COURSES.find(c=>c.id===4).topics[0],'Segmentos y ángulos');assert.deepEqual(Array.from(c.window.GEOMETRY_CHAPTERS,c=>c.number),[1,17]);
 // Independent arithmetic checks for the ten assessed choices.
 const expected=[12,270/9,2*((24+6)/3),4*(14/7),5/3,59,48/2,2*(140-90),6*(50/2),90-23];
 const c2={window:{}};vm.runInNewContext(fs.readFileSync(path.join(root,'geometria-capitulo-01-practice.js'),'utf8'),c2);const qs=c2.window.CHAPTER_PRACTICES['geometria-capitulo-01'].problems;
 qs.forEach((q,i)=>{const option=q.options[q.answer].replace(/\\\(|\\\)|\\circ/g,'');if(i===4)assert.match(option,/\\frac53/);else assert.equal(parseFloat(option),expected[i]);});
 console.log('PASS: complete PDF structure (8 topics,4 worked,35 proposed), independent intro,22 SVGs,10 verified questions, account isolation and synchronized progress.');
}
main().catch(error=>{console.error(error);process.exitCode=1;});
