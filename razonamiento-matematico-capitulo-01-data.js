'use strict';
window.HISTORY_CONTENT={
  "number": 1,
  "id": "razonamiento-matematico-capitulo-01",
  "progressId": "razonamiento-matematico-capitulo-01",
  "courseId": 2,
  "courseName": "Razonamiento Matemático",
  "title": "Elementos recreativos",
  "intro": "Resuelve problemas con cerillos, monedas, dados, dominós y discos. Usa dibujos precisos para distinguir qué puede cambiar y qué debe conservarse.",
  "version": 1,
  "format": "reading",
  "math": true,
  "assessmentFormat": "practice-10",
  "sequenceTitle": "Ruta de resolución",
  "sequenceNote": "Representa los datos, aplica las restricciones y comprueba el resultado. Las figuras forman parte de los problemas; las medidas indicadas prevalecen sobre el tamaño del dibujo.",
  "goals": [
    {
      "title": "Representar",
      "text": "Reconoce posiciones, caras, contactos y movimientos permitidos."
    },
    {
      "title": "Deducir",
      "text": "Usa cantidades que se conservan y relaciones entre las piezas."
    },
    {
      "title": "Justificar",
      "text": "Comprueba una solución y, cuando se pide el mínimo, explica por qué menos movimientos no bastan."
    }
  ],
  "timeline": [
    [
      "Paso 1",
      "Cerillos: estructura y movimiento"
    ],
    [
      "Paso 2",
      "Monedas: contacto y conteo"
    ],
    [
      "Paso 3",
      "Dados: caras opuestas y apilamientos"
    ],
    [
      "Paso 4",
      "Giros de dados y fichas de dominó"
    ],
    [
      "Paso 5",
      "Invariantes y mínimos"
    ]
  ],
  "lessons": [
    {
      "title": "Cerillos: estructura y movimiento",
      "blocks": [
        {
          "title": "Contar piezas compartidas",
          "paragraphs": [
            "Una figura formada por cerillos se cuenta por segmentos físicos. Si dos cuadrados vecinos comparten un lado, ese lado es un solo cerillo. El primer cuadrado de una fila necesita cuatro; cada cuadrado adicional necesita tres, porque aprovecha un lado del anterior.",
            "Para una fila de \\(n\\) cuadrados iguales, el total es \\(4+3(n-1)=3n+1\\). La fórmula depende de esa disposición: no describe cuadrados separados ni una malla de varias filas. Dibuja primero las uniones y distingue el número de figuras del número de piezas."
          ],
          "id": "rm01-tema1"
        },
        {
          "title": "Cambiar una igualdad",
          "paragraphs": [
            "Mover un cerillo significa retirarlo de una posición y colocarlo en otra. El número total de cerillos permanece constante. Quitar o agregar sin reubicar no es el mismo movimiento. En los dígitos de siete segmentos, cada trazo ocupa una posición reconocible; no se aceptan cifras deformadas para forzar una respuesta.",
            "Comprueba dos cosas por separado: que la igualdad final sea verdadera y que el cambio use exactamente las piezas permitidas. Una igualdad numéricamente correcta puede necesitar varios movimientos. Si el enunciado exige conservar el signo igual y la cantidad de dígitos, esos elementos no pueden convertirse en otros símbolos."
          ],
          "id": "rm01-tema2"
        }
      ],
      "examples": [
        {
          "title": "Una fila que crece",
          "question": "¿Cuántos cerillos forman los tres cuadrados de la figura?",
          "steps": [
            "Cuenta cuatro en el primer cuadrado.",
            "Cada uno de los dos cuadrados siguientes añade tres: \\(4+3+3\\).",
            "Se necesitan \\(10\\) cerillos. Contar cuatro por cada cuadrado repetiría los dos lados compartidos."
          ],
          "figure": {
            "src": "assets/razonamiento-matematico-figuras/c01-guia-cerillos.svg",
            "alt": "3 cuadrados iguales en una fila. Dos cuadrados vecinos comparten exactamente un cerillo.",
            "caption": "Fila de 3 cuadrados",
            "width": 470,
            "height": 240,
            "credit": "Esquema matemático · SIN LÍMITES"
          }
        }
      ]
    },
    {
      "title": "Monedas: contacto y conteo",
      "blocks": [
        {
          "title": "Contactos entre monedas iguales",
          "paragraphs": [
            "En estos problemas se trabaja con discos del mismo tamaño sobre un plano, salvo que se autorice apilarlos. Dos monedas tangentes se tocan sin superponerse. Al dibujar los centros, un problema visual puede convertirse en una relación entre distancias: la distancia entre centros de dos monedas tangentes es el doble del radio.",
            "Alrededor de una moneda caben seis monedas iguales tangentes a ella y sin superponerse entre sí. Dos monedas vecinas necesitan una separación angular de al menos 60° respecto del centro. La vuelta completa tiene 360°; seis separaciones de 60° completan el contorno."
          ],
          "id": "rm01-tema3"
        },
        {
          "title": "Vértices compartidos",
          "paragraphs": [
            "En un marco triangular, las monedas de los vértices pertenecen a dos lados. Si cada lado contiene cinco monedas contando sus extremos, sumar cinco tres veces cuenta dos veces cada una de las tres monedas de las esquinas. Para obtener monedas distintas se descuenta una repetición por vértice.",
            "En general, con \\(m\\) monedas por lado y una moneda en cada vértice, el marco usa \\(3m-3\\) monedas, para \\(m\\ge 2\\). Esta regla se refiere únicamente al perímetro; una figura triangular rellena se cuenta por filas, mediante \\(1+2+\\cdots+n\\)."
          ],
          "id": "rm01-tema4"
        }
      ],
      "examples": [
        {
          "title": "Un marco y sus esquinas",
          "question": "Un marco triangular tiene cuatro monedas en cada lado. ¿Cuántas monedas distintas contiene?",
          "steps": [
            "La suma por lados es \\(4+4+4=12\\).",
            "Cada moneda de vértice aparece dos veces en esa suma.",
            "Descuenta tres repeticiones: \\(12-3=9\\) monedas."
          ]
        }
      ]
    },
    {
      "title": "Dados: caras opuestas y apilamientos",
      "blocks": [
        {
          "title": "Qué permite deducir un dado",
          "paragraphs": [
            "Para los dados usuales de este capítulo se establece que las caras opuestas suman siete: 1 con 6, 2 con 5 y 3 con 4. Ver un 2 arriba determina un 5 abajo. Sin embargo, conocer solo la cara superior no fija qué valor está a la derecha: hay que conocer la orientación inicial.",
            "Las tres caras que se encuentran en un mismo vértice son adyacentes, no opuestas. Evita sumar siete entre dos caras visibles que comparten una arista. Una vista parcial permite deducir las opuestas de lo visible, pero no autoriza a inventar una rotación que no aparece en el enunciado."
          ],
          "id": "rm01-tema5"
        },
        {
          "title": "Sumas de caras horizontales ocultas",
          "paragraphs": [
            "En una pila vertical de \\(n\\) dados, las caras superior e inferior de cada dado forman una pareja opuesta. Todas las caras horizontales suman \\(7n\\), aunque no se conozcan las orientaciones particulares. Si solo está visible la cara de arriba, de valor \\(s\\), las caras horizontales ocultas suman \\(7n-s\\).",
            "En esta cuenta se incluye la cara inferior apoyada en la mesa y ambas caras de cada contacto entre dados. No se incluyen caras laterales ocultas a la vista. Es necesario nombrar qué conjunto de caras se suma; «lo que no se ve» puede cambiar según el punto desde el cual se observa."
          ],
          "id": "rm01-tema6"
        }
      ],
      "examples": [
        {
          "title": "Una pila de tres dados",
          "question": "Tres dados se apilan sobre una mesa. La única cara horizontal visible muestra 2. ¿Cuánto suman las caras horizontales ocultas?",
          "steps": [
            "Cada dado aporta \\(7\\) entre su cara superior e inferior.",
            "Las seis caras horizontales suman \\(3\\times7=21\\).",
            "Resta la cara visible: \\(21-2=19\\)."
          ]
        }
      ]
    },
    {
      "title": "Giros de dados y fichas de dominó",
      "blocks": [
        {
          "title": "Actualizar la orientación",
          "paragraphs": [
            "Al rodar un dado hacia el este, la cara que estaba al oeste pasa arriba; la superior pasa al este. Al rodarlo hacia el norte, la cara que estaba al sur pasa arriba. Registra después de cada paso las seis posiciones: arriba, abajo, norte, sur, este y oeste.",
            "La cara que entra en contacto con el suelo cambia en cada giro. No se trata de deslizar el dado ni de girarlo horizontalmente sobre su base. Una tabla de orientaciones evita perder una cara al encadenar varios movimientos. Escribe siempre el sistema de direcciones del dibujo antes de comenzar."
          ],
          "id": "rm01-tema7"
        },
        {
          "title": "Girar una ficha intercambia sus mitades",
          "paragraphs": [
            "Una ficha \\(a\\mid b\\) tiene \\(a\\) puntos arriba y \\(b\\) abajo. Al girarla 180°, la suma superior aumenta en \\(b-a\\) y la inferior disminuye en la misma cantidad. La suma de todos los puntos se conserva. En un dominó usual cada mitad puede tener de 0 a 6 puntos, incluidos ambos extremos.",
            "Para igualar dos sumas, calcula primero la diferencia. Si arriba hay \\(U\\) puntos y abajo \\(L\\), al girar una ficha el nuevo desequilibrio es \\((U-L)+2(b-a)\\). Por eso no basta con trasladar una ficha visualmente: hay que comprobar cómo cambia cada fila."
          ],
          "id": "rm01-tema8"
        }
      ],
      "examples": [
        {
          "title": "El efecto de un giro",
          "question": "La suma superior de varias fichas es 12 y la inferior es 8. ¿Qué ocurre al girar una ficha que tiene 5 arriba y 3 abajo?",
          "steps": [
            "Arriba cambia en \\(3-5=-2\\), de modo que queda \\(10\\).",
            "Abajo aumenta en \\(2\\), de modo que también queda \\(10\\).",
            "El giro equilibra las sumas y mantiene el total de veinte puntos."
          ]
        }
      ]
    },
    {
      "title": "Invariantes y mínimos",
      "blocks": [
        {
          "title": "Buscar lo que no cambia",
          "paragraphs": [
            "Un invariante es una cantidad o propiedad que permanece igual durante una operación permitida. Al mover un cerillo no cambia la cantidad de cerillos; al girar una ficha no cambia su cantidad de puntos. Identificar ese dato puede descartar una propuesta antes de probar movimientos.",
            "El dibujo es una representación de las reglas. Si se prohíbe superponer monedas, no sirve una solución que las apile. Si los discos deben mantenerse ordenados, no se puede levantar una torre completa. Anota las restricciones junto a la figura y revisa cada paso con ellas."
          ],
          "id": "rm01-tema9"
        },
        {
          "title": "Demostrar que una solución es mínima",
          "paragraphs": [
            "Encontrar una solución de siete movimientos prueba que siete bastan; todavía falta justificar que seis no bastan. Para demostrar un mínimo se combina una cota inferior con una secuencia que la alcance. En torres de discos, el disco mayor solo puede moverse cuando todos los menores han dejado de estar sobre él.",
            "Con tres postes y \\(n\\) discos, esa condición produce \\(T(n)=2T(n-1)+1\\), con \\(T(1)=1\\). Hay que trasladar los discos menores, mover el mayor y volver a trasladar los menores. En estas reglas clásicas se obtiene \\(T(n)=2^n-1\\)."
          ],
          "id": "rm01-tema10"
        }
      ],
      "examples": [
        {
          "title": "Dos discos, tres postes",
          "question": "Traslada dos discos del poste A al C, usando B, sin colocar un disco grande sobre uno pequeño.",
          "steps": [
            "Mueve el pequeño de A a B para liberar el grande.",
            "Mueve el grande de A a C y después el pequeño de B a C.",
            "Son tres movimientos. El pequeño debe moverse antes y después del grande; por eso dos no bastan."
          ]
        }
      ]
    }
  ],
  "sourceNote": "Base temática: Razonamiento Matemático, Javier Portuguez Pérez y Jimmy Paredes Barbarón, Lumbreras Editores, primera edición, 2020, capítulo 1, pp. 9–20 (páginas impresas). Desarrollo didáctico, figuras y problemas originales de SIN LÍMITES basados en los temas del capítulo."
};
