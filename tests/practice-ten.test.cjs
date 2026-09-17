const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const {harness}=require('./study-entry.test.cjs');
const root=path.join(__dirname,'..');
const chapters=[
 ...[1,2,3,4,5,6].map(n=>({id:`historia-del-peru-capitulo-0${n}`,files:['peru-catalog.js','history-progress.js',`historia-del-peru-capitulo-0${n}-data.js`,'history-chapter.js'],number:n,course:11})),
 ...[1,2].map(n=>({id:`fisica-capitulo-0${n}`,files:[`fisica-capitulo-0${n}-data.js`,`fisica-capitulo-0${n}.js`],number:n,course:16})),
 {id:'historia-universal-presentacion-01',files:['historia-universal-capitulo-01-content.js','history-reading.js'],number:1,course:12,reading:true},
 ...[2,3,4,5,6].map(n=>({id:`historia-universal-pdf-0${n}`,files:['history-catalog.js','history-progress.js',`historia-universal-capitulo-0${n}-data.js`,'history-chapter.js'],number:n,course:12}))
];
function sourceProgress(q){const s=q.source||{},p={updatedMs:50,examBest:8};if(!q.source)p.practice10={version:1,answers:{[q.id]:q.answer},results:{[q.id]:q.answer},mastered:[q.id],attempts:{[q.id]:1}};if(s.kind==='practice'){p.practiceAnswers={[s.id]:q.answer};p.practiceResults={[s.id]:q.answer};p.practiceMastered=[s.id];}if(s.kind==='reading'){p.answers={[s.id]:q.answer};p.results={[s.id]:q.answer};p.completedItems=[s.index];p.currentSlide=14;}if(s.kind==='quiz'){p.quizAnswers={[s.lesson]:{[s.id]:q.answer}};p.quizResults={[s.lesson]:{[s.id]:q.answer}};}return p;}
async function testChapters(ids=chapters.map(c=>c.id)){
 for(const chapter of chapters.filter(c=>ids.includes(c.id))){
  const cloud=new Map(),local=new Map(),h=harness(chapter.files,{cloud,local}),run=h.run;
  const qs=JSON.parse(run(`JSON.stringify(window.ChapterPractice.questions('${chapter.id}'))`));
  assert.equal(qs.length,10);assert.equal(new Set(qs.map(q=>q.id)).size,10);assert.equal(new Set(qs.map(q=>q.prompt)).size,10);
  for(const q of qs){assert.equal(q.options.length,5);assert.equal(new Set(q.options).size,5);assert.ok(Number.isInteger(q.answer)&&q.answer>=0&&q.answer<5);assert.ok(q.solution.length>20);}
  cloud.set('users/previous/progress/'+chapter.id,sourceProgress(qs[0]));
  run("window.StudyMode.choose('previous','progressive')");await h.signIn({uid:'previous'});
  assert.equal(run("P.practice10.mastered.includes('p01')"),true,'Equivalent previous success retained');assert.equal(run('P.examBest'),8,'Historical grade retained');
  run("window.StudyMode.choose('student','progressive')");await h.signIn({uid:'student'});
  assert.equal(run('P.practice10.mastered.length'),0,'Account isolation');
  const html=h.elements.get(chapter.reading?'reading-app':'chapter-app').innerHTML;
  assert.doesNotMatch(html,/Evaluación:|Enviar evaluación|Dos preguntas|32 preguntas|data-action="check-quiz"|id="study-mode"/);
  if(!chapter.reading){run("goLesson(LESSONS.length-1);goTab('practice')");assert.equal(run('P.currentItem'),run('LESSONS.length-1'),'Theory freely readable');}
  const check=id=>run(`${chapter.reading?'checkAnswer':'checkPractice'}('${id}')`);
  const choose=(i,value=qs[i].answer)=>run(`window.ChapterPractice.choose('${chapter.id}',P.practice10,'${qs[i].id}',${value},P.studyMode)`);
  check('p01');assert.equal(run('P.practice10.attempts.p01'),0,'Empty answers cannot be graded');
  assert.equal(choose(1),false,'A locked problem cannot be answered');check('p02');assert.equal(run('P.practice10.attempts.p02'),0);
  choose(0,(qs[0].answer+1)%5);check('p01');assert.equal(run('P.practice10.mastered.length'),0);assert.equal(run('P.practice10.attempts.p01'),1);
  check('p01');assert.equal(run('P.practice10.attempts.p01'),1,'Duplicate submits do not add attempts');
  run("window.StudyMode.choose('student','free');refreshStudyMode()");choose(9);check('p10');assert.equal(run("P.practice10.mastered.includes('p10')"),true);
  run("window.StudyMode.choose('student','progressive');refreshStudyMode()");assert.equal(choose(1),false,'Later achievements do not bypass earlier gaps');
  for(let i=0;i<9;i++){assert.equal(choose(i),true);check(qs[i].id);}
  assert.equal(run('P.practice10.mastered.length'),10);assert.equal(run(chapter.reading?'percent()':'progressPercent()'),100);
  choose(0,(qs[0].answer+1)%5);check('p01');assert.equal(run('P.practice10.mastered.length'),10,'Success retained on retry');
  await run('persist()');const saved=cloud.get('users/student/progress/'+chapter.id);assert.equal(saved.assessmentFormat,'practice-10');assert.equal(saved.practiceTotal,10);assert.equal(saved.practiceCompleted,10);assert.equal(saved.percent,100);assert.equal(saved.chapterCompleted,true);assert.equal(saved.courseId,chapter.course);assert.equal(saved.chapterNumber,chapter.number);
  await h.signIn({uid:'student'});assert.equal(run('P.practice10.mastered.length'),10,'Reload retains progress');
  run("window.StudyMode.choose('offline','free')");h.setOffline(true);await h.signIn({uid:'offline'});if(!chapter.reading)run("goTab('practice')");choose(0);check('p01');assert.equal(JSON.parse(local.get('sin-limites:offline:'+chapter.id)).progress.practice10.mastered.length,1);
  h.setOffline(false);await run('retrySync()');assert.equal(cloud.get('users/offline/progress/'+chapter.id).practiceCompleted,1);
  await h.signIn(null);assert.equal(run('P.practice10.mastered.length'),0);
 }
 console.log('PASS: '+ids.length+' chapters, exactly 10 problems, existing achievements, free/progressive practice, grading, retries, reload, offline recovery and account isolation.');
}
function testModel(){
 const c={window:{}};for(const f of ['practice-bank.js','chapter-practice.js','history-catalog.js','history-progress.js'])vm.runInNewContext(fs.readFileSync(path.join(root,f),'utf8'),c);
 const cp=c.window.ChapterPractice,id='fisica-capitulo-01',qs=cp.questions(id);
 const a={updatedMs:10,practice10:{version:1,answers:{p01:qs[0].answer},results:{p01:qs[0].answer},mastered:['p01'],attempts:{p01:2}}};
 const b={updatedMs:20,practice10:{version:1,answers:{p02:qs[1].answer},results:{p02:qs[1].answer},mastered:['p02'],attempts:{p02:1}}};
 const m=cp.merge(id,a,b);assert.equal(cp.summary(id,m).practiceCompleted,2);assert.equal(m.practice10.attempts.p01,2);
 const bad=cp.normalize(id,{practice10:{version:1,answers:{p01:999,p02:'1'},results:{p01:-1},mastered:['bogus','p01','p01'],attempts:{p01:-9}}});assert.equal(Object.keys(bad.answers).length,0);assert.equal(bad.mastered.length,1);assert.equal(bad.attempts.p01,0);
 const meta=c.window.HISTORY_CHAPTERS.find(x=>x.number===2);const migrated=c.window.HistoryProgress.combine(meta,{}, {'historia-universal-capitulo-03':{completedItems:[0],updatedMs:4}});assert.equal(migrated.practiceCompleted,2);assert.equal(migrated.percent,20);
 const meta3=c.window.HISTORY_CHAPTERS.find(x=>x.number===3),projected=c.window.HistoryProgress.combine(meta3,{}, {'historia-universal-capitulo-05':{completedItems:[0,1],updatedMs:4}});assert.equal(projected.practiceCompleted,2,'Older split chapters migrate to their equivalent problems');
 console.log('PASS: merge across devices, malformed records, and prior curriculum migration.');
}
module.exports={chapters,testChapters,testModel};
if(require.main===module){testModel();testChapters().catch(e=>{console.error(e);process.exitCode=1});}
