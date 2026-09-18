'use strict';
(function(){
 // Qualitative microscopic model: random thermal motion plus a small mean
 // drift opposite E. These display speeds are deliberately not to scale.
 const thermalSpeed=90,driftSpeed=30,scatteringTime=.09,maxStep=1/120;
 const wrap=(value,length)=>((value%length)+length)%length;

 function create({width=728,height=250,count=60,random=Math.random}={}){
  if(!Number.isFinite(width)||width<=0||!Number.isFinite(height)||height<=0)
   throw new RangeError('El conductor necesita dimensiones positivas y finitas.');
  if(!Number.isInteger(count)||count<1)
   throw new RangeError('El número de electrones debe ser un entero positivo.');
  if(typeof random!=='function')throw new TypeError('random debe ser una función.');
  const thermal=[];
  const direction=()=>{const angle=random()*2*Math.PI;return {x:thermalSpeed*Math.cos(angle),y:thermalSpeed*Math.sin(angle)};};
  // Particle objects keep their identity so the view can retain its SVG nodes.
  // vx/vy always describe total velocity, including the field-induced drift.
  const particles=Array.from({length:count},()=>{
   const x=random()*width,y=random()*height,v=direction();thermal.push(v);
   return {x,y,vx:v.x,vy:v.y};
  });

  function step(dt,field=0){
   if(!Number.isFinite(dt)||dt<=0)return particles;
   const elapsed=Math.min(dt,.1),steps=Math.ceil(elapsed/maxStep),h=elapsed/steps;
   const drift=-driftSpeed*(Number.isFinite(field)?Math.sign(field):0);
   const scatterProbability=1-Math.exp(-h/scatteringTime);
   for(let frame=0;frame<steps;frame++){
    for(let i=0;i<particles.length;i++){
     const p=particles[i];
     if(random()<scatterProbability)thermal[i]=direction();
     const v=thermal[i];
     p.vx=v.x+drift;p.vy=v.y;
     // The repeated horizontal window shows part of a continuous conductor;
     // particles leaving one side re-enter from the other side.
     p.x=wrap(p.x+p.vx*h,width);
     const unfolded=p.y+p.vy*h,folded=wrap(unfolded,2*height);
     p.y=folded<=height?folded:2*height-folded;
     if(folded>height){v.y=-v.y;p.vy=v.y;}
    }
   }
   return particles;
  }
  return {particles,step};
 }

 window.ElectronDriftModel={create};
})();
