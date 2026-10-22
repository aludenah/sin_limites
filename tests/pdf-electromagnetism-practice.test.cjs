'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const root=path.join(__dirname,'..'),context={window:{}};
for(const file of ['practice-bank.js','fisica-capitulo-17-practice.js','chapter-practice.js'])vm.runInNewContext(fs.readFileSync(path.join(root,file),'utf8'),context,{filename:file});
const id='fisica-capitulo-17',api=context.window.ChapterPractice,qs=api.questions(id),m=s=>'\\('+s+'\\)';
const near=(a,b)=>assert.ok(Math.abs(a-b)<1e-10*Math.max(1,Math.abs(b)),`${a} != ${b}`);
// Independently transcribed key for chapter XVIII, source PDF p.24 (book p.237).
const keys=[2,3,0,2,3,1,4,1,3,1];
assert.equal(qs.length,10);assert.deepEqual(Array.from(qs,q=>q.answer),keys);
assert.equal(new Set(qs.map(q=>q.id)).size,10);
for(let n=0;n<10;n++){
 const q=qs[n];assert.equal(q.id,`fis17-pdf-p${String(n+1).padStart(2,'0')}`);assert.equal(q.options.length,5);assert.equal(new Set(q.options).size,5);assert.ok(q.solution.includes('<ol>'));
 assert.equal(q.sourceMaterial.number,n+1);assert.equal(q.sourceMaterial.pdfPage,n<5?22:23);
 if(n<9){assert.ok(fs.existsSync(path.join(root,q.figure.src)));const svg=fs.readFileSync(path.join(root,q.figure.src),'utf8');assert.match(svg,/<svg/);assert.ok(q.figure.alt.length>60);}
}
const chosen=n=>qs[n-1].options[qs[n-1].answer];
// Q1: 4I/(d+x)=3I/x; take d=1 to test the ratio.
near(4/(1+3),3/3);assert.equal(chosen(1),m('3d'));
// Q2: q v B and mg are perpendicular. No motion/equilibrium assumptions are mixed.
const mass=.600,q=.004,v=2e4,B=.1,g=10;
near(Math.hypot(q*v*B,mass*g)/mass,50/3);assert.equal(chosen(2),m('\\frac{50}{3}\\,\\mathrm{m/s^2}'));
// Q3: current left crossed with field into page gives an extra downward force.
const cross=(a,b)=>[a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]];
assert.deepEqual(cross([-1,0,0],[0,0,-1]).map(n=>n||0),[0,-1,0]);
near((2*g+.2*20*.50)/(2*1100)*100,1);assert.equal(chosen(3),m('1\\,\\mathrm{cm}'));
// Q4: the change in flux is supplied, so the picture's angle is not applied again.
near((20/2)/2,5);assert.equal(chosen(4),m('5\\,\\mathrm A'));
// Q5: source speed is 20 m/s. Only the 3-ohm resistor's dissipation is requested.
const emf=.5*.40*20,I=emf/(3+1);near(I*I*3,3);assert.equal(chosen(5),m('3\\,\\mathrm W')+'; antihorario');
// Q6: wires are perpendicular; their fields at P are perpendicular, 6 and 8 microteslas.
const mu0=4*Math.PI*1e-7,wire=(current,r)=>mu0*current/(2*Math.PI*r);
near(Math.hypot(wire(3,.10),wire(4,.10))*1e6,10);assert.equal(chosen(6),m('10\\,\\mu\\mathrm T'));
// Q7: cyclotron frequency, independent of orbit radius.
near((.010*(2*Math.PI)/(2*Math.PI*.001))*60,600);assert.equal(chosen(7),m('600'));
// Q8: the two magnetic forces on the bent conductor are perpendicular.
near(Math.hypot(2*3*.20,2*3*.15),1.5);assert.equal(chosen(8),m('1{,}5\\,\\mathrm N'));
// Q9: graph slope and square-centimetre conversion.
near(200*(50*1e-4)*(20/5),4);assert.equal(chosen(9),m('4\\,\\mathrm V'));
near(10000*.5*(100*1e-4)*100/1000,5);assert.equal(chosen(10),m('5\\,\\mathrm{kV}'));
// New source questions must not inherit achievements from the replaced bank.
const oldIds=['fis17-v2-p01','fis17-v2-p02','fis17-v2-p03','fis17-v2-p04','fis17-p03','fis17-p05','fis17-p06','fis17-p07','fis17-p09','fis17-p10'];
assert.equal(api.normalize(id,{practice10:{version:1,mastered:oldIds}}).mastered.length,0);
const p=api.normalize(id);assert.equal(api.canOpen(id,p,1,'progressive'),false);
for(const question of qs){assert.equal(api.choose(id,p,question.id,question.answer,'progressive'),true);assert.equal(api.check(id,p,question.id,'progressive'),'graded');}
assert.equal(p.mastered.length,10);assert.equal(api.summary(id,{practice10:p}).percent,100);
console.log('PASS: 10 source-proposed questions, chapter XVIII keys, ten independent calculations/sign checks, nine diagrams, isolated new mastery and progressive completion.');
