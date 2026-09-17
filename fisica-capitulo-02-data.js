window.VECTOR_CONTENT = {
  "title": "Vectores",
  "lessons": [
    {
      "title": "Elementos de un vector",
      "subtitle": "Módulo y dirección",
      "goal": "Identifica los dos elementos de un vector: cuánto mide y hacia dónde apunta.",
      "body": "<p>Un <strong>vector</strong> se representa mediante una flecha, como \\(\\vec A\\), y se describe mediante <strong>dos elementos: módulo y dirección</strong>. Por ejemplo, una fuerza de 5 N hacia el este tiene módulo 5 N y dirección hacia el este.</p><h3>Módulo: ¿cuánto mide?</h3><p>El <strong>módulo</strong> es el tamaño o valor del vector. Se representa por \\(A\\) o \\(|\\vec A|\\) y es un número no negativo:</p><div class=\"equation\">\\[A=|\\vec A|\\geq0\\]</div><p>Cuando el vector representa una magnitud física, escribimos su módulo con la unidad correspondiente: metros para un desplazamiento o newtons para una fuerza. En un dibujo, la longitud de la flecha representa ese módulo según la escala elegida. A la misma escala, una flecha de longitud doble representa un módulo doble.</p><h3>Dirección: ¿hacia dónde apunta?</h3><p>La <strong>dirección</strong> indica hacia dónde apunta el vector. Podemos expresarla con una referencia, como «hacia el este» o «hacia el norte», o mediante un ángulo medido desde un eje. Decir solamente «horizontal» no basta para distinguir una flecha que apunta al este de otra que apunta al oeste.</p><p>En el plano mediremos el ángulo \\(\\theta\\) desde el eje \\(+x\\), mediante un giro antihorario. Así, este corresponde a \\(0^\\circ\\), norte a \\(90^\\circ\\), oeste a \\(180^\\circ\\) y sur a \\(270^\\circ\\). Una vuelta completa, \\(360^\\circ\\), vuelve a la dirección de \\(0^\\circ\\).</p><figure class=\"vector-figure\"><svg viewBox=\"0 0 380 270\" role=\"img\" aria-label=\"Vector A de módulo 5 newtons y dirección 30 grados desde el eje positivo x, medidos en giro antihorario.\"><defs><marker id=\"arrow-elements\" viewBox=\"0 0 10 10\" refX=\"9\" refY=\"5\" markerWidth=\"6\" markerHeight=\"6\" orient=\"auto\"><path d=\"M0 0 L10 5 L0 10 Z\" fill=\"#285c9b\"/></marker></defs><path d=\"M55 205 H340 M65 225 V55\" fill=\"none\" stroke=\"#899bb0\" stroke-width=\"1.5\"/><path d=\"M65 205 L272.85 85\" fill=\"none\" stroke=\"#285c9b\" stroke-width=\"4\" marker-end=\"url(#arrow-elements)\"/><path d=\"M109 205 A44 44 0 0 0 103.11 183\" fill=\"none\" stroke=\"#188269\" stroke-width=\"2\"/><text x=\"45\" y=\"225\">O</text><text x=\"338\" y=\"226\">+x</text><text x=\"39\" y=\"52\">+y</text><text x=\"287\" y=\"82\">A</text><text x=\"118\" y=\"191\">30°</text><text x=\"104\" y=\"85\">Módulo: 5 N</text><text x=\"65\" y=\"253\">Dirección: 30° desde +x</text></svg><figcaption>La longitud de la flecha representa el módulo según una escala; el ángulo y la punta de la flecha muestran su dirección.</figcaption></figure><h3>Comparar vectores</h3><ul><li><strong>Iguales:</strong> dos vectores libres de la misma magnitud física son iguales si tienen igual módulo e igual dirección. Pueden dibujarse en lugares diferentes.</li><li><strong>Opuestos:</strong> \\(\\vec A\\) y \\(-\\vec A\\), si son no nulos, tienen igual módulo y direcciones opuestas; el ángulo entre ellos es \\(180^\\circ\\).</li><li><strong>Nulo:</strong> \\(\\vec0\\) tiene módulo cero y su dirección no está definida.</li></ul><p>Trabajaremos principalmente con <strong>vectores libres</strong>: trasladar una flecha sin girarla ni cambiar su longitud conserva el vector.</p><h3>Multiplicar por un número</h3><div class=\"equation\">\\[|k\\vec A|=|k|\\,|\\vec A|\\]</div><p>Para un vector no nulo, si \\(k>0\\), se conserva la dirección; si \\(k<0\\), la dirección pasa a ser la opuesta; si \\(k=0\\), se obtiene el vector nulo. El módulo siempre es no negativo.</p>",
      "key": "Los elementos de un vector son módulo y dirección: el módulo indica cuánto mide y la dirección indica hacia dónde apunta. El vector nulo tiene módulo cero y dirección no definida.",
      "examples": [
        {
          "title": "Leer el módulo y la dirección",
          "question": "Una flecha de 4 cm representa una fuerza. La escala es 1 cm por cada 2 N y la flecha forma 30° desde +x, medidos en giro antihorario. Identifica los dos elementos del vector.",
          "steps": [
            "La escala permite hallar el módulo: \\(A=(4\\,\\mathrm{cm})(2\\,\\mathrm N/\\mathrm{cm})=8\\,\\mathrm N\\).",
            "La dirección está dada por \\(\\theta=30^\\circ\\), medidos desde \\(+x\\) en giro antihorario.",
            "Respuesta: módulo \\(8\\,\\mathrm N\\) y dirección \\(30^\\circ\\) desde \\(+x\\). Los 4 cm son la longitud del dibujo, no el módulo de la fuerza."
          ]
        },
        {
          "title": "Módulo y dirección de un múltiplo negativo",
          "question": "\\(\\vec A\\) tiene módulo 4 N y dirección hacia el norte. Identifica el módulo y la dirección de \\(-3\\vec A\\).",
          "steps": [
            "El módulo es \\(|-3|\\cdot4=12\\,\\mathrm N\\).",
            "El factor negativo cambia la dirección a la opuesta: del norte al sur.",
            "Respuesta: módulo \\(12\\,\\mathrm N\\) y dirección hacia el sur, que corresponde a \\(270^\\circ\\) desde \\(+x\\)."
          ]
        }
      ],
      "quiz": [
        {
          "id": "u1a",
          "prompt": "¿Cuáles son los dos elementos que usamos para describir un vector?",
          "options": [
            "Masa y tiempo",
            "Longitud del dibujo y color",
            "Módulo y dirección",
            "Rapidez y distancia",
            "Origen y color"
          ],
          "answer": 2,
          "solution": "El módulo indica cuánto mide el vector y la dirección indica hacia dónde apunta.",
          "level": "Básico"
        },
        {
          "id": "u1b",
          "prompt": "Si \\(\\vec A\\) tiene módulo 5 m y dirección hacia el este, ¿cuáles son el módulo y la dirección de \\(-2\\vec A\\)?",
          "options": [
            "10 m al este",
            "10 m al oeste",
            "−10 m al oeste",
            "2 m al oeste",
            "5 m al oeste"
          ],
          "answer": 1,
          "solution": "El módulo es |−2| × 5 = 10 m. El factor negativo cambia la dirección a la opuesta: hacia el oeste.",
          "level": "Básico"
        }
      ]
    },
    {
      "title": "Suma y resta de vectores",
      "subtitle": "Métodos gráficos y ángulo entre vectores",
      "goal": "Construye una resultante y reconoce cuándo se pueden sumar directamente los módulos.",
      "body": "<p>Solo sumamos vectores de magnitudes físicas compatibles, expresados en unidades compatibles. No sumamos una fuerza con una velocidad.</p><h3>Triángulo y polígono</h3><p>Coloca el segundo vector con su cola en la punta del primero, sin girarlo ni cambiar su tamaño. La resultante une la cola del primero con la punta del último. Para tres o más vectores repite el procedimiento: es el <strong>método del polígono</strong>. Si el polígono se cierra, la resultante es nula.</p><figure class=\"vector-figure\"><svg viewBox=\"0 0 380 270\" role=\"img\" aria-label=\"Suma de un vector A de 4 unidades hacia la derecha y B de 3 unidades hacia arriba. La resultante une el inicio de A con el final de B y mide 5 unidades.\"><defs><marker id=\"arrow-triangle\" viewBox=\"0 0 10 10\" refX=\"9\" refY=\"5\" markerWidth=\"6\" markerHeight=\"6\" orient=\"auto-start-reverse\"><path d=\"M0 0 L10 5 L0 10 Z\" fill=\"context-stroke\"/></marker></defs><g fill=\"none\" stroke-width=\"3\" marker-end=\"url(#arrow-triangle)\"><path d=\"M60 210 H260\" stroke=\"#285c9b\"/><path d=\"M260 210 V60\" stroke=\"#188269\"/><path d=\"M60 210 L260 60\" stroke=\"#cf4151\"/><text x=\"140\" y=\"238\">A = 4</text><text x=\"276\" y=\"145\">B = 3</text><text x=\"110\" y=\"118\">R = 5</text><path d=\"M242 210 V192 H260\" stroke=\"#899bb0\" stroke-width=\"1\" marker-end=\"none\"/></g></svg><figcaption>Método del triángulo: la cola de B se coloca en la punta de A. El recorrido suma 7 unidades, pero el módulo de la resultante es 5.</figcaption></figure><h3>Paralelogramo</h3><p>Coloca ambos vectores con un origen común y completa el paralelogramo. La diagonal que parte de ese origen es \\(\\vec R=\\vec A+\\vec B\\). La suma es conmutativa: cambiar el orden no cambia la resultante.</p><div class=\"equation\">\\[R=\\sqrt{A^2+B^2+2AB\\cos\\theta}\\]</div><p>Aquí \\(A\\) y \\(B\\) son módulos y \\(\\theta\\) es el ángulo entre los vectores <strong>puestos con el mismo origen</strong>, entre 0° y 180°. No lo confundas con el ángulo interior suplementario del triángulo.</p><div class=\"table-scroll\"><table><thead><tr><th>Ángulo</th><th>Módulo de la suma</th></tr></thead><tbody><tr><td>0° · igual dirección</td><td>\\(R=A+B\\)</td></tr><tr><td>90° · perpendiculares</td><td>\\(R=\\sqrt{A^2+B^2}\\)</td></tr><tr><td>180° · direcciones opuestas</td><td>\\(R=|A-B|\\)</td></tr></tbody></table></div><div class=\"equation\">\\[|A-B|\\leq R\\leq A+B\\]</div><h3>Restar es sumar el opuesto</h3><div class=\"equation\">\\[\\vec A-\\vec B=\\vec A+(-\\vec B),\\qquad |\\vec A-\\vec B|=\\sqrt{A^2+B^2-2AB\\cos\\theta}\\]</div><p>Con origen común, \\(\\vec A-\\vec B\\) va desde la punta de \\(\\vec B\\) hasta la punta de \\(\\vec A\\). La resta no es conmutativa.</p>",
      "key": "Antes de usar una fórmula, identifica si buscas una suma o una diferencia y desde dónde se mide el ángulo.",
      "examples": [
        {
          "title": "Dos fuerzas perpendiculares",
          "question": "Sobre una partícula actúan fuerzas de 9 N al este y 12 N al norte. Calcula el módulo de su resultante.",
          "steps": [
            "Los vectores son perpendiculares, por lo que cos 90° = 0.",
            "<div class=\"equation\">\\[R=\\sqrt{9^2+12^2}=\\sqrt{225}=15\\,\\mathrm N\\]</div>",
            "La resultante apunta al noreste. Su módulo no es 21 N: eso solo ocurriría si ambas fuerzas tuvieran la misma dirección."
          ]
        },
        {
          "title": "Dos vectores con 120°",
          "question": "Dos vectores de módulo 6 unidades forman 120°. Halla \\(|\\vec A+\\vec B|\\).",
          "steps": [
            "Usa \\(\\cos120^\\circ=-1/2\\).",
            "<div class=\"equation\">\\[R^2=6^2+6^2+2(6)(6)(-1/2)=36\\]</div>",
            "La raíz no negativa es R = 6 unidades. Por simetría, la resultante sigue la bisectriz del ángulo."
          ]
        }
      ],
      "quiz": [
        {
          "id": "u2a",
          "prompt": "Dos vectores perpendiculares miden 5 y 12 unidades. ¿Cuánto mide su suma?",
          "options": [
            "17",
            "7",
            "60",
            "13",
            "25"
          ],
          "answer": 3,
          "solution": "Por Pitágoras, \\(R=\\sqrt{5^2+12^2}=13\\) unidades.",
          "level": "Básico"
        },
        {
          "id": "u2b",
          "prompt": "Dos vectores tienen módulos 8 N y 3 N. ¿Qué valor no puede tener el módulo de su suma?",
          "options": [
            "4 N",
            "5 N",
            "7 N",
            "9 N",
            "11 N"
          ],
          "answer": 0,
          "solution": "El módulo debe estar entre |8 − 3| = 5 N y 8 + 3 = 11 N. Por ello, 4 N es imposible.",
          "level": "Básico"
        }
      ]
    },
    {
      "title": "Componentes y vectores unitarios",
      "subtitle": "Del dibujo a las coordenadas",
      "goal": "Descompón un vector, calcula su módulo y determina su orientación con el cuadrante correcto.",
      "body": "<p>Elegimos ejes perpendiculares: +x a la derecha y +y hacia arriba. Los vectores unitarios \\(\\hat\\imath\\) y \\(\\hat\\jmath\\) señalan esas direcciones y tienen módulo uno. En el espacio añadimos \\(\\hat k\\) para el eje z.</p><div class=\"equation\">\\[\\vec A=A_x\\hat\\imath+A_y\\hat\\jmath,\\qquad A=\\sqrt{A_x^2+A_y^2}\\]</div><p>Las <strong>componentes escalares</strong> \\(A_x\\) y \\(A_y\\) pueden ser positivas, negativas o cero. Las componentes vectoriales son \\(A_x\\hat\\imath\\) y \\(A_y\\hat\\jmath\\). Conservan la unidad de la magnitud representada.</p><figure class=\"vector-figure\"><svg viewBox=\"0 0 380 270\" role=\"img\" aria-label=\"Vector A con componente horizontal 4 y vertical 3. Las proyecciones forman un triángulo rectángulo; el vector mide 5 y está en el primer cuadrante.\"><defs><marker id=\"arrow-components\" viewBox=\"0 0 10 10\" refX=\"9\" refY=\"5\" markerWidth=\"6\" markerHeight=\"6\" orient=\"auto-start-reverse\"><path d=\"M0 0 L10 5 L0 10 Z\" fill=\"context-stroke\"/></marker></defs><g fill=\"none\" stroke-width=\"3\" marker-end=\"url(#arrow-components)\"><path d=\"M55 215 H340 M55 215 V30\" stroke=\"#899bb0\" stroke-width=\"1.5\" marker-end=\"none\"/><path d=\"M55 215 H255 V65\" stroke=\"#899bb0\" stroke-width=\"1.5\" stroke-dasharray=\"5 5\" marker-end=\"none\"/><path d=\"M55 215 L255 65\" stroke=\"#cf4151\"/><text x=\"260\" y=\"56\">A = 5</text><text x=\"137\" y=\"239\">Ax = 4</text><text x=\"267\" y=\"145\">Ay = 3</text><text x=\"336\" y=\"235\">x</text><text x=\"34\" y=\"35\">y</text><path d=\"M97 215 A42 42 0 0 0 88.6 189.8\" stroke=\"#285c9b\" stroke-width=\"1.5\" marker-end=\"none\"/><text x=\"108\" y=\"198\">θ</text></g></svg><figcaption>El ángulo θ se mide desde el eje +x. La componente horizontal usa coseno y la vertical usa seno.</figcaption></figure><div class=\"equation\">\\[A_x=A\\cos\\theta,\\qquad A_y=A\\operatorname{sen}\\theta\\]</div><p>Estas expresiones suponen que \\(\\theta\\) se mide desde +x, en sentido antihorario. Si el ángulo se da respecto al eje y, identifica el cateto adyacente y el opuesto antes de elegir seno o coseno.</p><div class=\"table-scroll\"><table><thead><tr><th>Cuadrante</th><th>Signo de Ax</th><th>Signo de Ay</th></tr></thead><tbody><tr><td>I · 0° a 90°</td><td>+</td><td>+</td></tr><tr><td>II · 90° a 180°</td><td>−</td><td>+</td></tr><tr><td>III · 180° a 270°</td><td>−</td><td>−</td></tr><tr><td>IV · 270° a 360°</td><td>+</td><td>−</td></tr></tbody></table></div><p>En los ejes, una componente vale cero. Para recuperar la orientación puedes usar \\(\\tan\\theta=A_y/A_x\\), si \\(A_x\\ne0\\), pero debes comprobar el cuadrante. Si \\(A_x=0\\), el vector apunta a 90° o 270° según el signo de \\(A_y\\).</p><h3>Unitario en la dirección de un vector</h3><div class=\"equation\">\\[\\hat u_A=\\frac{\\vec A}{|\\vec A|}\\qquad (\\vec A\\ne\\vec0)\\]</div><p>El vector unitario es adimensional. El vector nulo no se puede normalizar. En tres dimensiones:</p><div class=\"equation\">\\[\\vec A=A_x\\hat\\imath+A_y\\hat\\jmath+A_z\\hat k,\\qquad A=\\sqrt{A_x^2+A_y^2+A_z^2}\\]</div>",
      "key": "Primero ubica el cuadrante. Después calcula componentes y módulo; el módulo siempre es no negativo.",
      "examples": [
        {
          "title": "Un vector en el segundo cuadrante",
          "question": "Un vector de módulo 10 m forma 150° con +x. Calcula sus componentes.",
          "steps": [
            "Como \\(\\cos150^\\circ=-\\sqrt3/2\\) y \\(\\operatorname{sen}150^\\circ=1/2\\):",
            "<div class=\"equation\">\\[A_x=-5\\sqrt3\\,\\mathrm m,\\qquad A_y=5\\,\\mathrm m\\]</div>",
            "Así, \\(\\vec A=(-5\\sqrt3\\hat\\imath+5\\hat\\jmath)\\,\\mathrm m\\). Comprueba: \\(\\sqrt{75+25}=10\\,\\mathrm m\\)."
          ]
        },
        {
          "title": "Módulo, dirección y unitario",
          "question": "Dado \\(\\vec A=(-3\\hat\\imath+4\\hat\\jmath)\\,\\mathrm N\\), calcula su módulo y unitario, e indica su orientación.",
          "steps": [
            "<div class=\"equation\">\\[A=\\sqrt{(-3)^2+4^2}=5\\,\\mathrm N\\]</div>",
            "<div class=\"equation\">\\[\\hat u_A=-\\frac35\\hat\\imath+\\frac45\\hat\\jmath\\]</div>",
            "Está en el segundo cuadrante. El ángulo agudo de referencia es \\(\\arctan(4/3)\\approx53{,}13^\\circ\\); desde +x, \\(\\theta\\approx126{,}87^\\circ\\)."
          ]
        }
      ],
      "quiz": [
        {
          "id": "u3a",
          "prompt": "Un vector de módulo 10 N forma 30° con +x. ¿Cuánto vale \\(A_y\\)?",
          "options": [
            "\\(10\\sqrt3\\,\\mathrm N\\)",
            "\\(5\\sqrt3\\,\\mathrm N\\)",
            "5 N",
            "−5 N",
            "10 N"
          ],
          "answer": 2,
          "solution": "\\(A_y=A\\operatorname{sen}30^\\circ=10(1/2)=5\\,\\mathrm N\\).",
          "level": "Básico"
        },
        {
          "id": "u3b",
          "prompt": "¿Cuál es el unitario de \\(\\vec A=3\\hat\\imath+4\\hat\\jmath\\)?",
          "options": [
            "\\(3\\hat\\imath+4\\hat\\jmath\\)",
            "\\(4\\hat\\imath+3\\hat\\jmath\\)",
            "\\(\\frac34\\hat\\imath+\\frac43\\hat\\jmath\\)",
            "\\(\\frac15\\hat\\imath+\\frac15\\hat\\jmath\\)",
            "\\(\\frac35\\hat\\imath+\\frac45\\hat\\jmath\\)"
          ],
          "answer": 4,
          "solution": "El módulo es 5. Al dividir cada componente entre 5 se obtiene un vector de módulo uno.",
          "level": "Básico"
        }
      ]
    },
    {
      "title": "Resultante y equilibrante",
      "subtitle": "Método analítico y aplicaciones",
      "goal": "Suma componentes y encuentra el vector que anula una resultante.",
      "body": "<p>El método analítico evita medir longitudes sobre un dibujo. Expresa todos los vectores en los mismos ejes y unidades, y suma por separado sus componentes con sus signos.</p><div class=\"equation\">\\[R_x=\\sum A_x,\\qquad R_y=\\sum A_y,\\qquad \\vec R=R_x\\hat\\imath+R_y\\hat\\jmath\\]</div><div class=\"equation\">\\[R=\\sqrt{R_x^2+R_y^2}\\]</div><p>En tres dimensiones también se suma \\(R_z\\) y se usa \\(R=\\sqrt{R_x^2+R_y^2+R_z^2}\\). Para combinar expresiones como \\(2\\vec A-3\\vec B\\), multiplica primero cada componente por su coeficiente.</p><h3>El vector entre dos puntos</h3><div class=\"equation\">\\[\\overrightarrow{PQ}=(x_Q-x_P)\\hat\\imath+(y_Q-y_P)\\hat\\jmath\\]</div><p>El orden importa: siempre coordenadas del punto final menos coordenadas del inicial.</p><h3>Equilibrante</h3><p>La equilibrante \\(\\vec E\\) es el vector que, añadido al sistema, hace nula la suma:</p><div class=\"equation\">\\[\\vec E=-\\vec R,\\qquad \\vec R+\\vec E=\\vec0\\]</div><p>Resultante y equilibrante tienen igual módulo y direcciones opuestas. Para fuerzas aplicadas a una <strong>partícula</strong>, resultante cero significa aceleración cero: puede permanecer en reposo o moverse con velocidad constante. El equilibrio de un cuerpo extenso requiere además considerar los momentos de las fuerzas.</p><div class=\"goal\"><b>Ruta de solución:</b> define ejes → descompón → suma con signos → calcula el módulo → determina el cuadrante → responde con unidad y orientación.</div>",
      "key": "Suma las componentes, no los módulos. La equilibrante es el opuesto de la resultante.",
      "examples": [
        {
          "title": "Tres fuerzas en un plano",
          "question": "Calcula la resultante de \\(\\vec F_1=(4\\hat\\imath+3\\hat\\jmath)\\,\\mathrm N\\), \\(\\vec F_2=(-\\hat\\imath+2\\hat\\jmath)\\,\\mathrm N\\) y \\(\\vec F_3=(3\\hat\\imath-5\\hat\\jmath)\\,\\mathrm N\\).",
          "steps": [
            "En x: \\(R_x=4-1+3=6\\,\\mathrm N\\).",
            "En y: \\(R_y=3+2-5=0\\).",
            "La resultante es \\(\\vec R=6\\hat\\imath\\,\\mathrm N\\): 6 N hacia +x. La equilibrante es \\(\\vec E=-6\\hat\\imath\\,\\mathrm N\\)."
          ]
        },
        {
          "title": "Desplazamiento entre posiciones",
          "question": "Un móvil pasa de P(−2, 1) m a Q(4, −7) m. Halla su desplazamiento y el módulo.",
          "steps": [
            "<div class=\"equation\">\\[\\overrightarrow{PQ}=[4-(-2)]\\hat\\imath+(-7-1)\\hat\\jmath=(6\\hat\\imath-8\\hat\\jmath)\\,\\mathrm m\\]</div>",
            "<div class=\"equation\">\\[|\\overrightarrow{PQ}|=\\sqrt{6^2+(-8)^2}=10\\,\\mathrm m\\]</div>",
            "Apunta al cuarto cuadrante. No podemos deducir la distancia recorrida sin conocer la trayectoria."
          ]
        }
      ],
      "quiz": [
        {
          "id": "u4a",
          "prompt": "Si \\(\\vec A=2\\hat\\imath-\\hat\\jmath\\) y \\(\\vec B=-5\\hat\\imath+4\\hat\\jmath\\), ¿cuál es \\(\\vec A+\\vec B\\)?",
          "options": [
            "\\(7\\hat\\imath-5\\hat\\jmath\\)",
            "\\(-3\\hat\\imath+3\\hat\\jmath\\)",
            "\\(3\\hat\\imath-3\\hat\\jmath\\)",
            "\\(-7\\hat\\imath+5\\hat\\jmath\\)",
            "\\(-3\\hat\\imath-5\\hat\\jmath\\)"
          ],
          "answer": 1,
          "solution": "Suma por ejes: Rx = 2 − 5 = −3; Ry = −1 + 4 = 3.",
          "level": "Básico"
        },
        {
          "id": "u4b",
          "prompt": "La resultante de varias fuerzas es \\((6\\hat\\imath-8\\hat\\jmath)\\,\\mathrm N\\). Su equilibrante es:",
          "options": [
            "\\((6\\hat\\imath+8\\hat\\jmath)\\,\\mathrm N\\)",
            "\\((-8\\hat\\imath+6\\hat\\jmath)\\,\\mathrm N\\)",
            "\\((8\\hat\\imath-6\\hat\\jmath)\\,\\mathrm N\\)",
            "\\((-6\\hat\\imath-8\\hat\\jmath)\\,\\mathrm N\\)",
            "\\((-6\\hat\\imath+8\\hat\\jmath)\\,\\mathrm N\\)"
          ],
          "answer": 4,
          "solution": "La equilibrante cambia el signo de cada componente: E = −R. Su módulo también es 10 N.",
          "level": "Básico"
        }
      ]
    },
    {
      "title": "Producto escalar y proyección",
      "subtitle": "Medir cuánto apunta un vector en otra dirección",
      "goal": "Calcula productos escalares, reconoce perpendicularidad y obtiene una proyección.",
      "body": "<p>El <strong>producto escalar</strong> de dos vectores produce un escalar. Se escribe con un punto:</p><div class=\"equation\">\\[\\vec A\\cdot\\vec B=AB\\cos\\theta=A_xB_x+A_yB_y+A_zB_z\\]</div><p>Para vectores no nulos, es positivo si el ángulo es agudo, cero si es 90° y negativo si es obtuso. Si uno es nulo, el producto también es cero, pero no se puede concluir que exista un ángulo de 90°.</p><div class=\"equation\">\\[\\vec A\\cdot\\vec A=A^2,\\qquad \\hat\\imath\\cdot\\hat\\imath=1,\\qquad \\hat\\imath\\cdot\\hat\\jmath=0\\]</div><p>El producto escalar es conmutativo y distributivo. Sus unidades son el producto de las unidades de los dos vectores. Para hallar el ángulo entre vectores no nulos:</p><div class=\"equation\">\\[\\cos\\theta=\\frac{\\vec A\\cdot\\vec B}{AB}\\]</div><h3>Proyección escalar</h3><p>Si \\(\\hat u\\) es un vector unitario, la proyección escalar de \\(\\vec A\\) en su dirección es:</p><div class=\"equation\">\\[A_{\\parallel}=\\vec A\\cdot\\hat u=A\\cos\\theta\\]</div><p>Puede ser negativa: indica que la proyección apunta en dirección opuesta a \\(\\hat u\\). La <strong>proyección vectorial</strong> es \\((\\vec A\\cdot\\hat u)\\hat u\\).</p><h3>Una aplicación: trabajo de una fuerza constante</h3><div class=\"equation\">\\[W=\\vec F\\cdot\\vec d=Fd\\cos\\theta\\]</div><p>Solo contribuye la parte de la fuerza paralela al desplazamiento. Una fuerza perpendicular realiza trabajo cero durante ese desplazamiento. Estudiaremos este concepto con más detalle en el capítulo de trabajo mecánico.</p>",
      "key": "El punto produce un escalar. Un resultado cero indica perpendicularidad solo cuando ambos vectores son no nulos.",
      "examples": [
        {
          "title": "Comprobar perpendicularidad",
          "question": "Dados \\(\\vec A=2\\hat\\imath+3\\hat\\jmath\\) y \\(\\vec B=3\\hat\\imath-2\\hat\\jmath\\), determina si son perpendiculares.",
          "steps": [
            "<div class=\"equation\">\\[\\vec A\\cdot\\vec B=(2)(3)+(3)(-2)=6-6=0\\]</div>",
            "Ambos vectores son distintos de cero.",
            "Por tanto, cos θ = 0 y el ángulo entre ellos es 90°."
          ]
        },
        {
          "title": "Proyección sobre una dirección inclinada",
          "question": "Proyecta \\(\\vec A=(6\\hat\\imath+8\\hat\\jmath)\\,\\mathrm m\\) sobre \\(\\hat u=\\frac35\\hat\\imath+\\frac45\\hat\\jmath\\).",
          "steps": [
            "Primero comprueba que \\(|\\hat u|=\\sqrt{9/25+16/25}=1\\).",
            "<div class=\"equation\">\\[A_{\\parallel}=6\\left(\\frac35\\right)+8\\left(\\frac45\\right)=\\frac{50}{5}=10\\,\\mathrm m\\]</div>",
            "La proyección vale el módulo de A porque ambos tienen la misma orientación."
          ]
        }
      ],
      "quiz": [
        {
          "id": "u5a",
          "prompt": "Si \\(\\vec A=\\hat\\imath+2\\hat\\jmath\\) y \\(\\vec B=3\\hat\\imath-\\hat\\jmath\\), ¿cuánto es \\(\\vec A\\cdot\\vec B\\)?",
          "options": [
            "1",
            "5",
            "−1",
            "−5",
            "0"
          ],
          "answer": 0,
          "solution": "Multiplica componentes correspondientes y suma: (1)(3) + (2)(−1) = 1.",
          "level": "Básico"
        },
        {
          "id": "u5b",
          "prompt": "Dos vectores no nulos tienen producto escalar cero. ¿Qué ángulo forman?",
          "options": [
            "0°",
            "45°",
            "60°",
            "90°",
            "180°"
          ],
          "answer": 3,
          "solution": "Como A y B no son cero, AB cos θ = 0 exige cos θ = 0, es decir, θ = 90°.",
          "level": "Básico"
        }
      ]
    },
    {
      "title": "Producto vectorial",
      "subtitle": "Perpendicularidad, dirección y área",
      "goal": "Calcula un producto vectorial y determina su dirección con la regla de la mano derecha.",
      "body": "<p>El <strong>producto vectorial</strong> \\(\\vec C=\\vec A\\times\\vec B\\) produce un vector perpendicular al plano de los dos vectores, cuando estos no son paralelos. Su módulo es:</p><div class=\"equation\">\\[C=AB\\operatorname{sen}\\theta\\qquad (0^\\circ\\leq\\theta\\leq180^\\circ)\\]</div><p>Es máximo a 90° y vale cero si los vectores son paralelos o si alguno es nulo. Para determinar la dirección, curva los dedos de tu mano derecha desde \\(\\vec A\\) hacia \\(\\vec B\\) por el ángulo menor; el pulgar señala \\(\\vec A\\times\\vec B\\).</p><figure class=\"vector-figure\"><svg viewBox=\"0 0 380 270\" role=\"img\" aria-label=\"Eje x hacia la derecha y eje y hacia arriba. El producto i por j apunta fuera de la pantalla, en la dirección positiva del eje z, representada por un círculo con punto.\"><defs><marker id=\"arrow-cross\" viewBox=\"0 0 10 10\" refX=\"9\" refY=\"5\" markerWidth=\"6\" markerHeight=\"6\" orient=\"auto-start-reverse\"><path d=\"M0 0 L10 5 L0 10 Z\" fill=\"context-stroke\"/></marker></defs><g fill=\"none\" stroke-width=\"3\" marker-end=\"url(#arrow-cross)\"><path d=\"M80 195 H290\" stroke=\"#285c9b\"/><path d=\"M80 195 V45\" stroke=\"#188269\"/><circle cx=\"80\" cy=\"195\" r=\"15\" fill=\"white\" stroke=\"#cf4151\" stroke-width=\"2\"/><circle cx=\"80\" cy=\"195\" r=\"4\" fill=\"#cf4151\" stroke=\"none\"/><text x=\"300\" y=\"201\">+x</text><text x=\"65\" y=\"30\">+y</text><text x=\"110\" y=\"155\">+z sale de la pantalla</text><text x=\"145\" y=\"240\">i × j = k</text></g></svg><figcaption>Sistema de ejes de mano derecha. El punto indica que el vector sale hacia ti; una cruz indica que entra en la pantalla.</figcaption></figure><div class=\"equation\">\\[\\hat\\imath\\times\\hat\\jmath=\\hat k,\\qquad \\hat\\jmath\\times\\hat k=\\hat\\imath,\\qquad \\hat k\\times\\hat\\imath=\\hat\\jmath\\]</div><p>Al invertir el orden aparece un signo negativo. Un vector multiplicado vectorialmente por sí mismo da el vector nulo.</p><div class=\"equation\">\\[\\vec B\\times\\vec A=-(\\vec A\\times\\vec B)\\]</div><h3>En componentes</h3><div class=\"equation\">\\[\\vec A\\times\\vec B=(A_yB_z-A_zB_y)\\hat\\imath+(A_zB_x-A_xB_z)\\hat\\jmath+(A_xB_y-A_yB_x)\\hat k\\]</div><p>Si ambos están en el plano xy, solo queda la componente z:</p><div class=\"equation\">\\[\\vec A\\times\\vec B=(A_xB_y-A_yB_x)\\hat k\\]</div><h3>Interpretación geométrica</h3><p>Si los vectores representan lados expresados en unidades de longitud, el módulo del producto da el área del paralelogramo. El área del triángulo es la mitad.</p><div class=\"equation\">\\[\\mathcal A_{\\mathrm{paralelogramo}}=|\\vec A\\times\\vec B|,\\qquad \\mathcal A_{\\mathrm{triangulo}}=\\frac12|\\vec A\\times\\vec B|\\]</div><p>Una aplicación física es el momento de una fuerza: \\(\\vec\\tau=\\vec r\\times\\vec F\\), donde \\(\\vec r\\) va desde el punto de referencia hasta el punto de aplicación. Lo desarrollaremos en estática.</p>",
      "key": "La cruz produce un vector y el orden importa. Para el módulo se usa seno; para el producto escalar se usa coseno.",
      "examples": [
        {
          "title": "Calcular y orientar el producto",
          "question": "Calcula \\(\\vec A\\times\\vec B\\) si \\(\\vec A=2\\hat\\imath+\\hat\\jmath\\) y \\(\\vec B=-\\hat\\imath+3\\hat\\jmath\\).",
          "steps": [
            "Ambos están en xy, de modo que las componentes x e y del producto son cero.",
            "<div class=\"equation\">\\[C_z=(2)(3)-(1)(-1)=7\\]</div>",
            "El resultado es \\(7\\hat k\\), hacia +z. Al invertir el orden se obtiene \\(-7\\hat k\\)."
          ]
        },
        {
          "title": "Área de un triángulo",
          "question": "Dos lados de un triángulo, desde el mismo vértice, son \\(\\vec a=4\\hat\\imath\\,\\mathrm m\\) y \\(\\vec b=(2\\hat\\imath+3\\hat\\jmath)\\,\\mathrm m\\). Halla su área.",
          "steps": [
            "<div class=\"equation\">\\[\\vec a\\times\\vec b=[(4)(3)-(0)(2)]\\hat k=12\\hat k\\,\\mathrm{m^2}\\]</div>",
            "El paralelogramo definido por los dos lados tiene área 12 m².",
            "El triángulo ocupa la mitad: \\(\\mathcal A=6\\,\\mathrm{m^2}\\)."
          ]
        }
      ],
      "quiz": [
        {
          "id": "u6a",
          "prompt": "¿Cuál es \\(\\hat\\jmath\\times\\hat\\imath\\)?",
          "options": [
            "\\(\\hat k\\)",
            "\\(-\\hat k\\)",
            "\\(\\hat\\imath\\)",
            "\\(\\hat\\jmath\\)",
            "\\(\\vec0\\)"
          ],
          "answer": 1,
          "solution": "Como \\(\\hat\\imath\\times\\hat\\jmath=\\hat k\\), al invertir el orden se obtiene \\(-\\hat k\\).",
          "level": "Básico"
        },
        {
          "id": "u6b",
          "prompt": "Dos lados de un paralelogramo miden 3 m y 4 m y forman 30°. ¿Cuál es su área?",
          "options": [
            "12 m²",
            "7 m²",
            "3 m²",
            "6 m²",
            "24 m²"
          ],
          "answer": 3,
          "solution": "\\(\\mathcal A=ab\\operatorname{sen}30^\\circ=(3)(4)(1/2)=6\\,\\mathrm{m^2}\\).",
          "level": "Básico"
        }
      ]
    }
  ],
  "practice": [
    {
      "id": "p1",
      "prompt": "Una persona camina 8 m al este y luego 6 m al norte. ¿Cuál es el módulo de su desplazamiento?",
      "options": [
        "14 m",
        "2 m",
        "10 m",
        "48 m",
        "100 m"
      ],
      "answer": 2,
      "solution": "<div class=\"equation\">\\[d=\\sqrt{8^2+6^2}=\\sqrt{100}=10\\,\\mathrm m\\]</div>Los 14 m corresponden a la distancia recorrida, no al módulo del desplazamiento.",
      "level": "Básico"
    },
    {
      "id": "p2",
      "prompt": "Si \\(\\vec A=3\\hat\\imath-4\\hat\\jmath\\), calcula \\(-2\\vec A\\).",
      "options": [
        "\\(-6\\hat\\imath-8\\hat\\jmath\\)",
        "\\(6\\hat\\imath-8\\hat\\jmath\\)",
        "\\(-3\\hat\\imath+4\\hat\\jmath\\)",
        "\\(-6\\hat\\imath+8\\hat\\jmath\\)",
        "\\(6\\hat\\imath+8\\hat\\jmath\\)"
      ],
      "answer": 3,
      "solution": "<div class=\"equation\">\\[-2(3\\hat\\imath-4\\hat\\jmath)=(-2)(3)\\hat\\imath+(-2)(-4)\\hat\\jmath=-6\\hat\\imath+8\\hat\\jmath\\]</div>El coeficiente multiplica a todas las componentes.",
      "level": "Básico"
    },
    {
      "id": "p3",
      "prompt": "Dos fuerzas de 8 N y 6 N, aplicadas a una partícula, forman 60°. Halla el módulo de su resultante.",
      "options": [
        "\\(2\\sqrt{37}\\,\\mathrm N\\)",
        "14 N",
        "10 N",
        "\\(2\\sqrt{13}\\,\\mathrm N\\)",
        "2 N"
      ],
      "answer": 0,
      "solution": "<div class=\"equation\">\\[R^2=8^2+6^2+2(8)(6)\\cos60^\\circ=64+36+48=148\\]</div>Por tanto, \\(R=\\sqrt{148}=2\\sqrt{37}\\,\\mathrm N\\). Está entre 2 N y 14 N.",
      "level": "Intermedio"
    },
    {
      "id": "p4",
      "prompt": "Un vector de módulo 10 N forma 120° con +x, en sentido antihorario. ¿Cuáles son sus componentes (Ax, Ay)?",
      "options": [
        "\\((5,5\\sqrt3)\\,\\mathrm N\\)",
        "\\((-5,-5\\sqrt3)\\,\\mathrm N\\)",
        "\\((5\\sqrt3,-5)\\,\\mathrm N\\)",
        "\\((-5\\sqrt3,5)\\,\\mathrm N\\)",
        "\\((-5,5\\sqrt3)\\,\\mathrm N\\)"
      ],
      "answer": 4,
      "solution": "<div class=\"equation\">\\[A_x=10\\cos120^\\circ=-5\\,\\mathrm N,\\qquad A_y=10\\operatorname{sen}120^\\circ=5\\sqrt3\\,\\mathrm N\\]</div>Está en el segundo cuadrante: x negativa e y positiva.",
      "level": "Intermedio"
    },
    {
      "id": "p5",
      "prompt": "Halla el módulo de la suma de \\(\\vec A=2\\hat\\imath+\\hat\\jmath\\), \\(\\vec B=-5\\hat\\imath+4\\hat\\jmath\\) y \\(\\vec C=\\hat\\imath-2\\hat\\jmath\\).",
      "options": [
        "\\(5\\)",
        "\\(\\sqrt{13}\\)",
        "\\(13\\)",
        "\\(\\sqrt5\\)",
        "\\(\\sqrt{17}\\)"
      ],
      "answer": 1,
      "solution": "<div class=\"equation\">\\[\\vec R=(2-5+1)\\hat\\imath+(1+4-2)\\hat\\jmath=-2\\hat\\imath+3\\hat\\jmath\\]</div><div class=\"equation\">\\[R=\\sqrt{(-2)^2+3^2}=\\sqrt{13}\\]</div>",
      "level": "Intermedio"
    },
    {
      "id": "p6",
      "prompt": "Dos fuerzas tienen resultante \\(\\vec R=(-4\\hat\\imath+3\\hat\\jmath)\\,\\mathrm N\\). ¿Qué fuerza debe añadirse para que la suma sea cero?",
      "options": [
        "\\((-4\\hat\\imath-3\\hat\\jmath)\\,\\mathrm N\\)",
        "\\((4\\hat\\imath+3\\hat\\jmath)\\,\\mathrm N\\)",
        "\\((4\\hat\\imath-3\\hat\\jmath)\\,\\mathrm N\\)",
        "\\((-3\\hat\\imath+4\\hat\\jmath)\\,\\mathrm N\\)",
        "\\(5\\hat\\imath\\,\\mathrm N\\)"
      ],
      "answer": 2,
      "solution": "<div class=\"equation\">\\[\\vec E=-\\vec R=(4\\hat\\imath-3\\hat\\jmath)\\,\\mathrm N\\]</div>Al sumarla con R se anulan las dos componentes. Su módulo es 5 N.",
      "level": "Intermedio"
    },
    {
      "id": "p7",
      "prompt": "¿Cuál es el vector unitario de \\(\\vec A=2\\hat\\imath-3\\hat\\jmath+6\\hat k\\)?",
      "options": [
        "\\(\\frac27\\hat\\imath-\\frac37\\hat\\jmath+\\frac67\\hat k\\)",
        "\\(\\frac2{49}\\hat\\imath-\\frac3{49}\\hat\\jmath+\\frac6{49}\\hat k\\)",
        "\\(\\frac27\\hat\\imath+\\frac37\\hat\\jmath+\\frac67\\hat k\\)",
        "\\(2\\hat\\imath-3\\hat\\jmath+6\\hat k\\)",
        "\\(\\frac25\\hat\\imath-\\frac35\\hat\\jmath+\\frac65\\hat k\\)"
      ],
      "answer": 0,
      "solution": "<div class=\"equation\">\\[A=\\sqrt{2^2+(-3)^2+6^2}=\\sqrt{49}=7\\]</div>Divide las tres componentes entre 7. Conserva sus signos.",
      "level": "Intermedio"
    },
    {
      "id": "p8",
      "prompt": "Los vectores \\(\\vec A=2\\hat\\imath+a\\hat\\jmath\\) y \\(\\vec B=3\\hat\\imath-2\\hat\\jmath\\) son perpendiculares. Halla \\(a\\).",
      "options": [
        "−3",
        "−2",
        "2",
        "3",
        "6"
      ],
      "answer": 3,
      "solution": "Para vectores no nulos, la perpendicularidad exige producto escalar cero.<div class=\"equation\">\\[(2)(3)+a(-2)=0\\quad\\Rightarrow\\quad6-2a=0\\quad\\Rightarrow\\quad a=3\\]</div>",
      "level": "Avanzado"
    },
    {
      "id": "p9",
      "prompt": "Calcula la proyección escalar de \\(\\vec A=(4\\hat\\imath+3\\hat\\jmath)\\,\\mathrm m\\) sobre \\(\\hat u=\\frac35\\hat\\imath+\\frac45\\hat\\jmath\\).",
      "options": [
        "5 m",
        "\\(\\frac{24}{5}\\,\\mathrm m\\)",
        "\\(\\frac75\\,\\mathrm m\\)",
        "0 m",
        "\\(\\frac{12}{5}\\,\\mathrm m\\)"
      ],
      "answer": 1,
      "solution": "<div class=\"equation\">\\[A_{\\parallel}=\\vec A\\cdot\\hat u=4\\left(\\frac35\\right)+3\\left(\\frac45\\right)=\\frac{24}{5}\\,\\mathrm m\\]</div>La proyección mide 4,8 m, menor que el módulo de A, que es 5 m.",
      "level": "Avanzado"
    },
    {
      "id": "p10",
      "prompt": "Dos lados de un triángulo parten del mismo vértice: \\(\\vec a=(2\\hat\\imath-\\hat\\jmath)\\,\\mathrm m\\) y \\(\\vec b=(\\hat\\imath+3\\hat\\jmath)\\,\\mathrm m\\). Halla su área.",
      "options": [
        "7 m²",
        "5 m²",
        "\\(\\frac52\\,\\mathrm{m^2}\\)",
        "14 m²",
        "\\(\\frac72\\,\\mathrm{m^2}\\)"
      ],
      "answer": 4,
      "solution": "<div class=\"equation\">\\[\\vec a\\times\\vec b=[(2)(3)-(-1)(1)]\\hat k=7\\hat k\\,\\mathrm{m^2}\\]</div>El área del paralelogramo es 7 m²; la del triángulo es la mitad: 7/2 m².",
      "level": "Avanzado"
    }
  ],
  "exam": [
    {
      "id": "e1",
      "prompt": "Dos vectores libres representan la misma magnitud física. ¿Qué condición garantiza que sean iguales?",
      "options": [
        "Tener el mismo módulo, aunque apunten en direcciones opuestas",
        "Tener la misma dirección, aunque sus módulos sean distintos",
        "Tener igual módulo y dirección",
        "Tener siempre el mismo punto de aplicación",
        "Tener componentes con igual valor absoluto"
      ],
      "answer": 2,
      "solution": "La igualdad de vectores libres requiere igual módulo e igual dirección. El lugar donde se dibujan puede cambiar.",
      "level": "Básico"
    },
    {
      "id": "e2",
      "prompt": "Una velocidad es \\(\\vec v=(-8\\hat\\imath+6\\hat\\jmath)\\,\\mathrm{m/s}\\). ¿Cuál es la rapidez?",
      "options": [
        "10 m/s",
        "14 m/s",
        "2 m/s",
        "100 m/s",
        "−10 m/s"
      ],
      "answer": 0,
      "solution": "<div class=\"equation\">\\[v=|\\vec v|=\\sqrt{(-8)^2+6^2}=\\sqrt{100}=10\\,\\mathrm{m/s}\\]</div>La rapidez es el módulo de la velocidad y no puede ser negativa.",
      "level": "Básico"
    },
    {
      "id": "e3",
      "prompt": "Si \\(\\vec A=7\\hat\\imath-2\\hat\\jmath\\) y \\(\\vec B=3\\hat\\imath+5\\hat\\jmath\\), calcula \\(\\vec A-\\vec B\\).",
      "options": [
        "\\(10\\hat\\imath+3\\hat\\jmath\\)",
        "\\(4\\hat\\imath+3\\hat\\jmath\\)",
        "\\(-4\\hat\\imath+7\\hat\\jmath\\)",
        "\\(4\\hat\\imath-7\\hat\\jmath\\)",
        "\\(10\\hat\\imath-7\\hat\\jmath\\)"
      ],
      "answer": 3,
      "solution": "<div class=\"equation\">\\[\\vec A-\\vec B=(7-3)\\hat\\imath+(-2-5)\\hat\\jmath=4\\hat\\imath-7\\hat\\jmath\\]</div>",
      "level": "Básico"
    },
    {
      "id": "e4",
      "prompt": "Dos vectores tienen módulos 8 y 5 unidades. ¿Cuál es el menor módulo posible de su resultante?",
      "options": [
        "0",
        "3",
        "5",
        "8",
        "13"
      ],
      "answer": 1,
      "solution": "La resultante mínima se obtiene con direcciones opuestas: Rmín = |8 − 5| = 3 unidades.",
      "level": "Básico"
    },
    {
      "id": "e5",
      "prompt": "Dos fuerzas de 5 N cada una forman 60° y actúan sobre una partícula. Halla el módulo de la resultante.",
      "options": [
        "5 N",
        "10 N",
        "\\(5\\sqrt2\\,\\mathrm N\\)",
        "\\(\\frac52\\,\\mathrm N\\)",
        "\\(5\\sqrt3\\,\\mathrm N\\)"
      ],
      "answer": 4,
      "solution": "<div class=\"equation\">\\[R^2=5^2+5^2+2(5)(5)\\left(\\frac12\\right)=75\\]</div>Así, \\(R=5\\sqrt3\\,\\mathrm N\\).",
      "level": "Intermedio"
    },
    {
      "id": "e6",
      "prompt": "Una fuerza de 12 N forma 120° con +x, en sentido antihorario. ¿Cuánto vale su componente horizontal?",
      "options": [
        "6 N",
        "\\(6\\sqrt3\\,\\mathrm N\\)",
        "−6 N",
        "\\(-6\\sqrt3\\,\\mathrm N\\)",
        "12 N"
      ],
      "answer": 2,
      "solution": "<div class=\"equation\">\\[F_x=12\\cos120^\\circ=12\\left(-\\frac12\\right)=-6\\,\\mathrm N\\]</div>El signo negativo corresponde al segundo cuadrante.",
      "level": "Intermedio"
    },
    {
      "id": "e7",
      "prompt": "Actúan \\(\\vec F_1=(2\\hat\\imath+5\\hat\\jmath)\\,\\mathrm N\\) y \\(\\vec F_2=(-6\\hat\\imath+\\hat\\jmath)\\,\\mathrm N\\). ¿Cuál es la equilibrante?",
      "options": [
        "\\((4\\hat\\imath-6\\hat\\jmath)\\,\\mathrm N\\)",
        "\\((-4\\hat\\imath+6\\hat\\jmath)\\,\\mathrm N\\)",
        "\\((8\\hat\\imath+4\\hat\\jmath)\\,\\mathrm N\\)",
        "\\((-8\\hat\\imath-4\\hat\\jmath)\\,\\mathrm N\\)",
        "\\((4\\hat\\imath+6\\hat\\jmath)\\,\\mathrm N\\)"
      ],
      "answer": 0,
      "solution": "<div class=\"equation\">\\[\\vec R=(2-6)\\hat\\imath+(5+1)\\hat\\jmath=(-4\\hat\\imath+6\\hat\\jmath)\\,\\mathrm N\\]</div>La equilibrante es \\(\\vec E=-\\vec R=(4\\hat\\imath-6\\hat\\jmath)\\,\\mathrm N\\).",
      "level": "Intermedio"
    },
    {
      "id": "e8",
      "prompt": "¿Qué ángulo forman \\(\\vec A=\\hat\\imath+\\hat\\jmath\\) y \\(\\vec B=\\hat\\imath-\\hat\\jmath\\)?",
      "options": [
        "0°",
        "30°",
        "60°",
        "90°",
        "180°"
      ],
      "answer": 3,
      "solution": "<div class=\"equation\">\\[\\vec A\\cdot\\vec B=(1)(1)+(1)(-1)=0\\]</div>Los dos vectores son no nulos, por lo que son perpendiculares.",
      "level": "Intermedio"
    },
    {
      "id": "e9",
      "prompt": "Calcula \\(\\vec A\\times\\vec B\\) para \\(\\vec A=3\\hat\\imath+2\\hat\\jmath\\) y \\(\\vec B=\\hat\\imath-4\\hat\\jmath\\).",
      "options": [
        "\\(14\\hat k\\)",
        "\\(-14\\hat k\\)",
        "\\(-10\\hat k\\)",
        "\\(10\\hat k\\)",
        "\\(-5\\hat k\\)"
      ],
      "answer": 1,
      "solution": "<div class=\"equation\">\\[\\vec A\\times\\vec B=[(3)(-4)-(2)(1)]\\hat k=-14\\hat k\\]</div>Apunta hacia −z. El módulo del producto es 14.",
      "level": "Avanzado"
    },
    {
      "id": "e10",
      "prompt": "El vector \\(\\vec A=(a\\hat\\imath+4\\hat\\jmath)\\,\\mathrm m\\) tiene módulo 5 m y está en el segundo cuadrante. ¿Cuánto vale \\(a\\)?",
      "options": [
        "3",
        "4",
        "−4",
        "5",
        "−3"
      ],
      "answer": 4,
      "solution": "<div class=\"equation\">\\[a^2+4^2=5^2\\quad\\Rightarrow\\quad a^2=9\\quad\\Rightarrow\\quad a=\\pm3\\]</div>En el segundo cuadrante, la componente x es negativa. Por ello a = −3.",
      "level": "Avanzado"
    }
  ],
  "resources": "<p class=\"eyebrow\">Consulta rápida</p><h2>Formulario y estrategia</h2><p><strong>Elementos de un vector:</strong> módulo (cuánto mide) y dirección (hacia dónde apunta). Para el vector nulo, el módulo es cero y la dirección no está definida.</p><p>En las fórmulas de componentes, θ se mide desde +x en sentido antihorario. En las fórmulas entre dos vectores, θ es el ángulo entre ellos con origen común.</p><div class=\"table-scroll\"><table><thead><tr><th>Operación</th><th>Relación</th></tr></thead><tbody><tr><td>Componentes en el plano</td><td>\\(A_x=A\\cos\\theta,\\quad A_y=A\\operatorname{sen}\\theta\\)</td></tr><tr><td>Módulo</td><td>\\(A=\\sqrt{A_x^2+A_y^2+A_z^2}\\)</td></tr><tr><td>Vector unitario</td><td>\\(\\hat u_A=\\vec A/A,\\quad A\\ne0\\)</td></tr><tr><td>Suma</td><td>\\(R_x=A_x+B_x,\\quad R_y=A_y+B_y\\)</td></tr><tr><td>Módulo de la suma</td><td>\\(R^2=A^2+B^2+2AB\\cos\\theta\\)</td></tr><tr><td>Módulo de la diferencia</td><td>\\(D^2=A^2+B^2-2AB\\cos\\theta\\)</td></tr><tr><td>Equilibrante</td><td>\\(\\vec E=-\\vec R\\)</td></tr><tr><td>Producto escalar</td><td>\\(\\vec A\\cdot\\vec B=AB\\cos\\theta\\)</td></tr><tr><td>Proyección escalar</td><td>\\(A_{\\parallel}=\\vec A\\cdot\\hat u\\)</td></tr><tr><td>Producto vectorial en xy</td><td>\\(\\vec A\\times\\vec B=(A_xB_y-A_yB_x)\\hat k\\)</td></tr><tr><td>Módulo del producto vectorial</td><td>\\(|\\vec A\\times\\vec B|=AB\\operatorname{sen}\\theta\\)</td></tr></tbody></table></div><h3>Ángulos notables</h3><div class=\"table-scroll\"><table><thead><tr><th>θ</th><th>sen θ</th><th>cos θ</th></tr></thead><tbody><tr><td>0°</td><td>0</td><td>1</td></tr><tr><td>30°</td><td>\\(1/2\\)</td><td>\\(\\sqrt3/2\\)</td></tr><tr><td>45°</td><td>\\(\\sqrt2/2\\)</td><td>\\(\\sqrt2/2\\)</td></tr><tr><td>60°</td><td>\\(\\sqrt3/2\\)</td><td>\\(1/2\\)</td></tr><tr><td>90°</td><td>1</td><td>0</td></tr><tr><td>120°</td><td>\\(\\sqrt3/2\\)</td><td>\\(-1/2\\)</td></tr><tr><td>150°</td><td>\\(1/2\\)</td><td>\\(-\\sqrt3/2\\)</td></tr><tr><td>180°</td><td>0</td><td>−1</td></tr></tbody></table></div><h3>Errores que debes evitar</h3><ul class=\"resource-list\"><li>Sumar módulos cuando los vectores no tienen la misma dirección.</li><li>Olvidar el signo negativo al restar todas las componentes de un vector.</li><li>Usar seno y coseno sin comprobar desde qué eje se mide el ángulo.</li><li>Elegir la dirección solo con la tangente y olvidar el cuadrante.</li><li>Confundir el resultado escalar de un producto punto con el vector de un producto cruz.</li><li>Asignar dirección al vector nulo o dividir entre su módulo.</li></ul><h3>Antes de entregar</h3><ol class=\"resource-list\"><li>Dibuja los ejes y elige unidades compatibles.</li><li>Identifica si buscas un vector, un módulo, un ángulo o una proyección.</li><li>Desarrolla las operaciones conservando los signos.</li><li>Comprueba si el resultado tiene orientación y unidades coherentes.</li><li>Revisa casos límite: vectores paralelos, opuestos y perpendiculares.</li></ol><h3>Para ampliar</h3><ul class=\"resource-list\"><li><a href=\"https://openstax.org/books/university-physics-volume-1/pages/2-1-scalars-and-vectors\" target=\"_blank\" rel=\"noopener noreferrer\">OpenStax · Escalares y vectores (en inglés)</a></li><li><a href=\"https://openstax.org/books/university-physics-volume-1/pages/2-4-products-of-vectors\" target=\"_blank\" rel=\"noopener noreferrer\">OpenStax · Productos de vectores (en inglés)</a></li></ul><p class=\"resource-note\">Teoría, diagramas, ejemplos y ejercicios originales para este capítulo. Las referencias ofrecen lecturas complementarias.</p>",
  "hero": "<figure class=\"vector-figure\"><svg viewBox=\"0 0 380 270\" role=\"img\" aria-label=\"Suma de un vector A de 4 unidades hacia la derecha y B de 3 unidades hacia arriba. La resultante une el inicio de A con el final de B y mide 5 unidades.\"><defs><marker id=\"arrow-hero\" viewBox=\"0 0 10 10\" refX=\"9\" refY=\"5\" markerWidth=\"6\" markerHeight=\"6\" orient=\"auto-start-reverse\"><path d=\"M0 0 L10 5 L0 10 Z\" fill=\"context-stroke\"/></marker></defs><g fill=\"none\" stroke-width=\"3\" marker-end=\"url(#arrow-hero)\"><path d=\"M60 210 H260\" stroke=\"#285c9b\"/><path d=\"M260 210 V60\" stroke=\"#188269\"/><path d=\"M60 210 L260 60\" stroke=\"#cf4151\"/><text x=\"140\" y=\"238\">A = 4</text><text x=\"276\" y=\"145\">B = 3</text><text x=\"110\" y=\"118\">R = 5</text><path d=\"M242 210 V192 H260\" stroke=\"#899bb0\" stroke-width=\"1\" marker-end=\"none\"/></g></svg><figcaption>Método del triángulo: la cola de B se coloca en la punta de A. El recorrido suma 7 unidades, pero el módulo de la resultante es 5.</figcaption></figure>"
};
