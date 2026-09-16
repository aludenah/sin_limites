const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');

function harness(){
  const elements=new Map(),local=new Map(),cloud=new Map();
  let offline=false,writes=0;
  const element=()=>({innerHTML:'',textContent:'',hidden:false,dataset:{},classList:{toggle(){}},addEventListener(){},scrollIntoView(){}});
  const document={getElementById(id){if(!elements.has(id))elements.set(id,element());return elements.get(id);},querySelector(){return element();}};
  const record=key=>({async get(){if(offline)throw Error('offline');return {exists:cloud.has(key),data:()=>cloud.get(key)};},async set(data){if(offline)throw Error('offline');cloud.set(key,structuredClone(data));writes++;}});
  const db={collection:()=>({doc:uid=>({collection:()=>({doc:id=>record(uid+'/'+id)})})})};
  const firestore=Object.assign(()=>db,{FieldValue:{serverTimestamp:()=>123}});
  const context=vm.createContext({document,window:{addEventListener(){}},firebase:{initializeApp(){},firestore,auth:()=>({onAuthStateChanged(){}})},localStorage:{getItem:k=>local.get(k)||null,setItem:(k,v)=>local.set(k,v)},console:{error(){}},setTimeout:()=>1,clearTimeout(){}});
  context.window.firebase=context.firebase;
  for(const name of ['fisica-capitulo-02-data.js','fisica-capitulo-02.js'])vm.runInContext(fs.readFileSync(path.join(__dirname,'..',name),'utf8'),context);
  const run=s=>vm.runInContext(s,context);
  return {run,cloud,local,elements,setOffline:x=>offline=x,writes:()=>writes};
}

