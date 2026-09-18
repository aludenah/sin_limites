const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const read=file=>fs.readFileSync(path.join(__dirname,'..',file),'utf8');

function events(){
 const listeners=new Map();
 return {
  addEventListener(type,callback){if(!listeners.has(type))listeners.set(type,new Set());listeners.get(type).add(callback);},
  removeEventListener(type,callback){listeners.get(type)?.delete(callback);},
  emit(type,event={}){for(const callback of [...listeners.get(type)||[]])callback(event);},
  listenerCount(type){return listeners.get(type)?.size||0;}
 };
}
function node(){
 return {dataset:{},attributes:{},textContent:'',disabled:false,
  setAttribute(name,value){this.attributes[name]=String(value);},
  getAttribute(name){return this.attributes[name];}
 };
}
function harness({reduced=false,intersection=true}={}){
 const frames=new Map(),observers=[];
 let nextFrame=0,time=0,seed=937,model;
 const media={...events(),matches:reduced},document={...events(),hidden:false};
 const window={...events(),matchMedia:()=>media,
  requestAnimationFrame(callback){const id=++nextFrame;frames.set(id,callback);return id;},
  cancelAnimationFrame(id){frames.delete(id);}
 };
 if(intersection)window.IntersectionObserver=class{
  constructor(callback){this.callback=callback;this.disconnected=false;observers.push(this);}
  observe(target){this.target=target;}
  disconnect(){this.disconnected=true;}
  visible(value){if(!this.disconnected)this.callback([{target:this.target,isIntersecting:value}]);}
 };
 const math=Object.create(Math);math.random=()=>{seed=(1664525*seed+1013904223)>>>0;return seed/4294967296;};
 const ctx=vm.createContext({window,document,Math:math});
 vm.runInContext(read('fisica-capitulo-15-electrones-modelo.js'),ctx);
 const create=window.ElectronDriftModel.create;
 window.ElectronDriftModel.create=options=>(model=create(options));
 vm.runInContext(read('fisica-capitulo-15-electrones.js'),ctx);
 vm.runInContext(read('fisica-capitulo-15-interactivo.js'),ctx);
 const widget=window.ElectronDrift;
 function createRoot(){
  const selectors=new Map(),root={...node(),isConnected:true};
  const names=['toggle-label','field-arrow','field-label','drift-arrow','drift-label','status','explanation','desc','trail'];
  names.forEach(name=>selectors.set(`[data-electron-${name}]`,node()));
  const actions=['electron-field','electron-reverse','electron-motion'];
  const buttons=Object.fromEntries(actions.map(action=>{
   const button=node();button.dataset.action=action;button.closest=selector=>selector==='[data-electron-demo]'?root:null;
   selectors.set(`[data-action="${action}"]`,button);return [action,button];
  }));
  const particles=model.particles.map(p=>{const n=node();n.setAttribute('transform',`translate(${p.x.toFixed(2)} ${p.y.toFixed(2)})`);return n;});
  root.querySelector=selector=>selectors.get(selector)||null;
  root.querySelectorAll=selector=>selector==='[data-electron]'?particles:[];
  return {root,buttons,particles,get:name=>selectors.get(`[data-electron-${name}]`),
   container:{querySelector:selector=>selector==='[data-electron-demo]'?root:null},
   snapshot:()=>particles.map(p=>p.getAttribute('transform')).join('|')};
 }
 function frame(ms=1000/60){
  time+=ms;
  const pending=[...frames.entries()];
  for(const [id,callback] of pending){if(frames.delete(id))callback(time);}
 }
 return {window,document,widget,media,observers,createRoot,frame,frames,model,
  count:()=>frames.size,visible:value=>observers.at(-1)?.visible(value),
  run:n=>{for(let i=0;i<n;i++)frame();},
  click:(view,action)=>widget.handleClick(view.buttons[action])};
}

