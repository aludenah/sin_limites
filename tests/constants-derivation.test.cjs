const assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const {harness}=require('./study-entry.test.cjs');
const read=file=>fs.readFileSync(path.join(__dirname,'..',file),'utf8');
const clone=value=>JSON.parse(JSON.stringify(value));
const moduleFile='fisica-capitulo-01-constantes.js';
const cards=['physical-constants','dimension-one'];
const constantOrder=['spring','planck','gravity'];
const dimensionOrder=['friction','sine','exponential'];
const stepTotals={spring:4,planck:4,gravity:4,friction:4,sine:2,exponential:4};
const groups={'physical-constants':constantOrder,'dimension-one':dimensionOrder};
const examples={
 'physical-constants':{interactive:'physical-constants',title:'Constantes físicas: de menor a mayor dificultad',question:'Resuelve los tres ejemplos en orden: resorte, Planck y gravitación. Puedes volver a cada uno conservando el paso en el que te quedaste.'},
 'dimension-one':{interactive:'dimension-one',title:'Dimensión uno: de menor a mayor dificultad',question:'Resuelve los tres ejemplos en orden: rozamiento, seno y exponencial. Puedes volver a cada uno conservando el paso en el que te quedaste.'}
};
const initialState={selected:'spring',selectedDimension:'friction',spring:0,planck:0,gravity:0,friction:0,sine:0,exponential:0};

