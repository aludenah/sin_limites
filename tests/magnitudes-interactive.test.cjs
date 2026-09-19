const assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const {harness}=require('./study-entry.test.cjs');
const root=path.join(__dirname,'..');
const modules=['fisica-capitulo-01-magnitudes.js','fisica-capitulo-01-juego.js'];
const read=file=>fs.readFileSync(path.join(root,file),'utf8');
const clone=value=>JSON.parse(JSON.stringify(value));
function seeded(seed){return ()=>{seed=(1664525*seed+1013904223)>>>0;return seed/4294967296;};}

function scoring(){
 const context=vm.createContext({window:{}});
 for(const file of modules)vm.runInContext(read(file),context);
 const {MagnitudeExplorer:explorer,MagnitudeGame:game}=context.window;
 const items=explorer.items;
 assert.equal(items.length,20);assert.equal(items.filter(item=>item.kind==='base').length,7);
 assert.equal(new Set(items.map(item=>item.id)).size,20);
 const seen=new Set();
 for(let seed=1;seed<=30;seed++){
  const session=game.createSession(items,seeded(seed*1000003));
  assert.equal(session.start(),true);
  const rounds=session.snapshot().rounds;
  assert.equal(rounds.length,10);assert.equal(new Set(rounds.map(round=>round.item.id)).size,10);
  assert.equal(rounds.filter(round=>round.item.kind==='base').length,5);
  for(const {item,options} of rounds){
   seen.add(item.id);assert.equal(options.length,3);assert.equal(new Set(options.map(option=>option.symbol)).size,3);
   assert.equal(options.filter(option=>option.id===item.id).length,1);
   assert.ok(options.filter(option=>option.id!==item.id).every(option=>option.dimension!==item.dimension),
    `${item.name}: do not mark an equivalent SI expression wrong, including joule versus newton metre`);
  }
 }
 assert.equal(seen.size,20,'The game can draw every magnitude, including energy and torque');

 const perfect=game.createSession(items,seeded(101));perfect.start();
 assert.equal(perfect.next(),false,'A student must check the current round first');
 assert.equal(perfect.check(),false);assert.equal(perfect.snapshot().points,0);
 assert.match(perfect.snapshot().message,/clasificación y una unidad/);
 const first=perfect.snapshot().rounds[0].item;
 assert.equal(perfect.choose('kind',first.kind),true);
 assert.equal(perfect.check(),false);assert.equal(perfect.snapshot().answers.length,0);
 assert.equal(perfect.choose('unit','not-an-option'),false);
 for(let i=0;i<10;i++){
  const current=perfect.snapshot().rounds[i].item;
  perfect.choose('kind',current.kind);perfect.choose('unit',current.id);
  assert.equal(perfect.check(),true);assert.equal(perfect.snapshot().points,2*(i+1));
  assert.equal(perfect.check(),false,'Repeated clicks cannot award points twice');
  assert.equal(perfect.choose('kind',current.kind==='base'?'derived':'base'),false,'A checked answer is locked');
  assert.equal(perfect.next(),true);
 }
 assert.equal(perfect.snapshot().phase,'finished');assert.equal(perfect.snapshot().points,20);
 assert.equal(perfect.snapshot().answers.length,10);assert.equal(perfect.next(),false);
 assert.equal(perfect.check(),false);assert.equal(perfect.start(),true);
 assert.equal(perfect.snapshot().points,0);assert.equal(perfect.snapshot().answers.length,0);
 perfect.reset();assert.equal(perfect.snapshot().phase,'ready');

 const mistakes=game.createSession(items,seeded(5));mistakes.start();
 for(let i=0;i<3;i++){
  const {item,options}=mistakes.snapshot().rounds[i];
  mistakes.choose('kind',i===0?item.kind:item.kind==='base'?'derived':'base');
  mistakes.choose('unit',i===1?item.id:options.find(option=>option.id!==item.id).id);
  mistakes.check();mistakes.next();
 }
 assert.equal(mistakes.snapshot().points,2,'Classification and unit each earn one independent point');
 assert.deepEqual(clone(mistakes.snapshot().answers.map(({kindCorrect,unitCorrect})=>[kindCorrect,unitCorrect])),
  [[true,false],[false,true],[false,false]],'Feedback identifies exactly which part needs revision');
}