function interaction(){
 const h=harness(),view=h.createRoot(),{widget}=h;
 assert.equal(widget.render('unrelated'),'');
 assert.match(widget.render('electron-drift'),/data-field="off"/);
 assert.match(widget.render('electron-drift'),/role="switch" aria-checked="false"/);
 assert.match(widget.render('electron-drift'),/role="status" aria-live="polite"/);
 widget.mount(view.container);
 assert.equal(h.count(),0,'Animation waits for the conductor to enter the viewport');
 h.visible(true);assert.equal(h.count(),1);
 assert.equal(view.buttons['electron-reverse'].disabled,true);
 const initial=view.snapshot();h.run(30);
 assert.notEqual(view.snapshot(),initial,'Electrons keep moving without an electric field');
 assert.equal(view.root.dataset.field,'off');
 assert.ok(view.get('trail').getAttribute('d').startsWith('M'));
 assert.equal(h.click(view,'electron-reverse'),false,'Unavailable reversal cannot silently change the next field direction');
 assert.equal(h.click(view,'electron-field'),true);
 assert.equal(view.root.dataset.field,'on');
 assert.equal(view.buttons['electron-field'].getAttribute('aria-checked'),'true');
 assert.equal(view.buttons['electron-reverse'].disabled,false);
 assert.equal(view.get('field-arrow').textContent,'→');
 assert.equal(view.get('drift-arrow').textContent,'←');
 assert.match(view.get('explanation').textContent,/izquierda/);
 const enabled=view.snapshot();h.run(20);assert.notEqual(view.snapshot(),enabled);
 h.click(view,'electron-reverse');
 assert.equal(view.get('field-arrow').textContent,'←');
 assert.equal(view.get('drift-arrow').textContent,'→');
 assert.match(view.get('explanation').textContent,/derecha/);
 assert.match(view.get('desc').textContent,/carga negativa/);
 h.click(view,'electron-motion');
 assert.equal(h.count(),0);const paused=view.snapshot();h.run(5);assert.equal(view.snapshot(),paused);
 assert.equal(view.buttons['electron-motion'].getAttribute('aria-pressed'),'true');
 assert.equal(view.buttons['electron-motion'].textContent,'Reanudar movimiento');
 h.click(view,'electron-field');
 assert.equal(h.count(),0,'Changing the field does not override an explicit pause');
 assert.equal(view.get('drift-arrow').textContent,'—');
 assert.equal(view.get('field-label').textContent,'Apagado · E = 0');
 h.click(view,'electron-motion');assert.equal(h.count(),1);h.run(5);
 assert.notEqual(view.snapshot(),paused,'Removing the field still leaves chaotic motion');
 assert.equal(widget.handleClick({dataset:{action:'toggle-simple-circuit'}}),false);
 assert.match(h.window.ChapterInteractions.render('simple-circuit'),/data-state="open"/,'Electron controls leave the existing circuit unchanged');
 widget.unmount();assert.equal(h.count(),0);
}

