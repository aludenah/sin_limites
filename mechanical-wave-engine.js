/* Modelos ideales de ondas mecánicas. Distancias en m, tiempos en s y ángulos en radianes. */
(function(root,factory){
  const api=factory();
  if(typeof module==='object'&&module.exports)module.exports=api;
  if(root)root.MechanicalWaveEngine=api;
})(typeof window!=='undefined'?window:typeof globalThis!=='undefined'?globalThis:this,function(){
  'use strict';
  const TAU=2*Math.PI,SOUND_REFERENCE=1e-12;
  function finite(value,name){
    if(typeof value!=='number'||!Number.isFinite(value))throw new RangeError(name+' debe ser un número finito.');
    return value;
  }
  function positive(value,name){finite(value,name);if(value<=0)throw new RangeError(name+' debe ser mayor que cero.');return value;}
  function nonnegative(value,name){finite(value,name);if(value<0)throw new RangeError(name+' no puede ser negativo.');return value;}
  function result(value){if(!Number.isFinite(value))throw new RangeError('Los valores exceden el intervalo numérico del modelo.');return value===0?0:value;}
  function mode(value){if(!Number.isInteger(value)||value<1||value>10000)throw new RangeError('El armónico debe ser un entero entre 1 y 10000.');return value;}
  function clamp(value,min,max){finite(value,'El valor');finite(min,'El mínimo');finite(max,'El máximo');if(min>max)throw new RangeError('El mínimo no puede superar al máximo.');return Math.max(min,Math.min(max,value));}

  // A fixed x labels a material particle: it oscillates, while the profile travels.
  function travelling({x=0,t=0,A=1,lambda=1,f=1,direction=1,phase=0}={}){
    finite(x,'La posición');finite(t,'El tiempo');finite(A,'La amplitud');positive(lambda,'La longitud de onda');nonnegative(f,'La frecuencia');finite(phase,'La fase');
    if(direction!==1&&direction!==-1)throw new RangeError('El sentido de propagación debe ser +1 o −1.');
    return result(A*Math.sin(TAU*(x/lambda-direction*f*t)+phase));
  }
  function longitudinal(options={}){
    const x=options.x===undefined?0:options.x,displacement=travelling(options);
    return {equilibrium:x,displacement,position:result(x+displacement)};
  }
  function waveProperties({lambda=1,f=1}={}){
    positive(lambda,'La longitud de onda');positive(f,'La frecuencia');
    return {speed:result(lambda*f),period:result(1/f),frequency:f,wavelength:lambda};
  }
  function speedOnString(tension,linearDensity){
    nonnegative(tension,'La tensión');positive(linearDensity,'La densidad lineal');
    return result(Math.sqrt(tension/linearDensity));
  }
  function pulse(x,center,width,A=1){
    finite(x,'La posición');finite(center,'El centro');positive(width,'El ancho del pulso');finite(A,'La amplitud');
    const z=(x-center)/width;
    // exp(−Infinity)=0 is the correct limiting value far from the pulse.
    return result(A*Math.exp(-.5*z*z));
  }
  function reflection({x=0,t=0,speed=1,L=1,center0=.22,width=.055,A=1,boundary='fixed'}={}){
    positive(L,'La longitud de la cuerda');nonnegative(speed,'La rapidez');finite(t,'El tiempo');finite(center0,'El centro inicial');
    if(boundary!=='fixed'&&boundary!=='free')throw new RangeError('El extremo debe ser fijo o libre.');
    const incidentCenter=result(center0+speed*t),reflectedCenter=result(2*L-center0-speed*t),sign=boundary==='fixed'?-1:1;
    const incident=pulse(x,incidentCenter,width,A),reflected=pulse(x,reflectedCenter,width,sign*A);
    // Image pulse: fixed endpoint has y(L,t)=0; free endpoint has ∂y/∂x(L,t)=0.
    return {incident,reflected,total:result(incident+reflected),incidentCenter,reflectedCenter,sign};
  }
  function superposition({x=0,t=0,speed=1,left=.25,right=.75,width=.06,A1=1,A2=1,sign=1}={}){
    finite(t,'El tiempo');nonnegative(speed,'La rapidez');finite(left,'El centro izquierdo');finite(right,'El centro derecho');
    if(sign!==1&&sign!==-1)throw new RangeError('El segundo pulso debe tener signo +1 o −1.');
    const center1=result(left+speed*t),center2=result(right-speed*t),first=pulse(x,center1,width,A1),second=pulse(x,center2,width,sign*A2);
    return {first,second,total:result(first+second),center1,center2};
  }
  function standing({x=0,t=0,A=1,L=1,n=1,f=1}={}){
    finite(x,'La posición');finite(t,'El tiempo');finite(A,'La amplitud viajera');positive(L,'La longitud de la cuerda');mode(n);nonnegative(f,'La frecuencia');
    return result(2*A*Math.sin(n*Math.PI*x/L)*Math.cos(TAU*f*t));
  }
  function standingMode({L=1,n=1,v=1}={}){
    positive(L,'La longitud de la cuerda');mode(n);positive(v,'La rapidez');
    return {lambda:result(2*L/n),frequency:result(n*v/(2*L)),nodes:Array.from({length:n+1},(_,j)=>j*L/n),antinodes:Array.from({length:n},(_,j)=>(j+.5)*L/n)};
  }
  function intensity(power,distance){
    nonnegative(power,'La potencia');positive(distance,'La distancia');
    return result(power/(4*Math.PI*distance*distance));
  }
  function soundLevel(I,I0=SOUND_REFERENCE){
    nonnegative(I,'La intensidad');positive(I0,'La intensidad de referencia');
    if(I===0)return null; // Silence has no finite decibel level in this ideal model.
    return result(10*(Math.log10(I)-Math.log10(I0)));
  }
  function doppler({f=440,v=340,sourceVelocity=0,observerVelocity=0}={}){
    positive(f,'La frecuencia emitida');positive(v,'La rapidez del sonido');finite(sourceVelocity,'La velocidad de la fuente');finite(observerVelocity,'La velocidad del observador');
    if(Math.abs(sourceVelocity)>=v)throw new RangeError('Este modelo requiere una fuente subsónica.');
    if(observerVelocity<=-v)throw new RangeError('El observador debe recibir los frentes de onda.');
    // Positive source velocity points toward the observer; positive observer velocity toward the source.
    return result(f*(v+observerVelocity)/(v-sourceVelocity));
  }
  function refractedAngle({v1=1,v2=1,angle1=0}={}){
    positive(v1,'La rapidez en el primer medio');positive(v2,'La rapidez en el segundo medio');finite(angle1,'El ángulo de incidencia');
    if(Math.abs(angle1)>Math.PI/2)throw new RangeError('El ángulo se mide respecto de la normal, entre −π/2 y π/2.');
    const s=v2/v1*Math.sin(angle1);
    if(!Number.isFinite(s)||Math.abs(s)>1+1e-12)return null;
    if(Math.abs(Math.abs(s)-1)<=1e-12)return Math.sign(s)*Math.PI/2;
    return result(Math.asin(Math.max(-1,Math.min(1,s))));
  }
  return Object.freeze({TAU,SOUND_REFERENCE,clamp,travelling,longitudinal,waveProperties,speedOnString,pulse,reflection,superposition,standing,standingMode,intensity,soundLevel,doppler,refractedAngle});
});
