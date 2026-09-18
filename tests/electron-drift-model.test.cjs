const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const ctx={window:{}};
vm.runInNewContext(fs.readFileSync(path.join(__dirname,'..','fisica-capitulo-15-electrones-modelo.js'),'utf8'),ctx);
const create=ctx.window.ElectronDriftModel.create;
const seeded=initial=>{let seed=initial;return ()=>{seed=(1664525*seed+1013904223)>>>0;return seed/4294967296;};};
const near=(a,b,tolerance=1e-8)=>assert.ok(Math.abs(a-b)<tolerance,`${a} differs from ${b}`);
const config=()=>({width:728,height:250,count:96,random:seeded(104729)});
const snapshot=model=>JSON.stringify(model.particles);

// Compare complete histories under identical random collisions. Measuring
// displacement (including particles crossing the window) checks the actual
// transport displayed to students, independently of the velocity attributes.
const fields=[0,1,-1],models=fields.map(()=>create(config())),transport=[0,0,0];
const original=models[0].particles.slice();
const duration=60,frames=duration*60;
let fluctuations=0,samples=0;
for(let frame=0;frame<frames;frame++){
 models.forEach((model,m)=>{
  const before=model.particles.map(p=>p.x);
  model.step(1/60,fields[m]);
  model.particles.forEach((p,i)=>{
   let dx=p.x-before[i];if(dx>364)dx-=728;if(dx< -364)dx+=728;
   transport[m]+=dx/model.particles.length;
   assert.ok(p.x>=0&&p.x<728&&p.y>=0&&p.y<=250,'Particles remain inside the conductor window');
  });
 });
 for(let i=0;i<original.length;i++){
  assert.equal(models[0].particles[i],original[i],'Particle identities survive every frame');
  const [zero,right,left]=models.map(m=>m.particles[i]);
  near(right.vx-zero.vx,-30);near(left.vx-zero.vx,30);
  near(right.vy,zero.vy);near(left.vy,zero.vy);
  near(Math.hypot(right.vx+30,right.vy),90);
  fluctuations+=zero.vx**2;samples++;
 }
}
const average=transport.map(x=>x/duration);
assert.ok(Math.abs(average[0])<2,'Random motion has no systematic drift without a field');
near(average[1]-average[0],-30,1e-7);
near(average[2]-average[0],30,1e-7);
assert.ok(average[1]<-28&&average[2]>28,'Negative charge drifts opposite either field direction');
assert.ok(fluctuations/samples>3000,'Strong chaotic motion persists beneath the mean drift');

// A field reversal changes only the ordered component, not the random motion.
const reversing=create(config()),control=create(config());
for(const field of [0,1,1,-1,-1,0]){
 for(let frame=0;frame<90;frame++){
  reversing.step(1/60,field);control.step(1/60,0);
  reversing.particles.forEach((p,i)=>{
   near(p.vx-control.particles[i].vx,-30*field);near(p.vy,control.particles[i].vy);
  });
 }
}

// Frame stalls cannot teleport particles through many seconds of simulation;
// seeded replay also protects reproducible screenshots and model diagnostics.
const stalled=create(config()),bounded=create(config());
stalled.step(10,1);bounded.step(.1,1);assert.equal(snapshot(stalled),snapshot(bounded));
const unchanged=snapshot(stalled);
for(const dt of [0,-1,NaN,Infinity])stalled.step(dt,-1);
assert.equal(snapshot(stalled),unchanged);
const replay=create(config()),repeat=create(config());
for(let frame=0;frame<240;frame++){replay.step(1/60,1);repeat.step(1/60,1);}
assert.equal(snapshot(replay),snapshot(repeat));

// Reflection remains bounded even for a tiny viewport and several crossings.
const narrow=create({width:.1,height:.1,count:4,random:seeded(83)});
for(let frame=0;frame<60;frame++){
 narrow.step(.1,frame%3-1);
 assert.ok(narrow.particles.every(p=>p.x>=0&&p.x<.1&&p.y>=0&&p.y<=.1));
}
assert.throws(()=>create({width:0}),{name:'RangeError'});
assert.throws(()=>create({count:1.5}),{name:'RangeError'});
console.log('PASS: zero-field random motion, sustained chaos and opposite-field drift, reversal, seeded replay, bounded transport and frame-stall protection.');
