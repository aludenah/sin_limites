const assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const {harness:chapterHarness}=require('./study-entry.test.cjs');
const read=file=>fs.readFileSync(path.join(__dirname,'..',file),'utf8');
const clone=value=>JSON.parse(JSON.stringify(value));

function events(){
 const listeners=new Map();
 return {
  addEventListener(type,callback){if(!listeners.has(type))listeners.set(type,new Set());listeners.get(type).add(callback);},
  removeEventListener(type,callback){listeners.get(type)?.delete(callback);},
  emit(type,event={}){for(const callback of [...listeners.get(type)||[]])callback(event);},
  listenerCount(type){return listeners.get(type)?.size||0;}
 };
}
function element(){
 return {dataset:{},attributes:{},style:{setProperty(){}},textContent:'',innerHTML:'',value:'',disabled:false,isConnected:true,
  classList:{toggle(){}},setAttribute(name,value){this.attributes[name]=String(value);},
  getAttribute(name){return this.attributes[name];},removeAttribute(name){delete this.attributes[name];},
  focus(){},querySelector(){return null;},querySelectorAll(){return [];}};
}

function widgetHarness(){
 let time=0,serial=0,available=true;
 const frames=new Map(),nodes=new Map(),root=element();
 root.contains=node=>node?.owner===root;
 root.querySelector=selector=>{
  if(!nodes.has(selector)){const node=element();node.owner=root;nodes.set(selector,node);}
  return nodes.get(selector);
 };
 const instruments=['mass','length','time'].map(value=>Object.assign(element(),{dataset:{value},owner:root}));
 root.querySelectorAll=selector=>selector==='[data-measure-action="instrument"]'?instruments:[];
 const document={...events(),hidden:false,activeElement:null,getElementById:id=>available&&id==='measurement-lab'?root:null};
 const window={requestAnimationFrame(callback){const id=++serial;frames.set(id,callback);return id;},cancelAnimationFrame(id){frames.delete(id);}};
 const context=vm.createContext({window,document,performance:{now:()=>time}});
 vm.runInContext(read('fisica-capitulo-01-medicion.js'),context);
 const widget=window.MeasurementLab;
 const button=(action,value)=>Object.assign(element(),{owner:root,dataset:{action:'measurement-lab',measureAction:action,...value!==undefined?{value:String(value)}:{}}});
 const click=(action,value)=>widget.handleAction(button(action,value));
 const input=(field,value)=>widget.handleInput(Object.assign(element(),{owner:root,dataset:{measureInput:field},value:String(value)}));
 function advance(ms){time+=ms;for(const [id,callback] of [...frames])if(frames.delete(id))callback(time);}
 return {widget,root,nodes,document,frames,button,click,input,advance,instruments,
  panel:()=>root.querySelector('#measure-panel').innerHTML,
  node:selector=>root.querySelector(selector),
  setAvailable(value){available=value;}};
}

function model(){
 const h=widgetHarness();let now=0;
 const m=h.widget.createModel(()=>now);
 assert.equal(m.state().mass,0);assert.equal(m.state().running,false);
 for(const mass of [100,500,1000])assert.equal(m.addMass(mass),true);
 assert.equal(m.state().mass,1600);assert.deepEqual(clone(m.state().weights),[100,500,1000]);
 assert.equal(m.setMassUnit('kg'),true);assert.equal(m.state().mass,1600,'Changing units keeps physical mass');
 assert.equal(m.removeMass(500),true);assert.equal(m.state().mass,1100);
 assert.equal(m.removeMass(500),false);assert.equal(m.addMass(10),false);
 assert.equal(m.setMassUnit('lb'),false);
 const copied=m.state();copied.weights.push(1000);assert.equal(m.state().mass,1100,'Snapshots cannot mutate the experiment');
 m.resetMass();for(let i=0;i<5;i++)assert.equal(m.addMass(1000),true);
 assert.equal(m.state().mass,5000);assert.equal(m.addMass(100),false,'The 5 kg capacity is enforced');
 m.resetMass();for(let i=0;i<6;i++)assert.equal(m.addMass(100),true);
 assert.equal(m.addMass(100),false,'Only six visible weights fit on the scale');
 m.resetMass();assert.equal(m.state().mass,0);

 m.setTab('length');m.setLength(14.3);m.setPosition(1.7);
 assert.equal(m.state().length,14.3);assert.equal(m.state().position,1.7);assert.equal(m.state().end,16);
 m.setLengthUnit('mm');assert.equal(m.state().length,14.3);assert.equal(m.state().end,16);
 m.setPosition(0);assert.equal(m.state().length,14.3,'Moving the object preserves its length');
 m.setLength(100);m.setPosition(100);assert.equal(m.state().length,18);assert.equal(m.state().end,20);
 m.setLength(-1);m.setPosition(-1);assert.equal(m.state().length,4);assert.equal(m.state().position,0);
 m.setLength(12.34);assert.equal(m.state().length,12.3,'The model resolves one millimetre');
 assert.equal(m.setLengthUnit('m'),false);

 assert.equal(m.start(),false,'The stopwatch starts only when that instrument is selected');
 m.setTab('time');assert.equal(m.start(),true);now=1234;assert.equal(m.state().elapsed,1234);
 assert.equal(m.start(),false,'Repeated start does not restart the running clock');
 m.pause();now+=9000;assert.equal(m.state().elapsed,1234);
 assert.equal(m.start(),true);now+=566;assert.equal(m.state().elapsed,1800);
 m.setTab('mass');now+=2000;assert.equal(m.state().elapsed,1800);assert.equal(m.state().running,false);
 m.setTab('time');m.start();now+=200;m.resetTime();assert.equal(m.state().elapsed,0);assert.equal(m.state().running,false);
 m.start();now+=500;m.reset();assert.equal(m.state().elapsed,0);assert.equal(m.state().running,false);
 assert.equal(m.state().tab,'mass');assert.equal(m.state().mass,0);assert.equal(m.state().massUnit,'g');
 assert.equal(m.state().length,12);assert.equal(m.state().position,0);assert.equal(m.state().lengthUnit,'cm');
}

