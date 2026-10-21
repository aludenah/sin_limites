const assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const {harness}=require('./study-entry.test.cjs');
const root=path.join(__dirname,'..');
const definitions=[
 {course:12,number:5,id:'historia-universal-pdf-05',route:'historia-universal-capitulo-05',experience:'egypt-expedition',catalog:'history-catalog.js',practice:null,sites:['giza','thebes'],objects:['scarab','papyrus'],challenge:'nile-direction'},
 {course:11,number:9,id:'historia-del-peru-capitulo-09',route:'historia-del-peru-capitulo-09',experience:'inca-expedition',catalog:'peru-catalog.js',practice:'historia-del-peru-capitulo-09-practice.js',sites:['cusco','vilcashuaman'],objects:['terraces','bridge'],challenge:'chasqui-1'}
];
const files=d=>[...(d.practice?[d.practice]:[]),d.catalog,'history-progress.js',d.route+'-data.js','history-chapter.js'];
const homeFiles=['historia-del-peru-capitulo-09-practice.js','courses.js','history-catalog.js','peru-catalog.js','lenguaje-catalog.js','economia-catalog.js','educacion-civica-catalog.js','razonamiento-verbal-catalog.js','razonamiento-matematico-catalog.js','fisica-catalog.js','history-progress.js','app.js'];
const plain=(h,code)=>JSON.parse(h.run('JSON.stringify('+code+')'));
const event=(h,d,detail={})=>h.events.get('history-exploration-progress')({detail:{experience:d.experience,...detail}});

async function chapterAndPractice(d){
 const h=harness(files(d));h.run("window.StudyMode.choose('learner','progressive')");await h.signIn({uid:'learner'});await h.run("window.StudyMode.save('learner',db)");
 assert.equal(h.run('CHAPTER_ID'),d.id,'Updating Egypt must preserve its existing progress document');
 assert.equal(h.run('COURSE_ID'),d.course);assert.equal(h.run('CHAPTER_NUMBER'),d.number);
 assert.equal(h.run('EXPLORATION.id'),d.experience);
 assert.ok(h.run('LESSONS.some(lesson=>lesson.blocks.some(block=>block.interactive===EXPLORATION.id))'));
 assert.match(h.elements.get('chapter-app').innerHTML,new RegExp('#'+d.experience));
 if(d.course===11)assert.equal(h.run('LESSONS.length'),6);
 const qs=plain(h,'window.ChapterPractice.questions(CHAPTER_ID)');
 assert.equal(qs.length,10);assert.equal(new Set(qs.map(q=>q.id)).size,10);assert.equal(new Set(qs.map(q=>q.prompt)).size,10);
 for(const q of qs){assert.equal(q.options.length,5);assert.equal(new Set(q.options).size,5);assert.ok(Number.isInteger(q.answer)&&q.answer>=0&&q.answer<5);assert.ok(q.solution.length>30);}
 assert.equal(h.run(`window.ChapterPractice.choose(CHAPTER_ID,P.practice10,${JSON.stringify(qs[1].id)},0,P.studyMode)`),false,'A later progressive question remains locked');
 const first=qs[0],wrong=(first.answer+1)%5;
 h.run(`window.ChapterPractice.choose(CHAPTER_ID,P.practice10,${JSON.stringify(first.id)},${wrong},P.studyMode);checkPractice(${JSON.stringify(first.id)})`);
 assert.equal(h.run('progressPercent()'),0,'A wrong answer cannot award progress');
 assert.equal(h.run(`P.practice10.attempts[${JSON.stringify(first.id)}]`),1);
 for(const q of qs)h.run(`window.ChapterPractice.choose(CHAPTER_ID,P.practice10,${JSON.stringify(q.id)},${q.answer},P.studyMode);checkPractice(${JSON.stringify(q.id)})`);
 await h.run('persist()');const saved=h.cloud.get('users/learner/progress/'+d.id);
 assert.equal(saved.percent,100);assert.equal(saved.chapterCompleted,true);assert.equal(saved.practiceCompleted,10);assert.equal(saved.courseId,d.course);assert.equal(saved.chapterNumber,d.number);
 const again=harness(files(d),{cloud:h.cloud});await again.signIn({uid:'learner'});
 assert.equal(again.run('P.practice10.mastered.length'),10,'Academic achievements survive a new device');
 const free=harness(files(d));free.run("window.StudyMode.choose('free-learner','free')");await free.signIn({uid:'free-learner'});
 assert.equal(free.run('window.ChapterPractice.canOpen(CHAPTER_ID,P.practice10,9,P.studyMode)'),true);
}

