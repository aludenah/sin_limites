const assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path');
const {harness}=require('./study-entry.test.cjs');
const root=path.join(__dirname,'..'),chapterId='fisica-capitulo-13';
const read=file=>fs.readFileSync(path.join(root,file),'utf8');
const files=['fisica-capitulo-13-practice.js','fisica-capitulo-13-data.js','fisica-capitulo-13.js'];
const plain=(h,expression)=>JSON.parse(h.run('JSON.stringify('+expression+')'));
const lessonIds=['naturaleza-onda','transversal-longitudinal','magnitudes-onda','ecuacion-onda','rapidez-cuerda','reflexion-pulsos','superposicion','ondas-estacionarias','sonido','fenomenos-ondulatorios','efecto-doppler'];
const labKinds=[null,null,null,'equation','string','reflection','superposition','standing','sound','wavefronts','doppler'];

function sourceAndDependencies(){
 const html=read(chapterId+'.html'),css=read(chapterId+'.css'),source=read(chapterId+'.js');
 for(const file of ['fisica-capitulo-01.css','chapter-practice.css','mechanical-wave-labs.css','wave-examples-animations.css','wave-amplitude-frequency.css','activity-fullscreen.css','fisica-capitulo-13-practice.js','chapter-practice.js','fisica-capitulo-13-data.js','study-mode.js','mechanical-wave-engine.js','mechanical-wave-labs.js','wave-examples-animations.js','wave-amplitude-frequency.js','heart-narration.js','wave-lesson-audio.js','fisica-capitulo-13.js','activity-fullscreen.js'])assert.ok(html.includes(file),'Chapter declares '+file);
 for(const [first,second] of [['fisica-capitulo-13-practice.js','chapter-practice.js'],['mechanical-wave-engine.js','mechanical-wave-labs.js'],['mechanical-wave-labs.js','fisica-capitulo-13.js'],['wave-examples-animations.js','fisica-capitulo-13.js'],['wave-amplitude-frequency.js','fisica-capitulo-13.js'],['heart-narration.js','wave-lesson-audio.js'],['wave-lesson-audio.js','fisica-capitulo-13.js']])assert.ok(html.indexOf(first)<html.indexOf(second),first+' loads before '+second);
 for(const match of html.matchAll(/(?:src|href)="([^"#?]+)(?:\?[^"#]*)?(?:#[^"]*)?"/g))if(!/^https?:/.test(match[1]))assert.ok(fs.existsSync(path.join(root,match[1])),'Local reference exists: '+match[1]);
 assert.match(css,/\.wrap\{max-width:1440px\}/);assert.match(css,/grid-template-columns:220px minmax\(0,1fr\)/);assert.match(css,/\.content table\{[^}]*table-layout:fixed/);
 assert.match(css,/\.tabs\{overflow:visible;flex-wrap:wrap\}/,'Mobile tabs fit without horizontal dragging');
 assert.match(css,/\[data-wave-lab\].*\{min-width:0;max-width:100%\}/);
 assert.match(source,/data-wave-lesson-audio/);assert.match(source,/window\.WaveAmplitudeFrequency\?\.mount\(root\)/);assert.match(source,/window\.WaveAmplitudeFrequency\?\.destroy\(\)/);assert.match(source,/window\.MechanicalWaveLabs\?\.mount\(root\)/);assert.match(source,/window\.WaveLessonAudio\?\.mount\(root,\{lesson:P\.activeTab==='theory'\?LESSONS\[P\.currentItem\]:null\}\)/);
 assert.doesNotMatch(source,/WireFieldLab|ChapterInteractions|inductionLab|beforeSourcePDF|sourcePages|electromagnetismo/i);
 assert.doesNotMatch(html,/wire-field|induction-(engine|lab)|history-chapter/);
}

async function chapterFormatAndViews(){
 const h=harness(files);h.run("window.StudyMode.choose('wave-reader','free')");await h.signIn({uid:'wave-reader'});
 const content=plain(h,'CONTENT');assert.equal(content.title,'Ondas mecánicas');assert.equal(content.number,13);assert.equal(content.courseId,16);
 assert.deepEqual(content.lessons.map(l=>l.id),lessonIds);assert.equal(content.workedExamples.length,10);
 assert.deepEqual(content.workedExamples.map(e=>e.number),Array.from({length:10},(_,i)=>i+1));
 content.lessons.forEach((lesson,i)=>{
  if(i===0){
   assert.equal(lesson.title,'¿Qué es una onda mecánica?');
   assert.match(lesson.body,/medio material/);assert.match(lesson.body,/energía/);
   assert.match(lesson.body,/partículas/);assert.match(lesson.body,/equilibrio/);
   assert.match(lesson.body,/fuente/);assert.match(lesson.body,/interacción entre sus partes vecinas/);assert.match(lesson.body,/cantidad de movimiento/);
   assert.deepEqual([...lesson.body.matchAll(/data-wave-animation="([^"]+)"/g)].map(match=>match[1]),['transverse','longitudinal']);
   for(const [heading,kind] of [['tipo-transversal','transverse'],['tipo-longitudinal','longitudinal']]){
    const section=lesson.body.match(new RegExp('<section[^>]*aria-labelledby="'+heading+'"[^>]*>([\\s\\S]*?)</section>'));
    assert.ok(section,'The '+kind+' explanation has its own section');
    assert.ok(section[1].indexOf('<h4')<section[1].indexOf('data-wave-animation="'+kind+'"'),'The '+kind+' animation follows its heading');
    assert.match(section[1],new RegExp('</p><div data-wave-animation="'+kind+'"></div>'),'The '+kind+' animation appears after its explanation');
   }
   assert.doesNotMatch(lesson.body,/<(?:img|audio|video)|data-wave-lab|data-wave-lesson-audio|juego|puntaje|misión/i);
   assert.equal(lesson.audioSegments.length,0);assert.equal(lesson.examples.length,0);
   return;
  }
  if(i===1){
   assert.equal(lesson.title,'Elementos de una onda');
   for(const concept of [/cresta/i,/valle/i,/equilibrio/i,/amplitud/i,/longitud de onda/i,/período/i,/frecuencia/i])assert.match(lesson.body,concept);
   assert.match(lesson.body,/assets\/waves-elements-diagram\.svg/,'The elements lesson includes its own annotated diagram');
   assert.match(lesson.body,/data-activity-fullscreen/,'The diagram can be viewed in fullscreen');
   assert.doesNotMatch(lesson.body,/data-wave-lab=|data-wave-animation=/,'Item two no longer repeats the classification activity');
   assert.ok(fs.existsSync(path.join(root,'assets/waves-elements-diagram.svg')),'The diagram asset exists');
   assert.equal(lesson.audioSegments.length,0,'The elements lesson has no listening panel');
   assert.doesNotMatch(lesson.body,/Reconoce los elementos en el perfil|Escucha y observa/i,'The removed presentation labels are not displayed');
   assert.equal((lesson.body.match(/data-wave-amplitude-frequency/g)||[]).length,1,'The elements lesson contains one amplitude/frequency activity');
   assert.ok(lesson.body.indexOf('data-wave-amplitude-frequency')>lesson.body.lastIndexOf('class="equation"'),'The interactive activity follows the elements theory');
   assert.equal(lesson.examples.length,0);
   return;
  }
  if(i===2){
   assert.equal(lesson.title,'Ecuación de onda');
   assert.match(lesson.body,/id="ecuacion-de-onda"/,'The wave-equation lesson exposes its public anchor');
   for(const concept of [/amplitud/i,/posición/i,/tiempo/i,/longitud de onda/i,/período/i,/frecuencia/i,/fase/i])assert.match(lesson.body,concept);
   assert.match(lesson.body,/y\s*\(x,t\)/,'The equation describes both position and time');
   assert.match(lesson.body,/\\(?:omega|varphi|phi)/,'The harmonic equation includes its phase variables');
   assert.doesNotMatch(lesson.body,/data-wave-lab=|data-wave-animation=|data-wave-amplitude-frequency|data-wave-lesson-audio|<audio|<video|<input|<button/i,'The equation lesson contains definitions and static illustrations only');
   assert.equal(lesson.audioSegments.length,0,'The wave-equation lesson has no listening panel');
   assert.match(lesson.body,/assets\/wave-equation-reading\.svg/,'The equation lesson includes its static reading diagram');
   assert.match(lesson.body,/data-activity-fullscreen/,'The static equation diagram can be expanded');
   assert.ok(fs.existsSync(path.join(root,'assets/wave-equation-reading.svg')),'The equation diagram asset exists');
   assert.equal(lesson.examples.length,0);
   return;
  }
  assert.ok(lesson.body.includes('data-wave-lab="'+labKinds[i]+'"'),'Working placeholder in lesson '+lesson.id);
  assert.equal((lesson.body.match(/data-wave-lab=/g)||[]).length,1);
  assert.equal(lesson.audioSegments.length,3);for(const audio of lesson.audioSegments)assert.ok(audio.title&&audio.text.length>50);
 });
 let markup=h.elements.get('chapter-app').innerHTML;
 assert.match(markup,/Física · Capítulo 13 de 19/);assert.match(markup,/Teoría/);assert.match(markup,/Resueltos · 10/);assert.match(markup,/Práctica · 10 problemas/);
 assert.equal((markup.match(/<nav class="route"[^>]*>([\s\S]*?)<\/nav>/)[1].match(/data-action="lesson" data-index=/g)||[]).length,11,'The complete route is visible');
 for(let i=0;i<lessonIds.length;i++){
  h.run('goLesson('+i+')');markup=h.elements.get('chapter-app').innerHTML;
  if(i===0){assert.doesNotMatch(markup,/data-wave-lab=|data-wave-lesson-audio/);assert.equal((markup.match(/data-wave-animation=/g)||[]).length,2);}
  else if(i===1){assert.match(markup,/Elementos de una onda/);assert.match(markup,/waves-elements-diagram\.svg/);assert.match(markup,/data-wave-amplitude-frequency/);assert.doesNotMatch(markup,/data-wave-lab="types"|data-wave-lesson-audio|Reconoce los elementos en el perfil/);}
  else if(i===2){assert.match(markup,/Ecuación de onda/);assert.match(markup,/id="ecuacion-de-onda"/);assert.doesNotMatch(markup,/data-wave-lab=|data-wave-animation=|data-wave-amplitude-frequency|data-wave-lesson-audio|Escucha y observa/);}
  else assert.ok(markup.includes('data-wave-lab="'+labKinds[i]+'"'));
  assert.ok(markup.includes('id="'+lessonIds[i]+'"'));
  assert.equal(h.run('P.readingItem'),i);
 }
 h.run("goTab('examples')");markup=h.elements.get('chapter-app').innerHTML;
 assert.equal((markup.match(/class="example worked-example"/g)||[]).length,10);
 assert.equal((markup.match(/Ver solución paso a paso/g)||[]).length,10);
 assert.doesNotMatch(markup,/data-wave-lesson-audio/,'Audio explanation appears with the lesson it describes');
 h.run("goTab('practice')");markup=h.elements.get('chapter-app').innerHTML;
 assert.equal((markup.match(/class="practice-card"/g)||[]).length,10);
 assert.equal((markup.match(/Comprobar respuesta/g)||[]).length,10);
 assert.doesNotMatch(markup,/data-wave-lesson-audio/);
 assert.doesNotThrow(()=>h.run("openFigure('worked:999')"),'A worked item without a figure never opens a broken dialog');
 for(const [kind,id] of labKinds.map((kind,i)=>[kind,lessonIds[i]]).filter(([kind])=>kind)){
  h.run("window.location.hash='#wave-lab-"+kind+"';applyAnchor()");assert.equal(h.run('LESSONS[P.currentItem].id'),id);assert.equal(h.run('P.activeTab'),'theory');
 }
 h.run("window.location.hash='#sonido';applyAnchor()");assert.equal(h.run('LESSONS[P.currentItem].id'),'sonido');
 h.run("window.location.hash='#elementos-onda';applyAnchor()");assert.equal(h.run('P.currentItem'),1);assert.equal(h.run('LESSONS[P.currentItem].id'),'transversal-longitudinal');assert.match(h.elements.get('chapter-app').innerHTML,/id="elementos-onda"/,'The elements alias opens the lesson and targets its content');
 h.run("window.location.hash='#transversal-longitudinal';applyAnchor()");assert.equal(h.run('P.currentItem'),1);assert.equal(h.run('LESSONS[P.currentItem].title'),'Elementos de una onda','The old topic link remains valid after its content changes');
 h.run("window.location.hash='#ecuacion-de-onda';applyAnchor()");assert.equal(h.run('P.currentItem'),2);assert.equal(h.run('LESSONS[P.currentItem].id'),'magnitudes-onda');assert.match(h.elements.get('chapter-app').innerHTML,/id="ecuacion-de-onda"/,'The wave-equation alias opens item three');
 h.run("window.location.hash='#magnitudes-onda';applyAnchor()");assert.equal(h.run('P.currentItem'),2);assert.equal(h.run('LESSONS[P.currentItem].title'),'Ecuación de onda','The previous item-three link remains compatible');
 h.run("window.location.hash='#ecuacion-onda';applyAnchor()");assert.equal(h.run('P.currentItem'),3,'The existing item-four link retains its destination');
 h.run("window.location.hash='#naturaleza-onda';applyAnchor()");assert.equal(h.run('P.currentItem'),0);
 const before=h.run('P.currentItem');h.run("window.location.hash='#unrelated';applyAnchor()");assert.equal(h.run('P.currentItem'),before);
}

async function activityLifecycle(){
 const h=harness(files);h.run("window.lifecycle=[];window.MechanicalWaveLabs={destroy(){window.lifecycle.push('labs:destroy')},mount(){window.lifecycle.push('labs:mount')}};window.WaveExampleAnimations={destroy(){window.lifecycle.push('animations:destroy')},mount(){window.lifecycle.push('animations:mount')}};window.WaveAmplitudeFrequency={destroy(){window.lifecycle.push('amplitude:destroy')},mount(){window.lifecycle.push('amplitude:mount')}};window.WaveLessonAudio={destroy(){window.lifecycle.push('audio:destroy')},mount(root,options){window.lifecycle.push('audio:'+String(options.lesson?.id||'none'))}};window.StudyMode.choose('wave-lifecycle','free')");
 const teardown=['audio:destroy','labs:destroy','animations:destroy','amplitude:destroy'];
 const setup=['labs:mount','animations:mount','amplitude:mount'];
 await h.signIn({uid:'wave-lifecycle'});
 h.run("window.lifecycle=[];goLesson(5)");
 assert.deepEqual(plain(h,'window.lifecycle'),[...teardown,...setup,'audio:reflexion-pulsos'],'Previous media stops before the new lesson starts');
 h.run("window.lifecycle=[];goLesson(0)");assert.deepEqual(plain(h,'window.lifecycle'),[...teardown,...setup,'audio:naturaleza-onda'],'Returning to the introduction cleans up the previous interactive widget');
 h.run("window.lifecycle=[];goLesson(1)");assert.deepEqual(plain(h,'window.lifecycle'),[...teardown,...setup,'audio:transversal-longitudinal'],'The elements lesson mounts its interactive widget through the shared lifecycle');
 assert.doesNotMatch(h.elements.get('chapter-app').innerHTML,/data-wave-lesson-audio/,'The removed listening panel does not return when reopening elements');
 h.run("window.lifecycle=[];goLesson(2)");assert.deepEqual(plain(h,'window.lifecycle'),[...teardown,...setup,'audio:magnitudes-onda'],'Opening the equation lesson clears the preceding interactive widget');
 assert.doesNotMatch(h.elements.get('chapter-app').innerHTML,/data-wave-lesson-audio|data-wave-amplitude-frequency|data-wave-lab=/,'The equation lesson mounts no listening panel or interactive activity');
 h.run("window.lifecycle=[];goTab('practice')");assert.deepEqual(plain(h,'window.lifecycle'),[...teardown,...setup,'audio:none']);
 h.run('window.lifecycle=[]');h.events.get('pagehide')();assert.deepEqual(plain(h,'window.lifecycle'),teardown);
 h.run('window.lifecycle=[]');h.events.get('pageshow')({persisted:true});assert.deepEqual(plain(h,'window.lifecycle'),[...teardown,...setup,'audio:none'],'Restored pages reinitialize activities after pagehide');
 h.run('window.lifecycle=[]');await h.signIn(null);assert.deepEqual(plain(h,'window.lifecycle'),teardown);
 assert.match(h.elements.get('chapter-app').innerHTML,/index\.html\?chapter=fisica-capitulo-13/);
}

async function practicePersistenceAndAccounts(){
 const cloud=new Map(),local=new Map(),h=harness(files,{cloud,local});
 h.run("window.StudyMode.choose('wave-student','progressive')");await h.signIn({uid:'wave-student'});await h.run("window.StudyMode.save('wave-student',db)");
 assert.equal(h.run('cloudPayload().chapterNumber'),13);assert.equal(h.run('cloudPayload().topicIndex'),12);assert.equal(h.run('cloudPayload().courseId'),16);
 const questions=plain(h,'window.ChapterPractice.questions(CHAPTER_ID)');assert.equal(questions.length,10);
 assert.equal(h.run("window.ChapterPractice.canOpen(CHAPTER_ID,P.practice10,9,P.studyMode)"),false);assert.equal(h.run('canOpen(10)'),true,'Theory remains available in progressive mode');
 h.run("goTab('practice')");const first=questions[0];
 h.run("window.ChapterPractice.choose(CHAPTER_ID,P.practice10,'"+first.id+"',"+((first.answer+1)%first.options.length)+",P.studyMode);checkPractice('"+first.id+"')");assert.equal(h.run('progressPercent()'),0);
 for(const question of questions)h.run("window.ChapterPractice.choose(CHAPTER_ID,P.practice10,'"+question.id+"',"+question.answer+",P.studyMode);checkPractice('"+question.id+"')");
 await h.run('persist()');const key='users/wave-student/progress/'+chapterId,saved=cloud.get(key);
 assert.equal(saved.practiceCompleted,10);assert.equal(saved.practiceTotal,10);assert.equal(saved.percent,100);assert.equal(saved.chapterCompleted,true);assert.equal(saved.contentVersion,1);
 const reload=harness(files,{cloud});await reload.signIn({uid:'wave-student'});assert.equal(reload.run('P.practice10.mastered.length'),10);assert.equal(reload.run('chapterComplete()'),true);
 h.run("goLesson(6)");h.setOffline(true);h.run('goLesson(9)');await h.run('persist()');assert.equal(h.run('cloudReady'),false);assert.equal(JSON.parse(local.get('sin-limites:wave-student:'+chapterId)).pending,true);
 cloud.set(key,{...saved,currentItem:0,updatedMs:1});h.setOffline(false);await h.run('retrySync()');
 assert.equal(h.run('P.currentItem'),9);assert.equal(h.run('P.practice10.mastered.length'),10);assert.equal(JSON.parse(local.get('sin-limites:wave-student:'+chapterId)).pending,false);
 h.run("window.StudyMode.choose('wave-other','free')");await h.signIn({uid:'wave-other'});assert.equal(h.run('P.practice10.mastered.length'),0);assert.equal(h.run('P.currentItem'),0);assert.equal(h.run('P.studyMode'),'free');
 assert.equal(cloud.get(key).practiceCompleted,10,'A different account cannot erase the first student’s mastery');
 assert.equal(h.run('window.ChapterPractice.canOpen(CHAPTER_ID,P.practice10,9,P.studyMode)'),true);
 const guest=harness(files);await guest.signIn({uid:'wave-new'});assert.match(guest.redirects.at(-1),/^index\.html\?chapter=fisica-capitulo-13(?:&v=[\w-]+)?$/);
}

function progressSanitization(){
 const h=harness(files);assert.doesNotThrow(()=>h.run('normalized(null)'));
 assert.equal(h.run('normalized({currentItem:999}).currentItem'),10);assert.equal(h.run('normalized({currentItem:-8}).currentItem'),0);assert.equal(h.run('normalized({currentItem:2.5}).currentItem'),0);
 assert.equal(h.run("normalized({currentItem:4,readingItem:999,activeTab:'foreign',updatedMs:Infinity}).readingItem"),10);
 assert.equal(h.run("normalized({activeTab:'foreign'}).activeTab"),'theory');assert.equal(h.run("normalized({activeTab:'exam'}).activeTab"),'practice');assert.equal(h.run('normalized({updatedMs:Infinity}).updatedMs'),0);
 assert.equal(h.run('normalized({currentItem:4}).readingItem'),4);
 assert.equal(h.run('normalized({inductionLab:{turns:100}}).inductionLab'),undefined,'Chapter state contains no unrelated laboratory record');
}

(async()=>{sourceAndDependencies();progressSanitization();await chapterFormatAndViews();await activityLifecycle();await practicePersistenceAndAccounts();console.log('PASS: waves chapter format, two introduction animations, PDF-aligned elements without listening panel, fullscreen diagram and two-control amplitude/frequency activity, a theory-only wave-equation lesson, eight lesson labs, media lifecycle, grading, account isolation, offline merge and direct links.');})().catch(error=>{console.error(error);process.exitCode=1;});
