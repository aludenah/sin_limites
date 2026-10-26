const assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path');
const {harness}=require('./study-entry.test.cjs');
const root=path.join(__dirname,'..'),chapterId='fisica-capitulo-13';
const read=file=>fs.readFileSync(path.join(root,file),'utf8');
const files=['fisica-capitulo-13-practice.js','fisica-capitulo-13-data.js','chapter-learning-goals.js','fisica-capitulo-13.js'];
const plain=(h,expression)=>JSON.parse(h.run('JSON.stringify('+expression+')'));
const lessonIds=['naturaleza-onda','transversal-longitudinal','magnitudes-onda','ecuacion-onda','rapidez-cuerda','reflexion-pulsos'];

function sourceAndDependencies(){
 const html=read(chapterId+'.html'),css=read(chapterId+'.css'),source=read(chapterId+'.js');
 for(const file of ['fisica-capitulo-01.css','chapter-practice.css','mechanical-wave-labs.css','wave-examples-animations.css','wave-amplitude-frequency.css','wave-equation-comparison.css','string-wave-speed.css','standing-wave-harmonics.css','standing-wave-superposition.css','sound-propagation-animation.css','activity-fullscreen.css','fisica-capitulo-13-practice.js','chapter-practice.js','fisica-capitulo-13-data.js','study-mode.js','mechanical-wave-engine.js','mechanical-wave-labs.js','wave-examples-animations.js','wave-amplitude-frequency.js','wave-equation-comparison.js','string-wave-speed.js','standing-wave-harmonics.js','standing-wave-superposition.js','sound-propagation-animation.js','heart-narration.js','wave-lesson-audio.js','fisica-capitulo-13.js','activity-fullscreen.js'])assert.ok(html.includes(file),'Chapter declares '+file);
 for(const [first,second] of [['fisica-capitulo-13-practice.js','chapter-practice.js'],['mechanical-wave-engine.js','mechanical-wave-labs.js'],['mechanical-wave-labs.js','fisica-capitulo-13.js'],['wave-examples-animations.js','fisica-capitulo-13.js'],['wave-amplitude-frequency.js','fisica-capitulo-13.js'],['wave-equation-comparison.js','fisica-capitulo-13.js'],['string-wave-speed.js','fisica-capitulo-13.js'],['standing-wave-harmonics.js','fisica-capitulo-13.js'],['standing-wave-superposition.js','fisica-capitulo-13.js'],['sound-propagation-animation.js','fisica-capitulo-13.js'],['heart-narration.js','wave-lesson-audio.js'],['wave-lesson-audio.js','fisica-capitulo-13.js']])assert.ok(html.indexOf(first)<html.indexOf(second),first+' loads before '+second);
 for(const match of html.matchAll(/(?:src|href)="([^"#?]+)(?:\?[^"#]*)?(?:#[^"]*)?"/g))if(!/^https?:/.test(match[1]))assert.ok(fs.existsSync(path.join(root,match[1])),'Local reference exists: '+match[1]);
 assert.match(css,/\.wrap\{max-width:1440px\}/);assert.match(css,/grid-template-columns:220px minmax\(0,1fr\)/);assert.match(css,/\.content table\{[^}]*table-layout:fixed/);
 assert.match(css,/\.tabs\{overflow:visible;flex-wrap:wrap\}/,'Mobile tabs fit without horizontal dragging');
 assert.match(css,/\[data-wave-lab\].*\{min-width:0;max-width:100%\}/);
 assert.match(source,/data-wave-lesson-audio/);assert.match(source,/window\.WaveAmplitudeFrequency\?\.mount\(root\)/);assert.match(source,/window\.WaveAmplitudeFrequency\?\.destroy\(\)/);assert.match(source,/window\.WaveEquationComparison\?\.mount\(root\)/);assert.match(source,/window\.WaveEquationComparison\?\.destroy\(\)/);assert.match(source,/window\.StringWaveSpeed\?\.mount\(root\)/);assert.match(source,/window\.StringWaveSpeed\?\.destroy\(\)/);assert.match(source,/window\.StandingWaveHarmonics\?\.mount\(root\)/);assert.match(source,/window\.StandingWaveHarmonics\?\.destroy\(\)/);assert.match(source,/window\.StandingWaveSuperposition\?\.mount\(root\)/);assert.match(source,/window\.StandingWaveSuperposition\?\.destroy\(\)/);assert.match(source,/window\.SoundPropagationAnimation\?\.mount\(root\)/);assert.match(source,/window\.SoundPropagationAnimation\?\.destroy\(\)/);assert.match(source,/window\.MechanicalWaveLabs\?\.mount\(root\)/);assert.match(source,/window\.WaveLessonAudio\?\.mount\(root,\{lesson:P\.activeTab==='theory'\?LESSONS\[P\.currentItem\]:null\}\)/);
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
   assert.doesNotMatch(lesson.body,/data-wave-lab=|data-wave-animation=|data-wave-amplitude-frequency|data-wave-lesson-audio|<audio|<video|<input|<button/i,'The equation lesson retains theory and adds no audio or unrelated activities');
   assert.equal((lesson.body.match(/data-wave-equation-comparison/g)||[]).length,1,'The equation lesson has one reference-versus-edited comparison');
   assert.equal(lesson.audioSegments.length,0,'The wave-equation lesson has no listening panel');
   assert.match(lesson.body,/assets\/wave-equation-reading\.svg/,'The equation lesson includes its static reading diagram');
   assert.match(lesson.body,/data-activity-fullscreen/,'The static equation diagram can be expanded');
   assert.ok(fs.existsSync(path.join(root,'assets/wave-equation-reading.svg')),'The equation diagram asset exists');
   assert.equal(lesson.examples.length,0);
   return;
  }
  if(i===3){
   assert.equal(lesson.title,'Onda en una cuerda');
   assert.match(lesson.body,/id="onda-en-cuerda"/,'The string-wave lesson exposes its public anchor');
   for(const concept of [/cuerda/i,/propagaci[oó]n/i,/transversal/i,/tensi[oó]n/i,/densidad lineal/i,/amplitud/i])assert.match(lesson.body,concept);
   assert.match(lesson.body,/\\mu/,'Linear density is distinguished from the mass of the whole string');
   assert.match(lesson.body,/\\frac\{m\}\{l\}/,'Linear density is mass per length');
   assert.match(lesson.body,/\\sqrt/,'The string-wave speed follows the square-root relationship');
   assert.doesNotMatch(lesson.body,/data-wave-lab=|data-wave-animation=|data-wave-amplitude-frequency|data-wave-lesson-audio|<audio|<video|<input|<button/i,'The string-wave lesson retains its theory without unrelated activities or audio');
   assert.equal((lesson.body.match(/data-string-wave-speed/g)||[]).length,1,'The string lesson has one tension/density activity');
   assert.ok(lesson.body.indexOf('data-string-wave-speed')>lesson.body.lastIndexOf('class="equation"'),'The string activity follows the theoretical equations');
   assert.equal(lesson.audioSegments.length,0,'The string-wave lesson has no listening panel');
   assert.match(lesson.body,/assets\/string-wave-propagation\.svg/,'The lesson illustrates the travelling pulse on a string');
   assert.match(lesson.body,/data-activity-fullscreen/,'The propagation diagram can be expanded');
   assert.ok(fs.existsSync(path.join(root,'assets/string-wave-propagation.svg')),'The string propagation diagram asset exists');
   assert.equal(lesson.examples.length,0);
   return;
  }
  if(i===4){
   assert.equal(lesson.title,'Ondas estacionarias');
   assert.match(lesson.body,/id="teoria-ondas-estacionarias"/,'The standing-wave theory has its own unambiguous public anchor');
   for(const concept of [/superposici[oó]n/i,/nodos/i,/vientres|antinodos/i,/arm[oó]nicos/i,/fundamental/i,/resonancia/i,/tensi[oó]n/i,/densidad lineal/i])assert.match(lesson.body,concept);
   assert.match(lesson.body,/\\(?:sin|operatorname\{sen\})/,'The standing-wave equation describes its spatial dependence');
   assert.match(lesson.body,/\\cos/,'The standing-wave equation describes its temporal oscillation');
   for(const symbol of ['\\lambda','\\omega','\\mu','\\sqrt'])assert.ok(lesson.body.includes(symbol),'The theoretical relationships include '+symbol);
   assert.doesNotMatch(lesson.body,/<(?:svg|canvas|audio|video|input|button)\b|data-wave-|data-string-wave-speed|F_T|F_\{T\}/i,'Item five retains its theory, static illustration and harmonic selector, uses F for tension and has no audio or unrelated activity');
   assert.equal(lesson.audioSegments.length,0,'The standing-wave theory has no audio');
   assert.equal(lesson.examples.length,0,'Item five retains its theoretical framework');
   assert.equal((lesson.body.match(/data-standing-wave-harmonics/g)||[]).length,1,'The standing-wave lesson contains one harmonic animation');
   assert.equal((lesson.body.match(/data-standing-wave-superposition/g)||[]).length,1,'The standing-wave lesson contains one formation animation');
   assert.match(lesson.body,/id="superposicion-onda-estacionaria"/,'The formation animation has its own deep link');
   assert.ok(lesson.body.indexOf('data-standing-wave-superposition')>lesson.body.indexOf('Superposición y ecuación'),'The formation animation follows the superposition explanation');
   assert.ok(lesson.body.indexOf('data-standing-wave-superposition')<lesson.body.indexOf('Nodos, vientres'),'The formation animation precedes node definitions');
   assert.match(lesson.body,/id="animacion-armonicos"/,'The harmonic animation has its own deep link');
   assert.ok(lesson.body.indexOf('data-standing-wave-harmonics')>lesson.body.indexOf('Frecuencia fundamental y primeros armónicos'),'The selector follows the harmonic explanation');
   assert.ok(lesson.body.indexOf('data-standing-wave-harmonics')<lesson.body.indexOf('Relación con la tensión'),'The selector appears before the next theoretical section');
   return;
  }
  if(i===5){
   assert.equal(lesson.title,'Sonido');
   assert.match(lesson.body,/id="teoria-del-sonido"/,'The sound theory has an unambiguous public anchor');
   for(const concept of [/frecuencia/i,/compresi[oó]n/i,/rarefacci[oó]n/i,/intensidad/i,/rapidez|velocidad/i,/tono/i,/timbre/i,/decibel(?:ios|es)/i])assert.match(lesson.body,concept);
   assert.ok(lesson.body.includes('class="equation"'),'Sound theory includes its mathematical relationships');
   assert.doesNotMatch(lesson.body,/<(?:svg|canvas|audio|video|input|button)\b|data-(?:wave|standing-wave|string-wave)-/i,'Sound retains its theory without audio or unrelated activities');
   assert.equal((lesson.body.match(/<img\b/g)||[]).length,4,'Four static illustrations accompany sound theory');
   for(const name of ['sound-compression-rarefaction','sound-qualities','sound-spherical-intensity','sound-echo-distance']){assert.ok(lesson.body.includes('assets/'+name+'.svg'),'The sound lesson includes '+name);assert.ok(fs.existsSync(path.join(root,'assets/'+name+'.svg')),'The static asset exists: '+name);}
   assert.equal((lesson.body.match(/data-sound-propagation-animation/g)||[]).length,1,'Sound has one propagation animation');
   assert.match(lesson.body,/data-activity-fullscreen/,'Sound illustrations can be enlarged');
   assert.ok(lesson.body.indexOf('data-sound-propagation-animation')>lesson.body.indexOf('Compresiones y rarefacciones'),'The animation follows compression and rarefaction definitions');
   assert.ok(lesson.body.indexOf('data-sound-propagation-animation')<lesson.body.indexOf('Magnitudes que describen el sonido'),'The propagation animation precedes the wave quantities');
   assert.equal(lesson.audioSegments.length,0,'The sound theory has no audio');
   assert.equal(lesson.examples.length,0,'Item six retains its theoretical framework');
   return;
  }
 });
 let markup=h.elements.get('chapter-app').innerHTML;
 assert.match(markup,/Física · Capítulo 13 de 19/);assert.match(markup,/Teoría/);assert.match(markup,/Resueltos · 10/);assert.match(markup,/Práctica · 10 problemas/);
 assert.equal((markup.match(/<nav class="route"[^>]*>([\s\S]*?)<\/nav>/)[1].match(/data-action="lesson" data-index=/g)||[]).length,6,'Only the six developed lessons remain in the route');
 for(let i=0;i<lessonIds.length;i++){
  h.run('goLesson('+i+')');markup=h.elements.get('chapter-app').innerHTML;
  if(i===0){assert.doesNotMatch(markup,/data-wave-lab=|data-wave-lesson-audio/);assert.equal((markup.match(/data-wave-animation=/g)||[]).length,2);}
  else if(i===1){assert.match(markup,/Elementos de una onda/);assert.match(markup,/waves-elements-diagram\.svg/);assert.match(markup,/data-wave-amplitude-frequency/);assert.doesNotMatch(markup,/data-wave-lab="types"|data-wave-lesson-audio|Reconoce los elementos en el perfil/);}
  else if(i===2){assert.equal((markup.match(/data-wave-equation-comparison/g)||[]).length,1);assert.match(markup,/Ecuación de onda/);assert.match(markup,/id="ecuacion-de-onda"/);assert.doesNotMatch(markup,/data-wave-lab=|data-wave-animation=|data-wave-amplitude-frequency|data-wave-lesson-audio|Escucha y observa/);}
  else if(i===3){assert.equal((markup.match(/data-string-wave-speed/g)||[]).length,1);assert.match(markup,/Onda en una cuerda/);assert.match(markup,/id="onda-en-cuerda"/);assert.match(markup,/string-wave-propagation\.svg/);assert.doesNotMatch(markup,/data-wave-lab=|data-wave-animation=|data-wave-amplitude-frequency|data-wave-lesson-audio|Escucha y observa/);}
  else if(i===4){assert.match(markup,/<h2 id="rapidez-cuerda">Ondas estacionarias<\/h2>/);assert.equal((markup.match(/data-standing-wave-harmonics/g)||[]).length,1);assert.equal((markup.match(/data-standing-wave-superposition/g)||[]).length,1);assert.match(markup,/id="teoria-ondas-estacionarias"/);assert.doesNotMatch(markup,/data-wave-lab=|data-wave-animation=|data-wave-amplitude-frequency|data-wave-equation-comparison|data-string-wave-speed|data-wave-lesson-audio|Escucha y observa/,'Opening item five renders no audio or unrelated widgets');}
  else if(i===5){assert.match(markup,/<h2 id="reflexion-pulsos">Sonido<\/h2>/);assert.match(markup,/id="teoria-del-sonido"/);assert.doesNotMatch(markup,/data-wave-|data-standing-wave-|data-string-wave-|Escucha y observa/,'Opening item six adds no audio or unrelated activities');assert.match(markup,/data-sound-propagation-animation/);assert.equal((markup.match(/<img\b/g)||[]).length,5,'The four sound images render alongside the shared brand image');}
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
 h.run("window.location.hash='#sonido';applyAnchor()");assert.equal(h.run('LESSONS[P.currentItem].id'),'reflexion-pulsos');assert.equal(h.run('P.currentItem'),5,'The old sound link opens the retained sound lesson');
 h.run("window.location.hash='#superposicion';applyAnchor()");assert.equal(h.run('P.currentItem'),4,'The old superposition link opens the retained standing-wave explanation');
 h.run("window.location.hash='#elementos-onda';applyAnchor()");assert.equal(h.run('P.currentItem'),1);assert.equal(h.run('LESSONS[P.currentItem].id'),'transversal-longitudinal');assert.match(h.elements.get('chapter-app').innerHTML,/id="elementos-onda"/,'The elements alias opens the lesson and targets its content');
 h.run("window.location.hash='#transversal-longitudinal';applyAnchor()");assert.equal(h.run('P.currentItem'),1);assert.equal(h.run('LESSONS[P.currentItem].title'),'Elementos de una onda','The old topic link remains valid after its content changes');
 h.run("window.location.hash='#ecuacion-de-onda';applyAnchor()");assert.equal(h.run('P.currentItem'),2);assert.equal(h.run('LESSONS[P.currentItem].id'),'magnitudes-onda');assert.match(h.elements.get('chapter-app').innerHTML,/id="ecuacion-de-onda"/,'The wave-equation alias opens item three');
 h.run("window.location.hash='#comparador-ecuacion-onda';applyAnchor()");assert.equal(h.run('P.currentItem'),2);assert.match(h.elements.get('chapter-app').innerHTML,/id="comparador-ecuacion-onda"/,'The comparison alias opens the equation lesson and its widget');
 h.run("window.location.hash='#magnitudes-onda';applyAnchor()");assert.equal(h.run('P.currentItem'),2);assert.equal(h.run('LESSONS[P.currentItem].title'),'Ecuación de onda','The previous item-three link remains compatible');
 h.run("window.location.hash='#onda-en-cuerda';applyAnchor()");assert.equal(h.run('P.currentItem'),3);assert.equal(h.run('LESSONS[P.currentItem].id'),'ecuacion-onda');assert.match(h.elements.get('chapter-app').innerHTML,/id="onda-en-cuerda"/,'The string-wave alias opens item four');
 h.run("window.location.hash='#simulador-cuerda';applyAnchor()");assert.equal(h.run('P.currentItem'),3);assert.match(h.elements.get('chapter-app').innerHTML,/id="simulador-cuerda"/,'The simulation alias opens item four and its interactive rope');
 h.run("window.location.hash='#ecuacion-onda';applyAnchor()");assert.equal(h.run('P.currentItem'),3,'The existing item-four link retains its destination');assert.equal(h.run('LESSONS[P.currentItem].title'),'Onda en una cuerda');
 h.run("window.location.hash='#teoria-ondas-estacionarias';applyAnchor()");assert.equal(h.run('P.currentItem'),4);assert.match(h.elements.get('chapter-app').innerHTML,/id="teoria-ondas-estacionarias"/,'The new standing-wave theory link opens item five');
 h.run("window.location.hash='#superposicion-onda-estacionaria';applyAnchor()");assert.equal(h.run('P.currentItem'),4);assert.match(h.elements.get('chapter-app').innerHTML,/id="superposicion-onda-estacionaria"/,'The formation animation alias opens item five');
 h.run("window.location.hash='#animacion-armonicos';applyAnchor()");assert.equal(h.run('P.currentItem'),4);assert.match(h.elements.get('chapter-app').innerHTML,/id="animacion-armonicos"/,'The harmonic animation alias opens item five');
 h.run("window.location.hash='#rapidez-cuerda';applyAnchor()");assert.equal(h.run('P.currentItem'),4,'The previous item-five link remains compatible');assert.equal(h.run('LESSONS[P.currentItem].title'),'Ondas estacionarias');
 h.run("window.location.hash='#ondas-estacionarias';applyAnchor()");assert.equal(h.run('P.currentItem'),4,'The old standing-wave link opens the retained standing-wave lesson');
 h.run("window.location.hash='#teoria-del-sonido';applyAnchor()");assert.equal(h.run('P.currentItem'),5);assert.match(h.elements.get('chapter-app').innerHTML,/id="teoria-del-sonido"/,'The new sound theory link opens item six');
 h.run("window.location.hash='#animacion-propagacion-sonido';applyAnchor()");assert.equal(h.run('P.currentItem'),5);assert.match(h.elements.get('chapter-app').innerHTML,/id="animacion-propagacion-sonido"/,'The sound animation link opens item six');
 h.run("window.location.hash='#reflexion-pulsos';applyAnchor()");assert.equal(h.run('P.currentItem'),5,'The previous item-six link remains compatible');assert.equal(h.run('LESSONS[P.currentItem].title'),'Sonido');
 h.run("window.location.hash='#naturaleza-onda';applyAnchor()");assert.equal(h.run('P.currentItem'),0);
 const before=h.run('P.currentItem');for(const hash of ['#unrelated','#fenomenos-ondulatorios','#efecto-doppler']){h.run("window.location.hash='"+hash+"';applyAnchor()");assert.equal(h.run('P.currentItem'),before,'Unknown or removed links do not reopen deleted lessons');}
}

