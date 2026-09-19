const assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const {harness}=require('./study-entry.test.cjs');
const root=path.join(__dirname,'..');
const modules=['fisica-capitulo-01-prefijos.js','fisica-capitulo-01-prefijos-juego.js'];
const read=file=>fs.readFileSync(path.join(root,file),'utf8');
const clone=value=>JSON.parse(JSON.stringify(value));
function seeded(seed){return ()=>{seed=(1664525*seed+1013904223)>>>0;return seed/4294967296;};}
const context=vm.createContext({window:{}});
for(const file of modules)vm.runInContext(read(file),context);
const {PrefixExplorer:explorer,PrefixGame:game}=context.window;

function conversions(){
 assert.deepEqual(clone(explorer.items.map(p=>[p.id,p.symbol,p.exponent])),[
  ['pico','p',-12],['nano','n',-9],['micro','µ',-6],['mili','m',-3],
  ['centi','c',-2],['kilo','k',3],['mega','M',6],['giga','G',9]
 ]);
 const cases=[
  ['2,5','kilo','none','2\u202f500'],['450','centi','none','4,5'],
  ['0.008','none','mili','8'],['0.1','mili','none','0,0001'],
  ['0,004','kilo','mili','4\u202f000'],['800','micro','none','0,0008'],
  ['3','mili','micro','3\u202f000'],['1','mega','mili','1\u202f000\u202f000\u202f000'],
  ['1','pico','giga','1 × 10⁻²¹'],['1','giga','pico','1 × 10²¹'],
  ['-2,5','centi','none','−0,025'],['0','mega','pico','0'],
  ['-0.000','mega','none','0'],['1,25e-3','kilo','none','1,25'],
  ['12345678901234567','none','none','1,2345678901234567 × 10¹⁶']
 ];
 for(const [input,from,to,expected] of cases)assert.equal(explorer.convert(input,from,to),expected,`${input} ${from} → ${to}`);
 for(const value of ['', ' ', '.', ',', '-', '2.', '2,', '1e', '1e-', 'NaN', 'Infinity', Infinity, NaN, '1,2.3', '1 000', '0x10', '<script>', '1e301']){
  assert.equal(explorer.parseNumber(value),null,`Reject invalid/incomplete input ${value}`);
  assert.equal(explorer.convert(value,'kilo','none'),null);
 }
 assert.equal(explorer.convert('1','Kilo','none'),null);
 assert.equal(explorer.convert('1','mili','missing'),null);
 assert.equal(explorer.formatNumber('1',0.5),null);
 // Scientific notation at the input boundary stays a number, not Infinity or an underflowed zero.
 assert.equal(explorer.convert('1e300','giga','none'),'1 × 10³⁰⁹');
 assert.equal(explorer.convert('1e-300','pico','none'),'1 × 10⁻³¹²');
}

