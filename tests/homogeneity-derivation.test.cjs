const assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const {harness}=require('./study-entry.test.cjs');
const read=file=>fs.readFileSync(path.join(__dirname,'..',file),'utf8');
const clone=value=>JSON.parse(JSON.stringify(value));
const order=['formula-check','pressure-speed','two-coefficients','dimensionless-exponent','oscillation'];
const totals={'formula-check':2,'pressure-speed':3,'two-coefficients':3,'dimensionless-exponent':3,oscillation:3};
const groups={homogeneity:order,'physical-constants':['spring','planck','gravity'],'dimension-one':['friction','sine','exponential']};
const example={interactive:'homogeneity',title:'Homogeneidad: de menor a mayor dificultad',question:'Resuelve los cinco ejemplos en orden.'};
const compact=text=>text.replace(/\\(?:mathrm|text)\s*\{([^}]*)\}/g,'$1').replace(/[{}\s]/g,'').replace(/\\(?:left|right|,|!|cdot|quad|qquad)/g,'');

function ui(){
 const document={activeElement:null},hosts=new Map(),panels=new Map(),buttons=[],mathCalls=[];
 for(const [card,items] of Object.entries(groups)){
  const panel={innerHTML:''},host={};panels.set(card,panel);hosts.set(card,host);
  const controls=[...items.map(constant=>({card,constant,action:'constant-derivation-select'})),...['previous','next','restart'].map(action=>({card,action:'constant-derivation-'+action}))].map(dataset=>{
   const button={dataset,disabled:false,attributes:{},closest:()=>host,setAttribute(name,value){this.attributes[name]=value;},focus(){document.activeElement=this;}};return button;
  });buttons.push(...controls);
  host.querySelector=selector=>{
   if(selector==='#constant-derivation-'+card+'-panel')return panel;
   const action=selector.match(/data-action="([^"]+)"/)?.[1];
   return controls.find(button=>button.dataset.action===action)||null;
  };
  host.querySelectorAll=selector=>selector.includes('constant-derivation-select')?controls.filter(button=>button.dataset.constant):controls;
  Object.defineProperty(host,'innerHTML',{set(){throw Error('Navigation must retain mounted controls');}});
 }
 const window={renderMathInElement:(node,options)=>mathCalls.push({node,options})};
 vm.runInContext(read('fisica-capitulo-01-constantes.js'),vm.createContext({window,document}));
 const control=(action,constant,card='homogeneity')=>buttons.find(button=>button.dataset.card===card&&button.dataset.action==='constant-derivation-'+action&&(!constant||button.dataset.constant===constant));
 return {widget:window.ConstantDerivations,document,hosts,panels,mathCalls,control};
}

