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
  "sourceNote": "Los ítems 1 y 2 se ajustan al material ondas.pdf proporcionado por el docente: sección 13.7, páginas impresas 456–457, y sección 13.8, páginas 458–459 (páginas 20–23 del PDF). La definición general de período y frecuencia también aparece en la página impresa 438. Los demás temas conservan su desarrollo previo y las referencias de verificación indicadas.",
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
      "body": "<section id=\"elementos-onda\"><p>Al observar el perfil de una <strong>onda transversal sinusoidal en un instante</strong>, podemos reconocer sus elementos. La <strong>posición de equilibrio</strong> es la que ocuparía la cuerda si la onda no estuviera presente; en el esquema se representa con una línea horizontal discontinua.</p><figure class=\"waves-figure waves-elements-figure\" data-activity-fullscreen aria-labelledby=\"wave-elements-figure-title\"><h3 id=\"wave-elements-figure-title\">Reconoce los elementos en el perfil</h3><img src=\"assets/waves-elements-diagram.svg\" alt=\"Perfil de una onda transversal con crestas y valles respecto al equilibrio. La amplitud A se mide verticalmente desde el equilibrio hasta una cresta; la longitud de onda lambda se mide horizontalmente entre dos crestas consecutivas.\" width=\"900\" height=\"470\"><figcaption>La figura muestra la onda en un solo instante. Las distancias verticales describen la separación respecto al equilibrio; la longitud de onda se mide en la dirección de propagación.</figcaption></figure><h3>Elementos del perfil de la onda</h3><div class=\"waves-property-grid\"><section class=\"waves-property-card\"><h4>Cresta</h4><p>Es el <strong>punto más alto</strong> del perfil de la onda respecto de la posición de equilibrio.</p></section><section class=\"waves-property-card\"><h4>Valle o depresión</h4><p>Es el <strong>punto más bajo</strong> del perfil de la onda respecto de la posición de equilibrio.</p></section><section class=\"waves-property-card\"><h4>Amplitud \\(A\\)</h4><p>Es la <strong>máxima separación</strong> de una partícula del medio respecto de su posición de equilibrio. Se mide desde el equilibrio hasta una cresta o hasta un valle.</p></section><section class=\"waves-property-card\"><h4>Longitud de onda \\(\\lambda\\)</h4><p>Es la distancia entre <strong>dos puntos consecutivos con el mismo estado de vibración</strong>, por ejemplo, entre dos crestas consecutivas o dos valles consecutivos.</p></section></div><p class=\"waves-note\"><strong>Al medir:</strong> la amplitud es una distancia desde el equilibrio y siempre es positiva. En esta onda sinusoidal, la distancia vertical de una cresta a un valle es \\(2A\\).</p><p>En una <strong>onda longitudinal</strong>, una curva sinusoidal puede representar variaciones de presión o densidad; no indica que las partículas del medio se muevan verticalmente.</p><h3>Magnitudes que se miden en el tiempo</h3><p>El período y la frecuencia describen la oscilación de las partículas. Para medirlos necesitamos observar el movimiento durante un intervalo de tiempo.</p><div class=\"waves-property-grid\"><section class=\"waves-property-card\"><h4>Período \\(T\\)</h4><p>Es el <strong>tiempo de una oscilación completa</strong> de una partícula del medio. Se expresa en segundos.</p></section><section class=\"waves-property-card\"><h4>Frecuencia \\(f\\)</h4><p>Es el <strong>número de oscilaciones completas por segundo</strong>. Se expresa en hertz: \\(1\\,\\mathrm{Hz}=1\\,\\mathrm{s^{-1}}\\).</p></section></div><div class=\"equation\">\\[f=\\frac{1}{T},\\qquad T=\\frac{1}{f}\\]</div><p>Durante un período, la onda avanza una distancia igual a una longitud de onda. Por eso, su <strong>rapidez de propagación</strong> se relaciona con estas magnitudes mediante:</p><div class=\"equation\">\\[v=\\frac{\\lambda}{T}=\\lambda f\\]</div></section>",
      "examples": [],
      "audioSegments": [
        {
          "title": "Comprende la idea",
          "text": "La cresta es el punto más alto del perfil de una onda, y el valle o depresión es el más bajo. Ambos se identifican respecto a la posición de equilibrio, que corresponde a la cuerda cuando la onda no está presente."
        },
        {
          "title": "Lee el esquema",
          "text": "La amplitud se mide verticalmente desde el equilibrio hasta una cresta o un valle. La longitud de onda se mide horizontalmente entre dos crestas consecutivas. No confundas la amplitud con la distancia de cresta a valle, que en esta onda es el doble de la amplitud."
        },
        {
          "title": "Relaciona espacio y tiempo",
          "text": "El período es el tiempo de una oscilación completa y la frecuencia cuenta las oscilaciones por segundo. Son recíprocos. Durante un período, la onda avanza una longitud de onda; su rapidez es la longitud de onda dividida entre el período."
        }
      ]
    },
    {
      "id": "magnitudes-onda",
      "title": "Amplitud, longitud de onda, período y frecuencia",
      "subtitle": "Cómo leer una onda en el espacio y en el tiempo",
      "body": "<p>La <strong>amplitud</strong> \\(A\\) es la máxima separación de una partícula respecto de su posición de equilibrio. No es la distancia entre una cresta y un valle: esa distancia vertical es \\(2A\\). La <strong>longitud de onda</strong> \\(\\lambda\\) es la separación, en la dirección de propagación, entre puntos consecutivos en la misma fase, como dos crestas.</p><p>El <strong>período</strong> \\(T\\) es el tiempo de una oscilación completa. La <strong>frecuencia</strong> \\(f\\) cuenta las oscilaciones por segundo y se expresa en hertz: \\(1\\,\\mathrm{Hz}=1\\,\\mathrm{s^{-1}}\\). Si ocurren \\(N\\) oscilaciones durante \\(\\Delta t\\):</p><div class=\"equation\">\\[f=\\frac{N}{\\Delta t},\\qquad T=\\frac{\\Delta t}{N},\\qquad fT=1\\]</div><p>Una fotografía permite medir longitudes; para medir tiempos se necesita observar la evolución. La onda avanza una longitud de onda durante un período:</p><div class=\"equation\">\\[\\boxed{v=\\frac{\\lambda}{T}=\\lambda f}\\]</div><div class=\"key\"><b>Idea clave</b>La amplitud describe la oscilación; la longitud de onda y la frecuencia, junto con la rapidez, describen la repetición del patrón.</div><div data-wave-lab=\"parameters\"></div>",
      "examples": [],
      "audioSegments": [
        {
          "title": "Comprende la idea",
          "text": "La amplitud se mide desde el equilibrio hasta la máxima separación. La longitud de onda separa dos crestas consecutivas. El período es el tiempo de una oscilación y la frecuencia cuenta cuántas ocurren en un segundo."
        },
        {
          "title": "Explora la animación",
          "text": "Cambia una magnitud cada vez. Observa que una cresta más alta significa mayor amplitud. Para comparar longitudes de onda, mide horizontalmente entre crestas; para comparar frecuencias, sigue un punto durante el mismo intervalo."
        },
        {
          "title": "Haz una predicción",
          "text": "Si una onda conserva su longitud de onda y duplica su frecuencia, su rapidez calculada se duplica. En cambio, si se mantiene la rapidez del medio, duplicar la frecuencia obliga a reducir a la mitad la longitud de onda."
        }
      ]
    },
    {
      "id": "ecuacion-onda",
      "title": "Rapidez y función de una onda armónica",
      "subtitle": "Una misma ecuación reúne espacio, tiempo y fase",
      "body": "<p>Una onda armónica transversal puede representarse mediante el desplazamiento \\(y\\) de cada punto de una cuerda. La posición \\(x\\) identifica el punto; el tiempo \\(t\\) indica cuándo lo observamos. Para propagación hacia \\(+x\\):</p><div class=\"equation\">\\[y(x,t)=A\\,\\operatorname{sen}(kx-\\omega t+\\varphi)\\]</div><div class=\"equation\">\\[k=\\frac{2\\pi}{\\lambda},\\qquad \\omega=2\\pi f=\\frac{2\\pi}{T},\\qquad v=\\frac{\\omega}{k}\\]</div><p>La fase \\(kx-\\omega t+\\varphi\\) se expresa en radianes. Con \\(k>0\\) y \\(\\omega>0\\), cambiar el signo temporal por \\(+\\omega t\\) invierte la propagación hacia \\(-x\\). La fase inicial \\(\\varphi\\) modifica el estado de la onda en el origen del espacio y del tiempo.</p><ul><li>Fijar \\(t\\) proporciona una fotografía de toda la cuerda.</li><li>Fijar \\(x\\) permite seguir la oscilación de un punto.</li><li>La rapidez \\(v\\) corresponde al patrón; no es la rapidez instantánea de una partícula.</li></ul><div class=\"key\"><b>Idea clave</b>Lee primero los coeficientes de la ecuación y sus unidades: A, k y ω cumplen funciones diferentes.</div><div data-wave-lab=\"equation\"></div>",
      "examples": [],
      "audioSegments": [
        {
          "title": "Comprende la idea",
          "text": "La función de onda indica el desplazamiento de cada punto y en cada instante. En una onda seno, la amplitud multiplica a toda la función. El número de onda describe la repetición espacial y la frecuencia angular, la temporal."
        },
        {
          "title": "Explora la animación",
          "text": "Compara las dos direcciones de avance y observa el signo que acompaña al tiempo. Con número de onda y frecuencia angular positivos, el signo menos indica avance hacia la derecha y el signo más, hacia la izquierda."
        },
        {
          "title": "Haz una predicción",
          "text": "Si congelas el tiempo, obtienes el perfil de toda la cuerda. Si observas una posición fija, obtienes su oscilación. Decide cuál de estas dos observaciones necesitas antes de interpretar una gráfica o una ecuación."
        }
      ]
    },
    {
      "id": "rapidez-cuerda",
      "title": "Rapidez de propagación en una cuerda",
      "subtitle": "La tensión y la masa por unidad de longitud",
      "body": "<p>En una cuerda ideal, uniforme y estirada, la rapidez de una onda transversal depende de la <strong>fuerza de tensión</strong> \\(F_T\\) y de la <strong>densidad lineal</strong> \\(\\mu\\), es decir, la masa por unidad de longitud. Para una cuerda de masa \\(m\\) y longitud \\(L\\):</p><div class=\"equation\">\\[\\mu=\\frac{m}{L},\\qquad \\boxed{v=\\sqrt{\\frac{F_T}{\\mu}}}\\]</div><p>Al aumentar la tensión, la perturbación se propaga más rápido. Al aumentar la masa por unidad de longitud y conservar la tensión, se propaga más lentamente. Cuadruplicar la tensión duplica la rapidez; cuadruplicar la densidad lineal la reduce a la mitad.</p><p>En este modelo de pequeñas oscilaciones, la amplitud no modifica la rapidez. La fuente impone la frecuencia. Si la frecuencia permanece fija, un cambio de rapidez produce un cambio de longitud de onda según \\(\\lambda=v/f\\). La fórmula de rapidez de la cuerda, que relaciona la tensión con la densidad lineal, corresponde a este modelo ideal; no se aplica directamente a cualquier onda mecánica.</p><div class=\"key\"><b>Idea clave</b>Distingue la fuerza de tensión Fₜ del período T. Antes de sustituir datos, convierte μ a kg/m.</div><div data-wave-lab=\"string\"></div>",
      "examples": [],
      "audioSegments": [
        {
          "title": "Comprende la idea",
          "text": "Una cuerda más tensa transmite la perturbación con mayor rapidez. Una cuerda con más masa por unidad de longitud, a igual tensión, la transmite más lentamente. La rapidez es la raíz cuadrada de la tensión dividida entre la densidad lineal."
        },
        {
          "title": "Explora la animación",
          "text": "Modifica primero la tensión y después la densidad lineal. Conserva las otras condiciones y compara el avance del patrón. Recuerda que aumentar la amplitud no aumenta la rapidez en este modelo ideal."
        },
        {
          "title": "Haz una predicción",
          "text": "Predice qué ocurre al cuadruplicar la tensión sin cambiar la cuerda. La rapidez se duplica. Si además la fuente mantiene su frecuencia, la longitud de onda también se duplica."
        }
      ]
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