function scoring(){
 const expected={mili:'10⁻³',mega:'10⁶',micro:'µ',kilo:'kilo (k)',
  kilometros:'2 500 m',centimetros:'4,5 m',milimetros:'8 mm',micrometros:'0,0000032 m',
  kilogramos:'750 g',miligramos:'2,5 g','kg-mg':'4 000 mg','g-kg':'0,12 kg',
  milisegundos:'0,35 s',microsegundos:'0,0008 s','s-ms':'25 ms','ms-us':'3 000 µs',
  'area-cm':'0,0025 m²','area-m':'20 000 cm²','volumen-cm':'0,000008 m³','volumen-m':'3 000 cm³'};
 assert.equal(game.questions.length,20);
 for(const q of game.questions){
  assert.equal(q.options.find(o=>o.id===q.answer)?.label,expected[q.id],q.prompt);
  assert.equal(q.options.length,4);assert.equal(new Set(q.options.map(o=>o.label)).size,4);
  assert.ok(q.explanation.length>50);
 }
 const seen=new Set(),positions=new Set();
 for(let seed=1;seed<=30;seed++){
  const s=game.createSession(game.questions,seeded(seed*1000003));assert.equal(s.start(),true);
  const rounds=s.snapshot().rounds;
  assert.equal(rounds.length,10);assert.equal(new Set(rounds.map(r=>r.item.id)).size,10);
  for(const category of ['prefix','length','mass','time','powers'])assert.equal(rounds.filter(r=>r.item.category===category).length,2);
  assert.ok(rounds.some(r=>r.item.id.startsWith('area-')));
  assert.ok(rounds.some(r=>r.item.id.startsWith('volumen-')));
  for(const r of rounds){seen.add(r.item.id);positions.add(r.options.findIndex(o=>o.id===r.item.answer));}
 }
 assert.equal(seen.size,20);assert.equal(positions.size,4,'Correct choices appear in every position');
 const perfect=game.createSession(game.questions,seeded(21));
 assert.equal(perfect.choose('unknown'),false);assert.equal(perfect.check(),false);perfect.start();
 assert.equal(perfect.next(),false);assert.equal(perfect.check(),false);
 assert.equal(perfect.snapshot().points,0);assert.match(perfect.snapshot().message,/Elige/);
 assert.equal(perfect.choose('unknown'),false);
 for(let i=0;i<10;i++){
  const {item,options}=perfect.snapshot().rounds[i];
  assert.equal(perfect.choose(item.answer),true);assert.equal(perfect.check(),true);
  assert.equal(perfect.snapshot().points,i+1);
  assert.equal(perfect.check(),false,'No double scoring');
  assert.equal(perfect.choose(options.find(o=>o.id!==item.answer).id),false,'Checked answers are locked');
  assert.equal(perfect.next(),true);
 }
 assert.equal(perfect.snapshot().phase,'finished');assert.equal(perfect.next(),false);
 assert.equal(perfect.check(),false);assert.equal(perfect.start(),true);
 assert.equal(perfect.snapshot().points,0);assert.equal(perfect.snapshot().answers.length,0);
 const wrong=perfect.snapshot().rounds[0];perfect.choose(wrong.options.find(o=>o.id!==wrong.item.answer).id);
 perfect.check();assert.equal(perfect.snapshot().points,0);assert.equal(perfect.snapshot().answers[0].correct,false);
 perfect.reset();assert.equal(perfect.snapshot().phase,'ready');
}

