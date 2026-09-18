'use strict';
window.HISTORY_CONTENT={
  "number": 2,
  "id": "razonamiento-matematico-capitulo-02",
  "progressId": "razonamiento-matematico-capitulo-02",
  "courseId": 2,
  "courseName": "Razonamiento Matemático",
  "title": "Situaciones lógicas",
  "intro": "Organiza pesadas, repartos, deudas, rótulos y traslados. Convierte cada condición en una restricción que puedas comprobar.",
  "version": 1,
  "format": "reading",
  "math": true,
  "assessmentFormat": "practice-10",
  "sequenceTitle": "Ruta de resolución",
  "sequenceNote": "Representa los datos, aplica las restricciones y comprueba el resultado. Las figuras forman parte de los problemas; las medidas indicadas prevalecen sobre el tamaño del dibujo.",
  "goals": [
    {
      "title": "Modelar",
      "text": "Expresa equilibrios, saldos y restricciones con números o estados."
    },
    {
      "title": "Planificar",
      "text": "Elige pesadas y cruces que aprovechen toda la información disponible."
    },
    {
      "title": "Comprobar",
      "text": "Verifica que una estrategia funcione en todos los casos del enunciado."
    }
  ],
  "timeline": [
    [
      "Paso 1",
      "Pesadas y moneda diferente"
    ],
    [
      "Paso 2",
      "Masas y repartos en equilibrio"
    ],
    [
      "Paso 3",
      "Deudas y saldos"
    ],
    [
      "Paso 4",
      "Cajas con rótulos incorrectos"
    ],
    [
      "Paso 5",
      "Traslados y situaciones deportivas"
    ]
  ],
  "lessons": [
    {
      "title": "Pesadas y moneda diferente",
      "blocks": [
        {
          "title": "Una balanza ofrece tres resultados",
          "paragraphs": [
            "Una balanza de dos platillos puede inclinarse a la izquierda, inclinarse a la derecha o quedar equilibrada. Para aprovechar esa información, reparte los objetos sospechosos en tres grupos lo más parecidos posible y compara dos. El resultado permite escoger el grupo que todavía puede contener el objeto diferente.",
            "Aquí se supone que hay exactamente una moneda distinta y se sabe si es más pesada o más ligera que las demás. Si la dirección de la diferencia es desconocida, el análisis cambia: no se puede aplicar sin más la misma regla de capacidad. Tampoco se confunde una balanza comparativa con una báscula que muestra una masa numérica."
          ],
          "id": "rm02-tema1"
        },
        {
          "title": "La capacidad de varias pesadas",
          "paragraphs": [
            "Con dirección conocida, \\(k\\) pesadas permiten distinguir hasta \\(3^k\\) candidatas. Para garantizar la identificación de una entre \\(N\\), busca el menor \\(k\\) tal que \\(3^k\\ge N\\). No basta con una estrategia rápida para un caso favorable; debe funcionar también en la rama más larga.",
            "Para nueve monedas, una de ellas más pesada, compara tres con tres. Si hay equilibrio, la diferente está en las tres restantes; si no, está en el platillo más pesado. Entre esas tres, compara una con otra: el tercer resultado identifica la que quedó fuera. Dos pesadas cubren así las nueve posibilidades."
          ],
          "id": "rm02-tema2"
        }
      ],
      "examples": [
        {
          "title": "Nueve monedas, una más ligera",
          "question": "¿Cuántas pesadas bastan en el peor caso para encontrar una moneda más ligera entre nueve?",
          "steps": [
            "Divide las monedas en grupos de tres y compara dos grupos.",
            "Conserva como sospechoso el grupo del platillo ligero o, si se equilibran, el grupo no pesado.",
            "Compara dos de las tres sospechosas. Una segunda pesada decide cuál es la ligera. Una sola pesada no distingue nueve casos: \\(3<9\\)."
          ]
        }
      ]
    },
    {
      "title": "Masas y repartos en equilibrio",
      "blocks": [
        {
          "title": "Traducir los platillos a una igualdad",
          "paragraphs": [
            "Una balanza equilibrada indica igualdad de masa total, no igualdad del número de objetos. Si en un lado hay un paquete y una pesa, ambas masas se suman. Cuando se pueden usar pesas en los dos lados, una pesa junto al objeto se resta al despejar su masa.",
            "Dibuja por separado cada platillo y escribe qué contiene. Por ejemplo, si el paquete más 2 kg equilibra pesas que suman 11 kg, el paquete pesa 9 kg. No se suma otra vez la pesa que acompaña al paquete. Los recipientes deben ser iguales o haber sido tarados, como se supone en los problemas de este capítulo."
          ],
          "id": "rm02-tema3"
        },
        {
          "title": "Usar toda una cantidad conocida",
          "paragraphs": [
            "Si todo un producto de masa \\(M\\) se reparte entre dos platillos y se coloca una pesa de masa \\(d\\) junto a la porción menor, hay dos relaciones: \\(x+y=M\\) y \\(x+d=y\\). Al combinarlas, la porción mayor es \\((M+d)/2\\) y la menor es \\((M-d)/2\\).",
            "Esta estrategia permite obtener porciones sin disponer de una pesa de la masa final. Su validez exige usar toda la cantidad indicada y llegar al equilibrio. Si se deja producto fuera de la balanza, desaparece la primera relación y el resultado ya no queda determinado."
          ],
          "id": "rm02-tema4"
        }
      ],
      "examples": [
        {
          "title": "Repartir dieciocho kilogramos",
          "question": "Se reparten 18 kg de arroz entre dos platillos. Una pesa de 2 kg se coloca junto a la porción menor y la balanza se equilibra. ¿Cuánto pesa cada porción?",
          "steps": [
            "Las masas del arroz cumplen \\(x+y=18\\) y \\(x+2=y\\).",
            "Sustituye: \\(2x+2=18\\), de donde \\(x=8\\).",
            "La otra porción pesa \\(10\\) kg. Se verifica \\(8+2=10\\) y \\(8+10=18\\)."
          ]
        }
      ]
    },
    {
      "title": "Deudas y saldos",
      "blocks": [
        {
          "title": "Separar lo que se debe de lo que se cobra",
          "paragraphs": [
            "Representa cada deuda con una flecha desde el deudor hacia el acreedor y anota el importe. Una persona puede deber dinero y, al mismo tiempo, tener dinero por cobrar. Para simplificar la red importa su saldo neto: lo que debe cobrar menos lo que debe pagar.",
            "Si el saldo es positivo, al liquidar las deudas recibe dinero; si es negativo, entrega dinero. Un saldo cero indica que sus obligaciones y derechos se compensan, aunque existieran varias deudas originales. Se supone que las partes aceptan esa compensación y que no hay intereses ni otras obligaciones."
          ],
          "id": "rm02-tema5"
        },
        {
          "title": "Comprobar la conservación del total",
          "paragraphs": [
            "En una red cerrada, cada deuda se registra una vez como obligación y otra como derecho de cobro. Por eso la suma de los saldos netos es cero. Los importes positivos y los valores absolutos de los negativos tienen el mismo total. Esta igualdad sirve para detectar omisiones y signos invertidos.",
            "Simplificar no significa borrar una deuda arbitrariamente. Se propone un conjunto de pagos que produzca los mismos saldos finales para todas las personas. La cantidad mínima de transferencias depende de la red; no se deduce únicamente del número de flechas originales."
          ],
          "id": "rm02-tema6"
        }
      ],
      "examples": [
        {
          "title": "Compensación de dos deudas opuestas",
          "question": "Ana debe S/ 18 a Bruno y Bruno debe S/ 7 a Ana. ¿Qué pago único cancela ambas deudas?",
          "steps": [
            "Ana tiene saldo \\(7-18=-11\\).",
            "Bruno tiene saldo \\(18-7=11\\).",
            "Ana paga S/ 11 a Bruno. Ambos saldos quedan satisfechos y la suma neta sigue siendo cero."
          ]
        }
      ]
    },
    {
      "title": "Cajas con rótulos incorrectos",
      "blocks": [
        {
          "title": "Convertir la falsedad en información",
          "paragraphs": [
            "Que un rótulo sea incorrecto es una condición útil: descarta ese contenido para esa caja. En el caso clásico hay una caja con un solo tipo A, otra con un solo tipo B y una tercera con ambos tipos. Además, los tres rótulos están equivocados y cada contenido aparece exactamente una vez.",
            "La caja rotulada «mixta» no puede ser mixta. Sacar un objeto de ella revela, por tanto, cuál de los dos contenidos puros posee. La deducción no procede de una muestra suficiente para describir cualquier caja; procede de la condición previa que excluye la mezcla."
          ],
          "id": "rm02-tema7"
        },
        {
          "title": "Completar las otras dos cajas",
          "paragraphs": [
            "Una vez identificado el contenido puro de la caja rotulada «mixta», quedan dos contenidos para las otras dos cajas. Descarta en cada una el contenido que coincida con su propio rótulo y utiliza que ningún contenido se repite. Así se completa la asignación.",
            "Si solo se dijera que algunos rótulos son falsos, extraer un objeto no tendría la misma fuerza. Tampoco sirve muestrear una caja cualquiera y suponer que todos sus objetos son iguales. Lee los cuantificadores: todos, exactamente uno y sin repetición delimitan la inferencia."
          ],
          "id": "rm02-tema8"
        }
      ],
      "examples": [
        {
          "title": "Bolas rojas y azules",
          "question": "Tres cajas contienen solo rojas, solo azules o una mezcla, con todos sus rótulos equivocados. De la rotulada «mezcla» sale una bola azul. ¿Qué contiene la rotulada «rojas»?",
          "steps": [
            "La rotulada «mezcla» contiene solo azules: no puede contener una mezcla.",
            "Quedan solo rojas y mezcla para las otras dos. La rotulada «rojas» no puede contener solo rojas.",
            "Por tanto, la rotulada «rojas» contiene la mezcla; la rotulada «azules» contiene solo rojas."
          ]
        }
      ]
    },
    {
      "title": "Traslados y situaciones deportivas",
      "blocks": [
        {
          "title": "Contar idas, retornos y estados",
          "paragraphs": [
            "En un traslado importa quién queda en cada orilla y dónde está la barca o la linterna. Un cruce cambia ese estado. Enumera las cargas permitidas, respeta la capacidad y cuenta también los retornos necesarios para seguir transportando personas. No se presume que la barca pueda volver sola.",
            "En problemas de puente, si dos personas cruzan juntas tardan lo que demora la más lenta, cuando así lo indica el enunciado. Conviene comparar estrategias: hacer regresar siempre a la más rápida no siempre da el menor total. Una solución mínima se apoya en una cota o en revisar todas las transiciones permitidas."
          ],
          "id": "rm02-tema9"
        },
        {
          "title": "Reconstruir tablas de partidos",
          "paragraphs": [
            "Si cada equipo juega una sola vez contra cada uno de los demás, hay \\(n(n-1)/2\\) partidos: se cuentan parejas, sin repetir el encuentro en orden inverso. En la tabla de un equipo se cumple \\(PJ=PG+PE+PP\\). Con la regla de 3 puntos por victoria, 1 por empate y 0 por derrota, los puntos son \\(3PG+PE\\).",
            "La puntuación es una condición del problema. No se debe cambiarla por otra regla deportiva. Para toda una competición, el número total de victorias coincide con el de derrotas y la suma de goles a favor coincide con la de goles en contra. Los empates aparecen en el registro de ambos participantes."
          ],
          "id": "rm02-tema10"
        }
      ],
      "examples": [
        {
          "title": "Dos pequeños y un adulto",
          "question": "Dos personas pesan 40 kg cada una y otra pesa 75 kg. Una barca admite 80 kg; todas saben remar. ¿Cómo pasan las tres?",
          "steps": [
            "Cruzan las dos de 40 kg y una vuelve. Van 2 cruces.",
            "Cruza sola la de 75 kg y regresa la otra de 40 kg que quedó al otro lado. Van 4 cruces.",
            "Cruzan juntas las dos de 40 kg. Total: 5 cruces. La persona de 75 kg no puede compartir la barca con ninguna otra."
          ]
        }
      ]
    }
  ],
  "sourceNote": "Base temática: Razonamiento Matemático, Javier Portuguez Pérez y Jimmy Paredes Barbarón, Lumbreras Editores, primera edición, 2020, capítulo 2, pp. 21–30 (páginas impresas). Desarrollo didáctico, figuras y problemas originales de SIN LÍMITES basados en los temas del capítulo."
};
