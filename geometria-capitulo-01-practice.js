'use strict';
window.CHAPTER_PRACTICES=window.CHAPTER_PRACTICES||{};
window.CHAPTER_PRACTICES['geometria-capitulo-01']={
  "version": 1,
  "problems": [
    {
      "id": "geo01-p01",
      "sourceNumber": 1,
      "topic": "Propuesto 1 · Básico",
      "prompt": "En una recta se ubican los puntos consecutivos A, B, C y D, tal que \\(\\frac{AB}{2}+BC+\\frac{CD}{2}=12\\). Luego se ubican los puntos medios M y N de \\(\\overline{AB}\\) y \\(\\overline{CD}\\), respectivamente. Calcule MN.",
      "options": [
        "\\(6\\)",
        "\\(8\\)",
        "\\(10\\)",
        "\\(12\\)",
        "\\(14\\)"
      ],
      "answer": 3,
      "solution": "<p>MN=MB+BC+CN=AB/2+BC+CD/2. Por el dato, MN=12.</p>"
    },
    {
      "id": "geo01-p02",
      "sourceNumber": 5,
      "topic": "Propuesto 5 · Básico",
      "prompt": "Sean los puntos colineales y consecutivos P, Q, R y T, de modo que \\(2(RT)=7(PR)\\) y \\(2(QT)-7(PQ)=270\\). Calcule QR.",
      "options": [
        "\\(30\\)",
        "\\(45\\)",
        "\\(36\\)",
        "\\(90\\)",
        "\\(27\\)"
      ],
      "answer": 0,
      "solution": "<p>Sea PQ=a, QR=b y RT=c. De 2c=7(a+b), y 2(b+c)-7a=270, resulta 9b=270. Por tanto, QR=30.</p>"
    },
    {
      "id": "geo01-p03",
      "sourceNumber": 8,
      "topic": "Propuesto 8 · Básico",
      "prompt": "Se tienen los puntos colineales y consecutivos P, Q, R y T. Si M es punto medio de \\(\\overline{PT}\\), \\(PR=RM\\), \\(QR+MT=24\\) y \\(PQ=6\\), calcule PM.",
      "options": [
        "\\(30\\)",
        "\\(18\\)",
        "\\(12\\)",
        "\\(20\\)",
        "\\(15\\)"
      ],
      "answer": 3,
      "solution": "<p>Si PR=RM=t, entonces PM=2t. Como M es punto medio de PT, MT=2t. Además QR=PR-PQ=t-6. Luego (t-6)+2t=24, de donde t=10 y PM=20.</p>"
    },
    {
      "id": "geo01-p04",
      "sourceNumber": 12,
      "topic": "Propuesto 12 · Básico",
      "prompt": "En una recta se consideran los puntos consecutivos A, B, C, D, E y F, tal que \\(AB=EF\\), \\(BC=DE\\) y \\(CD=3(EF)\\). Si \\(CE=2(AB+DE)\\) y \\(AF=14\\), calcule BD.",
      "options": [
        "\\(4\\)",
        "\\(6\\)",
        "\\(8\\)",
        "\\(9\\)",
        "\\(10\\)"
      ],
      "answer": 2,
      "solution": "<p>Sea AB=EF=a y BC=DE=b; CD=3a. De CE=2(AB+DE), se obtiene 3a+b=2a+2b, por tanto a=b. AF=7a=14, de modo que a=2. BD=b+3a=8.</p>"
    },
    {
      "id": "geo01-p05",
      "sourceNumber": 14,
      "topic": "Propuesto 14 · Básico",
      "prompt": "En una recta se ubican los puntos consecutivos A, B, C, D y E, tal que \\(6(AC)=3(BD)=2(CE)\\) y \\(DE=3(AB)\\). Calcule \\(\\frac{AD}{CD}\\).",
      "options": [
        "\\(2\\)",
        "\\(\\frac43\\)",
        "\\(\\frac52\\)",
        "\\(\\frac32\\)",
        "\\(\\frac53\\)"
      ],
      "answer": 4,
      "solution": "<p>Sea AB=a, BC=b, CD=c y DE=3a. Como BD=2AC, c=2a+b. Como CE=3AC, c+3a=3a+3b. De ambas relaciones se obtiene a=b y c=3a. Así, AD/CD=(a+b+c)/c=5/3.</p>"
    },
    {
      "id": "geo01-p06",
      "sourceNumber": 17,
      "topic": "Propuesto 17 · Básico",
      "prompt": "Del gráfico, \\(m\\angle AOC=m\\angle BOD\\) y \\(m\\angle COD>m\\angle BOC\\). Calcule el máximo valor entero de \\(m\\angle BOC\\).",
      "options": [
        "\\(61^\\circ\\)",
        "\\(60^\\circ\\)",
        "\\(59^\\circ\\)",
        "\\(58^\\circ\\)",
        "\\(46^\\circ\\)"
      ],
      "answer": 2,
      "solution": "<p>Sea a=m∠AOB, b=m∠BOC y c=m∠COD. Del dato a+b=b+c, a=c. Además 2c+b=180° y c>b. Entonces 3b<180°, es decir, b<60°. Su máximo valor entero es 59°.</p>",
      "figure": {
        "src": "assets/geometria-capitulo-01/propuesto-17.svg",
        "caption": "A, O y D son colineales.",
        "alt": "Sobre el ángulo llano AOD están los rayos OB y OC, en ese orden.",
        "width": 600,
        "height": 330
      }
    },
    {
      "id": "geo01-p07",
      "sourceNumber": 20,
      "topic": "Propuesto 20 · Intermedio",
      "prompt": "Se tienen los ángulos adyacentes POQ y QOR, tal que la diferencia entre sus medidas angulares es 48°. Se traza \\(\\overrightarrow{OM}\\), bisectriz de \\(\\angle POR\\). Calcule \\(m\\angle MOQ\\).",
      "options": [
        "\\(24^\\circ\\)",
        "\\(42^\\circ\\)",
        "\\(16^\\circ\\)",
        "\\(21^\\circ\\)",
        "\\(12^\\circ\\)"
      ],
      "answer": 0,
      "solution": "<p>Sea a=m∠POQ y b=m∠QOR. La bisectriz OM divide el ángulo total en (a+b)/2. La distancia angular de OQ a OM es |a-b|/2=48°/2=24°.</p>"
    },
    {
      "id": "geo01-p08",
      "sourceNumber": 22,
      "topic": "Propuesto 22 · Intermedio",
      "prompt": "Se tienen los ángulos consecutivos AOB, BOC y COD, tal que la suma de sus medidas es equivalente a dos ángulos rectos. Las bisectrices de AOB y COD determinan un ángulo cuya medida es 140°. Calcule \\(m\\angle BOC\\).",
      "options": [
        "\\(40^\\circ\\)",
        "\\(100^\\circ\\)",
        "\\(50^\\circ\\)",
        "\\(70^\\circ\\)",
        "\\(20^\\circ\\)"
      ],
      "answer": 1,
      "solution": "<p>Si las tres medidas son a, b y c, a+b+c=180°. El ángulo entre las bisectrices extremas es a/2+b+c/2=140°. Sustituyendo a+c=180°-b: 90°+b/2=140°, por lo que b=100°.</p>"
    },
    {
      "id": "geo01-p09",
      "sourceNumber": 28,
      "topic": "Propuesto 28 · Intermedio",
      "prompt": "Se tienen los ángulos consecutivos AOB, BOC y COD, tal que \\(m\\angle AOB=\\frac{m\\angle BOC}{2}=\\frac{m\\angle COD}{3}\\). Además, \\(m\\angle AOD=m\\angle AOB+m\\angle COD+50^\\circ\\). Calcule \\(m\\angle AOD\\).",
      "options": [
        "\\(140^\\circ\\)",
        "\\(150^\\circ\\)",
        "\\(130^\\circ\\)",
        "\\(135^\\circ\\)",
        "\\(120^\\circ\\)"
      ],
      "answer": 1,
      "solution": "<p>Sea m∠AOB=k. Entonces m∠BOC=2k y m∠COD=3k; el total es 6k. El segundo dato indica 6k=k+3k+50°, de donde k=25°. Por tanto, m∠AOD=150°.</p>"
    },
    {
      "id": "geo01-p10",
      "sourceNumber": 34,
      "topic": "Propuesto 34 · Intermedio",
      "prompt": "Del gráfico, \\(\\angle AOB\\) es recto, \\(\\theta>\\alpha\\) y theta toma su mínimo valor entero. Calcule el complemento de theta.",
      "options": [
        "\\(64^\\circ\\)",
        "\\(66^\\circ\\)",
        "\\(67^\\circ\\)",
        "\\(68^\\circ\\)",
        "\\(70^\\circ\\)"
      ],
      "answer": 2,
      "solution": "<p>El ángulo recto contiene dos ángulos theta y dos alfa: 2θ+2α=90°, de modo que θ+α=45°. Como θ>α, θ>22,5°. Su mínimo valor entero es 23° y su complemento es 90°-23°=67°.</p>",
      "figure": {
        "src": "assets/geometria-capitulo-01/propuesto-34.svg",
        "caption": "El ángulo AOB es recto.",
        "alt": "El ángulo recto se divide, en orden, en theta, alfa, theta y alfa.",
        "width": 600,
        "height": 380
      }
    }
  ]
};
