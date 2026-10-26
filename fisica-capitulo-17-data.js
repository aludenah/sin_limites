'use strict';
window.ELECTROMAGNETISM_CONTENT = {
  "goals": [
    {
      "title": "Relacionar magnetismo y corriente",
      "text": "Reconoce las propiedades de los imanes y explica cómo una corriente eléctrica produce un campo magnético."
    },
    {
      "title": "Analizar campos y fuerzas",
      "text": "Interpreta el campo de un conductor y determina las fuerzas magnéticas sobre cargas y corrientes, así como el movimiento de una partícula en un campo homogéneo."
    },
    {
      "title": "Explicar la inducción",
      "text": "Relaciona el flujo magnético con las leyes de Faraday y Lenz y con el funcionamiento de un generador eléctrico."
    }
  ],
  "sequenceTitle": "El recorrido que vamos a seguir",
  "timeline": [
    [
      "Imanes, campo y experiencia de Oersted",
      "Reconoce el campo magnético y vincula sus efectos con los imanes y las corrientes eléctricas."
    ],
    [
      "Campo de los conductores",
      "Estudia el conductor rectilíneo y relaciona su geometría con el campo mediante la ley de Biot-Savart-Laplace."
    ],
    [
      "Fuerzas y movimiento",
      "Determina la acción del campo sobre partículas y conductores, y analiza la trayectoria de una carga."
    ],
    [
      "Inducción y generación eléctrica",
      "Interpreta la variación del flujo, la fem inducida y el sentido de la corriente mediante las leyes de Faraday y Lenz."
    ]
  ],

  "number": 17,
  "id": "fisica-capitulo-17",
  "progressId": "fisica-capitulo-17",
  "courseId": 16,
  "courseName": "Física",
  "title": "Electromagnetismo",
  "intro": "Estudia el capítulo siguiendo la estructura del material base: magnetismo, campo de las corrientes, fuerzas magnéticas, inducción y generador eléctrico. Revisa sus fórmulas, ejemplos y problemas.",
  "version": 3,
  "format": "physics",
  "assessmentFormat": "practice-10",
  "sourceNote": "Contenido organizado exclusivamente a partir del material electromagnetismo.pdf, capítulo XVIII, páginas impresas 214-236. La sección Resueltos conserva los ocho problemas resueltos y añade dos ejemplos ya desarrollados en su teoría; la práctica corresponde a sus diez problemas propuestos.",
  "source": {
    "filename": "electromagnetismo.pdf",
    "pdfPages": 24,
    "theoryPages": [
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12,
      13,
      14,
      15,
      16
    ],
    "workedPages": [
      17,
      18,
      19,
      20,
      21
    ],
    "proposedPages": [
      22,
      23
    ],
    "answerKeyPage": 24,
    "printedFirstPage": 214
  },
  "lessons": [
    {
      "id": "magnetismo-imanes",
      "title": "Aspectos previos y magnetismo",
      "subtitle": "Imanes y propiedades de sus polos",
      "sourcePages": [
        1,
        2
      ],
      "sourcePrintedPages": [
        214,
        215
      ],
      "body": "<p>El electromagnetismo relaciona los fenómenos eléctricos y magnéticos. El material presenta esta relación a partir del <strong>magnetismo</strong>: un imán atrae cuerpos que contienen hierro y puede ejercer fuerzas sobre otros imanes.</p><p>Los minerales de hierro magnetizado son ejemplos de <strong>imanes permanentes</strong>. Al frotar un cuerpo de hierro con un imán, puede adquirir las características de un <strong>imán artificial</strong>.</p><div class=\"em-property-grid\"><article class=\"em-property-card\"><span class=\"em-property-icon\" aria-hidden=\"true\">🧲</span><h3>Polos magnéticos</h3><p>Son las zonas del imán donde la acción magnética es más intensa.</p></article><article class=\"em-property-card\"><span class=\"em-property-icon\" aria-hidden=\"true\">🧭</span><h3>Orientación de una brújula</h3><p>Si un imán de barra puede girar libremente, uno de sus extremos apunta aproximadamente hacia el norte geográfico; se denomina polo norte magnético.</p></article><article class=\"em-property-card\"><span class=\"em-property-icon\" aria-hidden=\"true\">↔</span><h3>Interacción entre polos</h3><p>Polos semejantes se repelen; polos opuestos se atraen.</p></article><article class=\"em-property-card\"><span class=\"em-property-icon\" aria-hidden=\"true\">N · S</span><h3>Polos en pares</h3><p>Al romper un imán se obtienen otros imanes, cada uno con norte y sur; no se aíslan sus polos.</p></article></div><figure class=\"dimensional-figure em-realistic-figure\"><button type=\"button\" class=\"em-image-button\" data-action=\"math-figure\" data-id=\"theory:magnetismo-imanes:0\" aria-label=\"Ampliar imagen: Imanes y propiedades de sus polos.\"><img src=\"assets/em-realistic/01-imanes.svg\" alt=\"Imanes realistas: atracción entre N y S, repulsión entre polos iguales y fragmentos con dos polos.\" width=\"1200\" height=\"760\" loading=\"lazy\"><span>Ampliar imagen ⊕</span></button><figcaption>Imanes y propiedades de sus polos.</figcaption></figure><div class=\"key\"><b>Idea clave</b>El imán presenta dos polos. Su interacción depende de cuáles queden enfrentados.</div>",
      "examples": [],
      "visuals": [
        {
          "src": "assets/em-realistic/01-imanes.svg",
          "alt": "Imanes realistas: atracción entre N y S, repulsión entre polos iguales y fragmentos con dos polos.",
          "width": 1200,
          "height": 760,
          "caption": "Imanes y propiedades de sus polos."
        }
      ]
    },
    {
      "id": "campo-magnetico",
      "title": "Campo magnético",
      "subtitle": "Líneas de inducción y vector B",
      "sourcePages": [
        2
      ],
      "sourcePrintedPages": [
        215
      ],
      "body": "<p>Un cuerpo magnetizado puede ejercer fuerzas a distancia. El material representa el campo que lo rodea mediante <strong>líneas de inducción</strong>, orientadas en el sentido que señala el polo norte de una brújula en cada punto.</p><ul><li>Las líneas de inducción son <strong>cerradas</strong>: se cierran dentro del imán.</li><li>Fuera del imán, salen del polo norte y entran en el polo sur.</li></ul><figure class=\"dimensional-figure em-realistic-figure\"><button type=\"button\" class=\"em-image-button\" data-action=\"math-figure\" data-id=\"theory:campo-magnetico:0\" aria-label=\"Ampliar imagen: Líneas de inducción del imán: dirección y sentido del campo.\"><img src=\"assets/em-realistic/02-campo.svg\" alt=\"Imán realista con líneas de campo separadas: fuera van de N a S y dentro regresan de S a N.\" width=\"1200\" height=\"760\" loading=\"lazy\"><span>Ampliar imagen ⊕</span></button><figcaption>Líneas de inducción del imán: dirección y sentido del campo.</figcaption></figure><p>En cada punto se define el vector de <strong>inducción del campo magnético</strong> \\(\\vec B\\). Este vector es tangente a la línea de inducción y apunta en su mismo sentido. Su unidad es el <strong>tesla (T)</strong>.</p><div class=\"key\"><b>Idea clave</b>El vector B describe el campo en un punto; las líneas permiten representar su dirección y sentido.</div>",
      "examples": [],
      "visuals": [
        {
          "src": "assets/em-realistic/02-campo.svg",
          "alt": "Imán realista con líneas de campo separadas: fuera van de N a S y dentro regresan de S a N.",
          "width": 1200,
          "height": 760,
          "caption": "Líneas de inducción del imán: dirección y sentido del campo."
        }
      ]
    },
    {
      "id": "experimento-oersted",
      "title": "Experiencia de Oersted",
      "subtitle": "La corriente eléctrica produce campo magnético",
      "sourcePages": [
        3
      ],
      "sourcePrintedPages": [
        216
      ],
      "body": "<p>En 1820, Hans Christian Oersted dio a conocer una relación entre electricidad y magnetismo. En el experimento se coloca una <strong>brújula sobre un alambre horizontal</strong> y se compara su orientación con y sin corriente.</p><figure class=\"dimensional-figure em-realistic-figure\"><button type=\"button\" class=\"em-image-button\" data-action=\"math-figure\" data-id=\"theory:experimento-oersted:0\" aria-label=\"Ampliar imagen: Experiencia de Oersted: la corriente y la orientación de la brújula.\"><img src=\"assets/em-realistic/03-oersted.svg\" alt=\"Montaje de Oersted con conductor, batería, interruptor y brújula; comparación de corriente nula y corriente presente.\" width=\"1200\" height=\"700\" loading=\"lazy\"><span>Ampliar imagen ⊕</span></button><figcaption>Experiencia de Oersted: la corriente y la orientación de la brújula.</figcaption></figure><div class=\"table-scroll\"><table><thead><tr><th>Situación</th><th>Observación</th></tr></thead><tbody><tr><td>El alambre no conduce corriente: I = 0</td><td>La aguja apunta hacia el norte.</td></tr><tr><td>Circula corriente por el alambre</td><td>La aguja se desvía.</td></tr><tr><td>Se invierte la corriente</td><td>La desviación cambia de sentido en la disposición mostrada.</td></tr></tbody></table></div><div class=\"key\"><b>Idea clave</b>La corriente eléctrica que atraviesa un conductor genera un campo magnético alrededor de él.</div>",
      "examples": [],
      "visuals": [
        {
          "src": "assets/em-realistic/03-oersted.svg",
          "alt": "Montaje de Oersted con conductor, batería, interruptor y brújula; comparación de corriente nula y corriente presente.",
          "width": 1200,
          "height": 700,
          "caption": "Experiencia de Oersted: la corriente y la orientación de la brújula."
        }
      ]
    },
    {
      "id": "laboratorio-conductor",
      "title": "Campo de un conductor rectilíneo",
      "subtitle": "Circunferencias, mano derecha y diferentes vistas",
      "sourcePages": [
        3,
        4
      ],
      "sourcePrintedPages": [
        216,
        217
      ],
      "body": "<p>Alrededor de un conductor rectilíneo, las líneas de inducción son <strong>circunferencias concéntricas</strong> contenidas en planos <strong>perpendiculares</strong> al conductor.</p><figure class=\"dimensional-figure em-realistic-figure\"><button type=\"button\" class=\"em-image-button\" data-action=\"math-figure\" data-id=\"theory:laboratorio-conductor:0\" aria-label=\"Ampliar imagen: Campo alrededor de un conductor rectilíneo en diferentes planos.\"><img src=\"assets/em-realistic/04-conductor.svg\" alt=\"Conductor vertical realista con campo circular en perspectiva y una vista axial desde el extremo positivo del eje z.\" width=\"1200\" height=\"700\" loading=\"lazy\"><span>Ampliar imagen ⊕</span></button><figcaption>Campo alrededor de un conductor rectilíneo en diferentes planos.</figcaption></figure><p>Para determinar su sentido, se rodea imaginariamente el conductor con la <strong>mano derecha</strong>: el pulgar extendido apunta en el sentido de la corriente eléctrica y los otros dedos indican el sentido de las líneas de inducción.</p><div class=\"table-scroll\"><table><thead><tr><th>Vista del material</th><th>Representación</th></tr></thead><tbody><tr><td>Corriente saliente: ⊙</td><td>Vista axial: líneas de inducción en sentido antihorario.</td></tr><tr><td>Corriente entrante: ⊗</td><td>Vista axial: líneas de inducción en sentido horario.</td></tr><tr><td>Vista longitudinal o de perfil</td><td>El campo atraviesa el plano del dibujo: ⊙ sale de él y ⊗ entra en él.</td></tr></tbody></table></div><p>En la aplicación, el conductor coincide con el eje \\(z\\). La vista transversal muestra las circunferencias; las vistas longitudinales permiten observar el campo que entra o sale del plano, como en los tres observadores del material.</p><div data-wire-field-lab></div><div class=\"key\"><b>Idea clave</b>Cambiar el punto de vista cambia la representación, pero no el sentido físico del campo alrededor del conductor.</div>",
      "examples": [],
      "visuals": [
        {
          "src": "assets/em-realistic/04-conductor.svg",
          "alt": "Conductor vertical realista con campo circular en perspectiva y una vista axial desde el extremo positivo del eje z.",
          "width": 1200,
          "height": 700,
          "caption": "Campo alrededor de un conductor rectilíneo en diferentes planos."
        }
      ]
    },
    {
      "id": "biot-savart",
      "title": "Ley de Biot-Savart-Laplace",
      "subtitle": "Conductor finito y casos particulares",
      "sourcePages": [
        4,
        5,
        6
      ],
      "sourcePrintedPages": [
        217,
        218,
        219
      ],
      "body": "<p>Esta ley permite determinar la inducción magnética en un punto debida a una corriente que fluye por un conductor. Para el tramo rectilíneo mostrado en el material:</p><figure class=\"dimensional-figure em-realistic-figure\"><button type=\"button\" class=\"em-image-button\" data-action=\"math-figure\" data-id=\"theory:biot-savart:0\" aria-label=\"Ampliar imagen: Geometría del conductor finito · material, p. 217.\"><img src=\"assets/em-realistic/05-biot.svg\" alt=\"Conductor rectilíneo finito con corriente hacia arriba, distancia perpendicular d, ángulos alfa y beta y campo entrante en P.\" width=\"1200\" height=\"760\" loading=\"lazy\"><span>Ampliar imagen ⊕</span></button><figcaption>Geometría del conductor finito · material, p. 217.</figcaption></figure><div class=\"equation\">\\[\\boxed{B_P=\\frac{\\mu_0 I}{4\\pi d}\\left(\\operatorname{sen}\\alpha+\\operatorname{sen}\\beta\\right)}\\]</div><p>\\(d\\) es la distancia perpendicular desde el punto al conductor; \\(\\alpha\\) y \\(\\beta\\) se miden desde esa perpendicular hasta los segmentos que unen el punto con los extremos del tramo. Esta forma corresponde a la disposición mostrada, con la perpendicular situada entre ambos extremos.</p><div class=\"table-scroll\"><table><thead><tr><th>Magnitud</th><th>Unidad</th></tr></thead><tbody><tr><td>I: intensidad de corriente</td><td>amperio (A)</td></tr><tr><td>d: distancia perpendicular</td><td>metro (m)</td></tr><tr><td>B: inducción magnética</td><td>tesla (T)</td></tr></tbody></table></div><div class=\"equation\">\\[\\mu_0\\approx4\\pi\\times10^{-7}\\,\\mathrm{T\\cdot m/A}\\]</div><h4>Casos particulares</h4><div class=\"table-scroll\"><table><thead><tr><th>Conductor</th><th>Campo en el punto indicado</th></tr></thead><tbody><tr><td>Recto de gran longitud, a distancia d</td><td>\\(B_P=\\dfrac{\\mu_0 I}{2\\pi d}\\)</td></tr><tr><td>Conductor semiinfinito, punto sobre la perpendicular que pasa por su extremo</td><td>\\(B_P=\\dfrac{\\mu_0 I}{4\\pi d}\\)</td></tr><tr><td>Espira circular de radio R, en su centro</td><td>\\(B_O=\\dfrac{\\mu_0 I}{2R}\\)</td></tr><tr><td>Arco de circunferencia de radio R y ángulo θ, en su centro</td><td>\\(B_O=\\dfrac{\\mu_0 I\\theta}{4\\pi R}\\); θ en radianes.</td></tr></tbody></table></div><figure class=\"dimensional-figure em-realistic-figure\"><button type=\"button\" class=\"em-image-button\" data-action=\"math-figure\" data-id=\"theory:biot-savart:1\" aria-label=\"Ampliar imagen: Casos particulares de Biot-Savart · material, pp. 217–218.\"><img src=\"assets/em-realistic/05-biot-casos.svg\" alt=\"Cuatro conductores redibujados: rectilíneo largo, semiinfinito, espira y arco, con campos y fórmulas del material.\" width=\"1200\" height=\"900\" loading=\"lazy\"><span>Ampliar imagen ⊕</span></button><figcaption>Casos particulares de Biot-Savart · material, pp. 217–218.</figcaption></figure><p>Las expresiones dan la <strong>magnitud</strong> del campo. El sentido se determina con la mano derecha. En el aire se emplea aproximadamente la permeabilidad del vacío indicada en el material.</p><div class=\"key\"><b>Idea clave</b>Identifica la geometría del conductor, la distancia perpendicular o el radio y el punto donde se calcula B.</div>",
      "examples": [
        {
          "title": "Ejemplo del material: hilo y espira circular",
          "question": "Un hilo muy largo lleva \\(I_1=2\\,\\mathrm A\\) y está a \\(20\\,\\mathrm{cm}\\) del centro O de una espira. La espira lleva \\(I_2=2\\,\\mathrm A\\) y su radio es \\(R=\\pi/20\\,\\mathrm m\\). Según los sentidos del gráfico del material, ambos campos en O son opuestos. Calcula el campo resultante.",
          "steps": [
            "<div class=\"equation\">\\[B_1=\\frac{\\mu_0 I_1}{2\\pi d}=2\\times10^{-6}\\,\\mathrm T=2\\,\\mu\\mathrm T\\]</div>",
            "<div class=\"equation\">\\[B_2=\\frac{\\mu_0 I_2}{2R}=8\\times10^{-6}\\,\\mathrm T=8\\,\\mu\\mathrm T\\]</div>",
            "Como los campos tienen sentidos opuestos: \\(B_O=|B_1-B_2|=6\\,\\mu\\mathrm T\\)."
          ]
        }
      ],
      "visuals": [
        {
          "src": "assets/em-realistic/05-biot.svg",
          "alt": "Conductor rectilíneo finito con corriente hacia arriba, distancia perpendicular d, ángulos alfa y beta y campo entrante en P.",
          "width": 1200,
          "height": 760,
          "caption": "Geometría del conductor finito · material, p. 217."
        },
        {
          "src": "assets/em-realistic/05-biot-casos.svg",
          "alt": "Cuatro conductores redibujados: rectilíneo largo, semiinfinito, espira y arco, con campos y fórmulas del material.",
          "width": 1200,
          "height": 900,
          "caption": "Casos particulares de Biot-Savart · material, pp. 217–218."
        }
      ]
    },
    {
      "id": "fuerzas-magneticas",
      "title": "Fuerza magnética sobre una partícula",
      "subtitle": "Dirección, magnitud y casos particulares",
      "sourcePages": [
        6,
        7
      ],
      "sourcePrintedPages": [
        219,
        220
      ],
      "body": "<p>Una partícula electrizada en movimiento puede interactuar con un campo magnético externo y experimentar una <strong>fuerza magnética</strong>. La fuerza es perpendicular a la velocidad \\(\\vec v\\) y al campo \\(\\vec B\\).</p><div class=\"equation\">\\[\\boxed{F_{\\mathrm{mag}}=|q|vB\\operatorname{sen}\\theta}\\]</div><div class=\"table-scroll\"><table><thead><tr><th>Símbolo</th><th>Significado y unidad</th></tr></thead><tbody><tr><td>q</td><td>Carga eléctrica, en C</td></tr><tr><td>v</td><td>Rapidez, en m/s</td></tr><tr><td>B</td><td>Inducción magnética, en T</td></tr><tr><td>θ</td><td>Ángulo entre la velocidad y B</td></tr><tr><td>Fmag</td><td>Fuerza magnética, en N</td></tr></tbody></table></div><p>El material determina la dirección mediante la <strong>regla de la palma izquierda</strong>, representada en sus esquemas. Para una carga negativa se invierte el sentido obtenido para una carga positiva con la misma velocidad.</p><figure class=\"dimensional-figure em-realistic-figure\"><button type=\"button\" class=\"em-image-button\" data-action=\"math-figure\" data-id=\"theory:fuerzas-magneticas:0\" aria-label=\"Ampliar imagen: Regla de la palma izquierda y sentido de la fuerza magnética.\"><img src=\"assets/em-realistic/06-fuerza-carga.svg\" alt=\"Mano izquierda realista y vectores de una carga positiva: velocidad hacia la derecha, campo entrante y fuerza hacia arriba.\" width=\"1200\" height=\"700\" loading=\"lazy\"><span>Ampliar imagen ⊕</span></button><figcaption>Regla de la palma izquierda y sentido de la fuerza magnética.</figcaption></figure><div class=\"table-scroll\"><table><thead><tr><th>Orientación</th><th>Resultado</th></tr></thead><tbody><tr><td>Velocidad paralela o antiparalela a B</td><td>\\(F_{\\mathrm{mag}}=0\\)</td></tr><tr><td>Velocidad perpendicular a B</td><td>\\(F_{\\mathrm{mag,max}}=|q|vB\\)</td></tr></tbody></table></div><div class=\"key\"><b>Idea clave</b>La magnitud depende del ángulo; el sentido también depende del signo de la carga.</div>",
      "examples": [
        {
          "title": "Ejemplo del material: fuerza con ángulo de 30°",
          "question": "Una partícula de carga \\(q=6\\,\\mathrm{mC}\\) se mueve con rapidez \\(v=400\\,\\mathrm{m/s}\\) y forma \\(30^\\circ\\) con un campo de \\(B=0{,}5\\,\\mathrm T\\). Calcula la magnitud de la fuerza.",
          "steps": [
            "\\(q=6\\times10^{-3}\\,\\mathrm C\\).",
            "<div class=\"equation\">\\[F_{\\mathrm{mag}}=(6\\times10^{-3})(400)(0{,}5)\\operatorname{sen}30^\\circ=0{,}6\\,\\mathrm N\\]</div>",
            "La magnitud de la fuerza es \\(0{,}6\\,\\mathrm N\\)."
          ]
        }
      ],
      "visuals": [
        {
          "src": "assets/em-realistic/06-fuerza-carga.svg",
          "alt": "Mano izquierda realista y vectores de una carga positiva: velocidad hacia la derecha, campo entrante y fuerza hacia arriba.",
          "width": 1200,
          "height": 700,
          "caption": "Regla de la palma izquierda y sentido de la fuerza magnética."
        }
      ]
    },
    {
      "id": "fuerza-conductores",
      "title": "Fuerza magnética sobre conductores",
      "subtitle": "Corriente, longitud y campo externo",
      "sourcePages": [
        8,
        9
      ],
      "sourcePrintedPages": [
        221,
        222
      ],
      "body": "<p>Un conductor con corriente puede interactuar con un <strong>campo magnético externo</strong>. Para un tramo rectilíneo de longitud L, inmerso en un campo homogéneo:</p><figure class=\"dimensional-figure em-realistic-figure\"><button type=\"button\" class=\"em-image-button\" data-action=\"math-figure\" data-id=\"theory:fuerza-conductores:0\" aria-label=\"Ampliar imagen: Fuerza magnética sobre un conductor rectilíneo.\"><img src=\"assets/em-realistic/07-fuerza-conductor.svg\" alt=\"Barra conductora entre polos magnéticos y diagrama preciso: corriente a la izquierda, campo entrante y fuerza hacia abajo.\" width=\"1200\" height=\"700\" loading=\"lazy\"><span>Ampliar imagen ⊕</span></button><figcaption>Fuerza magnética sobre un conductor rectilíneo.</figcaption></figure><div class=\"equation\">\\[\\boxed{F_{\\mathrm{mag}}=BIL\\operatorname{sen}\\theta}\\]</div><p>La intensidad I se expresa en amperios; L, en metros; B, en teslas, y la fuerza, en newtons. El ángulo θ se mide entre la corriente y el campo.</p><p>La fuerza es perpendicular al plano definido por el conductor y B. El material utiliza la regla de la palma izquierda para determinar su sentido. En un tramo recto homogéneo dentro de un campo uniforme, la resultante se representa en su punto medio.</p><div class=\"table-scroll\"><table><thead><tr><th>Situación del material</th><th>Resultado</th></tr></thead><tbody><tr><td>Conductor paralelo o antiparalelo a B</td><td>\\(F_{\\mathrm{mag}}=0\\)</td></tr><tr><td>Conductor perpendicular a B</td><td>\\(F_{\\mathrm{mag,max}}=BIL\\)</td></tr><tr><td>Conductor no rectilíneo en B homogéneo</td><td>Para hallar la fuerza resultante, se reemplaza por el tramo recto equivalente que une sus extremos, con la misma corriente.</td></tr></tbody></table></div><div class=\"key\"><b>Idea clave</b>Distingue el campo producido por la corriente del campo externo que ejerce la fuerza sobre el conductor.</div>",
      "examples": [
        {
          "title": "Ejemplo del material: tensión en una barra",
          "question": "Una barra homogénea de \\(500\\,\\mathrm g\\) y \\(1\\,\\mathrm m\\) se mantiene horizontal: está articulada en el extremo derecho y sostenida por una cuerda vertical en el izquierdo. Lleva \\(2{,}5\\,\\mathrm A\\) hacia la izquierda dentro de un campo entrante de \\(0{,}2\\,\\mathrm T\\). Halla la tensión. Usa \\(g=10\\,\\mathrm{m/s^2}\\).",
          "steps": [
            "La fuerza magnética y el peso actúan hacia abajo en el punto medio de la barra.",
            "<div class=\"equation\">\\[F_{\\mathrm{mag}}=BIL=(0{,}2)(2{,}5)(1)=0{,}5\\,\\mathrm N\\qquad mg=(0{,}5)(10)=5\\,\\mathrm N\\]</div>",
            "Del equilibrio de momentos respecto a la articulación: \\(TL=(F_{\\mathrm{mag}}+mg)L/2\\).",
            "<div class=\"equation\">\\[T=\\frac{0{,}5+5}{2}=2{,}75\\,\\mathrm N\\]</div>"
          ]
        }
      ],
      "visuals": [
        {
          "src": "assets/em-realistic/07-fuerza-conductor.svg",
          "alt": "Barra conductora entre polos magnéticos y diagrama preciso: corriente a la izquierda, campo entrante y fuerza hacia abajo.",
          "width": 1200,
          "height": 700,
          "caption": "Fuerza magnética sobre un conductor rectilíneo."
        }
      ]
    },
    {
      "id": "movimiento-particula",
      "title": "Movimiento de una partícula en un campo homogéneo",
      "subtitle": "Trayectoria circular y radio",
      "sourcePages": [
        10
      ],
      "sourcePrintedPages": [
        223
      ],
      "body": "<p>Si una partícula ingresa con velocidad <strong>perpendicular</strong> a un campo magnético homogéneo y actúa sobre ella únicamente la fuerza magnética, dicha fuerza es perpendicular a la velocidad y proporciona la aceleración centrípeta. La trayectoria es una <strong>circunferencia</strong>.</p><figure class=\"dimensional-figure em-realistic-figure\"><button type=\"button\" class=\"em-image-button\" data-action=\"math-figure\" data-id=\"theory:movimiento-particula:0\" aria-label=\"Ampliar imagen: Trayectoria de una partícula en un campo magnético uniforme.\"><img src=\"assets/em-realistic/08-trayectoria.svg\" alt=\"Cámara de partículas y trayectoria semicircular calculada: carga positiva entra por A a la derecha y sale por C a la izquierda.\" width=\"1200\" height=\"700\" loading=\"lazy\"><span>Ampliar imagen ⊕</span></button><figcaption>Trayectoria de una partícula en un campo magnético uniforme.</figcaption></figure><div class=\"equation\">\\[F_{\\mathrm{mag}}=F_{\\mathrm{cp}}\\qquad |q|vB=\\frac{mv^2}{R}\\]</div><div class=\"equation\">\\[\\boxed{R=\\frac{mv}{|q|B}}\\]</div><p>R es el radio de la trayectoria, m es la masa y |q| el módulo de la carga. En el problema del material, la distancia entre los puntos de entrada y salida corresponde al diámetro de una semicircunferencia.</p><div class=\"key\"><b>Idea clave</b>Identifica primero si el dato geométrico representa un radio o un diámetro. El ejemplo se desarrolla en el resuelto 10.</div>",
      "examples": [],
      "visuals": [
        {
          "src": "assets/em-realistic/08-trayectoria.svg",
          "alt": "Cámara de partículas y trayectoria semicircular calculada: carga positiva entra por A a la derecha y sale por C a la izquierda.",
          "width": 1200,
          "height": 700,
          "caption": "Trayectoria de una partícula en un campo magnético uniforme."
        }
      ]
    },
    {
      "id": "induccion-electromagnetica",
      "title": "Inducción electromagnética",
      "subtitle": "Del campo magnético a una corriente inducida",
      "sourcePages": [
        11
      ],
      "sourcePrintedPages": [
        224
      ],
      "body": "<p>Después de la experiencia de Oersted, Faraday investigó cómo obtener corriente eléctrica mediante un campo magnético. El material compara un imán cerca de una espira conductora en dos situaciones:</p><figure class=\"dimensional-figure em-realistic-figure\"><button type=\"button\" class=\"em-image-button\" data-action=\"math-figure\" data-id=\"theory:induccion-electromagnetica:0\" aria-label=\"Ampliar imagen: Inducción electromagnética por variación del flujo.\"><img src=\"assets/em-realistic/09-induccion.svg\" alt=\"Imán realista junto a una bobina conectada a un galvanómetro y comparación entre reposo y movimiento relativo.\" width=\"1200\" height=\"760\" loading=\"lazy\"><span>Ampliar imagen ⊕</span></button><figcaption>Inducción electromagnética por variación del flujo.</figcaption></figure><div class=\"table-scroll\"><table><thead><tr><th>Situación</th><th>Lo que ocurre en la espira</th></tr></thead><tbody><tr><td>Imán en reposo respecto a la espira</td><td>La cantidad de líneas que atraviesan la superficie de la espira se mantiene constante; el foco permanece apagado.</td></tr><tr><td>El imán se acerca a la espira</td><td>Cambia la cantidad de líneas que atraviesan su superficie; se registra una corriente inducida y el foco se enciende.</td></tr></tbody></table></div><p>Para cuantificar el campo que atraviesa una superficie, el material introduce el <strong>flujo magnético</strong>.</p><div class=\"key\"><b>Idea clave</b>La comparación importante es entre flujo constante y flujo que cambia.</div>",
      "examples": [],
      "visuals": [
        {
          "src": "assets/em-realistic/09-induccion.svg",
          "alt": "Imán realista junto a una bobina conectada a un galvanómetro y comparación entre reposo y movimiento relativo.",
          "width": 1200,
          "height": 760,
          "caption": "Inducción electromagnética por variación del flujo."
        }
      ]
    },
    {
      "id": "flujo-magnetico",
      "title": "Flujo magnético",
      "subtitle": "Área, intensidad, orientación y signo",
      "sourcePages": [
        11,
        12,
        13
      ],
      "sourcePrintedPages": [
        224,
        225,
        226
      ],
      "body": "<p>El flujo magnético \\(\\Phi\\) cuantifica el campo que atraviesa una superficie. El material compara dos regiones: donde las líneas están más juntas, el campo es más intenso y el flujo a través de un mismo anillo es mayor.</p><figure class=\"dimensional-figure em-realistic-figure\"><button type=\"button\" class=\"em-image-button\" data-action=\"math-figure\" data-id=\"theory:flujo-magnetico:0\" aria-label=\"Ampliar imagen: Flujo magnético: campo, área y orientación de la espira.\"><img src=\"assets/em-realistic/10-flujo.svg\" alt=\"Espira realista y diagrama con campo uniforme B, normal a la superficie y ángulo theta entre B y esa normal.\" width=\"1200\" height=\"760\" loading=\"lazy\"><span>Ampliar imagen ⊕</span></button><figcaption>Flujo magnético: campo, área y orientación de la espira.</figcaption></figure><ul><li>Con orientación y área fijas, el flujo es directamente proporcional a B.</li><li>Con orientación y campo fijos, el flujo es directamente proporcional al área A.</li></ul><h4>Campo perpendicular a la superficie</h4><div class=\"equation\">\\[\\Phi=BA\\]</div><h4>Superficie con otra orientación</h4><div class=\"equation\">\\[\\boxed{\\Phi=BA\\cos\\theta}\\]</div><p>El ángulo θ se mide entre el vector B y la <strong>normal</strong> \\(\\hat n\\), perpendicular a la superficie. La unidad de flujo es el <strong>weber (Wb)</strong>.</p><div class=\"table-scroll\"><table><thead><tr><th>Normal elegida hacia el observador</th><th>Signo del flujo</th></tr></thead><tbody><tr><td>Campo saliente, hacia el observador</td><td>Positivo (+)</td></tr><tr><td>Campo entrante, alejándose del observador</td><td>Negativo (−)</td></tr></tbody></table></div><div class=\"equation\">\\[\\Delta\\Phi=\\Phi_{\\mathrm{final}}-\\Phi_{\\mathrm{inicial}}\\]</div><div class=\"key\"><b>Idea clave</b>El ángulo se mide con la normal, no con el plano de la espira. El signo depende de la normal elegida.</div>",
      "examples": [
        {
          "title": "Ejemplo del material: una espira que gira",
          "question": "Una espira rectangular de \\(10\\,\\mathrm{cm}\\) por \\(12\\,\\mathrm{cm}\\) tiene inicialmente su superficie paralela a un campo de \\(0{,}2\\,\\mathrm T\\). Gira \\(53^\\circ\\) alrededor de uno de sus lados, en la disposición del material. La normal elegida en la posición final forma \\(143^\\circ\\) con B. Halla la variación del flujo.",
          "steps": [
            "<div class=\"equation\">\\[A=(0{,}10)(0{,}12)=0{,}012\\,\\mathrm{m^2}\\qquad\\Phi_{\\mathrm{inicial}}=0\\]</div>",
            "Como en el material, se utiliza \\(\\cos143^\\circ=-\\cos37^\\circ\\approx-4/5\\).",
            "<div class=\"equation\">\\[\\Phi_{\\mathrm{final}}\\approx(0{,}2)(0{,}012)(-4/5)=-1{,}92\\times10^{-3}\\,\\mathrm{Wb}\\]</div>",
            "<div class=\"equation\">\\[\\Delta\\Phi=-1{,}92\\,\\mathrm{mWb}\\]</div>"
          ]
        }
      ],
      "visuals": [
        {
          "src": "assets/em-realistic/10-flujo.svg",
          "alt": "Espira realista y diagrama con campo uniforme B, normal a la superficie y ángulo theta entre B y esa normal.",
          "width": 1200,
          "height": 760,
          "caption": "Flujo magnético: campo, área y orientación de la espira."
        }
      ]
    },
    {
      "id": "flujo-faraday",
      "title": "Ley de Faraday",
      "subtitle": "Rapidez de variación del flujo y fem inducida",
      "sourcePages": [
        13,
        14
      ],
      "sourcePrintedPages": [
        226,
        227
      ],
      "body": "<p>Cuando varía el flujo magnético a través de una espira, se induce una <strong>fuerza electromotriz</strong> o fem. En un circuito cerrado puede establecerse una corriente inducida. El material calcula la magnitud media de la fem mediante:</p><div class=\"equation\">\\[\\boxed{|\\xi_{\\mathrm{ind,media}}|=\\frac{|\\Delta\\Phi|}{\\Delta t}}\\]</div><p>Si el circuito contiene N espiras conectadas una a continuación de otra y el mismo flujo atraviesa cada una:</p><div class=\"equation\">\\[\\boxed{|\\xi_{\\mathrm{ind,media}}|=N\\frac{|\\Delta\\Phi|}{\\Delta t}}\\]</div><p>\\(\\Delta t\\) es el intervalo de tiempo y \\(|\\Delta\\Phi|/\\Delta t\\) representa la rapidez de variación del flujo. La fem se expresa en voltios.</p><p><strong>Observación del material:</strong> si el flujo cambia linealmente con el tiempo, la fem inducida es constante. Esto también ocurre con una espira fija de área constante cuando el campo homogéneo varía linealmente.</p><figure class=\"dimensional-figure em-realistic-figure\"><button type=\"button\" class=\"em-image-button\" data-action=\"math-figure\" data-id=\"theory:flujo-faraday:0\" aria-label=\"Ampliar imagen: Variación del flujo y ley de Faraday · ejemplo del material, p. 227.\"><img src=\"assets/em-realistic/11-faraday.svg\" alt=\"Gráfica precisa del flujo: 100 Wb a 2 s y 500 Wb a 10 s; ejemplo con resistencia de 200 ohmios.\" width=\"1200\" height=\"760\" loading=\"lazy\"><span>Ampliar imagen ⊕</span></button><figcaption>Variación del flujo y ley de Faraday · ejemplo del material, p. 227.</figcaption></figure><div class=\"key\"><b>Idea clave</b>La pendiente de la gráfica de flujo frente al tiempo permite obtener la fem; la regla de Lenz determina su sentido.</div>",
      "examples": [
        {
          "title": "Ejemplo del material: lectura de una gráfica",
          "question": "En una espira, el flujo aumenta linealmente de \\(100\\,\\mathrm{Wb}\\) a \\(500\\,\\mathrm{Wb}\\) entre \\(t=2\\,\\mathrm s\\) y \\(t=10\\,\\mathrm s\\). La resistencia del foco es \\(200\\,\\Omega\\). Determina la corriente.",
          "steps": [
            "<div class=\"equation\">\\[|\\xi_{\\mathrm{ind}}|=\\frac{500-100}{10-2}=50\\,\\mathrm V\\]</div>",
            "Por la relación \\(V=IR\\):",
            "<div class=\"equation\">\\[I=\\frac{50}{200}=0{,}25\\,\\mathrm A\\]</div>"
          ]
        }
      ],
      "visuals": [
        {
          "src": "assets/em-realistic/11-faraday.svg",
          "alt": "Gráfica precisa del flujo: 100 Wb a 2 s y 500 Wb a 10 s; ejemplo con resistencia de 200 ohmios.",
          "width": 1200,
          "height": 760,
          "caption": "Variación del flujo y ley de Faraday · ejemplo del material, p. 227."
        }
      ]
    },
    {
      "id": "ley-lenz",
      "title": "Regla de Lenz",
      "subtitle": "Sentido de la corriente inducida",
      "sourcePages": [
        15,
        16
      ],
      "sourcePrintedPages": [
        228,
        229
      ],
      "body": "<p>La regla de Lenz establece que la corriente inducida en un circuito cerrado tiene un sentido tal que su campo magnético <strong>se opone a la variación del flujo que la origina</strong>. El material relaciona esta oposición con la conservación de la energía.</p><figure class=\"dimensional-figure em-realistic-figure\"><button type=\"button\" class=\"em-image-button\" data-action=\"math-figure\" data-id=\"theory:ley-lenz:0\" aria-label=\"Ampliar imagen: Regla de Lenz: sentido de la corriente inducida.\"><img src=\"assets/em-realistic/12-lenz.svg\" alt=\"Barra metálica que se desplaza a la derecha por dos rieles, con campo entrante y corriente inducida antihoraria.\" width=\"1200\" height=\"760\" loading=\"lazy\"><span>Ampliar imagen ⊕</span></button><figcaption>Regla de Lenz: sentido de la corriente inducida.</figcaption></figure><h4>Barra que se desplaza</h4><p>Si una barra conductora se mueve hacia la derecha y aumenta el área del circuito dentro de un campo entrante, aumenta el flujo entrante. El campo de la corriente inducida debe ser saliente. Con la regla de la mano derecha, la corriente resulta <strong>antihoraria</strong>.</p><div class=\"table-scroll\"><table><thead><tr><th>Ejemplos del material</th><th>Conclusión para el observador indicado</th></tr></thead><tbody><tr><td>Un imán se aleja de una espira y disminuye el flujo que produce en ella</td><td>El campo inducido mantiene el sentido del campo que está disminuyendo; en el gráfico, la corriente es antihoraria.</td></tr><tr><td>Una espira se aleja hacia la derecha de un hilo largo con corriente hacia abajo</td><td>En la región de la espira disminuye el campo entrante del hilo; el campo inducido es entrante y la corriente es horaria.</td></tr></tbody></table></div><div class=\"key\"><b>Idea clave</b>Determina qué flujo aumenta o disminuye; después elige el campo que se opone a ese cambio y aplica la mano derecha a la espira.</div>",
      "examples": [],
      "visuals": [
        {
          "src": "assets/em-realistic/12-lenz.svg",
          "alt": "Barra metálica que se desplaza a la derecha por dos rieles, con campo entrante y corriente inducida antihoraria.",
          "width": 1200,
          "height": 760,
          "caption": "Regla de Lenz: sentido de la corriente inducida."
        }
      ]
    },
    {
      "id": "generador",
      "title": "Generador eléctrico",
      "subtitle": "Giro, flujo variable y fem alterna",
      "sourcePages": [
        16
      ],
      "sourcePrintedPages": [
        229
      ],
      "body": "<p>Un generador transforma la energía que recibe en <strong>energía eléctrica</strong>. El material presenta el modelo de una espira que gira en un campo magnético: al rotar, el flujo que atraviesa su superficie aumenta y disminuye alternadamente, lo que genera una fem alterna.</p><figure class=\"dimensional-figure em-realistic-figure\"><button type=\"button\" class=\"em-image-button\" data-action=\"math-figure\" data-id=\"theory:generador:0\" aria-label=\"Ampliar imagen: Generador eléctrico: giro de una bobina en un campo magnético.\"><img src=\"assets/em-realistic/13-generador.svg\" alt=\"Generador realista con manivela y bobina entre polos N y S; eje de giro perpendicular al campo magnético.\" width=\"1200\" height=\"760\" loading=\"lazy\"><span>Ampliar imagen ⊕</span></button><figcaption>Generador eléctrico: giro de una bobina en un campo magnético.</figcaption></figure><p>Si A es el área de la espira, B la inducción magnética, ω la rapidez angular de giro y t el tiempo:</p><div class=\"equation\">\\[\\xi_{\\mathrm{ind}}=BA\\omega\\operatorname{sen}(\\omega t)\\]</div><p>Para N espiras:</p><div class=\"equation\">\\[\\boxed{\\xi_{\\mathrm{ind}}=NBA\\omega\\operatorname{sen}(\\omega t)}\\]</div><h4>Valor máximo de la fem</h4><div class=\"equation\">\\[\\boxed{\\xi_{\\mathrm{ind,max}}=NBA\\omega}\\]</div><p>El laboratorio permite observar las dos experiencias del material: mover un imán respecto a una bobina y hacer girar una espira en un campo magnético.</p><div data-induction-lab></div><div class=\"key\"><b>Idea clave</b>El giro cambia el flujo a través de la espira; la variación del flujo produce la fem.</div>",
      "examples": [],
      "visuals": [
        {
          "src": "assets/em-realistic/13-generador.svg",
          "alt": "Generador realista con manivela y bobina entre polos N y S; eje de giro perpendicular al campo magnético.",
          "width": 1200,
          "height": 760,
          "caption": "Generador eléctrico: giro de una bobina en un campo magnético."
        }
      ]
    }
  ],
  "workedExamples": [
    {
      "number": 1,
      "title": "Dos conductores y un punto equidistante",
      "question": "En la figura se representan las secciones de dos conductores rectilíneos muy largos por los cuales fluye corriente eléctrica. Determina el módulo de la inducción magnética en P.",
      "steps": [
        "Los ángulos de la base son 60°, por lo que el triángulo es equilátero. La distancia de P a cada hilo es \\(d=10\\,\\mathrm{cm}=0{,}10\\,\\mathrm m\\).",
        "<div class=\"equation\">\\[B_1=B_2=\\frac{\\mu_0 I}{2\\pi d}=\\frac{(4\\pi\\times10^{-7})(30)}{2\\pi(0{,}10)}=60\\,\\mu\\mathrm T\\]</div>",
        "La mano derecha determina dos vectores simétricos en P. Sus componentes horizontales se cancelan y sus componentes verticales se suman.",
        "<div class=\"equation\">\\[B_P=2B_1\\cos60^\\circ=B_1=\\boxed{60\\,\\mu\\mathrm T}\\]</div>"
      ],
      "sourcePages": [
        17
      ],
      "sourcePrintedPages": [
        230
      ],
      "sourceProblem": 1,
      "sourceKind": "problema-resuelto",
      "figure": {
        "src": "assets/em-pdf/resuelto-01.svg",
        "alt": "Dos hilos separados 10 cm llevan 30A en sentidos opuestos. P es el vértice del triángulo con ángulos de 60 grados en ambos extremos.",
        "width": 760,
        "height": 400,
        "caption": "Problema resuelto 1 del material · p. 230."
      }
    },
    {
      "number": 2,
      "title": "Una partícula con velocidad constante",
      "question": "Una partícula electrizada positivamente se mueve con velocidad constante dentro de un campo eléctrico homogéneo y un campo magnético homogéneo. Su rapidez es \\(50\\,000\\,\\mathrm{m/s}\\). Halla el módulo de la intensidad del campo eléctrico. Desprecia efectos gravitatorios.",
      "steps": [
        "Como la velocidad es constante, la fuerza resultante es cero. La fuerza eléctrica apunta hacia abajo y la magnética hacia arriba.",
        "<div class=\"equation\">\\[F_{\\mathrm{el}}=F_{\\mathrm{mag}}\\quad\\Rightarrow\\quad qE=qvB\\]</div>",
        "La carga es positiva y distinta de cero; se simplifica q.",
        "<div class=\"equation\">\\[E=vB=(50\\,000)(0{,}01)=\\boxed{500\\,\\mathrm{N/C}}\\]</div>"
      ],
      "sourcePages": [
        17
      ],
      "sourcePrintedPages": [
        230
      ],
      "sourceProblem": 2,
      "sourceKind": "problema-resuelto",
      "figure": {
        "src": "assets/em-pdf/resuelto-02.svg",
        "alt": "Velocidad de carga positiva hacia la derecha, campo eléctrico hacia abajo y B 0,01T entrante.",
        "width": 760,
        "height": 400,
        "caption": "Problema resuelto 2 del material · p. 230."
      }
    },
    {
      "number": 3,
      "title": "Fem en una bobina rectangular",
      "question": "Una bobina rectangular de 500 vueltas y \\(100\\,\\mathrm{cm^2}\\) de sección transversal está dentro de un campo magnético cuya inducción varía con el tiempo según la gráfica. Halla la fem inducida.",
      "steps": [
        "\\(A=100\\,\\mathrm{cm^2}=10^{-2}\\,\\mathrm{m^2}\\). La bobina permanece fija y el ángulo con la normal es 37°.",
        "<div class=\"equation\">\\[\\Phi_{80}=BA\\cos37^\\circ\\approx(1{,}2)(10^{-2})(4/5)=9{,}6\\times10^{-3}\\,\\mathrm{Wb}\\]</div>",
        "El flujo inicial es cero. La variación es lineal, por lo que la magnitud de la fem es constante.",
        "<div class=\"equation\">\\[|\\xi|=500\\frac{9{,}6\\times10^{-3}-0}{80}=0{,}060\\,\\mathrm V=\\boxed{60\\,\\mathrm{mV}}\\]</div>"
      ],
      "sourcePages": [
        18
      ],
      "sourcePrintedPages": [
        231
      ],
      "sourceProblem": 3,
      "sourceKind": "problema-resuelto",
      "figure": {
        "src": "assets/em-pdf/resuelto-03.svg",
        "alt": "B crece linealmente de 0 a 1,2T en 80s; bobina 500vueltas área 100cm 2, normal a 37grados de B.",
        "width": 760,
        "height": 400,
        "caption": "Problema resuelto 3 del material · p. 231."
      }
    },
    {
      "number": 4,
      "title": "Barra conductora móvil",
      "question": "La barra conductora se traslada con velocidad constante apoyada en un alambre conductor. Determina la intensidad de la corriente y su sentido. Desprecia la resistencia eléctrica de la barra.",
      "steps": [
        "Al avanzar la barra aumenta el área y el flujo entrante. Por Lenz, el campo inducido es saliente y la corriente es antihoraria.",
        "Durante un intervalo \\(\\Delta t\\), la barra avanza \\(d=v\\Delta t\\) y el área aumenta \\(\\Delta A=Ld\\).",
        "<div class=\"equation\">\\[|\\xi|=\\frac{B\\Delta A}{\\Delta t}=\\frac{BLv\\Delta t}{\\Delta t}=BLv\\]</div>",
        "Con la relación \\(|\\xi|=IR\\):",
        "<div class=\"equation\">\\[I=\\frac{BLv}{R}=\\frac{(0{,}02)(2)(200)}4=\\boxed{2\\,\\mathrm A}\\]</div>",
        "Respuesta: 2 A en sentido antihorario."
      ],
      "sourcePages": [
        18,
        19
      ],
      "sourcePrintedPages": [
        231,
        232
      ],
      "sourceProblem": 4,
      "sourceKind": "problema-resuelto",
      "figure": {
        "src": "assets/em-pdf/resuelto-04.svg",
        "alt": "Circuito 4ohmios con barra vertical 2m que se mueve a 200m/s hacia la derecha, B 0,02T entrante.",
        "width": 760,
        "height": 400,
        "caption": "Problema resuelto 4 del material · pp. 231-232."
      }
    },
    {
      "number": 5,
      "title": "Flujo en una espira rectangular",
      "question": "La espira rectangular se encuentra en un campo magnético homogéneo de \\(B=5\\,\\mathrm{mT}\\). Determina el flujo magnético sobre ella. \\(MN=4\\,\\mathrm{cm}\\) y \\(NR=6\\,\\mathrm{cm}\\).",
      "steps": [
        "<div class=\"equation\">\\[B=5\\times10^{-3}\\,\\mathrm T\\qquad A=(4\\times10^{-2})(6\\times10^{-2})=24\\times10^{-4}\\,\\mathrm{m^2}\\]</div>",
        "El campo forma 37° con el plano. El ángulo con la normal indicada es \\(\\theta=90^\\circ-37^\\circ=53^\\circ\\). Como en el material, se usa \\(\\cos53^\\circ\\approx3/5\\).",
        "<div class=\"equation\">\\[\\Phi=BA\\cos\\theta\\approx(5\\times10^{-3})(24\\times10^{-4})(3/5)\\]</div>",
        "<div class=\"equation\">\\[\\boxed{\\Phi=7{,}2\\times10^{-6}\\,\\mathrm{Wb}}\\]</div>"
      ],
      "sourcePages": [
        19
      ],
      "sourcePrintedPages": [
        232
      ],
      "sourceProblem": 5,
      "sourceKind": "problema-resuelto",
      "figure": {
        "src": "assets/em-pdf/resuelto-05.svg",
        "alt": "Espira 4por 6cm, campo 5mT a 37grados con el plano.",
        "width": 760,
        "height": 400,
        "caption": "Problema resuelto 5 del material · p. 232."
      }
    },
    {
      "number": 6,
      "title": "Dos tramos rectos y una semicircunferencia",
      "question": "El alambre muy largo mostrado transporta una corriente de \\(0{,}5\\,\\mathrm A\\). Determina el módulo de la inducción magnética en O. \\(R=10\\,\\mathrm{cm}\\).",
      "steps": [
        "Se descompone el conductor en el tramo semiinfinito superior, la semicircunferencia y el tramo semiinfinito inferior. La mano derecha indica que los tres campos en O son entrantes.",
        "<div class=\"equation\">\\[R=0{,}10\\,\\mathrm m\\qquad B_1=B_3=\\frac{\\mu_0 I}{4\\pi R}=0{,}5\\,\\mu\\mathrm T\\]</div>",
        "Para el arco semicircular, \\(\\theta=\\pi\\,\\mathrm{rad}\\):",
        "<div class=\"equation\">\\[B_2=\\frac{\\mu_0 I\\pi}{4\\pi R}=\\frac\\pi2\\,\\mu\\mathrm T\\]</div>",
        "Se suman las magnitudes porque los tres vectores tienen el mismo sentido.",
        "<div class=\"equation\">\\[B_O=B_1+B_2+B_3=\\boxed{\\left(1+\\frac\\pi2\\right)\\,\\mu\\mathrm T}\\]</div>"
      ],
      "sourcePages": [
        19,
        20
      ],
      "sourcePrintedPages": [
        232,
        233
      ],
      "sourceProblem": 6,
      "sourceKind": "problema-resuelto",
      "figure": {
        "src": "assets/em-pdf/resuelto-06.svg",
        "alt": "Dos tramos semiinfinitos horizontales y semicircunferencia derecha forman un hilo, corriente 0,5A radio 10cm.",
        "width": 760,
        "height": 400,
        "caption": "Problema resuelto 6 del material · pp. 232-233."
      }
    },
    {
      "number": 7,
      "title": "Fuerza sobre una barra paralela a un hilo",
      "question": "Un conductor largo está colocado a 10 cm de una barra conductora MN que transporta corriente de igual intensidad. Determina la magnitud de la fuerza magnética sobre la barra de 1 m de longitud. \\(I=1\\,\\mathrm A\\).",
      "steps": [
        "El campo del hilo en la barra es entrante y su magnitud se obtiene con la distancia perpendicular \\(d=0{,}10\\,\\mathrm m\\).",
        "<div class=\"equation\">\\[B=\\frac{\\mu_0 I}{2\\pi d}=\\frac{(4\\pi\\times10^{-7})(1)}{2\\pi(0{,}10)}=2\\times10^{-6}\\,\\mathrm T\\]</div>",
        "La corriente de la barra es perpendicular a ese campo, por lo que \\(\\theta=90^\\circ\\).",
        "<div class=\"equation\">\\[F=BIL=(2\\times10^{-6})(1)(1)=\\boxed{2\\times10^{-6}\\,\\mathrm N}\\]</div>",
        "El sentido de la fuerza es hacia el conductor largo."
      ],
      "sourcePages": [
        20,
        21
      ],
      "sourcePrintedPages": [
        233,
        234
      ],
      "sourceProblem": 7,
      "sourceKind": "problema-resuelto",
      "figure": {
        "src": "assets/em-pdf/resuelto-07.svg",
        "alt": "Hilo largo y barraMN 1m paralelos separados 10cm, ambas corrientes 1A hacia arriba.",
        "width": 760,
        "height": 400,
        "caption": "Problema resuelto 7 del material · pp. 233-234."
      }
    },
    {
      "number": 8,
      "title": "Fem a partir de una gráfica de flujo",
      "question": "La gráfica representa cómo varía el flujo magnético a través de la sección recta de una bobina de 40 espiras. Calcula la fuerza electromotriz inducida.",
      "steps": [
        "De la gráfica: \\(\\Delta\\Phi=6-2=4\\,\\mathrm{Wb}\\) y \\(\\Delta t=4\\,\\mathrm s\\).",
        "<div class=\"equation\">\\[\\frac{|\\Delta\\Phi|}{\\Delta t}=\\frac44=1\\,\\mathrm{Wb/s}\\]</div>",
        "Se aplica Faraday para las N = 40 espiras.",
        "<div class=\"equation\">\\[|\\xi|=N\\frac{|\\Delta\\Phi|}{\\Delta t}=40(1)=\\boxed{40\\,\\mathrm V}\\]</div>"
      ],
      "sourcePages": [
        21
      ],
      "sourcePrintedPages": [
        234
      ],
      "sourceProblem": 8,
      "sourceKind": "problema-resuelto",
      "figure": {
        "src": "assets/em-pdf/resuelto-08.svg",
        "alt": "El flujo aumenta linealmente de 2Wb a 6Wb entre 0y 4s, bobina 40espiras.",
        "width": 760,
        "height": 400,
        "caption": "Problema resuelto 8 del material · p. 234."
      }
    },
    {
      "number": 9,
      "title": "Ejemplo del material: campo de un hilo largo",
      "question": "Un conductor muy largo lleva una corriente de 10 A. Halla el módulo de la inducción magnética en P, situado como en la figura.",
      "steps": [
        "La distancia que se usa en la fórmula es la <strong>perpendicular</strong> al conductor, no el segmento oblicuo de 5 cm.",
        "<div class=\"equation\">\\[d=(5\\,\\mathrm{cm})\\operatorname{sen}53^\\circ\\approx(5)(4/5)=4\\,\\mathrm{cm}=0{,}04\\,\\mathrm m\\]</div>",
        "<div class=\"equation\">\\[B_P=\\frac{\\mu_0 I}{2\\pi d}=\\frac{(4\\pi\\times10^{-7})(10)}{2\\pi(0{,}04)}\\]</div>",
        "<div class=\"equation\">\\[\\boxed{B_P=5\\times10^{-5}\\,\\mathrm T=50\\,\\mu\\mathrm T}\\]</div>"
      ],
      "sourcePages": [
        5
      ],
      "sourcePrintedPages": [
        218
      ],
      "sourceProblem": 1,
      "sourceKind": "ejemplo-teoria",
      "figure": {
        "src": "assets/em-pdf/resuelto-09.svg",
        "alt": "P está sobre segmento de 5cm que forma 53grados con el conductor, corriente 10A hacia arriba.",
        "width": 760,
        "height": 400,
        "caption": "Ejemplo 1 de la teoría del material · p. 218."
      }
    },
    {
      "number": 10,
      "title": "Ejemplo del material: masa de una partícula",
      "question": "Una partícula electrizada con \\(+0{,}5\\,\\mu\\mathrm C\\) ingresa por A a una zona con campo magnético homogéneo de \\(B=0{,}2\\,\\mathrm T\\) y sale por C. Halla su masa. Desprecia efectos gravitatorios y considera una rapidez de \\(2\\times10^6\\,\\mathrm{m/s}\\).",
      "steps": [
        "Actúa únicamente la fuerza magnética y la trayectoria dentro del campo es semicircular. \\(AC=2R=0{,}4\\,\\mathrm m\\), de modo que \\(R=0{,}2\\,\\mathrm m\\).",
        "<div class=\"equation\">\\[R=\\frac{mv}{|q|B}\\quad\\Rightarrow\\quad m=\\frac{R|q|B}{v}\\]</div>",
        "<div class=\"equation\">\\[m=\\frac{(0{,}2)(0{,}5\\times10^{-6})(0{,}2)}{2\\times10^6}\\]</div>",
        "<div class=\"equation\">\\[\\boxed{m=10^{-14}\\,\\mathrm{kg}}\\]</div>"
      ],
      "sourcePages": [
        10
      ],
      "sourcePrintedPages": [
        223
      ],
      "sourceProblem": 1,
      "sourceKind": "ejemplo-teoria",
      "figure": {
        "src": "assets/em-pdf/resuelto-10.svg",
        "alt": "Carga positiva entra porA con velocidad hacia arriba, campo 0,2T entrante; distanciaAC 0,4m es el diámetro de su trayectoria semicircular.",
        "width": 760,
        "height": 400,
        "caption": "Ejemplo de movimiento de una partícula del material · p. 223."
      }
    }
  ]
};
