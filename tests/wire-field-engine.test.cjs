'use strict';
const assert=require('node:assert/strict');
const E=require('../wire-field-engine.js');
const near=(a,b,eps=1e-10)=>assert.ok(Math.abs(a-b)<eps,`${a} != ${b}`);
const dot=(a,b)=>a.reduce((s,v,i)=>s+v*b[i],0);
const cross=(a,b)=>[a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]];
// Independently evaluated Ampère-law result in vacuum: 5 A at 5 cm gives 20 µT.
let f=E.field(5,5,0);near(f.microtesla,20);near(f.bx,0);near(f.by,20e-6);near(f.radiusM,.05);
near(E.field(10,5).microtesla,40);near(E.field(5,10).microtesla,10);near(E.field(0,5).microtesla,0);
// B circles the z-axis and is perpendicular to the radius everywhere.
for(const current of [-10,-2,0,3,10])for(const angle of [0,30,90,150,220,270,360]){
 f=E.field(current,4,angle);near(f.bx*f.x+f.by*f.y,0);near(f.bz,0);
 near(Math.hypot(f.bx,f.by)*1e6,Math.abs(current)*5);
 const inverse=E.field(-current,4,angle);near(inverse.bx,-f.bx);near(inverse.by,-f.by);
 if(current!==0)assert.equal(Math.sign(f.x*f.by-f.y*f.bx),Math.sign(current));
}
// A top view is from +z: x right, y up. +I therefore circulates counterclockwise.
const center=E.project([0,0,0],'xy'),right=E.project([1,0,0],'xy'),up=E.project([0,1,0],'xy');
assert.ok(right.x>center.x);assert.ok(up.y<center.y);near(right.y,center.y);near(up.x,center.x);
// Each view basis is right handed and orthonormal. This prevents mirrored field arrows.
for(const view of ['3d','xy','xz','yz'])for(const az of [-170,-70,0,90]){
 const b=E.basis(view,az,24),c=cross(b.right,b.up);
 for(let i=0;i<3;i++)near(c[i],b.normal[i]);
 near(dot(b.right,b.up),0);near(dot(b.normal,b.up),0);near(dot(b.right,b.normal),0);
 near(dot(b.right,b.right),1);near(dot(b.up,b.up),1);near(dot(b.normal,b.normal),1);
}
// Longitudinal xz: observer is on -y. On x>0, B=+y is into the page.
assert.deepEqual(E.basis('xz').normal,[0,-1,0]);
assert.equal(E.longitudinalSymbol(5,1),'into');assert.equal(E.longitudinalSymbol(5,-1),'out');
assert.equal(E.longitudinalSymbol(-5,1),'out');assert.equal(E.longitudinalSymbol(-5,-1),'into');
assert.equal(E.longitudinalSymbol(0,1),'none');
// Longitudinal yz: observer is on +x. On y>0, B=-x is also into the page.
assert.deepEqual(E.basis('yz').normal,[1,0,0]);
const yz=E.field(5,5,90);assert.ok(dot([yz.bx,yz.by,yz.bz],E.basis('yz').normal)<0);
// Oersted mode adds a specified horizontal terrestrial field, without changing the wire field.
const bare=E.field(5,5,90),earth=E.field(5,5,90,true);near(earth.microtesla,bare.microtesla);near(earth.totalX,-20e-6);near(earth.totalY,25e-6);near(earth.total,Math.sqrt(1025)*1e-6);
assert.ok(earth.compassAngle<0);near(E.field(0,5,90,true).compassAngle,0);assert.equal(E.field(0,5).compassAngle,null);
assert.equal(E.field(-5,4,0,true).compassAngle,null,'Cancellation must not invent a needle direction');
for(const radius of [0,-2,NaN,Infinity])assert.throws(()=>E.field(5,radius),RangeError);
for(const current of [NaN,Infinity])assert.throws(()=>E.field(current,5),RangeError);
console.log('PASS: wire-field magnitude, inverse-distance/current scaling, direction and reversal, no field at zero current, right-handed view planes, transverse/longitudinal orientation, compass vector sum and cancellation.');
