'use strict';
const assert = require('node:assert/strict');
const E = require('../induction-engine.js');
const near = (actual, expected, tolerance=1e-10) => assert.ok(Math.abs(actual-expected)<=tolerance, `${actual} ≠ ${expected}`);
const {TAU,DEFAULTS,LIMITS}=E.constants;

// Faraday's law is checked independently against numerical derivatives of flux.
for (const position of [-.22,-.1,-.03,0,.04,.13,.21]) {
  const input={position,velocity:.27,turns:200,polarity:1,resistance:25,closed:true};
  const s=E.magnet(input),h=1e-6;
  const derivative=(E.magnet({...input,position:position+h}).fluxPerTurn-E.magnet({...input,position:position-h}).fluxPerTurn)/(2*h);
  near(s.fluxGradient,derivative,1e-10);
  near(s.emf,-input.turns*derivative*input.velocity,1e-8);
  near(s.current,s.emf/input.resistance);
  near(s.power,s.emf*s.current);
}
const sample=E.magnet({position:-.045,velocity:.5,turns:150});
assert.ok(Math.abs(sample.emf)>.25&&Math.abs(sample.emf)<.35,'The demo should show a measurable signal.');
near(E.magnet({position:-.045,velocity:0}).emf,0);
near(E.magnet({position:0,velocity:.5}).emf,0); // Instantaneous flux maximum.
assert.ok(E.magnet({position:0,velocity:0}).fluxPerTurn>0);
for (const position of [.025,.08,.2]) {
  const positive=E.magnet({position,velocity:.3,turns:100});
  const negative=E.magnet({position:-position,velocity:.3,turns:100});
  near(positive.fluxPerTurn,negative.fluxPerTurn);
  near(positive.emf,-negative.emf);
  near(E.magnet({position,velocity:-.3,turns:100}).emf,-positive.emf);
  near(E.magnet({position,velocity:.3,turns:100,polarity:-1}).emf,-positive.emf);
  near(E.magnet({position,velocity:.3,turns:200}).emf,2*positive.emf);
  const open=E.magnet({position,velocity:.3,turns:100,closed:false});
  near(open.emf,positive.emf);
  assert.equal(open.current,0);
  assert.equal(open.power,0);
}

// Generator flux and emf are in quadrature; rotation direction reverses emf.
const generator={field:.08,area:.005,turns:200,angularSpeed:TAU,resistance:20};
const peak=generator.turns*generator.field*generator.area*generator.angularSpeed;
near(E.generator({...generator,angle:0}).fluxPerTurn,.0004);
near(E.generator({...generator,angle:0}).emf,0);
near(E.generator({...generator,angle:Math.PI/2}).emf,peak);
near(E.generator({...generator,angle:Math.PI}).emf,0);
near(E.generator({...generator,angle:3*Math.PI/2}).emf,-peak);
for (const angle of [.17,.7,1.8,3.2,5.8]) {
  const h=1e-6, model=E.generator({...generator,angle});
  const derivative=(E.generator({...generator,angle:angle+h}).fluxPerTurn-E.generator({...generator,angle:angle-h}).fluxPerTurn)/(2*h);
  near(model.emf,-generator.turns*derivative*generator.angularSpeed,1e-8);
  near(E.generator({...generator,angle,angularSpeed:-TAU}).emf,-model.emf);
  near(E.generator({...generator,angle,angularSpeed:0}).emf,0);
  const open=E.generator({...generator,angle,closed:false});
  near(open.emf,model.emf);assert.equal(open.current,0);
  near(E.generator({...generator,angle:angle+10*TAU}).emf,model.emf);
}
near(E.generator({...generator,field:0}).fluxPerTurn,0);
near(E.generator({...generator,field:0}).emf,0);

// Persisted or unexpected input cannot generate NaN/Infinity or divide by zero.
for (const input of [undefined,null,[],{}, {position:Infinity,velocity:NaN,turns:'300',closed:'false',resistance:0,field:-Infinity,area:0,scale:0,angle:Infinity,angularSpeed:NaN}, {position:1e300,velocity:-1e300,turns:1e300,resistance:1e300,field:1e300,area:1e300,scale:1e300,angle:-1e300,angularSpeed:1e300}]) {
  const normalized=E.normalizeSettings(input);
  for (const [key,bounds] of Object.entries(LIMITS)) assert.ok(normalized[key]>=bounds[0]&&normalized[key]<=bounds[1]);
  assert.ok(Number.isInteger(normalized.turns));
  assert.ok(normalized.angle>=0&&normalized.angle<TAU);
  for (const method of ['magnet','generator']) {
    const output=E[method](input);
    for (const [key,value] of Object.entries(output)) if(typeof value==='number') assert.ok(Number.isFinite(value),key);
    assert.ok(output.power>=0);
  }
}
assert.equal(E.normalizeSettings({closed:false}).closed,false);
assert.equal(E.normalizeSettings({closed:'false'}).closed,DEFAULTS.closed);
assert.equal(E.normalizeSettings({polarity:-1}).polarity,-1);
assert.ok(Object.isFrozen(E)&&Object.isFrozen(DEFAULTS)&&Object.isFrozen(LIMITS.position));
console.log('Induction engine: Faraday derivatives, Lenz signs, open circuit, generator quadrature and finite input bounds passed.');
