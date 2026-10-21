'use strict';
const assert = require('node:assert/strict');
const E = require('../polyhedra-engine.js');
const dot = (a,b) => a.reduce((s,x,i) => s+x*b[i],0);
const sub = (a,b) => a.map((x,i) => x-b[i]);
const cross = (a,b) => [a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]];
const norm = a => Math.hypot(...a);
const near = (actual, expected, tolerance=1e-8) => assert.ok(Math.abs(actual-expected)<=tolerance,`${actual} ≠ ${expected}`);
function areaOfFace(m, f) {
  const origin=m.vertices[f.vertices[0]],n=f.normal;
  let area=0;
  for(let i=1;i<f.vertices.length-1;i++)area+=dot(cross(sub(m.vertices[f.vertices[i]],origin),sub(m.vertices[f.vertices[i+1]],origin)),n)/2;
  return area;
}
const expected={cube:[8,12,6,4],tetrahedron:[4,6,4,3],octahedron:[6,12,8,3],dodecahedron:[20,30,12,5],icosahedron:[12,30,20,3],pyramid:[5,8,5,null]};
assert.deepEqual(E.ids,Object.keys(expected));
for(const [id,[V,A,C,faceSize]] of Object.entries(expected)){
  const m=E.getModel(id);
  assert.deepEqual(m.counts,{vertices:V,edges:A,faces:C});
  assert.equal(V-A+C,2);
  assert.equal(m.regular,id!=='pyramid');
  assert.ok(Object.isFrozen(m)&&Object.isFrozen(m.vertices)&&Object.isFrozen(m.vertices[0])&&Object.isFrozen(m.faces));
  assert.throws(()=>m.vertices[0].push(9),TypeError);
  assert.equal(new Set(m.edges.map(e=>e.id)).size,A);
  assert.equal(new Set(m.faces.map(f=>f.id)).size,C);
  const edgeLengths=m.edges.map(e=>norm(sub(m.vertices[e.vertices[0]],m.vertices[e.vertices[1]])));
  const degrees=m.vertices.map((_,i)=>m.edges.filter(e=>e.vertices.includes(i)).length);
  if(m.regular){
    edgeLengths.forEach(value=>near(value,edgeLengths[0]));
    assert.equal(new Set(degrees).size,1);
  }
  const faceAreas=[];
  for(const f of m.faces){
    if(faceSize)assert.equal(f.vertices.length,faceSize);
    assert.equal(new Set(f.vertices).size,f.vertices.length);
    near(norm(f.normal),1);
    const a=m.vertices[f.vertices[0]],b=m.vertices[f.vertices[1]],c=m.vertices[f.vertices[2]];
    assert.ok(dot(cross(sub(b,a),sub(c,b)),f.normal)>0,'Face order must be outward.');
    for(const i of f.vertices)near(dot(f.normal,sub(m.vertices[i],a)),0);
    for(const vertex of m.vertices)assert.ok(dot(f.normal,sub(vertex,a))<=1e-8,'Every face must support the convex solid.');
    assert.ok(dot(f.normal,f.center)>0);
    const faceEdges=f.vertices.map((v,i)=>m.edges.find(e=>e.vertices.includes(v)&&e.vertices.includes(f.vertices[(i+1)%f.vertices.length])));
    assert.ok(faceEdges.every(Boolean));
    assert.ok(faceEdges.every(e=>e.faces.includes(f.id)));
    const area=areaOfFace(m,f);assert.ok(area>0);faceAreas.push(area);
    if(m.regular){
      // A regular p-gon decomposes into p equal isosceles triangles.
      const expectedArea=f.vertices.length*edgeLengths[0]**2/(4*Math.tan(Math.PI/f.vertices.length));
      near(area,expectedArea);
    }
  }
  for(const edge of m.edges){
    assert.equal(edge.faces.length,2);
    assert.equal(new Set(edge.faces).size,2);
    assert.ok(edge.faces.every(id=>m.faces.some(f=>f.id===id&&edge.vertices.every(v=>f.vertices.includes(v)))));
  }
  if(m.regular)faceAreas.forEach(area=>near(area,faceAreas[0]));
  if(id==='cube')near(faceAreas.reduce((a,b)=>a+b,0),24);
  if(id==='tetrahedron'||id==='octahedron')near(faceAreas.reduce((a,b)=>a+b,0),8*Math.sqrt(3));
  if(id==='icosahedron')near(faceAreas.reduce((a,b)=>a+b,0),20*Math.sqrt(3));
  if(id==='pyramid')near(faceAreas.reduce((a,b)=>a+b,0),4+4*Math.sqrt(5));
}
assert.deepEqual(E.getModel('cube').vertices,[[-1,-1,-1],[1,-1,-1],[1,1,-1],[-1,1,-1],[-1,-1,1],[1,-1,1],[1,1,1],[-1,1,1]]);
assert.deepEqual(E.getModel('pyramid').vertices,[[-1,-1,-1],[1,-1,-1],[1,1,-1],[-1,1,-1],[0,0,1]]);
const presetFixtures={
  'cube-triangle':{sides:3,area:Math.sqrt(3)/2,perimeter:3*Math.sqrt(2)},
  'cube-square':{sides:4,area:4,perimeter:8},
  'cube-pentagon':{sides:5,area:7*Math.sqrt(6)/4,perimeter:3*Math.sqrt(5)+Math.sqrt(2)},
  'cube-hexagon':{sides:6,area:3*Math.sqrt(3),perimeter:6*Math.sqrt(2)}
};
for(const [id,expected] of Object.entries(presetFixtures)){
  const p=E.presets[id],s=E.section('cube',p);
  assert.equal(s.kind,'polygon');assert.equal(s.sides,expected.sides);
  near(s.area,expected.area);near(s.perimeter,expected.perimeter);
  assert.equal(s.points.length,s.sides);assert.equal(s.polygon2D.length,s.sides);
  for(const point of s.points)near(dot(point,s.normal),s.offset);
}
const pentagon=E.section('cube',E.presets['cube-pentagon']).points;
for(const p of [[-1,0,1],[0,-1,1],[-1,1,.5],[1,-1,.5],[1,1,-.5]])assert.ok(pentagon.some(q=>norm(sub(p,q))<1e-8));
for(const [config,kind,count] of [
  [{normal:[1,1,1],offset:Math.sqrt(3)},'point',1],
  [{normal:[1,1,0],offset:Math.sqrt(2)},'segment',2],
  [{normal:[0,0,1],offset:2},'empty',0]
]){
  const s=E.section('cube',config);assert.equal(s.kind,kind);assert.equal(s.points.length,count);
  assert.equal(s.sides,0);assert.equal(s.area,0);assert.equal(s.perimeter,0);
}
const coincidentFace=E.section('cube',{normal:[0,0,1],offset:1});
assert.equal(coincidentFace.kind,'polygon');assert.equal(coincidentFace.sides,4);near(coincidentFace.area,4);
for(const scale of [1e-300,1e-12,1,100,1e300]){
  const s=E.section('cube',{normal:[scale,scale,scale],offset:0});
  assert.equal(s.sides,6);near(s.area,3*Math.sqrt(3));
}
// Diverse directions exercise every solid independently of the four pedagogical presets.
for(const id of E.ids){
  const m=E.getModel(id);
  for(let k=1;k<=12;k++){
    const n=[Math.sin(k*.73),Math.cos(k*.41),Math.sin(k*.29+.4)],d=m.radius*((k%5)-2)/5;
    const s=E.section(m,{normal:n,offset:d}),reverse=E.section(m,{normal:n.map(x=>-x),offset:-d});
    assert.equal(s.kind,reverse.kind);assert.equal(s.sides,reverse.sides);
    near(s.area,reverse.area);near(s.perimeter,reverse.perimeter);
    assert.ok(s.sides<=m.faces.length);
    for(const point of s.points){
      assert.ok(point.every(Number.isFinite));near(dot(s.normal,point),d);
      for(const f of m.faces)assert.ok(dot(f.normal,sub(point,m.vertices[f.vertices[0]]))<=1e-8);
      assert.ok(m.edges.some(e=>{
        const a=m.vertices[e.vertices[0]],b=m.vertices[e.vertices[1]],ab=sub(b,a),ap=sub(point,a),t=dot(ap,ab)/dot(ab,ab);
        return t>=-1e-8&&t<=1+1e-8&&norm(cross(ap,ab))<1e-7;
      }),'Every section vertex must lie on a real edge.');
    }
  }
}
assert.deepEqual(E.project([1,2,3],{scale:10,cx:100,cy:50}),{x:110,y:30,depth:3});
const turned=E.rotatePoint([1,0,0],{yaw:Math.PI/2});near(turned[0],0);near(turned[1],0);near(turned[2],-1);
near(norm(E.rotatePoint([1,2,3],{yaw:.7,pitch:-.8})),Math.sqrt(14));
assert.throws(()=>E.getModel('sphere'),RangeError);
assert.throws(()=>E.section('cube',{normal:[0,0,0]}),RangeError);
for(const normal of [[1,2],[1,2,Infinity],[1,'2',3],[NaN,0,1],null])assert.throws(()=>E.section('cube',{normal}),TypeError);
for(const offset of [null,'0',NaN,Infinity])assert.throws(()=>E.section('cube',{offset}),TypeError);
assert.throws(()=>E.section('cube',null),TypeError);
assert.throws(()=>E.section({vertices:[[0,0,0]],edges:[{vertices:[0,8]}]}),TypeError);
assert.throws(()=>E.rotatePoint([1,2,3],{yaw:NaN}),TypeError);
assert.throws(()=>E.project([1,2,3],{scale:Infinity}),TypeError);
console.log('PASS: six convex models, Platonic regularity, ordered manifold faces, Euler, exact 3–6 sided sections, degeneracies, scale invariance and orthographic projection.');