async function explorationPersistence(d){
 const local=new Map(),cloud=new Map(),h=harness(files(d),{local,cloud});
 h.run("window.StudyMode.choose('explorer','free')");await h.signIn({uid:'explorer'});await h.run("window.StudyMode.save('explorer',db)");
 event(h,d,{visitedSites:[d.sites[0]],visitedObjects:[d.objects[0]],completedChallenges:[d.challenge],selectedSite:d.sites[0],selectedObject:d.objects[0],tab:'museum'});
 await h.run('persist()');
 let saved=cloud.get('users/explorer/progress/'+d.id);
 assert.deepEqual(saved.historyExploration.visitedSites,[d.sites[0]]);assert.deepEqual(saved.historyExploration.completedChallenges,[d.challenge]);
 assert.equal(saved.percent,0,'Museum exploration must not impersonate an academic quiz score');
 assert.equal(saved.chapterCompleted,false);
 const before=JSON.stringify(saved.historyExploration);
 event(h,{experience:'another-expedition'},{visitedSites:['foreign-place']});await h.run('persist()');
 assert.equal(JSON.stringify(cloud.get('users/explorer/progress/'+d.id).historyExploration),before,'An unrelated experience event is ignored');
 const reload=harness(files(d),{cloud});await reload.signIn({uid:'explorer'});
 assert.deepEqual(plain(reload,'P.historyExploration.visitedSites'),[d.sites[0]]);
 assert.equal(reload.run('P.historyExploration.selectedObject'),d.objects[0]);assert.equal(reload.run('P.historyExploration.tab'),'museum');
 reload.run("window.ChapterInteractions={render:()=>'',unmount(){},mount:(root,options)=>{window.restoredPassport=options.saved;}};render()");
 assert.equal(reload.run('window.restoredPassport.experience'),d.experience);assert.deepEqual(plain(reload,'window.restoredPassport.visitedObjects'),[d.objects[0]]);
 // Keep an offline discovery while another device contributes a different discovery.
 h.setOffline(true);event(h,d,{visitedSites:[d.sites[1]],visitedObjects:[d.objects[1]],selectedSite:d.sites[1],tab:'map'});await h.run('persist()');
 assert.equal(h.run('cloudReady'),false);
 const pending=JSON.parse(local.get('sin-limites:explorer:'+d.id));assert.equal(pending.pending,true);
 saved=cloud.get('users/explorer/progress/'+d.id);
 cloud.set('users/explorer/progress/'+d.id,{...saved,historyExploration:{...saved.historyExploration,visitedSites:[d.sites[0],'remote-site'],completedChallenges:[d.challenge,'remote-challenge'],updatedMs:1}});
 h.setOffline(false);await h.run('retrySync()');
 const merged=cloud.get('users/explorer/progress/'+d.id).historyExploration;
 assert.deepEqual(new Set(merged.visitedSites),new Set([...d.sites,'remote-site']));
 assert.deepEqual(new Set(merged.visitedObjects),new Set(d.objects));
 assert.deepEqual(new Set(merged.completedChallenges),new Set([d.challenge,'remote-challenge']));
 assert.equal(merged.selectedSite,d.sites[1]);assert.equal(JSON.parse(local.get('sin-limites:explorer:'+d.id)).pending,false);
 // Changing accounts cannot reuse an expedition passport from the previous learner.
 h.run("window.StudyMode.choose('other','free')");await h.signIn({uid:'other'});
 assert.equal(h.run('P.historyExploration.visitedSites.length'),0);assert.equal(h.run('P.historyExploration.completedChallenges.length'),0);
 await h.run('persist()');assert.equal(cloud.get('users/other/progress/'+d.id).percent,0);
 assert.deepEqual(new Set(cloud.get('users/explorer/progress/'+d.id).historyExploration.visitedSites),new Set([...d.sites,'remote-site']));
 const sanitized=plain(h,"explorationProgress({visitedSites:['valid-site','<script>',{},''],visitedObjects:'invalid',completedChallenges:[false,'challenge-1'],selectedSite:'<bad>',tab:'<bad>'})");
 assert.deepEqual(sanitized.visitedSites,['valid-site']);assert.deepEqual(sanitized.visitedObjects,[]);assert.deepEqual(sanitized.completedChallenges,['challenge-1']);assert.equal(sanitized.selectedSite,null);
 assert.ok(h.run("explorationProgress({visitedSites:Array.from({length:150},(_,i)=>'site-'+i)}).visitedSites.length<=80"));
 assert.doesNotThrow(()=>h.run('mergeExploration(null,{visitedSites:["valid-site"]})'),'Malformed old passport records cannot break chapter loading');
}

