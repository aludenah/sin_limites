'use strict';
window.HISTORY_CONTENT={
  "number": 4,
  "id": "razonamiento-matematico-capitulo-04",
  "progressId": "razonamiento-matematico-capitulo-04",
  "courseId": 2,
  "courseName": "Razonamiento Matemático",
  "title": "Lazos familiares, cortes y seccionamientos",
  "intro": "Representa parentescos mediante árboles y analiza cómo los cortes producen piezas. Precisa cuándo se puede doblar, apilar o reacomodar.",
  "version": 1,
  "format": "reading",
  "math": true,
  "assessmentFormat": "practice-10",
  "sequenceTitle": "Ruta de resolución",
  "sequenceNote": "Representa los datos, aplica las restricciones y comprueba el resultado. Las figuras forman parte de los problemas; las medidas indicadas prevalecen sobre el tamaño del dibujo.",
  "goals": [
    {
      "title": "Relacionar",
      "text": "Sigue vínculos familiares sin confundir personas con roles."
    },
    {
      "title": "Distinguir",
      "text": "Separa cortes de piezas y reconoce objetos abiertos, cerrados y sólidos."
    },
    {
      "title": "Optimizar",
      "text": "Usa superposición solo cuando el enunciado la permite y demuestra el mínimo."
    }
  ],
  "timeline": [
    [
      "Paso 1",
      "Lazos familiares y árboles"
    ],
    [
      "Paso 2",
      "Expresiones familiares y número de personas"
    ],
    [
      "Paso 3",
      "Cortes de varillas y anillos"
    ],
    [
      "Paso 4",
      "Láminas, superposición y doblado"
    ],
    [
      "Paso 5",
      "Seccionamiento de sólidos"
    ]
  ],
  "lessons": [
    {
      "title": "Lazos familiares y árboles",
      "blocks": [
        {
          "title": "Personas, uniones y generaciones",
          "paragraphs": [
            "Un árbol familiar representa personas distintas mediante nodos y vincula padres con hijos mediante ramas. Una unión horizontal puede indicar pareja; su significado debe declararse. Dibuja a quienes pertenecen a una misma generación a una altura semejante y sigue las ramas para contar generaciones.",
            "En los ejercicios se usan los vínculos familiares ordinarios expresamente indicados. «La esposa de mi padre» no siempre permite concluir «mi madre» si el enunciado no proporciona esa identidad. Tampoco «hermano de mi tío» identifica necesariamente al padre: puede haber otros hermanos. Las deducciones necesitan datos, no supuestos sobre una familia típica."
          ],
          "id": "rm04-tema1"
        },
        {
          "title": "Parentesco directo y colateral",
          "paragraphs": [
            "Abuelo, padre, hijo y nieto pertenecen a una línea de ascendencia o descendencia. Hermanos, tíos, sobrinos y primos exigen pasar por una rama compartida. Si Ana y Marco son hermanos, la hija de Ana y el hijo de Marco son primos entre sí.",
            "Los vínculos por matrimonio o pareja no se sustituyen automáticamente por filiación. Un cuñado puede ser el hermano de la pareja o la pareja de un hermano; se debe seguir la cadena concreta. Para responder quién es alguien respecto de otra persona, empieza por esta última y recorre los enlaces en el orden correcto."
          ],
          "id": "rm04-tema2"
        }
      ],
      "examples": [
        {
          "title": "Del abuelo al nieto",
          "question": "Julia es madre de Elena y Elena es madre de Luis. ¿Qué relación tiene Julia con Luis?",
          "steps": [
            "Desde Luis se sube una generación hasta Elena.",
            "Se sube otra generación hasta Julia.",
            "Julia es abuela de Luis; Luis es nieto de Julia. El sentido de la pregunta determina el término."
          ]
        }
      ]
    },
    {
      "title": "Expresiones familiares y número de personas",
      "blocks": [
        {
          "title": "Leer las cadenas desde el interior",
          "paragraphs": [
            "En «el hijo de la madre de Ana», identifica primero a la madre de Ana y después a su hijo. La cadena puede designar a un hermano, pero depende de qué hijos tiene esa madre y de los datos de sexo e identidad. Expresiones como hijo único o única hija eliminan posibilidades que, de otro modo, seguirían abiertas.",
            "Sustituye un fragmento por un nombre solo cuando su identidad esté determinada. En una declaración de un varón que es hijo único, «el hijo de mi padre» se refiere a él mismo. Esta sustitución vuelve sencilla una frase larga, sin tener que imaginar más personas de las necesarias."
          ],
          "id": "rm04-tema3"
        },
        {
          "title": "Una persona puede cumplir varios roles",
          "paragraphs": [
            "Un mismo participante puede ser padre respecto de su hijo e hijo respecto de su padre. Por ello, dos padres y dos hijos pueden ser tres personas: abuelo, padre e hijo. Para buscar un mínimo, superpone roles compatibles y luego cuenta personas distintas.",
            "Aclara que los vínculos contados se establecen entre quienes están presentes. En una cadena de cuatro generaciones hay tres padres, tres hijos, dos abuelos y dos nietos dentro del grupo. No se suman los roles como si cada palabra exigiera una persona nueva, ni se cuentan parientes que no están incluidos."
          ],
          "id": "rm04-tema4"
        }
      ],
      "examples": [
        {
          "title": "Dos padres y dos hijos",
          "question": "Tres varones de generaciones consecutivas se reúnen: abuelo, padre y nieto. ¿Pueden ser dos padres y dos hijos dentro del grupo?",
          "steps": [
            "El abuelo es padre del participante intermedio.",
            "El intermedio es hijo del abuelo y padre del nieto.",
            "El nieto es hijo del intermedio. Se cumplen los cuatro roles con tres personas."
          ]
        }
      ]
    },
    {
      "title": "Cortes de varillas y anillos",
      "blocks": [
        {
          "title": "Un objeto abierto empieza con una pieza",
          "paragraphs": [
            "Una varilla recta, sin doblar ni apilar, empieza como una pieza. Cada corte transversal interior en un punto nuevo añade una pieza. Para obtener \\(p\\) fragmentos se requieren \\(p-1\\) cortes. Un corte repetido sobre una separación existente no aumenta la cantidad.",
            "Si las piezas deben medir \\(l\\) y la varilla mide \\(L\\), primero calcula \\(p=L/l\\), siempre que la división sea exacta. Después resta uno para hallar los cortes. Usa las mismas unidades en ambas longitudes; mezclar metros con centímetros produce un conteo incorrecto."
          ],
          "id": "rm04-tema5"
        },
        {
          "title": "Un objeto cerrado tiene otro comienzo",
          "paragraphs": [
            "Un anillo de alambre es inicialmente una curva cerrada. Un primer corte lo abre, pero lo deja en una sola pieza conectada. El segundo corte crea dos arcos separados. Con cortes en puntos distintos, sin doblar ni superponer, k cortes producen k arcos para cualquier k positivo.",
            "La diferencia con una varilla está en el primer corte. Un dibujo ayuda a reconocer si ya existen extremos libres. En problemas con alambre soldado, también hay que precisar si se corta una barra, una unión o varias capas; la palabra «corte» no determina por sí sola cuántas conexiones desaparecen."
          ],
          "id": "rm04-tema6"
        }
      ],
      "examples": [
        {
          "title": "De longitud a cortes",
          "question": "Una varilla de 180 cm se divide en piezas de 30 cm, sin apilar ni doblar. ¿Cuántos cortes transversales se hacen?",
          "steps": [
            "La cantidad de piezas es \\(180/30=6\\).",
            "Una varilla abierta necesita un corte menos que piezas: \\(6-1\\).",
            "Se hacen 5 cortes en puntos distintos."
          ]
        }
      ]
    },
    {
      "title": "Láminas, superposición y doblado",
      "blocks": [
        {
          "title": "Cortes de una cuadrícula",
          "paragraphs": [
            "Para dividir una lámina en \\(r\\) filas y \\(c\\) columnas mediante cortes rectos completos paralelos a sus lados, sin mover ni apilar las piezas, se necesitan \\((r-1)+(c-1)\\) cortes. El número de rectángulos finales es \\(rc\\), que es otra cantidad.",
            "Cada línea completa puede atravesar varias regiones ya separadas. Por eso la regla de «un corte añade una pieza» de la varilla no describe todas las particiones de una lámina. Tampoco la cuadrícula representa el máximo general de regiones de rectas arbitrarias: aquí las direcciones están fijadas."
          ],
          "id": "rm04-tema7"
        },
        {
          "title": "Aprovechar capas solo si está permitido",
          "paragraphs": [
            "Si las piezas pueden apilarse y la herramienta atraviesa toda la pila, una operación puede cortar varias piezas a la vez. Al partir por la mitad todas las piezas alineadas, la cantidad puede duplicarse: \\(1,2,4,8,\\ldots\\). Tras \\(k\\) operaciones se alcanzan \\(2^k\\) piezas iguales cuando la geometría permite ese procedimiento.",
            "Doblar una hoja también superpone capas, pero al desplegarla hay que reconstruir todas las líneas de corte y comprobar qué fragmentos siguen unidos. No se infiere el número de piezas multiplicando a ciegas por las capas. Una varilla rígida no se dobla salvo autorización expresa; apilar es una operación distinta."
          ],
          "id": "rm04-tema8"
        }
      ],
      "examples": [
        {
          "title": "Ocho trozos iguales con apilamiento",
          "question": "Una barra se puede cortar, reacomodar y apilar después de cada operación. La sierra atraviesa toda la pila. ¿Cómo obtener ocho piezas iguales en tres cortes?",
          "steps": [
            "Corta la barra por la mitad: quedan dos piezas iguales.",
            "Apila esas dos mitades y córtalas por el centro: quedan cuatro cuartos.",
            "Apila los cuatro cuartos y córtalos por el centro: quedan ocho octavos. Cada corte duplica las piezas."
          ]
        }
      ]
    },
    {
      "title": "Seccionamiento de sólidos",
      "blocks": [
        {
          "title": "Separar las tres direcciones",
          "paragraphs": [
            "Para dividir un bloque rectangular en \\(a\\), \\(b\\) y \\(c\\) partes iguales a lo largo de sus tres dimensiones, mediante planos paralelos a las caras y sin reacomodar, se requieren \\((a-1)+(b-1)+(c-1)\\) cortes. El número de bloques pequeños es \\(abc\\).",
            "En un cubo con tres divisiones por arista se hacen dos planos de corte en cada una de tres direcciones. El dibujo en perspectiva puede mostrar solo algunas caras; no representa que los cubitos interiores no existan. Las líneas de la retícula indican planos completos que atraviesan el sólido."
          ],
          "id": "rm04-tema9"
        },
        {
          "title": "Verificar la interpretación y el mínimo",
          "paragraphs": [
            "Antes de calcular, identifica el objeto, las direcciones de corte, la igualdad exigida a las piezas y si se permite moverlas. Luego distingue entre cantidad de operaciones y cantidad de planos o puntos distintos. Si se puede apilar, ambas cantidades pueden cambiar de relación.",
            "Para demostrar que un número de cortes es mínimo, encuentra una necesidad: cada separación interna prescrita requiere un plano, o cada operación puede como máximo duplicar las piezas de una pila de segmentos. Después construye el procedimiento que alcanza esa cantidad. Un dibujo final por sí solo no demuestra el mínimo."
          ],
          "id": "rm04-tema10"
        }
      ],
      "examples": [
        {
          "title": "Ocho cubitos",
          "question": "Un cubo se divide en dos partes iguales por cada dimensión, sin reacomodar. ¿Cuántos cortes planos se necesitan para obtener ocho cubitos?",
          "steps": [
            "En cada dimensión basta una separación central: \\(2-1=1\\).",
            "Hay tres direcciones independientes, de modo que se necesitan \\(1+1+1=3\\) cortes.",
            "El resultado contiene \\(2\\times2\\times2=8\\) cubitos. No se confunde 8 piezas con 8 cortes."
          ]
        }
      ]
    }
  ],
  "sourceNote": "Base temática: Razonamiento Matemático, Javier Portuguez Pérez y Jimmy Paredes Barbarón, Lumbreras Editores, primera edición, 2020, capítulo 4, pp. 41–55 (páginas impresas). Desarrollo didáctico, figuras y problemas originales de SIN LÍMITES basados en los temas del capítulo."
};
