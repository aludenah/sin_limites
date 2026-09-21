const assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const {harness}=require('./study-entry.test.cjs');
const root=path.join(__dirname,'..');
const modules=['fisica-capitulo-01-magnitudes.js','fisica-capitulo-01-juego.js'];
const read=file=>fs.readFileSync(path.join(root,file),'utf8');
const clone=value=>JSON.parse(JSON.stringify(value));
function seeded(seed){return ()=>{seed=(1664525*seed+1013904223)>>>0;return seed/4294967296;};}
function dimensionSignature(tex){
 const normalized=tex.replace(/[{}\s]/g,''),parts=[...normalized.matchAll(/(\\Theta|[MLTINJ])(?:\^(-?\d+))?/g)];
 assert.equal(parts.map(part=>part[0]).join(''),normalized,'Each option must be a dimensional expression');
 const powers={};for(const part of parts)powers[part[1]]=(powers[part[1]]||0)+Number(part[2]??1);
 return JSON.stringify(Object.entries(powers).filter(([,power])=>power!==0).sort());
}

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
  for(const {item,options,dimensionOptions} of rounds){
   seen.add(item.id);assert.equal(options.length,3);assert.equal(new Set(options.map(option=>option.symbol)).size,3);
   assert.equal(options.filter(option=>option.id===item.id).length,1);
   assert.ok(options.filter(option=>option.id!==item.id).every(option=>option.dimension!==item.dimension),
    `${item.name}: do not mark an equivalent SI expression wrong, including joule versus newton metre`);
   assert.equal(dimensionOptions.length,3);assert.equal(new Set(dimensionOptions).size,3);
   assert.equal(dimensionOptions.filter(dimension=>dimension===item.dimension).length,1);
   assert.equal(new Set(dimensionOptions.map(dimensionSignature)).size,3,
    `${item.name}: alternatives cannot contain equivalent dimensions, including the shared energy/torque dimension`);
   assert.ok(dimensionOptions.every(dimension=>items.some(candidate=>candidate.dimension===dimension)));
  }
 }
 assert.equal(seen.size,20,'The game can draw every magnitude, including energy and torque');

 const perfect=game.createSession(items,seeded(101));perfect.start();
 assert.equal(perfect.next(),false,'A student must check the current round first');
 assert.equal(perfect.check(),false);assert.equal(perfect.snapshot().points,0);
 assert.match(perfect.snapshot().message,/clasificación/);assert.match(perfect.snapshot().message,/dimensión/);assert.match(perfect.snapshot().message,/unidad/);
 const first=perfect.snapshot().rounds[0].item;
 assert.equal(perfect.choose('kind',first.kind),true);
 assert.equal(perfect.check(),false);assert.equal(perfect.snapshot().answers.length,0);
 assert.equal(perfect.choose('unit','not-an-option'),false);
 assert.equal(perfect.choose('dimension','not-an-option'),false);
 assert.equal(perfect.choose('dimension',''),false);assert.equal(perfect.choose('dimension',null),false);
 assert.equal(perfect.snapshot().dimension,null);
 assert.equal(perfect.choose('unit',first.id),true);
 assert.equal(perfect.check(),false,'Classification and unit do not complete a round without its dimension');
 assert.equal(perfect.snapshot().answers.length,0);assert.equal(perfect.snapshot().points,0);
 for(let i=0;i<10;i++){
  const current=perfect.snapshot().rounds[i].item;
  perfect.choose('kind',current.kind);perfect.choose('dimension',current.dimension);perfect.choose('unit',current.id);
  assert.equal(perfect.check(),true);assert.equal(perfect.snapshot().points,3*(i+1));
  assert.equal(perfect.check(),false,'Repeated clicks cannot award points twice');
  assert.equal(perfect.choose('kind',current.kind==='base'?'derived':'base'),false,'A checked answer is locked');
  assert.equal(perfect.choose('dimension',current.dimension),false,'The dimension is locked after checking');
  assert.equal(perfect.choose('unit',current.id),false,'The unit is locked after checking');
  assert.equal(perfect.next(),true);
  if(i<9)assert.equal(perfect.snapshot().dimension,null,'Every new round requires a fresh dimension choice');
 }
 assert.equal(perfect.snapshot().phase,'finished');assert.equal(perfect.snapshot().points,30);
 assert.equal(perfect.snapshot().answers.length,10);assert.equal(perfect.next(),false);
 assert.equal(perfect.check(),false);assert.equal(perfect.start(),true);
 assert.equal(perfect.snapshot().points,0);assert.equal(perfect.snapshot().answers.length,0);assert.equal(perfect.snapshot().dimension,null);
 perfect.reset();assert.equal(perfect.snapshot().phase,'ready');

 for(let mask=0;mask<8;mask++){
  const trial=game.createSession(items,seeded(mask+5));trial.start();
  const {item,options,dimensionOptions}=trial.snapshot().rounds[0];
  const expected=[Boolean(mask&4),Boolean(mask&2),Boolean(mask&1)];
  trial.choose('kind',expected[0]?item.kind:item.kind==='base'?'derived':'base');
  trial.choose('dimension',expected[1]?item.dimension:dimensionOptions.find(dimension=>dimension!==item.dimension));
  trial.choose('unit',expected[2]?item.id:options.find(option=>option.id!==item.id).id);
  assert.equal(trial.check(),true);
  const answer=trial.snapshot().answers[0];
  assert.equal(trial.snapshot().points,expected.filter(Boolean).length,'Each of the three questions earns an independent point');
  assert.deepEqual([answer.kindCorrect,answer.dimensionCorrect,answer.unitCorrect],expected,
   'All eight correctness combinations identify the exact question that needs revision');
 }
}