async function legacyAndCourseIsolation(){
 const cloud=new Map(),local=new Map(),egypt=definitions[0],incas=definitions[1];
 const old=harness(files(egypt),{cloud,local});old.run("window.StudyMode.choose('shared','free')");await old.signIn({uid:'shared'});
 const q=plain(old,'window.ChapterPractice.questions(CHAPTER_ID)[0]');
 old.run(`window.ChapterPractice.choose(CHAPTER_ID,P.practice10,${JSON.stringify(q.id)},${q.answer},P.studyMode);checkPractice(${JSON.stringify(q.id)})`);
 event(old,egypt,{visitedSites:['giza']});await old.run('persist()');
 assert.ok(cloud.has('users/shared/progress/historia-universal-pdf-05'));
 assert.equal(cloud.has('users/shared/progress/historia-universal-capitulo-05'),false,'Do not reset Egypt by moving its established record to its URL id');
 const peru=harness(files(incas),{cloud,local});await peru.signIn({uid:'shared'});
 assert.equal(peru.run('progressPercent()'),0);assert.equal(peru.run('P.historyExploration.visitedSites.length'),0);
 event(peru,incas,{visitedSites:['cusco']});await peru.run('persist()');
 assert.deepEqual(cloud.get('users/shared/progress/'+egypt.id).historyExploration.visitedSites,['giza']);
 assert.deepEqual(cloud.get('users/shared/progress/'+incas.id).historyExploration.visitedSites,['cusco']);
}

async function navigationAndTeacher(){
 const h=harness(homeFiles,{search:'?chapter=historia-del-peru-capitulo-09'});await h.signIn({uid:'entry'});
 assert.equal(h.run('state.view'),'mode');h.run("selectStudyMode('progressive')");
 assert.match(h.redirects.at(-1),/^historia-del-peru-capitulo-09\.html\?/);
 h.run('openCourse(11);setTopic(8)');assert.match(h.redirects.at(-1),/^historia-del-peru-capitulo-09\.html\?/);
 assert.equal(h.run("window.PERU_CHAPTERS.find(c=>c.number===9).title"),'Incas');
 assert.equal(h.run("window.ChapterPractice.questions('historia-del-peru-capitulo-09').length"),10);
 const context={window:{}};
 for(const f of homeFiles.filter(f=>f.endsWith('catalog.js')))vm.runInNewContext(fs.readFileSync(path.join(root,f),'utf8'),context);
 const admin=fs.readFileSync(path.join(root,'admin.js'),'utf8');
 vm.runInNewContext(admin.slice(admin.indexOf('const TRACKED_CHAPTERS='),admin.indexOf('let selectedChapter='))+';window.tracked=TRACKED_CHAPTERS;',context);
 assert.equal(context.window.tracked[definitions[1].id].items,10);assert.match(context.window.tracked[definitions[1].id].label,/Incas/);
 assert.equal(context.window.tracked[definitions[0].id].items,10);
 for(const d of definitions){
  const html=fs.readFileSync(path.join(root,d.route+'.html'),'utf8');
  assert.ok(html.includes(d.experience+'.js'));assert.ok(html.includes(d.experience+'.css'));
  assert.ok(html.indexOf(d.experience+'.js')<html.indexOf('history-chapter.js'));
  assert.match(html,/firebase-auth-compat/,'Production keeps its Google/Firebase authentication');
 }
}

