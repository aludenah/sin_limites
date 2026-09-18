'use strict';
window.HISTORY_CONTENT={
  "number": 3,
  "id": "razonamiento-matematico-capitulo-03",
  "progressId": "razonamiento-matematico-capitulo-03",
  "courseId": 2,
  "courseName": "Razonamiento Matemático",
  "title": "Ordenamiento de información",
  "intro": "Ubica personas, objetos y atributos a partir de condiciones. Distingue el orden lineal, la disposición circular y las asignaciones sin repetición.",
  "version": 1,
  "format": "reading",
  "math": true,
  "assessmentFormat": "practice-10",
  "sequenceTitle": "Ruta de resolución",
  "sequenceNote": "Representa los datos, aplica las restricciones y comprueba el resultado. Las figuras forman parte de los problemas; las medidas indicadas prevalecen sobre el tamaño del dibujo.",
  "goals": [
    {
      "title": "Traducir",
      "text": "Convierte cada pista en una posición, una desigualdad o una exclusión."
    },
    {
      "title": "Combinar",
      "text": "Cruza condiciones para completar filas, pisos, asientos y tablas."
    },
    {
      "title": "Distinguir",
      "text": "Separa lo que es posible de lo que necesariamente se cumple."
    }
  ],
  "timeline": [
    [
      "Paso 1",
      "Ordenamiento lineal"
    ],
    [
      "Paso 2",
      "Pisos, alturas y clasificaciones"
    ],
    [
      "Paso 3",
      "Ordenamiento circular"
    ],
    [
      "Paso 4",
      "Tablas de correspondencia"
    ],
    [
      "Paso 5",
      "Posibilidad, necesidad y revisión"
    ]
  ],
  "lessons": [
    {
      "title": "Ordenamiento lineal",
      "blocks": [
        {
          "title": "Numerar antes de colocar",
          "paragraphs": [
            "Dibuja tantos lugares como elementos hay y numéralos desde el extremo indicado. En una fila de izquierda a derecha, una posición menor está a la izquierda de una mayor. Coloca primero los datos fijos: extremos, posición central y lugares expresamente numerados.",
            "«A está a la izquierda de B» solo establece un orden: pueden existir personas entre ambos. «A está inmediatamente a la izquierda de B» establece vecindad: sus lugares son consecutivos. Confundir ambas frases convierte una pista débil en una condición que el enunciado no proporciona."
          ],
          "id": "rm03-tema1"
        },
        {
          "title": "Trabajar con bloques",
          "paragraphs": [
            "Si A está inmediatamente antes de C y B inmediatamente después de C, se forma el bloque A–C–B. El bloque ocupa tres lugares consecutivos y se desplaza como una unidad hasta encontrar una posición compatible con las demás pistas. Una restricción sobre A también restringe dónde puede empezar el bloque.",
            "Para contar elementos entre las posiciones \\(p\\) y \\(q\\), con \\(q>p\\), usa \\(q-p-1\\). La diferencia \\(q-p\\) cuenta intervalos entre posiciones, no personas intermedias. Comprueba al final que cada elemento aparezca una vez y que no haya dos elementos en un mismo lugar."
          ],
          "id": "rm03-tema2"
        }
      ],
      "examples": [
        {
          "title": "Un bloque entre extremos",
          "question": "Cinco libros A, B, C, D y E van en una fila. E está primero, D está último, A está inmediatamente antes de C y B inmediatamente después de C. ¿Cuál es el orden?",
          "steps": [
            "Las posiciones primera y quinta ya están ocupadas por E y D.",
            "El bloque A–C–B debe llenar las tres posiciones centrales.",
            "El orden es E, A, C, B, D. C ocupa el centro y todas las pistas se cumplen."
          ]
        }
      ]
    },
    {
      "title": "Pisos, alturas y clasificaciones",
      "blocks": [
        {
          "title": "Elegir el sentido de la escala",
          "paragraphs": [
            "En un edificio, los pisos suelen numerarse desde abajo hacia arriba. «Encima de» significa un piso mayor; «inmediatamente encima» significa uno más. En una carrera o clasificación, el primer puesto es el mejor: estar delante corresponde a un número menor.",
            "Escribe junto al esquema qué extremo representa la prioridad, la altura o el comienzo. No transfieras automáticamente una desigualdad de un contexto a otro. Si A es más alto que B, su altura es mayor; si A llegó antes que B, su puesto ordinal es menor."
          ],
          "id": "rm03-tema3"
        },
        {
          "title": "Encadenar comparaciones",
          "paragraphs": [
            "Si A está por encima de B y B por encima de C, entonces A está por encima de C. La comparación es transitiva. Puede dejar huecos: de \\(A>B>C\\) no se deduce que ocupen tres pisos consecutivos. Usa los lugares disponibles y las otras restricciones para decidir esos huecos.",
            "Cuando una pareja debe ocupar pisos contiguos, enumera los lugares que puede tomar. Descarta los que ya estén ocupados o no dejen espacio para otra condición. Si persisten varias distribuciones, conserva todas: no se debe elegir una al azar y presentarla como solución única."
          ],
          "id": "rm03-tema4"
        }
      ],
      "examples": [
        {
          "title": "Cuatro puestos",
          "question": "En una carrera sin empates, Diego llegó antes que Ana; Ana antes que Bruno; Bruno antes que Carla. ¿Quién ocupó el segundo puesto?",
          "steps": [
            "Une las relaciones en una cadena: Diego, Ana, Bruno, Carla.",
            "Como son los cuatro participantes, no quedan puestos para insertar a otra persona.",
            "Ana ocupa el segundo puesto. La cadena determina el orden completo."
          ]
        }
      ]
    },
    {
      "title": "Ordenamiento circular",
      "blocks": [
        {
          "title": "Fijar una referencia y un sentido",
          "paragraphs": [
            "En una mesa circular, rotar todos los nombres conserva sus relaciones. Para no repetir una misma distribución, fija a una persona y numera los asientos en sentido horario. En un número par de asientos igualmente espaciados, el opuesto se encuentra a media vuelta.",
            "Con seis asientos, la persona opuesta al lugar 2 ocupa el lugar 5: se avanzan tres lugares. La numeración es cíclica; después del último asiento se vuelve al primero. En un número impar de asientos no existe un asiento exactamente opuesto con este modelo."
          ],
          "id": "rm03-tema5"
        },
        {
          "title": "Izquierda y derecha de quien está sentado",
          "paragraphs": [
            "Si todos miran hacia el centro, la izquierda de cada persona conduce al asiento vecino en sentido horario; su derecha conduce al vecino antihorario. Para comprobarlo, imagina a la persona sentada arriba mirando hacia abajo: su mano izquierda apunta hacia la derecha del dibujo.",
            "Si todos miraran hacia afuera, estas correspondencias se invertirían. No basta con la izquierda del observador que mira la página. Por eso las figuras de este capítulo muestran hacia dónde se orientan los ocupantes y los enunciados distinguen «sentido horario» de «izquierda de una persona»."
          ],
          "id": "rm03-tema6"
        }
      ],
      "examples": [
        {
          "title": "El opuesto en una mesa de seis",
          "question": "Los asientos 1 a 6 están numerados en sentido horario. Ana está en el 1 y Bruno en el 2. ¿En qué asiento está alguien situado frente a Bruno?",
          "steps": [
            "Hay seis asientos igualmente espaciados: la media vuelta corresponde a \\(6/2=3\\) lugares.",
            "Desde el 2 se avanza hasta el 5.",
            "El asiento 5 está enfrente del 2, sin importar qué nombre se asigne a los demás."
          ]
        }
      ]
    },
    {
      "title": "Tablas de correspondencia",
      "blocks": [
        {
          "title": "Registrar afirmaciones y exclusiones",
          "paragraphs": [
            "En una asignación sin repetición, cada persona recibe un atributo y cada atributo se usa una sola vez. Una tabla con personas en filas y atributos en columnas permite marcar compatibilidades. Una afirmación ocupa una casilla y descarta las otras de esa fila y de esa columna.",
            "Las negaciones también avanzan la solución. Si una persona no puede tener dos de tres profesiones, la tercera queda determinada. No conviertas una casilla todavía posible en una afirmación: primero debe ser la única opción de su fila o columna, o quedar forzada por una combinación de restricciones."
          ],
          "id": "rm03-tema7"
        },
        {
          "title": "Cruzar varias categorías",
          "paragraphs": [
            "Con nombres, colores y mascotas existen varias correspondencias simultáneas. «Quien viste de rojo tiene perro» conecta color y mascota, sin dar todavía un nombre. En cambio, «Ana viste de azul» conecta una persona con un color. Combinarlas permite trasladar exclusiones entre categorías.",
            "Cada pista debe mantenerse activa durante toda la resolución. Cuando se descubre un atributo, revisa las demás tablas. Si una asignación obliga a repetir un color o a dar dos mascotas a la misma persona, se descarta. Una tabla final debe satisfacer tanto las pistas directas como las relaciones entre categorías."
          ],
          "id": "rm03-tema8"
        }
      ],
      "examples": [
        {
          "title": "Tres ciudades",
          "question": "Ana, Beto y Cora viven en Lima, Cusco y Piura, una ciudad por persona. Cora vive en Piura; Ana no vive en Lima. ¿Dónde vive Beto?",
          "steps": [
            "Piura ya está asignada a Cora, por lo que quedan Lima y Cusco.",
            "Ana no puede ocupar Lima y debe vivir en Cusco.",
            "Beto ocupa la ciudad restante: Lima."
          ]
        }
      ]
    },
    {
      "title": "Posibilidad, necesidad y revisión",
      "blocks": [
        {
          "title": "No toda pregunta exige una distribución única",
          "paragraphs": [
            "Una condición necesaria se cumple en todas las distribuciones válidas. Una condición posible se cumple en al menos una. Si dos ordenamientos respetan las pistas pero difieren en un dato, ese dato no está determinado, aunque uno de los ordenamientos parezca más natural.",
            "Para refutar que algo sea necesario, basta exhibir una distribución válida donde no ocurra. Para demostrar imposibilidad hay que descartar todos los casos compatibles, o hallar una contradicción directa. Esta diferencia explica por qué algunos problemas se resuelven sin completar toda la fila."
          ],
          "id": "rm03-tema9"
        },
        {
          "title": "Volver a las pistas originales",
          "paragraphs": [
            "Antes de responder, comprueba una por una las restricciones en el esquema final. Cuenta los lugares, revisa vecindades, extremos, orientación y atributos únicos. Si el resultado contradice una pista, el error suele estar en haber interpretado «antes» como «justo antes» o en haber invertido el sentido del dibujo.",
            "La respuesta debe coincidir con lo pedido: un nombre, un lugar, la cantidad de personas intermedias o una condición obligatoria. No basta presentar una distribución. Explica qué pistas fuerzan la respuesta y, cuando corresponda, muestra por qué las demás posibilidades quedan excluidas."
          ],
          "id": "rm03-tema10"
        }
      ],
      "examples": [
        {
          "title": "Un lugar que no puede ocuparse",
          "question": "En cinco lugares, E ocupa el quinto y C debe estar inmediatamente antes de D. ¿Puede C ocupar el cuarto?",
          "steps": [
            "Si C ocupara el cuarto, D tendría que estar en el quinto.",
            "El quinto ya está reservado para E, y no se permiten dos personas en un lugar.",
            "Por tanto, C no puede ocupar el cuarto. Esta imposibilidad no requiere conocer el orden de los otros nombres."
          ]
        }
      ]
    }
  ],
  "sourceNote": "Base temática: Razonamiento Matemático, Javier Portuguez Pérez y Jimmy Paredes Barbarón, Lumbreras Editores, primera edición, 2020, capítulo 3, pp. 31–40 (páginas impresas). Desarrollo didáctico, figuras y problemas originales de SIN LÍMITES basados en los temas del capítulo."
};
