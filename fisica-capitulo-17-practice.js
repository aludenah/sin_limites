'use strict';
window.CHAPTER_PRACTICES=window.CHAPTER_PRACTICES||{};
window.CHAPTER_PRACTICES['fisica-capitulo-17']={
  "title": "Electromagnetismo",
  "sourceMaterial": "electromagnetismo.pdf · Problemas propuestos, pp.235–236; claves, capítulo XVIII.",
  "problems": [
    {
      "id": "fis17-pdf-p01",
      "level": "Básico",
      "topic": "Campo de conductores rectilíneos · Material, problema 1",
      "prompt": "Se muestra la sección transversal de dos conductores muy largos por los que fluye corriente eléctrica. Si la inducción magnética es nula en P, halle \\(x\\).",
      "options": [
        "\\(d\\)",
        "\\(2d\\)",
        "\\(3d\\)",
        "\\(4d\\)",
        "\\(5d\\)"
      ],
      "answer": 2,
      "solution": "<ol><li>Para que el campo total en P sea nulo, los campos producidos por ambos conductores deben tener igual magnitud y sentidos opuestos.</li><li>Las distancias a P son \\(r_1=d+x\\) para el conductor de corriente \\(4I\\) y \\(r_2=x\\) para el de \\(3I\\).</li><li>Usa \\(B=\\mu_0 I/(2\\pi r)\\) e iguala las magnitudes: \\(\\frac{\\mu_0(4I)}{2\\pi(d+x)}=\\frac{\\mu_0(3I)}{2\\pi x}\\).</li><li>Entonces \\(4x=3(d+x)\\), de donde \\(x=3d\\). <strong>Alternativa C.</strong></li></ol>",
      "sourceMaterial": {
        "file": "electromagnetismo.pdf",
        "pdfPage": 22,
        "bookPage": 235,
        "number": 1
      },
      "figure": {
        "src": "assets/em-pdf/propuesto-01.svg",
        "width": 660,
        "height": 280,
        "alt": "Dos conductores separados por d: el izquierdo lleva 4I y el derecho 3I saliente. P está a una distancia x a la derecha del segundo conductor; las distancias a P son d+x y x.",
        "caption": "Figura del problema 1 del material."
      }
    },
    {
      "id": "fis17-pdf-p02",
      "level": "Básico",
      "topic": "Fuerza magnética y aceleración · Material, problema 2",
      "prompt": "La partícula electrizada con \\(+4\\,\\mathrm{mC}\\) presenta una velocidad vertical hacia abajo en el instante mostrado. Si la partícula de \\(600\\,\\mathrm g\\) se encuentra en un campo magnético homogéneo de inducción \\(B=0{,}1\\,\\mathrm T\\), halle el módulo de su aceleración para ese instante. \\((g=10\\,\\mathrm{m/s^2})\\).",
      "options": [
        "\\(25\\,\\mathrm{m/s^2}\\)",
        "\\(50\\,\\mathrm{m/s^2}\\)",
        "\\(\\frac{25}{3}\\,\\mathrm{m/s^2}\\)",
        "\\(\\frac{50}{3}\\,\\mathrm{m/s^2}\\)",
        "\\(75\\,\\mathrm{m/s^2}\\)"
      ],
      "answer": 3,
      "solution": "<ol><li>Convierte los datos: \\(q=4\\times10^{-3}\\,\\mathrm C\\), \\(m=0{,}600\\,\\mathrm{kg}\\) y \\(v=2\\times10^4\\,\\mathrm{m/s}\\).</li><li>Como la velocidad es perpendicular al campo entrante, \\(F_{\\mathrm{mag}}=qvB=(4\\times10^{-3})(2\\times10^4)(0{,}1)=8\\,\\mathrm N\\). La fuerza magnética apunta horizontalmente hacia la derecha.</li><li>El peso apunta hacia abajo y vale \\(P=mg=(0{,}600)(10)=6\\,\\mathrm N\\). Ambas fuerzas son perpendiculares: \\(F_{\\mathrm{res}}=\\sqrt{8^2+6^2}=10\\,\\mathrm N\\).</li><li>Por la segunda ley de Newton, \\(a=F_{\\mathrm{res}}/m=10/0{,}600=50/3\\,\\mathrm{m/s^2}\\). <strong>Alternativa D.</strong></li></ol>",
      "sourceMaterial": {
        "file": "electromagnetismo.pdf",
        "pdfPage": 22,
        "bookPage": 235,
        "number": 2
      },
      "figure": {
        "src": "assets/em-pdf/propuesto-02.svg",
        "width": 660,
        "height": 330,
        "alt": "Partícula positiva con velocidad vertical de 2×10⁴ m/s hacia abajo en un campo magnético que entra en la hoja. La aceleración gravitatoria también apunta hacia abajo.",
        "caption": "Figura del problema 2 del material."
      }
    },
    {
      "id": "fis17-pdf-p03",
      "level": "Básico",
      "topic": "Equilibrio de una barra con corriente · Material, problema 3",
      "prompt": "Si la barra homogénea de \\(2\\,\\mathrm{kg}\\) y \\(50\\,\\mathrm{cm}\\) se mantiene en equilibrio apoyada en dos resortes idénticos de rigidez \\(K=1100\\,\\mathrm{N/m}\\), halle la deformación que experimenta uno de los resortes. Considere que por la barra, que se encuentra en un campo magnético homogéneo, fluye una corriente eléctrica de intensidad \\(20\\,\\mathrm A\\). \\((g=10\\,\\mathrm{m/s^2})\\).",
      "options": [
        "\\(1\\,\\mathrm{cm}\\)",
        "\\(2\\,\\mathrm{cm}\\)",
        "\\(3\\,\\mathrm{cm}\\)",
        "\\(4\\,\\mathrm{cm}\\)",
        "\\(5\\,\\mathrm{cm}\\)"
      ],
      "answer": 0,
      "solution": "<ol><li>La barra tiene longitud \\(L=0{,}50\\,\\mathrm m\\) y el campo entrante es \\(B=0{,}2\\,\\mathrm T\\).</li><li>La corriente apunta hacia la izquierda. La regla de la mano derecha da una fuerza magnética hacia abajo, de magnitud \\(F_{\\mathrm{mag}}=BIL=(0{,}2)(20)(0{,}50)=2\\,\\mathrm N\\).</li><li>El peso también apunta hacia abajo: \\(P=mg=20\\,\\mathrm N\\). Los dos resortes idénticos soportan \\(22\\,\\mathrm N\\) en total, por lo que \\(2Kx=22\\).</li><li>Así, \\(x=22/(2\\times1100)=0{,}010\\,\\mathrm m=1\\,\\mathrm{cm}\\). <strong>Alternativa A.</strong></li></ol>",
      "sourceMaterial": {
        "file": "electromagnetismo.pdf",
        "pdfPage": 22,
        "bookPage": 235,
        "number": 3
      },
      "figure": {
        "src": "assets/em-pdf/propuesto-03.svg",
        "width": 660,
        "height": 330,
        "alt": "Barra horizontal apoyada simétricamente en dos resortes de constante K. Circula corriente hacia la izquierda y el campo de 0,2 T entra en la hoja.",
        "caption": "Figura del problema 3 del material."
      }
    },
    {
      "id": "fis17-pdf-p04",
      "level": "Básico",
      "topic": "Ley de Faraday · Material, problema 4",
      "prompt": "El flujo magnético a través de la espira conductora, de resistencia eléctrica \\(2\\,\\Omega\\), varía uniformemente tal que en \\(2\\,\\mathrm s\\) varía en \\(20\\,\\mathrm{Wb}\\). Halle la intensidad de la corriente inducida.",
      "options": [
        "\\(3\\,\\mathrm A\\)",
        "\\(4\\,\\mathrm A\\)",
        "\\(5\\,\\mathrm A\\)",
        "\\(6\\,\\mathrm A\\)",
        "\\(10\\,\\mathrm A\\)"
      ],
      "answer": 2,
      "solution": "<ol><li>Es una sola espira: \\(N=1\\). El cambio de flujo ya está dado; el ángulo del dibujo no vuelve a multiplicarse.</li><li>La magnitud de la fem es \\(|\\varepsilon|=\\frac{|\\Delta\\Phi|}{\\Delta t}=\\frac{20}{2}=10\\,\\mathrm V\\).</li><li>Por la ley de Ohm, \\(I=|\\varepsilon|/R=10/2=5\\,\\mathrm A\\). <strong>Alternativa C.</strong></li></ol>",
      "sourceMaterial": {
        "file": "electromagnetismo.pdf",
        "pdfPage": 22,
        "bookPage": 235,
        "number": 4
      },
      "figure": {
        "src": "assets/em-pdf/propuesto-04.svg",
        "width": 660,
        "height": 330,
        "alt": "Espira plana en un campo B que forma 30° con su normal. El enunciado proporciona directamente el cambio de flujo a través de la espira.",
        "caption": "Figura del problema 4 del material."
      }
    },
    {
      "id": "fis17-pdf-p05",
      "level": "Básico",
      "topic": "Fem por movimiento y potencia · Material, problema 5",
      "prompt": "La barra metálica de \\(40\\,\\mathrm{cm}\\) de longitud se traslada con velocidad constante de módulo \\(20\\,\\mathrm{m/s}\\). Determine la potencia disipada por \\(R_1\\) si el campo magnético es homogéneo, de inducción \\(0{,}5\\,\\mathrm T\\). Indique, además, el sentido de la corriente inducida.",
      "options": [
        "\\(1\\,\\mathrm W\\); antihorario",
        "\\(1\\,\\mathrm W\\); horario",
        "\\(3\\,\\mathrm W\\); horario",
        "\\(3\\,\\mathrm W\\); antihorario",
        "\\(4\\,\\mathrm W\\); antihorario"
      ],
      "answer": 3,
      "solution": "<ol><li>La fem de la barra es \\(|\\varepsilon|=BLv=(0{,}5)(0{,}40)(20)=4\\,\\mathrm V\\).</li><li>Las resistencias del circuito están en serie: \\(R_{\\mathrm{total}}=3+1=4\\,\\Omega\\). La corriente vale \\(I=4/4=1\\,\\mathrm A\\).</li><li>En \\(R_1=3\\,\\Omega\\) se disipa \\(P_1=I^2R_1=(1)^2(3)=3\\,\\mathrm W\\).</li><li>Al descender la barra, disminuyen el área y el flujo saliente. La corriente inducida mantiene un campo saliente; por la ley de Lenz circula en sentido antihorario. <strong>Alternativa D.</strong></li></ol>",
      "sourceMaterial": {
        "file": "electromagnetismo.pdf",
        "pdfPage": 22,
        "bookPage": 235,
        "number": 5
      },
      "figure": {
        "src": "assets/em-pdf/propuesto-05.svg",
        "width": 660,
        "height": 380,
        "alt": "Barra horizontal móvil que baja por dos rieles en un campo saliente. El circuito incluye R1=3 ohmios a la derecha y otra resistencia de 1 ohmio abajo.",
        "caption": "Figura del problema 5 del material."
      }
    },
    {
      "id": "fis17-pdf-p06",
      "level": "Intermedio",
      "topic": "Superposición vectorial del campo · Material, problema 6",
      "prompt": "Los conductores rectos mostrados son muy largos. Halle el módulo de la inducción magnética en P.",
      "options": [
        "\\(8\\,\\mu\\mathrm T\\)",
        "\\(10\\,\\mu\\mathrm T\\)",
        "\\(15\\,\\mu\\mathrm T\\)",
        "\\(20\\,\\mu\\mathrm T\\)",
        "\\(25\\,\\mu\\mathrm T\\)"
      ],
      "answer": 1,
      "solution": "<ol><li>Cada conductor está a \\(r=10\\,\\mathrm{cm}=0{,}10\\,\\mathrm m\\) de P. Usa \\(B=\\mu_0 I/(2\\pi r)=2\\times10^{-7}I/r\\).</li><li>El conductor vertical de \\(3\\,\\mathrm A\\) produce \\(B_1=6\\,\\mu\\mathrm T\\). Por la mano derecha, su campo en P sale de la hoja.</li><li>El conductor de \\(4\\,\\mathrm A\\) sale de la hoja y produce en P un campo hacia abajo de \\(B_2=8\\,\\mu\\mathrm T\\).</li><li>Los campos son perpendiculares, no opuestos: \\(B_{\\mathrm{res}}=\\sqrt{6^2+8^2}=10\\,\\mu\\mathrm T\\). <strong>Alternativa B.</strong></li></ol>",
      "sourceMaterial": {
        "file": "electromagnetismo.pdf",
        "pdfPage": 23,
        "bookPage": 236,
        "number": 6
      },
      "figure": {
        "src": "assets/em-pdf/propuesto-06.svg",
        "width": 660,
        "height": 330,
        "alt": "Un conductor vertical a la izquierda lleva 3 A hacia abajo. Un segundo conductor, 20 cm a la derecha, lleva 4 A salientes. P está en el punto medio, a 10 cm de cada conductor.",
        "caption": "Figura del problema 6 del material."
      }
    },
    {
      "id": "fis17-pdf-p07",
      "level": "Intermedio",
      "topic": "Movimiento circular de una partícula · Material, problema 7",
      "prompt": "La partícula de \\(1\\,\\mathrm g\\), electrizada con \\(10\\,\\mathrm{mC}\\), se mueve en un campo homogéneo de inducción \\(B=2\\pi\\,\\mathrm T\\). Determine el número de vueltas que completará en \\(1\\) minuto.",
      "options": [
        "\\(200\\)",
        "\\(300\\)",
        "\\(400\\)",
        "\\(500\\)",
        "\\(600\\)"
      ],
      "answer": 4,
      "solution": "<ol><li>Convierte \\(m=10^{-3}\\,\\mathrm{kg}\\) y \\(|q|=10\\,\\mathrm{mC}=10^{-2}\\,\\mathrm C\\). El movimiento es perpendicular al campo.</li><li>La fuerza magnética proporciona la fuerza centrípeta: \\(|q|vB=mv^2/R\\). Como \\(v=2\\pi Rf\\), resulta \\(f=|q|B/(2\\pi m)\\).</li><li>Sustituye: \\(f=\\frac{(10^{-2})(2\\pi)}{2\\pi(10^{-3})}=10\\,\\mathrm{Hz}\\).</li><li>En \\(t=60\\,\\mathrm s\\) completa \\(n=ft=(10)(60)=600\\) vueltas. <strong>Alternativa E.</strong></li></ol>",
      "sourceMaterial": {
        "file": "electromagnetismo.pdf",
        "pdfPage": 23,
        "bookPage": 236,
        "number": 7
      },
      "figure": {
        "src": "assets/em-pdf/propuesto-07.svg",
        "width": 660,
        "height": 380,
        "alt": "Partícula cargada en una trayectoria circular de radio R en un campo uniforme entrante. En el punto inferior, la velocidad es tangente hacia la derecha.",
        "caption": "Figura del problema 7 del material."
      }
    },
    {
      "id": "fis17-pdf-p08",
      "level": "Intermedio",
      "topic": "Fuerza sobre un conductor doblado · Material, problema 8",
      "prompt": "La barra doblada está en un campo magnético homogéneo cuya inducción vale \\(2\\,\\mathrm T\\). Si por la barra fluye corriente eléctrica de intensidad \\(3\\,\\mathrm A\\), halle el módulo de la fuerza magnética sobre dicha barra.",
      "options": [
        "\\(1\\,\\mathrm N\\)",
        "\\(1{,}5\\,\\mathrm N\\)",
        "\\(2\\,\\mathrm N\\)",
        "\\(2{,}5\\,\\mathrm N\\)",
        "\\(3\\,\\mathrm N\\)"
      ],
      "answer": 1,
      "solution": "<ol><li>Los tramos miden \\(L_1=0{,}20\\,\\mathrm m\\) y \\(L_2=0{,}15\\,\\mathrm m\\), ambos perpendiculares al campo.</li><li>Las fuerzas magnéticas sobre ellos son \\(F_1=BIL_1=(2)(3)(0{,}20)=1{,}2\\,\\mathrm N\\) y \\(F_2=BIL_2=(2)(3)(0{,}15)=0{,}9\\,\\mathrm N\\).</li><li>Por la regla de la mano derecha, una fuerza apunta hacia arriba y la otra hacia la derecha; son perpendiculares.</li><li>La magnitud resultante es \\(F=\\sqrt{1{,}2^2+0{,}9^2}=1{,}5\\,\\mathrm N\\). <strong>Alternativa B.</strong></li></ol>",
      "sourceMaterial": {
        "file": "electromagnetismo.pdf",
        "pdfPage": 23,
        "bookPage": 236,
        "number": 8
      },
      "figure": {
        "src": "assets/em-pdf/propuesto-08.svg",
        "width": 660,
        "height": 370,
        "alt": "Conductor doblado en ángulo recto: tramo horizontal de 20 cm con corriente hacia la derecha y tramo vertical de 15 cm hacia abajo. El campo B entra en la hoja.",
        "caption": "Figura del problema 8 del material."
      }
    },
    {
      "id": "fis17-pdf-p09",
      "level": "Intermedio",
      "topic": "Inducción a partir de una gráfica · Material, problema 9",
      "prompt": "La gráfica muestra cómo varía la inducción magnética a través del embobinado de \\(200\\) vueltas. El área de la superficie que limita una de las espiras es \\(50\\,\\mathrm{cm^2}\\). Halle la fem inducida.",
      "options": [
        "\\(1\\,\\mathrm V\\)",
        "\\(2\\,\\mathrm V\\)",
        "\\(3\\,\\mathrm V\\)",
        "\\(4\\,\\mathrm V\\)",
        "\\(5\\,\\mathrm V\\)"
      ],
      "answer": 3,
      "solution": "<ol><li>Convierte el área: \\(A=50\\,\\mathrm{cm^2}=50\\times10^{-4}\\,\\mathrm{m^2}=0{,}005\\,\\mathrm{m^2}\\). El campo es perpendicular al plano de las espiras.</li><li>De la gráfica, B disminuye linealmente de \\(20\\,\\mathrm T\\) a cero en \\(5\\,\\mathrm s\\), por lo que \\(|\\Delta B/\\Delta t|=4\\,\\mathrm{T/s}\\).</li><li>La magnitud de la fem es \\(|\\varepsilon|=NA|\\Delta B/\\Delta t|=(200)(0{,}005)(4)=4\\,\\mathrm V\\). Es constante durante el intervalo mostrado. <strong>Alternativa D.</strong></li></ol>",
      "sourceMaterial": {
        "file": "electromagnetismo.pdf",
        "pdfPage": 23,
        "bookPage": 236,
        "number": 9
      },
      "figure": {
        "src": "assets/em-pdf/propuesto-09.svg",
        "width": 660,
        "height": 350,
        "alt": "Bobina con campo perpendicular a sus espiras. La gráfica B frente a t es una recta que desciende desde 20 T en t=0 hasta 0 T en t=5 s.",
        "caption": "Figura del problema 9 del material."
      }
    },
    {
      "id": "fis17-pdf-p10",
      "level": "Intermedio",
      "topic": "Generador de corriente alterna · Material, problema 10",
      "prompt": "En un generador de corriente alterna el embobinado contiene \\(10\\,000\\) vueltas, el campo magnético es de inducción \\(0{,}5\\,\\mathrm T\\), el área de la sección transversal del embobinado es \\(100\\,\\mathrm{cm^2}\\) y la frecuencia angular de rotación del embobinado es \\(100\\,\\mathrm{rad/s}\\). Halle el máximo valor de la fem inducida.",
      "options": [
        "\\(2\\,\\mathrm{kV}\\)",
        "\\(5\\,\\mathrm{kV}\\)",
        "\\(10\\,\\mathrm{kV}\\)",
        "\\(12\\,\\mathrm{kV}\\)",
        "\\(20\\,\\mathrm{kV}\\)"
      ],
      "answer": 1,
      "solution": "<ol><li>Los datos son \\(N=10\\,000\\), \\(B=0{,}5\\,\\mathrm T\\), \\(A=100\\,\\mathrm{cm^2}=0{,}010\\,\\mathrm{m^2}\\) y \\(\\omega=100\\,\\mathrm{rad/s}\\).</li><li>Para el generador, la fem máxima es \\(\\varepsilon_{\\max}=NBA\\omega\\).</li><li>Sustituye: \\(\\varepsilon_{\\max}=(10\\,000)(0{,}5)(0{,}010)(100)=5000\\,\\mathrm V=5\\,\\mathrm{kV}\\). <strong>Alternativa B.</strong></li></ol>",
      "sourceMaterial": {
        "file": "electromagnetismo.pdf",
        "pdfPage": 23,
        "bookPage": 236,
        "number": 10
      }
    }
  ]
};
