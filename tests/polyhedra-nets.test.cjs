const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const Nets = require('../polyhedra-nets.js');

const vertices = [[-1,-1,-1],[1,-1,-1],[1,1,-1],[-1,1,-1],[-1,-1,1],[1,-1,1],[1,1,1],[-1,1,1]];
const cube = {id:'cube',vertices,faces:[
  {id:'bottom',vertices:[0,3,2,1]}, {id:'top',vertices:[4,5,6,7]},
  {id:'front',vertices:[0,1,5,4]}, {id:'right',vertices:[1,2,6,5]},
  {id:'back',vertices:[2,3,7,6]}, {id:'left',vertices:[3,0,4,7]}
]};
const pyramid = {id:'pyramid',vertices:vertices.slice(0,4).concat([[0,0,1]]),faces:[
  {id:'square',vertices:[0,3,2,1]}, {id:'south',vertices:[0,1,4]},
  {id:'east',vertices:[1,2,4]}, {id:'north',vertices:[2,3,4]}, {id:'west',vertices:[3,0,4]}
]};
const distance = (a,b) => Math.hypot(...a.map((v,i)=>v-b[i]));
const close = (actual,expected,tolerance=1e-8) => assert.ok(Math.abs(actual-expected)<tolerance,`${actual} != ${expected}`);
const sub=(a,b)=>a.map((v,i)=>v-b[i]);
const cross=(a,b)=>[a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]];
function area3D(points){
  let area=0;
  for(let i=1;i<points.length-1;i++)area+=Math.hypot(...cross(sub(points[i],points[0]),sub(points[i+1],points[0])))/2;
  return area;
}
function area2D(points){return Math.abs(points.reduce((sum,p,i)=>sum+p[0]*points[(i+1)%points.length][1]-p[1]*points[(i+1)%points.length][0],0))/2;}
function convexIntersection(subject, clip){
  const signed = clip.reduce((sum,p,i)=>sum+p[0]*clip[(i+1)%clip.length][1]-p[1]*clip[(i+1)%clip.length][0],0);
  const orientation = signed>=0?1:-1;
  let polygon=subject.map(p=>p.slice(0,2));
  for(let i=0;i<clip.length && polygon.length;i++){
    const a=clip[i],b=clip[(i+1)%clip.length],side=p=>orientation*((b[0]-a[0])*(p[1]-a[1])-(b[1]-a[1])*(p[0]-a[0]));
    const input=polygon;polygon=[];
    for(let j=0;j<input.length;j++){
      const p=input[j],q=input[(j+1)%input.length],sp=side(p),sq=side(q),pin=sp>=-1e-9,qin=sq>=-1e-9;
      if(pin)polygon.push(p);
      if(pin!==qin){const fraction=sp/(sp-sq);polygon.push(p.map((v,k)=>v+fraction*(q[k]-v)));}
    }
  }
  return polygon;
}
function validate(model){
  const original=JSON.stringify(model),closed=Nets.unfold(model,0);
  assert.equal(closed.length,model.faces.length);
  assert.deepEqual(closed,model.faces.map(face=>({id:face.id,points:face.vertices.map(i=>model.vertices[i])})));
  for(const amount of [0,.01,.2,.5,.8,.99,1]){
    const poses=Nets.unfold(model,amount),byId=new Map(poses.map(face=>[face.id,face]));
    for(const face of model.faces){
      const points=byId.get(face.id).points,reference=face.vertices.map(i=>model.vertices[i]);
      points.forEach(point=>assert.ok(point.every(Number.isFinite)));
      close(area3D(points),area3D(reference));
      for(let i=0;i<points.length;i++)for(let j=i+1;j<points.length;j++)close(distance(points[i],points[j]),distance(reference[i],reference[j]));
    }
    for(const hinge of Nets.hinges(model))for(const index of hinge.vertices){
      const parent=model.faces.find(face=>face.id===hinge.parent),child=model.faces.find(face=>face.id===hinge.child);
      close(distance(byId.get(parent.id).points[parent.vertices.indexOf(index)],byId.get(child.id).points[child.vertices.indexOf(index)]),0);
    }
  }
  const flat=Nets.unfold(model,1);
  for(const face of flat)for(const point of face.points)close(point[2],-1);
  for(let i=0;i<flat.length;i++)for(let j=i+1;j<flat.length;j++){
    const overlap=convexIntersection(flat[i].points,flat[j].points);
    if(overlap.length>=3)close(area2D(overlap),0);
  }
  const base=model.faces.find(face=>face.vertices.every(i=>model.vertices[i][2]===-1));
  assert.deepEqual(Nets.unfold(model,.4).find(face=>face.id===base.id).points,base.vertices.map(i=>model.vertices[i]));
  const p1=Nets.unfold(model,.5),p2=Nets.unfold(model,.500001);
  for(let i=0;i<p1.length;i++)for(let j=0;j<p1[i].points.length;j++)assert.ok(distance(p1[i].points[j],p2[i].points[j])<.0001,'The development must be continuous.');
  assert.equal(JSON.stringify(model),original,'Input model must remain unchanged.');
  assert.equal(Nets.hinges(model).length,model.faces.length-1);
}

assert.deepEqual(Nets.supported,['cube','pyramid']);
validate(cube); validate(pyramid);
close(Nets.unfold(cube,1).reduce((sum,face)=>sum+area3D(face.points),0),24);
close(Nets.unfold(pyramid,1).reduce((sum,face)=>sum+area3D(face.points),0),4+4*Math.sqrt(5));
for(const amount of [-1,1.01])assert.throws(()=>Nets.unfold(cube,amount),RangeError);
for(const amount of [undefined,null,'0.5',NaN,Infinity])assert.throws(()=>Nets.unfold(cube,amount),TypeError);
assert.throws(()=>Nets.unfold({...cube,id:'tetrahedron'},.5),RangeError);
assert.throws(()=>Nets.unfold({...cube,vertices:cube.vertices.slice(1)},.5),RangeError);
assert.throws(()=>Nets.unfold({...cube,vertices:[[Infinity,0,0],...cube.vertices.slice(1)]},.5),TypeError);

const engineFile=path.join(__dirname,'..','polyhedra-engine.js');
if(fs.existsSync(engineFile)){
  const engine=require(engineFile);
  for(const id of Nets.supported){const model=engine.getModel(id);validate(model);assert.deepEqual(Nets.unfold(id,.5),Nets.unfold(model,.5));}
}
console.log('PASS: rigid cube/pyramid hinge nets, flat non-overlap, conserved faces, attached edges, continuous motion and valid domains.');