function lifecycle(){
 const h=harness(),view=h.createRoot();h.widget.mount(view.container);h.visible(true);h.run(3);
 assert.equal(h.document.listenerCount('visibilitychange'),1);
 assert.equal(h.window.listenerCount('pagehide'),1);
 assert.equal(h.media.listenerCount('change'),1);
 h.visible(false);assert.equal(h.count(),0);const offscreen=view.snapshot();h.run(4);assert.equal(view.snapshot(),offscreen);
 h.visible(true);assert.equal(h.count(),1);
 h.document.hidden=true;h.document.emit('visibilitychange');assert.equal(h.count(),0);
 h.visible(false);h.visible(true);assert.equal(h.count(),0,'An observer callback cannot animate a hidden tab');
 h.document.hidden=false;h.document.emit('visibilitychange');assert.equal(h.count(),1);
 h.document.emit('visibilitychange');h.visible(true);assert.equal(h.count(),1,'Duplicate lifecycle events cannot create duplicate animation loops');
 h.window.emit('pagehide');assert.equal(h.count(),0);
 h.window.emit('pageshow');assert.equal(h.count(),1);
 h.run(3);
 const replacement=h.createRoot();h.widget.mount(replacement.container);
 assert.equal(h.count(),0);assert.equal(h.observers[0].disconnected,true);
 assert.equal(h.document.listenerCount('visibilitychange'),1);
 assert.equal(h.media.listenerCount('change'),1,'Re-rendering removes the old media preference listener');
 const obsolete=view.snapshot();h.visible(true);h.run(5);
 assert.equal(view.snapshot(),obsolete,'Only the currently mounted view receives animation frames');
 h.click(replacement,'electron-field');
 assert.match(h.widget.render('electron-drift'),/data-field="on"/,'Student selections survive chapter re-renders');
 replacement.root.isConnected=false;h.frame();
 assert.equal(h.count(),0);assert.equal(h.observers.at(-1).disconnected,true);
 assert.equal(h.document.listenerCount('visibilitychange'),0);
 assert.equal(h.window.listenerCount('pagehide'),0);
 assert.equal(h.window.listenerCount('pageshow'),0);
 assert.equal(h.media.listenerCount('change'),0,'Removing the chapter cleans up every runtime listener');
 h.widget.unmount();h.widget.unmount();assert.equal(h.count(),0);
 const again=h.createRoot();h.widget.mount(again.container);h.visible(true);assert.equal(h.count(),1);
 h.widget.mount({querySelector:()=>null});
 assert.equal(h.count(),0);assert.equal(h.document.listenerCount('visibilitychange'),0,'Mounting a chapter without the widget also disposes the old loop');
}

function reducedMotion(){
 const h=harness({reduced:true}),view=h.createRoot();
 assert.match(h.widget.render('electron-drift'),/Reanudar movimiento/);
 h.widget.mount(view.container);h.visible(true);assert.equal(h.count(),0,'Reduced motion starts with a still view');
 h.click(view,'electron-field');assert.equal(h.count(),0);
 assert.equal(view.get('drift-arrow').textContent,'←','Static controls still teach the correct field relationship');
 h.click(view,'electron-motion');assert.equal(h.count(),1,'A student may explicitly start the demonstration');
 h.run(4);h.media.emit('change',{matches:true});assert.equal(h.count(),0);
 assert.equal(view.buttons['electron-motion'].getAttribute('aria-pressed'),'true');
 h.media.emit('change',{matches:false});assert.equal(h.count(),0,'A preference change does not undo the current pause');
 h.widget.unmount();assert.equal(h.media.listenerCount('change'),0);
 const legacy=harness({intersection:false}),legacyView=legacy.createRoot();
 legacy.widget.mount(legacyView.container);assert.equal(legacy.count(),1,'Browsers without IntersectionObserver still render motion');
 legacy.document.hidden=true;legacy.document.emit('visibilitychange');assert.equal(legacy.count(),0);
 legacy.widget.unmount();
}

function trajectoryBoundary(){
 const h=harness({intersection:false}),view=h.createRoot();h.widget.mount(view.container);h.click(view,'electron-field');
 let previous=h.model.particles[0].x,crossings=0;
 for(let i=0;i<2400&&!crossings;i++){
  h.frame();const current=h.model.particles[0].x;
  if(Math.abs(current-previous)>360){
   crossings++;
   const points=[...view.get('trail').getAttribute('d').matchAll(/[ML]([-\d.]+) ([-\d.]+)/g)].map(match=>Number(match[1]));
   for(let p=1;p<points.length;p++)assert.ok(Math.abs(points[p]-points[p-1])<=360,'The tracer must not draw a false path across the entire window when an electron re-enters');
  }
  previous=current;
 }
 assert.ok(crossings>0,'The deterministic demonstration exercises a real boundary crossing');
 h.widget.unmount();
}

interaction();lifecycle();reducedMotion();trajectoryBoundary();
console.log('PASS: chaotic motion with field off, field/drift directions, reversal, pause, circuit independence, reduced motion, trajectory wrapping, and visibility/remount cleanup without duplicate animation loops.');
