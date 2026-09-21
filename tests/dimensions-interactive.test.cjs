const assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const {harness}=require('./study-entry.test.cjs');
const root=path.join(__dirname,'..');
const modules=['fisica-capitulo-01-dimensiones.js','fisica-capitulo-01-dimensiones-juego.js'];
const read=file=>fs.readFileSync(path.join(root,file),'utf8');
const clone=value=>JSON.parse(JSON.stringify(value));
const fields=['M','L','T','I'];
const vector=item=>fields.map(field=>item.exponents[field]);
function seeded(seed){return ()=>{seed=(1664525*seed+1013904223)>>>0;return seed/4294967296;};}
const context=vm.createContext({window:{}});
for(const file of modules)vm.runInContext(read(file),context);
const {DimensionExplorer:explorer,DimensionGame:game}=context.window;

function scientificContent(){
 // Independent reference values for the entire original consultation table.
 const expected={area:[[0,2,0,0],'m²'],volumen:[[0,3,0,0],'m³'],densidad:[[1,-3,0,0],'kg/m³'],
  velocidad:[[0,1,-1,0],'m/s'],aceleracion:[[0,1,-2,0],'m/s²'],fuerza:[[1,1,-2,0],'N'],
  energia:[[1,2,-2,0],'J'],calor:[[1,2,-2,0],'J'],potencia:[[1,2,-3,0],'W'],presion:[[1,-1,-2,0],'Pa'],
  impulso:[[1,1,-1,0],'N·s'],'cantidad-movimiento':[[1,1,-1,0],'kg·m/s'],frecuencia:[[0,0,-1,0],'Hz'],
  carga:[[0,0,1,1],'C'],'velocidad-angular':[[0,0,-1,0],'rad/s'],torque:[[1,2,-2,0],'N·m'],
  'constante-elastica':[[1,0,-2,0],'N/m']};
 assert.equal(explorer.items.length,17);assert.equal(new Set(explorer.items.map(i=>i.id)).size,17);
 for(const item of explorer.items){
  assert.deepEqual(vector(item),expected[item.id][0],item.name);
  assert.equal(item.unit,expected[item.id][1],item.name);
  assert.ok(item.relation&&item.derivation&&item.dimension&&item.explanation.length>50);
  assert.ok(Object.isFrozen(item));assert.ok(Object.isFrozen(item.exponents));
 }
 assert.equal(game.formatDimension({M:0,L:0,T:0,I:0}),'1');
 assert.equal(game.formatDimension({M:1,L:1,T:-2,I:0}),'MLT^{-2}');
 assert.match(game.formatDimension({M:null,L:1,T:-1,I:0}),/square/,'A missing exponent is not silently zero');
}

