const assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const {harness}=require('./study-entry.test.cjs');
const read=file=>fs.readFileSync(path.join(__dirname,'..',file),'utf8');
const clone=value=>JSON.parse(JSON.stringify(value));
const moduleFile='fisica-capitulo-01-piedra.js';

function element(){
 return {dataset:{},innerHTML:'',textContent:'',attributes:{},style:{setProperty(){}},classList:{toggle(){}},
  setAttribute(name,value){this.attributes[name]=String(value);},getAttribute(name){return this.attributes[name];},
  focus(){},querySelector(){return null;},querySelectorAll(){return [];}};
}
function widgetHarness(){
 const host=element(),nodes=new Map();
 const buttons=['mass','length','volume','temperature'].map(id=>Object.assign(element(),{dataset:{action:'stone-select',id}}));
 const unitButtons=['g','kg','cm','m','cm3','m3','C','K'].map(unit=>Object.assign(element(),{dataset:{action:'stone-unit',unit}}));
 host.querySelector=selector=>{if(!nodes.has(selector))nodes.set(selector,element());return nodes.get(selector);};
 host.querySelectorAll=selector=>selector==='[data-action="stone-select"]'?buttons:selector==='[data-action="stone-unit"]'?unitButtons:[];
 host.contains=node=>node?.owner===host;
 Object.defineProperty(host,'innerHTML',{set(){throw Error('Do not replace the focused magnitudes');}});
 const document={getElementById:id=>id==='stone-explorer'?host:null,activeElement:null};
 const context=vm.createContext({window:{},document});vm.runInContext(read(moduleFile),context);
 const widget=context.window.StoneExplorer;
 const button=dataset=>Object.assign(element(),{dataset,owner:host,closest:()=>host});
 const click=dataset=>widget.handleAction(button(dataset));
 return {widget,host,buttons,nodes,button,click};
}

function interaction(){
 const h=widgetHarness(),{widget}=h;
 const state=()=>clone(widget.getState()),initial=state();
 const select=id=>h.click({action:'stone-select',id});
 const unit=value=>h.click({action:'stone-unit',unit:value});
 const reading=(value,symbol)=>assert.ok(widget.render().includes('<p class="stone-reading">'+value+'<span>'+symbol+'</span>'),
  'Expected a reading of '+value+' '+symbol);
 reading('162','g');assert.equal(unit('kg'),true);reading('0,162','kg');
 assert.match(h.nodes.get('#stone-result').innerHTML,/0,162/);
 assert.match(h.nodes.get('#stone-scene').innerHTML,/0,162 kg/);
 const stable=state();
 for(const dataset of [{action:'stone-select',id:'weight'},{action:'stone-unit',unit:'K'},
  {action:'stone-unit',unit:'kg<script>'},{action:'stone-submerge'},{action:'other-widget'}]){
  assert.equal(h.click(dataset),false);assert.deepEqual(state(),stable);
 }
 const detached=h.button({action:'stone-select',id:'volume'});detached.closest=()=>null;
 assert.equal(widget.handleAction(detached),false);assert.deepEqual(state(),stable);
 select('length');reading('6','cm');unit('m');reading('0,06','m');
 assert.match(h.nodes.get('#stone-scene').innerHTML,/6 cm/,'Changing display units does not change the physical length');
 select('temperature');reading('24','°C');unit('K');reading('297,15','K');
 assert.match(h.nodes.get('#stone-scene').innerHTML,/297,15 K/);

 select('volume');assert.equal(state().submerged,false);
 assert.match(widget.render(),/Sumerge la piedra para medirlo/);
 assert.doesNotMatch(widget.render(),/class="stone-reading"/,'The volume result is hidden until the stone is submerged');
 unit('m3');assert.doesNotMatch(widget.render(),/class="stone-reading"/,'A unit change cannot reveal an unperformed measurement');
 assert.equal(h.click({action:'stone-submerge'}),true);assert.equal(state().submerged,true);
 reading('0,000060','m³');assert.match(h.nodes.get('#stone-scene').innerHTML,/100 a 160 mililitros/);
 assert.match(h.nodes.get('#stone-result').innerHTML,/160 mL − 100 mL = 60 mL = 60 cm³/);
 const detail=h.nodes.get('#stone-detail');
 Object.defineProperty(detail,'innerHTML',{set(){throw Error('Unit and immersion controls must retain keyboard focus');}});
 unit('cm3');reading('60','cm³');
 h.click({action:'stone-submerge'});assert.equal(state().submerged,false);
 assert.match(h.nodes.get('#stone-result').innerHTML,/Lectura inicial del agua/);
 assert.doesNotMatch(h.nodes.get('#stone-result').innerHTML,/class="stone-reading"/);
 h.click({action:'stone-submerge'});reading('60','cm³');
 const snapshot=widget.getState();snapshot.units.volume='bad';snapshot.submerged=false;
 assert.equal(state().units.volume,'cm3');assert.equal(state().submerged,true,'A snapshot cannot mutate the experiment');
 widget.reset();assert.deepEqual(state(),initial);reading('162','g');
}

