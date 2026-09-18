'use strict';
window.HISTORY_CONTENT={
  "number": 5,
  "id": "razonamiento-matematico-capitulo-05",
  "progressId": "razonamiento-matematico-capitulo-05",
  "courseId": 2,
  "courseName": "Razonamiento Matemático",
  "title": "Distribuciones numéricas",
  "intro": "Coloca números bajo condiciones de suma o producto. Reconoce casillas compartidas, constantes mágicas y restricciones que se repiten.",
  "version": 1,
  "format": "reading",
  "math": true,
  "assessmentFormat": "practice-10",
  "sequenceTitle": "Ruta de resolución",
  "sequenceNote": "Representa los datos, aplica las restricciones y comprueba el resultado. Las figuras forman parte de los problemas; las medidas indicadas prevalecen sobre el tamaño del dibujo.",
  "goals": [
    {
      "title": "Contar",
      "text": "Distingue la suma de números distintos de la suma por líneas superpuestas."
    },
    {
      "title": "Relacionar",
      "text": "Obtén centros, parejas opuestas y constantes de cuadrados mágicos."
    },
    {
      "title": "Verificar",
      "text": "Comprueba todas las filas, columnas, diagonales o bloques exigidos."
    }
  ],
  "timeline": [
    [
      "Paso 1",
      "La figura determina la cuenta"
    ],
    [
      "Paso 2",
      "Cuadrados mágicos de orden tres"
    ],
    [
      "Paso 3",
      "Otros órdenes y transformaciones"
    ],
    [
      "Paso 4",
      "Distribuciones multiplicativas"
    ],
    [
      "Paso 5",
      "Sumas consecutivas y bloques"
    ]
  ],
  "lessons": [
    {
      "title": "La figura determina la cuenta",
      "blocks": [
        {
          "title": "Números disponibles y reglas",
          "paragraphs": [
            "Antes de distribuir números, anota cuáles están permitidos, si se pueden repetir y qué líneas deben cumplir la condición. No es lo mismo exigir igual suma en filas que exigirla también en columnas y diagonales. «Las diagonales» de un cuadrado mágico designa sus dos diagonales principales.",
            "La condición debe ser explícita. Conocer unos cuantos números en un dibujo no determina por sí solo una regla única. En los problemas de este capítulo se indica qué suma, producto o regularidad debe mantenerse, para que la casilla desconocida se deduzca de los datos y no de adivinar una intención."
          ],
          "id": "rm05-tema1"
        },
        {
          "title": "Casillas contadas más de una vez",
          "paragraphs": [
            "En una cruz de cinco casillas, la fila horizontal y la columna vertical comparten el centro \\(c\\). Si cada línea suma \\(S\\) y los cinco valores distintos suman \\(T\\), entonces \\(2S=T+c\\). El centro aparece dos veces al sumar las líneas, mientras que las otras cuatro casillas aparecen una sola vez.",
            "En un triángulo de seis casillas, con tres por lado, cada vértice pertenece a dos lados y cada punto medio a uno. Si los lados suman \\(S\\), la suma de los tres lados es \\(3S=T+V\\), donde \\(V\\) es la suma de los tres vértices. Dibuja y marca las repeticiones antes de despejar."
          ],
          "id": "rm05-tema2"
        }
      ],
      "examples": [
        {
          "title": "Una cruz con suma ocho",
          "question": "Se usan los números del 1 al 5 una vez en una cruz de cinco casillas. Cada línea de tres suma 8. ¿Cuál es el centro?",
          "steps": [
            "La suma de los cinco números es \\(T=15\\).",
            "Las dos líneas suman \\(2\\times8=16\\), que cuenta el centro una vez más.",
            "El centro es \\(16-15=1\\). Los extremos pueden emparejarse como 2 con 5 y 3 con 4, así que la distribución existe."
          ]
        }
      ]
    },
    {
      "title": "Cuadrados mágicos de orden tres",
      "blocks": [
        {
          "title": "La constante de un cuadrado normal",
          "paragraphs": [
            "Un cuadrado mágico aditivo de orden 3 tiene nueve casillas y la misma suma \\(M\\) en cada fila, cada columna y las dos diagonales principales. Si utiliza los enteros del 1 al 9 una sola vez, la suma total es 45. Como hay tres filas disjuntas, \\(3M=45\\), por lo que \\(M=15\\).",
            "La suma total no se divide entre las ocho líneas mencionadas, porque esas líneas se superponen. Para hallar la constante se utiliza una partición sin repetir casillas: todas las filas o todas las columnas. Después se verifican también las diagonales para confirmar que el cuadrado sea mágico."
          ],
          "id": "rm05-tema3"
        },
        {
          "title": "Centro y parejas opuestas",
          "paragraphs": [
            "En cualquier cuadrado mágico aditivo de orden 3, el centro \\(c\\) cumple \\(M=3c\\). Las cuatro líneas que pasan por el centro suman \\(4M\\) y cuentan todos los números una vez, más tres repeticiones del centro. Como el total es \\(3M\\), queda \\(4M=3M+3c\\).",
            "Cada pareja de casillas simétricas respecto del centro suma \\(M-c=2c\\). Para los números del 1 al 9, el centro es 5 y cada pareja opuesta suma 10. Esta propiedad permite deducir una casilla sin completar el resto del cuadrado, pero no sustituye la verificación final de todas las líneas."
          ],
          "id": "rm05-tema4"
        }
      ],
      "examples": [
        {
          "title": "Una pareja opuesta",
          "question": "Un cuadrado mágico de orden 3 usa del 1 al 9. Si una esquina contiene 2, ¿qué contiene la esquina opuesta?",
          "steps": [
            "La constante es 15 y el centro es \\(15/3=5\\).",
            "Las dos esquinas opuestas y el centro forman una diagonal: \\(2+5+x=15\\).",
            "Por tanto, \\(x=8\\). La pareja 2 y 8 suma 10."
          ]
        }
      ]
    },
    {
      "title": "Otros órdenes y transformaciones",
      "blocks": [
        {
          "title": "Constante de orden n",
          "paragraphs": [
            "Un cuadrado mágico normal de orden \\(n\\) utiliza una vez los enteros del 1 a \\(n^2\\). La suma de esos números es \\(n^2(n^2+1)/2\\). Al repartir el total entre las \\(n\\) filas, la constante debe ser \\(M=n(n^2+1)/2\\).",
            "Para orden 4, la suma total de 1 a 16 es 136 y cada fila suma \\(136/4=34\\). El cálculo da una condición necesaria; no significa que cualquier distribución con esa suma total sea mágica. El orden 3 tiene propiedades de centro que no se trasladan literalmente a un cuadrado par."
          ],
          "id": "rm05-tema5"
        },
        {
          "title": "Sumar o multiplicar todos los valores",
          "paragraphs": [
            "Si a cada casilla de un cuadrado de orden \\(n\\) se le suma \\(d\\), cada línea de \\(n\\) casillas aumenta en \\(nd\\). La nueva constante es \\(M+nd\\). Si todos los valores se multiplican por \\(k\\), la constante aditiva se convierte en \\(kM\\).",
            "Estas transformaciones conservan las igualdades entre líneas. Permiten pasar del conjunto 1 a 9 a otro conjunto de nueve enteros consecutivos. La transformación debe aplicarse a todas las casillas, no solo al centro o a la incógnita. Comprueba qué números se piden antes de usar la constante 15 por costumbre."
          ],
          "id": "rm05-tema6"
        }
      ],
      "examples": [
        {
          "title": "Números del cuatro al doce",
          "question": "Un cuadrado mágico de orden 3 usa una vez cada entero del 4 al 12. ¿Cuál es su constante?",
          "steps": [
            "Esos números se obtienen sumando 3 a cada uno de los números del 1 al 9.",
            "Cada línea tiene tres casillas, por lo que aumenta en \\(3\\times3=9\\).",
            "La constante es \\(15+9=24\\), y el centro es \\(24/3=8\\)."
          ]
        }
      ]
    },
    {
      "title": "Distribuciones multiplicativas",
      "blocks": [
        {
          "title": "Producto común en lugar de suma",
          "paragraphs": [
            "En un cuadrado mágico multiplicativo se exige el mismo producto en cada fila, columna y diagonal principal. No se emplea la constante aditiva ni se suman los valores para despejar una casilla. Empieza por una línea completa: su producto proporciona la constante P.",
            "Los problemas de esta sección usan valores positivos. Así se puede dividir por los productos conocidos sin introducir casos de cero ni signos. Por ejemplo, si una fila tiene 2, 3 y 12, el producto común es 72. En otra fila con 4, x y 3, la incógnita cumple 12x = 72."
          ],
          "id": "rm05-tema7"
        },
        {
          "title": "El centro de un cuadrado multiplicativo",
          "paragraphs": [
            "En orden 3 y con valores positivos, el producto común satisface \\(P=c^3\\), donde \\(c\\) es el centro. Cada pareja opuesta tiene producto \\(c^2\\). La idea es comparar el producto de todas las casillas, obtenido de las tres filas, con los cuatro pares que pasan por el centro.",
            "En efecto, los cuatro pares opuestos tienen producto \\(P/c\\). El producto total es entonces \\(c(P/c)^4=P^4/c^3\\), pero por las tres filas también es \\(P^3\\). Al igualarlos, \\(P=c^3\\). La propiedad exige que las diagonales y las columnas también cumplan la regla."
          ],
          "id": "rm05-tema8"
        }
      ],
      "examples": [
        {
          "title": "Un centro positivo",
          "question": "Un cuadrado mágico multiplicativo de orden 3 tiene centro 4 y todos sus valores son positivos. ¿Cuál es el producto común?",
          "steps": [
            "La propiedad del centro es \\(P=c^3\\).",
            "Sustituye \\(c=4\\): \\(P=4^3=64\\).",
            "Cada pareja opuesta debe multiplicar \\(4^2=16\\); al incluir el centro, su línea multiplica \\(16\\times4=64\\)."
          ]
        }
      ]
    },
    {
      "title": "Sumas consecutivas y bloques",
      "blocks": [
        {
          "title": "Restar ecuaciones que se superponen",
          "paragraphs": [
            "Si toda terna consecutiva de una fila suma la misma cantidad, se tiene \\(a_1+a_2+a_3=S\\) y \\(a_2+a_3+a_4=S\\). Al restar se cancelan los dos términos comunes y queda \\(a_1=a_4\\). Repitiendo el argumento, \\(a_i=a_{i+3}\\).",
            "La fila repite un patrón de tres posiciones. Esta periodicidad se deduce de la condición para todas las ternas, no de observar casualmente un par de repeticiones. Si solo se exigieran sumas iguales en grupos separados de tres, no se obtendría necesariamente la misma conclusión."
          ],
          "id": "rm05-tema9"
        },
        {
          "title": "Restricciones locales y comprobación global",
          "paragraphs": [
            "En una cuadrícula puede exigirse una suma para cada bloque contiguo de 2 por 2. Elige primero un bloque con una sola incógnita, calcula su valor y después revisa los bloques vecinos. Una misma casilla participa en varios bloques y debe satisfacerlos todos.",
            "No se confunde una regla local de bloques con un cuadrado mágico: las filas completas y las diagonales no tienen por qué sumar lo mismo. Al buscar un máximo o un mínimo en una distribución, primero deduce un límite algebraico y después exhibe una colocación válida que lo alcance."
          ],
          "id": "rm05-tema10"
        }
      ],
      "examples": [
        {
          "title": "Una fila periódica",
          "question": "Las tres primeras casillas de una fila son 4, 7 y 2. Toda terna consecutiva suma 13. ¿Qué valor ocupa la octava casilla?",
          "steps": [
            "Al restar sumas de ternas vecinas se obtiene \\(a_i=a_{i+3}\\).",
            "La fila repite 4, 7, 2: las posiciones 2, 5 y 8 tienen el mismo valor.",
            "La octava casilla contiene 7."
          ]
        }
      ]
    }
  ],
  "sourceNote": "Base temática: Razonamiento Matemático, Javier Portuguez Pérez y Jimmy Paredes Barbarón, Lumbreras Editores, primera edición, 2020, capítulo 5, pp. 56–72 (páginas impresas). Desarrollo didáctico, figuras y problemas originales de SIN LÍMITES basados en los temas del capítulo."
};