async function chapterIntegration(){
 const html=read('fisica-capitulo-01.html');
 const scripts=[...html.matchAll(/<script\b[^>]*src="([^"]+)"/g)].map(match=>match[1].split('?')[0]);
 for(const file of modules){
  assert.ok(scripts.includes(file));assert.ok(scripts.indexOf(file)<scripts.indexOf('fisica-capitulo-01.js'));
 }
 assert.ok(scripts.indexOf(modules[0])<scripts.indexOf(modules[1]));
 const h=harness(['fisica-capitulo-01-data.js',...modules]);
 const rootElement=h.run("document.getElementById('chapter-app')"),handlers=new Map(),mathCalls=[];
 rootElement.addEventListener=(type,handler)=>handlers.set(type,handler);
 h.run('window').renderMathInElement=(element,options)=>mathCalls.push({element,options});
 h.run(read('fisica-capitulo-01.js'));
 const click=dataset=>handlers.get('click')({target:{closest:()=>({dataset,disabled:false})}});
 const gameHTML=()=>h.run('window.MagnitudeGame.render()');
 click({action:'magnitude-game-start'});
 assert.match(gameHTML(),/Comenzar juego/,'The chapter rejects game actions before sign-in');
 h.run("window.StudyMode.choose('student','free')");await h.signIn({uid:'student'});
 let rendered=rootElement.innerHTML;
 assert.equal((rendered.match(/class="magnitude-table table-scroll"/g)||[]).length,2);
 const explorer=h.run('window.MagnitudeExplorer');
 assert.deepEqual(Object.keys(explorer).sort(),['items','render']);
 assert.ok(Object.isFrozen(explorer.items));assert.ok(explorer.items.every(Object.isFrozen));
 for(const [kind,count] of [['base',7],['derived',13]]){
  const table=explorer.render(kind),items=explorer.items.filter(item=>item.kind===kind);
  assert.equal((table.match(/<table\b/g)||[]).length,1);
  assert.match(table,/<caption\b/);
  assert.equal((table.match(/<th scope="col">/g)||[]).length,4,'Tables show magnitude, dimension, SI unit and symbol');
  assert.doesNotMatch(table,/Relación de referencia/);
  assert.equal((table.match(/<th scope="row">/g)||[]).length,count);
  for(const item of items){
   assert.ok(table.includes(item.name),`${item.name}: name is visible`);
   assert.ok(table.includes(item.unit),`${item.name}: SI unit is visible`);
   assert.ok(table.includes(item.symbol),`${item.name}: unit symbol is visible`);
   assert.ok(table.includes('\\('+item.dimension+'\\)'),`${item.name}: dimension uses inline math`);
  }
  assert.doesNotMatch(table,/<button\b|data-action=|aria-pressed=|magnitude-explorer/);
 }
 assert.equal(explorer.render('unknown'),'');
 assert.match(rendered,/id="magnitude-game"/);assert.doesNotMatch(rendered,/Ejemplo resuelto|Aplicación 1\./);
 assert.equal((h.run('lessonBody(LESSONS[0])').match(/<table\b/g)||[]).length,2,'Both first-topic tables are visible in full');
 assert.doesNotMatch(rendered,/magnitude-select|Selecciona una magnitud para descubrir/);
 assert.equal(h.run('LESSONS[0].examples.length'),0);
 assert.equal(h.run('LESSONS.length'),5);assert.equal(h.run('CONTENT.workedExamples.length'),25);
 const savedBefore=clone(h.run('P.practice10'));

 const gameHost=h.run("document.getElementById('magnitude-game')");gameHost.querySelectorAll=()=>[];
 click({action:'magnitude-game-start'});assert.match(gameHTML(),/Ronda 1 de 10/);
 const questionOrder=[...gameHTML().matchAll(/<legend>([^<]+)<\/legend>/g)].map(match=>match[1]);
 assert.deepEqual(questionOrder,['¿Es fundamental o derivada?','¿Cuál es su dimensión?','¿Cuál es su unidad en el SI?']);
 assert.ok(mathCalls.some(call=>call.element===gameHost&&call.options.trust===false),'New rounds render dimension alternatives safely with KaTeX');
 const firstName=gameHTML().match(/<h4 id="magnitude-game-target"[^>]*>([^<]+)<\/h4>/)[1];
 const item=h.run('window.MagnitudeExplorer.items').find(entry=>entry.name===firstName);
 const wrongUnit=[...gameHTML().matchAll(/data-field="unit" data-value="([^"]+)"/g)].map(match=>match[1]).find(id=>id!==item.id);
 const dimensions=[...gameHTML().matchAll(/data-field="dimension" data-value="([^"]+)"/g)].map(match=>match[1]);
 assert.equal(dimensions.length,3);assert.ok(dimensions.includes(item.dimension));
 for(const dimension of dimensions)assert.ok(gameHTML().includes('\\('+dimension+'\\)'),'Each alternative uses inline math');
 click({action:'magnitude-game-choice',field:'kind',value:item.kind==='base'?'derived':'base'});
 click({action:'magnitude-game-choice',field:'unit',value:wrongUnit});
 click({action:'magnitude-game-check'});
 assert.match(h.elements.get('magnitude-game-message').textContent,/dimensión/);
 assert.doesNotMatch(gameHTML(),/needs-review/,'Feedback waits for all three choices');
 click({action:'magnitude-game-choice',field:'dimension',value:dimensions.find(dimension=>dimension!==item.dimension)});
 const mathBeforeFeedback=mathCalls.length;
 click({action:'magnitude-game-check'});
 assert.match(gameHTML(),/needs-review/);assert.ok(gameHTML().includes(item.explanation));
 assert.ok(gameHTML().includes(`${item.unit} (${item.symbol})`),'Wrong answers display the correct unit');
 assert.ok(gameHTML().includes('\\('+item.dimension+'\\)'),'Feedback displays the correct dimension');
 assert.ok(mathCalls.slice(mathBeforeFeedback).some(call=>call.element===gameHost&&call.options.trust===false),'New feedback renders its dimension safely');
 assert.match(gameHTML(),/0 \/ 30 puntos/);
 h.run('goLesson(1)');assert.doesNotMatch(rootElement.innerHTML,/id="magnitude-game"/);
 click({action:'magnitude-game-next'});assert.match(gameHTML(),/Ronda 1 de 10/,'Other topics do not process game actions');
 h.run('goLesson(0)');assert.match(rootElement.innerHTML,/needs-review/);
 assert.equal((rootElement.innerHTML.match(/class="magnitude-table table-scroll"/g)||[]).length,2);
 click({action:'magnitude-game-next'});assert.match(gameHTML(),/Ronda 2 de 10/);
 h.run("goTab('practice')");click({action:'magnitude-game-next'});
 h.run("goTab('theory')");assert.match(rootElement.innerHTML,/Ronda 2 de 10/,'Switching tabs preserves the current game');
 assert.deepEqual(clone(h.run('P.practice10')),savedBefore,'Playing never alters the ten graded practice questions');
 h.run("goTab('examples')");assert.equal((rootElement.innerHTML.match(/class="example worked-example"/g)||[]).length,25);

 await h.signIn(null);assert.match(gameHTML(),/Comenzar juego/);
 click({action:'magnitude-game-start'});assert.match(gameHTML(),/Comenzar juego/,'Sign-out disables chapter actions');
 h.run("window.StudyMode.choose('other','free')");await h.signIn({uid:'other'});
 assert.match(rootElement.innerHTML,/Comenzar juego/);assert.doesNotMatch(rootElement.innerHTML,/Ronda 2 de 10/);
 assert.equal((rootElement.innerHTML.match(/class="magnitude-table table-scroll"/g)||[]).length,2,'Static tables remain visible after an account change');
}

scoring();chapterIntegration().then(()=>console.log('PASS: static tables, three ordered game questions, distinct dimensional choices, all partial scores, safe math rendering, navigation retention and account isolation.')).catch(error=>{console.error(error);process.exitCode=1;});