async function chapterIntegration(){
 const html=read('fisica-capitulo-01.html');
 const scripts=[...html.matchAll(/<script\b[^>]*src="([^"]+)"/g)].map(match=>match[1].split('?')[0]);
 assert.ok(scripts.includes(moduleFile));
 assert.ok(scripts.indexOf(moduleFile)<scripts.indexOf('fisica-capitulo-01.js'));
 assert.match(html,/href="fisica-capitulo-01-piedra\.css\?/);
 const h=harness(['fisica-capitulo-01-data.js',moduleFile]);
 const app=h.run("document.getElementById('chapter-app')"),handlers=new Map();
 app.addEventListener=(type,handler)=>handlers.set(type,handler);
 h.run(read('fisica-capitulo-01.js'));
 const widget=h.run('window.StoneExplorer'),state=()=>clone(widget.getState());
 const host=widgetHarness().host;
 const click=dataset=>handlers.get('click')({target:{closest:()=>({dataset,disabled:false,owner:host,closest:()=>host})}});
 const initial=state();click({action:'stone-select',id:'volume'});
 assert.deepEqual(state(),initial,'Signed-out controls are inactive');
 h.run("window.StudyMode.choose('student','free')");await h.signIn({uid:'student'});
 const body=h.run('LESSONS[0].body'),firstParagraph=body.slice(0,body.indexOf('</p>')+4);
 assert.ok(body.startsWith(firstParagraph+'<div data-stone-explorer></div>'),
  'The stone follows the exact introductory paragraph');
 const lessonMarkup=h.run('lessonBody(LESSONS[0])');
 assert.ok(lessonMarkup.startsWith(firstParagraph));
 assert.ok(lessonMarkup.indexOf('id="stone-explorer"')>firstParagraph.length);
 assert.ok(lessonMarkup.indexOf('id="stone-explorer"')<lessonMarkup.indexOf('\\ell=2'),
  'The existing length equation stays after the interactive stone');
 const progressBefore=clone(h.run('P'));
 for(const id of ['mass','length','volume','temperature']){
  click({action:'stone-select',id});
  assert.match(widget.render(),new RegExp('data-id="'+id+'"[^>]*aria-pressed="true"'));
 }
 assert.deepEqual(clone(h.run('P')),progressBefore,'Exploration neither grades nor changes saved progress');
 const retained=state();
 h.run('goLesson(1)');assert.doesNotMatch(app.innerHTML,/id="stone-explorer"/);
 click({action:'stone-select',id:'mass'});assert.deepEqual(state(),retained,'Other topics cannot update the stone');
 h.run('goLesson(0)');assert.deepEqual(state(),retained,'Returning to topic 1 preserves the experiment');
 h.run("goTab('practice')");click({action:'stone-select',id:'mass'});
 assert.deepEqual(state(),retained,'Practice controls cannot update the experiment');
 h.run("goTab('theory')");assert.deepEqual(state(),retained);
 assert.deepEqual(clone(h.run('P.practice10')),progressBefore.practice10);
 await h.signIn(null);assert.deepEqual(state(),initial,'Signing out clears the experiment');
 click({action:'stone-select',id:'volume'});assert.deepEqual(state(),initial);
 h.run("window.StudyMode.choose('other','free')");await h.signIn({uid:'other'});
 assert.deepEqual(state(),initial,'A different student starts with the default experiment');
}

interaction();chapterIntegration().then(()=>console.log('PASS: stone unit conversions, water displacement, keyboard control retention, exact placement, navigation guards and independent student progress.')).catch(error=>{console.error(error);process.exitCode=1;});
