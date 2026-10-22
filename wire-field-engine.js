/* Campo exterior de un conductor rectilíneo muy largo, en el vacío. */
(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.WireFieldEngine=api;})(typeof window!=='undefined'?window:globalThis,function(){
'use strict';
const MU0=4*Math.PI*1e-7;
const clamp=(n,a,b)=>Math.max(a,Math.min(b,n));
function field(current,radiusCm,angleDeg=0,earth=false){
 if(!Number.isFinite(current)||!Number.isFinite(radiusCm)||radiusCm<=0||!Number.isFinite(angleDeg))throw new RangeError('I y ángulo deben ser finitos; r debe ser positiva.');
 const a=angleDeg*Math.PI/180,r=radiusCm/100,b=MU0*current/(2*Math.PI*r),bx=-b*Math.sin(a),by=b*Math.cos(a),earthY=earth?25e-6:0;
 const totalX=bx,totalY=by+earthY,total=Math.hypot(totalX,totalY);
 return {radiusM:r,tesla:Math.abs(b),microtesla:Math.abs(b)*1e6,bx,by,bz:0,x:r*Math.cos(a),y:r*Math.sin(a),totalX,totalY,total,compassAngle:total>1e-14?Math.atan2(totalX,totalY):null};
}
function basis(view,azimuth=-70,elevation=24){
 if(view==='xy')return {right:[1,0,0],up:[0,1,0],normal:[0,0,1]};
 if(view==='xz')return {right:[1,0,0],up:[0,0,1],normal:[0,-1,0]};
 if(view==='yz')return {right:[0,1,0],up:[0,0,1],normal:[1,0,0]};
 const a=azimuth*Math.PI/180,e=elevation*Math.PI/180;
 return {right:[-Math.sin(a),Math.cos(a),0],up:[-Math.cos(a)*Math.sin(e),-Math.sin(a)*Math.sin(e),Math.cos(e)],normal:[Math.cos(a)*Math.cos(e),Math.sin(a)*Math.cos(e),Math.sin(e)]};
}
const dot=(a,b)=>a.reduce((s,v,i)=>s+v*b[i],0);
function project(point,view,azimuth=-70,elevation=24,zoom=1){
 const b=basis(view,azimuth,elevation),depth=dot(point,b.normal),perspective=view==='3d'?5/(5-depth):1,scale=119*zoom*perspective;
 return {x:320+dot(point,b.right)*scale,y:285-dot(point,b.up)*scale,depth,scale};
}
function longitudinalSymbol(current,side){if(current===0||side===0)return 'none';return current*side>0?'into':'out';}
return Object.freeze({MU0,clamp,field,basis,project,longitudinalSymbol});
});
