// Shared practice contract replaces the former lesson controls and final exam.
const {testChapters}=require('./practice-ten.test.cjs');
const assert=require('node:assert/strict');
const {harness}=require('./study-entry.test.cjs');
const h=harness(['fisica-capitulo-02-data.js','fisica-capitulo-02.js']);
for(const [input,expected] of [[[4,0,0,3],[4,3,5]],[[-4,0,0,3],[-4,3,5]],[[-4,0,0,-3],[-4,-3,5]],[[4,0,0,-3],[4,-3,5]],[[4,3,-4,-3],[0,0,0]],[[0,2,0,3],[0,5,5]]]){
 const r=JSON.parse(h.run('JSON.stringify(vectorResult('+input.join(',')+'))'));
 assert.deepEqual([r.x,r.y,r.magnitude],expected);
 if(!r.magnitude)assert.equal(r.angle,null);
 else{assert.ok(r.angle>=0&&r.angle<360);assert.ok(Math.abs(Math.cos(r.angle*Math.PI/180)*r.magnitude-r.x)<1e-9);assert.ok(Math.abs(Math.sin(r.angle*Math.PI/180)*r.magnitude-r.y)<1e-9);}
}
testChapters(["fisica-capitulo-02"]).catch(error=>{console.error(error);process.exitCode=1;});
