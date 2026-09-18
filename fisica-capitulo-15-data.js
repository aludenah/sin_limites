'use strict';
window.HISTORY_CONTENT={
  "number": 15,
  "id": "fisica-capitulo-15",
  "progressId": "fisica-capitulo-15",
  "courseId": 16,
  "courseName": "Física",
  "title": "Electrodinámica",
  "intro": "Capítulo 15 del PDF. Comprende cómo circula la carga, interpreta gráficas y resuelve circuitos de corriente continua con resistores, fuentes e instrumentos ideales.",
  "version": 1,
  "format": "reading",
  "assessmentFormat": "practice-10",
  "math": true,
  "sequenceTitle": "Ruta para resolver circuitos",
  "sequenceNote": "Identifica los nodos y las polaridades; simplifica cuando sea posible; aplica conservación de carga y energía; comprueba unidades, sentidos y potencias.",
  "goals": [
    {
      "title": "Relacionar",
      "text": "Calcula carga, intensidad y resistencia, con unidades y gráficas correctamente interpretadas."
    },
    {
      "title": "Resolver",
      "text": "Distingue serie, paralelo, puentes conductores y circuitos con varias fuentes."
    },
    {
      "title": "Comprobar",
      "text": "Explica las lecturas de instrumentos y verifica el balance de corriente y energía."
    }
  ],
  "timeline": [
    [
      "Paso 1",
      "Corriente eléctrica y carga transportada"
    ],
    [
      "Paso 2",
      "Resistencia, resistividad y ley de Ohm"
    ],
    [
      "Paso 3",
      "Resistores en serie, paralelo y redes mixtas"
    ],
    [
      "Paso 4",
      "Instrumentos ideales y leyes de Kirchhoff"
    ],
    [
      "Paso 5",
      "Potencia, energía y aplicaciones"
    ]
  ],
  "lessons": [
    {
      "title": "Corriente eléctrica y carga transportada",
      "blocks": [
        {
          "title": "Movimiento de carga y sentido convencional",
          "paragraphs": [
            "La corriente eléctrica es el transporte neto de carga a través de una sección. En un metal, los portadores móviles son electrones; en otros medios también pueden intervenir iones. El movimiento térmico desordenado no produce por sí solo una corriente neta. Un campo eléctrico establece una deriva de los portadores.",
            "El sentido convencional corresponde al movimiento de cargas positivas. En un tramo metálico resistivo, la corriente convencional va del mayor al menor potencial y la deriva de electrones tiene el sentido contrario. Esta afirmación sobre el tramo resistivo no se extiende sin más al interior de una fuente: allí otros procesos pueden llevar carga hacia un potencial mayor. La corriente no se «gasta» al pasar por un resistor; se transforma energía eléctrica."
          ],
          "id": "fis15-tema-01"
        },
        {
          "title": "Intensidad, electrones y gráficas",
          "paragraphs": [
            "Para corriente constante, \\(I=|Q|/\\Delta t\\). La unidad es el amperio: \\(1\\,\\mathrm A=1\\,\\mathrm C/\\mathrm s\\). Si se busca cuántos electrones atraviesan una sección, \\(N=|Q|/e\\), con \\(e=1{,}6\\times10^{-19}\\,\\mathrm C\\) en nuestros ejercicios. Convierte minutos a segundos y miliamperios a amperios antes de sustituir.",
            "En una gráfica corriente–tiempo, la carga se obtiene del área entre la curva y el eje temporal. Para tramos constantes o lineales basta usar rectángulos, triángulos o trapecios. Las unidades del área son \\(\\mathrm A\\cdot\\mathrm s=\\mathrm C\\). Si la corriente cambia de sentido, las áreas con signo dan la carga neta; no son automáticamente la suma de todas las cargas que cruzan en ambos sentidos."
          ],
          "takeaway": "Carga e intensidad son distintas: Q mide cuánto se transporta; I, a qué ritmo.",
          "id": "fis15-tema-02"
        }
      ],
      "examples": [
        {
          "title": "De la carga a la intensidad",
          "question": "Por una sección de un conductor pasan 2,4 C en 20 s, con corriente constante. Calcula su intensidad y describe el sentido del flujo de electrones en el tramo dibujado.",
          "steps": [
            "Usa \\(I=|Q|/\\Delta t\\); los datos ya están en coulomb y segundo.",
            "\\(I=2{,}4/20=0{,}12\\,\\mathrm A=120\\,\\mathrm{mA}\\).",
            "Como Va es mayor que Vb, la corriente convencional apunta hacia la derecha y los electrones derivan hacia la izquierda. El número 0,12 A representa la intensidad, no la rapidez de cada electrón."
          ],
          "figure": {
            "src": "assets/fisica-capitulo-15/guia-sentido-corriente.svg",
            "alt": "Tramo de conductor metálico con potencial Va mayor que Vb. La corriente convencional apunta de izquierda a derecha y la deriva de electrones de derecha a izquierda.",
            "caption": "Corriente y movimiento de electrones",
            "width": 800,
            "height": 430,
            "credit": "Diagrama físico · SIN LÍMITES"
          }
        },
        {
          "title": "Carga sin cálculo diferencial",
          "question": "Durante 4 s la corriente se mantiene en 3 A. Luego disminuye linealmente a cero durante 2 s. ¿Qué carga atraviesa la sección en esos 6 s?",
          "steps": [
            "El primer tramo es un rectángulo: \\(Q_1=(3\\,\\mathrm A)(4\\,\\mathrm s)=12\\,\\mathrm C\\).",
            "El segundo es un triángulo: \\(Q_2=(2\\,\\mathrm s)(3\\,\\mathrm A)/2=3\\,\\mathrm C\\).",
            "La corriente no cambia de sentido; se suman las áreas: \\(Q=12+3=15\\,\\mathrm C\\)."
          ]
        }
      ]
    },
    {
      "title": "Resistencia, resistividad y ley de Ohm",
      "blocks": [
        {
          "title": "La geometría del conductor importa",
          "paragraphs": [
            "Para un conductor homogéneo de sección uniforme, \\(R=\\rho L/A\\). Aquí R es resistencia en ohmios, ρ es resistividad en \\(\\Omega\\cdot\\mathrm m\\), L es longitud y A es área transversal. A igual material y temperatura, aumentar la longitud aumenta R; aumentar la sección la reduce. No se confunde la resistividad del material con la resistencia del objeto.",
            "Una sección de \\(1\\,\\mathrm{mm}^2\\) equivale a \\(10^{-6}\\,\\mathrm m^2\\). Si un alambre se estira uniformemente y conserva su volumen, \\(LA=L^{\\prime} A^{\\prime}\\). Al duplicar L, la sección se reduce a la mitad. Si ρ permanece constante, la resistencia se multiplica por cuatro: cambian simultáneamente el numerador y el denominador."
          ],
          "id": "fis15-tema-03"
        },
        {
          "title": "Relación entre voltaje y corriente",
          "paragraphs": [
            "Un resistor óhmico, bajo condiciones físicas constantes, cumple \\(V=IR\\). Si R permanece fija, duplicar V duplica I. Si se mantiene V pero se aumenta R, I disminuye. Un filamento que se calienta puede cambiar su resistencia; no se supone un único R para cualquier temperatura.",
            "En una gráfica de V en el eje vertical frente a I en el horizontal, una recta que pasa por el origen tiene pendiente \\(\\Delta V/\\Delta I=R\\). Si se invierten los ejes, la pendiente es \\(1/R\\). Lee primero los nombres de los ejes y sus unidades. En los problemas se indicará cuándo el resistor sigue siendo óhmico al considerar otro voltaje."
          ],
          "takeaway": "R = ρL/A describe material y geometría; V = IR relaciona las magnitudes eléctricas.",
          "id": "fis15-tema-04"
        }
      ],
      "examples": [
        {
          "title": "Resistencia de un alambre",
          "question": "Calcula R para el conductor de la figura, a temperatura constante.",
          "steps": [
            "Convierte la sección: \\(A=2\\,\\mathrm{mm}^2=2\\times10^{-6}\\,\\mathrm m^2\\).",
            "Aplica \\(R=\\rho L/A=(1{,}6\\times10^{-8})(10)/(2\\times10^{-6})\\).",
            "Resulta \\(R=0{,}08\\,\\Omega\\). La unidad también se verifica: \\((\\Omega\\cdot\\mathrm m)\\mathrm m/\\mathrm m^2=\\Omega\\)."
          ],
          "figure": {
            "src": "assets/fisica-capitulo-15/guia-resistividad.svg",
            "alt": "Conductor uniforme de longitud 10 m y área transversal 2 milímetros cuadrados. La resistividad es 1,6 por 10 elevado a menos 8 ohmios metro. El dibujo no está a escala.",
            "caption": "Longitud, sección y resistividad",
            "width": 800,
            "height": 350,
            "credit": "Diagrama físico · SIN LÍMITES"
          }
        },
        {
          "title": "Cambiar la resistencia a voltaje constante",
          "question": "Con una fuente ideal de 12 V, un resistor conduce 2 A. Se lo reemplaza por otro de 18 Ω. ¿Cuál es la nueva corriente?",
          "steps": [
            "El resistor inicial era de \\(R_1=12/2=6\\,\\Omega\\).",
            "La nueva resistencia triplica la inicial y la fuente conserva el voltaje.",
            "La nueva corriente es \\(I_2=12/18=2/3\\,\\mathrm A\\). Se redujo a la tercera parte."
          ]
        }
      ]
    },
    {
      "title": "Resistores en serie, paralelo y redes mixtas",
      "blocks": [
        {
          "title": "Reconocer la conexión por los nodos",
          "paragraphs": [
            "Dos resistores están en serie cuando comparten una conexión sin derivación que obligue a repartir la corriente. Ambos conducen la misma I y sus caídas de tensión se suman: \\(R_{\\mathrm{eq}}=R_1+R_2+\\cdots\\). No basta que aparezcan uno al lado del otro en el dibujo. Debe existir la misma trayectoria de corriente.",
            "En paralelo, los terminales de cada resistor se conectan a los mismos dos nodos. Comparten V y las corrientes se suman: \\(1/R_{\\mathrm{eq}}=1/R_1+1/R_2+\\cdots\\). Para dos resistores, \\(R_{\\mathrm{eq}}=R_1R_2/(R_1+R_2)\\). El equivalente paralelo es menor que cualquiera de sus resistencias positivas. La rama de menor resistencia conduce mayor corriente bajo el mismo voltaje."
          ],
          "id": "fis15-tema-05"
        },
        {
          "title": "Reducir y después reconstruir",
          "paragraphs": [
            "En una red mixta, identifica primero los grupos que sean realmente serie o paralelo y redibuja cada reducción. Con el equivalente total calcula la corriente de la fuente. Después regresa al circuito original: halla el voltaje de cada grupo y, finalmente, las corrientes de sus ramas. Usar la corriente total en un resistor de una sola rama suele dar una respuesta incorrecta.",
            "Un cable ideal conecta puntos del mismo potencial. Si une directamente los dos terminales de un resistor de resistencia finita positiva, ese resistor queda cortocircuitado: tiene V = 0 e I = 0. En una rama abierta no circula corriente estacionaria. Al simplificar conserva los nodos y verifica si una línea cruza otra o está realmente unida; las figuras marcan las uniones con puntos."
          ],
          "id": "fis15-tema-06"
        }
      ],
      "examples": [
        {
          "title": "Red mixta paso a paso",
          "question": "En la figura, determina la corriente de la fuente y la corriente en el resistor de 6 Ω.",
          "steps": [
            "Entre A y B: \\(R_{AB}=12\\times6/(12+6)=4\\,\\Omega\\).",
            "El equivalente total es \\(4+4=8\\,\\Omega\\); la fuente conduce \\(I=24/8=3\\,\\mathrm A\\).",
            "El paralelo tiene \\(V_{AB}=3\\times4=12\\,\\mathrm V\\). Por el resistor de 6 Ω pasan \\(12/6=2\\,\\mathrm A\\).",
            "Por el de 12 Ω pasa 1 A. Se comprueba el reparto: \\(1+2=3\\,\\mathrm A\\)."
          ],
          "figure": {
            "src": "assets/fisica-capitulo-15/guia-asociacion-mixta.svg",
            "alt": "Fuente ideal de 24 V, positiva arriba. Un resistor de 4 ohmios conecta la fuente al nodo A. Entre A y B hay dos ramas en paralelo, de 12 y 6 ohmios. B vuelve al terminal negativo. I1 e I2 se indican de A hacia B.",
            "caption": "Un resistor en serie con dos ramas en paralelo",
            "width": 800,
            "height": 400,
            "credit": "Diagrama físico · SIN LÍMITES"
          }
        },
        {
          "title": "Un resistor puenteado",
          "question": "Un resistor de 8 Ω tiene sus dos terminales unidos por un cable ideal. Este conjunto está en serie con resistores de 4 Ω y 2 Ω, alimentados por 12 V. ¿Qué corriente pasa por el de 8 Ω y por la fuente?",
          "steps": [
            "El cable une puntos equipotenciales: en el resistor de 8 Ω, \\(V=0\\).",
            "Por ese resistor pasa \\(I_8=0/8=0\\). El cable sí puede transportar corriente.",
            "El equivalente que ve la fuente es \\(4+2=6\\,\\Omega\\), de modo que \\(I_{\\mathrm{fuente}}=12/6=2\\,\\mathrm A\\)."
          ]
        }
      ]
    },
    {
      "title": "Instrumentos ideales y leyes de Kirchhoff",
      "blocks": [
        {
          "title": "Amperímetro y voltímetro",
          "paragraphs": [
            "El amperímetro mide la corriente del tramo donde se conecta en serie. En el modelo ideal tiene resistencia cero y no añade una caída de potencial. El voltímetro mide la diferencia de potencial entre dos puntos y se conecta en paralelo con el elemento o grupo que se quiere medir. En el modelo ideal tiene resistencia infinita y por su rama no circula corriente.",
            "Al analizar una figura, reemplaza mentalmente el amperímetro ideal por un cable y el voltímetro ideal por una rama abierta, conservando los puntos donde están conectados. Una lectura de voltaje no indica por sí sola la corriente del circuito. Los instrumentos reales modifican ligeramente el circuito; aquí trabajaremos con el modelo ideal, indicado en cada enunciado."
          ],
          "id": "fis15-tema-07"
        },
        {
          "title": "Nodos: conservación de la carga",
          "paragraphs": [
            "Un nodo reúne puntos conectados entre sí por conductores ideales y, por tanto, equipotenciales. En régimen estacionario no se acumula carga en el nodo: \\(\\sum I_{\\mathrm{entran}}=\\sum I_{\\mathrm{salen}}\\). Elige sentidos de referencia, escribe la igualdad con esos sentidos y conserva los signos.",
            "Para calcular con potenciales, fija un nodo de referencia en 0 V. Si una rama resistiva une un punto de potencial \\(V_A\\) con otro de potencial \\(V_B\\), su corriente de A a B es \\((V_A-V_B)/R\\). Una fuente ideal conectada al nodo de referencia fija el potencial de su otro terminal según su polaridad. Si una corriente resulta negativa, su sentido real es contrario al elegido."
          ],
          "id": "fis15-tema-08"
        },
        {
          "title": "Recorridos cerrados: conservación de la energía",
          "paragraphs": [
            "En los circuitos de corriente continua de este capítulo, la suma algebraica de variaciones de potencial en un recorrido cerrado es cero. Al atravesar un resistor en el sentido de la corriente de referencia, escribe \\(-IR\\); en sentido contrario, \\(+IR\\). Al atravesar una fuente ideal de − a +, escribe \\(+\\varepsilon\\); de + a −, escribe \\(-\\varepsilon\\).",
            "Las fuentes no siempre se suman: depende de las polaridades y del sentido de recorrido. Una fuente también puede absorber energía si la corriente entra por su terminal positivo. Resuelve las ecuaciones de nodos y de recorridos conjuntamente cuando la red no pueda reducirse solo por serie y paralelo. Comprueba después cada signo con el sentido real de la corriente."
          ],
          "takeaway": "Los signos se eligen antes de calcular y se interpretan después; una corriente negativa es información física.",
          "id": "fis15-tema-09"
        }
      ],
      "examples": [
        {
          "title": "Dos fuentes que se oponen",
          "question": "Halla la corriente horaria de referencia y el voltaje en el resistor de 3 Ω del circuito.",
          "steps": [
            "En el recorrido horario, la fuente izquierda aporta +14 V y la derecha −4 V. Las caídas resistivas son \\(-2I\\) y \\(-3I\\).",
            "La ecuación es \\(14-2I-4-3I=0\\). Así, \\(I=(14-4)/(2+3)=2\\,\\mathrm A\\).",
            "El resultado es positivo: el sentido real es horario. En el resistor de 3 Ω, \\(V_3=2\\times3=6\\,\\mathrm V\\).",
            "Un voltímetro ideal conectado entre los extremos de ese resistor indicaría 6 V en magnitud."
          ],
          "figure": {
            "src": "assets/fisica-capitulo-15/guia-fuentes-opuestas.svg",
            "alt": "Malla rectangular con una fuente de 14 V a la izquierda y otra de 4 V a la derecha. Ambas tienen positivo arriba y negativo abajo. El resistor superior vale 2 ohmios y el inferior 3 ohmios. Se elige una corriente de referencia horaria.",
            "caption": "Dos fuentes con polaridades explícitas",
            "width": 850,
            "height": 400,
            "credit": "Diagrama físico · SIN LÍMITES"
          }
        },
        {
          "title": "Un nodo conectado a dos fuentes",
          "question": "Con B a 0 V, calcula el potencial de A y la corriente de referencia I de la rama central.",
          "steps": [
            "Los terminales superiores de las fuentes están a 16 V y 8 V. La rama izquierda aporta a A \\((16-V_A)/2\\); por la central salen \\((V_A-8)/2\\) y por la derecha \\(V_A/4\\).",
            "Kirchhoff en A: \\((16-V_A)/2=(V_A-8)/2+V_A/4\\). Al multiplicar por 4: \\(32-2V_A=2V_A-16+V_A\\).",
            "De \\(48=5V_A\\) se obtiene \\(V_A=9{,}6\\,\\mathrm V\\). La corriente central es \\(I=(9{,}6-8)/2=0{,}8\\,\\mathrm A\\), hacia B.",
            "Comprueba: entran \\(3{,}2\\,\\mathrm A\\) y salen \\(0{,}8+2{,}4=3{,}2\\,\\mathrm A\\). La fuente de 8 V recibe corriente por su terminal positivo y absorbe energía."
          ],
          "figure": {
            "src": "assets/fisica-capitulo-15/guia-nodos.svg",
            "alt": "Dos nodos comunes A arriba y B abajo. Rama izquierda: resistor de 2 ohmios y fuente de 16 V, positiva arriba. Rama central: resistor de 2 ohmios y fuente de 8 V, positiva arriba. Rama derecha: resistor de 4 ohmios. B tiene potencial de referencia 0 V. La corriente I de referencia desciende por la rama central.",
            "caption": "Tres ramas entre los mismos dos nodos",
            "width": 850,
            "height": 440,
            "credit": "Diagrama físico · SIN LÍMITES"
          }
        }
      ]
    },
    {
      "title": "Potencia, energía y aplicaciones",
      "blocks": [
        {
          "title": "Potencia de elementos y fuentes",
          "paragraphs": [
            "La potencia mide la rapidez con que se transforma energía: \\(P=E/\\Delta t\\), y para un elemento con voltaje y corriente constantes se usa \\(P=VI\\). En un resistor óhmico, \\(P=I^2R=V^2/R\\). Sus unidades son watt: \\(1\\,\\mathrm W=1\\,\\mathrm J/\\mathrm s=1\\,\\mathrm V\\cdot\\mathrm A\\).",
            "La forma conveniente depende de qué se conoce y de qué se mantiene constante. A voltaje fijo, aumentar R reduce \\(P=V^2/R\\); a corriente fija, aumentar R incrementa \\(P=I^2R\\). Para las fuentes se distingue potencia entregada de absorbida mediante el sentido de la corriente. En una red ideal, la potencia total entregada coincide con la absorbida por resistores y por otras fuentes."
          ],
          "id": "fis15-tema-10"
        },
        {
          "title": "Energía consumida y funcionamiento nominal",
          "paragraphs": [
            "Con potencia constante, \\(E=P\\Delta t\\). Para expresar E en joule usa watt y segundo. Para expresarla en kilowatt-hora usa kilowatt y hora: \\(1\\,\\mathrm{kWh}=3{,}6\\times10^6\\,\\mathrm J\\). El kWh es una unidad de energía. Para un costo de energía se multiplica el consumo en kWh por la tarifa indicada en el problema, sin añadir cargos que no se hayan dado.",
            "Una lámpara rotulada con voltaje y potencia nominales requiere \\(I_n=P_n/V_n\\) en ese punto de funcionamiento. Si una fuente ideal tiene mayor voltaje, un resistor en serie puede absorber la diferencia de potencial: \\(R=(V_{\\mathrm{fuente}}-V_n)/I_n\\). Luego calcula también la potencia del resistor; no corresponde aplicar todo el voltaje de la fuente a la lámpara."
          ],
          "takeaway": "Antes de sustituir, identifica el elemento al que pertenece cada V, I y P.",
          "id": "fis15-tema-11"
        }
      ],
      "examples": [
        {
          "title": "Una lámpara en su punto nominal",
          "question": "La lámpara de 9 V y 0,9 W se conecta a una fuente ideal de 15 V mediante R. Halla R y la potencia que disipa.",
          "steps": [
            "En el punto nominal, \\(I_n=0{,}9/9=0{,}1\\,\\mathrm A\\). Esa misma corriente pasa por R.",
            "El resistor debe tener una caída \\(V_R=15-9=6\\,\\mathrm V\\). Por tanto, \\(R=6/0{,}1=60\\,\\Omega\\).",
            "Su potencia es \\(P_R=V_RI=6(0{,}1)=0{,}6\\,\\mathrm W\\).",
            "Comprueba la energía por segundo: la fuente entrega \\(15(0{,}1)=1{,}5\\,\\mathrm W\\), iguales a \\(0{,}9+0{,}6\\,\\mathrm W\\)."
          ],
          "figure": {
            "src": "assets/fisica-capitulo-15/guia-lampara.svg",
            "alt": "Fuente ideal de 15 V, positiva arriba, conectada en serie con un resistor R desconocido y una lámpara rotulada 9 V y 0,9 W.",
            "caption": "Resistor limitador y lámpara en serie",
            "width": 800,
            "height": 390,
            "credit": "Diagrama físico · SIN LÍMITES"
          }
        },
        {
          "title": "La misma energía en dos unidades",
          "question": "Un dispositivo de 300 W funciona a potencia constante durante 10 min. Calcula la energía en joule y en kWh.",
          "steps": [
            "En segundos: \\(10\\,\\mathrm{min}=600\\,\\mathrm s\\). Entonces \\(E=300(600)=180\\,000\\,\\mathrm J\\).",
            "En kW y horas: \\(P=0{,}3\\,\\mathrm{kW}\\) y \\(t=1/6\\,\\mathrm h\\). Resulta \\(E=0{,}3/6=0{,}05\\,\\mathrm{kWh}\\).",
            "Verifica la equivalencia: \\(0{,}05(3{,}6\\times10^6)=180\\,000\\,\\mathrm J\\)."
          ]
        }
      ]
    }
  ],
  "sourceNote": "Base temática: Física, Peter Flores Escobal y José Luis Mateo Torres, Lumbreras Editores, primera edición, febrero de 2021, capítulo XV: Electrodinámica, pp. 217–236 (páginas impresas). Desarrollo didáctico con ejemplos, problemas y diagramas originales de SIN LÍMITES. Se emplean modelos ideales de corriente continua en régimen estacionario, según las condiciones de cada enunciado."
};