function scoring(){
 const seen=new Set();
 for(let seed=1;seed<=30;seed++){
  const s=game.createSession(explorer.items,seeded(seed*1000003));assert.equal(s.start(),true);
  const rounds=s.snapshot().rounds;
  assert.equal(rounds.length,10);assert.equal(new Set(rounds.map(r=>r.item.id)).size,10);
  assert.equal(rounds.filter(r=>r.item.id==='carga').length,1,'Every game includes the current dimension I');
  for(const {item,options} of rounds){
   seen.add(item.id);assert.equal(options.length,3);assert.equal(new Set(options.map(o=>o.value)).size,3);
   assert.equal(options.filter(o=>o.value===item.unit).length,1);
   for(const option of options.filter(o=>o.value!==item.unit))for(const candidate of explorer.items.filter(i=>i.unit===option.value)){
    assert.notDeepEqual(vector(candidate),vector(item),'Do not offer equivalent SI units as wrong answers');
   }
  }
 }
 assert.equal(seen.size,17);
 const perfect=game.createSession(explorer.items,seeded(99));
 assert.equal(perfect.choose('M',1),false);perfect.start();
 assert.equal(perfect.next(),false);assert.equal(perfect.check(),false);
 for(const invalid of ['3abc',4,-4,1.5,undefined,NaN,Infinity])assert.equal(perfect.choose('M',invalid),false);
 assert.equal(perfect.choose('X',1),false);assert.equal(perfect.choose('unit','not-a-unit'),false);
 perfect.choose('M','0');assert.equal(perfect.snapshot().selected.M,0);
 perfect.choose('M','');assert.equal(perfect.snapshot().selected.M,null,'Clearing a select removes the old answer');
 for(let i=0;i<10;i++){
  const {item}=perfect.snapshot().rounds[i];
  perfect.choose('unit',item.unit);
  for(const field of fields.slice(0,3))perfect.choose(field,String(item.exponents[field]));
  assert.equal(perfect.check(),false,'I must be explicitly answered, even when its exponent is zero');
  perfect.choose('I',String(item.exponents.I));
  assert.equal(perfect.check(),true);assert.equal(perfect.snapshot().points,2*(i+1));
  assert.equal(perfect.check(),false,'Repeated checking never awards duplicate points');
  assert.equal(perfect.choose('M',0),false,'A graded round is locked');
  assert.equal(perfect.next(),true);
 }
 assert.equal(perfect.snapshot().phase,'finished');assert.equal(perfect.snapshot().points,20);
 assert.equal(perfect.snapshot().answers.length,10);assert.equal(perfect.next(),false);
 perfect.start();assert.equal(perfect.snapshot().points,0);assert.equal(perfect.snapshot().answers.length,0);
 const partial=game.createSession(explorer.items,seeded(5));partial.start();
 for(let i=0;i<3;i++){
  const {item,options}=partial.snapshot().rounds[i];
  for(const field of fields)partial.choose(field,item.exponents[field]);
  if(i>0)partial.choose('M',item.exponents.M===0?1:0);
  partial.choose('unit',i===1?item.unit:options.find(o=>o.value!==item.unit).value);
  partial.check();partial.next();
 }
 assert.equal(partial.snapshot().points,2);
 assert.deepEqual(clone(partial.snapshot().answers.map(a=>[a.dimensionCorrect,a.unitCorrect])),[[true,false],[false,true],[false,false]]);
 partial.reset();assert.equal(partial.snapshot().phase,'ready');
}