async function test(){
  const h=harness(),run=h.run;
  h.cloud.set('student/fisica-capitulo-01',{chapterNumber:1,percent:43});
  h.local.set('sin-limites:student:fisica-capitulo-01',JSON.stringify({progress:{percent:43}}));
  for(const [input,expected] of [
    [[4,0,0,3],[4,3,5]], [[-4,0,0,3],[-4,3,5]],
    [[-4,0,0,-3],[-4,-3,5]], [[4,0,0,-3],[4,-3,5]],
    [[4,3,-4,-3],[0,0,0]], [[0,2,0,3],[0,5,5]]
  ]){
    const r=JSON.parse(run('JSON.stringify(vectorResult('+input.join(',')+'))'));
    assert.deepEqual([r.x,r.y,r.magnitude],expected);
    if(r.magnitude===0)assert.equal(r.angle,null);
    else {assert.ok(r.angle>=0&&r.angle<360);assert.ok(Math.abs(Math.cos(r.angle*Math.PI/180)*r.magnitude-r.x)<1e-9);assert.ok(Math.abs(Math.sin(r.angle*Math.PI/180)*r.magnitude-r.y)<1e-9);}
  }
  await run('signedIn({uid:"student"})');
  assert.match(h.elements.get('chapter-app').innerHTML,/Estudio progresivo/);
  run("chooseMode('progressive')");await run('saveChain');
  assert.equal(run('canOpen(1)'),false);
  run("goLesson(5);goTab('exam')");
  assert.equal(run('P.currentItem'),0);
  assert.equal(run('P.activeTab'),'theory');
  run('checkQuiz()');
  assert.equal(run('P.completedItems.length'),0);
  assert.equal(run('P.attempts.item_1'),undefined);
  run('P.quizAnswers[0]={u1a:0,u1b:0};checkQuiz()');await run('saveChain');
  assert.equal(run('canOpen(1)'),false);
  assert.equal(run('P.attempts.item_1'),1);
  run('P.quizAnswers[0]={u1a:2,u1b:1};checkQuiz()');await run('saveChain');
  assert.equal(run('canOpen(1)'),true);
  assert.equal(run('progressPercent()'),14);
  run("chooseMode('free');goLesson(5)");
  run('P.quizAnswers[5]={u6a:1,u6b:3};checkQuiz()');await run('saveChain');
  run("chooseMode('progressive')");
  assert.equal(run('P.currentItem'),1,'Switching back must honor the first gap');
  assert.equal(run('canOpen(4)'),false,'Passing a later topic cannot skip earlier ones');
  assert.equal(run('P.completedItems.includes(5)'),true);
  run("chooseMode('free');goTab('exam');submitExam()");
  assert.equal(run('P.examAttempts'),0,'Incomplete exams cannot be submitted');
  // Independently reviewed answer key for the final exam.
  run('P.examDraft={e1:2,e2:0,e3:3,e4:1,e5:4,e6:2,e7:0,e8:3,e9:1,e10:4};submitExam()');await run('saveChain');
  assert.equal(run('P.examBest'),10);
  assert.equal(run('P.examAttempts'),1);
  assert.equal(run('chapterComplete()'),false,'An exam alone cannot complete the theory route');
  run('retryExam();P.examDraft={e1:0,e2:1,e3:1,e4:0,e5:0,e6:0,e7:1,e8:1,e9:0,e10:0};submitExam()');await run('saveChain');
  assert.equal(run('P.examResult.score'),0);
  assert.equal(run('P.examBest'),10,'A lower retake cannot erase the best score');
  run("goTab('practice');P.practiceAnswers.p4=4;checkPractice('p4')");await run('saveChain');
  assert.equal(run('P.practiceMastered.includes("p4")'),true);
  h.setOffline(true);
  run("goTab('theory');goLesson(2)");await run('saveChain');
  assert.equal(run('cloudReady'),false);
  assert.equal(JSON.parse(h.local.get('sin-limites:student:fisica-capitulo-02')).pending,true);
  run('P.quizAnswers[2]={u3a:2,u3b:4};checkQuiz()');await run('saveChain');
  const savedWrites=h.writes();
  await run('signedIn({uid:"student"})');
  assert.equal(run('P.completedItems.includes(2)'),true,'Offline reload must retain local work');
  assert.equal(h.writes(),savedWrites,'A failed cloud read must not overwrite unseen remote progress');
  const remote=h.cloud.get('student/fisica-capitulo-02');
  remote.completedItems=[0,1,3,4,5];remote.examBest=10;
  h.setOffline(false);await run('retrySync()');
  assert.equal(run('P.completedItems.length'),6);
  assert.equal(run('progressPercent()'),100);
  assert.equal(run('chapterComplete()'),true);
  assert.equal(h.cloud.get('student/fisica-capitulo-02').chapterCompleted,true);
  assert.equal(JSON.parse(h.local.get('sin-limites:student:fisica-capitulo-02')).pending,false);
  assert.equal(h.cloud.get('student/fisica-capitulo-02').chapterNumber,2);
  assert.equal(h.cloud.get('student/navigation').lastTopicIndex,1);
  assert.equal(h.cloud.get('student/navigation').lastChapterNumber,2);
  assert.deepEqual(h.cloud.get('student/fisica-capitulo-01'),{chapterNumber:1,percent:43});
  assert.equal(JSON.parse(h.local.get('sin-limites:student:fisica-capitulo-01')).progress.percent,43);
  await run('signedIn({uid:"other-student"})');
  assert.equal(run('P.completedItems.length'),0,'Local progress must be isolated by account');
  await run('signedIn(null)');
  assert.match(h.elements.get('chapter-app').innerHTML,/Inicia sesión/);
  assert.equal(run('normalized({completedItems:[0,0,99,-1],currentItem:99}).completedItems.length'),1);
  const ids=JSON.parse(run('JSON.stringify([...LESSONS.flatMap(x=>x.quiz),...CONTENT.practice,...CONTENT.exam].map(q=>q.id))'));
  assert.equal(ids.length,32);assert.equal(new Set(ids).size,32);
  assert.equal(run('[...LESSONS.flatMap(x=>x.quiz),...CONTENT.practice,...CONTENT.exam].every(q=>q.options.length===5&&new Set(q.options).size===5&&validOption(q,q.answer))'),true);
  console.log('PASS VECTORS: resultant geometry, chapter isolation, navigation metadata, progression, free study, grading, retakes, practice, cloud/local recovery, cross-device merge, account isolation and content structure.');
}
test().catch(error=>{console.error(error);process.exitCode=1;});