function sessionAndContent(){
 const h=ui(),session=h.widget.createSession(),initial=clone(session.snapshot());
 assert.equal(initial.selectedHomogeneity,'formula-check');
 const selectedStep={};
 for(const [index,id] of order.entries()){
  assert.equal(session.select(id,'physical-constants'),false,'Homogeneity exercises cannot be selected in another group');
  session.select(id,'homogeneity');session.previous('homogeneity');assert.equal(session.snapshot()[id],0);
  for(let step=0;step<5;step++)session.next('homogeneity');
  assert.equal(session.snapshot()[id],totals[id]-1,'Model bounds use the selected example length');
  session.previous('homogeneity');selectedStep[id]=totals[id]-2;
 }
 for(const id of order){session.select(id,'homogeneity');assert.equal(session.snapshot()[id],selectedStep[id],'Model retains each independent step');}
 const before=clone(session.snapshot());session.restart('homogeneity');
 assert.deepEqual(clone(session.snapshot()),{...before,oscillation:0},'Restart affects only the selected homogeneity example');
 for(const invalid of ['bad','__proto__','constructor','spring'])assert.equal(session.select(invalid,'homogeneity'),false);
 session.reset();assert.deepEqual(clone(session.snapshot()),initial);

 const render=()=>h.widget.render(example),click=(action,id)=>h.widget.handleAction(h.control(action,id));
 const initialHTML=render(),selectors=[...initialHTML.matchAll(/<button\b[^>]*data-constant="([^"]+)"[^>]*>(.*?)<\/button>/g)];
 assert.deepEqual(selectors.map(match=>match[1]),order);
 for(const [index,difficulty] of ['Básico','Intermedio','Intermedio','Avanzado','Avanzado'].entries())assert.ok(selectors[index][2].includes(difficulty));
 assert.match(selectors[0][0],/aria-pressed="true"/);
 const otherBefore=['physical-constants','dimension-one'].map(card=>h.widget.render({interactive:card,title:card,question:''}));
 for(const [index,id] of order.entries()){
  click('select',id);const panels=[render()];
  assert.match(panels[0],new RegExp('Ejemplo '+(index+1)+' de 5'));
  assert.match(panels[0],new RegExp('Paso 1 de '+totals[id]));
  assert.doesNotMatch(panels[0],/<dl\b/,'The initial step does not expose the result');
  for(let step=1;step<totals[id];step++){
   h.control('next').focus();click('next');panels.push(render());
   assert.match(h.panels.get('homogeneity').innerHTML,new RegExp('Paso '+(step+1)+' de '+totals[id]));
  }
  checkPhysics(id,panels);
  assert.equal(h.control('next').disabled,true);assert.equal(h.document.activeElement,h.control('previous'));
  const final=render();click('next');assert.equal(render(),final,'Next is bounded at the actual last step');
  for(let step=totals[id]-1;step>0;step--){h.control('previous').focus();click('previous');}
  assert.equal(render(),panels[0]);assert.equal(h.control('previous').disabled,true);assert.equal(h.document.activeElement,h.control('next'));
  click('next');h.control('restart').focus();click('restart');
  assert.equal(render(),panels[0]);assert.equal(h.document.activeElement,h.control('next'));
  click('next');
 }
 for(const id of order){click('select',id);assert.match(render(),new RegExp('Paso 2 de '+totals[id]),'Changing example retains its current step');}
 assert.deepEqual(['physical-constants','dimension-one'].map(card=>h.widget.render({interactive:card,title:card,question:''})),otherBefore,'The topic 3 groups retain their state');
 assert.ok(h.mathCalls.length>0&&h.mathCalls.every(call=>call.node===h.panels.get('homogeneity')&&call.options.trust===false&&call.options.throwOnError===false),'Only updated equations are safely typeset');
 h.widget.reset();assert.equal(render(),initialHTML);
}

function checkPhysics(id,panels){
 const all=compact(panels.join('\n')),last=compact(panels.at(-1));
 if(id==='formula-check'){
  assert.ok(all.includes('d=vt')&&all.includes('v_f=v_0+at'),'Both original equations remain');
  assert.match(all,/\[vt\]=[^<]*L/);assert.match(last,/\[at\]=[^<]*LT\^-1/);
  assert.match(panels.at(-1),/homogénea/);assert.match(panels.join('\n'),/aceleración constante/,'Dimensional consistency does not replace physical applicability');
 }else if(id==='pressure-speed'){
  assert.ok(all.includes('p=Av^2+B'));assert.ok(all.includes('[p]=ML^-1T^-2'));
  assert.match(last,/\[A\]=[^<]*ML\^-3/);assert.match(last,/\[B\]=ML\^-1T\^-2/);
 }else if(id==='two-coefficients'){
  assert.ok(all.includes('20VP=mA+aB'));assert.ok(all.includes('[P]=MLT^-2'),'P represents weight, not pressure');
  assert.match(all,/\[20VP\]=[^<]*ML\^4T\^-2/);
  assert.match(last,/\[A\]=[^<]*L\^4T\^-2/);assert.match(last,/\[B\]=[^<]*ML\^3/);
 }else if(id==='dimensionless-exponent'){
  assert.ok(all.includes('A=B+C^'));assert.match(all,/\[D\]=ML\^-3/);
  assert.match(last,/\[S\]=[^<]*M\^-1L\^3/);
  assert.match(panels.join('\n'),/positivo adimensional/,'The original numerical-base condition remains explicit');
  assert.match(all,/\\operatornamesen.*\\ne0/,'The original nonzero sine condition remains explicit');
 }else{
  assert.match(all,/x=A\\operatornamesen/);assert.ok(all.includes('[x]=L')||all.includes('L=[A]1'));
  assert.match(last,/\[A\]=[^<]*L/);assert.match(all,/\[\\omega\]=[^<]*T\^-1/);assert.match(all,/\[\\varphi\]=1/);
 }
 if(['dimensionless-exponent','oscillation'].includes(id))assert.doesNotMatch(panels.join('\n'),/\\sin\b/,'Trigonometric expressions keep the Spanish sen notation');
}

