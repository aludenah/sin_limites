const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const root=path.join(__dirname,'..');
function harness(local=new Map(),cloud=new Map()){
 let offline=false,writes=0;const elements=new Map();
 const element=()=>({innerHTML:'',textContent:'',hidden:false,setAttribute(){},addEventListener(){},focus(){},scrollIntoView(){},close(){},showModal(){}});
 const document={getElementById:id=>{if(!elements.has(id))elements.set(id,element());return elements.get(id);},querySelector:s=>s==='dialog[open]'?null:element(),querySelectorAll:()=>[],addEventListener(){},documentElement:{}};
 const ref=key=>({async get(){if(offline)throw Error('offline');return {exists:cloud.has(key),data:()=>cloud.get(key)};},async set(d){if(offline)throw Error('offline');cloud.set(key,structuredClone(d));writes++;}});
 const db={collection:()=>({doc:uid=>({collection:()=>({doc:id=>ref(uid+'/'+id)})})})};
 const firestore=Object.assign(()=>db,{FieldValue:{serverTimestamp:()=>123}});
 const c=vm.createContext({window:{addEventListener(){},scrollTo(){}},document,firebase:{initializeApp(){},firestore,auth:()=>({onAuthStateChanged(){}})},localStorage:{getItem:k=>local.get(k)||null,setItem:(k,v)=>local.set(k,v)},console:{error(){}},setTimeout:()=>1,clearTimeout(){}});
 c.window.firebase=c.firebase;
 for(const p of ['historia-universal-capitulo-01-content.js','history-reading.js'])vm.runInContext(fs.readFileSync(path.join(root,p),'utf8'),c);
 return {run:s=>vm.runInContext(s,c),local,cloud,setOffline:v=>offline=v,writes:()=>writes,elements};
}
async function test(){
 const cloud=new Map([['student/historia-universal-capitulo-01',{completedItems:[0,1,2,3,4],percent:100}]]),local=new Map();
 const h=harness(local,cloud),run=h.run;
 assert.equal(run('SLIDES.length'),33);assert.equal(run('QUESTIONS.length'),7);
 assert.equal(run('new Set(SLIDES.map(s=>s.id)).size'),33);
 for(const q of JSON.parse(run('JSON.stringify(QUESTIONS)'))){assert.equal(q.options.length,5);assert.equal(new Set(q.options).size,5);assert.ok(q.answer>=0&&q.answer<5);assert.ok(q.solution.length>80);}
 await run('signedIn({uid:"student"})');
 assert.equal(run('P.completedItems.length'),0,'Old quizzes must not mark revised activities complete');
 assert.equal(run('P.visitedSlides.includes(0)'),true);
 run("P.studyMode='progressive';visit(31)");assert.equal(run('P.currentSlide'),0);
 run('visit(25);checkAnswer()');assert.equal(run('P.attempts.item_1'),0,'No attempt counted before selecting an answer');
 run('P.answers.q1=1;checkAnswer()');assert.equal(run('P.completedItems.length'),0);assert.equal(run('allowedSlide(26)'),false);
 run('delete P.results.q1;P.answers.q1=0;checkAnswer()');assert.equal(run('allowedSlide(26)'),true);
 for(let i=1;i<7;i++)run(`visit(${25+i});P.answers[QUESTIONS[${i}].id]=QUESTIONS[${i}].answer;checkAnswer()`);
 assert.equal(run('percent()'),100);assert.equal(run('allowedSlide(32)'),true);
 run('visit(32)');await run('persist()');
 assert.equal(cloud.get('student/historia-universal-presentacion-01').chapterCompleted,true);
 assert.equal(cloud.get('student/navigation').lastChapterName,'La ciencia histórica');
 run('visit(25);delete P.results.q1;P.answers.q1=2;checkAnswer()');assert.equal(run('percent()'),100,'Reattempt cannot erase prior success');
 assert.equal(run('P.itemScores.item_1'),100);
 await run('saveChain');h.setOffline(true);run('visit(4)');await run('persist()');
 assert.equal(run('cloudReady'),false);assert.equal(JSON.parse(local.get('sin-limites:student:historia-universal-presentacion-01')).pending,true);
 const writes=h.writes();await run('signedIn({uid:"student"})');assert.equal(run('P.currentSlide'),4);assert.equal(run('percent()'),100);assert.equal(h.writes(),writes);
 h.setOffline(false);await run('retrySync()');assert.equal(JSON.parse(local.get('sin-limites:student:historia-universal-presentacion-01')).pending,false);
 await run('signedIn({uid:"other"})');assert.equal(run('P.completedItems.length'),0);assert.equal(run('P.currentSlide'),0);
 await run('signedIn(null)');assert.match(h.elements.get('reading-app').innerHTML,/chapter=historia-universal-capitulo-01/);
 assert.deepEqual(cloud.get('student/historia-universal-capitulo-01'),{completedItems:[0,1,2,3,4],percent:100});
 console.log('PASS: Continuous theory, 7 retained activities, progression, grading, retained progress identity, offline recovery and account isolation.');
}
module.exports={harness,test};
if(require.main===module)test().catch(e=>{console.error(e);process.exitCode=1;});

