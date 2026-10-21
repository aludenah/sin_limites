'use strict';
window.HISTORY_CONTENT={
  "number": 17,
  "id": "geometria-capitulo-17",
  "progressId": "geometria-capitulo-17",
  "courseId": 4,
  "courseName": "Geometría",
  "title": "Poliedros convexos y regulares",
  "intro": "Explora caras, aristas y vértices, despliega sólidos y descubre las figuras que aparecen al cortarlos con un plano.",
  "version": 1,
  "format": "reading",
  "assessmentFormat": "practice-10",
  "workshop": {
    "id": "polyhedra-workshop",
    "anchor": "polyhedra-workshop",
    "label": "Abrir el taller de las dimensiones"
  },
  "goals": [
    {
      "title": "Reconocer",
      "text": "Distingue caras, aristas y vértices, convexidad y regularidad; identifica los cinco sólidos platónicos."
    },
    {
      "title": "Relacionar y calcular",
      "text": "Aplica Euler y el doble conteo y calcula áreas sumando las caras de un desarrollo."
    },
    {
      "title": "Explorar y justificar",
      "text": "Pliega desarrollos, interpreta secciones planas y comprueba tus predicciones con la geometría del modelo."
    }
  ],
  "sequenceTitle": "Una ruta para mirar en tres dimensiones",
  "sequenceNote": "Esta ruta organiza la exploración del taller; no representa una cronología histórica.",
  "timeline": [
    [
      "Explora",
      "Gira el objeto y reconoce sus elementos, incluidos los que la perspectiva oculta."
    ],
    [
      "Cuenta",
      "Relaciona vértices, aristas y caras y comprueba Euler."
    ],
    [
      "Despliega",
      "Abre la superficie conservando las medidas de sus caras."
    ],
    [
      "Corta",
      "Mueve un plano y compara la sección con tu predicción."
    ],
    [
      "Justifica",
      "Explica el resultado mediante propiedades, conteos y cálculos."
    ]
  ],
  "lessons": [
    {
      "title": "Entra al taller: del sólido a su estructura",
      "blocks": [
        {
          "id": "geo17-taller",
          "title": "El taller de las dimensiones",
          "paragraphs": [
            "Gira un sólido y reconoce sus elementos. Después abre un desarrollo plano y vuelve a cerrarlo. En la mesa de cortes, anticipa la figura que producirá un plano antes de comprobarla. Las tres vistas representan el mismo tipo de objeto desde preguntas diferentes.",
            "Usa los controles de orientación o arrastra el modelo. La transparencia ayuda a seguir las aristas ocultas, pero no añade caras ni modifica el sólido. Los retos del taller se guardan junto con tu avance; los diez problemas del capítulo constituyen la práctica evaluada."
          ],
          "interactive": "polyhedra-workshop"
        },
        {
          "id": "geo17-elementos",
          "title": "Caras, aristas y vértices",
          "paragraphs": [
            "Un poliedro es un sólido limitado por un número finito de caras poligonales planas. Sus caras se encuentran en aristas, y estas concurren en vértices. En la frontera de un poliedro cerrado sin anomalías, cada arista pertenece a dos caras.",
            "No confundas una línea auxiliar del dibujo con una arista del objeto. Una diagonal de una cara une vértices no consecutivos del mismo polígono; una diagonal del poliedro une vértices que no pertenecen a una misma cara. La perspectiva puede ocultar elementos, pero no cambia sus cantidades."
          ],
          "headers": [
            "Elemento",
            "Cómo reconocerlo",
            "En el cubo"
          ],
          "rows": [
            [
              "Cara",
              "Región poligonal plana de la superficie.",
              "6 cuadrados."
            ],
            [
              "Arista",
              "Segmento compartido por dos caras.",
              "12 segmentos."
            ],
            [
              "Vértice",
              "Punto donde concurren aristas.",
              "8 puntos."
            ]
          ]
        }
      ],
      "examples": [
        {
          "title": "Cuenta el objeto, no solo lo que ves",
          "question": "Un dibujo de un cubo muestra tres caras. ¿Tiene el cubo únicamente tres caras?",
          "steps": [
            "La perspectiva muestra solo una parte de la superficie.",
            "Las caras posterior, inferior y lateral opuesta siguen perteneciendo al cubo aunque queden ocultas.",
            "El cubo completo tiene 6 caras, 12 aristas y 8 vértices."
          ]
        }
      ]
    },
    {
      "title": "Convexidad y relación de Euler",
      "blocks": [
        {
          "id": "geo17-convexidad",
          "title": "Un criterio para reconocer la convexidad",
          "paragraphs": [
            "Un sólido es convexo si el segmento que une cualesquiera dos puntos del sólido queda contenido por completo en él. En un poliedro convexo no hay entrantes: cada plano que contiene una cara deja todo el sólido en uno de sus semiespacios cerrados.",
            "Una esfera es convexa, pero no es un poliedro porque su superficie no está formada por caras poligonales. Un sólido con un entrante puede ser un poliedro no convexo si toda su frontera es poligonal. Convexidad y condición de poliedro responden a preguntas distintas."
          ]
        },
        {
          "id": "geo17-euler",
          "title": "Vértices menos aristas más caras",
          "paragraphs": [
            "Para todo poliedro convexo se cumple V − A + C = 2. Aquí V representa los vértices, A las aristas y C las caras. Para el cubo: 8 − 12 + 6 = 2. La relación permite comprobar un conteo o calcular un dato cuando se conocen los otros dos.",
            "Cumplir la igualdad no demuestra por sí solo que un sólido sea convexo ni regular. La relación también se cumple en otros poliedros cerrados cuya superficie tiene la misma topología que una esfera. En este capítulo la aplicamos a poliedros convexos."
          ],
          "takeaway": "Antes de sustituir valores, identifica qué letra representa cada elemento: A es el número de aristas, no el área."
        }
      ],
      "examples": [
        {
          "title": "Hallar una cantidad desconocida",
          "question": "Un poliedro convexo tiene 10 vértices y 7 caras. ¿Cuántas aristas tiene?",
          "steps": [
            "Sustituimos en V − A + C = 2: 10 − A + 7 = 2.",
            "Despejamos A = 10 + 7 − 2 = 15.",
            "Comprobamos: 10 − 15 + 7 = 2. Tiene 15 aristas."
          ]
        }
      ]
    },
    {
      "title": "Los cinco poliedros regulares convexos",
      "blocks": [
        {
          "id": "geo17-regulares",
          "title": "Regularidad: forma de las caras y disposición",
          "paragraphs": [
            "Un poliedro regular convexo tiene caras que son polígonos regulares congruentes y presenta la misma disposición de caras alrededor de cada vértice. No basta con que sus caras sean regulares por separado ni con que todas sus aristas tengan igual longitud.",
            "Los cinco poliedros regulares convexos se llaman sólidos platónicos. El tetraedro, el octaedro y el icosaedro tienen caras triangulares equiláteras; el cubo tiene caras cuadradas y el dodecaedro tiene caras pentagonales regulares."
          ],
          "headers": [
            "Sólido",
            "Forma de cada cara",
            "V",
            "A",
            "C"
          ],
          "rows": [
            [
              "Tetraedro",
              "Triángulo equilátero",
              "4",
              "6",
              "4"
            ],
            [
              "Cubo o hexaedro regular",
              "Cuadrado",
              "8",
              "12",
              "6"
            ],
            [
              "Octaedro",
              "Triángulo equilátero",
              "6",
              "12",
              "8"
            ],
            [
              "Dodecaedro",
              "Pentágono regular",
              "20",
              "30",
              "12"
            ],
            [
              "Icosaedro",
              "Triángulo equilátero",
              "12",
              "30",
              "20"
            ]
          ]
        },
        {
          "id": "geo17-cinco",
          "title": "Por qué la lista termina en cinco",
          "paragraphs": [
            "En un vértice de un poliedro convexo regular concurren al menos tres caras. La suma de los ángulos de esas caras alrededor del vértice debe ser menor que 360°; de lo contrario no se forma una esquina convexa.",
            "Con triángulos equiláteros, cuyos ángulos miden 60°, pueden concurrir 3, 4 o 5 caras: se obtienen tetraedro, octaedro e icosaedro. Con cuadrados de 90° solo pueden concurrir 3: el cubo. Con pentágonos regulares de 108° también solo pueden concurrir 3: el dodecaedro. Tres hexágonos regulares ya suman 360°, y los polígonos de más lados tienen ángulos interiores mayores.",
            "Una pirámide regular de base cuadrada no es un sólido platónico: su base es un cuadrado y sus caras laterales son triángulos. El adjetivo regular en una pirámide describe su base y la posición de su vértice; no la convierte en un poliedro regular."
          ]
        }
      ],
      "examples": [
        {
          "title": "Triángulos iguales, cantidades distintas",
          "question": "¿Por qué un tetraedro y un octaedro pueden tener caras triangulares equiláteras y ser sólidos diferentes?",
          "steps": [
            "La forma de las caras no determina por sí sola la estructura del sólido.",
            "En cada vértice del tetraedro concurren 3 caras; en cada vértice del octaedro concurren 4.",
            "El tetraedro tiene 4 caras y el octaedro tiene 8. Ambos son regulares, pero su disposición es diferente."
          ]
        }
      ]
    },
    {
      "title": "Contar elementos y calcular superficies",
      "blocks": [
        {
          "id": "geo17-doble-conteo",
          "title": "Cada arista se cuenta desde dos caras",
          "paragraphs": [
            "Si todas las caras tienen p lados y el poliedro posee C caras, el producto p × C cuenta cada arista dos veces. Por tanto, pC = 2A. Si en cada vértice concurren q aristas, de modo semejante qV = 2A.",
            "Estas igualdades son métodos de doble conteo. En el dodecaedro, 12 caras pentagonales aportan 12 × 5 = 60 lados contados desde las caras; como cada arista se comparte entre dos, A = 30. Si concurren tres aristas en cada vértice, 3V = 60 y V = 20."
          ]
        },
        {
          "id": "geo17-superficies",
          "title": "Área total: suma de las áreas de las caras",
          "paragraphs": [
            "El área total de un poliedro es la suma de las áreas de sus caras. En un cubo de arista a, cada cara tiene área a² y hay seis caras: S = 6a². En un tetraedro regular, cada cara equilátera tiene área (√3/4)a²; sus cuatro caras suman S = √3a².",
            "En una pirámide regular de base cuadrada de lado a y apotema lateral l, la base tiene área a². Cada cara lateral tiene área al/2, de modo que S = a² + 2al. La apotema lateral es la altura de un triángulo lateral, no la altura perpendicular del sólido.",
            "Las áreas se expresan en unidades cuadradas. Abrir un desarrollo no cambia la longitud de las aristas ni el área de cada cara; cambia su posición en el espacio."
          ]
        }
      ],
      "examples": [
        {
          "title": "La apotema lateral no es la altura del sólido",
          "question": "Una pirámide regular tiene base cuadrada de lado 6 cm y apotema lateral 5 cm. Calcula su área total.",
          "steps": [
            "La base mide 6² = 36 cm².",
            "Cada una de las cuatro caras triangulares tiene área (6 × 5)/2 = 15 cm²; el área lateral es 60 cm².",
            "El área total es 36 + 60 = 96 cm². No usamos 5 cm como altura perpendicular de la pirámide."
          ]
        }
      ]
    },
    {
      "title": "Del espacio al plano: desarrollos",
      "blocks": [
        {
          "id": "geo17-desarrollos",
          "title": "Abrir caras conservando sus medidas",
          "paragraphs": [
            "Un desarrollo plano es una disposición de las caras obtenida al abrir la superficie por ciertas aristas, de modo que pueda reconstruirse el sólido al plegar y unir los bordes correspondientes. Las caras quedan en un mismo plano, sin superponer sus interiores.",
            "El cubo necesita seis cuadrados congruentes. Uno de sus desarrollos coloca cuatro cuadrados en una tira y agrega otros dos en posiciones adecuadas; otro puede verse como una cruz con una cara adicional. Hay varios desarrollos válidos, y el taller muestra uno. No cualquier disposición de seis cuadrados se cierra como un cubo."
          ]
        },
        {
          "id": "geo17-bisagras",
          "title": "Qué permanece igual durante el plegado",
          "paragraphs": [
            "En el taller, las caras giran alrededor de aristas que actúan como bisagras. Las caras conservan su forma, tamaño y área. Las aristas por las que se abrió la superficie pueden separarse; las aristas elegidas como bisagras mantienen unidas sus dos caras.",
            "En la pirámide de base cuadrada, un desarrollo puede mantener el cuadrado en el centro y abrir sus cuatro caras triangulares hacia afuera. Al cerrarlo, los cuatro vértices superiores de esos triángulos coinciden en el vértice de la pirámide. El desarrollo tiene una cara cuadrada y cuatro triangulares."
          ],
          "takeaway": "Compara formas y medidas antes de plegar; una animación atractiva también debe conservar la geometría."
        }
      ],
      "examples": [
        {
          "title": "Del área del desarrollo al área del cubo",
          "question": "Un desarrollo de un cubo contiene seis cuadrados de lado 3 cm. ¿Cuál es el área total del cubo?",
          "steps": [
            "Cada cuadrado mide 3² = 9 cm².",
            "El desarrollo contiene las seis caras completas, sin superposición de sus interiores.",
            "Su área es 6 × 9 = 54 cm², igual al área total del cubo cerrado."
          ]
        }
      ]
    },
    {
      "title": "Cortar un sólido y justificar la sección",
      "blocks": [
        {
          "id": "geo17-secciones",
          "title": "La figura que produce un plano",
          "paragraphs": [
            "Una sección plana es la intersección de un sólido con un plano. Si el plano atraviesa el interior de un poliedro convexo, la sección es un polígono convexo. Sus vértices aparecen donde el plano encuentra aristas del sólido; sus lados se sitúan en caras del poliedro.",
            "Un corte no tiene por qué producir una figura de la misma forma que una cara. En un cubo, un corte interior no degenerado puede formar un triángulo, un cuadrilátero, un pentágono o un hexágono. Como el cubo tiene seis caras y cada una puede aportar como máximo un lado de la sección, el polígono no puede tener más de seis lados.",
            "Si el plano no llega al sólido, la intersección es vacía. Si solo toca un vértice o una arista, puede producir un punto o un segmento: esos casos no son polígonos. Si coincide con el plano de una cara, puede devolver esa cara completa."
          ]
        },
        {
          "id": "geo17-hexagono",
          "title": "Un hexágono en el interior del cubo",
          "paragraphs": [
            "Considera el cubo de coordenadas −1 ≤ x, y, z ≤ 1. El plano x + y + z = 0 pasa por su centro y corta seis aristas. Los seis puntos son las permutaciones de (1, −1, 0). Ordenados alrededor del plano forman un hexágono regular de lado √2.",
            "En este corte especial, el hexágono se divide en seis triángulos equiláteros de lado √2. Por ello, su área es 6 × (√3/4) × (√2)² = 3√3 unidades cuadradas. La simetría de este plano central justifica la regularidad; un corte que produce seis lados no tiene que ser regular en general.",
            "Para resolver un reto de corte, predice la figura, ajusta orientación y posición del plano y cuenta la sección obtenida. Si no coincide con tu predicción, distingue un error de orientación de un error de conteo antes de volver a comprobar."
          ],
          "takeaway": "Número de lados, forma y área son datos diferentes: un hexágono puede ser regular o irregular."
        }
      ],
      "examples": [
        {
          "title": "Seis caras pueden aportar seis lados",
          "question": "¿Puede un plano producir una sección de ocho lados al cortar un cubo?",
          "steps": [
            "Una sección interior de un poliedro convexo es convexa y cada cara del cubo puede aportar como máximo un lado.",
            "El cubo tiene seis caras, de modo que la sección puede tener como máximo seis lados.",
            "No puede obtenerse un octágono. El corte central x + y + z = 0 muestra que el máximo de seis sí es posible."
          ]
        }
      ]
    }
  ]
};