async function activityLifecycle(){
 const h=harness(files);h.run("window.lifecycle=[];window.MechanicalWaveLabs={destroy(){window.lifecycle.push('labs:destroy')},mount(){window.lifecycle.push('labs:mount')}};window.WaveExampleAnimations={destroy(){window.lifecycle.push('animations:destroy')},mount(){window.lifecycle.push('animations:mount')}};window.WaveAmplitudeFrequency={destroy(){window.lifecycle.push('amplitude:destroy')},mount(){window.lifecycle.push('amplitude:mount')}};window.WaveEquationComparison={destroy(){window.lifecycle.push('comparison:destroy')},mount(){window.lifecycle.push('comparison:mount')}};window.StringWaveSpeed={destroy(){window.lifecycle.push('string:destroy')},mount(){window.lifecycle.push('string:mount')}};window.StandingWaveHarmonics={destroy(){window.lifecycle.push('harmonics:destroy')},mount(){window.lifecycle.push('harmonics:mount')}};window.StandingWaveSuperposition={destroy(){window.lifecycle.push('standing-sum:destroy')},mount(){window.lifecycle.push('standing-sum:mount')}};window.SoundPropagationAnimation={destroy(){window.lifecycle.push('sound-propagation:destroy')},mount(){window.lifecycle.push('sound-propagation:mount')}};window.WaveLessonAudio={destroy(){window.lifecycle.push('audio:destroy')},mount(root,options){window.lifecycle.push('audio:'+String(options.lesson?.id||'none'))}};window.StudyMode.choose('wave-lifecycle','free')");
 const teardown=['audio:destroy','labs:destroy','animations:destroy','amplitude:destroy','comparison:destroy','string:destroy','harmonics:destroy','standing-sum:destroy','sound-propagation:destroy'];
 const setup=['labs:mount','animations:mount','amplitude:mount','comparison:mount','string:mount','harmonics:mount','standing-sum:mount','sound-propagation:mount'];
 await h.signIn({uid:'wave-lifecycle'});
 h.run("window.lifecycle=[];goLesson(5)");
 assert.deepEqual(plain(h,'window.lifecycle'),[...teardown,...setup,'audio:reflexion-pulsos'],'Previous media stops before the new lesson starts');
 assert.doesNotMatch(h.elements.get('chapter-app').innerHTML,/data-wave-|data-standing-wave-|data-string-wave-/,'Opening sound theory removes previous animation and audio hosts');assert.match(h.elements.get('chapter-app').innerHTML,/data-sound-propagation-animation/,'Sound mounts its own propagation animation');
 h.run("window.lifecycle=[];goLesson(0)");assert.deepEqual(plain(h,'window.lifecycle'),[...teardown,...setup,'audio:naturaleza-onda'],'Returning to the introduction cleans up the previous interactive widget');
 h.run("window.lifecycle=[];goLesson(1)");assert.deepEqual(plain(h,'window.lifecycle'),[...teardown,...setup,'audio:transversal-longitudinal'],'The elements lesson mounts its interactive widget through the shared lifecycle');
 assert.doesNotMatch(h.elements.get('chapter-app').innerHTML,/data-wave-lesson-audio/,'The removed listening panel does not return when reopening elements');
 h.run("window.lifecycle=[];goLesson(2)");assert.deepEqual(plain(h,'window.lifecycle'),[...teardown,...setup,'audio:magnitudes-onda'],'Opening the equation lesson clears the preceding interactive widget');
 assert.doesNotMatch(h.elements.get('chapter-app').innerHTML,/data-wave-lesson-audio|data-wave-amplitude-frequency|data-wave-lab=/,'The equation lesson mounts no listening panel or unrelated activity');
 assert.match(h.elements.get('chapter-app').innerHTML,/data-wave-equation-comparison/,'The new widget is mounted only with the equation theory');
 h.run("window.lifecycle=[];goLesson(3)");assert.deepEqual(plain(h,'window.lifecycle'),[...teardown,...setup,'audio:ecuacion-onda'],'Opening the string-wave lesson clears preceding activities');
 assert.doesNotMatch(h.elements.get('chapter-app').innerHTML,/data-wave-lesson-audio|data-wave-amplitude-frequency|data-wave-lab=/,'The string-wave lesson mounts no listening panel or unrelated activity');
 assert.doesNotMatch(h.elements.get('chapter-app').innerHTML,/data-wave-equation-comparison/,'Changing to the string lesson removes the comparison host');
 assert.match(h.elements.get('chapter-app').innerHTML,/data-string-wave-speed/,'The string activity is present only in item four');
 h.run("window.lifecycle=[];goLesson(4)");assert.deepEqual(plain(h,'window.lifecycle'),[...teardown,...setup,'audio:rapidez-cuerda']);assert.doesNotMatch(h.elements.get('chapter-app').innerHTML,/data-string-wave-speed/,'Leaving item four removes the string simulation host');
 assert.doesNotMatch(h.elements.get('chapter-app').innerHTML,/data-wave-lesson-audio|data-wave-lab=|data-wave-animation=|data-wave-amplitude-frequency|data-wave-equation-comparison/,'The standing-wave lesson stays free of audio and unrelated simulations');
 assert.match(h.elements.get('chapter-app').innerHTML,/data-standing-wave-harmonics/,'Opening item five mounts its harmonic selector');
 assert.match(h.elements.get('chapter-app').innerHTML,/data-standing-wave-superposition/,'Opening item five mounts its synchronized wave-sum animation');
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
 assert.equal(h.run("window.ChapterPractice.canOpen(CHAPTER_ID,P.practice10,9,P.studyMode)"),false);assert.equal(h.run('canOpen(5)'),true,'The retained theory remains available in progressive mode');assert.equal(h.run('canOpen(6)'),false,'Deleted lesson seven cannot be opened');
 h.run("goTab('practice')");const first=questions[0];
 h.run("window.ChapterPractice.choose(CHAPTER_ID,P.practice10,'"+first.id+"',"+((first.answer+1)%first.options.length)+",P.studyMode);checkPractice('"+first.id+"')");assert.equal(h.run('progressPercent()'),0);
 for(const question of questions)h.run("window.ChapterPractice.choose(CHAPTER_ID,P.practice10,'"+question.id+"',"+question.answer+",P.studyMode);checkPractice('"+question.id+"')");
 await h.run('persist()');const key='users/wave-student/progress/'+chapterId,saved=cloud.get(key);
 assert.equal(saved.practiceCompleted,10);assert.equal(saved.practiceTotal,10);assert.equal(saved.percent,100);assert.equal(saved.chapterCompleted,true);assert.equal(saved.contentVersion,1);
 const reload=harness(files,{cloud});await reload.signIn({uid:'wave-student'});assert.equal(reload.run('P.practice10.mastered.length'),10);assert.equal(reload.run('chapterComplete()'),true);
 h.run("goLesson(2)");h.setOffline(true);h.run('goLesson(5)');await h.run('persist()');assert.equal(h.run('cloudReady'),false);assert.equal(JSON.parse(local.get('sin-limites:wave-student:'+chapterId)).pending,true);
 cloud.set(key,{...saved,currentItem:0,updatedMs:1});h.setOffline(false);await h.run('retrySync()');
 assert.equal(h.run('P.currentItem'),5);assert.equal(h.run('P.practice10.mastered.length'),10);assert.equal(JSON.parse(local.get('sin-limites:wave-student:'+chapterId)).pending,false);
 h.run("window.StudyMode.choose('wave-other','free')");await h.signIn({uid:'wave-other'});assert.equal(h.run('P.practice10.mastered.length'),0);assert.equal(h.run('P.currentItem'),0);assert.equal(h.run('P.studyMode'),'free');
 assert.equal(cloud.get(key).practiceCompleted,10,'A different account cannot erase the first student’s mastery');
 assert.equal(h.run('window.ChapterPractice.canOpen(CHAPTER_ID,P.practice10,9,P.studyMode)'),true);
 const guest=harness(files);await guest.signIn({uid:'wave-new'});assert.match(guest.redirects.at(-1),/^index\.html\?chapter=fisica-capitulo-13(?:&v=[\w-]+)?$/);
}

