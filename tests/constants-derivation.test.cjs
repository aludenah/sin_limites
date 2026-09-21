const assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const {harness}=require('./study-entry.test.cjs');
const read=file=>fs.readFileSync(path.join(__dirname,'..',file),'utf8');
const clone=value=>JSON.parse(JSON.stringify(value));
const moduleFile='fisica-capitulo-01-constantes.js';
const cards=['spring','gravity-planck'];
const examples={
 spring:{interactive:'spring',title:'Ejemplo complementario. Constante de un resorte',question:'En \\(F=kx\\), obtén la dimensión de \\(k\\).'},
 'gravity-planck':{interactive:'gravity-planck',title:'Ejemplo complementario. Gravitación y constante de Planck',question:'Deduce las dimensiones de \\(G\\) y de \\(h\\).'}
};
const initialState={spring:0,gravityPlanck:'gravity',gravity:0,planck:0};

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
  if(card==='gravity-planck')definitions.push(...['gravity','planck'].map(constant=>({action:'constant-derivation-select',card,constant})));
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
 for(let i=0;i<5;i++)session.next('spring');
 assert.deepEqual(state(),{...initialState,spring:3},'Spring is bounded and independent from the other card');
 session.next('gravity-planck');session.next('gravity-planck');session.select('planck');
 assert.deepEqual(state(),{spring:3,gravityPlanck:'planck',gravity:2,planck:0},'Planck has its own first step');
 for(let i=0;i<5;i++)session.next('gravity-planck');
 session.select('gravity');assert.equal(state().gravity,2,'Switching back preserves gravity progress');
 session.select('planck');assert.equal(state().planck,3,'Switching back preserves Planck progress');
 session.restart('gravity-planck');
 assert.deepEqual(state(),{spring:3,gravityPlanck:'planck',gravity:2,planck:0},'Restart affects only the active constant');
 session.select('gravity');session.previous('gravity-planck');assert.equal(state().gravity,1);
 const stable=state();
 for(const invalid of ['__proto__','constructor','toString','bad',null,undefined]){
  assert.equal(session.select(invalid),false);
  for(const action of ['next','previous','restart'])assert.equal(session[action](invalid),false);
  assert.deepEqual(state(),stable,'Unsupported constants and cards cannot mutate another derivation');
 }
 const external=session.snapshot();external.spring=0;external.gravityPlanck='bad';
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

function interaction(){
 const h=widgetHarness(),{widget}=h;
 const markup=card=>widget.render(examples[card]);
 const initial=cards.map(markup);
 for(const card of cards){
  assert.match(markup(card),new RegExp('id="constant-derivation-'+card+'"'));
  assert.ok(markup(card).includes(examples[card].title));assert.ok(markup(card).includes(examples[card].question));
  assert.match(markup(card),/constant-derivation-previous[^>]*disabled/);
 }
 for(const constant of ['spring','gravity','planck']){
  const card=constant==='spring'?'spring':'gravity-planck';
  if(card==='gravity-planck')h.click(card,'select',constant);
  const other=cards.find(id=>id!==card),unaffected=markup(other),panels=[markup(card)];
  for(let step=1;step<=3;step++){
   h.control(card,'next').focus();h.click(card,'next');panels.push(markup(card));
   assert.match(h.panels.get(card).innerHTML,new RegExp('Paso '+(step+1)+' de 4'));
   assert.equal(markup(other),unaffected,'Changing a step cannot change the neighboring example');
  }
  formulas(constant,panels);
  assert.equal(h.control(card,'next').disabled,true);
  assert.equal(h.document.activeElement,h.control(card,'previous'),'A newly disabled Next control transfers focus to Previous');
  const final=markup(card);h.click(card,'next');assert.equal(markup(card),final,'The last step is bounded');
  h.click(card,'previous');h.click(card,'previous');h.control(card,'previous').focus();h.click(card,'previous');
  assert.equal(h.control(card,'previous').disabled,true);
  assert.equal(h.document.activeElement,h.control(card,'next'),'First-step focus remains on an available control');
  assert.equal(markup(card),panels[0],'All steps can be reversed');
  h.click(card,'next');h.click(card,'next');h.control(card,'restart').focus();h.click(card,'restart');
  assert.equal(markup(card),panels[0],'Restart returns only the selected constant to its first step');
  assert.equal(h.document.activeElement,h.control(card,'next'));
 }
 assert.ok(h.mathCalls.length>0);
 assert.ok(h.mathCalls.every(call=>[...h.panels.values()].includes(call.node)&&call.options.trust===false&&call.options.throwOnError===false),'Math is rendered safely in the changed panel');
 const stable=cards.map(markup);
 assert.equal(widget.handleAction({dataset:{action:'other'},closest:()=>h.hosts.get('spring')}),false);
 assert.equal(widget.handleAction({dataset:{action:'constant-derivation-next',card:'bad'},closest:()=>h.hosts.get('spring')}),false);
 assert.equal(widget.handleAction({dataset:{action:'constant-derivation-next',card:'spring'},closest:()=>null}),false);
 assert.deepEqual(cards.map(markup),stable,'Unrelated and detached controls cannot mutate the examples');
 h.click('spring','next');h.click('gravity-planck','next');widget.reset();
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
 const initial=markup();click('spring','next');assert.deepEqual(markup(),initial,'Signed-out clicks cannot change a walkthrough');
 h.run("window.StudyMode.choose('student','free')");await h.signIn({uid:'student'});h.run('goLesson(2)');
 for(const card of cards)assert.match(app.innerHTML,new RegExp('id="constant-derivation-'+card+'"'));
 assert.equal(h.run('LESSONS[2].sections[0].examples[0].interactive'),'spring');
 assert.equal(h.run('LESSONS[2].sections[0].examples[1].interactive'),'gravity-planck');
 const progress=clone(h.run('P'));
 click('spring','next');click('gravity-planck','select','planck');click('gravity-planck','next');
 const retained=markup();assert.notDeepEqual(retained,initial);
 assert.deepEqual(clone(h.run('P')),progress,'Resolving constants does not award practice points or modify stored progress');
 h.run('goLesson(1)');click('spring','next');assert.deepEqual(markup(),retained,'Hidden examples cannot be advanced from a different topic');
 h.run('goLesson(2)');assert.deepEqual(markup(),retained,'The current steps survive chapter navigation');
 h.run("goTab('practice')");click('spring','restart');assert.deepEqual(markup(),retained,'Practice controls cannot mutate theory examples');
 h.run("goTab('theory')");assert.deepEqual(markup(),retained);
 assert.equal(h.run('LESSONS.length'),5);assert.equal(h.run('CONTENT.workedExamples.length'),25);assert.equal(h.run('window.ChapterPractice.questions(CHAPTER_ID).length'),10);
 assert.deepEqual(clone(h.run('P.practice10')),progress.practice10);
 await h.signIn(null);assert.deepEqual(markup(),initial,'Signing out clears all three constants');
 h.run("window.StudyMode.choose('other','free')");await h.signIn({uid:'other'});h.run('goLesson(2)');
 assert.deepEqual(markup(),initial,'Another student begins from the initial step');
}

sessions();interaction();chapterIntegration().then(()=>console.log('PASS: spring, gravity and Planck dimensions, independent reversible steps, safe math and keyboard focus, topic guards and unchanged student progress.')).catch(error=>{console.error(error);process.exitCode=1;});
