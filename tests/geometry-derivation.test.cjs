const assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const {harness}=require('./study-entry.test.cjs');
const read=file=>fs.readFileSync(path.join(__dirname,'..',file),'utf8');
const clone=value=>JSON.parse(JSON.stringify(value));
const moduleFile='fisica-capitulo-01-geometria.js';
const figureFile='fisica-capitulo-01-deducciones-figuras.js';
const shapes=['area','volume','density','velocity','acceleration','force'];
const labels=['Área','Volumen','Densidad','Velocidad','Aceleración','Fuerza'];

function element(){
 return {dataset:{},innerHTML:'',textContent:'',disabled:false,attributes:{},
  setAttribute(name,value){this.attributes[name]=String(value);},getAttribute(name){return this.attributes[name];},
  focus(){},querySelector(){return null;},querySelectorAll(){return [];}};
}
function widgetHarness(){
 const host=element(),panel=element(),progress=element(),mathCalls=[];
 const document={activeElement:null,getElementById:id=>id==='geometry-derivation'?host:null};
 const controls=[...shapes.map(shape=>({action:'geometry-derivation-select',shape})),
  ...['previous','next','reset'].map(action=>({action:'geometry-derivation-'+action}))].map(dataset=>{
   const button=Object.assign(element(),{dataset,closest:()=>host});
   button.focus=()=>document.activeElement=button;return button;
  });
 const control=action=>controls.find(button=>button.dataset.action===action);
 const choices=controls.filter(button=>button.dataset.shape);
 host.querySelector=selector=>{
  if(selector==='#geometry-derivation-panel')return panel;
  if(selector==='#geometry-derivation-progress')return progress;
  const action=selector.match(/data-action=["']([^"']+)/)?.[1];
  if(action)return control(action);
  return null;
 };
 host.querySelectorAll=selector=>selector.includes('geometry-derivation-select')?choices:controls;
 host.contains=node=>controls.includes(node);
 Object.defineProperty(host,'innerHTML',{set(){throw Error('Keep the original keyboard controls mounted');}});
 const window={renderMathInElement:(node,options)=>mathCalls.push({node,options})};
 const context=vm.createContext({window,document});
 for(const file of [figureFile,moduleFile])vm.runInContext(read(file),context);
 const widget=window.GeometryDerivation;
 const click=(action,shape)=>widget.handleAction(controls.find(button=>button.dataset.action===action&&(!shape||button.dataset.shape===shape)));
 return {widget,host,panel,progress,document,controls,choices,control,click,mathCalls};
}

function sessionBehavior(){
 const {widget}=widgetHarness(),session=widget.createSession();
 const state=()=>clone(session.snapshot());
 assert.deepEqual(state(),{shape:'area',step:0});
 session.previous();assert.equal(state().step,0,'Previous cannot go below the first step');
 for(const shape of shapes){
  session.select(shape);assert.equal(state().step,0,'A newly selected quantity starts with its physical inputs');
  for(let step=1;step<=3;step++){session.next();assert.deepEqual(state(),{shape,step});}
  session.next();assert.equal(state().step,3,'Next cannot go past the dimensional result');
  session.select(shape);assert.equal(state().step,3,'Re-selecting a shape preserves its current derivation');
  for(const invalid of ['sphere','AREA',null,undefined,'<script>','__proto__','constructor','toString']){
   assert.equal(session.select(invalid),false);assert.deepEqual(state(),{shape,step:3});
  }
  const external=session.snapshot();external.step=0;external.shape='bad';
  assert.deepEqual(state(),{shape,step:3},'Mutating a snapshot cannot change the session');
  for(let step=2;step>=0;step--){session.previous();assert.deepEqual(state(),{shape,step});}
 }
 session.next();session.next();session.reset();
 assert.deepEqual(state(),{shape:'area',step:0},'A reset returns to the default area derivation');
}

function interaction(){
 const h=widgetHarness(),{widget}=h;
 const select=shape=>h.click('geometry-derivation-select',shape);
 const next=()=>h.click('geometry-derivation-next');
 const previous=()=>h.click('geometry-derivation-previous');
 const initial=widget.render();
 assert.match(initial,/id="geometry-derivation"/);assert.match(initial,/<svg\b/,'Each derivation includes a drawing');
 assert.match(initial,/Magnitudes derivadas: deducción paso a paso/);
 assert.match(initial,/data-shape="area"[^>]*aria-pressed="true"/);
 const buttons=[...initial.matchAll(/<button\b[^>]*data-shape="([^"]+)"[^>]*>(.*?)<\/button>/g)];
 assert.deepEqual(buttons.map(match=>match[1]),shapes,'All six quantities are independently selectable');
 assert.deepEqual(buttons.map(match=>match[2]),labels);
 for(const button of buttons)assert.match(button[0],/aria-controls="geometry-derivation-panel"/);
 assert.match(initial,/geometry-derivation-previous[^>]*disabled/);
 const drawings=new Set();
 for(const shape of shapes){
  select(shape);
  assert.equal(h.choices.filter(button=>button.getAttribute('aria-pressed')==='true').length,1,'Only one quantity is selected');
  assert.equal(h.choices.find(button=>button.getAttribute('aria-pressed')==='true').dataset.shape,shape);
  const panels=[widget.render()];
  for(let step=1;step<=3;step++){
   h.control('geometry-derivation-next').focus();next();panels.push(widget.render());
   assert.equal(h.progress.textContent,'Paso '+(step+1)+' de 4','Progress identifies the current step');
  }
  assert.equal(h.control('geometry-derivation-next').disabled,true);
  assert.equal(h.document.activeElement,h.control('geometry-derivation-previous'),'Focus moves to an available action when Next becomes disabled');
  const equations=panels.join('\n');
  if(shape==='area'){
   assert.match(equations,/A\s*=\s*b\s*(?:\\cdot\s*)?h/,'Area begins from the product of two lengths');
   assert.match(equations,/\[A\][\s\S]*\[b\][\s\S]*\[h\]/,'The dimension substitutes both side lengths');
   assert.match(panels[3],/L\^\{?2\}?/);assert.match(panels[3],/(?:\\mathrm\s*\{m\}|m)\^\{?2\}?|m²/);
  }else if(shape==='volume'){
   assert.match(equations,/V\s*=\s*a\s*(?:\\cdot\s*)?b\s*(?:\\cdot\s*)?c/,'Volume begins from the product of three lengths');
   assert.match(equations,/\[V\][\s\S]*\[a\][\s\S]*\[b\][\s\S]*\[c\]/,'The dimension substitutes all three side lengths');
   assert.match(panels[3],/L\^\{?3\}?/);assert.match(panels[3],/(?:\\mathrm\s*\{m\}|m)\^\{?3\}?|m³/);
  }else{
   physicalDeduction(shape,panels);
  }
  for(const panel of panels){
   const drawing=panel.match(/<svg\b[\s\S]*?<\/svg>/)?.[0];
   assert.ok(drawing,'Every step preserves the illustration');
   assert.match(drawing,/role="img"/);assert.match(drawing,/aria-label="[^"]+"/,'The drawing has an accessible description');
   assert.doesNotMatch(drawing,/<script\b|\bon\w+=|<foreignObject\b/);
  }
  drawings.add(panels[0].match(/<svg\b[\s\S]*?<\/svg>/)[0]);
  assert.ok(h.mathCalls.some(call=>call.node===h.panel&&call.options.trust===false),'New equations are rendered after a step');
  const final=widget.render();
  assert.equal(next(),false,'The disabled final-step control cannot advance');assert.equal(widget.render(),final);
  previous();previous();h.control('geometry-derivation-previous').focus();previous();
  assert.equal(h.control('geometry-derivation-previous').disabled,true);
  assert.equal(h.document.activeElement,h.control('geometry-derivation-next'),'Focus remains usable when returning to the beginning');
  const firstStep=widget.render();next();next();next();
  h.control('geometry-derivation-reset').focus();h.click('geometry-derivation-reset');
  assert.equal(widget.render(),firstStep,'Restart keeps '+shape+' selected and returns to its first step');
  assert.equal(h.document.activeElement,h.control('geometry-derivation-next'),'Restart transfers focus to the available next step');
 }
 assert.equal(drawings.size,shapes.length,'Every quantity has its own meaningful illustration');
 assert.ok(h.mathCalls.every(call=>call.node===h.panel&&call.options.trust===false&&call.options.throwOnError===false),'All newly displayed math is rendered safely within the changing panel');
 const stable=widget.render();
 next();next();next();h.control('geometry-derivation-reset').focus();h.click('geometry-derivation-reset');
 assert.equal(widget.render(),stable,'Restarting the force exercise keeps force selected and returns to its first step');
 assert.equal(h.document.activeElement,h.control('geometry-derivation-next'),'Restart transfers focus to the now available next step');
 assert.equal(h.click('geometry-derivation-previous'),false,'A disabled Previous control cannot change the first step');
 assert.equal(widget.handleAction({dataset:{action:'other'},closest:()=>h.host}),false);
 for(const shape of ['sphere','__proto__','constructor','toString'])
  assert.equal(widget.handleAction({dataset:{action:'geometry-derivation-select',shape},closest:()=>h.host}),false);
 assert.equal(widget.handleAction({dataset:{action:'geometry-derivation-select',shape:'area'},closest:()=>null}),false);
 assert.equal(widget.render(),stable,'Unsupported or detached controls cannot alter the diagram');
 widget.reset();assert.equal(widget.render(),initial,'An account reset clears the figure and current step');
}

function physicalDeduction(shape,panels){
 const equations=panels.join('\n');
 const compactTex=tex=>tex.replace(/\\mathrm|[{}\s]|\\cdot/g,'');
 const expected={
  density:{dimension:/ML\^\{?-3\}?/,symbols:[/\\rho/,/\[m\]/,/\[V\]/],formula:'\\rho=\\fracmV',unit:'\\frackgm^3',unitName:/kilogramo por metro cúbico/},
  velocity:{dimension:/LT\^\{?-1\}?/,symbols:[/\\Delta\s*x/,/\\Delta\s*t/],formula:'v_m=\\frac\\Deltax\\Deltat',unit:'\\fracms',unitName:/metro por segundo/},
  acceleration:{dimension:/LT\^\{?-2\}?/,symbols:[/\\Delta\s*v/,/\\Delta\s*t/],formula:'a_m=\\frac\\Deltav\\Deltat',unit:'\\fracms^2',unitName:/metro por segundo cuadrado/},
  force:{dimension:/MLT\^\{?-2\}?/,symbols:[/\[m\]/,/\[a\]/],formula:'F_neta=ma',unit:'N',unitName:/newton/}
 }[shape];
 const dimension=panels[3].match(/<dt>Dimensión<\/dt><dd>(.*?)<\/dd>/)?.[1];
 assert.ok(dimension,'The final step separates dimensions from SI units');
 assert.match(dimension,expected.dimension,shape+' has the correct dimensional expression');
 for(const symbol of expected.symbols)assert.match(equations,symbol,shape+' exposes each input in the dimensional substitution');
 const formulae=[...panels[1].matchAll(/\\\((.*?)\\\)/g)].map(match=>compactTex(match[1]));
 assert.ok(formulae.includes(expected.formula),shape+' begins with the correct physical relationship');
 const unit=panels[3].match(/<dt>Unidad SI<\/dt><dd>\\\((.*?)\\\)/)?.[1];
 assert.ok(unit,'The SI unit is present as mathematical notation');
 assert.equal(compactTex(unit),expected.unit,shape+' has the correct SI symbol and exponent');
 assert.match(panels[3],expected.unitName,shape+' identifies its SI unit');
 if(shape==='density')assert.match(equations,/\[V\]\s*=\s*L\^\{?3\}?/,'Density uses the volume dimension already deduced');
 if(shape==='velocity')assert.match(equations,/media|promedio/,'Displacement over an interval describes average velocity');
 if(shape==='acceleration')assert.match(equations,/media|promedio/,'The finite velocity change describes average acceleration');
 if(shape==='force'){
  assert.match(equations,/neta/,'The mass–acceleration relation uses net force');
  assert.match(equations,/masa constante/,'The applicability of F = ma is explicit');
 }
}

async function chapterIntegration(){
 const html=read('fisica-capitulo-01.html');
 const scripts=[...html.matchAll(/<script\b[^>]*src="([^"]+)"/g)].map(match=>match[1].split('?')[0]);
 assert.ok(scripts.includes(moduleFile));assert.ok(scripts.indexOf(moduleFile)<scripts.indexOf('fisica-capitulo-01.js'));
 assert.ok(scripts.includes(figureFile));assert.ok(scripts.indexOf(figureFile)<scripts.indexOf(moduleFile),'Illustrations load before the derivation widget');
 assert.match(html,/href="fisica-capitulo-01-geometria\.css\?/);
 const h=harness(['fisica-capitulo-01-data.js',figureFile,moduleFile]);
 const app=h.run("document.getElementById('chapter-app')"),handlers=new Map(),host=widgetHarness().host;
 app.addEventListener=(type,handler)=>handlers.set(type,handler);
 h.run(read('fisica-capitulo-01.js'));
 const widget=h.run('window.GeometryDerivation'),markup=()=>widget.render();
 const click=(action,shape)=>handlers.get('click')({target:{closest:()=>({dataset:{action,shape},disabled:false,closest:()=>host})}});
 const initial=markup();click('geometry-derivation-next');assert.equal(markup(),initial,'Signed-out clicks cannot change an activity');
 h.run("window.StudyMode.choose('student','free')");await h.signIn({uid:'student'});h.run('goLesson(2)');
 assert.equal(h.run('LESSONS[2].title'),'Análisis dimensional: deducciones y reglas');
 assert.match(app.innerHTML,/id="geometry-derivation"/);
 assert.doesNotMatch(app.innerHTML,/Tabla de consulta interactiva|id="dimension-explorer"|magnitudes-derivadas\.svg/);
 assert.ok(app.innerHTML.indexOf('id="geometry-derivation"')<app.innerHTML.indexOf(h.run('LESSONS[2].sections[0].examples[0].title')));
 const progress=clone(h.run('P'));
 click('geometry-derivation-select','force');click('geometry-derivation-next');click('geometry-derivation-next');
 const retained=markup();assert.notEqual(retained,initial);
 assert.deepEqual(clone(h.run('P')),progress,'The derivation is exploratory and does not change stored scores or progress');
 h.run('goLesson(1)');assert.doesNotMatch(app.innerHTML,/id="geometry-derivation"/);
 click('geometry-derivation-next');assert.equal(markup(),retained,'Another topic cannot mutate the hidden activity');
 h.run('goLesson(2)');assert.equal(markup(),retained,'Returning to the topic preserves its chosen figure and step');
 h.run("goTab('practice')");click('geometry-derivation-reset');assert.equal(markup(),retained,'Practice controls cannot reset the theory activity');
 h.run("goTab('theory')");assert.equal(markup(),retained);
 assert.deepEqual(clone(h.run('P.practice10')),progress.practice10);
 assert.equal(h.run('P.contentVersion'),6);assert.equal(h.run('LESSONS.length'),4);assert.equal(h.run('CONTENT.workedExamples.length'),10);
 await h.signIn(null);assert.equal(markup(),initial,'Signing out resets the interactive derivation');
 click('geometry-derivation-next');assert.equal(markup(),initial);
 h.run("window.StudyMode.choose('other','free')");await h.signIn({uid:'other'});h.run('goLesson(2)');
 assert.equal(markup(),initial,'Another student starts at the first area step');
}

sessionBehavior();interaction();chapterIntegration().then(()=>console.log('PASS: six physical dimensional deductions, bounded reversible steps, individual accessible drawings, keyboard focus, topic placement, navigation guards and independent student progress.')).catch(error=>{console.error(error);process.exitCode=1;});
