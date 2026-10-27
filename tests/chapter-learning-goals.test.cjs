const assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const {harness}=require('./study-entry.test.cjs');
const root=path.join(__dirname,'..');
const read=file=>fs.readFileSync(path.join(root,file),'utf8');
const count=(html,pattern)=>(html.match(pattern)||[]).length;
const plain=(h,expression)=>JSON.parse(h.run('JSON.stringify('+expression+')'));
const freeze=value=>{if(value&&typeof value==='object'){Object.values(value).forEach(freeze);Object.freeze(value);}return value;};
const text=html=>html.replace(/<[^>]*>/g,' ').replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&quot;/g,'"').replace(/&#0?39;/g,"'").replace(/&amp;/g,'&');

function helperContract(){
 const context={window:{}};
 vm.runInNewContext(read('chapter-learning-goals.js'),context);
 const helper=context.window.ChapterLearningGoals;
 const input=freeze({
  goals:[{title:'Comprender <ondas>',text:'Relaciona A & B, "fase" y \'frecuencia\'.'},{title:'Aplicar.',text:'Conserva el punto final.'}],
  sequenceTitle:'Ruta <segura>',sequenceNote:'Una nota & su explicación.',
  timeline:[['Paso <1>','Una descripción & otra.'],{title:'Paso "2"',text:'Texto con \'comillas\'.'}]
 });
 const before=JSON.stringify(input),html=helper.render(input),route=helper.renderRoute(input);
 assert.equal(JSON.stringify(input),before,'Rendering cannot change chapter metadata');
 assert.equal(helper.render(input),html,'Repeated renders are deterministic');
 assert.equal(count(html,/id="learning-goals"/g),1);
 assert.match(html,/Antes de empezar/);assert.match(html,/¿Qué aprenderás\?/);
 assert.match(html,/Comprender &lt;ondas&gt;\./);assert.match(html,/A &amp; B, &quot;fase&quot; y &#39;frecuencia&#39;/);
 assert.doesNotMatch(html,/<ondas>|<segura>|<1>|Aplicar\.\./);
 assert.match(route,/Ruta &lt;segura&gt;/);assert.match(route,/Paso &quot;2&quot;/);assert.match(route,/Una nota &amp; su explicación\./);
 assert.doesNotMatch(route,/<section|id="learning-goals"|¿Qué aprenderás\?/,'A route can extend the original History introduction without duplicating it');
 assert.equal(count(html,/<details\b/g),1);assert.doesNotMatch(html,/<details[^>]*\bopen\b/,'The route starts collapsed');
 for(const value of [undefined,null,[],false,'chapter',{goals:[]},{goals:[null,{}, {title:'Incomplete'}]}])assert.equal(helper.render(value),'');
 assert.equal(helper.renderRoute({timeline:[null,[],{title:'Incomplete'}]}),'');
 assert.doesNotMatch(helper.render({goals:input.goals}),/<details/,'A chapter without a route still has valid goals');
}

function pageManifest(file){
 const html=read(file),scripts=[...html.matchAll(/<script\b[^>]*\bsrc="([^"]+)"/g)].map(match=>match[1].split(/[?#]/)[0]).filter(src=>!/^https?:/.test(src));
 const renderer=scripts.find(src=>src==='history-chapter.js'||src==='history-reading.js')||file.replace(/\.html$/,'.js');
 assert.ok(scripts.includes(renderer),file+' declares a chapter renderer');
 const files=scripts.filter(src=>!['practice-bank.js','chapter-practice.js','study-mode.js'].includes(src)&&(
  /-(?:catalog|data|content|practice)\.js$/.test(src)||['history-progress.js','chapter-learning-goals.js',renderer].includes(src)
 ));
 if(renderer!=='history-chapter.js'){
  assert.equal(scripts.filter(src=>src==='chapter-learning-goals.js').length,1,file+' declares the helper once');
  assert.ok(scripts.indexOf('chapter-learning-goals.js')<scripts.indexOf(renderer),file+' loads the helper before rendering');
  assert.match(html,/<link\b[^>]*href="chapter-learning-goals\.css[?"]/,
   file+' includes the introduction styles');
 }
 return {file,files,renderer,reading:renderer==='history-reading.js',physics:/^fisica-capitulo-(?:01|02|13|17)\.js$/.test(renderer)};
}

function assertIntroduction(html,label,{separate=false}={}){
 assert.equal(count(html,/id="learning-goals"/g),1,label+' has one introduction');
 assert.equal(count(html,/¿Qué aprenderás\?/g),1,label+' has one goals heading');
 assert.match(html,/<details class="(?:chapter-chronology|chapter-learning-route)"/,label+' has an expandable route');
 const start=html.indexOf('id="learning-goals"'),theory=html.indexOf('<div class="content">')>=0?html.indexOf('<div class="content">'):html.indexOf('<section class="reading-section"');
 if(separate){
  assert.equal(theory,-1,label+' shows the introduction independently from the lesson');
  const entry=html.match(/<button[^>]*data-action="intro"[^>]*>[\s\S]*?<\/button>/)?.[0];
  assert.ok(entry,label+' exposes the separate introduction in the chapter route');
  assert.doesNotMatch(entry,/data-index=|<span[^>]*>\s*\d+\s*<\/span>/,label+' does not number the introduction as a lesson');
  assert.ok(html.indexOf('data-action="intro"')<html.indexOf('data-index="0"'),label+' places the introduction before item 1');
  assert.match(html,/data-action="lesson" data-index="0"/,'The first lesson remains accessible with its original index');
 }else assert.ok(start>=0&&theory>start,label+' places goals before theory');
}

async function allDevelopedChapters(){
 const pages=fs.readdirSync(root).filter(file=>/-capitulo-\d+\.html$/.test(file)).sort();
 assert.equal(pages.length,51,'Every developed chapter is included in this audit');
 const signatures=new Set(),courses=new Set(),renderers={shared:0,reading:0,physics:0};
 for(const page of pages){
  const manifest=pageManifest(page),h=harness(manifest.files);
  h.run("window.StudyMode.choose('learning-reader','free')");await h.signIn({uid:'learning-reader'});
  const content=plain(h,manifest.reading?'DECK':'CONTENT');
  const goals=manifest.reading?content.blocks.find(block=>block.id==='s2').cards:content.goals;
  assert.ok(Array.isArray(goals)&&goals.length>=2,page+' has chapter-specific objectives');
  for(const goal of goals){assert.ok(goal.title?.trim()&&goal.text?.trim(),page+' has complete objectives');}
  const signature=JSON.stringify(goals.map(goal=>[goal.title,goal.text]));
  assert.equal(signatures.has(signature),false,page+' does not repeat another chapter’s entire objectives');
  signatures.add(signature);courses.add(content.courseId||12);
  assert.ok(Array.isArray(content.timeline)&&content.timeline.length>=2,page+' has its own learning route');
  const container=manifest.reading?'reading-app':'chapter-app',html=h.elements.get(container).innerHTML;
  assertIntroduction(html,page,{separate:manifest.physics});
  for(const goal of goals){assert.ok(text(html).includes(goal.title),page+' renders its goal title');assert.ok(text(html).includes(goal.text),page+' renders its goal explanation');}
  const before=plain(h,'P');h.run('render();render()');
  assert.deepEqual(plain(h,'P'),before,page+' does not award progress or change reading position on render');
  assertIntroduction(h.elements.get(container).innerHTML,page+' after repeated rendering',{separate:manifest.physics});
  if(manifest.physics){
   renderers.physics++;
   assert.equal(h.run('P.activeTab'),'intro',page+' opens in its independent introduction');
   assert.equal(h.run("normalized({activeTab:'intro'}).activeTab"),'intro',page+' preserves an introduction bookmark');
   const lessonIds=content.lessons.map(lesson=>lesson.id||lesson.title);
   for(const mode of ['free','progressive']){
    h.run(`window.StudyMode.choose('learning-reader','${mode}');refreshStudyMode()`);
    for(let i=0;i<content.lessons.length;i++){
     h.run(`goLesson(${i})`);
     const lesson=h.elements.get(container).innerHTML;
     assert.doesNotMatch(lesson,/id="learning-goals"|class="chapter-learning-goals"/,page+' / '+mode+' / topic '+i+' has no repeated introduction');
     assert.equal(h.run('P.currentItem'),i,page+' keeps original item numbering');
     const bookmark=plain(h,'({currentItem:P.currentItem,readingItem:P.readingItem,practice10:P.practice10})');
     h.run('goIntro()');
     assert.equal(h.run('P.activeTab'),'intro');
     assert.deepEqual(plain(h,'({currentItem:P.currentItem,readingItem:P.readingItem,practice10:P.practice10})'),bookmark,page+' opening the introduction preserves the reading position and mastery');
     assertIntroduction(h.elements.get(container).innerHTML,page+' / '+mode+' / intro after topic '+i,{separate:true});
    }
    const view=h.elements.get(container).innerHTML;
    for(const tab of ['practice','examples','resources'].filter(tab=>view.includes('data-value="'+tab+'"'))){
     h.run(`goTab('${tab}')`);
     assert.doesNotMatch(h.elements.get(container).innerHTML,/id="learning-goals"|class="chapter-learning-goals"/,page+' hides the introduction in '+tab);
    }
   }
   assert.deepEqual(plain(h,'LESSONS.map(lesson=>lesson.id||lesson.title)'),lessonIds,page+' keeps all lesson IDs and counts unchanged');
   for(const anchor of ['#learning-goals','#antes-de-empezar']){
    h.run(`goLesson(LESSONS.length-1);window.location.hash='${anchor}';applyIntroAnchor()`);
    assert.equal(h.run('P.activeTab'),'intro',page+' routes '+anchor+' to the separate introduction');
    assertIntroduction(h.elements.get(container).innerHTML,page+' / '+anchor,{separate:true});
   }
   h.run('goLesson(0)');assert.equal(h.run('P.currentItem'),0);assert.equal(h.run('P.activeTab'),'theory');
   assert.match(h.elements.get(container).innerHTML,/data-action="intro"[^>]*>←\s*Antes de empezar/,page+' lets item 1 return to the introduction');
  }else if(manifest.reading){
   renderers.reading++;
   assert.match(html,/id="learning-goals" data-reading-block="1" tabindex="-1"/,'The original reading anchor and progress index stay unchanged');
  }else renderers.shared++;
 }
 assert.equal(courses.size,11,'The audit includes every course with developed chapters');
 assert.deepEqual(renderers,{shared:46,reading:1,physics:4});
 console.log('PASS: all 51 chapters in 11 courses have specific goals and a route before theory; Physics introductions are independent, unnumbered sections before item 1 and never repeat in lesson views; progress and deep links are preserved.');
}

async function main(){helperContract();await allDevelopedChapters();}
if(require.main===module)main().catch(error=>{console.error(error);process.exitCode=1;});
