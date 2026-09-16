window.DIMENSIONAL_CONTENT={
  "title": "Análisis dimensional",
  "lessons": [
    {
      "title": "Magnitudes y unidades",
      "subtitle": "¿Qué medimos y con qué lo expresamos?",
      "goal": "Distingue una magnitud, su valor numérico y su unidad; reconoce las siete magnitudes base del SI.",
      "body": "<p>Una <strong>magnitud física</strong> es una propiedad que puede expresarse mediante un número y una referencia de medida. Al escribir \\(\\ell=2\\,\\mathrm m\\), la magnitud es la longitud, el valor numérico es 2 y la unidad es el metro.</p><p>El Sistema Internacional (SI) usa siete magnitudes base. A partir de ellas construimos magnitudes derivadas, como rapidez, fuerza y energía.</p><div class=\"table-scroll\"><table><thead><tr><th>Magnitud base</th><th>Dimensión</th><th>Unidad SI</th><th>Símbolo</th></tr></thead><tbody><tr><td>Longitud</td><td>\\(L\\)</td><td>metro</td><td>m</td></tr><tr><td>Masa</td><td>\\(M\\)</td><td>kilogramo</td><td>kg</td></tr><tr><td>Tiempo</td><td>\\(T\\)</td><td>segundo</td><td>s</td></tr><tr><td>Corriente eléctrica</td><td>\\(I\\)</td><td>amperio</td><td>A</td></tr><tr><td>Temperatura termodinámica</td><td>\\(\\Theta\\)</td><td>kelvin</td><td>K</td></tr><tr><td>Cantidad de sustancia</td><td>\\(N\\)</td><td>mol</td><td>mol</td></tr><tr><td>Intensidad luminosa</td><td>\\(J\\)</td><td>candela</td><td>cd</td></tr></tbody></table></div><p>En mecánica trabajaremos principalmente con masa, longitud y tiempo: \\(M,\\ L,\\ T\\). Los símbolos de unidad no se pluralizan: escribe 5 kg, no «5 kgs». El símbolo J de una dimensión luminosa se distingue por el contexto de J como unidad joule.</p>",
      "key": "Una unidad puede cambiar sin que cambie la magnitud: 2 m y 200 cm describen la misma longitud.",
      "examples": [
        {
          "title": "Convertir una rapidez",
          "question": "Expresa \\(72\\,\\mathrm{km/h}\\) en m/s.",
          "steps": [
            "Usa equivalencias: \\(1\\,\\mathrm{km}=1000\\,\\mathrm m\\) y \\(1\\,\\mathrm h=3600\\,\\mathrm s\\).",
            "<div class=\"equation\">\\[72\\,\\frac{\\mathrm{km}}{\\mathrm h}\\cdot\\frac{1000\\,\\mathrm m}{1\\,\\mathrm{km}}\\cdot\\frac{1\\,\\mathrm h}{3600\\,\\mathrm s}=20\\,\\mathrm{m/s}\\]</div>",
            "Cambian el número y la unidad; la dimensión sigue siendo \\(LT^{-1}\\)."
          ]
        }
      ],
      "quiz": [
        {
          "id": "u1a",
          "prompt": "¿Cuál es una magnitud base del SI?",
          "options": [
            "Fuerza",
            "Energía",
            "Masa",
            "Rapidez",
            "Presión"
          ],
          "answer": 2,
          "solution": "La masa es base y su unidad es el kilogramo. Las demás se obtienen combinando magnitudes base.",
          "level": "Básico"
        },
        {
          "id": "u1b",
          "prompt": "En la medida \\(\\ell=5\\,\\mathrm m\\), ¿qué representa «m»?",
          "options": [
            "La dimensión de masa",
            "La unidad metro",
            "El valor numérico",
            "La magnitud tiempo",
            "La unidad kilogramo"
          ],
          "answer": 1,
          "solution": "El símbolo m representa el metro; la dimensión de longitud se escribe \\(L\\).",
          "level": "Básico"
        }
      ]
    },
    {
      "title": "Fórmulas dimensionales",
      "subtitle": "El significado de M, L y T",
      "goal": "Obtén la dimensión de una magnitud derivada a partir de una relación física conocida.",
      "body": "<p>Escribimos \\([Q]\\) para indicar la dimensión de una magnitud \\(Q\\). En mecánica, la forma general es \\([Q]=M^aL^bT^c\\). Los exponentes pueden ser positivos, negativos, fraccionarios o cero.</p><div class=\"equation\">\\[[v]=\\frac{[d]}{[t]}=\\frac{L}{T}=LT^{-1}\\]</div><p>Una dimensión describe la dependencia respecto a las magnitudes base. La unidad indica cómo medimos: m/s y km/h son unidades distintas de una misma dimensión.</p><div class=\"table-scroll\"><table><thead><tr><th>Magnitud</th><th>Relación utilizada</th><th>Dimensión</th><th>Unidad SI</th></tr></thead><tbody><tr><td>Área</td><td>\\(A=ab\\)</td><td>\\(L^2\\)</td><td>m²</td></tr><tr><td>Volumen</td><td>\\(V=abc\\)</td><td>\\(L^3\\)</td><td>m³</td></tr><tr><td>Rapidez</td><td>\\(v=d/t\\)</td><td>\\(LT^{-1}\\)</td><td>m/s</td></tr><tr><td>Aceleración</td><td>\\(a=\\Delta v/\\Delta t\\)</td><td>\\(LT^{-2}\\)</td><td>m/s²</td></tr><tr><td>Densidad</td><td>\\(\\rho=m/V\\)</td><td>\\(ML^{-3}\\)</td><td>kg/m³</td></tr><tr><td>Fuerza</td><td>\\(F=ma\\)</td><td>\\(MLT^{-2}\\)</td><td>N</td></tr><tr><td>Trabajo y energía</td><td>\\(W=Fd\\)</td><td>\\(ML^2T^{-2}\\)</td><td>J</td></tr><tr><td>Potencia</td><td>\\(\\mathcal P=W/t\\)</td><td>\\(ML^2T^{-3}\\)</td><td>W</td></tr><tr><td>Presión</td><td>\\(p=F/A\\)</td><td>\\(ML^{-1}T^{-2}\\)</td><td>Pa</td></tr><tr><td>Cantidad de movimiento</td><td>\\(p_{\\!m}=mv\\)</td><td>\\(MLT^{-1}\\)</td><td>kg·m/s</td></tr><tr><td>Frecuencia</td><td>\\(f=1/\\tau\\)</td><td>\\(T^{-1}\\)</td><td>Hz</td></tr><tr><td>Constante elástica</td><td>\\(k=F/x\\)</td><td>\\(MT^{-2}\\)</td><td>N/m</td></tr></tbody></table></div><p>En la relación de trabajo \\(W=Fd\\) se considera fuerza constante paralela al desplazamiento. El símbolo \\(\\tau\\) representa un período; reservamos \\(T\\) para la dimensión de tiempo.</p>",
      "key": "No memorices la tabla sin entenderla: reconstruye cada dimensión con una fórmula física conocida.",
      "examples": [
        {
          "title": "Dimensión de la presión",
          "question": "Si \\(p=F/A\\), determina \\([p]\\).",
          "steps": [
            "La fuerza cumple \\([F]=[m][a]=MLT^{-2}\\).",
            "El área tiene dimensión \\([A]=L^2\\).",
            "<div class=\"equation\">\\[[p]=\\frac{MLT^{-2}}{L^2}=ML^{-1}T^{-2}\\]</div>"
          ]
        }
      ],
      "quiz": [
        {
          "id": "u2a",
          "prompt": "¿Cuál es la dimensión de la aceleración?",
          "options": [
            "\\(LT^{-1}\\)",
            "\\(L^2T^{-2}\\)",
            "\\(MT^{-2}\\)",
            "\\(LT^{-2}\\)",
            "\\(T^{-2}\\)"
          ],
          "answer": 3,
          "solution": "<div class=\"equation\">\\[[a]=\\frac{[\\Delta v]}{[\\Delta t]}=\\frac{LT^{-1}}{T}=LT^{-2}\\]</div>",
          "level": "Básico"
        },
        {
          "id": "u2b",
          "prompt": "Si \\(\\rho=m/V\\), la dimensión de la densidad es:",
          "options": [
            "\\(ML^{-3}\\)",
            "\\(ML^3\\)",
            "\\(M^{-1}L^3\\)",
            "\\(ML^{-2}\\)",
            "\\(L^{-3}\\)"
          ],
          "answer": 0,
          "solution": "<div class=\"equation\">\\[[\\rho]=\\frac{M}{L^3}=ML^{-3}\\]</div>",
          "level": "Básico"
        }
      ]
    },
    {
      "title": "Álgebra dimensional",
      "subtitle": "Productos, cocientes y potencias",
      "goal": "Opera con dimensiones y reconoce cantidades de dimensión uno.",
      "body": "<p>Las dimensiones obedecen las reglas de exponentes. Al multiplicar se suman exponentes; al dividir se restan; al elevar a una potencia se multiplican por ella.</p><div class=\"equation\">\\[[AB]=[A][B]\\qquad [A/B]=\\frac{[A]}{[B]}\\qquad [A^n]=[A]^n\\]</div><p>Los factores numéricos puros, como 2, \\(\\pi\\) y 1/2, tienen dimensión uno. Una constante física, en cambio, puede tener dimensiones: por ejemplo, la constante de gravitación \\(G\\).</p><div class=\"equation\">\\[[2]=[\\pi]=1\\qquad \\left[\\frac{v_1}{v_2}\\right]=1\\]</div><p>Una cantidad es <strong>adimensional</strong> si todas sus potencias dimensionales se anulan: \\(M^0L^0T^0=1\\). Esto no significa que su valor numérico deba ser 1. Por ejemplo, el cociente entre dos longitudes puede valer 3.</p>",
      "key": "Adimensional significa dimensión uno, no «dimensión cero» ni «valor numérico uno».",
      "examples": [
        {
          "title": "Simplificar una expresión",
          "question": "Halla la dimensión de \\(Q=Fv/t\\), con fuerza \\(F\\), rapidez \\(v\\) y tiempo \\(t\\).",
          "steps": [
            "Sustituye cada magnitud por su dimensión.",
            "<div class=\"equation\">\\[[Q]=\\frac{(MLT^{-2})(LT^{-1})}{T}\\]</div>",
            "Suma y resta exponentes de la misma base: \\([Q]=ML^2T^{-4}\\)."
          ]
        }
      ],
      "quiz": [
        {
          "id": "u3a",
          "prompt": "Si \\(Q=Fv\\), ¿cuál es \\([Q]\\)?",
          "options": [
            "\\(MLT^{-3}\\)",
            "\\(ML^2T^{-2}\\)",
            "\\(ML^2T^{-3}\\)",
            "\\(M^2LT^{-2}\\)",
            "\\(LT^{-1}\\)"
          ],
          "answer": 2,
          "solution": "<div class=\"equation\">\\[[Q]=(MLT^{-2})(LT^{-1})=ML^2T^{-3}\\]</div>",
          "level": "Básico"
        },
        {
          "id": "u3b",
          "prompt": "Si \\(r_1\\) y \\(r_2\\) son longitudes no nulas, ¿cuál es la dimensión de \\(r_1/r_2\\)?",
          "options": [
            "\\(L\\)",
            "\\(L^2\\)",
            "\\(L^{-1}\\)",
            "\\(0\\)",
            "\\(1\\)"
          ],
          "answer": 4,
          "solution": "<div class=\"equation\">\\[[r_1/r_2]=L/L=L^0=1\\]</div>",
          "level": "Básico"
        }
      ]
    },
    {
      "title": "Homogeneidad dimensional",
      "subtitle": "Una condición que toda ecuación debe cumplir",
      "goal": "Comprueba la compatibilidad dimensional de los términos de una ecuación.",
      "body": "<p>En una ecuación física, ambos miembros deben tener la misma dimensión. Además, todos los términos que se suman o restan deben ser dimensionalmente compatibles.</p><div class=\"equation\">\\[A=B+C\\quad\\Longrightarrow\\quad[A]=[B]=[C]\\]</div><p>No sumamos los símbolos dimensionales como si fueran magnitudes: si dos términos de longitud se suman, la suma sigue teniendo dimensión \\(L\\), no \\(2L\\).</p><p>La homogeneidad es <strong>necesaria, pero no suficiente</strong>: una fórmula puede tener dimensiones correctas y ser físicamente equivocada. Tampoco permite distinguir magnitudes distintas que comparten dimensión, como trabajo y torque.</p>",
      "key": "Antes de calcular números, revisa las dimensiones. Una incompatibilidad basta para descartar una fórmula.",
      "examples": [
        {
          "title": "¿Es compatible esta ecuación?",
          "question": "Comprueba \\(x=x_0+v_0t+\\frac12at^2\\).",
          "steps": [
            "La posición inicial tiene dimensión \\([x_0]=L\\).",
            "<div class=\"equation\">\\[[v_0t]=(LT^{-1})T=L\\]</div>",
            "<div class=\"equation\">\\[[\\tfrac12at^2]=(LT^{-2})T^2=L\\]</div>",
            "Todos los términos tienen dimensión de longitud. La ecuación es dimensionalmente homogénea."
          ]
        },
        {
          "title": "Detectar un error",
          "question": "¿Puede ser correcta \\(v=v_0+at^2\\) si \\(a\\) es aceleración?",
          "steps": [
            "Las velocidades tienen dimensión \\(LT^{-1}\\).",
            "<div class=\"equation\">\\[[at^2]=(LT^{-2})T^2=L\\]</div>",
            "Se estaría sumando una velocidad con una longitud. La expresión no es homogénea."
          ]
        }
      ],
      "quiz": [
        {
          "id": "u4a",
          "prompt": "Para rapidez \\(v\\), aceleración \\(a\\), tiempo \\(t\\) y distancia \\(x\\), ¿qué ecuación es homogénea?",
          "options": [
            "\\(x=vt^2\\)",
            "\\(v=at\\)",
            "\\(a=vt\\)",
            "\\(v=at^2\\)",
            "\\(x=v/t\\)"
          ],
          "answer": 1,
          "solution": "Solo \\([at]=LT^{-1}=[v]\\). Las demás igualan dimensiones diferentes.",
          "level": "Básico"
        },
        {
          "id": "u4b",
          "prompt": "Si una ecuación es dimensionalmente homogénea, podemos afirmar que:",
          "options": [
            "Es necesariamente una ley correcta",
            "Todos sus coeficientes valen 1",
            "No necesita experimentos",
            "Supera la comprobación dimensional, pero puede ser incorrecta",
            "Relaciona solo magnitudes base"
          ],
          "answer": 3,
          "solution": "El análisis dimensional no determina por sí solo los coeficientes numéricos ni garantiza una ley física.",
          "level": "Básico"
        }
      ]
    },
    {
      "title": "Dimensiones de coeficientes",
      "subtitle": "Cada término debe ajustarse a la magnitud buscada",
      "goal": "Encuentra dimensiones desconocidas en sumas y en funciones matemáticas.",
      "body": "<p>Si una expresión contiene coeficientes desconocidos, no supongas que son adimensionales. Despeja la dimensión de cada uno usando la homogeneidad.</p><div class=\"equation\">\\[x=At^2+Bt+C\\quad\\Longrightarrow\\quad[At^2]=[Bt]=[C]=L\\]</div><p>Los argumentos de funciones como seno, coseno, logaritmo y exponencial deben ser adimensionales. Si \\(x=A\\operatorname{sen}(\\omega t+\\varphi)\\), entonces \\([A]=L\\), \\([\\omega]=T^{-1}\\) y \\([\\varphi]=1\\). Los ángulos en radianes tienen dimensión uno.</p><p>Cuando aparece \\(\\ln(Q/Q_0)\\), el cociente es admisible si \\([Q]=[Q_0]\\) y es positivo. La compatibilidad dimensional no reemplaza las restricciones matemáticas de la función.</p>",
      "key": "Un coeficiente puede aportar las dimensiones que faltan. Constante no equivale a adimensional.",
      "examples": [
        {
          "title": "Tres coeficientes distintos",
          "question": "En \\(x=At^2+Bt+C\\), con posición \\(x\\) y tiempo \\(t\\), halla \\([A],\\ [B],\\ [C]\\).",
          "steps": [
            "<div class=\"equation\">\\[[A]T^2=L\\quad\\Rightarrow\\quad[A]=LT^{-2}\\]</div>",
            "<div class=\"equation\">\\[[B]T=L\\quad\\Rightarrow\\quad[B]=LT^{-1}\\]</div>",
            "<div class=\"equation\">\\[[C]=L\\]</div>",
            "A tiene dimensión de aceleración; B, de velocidad; C, de longitud."
          ]
        }
      ],
      "quiz": [
        {
          "id": "u5a",
          "prompt": "En \\(F=kv^2\\), donde F es fuerza y v rapidez, halla \\([k]\\).",
          "options": [
            "\\(ML\\)",
            "\\(MT^{-2}\\)",
            "\\(M^{-1}L\\)",
            "\\(ML^{-1}\\)",
            "\\(ML^{-2}T\\)"
          ],
          "answer": 3,
          "solution": "<div class=\"equation\">\\[[k]=\\frac{MLT^{-2}}{L^2T^{-2}}=ML^{-1}\\]</div>",
          "level": "Intermedio"
        },
        {
          "id": "u5b",
          "prompt": "En \\(x=Ae^{-bt}\\), con x longitud y t tiempo, ¿qué dimensiones corresponden a A y b?",
          "options": [
            "\\(L\\) y \\(T\\)",
            "\\(LT^{-1}\\) y \\(1\\)",
            "\\(L\\) y \\(T^{-1}\\)",
            "\\(1\\) y \\(T^{-1}\\)",
            "\\(L^2\\) y \\(T^{-2}\\)"
          ],
          "answer": 2,
          "solution": "El exponente \\(bt\\) debe ser adimensional: \\([b]T=1\\). Como la exponencial es adimensional, \\([A]=[x]=L\\).",
          "level": "Intermedio"
        }
      ]
    },
    {
      "title": "Cálculo de exponentes y límites",
      "subtitle": "Construye relaciones a partir de sus dimensiones",
      "goal": "Determina exponentes en una relación de potencias y reconoce lo que el método no puede obtener.",
      "body": "<p>Si se propone \\(Q=C A^aB^b\\) y C es adimensional, sustituye dimensiones y compara los exponentes de cada base. Así obtienes un sistema de ecuaciones algebraicas, sin derivadas ni integrales.</p><ol><li>Identifica las magnitudes y sus dimensiones.</li><li>Sustituye y agrupa las potencias de M, L y T.</li><li>Iguala los exponentes correspondientes.</li><li>Resuelve e interpreta la relación obtenida.</li></ol><p>El resultado depende de las variables y de la forma de relación supuestas. El análisis dimensional no determina constantes adimensionales como 2 o \\(\\pi\\), ni siempre fija una relación única cuando hay grupos adimensionales.</p>",
      "key": "Una relación obtenida por dimensiones debe interpretarse y contrastarse con el modelo físico.",
      "examples": [
        {
          "title": "Período de un péndulo",
          "question": "Supón \\(\\tau=C\\ell^ag^b\\), con longitud \\(\\ell\\), aceleración gravitatoria g y C adimensional.",
          "steps": [
            "<div class=\"equation\">\\[T=L^a(LT^{-2})^b=L^{a+b}T^{-2b}\\]</div>",
            "Compara exponentes: \\(a+b=0\\) y \\(-2b=1\\).",
            "<div class=\"equation\">\\[b=-\\frac12,\\quad a=\\frac12\\quad\\Rightarrow\\quad\\tau=C\\sqrt{\\frac{\\ell}{g}}\\]</div>",
            "El método no determina C. En el modelo de péndulo simple a ángulos pequeños, la dinámica da \\(C=2\\pi\\). Para amplitudes mayores interviene además el ángulo."
          ]
        },
        {
          "title": "Energía a partir de masa y rapidez",
          "question": "Si \\(E=Cm^av^b\\) y C es adimensional, determina a y b.",
          "steps": [
            "<div class=\"equation\">\\[ML^2T^{-2}=M^a(LT^{-1})^b=M^aL^bT^{-b}\\]</div>",
            "Al comparar exponentes: \\(a=1\\) y \\(b=2\\).",
            "Se obtiene \\(E=Cmv^2\\). La dimensión no permite deducir que \\(C=1/2\\) para la energía cinética clásica."
          ]
        }
      ],
      "quiz": [
        {
          "id": "u6a",
          "prompt": "Si \\(F=Cm^av^br^c\\) con C adimensional, masa m, rapidez v y radio r, ¿cuál es (a, b, c)?",
          "options": [
            "\\((1,1,-1)\\)",
            "\\((1,2,-1)\\)",
            "\\((1,2,1)\\)",
            "\\((2,1,-1)\\)",
            "\\((1,-2,1)\\)"
          ],
          "answer": 1,
          "solution": "<div class=\"equation\">\\[MLT^{-2}=M^aL^{b+c}T^{-b}\\]</div>Al comparar: \\(a=1,\\ b=2,\\ b+c=1\\), por tanto \\(c=-1\\).",
          "level": "Avanzado"
        },
        {
          "id": "u6b",
          "prompt": "¿Qué dato no se obtiene solo por análisis dimensional en \\(\\tau=C\\sqrt{\\ell/g}\\)?",
          "options": [
            "La dimensión de g",
            "La dimensión de \\(\\tau\\)",
            "Que \\(\\ell/g\\) tiene dimensión \\(T^2\\)",
            "El valor numérico de C",
            "Que C es adimensional si la igualdad es homogénea"
          ],
          "answer": 3,
          "solution": "Se determina la combinación dimensional, pero el valor de C requiere información física adicional.",
          "level": "Intermedio"
        }
      ]
    }
  ],
  "practice": [
    {
      "id": "p1",
      "prompt": "Si \\(Q=v/t\\), donde v es rapidez y t tiempo, halla \\([Q]\\).",
      "options": [
        "\\(LT^{-1}\\)",
        "\\(LT^{-2}\\)",
        "\\(LT\\)",
        "\\(T^{-2}\\)",
        "\\(L^2T^{-2}\\)"
      ],
      "answer": 1,
      "solution": "<div class=\"equation\">\\[[Q]=\\frac{LT^{-1}}T=LT^{-2}\\]</div>",
      "level": "Básico"
    },
    {
      "id": "p2",
      "prompt": "El impulso de una fuerza constante es \\(J_F=F\\Delta t\\). Halla su dimensión.",
      "options": [
        "\\(MLT^{-2}\\)",
        "\\(ML^2T^{-2}\\)",
        "\\(MT^{-1}\\)",
        "\\(MLT^{-1}\\)",
        "\\(L^2T^{-1}\\)"
      ],
      "answer": 3,
      "solution": "<div class=\"equation\">\\[[J_F]=(MLT^{-2})T=MLT^{-1}\\]</div>",
      "level": "Básico"
    },
    {
      "id": "p3",
      "prompt": "En \\(F=kx\\), donde x es una deformación longitudinal, determina \\([k]\\).",
      "options": [
        "\\(MT^{-2}\\)",
        "\\(MLT^{-2}\\)",
        "\\(ML^{-1}T^{-2}\\)",
        "\\(MT^{-1}\\)",
        "\\(LT^{-2}\\)"
      ],
      "answer": 0,
      "solution": "<div class=\"equation\">\\[[k]=[F]/[x]=MLT^{-2}/L=MT^{-2}\\]</div>",
      "level": "Básico"
    },
    {
      "id": "p4",
      "prompt": "En \\(F=Gm_1m_2/r^2\\), halla \\([G]\\).",
      "options": [
        "\\(ML^3T^{-2}\\)",
        "\\(M^{-1}LT^{-2}\\)",
        "\\(M^{-2}L^3T^{-2}\\)",
        "\\(M^{-1}L^2T^{-2}\\)",
        "\\(M^{-1}L^3T^{-2}\\)"
      ],
      "answer": 4,
      "solution": "<div class=\"equation\">\\[[G]=\\frac{[F][r]^2}{[m_1][m_2]}=\\frac{MLT^{-2}L^2}{M^2}=M^{-1}L^3T^{-2}\\]</div>",
      "level": "Intermedio"
    },
    {
      "id": "p5",
      "prompt": "Si \\(E=hf\\), donde E es energía y f frecuencia, determina \\([h]\\).",
      "options": [
        "\\(ML^2T^{-3}\\)",
        "\\(MLT^{-1}\\)",
        "\\(ML^2T^{-1}\\)",
        "\\(MT^{-1}\\)",
        "\\(L^2T^{-1}\\)"
      ],
      "answer": 2,
      "solution": "<div class=\"equation\">\\[[h]=\\frac{ML^2T^{-2}}{T^{-1}}=ML^2T^{-1}\\]</div>",
      "level": "Intermedio"
    },
    {
      "id": "p6",
      "prompt": "En \\(v=At^2+B\\), v es velocidad y t tiempo. ¿Cuál es \\([A/B]\\)?",
      "options": [
        "\\(T^{-1}\\)",
        "\\(T^{-2}\\)",
        "\\(LT^{-2}\\)",
        "\\(T^2\\)",
        "\\(1\\)"
      ],
      "answer": 1,
      "solution": "Por homogeneidad, \\([A]=LT^{-3}\\) y \\([B]=LT^{-1}\\). <div class=\"equation\">\\[[A/B]=\\frac{LT^{-3}}{LT^{-1}}=T^{-2}\\]</div>",
      "level": "Intermedio"
    },
    {
      "id": "p7",
      "prompt": "En \\(p=Av^2+B\\), p es presión y v rapidez. Halla \\([A]\\).",
      "options": [
        "\\(ML^{-1}\\)",
        "\\(ML^{-2}\\)",
        "\\(MLT^{-2}\\)",
        "\\(ML^{-3}\\)",
        "\\(MT^{-2}\\)"
      ],
      "answer": 3,
      "solution": "<div class=\"equation\">\\[[A]=\\frac{ML^{-1}T^{-2}}{L^2T^{-2}}=ML^{-3}\\]</div>",
      "level": "Intermedio"
    },
    {
      "id": "p8",
      "prompt": "En \\(x=A\\operatorname{sen}(Bt)\\), x es longitud y t tiempo. Halla \\([AB]\\).",
      "options": [
        "\\(LT^{-1}\\)",
        "\\(L\\)",
        "\\(LT\\)",
        "\\(T^{-1}\\)",
        "\\(L^2T^{-2}\\)"
      ],
      "answer": 0,
      "solution": "El argumento exige \\([B]=T^{-1}\\) y la amplitud cumple \\([A]=L\\). Entonces \\([AB]=LT^{-1}\\).",
      "level": "Intermedio"
    },
    {
      "id": "p9",
      "prompt": "Si \\(E=C\\rho^av^bV^c\\), con densidad \\(\\rho\\), rapidez v, volumen V y C adimensional, halla (a, b, c).",
      "options": [
        "\\((1,1,1)\\)",
        "\\((1,2,-1)\\)",
        "\\((2,1,1)\\)",
        "\\((1,3,2)\\)",
        "\\((1,2,1)\\)"
      ],
      "answer": 4,
      "solution": "<div class=\"equation\">\\[ML^2T^{-2}=M^aL^{-3a+b+3c}T^{-b}\\]</div>Masa: a=1. Tiempo: b=2. Longitud: \\(-3+2+3c=2\\), luego c=1.",
      "level": "Avanzado"
    },
    {
      "id": "p10",
      "prompt": "Supón \\(\\tau=Cm^ak^b\\), donde \\(\\tau\\) es un período, k la constante elástica y C adimensional. Halla (a, b).",
      "options": [
        "\\((1,-1)\\)",
        "\\((-1/2,1/2)\\)",
        "\\((1/2,-1/2)\\)",
        "\\((1/2,1/2)\\)",
        "\\((0,-1/2)\\)"
      ],
      "answer": 2,
      "solution": "<div class=\"equation\">\\[T=M^a(MT^{-2})^b=M^{a+b}T^{-2b}\\]</div>Se cumple \\(a+b=0\\) y \\(-2b=1\\). Por ello \\(a=1/2,\\ b=-1/2\\).",
      "level": "Avanzado"
    }
  ],
  "exam": [
    {
      "id": "e1",
      "prompt": "¿Qué unidad SI corresponde a la temperatura termodinámica?",
      "options": [
        "Grado Celsius",
        "Joule",
        "Kelvin",
        "Candela",
        "Mol"
      ],
      "answer": 2,
      "solution": "La unidad base SI de temperatura termodinámica es el kelvin (K).",
      "level": "Básico"
    },
    {
      "id": "e2",
      "prompt": "La potencia mecánica es trabajo dividido por tiempo. Su dimensión es:",
      "options": [
        "\\(ML^2T^{-3}\\)",
        "\\(MLT^{-2}\\)",
        "\\(ML^2T^{-2}\\)",
        "\\(ML^{-1}T^{-2}\\)",
        "\\(MT^{-3}\\)"
      ],
      "answer": 0,
      "solution": "<div class=\"equation\">\\[[\\mathcal P]=[W]/[t]=ML^2T^{-3}\\]</div>",
      "level": "Básico"
    },
    {
      "id": "e3",
      "prompt": "¿Qué expresión es adimensional si v es rapidez, a aceleración y r longitud?",
      "options": [
        "\\(v/(ar)\\)",
        "\\(v^2/a\\)",
        "\\(ar/v\\)",
        "\\(v^2/(ar)\\)",
        "\\(a/v^2\\)"
      ],
      "answer": 3,
      "solution": "<div class=\"equation\">\\[\\left[\\frac{v^2}{ar}\\right]=\\frac{L^2T^{-2}}{(LT^{-2})L}=1\\]</div>",
      "level": "Básico"
    },
    {
      "id": "e4",
      "prompt": "En \\(F=At+B\\), F es fuerza y t tiempo. Halla \\([A]\\).",
      "options": [
        "\\(MLT^{-1}\\)",
        "\\(MLT^{-3}\\)",
        "\\(ML^2T^{-2}\\)",
        "\\(MT^{-2}\\)",
        "\\(MLT^{-2}\\)"
      ],
      "answer": 1,
      "solution": "<div class=\"equation\">\\[[A]=[F]/[t]=MLT^{-3}\\]</div>",
      "level": "Intermedio"
    },
    {
      "id": "e5",
      "prompt": "En \\(E=Av^2\\), E es energía y v rapidez. Halla \\([A]\\).",
      "options": [
        "\\(ML\\)",
        "\\(ML^{-1}\\)",
        "\\(MT^{-2}\\)",
        "\\(L^2T^{-2}\\)",
        "\\(M\\)"
      ],
      "answer": 4,
      "solution": "<div class=\"equation\">\\[[A]=\\frac{ML^2T^{-2}}{L^2T^{-2}}=M\\]</div>",
      "level": "Intermedio"
    },
    {
      "id": "e6",
      "prompt": "Si \\(F=bv\\), F es fuerza y v rapidez, halla \\([b]\\).",
      "options": [
        "\\(MT\\)",
        "\\(MLT^{-1}\\)",
        "\\(MT^{-1}\\)",
        "\\(MT^{-2}\\)",
        "\\(ML^{-1}\\)"
      ],
      "answer": 2,
      "solution": "<div class=\"equation\">\\[[b]=\\frac{MLT^{-2}}{LT^{-1}}=MT^{-1}\\]</div>",
      "level": "Intermedio"
    },
    {
      "id": "e7",
      "prompt": "En \\(p=p_0e^{-\\alpha t}\\), p y \\(p_0\\) son presiones y t tiempo. Halla \\([\\alpha]\\).",
      "options": [
        "\\(T^{-1}\\)",
        "\\(T\\)",
        "\\(1\\)",
        "\\(ML^{-1}T^{-2}\\)",
        "\\(T^{-2}\\)"
      ],
      "answer": 0,
      "solution": "El exponente debe ser adimensional: \\([\\alpha]T=1\\), luego \\([\\alpha]=T^{-1}\\).",
      "level": "Intermedio"
    },
    {
      "id": "e8",
      "prompt": "Supón \\(v=Cp^a\\rho^b\\), con presión p, densidad \\(\\rho\\) y C adimensional. Halla (a, b).",
      "options": [
        "\\((1,-1)\\)",
        "\\((-1/2,1/2)\\)",
        "\\((1/2,1/2)\\)",
        "\\((1/2,-1/2)\\)",
        "\\((0,-1/2)\\)"
      ],
      "answer": 3,
      "solution": "<div class=\"equation\">\\[LT^{-1}=M^{a+b}L^{-a-3b}T^{-2a}\\]</div>Tiempo: \\(a=1/2\\). Masa: \\(b=-1/2\\). La longitud también se cumple.",
      "level": "Avanzado"
    },
    {
      "id": "e9",
      "prompt": "En la relación dimensionalmente homogénea \\(x=At+Bt^3\\), x es longitud y t tiempo. Halla \\([A/B]\\).",
      "options": [
        "\\(T^{-2}\\)",
        "\\(T^2\\)",
        "\\(LT\\)",
        "\\(L^{-1}T^2\\)",
        "\\(1\\)"
      ],
      "answer": 1,
      "solution": "Se tiene \\([A]=LT^{-1}\\) y \\([B]=LT^{-3}\\). El cociente tiene dimensión \\(T^2\\).",
      "level": "Avanzado"
    },
    {
      "id": "e10",
      "prompt": "¿Qué limitación tiene el análisis dimensional?",
      "options": [
        "No sirve para comprobar ecuaciones",
        "Solo se usa con longitudes",
        "Nunca permite hallar exponentes",
        "Todas las constantes son adimensionales",
        "No determina por sí solo los factores numéricos adimensionales"
      ],
      "answer": 4,
      "solution": "Por ejemplo, a partir de masa y rapidez permite obtener \\(E=Cmv^2\\), pero no el valor de C.",
      "level": "Intermedio"
    }
  ],
  "derivedTable": "<div class=\"table-scroll\"><table><thead><tr><th>Magnitud</th><th>Relación</th><th>Dimensión</th><th>Unidad SI</th></tr></thead><tbody><tr><td>Área</td><td>\\(A=ab\\)</td><td>\\(L^2\\)</td><td>m²</td></tr><tr><td>Volumen</td><td>\\(V=abc\\)</td><td>\\(L^3\\)</td><td>m³</td></tr><tr><td>Rapidez</td><td>\\(v=d/t\\)</td><td>\\(LT^{-1}\\)</td><td>m/s</td></tr><tr><td>Aceleración</td><td>\\(a=\\Delta v/\\Delta t\\)</td><td>\\(LT^{-2}\\)</td><td>m/s²</td></tr><tr><td>Densidad</td><td>\\(\\rho=m/V\\)</td><td>\\(ML^{-3}\\)</td><td>kg/m³</td></tr><tr><td>Fuerza</td><td>\\(F=ma\\)</td><td>\\(MLT^{-2}\\)</td><td>N</td></tr><tr><td>Trabajo y energía</td><td>\\(W=Fd\\)</td><td>\\(ML^2T^{-2}\\)</td><td>J</td></tr><tr><td>Potencia</td><td>\\(\\mathcal P=W/t\\)</td><td>\\(ML^2T^{-3}\\)</td><td>W</td></tr><tr><td>Presión</td><td>\\(p=F/A\\)</td><td>\\(ML^{-1}T^{-2}\\)</td><td>Pa</td></tr><tr><td>Cantidad de movimiento</td><td>\\(p_{\\!m}=mv\\)</td><td>\\(MLT^{-1}\\)</td><td>kg·m/s</td></tr><tr><td>Frecuencia</td><td>\\(f=1/\\tau\\)</td><td>\\(T^{-1}\\)</td><td>Hz</td></tr><tr><td>Constante elástica</td><td>\\(k=F/x\\)</td><td>\\(MT^{-2}\\)</td><td>N/m</td></tr></tbody></table></div>",
  "baseTable": "<div class=\"table-scroll\"><table><thead><tr><th>Magnitud base</th><th>Dimensión</th><th>Unidad SI</th><th>Símbolo</th></tr></thead><tbody><tr><td>Longitud</td><td>\\(L\\)</td><td>metro</td><td>m</td></tr><tr><td>Masa</td><td>\\(M\\)</td><td>kilogramo</td><td>kg</td></tr><tr><td>Tiempo</td><td>\\(T\\)</td><td>segundo</td><td>s</td></tr><tr><td>Corriente eléctrica</td><td>\\(I\\)</td><td>amperio</td><td>A</td></tr><tr><td>Temperatura termodinámica</td><td>\\(\\Theta\\)</td><td>kelvin</td><td>K</td></tr><tr><td>Cantidad de sustancia</td><td>\\(N\\)</td><td>mol</td><td>mol</td></tr><tr><td>Intensidad luminosa</td><td>\\(J\\)</td><td>candela</td><td>cd</td></tr></tbody></table></div>"
};