// Minimal semantic DOM for exercising delegated actions and cleanup without a browser/GPU.
// The geometry itself is native Canvas/SVG; this tests the public plugin contract and state.
function pluginHarness(filename,id){
 const listeners=new Set(),nodes=[],frames=new Map(),intervals=new Map(),observers=[];let token=0;
 const dataKey=name=>name.slice(5).replace(/-([a-z])/g,(_,letter)=>letter.toUpperCase());
 class Node{
  constructor(tag='div',attributes={}){
   this.tagName=tag.toUpperCase();this.attributes=new Map();this.dataset={};this.events=new Map();this.hidden=false;this.disabled=false;
   this.textContent='';this.innerHTML='';this.isConnected=true;this.clientWidth=600;this.clientHeight=480;this.width=0;this.height=0;
   this.style={setProperty(name,value){this[name]=value;}};const classes=new Set();
   this.classList={add:(...names)=>names.forEach(name=>classes.add(name)),remove:(...names)=>names.forEach(name=>classes.delete(name)),contains:name=>classes.has(name),toggle:(name,on)=>{const next=on===undefined?!classes.has(name):on;next?classes.add(name):classes.delete(name);return next;}};
   for(const [key,value] of Object.entries(attributes))this.setAttribute(key,value);
   nodes.push(this);
  }
  setAttribute(key,value){this.attributes.set(key,String(value));if(key.startsWith('data-'))this.dataset[dataKey(key)]=String(value);if(key==='id')this.id=String(value);if(key==='class')String(value).split(/\s+/).filter(Boolean).forEach(name=>this.classList.add(name));if(key==='hidden')this.hidden=true;if(key==='disabled')this.disabled=true;}
  getAttribute(key){return this.attributes.get(key)??null;}
  removeAttribute(key){this.attributes.delete(key);if(key==='hidden')this.hidden=false;if(key==='disabled')this.disabled=false;}
  toggleAttribute(key,force){const on=force===undefined?!this.attributes.has(key):force;on?this.setAttribute(key,''):this.removeAttribute(key);return on;}
  matches(selector){
   if(selector.includes(','))return selector.split(',').some(part=>this.matches(part));
   if(selector.startsWith('#'))return this.id===selector.slice(1);
   if(selector.startsWith('.'))return this.classList.contains(selector.slice(1));
   const attributes=[...selector.matchAll(/\[([^\]=]+)(?:="([^"]*)")?\]/g)];
   if(attributes.length)return attributes.every(([,key,value])=>this.attributes.has(key)&&(value===undefined||this.attributes.get(key)===value));
   return this.tagName.toLowerCase()===selector;
  }
  closest(selector){return this.matches(selector)?this:null;}
  querySelector(selector){return nodes.find(node=>node!==this&&node.matches(selector))||new Node('i');}
  querySelectorAll(selector){return nodes.filter(node=>node!==this&&node.matches(selector));}
  addEventListener(type,handler,options={}){
   if(options.signal?.aborted)return;const entry={target:this,type,handler};listeners.add(entry);
   if(!this.events.has(type))this.events.set(type,new Set());this.events.get(type).add(entry);
   options.signal?._remove.add(()=>{listeners.delete(entry);this.events.get(type)?.delete(entry);});
  }
  dispatchEvent(event){event.target??=this;for(const entry of [...(this.events.get(event.type)||[])])entry.handler(event);return true;}
  focus(){this.focused=true;}
  getBoundingClientRect(){return {left:0,top:0,width:this.clientWidth,height:this.clientHeight};}
  setPointerCapture(){}
  getTotalLength(){return 100;}
  getPointAtLength(distance){return {x:distance,y:distance};}
  getContext(){return new Proxy({clearRect(){},createRadialGradient:()=>({addColorStop(){}}),measureText:text=>({width:text.length*6})},{get:(object,key)=>key in object?object[key]:()=>{}});}
 }
 const document=new Node('document');document.hidden=false;
 class Controller{constructor(){this.signal={aborted:false,_remove:new Set()};}abort(){this.signal.aborted=true;for(const remove of this.signal._remove)remove();this.signal._remove.clear();}}
 class Custom{constructor(type,options={}){this.type=type;Object.assign(this,options);}}
 class Resize{constructor(callback){this.callback=callback;this.disconnected=false;observers.push(this);}observe(){}disconnect(){this.disconnected=true;}}
 const global={matchMedia:()=>({matches:false}),devicePixelRatio:3};
 const context=vm.createContext({window:global,document,AbortController:Controller,CustomEvent:Custom,MouseEvent:Custom,ResizeObserver:Resize,performance:{now:()=>0},requestAnimationFrame:fn=>{frames.set(++token,fn);return token;},cancelAnimationFrame:key=>frames.delete(key),setInterval:fn=>{intervals.set(++token,fn);return token;},clearInterval:key=>intervals.delete(key)});
 let source=fs.readFileSync(path.join(root,filename),'utf8');
 source=source.replace('global.ChapterInteractions={render,mount,unmount};','global.ChapterInteractions={render,mount,unmount};global.__expeditionState=()=>active;');
 vm.runInContext(source,context,{filename});const plugin=global.ChapterInteractions;
 assert.equal(plugin.render('another-experience'),'','A chapter plugin must ignore unrelated blocks');
 const html=plugin.render(id);assert.match(html,/role="tablist"/);assert.match(html,/role="tabpanel"/);
 for(const [,tag,attributeString] of html.matchAll(/<([a-z][\w-]*)\b([^>]*)>/gi)){
  const attributes={};for(const [,name,value] of attributeString.matchAll(/([^\s=]+)(?:="([^"]*)")?/g))attributes[name]=value??'';
  new Node(tag,attributes);
 }
 const host=nodes.find(node=>node.matches(id==='egypt-expedition'?'[data-eg-expedition]':'[data-inca-expedition]'));
 const notifications=[];host.addEventListener('history-exploration-progress',event=>notifications.push(JSON.parse(JSON.stringify(event.detail))));
 const externalListeners=listeners.size;
 const action=(name,value,extra={})=>{const prefix=id==='egypt-expedition'?'eg':'in';const node=new Node('button',{['data-'+prefix+'-action']:name,...(value===undefined?{}:{'data-value':value}),...extra});host.dispatchEvent({type:'click',target:node});};
 const state=()=>global.__expeditionState();
 return {plugin,host,action,state,notifications,frames,intervals,observers,listeners,externalListeners,document,Node};
}

function pluginActionsAndLifecycle(){
 for(const d of definitions){
  const h=pluginHarness(d.experience+'.js',d.experience);
  assert.doesNotThrow(()=>h.plugin.mount(h.host,{saved:{tab:'unknown',selectedSite:'missing',selectedObject:'missing',visitedSites:'wrong-type',visitedObjects:{},completedChallenges:42}}),'Malformed saved arrays must not break the interactive chapter');
  const state=h.state();assert.equal(state.visitedSites.size,0);assert.equal(state.visitedObjects.size,0);assert.equal((state.completedChallenges||state.completed).size,0);assert.equal(h.notifications.length,0);
  h.plugin.unmount();assert.equal(h.listeners.size,h.externalListeners);
 }
 {
  const h=pluginHarness('egypt-expedition.js','egypt-expedition');
  h.plugin.mount(h.host,{saved:{tab:'museum',selectedSite:'thebes',selectedObject:'papyrus',visitedSites:['thebes','unknown','thebes'],visitedObjects:['papyrus'],completedChallenges:['nile-direction','unknown']}});
  assert.equal(h.state().tab,'museum');assert.equal(h.state().selectedSite,'thebes');assert.equal(h.state().selectedObject,'papyrus');
  assert.deepEqual([...h.state().visitedSites],['thebes']);assert.deepEqual([...h.state().completedChallenges],['nile-direction']);
  assert.equal(h.notifications.length,0,'Restoring a museum must not silently award a new visit');
  h.action('site','giza');assert.ok(h.notifications.at(-1).visitedSites.includes('giza'));
  h.action('object','canopic');assert.ok(h.notifications.at(-1).visitedObjects.includes('canopic'));
  const attempts=h.notifications.length;
  h.action('answer','pyramid-evidence',{'data-answer':'0'});assert.equal(h.notifications.length,attempts,'An incorrect mission answer cannot award a discovery');
  h.action('answer','pyramid-evidence',{'data-answer':'1'});assert.ok(h.notifications.at(-1).completedChallenges.includes('pyramid-evidence'));
  h.action('tab','pyramid');h.action('cut');h.action('turn','1');
  assert.ok(h.frames.size>0,'The pyramid schedules a draw after its view changes');
  const pendingFrame=[...h.frames.keys()][0],draw=h.frames.get(pendingFrame);h.frames.delete(pendingFrame);draw(50);
  assert.equal(h.frames.size,0,'A stationary pyramid must not run a continuous drawing loop');
  h.action('tab','map');h.action('tour');assert.equal(h.intervals.size,1);
  h.document.hidden=true;h.document.dispatchEvent({type:'visibilitychange'});assert.equal(h.intervals.size,0,'Backgrounding the page pauses the automatic tour');
  h.document.hidden=false;h.action('tour');h.action('tab','pyramid');assert.equal(h.intervals.size,0,'Leaving the map stops the tour');
  const old=h.state(),count=h.notifications.length;h.plugin.unmount();
  assert.equal(old.disposed,true);assert.equal(old.controller.signal.aborted,true);assert.equal(h.frames.size,0);assert.equal(h.intervals.size,0);
  assert.ok(h.observers.every(observer=>observer.disconnected));assert.equal(h.listeners.size,h.externalListeners);
  h.action('site','amarna');assert.equal(h.notifications.length,count,'Unmounted listeners cannot update another chapter or account');
 }
 {
  const h=pluginHarness('inca-expedition.js','inca-expedition');
  h.plugin.mount(h.host,{saved:{tab:'engineering',selectedSite:'quito',selectedObject:'muro',visitedSites:['quito','invalid','quito'],visitedObjects:['muro'],completedChallenges:['rumbo','invalid']}});
  assert.equal(h.state().tab,'engineering');assert.equal(h.state().selectedSite,'quito');assert.equal(h.state().selectedObject,'muro');
  assert.deepEqual([...h.state().visitedSites],['quito']);assert.deepEqual([...h.state().completed],['rumbo']);assert.equal(h.notifications.length,0);
  h.action('site','cusco');assert.ok(h.notifications.at(-1).visitedSites.includes('cusco'));
  h.action('object','suelo');assert.ok(h.notifications.at(-1).visitedObjects.includes('suelo'));
  h.action('tab','mission');assert.equal(h.state().mission,1,'A restored passport resumes the first incomplete mission');
  const count=h.notifications.length;h.action('answer','0');assert.equal(h.notifications.length,count);
  h.action('answer','1');assert.ok(h.notifications.at(-1).completedChallenges.includes('puente'));assert.ok(h.frames.size>0);
  h.action('next-mission');h.action('answer','2');assert.equal(h.notifications.at(-1).completedChallenges.length,3);
  h.action('replay-mission');assert.equal(h.state().completed.size,3,'Replaying a completed mission preserves achievements');
  const old=h.state(),notifications=h.notifications.length;h.plugin.unmount();
  assert.equal(old.disposed,true);assert.equal(old.controller.signal.aborted,true);assert.equal(h.frames.size,0);assert.equal(h.listeners.size,h.externalListeners);
  h.action('site','huanuco');assert.equal(h.notifications.length,notifications);
 }
}

async function main(){
 for(const d of definitions){await chapterAndPractice(d);await explorationPersistence(d);}
 await legacyAndCourseIsolation();await navigationAndTeacher();pluginActionsAndLifecycle();
 console.log('PASS: Egypt record preservation, Incas 10-question practice/free-progressive modes, exploration/cloud round-trip and merge, offline recovery, event/account/course isolation, safe passport data, navigation/teacher tracking, real plugin actions and complete animation/listener cleanup.');
}
main().catch(error=>{console.error(error);process.exitCode=1;});
