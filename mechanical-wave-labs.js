(function(global){
 'use strict';
 const TAU=2*Math.PI,INK='#c9deeb',TEAL='#53dfc6',CORAL='#ff8e93',GOLD='#ffd48a',BLUE='#8dbdff';
 const DESCRIPTIONS={
  propagation:{title:'La perturbación viaja; el medio oscila',intro:'Sigue la cuenta amarilla y distingue su movimiento del avance de la onda.',note:'La cuenta conserva su posición horizontal. La cuerda transmite una perturbación sin que sus puntos viajen de un extremo al otro.',prediction:'Predice: ¿la cuenta amarilla llega al extremo derecho o permanece cerca de su posición de equilibrio?',defaults:{mode:'periodic',A:.65,f:.65}},
  types:{title:'Dos maneras de oscilar',intro:'Compara la oscilación transversal con las compresiones de una onda longitudinal.',note:'La flecha dorada indica la propagación; la flecha junto a la partícula indica su oscilación. Los puntos claros son posiciones de equilibrio.',prediction:'Predice: ¿qué cambia al pasar de transversal a longitudinal: la dirección del avance o la dirección de oscilación?',defaults:{type:'transverse',A:.55,f:.6}},
  parameters:{title:'Mide la forma y el ritmo de la onda',intro:'Cambia amplitud, longitud de onda y frecuencia, y observa sus relaciones.',note:'A se mide desde el equilibrio; λ une dos puntos consecutivos en la misma fase. La rapidez mostrada cumple v = λf.',prediction:'Predice: si conservas λ y duplicas f, ¿cómo cambia la rapidez de propagación?',defaults:{A:.6,lambda:2,f:.6}},
  equation:{title:'Del gráfico a la función de onda',intro:'Invierte la propagación, cambia la fase y observa un punto fijo de la cuerda.',note:'El punto P permanece en x = 3 m. La lectura y(P,t) describe a esa partícula; el signo temporal determina el sentido de propagación.',prediction:'Predice: ¿cambia la rapidez al variar solamente la fase inicial?',defaults:{A:.55,lambda:2.5,f:.5,direction:1,phase:0}},
  string:{title:'La tensión y la masa cambian la rapidez',intro:'Compara el avance de un pulso en cuerdas ideales con distinta tensión y densidad lineal.',note:'Se mantiene la amplitud del pulso. La rapidez depende de la tensión y de μ, no de la altura dibujada del pulso. Tiempo ralentizado ×20.',prediction:'Predice: para duplicar la rapidez manteniendo μ, ¿basta duplicar la tensión?',defaults:{tension:40,mu:.1}},
  reflection:{title:'¿El pulso regresa invertido?',intro:'Compara la reflexión en un extremo fijo y en un extremo libre.',note:'La curva verde es la suma de los pulsos incidente y reflejado. En el extremo fijo el desplazamiento total siempre es cero; en el libre no se impone esa condición.',prediction:'Predice: al llegar una cresta, ¿vuelve una cresta o un valle? Prueba ambos extremos.',defaults:{boundary:'fixed',speed:1.5,A:.8}},
  superposition:{title:'Se encuentran, se suman y continúan',intro:'Observa los dos pulsos por separado y su desplazamiento resultante.',note:'Se suman los desplazamientos en cada posición. Después de encontrarse, cada pulso continúa con su forma y sentido originales en este modelo lineal.',prediction:'Predice: cuando dos pulsos opuestos se cancelan por un instante, ¿desaparecen definitivamente?',defaults:{sign:1,ratio:1,speed:1}},
  standing:{title:'Una cuerda con nodos que permanecen quietos',intro:'Elige un modo y localiza nodos y vientres entre dos extremos fijos.',note:'Los puntos dorados son nodos y permanecen inmóviles. Los vientres oscilan entre ellos. Se muestra un modo puro; tiempo ralentizado ×20.',prediction:'Predice: al pasar del primer al tercer armónico, ¿cuántos vientres y cuántos nodos aparecen?',defaults:{n:2,L:3,v:12,components:false}},
  sound:{title:'Sonido: compresiones y expansión',intro:'Relaciona la frecuencia con el tono y la distancia con la intensidad de una fuente ideal.',note:'Las partículas del fluido oscilan alrededor de posiciones fijas. El dibujo está ralentizado ×200; el tono opcional suena a su frecuencia real. La intensidad usa propagación esférica ideal.',prediction:'Predice: al duplicar la distancia, ¿la intensidad queda a la mitad o a la cuarta parte?',defaults:{frequency:220,distance:2,power:10}},
  wavefronts:{title:'Las ondas también cambian de rumbo',intro:'Explora frentes de onda en reflexión, refracción y difracción.',note:'Los rayos son perpendiculares a los frentes. Los ángulos se miden respecto de la normal. En difracción se muestra una representación cualitativa, sin calcular amplitudes.',prediction:'Predice: al pasar a un medio más lento, ¿cambia la frecuencia o cambia la longitud de onda?',defaults:{mode:'reflection',angle:35,v2:1.2,aperture:1}},
  doppler:{title:'Una fuente móvil cambia la frecuencia recibida',intro:'Observa cómo se acumulan los frentes delante de una fuente que se acerca.',note:'Cada círculo conserva el centro donde fue emitido. El observador está fijo a la derecha; vₛ > 0 significa que la fuente se acerca. Movimiento subsónico; tiempo ralentizado ×200.',prediction:'Predice: si la fuente se aleja, ¿los frentes llegan más juntos o más separados?',defaults:{frequency:300,sourceVelocity:60}}
 };
 let instances=[],frame=0,sequence=0;
 const memory=new Map();
 const E=()=>global.MechanicalWaveEngine;
 const number=(n,d=2)=>Number(n).toLocaleString('es-PE',{maximumFractionDigits:d});
 const escape=s=>String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('"','&quot;');
 function text(x,y,s,color=INK,size=22,anchor='start'){return `<text x="${x}" y="${y}" fill="${color}" font-size="${size}" text-anchor="${anchor}">${escape(s)}</text>`;}
 function line(x1,y1,x2,y2,color=INK,width=2,extra=''){return `<path d="M${x1} ${y1}L${x2} ${y2}" fill="none" stroke="${color}" stroke-width="${width}" ${extra}/>`;}
 function arrow(x1,y1,x2,y2,color=GOLD,width=4){const a=Math.atan2(y2-y1,x2-x1),l=13,w=6;return line(x1,y1,x2,y2,color,width)+`<path d="M${x2} ${y2}L${x2-l*Math.cos(a)+w*Math.sin(a)} ${y2-l*Math.sin(a)-w*Math.cos(a)}L${x2-l*Math.cos(a)-w*Math.sin(a)} ${y2-l*Math.sin(a)+w*Math.cos(a)}Z" fill="${color}"/>`;}
 function dot(x,y,r=6,fill=TEAL,extra=''){return `<circle cx="${x}" cy="${y}" r="${r}" fill="${fill}" ${extra}/>`;}
 function pathFor(fn,scale=75,base=178,start=0,end=6){let d='';for(let i=0;i<=180;i++){const x=start+(end-start)*i/180,y=fn(x);d+=(i?'L':'M')+(48+624*(x-start)/(end-start)).toFixed(2)+' '+(base-y*scale).toFixed(2);}return d;}
 function curve(d,color=TEAL,width=4,extra=''){return `<path d="${d}" fill="none" stroke="${color}" stroke-width="${width}" stroke-linecap="round" stroke-linejoin="round" ${extra}/>`;}
 function grid(){let s='';for(let x=48;x<=672;x+=52)s+=line(x,38,x,290,'#a5cada',1,'opacity=".11"');for(let y=58;y<=278;y+=44)s+=line(35,y,687,y,'#a5cada',1,'opacity=".11"');return s+line(48,178,672,178,'#a5cada',1.5,'stroke-dasharray="6 7" opacity=".5"');}
 function defs(id){return `<defs><linearGradient id="${id}-rope" x2="0" y2="1"><stop stop-color="#fff0bc"/><stop offset=".4" stop-color="#dba669"/><stop offset="1" stop-color="#774621"/></linearGradient><radialGradient id="${id}-bead"><stop offset="0" stop-color="#fff2bd"/><stop offset=".5" stop-color="#ffc85d"/><stop offset="1" stop-color="#c0782e"/></radialGradient><linearGradient id="${id}-metal" x2="1" y2="0"><stop stop-color="#607d91"/><stop offset=".45" stop-color="#e2f2fb"/><stop offset="1" stop-color="#637e92"/></linearGradient><clipPath id="${id}-plot"><rect x="20" y="0" width="680" height="340" rx="8"/></clipPath><clipPath id="${id}-upper"><rect x="24" y="24" width="672" height="166"/></clipPath><clipPath id="${id}-lower"><rect x="24" y="190" width="672" height="128"/></clipPath></defs>`;}
 function range(name,title,min,max,step,value,unit='',digits=2){return `<label class="wave-control"><span>${title}<output data-wave-output="${name}">${number(value,digits)} ${unit}</output></span><input type="range" data-wave-param="${name}" min="${min}" max="${max}" step="${step}" value="${value}" data-unit="${unit}" data-digits="${digits}" aria-label="${title}"></label>`;}
 function choices(name,title,values,current){return `<fieldset class="wave-choice"><legend>${title}</legend><div>${values.map(([v,label])=>`<button type="button" data-wave-choice="${name}" data-value="${v}" aria-pressed="${String(v)===String(current)}">${label}</button>`).join('')}</div></fieldset>`;}
 function controls(kind,p){
  switch(kind){
   case 'propagation':return choices('mode','Perturbación',[['periodic','Onda periódica'],['pulse','Un pulso']],p.mode)+range('A','Amplitud',.2,.9,.05,p.A,'m')+range('f','Frecuencia',.3,1.2,.05,p.f,'Hz');
   case 'types':return choices('type','Dirección de oscilación',[['transverse','Transversal'],['longitudinal','Longitudinal']],p.type)+range('f','Frecuencia',.3,1.2,.1,p.f,'Hz');
   case 'parameters':return range('A','Amplitud A',.2,.9,.05,p.A,'m')+range('lambda','Longitud de onda λ',1,3,.1,p.lambda,'m')+range('f','Frecuencia f',.3,1.4,.1,p.f,'Hz');
   case 'equation':return choices('direction','Sentido',[['1','Hacia +x'],['-1','Hacia −x']],p.direction)+range('A','Amplitud A',.2,.8,.05,p.A,'m')+range('lambda','Longitud de onda λ',1.5,3,.1,p.lambda,'m')+range('f','Frecuencia f',.3,1,.1,p.f,'Hz')+range('phase','Fase inicial',0,180,15,p.phase,'°',0);
   case 'string':return range('tension','Tensión Fₜ',10,90,5,p.tension,'N',0)+range('mu','Densidad lineal μ',.05,.3,.01,p.mu,'kg/m')+`<p class="wave-control-note">La animación conserva la forma y amplitud del pulso para comparar solo su rapidez.</p>`;
   case 'reflection':return choices('boundary','Extremo de la cuerda',[['fixed','Fijo'],['free','Libre']],p.boundary)+range('speed','Rapidez del pulso',.8,2.2,.1,p.speed,'m/s')+range('A','Amplitud',.4,.9,.1,p.A,'m');
   case 'superposition':return choices('sign','Segundo pulso',[['1','Mismo signo'],['-1','Signo opuesto']],p.sign)+range('ratio','Amplitud relativa',.5,1,.1,p.ratio,'×')+range('speed','Rapidez de cada pulso',.6,1.4,.1,p.speed,'m/s');
   case 'standing':return range('n','Modo n',1,5,1,p.n,'',0)+range('L','Longitud L',2,4,.5,p.L,'m')+range('v','Rapidez v',8,20,2,p.v,'m/s',0)+`<label class="wave-check"><input type="checkbox" data-wave-param="components" ${p.components?'checked':''}>Ver ondas componentes</label>`;
   case 'sound':return range('frequency','Frecuencia del sonido',110,660,10,p.frequency,'Hz',0)+range('distance','Distancia a la fuente',1,6,.5,p.distance,'m')+range('power','Potencia de la fuente',1,20,1,p.power,'μW',0)+`<button class="wave-tone" type="button" data-wave-action="tone" aria-pressed="false">Escuchar tono sinusoidal</button><p class="wave-control-note">El tono es opcional y usa un volumen bajo. La guía hablada tiene sus propios controles.</p>`;
   case 'wavefronts':return choices('mode','Fenómeno',[['reflection','Reflexión'],['refraction','Refracción'],['diffraction','Difracción']],p.mode)+range('angle','Ángulo de incidencia',15,65,5,p.angle,'°',0)+range('v2','Rapidez del segundo medio',.8,3,.2,p.v2,'m/s')+range('aperture','Abertura a/λ',.5,5,.5,p.aperture,'',1);
   case 'doppler':return range('frequency','Frecuencia emitida',200,600,20,p.frequency,'Hz',0)+range('sourceVelocity','Velocidad de la fuente vₛ',-100,100,10,p.sourceVelocity,'m/s',0)+`<p class="wave-control-note">Observador fijo a la derecha. Sonido en el medio: v = 340 m/s. El signo positivo acerca la fuente.</p>`;
  }
  return '';
 }
 function metric(label,value){return `<div class="wave-metric"><span>${label}</span><strong>${value}</strong></div>`;}
 function readouts(a){const p=a.p,k=a.kind,e=E();
  switch(k){
   case 'propagation':return metric('Cuenta marcada','x = 3 m')+metric('Movimiento local','Oscilatorio')+metric('Avance','Hacia +x');
   case 'types':return metric('Oscilación',p.type==='transverse'?'Perpendicular':'Paralela')+metric('Propagación','Hacia +x')+metric('Posición media','Permanece fija');
   case 'parameters':{const w=e.waveProperties({lambda:p.lambda,f:p.f});return metric('Rapidez v',number(w.speed)+' m/s')+metric('Período T',number(w.period)+' s')+metric('Relación','v = λf');}
   case 'equation':return metric('Desplazamiento de P',number(e.travelling({x:3,t:a.t,A:p.A,lambda:p.lambda,f:p.f,direction:p.direction,phase:p.phase*Math.PI/180}))+' m')+metric('Rapidez',number(p.lambda*p.f)+' m/s')+metric('Sentido',p.direction===1?'+x':'−x');
   case 'string':return metric('Rapidez v',number(e.speedOnString(p.tension,p.mu))+' m/s')+metric('Tiempo físico',number(a.t/20)+' s')+metric('Modelo','v = √(Fₜ/μ)');
   case 'reflection':return metric('Extremo',p.boundary==='fixed'?'Fijo':'Libre')+metric('Reflexión',p.boundary==='fixed'?'Invertida':'Sin inversión')+metric('Tiempo',number(a.t)+' s');
   case 'superposition':return metric('En el encuentro',p.sign===1?'Se refuerzan':'Se reducen')+metric('Suma','y = y₁ + y₂')+metric('Tiempo',number(a.t)+' s');
   case 'standing':{const m=e.standingMode({L:p.L,n:p.n,v:p.v});return metric('Frecuencia fₙ',number(m.frequency)+' Hz')+metric('Nodos / vientres',(p.n+1)+' / '+p.n)+metric('Longitud de onda',number(m.lambda)+' m');}
   case 'sound':{const i=e.intensity(p.power*1e-6,p.distance);return metric('Intensidad I',number(i*1e6,3)+' μW/m²')+metric('Nivel β',number(e.soundLevel(i),1)+' dB')+metric('Longitud de onda',number(340/p.frequency)+' m');}
   case 'wavefronts':{const theta=e.refractedAngle({v1:2,v2:p.v2,angle1:p.angle*Math.PI/180});return p.mode==='diffraction'?metric('Abertura relativa',number(p.aperture,1)+' λ')+metric('Difracción',p.aperture<=1?'Más notoria':'Menos notoria')+metric('Modelo','Cualitativo'):metric('Incidencia',p.angle+'°')+metric(p.mode==='reflection'?'Reflexión':'Refracción',p.mode==='reflection'?p.angle+'°':theta===null?'Sin transmisión':number(theta*180/Math.PI,1)+'°')+metric('Frecuencia','Se conserva');}
   case 'doppler':return metric('Frecuencia recibida',number(e.doppler({f:p.frequency,v:340,sourceVelocity:p.sourceVelocity,observerVelocity:0}),1)+' Hz')+metric('Fuente',p.sourceVelocity>0?'Se acerca':p.sourceVelocity<0?'Se aleja':'En reposo')+metric('Observador','En reposo');
  }
  return '';
 }
 function rope(a,fn,base=178,scale=75,marked=true){let s=curve(pathFor(fn,scale,base),`url(#${a.id}-rope)`,8)+curve(pathFor(fn,scale,base),TEAL,2,'opacity=".7"');for(let i=0;i<=30;i++){const x=i/5,y=base-fn(x)*scale;s+=dot(48+x*104,y,i===15&&marked?11:3.6,i===15&&marked?`url(#${a.id}-bead)`:'#d3f0ea');}if(marked){const y=base-fn(3)*scale;s+=line(360,45,360,290,GOLD,1,'stroke-dasharray="5 7" opacity=".35"')+text(373,y-16,'P',GOLD,23);}return s;}
 function waveShape(a){const p=a.p,e=E(),k=a.kind;let s=grid();
  if(k==='propagation'){
   const fn=p.mode==='pulse'?x=>e.pulse(x,-1+1.5*a.t,.38,p.A):x=>e.travelling({x,t:a.t,A:p.A,lambda:2,f:p.f});s+=rope(a,fn);s+=arrow(478,49,637,49)+text(478,34,'Propagación',GOLD);s+=arrow(333,120,333,235,TEAL,3)+text(337,305,'La cuenta oscila aquí',GOLD,22,'middle');
  }else if(k==='types'){
   const longitudinal=p.type==='longitudinal';
   if(longitudinal){for(let i=0;i<=62;i++){const x=i*6/62,displacement=e.travelling({x,t:a.t,A:.16,lambda:2,f:p.f});s+=dot(48+x*104,178,2.5,'#7796a9')+line(48+(x+displacement)*104,140,48+(x+displacement)*104,216,i===31?GOLD:TEAL,i===31?8:5);}s+=arrow(320,255,395,255,TEAL)+arrow(395,255,320,255,TEAL);s+=text(360,292,'Oscilación paralela',TEAL,22,'middle');}
   else{s+=rope(a,x=>e.travelling({x,t:a.t,A:p.A,lambda:2,f:p.f}));s+=arrow(332,115,332,235,TEAL)+arrow(332,235,332,115,TEAL);s+=text(360,300,'Oscilación perpendicular',TEAL,22,'middle');}
   s+=arrow(480,54,639,54)+text(480,36,'Propagación',GOLD);
  }else if(k==='parameters'){
   s+=rope(a,x=>e.travelling({x,t:a.t,A:p.A,lambda:p.lambda,f:p.f}),178,75,false);
   const x1=77,x2=x1+p.lambda*104;s+=line(x1,76,x2,76,GOLD,3)+line(x1,64,x1,88,GOLD,3)+line(x2,64,x2,88,GOLD,3)+text((x1+x2)/2,60,'λ',GOLD,25,'middle');s+=line(642,178,642,178-p.A*75,CORAL,3)+line(633,178-p.A*75,652,178-p.A*75,CORAL,3)+text(656,170-p.A*35,'A',CORAL,24);s+=text(48,310,'0',INK)+text(360,310,'3',INK,22,'middle')+text(672,310,'6 m',INK,22,'end');
  }else if(k==='equation'){
   s+=rope(a,x=>e.travelling({x,t:a.t,A:p.A,lambda:p.lambda,f:p.f,direction:p.direction,phase:p.phase*Math.PI/180}));
   s+=p.direction===1?arrow(478,48,638,48):arrow(638,48,478,48);s+=text(360,307,`y = A sen(kx ${p.direction===1?'−':'+'} ωt + φ)`,GOLD,23,'middle');
  }else if(k==='string'){
   const speed=e.speedOnString(p.tension,p.mu),fn=x=>e.pulse(x,-.6+speed*a.t/20,.3,.65);s+=rope(a,fn,178,75,false);s+=arrow(118,77,45,77,CORAL)+arrow(602,77,675,77,CORAL)+text(360,64,'Cuerda ideal sometida a tensión',CORAL,22,'middle');s+=text(360,307,'Tiempo ralentizado ×20',GOLD,22,'middle');
  }else if(k==='reflection'){
   const r=x=>e.reflection({x,t:a.t,speed:p.speed,L:6,center0:1,width:.35,A:p.A,boundary:p.boundary});
   s+=curve(pathFor(x=>r(x).incident),BLUE,3,'stroke-dasharray="8 7" opacity=".85"')+curve(pathFor(x=>r(x).reflected),CORAL,3,'stroke-dasharray="8 7" opacity=".85"')+rope(a,x=>r(x).total,178,75,false);
   s+=`<rect x="672" y="63" width="17" height="225" rx="4" fill="url(#${a.id}-metal)"/>`;
   if(p.boundary==='fixed'){s+=dot(672,178,8,GOLD);for(let y=74;y<280;y+=20)s+=line(690,y,705,y-10,INK,2);}
   else s+=`<ellipse cx="672" cy="${178-r(6).total*75}" rx="13" ry="15" fill="none" stroke="${GOLD}" stroke-width="5"/>`;
   s+=text(360,45,p.boundary==='fixed'?'Extremo fijo: y = 0':'Anillo libre para oscilar',GOLD,22,'middle');s+=text(360,307,'Incidente + reflejado = desplazamiento total',INK,21,'middle');
  }else if(k==='superposition'){
   const r=x=>e.superposition({x,t:a.t,speed:p.speed,left:1,right:5,width:.35,A1:.65,A2:.65*p.ratio,sign:p.sign});
   s+=curve(pathFor(x=>r(x).first),BLUE,3,'stroke-dasharray="9 7" opacity=".9"')+curve(pathFor(x=>r(x).second),CORAL,3,'stroke-dasharray="9 7" opacity=".9"')+rope(a,x=>r(x).total,178,75,false);
   s+=arrow(109,53,200,53,BLUE)+arrow(610,53,519,53,CORAL)+text(360,307,'La suma es instantánea; los pulsos continúan',INK,21,'middle');
  }else if(k==='standing'){
   const mode=e.standingMode({L:p.L,n:p.n,v:p.v}),f=mode.frequency,t=a.t/20,fn=x=>e.standing({x:x*p.L/6,t,A:.45,L:p.L,n:p.n,f});
   if(p.components){s+=curve(pathFor(x=>.45*Math.sin(p.n*Math.PI*x/6-TAU*f*t)),BLUE,2,'stroke-dasharray="7 6" opacity=".75"')+curve(pathFor(x=>.45*Math.sin(p.n*Math.PI*x/6+TAU*f*t)),CORAL,2,'stroke-dasharray="7 6" opacity=".75"');}
   s+=rope(a,fn,178,75,false);
   for(const node of mode.nodes)s+=dot(48+624*node/p.L,178,8,GOLD,'stroke="#28364a" stroke-width="2"');
   for(const x of mode.antinodes)s+=`<ellipse cx="${48+624*x/p.L}" cy="178" rx="13" ry="74" fill="none" stroke="${TEAL}" opacity=".35" stroke-dasharray="4 6"/>`;
   s+=text(360,48,`Modo ${p.n} · extremos fijos`,GOLD,23,'middle')+text(360,307,'Nodos inmóviles · vientres entre nodos',INK,22,'middle');
  }
  return s;
 }
 function soundShape(a){const p=a.p,phase=a.t*p.frequency/200,lambda=340/p.frequency;let s=grid();
  s+=`<rect x="24" y="114" width="33" height="128" rx="7" fill="url(#${a.id}-metal)"/><path d="M57 139L89 109V247L57 216Z" fill="#e9ad70" stroke="#ffdda8" stroke-width="3"/>`;
  for(let i=0;i<64;i++){const x=112+i*8.45,dx=9*Math.sin((x-112)/(lambda*110)*TAU-phase*TAU);s+=dot(x,178,2,'#a8c5d2', 'opacity=".22"');for(let row=0;row<4;row++)s+=dot(x+dx,128+row*33,i===28?4.5:3.5,i===28?GOLD:TEAL);}
  const observerX=150+(p.distance-1)/5*480;s+=line(observerX,85,observerX,276,GOLD,2,'stroke-dasharray="6 7"')+dot(observerX,76,10,GOLD)+text(observerX,55,'P',GOLD,23,'middle');
  s+=arrow(155,282,630,282,BLUE)+text(360,320,'Compresión ⇄ expansión · las partículas no emigran',INK,20,'middle');return s;
 }
 function wavefrontShape(a){const p=a.p,theta=p.angle*Math.PI/180,phase=(a.t*.4)%1;let s='';
  if(p.mode==='diffraction'){
   const visualLambda=57,gap=p.aperture*visualLambda,mid=170;s+=`<rect x="324" y="22" width="16" height="${mid-gap/2-22}" rx="3" fill="url(#${a.id}-metal)"/><rect x="324" y="${mid+gap/2}" width="16" height="${318-mid-gap/2}" rx="3" fill="url(#${a.id}-metal)"/>`;
   for(let j=0;j<6;j++){const x=332-(j+1-phase)*visualLambda;if(x>22)s+=line(x,48,x,292,BLUE,3,'opacity=".75"');}
   for(let j=0;j<6;j++){const r=(j+phase)*visualLambda;if(r<1)continue;if(p.aperture<=1.5)s+=`<path d="M${332} ${mid-r}A${r} ${r} 0 0 1 ${332} ${mid+r}" fill="none" stroke="${TEAL}" stroke-width="3" opacity="${1-r/600}"/>`;
    else{const x=332+r,spread=Math.min(r,100/p.aperture),half=gap/2;s+=`<path d="M${x-spread} ${mid-half-spread}Q${x} ${mid-half} ${x} ${mid-half+15}V${mid+half-15}Q${x} ${mid+half} ${x-spread} ${mid+half+spread}" fill="none" stroke="${TEAL}" stroke-width="3" opacity="${1-r/600}"/>`;}}
   s+=text(180,34,'Frentes incidentes',BLUE,22,'middle')+text(525,34,'Frentes transmitidos',TEAL,22,'middle')+text(360,329,'Abertura comparable con λ: más difracción',INK,20,'middle');
   return s;
  }
  const P={x:360,y:190},transmitted=p.mode==='refraction',t2=E().refractedAngle({v1:2,v2:p.v2,angle1:theta});
  s+=`<rect x="24" y="24" width="672" height="166" fill="#234d68" opacity=".4"/><rect x="24" y="190" width="672" height="128" fill="#33526b" opacity=".35"/>`+line(24,190,696,190,INK,3)+line(360,38,360,310,INK,2,'stroke-dasharray="7 7" opacity=".7"');
  const xi=P.x-Math.sin(theta)*152,yi=P.y-Math.cos(theta)*152;s+=arrow(xi,yi,P.x,P.y,BLUE,4);
  if(!transmitted)s+=arrow(P.x,P.y,P.x+Math.sin(theta)*152,P.y-Math.cos(theta)*152,CORAL,4);
  else if(t2!==null)s+=arrow(P.x,P.y,P.x+Math.sin(t2)*128,P.y+Math.cos(t2)*128,TEAL,4);
  else s+=arrow(P.x,P.y,P.x+Math.sin(theta)*152,P.y-Math.cos(theta)*152,CORAL,4);
  const front=(cx,cy,angle,color,opacity=1,medium='upper')=>line(cx-54*Math.cos(angle),cy+54*Math.sin(angle),cx+54*Math.cos(angle),cy-54*Math.sin(angle),color,2.5,`opacity="${opacity}" clip-path="url(#${a.id}-${medium})"`);
  for(let j=0;j<4;j++){const incidentDistance=(j+1-phase)*56,emergentDistance=(j+phase)*56;s+=front(P.x-Math.sin(theta)*incidentDistance,P.y-Math.cos(theta)*incidentDistance,theta,BLUE,.75);
   if(!transmitted||t2===null)s+=front(P.x+Math.sin(theta)*emergentDistance,P.y-Math.cos(theta)*emergentDistance,-theta,CORAL,.75);
   else{const ds=emergentDistance*p.v2/2;s+=front(P.x+Math.sin(t2)*ds,P.y+Math.cos(t2)*ds,t2,TEAL,.75,'lower');}}
  s+=dot(P.x,P.y,5,GOLD)+text(371,49,'Normal',INK,22)+text(60,310,'Medio 1: v₁ = 2 m/s',INK,21);
  s+=text(660,310,transmitted?`Medio 2: v₂ = ${number(p.v2,1)} m/s`:'Superficie reflectora',TEAL,21,'end');
  s+=text(309,143,'θᵢ',BLUE,24)+text(transmitted&&t2!==null?391:405,transmitted&&t2!==null?247:139,transmitted&&t2!==null?'θₜ':'θᵣ',transmitted?TEAL:CORAL,24);
  return s;
 }
 function dopplerShape(a){const p=a.p,c=90,vs=p.sourceVelocity/340*c,sourceX=260+vs*a.t,interval=200/p.frequency;let s='';
  s+=line(35,188,685,188,'#abc9dd',1.5,'stroke-dasharray="5 8" opacity=".35"');
  const last=Math.floor(a.t/interval);for(let j=Math.max(0,last-15);j<=last;j++){const emitted=j*interval,center=260+vs*emitted,r=c*(a.t-emitted);if(r>1)s+=`<circle cx="${center}" cy="188" r="${r}" fill="none" stroke="${TEAL}" stroke-width="3" opacity="${Math.max(.16,1-r/650)}"/>`+dot(center,188,2.5,TEAL,'opacity=".35"');}
  s+=`<rect x="${sourceX-20}" y="164" width="40" height="48" rx="9" fill="#f5bd7f" stroke="#ffe9c8" stroke-width="3"/><path d="M${sourceX-9} 177L${sourceX+10} 188L${sourceX-9} 201Z" fill="#56432d"/>`;
  s+=text(sourceX,145,'Fuente',GOLD,23,'middle')+dot(620,188,13,CORAL)+text(620,145,'Observador',CORAL,22,'middle');
  if(p.sourceVelocity!==0)s+=arrow(sourceX,253,sourceX+Math.sign(vs)*65,253,GOLD,4);
  s+=text(360,47,'Los centros de emisión quedan atrás',INK,23,'middle')+text(360,315,'Tiempo ralentizado ×200 · sin movimiento del observador',INK,20,'middle');return s;
 }
 function scene(a){return `<svg class="wave-svg" viewBox="0 0 720 340" role="img" aria-label="${escape(DESCRIPTIONS[a.kind].title)}. La explicación y los valores están debajo del dibujo.">${defs(a.id)}<g clip-path="url(#${a.id}-plot)">${a.kind==='sound'?soundShape(a):a.kind==='wavefronts'?wavefrontShape(a):a.kind==='doppler'?dopplerShape(a):waveShape(a)}</g></svg>`;}
 function legend(kind){return kind==='reflection'||kind==='superposition'||kind==='standing'?'<span><i style="--line:#8dbdff"></i>Primera onda</span><span><i style="--line:#ff8e93"></i>Segunda onda</span><span><i style="--line:#53dfc6"></i>Resultante</span>':'<span><i style="--line:#53dfc6"></i>Perturbación</span><span><i style="--line:#ffd48a"></i>Partícula o referencia</span>';}
 function syncMotion(a){const button=a.host.querySelector('[data-wave-action="play"]');button.textContent=a.playing?'Ⅱ Pausar':'▶ Reproducir';button.setAttribute('aria-pressed',String(a.playing));a.host.querySelector('[data-wave-running]').textContent=a.playing?'En movimiento':'En pausa';}
 function updateControls(a){const hide=(name,hidden)=>{const input=a.host.querySelector(`[data-wave-param="${name}"]`);if(input)input.closest('.wave-control').hidden=hidden;};if(a.kind==='propagation')hide('f',a.p.mode==='pulse');if(a.kind==='wavefronts'){hide('angle',a.p.mode==='diffraction');hide('v2',a.p.mode!=='refraction');hide('aperture',a.p.mode!=='diffraction');}}
 function render(a){if(a.disposed)return;try{a.host.querySelector('[data-wave-scene]').innerHTML=scene(a);a.host.querySelector('[data-wave-readouts]').innerHTML=readouts(a);a.host.querySelector('[data-wave-time]').textContent=number(a.t)+' s';updateControls(a);}catch(error){a.playing=false;a.host.querySelector('[data-wave-status]').textContent='No se pudo representar este ajuste. Reinicia la actividad.';global.console?.error?.(error);}syncMotion(a);}
 function endTime(a){if(a.kind==='reflection')return 12/a.p.speed;if(a.kind==='superposition')return 4.9/a.p.speed;if(a.kind==='string')return 7.5/E().speedOnString(a.p.tension,a.p.mu)*20;if(a.kind==='doppler')return 8;if(a.kind==='propagation'&&a.p.mode==='pulse')return 5.4;return Infinity;}
 function tick(now){frame=0;let again=false;for(const a of instances){if(a.disposed||!a.visible||!a.host.isConnected){a.last=null;continue;}if(a.playing){if(a.last!==null){const dt=Math.min(.1,Math.max(0,(now-a.last)/1000));if(now-a.drawAt>=1000/30-1){a.t+=dt;a.drawAt=now;if(a.t>=endTime(a)){a.t=endTime(a);a.playing=false;stopTone(a);a.host.querySelector('[data-wave-status]').textContent='La comparación ha terminado. Reinicia para volver a observarla.';}render(a);}else{again=true;continue;}}a.last=now;again=again||a.playing;}}if(again)frame=global.requestAnimationFrame(tick);}
 function schedule(){if(!frame&&instances.some(a=>a.playing&&a.visible&&!a.disposed))frame=global.requestAnimationFrame(tick);}
 function stopTone(a){try{a.oscillator?.stop();a.oscillator?.disconnect();a.gain?.disconnect();a.audioContext?.close()?.catch?.(()=>{});}catch{}a.oscillator=null;a.gain=null;a.audioContext=null;const button=a.host.querySelector('[data-wave-action="tone"]');if(button){button.textContent='Escuchar tono sinusoidal';button.setAttribute('aria-pressed','false');}}
 async function toggleTone(a){if(a.audioContext){stopTone(a);return;}try{const Audio=global.AudioContext||global.webkitAudioContext;if(!Audio)throw Error('Audio no disponible');const context=new Audio();a.audioContext=context;await context.resume();if(a.disposed||a.audioContext!==context){context.close();return;}const oscillator=context.createOscillator(),gain=context.createGain();oscillator.type='sine';oscillator.frequency.value=a.p.frequency;gain.gain.value=.015;oscillator.connect(gain);gain.connect(context.destination);oscillator.start();a.oscillator=oscillator;a.gain=gain;const button=a.host.querySelector('[data-wave-action="tone"]');button.textContent='Detener tono';button.setAttribute('aria-pressed','true');}catch{stopTone(a);if(!a.disposed)a.host.querySelector('[data-wave-status]').textContent='No se pudo activar el tono. La animación y la guía escrita siguen disponibles.';}}
 function dispatch(a){a.host.dispatchEvent(new CustomEvent('wave-lab-playchange',{bubbles:true,detail:{kind:a.kind,playing:a.playing,source:'user'}}));}
 function build(placeholder){const kind=placeholder.getAttribute('data-wave-lab'),meta=DESCRIPTIONS[kind];if(!meta)return;const saved=memory.get(kind),reduce=global.matchMedia?.('(prefers-reduced-motion: reduce)').matches===true;const a={kind,id:'wave-'+kind+'-'+(++sequence),p:{...meta.defaults,...saved?.p},t:saved?.t||0,playing:reduce?false:saved?.playing??true,visible:!global.document.hidden,last:null,drawAt:-Infinity,disposed:false,controller:new AbortController()};
  placeholder.innerHTML=`<section class="wave-lab" id="wave-lab-${kind}" data-activity-fullscreen aria-labelledby="${a.id}-title"><header class="wave-head"><p class="wave-kicker">Laboratorio de ondas</p><h3 id="${a.id}-title">${meta.title}</h3><p>${meta.intro}</p></header><div class="wave-layout"><div class="wave-visual"><div class="wave-scene" data-wave-scene></div><div class="wave-legend">${legend(kind)}<span class="wave-running" data-wave-running></span></div><div class="wave-readouts" data-wave-readouts></div></div><aside class="wave-controls" aria-label="Controles de ${escape(meta.title)}"><div class="wave-motion"><button type="button" data-wave-action="play" aria-pressed="false">▶ Reproducir</button><button type="button" data-wave-action="reset">↺ Reiniciar</button><button type="button" data-wave-action="step">Un instante +</button></div>${controls(kind,a.p)}<p class="wave-time">Tiempo de animación: <output data-wave-time>0,00 s</output></p></aside></div><div class="wave-notes"><p><b>Observa</b>${meta.note}</p><p><b>Antes de cambiar un control</b>${meta.prediction}</p></div><p class="wave-status" role="status" data-wave-status>${reduce?'La animación comienza pausada por tu preferencia de movimiento reducido. Puedes reproducirla o avanzar un instante.':'Puedes pausar y avanzar un instante para observar cada posición.'}</p></section>`;
  a.host=placeholder.firstElementChild;const listen=(target,name,fn)=>target.addEventListener(name,fn,{signal:a.controller.signal});
  listen(a.host,'click',event=>{const b=event.target.closest('button');if(!b)return;if(b.dataset.waveChoice){const name=b.dataset.waveChoice,value=b.dataset.value;a.p[name]=typeof meta.defaults[name]==='number'?Number(value):value;a.t=0;a.last=null;a.host.querySelectorAll(`[data-wave-choice="${name}"]`).forEach(n=>n.setAttribute('aria-pressed',String(n===b)));render(a);schedule();return;}const action=b.dataset.waveAction;if(action==='play'){if(a.t>=endTime(a))a.t=0;a.playing=!a.playing;a.last=null;if(!a.playing)stopTone(a);render(a);dispatch(a);schedule();}else if(action==='reset'){a.t=0;a.last=null;a.host.querySelector('[data-wave-status]').textContent='Inicio restablecido. Los ajustes se conservan para comparar.';render(a);schedule();}else if(action==='step'){a.playing=false;a.t=Math.min(endTime(a),a.t+.1);a.last=null;stopTone(a);render(a);dispatch(a);}else if(action==='tone')toggleTone(a);});
  listen(a.host,'input',event=>{const input=event.target;if(!input.matches('[data-wave-param]'))return;const name=input.dataset.waveParam;a.p[name]=input.type==='checkbox'?input.checked:Number(input.value);if(['reflection','superposition','string','doppler'].includes(kind)){a.t=0;a.last=null;}const output=a.host.querySelector(`[data-wave-output="${name}"]`);if(output)output.textContent=number(a.p[name],Number(input.dataset.digits)||2)+' '+(input.dataset.unit||'');if(name==='frequency'&&a.oscillator)a.oscillator.frequency.setValueAtTime(a.p.frequency,a.audioContext.currentTime);render(a);schedule();});
  if(typeof global.IntersectionObserver==='function'){a.observer=new global.IntersectionObserver(entries=>{a.intersecting=entries[0]?.isIntersecting===true;a.visible=a.intersecting&&!global.document.hidden;a.last=null;if(!a.visible)stopTone(a);else schedule();},{rootMargin:'0px'});a.observer.observe(a.host);}
  listen(global.document,'visibilitychange',()=>{a.visible=!global.document.hidden&&a.intersecting!==false&&a.host.isConnected;a.last=null;if(global.document.hidden)stopTone(a);else schedule();});
  instances.push(a);render(a);
 }
 function mount(root){destroy();if(!E())return;for(const placeholder of root.querySelectorAll('[data-wave-lab]'))build(placeholder);schedule();}
 function destroy(){if(frame)global.cancelAnimationFrame(frame);frame=0;for(const a of instances){memory.set(a.kind,{p:{...a.p},t:a.t,playing:a.playing});a.disposed=true;a.controller.abort();a.observer?.disconnect();stopTone(a);}instances=[];}
 function setPlaying(playing){for(const a of instances){if(playing&&a.t>=endTime(a))a.t=0;a.playing=playing===true;a.last=null;if(!a.playing)stopTone(a);render(a);}schedule();}
 function getState(){return instances.map(a=>({kind:a.kind,playing:a.playing,time:a.t,parameters:{...a.p}}));}
 global.MechanicalWaveLabs=Object.freeze({mount,destroy,setPlaying,getState,kinds:Object.keys(DESCRIPTIONS)});
})(window);
