/* Tres demostraciones visuales: reproducción independiente, sin retos ni puntuación. */
(function(global){
 'use strict';
 const KINDS=['rope','sound','water'];
 const DESCRIPTIONS={
  rope:{title:'Pulso en una cuerda tensa',caption:'Al mover la mano hacia arriba y abajo se genera un pulso que avanza por la cuerda tensa, conservando aproximadamente su forma. El punto P (amarillo) sube y baja perpendicularmente al avance y vuelve al equilibrio, sin viajar con el pulso.',stillTime:3.5},
  sound:{title:'El sonido de un parlante',caption:'La vibración del parlante produce compresiones y rarefacciones que se propagan por el aire. Las partículas se mueven de ida y vuelta cerca de su posición inicial. Movimiento ralentizado.',stillTime:4.2},
  water:{title:'Una piedra cae al agua',caption:'La caída perturba la superficie y aparecen frentes de onda que se expanden. El marcador flota y oscila cerca de su lugar. Representación cualitativa de la propagación superficial.',stillTime:3.1}
 };
 const document=global.document;
 let instances=[],frame=0,visibilityCleanup=null,sequence=0;
 const finite=value=>Number.isFinite(Number(value))?Math.max(0,Number(value)):0;
 const clamp=(value,min,max)=>Math.min(max,Math.max(min,value));
 const phase=(time,period)=>finite(time)%period;
 const esc=value=>String(value??'').replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
 const n=value=>Number(value).toFixed(3);
 const smooth=value=>{const x=clamp(value,0,1);return x*x*(3-2*x);};
 function pulse(t){return t>0&&t<1.25?Math.sin(Math.PI*t/1.25)**2:0;}
 function ropeSample(time){
  const t=phase(time,9),speed=1,sourceDisplacement=.82*pulse(t);
  const points=Array.from({length:211},(_,i)=>{const x0=i/30;return {x0,x:x0,y:.82*pulse(t-x0/speed)};});
  const x0=3,displacement=.82*pulse(t-x0/speed);
  return {time:t,cycleDuration:9,speed,sourceDisplacement,front:Math.min(7,Math.max(0,speed*t)),points,marker:{x0,x:x0,y0:0,y:displacement,displacement}};
 }
 const SOUND={start:184,end:820,speed:124,frequency:.75,amplitude:10,onDuration:6.2};
 function soundDisplacement(x0,time){
  const tau=time-(x0-SOUND.start)/SOUND.speed;
  if(tau<=0||tau>=SOUND.onDuration)return 0;
  const envelope=smooth(tau/.35)*smooth((SOUND.onDuration-tau)/.35);
  return SOUND.amplitude*envelope*Math.sin(2*Math.PI*SOUND.frequency*tau);
 }
 function soundSample(time){
  const t=phase(time,13),particles=[];
  for(let column=0;column<54;column++)for(let row=0;row<7;row++){
   const x0=SOUND.start+column*12,y0=139+row*20,displacement=soundDisplacement(x0,t),tau=t-(x0-SOUND.start)/SOUND.speed;
   particles.push({x0,x:x0+displacement,y0,y:y0,displacement,active:tau>0&&tau<SOUND.onDuration,column,row});
  }
  const compressions=[],rarefactions=[],period=1/SOUND.frequency;
  for(let index=0;index<=6;index++){
   for(const [delay,list] of [[index*period,compressions],[(index+.5)*period,rarefactions]]){
    const x=SOUND.start+SOUND.speed*(t-delay);
    if(delay>.35&&delay<SOUND.onDuration-.35&&x>SOUND.start+15&&x<SOUND.end-15)list.push(x);
   }
  }
  const marker=particles.find(p=>p.column===26&&p.row===3);
  return {time:t,cycleDuration:13,speed:SOUND.speed,frequency:SOUND.frequency,sourceOnDuration:SOUND.onDuration,sourceDisplacement:soundDisplacement(SOUND.start,t),front:clamp(SOUND.start+SOUND.speed*t,SOUND.start,SOUND.end),particles,compressions,rarefactions,marker:{...marker}};
 }
 function waterSample(time){
  const t=phase(time,7.2),impactTime=1.05,speed=85,age=t-impactTime,rings=[];
  for(const delay of [0,.28,.56,.84]){
   const ringAge=age-delay,radius=speed*ringAge;
   if(ringAge>0&&radius<285)rings.push({age:ringAge,emissionDelay:delay,radius,opacity:(1/(1+.009*radius))*(1-smooth((radius-205)/80))});
  }
  const floatRadius=145,arrival=impactTime+floatRadius/speed,localAge=t-arrival;
  const displacement=localAge>0&&localAge<1.6?5*Math.cos(2*Math.PI*localAge/.28)*Math.sin(Math.PI*localAge/1.6)**2:0;
  const y=t<impactTime?46+(210-46)*(t/impactTime)**2:210+38*(1-Math.exp(-Math.max(0,age)*3));
  return {time:t,cycleDuration:7.2,speed,impactTime,stone:{x:450,y,visible:t<impactTime+1.1,submerged:t>=impactTime,opacity:t<impactTime?1:clamp(1-age/1.1,0,1)},rings,float:{x0:450+floatRadius,x:450+floatRadius,y0:210,y:210-displacement,displacement,arrival,radius:floatRadius},splashAge:age,period:.28};
 }
 function sample(kind,time){return kind==='rope'?ropeSample(time):kind==='sound'?soundSample(time):kind==='water'?waterSample(time):null;}
 function line(x1,y1,x2,y2,color,width=2,extra=''){return `<path d="M${n(x1)} ${n(y1)}L${n(x2)} ${n(y2)}" fill="none" stroke="${color}" stroke-width="${width}" ${extra}/>`;}
 function arrow(x1,y1,x2,y2,color='#60dbc9',both=false){
  const angle=Math.atan2(y2-y1,x2-x1),head=(x,y,a)=>`<path d="M${n(x)} ${n(y)}l${n(-14*Math.cos(a)+7*Math.sin(a))} ${n(-14*Math.sin(a)-7*Math.cos(a))}l${n(-14*Math.sin(a))} ${n(14*Math.cos(a))}Z" fill="${color}"/>`;
  return line(x1,y1,x2,y2,color,4)+head(x2,y2,angle)+(both?head(x1,y1,angle+Math.PI):'');
 }
 function label(x,y,text,color='#dcecf5',size=24,extra=''){return `<text class="wave-example-detail-label" x="${x}" y="${y}" fill="${color}" font-size="${size}" text-anchor="middle" ${extra}>${esc(text)}</text>`;}
 function defs(id){return `<defs><linearGradient id="${id}-bg" x2="1" y2="1"><stop stop-color="#102b44"/><stop offset="1" stop-color="#194c5e"/></linearGradient><linearGradient id="${id}-rope" x2="0" y2="1"><stop stop-color="#ffe3a3"/><stop offset=".45" stop-color="#e6ad67"/><stop offset="1" stop-color="#9b5e2e"/></linearGradient><radialGradient id="${id}-bead" cx=".35" cy=".25"><stop stop-color="#fff9cc"/><stop offset=".45" stop-color="#ffce62"/><stop offset="1" stop-color="#b77b26"/></radialGradient><linearGradient id="${id}-metal"><stop stop-color="#657e91"/><stop offset=".4" stop-color="#d8e9f3"/><stop offset=".65" stop-color="#a2bdcf"/><stop offset="1" stop-color="#405c72"/></linearGradient><radialGradient id="${id}-water" cx=".4" cy=".3"><stop stop-color="#408da6"/><stop offset=".6" stop-color="#226b8b"/><stop offset="1" stop-color="#124564"/></radialGradient><linearGradient id="${id}-glass" x2="0" y2="1"><stop stop-color="#d5efff" stop-opacity=".2"/><stop offset=".65" stop-color="#87c8e6" stop-opacity=".07"/><stop offset="1" stop-color="#a3d4e9" stop-opacity=".28"/></linearGradient><clipPath id="${id}-waterclip"><ellipse cx="450" cy="210" rx="300" ry="92"/></clipPath><clipPath id="${id}-airclip"><rect x="174" y="117" width="666" height="164" rx="15"/></clipPath></defs>`;}
 function ropeDefs(id){return `<defs>
  <linearGradient id="${id}-studio" x1="0" y1="0" x2=".8" y2="1"><stop stop-color="#f6f5ee"/><stop offset=".55" stop-color="#e3e9e5"/><stop offset="1" stop-color="#c9d6d2"/></linearGradient>
  <radialGradient id="${id}-light" cx=".26" cy=".05" r=".9"><stop stop-color="#fff" stop-opacity=".82"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient>
  <linearGradient id="${id}-bench" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#c0b39c"/><stop offset="1" stop-color="#8d8578"/></linearGradient>
  <linearGradient id="${id}-skin" x1="0" y1="0" x2=".35" y2="1"><stop stop-color="#ecc3a2"/><stop offset=".32" stop-color="#d9a57f"/><stop offset=".72" stop-color="#bf805b"/><stop offset="1" stop-color="#a86b4d"/></linearGradient>
  <linearGradient id="${id}-thumb" x1="0" y1="0" x2=".4" y2="1"><stop stop-color="#f1c7a6"/><stop offset=".5" stop-color="#dca883"/><stop offset="1" stop-color="#b67b56"/></linearGradient>
  <linearGradient id="${id}-nail" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#eed1ba"/><stop offset="1" stop-color="#d4a98b"/></linearGradient>
  <linearGradient id="${id}-sleeve" x1="0" y1="0" x2=".2" y2="1"><stop stop-color="#426779"/><stop offset=".5" stop-color="#234658"/><stop offset="1" stop-color="#132f40"/></linearGradient>
  <radialGradient id="${id}-gold" cx=".3" cy=".23"><stop stop-color="#fff8b6"/><stop offset=".35" stop-color="#f2ce57"/><stop offset=".8" stop-color="#bf8623"/><stop offset="1" stop-color="#8e5f1c"/></radialGradient>
 </defs>`;}
 // The hand and its grip move with the driven endpoint; the braid is fixed to material coordinates.
 function ropeHand(id,offset,front=false){
  if(front)return `<g transform="translate(0 ${n(offset)})"><path d="M111 214C121 209 135 214 145 222L159 232C165 237 161 247 154 248C147 249 141 241 133 236L116 230C108 227 105 218 111 214Z" fill="url(#${id}-thumb)" stroke="#a46c4f" stroke-width="1.1"/><path d="M149 227C153 226 160 231 161 235L158 239C154 241 148 235 147 232Z" fill="url(#${id}-nail)" stroke="#bc8a6b" stroke-width=".8"/><path d="M116 215C127 213 139 220 146 225M117 229L127 233" fill="none" stroke="#f4cfb2" stroke-width="1.6" opacity=".65"/><path d="M138 226L136 230M140 227L139 232" stroke="#b37a58" stroke-width=".75" opacity=".75"/></g>`;
  return `<g transform="translate(0 ${n(offset)})"><path d="M-20 203C10 200 38 204 62 209L92 207C103 197 118 193 131 198L145 208C156 216 164 225 161 232C158 238 150 235 143 230C151 242 157 252 150 259C145 265 138 261 134 256C136 266 129 273 121 270C117 269 112 265 110 263C108 273 97 274 89 269L65 255C36 253 8 257-20 261Z" fill="url(#${id}-skin)" stroke="#a06c50" stroke-width="1.15"/>
   <path d="M54 214C72 220 83 225 89 239M69 248C82 246 91 247 101 253M121 240C126 246 132 252 134 256M103 245C106 253 111 260 118 263M90 239C95 239 101 243 103 246M133 222C140 226 144 230 146 234" fill="none" stroke="#ab7252" stroke-width="1.2" stroke-linecap="round" opacity=".65"/>
   <path d="M79 213C91 216 102 210 110 205M102 204C115 198 123 199 129 203M70 252C77 257 88 262 93 263" fill="none" stroke="#f3c9a7" stroke-width="2.1" stroke-linecap="round" opacity=".55"/>
   <path d="M-20 198L46 202C53 215 57 241 54 259L-20 271Z" fill="url(#${id}-sleeve)" stroke="#254555" stroke-width="1.2"/><path d="M43 203C49 223 52 242 49 260M34 203C41 223 45 245 41 263" fill="none" stroke="#63808a" stroke-width="1.1" opacity=".75"/>
  </g>`;
 }
 function ropeScene(s,id){
  const px=x=>159+x*112,py=y=>237-y*90;
  const points=s.points.map(p=>({x:px(p.x),y:py(p.y),x0:p.x0}));
  const path=points.map((p,i)=>(i?'L':'M')+n(p.x)+' '+n(p.y)).join('');
  const sourceY=py(s.sourceDisplacement),mx=px(s.marker.x),my=py(s.marker.y),offset=sourceY-237;
  let fibers='';
  // Short surface hatches follow the local normal and share each material point's displacement.
  for(let i=1;i<points.length-1;i+=2){
   const p=points[i],before=points[i-1],after=points[i+1],dx=after.x-before.x,dy=after.y-before.y,len=Math.hypot(dx,dy),tx=dx/len,ty=dy/len,nx=-ty,ny=tx;
   const stitch=(a,b,side,color,width)=>line(p.x+tx*a+nx*side,p.y+ty*a+ny*side,p.x+tx*b-nx*side,p.y+ty*b-ny*side,color,width,'stroke-linecap="round"');
   fibers+=stitch(-3.4,2.4,3.6,'#9d825b',1.15)+stitch(-2.4,3.3,2.9,'#f3e5c3',.85);
  }
  return ropeDefs(id)+`<rect width="900" height="410" fill="url(#${id}-studio)"/><rect width="900" height="410" fill="url(#${id}-light)"/>
   <path d="M0 329L900 314V410H0Z" fill="url(#${id}-bench)" opacity=".38"/><path d="M0 330L900 315" fill="none" stroke="#f8f7eb" stroke-width="3" opacity=".7"/><path d="M0 347L900 331" fill="none" stroke="#7e8074" stroke-opacity=".12"/>
   <ellipse cx="510" cy="327" rx="405" ry="13" fill="#5b6b64" opacity=".08"/>
   <path d="${path}" transform="translate(2 17)" fill="none" stroke="#5c6b60" stroke-width="15" opacity=".035" stroke-linecap="round"/><path d="${path}" transform="translate(2 12)" fill="none" stroke="#5c6b60" stroke-width="9" opacity=".06" stroke-linecap="round"/>`+
   line(152,237,950,237,'#697f7a',1.1,'stroke-dasharray="4 8" opacity=".3"')+
   ropeHand(id,offset)+
   `<path d="${path}" fill="none" stroke="#68583f" stroke-width="11" stroke-linecap="round"/><path d="${path}" fill="none" stroke="#af966b" stroke-width="9.6" stroke-linecap="round"/><path d="${path}" transform="translate(0 -1.5)" fill="none" stroke="#d5c398" stroke-width="6.7" stroke-linecap="round"/><path d="${path}" transform="translate(0 -3.1)" fill="none" stroke="#f0e3c1" stroke-width="1.2" stroke-linecap="round" opacity=".8"/>`+fibers+ropeHand(id,offset,true)+
   line(mx,141,mx,296,'#b18331',1.2,'stroke-dasharray="4 6" opacity=".45"')+`<circle cx="${n(mx)}" cy="237" r="8" fill="none" stroke="#8b7748" stroke-opacity=".5" stroke-width="1.5"/><ellipse cx="${n(mx+1)}" cy="${n(my+4)}" rx="11" ry="8" fill="#5f593d" opacity=".2"/><circle cx="${n(mx)}" cy="${n(my)}" r="10" fill="url(#${id}-gold)" stroke="#99712a" stroke-width="1"/><circle cx="${n(mx-3)}" cy="${n(my-3.5)}" r="2" fill="#fff8c4" opacity=".85"/><text x="${n(mx-22)}" y="${n(my-19)}" fill="#805d21" font-size="23" font-weight="750" text-anchor="middle">P</text>`+
   arrow(579,97,764,97,'#187e83')+label(670,69,'El pulso avanza','#275559',22)+
   arrow(mx+34,172,mx+34,275,'#a47b26',true)+label(480,373,'P sube y baja; la cuerda no viaja con el pulso','#3f574f',22)+label(100,306,'Mano','#415e61',18);
 }
 function soundScene(s,id){
  const shift=s.sourceDisplacement;
  let body=`<rect x="40" y="139" width="55" height="132" rx="12" fill="#385568" stroke="#8aabba" stroke-width="2"/><path d="M95 154L${n(147+shift)} 129V281L95 256Z" fill="url(#${id}-metal)" stroke="#b4d2e1" stroke-width="2"/><ellipse cx="${n(147+shift)}" cy="205" rx="18" ry="76" fill="#10293e" stroke="#90b4c9" stroke-width="4"/><ellipse cx="${n(148+shift)}" cy="205" rx="10" ry="29" fill="#5d829a"/>`;
  body+=`<rect x="176" y="119" width="664" height="160" rx="16" fill="#6db0c0" fill-opacity=".055" stroke="#5f93a8" stroke-opacity=".3"/><g clip-path="url(#${id}-airclip)">`;
  for(const x of s.compressions)body+=`<rect x="${n(x-22)}" y="120" width="44" height="159" rx="15" fill="#53cfbd" fill-opacity=".09"/>`;
  for(const p of s.particles)body+=`<circle cx="${n(p.x)}" cy="${p.y}" r="3.15" fill="#a9d6e4" fill-opacity="${p.active?'.9':'.45'}"/>`;
  body+=line(s.front,120,s.front,279,'#64e0c9',1.5,'opacity=".45"')+'</g>';
  const compression=[...s.compressions].sort((a,b)=>Math.abs(a-460)-Math.abs(b-460))[0];
  const rarefaction=[...s.rarefactions].sort((a,b)=>Math.abs(a-640)-Math.abs(b-640))[0];
  if(compression!==undefined)body+=label(compression,102,'Compresión','#90e8d6',21);
  if(rarefaction!==undefined)body+=label(rarefaction,306,'Rarefacción','#c4dfe9',21);
  const m=s.marker;
  body+=`<circle cx="${m.x0}" cy="${m.y0}" r="9" fill="none" stroke="#ffdb82" stroke-opacity=".5" stroke-width="1.6"/><circle cx="${n(m.x)}" cy="${m.y}" r="6.6" fill="url(#${id}-bead)" stroke="#ffeab0"/>`;
  return label(542,46,'El sonido se propaga')+arrow(464,66,664,66)+body+arrow(m.x0-25,331,m.x0+25,331,'#f4cc76',true)+label(m.x0,370,'La partícula marcada oscila aquí','#f5d58c',23);
 }
 function waterScene(s,id){
  let body=`<ellipse cx="450" cy="352" rx="276" ry="23" fill="#061b2c" fill-opacity=".36"/><path d="M132 210C145 322 230 359 450 359S755 322 768 210" fill="url(#${id}-glass)" stroke="#a8cede" stroke-opacity=".55" stroke-width="3"/><ellipse cx="450" cy="210" rx="319" ry="104" fill="#c8e5ef" fill-opacity=".14" stroke="#a8d4e4" stroke-width="4"/><ellipse cx="450" cy="210" rx="300" ry="92" fill="url(#${id}-water)" stroke="#79bdcf" stroke-width="2"/><g clip-path="url(#${id}-waterclip)">`;
  for(const ring of s.rings){body+=`<ellipse cx="450" cy="210" rx="${n(ring.radius)}" ry="${n(ring.radius*.305)}" fill="none" stroke="#9debf0" stroke-opacity="${n(ring.opacity)}" stroke-width="3.2"/><ellipse cx="450" cy="213" rx="${n(Math.max(0,ring.radius-5))}" ry="${n(Math.max(0,ring.radius-5)*.305)}" fill="none" stroke="#0b3f5f" stroke-opacity="${n(ring.opacity*.6)}" stroke-width="2"/>`;}
  if(s.splashAge>0&&s.splashAge<.6){
   const u=s.splashAge/.6;for(const sign of [-1,1])for(let i=0;i<3;i++){const x=450+sign*(18+18*i)*u,y=208-90*Math.sin(Math.PI*u)*(1-i*.15);body+=`<circle cx="${n(x)}" cy="${n(y)}" r="${n(4-1.7*u)}" fill="#b8f2f4" opacity="${n(1-u)}"/>`;}
  }
  body+='</g>';
  const marker=s.float;
  body+=`<ellipse cx="${marker.x}" cy="${n(marker.y+8)}" rx="18" ry="5" fill="#082c43" fill-opacity=".35"/><path d="M${marker.x-11} ${n(marker.y-5)}q11-10 22 0v12q-11 8-22 0Z" fill="url(#${id}-rope)" stroke="#ffe4aa" stroke-width="1.3"/><ellipse cx="${marker.x}" cy="${n(marker.y-5)}" rx="11" ry="5" fill="#f4dca2"/>`;
  if(s.stone.visible)body+=`<path d="M438 ${n(s.stone.y-10)}q9-12 20-4l6 12q-4 14-18 13l-12-8Z" fill="#9aabb2" stroke="#d4e0e3" stroke-width="2" opacity="${n(s.stone.opacity)}"/><path d="M441 ${n(s.stone.y-10)}l9-3 6 6" fill="none" stroke="#e5ecee" stroke-width="2" opacity="${n(s.stone.opacity*.7)}"/>`;
  body+=`<path d="M132 210C148 272 279 313 450 313S752 272 768 210" fill="none" stroke="#d8edf4" stroke-opacity=".5" stroke-width="3"/>`;
  return label(450,40,'La piedra perturba la superficie')+body+label(450,389,'Los frentes se expanden; el marcador oscila localmente','#d4e8ed',22);
 }
 function renderScene(kind,time,id='wave-example'){
  if(!KINDS.includes(kind))return '';
  id=String(id).replace(/[^a-zA-Z0-9_-]/g,'-');
  const s=sample(kind,time),body=kind==='rope'?ropeScene(s,id):kind==='sound'?soundScene(s,id):waterScene(s,id);
  return `<svg class="wave-example-svg" viewBox="0 0 900 410" width="900" height="410" role="img" aria-label="${esc(DESCRIPTIONS[kind].title)}. ${esc(DESCRIPTIONS[kind].caption)}" xmlns="http://www.w3.org/2000/svg">${defs(id)}<rect width="900" height="410" fill="url(#${id}-bg)"/>${body}</svg>`;
 }
 function update(a){
  if(a.disposed)return;
  a.host.querySelector('[data-wave-example-scene]').innerHTML=renderScene(a.kind,a.time,a.id);
  const button=a.host.querySelector('[data-wave-example-action="play"]');
  button.textContent=a.playing?'Ⅱ Pausar':'▶ Reproducir';button.setAttribute('aria-pressed',String(a.playing));
  button.setAttribute('aria-label',(a.playing?'Pausar':'Reproducir')+' · '+DESCRIPTIONS[a.kind].title);
 }
 function active(a){return !a.disposed&&a.playing&&a.visible&&!document?.hidden&&a.host.isConnected!==false;}
 function schedule(){if(!frame&&instances.some(active))frame=global.requestAnimationFrame(tick);}
 function tick(now){
  frame=0;
  for(const a of instances){
   if(!active(a)){a.last=null;a.pending=0;continue;}
   if(a.last!==null)a.pending+=Math.min(.1,Math.max(0,(now-a.last)/1000));
   a.last=now;
   if(now-a.drawAt>=1000/30-1){a.time+=a.pending;a.pending=0;a.drawAt=now;update(a);}
  }
  schedule();
 }
 function destroy(){
  if(frame){global.cancelAnimationFrame(frame);frame=0;}
  visibilityCleanup?.();visibilityCleanup=null;
  for(const a of instances){a.disposed=true;a.observer?.disconnect();for(const cleanup of a.cleanups)cleanup();}
  instances=[];
 }
 function mount(root){
  destroy();
  const placeholders=root?.matches?.('[data-wave-animation]')?[root]:Array.from(root?.querySelectorAll?.('[data-wave-animation]')||[]);
  const used=new Set(),reduced=!!global.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  for(const placeholder of placeholders){
   const kind=placeholder.dataset.waveAnimation;if(!KINDS.includes(kind)||used.has(kind))continue;used.add(kind);
   const d=DESCRIPTIONS[kind],id='wave-example-'+kind+'-'+(++sequence),sectionId='wave-animation-'+kind;
   placeholder.innerHTML=`<section class="wave-example-animation" id="${sectionId}" data-activity-fullscreen aria-labelledby="${id}-title"><header class="wave-example-header"><h3 id="${id}-title">${d.title}</h3></header><div class="wave-example-stage" data-wave-example-scene></div><p class="wave-example-caption">${d.caption}</p><div class="wave-example-controls"><button type="button" data-wave-example-action="play" aria-pressed="${!reduced}"></button><button type="button" data-wave-example-action="restart" aria-label="Reiniciar · ${d.title}">↺ Reiniciar</button><span class="wave-example-motion-note">${reduced?'Pulsa Reproducir para ver el movimiento.':'La animación se repite automáticamente.'}</span></div></section>`;
   const host=placeholder.firstElementChild;
   const a={kind,id,host,time:reduced?d.stillTime:0,playing:!reduced,visible:true,last:null,pending:0,drawAt:-Infinity,disposed:false,cleanups:[]};instances.push(a);
   const click=event=>{
    const button=event.target.closest?.('button'),action=button?.dataset.waveExampleAction;
    if(!action||a.disposed)return;
    if(action==='play')a.playing=!a.playing;
    else if(action==='restart')a.time=0;
    else return;
    a.last=null;a.pending=0;update(a);schedule();
   };
   host.addEventListener('click',click);a.cleanups.push(()=>host.removeEventListener('click',click));
   if(typeof global.IntersectionObserver==='function'){
    a.observer=new global.IntersectionObserver(entries=>{if(a.disposed)return;a.visible=entries.some(entry=>entry.isIntersecting);a.last=null;a.pending=0;schedule();},{threshold:0});a.observer.observe(host);
   }
   update(a);
  }
  if(instances.length&&document?.addEventListener){
   const visibility=()=>{for(const a of instances){a.last=null;a.pending=0;}if(document.hidden&&frame){global.cancelAnimationFrame(frame);frame=0;}else schedule();};
   document.addEventListener('visibilitychange',visibility);visibilityCleanup=()=>document.removeEventListener('visibilitychange',visibility);
  }
  schedule();
 }
 function getState(){return instances.map(a=>({kind:a.kind,time:a.time,playing:a.playing,visible:a.visible}));}
 global.WaveExampleAnimations=Object.freeze({mount,destroy,getState,sample,renderScene,kinds:Object.freeze([...KINDS])});
})(window);
