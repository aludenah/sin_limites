const assert=require('node:assert/strict');
const PH=require('../chemistry-ph-engine.js');
const close=(actual,expected,tolerance=1e-10)=>assert.ok(Math.abs(actual-expected)<=tolerance,`${actual} ≠ ${expected}`);
const relative=(actual,expected,tolerance=1e-12)=>assert.ok(Math.abs(actual-expected)<=tolerance*Math.max(Math.abs(expected),1e-300),`${actual} ≠ ${expected}`);
const acid={sampleType:'acid',sampleVolumeMl:20,sampleConcentrationM:.1,titrantConcentrationM:.1,addedVolumeMl:0};

// Independent textbook/stoichiometric fixtures, rather than a copy of the model.
for(const [volume,pH] of [[0,1],[10,1.4771212547],[20,7],[20.1,10.3968556972148],[25,12.0457574906],[40,12.5228787453]]){
 const a=PH.calculate({...acid,addedVolumeMl:volume}),b=PH.calculate({...acid,sampleType:'base',addedVolumeMl:volume});
 close(a.pH,pH,1e-9);close(a.pH+b.pH,14);close(a.pH+a.pOH,14);
 relative(a.h3oM*a.ohM,1e-14);
}

const equivalence=PH.calculate({...acid,addedVolumeMl:20});
assert.equal(equivalence.pH,7);assert.equal(equivalence.excessType,'none');
close(equivalence.naM,.05);close(equivalence.clM,.05);close(equivalence.neutralizedMoles,.002);
close(equivalence.equivalenceVolumeMl,20);close(equivalence.totalVolumeMl,40);

const unequal=PH.calculate({...acid,sampleVolumeMl:25,sampleConcentrationM:.2,titrantConcentrationM:.1,addedVolumeMl:20});
// 0.005 mol acid - 0.002 mol base = 0.003 mol acid in 0.045 L.
close(unequal.pH,-Math.log10(.003/.045));close(unequal.equivalenceVolumeMl,50);
assert.equal(unequal.excessType,'acid');close(unequal.excessMoles,.003);
close(unequal.naM,.002/.045);close(unequal.clM,.005/.045);
const unequalEq=PH.calculate({...acid,sampleVolumeMl:25,sampleConcentrationM:.2,titrantConcentrationM:.1,addedVolumeMl:50});
assert.equal(unequalEq.pH,7);

// At extreme dilution, water matters: 10^-8 M HCl is mildly acidic, never pH 8.
close(PH.calculate({...acid,sampleConcentrationM:1e-8}).pH,6.9782943135,1e-10);
close(PH.calculate({...acid,sampleConcentrationM:1e-15}).pH,7,3e-9);
const water=PH.calculate({...acid,sampleConcentrationM:0});
assert.equal(water.pH,7);assert.equal(water.naM,0);assert.equal(water.clM,0);
assert.equal(PH.calculate({...acid,sampleConcentrationM:2}).pH<0,true,'The engine must not clamp the mathematical pH range');

for(const sampleType of ['acid','base'])for(const sampleConcentrationM of [0,1e-12,1e-8,.01,.1,.5])for(const addedVolumeMl of [0,.1,2.5,20,49.9,100]){
 const c={...acid,sampleType,sampleConcentrationM,addedVolumeMl},r=PH.calculate(c);
 for(const key of ['pH','pOH','h3oM','ohM','naM','clM','sampleMoles','titrantMoles','neutralizedMoles','totalVolumeMl','equivalenceVolumeMl'])assert.ok(Number.isFinite(r[key]),key+' must remain finite');
 const left=r.h3oM+r.naM,right=r.ohM+r.clM;
 assert.ok(Math.abs(left-right)<2e-14,'Electroneutrality is conserved');
 relative(r.h3oM*r.ohM,PH.KW);
 assert.ok(r.neutralizedMoles<=Math.min(r.acidMoles,r.baseMoles));
 close(r.naM*(r.totalVolumeMl/1000),r.baseMoles);
 close(r.clM*(r.totalVolumeMl/1000),r.acidMoles);
}

for(const sampleType of ['acid','base']){
 const line=PH.curve({...acid,sampleType,titrantConcentrationM:.075},{maxVolumeMl:60,points:61});
 assert.ok(line.length>=61);assert.equal(line[0].volumeMl,0);assert.equal(line.at(-1).volumeMl,60);
 const eq=PH.calculate({...acid,titrantConcentrationM:.075}).equivalenceVolumeMl;
 assert.ok(line.some(p=>p.volumeMl===eq&&p.pH===7),'Exact equivalence is sampled even between grid points');
 for(let i=1;i<line.length;i++){
  assert.ok(line[i].volumeMl>line[i-1].volumeMl,'Curve volumes are unique and sorted');
  assert.ok(sampleType==='acid'?line[i].pH>=line[i-1].pH:line[i].pH<=line[i-1].pH,'Strong acid/base titration must be monotonic');
 }
}
const outside=PH.curve({...acid,sampleConcentrationM:.5,titrantConcentrationM:.01},{maxVolumeMl:10,points:2});
assert.ok(outside.every(p=>p.volumeMl>=0&&p.volumeMl<=10));

assert.equal(PH.indicator(1,'none').color,PH.indicator(13,'none').color,'Without indicator HCl/NaOH remain colorless');
assert.equal(PH.indicator(8.2,'phenolphthalein').visibleColor,false);
assert.equal(PH.indicator(10,'phenolphthalein').label,'Rosa');
assert.equal(PH.indicator(6,'bromothymol').label,'Amarillo');
assert.equal(PH.indicator(7,'bromothymol').label,'Verde de transición');
assert.equal(PH.indicator(7.6,'bromothymol').label,'Azul');
assert.notEqual(PH.indicator(1,'universal').color,PH.indicator(13,'universal').color);
assert.equal(PH.indicator(7,'universal').label,'Verde neutro');

for(const config of [null,[],{sampleType:'weak-acid'},{sampleVolumeMl:0},{sampleVolumeMl:-1},{sampleConcentrationM:-1},{sampleConcentrationM:NaN},{titrantConcentrationM:0},{addedVolumeMl:-1},{addedVolumeMl:Infinity},{addedVolumeMl:'2'},{sampleVolumeMl:Number.MAX_VALUE,addedVolumeMl:Number.MAX_VALUE}])assert.throws(()=>PH.calculate(config));
assert.throws(()=>PH.indicator(NaN));assert.throws(()=>PH.indicator(7,'unknown'));
for(const options of [null,{maxVolumeMl:0},{points:1},{points:1.5},{points:1002}])assert.throws(()=>PH.curve(acid,options));
assert.ok(Object.isFrozen(PH.defaults));assert.equal(PH.assumptions.temperatureC,25);
console.log('PASS: strong-acid/base stoichiometry, water equilibrium, dilute and equivalence cases, charge/mass balance, monotonic curves, indicator boundaries and invalid-input handling.');
