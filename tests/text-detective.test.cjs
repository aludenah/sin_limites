const assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const {harness}=require('./study-entry.test.cjs');
const root=path.join(__dirname,'..'),chapterId='razonamiento-verbal-capitulo-06';
const chapterFiles=['razonamiento-verbal-catalog.js','history-progress.js','razonamiento-verbal-capitulo-06-data.js','text-detective-cases.js','history-chapter.js'];
const plain=(h,expression)=>JSON.parse(h.run('JSON.stringify('+expression+')'));
function readCases(){const context={window:{}};vm.runInNewContext(fs.readFileSync(path.join(root,'text-detective-cases.js'),'utf8'),context);return JSON.parse(JSON.stringify(context.window.TEXT_DETECTIVE_CASES));}

function contentIntegrity(){
 const cases=readCases(),allIds=new Set();assert.equal(cases.length,3);
 for(const c of cases){
  assert.ok(c.id&&c.title&&c.subtitle);assert.ok(['museum','newsroom','library'].includes(c.scene));assert.ok(!allIds.has(c.id));allIds.add(c.id);
  assert.ok(c.documents.length>=2);const sentenceIds=new Set();
  for(const d of c.documents){assert.ok(d.id&&d.title);assert.ok(!allIds.has(d.id));allIds.add(d.id);for(const s of d.sentences){assert.ok(s.text.length>15);assert.ok(!allIds.has(s.id),'Sentence IDs are globally unique');allIds.add(s.id);sentenceIds.add(s.id);}}
  assert.ok(sentenceIds.size>=6,'Each case supplies enough text to investigate');assert.equal(c.questions.length,3);assert.deepEqual(c.questions.map(q=>q.kind),['explicit','inference','main']);
  for(const q of c.questions){
   assert.ok(!allIds.has(q.id));allIds.add(q.id);assert.equal(q.options.length,5);assert.equal(new Set(q.options.map(o=>o.id)).size,5);assert.equal(new Set(q.options.map(o=>o.text)).size,5);assert.equal(q.options.filter(o=>o.id===q.correctOptionId).length,1);assert.ok(q.explanation.length>40);
   assert.ok(q.evidenceSets.length>0);for(const proof of q.evidenceSets){assert.ok(proof.length>0);assert.equal(new Set(proof).size,proof.length);assert.ok(proof.every(id=>sentenceIds.has(id)),'Every proof cites this case\'s actual text');if(q.kind!=='explicit')assert.equal(proof.length,2,'Inference and main-idea tasks require two connected clues');}
  }
 }
 const chapter=harness(chapterFiles),questions=plain(chapter,'window.ChapterPractice.questions(CHAPTER_ID)');
 assert.equal(chapter.run('COURSE_ID'),1);assert.equal(chapter.run('CHAPTER_NUMBER'),6);assert.equal(questions.length,10);assert.deepEqual(questions.map(q=>q.id),Array.from({length:10},(_,i)=>'p'+String(i+1).padStart(2,'0')),'The existing academic question IDs must remain stable');
 const html=fs.readFileSync(path.join(root,chapterId+'.html'),'utf8');for(const name of ['text-detective-cases.js','text-detective.js','text-detective.css'])assert.ok(html.includes(name));assert.ok(html.indexOf('text-detective-cases.js')<html.indexOf('text-detective.js'));assert.ok(html.indexOf('text-detective.js')<html.indexOf('history-chapter.js'));assert.match(html,/firebase-auth-compat/);
}

