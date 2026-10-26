'use strict';
window.MECHANICAL_WAVES_CONTENT = {
  "number": 13,
  "id": "fisica-capitulo-13",
  "progressId": "fisica-capitulo-13",
  "courseId": 16,
  "courseName": "Física",
  "title": "Ondas mecánicas",
  "intro": "Comprende qué se propaga en una onda, explora sus magnitudes y estudia reflexión, interferencia, ondas estacionarias, sonido y efecto Doppler mediante animaciones interactivas.",
  "version": 1,
  "format": "physics",
  "assessmentFormat": "practice-10",
  "sourceNote": "Los ítems 1 y 2 se ajustan al material ondas.pdf proporcionado por el docente: secciones 13.7–13.8, páginas impresas 456–459 (páginas 20–23 del PDF), y la definición de período y frecuencia de la página 438. El ítem 3 desarrolla la función de una onda armónica viajera a partir del movimiento sinusoidal de la sección 13.4 (página 449) y las relaciones de propagación de las páginas 457–458. El número de onda y la fase inicial se introducen para interpretar la expresión; la fórmula general no aparece explícita en el PDF. El ítem 4 se basa en la propagación descrita en la sección 13.7 (páginas 456–457) y en la sección 13.9, ecuación 13.18 (páginas 459–460; páginas 23–24 del PDF). El ítem 5 desarrolla ondas estacionarias según la sección 14.8, páginas impresas 489–491 (páginas 53–55 del PDF), con las ecuaciones 14.15–14.17; incluye resonancia de la sección 14.9 (página 494; página 58 del PDF) y columnas de aire de la sección 14.10 (páginas 495–496; páginas 59–60 del PDF), ecuaciones 14.18–14.19. La ecuación sinusoidal del patrón y las posiciones de nodos y vientres se deducen por superposición a partir de la representación armónica del ítem 3; no son una transcripción de una fórmula explícita del PDF. Se utiliza F para la tensión y m y l minúsculas para masa y longitud, según la notación acordada con el docente. Los ítems 6 al 11 conservan su desarrollo previo y las referencias de verificación indicadas.",
  "sourceRefs": [
    {
      "title": "OpenStax · Traveling Waves",
      "url": "https://openstax.org/books/university-physics-volume-1/pages/16-1-traveling-waves"
    },
    {
      "title": "OpenStax · Types of Waves",
      "url": "https://openstax.org/books/physics/pages/13-1-types-of-waves"
    },
    {
      "title": "OpenStax · Sound Waves",
      "url": "https://openstax.org/books/university-physics-volume-1/pages/17-1-sound-waves"
    },
    {
      "title": "OpenStax · Mathematics of Waves",
      "url": "https://openstax.org/books/university-physics-volume-1/pages/16-2-mathematics-of-waves"
    },
    {
      "title": "OpenStax · Wave Speed on a Stretched String",
      "url": "https://openstax.org/books/university-physics-volume-1/pages/16-3-wave-speed-on-a-stretched-string"
    },
    {
      "title": "OpenStax · Interference of Waves",
      "url": "https://openstax.org/books/university-physics-volume-1/pages/16-5-interference-of-waves"
    },
    {
      "title": "OpenStax · Standing Waves and Resonance",
      "url": "https://openstax.org/books/university-physics-volume-1/pages/16-6-standing-waves-and-resonance"
    },
    {
      "title": "OpenStax · Sound Intensity",
      "url": "https://openstax.org/books/university-physics-volume-1/pages/17-3-sound-intensity"
    },
    {
      "title": "OpenStax · The Doppler Effect",
      "url": "https://openstax.org/books/university-physics-volume-1/pages/17-7-the-doppler-effect"
    }
  ],
  "lessons": [
    {
      "id": "naturaleza-onda",
      "title": "¿Qué es una onda mecánica?",
      "subtitle": "",
      "body": "<p>Una <strong>onda mecánica</strong> es una <strong>perturbación</strong> que se propaga a través de un <strong>medio material</strong>, como una cuerda, el agua o el aire. Para que se produzca, se necesita una <strong>fuente</strong> que origine la perturbación, un medio que pueda ser perturbado y una <strong>interacción entre sus partes vecinas</strong> que permita transmitirla de un lugar a otro.</p><p>Durante su propagación, la onda transporta <strong>energía y cantidad de movimiento</strong>. Las partículas del medio se mueven alrededor de su posición de equilibrio, pero no acompañan a la onda a lo largo de todo su recorrido: lo que avanza es la perturbación.</p><section aria-labelledby=\"tipos-ondas-mecanicas\"><h3 id=\"tipos-ondas-mecanicas\">Tipos de ondas mecánicas</h3><p>Para distinguir estos dos tipos, comparamos la <strong>dirección en la que se mueven las partículas del medio</strong> con la <strong>dirección en la que avanza la perturbación</strong>.</p><div class=\"waves-types-sections\"><section class=\"waves-property-card\" aria-labelledby=\"tipo-transversal\"><h4 id=\"tipo-transversal\">Onda transversal</h4><p>Las partículas del medio se mueven <strong>perpendicularmente</strong> a la dirección de propagación de la onda.</p><p><strong>Ejemplo: una cuerda tensa.</strong> En la animación, la onda avanza hacia la derecha y el punto P sube y baja. Estos movimientos son perpendiculares: por eso, la onda es transversal.</p><div data-wave-animation=\"transverse\"></div></section><section class=\"waves-property-card\" aria-labelledby=\"tipo-longitudinal\"><h4 id=\"tipo-longitudinal\">Onda longitudinal</h4><p>Las partículas del medio se mueven de ida y vuelta <strong>paralelamente</strong> a la dirección de propagación de la onda.</p><p><strong>Ejemplo: un resorte estirado.</strong> Al mover un extremo hacia delante y hacia atrás, se forman zonas de <strong>compresión</strong> (espiras más juntas) y de <strong>rarefacción</strong> (espiras más separadas) que avanzan a lo largo del resorte.</p><p>El <strong>sonido en el aire</strong> también es una onda longitudinal.</p><div data-wave-animation=\"longitudinal\"></div></section></div><p class=\"waves-note\"><strong>Recuerda:</strong> en ambos casos se propaga la perturbación; las partículas del medio se mueven alrededor de su posición de equilibrio.</p></section>",
      "examples": [],
      "audioSegments": []
    },
    {
      "id": "transversal-longitudinal",
      "title": "Elementos de una onda",
      "subtitle": "Reconoce crestas, valles y las magnitudes que describen la onda",
      "body": "<section id=\"elementos-onda\"><p>Al observar el perfil de una <strong>onda transversal sinusoidal en un instante</strong>, podemos reconocer sus elementos. La <strong>posición de equilibrio</strong> es la que ocuparía la cuerda si la onda no estuviera presente; en el esquema se representa con una línea horizontal discontinua.</p><figure class=\"waves-figure waves-elements-figure\" data-activity-fullscreen aria-label=\"Elementos de una onda\"><img src=\"assets/waves-elements-diagram.svg?v=20261024-amplitudefrequency1\" alt=\"Perfil de una onda transversal con crestas y valles respecto al equilibrio. La amplitud A se mide verticalmente desde el equilibrio hasta una cresta; la longitud de onda lambda se mide horizontalmente entre dos crestas consecutivas.\" width=\"900\" height=\"470\"><figcaption>La figura muestra la onda en un solo instante. Las distancias verticales describen la separación respecto al equilibrio; la longitud de onda se mide en la dirección de propagación.</figcaption></figure><h3>Elementos del perfil de la onda</h3><div class=\"waves-property-grid\"><section class=\"waves-property-card\"><h4>Cresta</h4><p>Es el <strong>punto más alto</strong> del perfil de la onda respecto de la posición de equilibrio.</p></section><section class=\"waves-property-card\"><h4>Valle o depresión</h4><p>Es el <strong>punto más bajo</strong> del perfil de la onda respecto de la posición de equilibrio.</p></section><section class=\"waves-property-card\"><h4>Amplitud \\(A\\)</h4><p>Es la <strong>máxima separación</strong> de una partícula del medio respecto de su posición de equilibrio. Se mide desde el equilibrio hasta una cresta o hasta un valle.</p></section><section class=\"waves-property-card\"><h4>Longitud de onda \\(\\lambda\\)</h4><p>Es la distancia entre <strong>dos puntos consecutivos con el mismo estado de vibración</strong>, por ejemplo, entre dos crestas consecutivas o dos valles consecutivos.</p></section></div><p class=\"waves-note\"><strong>Al medir:</strong> la amplitud es una distancia desde el equilibrio y siempre es positiva. En esta onda sinusoidal, la distancia vertical de una cresta a un valle es \\(2A\\).</p><p>En una <strong>onda longitudinal</strong>, una curva sinusoidal puede representar variaciones de presión o densidad; no indica que las partículas del medio se muevan verticalmente.</p><h3>Magnitudes que se miden en el tiempo</h3><p>El período y la frecuencia describen la oscilación de las partículas. Para medirlos necesitamos observar el movimiento durante un intervalo de tiempo.</p><div class=\"waves-property-grid\"><section class=\"waves-property-card\"><h4>Período \\(T\\)</h4><p>Es el <strong>tiempo de una oscilación completa</strong> de una partícula del medio. Se expresa en segundos.</p></section><section class=\"waves-property-card\"><h4>Frecuencia \\(f\\)</h4><p>Es el <strong>número de oscilaciones completas por segundo</strong>. Se expresa en hertz: \\(1\\,\\mathrm{Hz}=1\\,\\mathrm{s^{-1}}\\).</p></section></div><div class=\"equation\">\\[f=\\frac{1}{T},\\qquad T=\\frac{1}{f}\\]</div><p>Durante un período, la onda avanza una distancia igual a una longitud de onda. Por eso, su <strong>rapidez de propagación</strong> se relaciona con estas magnitudes mediante:</p><div class=\"equation\">\\[v=\\frac{\\lambda}{T}=\\lambda f\\]</div><div data-wave-amplitude-frequency></div></section>",
      "examples": [],
      "audioSegments": []
    },
    {
      "id": "magnitudes-onda",
      "title": "Ecuación de onda",
      "subtitle": "El desplazamiento depende de la posición y del tiempo",
      "body": "<section id=\"ecuacion-de-onda\"><p>La <strong>ecuación de una onda</strong> indica el desplazamiento de cada punto del medio en función de su <strong>posición</strong> y del <strong>tiempo</strong>. Para una onda transversal en una cuerda, \\(x\\) ubica el punto que observamos y \\(y(x,t)\\) indica cuánto se separa del equilibrio.</p><p>Al combinar el movimiento sinusoidal con la propagación de la perturbación, obtenemos la representación de una <strong>onda armónica viajera</strong>. Una forma para el avance en el sentido positivo del eje \\(x\\) es:</p><div class=\"equation\">\\[\\boxed{y(x,t)=A\\cos(\\omega t-kx+\\varphi_0)}\\]</div><ul><li><strong>\\(y(x,t)\\):</strong> desplazamiento local de la partícula respecto al equilibrio. Se expresa en metros.</li><li><strong>\\(x\\):</strong> posición de la partícula a lo largo del medio. Se expresa en metros.</li><li><strong>\\(t\\):</strong> instante en el que se observa la onda. Se expresa en segundos.</li></ul><h3>Significado de los parámetros</h3><div class=\"waves-property-grid\"><section class=\"waves-property-card\"><h4>Amplitud \\(A\\)</h4><p>Es la máxima separación de una partícula respecto al equilibrio. Determina la altura de las crestas y la profundidad de los valles en la gráfica del desplazamiento. Se expresa en metros.</p></section><section class=\"waves-property-card\"><h4>Número de onda \\(k\\)</h4><p>Describe cómo cambia la fase con la posición. Se relaciona con la longitud de onda \\(\\lambda\\) y se expresa en radianes por metro.</p><div class=\"equation\">\\[k=\\frac{2\\pi}{\\lambda}\\]</div></section><section class=\"waves-property-card\"><h4>Frecuencia angular \\(\\omega\\)</h4><p>Describe cómo cambia la fase con el tiempo. Se expresa en radianes por segundo y se relaciona con la frecuencia \\(f\\) y el período \\(T\\):</p><div class=\"equation\">\\[\\omega=2\\pi f=\\frac{2\\pi}{T}\\]</div></section><section class=\"waves-property-card\"><h4>Fase inicial \\(\\varphi_0\\)</h4><p>Fija el estado inicial de la oscilación en \\(x=0\\) y \\(t=0\\). Se expresa en radianes. Con esta forma de la ecuación:</p><div class=\"equation\">\\[y(0,0)=A\\cos\\varphi_0\\]</div></section></div><p>La expresión \\(\\omega t-kx+\\varphi_0\\) es la <strong>fase</strong> de la onda. El argumento del coseno se expresa en radianes. También se puede utilizar una función seno, con la fase inicial correspondiente.</p><h3>Sentido de propagación</h3><p>Para \\(k>0\\) y \\(\\omega>0\\), manteniendo positivo el término \\(\\omega t\\), el signo del término espacial permite distinguir el sentido de avance:</p><div class=\"waves-property-grid\"><section class=\"waves-property-card\"><h4>Hacia \\(+x\\)</h4><p>La perturbación avanza hacia posiciones crecientes de \\(x\\).</p><div class=\"equation\">\\[y=A\\cos(\\omega t-kx+\\varphi_0)\\]</div></section><section class=\"waves-property-card\"><h4>Hacia \\(-x\\)</h4><p>La perturbación avanza hacia posiciones decrecientes de \\(x\\).</p><div class=\"equation\">\\[y=A\\cos(\\omega t+kx+\\varphi_0)\\]</div></section></div><p>La <strong>rapidez de propagación</strong> corresponde al avance del patrón de la onda por el medio. Sus parámetros se relacionan mediante:</p><div class=\"equation\">\\[v=\\frac{\\omega}{k}=\\lambda f\\]</div><h3>Dos maneras de leer la misma ecuación</h3><ul><li><strong>Tiempo fijo:</strong> \\(y(x,t_0)\\) muestra el perfil de toda la cuerda en un instante. La repetición espacial está dada por \\(\\lambda\\).</li><li><strong>Posición fija:</strong> \\(y(x_0,t)\\) muestra cómo oscila una partícula al transcurrir el tiempo. La repetición temporal está dada por \\(T\\).</li></ul><figure class=\"waves-figure waves-elements-figure wave-equation-figure\" data-activity-fullscreen aria-label=\"Cómo leer la ecuación de onda\"><picture><source media=\"(max-width:600px)\" srcset=\"assets/wave-equation-reading-mobile.svg?v=20261024-waveequation1\"><img src=\"assets/wave-equation-reading.svg?v=20261024-waveequation1\" width=\"900\" height=\"530\" alt=\"Dos gráficas de una onda armónica con fase inicial cero: a tiempo fijo se observa el desplazamiento en función de la posición y se mide la longitud de onda; en una posición fija se observa el desplazamiento en función del tiempo y se mide el período.\"></picture><figcaption>Se ilustran los casos \\(t=0\\) y \\(x=0\\), con fase inicial cero. Las dos gráficas tienen una forma sinusoidal, pero sus ejes horizontales representan magnitudes distintas.</figcaption></figure><p class=\"waves-note\"><strong>Al interpretar:</strong> \\(x\\) señala dónde está una partícula y \\(y\\) describe su desplazamiento. La rapidez \\(v\\) corresponde al avance de la onda, no al movimiento instantáneo de esa partícula.</p><div id=\"comparador-ecuacion-onda\" data-wave-equation-comparison></div></section>",
      "examples": [],
      "audioSegments": []
    },
    {
      "id": "ecuacion-onda",
      "title": "Onda en una cuerda",
      "subtitle": "Propagación transversal y rapidez en una cuerda tensa",
      "body": "<section id=\"onda-en-cuerda\"><h3>Cómo se propaga la onda</h3><p>Al mover hacia arriba y hacia abajo un extremo de una <strong>cuerda larga y tensa</strong>, se produce una deformación que avanza a lo largo de ella. Una perturbación aislada de este tipo se llama <strong>pulso</strong>.</p><p>Mientras el pulso avanza, cada pequeño segmento de la cuerda se mueve <strong>perpendicularmente</strong> a la dirección de propagación y transmite la perturbación a sus vecinos. La onda es <strong>transversal</strong>: el punto de la cuerda no acompaña al pulso a lo largo de todo su recorrido.</p><figure class=\"waves-figure waves-elements-figure\" data-activity-fullscreen aria-label=\"Propagación de un pulso en una cuerda\"><picture><source media=\"(max-width:600px)\" srcset=\"assets/string-wave-propagation-mobile.svg?v=20261025-stringnotation1\"><img src=\"assets/string-wave-propagation.svg?v=20261025-stringnotation1\" width=\"900\" height=\"680\" alt=\"La misma cuerda en tres instantes. Un pulso conserva su forma y avanza hacia la derecha; el punto P permanece en la misma posición horizontal, sube cuando pasa la cresta y luego regresa al equilibrio. Las fuerzas de tensión actúan a lo largo de la cuerda.\"></picture><figcaption>Cada fila representa la misma cuerda en un instante diferente. El pulso avanza a lo largo de ella; el punto \\(P\\) se mueve transversalmente y vuelve a su posición de equilibrio.</figcaption></figure><h3>Rapidez de propagación en la cuerda</h3><p>Para una <strong>cuerda uniforme y estirada</strong>, la rapidez con la que viaja la perturbación depende de la <strong>fuerza de tensión</strong> y de la <strong>densidad lineal</strong> de la cuerda:</p><div class=\"equation\">\\[\\boxed{v=\\sqrt{\\frac{F}{\\mu}}}\\]</div><p>En esta expresión, \\(v\\) es la rapidez de propagación y se expresa en \\(\\mathrm{m/s}\\). No debe confundirse con la velocidad vertical de un segmento de la cuerda.</p><div class=\"waves-property-grid\"><section class=\"waves-property-card\"><h4>Tensión \\(F\\)</h4><p>Es la <strong>fuerza con la que se mantiene estirada la cuerda</strong>. Se expresa en newtons \\(\\mathrm{(N)}\\).</p></section><section class=\"waves-property-card\"><h4>Densidad lineal \\(\\mu\\)</h4><p>Es la <strong>masa por unidad de longitud</strong> de la cuerda. Para una cuerda uniforme de masa \\(m\\) y longitud \\(l\\):</p><div class=\"equation\">\\[\\mu=\\frac{m}{l}\\]</div><p>Si \\(m\\) está en kilogramos y \\(l\\) en metros, \\(\\mu\\) se expresa en \\(\\mathrm{kg/m}\\).</p></section></div><p>Al sustituir la densidad lineal, la misma ecuación puede escribirse como:</p><div class=\"equation\">\\[v=\\sqrt{\\frac{F l}{m}}\\]</div><h3>De qué depende la rapidez</h3><div class=\"waves-property-grid\"><section class=\"waves-property-card\"><h4>Mayor tensión, mayor rapidez</h4><p>Para la <strong>misma densidad lineal</strong>, la rapidez aumenta con la raíz cuadrada de la tensión:</p><div class=\"equation\">\\[v\\propto\\sqrt{F}\\]</div><p>Si la tensión se cuadruplica, la rapidez se duplica.</p></section><section class=\"waves-property-card\"><h4>Mayor densidad lineal, menor rapidez</h4><p>Para la <strong>misma tensión</strong>, una cuerda con más masa por unidad de longitud transmite la perturbación más lentamente:</p><div class=\"equation\">\\[v\\propto\\frac{1}{\\sqrt{\\mu}}\\]</div><p>Si la densidad lineal se cuadruplica, la rapidez se reduce a la mitad.</p></section></div><p class=\"waves-note\"><strong>En este modelo:</strong> la rapidez depende de las propiedades de la cuerda y de su tensión, <strong>no de la amplitud de vibración</strong>. Una mayor amplitud no implica que el pulso se propague más rápido.</p><p>La relación entre la rapidez, la longitud de onda y la frecuencia sigue siendo:</p><div class=\"equation\">\\[v=\\frac{\\lambda}{T}=\\lambda f\\]</div><p>La ecuación \\(v=\\sqrt{F/\\mu}\\) permite obtener la rapidez a partir de las características de la cuerda; la relación \\(v=\\lambda f\\) conecta esa rapidez con las magnitudes de la onda.</p><div id=\"simulador-cuerda\" data-string-wave-speed></div></section>",
      "examples": [],
      "audioSegments": []
    },
    {
      "id": "rapidez-cuerda",
      "title": "Ondas estacionarias",
      "subtitle": "Superposición, nodos, vientres y modos de vibración",
      "body": "<section id=\"teoria-ondas-estacionarias\">\n<h3>¿Qué es una onda estacionaria?</h3>\n<p>Una <strong>onda estacionaria</strong> es el patrón que se forma al superponerse dos ondas de igual frecuencia, longitud de onda y amplitud que se propagan por el mismo medio en <strong>sentidos opuestos</strong>. A diferencia de una onda viajera, su patrón no se desplaza a lo largo del medio: presenta puntos que permanecen en reposo y otros que oscilan con distintas amplitudes.</p>\n<p>En una cuerda tensa, una onda que llega a un extremo puede <strong>reflejarse</strong>. La onda incidente y la reflejada recorren la cuerda en sentidos contrarios y sus desplazamientos se suman. Cuando la frecuencia es adecuada para la longitud y las condiciones de los extremos, se establece un patrón estacionario.</p>\n<p class=\"waves-note\"><strong>Estacionaria no significa inmóvil:</strong> el patrón conserva la ubicación de sus nodos y vientres, pero los puntos de la cuerda que no son nodos continúan oscilando.</p>\n\n<h3>Superposición y ecuación de la onda estacionaria</h3>\n<p>El <strong>principio de superposición</strong> establece que el desplazamiento resultante de un punto es la suma de los desplazamientos producidos por cada onda en ese mismo lugar e instante:</p>\n<div class=\"equation\">\\[y(x,t)=y_1(x,t)+y_2(x,t)\\]</div>\n<p>Podemos expresar matemáticamente el patrón utilizando las ondas armónicas del ítem 3. Si elegimos el origen en un nodo y una fase inicial conveniente, las dos ondas viajeras se escriben:</p>\n<div class=\"equation\">\\[y_1=A\\sin(kx-\\omega t)\\]</div>\n<div class=\"equation\">\\[y_2=A\\sin(kx+\\omega t)\\]</div>\n<p>Al sumar estas expresiones mediante una identidad trigonométrica, obtenemos:</p>\n<div class=\"equation\">\\[\\boxed{y(x,t)=2A\\sin(kx)\\cos(\\omega t)}\\]</div>\n<ul><li>\\(A\\) es la amplitud de <strong>cada onda viajera</strong>, expresada en metros.</li><li>\\(k=2\\pi/\\lambda\\) es el número de onda, expresado en radianes por metro.</li><li>\\(\\omega=2\\pi f\\) es la frecuencia angular, expresada en radianes por segundo.</li><li>\\(x\\) indica la posición en el medio y \\(t\\), el tiempo.</li></ul>\n<p>El factor \\(\\cos(\\omega t)\\) describe la oscilación temporal. El factor espacial determina la <strong>amplitud local</strong>, que depende de la posición:</p>\n<div class=\"equation\">\\[a(x)=2A\\lvert\\sin(kx)\\rvert\\]</div>\n<p>Todos los puntos que vibran tienen la misma frecuencia, pero no necesariamente la misma amplitud. La amplitud máxima del patrón es \\(2A\\); no debe confundirse con la amplitud \\(A\\) de cada onda que lo origina.</p>\n\n<div id=\"superposicion-onda-estacionaria\" data-standing-wave-superposition></div>\n<h3>Nodos, vientres y sus separaciones</h3>\n<div class=\"waves-property-grid\">\n<section class=\"waves-property-card\"><h4>Nodos</h4><p>Son los puntos que <strong>permanecen en la posición de equilibrio en todo instante</strong>. Las contribuciones de las dos ondas tienen igual magnitud y signos opuestos, por lo que se anulan.</p><div class=\"equation\">\\[a(x)=0\\]</div><p>Con el origen elegido en un nodo, sus posiciones cumplen:</p><div class=\"equation\">\\[x_j=j\\frac{\\lambda}{2}\\]</div></section>\n<section class=\"waves-property-card\"><h4>Vientres o antinodos</h4><p>Son los puntos que oscilan con la <strong>máxima amplitud</strong>. Cada vientre está a mitad de camino entre dos nodos consecutivos.</p><div class=\"equation\">\\[a(x)=2A\\]</div><p>Sus posiciones, con el mismo origen, son:</p><div class=\"equation\">\\[x_j=(2j+1)\\frac{\\lambda}{4}\\]</div></section>\n</div>\n<p>En estas posiciones, \\(j=0,1,2,\\ldots\\), considerando únicamente los puntos que pertenecen al tramo de medio estudiado.</p>\n<figure id=\"nodos-y-antinodos\" class=\"waves-figure waves-elements-figure waves-nodes-figure\" data-activity-fullscreen aria-label=\"Nodos y antinodos de una onda estacionaria\"><img src=\"assets/standing-wave-nodes-antinodes.svg?v=20261025-nodesfigure1\" width=\"600\" height=\"540\" alt=\"Una cuerda fija en ambos extremos, en su segundo armónico y en un instante de máxima deformación. Tres nodos dorados están en los extremos y en el centro, sobre el equilibrio. Dos antinodos verdes, también llamados vientres, están a un cuarto y a tres cuartos de la longitud: uno arriba y otro abajo. Todos están señalados con su nombre.\"><figcaption>Los <strong>nodos</strong> permanecen siempre en equilibrio. Los <strong>antinodos o vientres</strong> oscilan con la máxima amplitud; también pasan por el equilibrio. La imagen muestra un instante de máxima deformación.</figcaption></figure>\n<ul><li>Entre <strong>dos nodos consecutivos</strong>: \\(d_{NN}=\\lambda/2\\).</li><li>Entre <strong>dos vientres consecutivos</strong>: \\(d_{VV}=\\lambda/2\\).</li><li>Entre <strong>un nodo y el vientre vecino</strong>: \\(d_{NV}=\\lambda/4\\).</li></ul>\n<p>La porción de cuerda comprendida entre dos nodos consecutivos forma un <strong>lazo o segmento de vibración</strong>. Los puntos de un mismo lazo oscilan en fase; los de lazos vecinos se mueven en sentidos opuestos en un mismo instante.</p>\n<p class=\"waves-note\"><strong>Cómo reconocer un nodo:</strong> un punto no es nodo solo porque pase por el equilibrio. Los vientres también lo atraviesan durante su oscilación; el nodo permanece allí todo el tiempo.</p>\n\n<h3>Cuerda fija en ambos extremos: modos normales</h3>\n<p>Consideremos una cuerda uniforme de longitud \\(l\\), fija en \\(x=0\\) y \\(x=l\\). Ambos extremos deben ser nodos, ya que no pueden desplazarse:</p>\n<div class=\"equation\">\\[y(0,t)=0,\\qquad y(l,t)=0\\]</div>\n<p>Para satisfacer esta condición, en la longitud de la cuerda debe caber un <strong>número entero de medias longitudes de onda</strong>. Cada patrón permitido se denomina <strong>modo normal de vibración</strong>:</p>\n<div class=\"equation\">\\[l=n\\frac{\\lambda_n}{2}\\]</div>\n<div class=\"equation\">\\[\\boxed{\\lambda_n=\\frac{2l}{n}}\\]</div>\n<p>El número \\(n=1,2,3,\\ldots\\) identifica el modo o armónico. De esta condición también se obtiene \\(k_n=n\\pi/l\\). En el modo \\(n\\), la cuerda tiene <strong>\\(n\\) vientres y \\(n+1\\) nodos</strong>, contando los dos extremos.</p>\n<p>Como las ondas que forman el patrón cumplen \\(v=\\lambda_n f_n\\), las frecuencias permitidas son:</p>\n<div class=\"equation\">\\[\\boxed{f_n=\\frac{nv}{2l}=nf_1}\\]</div>\n<p>Aquí, \\(v\\) es la <strong>rapidez de las ondas viajeras en la cuerda</strong>; no es la rapidez de avance del patrón estacionario.</p>\n\n<h3>Frecuencia fundamental y primeros armónicos</h3>\n<p>La <strong>frecuencia fundamental</strong> es la menor frecuencia natural de vibración y corresponde al primer armónico:</p>\n<div class=\"equation\">\\[f_1=\\frac{v}{2l}\\]</div>\n<ol><li><strong>Primer armónico, \\(n=1\\):</strong> tiene un vientre en el centro y dos nodos en los extremos. La cuerda contiene media longitud de onda: \\(\\lambda_1=2l\\).</li><li><strong>Segundo armónico, \\(n=2\\):</strong> tiene dos vientres y tres nodos, uno de ellos en el centro. Se cumple \\(\\lambda_2=l\\) y \\(f_2=2f_1\\).</li><li><strong>Tercer armónico, \\(n=3\\):</strong> tiene tres vientres y cuatro nodos. Se cumple \\(\\lambda_3=2l/3\\) y \\(f_3=3f_1\\).</li></ol>\n<p>Las frecuencias \\(f_1,2f_1,3f_1,\\ldots\\) forman una <strong>serie armónica</strong>. Al aumentar \\(n\\), hay más lazos, la longitud de onda disminuye y la frecuencia aumenta. Para la misma tensión y densidad lineal, la rapidez \\(v\\) permanece constante.</p>\n<p>Una cuerda real puede vibrar como una combinación de varios modos. Esa mezcla de armónicos contribuye al <strong>timbre</strong> que permite distinguir instrumentos que emiten la misma frecuencia fundamental.</p>\n\n<div id=\"animacion-armonicos\" data-standing-wave-harmonics></div>\n<h3>Relación con la tensión, la densidad lineal y la longitud</h3>\n<p>Usamos la rapidez estudiada en el ítem 4, para una cuerda ideal con pequeñas oscilaciones:</p>\n<div class=\"equation\">\\[v=\\sqrt{\\frac{F}{\\mu}},\\qquad \\mu=\\frac{m}{l}\\]</div>\n<p>\\(F\\) es la fuerza de tensión en newtons, \\(m\\) es la masa en kilogramos del tramo de longitud \\(l\\) en metros, y \\(\\mu\\) es la densidad lineal en \\(\\mathrm{kg/m}\\). Al sustituir la rapidez:</p>\n<div class=\"equation\">\\[\\boxed{f_n=\\frac{n}{2l}\\sqrt{\\frac{F}{\\mu}}}\\]</div>\n<ul><li><strong>Mayor tensión:</strong> si \\(l\\), \\(\\mu\\) y \\(n\\) se mantienen, \\(f_n\\propto\\sqrt{F}\\). Cuadruplicar la tensión duplica la frecuencia.</li><li><strong>Mayor densidad lineal:</strong> si \\(l\\), \\(F\\) y \\(n\\) se mantienen, \\(f_n\\propto1/\\sqrt{\\mu}\\). Cuadruplicar la densidad lineal reduce la frecuencia a la mitad.</li><li><strong>Mayor longitud vibrante:</strong> si \\(F\\), \\(\\mu\\) y \\(n\\) se mantienen, \\(f_n\\propto1/l\\). Duplicar la longitud reduce la frecuencia a la mitad.</li></ul>\n<p>En una guitarra, las clavijas modifican la tensión y los trastes cambian la longitud efectiva del tramo que vibra. Así se modifican las frecuencias naturales de la cuerda.</p>\n\n<h3>Frecuencias naturales y resonancia</h3>\n<p>Las frecuencias \\(f_n\\) son las <strong>frecuencias naturales</strong> del sistema. Cuando una fuerza periódica actúa a una frecuencia cercana a una de ellas, la amplitud de la vibración aumenta: este fenómeno se llama <strong>resonancia</strong>.</p>\n<p>La coincidencia entre la frecuencia de excitación y una frecuencia natural favorece un patrón estacionario de gran amplitud. En un sistema real, el rozamiento y otras pérdidas de energía limitan esa amplitud.</p>\n\n<h3>Ondas estacionarias en columnas de aire</h3>\n<p>También pueden formarse por la superposición de ondas sonoras que viajan en sentidos opuestos dentro de un tubo. Son ondas <strong>longitudinales</strong>: las partículas de aire oscilan a lo largo del tubo. En las relaciones siguientes, \\(v_s\\) es la rapidez del sonido y \\(l\\), la longitud de la columna de aire.</p>\n<p>Para describir los extremos debemos indicar qué magnitud observamos. En el <strong>desplazamiento del aire</strong>, un extremo cerrado es un nodo y un extremo abierto es un vientre. En las variaciones de presión ocurre lo contrario.</p>\n<div class=\"waves-property-grid\">\n<section class=\"waves-property-card\"><h4>Tubo abierto en ambos extremos</h4><p>Presenta vientres de desplazamiento en los dos extremos. En el modelo ideal admite todos los armónicos:</p><div class=\"equation\">\\[\\lambda_n=\\frac{2l}{n}\\]</div><div class=\"equation\">\\[f_n=\\frac{nv_s}{2l}\\]</div><p>Con \\(n=1,2,3,\\ldots\\), las frecuencias son \\(f_1,2f_1,3f_1,\\ldots\\).</p></section>\n<section class=\"waves-property-card\"><h4>Tubo cerrado en un extremo</h4><p>El extremo cerrado es nodo de desplazamiento y el abierto es vientre. En el modelo ideal solo admite armónicos impares:</p><div class=\"equation\">\\[\\lambda_n=\\frac{4l}{n}\\]</div><div class=\"equation\">\\[f_n=\\frac{nv_s}{4l}\\]</div><p>Con \\(n=1,3,5,\\ldots\\), las frecuencias son \\(f_1,3f_1,5f_1,\\ldots\\). La segunda frecuencia permitida corresponde al tercer armónico.</p></section>\n</div>\n<p class=\"waves-note\"><strong>Al aplicar las fórmulas:</strong> identifica primero el medio y las condiciones de sus extremos. La cuerda fija en ambos extremos admite todos los armónicos; la columna de aire abierta en un extremo y cerrada en el otro admite solo los impares.</p>\n</section>",
      "examples": [],
      "audioSegments": []
    },
    {
      "id": "reflexion-pulsos",
      "title": "Reflexión de pulsos: extremo fijo y libre",
      "subtitle": "Qué cambia cuando la perturbación regresa",
      "body": "<p>Un pulso se refleja al encontrar una frontera. En el modelo ideal de una cuerda, la condición del extremo determina cómo regresa. Si el extremo está <strong>fijo</strong>, su desplazamiento debe ser cero: el pulso reflejado se <strong>invierte</strong>. Una cresta incidente regresa como un valle.</p><p>En un extremo idealmente <strong>libre</strong>, el punto puede desplazarse transversalmente y el pulso se refleja <strong>sin inversión</strong>. Durante el encuentro, el desplazamiento observado se obtiene sumando el pulso incidente y el reflejado.</p><ul><li><strong>Extremo fijo:</strong> las contribuciones se cancelan en la frontera en todo instante.</li><li><strong>Extremo libre:</strong> cuando coinciden allí dos crestas iguales, el desplazamiento instantáneo puede llegar a \\(2A\\).</li><li>En la reflexión ideal, la onda regresa al mismo medio; su rapidez de propagación no cambia.</li></ul><p>La inversión se refiere al desplazamiento de la cuerda. No significa que el pulso pierda su energía por cambiar de signo.</p><div class=\"key\"><b>Idea clave</b>Observa el instante del encuentro, además del pulso que ya regresa. La frontera impone una condición durante toda la reflexión.</div><div data-wave-lab=\"reflection\"></div>",
      "examples": [],
      "audioSegments": [
        {
          "title": "Comprende la idea",
          "text": "En el extremo fijo, la cuerda no puede desplazarse. Por eso el pulso reflejado se invierte: una cresta regresa como un valle. En el extremo libre ideal, regresa sin inversión."
        },
        {
          "title": "Explora la animación",
          "text": "Elige el tipo de extremo, lanza el pulso y observa el encuentro con la frontera. Puedes pausar para comparar la contribución incidente, la reflejada y el desplazamiento total de la cuerda."
        },
        {
          "title": "Haz una predicción",
          "text": "En el extremo fijo, predice el desplazamiento de la frontera durante el encuentro: siempre es cero. En el libre, dos crestas iguales pueden sumar un desplazamiento instantáneo igual al doble de la amplitud incidente."
        }
      ]
    },
    {
      "id": "superposicion",
      "title": "Superposición e interferencia",
      "subtitle": "Sumar desplazamientos sin confundirlos con energía",
      "body": "<p>Cuando dos ondas coinciden en una región de un medio lineal, el desplazamiento resultante es la suma algebraica de sus desplazamientos en ese lugar y en ese instante:</p><div class=\"equation\">\\[\\boxed{y_{\\mathrm R}=y_1+y_2}\\]</div><p>Hay <strong>interferencia constructiva</strong> si las contribuciones tienen el mismo signo; hay <strong>interferencia destructiva</strong> si tienen signos opuestos. Dos pulsos iguales y contrarios pueden anular temporalmente el desplazamiento mientras se superponen. Después, en el modelo ideal, continúan propagándose y conservan su forma.</p><p>Para dos ondas armónicas que avanzan en el mismo sentido, con igual frecuencia y diferencia de fase constante \\(\\Delta\\varphi\\):</p><div class=\"equation\">\\[A_{\\mathrm R}^2=A_1^2+A_2^2+2A_1A_2\\cos(\\Delta\\varphi)\\]</div><p>Si ambas amplitudes valen \\(A\\), se simplifica a:</p><div class=\"equation\">\\[A_{\\mathrm R}=2A\\left|\\cos\\frac{\\Delta\\varphi}{2}\\right|\\]</div><ul><li>En fase: \\(\\Delta\\varphi=0\\), amplitud \\(2A\\).</li><li>En oposición: \\(\\Delta\\varphi=\\pi\\), amplitud nula si ambas amplitudes son iguales.</li></ul><div class=\"key\"><b>Idea clave</b>Se suman desplazamientos con su signo. Un instante de desplazamiento nulo no demuestra que la energía haya desaparecido.</div><div data-wave-lab=\"superposition\"></div>",
      "examples": [],
      "audioSegments": [
        {
          "title": "Comprende la idea",
          "text": "El principio de superposición suma los desplazamientos, con sus signos. Dos crestas pueden reforzarse; una cresta y un valle pueden reducirse o cancelarse temporalmente. No sumes solamente sus valores positivos."
        },
        {
          "title": "Explora la animación",
          "text": "Sigue los dos pulsos antes, durante y después del encuentro. Cambia el signo relativo y compara cada contribución con la curva resultante. La suma debe verificarse punto por punto."
        },
        {
          "title": "Haz una predicción",
          "text": "Si dos pulsos opuestos se cancelan mientras coinciden, predice qué sucede después. En el modelo lineal ideal vuelven a separarse y siguen avanzando: la cancelación del desplazamiento no los destruye."
        }
      ]
    },
    {
      "id": "ondas-estacionarias",
      "title": "Ondas estacionarias y armónicos",
      "subtitle": "Nodos que permanecen quietos y vientres que oscilan",
      "body": "<p>Dos ondas armónicas de igual amplitud, frecuencia y longitud de onda, que avanzan en sentidos opuestos, pueden formar una <strong>onda estacionaria</strong>. El patrón deja de trasladarse: presenta puntos siempre inmóviles, llamados <strong>nodos</strong>, y puntos de máxima amplitud, llamados <strong>vientres o antinodos</strong>.</p><div class=\"equation\">\\[y(x,t)=2A\\,\\operatorname{sen}\\left(\\frac{n\\pi x}{L}\\right)\\cos(2\\pi f_n t)\\]</div><p>Para una cuerda de longitud \\(L\\) fija en ambos extremos, solamente se admiten los modos que contienen un número entero \\(n\\) de medias longitudes de onda:</p><div class=\"equation\">\\[L=n\\frac{\\lambda_n}{2},\\qquad \\lambda_n=\\frac{2L}{n},\\qquad \\boxed{f_n=\\frac{nv}{2L}}\\]</div><ul><li>El modo fundamental corresponde a \\(n=1\\).</li><li>El modo \\(n\\) tiene \\(n\\) vientres y \\(n+1\\) nodos, contando los extremos.</li><li>Entre nodos consecutivos hay \\(\\lambda/2\\); entre un nodo y el vientre vecino, \\(\\lambda/4\\).</li></ul><div class=\"key\"><b>Idea clave</b>En esta expresión A es la amplitud de cada onda viajera; la amplitud máxima del patrón resultante es 2A.</div><div data-wave-lab=\"standing\"></div>",
      "examples": [],
      "audioSegments": [
        {
          "title": "Comprende la idea",
          "text": "Una onda estacionaria presenta nodos que siempre permanecen inmóviles y vientres donde la oscilación es máxima. Surge al superponer ondas iguales que viajan en sentidos contrarios. Su patrón no avanza por la cuerda."
        },
        {
          "title": "Explora la animación",
          "text": "Cambia el número de armónico y cuenta los vientres. En una cuerda fija en ambos extremos, el armónico número n contiene n vientres y n más uno nodos, incluyendo los extremos."
        },
        {
          "title": "Haz una predicción",
          "text": "Si mantienes la misma cuerda y la misma rapidez, predice la frecuencia del segundo armónico. Es el doble de la fundamental. Su longitud de onda, en cambio, es la mitad."
        }
      ]
    },
    {
      "id": "sonido",
      "title": "Sonido e intensidad",
      "subtitle": "Compresiones del medio, energía y nivel sonoro",
      "body": "<p>El sonido es una onda mecánica. En el aire y en otros fluidos, se propaga como una sucesión de compresiones y rarefacciones. Las partículas del aire oscilan alrededor del equilibrio; no viajan desde el emisor hasta el oyente. La frecuencia se relaciona con el <strong>tono</strong>: a mayor frecuencia, un sonido se percibe más agudo.</p><p>La <strong>intensidad</strong> es la potencia que atraviesa una unidad de área. Para una fuente puntual ideal que emite uniformemente en todas direcciones, sin absorción ni obstáculos:</p><div class=\"equation\">\\[I=\\frac{P}{4\\pi r^2},\\qquad [I]=\\mathrm{W/m^2}\\]</div><p>Al duplicar la distancia, la misma potencia se distribuye sobre un área cuatro veces mayor y la intensidad baja a la cuarta parte. El nivel de intensidad sonora se expresa en decibelios:</p><div class=\"equation\">\\[\\beta=10\\log_{10}\\left(\\frac{I}{I_0}\\right),\\qquad I_0=10^{-12}\\,\\mathrm{W/m^2}\\]</div><div class=\"key\"><b>Idea clave</b>Tono e intensidad son propiedades diferentes. La gráfica de una onda sonora puede representar presión o desplazamiento, no una trayectoria ondulada de las moléculas.</div><div data-wave-lab=\"sound\"></div>",
      "examples": [],
      "audioSegments": [
        {
          "title": "Comprende la idea",
          "text": "El sonido en el aire consiste en compresiones y rarefacciones longitudinales. Una frecuencia mayor se relaciona con un tono más agudo. La intensidad describe otra propiedad: la potencia transportada por cada unidad de área."
        },
        {
          "title": "Explora la animación",
          "text": "Sigue las partículas del modelo y observa las zonas comprimidas. Compara también el efecto de cambiar la frecuencia con el de aumentar la distancia a una fuente ideal. Si hay un control de tono, el sonido solo se inicia al activarlo."
        },
        {
          "title": "Haz una predicción",
          "text": "Al duplicar la distancia a una fuente puntual que emite uniformemente, la intensidad se reduce a la cuarta parte. Esto supone propagación sin absorción ni obstáculos. No confundas esta disminución con un cambio de frecuencia."
        }
      ]
    },
    {
      "id": "fenomenos-ondulatorios",
      "title": "Reflexión, refracción y difracción",
      "subtitle": "Lo que hacen los frentes de onda ante una frontera",
      "body": "<p>La <strong>reflexión</strong> devuelve una onda al medio de origen. Para un frente plano y una frontera recta, el ángulo de incidencia es igual al de reflexión. Ambos se miden desde la <strong>normal</strong>, perpendicular a la frontera.</p><p>La <strong>refracción</strong> ocurre cuando la onda pasa a una región donde cambia su rapidez. Si llega oblicuamente, también puede cambiar su dirección. Con una frontera estacionaria, la frecuencia se conserva y la longitud de onda cambia según \\(\\lambda=v/f\\). Para una onda transmitida en dos medios homogéneos:</p><div class=\"equation\">\\[\\frac{\\operatorname{sen}\\theta_1}{v_1}=\\frac{\\operatorname{sen}\\theta_2}{v_2}\\]</div><p>La <strong>difracción</strong> es la expansión de una onda al atravesar una abertura o bordear un obstáculo. Resulta especialmente apreciable cuando el tamaño de la abertura es comparable con la longitud de onda.</p><p>Los frentes unen puntos en la misma fase. La animación representa estas geometrías de manera didáctica; no constituye un cálculo de todas las amplitudes del campo.</p><div class=\"key\"><b>Idea clave</b>Distingue el cambio de dirección al pasar a otro medio del ensanchamiento al atravesar una abertura. La normal permite comparar correctamente los ángulos.</div><div data-wave-lab=\"wavefronts\"></div>",
      "examples": [],
      "audioSegments": [
        {
          "title": "Comprende la idea",
          "text": "En la reflexión, la onda regresa al medio del que procede. En la refracción, pasa a una región con otra rapidez. En la difracción, se extiende al atravesar una abertura o bordear un obstáculo."
        },
        {
          "title": "Explora la animación",
          "text": "Compara los tres fenómenos. En los casos con ángulos, mídelo siempre desde la normal. Al cambiar de medio, observa que la frecuencia se conserva mientras pueden cambiar la rapidez y la longitud de onda."
        },
        {
          "title": "Haz una predicción",
          "text": "Predice en qué caso la difracción será más apreciable: cuando la abertura sea muy grande respecto de la longitud de onda o cuando ambas sean comparables. La expansión es más apreciable en el segundo caso."
        }
      ]
    },
    {
      "id": "efecto-doppler",
      "title": "Efecto Doppler",
      "subtitle": "Frecuencia emitida y frecuencia observada",
      "body": "<p>La frecuencia que detecta un observador puede diferir de la que emite una fuente cuando existe movimiento respecto del medio. En el <strong>efecto Doppler</strong> sonoro, el acercamiento produce una frecuencia observada mayor y el alejamiento, una menor, en los casos lineales considerados.</p><p>Para una fuente y un observador alineados, con el medio en reposo y sin superar las condiciones de propagación subsónica del modelo:</p><div class=\"equation\">\\[\\boxed{f_{\\mathrm{obs}}=f_{\\mathrm{fuente}}\\frac{v+v_o}{v-v_s}}\\]</div><ul><li>\\(v\\): rapidez del sonido respecto del medio.</li><li>\\(v_o\\): velocidad del observador, positiva si se dirige hacia la fuente y negativa si se aleja.</li><li>\\(v_s\\): velocidad de la fuente, positiva si se dirige hacia el observador y negativa si se aleja.</li></ul><p>Si la fuente se mueve, los frentes emitidos se concentran por delante y se separan por detrás. Su frecuencia propia no cambia por ese movimiento; lo que cambia es la frecuencia recibida.</p><div class=\"key\"><b>Idea clave</b>Define el sentido de cada velocidad antes de sustituir. La fórmula presentada corresponde al sonido en un medio y al movimiento sobre una misma línea.</div><div data-wave-lab=\"doppler\"></div>",
      "examples": [],
      "audioSegments": [
        {
          "title": "Comprende la idea",
          "text": "Una fuente que se acerca puede percibirse con frecuencia mayor que la emitida. Cuando se aleja, ocurre lo contrario. Ese cambio observado se conoce como efecto Doppler y no significa que la fuente haya cambiado su frecuencia propia."
        },
        {
          "title": "Explora la animación",
          "text": "Observa los frentes emitidos por una fuente en movimiento. Se acercan entre sí por delante y se separan por detrás. Compara lo que recibe un observador con la frecuencia que mantiene la fuente."
        },
        {
          "title": "Haz una predicción",
          "text": "Antes de usar la fórmula, decide si la fuente y el observador se acercan o se alejan. En la convención indicada, las velocidades de acercamiento son positivas. Comprueba que, si ambos están en reposo, la frecuencia observada coincide con la emitida."
        }
      ]
    }
  ],
  "workedExamples": [
    {
      "number": 1,
      "level": "Básico",
      "title": "Del conteo a la frecuencia",
      "question": "Un punto de una cuerda realiza \\(40\\) oscilaciones completas en \\(20\\,\\mathrm{s}\\). Si la longitud de onda es \\(1{,}5\\,\\mathrm m\\), determina la frecuencia, el período y la rapidez de propagación.",
      "steps": [
        "El conteo corresponde a oscilaciones completas de un punto del medio: \\(N=40\\) y \\(\\Delta t=20\\,\\mathrm s\\).",
        "<div class=\"equation\">\\[f=\\frac{N}{\\Delta t}=\\frac{40}{20}=2\\,\\mathrm{Hz}\\]</div>",
        "<div class=\"equation\">\\[T=\\frac1f=0{,}5\\,\\mathrm s\\]</div>",
        "<div class=\"equation\">\\[v=\\lambda f=(1{,}5)(2)=\\boxed{3\\,\\mathrm{m/s}}\\]</div>"
      ],
      "sourceKind": "problema-original"
    },
    {
      "number": 2,
      "level": "Básico",
      "title": "Una fotografía y un cronómetro",
      "question": "La separación entre dos crestas consecutivas de una onda es \\(80\\,\\mathrm{cm}\\). Un punto tarda \\(0{,}20\\,\\mathrm s\\) en completar una oscilación. Halla la rapidez de la onda. Si su amplitud es \\(3\\,\\mathrm{cm}\\), ¿qué distancia recorre ese punto durante un ciclo completo?",
      "steps": [
        "La separación horizontal entre crestas es la longitud de onda; el tiempo de una oscilación es el período.",
        "<div class=\"equation\">\\[\\lambda=0{,}80\\,\\mathrm m,\\quad T=0{,}20\\,\\mathrm s,\\quad v=\\frac{0{,}80}{0{,}20}=\\boxed{4\\,\\mathrm{m/s}}\\]</div>",
        "Durante un ciclo, el punto va desde una posición inicial hasta ambos extremos de su oscilación y vuelve. La distancia total de ese movimiento es \\(4A\\).",
        "<div class=\"equation\">\\[d_{\\text{punto}}=4A=4(3\\,\\mathrm{cm})=\\boxed{12\\,\\mathrm{cm}}\\]</div>",
        "La rapidez de propagación calculada y la distancia recorrida por una partícula describen movimientos distintos."
      ],
      "sourceKind": "problema-original"
    },
    {
      "number": 3,
      "level": "Intermedio",
      "title": "Leer una ecuación de onda",
      "question": "Una cuerda presenta la onda \\(y(x,t)=0{,}04\\operatorname{sen}(5\\pi x-20\\pi t+\\pi/3)\\), con \\(x\\) e \\(y\\) en metros y \\(t\\) en segundos. Determina amplitud, longitud de onda, frecuencia, rapidez y sentido de propagación.",
      "steps": [
        "Compara con \\(y=A\\operatorname{sen}(kx-\\omega t+\\varphi)\\): \\(A=0{,}04\\,\\mathrm m\\), \\(k=5\\pi\\,\\mathrm{rad/m}\\) y \\(\\omega=20\\pi\\,\\mathrm{rad/s}\\).",
        "<div class=\"equation\">\\[\\lambda=\\frac{2\\pi}{k}=\\frac{2\\pi}{5\\pi}=0{,}40\\,\\mathrm m,\\qquad f=\\frac{\\omega}{2\\pi}=10\\,\\mathrm{Hz}\\]</div>",
        "<div class=\"equation\">\\[v=\\frac{\\omega}{k}=\\frac{20\\pi}{5\\pi}=\\boxed{4\\,\\mathrm{m/s}}\\]</div>",
        "La amplitud es \\(4\\,\\mathrm{cm}\\). Con \\(k\\) y \\(\\omega\\) positivos, el signo menos delante del tiempo indica propagación hacia \\(+x\\). La fase inicial es \\(\\pi/3\\,\\mathrm{rad}\\)."
      ],
      "sourceKind": "problema-original"
    },
    {
      "number": 4,
      "level": "Intermedio",
      "title": "Tensión y longitud de onda",
      "question": "Una cuerda uniforme de \\(4\\,\\mathrm m\\) tiene una masa de \\(0{,}16\\,\\mathrm{kg}\\) y está sometida a una tensión de \\(64\\,\\mathrm N\\). Una fuente produce ondas de \\(8\\,\\mathrm{Hz}\\). Halla su rapidez y longitud de onda.",
      "steps": [
        "Primero calcula la masa por unidad de longitud, utilizando la cuerda completa.",
        "<div class=\"equation\">\\[\\mu=\\frac mL=\\frac{0{,}16}{4}=0{,}04\\,\\mathrm{kg/m}\\]</div>",
        "<div class=\"equation\">\\[v=\\sqrt{\\frac{F_T}{\\mu}}=\\sqrt{\\frac{64}{0{,}04}}=\\sqrt{1600}=\\boxed{40\\,\\mathrm{m/s}}\\]</div>",
        "<div class=\"equation\">\\[\\lambda=\\frac vf=\\frac{40}{8}=\\boxed{5\\,\\mathrm m}\\]</div>",
        "Una longitud de onda puede ser mayor que la longitud de la cuerda utilizada para calcular su densidad lineal; no se ha impuesto aquí una condición de resonancia entre extremos."
      ],
      "sourceKind": "problema-original"
    },
    {
      "number": 5,
      "level": "Intermedio",
      "title": "Comparar dos tipos de extremo",
      "question": "Un pulso de cresta y amplitud \\(2\\,\\mathrm{cm}\\) llega a un extremo de una cuerda. Compara la reflexión ideal en un extremo fijo y en uno libre. ¿Qué desplazamiento tiene la frontera cuando allí coincide el máximo de los pulsos incidente y reflejado?",
      "steps": [
        "En el extremo fijo, la frontera no puede desplazarse. El pulso reflejado es un valle de amplitud \\(2\\,\\mathrm{cm}\\), es decir, su desplazamiento máximo lleva signo contrario.",
        "<div class=\"equation\">\\[y_{\\mathrm{frontera,fija}}=(+2)+(-2)=\\boxed{0\\,\\mathrm{cm}}\\]</div>",
        "En el extremo libre ideal, el pulso reflejado no se invierte. En el instante indicado coinciden dos crestas iguales.",
        "<div class=\"equation\">\\[y_{\\mathrm{frontera,libre}}=(+2)+(+2)=\\boxed{4\\,\\mathrm{cm}}\\]</div>",
        "El valor \\(4\\,\\mathrm{cm}\\) es el desplazamiento resultante momentáneo en la frontera; cada pulso viajero tiene amplitud \\(2\\,\\mathrm{cm}\\)."
      ],
      "sourceKind": "problema-original"
    },
    {
      "number": 6,
      "level": "Intermedio",
      "title": "Interferencia con diferencia de fase",
      "question": "Dos ondas armónicas que avanzan en el mismo sentido, de la misma frecuencia y amplitud \\(4\\,\\mathrm{cm}\\) se superponen con una diferencia de fase constante de \\(120^\\circ\\). Determina la amplitud resultante.",
      "steps": [
        "Las amplitudes son iguales y la diferencia de fase es constante, por lo que se emplea la expresión de amplitud resultante para dos ondas armónicas.",
        "<div class=\"equation\">\\[A_{\\mathrm R}=2A\\left|\\cos\\frac{\\Delta\\varphi}{2}\\right|\\]</div>",
        "<div class=\"equation\">\\[A_{\\mathrm R}=2(4)\\left|\\cos60^\\circ\\right|=8\\left(\\frac12\\right)=\\boxed{4\\,\\mathrm{cm}}\\]</div>",
        "No corresponde sumar directamente \\(4+4\\): esa suma de amplitudes se alcanza cuando las ondas están en fase."
      ],
      "sourceKind": "problema-original"
    },
    {
      "number": 7,
      "level": "Intermedio",
      "title": "El tercer armónico de una cuerda",
      "question": "Una cuerda de \\(1{,}20\\,\\mathrm m\\), fija en ambos extremos, admite ondas de rapidez \\(120\\,\\mathrm{m/s}\\). Se observa un patrón de tres vientres. Halla su longitud de onda, frecuencia y cantidad total de nodos.",
      "steps": [
        "En una cuerda fija en ambos extremos, el número de vientres coincide con el número de armónico. Por tanto, \\(n=3\\).",
        "<div class=\"equation\">\\[\\lambda_3=\\frac{2L}{3}=\\frac{2(1{,}20)}3=\\boxed{0{,}80\\,\\mathrm m}\\]</div>",
        "<div class=\"equation\">\\[f_3=\\frac{3v}{2L}=\\frac{3(120)}{2(1{,}20)}=\\boxed{150\\,\\mathrm{Hz}}\\]</div>",
        "Se tienen \\(n+1=4\\) nodos en total, incluyendo los dos extremos. Entre cada par de nodos consecutivos hay \\(\\lambda/2=0{,}40\\,\\mathrm m\\)."
      ],
      "sourceKind": "problema-original"
    },
    {
      "number": 8,
      "level": "Intermedio",
      "title": "Distancia, intensidad y decibelios",
      "question": "Una fuente puntual ideal emite uniformemente una potencia de \\(16\\pi\\times10^{-6}\\,\\mathrm W\\). Calcula la intensidad y el nivel de intensidad a \\(2\\,\\mathrm m\\). Después, halla la intensidad a \\(4\\,\\mathrm m\\). No hay absorción; usa \\(I_0=10^{-12}\\,\\mathrm{W/m^2}\\).",
      "steps": [
        "La potencia se distribuye sobre una esfera de radio igual a la distancia del observador.",
        "<div class=\"equation\">\\[I_2=\\frac{16\\pi\\times10^{-6}}{4\\pi(2)^2}=\\boxed{10^{-6}\\,\\mathrm{W/m^2}}\\]</div>",
        "<div class=\"equation\">\\[\\beta_2=10\\log_{10}\\left(\\frac{10^{-6}}{10^{-12}}\\right)=10\\log_{10}(10^6)=\\boxed{60\\,\\mathrm{dB}}\\]</div>",
        "La nueva distancia es el doble, así que la intensidad se divide entre cuatro.",
        "<div class=\"equation\">\\[I_4=\\frac{I_2}{4}=\\boxed{2{,}5\\times10^{-7}\\,\\mathrm{W/m^2}}\\]</div>"
      ],
      "sourceKind": "problema-original"
    },
    {
      "number": 9,
      "level": "Avanzado",
      "title": "Refracción de ondas entre dos regiones",
      "question": "Una onda plana de frecuencia \\(5\\,\\mathrm{Hz}\\) pasa de una región donde su rapidez es \\(10\\sqrt3\\,\\mathrm{m/s}\\) a otra donde es \\(10\\,\\mathrm{m/s}\\). Incide a \\(60^\\circ\\) de la normal sobre una frontera estacionaria. Halla el ángulo transmitido y las longitudes de onda en ambas regiones.",
      "steps": [
        "La frecuencia se mantiene en \\(5\\,\\mathrm{Hz}\\). Los ángulos se miden desde la normal.",
        "<div class=\"equation\">\\[\\frac{\\operatorname{sen}\\theta_1}{v_1}=\\frac{\\operatorname{sen}\\theta_2}{v_2}\\quad\\Rightarrow\\quad\\operatorname{sen}\\theta_2=\\frac{10}{10\\sqrt3}\\operatorname{sen}60^\\circ=\\frac12\\]</div>",
        "El ángulo transmitido está entre cero y noventa grados; por ello, \\(\\theta_2=\\boxed{30^\\circ}\\). La onda se acerca a la normal al entrar en la región más lenta.",
        "<div class=\"equation\">\\[\\lambda_1=\\frac{10\\sqrt3}{5}=\\boxed{2\\sqrt3\\,\\mathrm m},\\qquad\\lambda_2=\\frac{10}{5}=\\boxed{2\\,\\mathrm m}\\]</div>"
      ],
      "sourceKind": "problema-original"
    },
    {
      "number": 10,
      "level": "Avanzado",
      "title": "Fuente y observador que se acercan",
      "question": "Una fuente sonora emite \\(510\\,\\mathrm{Hz}\\) y se mueve a \\(34\\,\\mathrm{m/s}\\) hacia un observador. El observador se mueve, sobre la misma recta, a \\(17\\,\\mathrm{m/s}\\) hacia la fuente. El aire está en reposo y el sonido se propaga a \\(340\\,\\mathrm{m/s}\\). Determina la frecuencia observada.",
      "steps": [
        "En la convención de acercamiento positivo: \\(v_s=+34\\,\\mathrm{m/s}\\) y \\(v_o=+17\\,\\mathrm{m/s}\\). Las velocidades se dan respecto del aire.",
        "<div class=\"equation\">\\[f_{\\mathrm{obs}}=f_{\\mathrm{fuente}}\\frac{v+v_o}{v-v_s}=510\\frac{340+17}{340-34}\\]</div>",
        "<div class=\"equation\">\\[f_{\\mathrm{obs}}=510\\frac{357}{306}=\\boxed{595\\,\\mathrm{Hz}}\\]</div>",
        "El resultado supera \\(510\\,\\mathrm{Hz}\\), como debe ocurrir en esta situación de acercamiento. No se han sumado las dos velocidades en el denominador: el movimiento del observador y el de la fuente intervienen en partes diferentes de la expresión."
      ],
      "sourceKind": "problema-original"
    }
  ]
};