async function integration(){
 const html=read('fisica-capitulo-01.html');
 const scripts=[...html.matchAll(/<script\b[^>]*src="([^"]+)"/g)].map(m=>m[1].split('?')[0]);
 assert.ok(scripts.indexOf(modules[0])<scripts.indexOf(modules[1]));
 for(const file of modules){assert.ok(scripts.includes(file));assert.ok(scripts.indexOf(file)<scripts.indexOf('fisica-capitulo-01.js'));}
 const h=harness(['fisica-capitulo-01-data.js',...modules]);
 const app=h.run("document.getElementById('chapter-app')"),handlers=new Map(),mathCalls=[];
 app.addEventListener=(type,handler)=>handlers.set(type,handler);
 h.run('window').renderMathInElement=(element,options)=>mathCalls.push({element,options});
 h.run(read('fisica-capitulo-01.js'));
 const click=(dataset,closest=()=>null)=>handlers.get('click')({target:{closest:()=>({dataset,disabled:false,closest})}});
 const gameHTML=()=>h.run('window.DimensionGame.render()');
 click({action:'dimension-game-start'});assert.match(gameHTML(),/Comenzar juego/);
 h.run("window.StudyMode.choose('student','free')");await h.signIn({uid:'student'});h.run('goLesson(2)');
 assert.equal(h.run('LESSONS[2].id'),'dim-dimensiones');assert.equal(h.run('LESSONS[2].examples.length'),0);
 assert.match(app.innerHTML,/id="dimension-explorer"/);assert.match(app.innerHTML,/id="dimension-game"/);
 assert.doesNotMatch(app.innerHTML,/Ejemplo resuelto|Una dimensión, varias unidades|<table\b/);
 assert.doesNotMatch(app.innerHTML,/dimensiones-geometricas\.svg/,'The removed geometry figure is not shown');
 const practiceBefore=clone(h.run('P.practice10'));

 const panel={innerHTML:''};
 const buttons=explorer.items.map(item=>({dataset:{id:item.id},attributes:{},setAttribute(k,v){this.attributes[k]=v;}}));
 const host={querySelector:()=>panel,querySelectorAll:()=>buttons};
 Object.defineProperty(host,'innerHTML',{set(){throw Error('Explorer must keep the original focused buttons');}});
 for(const item of explorer.items){
  click({action:'dimension-explorer-select',id:item.id},()=>host);
  if(item.id!=='area')assert.ok(panel.innerHTML.includes(item.unitName));
 }
 click({action:'dimension-explorer-select',id:'torque'},()=>host);
 assert.match(panel.innerHTML,/Trabajo y energía/);assert.match(panel.innerHTML,/Calor/);
 assert.match(panel.innerHTML,/Compartir dimensión no significa/);
 assert.equal(buttons.find(b=>b.dataset.id==='torque').attributes['aria-pressed'],'true');
 assert.ok(mathCalls.some(c=>c.element===panel&&c.options.trust===false));

 const gameHost=h.run("document.getElementById('dimension-game')");gameHost.querySelectorAll=()=>[];
 click({action:'dimension-game-start'});assert.match(gameHTML(),/Ronda 1 de 10/);
 click({action:'dimension-game-check'});assert.match(h.elements.get('dimension-game-message').textContent,/cuatro exponentes/);
 const name=gameHTML().match(/id="dimension-game-target"[^>]*>([^<]+)<\/h4>/)[1];
 const item=explorer.items.find(i=>i.name===name);assert.ok(item);
 const gameMarkup=gameHost.innerHTML;
 for(const field of fields){
  const select={dataset:{action:'dimension-game-exponent',field},value:String(item.exponents[field])};
  handlers.get('input')({target:select});handlers.get('change')({target:select});
 }
 assert.equal(gameHost.innerHTML,gameMarkup,'Exponent edits only update the preview; selects retain focus');
 assert.ok(mathCalls.some(c=>c.element===h.elements.get('dimension-game-preview')));
 const wrongUnit=[...gameHTML().matchAll(/data-field="unit" data-value="([^"]+)"/g)].map(m=>m[1]).find(u=>u!==item.unit);
 click({action:'dimension-game-choice',value:wrongUnit});click({action:'dimension-game-check'});
 assert.match(gameHTML(),/1 \/ 20 puntos/);assert.match(gameHTML(),/Revisa la unidad/);
 assert.ok(gameHTML().includes(item.explanation));assert.ok(gameHTML().includes(item.derivation));
 click({action:'dimension-game-check'});assert.match(gameHTML(),/1 \/ 20 puntos/);
 h.run('goLesson(1)');assert.doesNotMatch(app.innerHTML,/id="dimension-game"/);
 click({action:'dimension-game-next'});assert.match(gameHTML(),/Ronda 1 de 10/);
 h.run('goLesson(2)');assert.match(app.innerHTML,/data-id="torque" aria-pressed="true"/);
 assert.match(app.innerHTML,/1 \/ 20 puntos/);click({action:'dimension-game-next'});
 assert.match(gameHTML(),/Ronda 2 de 10/);
 h.run("goTab('practice')");click({action:'dimension-game-start'});assert.match(gameHTML(),/Ronda 2 de 10/);
 h.run("goTab('theory')");assert.match(app.innerHTML,/Ronda 2 de 10/);
 assert.deepEqual(clone(h.run('P.practice10')),practiceBefore,'Practice mastery stays independent from the game');
 assert.equal(h.run('P.contentVersion'),4);assert.equal(h.run('LESSONS.length'),7);assert.equal(h.run('CONTENT.workedExamples.length'),25);
 await h.signIn(null);assert.match(gameHTML(),/Comenzar juego/);
 click({action:'dimension-game-start'});assert.match(gameHTML(),/Comenzar juego/);
 h.run("window.StudyMode.choose('other','free')");await h.signIn({uid:'other'});h.run('goLesson(2)');
 assert.match(app.innerHTML,/Comenzar juego/);assert.match(app.innerHTML,/data-id="area" aria-pressed="true"/);
}

scientificContent();scoring();integration().then(()=>console.log('PASS: 17 dimensional references, exponent builder, equivalent-unit fairness, partial scoring, math rendering, navigation retention and student isolation.')).catch(error=>{console.error(error);process.exitCode=1;});