function interaction(){
 const h=widgetHarness(),{widget}=h;
 assert.match(widget.render(),/balanza\.webp/);
 assert.equal(widget.handleAction({dataset:{action:'other-widget'}}),false);
 assert.equal(widget.handleInput({dataset:{}}),false);
 widget.mount();widget.mount();assert.equal(h.document.listenerCount('visibilitychange'),1);
 h.click('add-mass',1000);h.click('add-mass',500);h.click('add-mass',100);
 assert.match(h.panel(),/1[,.]600|1600/);h.click('mass-unit','kg');
 assert.match(h.panel(),/1[,.]6<\/span>/);assert.match(h.panel(),/>kg<\/span>/);
 h.click('remove-mass',500);assert.match(h.panel(),/1[,.]1<\/span>/);
 h.click('reset-mass');assert.match(h.panel(),/>0<\/span>/);assert.equal(h.frames.size,0);
 const foreign=h.button('add-mass',1000);foreign.owner=null;widget.handleAction(foreign);
 assert.match(h.panel(),/>0<\/span>/,'A detached control cannot update the experiment');

 h.click('instrument','length');h.input('length',14.3);h.input('position',1.7);
 assert.match(h.node('[data-measure-subtraction]').innerHTML,/16 cm − 1[,.]7 cm = 14[,.]3 cm/);
 h.click('length-unit','mm');assert.match(h.panel(),/160 mm − 17 mm = 143 mm/);
 const ticks=[...h.panel().matchAll(/<path d="M[^\"]+ 220v/g)];
 assert.equal(ticks.length,201,'The 20 cm ruler has a tick at every millimetre, including both ends');
 assert.match(h.panel(),/>200<\/text>/);assert.match(h.panel(),/>mm<\/text>/);
 h.input('length',18);h.input('position',2);
 assert.match(h.node('[data-measure-subtraction]').innerHTML,/200 mm − 20 mm = 180 mm/);
 h.input('position',0);assert.match(h.node('[data-measure-subtraction]').innerHTML,/180 mm − 0 mm = 180 mm/);

 h.click('instrument','time');assert.match(h.panel(),/cronometro\.webp/);
 h.click('start-time');assert.equal(h.frames.size,1);h.advance(1234);
 assert.equal(h.node('[data-measure-digits]').textContent,'1,2');
 assert.equal(h.node('[data-measure-value]').textContent,'1,2');
 h.click('start-time');assert.equal(h.frames.size,1,'Duplicate starts do not create multiple frame loops');
 h.click('pause-time');assert.equal(h.frames.size,0);
 const paused=h.panel();h.advance(5000);assert.equal(h.panel(),paused);
 h.click('start-time');h.advance(566);assert.equal(h.node('[data-measure-value]').textContent,'1,8');
 h.click('reset-time');assert.equal(h.frames.size,0);assert.match(h.panel(),/>0,0<\/span>/);
 h.click('start-time');h.advance(2000);h.click('instrument','mass');assert.equal(h.frames.size,0);
 h.advance(3000);h.click('instrument','time');assert.match(h.panel(),/>2,0<\/span>/);
 h.click('start-time');h.advance(500);h.document.hidden=true;h.document.emit('visibilitychange');
 assert.equal(h.frames.size,0);assert.match(h.panel(),/Cronómetro en pausa/);
 h.advance(7000);h.click('start-time');assert.equal(h.frames.size,0,'Hidden documents cannot start the stopwatch');
 h.document.hidden=false;h.document.emit('visibilitychange');assert.equal(h.frames.size,0,'Returning never resumes without an explicit start');
 assert.match(h.panel(),/>2,5<\/span>/);
 h.click('start-time');h.advance(500);widget.unmount();assert.equal(h.frames.size,0);
 assert.equal(h.document.listenerCount('visibilitychange'),0);
 h.advance(4000);widget.mount();assert.equal(h.frames.size,0);
 assert.match(widget.render(),/>3,0<\/span>/,'Unmounted time is excluded from the elapsed interval');
 assert.match(h.panel(),/Cronómetro en pausa/,'Mounting after page cache restoration refreshes the paused controls');
 widget.reset();assert.equal(h.frames.size,0);assert.equal(h.document.listenerCount('visibilitychange'),0);
 assert.match(widget.render(),/balanza\.webp/);assert.match(widget.render(),/>0<\/span>/);
 widget.mount();h.setAvailable(false);widget.mount();assert.equal(h.document.listenerCount('visibilitychange'),0);
}

async function chapterIntegration(){
 const html=read('fisica-capitulo-01.html');
 const scripts=[...html.matchAll(/<script\b[^>]*src="([^"]+)"/g)].map(match=>match[1].split('?')[0]);
 assert.ok(!scripts.includes('fisica-capitulo-01-medicion.js'),'The removed laboratory is not loaded by the chapter');
 assert.doesNotMatch(html,/href="fisica-capitulo-01-medicion\.css\?/);
 const h=chapterHarness(['fisica-capitulo-01-data.js']);
 const root=h.run("document.getElementById('chapter-app')"),handlers=new Map();
 root.addEventListener=(type,callback)=>handlers.set(type,callback);
 const calls={render:0,mount:0,unmount:0,reset:0,action:0,input:0};
 h.run('window').MeasurementLab={
  render(){calls.render++;return '<section id="measurement-lab">Medir</section>';},
  mount(){calls.mount++;},unmount(){calls.unmount++;},reset(){calls.reset++;},
  handleAction(button){if(button.dataset.action!=='measurement-lab')return false;calls.action++;return true;},
  handleInput(input){if(!input.dataset.measureInput)return false;calls.input++;return true;}
 };
 h.run(read('fisica-capitulo-01.js'));
 const click=()=>handlers.get('click')({target:{closest:()=>({dataset:{action:'measurement-lab',measureAction:'add-mass',value:'100'},disabled:false})}});
 const input=()=>handlers.get('input')({target:{dataset:{measureInput:'length'},value:'12'}});
 const assertRemoved=()=>{
  assert.doesNotMatch(root.innerHTML,/id="measurement-lab"|laboratorio de medición|assets\/fisica-capitulo-01\/medicion\.svg/);
  assert.ok(Object.values(calls).every(value=>value===0),'The removed laboratory is neither rendered, mounted, reset nor routed');
 };
 click();input();assertRemoved();
 h.run("window.StudyMode.choose('student','free')");await h.signIn({uid:'student'});
 assert.match(root.innerHTML,/Magnitudes físicas y su clasificación por origen/);assertRemoved();
 const savedPractice=clone(h.run('P.practice10'));
 click();input();assertRemoved();
 h.run('goLesson(1)');click();input();assertRemoved();
 h.run('goLesson(0)');assertRemoved();
 h.run("goTab('practice')");click();input();assertRemoved();
 assert.deepEqual(clone(h.run('P.practice10')),savedPractice,'Stale laboratory controls cannot alter practice progress');
 h.run("goTab('theory')");assertRemoved();
 h.events.get('pagehide')();assertRemoved();
 h.events.get('pageshow')();assertRemoved();
 await h.signIn(null);click();input();assertRemoved();
 h.run("window.StudyMode.choose('other','free')");await h.signIn({uid:'other'});
 click();input();assertRemoved();
}

model();interaction();chapterIntegration().then(()=>console.log('PASS: standalone measurement model and interactions, laboratory absent from chapter loading, rendering, lifecycle and event routing.')).catch(error=>{console.error(error);process.exitCode=1;});
