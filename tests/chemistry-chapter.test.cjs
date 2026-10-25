const assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const {harness}=require('./study-entry.test.cjs');
const root=path.join(__dirname,'..'),id='quimica-capitulo-18';
const chapterFiles=['quimica-capitulo-18-practice.js','quimica-catalog.js','history-progress.js','quimica-capitulo-18-data.js','history-chapter.js'];
const catalogs=['history-catalog.js','peru-catalog.js','lenguaje-catalog.js','economia-catalog.js','educacion-civica-catalog.js','razonamiento-verbal-catalog.js','razonamiento-matematico-catalog.js','fisica-catalog.js','biologia-catalog.js','quimica-catalog.js'];
const homeFiles=['quimica-capitulo-18-practice.js','courses.js',...catalogs,'history-progress.js','app.js'];
const plain=(h,expression)=>JSON.parse(h.run('JSON.stringify('+expression+')'));
const event=(h,detail={})=>h.events.get('chemistry-lab-progress')({detail:{experience:'chemistry-ph-lab',...detail}});
const experiment={sampleType:'acid',sampleVolumeMl:25,sampleConcentrationM:.08,titrantConcentrationM:.1,addedVolumeMl:20,indicator:'bromothymol'};
const record={...experiment,pH:7};

async function chapterPractice(){
 const h=harness(chapterFiles);h.run("window.StudyMode.choose('learner','progressive')");await h.signIn({uid:'learner'});await h.run("window.StudyMode.save('learner',db)");
 assert.equal(h.run('COURSE_ID'),17);assert.equal(h.run('CHAPTER_NUMBER'),18);assert.equal(h.run('CHAPTER_ID'),id);
 assert.equal(h.run('LESSONS.length'),6);assert.equal(h.run('LABORATORY.id'),'chemistry-ph-lab');
 assert.equal(h.run("LESSONS[0].blocks[0].interactive"),'chemistry-ph-lab');
 assert.match(h.elements.get('chapter-app').innerHTML,/#chemistry-ph-lab/);
 const questions=plain(h,'window.ChapterPractice.questions(CHAPTER_ID)');
 assert.equal(questions.length,10);assert.equal(new Set(questions.map(q=>q.id)).size,10);assert.equal(new Set(questions.map(q=>q.prompt)).size,10);
 for(const q of questions){assert.equal(q.options.length,5);assert.equal(new Set(q.options).size,5);assert.ok(Number.isInteger(q.answer)&&q.answer>=0&&q.answer<5);assert.ok(q.solution.length>40);}
 assert.equal(h.run(`window.ChapterPractice.choose(CHAPTER_ID,P.practice10,'${questions[1].id}',0,P.studyMode)`),false);
 const first=questions[0],wrong=(first.answer+1)%5;
 h.run(`window.ChapterPractice.choose(CHAPTER_ID,P.practice10,'${first.id}',${wrong},P.studyMode);checkPractice('${first.id}')`);
 assert.equal(h.run('progressPercent()'),0,'An incorrect attempt cannot award academic progress');
 assert.equal(h.run(`P.practice10.attempts['${first.id}']`),1);
 for(const q of questions)h.run(`window.ChapterPractice.choose(CHAPTER_ID,P.practice10,'${q.id}',${q.answer},P.studyMode);checkPractice('${q.id}')`);
 await h.run('persist()');const saved=h.cloud.get('users/learner/progress/'+id);
 assert.equal(saved.courseId,17);assert.equal(saved.chapterNumber,18);assert.equal(saved.practiceTotal,10);assert.equal(saved.practiceCompleted,10);assert.equal(saved.percent,100);assert.equal(saved.chapterCompleted,true);
 const reload=harness(chapterFiles,{cloud:h.cloud});await reload.signIn({uid:'learner'});assert.equal(reload.run('P.practice10.mastered.length'),10);
 const free=harness(chapterFiles);free.run("window.StudyMode.choose('free-learner','free')");await free.signIn({uid:'free-learner'});
 assert.equal(free.run('window.ChapterPractice.canOpen(CHAPTER_ID,P.practice10,9,P.studyMode)'),true);
}

async function laboratoryPersistence(){
 const local=new Map(),cloud=new Map(),h=harness(chapterFiles,{local,cloud});h.run("window.StudyMode.choose('scientist','free')");await h.signIn({uid:'scientist'});await h.run("window.StudyMode.save('scientist',db)");
 event(h,{completedChallenges:['dilution'],visitedViews:['laboratory','molecular'],experiment,records:[record],selectedChallenge:'unknown',tab:'missions'});await h.run('persist()');
 let saved=cloud.get('users/scientist/progress/'+id);
 assert.deepEqual(saved.chemistryLab.completedChallenges,['dilution']);assert.deepEqual(saved.chemistryLab.visitedViews,['laboratory','molecular']);
 assert.deepEqual(saved.chemistryLab.experiment,experiment);assert.deepEqual(saved.chemistryLab.records,[record]);
 assert.equal(saved.percent,0,'Laboratory missions are distinct from the ten academic questions');assert.equal(saved.chapterCompleted,false);
 const before=JSON.stringify(saved.chemistryLab);
 event(h,{experience:'a-different-lab',completedChallenges:['foreign'],experiment:{sampleVolumeMl:99}});await h.run('persist()');
 assert.equal(JSON.stringify(cloud.get('users/scientist/progress/'+id).chemistryLab),before);
 const fresh=harness(chapterFiles,{cloud});await fresh.signIn({uid:'scientist'});
 assert.deepEqual(plain(fresh,'P.chemistryLab.experiment'),experiment);assert.equal(fresh.run('P.chemistryLab.tab'),'missions');assert.equal(fresh.run('P.chemistryLab.selectedChallenge'),'unknown');
 fresh.run("window.ChapterInteractions={render:()=>'',unmount(){},mount:(root,options)=>{window.restoredLab=options.saved;}};render()");
 assert.deepEqual(plain(fresh,'window.restoredLab.experiment'),experiment);assert.deepEqual(plain(fresh,'window.restoredLab.records'),[record]);
 // Keep a new offline experiment while another device adds a completed mission.
 h.setOffline(true);event(h,{completedChallenges:['equivalence'],visitedViews:['missions'],experiment:{...experiment,addedVolumeMl:21},records:[record]});await h.run('persist()');assert.equal(h.run('cloudReady'),false);
 assert.equal(JSON.parse(local.get('sin-limites:scientist:'+id)).pending,true);
 saved=cloud.get('users/scientist/progress/'+id);
 cloud.set('users/scientist/progress/'+id,{...saved,chemistryLab:{...saved.chemistryLab,completedChallenges:['dilution','remote'],visitedViews:['laboratory','remote-view'],updatedMs:1}});
 h.setOffline(false);await h.run('retrySync()');const merged=cloud.get('users/scientist/progress/'+id).chemistryLab;
 assert.deepEqual(new Set(merged.completedChallenges),new Set(['dilution','equivalence','remote']));
 assert.deepEqual(new Set(merged.visitedViews),new Set(['laboratory','molecular','missions','remote-view']));
 assert.equal(merged.experiment.addedVolumeMl,21);assert.equal(JSON.parse(local.get('sin-limites:scientist:'+id)).pending,false);
 h.run("window.StudyMode.choose('another','free')");await h.signIn({uid:'another'});
 assert.equal(h.run('P.chemistryLab.completedChallenges.length'),0);assert.equal(h.run('P.chemistryLab.records.length'),0);assert.equal(h.run('P.chemistryLab.experiment.addedVolumeMl'),0);
 assert.equal(cloud.get('users/scientist/progress/'+id).chemistryLab.experiment.addedVolumeMl,21);
 const egypt=harness(['history-catalog.js','history-progress.js','historia-universal-capitulo-05-data.js','history-chapter.js'],{local,cloud});await egypt.signIn({uid:'scientist'});
 event(egypt,{completedChallenges:['chemistry-in-egypt']});await egypt.run('persist()');
 assert.equal(cloud.get('users/scientist/progress/historia-universal-pdf-05').chemistryLab,undefined,'A chemistry event cannot write into another course');
}

function sanitization(){
 const h=harness(chapterFiles);
 assert.doesNotThrow(()=>h.run('mergeLaboratory(null,null)'));
 const result=plain(h,"laboratoryProgress({completedChallenges:['valid','valid','<script>',false],visitedViews:'wrong',selectedChallenge:'<bad>',tab:'<bad>',experiment:{sampleType:'invalid',sampleVolumeMl:NaN,sampleConcentrationM:Infinity,titrantConcentrationM:-1,addedVolumeMl:1000000,indicator:'wrong'},records:Array.from({length:9},(_,i)=>({sampleType:'acid',sampleVolumeMl:20,sampleConcentrationM:.1,titrantConcentrationM:.1,addedVolumeMl:i,pH:7})),updatedMs:Infinity})");
 assert.deepEqual(result.completedChallenges,['valid']);assert.deepEqual(result.visitedViews,[]);assert.equal(result.selectedChallenge,null);assert.equal(result.tab,'laboratory');
 assert.equal(result.experiment.sampleType,'acid');assert.equal(result.experiment.sampleVolumeMl,20);assert.equal(result.experiment.sampleConcentrationM,.1);assert.ok(result.experiment.titrantConcentrationM>0);assert.ok(result.experiment.addedVolumeMl<=200);assert.equal(result.experiment.indicator,'bromothymol');
 assert.equal(result.records.length,5);assert.equal(result.updatedMs,0);
 assert.ok(h.run("laboratoryProgress({completedChallenges:Array.from({length:100},(_,i)=>'challenge-'+i)}).completedChallenges.length<=30"));
 const malformed=plain(h,'laboratoryProgress({records:[null,{},false,{pH:NaN},{pH:Infinity}]})');assert.deepEqual(malformed.records,[]);
}

// The actual plugin and chemistry engine run against a small semantic DOM. It
// tracks ancestor visibility, real controls and abortable listeners; canvas
// drawing is stubbed because pixel/layout checks belong to the browser review.
function laboratoryHarness({reducedMotion=false}={}){
 const listeners=new Set(),frames=new Map(),timers=new Map(),observers=[];let token=0,clock=0;
 const dataKey=name=>name.slice(5).replace(/-([a-z])/g,(_,letter)=>letter.toUpperCase());
 const strip=text=>text.replace(/<[^>]*>/g,'').replaceAll('&amp;','&').replaceAll('&lt;','<').replaceAll('&gt;','>');
 class Node{
  constructor(tag='div',attributes={}){
   this.tagName=tag.toUpperCase();this.attributes=new Map();this.dataset={};this.children=[];this.parentElement=null;this.events=new Map();this.hidden=false;this.disabled=false;this.value='';this._text='';this._html='';this.isConnected=true;this.clientWidth=600;this.clientHeight=400;this.width=0;this.height=0;
   this.style={setProperty(name,value){this[name]=value;}};const classes=new Set();this.classList={add:(...names)=>names.forEach(name=>classes.add(name)),remove:(...names)=>names.forEach(name=>classes.delete(name)),contains:name=>classes.has(name),toggle:(name,force)=>{const on=force??!classes.has(name);on?classes.add(name):classes.delete(name);return on;}};
   for(const [key,value]of Object.entries(attributes))this.setAttribute(key,value);
  }
  set textContent(value){this._text=String(value);this._html='';this.children=[];}
  get textContent(){return this._text+this.children.map(child=>child.textContent).join('');}
  set innerHTML(value){this._html=String(value);this._text=strip(this._html);this.children=[];}
  get innerHTML(){return this._html;}
  setAttribute(key,value){this.attributes.set(key,String(value));if(key.startsWith('data-'))this.dataset[dataKey(key)]=String(value);if(key==='id')this.id=String(value);if(key==='class')String(value).split(/\s+/).filter(Boolean).forEach(name=>this.classList.add(name));if(key==='hidden')this.hidden=true;if(key==='disabled')this.disabled=true;if(key==='value')this.value=String(value);}
  getAttribute(key){return this.attributes.get(key)??null;}
  removeAttribute(key){this.attributes.delete(key);if(key==='hidden')this.hidden=false;if(key==='disabled')this.disabled=false;}
  toggleAttribute(key,force){const on=force??!this.attributes.has(key);on?this.setAttribute(key,''):this.removeAttribute(key);return on;}
  matches(selector){
   if(selector.includes(','))return selector.split(',').some(part=>this.matches(part.trim()));
   const tag=selector.match(/^[a-z][\w-]*/i)?.[0];if(tag&&this.tagName.toLowerCase()!==tag.toLowerCase())return false;
   if(selector.startsWith('#'))return this.id===selector.slice(1);
   if(selector.startsWith('.'))return this.classList.contains(selector.slice(1));
   const attrs=[...selector.matchAll(/\[([^\]=]+)(?:="([^"]*)")?\]/g)];
   if(attrs.length)return attrs.every(([,key,value])=>this.attributes.has(key)&&(value===undefined||this.attributes.get(key)===value));
   return Boolean(tag);
  }
  closest(selector){return this.matches(selector)?this:this.parentElement?.closest(selector)||null;}
  querySelectorAll(selector){return this.children.flatMap(child=>[...(child.matches(selector)?[child]:[]),...child.querySelectorAll(selector)]);}
  querySelector(selector){return this.querySelectorAll(selector)[0]||null;}
  addEventListener(type,handler,options={}){if(options.signal?.aborted)return;const entry={type,handler};listeners.add(entry);if(!this.events.has(type))this.events.set(type,new Set());this.events.get(type).add(entry);options.signal?._remove.add(()=>{listeners.delete(entry);this.events.get(type).delete(entry);});}
  dispatchEvent(event){event.target??=this;for(const entry of [...(this.events.get(event.type)||[])])entry.handler(event);return true;}
  focus(){document.activeElement=this;}
  getContext(){return new Proxy({createRadialGradient:()=>({addColorStop(){}})},{get:(object,key)=>key in object?object[key]:()=>{}});}
 }
 const document=new Node('document');document.hidden=false;
 class Controller{constructor(){this.signal={aborted:false,_remove:new Set()};}abort(){this.signal.aborted=true;for(const remove of this.signal._remove)remove();this.signal._remove.clear();}}
 class Custom{constructor(type,options={}){this.type=type;Object.assign(this,options);}}
 class Observer{constructor(callback){this.callback=callback;this.disconnected=false;observers.push(this);}observe(){}disconnect(){this.disconnected=true;}}
 const motionPreference=new Node('media-query');motionPreference.matches=reducedMotion;
 const global={matchMedia:()=>motionPreference,devicePixelRatio:3};
 const context=vm.createContext({window:global,document,AbortController:Controller,CustomEvent:Custom,ResizeObserver:Observer,IntersectionObserver:Observer,performance:{now:()=>clock},requestAnimationFrame:fn=>{frames.set(++token,fn);return token;},cancelAnimationFrame:key=>frames.delete(key),setTimeout:fn=>{timers.set(++token,fn);return token;},clearTimeout:key=>timers.delete(key)});
 for(const filename of ['chemistry-ph-engine.js','chemistry-ph-lab.js'])vm.runInContext(fs.readFileSync(path.join(root,filename),'utf8'),context,{filename});
 const plugin=global.ChapterInteractions;assert.equal(plugin.render('another-experience'),'');const html=plugin.render('chemistry-ph-lab');assert.match(html,/role="tablist"/);
 const stack=[document],voids=new Set(['input','br','hr','img','meta','link']);
 for(const match of html.matchAll(/<\/?([a-z][\w-]*)\b([^>]*)>|([^<]+)/gi)){
  if(match[3]){stack.at(-1)._text+=match[3];continue;}
  const [,tag,attributeString]=match;if(match[0].startsWith('</')){if(stack.length>1)stack.pop();continue;}
  const attrs={};for(const [,name,value]of attributeString.replace(/\/$/,'').matchAll(/([^\s=]+)(?:="([^"]*)")?/g))attrs[name]=value??'';
  const node=new Node(tag,attrs);node.parentElement=stack.at(-1);node.parentElement.children.push(node);if(!match[0].endsWith('/>')&&!voids.has(tag))stack.push(node);
 }
 const host=document.querySelector('[data-chemistry-ph-lab]'),q=selector=>host.querySelector(selector),notifications=[];
 host.addEventListener('chemistry-lab-progress',event=>notifications.push(JSON.parse(JSON.stringify(event.detail))));const externalListeners=listeners.size;
 const action=(name,value)=>{const button=host.querySelectorAll('[data-cl-action="'+name+'"]').find(button=>value===undefined||button.dataset.value===String(value));assert.ok(button,'Control exists: '+name+'/'+value);host.dispatchEvent({type:'click',target:button});};
 const change=(key,value)=>{const input=q('[data-cl-config="'+key+'"]');input.value=String(value);host.dispatchEvent({type:'change',target:input});};
 const draw=time=>{clock=time;const pending=[...frames];frames.clear();for(const [,callback]of pending)callback(time);};
 const visible=node=>Boolean(node)&&!node.hidden&&(!node.parentElement||visible(node.parentElement));
 return {plugin,host,q,action,change,draw,visible,notifications,frames,timers,observers,listeners,externalListeners,document,motionPreference};
}

function laboratoryActionsAndLifecycle(){
 const h=laboratoryHarness();
 assert.doesNotThrow(()=>h.plugin.mount(h.host,{saved:{experiment:null,records:[null,{},false],completedChallenges:42,visitedViews:{},tab:'missing'}}));
 assert.equal(h.notifications.length,0,'Restoring the lab cannot silently award a mission');h.plugin.unmount();assert.equal(h.listeners.size,h.externalListeners);
 const restored={...experiment,indicator:'phenolphthalein'};
 h.plugin.mount(h.host,{saved:{experiment:restored,records:[record],selectedChallenge:'unknown',completedChallenges:['dilution','invalid'],visitedViews:['laboratory','invalid'],tab:'missions'}});
 assert.equal(h.q('[data-cl-config="indicator"]').value,'phenolphthalein');assert.equal(Number(h.q('[data-cl-config="sampleVolumeMl"]').value),25);assert.match(h.q('[data-cl-dose-total]').textContent,/20/);assert.match(h.q('[data-cl-notebook-table]').innerHTML,/20[.,]00/);
 assert.equal(h.q('[data-cl-completed]').textContent,'1 / 3');assert.equal(h.q('[data-cl-views]').textContent,'1 / 3');assert.equal(h.visible(h.q('#cl-panel-missions')),true);
 h.action('tab','laboratory');let last=h.notifications.at(-1);assert.deepEqual(last.experiment,restored);assert.equal(last.records.length,1);assert.equal(last.records[0].pH,7);
 const pH=h.q('[data-cl-value-ph]').textContent;h.change('indicator','universal');assert.equal(h.q('[data-cl-value-ph]').textContent,pH,'The trace indicator must not alter the calculated chemistry');assert.equal(h.notifications.at(-1).experiment.addedVolumeMl,20);
 h.action('mission','dilution');const before=h.notifications.at(-1).experiment;h.action('tab','missions');const beforeAnswer=h.notifications.length;h.action('dilution-answer','1');assert.equal(h.notifications.length,beforeAnswer,'Checking before adding water cannot award a mission');
 h.action('dose','0.1');const dosed=JSON.stringify(h.notifications.at(-1).experiment),beforeWater=h.notifications.length;h.action('water');assert.equal(h.notifications.length,beforeWater,'Water cannot silently discard reactant already dosed');assert.equal(JSON.stringify(h.notifications.at(-1).experiment),dosed);assert.match(h.q('[data-cl-feedback="dilution"]').textContent,/recarga|recargar/i);h.action('reset');h.action('water');last=h.notifications.at(-1);
 assert.equal(last.experiment.sampleVolumeMl,40);assert.equal(last.experiment.sampleConcentrationM,.05);assert.equal(last.experiment.sampleVolumeMl*last.experiment.sampleConcentrationM,before.sampleVolumeMl*before.sampleConcentrationM,'Adding water conserves acid amount');assert.match(h.q('[data-cl-value-ph]').textContent,/1[.,]30/);
 h.action('dilution-answer','0');assert.match(h.q('[data-cl-feedback="dilution"]').textContent,/cantidad de ácido se conserva/);h.action('dilution-answer','1');assert.match(h.q('[data-cl-feedback="dilution"]').textContent,/✓/);
 h.action('mission','equivalence');h.action('check-equivalence');assert.ok(!h.notifications.at(-1).completedChallenges.includes('equivalence'));
 for(let i=0;i<4;i++)h.action('dose','5');assert.match(h.q('[data-cl-value-ph]').textContent,/7[.,]00/);h.action('check-equivalence');assert.ok(h.notifications.at(-1).completedChallenges.includes('equivalence'));
 h.action('mission','unknown');
 assert.equal(h.visible(h.q('[data-cl-config="sampleConcentrationM"]')),false,'Unknown sample concentration is absent from the visible form');assert.equal(h.visible(h.q('[data-cl-mystery-concentration]')),true);
 assert.equal(h.visible(h.q('[data-cl-known-equivalence]')),false);assert.equal(h.q('[data-cl-value-equivalence]').textContent,'Por descubrir');assert.equal(h.q('[data-cl-neutralized]').textContent,'Por descubrir');
 for(const node of h.host.querySelectorAll('[data-cl-ion-value]'))assert.equal(node.textContent,'Medición pendiente','Molecular concentrations cannot reveal the unknown sample');
 assert.equal(h.q('[data-cl-curve-line]').getAttribute('d'),'','The theoretical curve stays hidden until the unknown is solved');assert.equal(h.q('[data-cl-equivalence-line]').hidden,true);assert.equal(h.q('[data-cl-equivalence-label]').hidden,true);
 h.action('dose','5');assert.ok(h.q('[data-cl-observed-line]').getAttribute('d').length>0,'The learner still sees the segment explored so far');h.q('[data-cl-unknown-answer]').value='.08';h.action('check-unknown');assert.ok(!h.notifications.at(-1).completedChallenges.includes('unknown'),'A correct guess still requires reaching equivalence');
 for(let i=0;i<3;i++)h.action('dose','5');h.q('[data-cl-unknown-answer]').value='.1';h.action('check-unknown');assert.ok(!h.notifications.at(-1).completedChallenges.includes('unknown'));h.q('[data-cl-unknown-answer]').value='.08';h.action('check-unknown');assert.ok(h.notifications.at(-1).completedChallenges.includes('unknown'));assert.equal(h.visible(h.q('[data-cl-config="sampleConcentrationM"]')),true);assert.ok(h.q('[data-cl-curve-line]').getAttribute('d').length>0);assert.equal(h.q('[data-cl-equivalence-line]').hidden,false);
 h.action('free');for(let i=0;i<12;i++)h.action('dose','5');assert.match(h.q('[data-cl-x-labels]').innerHTML,/>60<\/text>/,'The curve domain includes a 60 mL dose');assert.equal(Number(h.q('[data-cl-curve-dot]').getAttribute('cx')),716);const finalCurveY=Number(h.q('[data-cl-curve-line]').getAttribute('d').match(/ ([\d.]+)$/)[1]);assert.ok(Math.abs(finalCurveY-Number(h.q('[data-cl-curve-dot]').getAttribute('cy')))<.01,'The marker and predicted curve use the same dose domain');
 for(let i=0;i<8;i++)h.action('dose','5');assert.match(h.q('[data-cl-x-labels]').innerHTML,/>100<\/text>/);assert.ok(h.host.querySelectorAll('[data-cl-action="dose"]').every(button=>button.disabled),'Dosing is bounded at 100 mL');
 h.action('free');h.change('sampleType','base');h.change('sampleVolumeMl',30);h.action('dose','1');assert.equal(h.notifications.at(-1).experiment.sampleType,'base');assert.equal(h.notifications.at(-1).experiment.addedVolumeMl,1);h.action('reset');assert.equal(h.notifications.at(-1).experiment.addedVolumeMl,0);
 for(let i=0;i<7;i++){h.action('dose','0.1');h.action('record');}assert.equal(h.notifications.at(-1).records.length,5);assert.equal(h.notifications.at(-1).records[0].addedVolumeMl,.7);assert.equal(h.notifications.at(-1).records[4].addedVolumeMl,.3);
 h.action('tab','molecular');assert.equal(h.frames.size,1);h.draw(50);assert.equal(h.frames.size,0,'A stationary molecular view must not spin a drawing loop');assert.equal(h.q('[data-cl-particles]').width,900,'Canvas resolution is bounded on high density devices');
 h.action('animate');h.draw(100);assert.equal(h.frames.size,1);h.draw(6100);assert.equal(h.frames.size,0,'Particle motion ends after the six second demonstration');h.action('animate');h.document.hidden=true;h.document.dispatchEvent({type:'visibilitychange'});assert.equal(h.frames.size,0);assert.equal(h.q('[data-cl-action="animate"]').getAttribute('aria-pressed'),'false');
 h.document.hidden=false;h.document.dispatchEvent({type:'visibilitychange'});h.draw(200);h.action('animate');h.action('tab','missions');assert.equal(h.frames.size,0,'Leaving the particle view stops its animation');
 h.action('tab','molecular');h.action('animate');
 // All observers from both mounts are checked below; the live viewport observer
 // is the last observer and pauses rendering when the lab leaves the viewport.
 h.observers.at(-1).callback([{isIntersecting:false}]);assert.equal(h.frames.size,0);h.observers.at(-1).callback([{isIntersecting:true}]);h.draw(300);h.action('animate');h.motionPreference.dispatchEvent({type:'change',matches:true});h.draw(400);assert.equal(h.frames.size,0,'Enabling reduced motion stops animation and leaves a single static draw');
 const notificationCount=h.notifications.length;h.plugin.unmount();assert.equal(h.frames.size,0);assert.equal(h.timers.size,0);assert.ok(h.observers.every(observer=>observer.disconnected));assert.equal(h.listeners.size,h.externalListeners);h.action('dose','1');assert.equal(h.notifications.length,notificationCount,'Unmounted controls cannot mutate another chapter or account');
 const reduced=laboratoryHarness({reducedMotion:true});reduced.plugin.mount(reduced.host,{saved:{tab:'molecular'}});reduced.draw(50);reduced.action('animate');assert.equal(reduced.frames.size,0,'A device that requests reduced motion keeps the molecular view static');assert.match(reduced.q('[data-cl-live]').textContent,/estática/);reduced.plugin.unmount();assert.equal(reduced.listeners.size,reduced.externalListeners);
}

async function navigationAndTeacher(){
 const direct=harness(chapterFiles);await direct.signIn({uid:'new'});assert.match(direct.redirects.at(-1),/^index\.html\?chapter=quimica-capitulo-18/);
 const home=harness(homeFiles,{search:'?chapter='+id});await home.signIn({uid:'new'});assert.equal(home.run('state.view'),'mode');home.run("selectStudyMode('progressive')");assert.match(home.redirects.at(-1),/^quimica-capitulo-18\.html\?/);
 home.run('openCourse(17)');assert.equal(home.run('state.activeTopicIndex'),null);assert.match(home.elements.get('app').innerHTML,/Temario completo/);assert.equal((home.elements.get('app').innerHTML.match(/onclick="setTopic\(/g)||[]).length,24);assert.doesNotMatch(home.elements.get('app').innerHTML,/Entrar al laboratorio de pH/);
 home.run('setTopic(17)');assert.match(home.redirects.at(-1),/^quimica-capitulo-18\.html\?/);
 assert.equal(home.run('window.CHEMISTRY_SYLLABUS.length'),24);assert.equal(home.run('window.CHEMISTRY_CHAPTERS.length'),1);assert.equal(home.run("window.ChapterPractice.questions('quimica-capitulo-18').length"),10);
 const context={window:{}};for(const file of catalogs)vm.runInNewContext(fs.readFileSync(path.join(root,file),'utf8'),context);
 const admin=fs.readFileSync(path.join(root,'admin.js'),'utf8');vm.runInNewContext(admin.slice(admin.indexOf('const TRACKED_CHAPTERS='),admin.indexOf('let selectedChapter='))+';window.tracked=TRACKED_CHAPTERS;',context);
 assert.equal(context.window.tracked[id].items,10);assert.match(context.window.tracked[id].label,/Química · Capítulo 18/);
 for(const file of ['index.html','admin.html']){
  const html=fs.readFileSync(path.join(root,file),'utf8');assert.ok(html.includes('quimica-catalog.js'));assert.ok(html.includes('quimica-capitulo-18-practice.js'));
  assert.ok(html.indexOf('quimica-capitulo-18-practice.js')<html.indexOf('chapter-practice.js'));
 }
 const html=fs.readFileSync(path.join(root,id+'.html'),'utf8');
 for(const script of ['chemistry-ph-engine.js','chemistry-ph-lab.js','quimica-catalog.js'])assert.ok(html.includes(script));
 assert.ok(html.indexOf('chemistry-ph-engine.js')<html.indexOf('chemistry-ph-lab.js'));assert.ok(html.indexOf('chemistry-ph-lab.js')<html.indexOf('history-chapter.js'));
 assert.match(html,/firebase-auth-compat/);assert.ok(html.includes('chemistry-ph-lab.css'));
}

async function main(){
 await chapterPractice();await laboratoryPersistence();sanitization();await navigationAndTeacher();laboratoryActionsAndLifecycle();
 console.log('PASS: Chemistry18 content/practice, free-progressive grading, cloud/offline/account isolation, lab restore, missions/masking, dilution conservation, bounded records, semantic controls and animation cleanup.');
}
main().catch(error=>{console.error(error);process.exitCode=1;});