function progressSanitization(){
 const h=harness(files);assert.doesNotThrow(()=>h.run('normalized(null)'));
 assert.equal(h.run('normalized({currentItem:999}).currentItem'),5);assert.equal(h.run('normalized({currentItem:-8}).currentItem'),0);assert.equal(h.run('normalized({currentItem:2.5}).currentItem'),0);
 assert.equal(h.run("normalized({currentItem:4,readingItem:999,activeTab:'foreign',updatedMs:Infinity}).readingItem"),5,'Reading positions from deleted lessons clamp to the last retained lesson');
 assert.equal(h.run("normalized({activeTab:'foreign'}).activeTab"),'theory');assert.equal(h.run("normalized({activeTab:'exam'}).activeTab"),'practice');assert.equal(h.run('normalized({updatedMs:Infinity}).updatedMs'),0);
 assert.equal(h.run('normalized({currentItem:4}).readingItem'),4);
 assert.equal(h.run('normalized({inductionLab:{turns:100}}).inductionLab'),undefined,'Chapter state contains no unrelated laboratory record');
}

(async()=>{sourceAndDependencies();progressSanitization();await chapterFormatAndViews();await activityLifecycle();await practicePersistenceAndAccounts();console.log('PASS: six-lesson waves route, retained theory and animations, legacy links to current lessons, media lifecycle, ten-question grading and mastery, account isolation, offline merge and clamped reading positions.');})().catch(error=>{console.error(error);process.exitCode=1;});
