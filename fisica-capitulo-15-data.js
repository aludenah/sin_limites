'use strict';
window.HISTORY_CONTENT={
  "number": 15,
  "id": "fisica-capitulo-15",
  "progressId": "fisica-capitulo-15",
  "courseId": 16,
  "courseName": "Física",
  "title": "Electrodinámica",
  "intro": "Corriente eléctrica, resistencia, ley de Ohm, circuitos, reglas de Kirchhoff y potencia eléctrica. Teoría y aplicaciones resueltas del capítulo XV.",
  "version": 3,
  "format": "reading",
  "assessmentFormat": "practice-10",
  "math": true,
  "sequenceTitle": "Contenido del capítulo",
  "sequenceNote": "La numeración de los temas y de las aplicaciones corresponde al PDF.",
  "goals": [
    {
      "title": "Corriente eléctrica",
      "text": "Entender qué es la corriente eléctrica."
    },
    {
      "title": "Portadores de carga",
      "text": "Analizar los fenómenos relacionados con los portadores de carga eléctrica en movimiento."
    }
  ],
  "timeline": [
    [
      "1",
      "Corriente eléctrica"
    ],
    [
      "2",
      "Resistencia eléctrica"
    ],
    [
      "3",
      "Ley de Ohm y conexión de resistores"
    ],
    [
      "4",
      "Circuitos eléctricos, instrumentos de medición y reglas de Kirchhoff"
    ],
    [
      "4.3",
      "Potencia eléctrica"
    ]
  ],
  "lessons": [
    {
      "title": "Corriente eléctrica",
      "blocks": [
        {
          "id": "fis15-corriente",
          "title": "1. Corriente eléctrica",
          "paragraphs": [
            "Es un fenómeno que se da a nivel microscópico y se puede manifestar en los sólidos, líquidos y gases bajo la influencia de ciertos factores entre los cuales no puede faltar una diferencia de potencial eléctrico, la cual se puede establecer mediante una batería, pila o alternador."
          ],
          "figures": []
        },
        {
          "id": "fis15-movimiento",
          "title": "1.1. ¿Qué es la corriente eléctrica?",
          "paragraphs": [
            "Es el movimiento orientado de portadores de carga eléctrica dentro de un cuerpo por influencia de un campo eléctrico externo.",
            "Veamos el caso de la conexión de un foco a una batería mediante un alambre de cobre.",
            "Cuando el interruptor está abierto, en el interior del conductor de cobre, que es un cuerpo metálico, los electrones libres se mueven en diversas direcciones como se esquematiza a continuación.",
            "Al cerrar el interruptor, el foco se enciende y en el interior del conductor se establece un campo eléctrico debido a la diferencia de potencial eléctrico establecido por la batería. El campo eléctrico arrastra a los electrones libres originando una tendencia a desplazarse en una misma dirección como se indica.",
            "Como en el interior del conductor se establece un movimiento orientado de portadores de carga, decimos que se ha establecido una corriente eléctrica."
          ],
          "figures": [
            {
              "src": "assets/fisica-capitulo-15/lineales/corriente-interruptor-abierto.svg",
              "width": 860,
              "height": 395,
              "caption": "Interruptor abierto: movimiento desordenado de los electrones · p. 217",
              "alt": "Circuito de batería y foco apagado. La ampliación del conductor muestra electrones con movimiento desordenado en varias direcciones.",
              "credit": "Redibujo lineal · SIN LÍMITES · Fuente: Física, Lumbreras Editores (2021)",
              "original": false,
              "afterParagraph": 2,
              "redrawn": true
            },
            {
              "src": "assets/fisica-capitulo-15/lineales/corriente-interruptor-cerrado.svg",
              "width": 860,
              "height": 395,
              "caption": "Interruptor cerrado: movimiento orientado · p. 217",
              "alt": "Batería y foco encendido. El conductor muestra el campo eléctrico E y el movimiento orientado de los portadores de carga.",
              "credit": "Redibujo lineal · SIN LÍMITES · Fuente: Física, Lumbreras Editores (2021)",
              "original": false,
              "afterParagraph": 3,
              "redrawn": true
            }
          ]
        },
        {
          "id": "fis15-intensidad",
          "title": "1.2. ¿Cómo medimos la corriente eléctrica?",
          "paragraphs": [
            "Primero debemos tener presente que un foco, un televisor o un motor eléctrico necesitan de la corriente eléctrica para funcionar; sin embargo, cada uno de ellos requiere una cantidad diferente de corriente, por ello, es necesario medir la corriente eléctrica.",
            "Para medir la corriente eléctrica empleamos una magnitud escalar denominada intensidad de corriente eléctrica \\(I\\), la cual nos expresa la rapidez con que fluye la carga eléctrica a través de la sección recta de un conductor.",
            "Si la corriente eléctrica es continua, se evalúa de la siguiente forma:",
            "\\[I=\\dfrac{|Q|}{\\Delta t}\\]",
            "Su unidad: amperio (A).",
            "Donde \\(|Q|\\): valor de la cantidad de carga neta (C); \\(\\Delta t\\): intervalo de tiempo (s).",
            "\\[1\\text{ amperio}=1\\,\\mathrm A=\\dfrac{1\\text{ coulomb}}{1\\text{ segundo}}\\]"
          ],
          "figures": []
        },
        {
          "id": "fis15-sentido",
          "title": "1.3. Sentido de la corriente eléctrica",
          "paragraphs": [
            "Cuando se descubre el fenómeno de la corriente eléctrica, los hombres de ciencia consideraron que esta se debe al movimiento orientado de portadores de carga positiva y que fluye de la zona de mayor potencial eléctrico a la de menor potencial. Más adelante descubrieron que en los conductores la corriente eléctrica es en realidad un flujo de electrones libres, entonces acordaron (convención) mantener el sentido de la corriente, es decir, que es un movimiento de portadores de cargas positivas.",
            "A la corriente eléctrica que se considera constituida por portadores de cargas positivas, se le denomina corriente convencional.",
            "Vamos a trabajar en adelante con la corriente convencional, es decir, la corriente que fluye de la zona de mayor potencial eléctrico a la de menor potencial eléctrico."
          ],
          "figures": [
            {
              "src": "assets/fisica-capitulo-15/lineales/sentido-corriente.svg",
              "width": 890,
              "height": 335,
              "caption": "Corriente convencional y corriente de electrones · p. 218",
              "alt": "Conductor con menor potencial a la izquierda y mayor potencial a la derecha. La corriente convencional va a la izquierda y los electrones a la derecha.",
              "credit": "Redibujo lineal · SIN LÍMITES · Fuente: Física, Lumbreras Editores (2021)",
              "original": false,
              "afterParagraph": 0,
              "redrawn": true
            }
          ]
        },
        {
          "id": "fis15-grafica",
          "title": "Nota: intensidad de corriente versus tiempo",
          "paragraphs": [
            "Se puede representar gráficamente la intensidad de corriente eléctrica versus el tiempo.",
            "\\[A=|Q|\\]"
          ],
          "figures": [
            {
              "src": "assets/fisica-capitulo-15/lineales/area-corriente-tiempo.svg",
              "width": 750,
              "height": 350,
              "caption": "Área en la gráfica de intensidad frente al tiempo · p. 218",
              "alt": "Gráfica I frente a t con el área A entre t1 y t2. El recuadro indica A igual al valor absoluto de Q.",
              "credit": "Redibujo lineal · SIN LÍMITES · Fuente: Física, Lumbreras Editores (2021)",
              "original": false,
              "afterParagraph": 0,
              "redrawn": true
            }
          ]
        }
      ],
      "examples": [
        {
          "number": 1,
          "title": "Número de electrones",
          "question": "A veces cuando tocamos un televisor, un microondas o la radio, sentimos ciertas descargas eléctricas, ello se debe a que el artefacto y la tierra se conecta por nuestro cuerpo como si fuera un cable conductor. Si esta descarga produce una intensidad de corriente de 8 mA, calcule el número de electrones que circulan en 2 s.",
          "steps": [
            "La intensidad de corriente eléctrica se evalúa de la siguiente forma: \\[I=\\dfrac{|Q|}{\\Delta t}\\]",
            "Además, para calcular la cantidad de carga eléctrica, usamos \\(|Q|=|nq_{e^-}|\\).",
            "Entonces \\[I=\\dfrac{|nq_{e^-}|}{\\Delta t}\\] \\[8\\times10^{-3}=\\dfrac{n(1{,}6\\times10^{-19})}{2}\\]",
            "\\[n=10^{17}\\text{ electrones}\\]"
          ],
          "solutionFigures": []
        },
        {
          "number": 2,
          "title": "Lectura de la gráfica I–t",
          "question": "Un amperímetro es un dispositivo que se usa para calcular la intensidad de corriente eléctrica que circula a través de un conductor. Si con las lecturas que marcó el amperímetro en el tiempo se construye la siguiente gráfica, calcule la cantidad de electrones que fluyen entre \\(t=0{,}1\\,\\mathrm s\\) y \\(t=1{,}4\\,\\mathrm s\\).",
          "steps": [
            "Según la gráfica:",
            "En la gráfica \\(I\\) vs. \\(t\\) se tiene que \\(A=|Q|\\), por lo tanto \\(A_1+A_2=|nq_{e^-}|\\).",
            "\\[\\left(\\dfrac{0{,}7+0{,}9}{2}\\right)(0{,}1)+(0{,}9)(1{,}2)=n(1{,}6\\times10^{-19})\\]",
            "\\[n=725\\times10^{16}\\text{ electrones}\\]"
          ],
          "solutionFigures": [
            {
              "src": "assets/fisica-capitulo-15/lineales/aplicacion-02-areas.svg",
              "width": 850,
              "height": 410,
              "caption": "Aplicación 2: áreas entre 0,1 s y 1,4 s · p. 219",
              "alt": "Gráfica con el trapecio A1 entre 0,1 y 0,2 s y el rectángulo A2 entre 0,2 y 1,4 s. En 0,1 s la intensidad es 0,7 A.",
              "credit": "Redibujo lineal · SIN LÍMITES · Fuente: Física, Lumbreras Editores (2021)",
              "original": false,
              "afterStep": 0,
              "redrawn": true
            }
          ],
          "figure": {
            "src": "assets/fisica-capitulo-15/lineales/aplicacion-02-grafica.svg",
            "width": 850,
            "height": 410,
            "caption": "Aplicación 2: intensidad de corriente en función del tiempo · p. 219",
            "alt": "La corriente aumenta linealmente de 0,5 A en 0 s a 0,9 A en 0,2 s; luego permanece en 0,9 A hasta 1,4 s.",
            "credit": "Redibujo lineal · SIN LÍMITES · Fuente: Física, Lumbreras Editores (2021)",
            "original": false,
            "redrawn": true
          }
        }
      ]
    },
    {
      "title": "Resistencia eléctrica y ley de Ohm",
      "blocks": [
        {
          "id": "fis15-resistencia",
          "title": "2. Resistencia eléctrica",
          "paragraphs": [
            "Nos expresa el grado de oposición que ofrece todo cuerpo a que se establezca en ellos la corriente eléctrica.",
            "Cuando en un conductor se origina la corriente eléctrica, los portadores de carga no se mueven en trayectorias continuas o suaves, las trayectorias son desviadas por la presencia de impurezas o vacíos, es decir, los portadores de carga encuentran oposición durante su movimiento; esta es una característica fundamental para cada material y se le denomina resistividad eléctrica \\(\\rho\\).",
            "Fue Poulliet, físico francés, quien planteó el cálculo de la resistencia eléctrica \\(R\\) para los metales sólidos.",
            "\\[R=\\rho\\dfrac{L}{A}\\]",
            "Su unidad: ohmio \\(\\Omega\\).",
            "Donde \\(\\rho\\): resistividad eléctrica \\((\\Omega\\cdot\\mathrm m)\\); \\(L\\): longitud del conductor (m); \\(A\\): área de la sección transversal del conductor \\((\\mathrm m^2)\\)."
          ],
          "figures": [
            {
              "src": "assets/fisica-capitulo-15/lineales/resistividad.svg",
              "width": 710,
              "height": 260,
              "caption": "Longitud y sección transversal de un conductor · p. 219",
              "alt": "Conductor cilíndrico de longitud L, área transversal A y resistividad rho.",
              "credit": "Redibujo lineal · SIN LÍMITES · Fuente: Física, Lumbreras Editores (2021)",
              "original": false,
              "afterParagraph": 2,
              "redrawn": true
            }
          ]
        },
        {
          "id": "fis15-resistores",
          "title": "Resistores",
          "paragraphs": [
            "Todo cuerpo con determinada resistencia eléctrica se denomina resistor y los símbolos a usar para representarlos son:",
            "Un ejemplo de un resistor variable es el control de volumen de un equipo de sonido, a este también se le denomina potenciómetro."
          ],
          "figures": [
            {
              "src": "assets/fisica-capitulo-15/lineales/simbolos-resistores.svg",
              "width": 710,
              "height": 270,
              "caption": "Símbolos de resistor fijo y variable · p. 219",
              "alt": "Símbolo de resistencia fija y símbolo de resistencia variable, con una flecha oblicua.",
              "credit": "Redibujo lineal · SIN LÍMITES · Fuente: Física, Lumbreras Editores (2021)",
              "original": false,
              "afterParagraph": 0,
              "redrawn": true
            }
          ]
        },
        {
          "id": "fis15-ohm",
          "title": "3. Ley de Ohm",
          "paragraphs": [
            "Establece que “en un conductor, la diferencia de potencial eléctrico (voltaje) es directamente proporcional a la intensidad de corriente que se establece”.",
            "\\[\\dfrac{V}{I}=\\text{constante}\\]",
            "La constante de proporcionalidad es la resistencia eléctrica \\(R\\).",
            "\\[\\dfrac{V}{I}=R\\]",
            "De donde \\[V=IR\\]"
          ],
          "figures": [
            {
              "src": "assets/fisica-capitulo-15/lineales/ley-ohm.svg",
              "width": 830,
              "height": 380,
              "caption": "Circuito y representación para la ley de Ohm · p. 220",
              "alt": "Batería conectada a un foco y su representación equivalente mediante una fuente de voltaje V y un resistor R, por el que circula I.",
              "credit": "Redibujo lineal · SIN LÍMITES · Fuente: Física, Lumbreras Editores (2021)",
              "original": false,
              "afterParagraph": 0,
              "redrawn": true
            }
          ]
        }
      ],
      "examples": [
        {
          "number": 3,
          "title": "Resistencia del filamento de tungsteno",
          "question": "El filamento de tungsteno de una lámpara incandescente está formado por un alambre extremadamente fino, mucho más que el de un cable cualquiera. Por ejemplo, en una lámpara de 60 W, el filamento puede llegar a medir alrededor de 2 m de longitud y de grosor, solamente, 3 mm. Para que la longitud total del filamento ocupe el menor espacio posible, el alambre se reduce por medio de un doble enrollado. Suponiendo que el área de la sección transversal es aproximadamente \\(21\\times10^{-6}\\,\\mathrm m^2\\), calcule la resistencia eléctrica de 2 m de este alambre. \\(\\rho_{\\text{tungsteno}}=5{,}25\\times10^{-8}\\,\\Omega\\cdot\\mathrm m\\).",
          "steps": [
            "Nos piden la resistencia \\(R\\) del alambre conductor. Para ello hacemos uso de la ley de Poulliet: \\[R=\\rho\\dfrac{L}{A}\\]",
            "\\[R=\\dfrac{(5{,}25\\times10^{-8})(2)}{21\\times10^{-6}}\\]",
            "\\[R=0{,}5\\times10^{-2}=5\\times10^{-3}\\,\\Omega\\]",
            "\\[R=5\\,\\mathrm{m}\\Omega\\]"
          ],
          "solutionFigures": []
        },
        {
          "number": 4,
          "title": "Filamento frío y caliente",
          "question": "Un material cuya resistencia eléctrica no es constante, sino que depende de la temperatura y de la diferencia de potencial a la cual está sometido, se llama material no óhmico; tal es el caso del filamento de un bulbo incandescente. Sobre la base de esta información, halle la razón entre la mayor y la menor corriente que conduce un filamento, si su resistencia es igual a \\(20\\,\\Omega\\) cuando está frío (25 °C) y \\(100\\,\\Omega\\) cuando está caliente y que, además, soporta una diferencia de potencial \\(\\Delta V\\) de 120 V. (UNMSM 2019-II)",
          "steps": [
            "Ambos filamentos son colocados al mismo voltaje.",
            "Para el que está frío: \\[I_1=\\dfrac{120}{20}=6\\,\\mathrm A\\]",
            "Para el que está caliente: \\[I_2=\\dfrac{120}{100}=1{,}2\\,\\mathrm A\\]",
            "Nos piden \\[\\dfrac{I_1}{I_2}=\\dfrac{6}{1{,}2}=5\\]"
          ],
          "solutionFigures": [
            {
              "src": "assets/fisica-capitulo-15/lineales/aplicacion-04-frio.svg",
              "width": 780,
              "height": 375,
              "caption": "Aplicación 4: filamento frío · p. 221",
              "alt": "Resistor de 20 ohmios conectado a 120 V. La corriente I1 es 120 entre 20, igual a 6 A.",
              "credit": "Redibujo lineal · SIN LÍMITES · Fuente: Física, Lumbreras Editores (2021)",
              "original": false,
              "afterStep": 1,
              "redrawn": true
            },
            {
              "src": "assets/fisica-capitulo-15/lineales/aplicacion-04-caliente.svg",
              "width": 780,
              "height": 375,
              "caption": "Aplicación 4: filamento caliente · p. 221",
              "alt": "Resistor de 100 ohmios conectado a 120 V. La corriente I2 es 120 entre 100, igual a 1,2 A.",
              "credit": "Redibujo lineal · SIN LÍMITES · Fuente: Física, Lumbreras Editores (2021)",
              "original": false,
              "afterStep": 2,
              "redrawn": true
            }
          ]
        }
      ]
    },
    {
      "title": "Conexión de resistores",
      "blocks": [
        {
          "id": "fis15-conexion",
          "title": "3.1. Conexión de resistores",
          "paragraphs": [
            "Acoplar resistores obedece a muchas necesidades, tales como dividir corrientes, regular voltajes, estabilizar circuitos, entre otros. Lo que se busca con la conexión de resistores es darle mayor utilidad a la energía eléctrica.",
            "Entre las conexiones comunes tenemos las siguientes:"
          ],
          "figures": []
        },
        {
          "id": "fis15-serie",
          "title": "3.1.1. Conexión en serie",
          "paragraphs": [
            "Dos o más resistores están conectados en serie cuando se acoplan uno a continuación del otro.",
            "Estos resistores se pueden reemplazar por un solo resistor al cual denominamos resistor equivalente \\(R_{\\mathrm{Eq}}\\), veamos:",
            "La intensidad de corriente eléctrica a través de todos los resistores es la misma. \\[I=I_1=I_2=I_3\\]",
            "El voltaje de la fuente es igual a la suma de los voltajes de cada resistor. \\[V=V_1+V_2+V_3\\]",
            "Resistor de resistencia equivalente \\(R_{\\mathrm{Eq}}\\): \\[V=I R_{\\mathrm{Eq}}\\]",
            "Se sabe que \\(V=V_1+V_2+V_3\\). Entonces \\[I R_{\\mathrm{Eq}}=I R_1+I R_2+I R_3\\] \\[R_{\\mathrm{Eq}}=R_1+R_2+R_3\\]",
            "En general, para \\(n\\) resistores: \\[R_{\\mathrm{Eq}}=R_1+R_2+R_3+\\cdots+R_n\\]"
          ],
          "figures": [
            {
              "src": "assets/fisica-capitulo-15/lineales/serie-conexion.svg",
              "width": 750,
              "height": 185,
              "caption": "Conexión en serie · p. 221",
              "alt": "Tres resistores R1, R2 y R3 conectados uno a continuación del otro.",
              "credit": "Redibujo lineal · SIN LÍMITES · Fuente: Física, Lumbreras Editores (2021)",
              "original": false,
              "afterParagraph": 0,
              "redrawn": true
            },
            {
              "src": "assets/fisica-capitulo-15/lineales/serie-equivalente.svg",
              "width": 930,
              "height": 390,
              "caption": "Circuito en serie y resistor equivalente · p. 221",
              "alt": "Tres resistores en serie con corrientes I1, I2 e I3 y voltajes V1, V2 y V3. A la derecha, el resistor equivalente conectado a la misma fuente V.",
              "credit": "Redibujo lineal · SIN LÍMITES · Fuente: Física, Lumbreras Editores (2021)",
              "original": false,
              "afterParagraph": 1,
              "redrawn": true
            }
          ]
        },
        {
          "id": "fis15-paralelo",
          "title": "3.1.2. Conexión en paralelo",
          "paragraphs": [
            "Dos o más resistores están conectados en paralelo cuando tienen terminales comunes.",
            "Estos resistores se pueden reemplazar por un solo resistor al cual denominamos equivalente \\(R_{\\mathrm{Eq}}\\).",
            "La intensidad de corriente eléctrica \\(I\\) es igual a la suma de las intensidades de corriente eléctrica en cada resistor. \\[I=I_1+I_2+I_3\\]",
            "El voltaje de la fuente es igual al voltaje en cada resistor. \\[V=V_1=V_2=V_3\\]",
            "Resistor de resistencia eléctrica equivalente \\(R_{\\mathrm{Eq}}\\): \\[V=I R_{\\mathrm{Eq}},\\qquad I=\\dfrac{V}{R_{\\mathrm{Eq}}}\\]",
            "Se sabe que \\(I=I_1+I_2+I_3\\). Entonces \\[\\dfrac{V}{R_{\\mathrm{Eq}}}=\\dfrac{V}{R_1}+\\dfrac{V}{R_2}+\\dfrac{V}{R_3}\\] \\[\\dfrac{1}{R_{\\mathrm{Eq}}}=\\dfrac{1}{R_1}+\\dfrac{1}{R_2}+\\dfrac{1}{R_3}\\]",
            "En general: \\[\\dfrac{1}{R_{\\mathrm{Eq}}}=\\dfrac{1}{R_1}+\\dfrac{1}{R_2}+\\dfrac{1}{R_3}+\\cdots+\\dfrac{1}{R_n}\\]",
            "Observación. Para dos resistores tenemos \\[\\dfrac{1}{R_{\\mathrm{Eq}}}=\\dfrac{1}{R_1}+\\dfrac{1}{R_2}\\] \\[R_{\\mathrm{Eq}}=\\dfrac{R_1 R_2}{R_1+R_2}\\]"
          ],
          "figures": [
            {
              "src": "assets/fisica-capitulo-15/lineales/paralelo-conexion.svg",
              "width": 850,
              "height": 350,
              "caption": "Conexión en paralelo · p. 222",
              "alt": "Resistores R1, R2 y R3 conectados entre los mismos terminales a y b.",
              "credit": "Redibujo lineal · SIN LÍMITES · Fuente: Física, Lumbreras Editores (2021)",
              "original": false,
              "afterParagraph": 0,
              "redrawn": true
            },
            {
              "src": "assets/fisica-capitulo-15/lineales/paralelo-equivalente.svg",
              "width": 900,
              "height": 515,
              "caption": "Circuito en paralelo y resistor equivalente · p. 222",
              "alt": "Tres ramas con resistores R1, R2 y R3, intensidades I1, I2 e I3 y voltajes V1, V2 y V3; a la derecha, el circuito equivalente.",
              "credit": "Redibujo lineal · SIN LÍMITES · Fuente: Física, Lumbreras Editores (2021)",
              "original": false,
              "afterParagraph": 1,
              "redrawn": true
            }
          ]
        }
      ],
      "examples": [
        {
          "number": 5,
          "title": "Resistencia equivalente entre A y B",
          "question": "Las instalaciones eléctricas constan de un arreglo de resistores conectados en serie o paralelo a una fuente de energía eléctrica. Teniendo en cuenta estas conexiones, determine la resistencia equivalente entre los puntos A y B.",
          "steps": [
            "Los resistores de \\(2\\,\\Omega\\) están conectados en paralelo. \\[R_{\\mathrm{Eq}}=\\dfrac{2\\times2}{2+2}=1\\,\\Omega\\]",
            "Luego:",
            "Los resistores están en serie, entonces \\[R_{\\mathrm{Eq}(AB)}=1\\,\\Omega+4\\,\\Omega+3\\,\\Omega\\]",
            "\\[R_{\\mathrm{Eq}(AB)}=8\\,\\Omega\\]"
          ],
          "solutionFigures": [
            {
              "src": "assets/fisica-capitulo-15/lineales/aplicacion-05-paralelo.svg",
              "width": 820,
              "height": 415,
              "caption": "Aplicación 5: reducción del paralelo · p. 223",
              "alt": "Se destaca el paralelo de dos resistores de 2 ohmios, cuya resistencia equivalente es 1 ohmio.",
              "credit": "Redibujo lineal · SIN LÍMITES · Fuente: Física, Lumbreras Editores (2021)",
              "original": false,
              "afterStep": 0,
              "redrawn": true
            },
            {
              "src": "assets/fisica-capitulo-15/lineales/aplicacion-05-serie.svg",
              "width": 660,
              "height": 415,
              "caption": "Aplicación 5: resistores resultantes en serie · p. 223",
              "alt": "Circuito reducido a tres resistores de 1, 4 y 3 ohmios en serie entre A y B.",
              "credit": "Redibujo lineal · SIN LÍMITES · Fuente: Física, Lumbreras Editores (2021)",
              "original": false,
              "afterStep": 1,
              "redrawn": true
            }
          ],
          "figure": {
            "src": "assets/fisica-capitulo-15/lineales/aplicacion-05-circuito.svg",
            "width": 660,
            "height": 415,
            "caption": "Aplicación 5: resistencia equivalente entre A y B · p. 223",
            "alt": "Dos resistores de 2 ohmios en paralelo, conectados en serie con resistores de 4 y 3 ohmios entre A y B.",
            "credit": "Redibujo lineal · SIN LÍMITES · Fuente: Física, Lumbreras Editores (2021)",
            "original": false,
            "redrawn": true
          }
        }
      ]
    },
    {
      "title": "Circuitos eléctricos, instrumentos y reglas de Kirchhoff",
      "blocks": [
        {
          "id": "fis15-circuitos",
          "title": "4. Circuitos eléctricos",
          "paragraphs": [
            "En el término circuito se encuentra implícita la idea de que existe una trayectoria cerrada que les permite a los portadores de carga eléctrica desplazarse a través de los diferentes componentes de modo continuo.",
            "Un circuito eléctrico está conformado por diversos componentes, entre los cuales tenemos baterías, resistores, interruptores, entre otros.",
            "En el análisis de circuitos se hace uso de dos reglas conocidas como de Kirchhoff, las cuales surgen de las leyes de conservación de la carga y de la energía.",
            "Representación gráfica del circuito anterior:"
          ],
          "figures": [
            {
              "src": "assets/fisica-capitulo-15/lineales/circuito-componentes.svg",
              "width": 830,
              "height": 305,
              "caption": "Componentes de un circuito eléctrico · p. 223",
              "alt": "Circuito formado por una fuente, un interruptor cerrado y un foco encendido, con las etiquetas del PDF.",
              "credit": "Redibujo lineal · SIN LÍMITES · Fuente: Física, Lumbreras Editores (2021)",
              "original": false,
              "afterParagraph": 2,
              "redrawn": true
            },
            {
              "src": "assets/fisica-capitulo-15/lineales/circuito-representacion.svg",
              "width": 790,
              "height": 290,
              "caption": "Representación gráfica del circuito · p. 223",
              "alt": "Esquema con fuente, interruptor, resistor y una trayectoria cerrada marcada con la intensidad I.",
              "credit": "Redibujo lineal · SIN LÍMITES · Fuente: Física, Lumbreras Editores (2021)",
              "original": false,
              "afterParagraph": 3,
              "redrawn": true
            }
          ]
        },
        {
          "id": "fis15-instrumentos",
          "title": "4.1. Instrumentos de medición eléctrica",
          "paragraphs": [],
          "figures": []
        },
        {
          "id": "fis15-amperimetro",
          "title": "4.1.1. Amperímetro",
          "paragraphs": [
            "Se utiliza para registrar la intensidad de corriente que pasa por algún tramo de un circuito eléctrico.",
            "Se conecta en serie con los elementos eléctricos en pleno funcionamiento y normalmente presenta una resistencia interna muy pequeña en comparación con la resistencia de los elementos del circuito.",
            "Un amperímetro se considera ideal cuando despreciamos su resistencia interna, de tal modo que se comporta como un simple alambre equipotencial."
          ],
          "figures": [
            {
              "src": "assets/fisica-capitulo-15/lineales/amperimetro.svg",
              "width": 690,
              "height": 200,
              "caption": "Amperímetro conectado en serie · p. 224",
              "alt": "Amperímetro en serie con un resistor R; una flecha indica la corriente I.",
              "credit": "Redibujo lineal · SIN LÍMITES · Fuente: Física, Lumbreras Editores (2021)",
              "original": false,
              "afterParagraph": 1,
              "redrawn": true
            },
            {
              "src": "assets/fisica-capitulo-15/lineales/amperimetro-ideal.svg",
              "width": 730,
              "height": 145,
              "caption": "Modelo del amperímetro ideal · p. 224",
              "alt": "Un amperímetro ideal equivale a un alambre conductor.",
              "credit": "Redibujo lineal · SIN LÍMITES · Fuente: Física, Lumbreras Editores (2021)",
              "original": false,
              "afterParagraph": 2,
              "redrawn": true
            }
          ]
        },
        {
          "id": "fis15-voltimetro",
          "title": "4.1.2. Voltímetro",
          "paragraphs": [
            "Es un instrumento que mide la diferencia de potencial eléctrico entre dos puntos de un circuito. Tiene una resistencia interna de gran valor en comparación con los elementos del circuito.",
            "Si buscamos medir la diferencia de potencial eléctrico de un componente que pertenece a un circuito, el voltímetro se conectará en paralelo con este.",
            "Un voltímetro se considera ideal cuando asumimos que su resistencia interna es muy grande, de tal manera que impide el paso de la corriente eléctrica a través de él, de esta manera se comporta como si fuese un circuito abierto."
          ],
          "figures": [
            {
              "src": "assets/fisica-capitulo-15/lineales/voltimetro.svg",
              "width": 770,
              "height": 315,
              "caption": "Voltímetro conectado en paralelo · p. 224",
              "alt": "Voltímetro entre A y B, en paralelo con el resistor R; se indica la corriente I por el resistor.",
              "credit": "Redibujo lineal · SIN LÍMITES · Fuente: Física, Lumbreras Editores (2021)",
              "original": false,
              "afterParagraph": 1,
              "redrawn": true
            },
            {
              "src": "assets/fisica-capitulo-15/lineales/voltimetro-ideal.svg",
              "width": 810,
              "height": 215,
              "caption": "Modelo del voltímetro ideal · p. 224",
              "alt": "La rama del voltímetro ideal equivale a una rama abierta.",
              "credit": "Redibujo lineal · SIN LÍMITES · Fuente: Física, Lumbreras Editores (2021)",
              "original": false,
              "afterParagraph": 2,
              "redrawn": true
            }
          ]
        },
        {
          "id": "fis15-kirchhoff",
          "title": "4.2. Reglas de Kirchhoff",
          "paragraphs": [
            "Antes de señalar las reglas consideremos el siguiente circuito.",
            "En todo circuito eléctrico identificamos lo siguiente:"
          ],
          "figures": [
            {
              "src": "assets/fisica-capitulo-15/lineales/kirchhoff-circuito.svg",
              "width": 625,
              "height": 615,
              "caption": "Circuito para identificar nodos y mallas · p. 224",
              "alt": "Circuito con nodos M, A y N a la izquierda y B, C y D a la derecha, fuentes V0 y V1 y cinco resistores. En C confluyen I1 e I2 y sale I3.",
              "credit": "Redibujo lineal · SIN LÍMITES · Fuente: Física, Lumbreras Editores (2021)",
              "original": false,
              "afterParagraph": 0,
              "redrawn": true
            }
          ]
        },
        {
          "id": "fis15-nodo",
          "title": "4.2.1. Nodo",
          "paragraphs": [
            "Es el punto de unión de dos o más tramos activos en un circuito.",
            "En nuestro caso son nodos los puntos A, B, C, M y N."
          ],
          "figures": []
        },
        {
          "id": "fis15-malla",
          "title": "4.2.2. Malla",
          "paragraphs": [
            "Es un circuito eléctrico cerrado (recorrido cerrado).",
            "En el circuito eléctrico anterior, una malla eléctrica es AMBCA."
          ],
          "figures": []
        },
        {
          "id": "fis15-regla-nodos",
          "title": "Primera regla de Kirchhoff",
          "paragraphs": [
            "Considerando los conceptos anteriores, enunciamos las reglas de Kirchhoff:",
            "En todo nodo eléctrico se cumple la conservación de la carga eléctrica y debido a ello la suma de las intensidades de corriente que llegan al nodo es igual a la suma de las intensidades de corriente que salen.",
            "\\[\\sum I_{\\text{llegan}}=\\sum I_{\\text{salen}}\\]",
            "En el nodo C del circuito tenemos \\[I_1+I_2=I_3\\]"
          ],
          "figures": []
        },
        {
          "id": "fis15-regla-mallas",
          "title": "Segunda regla de Kirchhoff",
          "paragraphs": [
            "En toda malla eléctrica se verifica la conservación de la energía eléctrica y debido a ello la suma de voltajes en la malla es igual a cero.",
            "\\[\\sum V_{\\text{malla}}=0\\]",
            "En la malla AMBCA tenemos \\[V_{AM}+V_{MB}+V_{BC}+V_{CA}=0\\]",
            "Observación. En la malla, los voltajes son positivos si vamos del menor al mayor potencial eléctrico, y los voltajes son negativos si vamos del mayor al menor potencial eléctrico."
          ],
          "figures": []
        }
      ],
      "examples": []
    },
    {
      "title": "Potencia eléctrica y aplicaciones de circuitos",
      "blocks": [
        {
          "id": "fis15-potencia",
          "title": "4.3. Potencia eléctrica",
          "paragraphs": [
            "Es aquella magnitud escalar que mide la rapidez con que una máquina o dispositivo transforma y/o consume la energía eléctrica.",
            "Veamos el siguiente circuito.",
            "La potencia que entrega la fuente se evalúa. \\[P=V\\cdot I\\] Expresión general de la potencia eléctrica.",
            "La unidad de la potencia eléctrica es el watt o vatio (W).",
            "\\[1\\text{ watt}=1\\text{ voltio}\\times1\\text{ amperio}\\]"
          ],
          "figures": [
            {
              "src": "assets/fisica-capitulo-15/lineales/potencia-fuente.svg",
              "width": 590,
              "height": 440,
              "caption": "Potencia entregada por una fuente · p. 225",
              "alt": "Una batería de voltaje V suministra la corriente I a un resistor R que disipa energía.",
              "credit": "Redibujo lineal · SIN LÍMITES · Fuente: Física, Lumbreras Editores (2021)",
              "original": false,
              "afterParagraph": 1,
              "redrawn": true
            }
          ]
        },
        {
          "id": "fis15-potencia-resistor",
          "title": "Caso particular: un resistor eléctrico",
          "paragraphs": [
            "Para un resistor eléctrico tenemos:",
            "Donde \\(V=IR\\). Reemplazando en la expresión de la potencia tenemos \\[P=I^2R=\\dfrac{V^2}{R}\\]"
          ],
          "figures": [
            {
              "src": "assets/fisica-capitulo-15/lineales/potencia-resistor.svg",
              "width": 550,
              "height": 180,
              "caption": "Potencia en un resistor · p. 225",
              "alt": "Resistor R atravesado por la intensidad I.",
              "credit": "Redibujo lineal · SIN LÍMITES · Fuente: Física, Lumbreras Editores (2021)",
              "original": false,
              "afterParagraph": 0,
              "redrawn": true
            }
          ]
        }
      ],
      "examples": [
        {
          "number": 6,
          "title": "Intensidad en un circuito mixto",
          "question": "En la clase de Física de un colegio, un profesor dibuja el siguiente arreglo de resistores. Si indica que la diferencia de potencial entre A y B es 16 V y pregunta qué intensidad de corriente pasa por el resistor de \\(2\\,\\Omega\\), ¿cuál fue la respuesta correcta de sus estudiantes?",
          "steps": [
            "Sea \\(I\\) la intensidad de corriente que pasa por el resistor de \\(2\\,\\Omega\\).",
            "En el nodo inferior tenemos \\(I=I_1+I_2\\) (I), primera regla de Kirchhoff.",
            "En el resistor de \\(4\\,\\Omega\\): \\(V_{AB}=I_2R\\). Entonces \\(16=I_2(4)\\) y \\(I_2=4\\,\\mathrm A\\).",
            "El resistor de \\(8\\,\\Omega\\) está sometido a la misma diferencia de potencial entre A y B, luego \\(V_{AB}=I_1r\\). Entonces \\(16=I_1(8)\\) y \\(I_1=2\\,\\mathrm A\\).",
            "Finalmente, reemplazamos en (I): \\[I=2\\,\\mathrm A+4\\,\\mathrm A=6\\,\\mathrm A\\]"
          ],
          "solutionFigures": [
            {
              "src": "assets/fisica-capitulo-15/lineales/aplicacion-06-corrientes.svg",
              "width": 760,
              "height": 430,
              "caption": "Aplicación 6: corrientes y nodo inferior · p. 225",
              "alt": "Circuito con I1 descendiendo por 8 ohmios, I2 por la rama de 4 ohmios e I saliendo del nodo inferior hacia el resistor de 2 ohmios.",
              "credit": "Redibujo lineal · SIN LÍMITES · Fuente: Física, Lumbreras Editores (2021)",
              "original": false,
              "afterStep": 0,
              "redrawn": true
            }
          ],
          "figure": {
            "src": "assets/fisica-capitulo-15/lineales/aplicacion-06-circuito.svg",
            "width": 760,
            "height": 430,
            "caption": "Aplicación 6: corriente por el resistor de 2 Ω · p. 225",
            "alt": "Fuente epsilon y resistor de 2 ohmios en serie con el paralelo de 8 y 4 ohmios entre los puntos A y B.",
            "credit": "Redibujo lineal · SIN LÍMITES · Fuente: Física, Lumbreras Editores (2021)",
            "original": false,
            "redrawn": true
          }
        },
        {
          "number": 7,
          "title": "Lecturas de los instrumentos ideales",
          "question": "Con la intención de no sufrir algún tipo de daño como quemaduras o electrocutarse, antes de trabajar con ciertos circuitos es recomendable usar un multitéster, el cual se puede calibrar como amperímetro o voltímetro. Si en el circuito mostrado se utiliza dos multitéster, determine las lecturas de los instrumentos ideales.",
          "steps": [
            "En el circuito eléctrico tenemos dos fuentes y la que define el sentido de la corriente es la fuente de 12 V.",
            "El amperímetro ideal mide la intensidad de corriente \\(I\\). Aplicamos la segunda regla de Kirchhoff en el circuito: \\(\\sum V_{\\text{malla}}=0\\).",
            "Iniciamos en M en sentido horario: \\[12-2I-2-3I=0\\] \\[10-5I=0\\] \\[I=2\\,\\mathrm A\\]",
            "La lectura del voltímetro es la diferencia de potencial entre A y B: \\[V_{AB}=I R_{AB}=2(2)=4\\,\\mathrm V\\]"
          ],
          "solutionFigures": [
            {
              "src": "assets/fisica-capitulo-15/lineales/aplicacion-07-recorrido.svg",
              "width": 880,
              "height": 405,
              "caption": "Aplicación 7: recorrido horario de la malla · p. 226",
              "alt": "Circuito sin los instrumentos con las polaridades de las fuentes y resistores y corriente I en sentido horario, iniciando en M.",
              "credit": "Redibujo lineal · SIN LÍMITES · Fuente: Física, Lumbreras Editores (2021)",
              "original": false,
              "afterStep": 0,
              "redrawn": true
            }
          ],
          "figure": {
            "src": "assets/fisica-capitulo-15/lineales/aplicacion-07-instrumentos.svg",
            "width": 880,
            "height": 405,
            "caption": "Aplicación 7: lecturas de los instrumentos · p. 226",
            "alt": "Fuentes de 12 V y 2 V en oposición, resistores de 2 y 3 ohmios en serie, amperímetro en serie y voltímetro en paralelo con el resistor de 2 ohmios.",
            "credit": "Redibujo lineal · SIN LÍMITES · Fuente: Física, Lumbreras Editores (2021)",
            "original": false,
            "redrawn": true
          }
        },
        {
          "number": 8,
          "title": "Potencia disipada por un resistor",
          "question": "Es importante controlar el consumo energético de los aparatos resistivos, por medio de la potencia eléctrica consumida. Para ello, en un simulador interactivo se dibuja el siguiente circuito, determine la potencia disipada por el resistor de \\(2\\,\\Omega\\).",
          "steps": [
            "En el resistor de \\(16\\,\\Omega\\) tenemos \\(V=IR\\), de donde \\(48=I(16)\\) e \\(I=3\\,\\mathrm A\\).",
            "Los resistores de \\(2\\,\\Omega\\) y \\(16\\,\\Omega\\) están en serie, entonces la intensidad de corriente a través de ellos es la misma.",
            "Para el resistor de \\(2\\,\\Omega\\) tenemos \\[P_{2\\Omega}=I^2r=(3)^2(2)\\]",
            "\\[P_{2\\Omega}=18\\,\\mathrm W\\]"
          ],
          "solutionFigures": [],
          "figure": {
            "src": "assets/fisica-capitulo-15/lineales/aplicacion-08-circuito.svg",
            "width": 730,
            "height": 350,
            "caption": "Aplicación 8: potencia disipada · p. 226",
            "alt": "Resistores de 2 y 16 ohmios en serie. El resistor de 16 ohmios tiene una diferencia de potencial de 48 V.",
            "credit": "Redibujo lineal · SIN LÍMITES · Fuente: Física, Lumbreras Editores (2021)",
            "original": false,
            "redrawn": true
          }
        },
        {
          "number": 9,
          "title": "Intensidad de corriente en un ramal",
          "question": "Se muestra un ramal eléctrico que es parte de un circuito complejo en el que los potenciales eléctricos en los nodos a y b son 42 V y 25 V, respectivamente. Determine la intensidad de corriente que fluye por el ramal.",
          "steps": [
            "Por dato tenemos \\(V_a=42\\,\\mathrm V\\) y \\(V_b=25\\,\\mathrm V\\). La corriente eléctrica fluye de a hacia b.",
            "Iniciamos el recorrido del ramal de a hacia b y luego tenemos \\[V_a-5I+12-2I-8=V_b\\]",
            "Cuando vamos de mayor a menor potencial colocamos el signo negativo, pero cuando vamos de menor a mayor potencial colocamos el signo positivo.",
            "Reemplazamos valores: \\[42-5I+12-2I-8=25\\] \\[46-7I=25\\] \\[7I=21\\] \\[I=3\\,\\mathrm A\\]"
          ],
          "solutionFigures": [
            {
              "src": "assets/fisica-capitulo-15/lineales/aplicacion-09-polaridades.svg",
              "width": 930,
              "height": 260,
              "caption": "Aplicación 9: signos de las diferencias de potencial · p. 227",
              "alt": "Ramal de a hacia b con la corriente I y las polaridades anotadas en los dos resistores y en las fuentes de 12 y 8 V.",
              "credit": "Redibujo lineal · SIN LÍMITES · Fuente: Física, Lumbreras Editores (2021)",
              "original": false,
              "afterStep": 0,
              "redrawn": true
            }
          ],
          "figure": {
            "src": "assets/fisica-capitulo-15/lineales/aplicacion-09-ramal.svg",
            "width": 930,
            "height": 260,
            "caption": "Aplicación 9: ramal eléctrico · p. 227",
            "alt": "Ramal de a hacia b con resistor de 5 ohmios, fuente de 12 V con positivo a la derecha, resistor de 2 ohmios y fuente de 8 V con positivo a la izquierda.",
            "credit": "Redibujo lineal · SIN LÍMITES · Fuente: Física, Lumbreras Editores (2021)",
            "original": false,
            "redrawn": true
          }
        },
        {
          "number": 10,
          "title": "Voltímetro y potencia entregada por la fuente",
          "question": "Si la lectura del amperímetro es 3 A, ¿cuánto indica el voltímetro, y cuánto es la potencia entregada por la fuente?",
          "steps": [
            "Consideramos que los instrumentos son ideales. Si retiramos los instrumentos tenemos el siguiente circuito:",
            "El amperímetro nos indicará el valor de la intensidad de corriente \\(I\\), y el voltímetro la diferencia de potencial entre a y b, entonces por condición del ejercicio tenemos \\(I=3\\,\\mathrm A\\).",
            "El voltímetro indica \\(V=V_{ab}\\). Entonces \\[V=I R_{ab}=3(6)=18\\,\\mathrm V\\]",
            "La potencia que entrega la fuente la absorben los resistores. Reduciendo el circuito tenemos:",
            "\\[P_{\\text{fuente}}=P_{R_{\\mathrm{Eq}}}\\] \\[P_{\\text{fuente}}=I^2 R_{\\mathrm{Eq}}=(3)^2(15)=135\\,\\mathrm W\\]"
          ],
          "solutionFigures": [
            {
              "src": "assets/fisica-capitulo-15/lineales/aplicacion-10-sin-instrumentos.svg",
              "width": 780,
              "height": 390,
              "caption": "Aplicación 10: circuito sin instrumentos · p. 227",
              "alt": "Circuito con resistores de 4, 6 y 5 ohmios. Los puntos a y b delimitan el resistor de 6 ohmios por el que circula I.",
              "credit": "Redibujo lineal · SIN LÍMITES · Fuente: Física, Lumbreras Editores (2021)",
              "original": false,
              "afterStep": 0,
              "redrawn": true
            },
            {
              "src": "assets/fisica-capitulo-15/lineales/aplicacion-10-equivalente.svg",
              "width": 780,
              "height": 390,
              "caption": "Aplicación 10: resistencia equivalente · p. 228",
              "alt": "Fuente V conectada a un único resistor equivalente de 15 ohmios, con corriente I.",
              "credit": "Redibujo lineal · SIN LÍMITES · Fuente: Física, Lumbreras Editores (2021)",
              "original": false,
              "afterStep": 3,
              "redrawn": true
            }
          ],
          "figure": {
            "src": "assets/fisica-capitulo-15/lineales/aplicacion-10-instrumentos.svg",
            "width": 780,
            "height": 390,
            "caption": "Aplicación 10: voltímetro y potencia de la fuente · p. 227",
            "alt": "Fuente V conectada a resistores de 4, 6 y 5 ohmios en serie. Amperímetro en la rama superior y voltímetro en paralelo con el resistor de 6 ohmios.",
            "credit": "Redibujo lineal · SIN LÍMITES · Fuente: Física, Lumbreras Editores (2021)",
            "original": false,
            "redrawn": true
          }
        }
      ]
    }
  ],
  "sourceNote": "Fuente: Física, Peter Flores Escobal y José Luis Mateo Torres, Lumbreras Editores, primera edición, febrero de 2021, capítulo XV: Electrodinámica, pp. 217–228 (páginas impresas). Teoría y diez aplicaciones resueltas transcritas del PDF proporcionado; gráficos redibujados en estilo lineal sobre fondo blanco a partir de esas páginas. La práctica interactiva de diez problemas se conserva al final."
};
