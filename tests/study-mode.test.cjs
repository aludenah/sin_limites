const assert=require('node:assert/strict');
const {harness}=require('./history-reading.test.cjs');
async function test(){
 const h=harness(),run=h.run;
 await run('signedIn({uid:"student"})');
 run("P.studyMode='free';visit(31);P.answers.q7=QUESTIONS[6].answer;checkAnswer()");
 assert.equal(run('P.completedItems.includes(6)'),true);
 run("P.studyMode='progressive';P=normalized(P)");
 assert.equal(run('P.currentSlide'),25,'Switching modes returns to the first pending activity');
 assert.equal(run('allowedSlide(26)'),false,'A later success cannot bypass earlier activities');
 assert.equal(run('allowedSlide(0)'),true,'Theory stays available for review');
 run('P.answers.q1=QUESTIONS[0].answer;checkAnswer()');
 assert.equal(run('allowedSlide(26)'),true);
 assert.equal(run('allowedSlide(27)'),false);
 run("P.studyMode='free';visit(32)");assert.equal(run('P.currentSlide'),32);
 assert.equal(run('P.completedItems.length'),2);
 await run('persist();signedIn({uid:"student"})');
 assert.equal(run('P.studyMode'),'free');assert.equal(run('P.currentSlide'),32);
 console.log('PASS: switching free/progressive modes, gap-safe unlocks, retained achievements and resume.');
}
test().catch(e=>{console.error(e);process.exitCode=1;});