async function integration(){
 const html=read('fisica-capitulo-01.html');
 const scripts=[...html.matchAll(/<script\b[^>]*src="([^"]+)"/g)].map(m=>m[1].split('?')[0]);
 for(const file of modules){assert.ok(scripts.includes(file));assert.ok(scripts.indexOf(file)<scripts.indexOf('fisica-capitulo-01.js'));}
 const h=harness(['fisica-capitulo-01-data.js',...modules]);
 const app=h.run("document.getElementById('chapter-app')"),handlers=new Map();
 app.addEventListener=(type,handler)=>handlers.set(type,handler);h.run(read('fisica-capitulo-01.js'));
 const click=(dataset,closest=()=>null)=>handlers.get('click')({target:{closest:()=>({dataset,disabled:false,closest})}});
 const gameHTML=()=>h.run('window.PrefixGame.render()');
 const explorerHTML=()=>h.run('window.PrefixExplorer.render()');
 click({action:'prefix-game-start'});assert.match(gameHTML(),/Comenzar juego/);
 h.run("window.StudyMode.choose('student','free')");await h.signIn({uid:'student'});
 h.run('goLesson(1)');
 assert.equal(h.run('LESSONS[1].id'),'dim-si');assert.equal(h.run('LESSONS[1].examples.length'),0);
 assert.match(app.innerHTML,/id="prefix-explorer"/);assert.match(app.innerHTML,/id="prefix-game"/);
 assert.doesNotMatch(app.innerHTML,/Ejemplo resuelto|Aplicación 2\. Equivalencias|<table\b/);
 const practiceBefore=clone(h.run('P.practice10'));

 // Exercise delegated input/change/card events using stable input objects.
 const elements=new Map();
 const element=id=>{if(!elements.has(id))elements.set(id,{innerHTML:'',value:'',hidden:false,attributes:{},setAttribute(k,v){this.attributes[k]=v;}});return elements.get(id);};
 const cards=explorer.items.map(p=>({dataset:{prefix:p.id},attributes:{},setAttribute(k,v){this.attributes[k]=v;}}));
 const explorerHost={querySelector:selector=>element(selector.slice(1)),querySelectorAll:()=>cards};
 Object.defineProperty(explorerHost,'innerHTML',{set(){throw Error('Do not replace focused explorer controls');}});
 const input=element('prefix-explorer-value');input.dataset={action:'prefix-explorer-value'};input.closest=()=>explorerHost;
 input.value='2,5';handlers.get('input')({target:input});
 assert.match(element('prefix-explorer-result').innerHTML,/2\u202f500 m/);
 assert.equal(input.attributes['aria-invalid'],'false');
 const select={dataset:{action:'prefix-explorer-unit'},value:'g',closest:()=>explorerHost};
 handlers.get('change')({target:select});assert.match(element('prefix-explorer-result').innerHTML,/2\u202f500 g/);
 assert.equal(element('prefix-explorer-mass-note').hidden,false);
 click({action:'prefix-explorer-select',prefix:'mili'},()=>explorerHost);
 assert.equal(element('prefix-explorer-from').value,'mili');
 assert.match(element('prefix-explorer-result').innerHTML,/0,0025 g/);
 assert.equal(cards.find(p=>p.dataset.prefix==='mili').attributes['aria-pressed'],'true');
 input.value='';handlers.get('input')({target:input});assert.equal(input.attributes['aria-invalid'],'true');
 assert.match(element('prefix-explorer-result').innerHTML,/número completo/);
 input.value='0';handlers.get('input')({target:input});assert.match(element('prefix-explorer-result').innerHTML,/0 mg = 0 g/);

 const gameHost=h.run("document.getElementById('prefix-game')");gameHost.querySelectorAll=()=>[];
 click({action:'prefix-game-start'});assert.match(gameHTML(),/Ronda 1 de 10/);
 click({action:'prefix-game-check'});assert.match(h.elements.get('prefix-game-message').textContent,/Elige/);
 const question=h.run('window.PrefixGame.questions').find(q=>gameHTML().includes(q.prompt));assert.ok(question);
 click({action:'prefix-game-choice',value:question.options.find(o=>o.id!==question.answer).id});
 click({action:'prefix-game-check'});assert.match(gameHTML(),/needs-review/);
 assert.ok(gameHTML().includes(question.explanation));assert.match(gameHTML(),/0 \/ 10 puntos/);
 h.run('goLesson(0)');assert.doesNotMatch(app.innerHTML,/id="prefix-game"/);
 click({action:'prefix-game-next'});assert.match(gameHTML(),/Ronda 1 de 10/);
 input.value='12';handlers.get('input')({target:input});assert.match(explorerHTML(),/value="0"/,'Other topics ignore converter input');
 h.run('goLesson(1)');assert.match(app.innerHTML,/needs-review/);assert.match(app.innerHTML,/value="0"/);
 click({action:'prefix-game-next'});assert.match(gameHTML(),/Ronda 2 de 10/);
 h.run("goTab('practice')");click({action:'prefix-game-start'});assert.match(gameHTML(),/Ronda 2 de 10/);
 h.run("goTab('theory')");assert.match(app.innerHTML,/Ronda 2 de 10/);
 assert.deepEqual(clone(h.run('P.practice10')),practiceBefore,'The game never changes graded chapter progress');
 assert.equal(h.run('CONTENT.workedExamples.length'),25);assert.equal(h.run('LESSONS.length'),7);
 await h.signIn(null);assert.match(gameHTML(),/Comenzar juego/);assert.match(explorerHTML(),/value="1"/);
 click({action:'prefix-game-start'});assert.match(gameHTML(),/Comenzar juego/);
 h.run("window.StudyMode.choose('other','free')");await h.signIn({uid:'other'});h.run('goLesson(1)');
 assert.match(app.innerHTML,/Comenzar juego/);assert.match(app.innerHTML,/data-prefix="kilo" aria-pressed="true"/);
}

conversions();scoring();integration().then(()=>console.log('PASS: exact prefix conversions, balanced game and feedback, delegated controls, navigation retention and independent student progress.')).catch(error=>{console.error(error);process.exitCode=1;});