// A semantic DOM runs the actual plugin, including dynamically replaced markup.
// Pixel layout is checked separately in the browser; the test checks controls,
// proof selection, events and the disposal of listeners/timers.
function detectiveHarness({reducedMotion=false}={}){
 const listeners=new Set(),timers=new Map(),frames=new Map(),observers=[];let token=0;
 const dataKey=name=>name.slice(5).replace(/-([a-z])/g,(_,letter)=>letter.toUpperCase());
 const decode=text=>String(text).replaceAll('&amp;','&').replaceAll('&lt;','<').replaceAll('&gt;','>').replaceAll('&quot;','"').replaceAll('&#039;',"'").replaceAll('&#39;',"'");
 let document;
 class Node{
  constructor(tag='div',attributes={}){this.tagName=tag.toUpperCase();this.attributes=new Map();this.dataset={};this.children=[];this.parentElement=null;this.events=new Map();this.hidden=false;this.disabled=false;this.value='';this._text='';this._html='';this.isConnected=true;this.clientWidth=700;this.clientHeight=450;this.style={setProperty(name,value){this[name]=value;},removeProperty(name){delete this[name];}};const classes=new Set();this.classList={add:(...names)=>names.forEach(name=>classes.add(name)),remove:(...names)=>names.forEach(name=>classes.delete(name)),contains:name=>classes.has(name),toggle:(name,force)=>{const on=force??!classes.has(name);on?classes.add(name):classes.delete(name);return on;}};for(const [key,value]of Object.entries(attributes))this.setAttribute(key,value);}
  set textContent(value){this._text=String(value);this._html='';this.children=[];}
  get textContent(){return this._text+this.children.map(child=>child.textContent).join('');}
  get innerText(){return this.textContent;}
  set innerHTML(value){this._html=String(value);this._text='';this.children=[];parse(this._html,this);}
  get innerHTML(){return this._html;}
  setAttribute(key,value){this.attributes.set(key,String(value));if(key.startsWith('data-'))this.dataset[dataKey(key)]=String(value);if(key==='id')this.id=String(value);if(key==='class')String(value).split(/\s+/).filter(Boolean).forEach(name=>this.classList.add(name));if(key==='hidden')this.hidden=true;if(key==='disabled')this.disabled=true;if(key==='value')this.value=String(value);}
  getAttribute(key){return this.attributes.get(key)??null;}
  hasAttribute(key){return this.attributes.has(key);}
  removeAttribute(key){this.attributes.delete(key);if(key==='hidden')this.hidden=false;if(key==='disabled')this.disabled=false;}
  toggleAttribute(key,force){const on=force??!this.attributes.has(key);on?this.setAttribute(key,''):this.removeAttribute(key);return on;}
  matches(selector){
   if(selector.includes(','))return selector.split(',').some(part=>this.matches(part.trim()));
   const parts=selector.trim().split(/\s+(?![^[]*\])/);if(parts.length>1){if(!this.matches(parts.pop()))return false;const parentSelector=parts.join(' ');let parent=this.parentElement;while(parent){if(parent.matches(parentSelector))return true;parent=parent.parentElement;}return false;}
   const not=selector.match(/:not\(([^)]+)\)/);if(not){if(this.matches(not[1]))return false;selector=selector.replace(not[0],'');}
   const tag=selector.match(/^[a-z][\w-]*/i)?.[0];if(tag&&this.tagName.toLowerCase()!==tag.toLowerCase())return false;
   const id=selector.match(/#([\w-]+)/)?.[1];if(id&&this.id!==id)return false;
   const classes=[...selector.matchAll(/\.([\w-]+)/g)].map(m=>m[1]);if(!classes.every(name=>this.classList.contains(name)))return false;
   const attrs=[...selector.matchAll(/\[([^\]=]+)(?:=["']?([^\]"']*)["']?)?\]/g)];if(!attrs.every(([,key,value])=>this.attributes.has(key)&&(value===undefined||this.attributes.get(key)===value)))return false;
   return Boolean(tag||id||classes.length||attrs.length||selector==='*');
  }
  closest(selector){return this.matches(selector)?this:this.parentElement?.closest(selector)||null;}
  contains(node){return node===this||this.children.some(child=>child.contains(node));}
  querySelectorAll(selector){return this.children.flatMap(child=>[...(child.matches(selector)?[child]:[]),...child.querySelectorAll(selector)]);}
  querySelector(selector){return this.querySelectorAll(selector)[0]||null;}
  addEventListener(type,handler,options={}){if(options.signal?.aborted)return;const entry={type,handler};listeners.add(entry);if(!this.events.has(type))this.events.set(type,new Set());this.events.get(type).add(entry);options.signal?._remove.add(()=>{listeners.delete(entry);this.events.get(type).delete(entry);});}
  removeEventListener(type,handler){for(const entry of this.events.get(type)||[])if(entry.handler===handler){listeners.delete(entry);this.events.get(type).delete(entry);}}
  dispatchEvent(event){event.target??=this;for(const entry of [...(this.events.get(event.type)||[])])entry.handler(event);return true;}
  focus(){document.activeElement=this;}
  scrollIntoView(){}
  getBoundingClientRect(){return {width:this.clientWidth,height:this.clientHeight,left:0,top:0,right:this.clientWidth,bottom:this.clientHeight};}
  appendChild(child){child.parentElement=this;this.children.push(child);return child;}
 }
 function parse(html,parent){const stack=[parent],voids=new Set(['input','br','hr','img','meta','link','path','circle','line','rect','ellipse','polygon','polyline','stop','use']);for(const match of html.matchAll(/<\/?([a-z][\w-]*)\b([^>]*)>|([^<]+)/gi)){if(match[3]){stack.at(-1)._text+=decode(match[3]);continue;}const [,tag,attributeString]=match;if(match[0].startsWith('</')){const found=stack.findLastIndex(node=>node.tagName.toLowerCase()===tag.toLowerCase());if(found>0)stack.length=found;continue;}const attrs={};for(const [,name,dq,sq,unquoted]of attributeString.replace(/\/$/,'').matchAll(/([^\s=]+)(?:="([^"]*)"|='([^']*)'|=([^\s>]+))?/g))attrs[name]=decode(dq??sq??unquoted??'');const node=new Node(tag,attrs);node.parentElement=stack.at(-1);node.parentElement.children.push(node);if(!match[0].endsWith('/>')&&!voids.has(tag.toLowerCase()))stack.push(node);}}
 document=new Node('document');document.hidden=false;document.createElement=tag=>new Node(tag);document.getElementById=id=>document.querySelector('#'+id);
 class Controller{constructor(){this.signal={aborted:false,_remove:new Set()};}abort(){this.signal.aborted=true;for(const remove of this.signal._remove)remove();this.signal._remove.clear();}}
 class Custom{constructor(type,options={}){this.type=type;Object.assign(this,options);}}
 class Observer{constructor(callback){this.callback=callback;this.disconnected=false;observers.push(this);}observe(){}disconnect(){this.disconnected=true;}}
 const media=new Node('media');media.matches=reducedMotion;
 const global=new Node('window');global.matchMedia=()=>media;global.devicePixelRatio=2;
 const context=vm.createContext({window:global,document,Element:Node,HTMLElement:Node,AbortController:Controller,CustomEvent:Custom,ResizeObserver:Observer,IntersectionObserver:Observer,performance:{now:()=>0},requestAnimationFrame:fn=>{frames.set(++token,fn);return token;},cancelAnimationFrame:key=>frames.delete(key),setTimeout:fn=>{timers.set(++token,fn);return token;},clearTimeout:key=>timers.delete(key),console});
 for(const file of ['text-detective-cases.js','text-detective.js'])vm.runInContext(fs.readFileSync(path.join(root,file),'utf8'),context,{filename:file});
 const plugin=global.ChapterInteractions;assert.equal(plugin.render('other-experience'),'');document.innerHTML=plugin.render('text-detective');const host=document.querySelector('[data-text-detective]')||document.querySelector('#text-detective');assert.ok(host,'The detective mounts in its own section');const notifications=[];host.addEventListener('text-detective-progress',event=>notifications.push(JSON.parse(JSON.stringify(event.detail))));const externalListeners=listeners.size;
 const click=selector=>{const target=host.querySelector(selector);assert.ok(target,'Control exists: '+selector);assert.equal(target.disabled,false,'Control enabled: '+selector);host.dispatchEvent({type:'click',target,preventDefault(){},stopPropagation(){}});};
 const visible=node=>Boolean(node)&&!node.hidden&&(!node.parentElement||visible(node.parentElement));
 const action=(name,value)=>click('[data-td-action="'+name+'"]'+(value===undefined?'':'[data-value="'+value+'"]'));
 return {plugin,host,q:s=>host.querySelector(s),qa:s=>host.querySelectorAll(s),click,action,visible,notifications,listeners,externalListeners,timers,frames,observers,document,media};
}

function actualPluginGrading(){
 const cases=readCases(),first=cases[0],firstQuestion=first.questions[0];
 const last=h=>h.notifications.at(-1)||{};
 const chooseProof=(h,c,proof)=>{for(const sentenceId of proof){const doc=c.documents.find(d=>d.sentences.some(s=>s.id===sentenceId));h.action('doc',doc.id);h.action('sentence',sentenceId);}};
 const mountAt=(c,q,saved={})=>{const h=detectiveHarness();h.plugin.mount(h.host,{saved:{activeCase:c.id,activeQuestion:q.id,activeDocument:c.documents[0].id,...saved}});return h;};
 for(const c of cases)for(const q of c.questions)for(const proof of q.evidenceSets){
  const h=mountAt(c,q);assert.equal(h.visible(h.q('.td-case-summary')),false,'The solved case summary is not disclosed on arrival');assert.equal(h.visible(h.q('.td-reconstruction')),false,'The worked reasoning is revealed after a supported conclusion');assert.ok(!h.q('.td-reconstruction').textContent.includes(q.explanation),'No worked explanation is inserted before mastery');h.action('option',q.correctOptionId);
  const before=last(h).answers?.[q.id]?.attempts||0,check=h.q('[data-td-action="check"]');if(!check.disabled)h.action('check');assert.ok(!last(h).completedQuestions?.includes(q.id),'A correct answer alone cannot complete a task');assert.equal(last(h).answers?.[q.id]?.attempts||0,before,'Missing evidence is a preparation state, not an assessed attempt');
  chooseProof(h,c,proof);const wrong=q.options.find(o=>o.id!==q.correctOptionId).id;h.action('option',wrong);h.action('check');assert.ok(!last(h).completedQuestions.includes(q.id),'Correct evidence does not make a wrong conclusion valid');assert.equal(last(h).answers[q.id].attempts,1);assert.ok(h.q('[data-td-feedback]').classList.contains('is-error'));
  h.action('option',q.correctOptionId);h.action('check');assert.ok(last(h).completedQuestions.includes(q.id),'Every allowed proof and the correct conclusion must succeed');assert.equal(last(h).answers[q.id].attempts,2);assert.ok(h.q('[data-td-feedback]').classList.contains('is-success'));assert.equal(h.visible(h.q('.td-reconstruction')),true);assert.ok(h.q('.td-reconstruction').textContent.includes(q.explanation));
  const stable=JSON.parse(JSON.stringify(last(h)));h.plugin.unmount();assert.equal(h.listeners.size,h.externalListeners);assert.equal(h.timers.size,0);assert.equal(h.frames.size,0);
  const restored=mountAt(c,q,stable);assert.ok(restored.q('[data-td-feedback]').textContent.length>0,'A restored success is visible');restored.action('review');restored.action('doc',c.documents[0].id);const revived=last(restored);assert.ok(revived.completedQuestions.includes(q.id));assert.deepEqual(new Set(revived.answers[q.id].evidence),new Set(proof));assert.equal(revived.answers[q.id].choice,q.correctOptionId);restored.plugin.unmount();
 }
 // A same-size unrelated selection and a superset are both insufficient proofs.
 for(const c of cases)for(const q of c.questions){
  const canonical=values=>[...values].sort().join('|'),valid=new Set(q.evidenceSets.map(canonical)),all=c.documents.flatMap(d=>d.sentences.map(s=>s.id));const proof=q.evidenceSets[0];
  const unrelated=all.filter(id=>!proof.includes(id)).slice(0,proof.length);assert.equal(valid.has(canonical(unrelated)),false);const wrong=mountAt(c,q,{answers:{[q.id]:{evidence:unrelated,choice:q.correctOptionId,attempts:0}}});wrong.action('check');assert.ok(!last(wrong).completedQuestions.includes(q.id),'Unrelated text with a matching clue count cannot complete a task');wrong.plugin.unmount();
  const extra=[...proof,all.find(id=>!proof.includes(id))],superset=mountAt(c,q,{answers:{[q.id]:{evidence:extra,choice:q.correctOptionId,attempts:0}}});const check=superset.q('[data-td-action="check"]');if(!check.disabled)superset.action('check');assert.ok(!last(superset).completedQuestions?.includes(q.id),'Adding irrelevant evidence cannot turn a valid proof into an accepted superset');superset.plugin.unmount();
 }
 const dirty=mountAt(first,firstQuestion,{activeCase:'missing-case',activeQuestion:'missing-question',activeDocument:'missing-document',answers:{[firstQuestion.id]:{evidence:['foreign',firstQuestion.evidenceSets[0][0],firstQuestion.evidenceSets[0][0]],choice:'foreign',attempts:Infinity},foreign:{evidence:[],choice:'x',attempts:20}},completedQuestions:['foreign'],visitedDocuments:['foreign']});dirty.action('doc',first.documents[0].id);const cleaned=last(dirty);assert.equal(cleaned.activeCase,first.id);assert.equal(cleaned.activeQuestion,firstQuestion.id);assert.ok(!cleaned.completedQuestions.includes('foreign'));assert.ok(!cleaned.visitedDocuments.includes('foreign'));assert.equal(cleaned.answers.foreign,undefined);assert.deepEqual(cleaned.answers[firstQuestion.id].evidence,firstQuestion.evidenceSets[0]);assert.equal(cleaned.answers[firstQuestion.id].choice,null);assert.ok(Number.isFinite(cleaned.answers[firstQuestion.id].attempts));
 const notifications=dirty.notifications.length;dirty.plugin.unmount();dirty.action('case',first.id);assert.equal(dirty.notifications.length,notifications,'Unmounted controls cannot change another chapter or account');assert.equal(dirty.listeners.size,dirty.externalListeners);assert.equal(dirty.timers.size,0);assert.ok(dirty.observers.every(observer=>observer.disconnected));
 const reduced=detectiveHarness({reducedMotion:true});reduced.plugin.mount(reduced.host,{saved:{}});assert.equal(reduced.frames.size,0,'The reading experience has no continuous animation loop');reduced.plugin.unmount();assert.equal(reduced.listeners.size,reduced.externalListeners);
 const route=mountAt(first,firstQuestion);for(const c of cases)for(const q of c.questions){assert.equal(last(route).activeQuestion||firstQuestion.id,q.id,'Continue advances through the three tasks and three casefiles');chooseProof(route,c,q.evidenceSets[0]);route.action('option',q.correctOptionId);route.action('check');assert.ok(last(route).completedQuestions.includes(q.id));if(q.kind==='main'){assert.equal(route.visible(route.q('.td-case-summary')),true);assert.ok(route.q('.td-case-summary').textContent.includes(c.summary));}route.action('next');}
 assert.equal(last(route).completedQuestions.length,9);assert.equal(route.q('[data-td-overall]').textContent,'9 de 9 retos resueltos');assert.equal(route.q('[data-td-log]').querySelectorAll('.is-complete').length,3);route.plugin.unmount();assert.equal(route.timers.size,0);
}

async function detectivePersistence(){
 const cases=readCases(),first=cases[0],q=first.questions[0],next=first.questions[1],other=cases[1],otherQuestion=other.questions[0];
 const local=new Map(),cloud=new Map(),h=harness(chapterFiles,{local,cloud});h.run("window.StudyMode.choose('reader','free')");await h.signIn({uid:'reader'});await h.run("window.StudyMode.save('reader',db)");
 const send=(target,detail)=>target.events.get('text-detective-progress')({detail:{experience:'text-detective',...detail}});
 const answer={evidence:q.evidenceSets[0],choice:q.correctOptionId,attempts:2};
 const state={activeCase:first.id,activeQuestion:next.id,activeDocument:first.documents[1].id,answers:{[q.id]:answer},completedQuestions:[q.id],visitedDocuments:[first.documents[0].id,first.documents[1].id]};
 send(h,state);await h.run('persist()');let saved=cloud.get('users/reader/progress/'+chapterId);
 assert.deepEqual(saved.textDetective.completedQuestions,[q.id]);assert.deepEqual(saved.textDetective.answers[q.id],answer);assert.equal(saved.textDetective.activeQuestion,next.id);assert.equal(saved.percent,0,'Detective cases cannot award academic quiz marks');assert.equal(saved.chapterCompleted,false);
 const before=JSON.stringify(saved.textDetective);send(h,{experience:'other-plugin',completedQuestions:[next.id]});await h.run('persist()');assert.equal(JSON.stringify(cloud.get('users/reader/progress/'+chapterId).textDetective),before);
 const reload=harness(chapterFiles,{cloud});await reload.signIn({uid:'reader'});assert.deepEqual(plain(reload,'P.textDetective.answers'),state.answers);assert.equal(reload.run('P.textDetective.activeCase'),first.id);
 reload.run("window.ChapterInteractions={render:()=>'',unmount(){},mount:(root,options)=>{window.restoredDetective=options.saved;}};render()");assert.deepEqual(plain(reload,'window.restoredDetective.answers'),state.answers);assert.deepEqual(plain(reload,'window.restoredDetective.completedQuestions'),[q.id]);
 // A local offline question and a different question from another device merge.
 h.setOffline(true);const newAnswer={evidence:next.evidenceSets[0],choice:next.correctOptionId,attempts:1};send(h,{...state,answers:{...state.answers,[next.id]:newAnswer},completedQuestions:[next.id]});await h.run('persist()');assert.equal(h.run('cloudReady'),false);assert.equal(JSON.parse(local.get('sin-limites:reader:'+chapterId)).pending,true);
 saved=cloud.get('users/reader/progress/'+chapterId);const remoteAnswer={evidence:otherQuestion.evidenceSets[0],choice:otherQuestion.correctOptionId,attempts:3};cloud.set('users/reader/progress/'+chapterId,{...saved,textDetective:{...saved.textDetective,answers:{...saved.textDetective.answers,[otherQuestion.id]:remoteAnswer},completedQuestions:[q.id,otherQuestion.id],visitedDocuments:[other.documents[0].id],updatedMs:1}});
 h.setOffline(false);await h.run('retrySync()');const merged=cloud.get('users/reader/progress/'+chapterId).textDetective;assert.deepEqual(new Set(merged.completedQuestions),new Set([q.id,next.id,otherQuestion.id]));assert.deepEqual(merged.answers[next.id],newAnswer);assert.deepEqual(merged.answers[otherQuestion.id],remoteAnswer);assert.deepEqual(new Set(merged.visitedDocuments),new Set([...state.visitedDocuments,other.documents[0].id]));assert.equal(JSON.parse(local.get('sin-limites:reader:'+chapterId)).pending,false);
 h.run("window.StudyMode.choose('another-reader','free')");await h.signIn({uid:'another-reader'});assert.equal(h.run('P.textDetective.completedQuestions.length'),0);assert.equal(h.run('Object.keys(P.textDetective.answers).length'),0);assert.ok(cloud.get('users/reader/progress/'+chapterId).textDetective.completedQuestions.includes(next.id));
 const unrelated=harness(['razonamiento-verbal-catalog.js','history-progress.js','razonamiento-verbal-capitulo-05-data.js','text-detective-cases.js','history-chapter.js'],{local,cloud});await unrelated.signIn({uid:'reader'});send(unrelated,state);await unrelated.run('persist()');assert.equal(cloud.get('users/reader/progress/razonamiento-verbal-capitulo-05').textDetective,undefined,'A detective event cannot enter another chapter');
}

function progressSanitization(){
 const cases=readCases(),c=cases[0],q=c.questions[0],h=harness(chapterFiles);assert.doesNotThrow(()=>h.run('mergeDetective(null,null)'));
 const malformed={activeCase:'<script>',activeQuestion:cases[1].questions[0].id,activeDocument:cases[1].documents[0].id,answers:{[q.id]:{evidence:[...q.evidenceSets[0],...q.evidenceSets[0],'foreign',cases[1].documents[0].sentences[0].id],choice:'foreign',attempts:Infinity},foreign:{evidence:[],choice:'x',attempts:2}},completedQuestions:[q.id,q.id,'foreign'],visitedDocuments:[c.documents[0].id,'foreign'],updatedMs:Infinity};
 const sanitized=plain(h,'detectiveProgress('+JSON.stringify(malformed).replace('"attempts":null','"attempts":Infinity').replace('"updatedMs":null','"updatedMs":Infinity')+')');
 assert.equal(sanitized.activeCase,c.id);assert.equal(sanitized.activeQuestion,q.id);assert.equal(sanitized.activeDocument,c.documents[0].id);assert.deepEqual(sanitized.answers[q.id].evidence,q.evidenceSets[0]);assert.equal(sanitized.answers[q.id].choice,null);assert.equal(sanitized.answers[q.id].attempts,0);assert.equal(sanitized.answers.foreign,undefined);assert.deepEqual(sanitized.completedQuestions,[q.id]);assert.deepEqual(sanitized.visitedDocuments,[c.documents[0].id]);assert.equal(sanitized.updatedMs,0);
}

async function navigationReturnRoutes(){
 const homeFiles=['quimica-capitulo-18-practice.js','courses.js','history-catalog.js','peru-catalog.js','lenguaje-catalog.js','economia-catalog.js','educacion-civica-catalog.js','razonamiento-verbal-catalog.js','razonamiento-matematico-catalog.js','fisica-catalog.js','biologia-catalog.js','quimica-catalog.js','history-progress.js','app.js'];
 const destination=chapterId+'.html?v=20261021-detective1#text-detective';
 const guest=harness(chapterFiles);await guest.signIn(null);assert.ok(guest.elements.get('chapter-app').innerHTML.includes('index.html?chapter='+chapterId+'&v=20261021-detective1'),'The Google entry refreshes the homepage version');
 const firstVisit=harness(chapterFiles);await firstVisit.signIn({uid:'new-reader'});assert.equal(firstVisit.redirects.at(-1),'index.html?chapter='+chapterId+'&v=20261021-detective1','A signed-in reader without a mode reaches the current entry page');
 const picker=harness(homeFiles,{search:'?chapter='+chapterId});await picker.signIn({uid:'new-reader'});assert.equal(picker.run('state.view'),'mode');picker.run("selectStudyMode('progressive')");assert.equal(picker.redirects.at(-1),destination,'Choosing a mode returns directly to the detective anchor');
 picker.run('state.activeCourseId=1;setTopic(5)');assert.equal(picker.redirects.at(-1),destination,'The chapter6 syllabus entry opens the detective version');
 picker.run('navigationProgress={lastCourseId:1,lastChapterNumber:6,lastTopicIndex:5};openProgressChapter()');assert.equal(picker.redirects.at(-1),destination,'Resume opens the current detective version');
 picker.run('setTopic(4)');assert.equal(picker.redirects.at(-1),'razonamiento-verbal-capitulo-05.html?v=20260918-social1','Other chapters retain their established routes');
 assert.equal(picker.run("studyChapterHref('historia-universal-capitulo-05')"),'historia-universal-capitulo-05.html?v=20260918-social1');assert.equal(picker.run("studyChapterHref('fisica-capitulo-01')"),'fisica-capitulo-01.html?v=20260919-fisica19');
 await picker.run("window.StudyMode.save('new-reader',db)");const returning=harness(homeFiles,{cloud:picker.cloud,search:'?chapter='+chapterId});await returning.signIn({uid:'new-reader'});assert.equal(returning.redirects.at(-1),destination,'An existing mode resumes the requested detective after authentication');
 const other=harness(['razonamiento-verbal-catalog.js','history-progress.js','razonamiento-verbal-capitulo-05-data.js','history-chapter.js']);await other.signIn({uid:'new-other'});assert.equal(other.redirects.at(-1),'index.html?chapter=razonamiento-verbal-capitulo-05&v=20260918-social1','The first-visit route of other chapters remains unchanged');
}

async function main(){contentIntegrity();await detectivePersistence();progressSanitization();actualPluginGrading();await navigationReturnRoutes();console.log('PASS: Detective proofs, actual controls, restored answers, lifecycle, persistence, offline merge, account isolation and authentication/resume routes.');}
main().catch(error=>{console.error(error);process.exitCode=1;});
