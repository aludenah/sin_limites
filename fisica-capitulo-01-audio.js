/* Narración de la teoría: fórmulas expresadas con palabras para escucharlas. */
(() => {
  'use strict';
  const narratives=[
`Magnitudes y unidades. ¿Qué medimos y con qué lo expresamos?
Una magnitud física es una propiedad que puede expresarse mediante un número y una referencia de medida. Por ejemplo, al escribir que una longitud mide dos metros, la magnitud es la longitud, el valor numérico es dos y la unidad es el metro.
El Sistema Internacional utiliza siete magnitudes base. La longitud se mide en metros y su dimensión se representa con la letra ele. La masa se mide en kilogramos y su dimensión se representa con la letra eme. El tiempo se mide en segundos y su dimensión se representa con la letra te.
La corriente eléctrica se mide en amperios y su dimensión se representa con la letra i. La temperatura termodinámica se mide en kelvin y su dimensión se representa con la letra griega teta. La cantidad de sustancia se mide en moles y su dimensión se representa con la letra ene. La intensidad luminosa se mide en candelas y su dimensión se representa con la letra jota.
En mecánica trabajaremos principalmente con masa, longitud y tiempo: eme, ele y te. A partir de las magnitudes base construimos magnitudes derivadas, como rapidez, fuerza y energía. Los símbolos de las unidades no se pluralizan. Por ejemplo, el símbolo del kilogramo sigue siendo ka ge al escribir cinco kilogramos. La letra jota, cuando representa una dimensión luminosa, debe distinguirse por el contexto de la jota que simboliza el joule, unidad de energía.
Una unidad puede cambiar sin que cambie la magnitud. Dos metros y doscientos centímetros representan la misma longitud.
Ejemplo resuelto: convertir setenta y dos kilómetros por hora a metros por segundo. Sabemos que un kilómetro equivale a mil metros y una hora equivale a tres mil seiscientos segundos. Multiplicamos setenta y dos por mil y dividimos entre tres mil seiscientos. El resultado es veinte metros por segundo. Cambian el número y la unidad, pero la dimensión sigue siendo longitud dividida entre tiempo, es decir, ele por te a la menos uno.
Recuerda: una magnitud indica qué medimos; una unidad indica con qué referencia expresamos esa medida.`,
`Fórmulas dimensionales. El significado de eme, ele y te.
Escribimos una magnitud entre corchetes para representar su dimensión. Por ejemplo, los corchetes de ve indican la dimensión de la rapidez. En mecánica, una fórmula dimensional se expresa como eme elevada a un exponente, por ele elevada a otro, por te elevada a otro. Estos exponentes pueden ser positivos, negativos, fraccionarios o cero.
La rapidez es distancia dividida entre tiempo. Su dimensión es ele dividida entre te, o ele por te a la menos uno. Los metros por segundo y los kilómetros por hora son unidades diferentes, pero tienen la misma dimensión.
Repasemos las principales dimensiones. El área tiene dimensión ele al cuadrado. El volumen tiene dimensión ele al cubo. La aceleración es variación de velocidad dividida entre tiempo: ele por te a la menos dos. La densidad es masa dividida entre volumen: eme por ele a la menos tres.
La fuerza se obtiene multiplicando masa por aceleración. Su dimensión es eme por ele por te a la menos dos. El trabajo de una fuerza constante paralela al desplazamiento es fuerza por distancia. Tanto el trabajo como la energía tienen dimensión eme por ele al cuadrado por te a la menos dos.
La potencia es trabajo dividido entre tiempo. Su dimensión es eme por ele al cuadrado por te a la menos tres. La presión es fuerza dividida entre área. Su dimensión es eme por ele a la menos uno por te a la menos dos.
La cantidad de movimiento es masa por velocidad. Su dimensión es eme por ele por te a la menos uno. La frecuencia es el inverso del período. Su dimensión es te a la menos uno. La constante elástica se obtiene dividiendo fuerza entre deformación longitudinal. Su dimensión es eme por te a la menos dos.
En unidades del Sistema Internacional, el área se mide en metros cuadrados y el volumen en metros cúbicos. La rapidez se mide en metros por segundo y la aceleración en metros por segundo cuadrado. La densidad se mide en kilogramos por metro cúbico. La fuerza se mide en newtons; el trabajo y la energía, en joules; la potencia, en watts; la presión, en pascales; y la frecuencia, en hertz. La cantidad de movimiento se mide en kilogramos metro por segundo, y la constante elástica, en newtons por metro.
Ejemplo resuelto: obtener la dimensión de la presión. Partimos de presión igual a fuerza dividida entre área. Sustituimos la fuerza por eme por ele por te a la menos dos, y el área por ele al cuadrado. Al dividir, restamos los exponentes de ele: uno menos dos es menos uno. La presión tiene dimensión eme por ele a la menos uno por te a la menos dos.
No memorices la tabla sin entenderla. Reconstruye cada dimensión a partir de una relación física conocida.`,
`Álgebra dimensional. Productos, cocientes y potencias.
Las dimensiones obedecen las reglas de los exponentes. Al multiplicar potencias de la misma base, sumamos sus exponentes. Al dividir, los restamos. Al elevar una potencia a otra potencia, multiplicamos sus exponentes.
La dimensión de un producto es el producto de las dimensiones. La dimensión de un cociente es el cociente de las dimensiones. La dimensión de una magnitud elevada a ene es la dimensión de esa magnitud elevada a ene.
Los factores numéricos puros, como dos, pi y un medio, tienen dimensión uno. Esto no significa que todas las constantes sean adimensionales. Una constante física, como la constante de gravitación universal, puede tener dimensiones.
Una cantidad es adimensional cuando todos sus exponentes dimensionales son cero. Eme a la cero por ele a la cero por te a la cero es igual a uno. Por ejemplo, el cociente de dos longitudes no nulas tiene dimensión ele dividida entre ele, que es uno. El cociente puede valer tres, cinco u otro número. Tener dimensión uno no significa tener valor numérico uno.
Ejemplo resuelto: hallar la dimensión de cu igual a fuerza por rapidez, dividida entre tiempo. Sustituimos la fuerza por eme por ele por te a la menos dos. La rapidez tiene dimensión ele por te a la menos uno. El tiempo tiene dimensión te. Para eme queda exponente uno. Para ele sumamos uno más uno y obtenemos dos. Para te sumamos menos dos y menos uno, y después restamos uno por la división entre tiempo. El exponente final de te es menos cuatro. Entonces cu tiene dimensión eme por ele al cuadrado por te a la menos cuatro.
Recuerda: adimensional significa dimensión uno. No significa dimensión cero ni valor numérico uno.`,
`Homogeneidad dimensional. Una condición que toda ecuación debe cumplir.
En una ecuación física, ambos miembros deben tener la misma dimensión. Además, todos los términos que se suman o se restan deben ser dimensionalmente compatibles. Si una magnitud a es igual a be más ce, entonces a, be y ce deben tener la misma dimensión.
No sumamos los símbolos dimensionales como si fueran magnitudes. La suma de dos longitudes tiene dimensión de longitud, ele. No tiene dimensión dos ele.
La homogeneidad dimensional es una condición necesaria, pero no suficiente. Una fórmula puede tener dimensiones correctas y ser físicamente incorrecta. El análisis dimensional tampoco permite distinguir magnitudes diferentes que comparten dimensión. Por ejemplo, el trabajo y el torque tienen la misma fórmula dimensional.
Primer ejemplo resuelto: comprobar la ecuación posición final igual a posición inicial, más velocidad inicial por tiempo, más un medio de aceleración por tiempo al cuadrado. La posición inicial tiene dimensión ele. La velocidad inicial por el tiempo tiene dimensión ele por te a la menos uno, multiplicada por te. El resultado es ele. El término un medio de aceleración por tiempo al cuadrado tiene dimensión ele por te a la menos dos, multiplicada por te al cuadrado. El resultado también es ele. Todos los términos tienen dimensión de longitud. La ecuación es dimensionalmente homogénea.
Segundo ejemplo: alguien propone velocidad final igual a velocidad inicial más aceleración por tiempo al cuadrado. Las velocidades tienen dimensión ele por te a la menos uno. Sin embargo, aceleración por tiempo al cuadrado tiene dimensión ele. Se estaría sumando una velocidad y una longitud. Esa expresión no es homogénea.
En el explorador de este tema puedes cambiar la potencia del tiempo en el término aceleración por tiempo elevado a ene. La dimensión de ese término es ele por te elevada a ene menos dos. Para que coincida con una velocidad, el exponente del tiempo debe ser menos uno. Por eso, ene debe valer uno.
Antes de calcular números, revisa las dimensiones. Una incompatibilidad dimensional basta para descartar una fórmula.`,
`Dimensiones de coeficientes. Cada término debe ajustarse a la magnitud buscada.
Cuando una expresión contiene coeficientes desconocidos, no supongas que son adimensionales. Usa la homogeneidad para despejar la dimensión de cada uno.
Considera una posición equis igual a a por tiempo al cuadrado, más be por tiempo, más ce. Como todos los términos se suman y el resultado es una posición, cada término debe tener dimensión de longitud.
También debemos comprobar los argumentos de las funciones matemáticas. El argumento de un seno, un coseno, un logaritmo o una exponencial debe ser adimensional. Estas funciones producen resultados adimensionales.
Por ejemplo, si una posición equis es igual a una amplitud a multiplicada por el seno de omega por tiempo más fi, la amplitud debe tener dimensión de longitud. Omega por tiempo debe ser adimensional; por tanto, omega tiene dimensión te a la menos uno. La fase fi es adimensional. Los ángulos expresados en radianes tienen dimensión uno.
Si aparece el logaritmo natural del cociente entre cu y cu sub cero, ese cociente debe ser adimensional y positivo. Por tanto, cu y cu sub cero deben tener la misma dimensión. La compatibilidad dimensional no reemplaza las restricciones matemáticas de la función.
Ejemplo resuelto: en posición equis igual a a por tiempo al cuadrado, más be por tiempo, más ce, encuentra las dimensiones de a, be y ce. Para el primer término, la dimensión de a multiplicada por te al cuadrado debe ser ele. Despejamos y obtenemos para a la dimensión ele por te a la menos dos. Para el segundo término, la dimensión de be multiplicada por te debe ser ele. Por tanto, be tiene dimensión ele por te a la menos uno. El término ce debe tener directamente dimensión ele.
El coeficiente a tiene dimensión de aceleración. Be tiene dimensión de velocidad. Ce tiene dimensión de longitud. Una constante puede aportar las dimensiones que faltan: constante no equivale a adimensional.`,
`Cálculo de exponentes y límites del análisis dimensional.
Si se propone que una magnitud cu es igual a una constante adimensional ce, multiplicada por una magnitud a elevada a un exponente y por otra magnitud be elevada a otro exponente, podemos hallar esos exponentes comparando dimensiones.
Sigue cuatro pasos. Primero, identifica las magnitudes y sus dimensiones. Segundo, sustituye y agrupa las potencias de eme, ele y te. Tercero, iguala los exponentes correspondientes. Cuarto, resuelve el sistema algebraico e interpreta el resultado. No necesitas derivadas ni integrales.
Primer ejemplo resuelto: el período de un péndulo. Suponemos que el período tau depende de la longitud ele minúscula y de la aceleración gravitatoria ge. Escribimos tau igual a ce por longitud elevada a a, por ge elevada a be. Ce es adimensional.
El período tiene dimensión te. La longitud tiene dimensión ele. La aceleración gravitatoria tiene dimensión ele por te a la menos dos. Al sustituir y agrupar, el miembro derecho queda ele elevada a a más be, multiplicada por te elevada a menos dos be.
Comparamos exponentes. En la dimensión de longitud, a más be debe ser cero. En la dimensión de tiempo, menos dos be debe ser uno. De la segunda ecuación obtenemos be igual a menos un medio. Al sustituir en la primera, a es un medio. El período es, por tanto, ce multiplicada por la raíz cuadrada de la longitud dividida entre la aceleración gravitatoria.
El análisis dimensional no determina el valor de ce. En el modelo de péndulo simple, para ángulos pequeños, la dinámica establece ce igual a dos pi. Para amplitudes mayores también interviene el ángulo.
Segundo ejemplo: energía a partir de masa y rapidez. Suponemos energía igual a ce por masa elevada a a, por rapidez elevada a be. Ce es adimensional. La energía tiene dimensión eme por ele al cuadrado por te a la menos dos. El otro miembro tiene dimensión eme elevada a a, por ele elevada a be, por te elevada a menos be.
Al comparar exponentes, obtenemos a igual a uno y be igual a dos. Así llegamos a energía igual a ce por masa por rapidez al cuadrado. El análisis dimensional no puede deducir que ce es un medio en la expresión clásica de energía cinética.
El resultado depende de las variables elegidas y de la forma de relación supuesta. Este método no determina constantes adimensionales, como dos o pi, y no siempre produce una relación única cuando existen grupos adimensionales. Una relación obtenida mediante dimensiones debe interpretarse y contrastarse con el modelo físico.`
  ];
  const synth=window.speechSynthesis;
  const supported=Boolean(synth&&typeof window.SpeechSynthesisUtterance==='function');
  const esc=s=>String(s??'').replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
  let lesson=null,parts=[],part=0,state='idle',generation=0,utterance=null,message='',rate=1,voiceURI='';
  try{const prefs=JSON.parse(localStorage.getItem('sin-limites-audio')||'{}');if([0.8,1,1.2].includes(prefs.rate))rate=prefs.rate;voiceURI=typeof prefs.voice==='string'?prefs.voice:'';}catch{}
  function voices(){return supported?synth.getVoices().filter(v=>/^es(?:[-_]|$)/i.test(v.lang)):[];}
  function selectedVoice(){const list=voices();return list.find(v=>v.voiceURI===voiceURI)||list.find(v=>/^es[-_]PE$/i.test(v.lang))||list.find(v=>/^es[-_](MX|419)$/i.test(v.lang))||list[0];}
  function remember(){try{localStorage.setItem('sin-limites-audio',JSON.stringify({rate,voice:voiceURI}));}catch{}}
  function chunks(text){
    const sentences=text.replace(/\s+/g,' ').match(/[^.!?]+[.!?]?/g)||[];
    return sentences.flatMap(sentence=>{
      const words=sentence.trim().split(/\s+/),out=[];let line='';
      for(const word of words){if((line+' '+word).length>240){out.push(line);line=word;}else line+=(line?' ':'')+word;}
      if(line)out.push(line);return out;
    });
  }
  function status(){
    if(!supported)return 'La lectura en voz alta no está disponible en este navegador.';
    if(message)return message;
    if(state==='playing')return 'Escuchando la teoría y los ejemplos de este tema.';
    if(state==='paused')return 'Lectura pausada. Puedes reanudarla cuando quieras.';
    if(state==='finished')return 'Lectura finalizada.';
    return 'Escucha la teoría y los ejemplos con una voz en español.';
  }
  function panel(){
    return `<section class="theory-audio" aria-label="Audio de la teoría"><div><p class="eyebrow">Escucha y aprende</p><h3>Audio de este tema</h3></div><div class="audio-actions"><button type="button" class="button" data-audio="play" ${!supported||state==='playing'?'disabled':''}>${state==='paused'?'▶ Reanudar':state==='playing'?'Escuchando…':'▶ Escuchar teoría'}</button><button type="button" class="button secondary" data-audio="pause" ${!supported||state!=='playing'?'disabled':''}>Ⅱ Pausar</button><button type="button" class="button secondary" data-audio="stop" ${!supported||!['playing','paused'].includes(state)?'disabled':''}>■ Detener</button></div><div class="audio-options"><label>Velocidad<select data-audio-setting="rate" ${!supported?'disabled':''}>${[[0.8,'0,8× · pausada'],[1,'1× · normal'],[1.2,'1,2× · rápida']].map(([v,label])=>`<option value="${v}" ${rate===v?'selected':''}>${label}</option>`).join('')}</select></label><label>Voz en español<select data-audio-setting="voice" ${!supported?'disabled':''}>${voiceOptions()}</select></label></div><p class="audio-status" role="status" aria-live="polite">${esc(status())}</p><small>La voz depende del dispositivo. Al reanudar o cambiar la voz o velocidad, se repite la frase en curso.</small></section>`;
  }
  function voiceOptions(){return '<option value="">Automática · español</option>'+voices().map(v=>`<option value="${esc(v.voiceURI)}" ${voiceURI===v.voiceURI?'selected':''}>${esc(v.name)} (${esc(v.lang)})</option>`).join('');}
  function refresh(){
    const el=document.querySelector('.theory-audio');if(!el)return;
    const play=el.querySelector('[data-audio="play"]'),pause=el.querySelector('[data-audio="pause"]'),stop=el.querySelector('[data-audio="stop"]');
    play.disabled=!supported||state==='playing';play.textContent=state==='paused'?'▶ Reanudar':state==='playing'?'Escuchando…':state==='finished'?'▶ Escuchar de nuevo':'▶ Escuchar teoría';
    pause.disabled=!supported||state!=='playing';stop.disabled=!supported||!['playing','paused'].includes(state);
    el.querySelector('.audio-status').textContent=status();
  }
  function stop(){generation++;if(supported)synth.cancel();utterance=null;state='idle';part=0;message='';refresh();}
  function setLesson(index){if(index===lesson)return;stop();lesson=Number.isInteger(index)&&index>=0&&index<narratives.length?index:null;parts=lesson===null?[]:chunks(narratives[lesson]);}
  function speakPart(){
    if(!supported||lesson===null||state!=='playing')return;
    if(part>=parts.length){state='finished';utterance=null;refresh();return;}
    const token=++generation;
    utterance=new window.SpeechSynthesisUtterance(parts[part]);
    const voice=selectedVoice();utterance.lang=voice?.lang||'es-PE';if(voice)utterance.voice=voice;
    utterance.rate=rate;utterance.pitch=1;
    utterance.onend=()=>{if(token!==generation||state!=='playing')return;part++;speakPart();};
    utterance.onerror=()=>{if(token!==generation)return;state='idle';message='No se pudo iniciar la voz. Comprueba que tu dispositivo tenga una voz en español y pulsa Escuchar teoría.';utterance=null;refresh();};
    try{synth.speak(utterance);refresh();}catch{utterance.onerror();}
  }
  function play(){
    if(!supported||lesson===null||state==='playing')return;
    if(state!=='paused')part=0;
    generation++;synth.cancel();message='';state='playing';speakPart();
  }
  function pause(){if(state!=='playing')return;generation++;state='paused';synth.cancel();utterance=null;refresh();}
  document.addEventListener('click',event=>{
    const button=event.target.closest('[data-audio]');if(!button||button.disabled)return;
    if(button.dataset.audio==='play')play();else if(button.dataset.audio==='pause')pause();else if(button.dataset.audio==='stop')stop();
  });
  document.addEventListener('change',event=>{
    const el=event.target,setting=el.dataset?.audioSetting;if(!setting)return;
    if(setting==='rate'&&[0.8,1,1.2].includes(Number(el.value)))rate=Number(el.value);
    else if(setting==='voice')voiceURI=el.value;else return;
    remember();
    if(state==='playing'){pause();play();}else refresh();
  });
  if(supported)synth.addEventListener?.('voiceschanged',()=>{const select=document.querySelector('[data-audio-setting="voice"]');if(select)select.innerHTML=voiceOptions();});
  window.addEventListener('pagehide',stop);
  window.TheoryAudio={panel,setLesson,refresh,stop};
})();
