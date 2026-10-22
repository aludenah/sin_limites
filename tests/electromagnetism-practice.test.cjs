'use strict';
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const dir=path.join(__dirname,'..');
const context={window:{}};
for(const file of ['practice-bank.js','fisica-capitulo-17-practice.js','chapter-practice.js'])vm.runInNewContext(fs.readFileSync(path.join(dir,file),'utf8'),context,{filename:file});
const id='fisica-capitulo-17',practice=context.window.ChapterPractice,qs=practice.questions(id);
assert.equal(qs.length,10);
assert.equal(new Set(qs.map(q=>q.id)).size,10);
for(const q of qs){
 assert.equal(q.options.length,5);
 assert.equal(new Set(q.options).size,5);
 assert.ok(Number.isInteger(q.answer)&&q.answer>=0&&q.answer<5);
 assert.ok(q.prompt.length>30&&q.solution.includes('<ol>'));
}
const byId=Object.fromEntries(qs.map(q=>[q.id,q]));
const number=s=>Number(s.replace('−','-').replace(',','.').match(/-?\d+(?:\.\d+)?/)[0]);
function uniqueNumerical(qid,value,direction){
 const q=byId[qid],matches=q.options.map((s,i)=>({s,i,n:number(s)})).filter(o=>Math.abs(o.n-value)<1e-10&&(!direction||o.s.includes(direction)));
 assert.equal(matches.length,1,qid+' must have exactly one correct alternative');
 assert.equal(matches[0].i,q.answer,qid+' answer key');
}
// Values calculated independently from the solution text, using SI quantities.
const permeability=4*Math.PI*1e-7;
const B=(current,r)=>permeability*current/(2*Math.PI*r);
uniqueNumerical('fis17-v2-p03',B(12,3e-2)*1e6);
uniqueNumerical('fis17-v2-p04',(B(6,4e-2)-B(2,4e-2))*1e6,'hacia arriba');
uniqueNumerical('fis17-p03',2e-6*3e4*.5);
uniqueNumerical('fis17-p05',.5*2*.4*Math.sin(Math.PI/6));
uniqueNumerical('fis17-p06',.3*.020*Math.cos(Math.PI/3));
uniqueNumerical('fis17-p07',50*(.005-.001)/.20);
// Independent cross-product sign: +z current at +x produces +y field.
const cross=(a,b)=>[a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]];
assert.deepEqual(cross([0,0,-1],[1,0,0]),[0,-1,0]);
assert.ok(byId['fis17-v2-p02'].options[byId['fis17-v2-p02'].answer].includes('abajo'));
assert.ok(byId['fis17-v2-p01'].options[byId['fis17-v2-p01'].answer].includes('cada uno con polo norte y polo sur'));
assert.equal(byId['fis17-p09'].options[byId['fis17-p09'].answer],'Horario, para producir campo entrante.');
assert.equal(byId['fis17-p10'].options[byId['fis17-p10'].answer],'La amplitud se duplica y la frecuencia no cambia.');
// A revised question must not inherit mastery from a different old question.
const previousIds=Array.from({length:10},(_,i)=>'fis17-p'+String(i+1).padStart(2,'0'));
const oldProgress={practice10:{version:1,mastered:previousIds,answers:{},results:{},attempts:{}}};
const migrated=practice.normalize(id,oldProgress);
assert.equal(migrated.mastered.length,6);
for(const q of qs.slice(0,4))assert.ok(!migrated.mastered.includes(q.id));
for(const q of qs.slice(4))assert.ok(migrated.mastered.includes(q.id));
const p=practice.normalize(id);
assert.equal(practice.canOpen(id,p,1,'progressive'),false);
for(const q of qs){
 assert.ok(practice.choose(id,p,q.id,q.answer,'progressive'));
 assert.equal(practice.check(id,p,q.id,'progressive'),'graded');
}
assert.equal(practice.summary(id,{practice10:p}).percent,100);
console.log('PASS: 10 unique proposed problems, six independently computed answers, direction signs, preserved mastery and progressive completion.');
