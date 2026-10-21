const assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const {harness:chapterHarness}=require('./study-entry.test.cjs');
const root=path.join(__dirname,'..');
const read=name=>fs.readFileSync(path.join(root,name),'utf8');
const deferred=()=>{let resolve,reject;const promise=new Promise((yes,no)=>{resolve=yes;reject=no;});return {promise,resolve,reject};};

function style(initial={}){
 const values=new Map(Object.entries(initial)),priorities=new Map();
 return {getPropertyValue:key=>values.get(key)||'',getPropertyPriority:key=>priorities.get(key)||'',setProperty(key,value,priority=''){values.set(key,String(value));priorities.set(key,priority);},removeProperty(key){const old=values.get(key)||'';values.delete(key);priorities.delete(key);return old;}};
}
function classList(){const values=new Set();return {add:(...items)=>items.forEach(x=>values.add(x)),remove:(...items)=>items.forEach(x=>values.delete(x)),contains:key=>values.has(key),toggle(key,force){const on=force??!values.has(key);on?values.add(key):values.delete(key);return on;}};}

function fullscreenHarness(){
 const button={innerHTML:'',textContent:'',disabled:false,attributes:new Map(),setAttribute(key,value){this.attributes.set(key,String(value));},removeAttribute(key){this.attributes.delete(key);},focus(){this.focused=true;}};
 const focus={isConnected:true,focus(){this.count=(this.count||0)+1;}};
 const document={fullscreenElement:null,activeElement:focus,documentElement:{style:style({overflow:'clip'})},body:{style:style({overflow:'auto'})},exitFullscreen:async()=>{document.fullscreenElement=null;}};
 document.documentElement.style.setProperty('overflow','clip','important');
 const host={isConnected:true,classList:classList(),attributes:new Map(),setAttribute(key,value){this.attributes.set(key,String(value));},removeAttribute(key){this.attributes.delete(key);},contains(node){return node===button;}};
 let frame=0;
 const source=read('heart-3d.js').replace('global.ChapterInteractions={render,mount,unmount};','global.ChapterInteractions={render,mount,unmount};global.__heartFullscreen={enterFullscreen,exitFullscreen,syncFullscreen,cleanupFullscreen,handleFullscreenKey,draw,unmount,setCurrent:a=>{current=a;}};');
 const context={window:{navigator:{},innerWidth:1000},document,AbortController,performance:{now:()=>0},requestAnimationFrame:()=>++frame,cancelAnimationFrame(){},setTimeout,clearTimeout,console:{info(){}}};
 context.window.document=document;vm.runInNewContext(source,context,{filename:'heart-3d.js'});
 const a={host,q:()=>button,all:()=>[],disposed:false,fullscreenMode:null,fullscreenPending:false,fullscreenSeq:0,fullscreenRestore:null,dirty:0,visible:true,frame:0,attempt:1,renderCleanups:[],materials:[],meshes:[],meshByPart:new Map(),partCenters:new Map(),beads:[],controller:new AbortController()};
 return {api:context.window.__heartFullscreen,document,host,button,focus,a,window:context.window,getFrame:()=>frame};
}
async function fullscreenLifecycle(){
 const native=fullscreenHarness();native.host.requestFullscreen=async()=>{native.document.fullscreenElement=native.host;};
 await native.api.enterFullscreen(native.a);
 assert.equal(native.a.fullscreenMode,'native');assert.equal(native.host.classList.contains('bh-is-fullscreen'),true);
 assert.match(native.button.innerHTML,/Salir de pantalla completa/);
 await native.api.exitFullscreen(native.a);
 assert.equal(native.document.fullscreenElement,null);assert.equal(native.a.fullscreenMode,null);assert.equal(native.host.classList.contains('bh-is-fullscreen'),false);
 assert.equal(native.document.documentElement.style.getPropertyValue('overflow'),'clip');assert.equal(native.document.documentElement.style.getPropertyPriority('overflow'),'important');
 assert.equal(native.document.body.style.getPropertyValue('overflow'),'auto');
 const keyboard=fullscreenHarness();await keyboard.api.enterFullscreen(keyboard.a);
 const first={hidden:false,getClientRects:()=>[{}],focus(){keyboard.document.activeElement=this;}},last={hidden:false,getClientRects:()=>[{}],focus(){keyboard.document.activeElement=this;}};
 keyboard.host.querySelectorAll=()=>[first,last];keyboard.host.contains=node=>node===first||node===last;
 keyboard.document.activeElement=last;let prevented=0;
 keyboard.api.handleFullscreenKey(keyboard.a,{key:'Tab',shiftKey:false,preventDefault(){prevented++;}});assert.equal(keyboard.document.activeElement,first);
 keyboard.api.handleFullscreenKey(keyboard.a,{key:'Tab',shiftKey:true,preventDefault(){prevented++;}});assert.equal(keyboard.document.activeElement,last);assert.equal(prevented,2,'Keyboard focus stays inside the expanded viewer');
 keyboard.api.handleFullscreenKey(keyboard.a,{key:'Escape',preventDefault(){prevented++;}});assert.equal(keyboard.a.fullscreenMode,null);assert.equal(keyboard.document.body.style.getPropertyValue('overflow'),'auto');
 const browserExit=fullscreenHarness();browserExit.host.requestFullscreen=async()=>{browserExit.document.fullscreenElement=browserExit.host;};await browserExit.api.enterFullscreen(browserExit.a);browserExit.document.fullscreenElement=null;browserExit.api.syncFullscreen(browserExit.a);assert.equal(browserExit.a.fullscreenMode,null);assert.equal(browserExit.document.body.style.getPropertyValue('overflow'),'auto','The native browser exit also restores scrolling');

 const fallback=fullscreenHarness();await fallback.api.enterFullscreen(fallback.a);
 assert.equal(fallback.a.fullscreenMode,'expanded');assert.equal(fallback.host.classList.contains('bh-expanded'),true);
 assert.equal(fallback.document.body.style.getPropertyValue('overflow'),'hidden');
 await fallback.api.exitFullscreen(fallback.a);
 assert.equal(fallback.host.classList.contains('bh-expanded'),false);assert.equal(fallback.document.body.style.getPropertyValue('overflow'),'auto');
 assert.ok(fallback.focus.count||fallback.button.focused,'Leaving the expanded viewer restores a reachable focus target');

 const refused=fullscreenHarness();refused.host.requestFullscreen=async()=>{throw Error('Fullscreen unsupported in this frame');};
 await refused.api.enterFullscreen(refused.a);assert.equal(refused.a.fullscreenMode,'expanded','A rejected native request leaves a usable expanded viewer');
 refused.api.cleanupFullscreen(refused.a);assert.equal(refused.a.fullscreenMode,null);assert.equal(refused.document.body.style.getPropertyValue('overflow'),'auto');

 const stale=fullscreenHarness(),pending=deferred();stale.host.requestFullscreen=async()=>{await pending.promise;stale.document.fullscreenElement=stale.host;};
 const entering=stale.api.enterFullscreen(stale.a);await stale.api.enterFullscreen(stale.a);assert.equal(stale.a.fullscreenPending,true,'A second click does not start another fullscreen request');stale.a.disposed=true;stale.api.cleanupFullscreen(stale.a);pending.resolve();await entering;
 assert.equal(stale.document.fullscreenElement,null,'A late native request cannot leave a disposed chapter fullscreen');
 assert.equal(stale.host.classList.contains('bh-expanded'),false);assert.equal(stale.document.body.style.getPropertyValue('overflow'),'auto');

 const mounted=fullscreenHarness();await mounted.api.enterFullscreen(mounted.a);mounted.api.setCurrent(mounted.a);mounted.api.unmount();
 assert.equal(mounted.a.disposed,true);assert.equal(mounted.a.controller.signal.aborted,true);assert.equal(mounted.host.classList.contains('bh-expanded'),false);assert.equal(mounted.document.body.style.getPropertyValue('overflow'),'auto');
}