function element(){
 return {dataset:{},innerHTML:'',textContent:'',disabled:false,attributes:{},
  setAttribute(name,value){this.attributes[name]=String(value);},getAttribute(name){return this.attributes[name];},
  focus(){},querySelector(){return null;},querySelectorAll(){return [];}};
}
function widgetHarness(){
 const hosts=new Map(),panels=new Map(),buttons=[],mathCalls=[];
 const document={activeElement:null,getElementById:id=>[...hosts.values(),...panels.values()].find(node=>node.id===id)||null};
 for(const card of cards){
  const host=Object.assign(element(),{id:'constant-derivation-'+card}),panel=Object.assign(element(),{id:host.id+'-panel'});
  hosts.set(card,host);panels.set(card,panel);
  const definitions=['previous','next','restart'].map(action=>({action:'constant-derivation-'+action,card}));
  definitions.push(...groups[card].map(constant=>({action:'constant-derivation-select',card,constant})));
  const controls=definitions.map(dataset=>{
   const button=Object.assign(element(),{dataset,closest:()=>host});
   button.focus=()=>document.activeElement=button;return button;
  });
  buttons.push(...controls);
  host.querySelector=selector=>{
   if(selector==='#'+panel.id)return panel;
   const action=selector.match(/data-action=["']([^"']+)/)?.[1];
   const constant=selector.match(/data-constant=["']([^"']+)/)?.[1];
   if(action)return controls.find(button=>button.dataset.action===action&&(!constant||button.dataset.constant===constant))||null;
   return null;
  };
  host.querySelectorAll=selector=>selector.includes('constant-derivation-select')?controls.filter(button=>button.dataset.constant):controls;
  host.contains=node=>controls.includes(node);
  Object.defineProperty(host,'innerHTML',{set(){throw Error('Step updates must keep the original keyboard controls mounted');}});
 }
 const window={renderMathInElement:(node,options)=>mathCalls.push({node,options})};
 vm.runInContext(read(moduleFile),vm.createContext({window,document}));
 const widget=window.ConstantDerivations;
 const control=(card,action,constant)=>buttons.find(button=>button.dataset.card===card&&button.dataset.action==='constant-derivation-'+action&&(!constant||button.dataset.constant===constant));
 const click=(card,action,constant)=>widget.handleAction(control(card,action,constant));
 return {widget,hosts,panels,buttons,document,mathCalls,control,click};
}

function sessions(){
 const {widget}=widgetHarness(),session=widget.createSession(),state=()=>clone(session.snapshot());
 assert.deepEqual(state(),initialState);
 for(const card of cards){session.previous(card);assert.deepEqual(state(),initialState,'Previous cannot go below step 1');}
 for(let i=0;i<5;i++)session.next('physical-constants');
 assert.deepEqual(state(),{...initialState,spring:3},'The default spring derivation is bounded and independent');
 session.select('planck');session.next('physical-constants');session.next('physical-constants');session.select('gravity');
 assert.deepEqual(state(),{...initialState,spring:3,selected:'gravity',planck:2},'Gravity has its own first step');
 for(let i=0;i<5;i++)session.next('physical-constants');
 for(const constant of constantOrder){
  session.select(constant);assert.equal(state()[constant],constant==='planck'?2:3,'Switching back preserves '+constant+' progress');
 }
 session.restart('physical-constants');
 assert.deepEqual(state(),{...initialState,selected:'gravity',spring:3,planck:2},'Restart affects only the selected constant');
 session.select('planck');session.previous('physical-constants');assert.equal(state().planck,1);
 for(const constant of dimensionOrder){
  const card='dimension-one';session.select(constant,card);
  const before=state();
  for(let i=0;i<5;i++)session.next(card);
  assert.deepEqual(state(),{...before,[constant]:stepTotals[constant]-1},'Each dimension-one example advances independently to its own last step');
  session.previous(card);assert.equal(state()[constant],stepTotals[constant]-2);
  session.restart(card);assert.deepEqual(state(),before,'Restart preserves the other examples');
 }
 const stable=state();
 for(const invalid of ['__proto__','constructor','toString','bad',null,undefined]){
  assert.equal(session.select(invalid),false);
  assert.equal(session.select(invalid,'dimension-one'),false);
  for(const action of ['next','previous','restart'])assert.equal(session[action](invalid),false);
  assert.deepEqual(state(),stable,'Unsupported constants and cards cannot mutate another derivation');
 }
 for(const card of cards)for(const constant of groups[cards.find(value=>value!==card)]){
  assert.equal(session.select(constant,card),false,'An example cannot be selected in the other group');
  assert.deepEqual(state(),stable);
 }
 const external=session.snapshot();external.spring=0;external.selected='bad';
 assert.deepEqual(state(),stable,'Snapshots cannot mutate the internal state');
 session.reset();assert.deepEqual(state(),initialState);
}

function formulas(constant,panels){
 const compact=text=>text.replace(/\\(?:mathrm|text)\s*\{([^}]*)\}/g,'$1').replace(/[{}\s]/g,'').replace(/\\cdot/g,'');
 const all=compact(panels.join('\n')),final=compact(panels[3]);
 const expected={
  spring:{law:'F=kx',isolated:'k=\\fracFx',substitution:'\\fracMLT^-2L',dimension:'MT^-2',unit:/N\s*\/\s*m|\\frac\{?N\}?\{?m\}?|newton por metro/},
  gravity:{law:'F=G\\fracm_1m_2r^2',isolated:'G=\\fracFr^2m_1m_2',substitution:'\\frac(MLT^-2)L^2MM',dimension:'M^-1L^3T^-2',unit:/m³|m\^\{?3\}?|metro cúbico/},
  planck:{law:'E=hf',isolated:'h=\\fracEf',substitution:'\\fracML^2T^-2T^-1',dimension:'ML^2T^-1',unit:/J[·\s]*s|joule segundo|\\mathrm\{J\}[\s\\,cdot]*\\mathrm\{s\}/}
 }[constant];
 assert.ok(all.includes(expected.law),constant+' starts with its physical law');
 assert.ok(compact(panels[1]).includes(expected.isolated),constant+' isolates the unknown constant');
 assert.ok(compact(panels[2]).includes(expected.substitution),constant+' substitutes all known dimensions before simplifying');
 assert.ok(final.includes(expected.dimension),constant+' ends with the correct simplified dimensions');
 assert.match(panels[3],expected.unit,constant+' has the correct SI unit');
 assert.doesNotMatch(panels[0],/Unidad SI|<dt>Dimensión<\/dt>/,'The complete final result is hidden at the start');
 assert.match(panels[0],/Paso 1 de 4/);assert.match(panels[3],/Paso 4 de 4/);
 if(constant==='gravity')assert.match(panels[3],/kg|kilogramo/);
 if(constant==='spring')assert.match(panels[0],/deformación/);
 if(constant==='planck')assert.match(panels[0],/frecuencia/);
}

function dimensionOneFormulas(card,panels){
 const compact=text=>text.replace(/\\(?:mathrm|text)\s*\{([^}]*)\}/g,'$1').replace(/[{}\s]/g,'').replace(/\\(?:left|right|,|!|cdot)/g,'');
 const steps=panels.map(compact),all=steps.join('\n');
 assert.equal(panels.length,stepTotals[card],'Each exercise retains its requested number of steps');
 assert.match(panels[0],new RegExp('Paso 1 de '+stepTotals[card]));
 assert.match(panels.at(-1),new RegExp('Paso '+stepTotals[card]+' de '+stepTotals[card]));
 assert.doesNotMatch(panels[0],/<dt>Dimensión<\/dt>|0[,.]30|0[,.]10/,'Students must advance before seeing the numerical solution');
 if(card==='friction'){
  assert.ok(all.includes('F_r=\\mu_kF_N'),'The coefficient relates friction and normal force');
  assert.ok(all.includes('\\mu_k=\\fracF_rF_N'),'The solution isolates the coefficient');
  assert.ok(all.includes('\\fracMLT^-2MLT^-2'),'Both forces are replaced by the same dimensions');
  assert.ok(all.includes('[\\mu_k]=1')||all.includes('[\\mu_k]=M^0L^0T^0=1'),'All dimensional exponents cancel');
  assert.ok(steps[3].includes('M^0L^0T^0=1'),'The last step simplifies the canceled dimensions to one');
  assert.match(panels[3],/<dt>Dimensión de μₖ<\/dt><dd>\\\(1\\\)<\/dd>/,'The result contains only the coefficient dimension');
  assert.doesNotMatch(panels.join('\n'),/30|100|0[,.]30|¿Tener dimensión uno|calcula su valor|Unidad SI/i,'The friction walkthrough asks only for the dimension, without numerical values or a unit result');
 }else if(card==='sine'){
  assert.ok(all.includes('y=A\\operatornamesen('),'The displacement equation uses the Spanish operator sen');
  assert.ok(steps[0].includes('[y]=L'),'The displacement dimension is the known input');
  assert.doesNotMatch(steps[0],/\[A\]=L/,'The unknown amplitude dimension is not given at the beginning');
  assert.ok(all.includes('[t]=[\\tau]=T'),'Time and period have matching dimensions');
  assert.match(steps[1],/\[A\]=\\frac\[y\]\[\\operatornamesen/,'One Next action reaches the direct amplitude deduction');
  assert.ok(steps[1].includes('\\fracL1=L'),'The amplitude dimension is length divided by dimension one');
  assert.match(panels[1],/<dt>Dimensión de A<\/dt><dd>\\\(L\\\)<\/dd>/,'The second step answers the requested dimension of A');
  assert.doesNotMatch(panels.join('\n'),/\\(?:phi|varphi)\b|Analiza el argumento del seno|Determina la dimensión del seno/,'Removed intermediate steps and their auxiliary symbol do not remain');
  assert.doesNotMatch(panels.join('\n'),/\\sin\b|Dimensión de y/,'Every sine formula uses sen and the result targets A');
  assert.doesNotMatch(all,/0[,\.]20|0[,\.]10|\\frac\\pi6|\\frac12|\\tau=12|Luegocalcula|valoresnuméricos|UnidadSI/i,'The sine walkthrough asks only for dimensions, without numerical calculations or a unit result');
 }else{
  assert.doesNotMatch(panels[0],/kg\/s|kilogramo por segundo|3[,.]68/,'The coefficient unit and numerical result are discovered after advancing');
  assert.match(all,/v=v_0(?:e|\\exp)/,'The decay law multiplies initial speed by an exponential');
  assert.ok(all.includes('[m]=M')&&all.includes('[t]=T'),'The coefficient is deduced from known mass and time dimensions');
  assert.match(all,/\[-?\\fracbtm\]=1|\[.*\]=\\frac\[b\]T(?:M|\[m\])=1/,'The full exponent must have dimension one');
  assert.ok(all.includes('[b]=MT^-1')||all.includes('[b]=\\fracMT=MT^-1'),'The coefficient has mass divided by time dimensions');
  assert.match(panels[2]+panels[3],/kilogramo por segundo|kg.*s/,'The coefficient is expressed in kilograms per second');
  assert.match(all,/\[(?:e|\\exp).*\]=1/,'The exponential itself is dimensionless');
  assert.match(all,/\[v\]=[^<]*=LT\^-1|\[v\]=LT\^-1/,'The resulting speed retains its dimension');
  assert.match(steps[3],/10/);assert.match(steps[3],/3[,\.]68/,'Ten times exp(-1) is approximately 3.68 m/s');
  assert.match(steps[3],/e\^-1|\\exp\(-1\)|\\frac10e/,'The numerical exponent equals minus one');
  assert.match(panels[3],/Dimensión de b/);assert.match(panels[3],/Unidad SI de b/,'The result box identifies the coefficient rather than the exponent');
 }
}

function interaction(){
 const h=widgetHarness(),{widget}=h;
 const markup=card=>widget.render(examples[card]);
 const initial=cards.map(markup);
 for(const card of cards){
  assert.match(markup(card),new RegExp('id="constant-derivation-'+card+'"'));
  assert.ok(markup(card).includes(examples[card].title));assert.ok(markup(card).includes(examples[card].question));
  assert.match(markup(card),/constant-derivation-previous[^>]*disabled/);
 }
 for(const card of cards){
  const selectors=[...markup(card).matchAll(/<button\b[^>]*data-constant="([^"]+)"[^>]*>(.*?)<\/button>/g)];
  assert.deepEqual(selectors.map(match=>match[1]),groups[card],'Each group follows its prescribed difficulty order');
  for(const [index,label] of ['Básico','Intermedio','Avanzado'].entries())assert.match(selectors[index][2],new RegExp(label));
  assert.match(selectors[0][0],/aria-pressed="true"/,'The first exercise is selected by default');
  assert.ok(selectors.slice(1).every(match=>match[0].includes('aria-pressed="false"')));
 }
 for(const constant of [...constantOrder,...dimensionOrder]){
  const card=constantOrder.includes(constant)?'physical-constants':'dimension-one';
  {
   const otherCard=cards.find(value=>value!==card),otherBefore=markup(otherCard);
   h.click(card,'select',constant);
   assert.equal(markup(otherCard),otherBefore,'Selecting an example does not alter the other group selection or step');
   const prompt=markup(card).match(/<div class="constant-derivation-prompt">([\s\S]*?)<\/div>/)?.[1];
   assert.ok(prompt,'The selected constant includes its own exercise statement');
   const laws={spring:/F=kx/,planck:/E=hf/,gravity:/F=G/,friction:/F_r=\\mu_k/,sine:/y=A\\operatorname\{sen\}/,exponential:/v=v_0(?:e|\\exp)/};
   assert.match(prompt,laws[constant]);
   for(const other of [...constantOrder,...dimensionOrder].filter(value=>value!==constant))assert.doesNotMatch(prompt,laws[other],'Other exercises do not appear in the active statement');
   assert.match(markup(card),new RegExp('Ejemplo '+(groups[card].indexOf(constant)+1)+' de 3'),'The selected example reports its position in the progression');
  }
  const other=cards.filter(id=>id!==card),unaffected=other.map(markup),panels=[markup(card)];
  for(let step=1;step<stepTotals[constant];step++){
   h.control(card,'next').focus();h.click(card,'next');panels.push(markup(card));
   assert.match(h.panels.get(card).innerHTML,new RegExp('Paso '+(step+1)+' de '+stepTotals[constant]));
   assert.deepEqual(other.map(markup),unaffected,'Changing a step cannot change any neighboring example');
  }
  if(card==='dimension-one')dimensionOneFormulas(constant,panels);else formulas(constant,panels);
  assert.equal(h.control(card,'next').disabled,true);
  assert.equal(h.document.activeElement,h.control(card,'previous'),'A newly disabled Next control transfers focus to Previous');
  const final=markup(card);h.click(card,'next');assert.equal(markup(card),final,'The last step is bounded');
  for(let step=stepTotals[constant]-1;step>0;step--){h.control(card,'previous').focus();h.click(card,'previous');}
  assert.equal(h.control(card,'previous').disabled,true);
  assert.equal(h.document.activeElement,h.control(card,'next'),'First-step focus remains on an available control');
  assert.equal(markup(card),panels[0],'All steps can be reversed');
  h.click(card,'next');h.click(card,'next');h.control(card,'restart').focus();h.click(card,'restart');
  assert.equal(markup(card),panels[0],'Restart returns only the selected constant to its first step');
  assert.equal(h.document.activeElement,h.control(card,'next'));
 }
 assert.ok(h.mathCalls.length>0);
 assert.ok(h.mathCalls.every(call=>[...h.panels.values()].includes(call.node)&&call.options.trust===false&&call.options.throwOnError===false),'Math is rendered safely in the changed panel');
 for(const card of cards){
  for(const [index,constant] of groups[card].entries()){
   h.click(card,'select',constant);
   for(let step=0;step<=index;step++)h.click(card,'next');
  }
  for(const [index,constant] of groups[card].entries()){
   h.click(card,'select',constant);
   assert.match(markup(card),new RegExp('Paso '+Math.min(index+2,stepTotals[constant])+' de '+stepTotals[constant]),'Switching exercises preserves each displayed step with its own limit');
  }
  h.click(card,'restart');
  assert.match(markup(card),/Ejemplo 3 de 3[\s\S]*Paso 1 de 4/,'Restart retains the selected advanced exercise');
  h.click(card,'select',groups[card][0]);assert.match(markup(card),/Paso 2 de 4/,'Restarting the advanced example does not restart the basic example');
 }
 const stable=cards.map(markup);
 assert.equal(widget.handleAction({dataset:{action:'other'},closest:()=>h.hosts.get('physical-constants')}),false);
 assert.equal(widget.handleAction({dataset:{action:'constant-derivation-next',card:'bad'},closest:()=>h.hosts.get('physical-constants')}),false);
 assert.equal(widget.handleAction({dataset:{action:'constant-derivation-next',card:'physical-constants'},closest:()=>null}),false);
 for(const card of ['spring','gravity-planck','friction','sine'])assert.equal(widget.handleAction({dataset:{action:'constant-derivation-next',card},closest:()=>h.hosts.get('physical-constants')}),false,'Obsolete separate-card controls cannot mutate the unified activity');
 for(const card of cards)for(const constant of groups[cards.find(value=>value!==card)])assert.equal(widget.handleAction({dataset:{action:'constant-derivation-select',card,constant},closest:()=>h.hosts.get(card)}),false,'Selectors reject exercises from the other group');
 assert.deepEqual(cards.map(markup),stable,'Unrelated and detached controls cannot mutate the examples');
 for(const card of cards)h.click(card,'next');widget.reset();
 assert.deepEqual(cards.map(markup),initial,'Signing out can clear every walkthrough');
}

async function chapterIntegration(){
 const html=read('fisica-capitulo-01.html'),scripts=[...html.matchAll(/<script\b[^>]*src="([^"]+)"/g)].map(match=>match[1].split('?')[0]);
 assert.ok(scripts.includes(moduleFile));assert.ok(scripts.indexOf(moduleFile)<scripts.indexOf('fisica-capitulo-01.js'));
 assert.match(html,/href="fisica-capitulo-01-constantes\.css\?/);
 const h=harness(['fisica-capitulo-01-data.js',moduleFile]),handlers=new Map(),ui=widgetHarness();
 const app=h.run("document.getElementById('chapter-app')");app.addEventListener=(type,handler)=>handlers.set(type,handler);
 h.run(read('fisica-capitulo-01.js'));
 const widget=h.run('window.ConstantDerivations'),markup=()=>cards.map(card=>widget.render(examples[card]));
 const click=(card,action,constant)=>handlers.get('click')({target:{closest:()=>ui.control(card,action,constant)}});
 const initial=markup();click('physical-constants','next');assert.deepEqual(markup(),initial,'Signed-out clicks cannot change a walkthrough');
 h.run("window.StudyMode.choose('student','free')");await h.signIn({uid:'student'});h.run('goLesson(2)');
 for(const card of cards)assert.match(app.innerHTML,new RegExp('id="constant-derivation-'+card+'"'));
 assert.equal(h.run('LESSONS[2].sections[0].examples.length'),1,'The former two cards are merged into one example block');
 assert.equal(h.run('LESSONS[2].sections[0].examples[0].interactive'),'physical-constants');
 assert.equal((app.innerHTML.match(/id="constant-derivation-physical-constants"/g)||[]).length,1,'The shared constants widget is mounted once');
 assert.doesNotMatch(app.innerHTML,/id="constant-derivation-(?:spring|gravity-planck|friction|sine)"/,'The former separate example cards are absent');
 assert.equal(h.run('LESSONS[2].sections[1].examples.length'),1);
 assert.equal(h.run('LESSONS[2].sections[1].examples[0].interactive'),'dimension-one');
 assert.equal((app.innerHTML.match(/id="constant-derivation-dimension-one"/g)||[]).length,1,'The shared dimension-one widget is mounted once');
 assert.doesNotMatch(app.innerHTML,/Aplicación 7\. Una expresión con presión y área|Ejemplo complementario\. Productos y cocientes/,'The previous rule examples are replaced in theory');
 const progress=clone(h.run('P'));
 click('physical-constants','select','gravity');click('dimension-one','select','exponential');for(const card of cards)click(card,'next');
 const retained=markup();assert.notDeepEqual(retained,initial);
 assert.deepEqual(clone(h.run('P')),progress,'Resolving constants does not award practice points or modify stored progress');
 h.run('goLesson(1)');for(const card of cards)click(card,'next');assert.deepEqual(markup(),retained,'Hidden examples cannot be advanced from a different topic');
 h.run('goLesson(2)');assert.deepEqual(markup(),retained,'The current steps survive chapter navigation');
 h.run("goTab('practice')");for(const card of cards)click(card,'restart');assert.deepEqual(markup(),retained,'Practice controls cannot mutate theory examples');
 h.run("goTab('theory')");assert.deepEqual(markup(),retained);
 assert.equal(h.run('LESSONS.length'),5);assert.equal(h.run('CONTENT.workedExamples.length'),25);assert.equal(h.run('window.ChapterPractice.questions(CHAPTER_ID).length'),10);
 assert.deepEqual(clone(h.run('P.practice10')),progress.practice10);
 await h.signIn(null);assert.deepEqual(markup(),initial,'Signing out clears every example');
 h.run("window.StudyMode.choose('other','free')");await h.signIn({uid:'other'});h.run('goLesson(2)');
 assert.deepEqual(markup(),initial,'Another student begins from the initial step');
}

sessions();interaction();chapterIntegration().then(()=>console.log('PASS: dimensional and dimension-one examples, numerical checks, independent reversible steps, safe math and keyboard focus, topic guards and unchanged student progress.')).catch(error=>{console.error(error);process.exitCode=1;});
