const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const root=path.join(__dirname,'..');
function harness(number,local=new Map(),cloud=new Map()){
  const elements=new Map();let offline=false,writes=0;
  const element=()=>({innerHTML:'',textContent:'',hidden:false,dataset:{},classList:{toggle(){}},addEventListener(){},scrollIntoView(){}});
  const document={getElementById(id){if(!elements.has(id))elements.set(id,element());return elements.get(id);},querySelector(){return element();}};
  const record=key=>({async get(){if(offline)throw Error('offline');return {exists:cloud.has(key),data:()=>cloud.get(key)};},async set(data){if(offline)throw Error('offline');cloud.set(key,structuredClone(data));writes++;}});
  const db={collection:()=>({doc:uid=>({collection:()=>({doc:id=>record(uid+'/'+id)})})})};
  const firestore=Object.assign(()=>db,{FieldValue:{serverTimestamp:()=>123}});
  const context=vm.createContext({document,window:{addEventListener(){}},firebase:{initializeApp(){},firestore,auth:()=>({onAuthStateChanged(){}})},localStorage:{getItem:k=>local.get(k)||null,setItem:(k,v)=>local.set(k,v)},console:{error(){}},setTimeout:()=>1,clearTimeout(){}});
  context.window.firebase=context.firebase;
  const id='historia-universal-capitulo-'+String(number).padStart(2,'0');
  for(const file of ['history-catalog.js','history-progress.js',id+'-data.js','history-chapter.js'])vm.runInContext(fs.readFileSync(path.join(root,file),'utf8'),context);
  return {run:s=>vm.runInContext(s,context),elements,cloud,local,id,progressId:'historia-universal-pdf-'+String(number).padStart(2,'0'),setOffline:x=>offline=x,writes:()=>writes};
}
async function test(){
  const local=new Map(),cloud=new Map();
  cloud.set('student/fisica-capitulo-02',{percent:57});
  cloud.set('student/historia-universal-capitulo-01',{percent:60});

  for(let n=2;n<=6;n++){
    const h=harness(n,local,cloud),run=h.run;
    const content=JSON.parse(run('JSON.stringify(CONTENT)'));
    assert.equal(content.number,n);assert.equal(content.id,h.id);
    assert.equal(content.lessons.length,n===3?10:n===6?6:5);
    assert.equal(content.practice.length,5);assert.equal(content.exam.length,10);
    assert.equal(content.progressId,h.progressId);
    const all=[...content.lessons.flatMap(l=>l.quiz),...content.practice,...content.exam];
    assert.equal(new Set(all.map(q=>q.id)).size,all.length);
    for(const q of all){assert.equal(q.options.length,5);assert.equal(new Set(q.options).size,5);assert.ok(Number.isInteger(q.answer)&&q.answer>=0&&q.answer<5);assert.ok(q.solution.length>20);}
    await run('signedIn({uid:"student"})');
    assert.equal(run('P.completedItems.length'),0,'Chapters must be independent');
    assert.match(h.elements.get('chapter-app').innerHTML,/Estudio progresivo/);
    run("chooseMode('progressive');goLesson(3);goTab('exam')");
    assert.equal(run('P.currentItem'),0);assert.equal(run('P.activeTab'),'theory');
    run('checkQuiz()');assert.equal(run('P.attempts.item_1'),undefined);
    run('P.quizAnswers[0]=Object.fromEntries(LESSONS[0].quiz.map(q=>[q.id,(q.answer+1)%5]));checkQuiz()');
    assert.equal(run('canOpen(1)'),false);
    run("chooseMode('free');goLesson(LESSONS.length-1);P.quizAnswers[P.currentItem]=Object.fromEntries(LESSONS[P.currentItem].quiz.map(q=>[q.id,q.answer]));checkQuiz();chooseMode('progressive')");
    assert.equal(run('P.currentItem'),0,'Later completion must not skip gaps');
    for(let i=0;i<content.lessons.length;i++){
      run(`goLesson(${i});P.quizAnswers[${i}]=Object.fromEntries(LESSONS[${i}].quiz.map(q=>[q.id,q.answer]));checkQuiz()`);
    }
    assert.equal(run('canApply()'),true);assert.equal(run('chapterComplete()'),false);
    run("goTab('exam');submitExam()");assert.equal(run('P.examAttempts'),0);
    run('P.examDraft=Object.fromEntries(CONTENT.exam.map((q,i)=>[q.id,i<7?q.answer:(q.answer+1)%5]));submitExam()');
    assert.equal(run('P.examBest'),7);assert.equal(run('progressPercent()'),100);
    run('retryExam();P.examDraft=Object.fromEntries(CONTENT.exam.map(q=>[q.id,(q.answer+1)%5]));submitExam()');
    assert.equal(run('P.examResult.score'),0);assert.equal(run('P.examBest'),7);
    run("goTab('practice');P.practiceAnswers.p1=CONTENT.practice[0].answer;checkPractice('p1')");
    assert.equal(run('P.practiceMastered.includes("p1")'),true);
    await run('saveChain');
    const saved=cloud.get('student/'+h.progressId);
    assert.equal(saved.chapterNumber,n);assert.equal(saved.courseId,12);assert.equal(saved.percent,100);
    assert.equal(cloud.get('student/navigation').lastTopicIndex,n-1);
    h.setOffline(true);run('goLesson(1)');await run('saveChain');
    assert.equal(run('cloudReady'),false);
    assert.equal(JSON.parse(local.get('sin-limites:student:'+h.progressId)).pending,true);
    const writes=h.writes();await run('signedIn({uid:"student"})');
    assert.equal(run('P.currentItem'),1);assert.equal(h.writes(),writes);
    h.setOffline(false);await run('retrySync()');
    assert.equal(JSON.parse(local.get('sin-limites:student:'+h.progressId)).pending,false);
    await run('signedIn({uid:"other"})');assert.equal(run('P.completedItems.length'),0);
    await run('signedIn(null)');assert.match(h.elements.get('chapter-app').innerHTML,/Inicia sesión/);
    assert.match(h.elements.get('chapter-app').innerHTML,new RegExp('chapter='+h.id));
  }
  const old=new Map(),savedLocal=new Map();
  const oldState={studyMode:'free',completedItems:[0,1,2,3,4],attempts:{item_1:2,item_4:3},itemScores:{item_1:100,item_4:100},quizAnswers:{0:{u1a:2},3:{u4b:1}},quizResults:{0:{u1a:2}},examBest:9,examAttempts:2,updatedMs:100};
  for(const n of [3,4,5,6])old.set('student/historia-universal-capitulo-0'+n,structuredClone(oldState));
  const snapshot=JSON.stringify([...old]);
  for(const n of [2,3,4,5,6]){
    const h=harness(n,savedLocal,old);await h.run('signedIn({uid:"student"})');
    const expected={2:[0,1,2,3,4],3:[0,1,2,3,4,5,6,7,8,9],4:[1,2,3],5:[0,2],6:[]};
    assert.equal(h.run('JSON.stringify(P.completedItems)'),JSON.stringify(expected[n]),'Map only equivalent lessons for chapter '+n);
    assert.equal(h.run('P.examBest'),n===2?9:0,'Changed assessments must not inherit exam credit');
    if(n===3)assert.equal(h.run('P.quizAnswers[5].u6a'),2,'Remap question IDs together with lessons');
    if(n===5)assert.equal(h.run('P.attempts.item_1'),3,'Move attempts from the matching old Egypt lesson');
    await h.run('retrySync()');assert.equal(h.run('P.completedItems.length'),expected[n].length,'Migration is idempotent');
  }
  assert.equal(JSON.stringify([...old].filter(([id])=>/capitulo-0[3-6]$/.test(id))),snapshot,'Original records remain intact');
  const offlineLocal=new Map([['sin-limites:student:historia-universal-capitulo-05',JSON.stringify({progress:oldState,pending:true})]]);
  const h=harness(3,offlineLocal,new Map());h.setOffline(true);await h.run('signedIn({uid:"student"})');
  assert.equal(h.run('JSON.stringify(P.completedItems)'),JSON.stringify([5,6,7,8,9]),'Import unsynced local progress while offline');
  assert.equal(h.run('P.examBest'),0);
  assert.deepEqual(cloud.get('student/fisica-capitulo-02'),{percent:57});
  assert.deepEqual(cloud.get('student/historia-universal-capitulo-01'),{percent:60});
  console.log('PASS: 5 chapters, 137 questions, chapter/account isolation, progressive/free modes, grading, best scores, offline recovery and navigation.');
}
test().catch(e=>{console.error(e);process.exitCode=1});

