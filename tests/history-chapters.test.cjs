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
  for(const file of ['history-catalog.js',id+'-data.js','history-chapter.js'])vm.runInContext(fs.readFileSync(path.join(root,file),'utf8'),context);
  return {run:s=>vm.runInContext(s,context),elements,cloud,local,id,setOffline:x=>offline=x,writes:()=>writes};
}
async function test(){
  const local=new Map(),cloud=new Map();
  cloud.set('student/fisica-capitulo-02',{percent:57});
  cloud.set('student/historia-universal-capitulo-01',{percent:60});
  const firstAnswers={2:'primaria y escrita',3:'un proceso evolutivo de poblaciones',4:'restos materiales y ambientales',5:'la producción de alimentos mediante agricultura y ganadería',6:'Nilo'};
  for(let n=2;n<=6;n++){
    const h=harness(n,local,cloud),run=h.run;
    const content=JSON.parse(run('JSON.stringify(CONTENT)'));
    assert.equal(content.number,n);assert.equal(content.id,h.id);
    assert.equal(content.lessons.length,n===6?6:5);
    assert.equal(content.practice.length,5);assert.equal(content.exam.length,10);
    assert.equal(content.exam[0].options[content.exam[0].answer],firstAnswers[n]);
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
    const saved=cloud.get('student/'+h.id);
    assert.equal(saved.chapterNumber,n);assert.equal(saved.courseId,12);assert.equal(saved.percent,100);
    assert.equal(cloud.get('student/navigation').lastTopicIndex,n-1);
    h.setOffline(true);run('goLesson(1)');await run('saveChain');
    assert.equal(run('cloudReady'),false);
    assert.equal(JSON.parse(local.get('sin-limites:student:'+h.id)).pending,true);
    const writes=h.writes();await run('signedIn({uid:"student"})');
    assert.equal(run('P.currentItem'),1);assert.equal(h.writes(),writes);
    h.setOffline(false);await run('retrySync()');
    assert.equal(JSON.parse(local.get('sin-limites:student:'+h.id)).pending,false);
    await run('signedIn({uid:"other"})');assert.equal(run('P.completedItems.length'),0);
    await run('signedIn(null)');assert.match(h.elements.get('chapter-app').innerHTML,/Inicia sesión/);
    assert.match(h.elements.get('chapter-app').innerHTML,new RegExp('chapter='+h.id));
  }
  assert.deepEqual(cloud.get('student/fisica-capitulo-02'),{percent:57});
  assert.deepEqual(cloud.get('student/historia-universal-capitulo-01'),{percent:60});
  console.log('PASS: 5 chapters, 127 questions, chapter/account isolation, progressive/free modes, grading, best scores, offline recovery and navigation.');
}
test().catch(e=>{console.error(e);process.exitCode=1});
