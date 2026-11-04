'use strict';
window.GEOMETRY_CONTENT={
  "number": 1,
  "id": "geometria-capitulo-01",
  "progressId": "geometria-capitulo-01",
  "courseId": 4,
  "courseName": "Geometría",
  "title": "Segmentos y ángulos",
  "version": 1,
  "intro": "Reconoce las figuras y sus elementos, opera con segmentos y relaciona ángulos entre rectas paralelas.",
  "sourceNote": "Adaptado del capítulo «Segmentos y ángulos», Lumbreras Editores.",
  "sourcePages": 12,
  "goals": [
    {
      "title": "Reconocer elementos",
      "text": "Identifica las definiciones y los elementos de los segmentos y de los ángulos."
    },
    {
      "title": "Relacionar ángulos",
      "text": "Utiliza las características de los distintos tipos de ángulos para calcular medidas angulares."
    },
    {
      "title": "Aplicar proporciones",
      "text": "Relaciona longitudes y medidas angulares para resolver los problemas del capítulo."
    }
  ],
  "sequenceTitle": "El recorrido que vamos a seguir",
  "timeline": [
    [
      "Ideas básicas",
      "Geometría, figuras y elementos fundamentales."
    ],
    [
      "Segmentos",
      "Extremos, punto medio y operaciones con longitudes."
    ],
    [
      "Ángulos",
      "Elementos, clasificación, complemento y suplemento."
    ],
    [
      "Paralelas y problemas",
      "Relaciones angulares, teoremas, resueltos y propuestos."
    ]
  ],
  "lessons": [
    {
      "id": "geometria-y-ramas",
      "title": "Geometría y sus ramas",
      "body": "<p>La <strong>geometría</strong> es la rama de la matemática que estudia las figuras geométricas. Su uso práctico se encuentra en distintas culturas antiguas; los griegos organizaron sus conocimientos de manera sistemática. El material también menciona los conocimientos geométricos de la ciudad de Caral, en nuestro país.</p><p>La palabra proviene del griego <em>geo</em>, «tierra», y <em>metron</em>, «medida»: significa <strong>medida de la tierra</strong>.</p><h3>Figura geométrica</h3><p>Es un conjunto de puntos que presenta una forma o característica determinada. El triángulo, la circunferencia y la pirámide son ejemplos de figuras geométricas.</p><h3>Partes de la geometría</h3><dl class=\"geometry-definitions\"><dt>Geometría plana o planimetría</dt><dd>Estudia figuras cuyos puntos pertenecen a un mismo plano, como el ángulo y el trapecio.</dd><dt>Geometría del espacio o estereometría</dt><dd>Estudia figuras cuyos puntos no están contenidos todos en un mismo plano, como el prisma y el cono.</dd><dt>Geometría analítica</dt><dd>Relaciona el álgebra y la geometría: representa figuras mediante ecuaciones lineales o cuadráticas.</dd></dl><p>Entre las representaciones analíticas del material se encuentran la recta y la circunferencia:</p><div class=\"geometry-equation\">\\[Ax+By+C=0\\]</div><div class=\"geometry-equation\">\\[(x-h)^2+(y-k)^2=r^2\\]</div>",
      "visuals": [
        {
          "src": "assets/geometria-capitulo-01/ramas.svg",
          "caption": "Figuras planas, espaciales y su representación analítica.",
          "alt": "Ángulo y trapecio en el plano; prisma y cono en el espacio; ecuaciones de una recta y una circunferencia.",
          "width": 600,
          "height": 580
        }
      ]
    },
    {
      "id": "elementos-fundamentales",
      "title": "Elementos fundamentales y rayo",
      "body": "<p>Para construir y estudiar figuras geométricas se utilizan tres <strong>elementos fundamentales</strong>: el punto, la recta y el plano. Se toman como ideas básicas; no se definen a partir de otros elementos del capítulo.</p><dl class=\"geometry-definitions\"><dt>Punto</dt><dd>Se representa con una marca y se nombra con una letra mayúscula, por ejemplo, «punto A».</dd><dt>Recta</dt><dd>Se representa prolongándose en ambos sentidos. Puede nombrarse \\(\\ell\\), que se lee «recta ele».</dd><dt>Plano</dt><dd>Se representa mediante una porción de superficie y una letra, como «plano H».</dd></dl><h3>Rayo</h3><p>Es una de las partes de una recta determinadas al señalar un punto en ella. Ese punto es su <strong>origen</strong>. El rayo \\(\\overrightarrow{OA}\\) comienza en O, pasa por A y continúa en ese sentido.</p>",
      "visuals": [
        {
          "src": "assets/geometria-capitulo-01/elementos.svg",
          "caption": "Punto, recta, plano y rayo.",
          "alt": "Un punto A; una recta que se prolonga en ambos sentidos; un plano H; y un rayo de origen O que pasa por A.",
          "width": 600,
          "height": 480
        }
      ]
    },
    {
      "id": "segmentos-y-punto-medio",
      "title": "Segmento y punto medio",
      "body": "<p>Un <strong>segmento</strong> es la parte de una recta limitada por dos puntos llamados <strong>extremos</strong>. En \\(\\overline{AB}\\), los extremos son A y B.</p><h3>Segmento y longitud</h3><p>La notación \\(\\overline{AB}\\) se lee «segmento de extremos A y B». La notación \\(AB\\) representa su <strong>longitud</strong>. Si la longitud se denomina d:</p><div class=\"geometry-equation\">\\[AB=d\\]</div><h3>Punto medio</h3><p>El punto medio de un segmento es el punto que lo divide en dos segmentos de igual longitud. Si M es el punto medio de \\(\\overline{AB}\\):</p><div class=\"geometry-equation\">\\[AM=MB=\\frac{AB}{2}\\]</div>",
      "visuals": [
        {
          "src": "assets/geometria-capitulo-01/segmento.svg",
          "caption": "El segmento y su punto medio.",
          "alt": "El segmento AB tiene longitud d. M divide otro segmento AB en dos partes de la misma longitud.",
          "width": 600,
          "height": 370
        }
      ]
    },
    {
      "id": "operaciones-con-segmentos",
      "title": "Operaciones con segmentos",
      "body": "<h3>Adición</h3><p>Si A, B y C son puntos consecutivos de una recta, B está entre A y C. La longitud total es la suma de las partes:</p><div class=\"geometry-equation\">\\[AC=AB+BC\\]</div><p>Si \\(AB=a\\) y \\(BC=b\\), entonces \\(AC=a+b\\).</p><h3>Sustracción</h3><p>Si D, E y F son puntos consecutivos, se cumple \\(DF=DE+EF\\). Para encontrar una de las partes se resta la otra al total:</p><div class=\"geometry-equation\">\\[DE=DF-EF\\]</div><p>Si \\(DF=d\\) y \\(EF=c\\), entonces \\(DE=d-c\\).</p>",
      "visuals": [
        {
          "src": "assets/geometria-capitulo-01/operaciones.svg",
          "caption": "Adición y sustracción de longitudes.",
          "alt": "B está entre A y C: AC es AB más BC. E está entre D y F: DE es DF menos EF.",
          "width": 600,
          "height": 410
        }
      ]
    },
    {
      "id": "angulo-y-elementos",
      "title": "Ángulo y sus elementos",
      "body": "<p>Un <strong>ángulo</strong> es la figura formada por dos rayos que tienen el mismo origen y no son colineales. Los rayos son sus <strong>lados</strong> y el origen común es su <strong>vértice</strong>.</p><p>En \\(\\angle AOB\\), el vértice es O y sus lados son \\(\\overrightarrow{OA}\\) y \\(\\overrightarrow{OB}\\). La letra del vértice se escribe en el centro.</p><h3>Notación</h3><p>\\(\\angle AOB\\) se lee «ángulo AOB». \\(m\\angle AOB\\) se lee «medida del ángulo AOB». Si la medida se representa con alfa:</p><div class=\"geometry-equation\">\\[m\\angle AOB=\\alpha\\]</div><h3>Bisectriz</h3><p>En los problemas del material se utiliza la <strong>bisectriz</strong>: es el rayo que divide un ángulo en dos ángulos de igual medida. Si \\(\\overrightarrow{OM}\\) es bisectriz de \\(\\angle AOB\\):</p><div class=\"geometry-equation\">\\[m\\angle AOM=m\\angle MOB=\\frac{m\\angle AOB}{2}\\]</div>",
      "visuals": [
        {
          "src": "assets/geometria-capitulo-01/angulo.svg",
          "caption": "Elementos de un ángulo.",
          "alt": "Los rayos OA y OB comparten el vértice O; su abertura se representa con alfa.",
          "width": 600,
          "height": 350
        }
      ]
    },
    {
      "id": "clasificacion-de-angulos",
      "title": "Clasificación de ángulos",
      "body": "<p>El material organiza los ángulos según su medida, la posición de sus lados y la suma de sus medidas.</p><h3>Según su medida angular</h3><div class=\"geometry-table\"><table><thead><tr><th>Tipo</th><th>Característica</th><th>Medida</th></tr></thead><tbody><tr><td>Agudo</td><td>Mayor que 0° y menor que 90°.</td><td>\\(0^\\circ<\\alpha<90^\\circ\\)</td></tr><tr><td>Recto</td><td>Su medida es 90°.</td><td>\\(\\alpha=90^\\circ\\)</td></tr><tr><td>Obtuso</td><td>Mayor que 90° y menor que 180°.</td><td>\\(90^\\circ<\\alpha<180^\\circ\\)</td></tr></tbody></table></div>__FIGURE_measure__<h3>Según la posición de sus lados</h3><dl class=\"geometry-definitions\"><dt>Ángulos adyacentes</dt><dd>Son dos ángulos coplanares con el mismo vértice y un lado común, situados uno a continuación del otro. Si sus medidas son alfa y theta, \\(m\\angle AOC=\\alpha+\\theta\\).</dd><dt>Ángulos consecutivos</dt><dd>Son tres o más ángulos con el mismo vértice que, al tomarse de dos en dos y en orden, son adyacentes. Para los ángulos AOB, BOC y COD: \\(m\\angle AOD=\\alpha+\\beta+\\theta\\).</dd><dt>Ángulos opuestos por el vértice</dt><dd>Tienen el mismo vértice y los lados de uno son prolongaciones de los lados del otro. Sus medidas son iguales: \\(\\alpha=\\beta\\).</dd></dl>__FIGURE_position__<h3>Según la suma de sus medidas</h3><dl class=\"geometry-definitions\"><dt>Complementarios</dt><dd>La suma de sus medidas es 90°. El complemento de un ángulo de medida alfa se representa por \\(C_\\alpha\\).</dd></dl><div class=\"geometry-equation\">\\[C_\\alpha=90^\\circ-\\alpha\\]</div><dl class=\"geometry-definitions\"><dt>Suplementarios</dt><dd>La suma de sus medidas es 180°. El suplemento de un ángulo de medida alfa se representa por \\(S_\\alpha\\).</dd></dl><div class=\"geometry-equation\">\\[S_\\alpha=180^\\circ-\\alpha\\]</div><h3>Par lineal</h3><p>Son dos ángulos adyacentes cuyos lados no comunes son rayos opuestos. Forman un ángulo llano y sus medidas suman 180°:</p><div class=\"geometry-equation\">\\[\\theta+\\alpha=180^\\circ\\]</div>",
      "visuals": [
        {
          "src": "assets/geometria-capitulo-01/suma-angular.svg",
          "caption": "Complemento, suplemento y par lineal.",
          "alt": "Dos ángulos complementarios completan 90 grados. Un par lineal suma 180 grados.",
          "width": 600,
          "height": 470
        }
      ]
    },
    {
      "id": "rectas-y-angulos",
      "title": "Rectas secantes, paralelas y ángulos",
      "body": "<h3>Rectas secantes</h3><p>Son dos rectas que tienen un punto en común. Ese punto se denomina <strong>punto de intersección</strong>.</p><h3>Rectas paralelas</h3><p>Son dos rectas que están en un mismo plano y no tienen ningún punto en común. La notación \\(\\ell_1\\parallel\\ell_2\\) se lee «la recta ele uno es paralela a la recta ele dos».</p><h3>Dos paralelas cortadas por una secante</h3><p>La secante forma pares de ángulos que se relacionan de la siguiente manera:</p><dl class=\"geometry-definitions\"><dt>Alternos internos y alternos externos</dt><dd>Se encuentran en lados opuestos de la secante. Si las rectas son paralelas, cada par tiene medidas iguales.</dd><dt>Conjugados internos y conjugados externos</dt><dd>Se encuentran en el mismo lado de la secante. Cada par suma 180°.</dd><dt>Correspondientes</dt><dd>Ocupan la misma posición relativa en las dos intersecciones. Sus medidas son iguales.</dd></dl><div class=\"geometry-equation\">\\[\\text{Alternos y correspondientes: }\\alpha=\\beta\\]</div><div class=\"geometry-equation\">\\[\\text{Conjugados: }\\alpha+\\beta=180^\\circ\\]</div>",
      "visuals": [
        {
          "src": "assets/geometria-capitulo-01/paralelas.svg",
          "caption": "Pares de ángulos entre paralelas.",
          "alt": "Dos rectas paralelas cortadas por una secante: los alternos y correspondientes son iguales, y los conjugados suman 180 grados.",
          "width": 600,
          "height": 650
        }
      ]
    },
    {
      "id": "teoremas-entre-paralelas",
      "title": "Teoremas entre paralelas",
      "body": "<h3>Ángulo ubicado entre dos paralelas</h3><p>En la configuración representada, si \\(\\ell_1\\parallel\\ell_2\\), el ángulo central es la suma de las inclinaciones indicadas en los extremos:</p><div class=\"geometry-equation\">\\[x=\\alpha+\\beta\\]</div><h3>Línea quebrada entre dos paralelas</h3><p>En una línea quebrada como la de la figura, la suma de los ángulos de un lado es igual a la suma de los ángulos del otro lado. Con las letras utilizadas en el material:</p><div class=\"geometry-equation\">\\[\\alpha+\\beta+\\theta+\\gamma=x+y+z\\]</div><p>Antes de aplicar la igualdad, identifica las dos rectas paralelas y recorre los vértices de la quebrada en orden.</p>",
      "visuals": [
        {
          "src": "assets/geometria-capitulo-01/teoremas.svg",
          "caption": "Ángulos y líneas quebradas entre paralelas.",
          "alt": "En la primera figura, x es alfa más beta. En la segunda, la suma de los ángulos de un lado iguala la del otro lado.",
          "width": 600,
          "height": 610
        }
      ]
    }
  ],
  "workedExamples": [
    {
      "number": 1,
      "title": "Puntos medios de dos segmentos",
      "source": "UNMSM 2000",
      "question": "En una línea se consideran los puntos consecutivos A, B y C. Si P y R son puntos medios de \\(\\overline{AB}\\) y \\(\\overline{AC}\\), respectivamente, calcule PR sabiendo que \\(BC=12\\).",
      "figure": {
        "src": "assets/geometria-capitulo-01/resuelto-01.svg",
        "caption": "P y R son los puntos medios indicados.",
        "alt": "P es punto medio de AB y R es punto medio de AC. El segmento BC mide 12.",
        "width": 600,
        "height": 310
      },
      "steps": [
        "Sea \\(AP=PB=t\\) y \\(AR=RC=n\\). Si \\(PR=x\\), entonces \\(AP+PR=AR\\): \\(t+x=n\\).",
        "Por adición de segmentos, \\(AB+BC=AC\\). Así, \\(2t+12=2n\\).",
        "De esta igualdad se obtiene \\(n-t=6\\). Como \\(x=n-t\\), resulta \\(\\boxed{PR=6}\\)."
      ]
    },
    {
      "number": 2,
      "title": "Paralelas, igualdad de segmentos y bisectriz",
      "source": "UNMSM 2002",
      "question": "En el gráfico, \\(\\ell_1\\) y \\(\\ell_2\\) son paralelas, \\(m\\angle ABC=3m\\angle BAC\\), \\(AN=BN\\) y \\(\\overline{CM}\\) es bisectriz de \\(\\angle BCN\\). Halle x.",
      "figure": {
        "src": "assets/geometria-capitulo-01/resuelto-02.svg",
        "caption": "Dos paralelas, segmentos iguales y una bisectriz.",
        "alt": "A y B están en la paralela superior; C en la inferior. N pertenece a AC, AN es igual a NB y CM biseca BCN. ACT mide 25 grados y se pide el ángulo x en M.",
        "width": 600,
        "height": 420
      },
      "steps": [
        "Por alternos internos, \\(m\\angle BAC=m\\angle ACT=25^\\circ\\).",
        "Como \\(AN=NB\\), el triángulo ANB es isósceles. Por ello, el ángulo \\(\\beta=m\\angle ABN=25^\\circ\\).",
        "Del dato \\(m\\angle ABC=3m\\angle BAC\\), se obtiene \\(m\\angle ABC=75^\\circ\\).",
        "Sea \\(\\phi=m\\angle BCM=m\\angle MCN\\). Por ángulos conjugados: \\(75^\\circ+25^\\circ+2\\phi=180^\\circ\\), de donde \\(\\phi=40^\\circ\\).",
        "La relación de la quebrada da \\(x=(\\phi+25^\\circ)+\\beta\\). Luego \\(\\boxed{x=90^\\circ}\\)."
      ]
    },
    {
      "number": 3,
      "title": "Razón de longitudes en una recta",
      "source": "UNMSM 2005-I",
      "question": "Si M, N, P, Q y R son puntos consecutivos de una recta, de modo que \\(NQ+MP+PR=50\\) y \\(\\frac{NQ}{MR}=\\frac23\\), entonces NQ es:",
      "figure": {
        "src": "assets/geometria-capitulo-01/resuelto-03.svg",
        "caption": "Puntos consecutivos M, N, P, Q y R.",
        "alt": "NQ se representa con 2k y MR con 3k.",
        "width": 600,
        "height": 310
      },
      "steps": [
        "De la razón dada, representa \\(NQ=2k\\) y \\(MR=3k\\).",
        "Como P está entre M y R, \\(MP+PR=MR\\). El dato se transforma en \\(NQ+MR=50\\).",
        "Entonces \\(2k+3k=50\\), por lo que \\(k=10\\).",
        "Finalmente, \\(\\boxed{NQ=20}\\)."
      ]
    },
    {
      "number": 4,
      "title": "Relación angular entre paralelas",
      "source": "UNMSM 2010-II",
      "question": "En el gráfico, las rectas \\(\\ell_1\\) y \\(\\ell_2\\) son paralelas. Si \\(\\alpha+\\beta=5x\\), calcule x.",
      "figure": {
        "src": "assets/geometria-capitulo-01/resuelto-04.svg",
        "caption": "Ángulos entre dos rectas paralelas.",
        "alt": "Dos paralelas son cortadas por tres rectas. Se indican tres ángulos x y los ángulos alfa y beta.",
        "width": 600,
        "height": 440
      },
      "steps": [
        "Por ángulos opuestos por el vértice y por las paralelas se identifican los ángulos x y alfa del triángulo APB.",
        "En el triángulo APB: \\(2x+\\alpha=180^\\circ\\).",
        "En R, la relación con las paralelas da \\(2x+\\beta=180^\\circ\\).",
        "Sumando ambas igualdades: \\(4x+\\alpha+\\beta=360^\\circ\\).",
        "Con \\(\\alpha+\\beta=5x\\): \\(9x=360^\\circ\\). Por tanto, \\(\\boxed{x=40^\\circ}\\)."
      ]
    }
  ],
  "proposed": [
    {
      "number": 1,
      "level": "Básico",
      "prompt": "En una recta se ubican los puntos consecutivos A, B, C y D, tal que \\(\\frac{AB}{2}+BC+\\frac{CD}{2}=12\\). Luego se ubican los puntos medios M y N de \\(\\overline{AB}\\) y \\(\\overline{CD}\\), respectivamente. Calcule MN.",
      "options": [
        "\\(6\\)",
        "\\(8\\)",
        "\\(10\\)",
        "\\(12\\)",
        "\\(14\\)"
      ]
    },
    {
      "number": 2,
      "level": "Básico",
      "prompt": "En una recta se ubican los puntos consecutivos A, B, C y D, tal que \\(4(AB)=2(BC)=CD\\) y \\(AC<14\\). Calcule el máximo valor entero de BC.",
      "options": [
        "\\(8\\)",
        "\\(9\\)",
        "\\(10\\)",
        "\\(11\\)",
        "\\(12\\)"
      ]
    },
    {
      "number": 3,
      "level": "Básico",
      "prompt": "En una recta se ubican los puntos consecutivos A, B, C y D, tal que \\(3(AC)=2(BD)=24\\). Calcule CD si BC toma su máximo valor entero.",
      "options": [
        "\\(2\\)",
        "\\(3\\)",
        "\\(4\\)",
        "\\(5\\)",
        "\\(6\\)"
      ]
    },
    {
      "number": 4,
      "level": "Básico",
      "prompt": "En una recta se ubican los puntos consecutivos A, B, C, D, E y F, tal que \\(\\frac{AB}{2}=\\frac{BC}{3}=\\frac{CD}{4}=\\frac{DE}{5}=x\\), \\(EF=AD\\) y \\((BC)(DE)>5(DC)\\). Si x toma su mínimo valor entero, calcule BC.",
      "options": [
        "\\(5\\)",
        "\\(6\\)",
        "\\(7\\)",
        "\\(8\\)",
        "\\(4\\)"
      ]
    },
    {
      "number": 5,
      "level": "Básico",
      "prompt": "Sean los puntos colineales y consecutivos P, Q, R y T, de modo que \\(2(RT)=7(PR)\\) y \\(2(QT)-7(PQ)=270\\). Calcule QR.",
      "options": [
        "\\(30\\)",
        "\\(45\\)",
        "\\(36\\)",
        "\\(90\\)",
        "\\(27\\)"
      ]
    },
    {
      "number": 6,
      "level": "Básico",
      "prompt": "En \\(\\overline{ML}\\) y en su prolongación se ubican los puntos N y T, respectivamente, tal que \\(ML+NT=40\\). Si \\(7(NL)=3(MT)\\), calcule MT.",
      "options": [
        "\\(28\\)",
        "\\(24\\)",
        "\\(20\\)",
        "\\(12\\)",
        "\\(32\\)"
      ]
    },
    {
      "number": 7,
      "level": "Básico",
      "prompt": "En la prolongación de \\(\\overline{AB}\\) se ubica el punto C, tal que \\(\\frac{AC+BC}{5}=\\frac{AB}{3}\\). Calcule \\(\\frac{AB}{BC}\\).",
      "options": [
        "\\(\\frac52\\)",
        "\\(\\frac43\\)",
        "\\(8\\)",
        "\\(\\frac53\\)",
        "\\(3\\)"
      ]
    },
    {
      "number": 8,
      "level": "Básico",
      "prompt": "Se tienen los puntos colineales y consecutivos P, Q, R y T. Si M es punto medio de \\(\\overline{PT}\\), \\(PR=RM\\), \\(QR+MT=24\\) y \\(PQ=6\\), calcule PM.",
      "options": [
        "\\(30\\)",
        "\\(18\\)",
        "\\(12\\)",
        "\\(20\\)",
        "\\(15\\)"
      ]
    },
    {
      "number": 9,
      "level": "Básico",
      "prompt": "En una recta se ubican los puntos consecutivos P, Q y R; además M es punto medio de \\(\\overline{QR}\\). Calcule \\(\\frac{PQ+3(PM+QM)}{PM+PR}\\).",
      "options": [
        "\\(2\\)",
        "\\(3\\)",
        "\\(9\\)",
        "\\(4\\)",
        "\\(16\\)"
      ]
    },
    {
      "number": 10,
      "level": "Básico",
      "prompt": "En \\(\\overline{AD}\\) se ubica el punto C y en \\(\\overline{AC}\\) el punto B, tal que \\(\\frac{10}{AB}-\\frac{2}{AD}=\\frac{x}{AC}\\) y \\((AB)(CD)=5(AD)(BC)\\). Calcule x.",
      "options": [
        "\\(15\\)",
        "\\(10\\)",
        "\\(12\\)",
        "\\(25\\)",
        "\\(5\\)"
      ],
      "reviewNote": "El ejercicio se conserva como aparece en el PDF. Sus signos o alternativas requieren revisión antes de asignar una clave."
    },
    {
      "number": 11,
      "level": "Básico",
      "prompt": "En una recta se ubican los puntos colineales A, B y C, de modo que \\(\\frac{AC}{AB-BC}=5\\). Calcule \\(\\frac{AB}{AC-BC}\\).",
      "options": [
        "\\(\\frac45\\)",
        "\\(\\frac47\\)",
        "\\(\\frac57\\)",
        "\\(\\frac27\\)",
        "\\(\\frac37\\)"
      ],
      "reviewNote": "El ejercicio se conserva como aparece en el PDF. Sus signos o alternativas requieren revisión antes de asignar una clave."
    },
    {
      "number": 12,
      "level": "Básico",
      "prompt": "En una recta se consideran los puntos consecutivos A, B, C, D, E y F, tal que \\(AB=EF\\), \\(BC=DE\\) y \\(CD=3(EF)\\). Si \\(CE=2(AB+DE)\\) y \\(AF=14\\), calcule BD.",
      "options": [
        "\\(4\\)",
        "\\(6\\)",
        "\\(8\\)",
        "\\(9\\)",
        "\\(10\\)"
      ]
    },
    {
      "number": 13,
      "level": "Básico",
      "prompt": "En una recta se ubican los puntos consecutivos A, B, C, D, E y F, tal que \\(AB=\\frac{BC}{2}=\\frac{CD}{3}=\\frac{DE}{4}=\\frac{EF}{5}\\) y \\((AB)(BC)=CF-AD\\). Calcule \\(AB+DF\\).",
      "options": [
        "\\(20\\)",
        "\\(60\\)",
        "\\(30\\)",
        "\\(35\\)",
        "\\(40\\)"
      ]
    },
    {
      "number": 14,
      "level": "Básico",
      "prompt": "En una recta se ubican los puntos consecutivos A, B, C, D y E, tal que \\(6(AC)=3(BD)=2(CE)\\) y \\(DE=3(AB)\\). Calcule \\(\\frac{AD}{CD}\\).",
      "options": [
        "\\(2\\)",
        "\\(\\frac43\\)",
        "\\(\\frac52\\)",
        "\\(\\frac32\\)",
        "\\(\\frac53\\)"
      ]
    },
    {
      "number": 15,
      "level": "Básico",
      "prompt": "En una recta se ubican los puntos consecutivos A, B, C, D, E, F y G, tal que \\(AC=\\frac{BD}{2}=\\frac{CE}{3}=\\frac{DF}{4}\\), \\(5(EF)=9(CD)\\) y \\(BF=48\\text{ cm}\\). Calcule DA.",
      "options": [
        "\\(16\\text{ cm}\\)",
        "\\(12\\text{ cm}\\)",
        "\\(18\\text{ cm}\\)",
        "\\(14\\text{ cm}\\)",
        "\\(15\\text{ cm}\\)"
      ]
    },
    {
      "number": 16,
      "level": "Básico",
      "prompt": "Se tienen los ángulos adyacentes AOB y BOC, tal que \\(3m\\angle AOB=2m\\angle BOC\\). Luego se traza la bisectriz \\(\\overrightarrow{OM}\\) de \\(\\angle AOB\\) y \\(m\\angle MOC>m\\angle AOC-20^\\circ\\). Calcule el máximo valor entero de \\(m\\angle AOB\\).",
      "options": [
        "\\(38^\\circ\\)",
        "\\(39^\\circ\\)",
        "\\(40^\\circ\\)",
        "\\(41^\\circ\\)",
        "\\(42^\\circ\\)"
      ]
    },
    {
      "number": 17,
      "level": "Básico",
      "prompt": "Del gráfico, \\(m\\angle AOC=m\\angle BOD\\) y \\(m\\angle COD>m\\angle BOC\\). Calcule el máximo valor entero de \\(m\\angle BOC\\).",
      "options": [
        "\\(61^\\circ\\)",
        "\\(60^\\circ\\)",
        "\\(59^\\circ\\)",
        "\\(58^\\circ\\)",
        "\\(46^\\circ\\)"
      ],
      "figure": {
        "src": "assets/geometria-capitulo-01/propuesto-17.svg",
        "caption": "A, O y D son colineales.",
        "alt": "Sobre el ángulo llano AOD están los rayos OB y OC, en ese orden.",
        "width": 600,
        "height": 330
      }
    },
    {
      "number": 18,
      "level": "Intermedio",
      "prompt": "Se tienen los ángulos adyacentes AOB y BOC. Luego se traza la bisectriz \\(\\overrightarrow{OL}\\) de \\(\\angle AOC\\), tal que \\(5m\\angle BOA=3m\\angle COB\\) y \\((m\\angle AOB)(m\\angle BOC)=30(m\\angle LOB)\\). Calcule \\(m\\angle AOL\\).",
      "options": [
        "\\(2^\\circ\\)",
        "\\(3^\\circ\\)",
        "\\(4^\\circ\\)",
        "\\(6^\\circ\\)",
        "\\(8^\\circ\\)"
      ]
    },
    {
      "number": 19,
      "level": "Intermedio",
      "prompt": "Se tienen los ángulos consecutivos AOB, BOC, COD y DOE, tal que \\(m\\angle AOB=\\frac{m\\angle BOC}{3}=\\frac{m\\angle COD}{5}=\\frac{m\\angle DOE}{7}\\). Luego se trazan las bisectrices \\(\\overrightarrow{OL}\\) y \\(\\overrightarrow{OS}\\) de los ángulos BOC y COD, respectivamente, tal que \\(\\angle LOS\\) es agudo y \\(m\\angle AOB\\) toma su máximo valor entero. Calcule \\(m\\angle DOE\\).",
      "options": [
        "\\(147^\\circ\\)",
        "\\(151^\\circ\\)",
        "\\(154^\\circ\\)",
        "\\(157^\\circ\\)",
        "\\(160^\\circ\\)"
      ]
    },
    {
      "number": 20,
      "level": "Intermedio",
      "prompt": "Se tienen los ángulos adyacentes POQ y QOR, tal que la diferencia entre sus medidas angulares es 48°. Se traza \\(\\overrightarrow{OM}\\), bisectriz de \\(\\angle POR\\). Calcule \\(m\\angle MOQ\\).",
      "options": [
        "\\(24^\\circ\\)",
        "\\(42^\\circ\\)",
        "\\(16^\\circ\\)",
        "\\(21^\\circ\\)",
        "\\(12^\\circ\\)"
      ]
    },
    {
      "number": 21,
      "level": "Intermedio",
      "prompt": "En un ángulo se cumple que la mitad del suplemento de su medida menos su complemento es igual al complemento del doble de su medida. Calcule dicha medida.",
      "options": [
        "\\(60^\\circ\\)",
        "\\(30^\\circ\\)",
        "\\(36^\\circ\\)",
        "\\(15^\\circ\\)",
        "\\(25^\\circ\\)"
      ]
    },
    {
      "number": 22,
      "level": "Intermedio",
      "prompt": "Se tienen los ángulos consecutivos AOB, BOC y COD, tal que la suma de sus medidas es equivalente a dos ángulos rectos. Las bisectrices de AOB y COD determinan un ángulo cuya medida es 140°. Calcule \\(m\\angle BOC\\).",
      "options": [
        "\\(40^\\circ\\)",
        "\\(100^\\circ\\)",
        "\\(50^\\circ\\)",
        "\\(70^\\circ\\)",
        "\\(20^\\circ\\)"
      ]
    },
    {
      "number": 23,
      "level": "Intermedio",
      "prompt": "Se tienen los ángulos consecutivos AOB, BOC y COD, tal que \\(\\angle AOD\\) es recto. Si la suma del complemento de la medida de \\(\\angle AOB\\) y el suplemento de la medida de \\(\\angle COD\\) es 240°, calcule \\(m\\angle BOC\\).",
      "options": [
        "\\(30^\\circ\\)",
        "\\(60^\\circ\\)",
        "\\(45^\\circ\\)",
        "\\(15^\\circ\\)",
        "\\(90^\\circ\\)"
      ]
    },
    {
      "number": 24,
      "level": "Intermedio",
      "prompt": "Se tienen los ángulos consecutivos AOB, BOC, COD y DOE, tal que A, O y D son colineales y los ángulos BOD y DOE son suplementarios. Si \\(\\angle COD\\) es recto y \\(m\\angle COE=10m\\angle AOB\\), calcule \\(m\\angle AOE\\).",
      "options": [
        "\\(170^\\circ\\)",
        "\\(150^\\circ\\)",
        "\\(110^\\circ\\)",
        "\\(130^\\circ\\)",
        "\\(120^\\circ\\)"
      ]
    },
    {
      "number": 25,
      "level": "Intermedio",
      "prompt": "En un ángulo se cumple que la diferencia entre el suplemento y el complemento de su medida es igual al quíntuplo de su medida. Calcule dicha medida.",
      "options": [
        "\\(10^\\circ\\)",
        "\\(12^\\circ\\)",
        "\\(20^\\circ\\)",
        "\\(14^\\circ\\)",
        "\\(18^\\circ\\)"
      ]
    },
    {
      "number": 26,
      "level": "Intermedio",
      "prompt": "Del gráfico, \\(\\alpha+\\beta=150^\\circ\\) y \\(m\\angle AOD=110^\\circ\\). Calcule \\(m\\angle BOC\\).",
      "options": [
        "\\(45^\\circ\\)",
        "\\(40^\\circ\\)",
        "\\(50^\\circ\\)",
        "\\(55^\\circ\\)",
        "\\(60^\\circ\\)"
      ],
      "figure": {
        "src": "assets/geometria-capitulo-01/propuesto-26.svg",
        "caption": "Dos aberturas que se superponen.",
        "alt": "Los rayos OA, OB, OC y OD están en ese orden. Alfa mide AOC y beta mide BOD.",
        "width": 600,
        "height": 400
      }
    },
    {
      "number": 27,
      "level": "Intermedio",
      "prompt": "Se tienen los ángulos consecutivos AOB, BOC y COD, tal que A, O y C son colineales y \\(\\angle BOD\\) es recto. Se trazan \\(\\overrightarrow{OM}\\) y \\(\\overrightarrow{ON}\\), bisectrices de AOB y COD, respectivamente. Calcule \\(m\\angle MON\\).",
      "options": [
        "\\(115^\\circ\\)",
        "\\(120^\\circ\\)",
        "\\(135^\\circ\\)",
        "\\(125^\\circ\\)",
        "\\(110^\\circ\\)"
      ]
    },
    {
      "number": 28,
      "level": "Intermedio",
      "prompt": "Se tienen los ángulos consecutivos AOB, BOC y COD, tal que \\(m\\angle AOB=\\frac{m\\angle BOC}{2}=\\frac{m\\angle COD}{3}\\). Además, \\(m\\angle AOD=m\\angle AOB+m\\angle COD+50^\\circ\\). Calcule \\(m\\angle AOD\\).",
      "options": [
        "\\(140^\\circ\\)",
        "\\(150^\\circ\\)",
        "\\(130^\\circ\\)",
        "\\(135^\\circ\\)",
        "\\(120^\\circ\\)"
      ]
    },
    {
      "number": 29,
      "level": "Intermedio",
      "prompt": "En el gráfico mostrado, \\(\\overrightarrow{OF}\\) es bisectriz de \\(\\angle EOG\\), \\(\\overrightarrow{OC}\\) es bisectriz de \\(\\angle AOF\\) y \\(\\overrightarrow{OD}\\) es bisectriz de \\(\\angle BOG\\). Calcule \\(m\\angle COD\\).",
      "options": [
        "\\(37^\\circ\\)",
        "\\(60^\\circ\\)",
        "\\(25^\\circ\\)",
        "\\(45^\\circ\\)",
        "\\(30^\\circ\\)"
      ],
      "figure": {
        "src": "assets/geometria-capitulo-01/propuesto-29.svg",
        "caption": "Bisectrices y un ángulo recto.",
        "alt": "A, O y G son colineales. Se representan los rayos OB, OC, OD, OE y OF. BOF es recto.",
        "width": 600,
        "height": 410
      }
    },
    {
      "number": 30,
      "level": "Intermedio",
      "prompt": "Del gráfico, \\(\\ell_1\\parallel\\ell_2\\) y \\(\\alpha+\\beta+\\theta<48^\\circ\\). Calcule el máximo valor entero de x.",
      "options": [
        "\\(10^\\circ\\)",
        "\\(11^\\circ\\)",
        "\\(12^\\circ\\)",
        "\\(13^\\circ\\)",
        "\\(14^\\circ\\)"
      ],
      "figure": {
        "src": "assets/geometria-capitulo-01/propuesto-30.svg",
        "caption": "Línea quebrada entre paralelas.",
        "alt": "En las dos paralelas se indican 60 grados y 5x. En los seis vértices de la quebrada alternan x, alfa, x, beta, x y theta.",
        "width": 600,
        "height": 600
      }
    },
    {
      "number": 31,
      "level": "Intermedio",
      "prompt": "Del gráfico, \\(\\ell_1\\parallel\\ell_2\\). Si \\(ML=10\\), calcule LE.",
      "options": [
        "\\(6\\)",
        "\\(8\\)",
        "\\(5\\)",
        "\\(4\\)",
        "\\(3\\)"
      ],
      "figure": {
        "src": "assets/geometria-capitulo-01/propuesto-31.svg",
        "caption": "Una quebrada y una perpendicular.",
        "alt": "Dos paralelas, ángulos de 120 y 20 grados, un ángulo 3x, otro de 40 grados y el ángulo x en M. E es el pie de la perpendicular desde L a la recta inferior oblicua.",
        "width": 600,
        "height": 480
      }
    },
    {
      "number": 32,
      "level": "Intermedio",
      "prompt": "Del gráfico, \\(\\alpha+\\theta=48^\\circ\\), \\(m\\angle MON>m\\angle LO_1S\\) y \\(m\\angle AO_1B=60^\\circ\\). Calcule el mínimo valor entero de theta.",
      "options": [
        "\\(15^\\circ\\)",
        "\\(16^\\circ\\)",
        "\\(17^\\circ\\)",
        "\\(18^\\circ\\)",
        "\\(19^\\circ\\)"
      ],
      "figure": {
        "src": "assets/geometria-capitulo-01/propuesto-32.svg",
        "caption": "Comparación de dos aberturas.",
        "alt": "En O hay un ángulo recto cuyos extremos tienen dos ángulos alfa. En O uno hay un ángulo de 60 grados cuyos extremos tienen dos ángulos theta.",
        "width": 600,
        "height": 440
      }
    },
    {
      "number": 33,
      "level": "Intermedio",
      "prompt": "Si la suma del doble del suplemento del doble de un ángulo y el complemento del mismo ángulo es igual a la suma del suplemento del doble de ese ángulo y el doble del complemento de la mitad de dicho ángulo, calcule el complemento de dicho ángulo.",
      "options": [
        "\\(60^\\circ\\)",
        "\\(45^\\circ\\)",
        "\\(53^\\circ\\)",
        "\\(30^\\circ\\)",
        "\\(90^\\circ\\)"
      ]
    },
    {
      "number": 34,
      "level": "Intermedio",
      "prompt": "Del gráfico, \\(\\angle AOB\\) es recto, \\(\\theta>\\alpha\\) y theta toma su mínimo valor entero. Calcule el complemento de theta.",
      "options": [
        "\\(64^\\circ\\)",
        "\\(66^\\circ\\)",
        "\\(67^\\circ\\)",
        "\\(68^\\circ\\)",
        "\\(70^\\circ\\)"
      ],
      "figure": {
        "src": "assets/geometria-capitulo-01/propuesto-34.svg",
        "caption": "El ángulo AOB es recto.",
        "alt": "El ángulo recto se divide, en orden, en theta, alfa, theta y alfa.",
        "width": 600,
        "height": 380
      }
    },
    {
      "number": 35,
      "level": "Intermedio",
      "prompt": "Del gráfico, \\(\\ell_1\\parallel\\ell_2\\) y \\(x>y\\). Indique la relación correcta.",
      "options": [
        "\\(\\theta=\\alpha\\)",
        "\\(\\alpha>\\theta\\)",
        "\\(\\theta>\\alpha\\)",
        "\\(\\alpha\\ge\\theta\\)",
        "\\(\\theta\\ge\\alpha\\)"
      ],
      "figure": {
        "src": "assets/geometria-capitulo-01/propuesto-35.svg",
        "caption": "Dos quebradas entre las mismas paralelas.",
        "alt": "En la quebrada izquierda aparecen theta, x y dos alfa. En la derecha aparecen alfa, y y dos theta.",
        "width": 600,
        "height": 420
      }
    }
  ],
  "inlineFigures": {
    "measure": {
      "src": "assets/geometria-capitulo-01/medida-angular.svg",
      "caption": "Ángulos agudo, recto y obtuso.",
      "alt": "Un ángulo de 45 grados es agudo; uno de 90 grados es recto; uno de 125 grados es obtuso.",
      "width": 600,
      "height": 530
    },
    "position": {
      "src": "assets/geometria-capitulo-01/posicion.svg",
      "caption": "Relaciones según la posición de los lados.",
      "alt": "Ángulos adyacentes comparten un lado; tres consecutivos forman una abertura total; dos rectas secantes forman ángulos opuestos iguales.",
      "width": 600,
      "height": 640
    }
  }
};
