'use strict';
const assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path');
const {harness}=require('./student-progress.test.cjs');
const root=path.join(__dirname,'..');
const firstChapters=new Map([
 [1,'razonamiento-verbal-capitulo-01'],
 [2,'razonamiento-matematico-capitulo-01'],
 [7,'lenguaje-capitulo-01'],
 [10,'educacion-civica-capitulo-01'],
 [11,'historia-del-peru-capitulo-01'],
 [12,'historia-universal-capitulo-01'],
 [14,'economia-capitulo-01'],
 [16,'fisica-capitulo-01']
]);

function assertSyllabus(home,course){
 assert.equal(home.run('state.view'),'course');
 assert.equal(home.run('state.activeCourseId'),course.id);
 assert.equal(home.run('state.activeTopicIndex'),null,course.name+' has no chapter selected');
 assert.equal(home.run('state.activeModuleId'),null,'A previous physics module is cleared');
 const html=home.elements.get('app').innerHTML;
 assert.equal([...html.matchAll(/onclick="setTopic\((\d+)\)"/g)].length,course.topics.length,course.name+' exposes the complete syllabus');
 for(let index=0;index<course.topics.length;index++){
  assert.ok(html.includes(`onclick="setTopic(${index})"`),'Every chapter can be chosen explicitly');
  const escaped=home.run(`esc(COURSES.find(c=>c.id===${course.id}).topics[${index}])`);
  assert.ok(html.includes(escaped),course.name+' includes chapter '+(index+1));
 }
 assert.doesNotMatch(html,/onclick="setTab\(|onclick="moveTopic\(|Estructura académica creada|Teoría del capítulo|Estudiar el capítulo|Entrar al laboratorio/,'The syllabus does not render chapter content or chapter navigation');
}

async function test(){
 for(const mode of ['free','progressive']){
  const home=harness();await home.signIn({uid:'entry-'+mode});
  const courses=home.json('COURSES');assert.equal(courses.length,18);
  for(const course of courses){
   home.run(`openCourse(${course.id})`);
   assert.equal(home.run('state.view'),'mode','Course entry first requires the study-mode choice');
   assert.equal(home.redirects.length,0);
  }
  home.run(`selectStudyMode('${mode}')`);
  for(const course of courses){
   const before=home.redirects.length;
   // Neither an old chapter, old module nor old tab may leak into the syllabus.
   home.run(`state.activeTopicIndex=${course.topics.length-1};state.activeTab='Práctica';state.activeModuleId='fisica-capitulo-17';openCourse(${course.id})`);
   assertSyllabus(home,course);
   assert.equal(home.run('state.studyMode'),mode,'Entering a course preserves the chosen mode');
   assert.equal(home.redirects.length,before,course.name+' never redirects on course entry');

   // A chapter only opens after its explicit selection.
   home.run('setTopic(0)');
   const slug=firstChapters.get(course.id);
   assert.equal(home.redirects.length,before+(slug?1:0));
   if(slug){
    assert.match(home.redirects.at(-1),new RegExp('^'+slug+'\\.html\\?'));
    assert.equal(fs.existsSync(path.join(root,slug+'.html')),true,'The selected chapter destination exists');
   }else{
    assert.equal(home.run('state.activeTopicIndex'),0);
    assert.match(home.elements.get('app').innerHTML,/Estructura académica creada/,'An unfinished chapter shows its placeholder only after selection');
   }
   const afterSelection=home.redirects.length;
   home.run(`goHome();openCourse(${course.id})`);
   assertSyllabus(home,course);
   assert.equal(home.redirects.length,afterSelection,'Reopening a course returns to its complete syllabus');
   home.run(`setTopic(null);setTopic(-1);setTopic(${course.topics.length});moveTopic(1)`);
   assert.equal(home.run('state.activeTopicIndex'),null,'Missing or invalid selection cannot implicitly open chapter1');
   assert.equal(home.redirects.length,afterSelection);
  }

  // Searching and pressing Enter uses the same course entry behavior.
  const beforeSearch=home.redirects.length;
  home.run("goHome();setSearch('física');openSearchResult()");
  assertSyllabus(home,courses.find(c=>c.id===16));
  assert.equal(home.redirects.length,beforeSearch);

  // Developed chapters beyond chapter1 remain directly selectable from the syllabus.
  for(const [id,index,slug] of [[16,12,'fisica-capitulo-13'],[4,16,'geometria-capitulo-17'],[17,17,'quimica-capitulo-18'],[18,10,'biologia-capitulo-11']]){
   const before=home.redirects.length;
   home.run(`openCourse(${id});setTopic(${index})`);
   assert.equal(home.redirects.length,before+1);
   assert.match(home.redirects.at(-1),new RegExp('^'+slug+'\\.html\\?'));
  }

  // Explicit return-to-syllabus URLs show all chapters, despite a previously saved selection.
  for(const course of courses){
   const uid='returning-'+mode+'-'+course.id;
   const cloud=new Map([['users/'+uid+'/progress/navigation',{
    catalogVersion:10,studyMode:mode,studyModeUpdatedMs:1,lastCourseId:course.id,
    lastTopicIndex:course.topics.length-1,lastChapterNumber:course.topics.length,
    lastChapterName:course.topics.at(-1),lastModuleId:'fisica-capitulo-17'
   }]]);
   const syllabus=harness({cloud,search:'?course='+course.id});await syllabus.signIn({uid});
   assertSyllabus(syllabus,course);
   assert.equal(syllabus.redirects.length,0,'Volver al temario never opens a chapter');
  }
 }

 // Opening a syllabus preserves the saved continue destination and academic achievements.
 const cloud=new Map([['users/returning/progress/navigation',{
  catalogVersion:10,studyMode:'progressive',studyModeUpdatedMs:1,
  lastCourseId:16,lastTopicIndex:16,lastChapterNumber:17,lastChapterName:'Electromagnetismo',lastModuleId:'fisica-capitulo-17'
 }]]);
 const syllabus=harness({cloud,search:'?course=16'});await syllabus.signIn({uid:'returning'});
 const record=syllabus.json("({practice10:{version:1,mastered:window.ChapterPractice.questions('fisica-capitulo-13').slice(0,3).map(q=>q.id)}})");
 cloud.set('users/returning/progress/fisica-capitulo-13',record);
 const progress=harness({cloud});await progress.signIn({uid:'returning'});
 const before=progress.run('physicsChapterProgress(13).practiceCompleted');assert.equal(before,3);
 const navigationBefore=JSON.stringify(cloud.get('users/returning/progress/navigation'));
 progress.run('openCourse(7);openCourse(16)');
 assert.equal(JSON.stringify(cloud.get('users/returning/progress/navigation')),navigationBefore,'Reading course syllabi does not write academic navigation');
 progress.run('openProgressChapter()');
 assert.match(progress.redirects.at(-1),/^fisica-capitulo-17\.html\?/,'A syllabus visit does not replace the last studied chapter');
 progress.run("showAcademicProgress();continueAcademicChapter('fisica-capitulo-13')");
 assert.match(progress.redirects.at(-1),/^fisica-capitulo-13\.html\?/);
 assert.equal(progress.run('physicsChapterProgress(13).practiceCompleted'),before);
 assert.equal(progress.run('state.studyMode'),'progressive');
 console.log('PASS: all18courses show complete syllabi without selected chapter or redirect in both modes, explicit chapter selection, search, reopening, syllabus return and preserved progress continuation.');
}
if(require.main===module)test().catch(error=>{console.error(error);process.exitCode=1;});
