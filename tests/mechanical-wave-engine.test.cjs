'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const E=require('../mechanical-wave-engine.js');
const near=(a,b,tol=1e-10)=>assert.ok(Math.abs(a-b)<=tol*Math.max(1,Math.abs(a),Math.abs(b)),`${a} != ${b}`);

// A crest advances vΔt, while a labelled material particle returns after T.
for(const direction of [1,-1])for(const x of [-.8,0,.23,1.7])for(const t of [0,.17,.65]){
  const options={A:.07,lambda:1.2,f:2.5,direction,phase:.34},dt=.11,v=3;
  near(E.travelling({...options,x:x+direction*v*dt,t:t+dt}),E.travelling({...options,x,t}));
  near(E.travelling({...options,x,t:t+.4}),E.travelling({...options,x,t}));
}
near(E.travelling({x:.25,t:0,A:2,lambda:1,f:1}),2);
near(E.travelling({x:0,t:.25,A:2,lambda:1,f:1}),-2);
for(const t of [0,.13,.27,.64]){
  const p=E.longitudinal({x:2,t,A:.04,lambda:1,f:2});near(p.equilibrium,2);near(p.position-p.displacement,2);
  assert.ok(Math.abs(p.position-2)<=.04+1e-12);
}
// Small longitudinal amplitude keeps the displacement map monotonic: particles do not exchange places.
let previous=-Infinity;
for(let j=0;j<=300;j++){
  const p=E.longitudinal({x:j/100,t:.17,A:.12,lambda:1,f:2});assert.ok(p.position>previous);previous=p.position;
}
assert.deepEqual(E.waveProperties({lambda:2.4,f:5}),{speed:12,period:.2,frequency:5,wavelength:2.4});
near(E.speedOnString(100,.01),100);near(E.speedOnString(400,.01),200);near(E.speedOnString(100,.04),50);near(E.speedOnString(0,.01),0);

// Boundary conditions are tested throughout the collision, not only with separated pulses.
for(const t of [0,.3,.7,.78,.9,1.2]){
  near(E.reflection({x:1,t,speed:1,boundary:'fixed'}).total,0);
  const h=1e-5,plus=E.reflection({x:1+h,t,speed:1,boundary:'free'}).total,minus=E.reflection({x:1-h,t,speed:1,boundary:'free'}).total;
  near((plus-minus)/(2*h),0,1e-8);
}
near(E.reflection({x:1,t:.78,speed:1,boundary:'free'}).total,2);
const reflected=E.reflection({x:.7,t:1.08,speed:1,boundary:'fixed'});near(reflected.reflected,-1);assert.ok(Math.abs(reflected.incident)<1e-5);
// Superposition does not consume either pulse: both emerge after meeting.
near(E.superposition({x:.5,t:.25}).total,2);
near(E.superposition({x:.5,t:.25,sign:-1}).total,0);
near(E.superposition({x:.7,t:.45,sign:-1}).first,1);
near(E.superposition({x:.3,t:.45,sign:-1}).second,-1);

// Two equal counterpropagating sinusoids produce the standing expression; endpoints and every node stay still.
for(const n of [1,2,3,5]){
  const meta=E.standingMode({L:2,n,v:20});near(meta.lambda,4/n);near(meta.frequency,5*n);assert.equal(meta.nodes.length,n+1);assert.equal(meta.antinodes.length,n);
  for(const t of [0,.017,.083,.34]){
    for(const x of meta.nodes)near(E.standing({x,t,A:.08,L:2,n,f:meta.frequency}),0);
    for(const x of [.07,.4,1.35]){
      const options={x,t,A:.08,lambda:meta.lambda,f:meta.frequency};
      near(E.standing({x,t,A:.08,L:2,n,f:meta.frequency}),E.travelling({...options,direction:1})+E.travelling({...options,direction:-1}));
    }
  }
  for(const x of meta.antinodes)near(Math.abs(E.standing({x,t:0,A:.08,L:2,n,f:meta.frequency})),.16);
}

// Spherical spreading and decibel changes are independently evaluated from ratios.
near(E.intensity(4*Math.PI,1),1);near(E.intensity(4*Math.PI,2),.25);near(E.intensity(0,1),0);
near(E.soundLevel(1e-12),0);near(E.soundLevel(1e-6),60);near(E.soundLevel(1e-3),90);
near(E.soundLevel(E.intensity(1,2))-E.soundLevel(E.intensity(1,1)),-20*Math.log10(2));
assert.equal(E.soundLevel(0),null);
// Signed velocities: approaching raises pitch, receding lowers it; the same velocity leaves pitch unchanged.
near(E.doppler({f:680,v:340}),680);near(E.doppler({f:680,v:340,sourceVelocity:20}),722.5);
near(E.doppler({f:680,v:340,sourceVelocity:-20}),680*340/360);
near(E.doppler({f:680,v:340,observerVelocity:20}),720);
near(E.doppler({f:680,v:340,sourceVelocity:20,observerVelocity:-20}),680);
assert.ok(E.doppler({f:440,sourceVelocity:50})>440);assert.ok(E.doppler({f:440,sourceVelocity:-50})<440);
near(E.refractedAngle({v1:2,v2:1,angle1:Math.PI/6}),Math.asin(.25));
near(E.refractedAngle({v1:1,v2:1,angle1:-Math.PI/5}),-Math.PI/5);
assert.equal(E.refractedAngle({v1:1,v2:2,angle1:Math.PI/3}),null);
near(E.refractedAngle({v1:1,v2:2,angle1:Math.PI/6}),Math.PI/2);

for(const f of [()=>E.travelling({lambda:0}),()=>E.travelling({direction:0}),()=>E.travelling({t:NaN}),()=>E.speedOnString(-1,.1),()=>E.speedOnString(1,0),()=>E.pulse(0,0,0),()=>E.reflection({boundary:'other'}),()=>E.superposition({sign:0}),()=>E.standingMode({n:0}),()=>E.standing({n:1.5}),()=>E.intensity(1,0),()=>E.soundLevel(-1),()=>E.doppler({sourceVelocity:340}),()=>E.doppler({observerVelocity:-340}),()=>E.refractedAngle({angle1:2}),()=>E.waveProperties({f:0})])assert.throws(f,RangeError);
// The same immutable API is available to a browser without introducing page state.
const context={window:{}};vm.runInNewContext(fs.readFileSync(require.resolve('../mechanical-wave-engine.js'),'utf8'),context);
assert.equal(typeof context.window.MechanicalWaveEngine.travelling,'function');assert.ok(Object.isFrozen(context.window.MechanicalWaveEngine));
console.log('PASS: travelling and material motion, string speed, fixed/free reflection boundaries, pulse superposition, standing modes, intensity levels, signed Doppler, refraction and finite-input guards.');