async function chapterIntegration(){
 const html=read('fisica-capitulo-01.html');
 const scripts=[...html.matchAll(/<script\b[^>]*src="([^"]+)"/g)].map(match=>match[1].split('?')[0]);
 for(const file of modules){
  assert.ok(scripts.includes(file));assert.ok(scripts.indexOf(file)<scripts.indexOf('fisica-capitulo-01.js'));
 }
 assert.ok(scripts.indexOf(modules[0])<scripts.indexOf(modules[1]));
 const h=harness(['fisica-capitulo-01-data.js',...modules]);
 const rootElement=h.run("document.getElementById('chapter-app')"),handlers=new Map();
 rootElement.addEventListener=(type,handler)=>handlers.set(type,handler);
 h.run(read('fisica-capitulo-01.js'));
 const click=dataset=>handlers.get('click')({target:{closest:()=>({dataset,disabled:false})}});
 const gameHTML=()=>h.run('window.MagnitudeGame.render()');
 click({action:'magnitude-game-start'});
 assert.match(gameHTML(),/Comenzar juego/,'The chapter rejects game actions before sign-in');
 h.run("window.StudyMode.choose('student','free')");await h.signIn({uid:'student'});
 let rendered=rootElement.innerHTML;
 assert.equal((rendered.match(/class="magnitude-explorer"/g)||[]).length,2);
 assert.match(rendered,/Explora las 7 magnitudes base/);assert.match(rendered,/Explora 13 magnitudes derivadas/);
 assert.match(rendered,/id="magnitude-game"/);assert.doesNotMatch(rendered,/Ejemplo resuelto|Aplicación 1\./);
 assert.doesNotMatch(h.run('lessonBody(LESSONS[0])'),/<table\b/,'Interactive explorers replace both first-topic tables');
 assert.equal(h.run('LESSONS[0].examples.length'),0);
 assert.equal(h.run('LESSONS.length'),8);assert.equal(h.run('CONTENT.workedExamples.length'),25);
 const savedBefore=clone(h.run('P.practice10'));

 // Exercise the real explorer action, including retention after the chapter rerenders.
 const panel={innerHTML:''},choiceAttributes=new Map();
 const choice={dataset:{id:'masa'},setAttribute:(name,value)=>choiceAttributes.set(name,value)};
 const explorerRoot={querySelector:()=>panel,querySelectorAll:()=>[choice]};
 const button={dataset:{action:'magnitude-select',kind:'base',id:'masa'},closest:()=>explorerRoot};
 assert.equal(h.run('window.MagnitudeExplorer').handleAction(button),true);
 assert.match(panel.innerHTML,/kilogramo/);assert.equal(choiceAttributes.get('aria-pressed'),'true');

 const gameHost=h.run("document.getElementById('magnitude-game')");gameHost.querySelectorAll=()=>[];
 click({action:'magnitude-game-start'});assert.match(gameHTML(),/Ronda 1 de 10/);
 const firstName=gameHTML().match(/<h4 id="magnitude-game-target"[^>]*>([^<]+)<\/h4>/)[1];
 const item=h.run('window.MagnitudeExplorer.items').find(entry=>entry.name===firstName);
 const wrongUnit=[...gameHTML().matchAll(/data-field="unit" data-value="([^"]+)"/g)].map(match=>match[1]).find(id=>id!==item.id);
 click({action:'magnitude-game-choice',field:'kind',value:item.kind==='base'?'derived':'base'});
 click({action:'magnitude-game-choice',field:'unit',value:wrongUnit});
 click({action:'magnitude-game-check'});
 assert.match(gameHTML(),/needs-review/);assert.ok(gameHTML().includes(item.explanation));
 assert.ok(gameHTML().includes(`${item.unit} (${item.symbol})`),'Wrong answers display the correct unit');
 assert.match(gameHTML(),/0 \/ 20 puntos/);
 h.run('goLesson(1)');assert.doesNotMatch(rootElement.innerHTML,/id="magnitude-game"/);
 click({action:'magnitude-game-next'});assert.match(gameHTML(),/Ronda 1 de 10/,'Other topics do not process game actions');
 h.run('goLesson(0)');assert.match(rootElement.innerHTML,/needs-review/);
 assert.match(rootElement.innerHTML,/data-id="masa" aria-pressed="true"/);
 click({action:'magnitude-game-next'});assert.match(gameHTML(),/Ronda 2 de 10/);
 h.run("goTab('practice')");click({action:'magnitude-game-next'});
 h.run("goTab('theory')");assert.match(rootElement.innerHTML,/Ronda 2 de 10/,'Switching tabs preserves the current game');
 assert.deepEqual(clone(h.run('P.practice10')),savedBefore,'Playing never alters the ten graded practice questions');
 h.run("goTab('examples')");assert.equal((rootElement.innerHTML.match(/class="example worked-example"/g)||[]).length,25);

 await h.signIn(null);assert.match(gameHTML(),/Comenzar juego/);
 click({action:'magnitude-game-start'});assert.match(gameHTML(),/Comenzar juego/,'Sign-out disables chapter actions');
 h.run("window.StudyMode.choose('other','free')");await h.signIn({uid:'other'});
 assert.match(rootElement.innerHTML,/Comenzar juego/);assert.doesNotMatch(rootElement.innerHTML,/Ronda 2 de 10/);
 assert.match(rootElement.innerHTML,/data-id="longitud" aria-pressed="true"/,'An account change resets explorer selections');
}

scoring();chapterIntegration().then(()=>console.log('PASS: interactive magnitude explorers, fair 10-round game, independent grading, feedback, navigation retention and account isolation.')).catch(error=>{console.error(error);process.exitCode=1;});