function sectionRenderScheduling(){
 const h=fullscreenHarness();let renders=0,sectionFrames=0;h.window.HeartSection={animate(){sectionFrames++;}};
 Object.assign(h.a,{presentation:'section',lastFrame:-Infinity,light:true,flow:true,flowDirty:false,flowStart:0,dirty:2,rotate:false,transition:null,interacting:false,renderer:{render(){renders++;}},scene:{},camera:{},controls:{update(){}},selected:null});
 for(let t=0;t<500;t+=40)h.api.draw(h.a,t);
 assert.equal(renders,0,'The frontal section must not render the hidden WebGL heart');assert.ok(sectionFrames>5,'The selected schematic route can animate independently');
 h.a.visible=false;const before=sectionFrames;h.api.draw(h.a,1000);assert.equal(sectionFrames,before,'Offscreen/hidden section animation is suspended');
 h.a.visible=true;h.a.flow=false;h.a.dirty=0;h.a.flowDirty=false;const scheduled=h.getFrame();h.api.draw(h.a,1100);assert.equal(h.getFrame(),scheduled,'A paused stationary section schedules no perpetual frames');
}

function sectionHarness(type="frontal"){
 const context={window:{},module:{exports:{}}};vm.runInNewContext(read('heart-section.js'),context,{filename:'heart-section.js'});
 const api=context.window.HeartSection,markup=api.render(type),nodes=[];
 for(const match of markup.matchAll(/<([a-z][\w-]*)\b([^>]*)>/gi)){
  const attrs=new Map();for(const [,name,value]of match[2].matchAll(/([^\s=<>]+)="([^"]*)"/g))attrs.set(name,value);
  const node={tag:match[1],attributes:attrs,classList:classList(),style:{},getAttribute:key=>attrs.get(key)??null,setAttribute(key,value){attrs.set(key,String(value));},matches(selector){const m=selector.match(/^\[([^\]=]+)(?:="([^"]*)")?\]$/);return Boolean(m)&&attrs.has(m[1])&&(m[2]===undefined||attrs.get(m[1])===m[2]);}};
  if(node.tag==='path'){node.getTotalLength=()=>100;node.getPointAtLength=length=>({x:length,y:length/2});}
  nodes.push(node);
 }
 const svg=nodes.find(node=>node.matches('[data-bh-section-svg]'));assert.ok(svg);
 svg.querySelectorAll=selector=>nodes.filter(node=>node!==svg&&node.matches(selector));svg.querySelector=selector=>svg.querySelectorAll(selector)[0]||null;
 return {api,markup,svg,nodes,parts:svg.querySelectorAll('[data-bh-section-part]'),paths:svg.querySelectorAll('[data-bh-section-path]'),particles:svg.querySelectorAll('[data-bh-section-particle]')};
}
function anatomicalSection(){
 const h=sectionHarness(),{api,svg,markup}=h;
 assert.match(markup,/Corazón humano: vista anterior en sección longitudinal frontal \(esquemática\)/);
 assert.match(markup,/no es una sección coronal estricta/);
 const stableParts=['right-atrium','left-atrium','right-ventricle','left-ventricle','superior-vena-cava','pulmonary-trunk','ascending-aorta','aortic-arch','ventricular-wall'];
 assert.deepEqual(new Set(h.parts.map(node=>node.getAttribute('data-bh-section-part'))),new Set(stableParts));
 for(const node of h.parts){assert.equal(node.getAttribute('role'),'button');assert.equal(node.getAttribute('tabindex'),'0');assert.equal(node.getAttribute('data-bh-action'),'part');assert.ok(node.getAttribute('aria-label'));}
 const valves=[...markup.matchAll(/data-bh-section-valve="\d+"><title>([^<]+)<\/title>/g)].map(m=>m[1]);
 assert.deepEqual(new Set(valves),new Set(['Válvula tricúspide','Válvula pulmonar','Válvula mitral','Válvula aórtica']));
 // Locate the actual visible chamber captions, not a metadata mirror of the anatomy.
 const captions=[...markup.matchAll(/<text x="([\d.]+)"[^>]*>([\s\S]*?)<\/text>/g)].map(m=>({x:Number(m[1]),text:m[2].replace(/<[^>]+>/g,' ').replace(/\s+/g,' ').trim()}));
 const position=name=>{const item=captions.find(c=>c.text===name);assert.ok(item,'Visible caption exists: '+name);return item.x;};
 assert.ok(position('Aurícula derecha')<position('Aurícula izquierda'),'Anterior perspective puts anatomical right on image left');
 assert.ok(position('Ventrículo derecho')<position('Ventrículo izquierdo'),'The ventricular sides match the same anterior perspective');
 assert.match(markup,/Vena cava/);assert.match(markup,/pulmonares/);assert.match(markup,/Tabique/);
 const expectedPaths=[[0,1],[2],[3,4],[],[5,6,7,8],[9],[10],[0,1]];
 const expectedParts=[['superior-vena-cava','right-atrium'],['right-atrium','right-ventricle'],['right-ventricle','pulmonary-trunk'],[],['left-atrium'],['left-atrium','left-ventricle'],['left-ventricle','ascending-aorta','aortic-arch'],['superior-vena-cava','right-atrium']];
 for(let step=0;step<8;step++){
  api.update(svg,{tab:'route',step,flow:true});
  const highlighted=h.parts.filter(node=>node.classList.contains('is-active')).map(node=>node.getAttribute('data-bh-section-part'));
  assert.deepEqual(new Set(highlighted),new Set(expectedParts[step]),'Step '+step+' highlights only its anatomically connected structures');
  const visible=h.particles.filter(node=>node.getAttribute('visibility')==='visible').map(node=>Number(node.getAttribute('data-bh-section-particle')));
  assert.deepEqual(visible,expectedPaths[step],'The animation follows the selected segment, with no direct right-to-left chamber shortcut');
  const bright=h.paths.filter(node=>node.getAttribute('opacity')==='.95').map(node=>Number(node.getAttribute('data-bh-section-path')));assert.deepEqual(bright,expectedPaths[step]);
 }
 api.update(svg,{tab:'route',step:1,flow:true});const particle=h.particles[2];api.animate(svg,100);const before=particle.getAttribute('cx');api.animate(svg,1000);assert.notEqual(particle.getAttribute('cx'),before,'A running route advances its particle');
 api.update(svg,{tab:'route',step:1,flow:false});const paused=particle.getAttribute('cx');api.animate(svg,2000);assert.equal(particle.getAttribute('cx'),paused,'A paused route cannot advance particles');assert.equal(particle.getAttribute('visibility'),'visible','Pause freezes the current blood particle for inspection');
 api.update(svg,{tab:'explore',selectedPart:'left-ventricle',flow:true});assert.deepEqual(h.parts.filter(node=>node.classList.contains('is-active')).map(node=>node.getAttribute('data-bh-section-part')),['left-ventricle']);assert.ok(h.particles.every(node=>node.getAttribute('visibility')==='hidden'),'Exploration does not pretend blood crosses all routes simultaneously');
 assert.doesNotThrow(()=>api.update(svg,{tab:'route',step:NaN,selectedPart:'<script>',flow:'true'}));assert.doesNotThrow(()=>api.animate(svg,Infinity));
 const html=read('biologia-capitulo-11.html');assert.ok(html.indexOf('heart-section.js')>=0);assert.ok(html.indexOf('heart-section.js')<html.indexOf('heart-3d.js'),'The section is available before the viewer mounts');
}

function atlasAndPulsatileFlow(){
 const h=sectionHarness(),{api,svg}=h;
 assert.deepEqual(Object.keys(api.views),['frontal','right','left','transverse']);
 for(const type of Object.keys(api.views)){
  const view=sectionHarness(type);assert.equal(view.svg.getAttribute('data-bh-section-type'),type);
  assert.match(view.markup,/esquemática/);assert.match(view.markup,/Músculos|papilares|Pared ventricular/);
 }
 const r=sectionHarness('right'),l=sectionHarness('left'),t=sectionHarness('transverse');
 assert.equal(r.parts.some(n=>n.getAttribute('data-bh-section-part')==='left-ventricle'),false);
 assert.equal(l.parts.some(n=>n.getAttribute('data-bh-section-part')==='right-ventricle'),false);
 assert.equal(t.paths.length,0,'Transverse blood flow crosses the slice plane, never the septum');
 assert.equal(t.svg.querySelectorAll('[data-bh-through]').length,2);
 assert.match(t.markup,/Las válvulas quedan fuera/);
 api.update(svg,{mode:'cycle',flow:true,speed:1,tab:'explore'});
 const bright=()=>h.paths.filter(n=>n.getAttribute('opacity')==='.95').map(n=>Number(n.getAttribute('data-bh-section-path')));
 assert.deepEqual(bright(),[0,1,2,5,6,7,8,9],'Filling has AV flow and venous return, with no arterial ejection');
 api.animate(svg,3200);assert.deepEqual(bright(),[0,1,5,6,7,8],'Isovolumic contraction closes all four valves');
 api.animate(svg,4200);assert.deepEqual(bright(),[0,1,3,4,5,6,7,8,10],'Ejection opens outflow without an AV shortcut');
 for(const node of svg.querySelectorAll('[data-bh-section-valve]')){
  const n=Number(node.getAttribute('data-bh-section-valve'));assert.equal(node.getAttribute('data-bh-valve-open'),String([2,4].includes(n)));
 }
 api.animate(svg,6400);assert.deepEqual(bright(),[0,1,5,6,7,8],'Relaxation has no ventricular throughflow');
 assert.equal(api.phaseAt(2100,1).id,'filling');assert.equal(api.phaseAt(4200,1).id,'ejection');assert.equal(api.phaseAt(4200,.5).id,'filling');assert.equal(api.phaseAt(Infinity,Infinity).id,'filling');
 api.update(svg,{mode:'cycle',flow:false});const before=h.particles[0].getAttribute('cx');api.animate(svg,9000);assert.equal(h.particles[0].getAttribute('cx'),before);assert.ok(h.particles.some(n=>n.getAttribute('visibility')==='visible'),'Paused cycle preserves visible blood for inspection');
 for(const side of ['right','left']){
  const v=sectionHarness(side);v.api.update(v.svg,{mode:'cycle',flow:true});v.api.animate(v.svg,4200);
  const expected=side==='right'?3:3;assert.equal(v.paths[expected].getAttribute('opacity'),'.95');
 }
}

async function presentationPersistence(){
 const files=['biologia-capitulo-11-practice.js','biologia-catalog.js','history-progress.js','biologia-capitulo-11-data.js','history-chapter.js'];
 const local=new Map(),cloud=new Map(),h=chapterHarness(files,{local,cloud});h.run("window.StudyMode.choose('section-reader','free')");await h.signIn({uid:'section-reader'});await h.run("window.StudyMode.save('section-reader',db)");
 const event=detail=>h.events.get('biology-heart-progress')({detail});
 event({presentation:'section',sectionType:'left',view:'internal',tab:'route',routeStep:5,selectedPart:'left-ventricle',visitedParts:['left-ventricle'],visitedSteps:[1,5]});await h.run('persist()');
 let record=cloud.get('users/section-reader/progress/biologia-capitulo-11');assert.equal(record.heartExploration.presentation,'section');assert.equal(record.heartExploration.sectionType,'left');assert.equal(record.heartExploration.view,'internal');assert.equal(record.percent,0,'Section exploration does not count as practice mastery');
 const fresh=chapterHarness(files,{cloud});await fresh.signIn({uid:'section-reader'});assert.equal(fresh.run('P.heartExploration.presentation'),'section');assert.equal(fresh.run('P.heartExploration.sectionType'),'left');assert.equal(fresh.run('P.heartExploration.routeStep'),5);
 h.setOffline(true);event({presentation:'model',view:'external',tab:'explore',routeStep:0,visitedParts:['right-atrium'],visitedSteps:[0]});await h.run('persist()');assert.equal(JSON.parse(local.get('sin-limites:section-reader:biologia-capitulo-11')).pending,true);
 record=cloud.get('users/section-reader/progress/biologia-capitulo-11');record.heartExploration.visitedParts.push('ascending-aorta');cloud.set('users/section-reader/progress/biologia-capitulo-11',record);
 h.setOffline(false);await h.run('retrySync()');record=cloud.get('users/section-reader/progress/biologia-capitulo-11');assert.equal(record.heartExploration.presentation,'model');assert.deepEqual(new Set(record.heartExploration.visitedParts),new Set(['left-ventricle','right-atrium','ascending-aorta']));
 event({presentation:'<invalid>',view:'external'});await h.run('persist()');assert.equal(cloud.get('users/section-reader/progress/biologia-capitulo-11').heartExploration.presentation,'model');
 h.run("window.StudyMode.choose('other-reader','free')");await h.signIn({uid:'other-reader'});assert.equal(h.run("P.heartExploration?.presentation||'model'"),'model');
}

(async()=>{anatomicalSection();atlasAndPulsatileFlow();sectionRenderScheduling();await fullscreenLifecycle();await presentationPersistence();console.log('PASS: Anterior heart section, four valves, connected route steps, paused flow, fullscreen lifecycle, late-request cleanup and presentation persistence.');})().catch(error=>{console.error(error);process.exitCode=1;});

