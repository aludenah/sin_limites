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
   const beforeFirst=home.redirects.length;
   // A previous chapter or tab cannot become the initial course selection.
   home.run(`state.activeTopicIndex=${course.topics.length-1};state.activeTab='Práctica';state.activeModuleId='fisica-capitulo-17';openCourse(${course.id})`);
   assert.equal(home.run('state.activeCourseId'),course.id);
   assert.equal(home.run('state.activeTopicIndex'),0,course.name+' starts at chapter1');
   assert.equal(home.run('state.activeTab'),'Teoría');
   assert.equal(home.run('state.activeModuleId'),null,'A previous physics module is cleared');
   assert.equal(home.run('state.studyMode'),mode,'Entering a course preserves the chosen mode');
   const slug=firstChapters.get(course.id),redirect=home.redirects.at(-1);
   assert.equal(home.redirects.length,beforeFirst+(slug?1:0),'Only an existing first chapter redirects');
   if(slug){
    const expected=slug+'.html?v='+(course.id===16?'20260919-fisica19':'20260918-social1');
    assert.equal(redirect,expected,course.name+' opens the existing chapter1 content automatically');
    assert.equal(fs.existsSync(path.join(root,slug+'.html')),true,'The first chapter destination exists');
   }else{
    assert.match(home.elements.get('app').innerHTML,/Estructura académica creada/);
    assert.ok(home.elements.get('app').innerHTML.includes(home.run(`esc(COURSES.find(c=>c.id===${course.id}).topics[0])`)),course.name+' shows its actual first topic');
   }
   const afterFirst=home.redirects.length;
   home.run(`goHome();state.activeTopicIndex=${course.topics.length-1};openCourse(${course.id})`);
   assert.equal(home.run('state.activeTopicIndex'),0,'Reopening '+course.name+' also starts at chapter1');
   assert.equal(home.redirects.length,afterFirst+(slug?1:0));
  }
  // Searching and pressing Enter uses the same course entry behavior.
  home.run("goHome();setSearch('física');openSearchResult()");
  assert.equal(home.run('state.activeCourseId'),16);assert.equal(home.run('state.activeTopicIndex'),0);
  assert.equal(home.redirects.at(-1),'fisica-capitulo-01.html?v=20260919-fisica19');
 }

 // Opening an explicit syllabus link returns to the selected chapter without a redirect loop.
 const cloud=new Map([['users/returning/progress/navigation',{
  catalogVersion:10,studyMode:'progressive',studyModeUpdatedMs:1,
  lastCourseId:16,lastTopicIndex:16,lastChapterNumber:17,lastChapterName:'Electromagnetismo',lastModuleId:'fisica-capitulo-17'
 }]]);
 const syllabus=harness({cloud,search:'?course=16'});await syllabus.signIn({uid:'returning'});
 assert.equal(syllabus.run('state.view'),'course');assert.equal(syllabus.run('state.activeTopicIndex'),16);
 assert.equal(syllabus.redirects.length,0,'Volver al temario remains a syllabus visit');

 // The progress panel continues the explicitly chosen chapter and retains achievements.
 const record=syllabus.json("({practice10:{version:1,mastered:window.ChapterPractice.questions('fisica-capitulo-13').slice(0,3).map(q=>q.id)}})");
 cloud.set('users/returning/progress/fisica-capitulo-13',record);
 const progress=harness({cloud});await progress.signIn({uid:'returning'});
 const before=progress.run('physicsChapterProgress(13).practiceCompleted');assert.equal(before,3);
 progress.run("showAcademicProgress();continueAcademicChapter('fisica-capitulo-13')");
 assert.equal(progress.redirects.at(-1),'fisica-capitulo-13.html?v=20261023-waves1');
 assert.equal(progress.run('physicsChapterProgress(13).practiceCompleted'),before);
 assert.equal(progress.run('state.studyMode'),'progressive');
 console.log('PASS: all18courses start at chapter1 in both modes, eight existing chapter1 destinations, ten accurate placeholders, search, reopening, syllabus return and preserved progress continuation.');
}
if(require.main===module)test().catch(error=>{console.error(error);process.exitCode=1;});
