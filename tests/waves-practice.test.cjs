'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const root=path.join(__dirname,'..'),context={window:{}};
for(const file of ['practice-bank.js','fisica-capitulo-13-practice.js','fisica-capitulo-17-practice.js','chapter-practice.js'])vm.runInNewContext(fs.readFileSync(path.join(root,file),'utf8'),context,{filename:file});
const api=context.window.ChapterPractice,id='fisica-capitulo-13',qs=api.questions(id),m=s=>'\\('+s+'\\)';
const near=(actual,expected)=>assert.ok(Math.abs(actual-expected)<1e-10*Math.max(1,Math.abs(expected)),`${actual} ≠ ${expected}`);
const chosen=n=>qs[n-1].options[qs[n-1].answer];
const independentKey=[2,3,0,4,1,3,0,2,4,1];
assert.equal(qs.length,10);assert.deepEqual(Array.from(qs,q=>q.answer),independentKey);
assert.equal(new Set(qs.map(q=>q.id)).size,10);
for(let n=0;n<10;n++){
 const q=qs[n];assert.equal(q.id,`fis13-p${String(n+1).padStart(2,'0')}`);
 assert.equal(q.options.length,5);assert.equal(new Set(q.options).size,5);
 assert.ok(q.prompt.length>80);assert.match(q.solution,/<ol><li>/);assert.ok(q.solution.includes('Alternativa '+String.fromCharCode(65+q.answer)));
 assert.ok(q.solution.split('<li>').length>=4);assert.doesNotMatch(q.prompt+q.solution,/derivad|integral|electromagnetismo\.pdf/i);
}
// Check the independent numerical candidates as well as the displayed selected option.
function uniqueNumeric(candidates,expected){
 assert.equal(new Set(candidates).size,5,'Every numerical distractor is distinct');
 assert.equal(candidates.filter(n=>Math.abs(n-expected)<1e-10*Math.max(1,Math.abs(expected))).length,1,'Exactly one numerical candidate satisfies the calculation');
}
// 1. A disturbance travels one wavelength in one period.
const waveSpeed=.80*5;near(waveSpeed,4);uniqueNumeric([.16,1,4,5.8,6.25],waveSpeed);assert.equal(chosen(1),m('4\\,\\mathrm{m/s}'));
// 2. Frequency is the reciprocal of the given complete-cycle time.
const frequency=1/.040;near(frequency,25);uniqueNumeric([.040,2.5,4,25,40],frequency);assert.equal(chosen(2),m('25\\,\\mathrm{Hz}'));
// 3. The time contains an integer number of cycles, so no rounding convention is needed.
const cycles=20*.75;assert.equal(cycles,15);uniqueNumeric([15,20,25,30,40],cycles);assert.equal(chosen(3),m('15'));
// 4. Use total mass per total length; 80 g must first become 0.080 kg.
const density=(80/1000)/4,ropeSpeed=Math.sqrt(50/density);near(density,.020);near(ropeSpeed,50);uniqueNumeric([10,20,25,40,50],ropeSpeed);assert.equal(chosen(4),m('50\\,\\mathrm{m/s}'));
// 5. Test phase translation independently instead of memorising the minus-sign rule.
const k=4*Math.PI,omega=20*Math.PI,lambda=2*Math.PI/k,period=2*Math.PI/omega,speed=lambda/period;
near(lambda,.50);near(period,.10);near(speed,5);
const phase=(x,t)=>k*x-omega*t;near(phase(.13,0),phase(.13+speed*.007,.007));
const candidates=[{lambda:.5,speed:5,direction:-1},{lambda:.5,speed:5,direction:1},{lambda:2,speed:5,direction:1},{lambda:.5,speed:10,direction:1},{lambda:.25,speed:2.5,direction:1}];
assert.equal(candidates.filter(c=>Math.abs(c.lambda-lambda)<1e-12&&Math.abs(c.speed-speed)<1e-12&&c.direction===1).length,1);
assert.equal(chosen(5),m('0{,}50\\,\\mathrm m')+'; '+m('5\\,\\mathrm{m/s}')+'; hacia '+m('+x'));
// 6. Fixed-end displacement cancellation requires the reflected sign to be negative.
const incident=1,fixedReflected=-1,freeReflected=1;assert.equal(incident+fixedReflected,0);assert.ok(incident*freeReflected>0);
assert.equal(chosen(6),'Se invierte en el extremo fijo y no se invierte en el libre.');
// 7. Add the two phase vectors (cosine and sine components).
const phaseDifference=Math.PI/2,resultant=Math.hypot(3+4*Math.cos(phaseDifference),4*Math.sin(phaseDifference));
near(resultant,5);uniqueNumeric([5,1,7,Math.sqrt(7),25],resultant);assert.equal(chosen(7),m('5\\,\\mathrm{cm}'));
// 8. Both fixed ends require three half-wavelengths in the third normal mode.
const length=1.50,harmonic=3,speedInRope=60,modeWavelength=2*length/harmonic,modeFrequency=speedInRope/modeWavelength;
near(modeWavelength,1);near(modeFrequency,60);near(harmonic*modeWavelength/2,length);uniqueNumeric([20,40,60,80,120],modeFrequency);assert.equal(chosen(8),m('60\\,\\mathrm{Hz}'));
// 9. The same power crosses each sphere; this tests the 4πr² spreading and the logarithm.
const power=.040*Math.PI,distance=10,intensity=power/(4*Math.PI*distance*distance),reference=1e-12,level=10*Math.log10(intensity/reference);
near(intensity,1e-4);near(level,80);uniqueNumeric([20,40,60,100,80],level);assert.equal(chosen(9),m('80\\,\\mathrm{dB}'));
// 10. Derive the compressed spacing between successive fronts for a stationary receiver.
const emitted=900,soundSpeed=340,sourceSpeed=34,emissionPeriod=1/emitted;
assert.ok(sourceSpeed<soundSpeed);
const frontSpacing=(soundSpeed-sourceSpeed)*emissionPeriod,received=soundSpeed/frontSpacing;
near(received,1000);assert.ok(received>emitted);uniqueNumeric([810,1000,900,990,1100],received);assert.equal(chosen(10),m('1000\\,\\mathrm{Hz}'));
// The new chapter has its own bank/IDs and cannot inherit another chapter's mastery.
assert.equal(api.has(id),true);assert.equal(api.has('fisica-capitulo-17'),true);
const foreign=api.questions('fisica-capitulo-17');assert.ok(foreign.every(q=>!qs.some(w=>w.id===q.id)));
assert.equal(api.normalize(id,{practice10:{version:1,mastered:foreign.map(q=>q.id),answers:Object.fromEntries(foreign.map(q=>[q.id,q.answer]))}}).mastered.length,0);
// Exercise the learner workflow: an error never unlocks the next question; a corrected answer does.
const p=api.normalize(id);assert.equal(api.canOpen(id,p,1,'progressive'),false);assert.equal(api.canOpen(id,p,9,'free'),true);
assert.equal(api.choose(id,p,qs[0].id,(qs[0].answer+1)%5,'progressive'),true);assert.equal(api.check(id,p,qs[0].id,'progressive'),'graded');assert.equal(api.canOpen(id,p,1,'progressive'),false);
for(let n=0;n<qs.length;n++){
 const q=qs[n];assert.equal(api.canOpen(id,p,n,'progressive'),true);assert.equal(api.choose(id,p,q.id,q.answer,'progressive'),true);assert.equal(api.check(id,p,q.id,'progressive'),'graded');
}
assert.equal(p.mastered.length,10);assert.equal(p.attempts[qs[0].id],2);
// A JSON cloud/local storage round-trip retains this chapter's results only.
const records=new Map([[id,JSON.stringify({updatedMs:500,practice10:p})],['fisica-capitulo-17',JSON.stringify({practice10:api.normalize('fisica-capitulo-17')})]]);
const restored=api.normalize(id,JSON.parse(records.get(id)));
assert.equal(restored.mastered.length,10);assert.equal(api.summary(id,{practice10:restored}).percent,100);assert.equal(api.summary(id,{practice10:restored}).chapterCompleted,true);
assert.equal(api.normalize('fisica-capitulo-17',JSON.parse(records.get('fisica-capitulo-17'))).mastered.length,0);
console.log('PASS: ten original wave problems, independent calculations/sign checks, unique alternatives, progressive correction, storage round-trip and isolated chapter bank.');