async function chapterIntegration(){
 const h=harness(['fisica-capitulo-01-data.js','fisica-capitulo-01-constantes.js']),handlers=new Map(),controls=ui();
 const app=h.run("document.getElementById('chapter-app')");app.addEventListener=(type,handler)=>handlers.set(type,handler);
 h.run(read('fisica-capitulo-01.js'));
 const widget=h.run('window.ConstantDerivations'),render=()=>widget.render(example);
 const click=(action,id,card='homogeneity')=>handlers.get('click')({target:{closest:()=>controls.control(action,id,card)}});
 const initial=render();click('next');assert.equal(render(),initial);
 h.run("window.StudyMode.choose('student','free')");await h.signIn({uid:'student'});h.run('goLesson(3)');
 assert.equal(h.run('LESSONS[3].id'),'dim-homogeneidad');assert.equal(h.run('LESSONS[3].examples.length'),1);
 assert.equal(h.run('LESSONS[3].examples[0].interactive'),'homogeneity');
 assert.equal((app.innerHTML.match(/id="constant-derivation-homogeneity"/g)||[]).length,1);
 assert.doesNotMatch(app.innerHTML,/homogeneidad\.svg|id="power-slider"|Explora una fórmula|class="example"/,'The static picture, old game and duplicate solved cards are absent');
 const progress=clone(h.run('P'));
 click('select','two-coefficients');click('next');
 const retained=render();assert.notEqual(retained,initial);assert.deepEqual(clone(h.run('P')),progress,'Exploratory steps do not alter stored grades or progress');
 const physical={interactive:'physical-constants',title:'',question:''},physicalBefore=widget.render(physical);
 click('next',undefined,'physical-constants');assert.equal(widget.render(physical),physicalBefore,'Topic 4 does not accept topic 3 controls');
 h.run('goLesson(2)');assert.doesNotMatch(app.innerHTML,/id="constant-derivation-homogeneity"/);
 click('next');assert.equal(render(),retained,'Topic 3 does not accept hidden homogeneity controls');
 click('next',undefined,'physical-constants');assert.notEqual(widget.render(physical),physicalBefore,'Topic 3 controls still work in their own topic');
 h.run('goLesson(3)');assert.equal(render(),retained);
 h.run("goTab('practice')");click('restart');assert.equal(render(),retained);
 h.run("goTab('theory')");click('previous');assert.notEqual(render(),retained,'Returning to theory restores navigation');
 assert.equal(h.run('LESSONS.length'),5);assert.equal(h.run('CONTENT.workedExamples.length'),25);assert.equal(h.run('window.ChapterPractice.questions(CHAPTER_ID).length'),10);
 assert.deepEqual(clone(h.run('P.practice10')),progress.practice10);
 await h.signIn(null);assert.equal(render(),initial);click('next');assert.equal(render(),initial);
 h.run("window.StudyMode.choose('other','free')");await h.signIn({uid:'other'});h.run('goLesson(3)');assert.equal(render(),initial);
}

sessionAndContent();chapterIntegration().then(()=>console.log('PASS: five ordered homogeneity examples, correct dimensions, independent bounded steps and focus, topic-specific routing, removed image/game and unchanged student progress.')).catch(error=>{console.error(error);process.exitCode=1;});
