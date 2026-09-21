window.DIMENSIONAL_CONTENT = {
  "title": "Análisis Dimensional",
  "intro": "Aprende a medir y clasificar magnitudes físicas y analizar las dimensiones de una ecuación. La teoría incluye aplicaciones explicadas y 10 problemas resueltos de deducción dimensional para estudiar antes de la práctica.",
  "sourceNote": "Fuente: Magnitudes físicas, Colección Esencial, Lumbreras Editores (material proporcionado). Contenido adaptado con notación revisada y aclaraciones sobre el alcance del análisis dimensional.",
  "lessons": [
    {
      "id": "dim-magnitudes",
      "title": "Magnitudes físicas y su clasificación por origen",
      "subtitle": "Magnitud, valor numérico y unidad",
      "goal": "Identifica las siete magnitudes base del SI y distingue las magnitudes derivadas.",
      "body": "<p>Una <strong>magnitud física</strong> es una propiedad de un cuerpo o fenómeno que puede expresarse cuantitativamente mediante un número y una referencia de medida. Medir consiste en compararla con una unidad de la misma naturaleza.</p><div data-stone-explorer></div><h4>Magnitudes fundamentales o base</h4><p>Son las magnitudes elegidas como punto de partida para expresar las demás. El <strong>Sistema Internacional de Unidades (SI)</strong> utiliza siete.</p><div data-magnitude-explorer=\"base\"></div><p>Los símbolos \\(L,M,T,\\Theta,I,N,J\\) indican dimensiones; no son los símbolos de las unidades. Por ejemplo, \\(M\\) representa la dimensión de masa y kg es el símbolo del kilogramo.</p><h4>Magnitudes derivadas</h4><p>Se relacionan con las magnitudes base mediante productos, cocientes o potencias. El área se obtiene de dos longitudes; el volumen, de tres; la densidad relaciona masa y volumen; la velocidad relaciona desplazamiento y tiempo.</p><div data-magnitude-explorer=\"derived\"></div>",
      "key": "Fundamental o derivada describe el origen de una magnitud; su unidad debe corresponder a la propiedad que se mide.",
      "examples": []
    },
    {
      "id": "dim-si",
      "title": "Prefijos y conversión de unidades",
      "subtitle": "La misma cantidad escrita de otra manera",
      "goal": "Convierte unidades mediante equivalencias y reconoce los prefijos utilizados en el material.",
      "body": "<p>Un sistema de unidades permite comunicar y comparar mediciones con una referencia común. Los <strong>prefijos</strong> indican múltiplos o submúltiplos decimales de una unidad. Conviene respetar mayúsculas y minúsculas: m significa mili como prefijo, mientras M significa mega.</p><div data-prefix-explorer></div><p>Estos son los prefijos empleados en este capítulo; no constituyen la lista completa del SI. El prefijo forma parte del símbolo de unidad: nm es nanómetro, mm es milímetro y km es kilómetro.</p><div class=\"equation\">\\[1\\,\\mathrm{min}=60\\,\\mathrm s\\qquad1\\,\\mathrm h=3600\\,\\mathrm s\\qquad1\\,\\mathrm{km}=10^3\\,\\mathrm m\\]</div><div class=\"equation\">\\[1\\,\\mathrm L=10^{-3}\\,\\mathrm{m^3}\\qquad1\\,\\mathrm{mL}=10^{-3}\\,\\mathrm L=10^{-6}\\,\\mathrm{m^3}\\]</div><h4>Método del factor de conversión</h4><p>Multiplica por equivalencias escritas como fracciones de valor uno. Ubica las unidades para que se cancelen las que deseas cambiar.</p><div class=\"equation\">\\[72\\,\\frac{\\mathrm{km}}{\\mathrm h}\\cdot\\frac{1000\\,\\mathrm m}{1\\,\\mathrm{km}}\\cdot\\frac{1\\,\\mathrm h}{3600\\,\\mathrm s}=20\\,\\frac{\\mathrm m}{\\mathrm s}\\]</div><p>Si una unidad está elevada a una potencia, también se eleva el factor de conversión: \\(1\\,\\mathrm{cm^2}=(10^{-2}\\,\\mathrm m)^2=10^{-4}\\,\\mathrm{m^2}\\), y \\(1\\,\\mathrm{cm^3}=10^{-6}\\,\\mathrm{m^3}\\).</p><p>Escribe un espacio entre el número y el símbolo, como 5 kg. Los símbolos no se pluralizan: 5 kg, no «5 kgs». La temperatura en kelvins se escribe con K, sin signo de grado.</p>",
      "key": "En una conversión cambian el número y la unidad, pero no la cantidad física ni su dimensión.",
      "examples": []
    },
    {
      "id": "dim-dimensiones",
      "title": "Análisis dimensional: deducciones y reglas",
      "subtitle": "Lenguaje y operaciones del análisis dimensional",
      "goal": "Interpreta los corchetes dimensionales y reconoce la estructura de una magnitud.",
      "body": "<p>El <strong>análisis dimensional</strong> estudia las relaciones entre magnitudes mediante sus dimensiones. La dimensión expresa cómo depende una magnitud de las magnitudes base; la unidad es la referencia con la que se mide.</p><p>Escribimos \\([Q]\\) para indicar la dimensión de la magnitud \\(Q\\). En general, una expresión dimensional se escribe en función de las <strong>siete magnitudes fundamentales del SI</strong>:</p><div class=\"equation\">\\[[Q]=M^aL^bT^c\\Theta^dI^eN^fJ^g\\]</div><p>En esta expresión, \\(M\\) representa masa; \\(L\\), longitud; \\(T\\), tiempo; \\(\\Theta\\), temperatura termodinámica; \\(I\\), intensidad de corriente eléctrica; \\(N\\), cantidad de sustancia; y \\(J\\), intensidad luminosa. Son símbolos dimensionales: aquí \\(N\\) y \\(J\\) no representan las unidades newton y joule.</p><p>Los exponentes \\(a,b,c,d,e,f,g\\) dependen de la magnitud y pueden ser positivos, negativos, fraccionarios o cero. Cuando una dimensión no interviene, su exponente es cero y el factor correspondiente vale 1. Para magnitudes puramente mecánicas, los exponentes de \\(\\Theta,I,N,J\\) son cero y la expresión se reduce a \\([Q]=M^aL^bT^c\\).</p>",
      "key": "La dimensión describe la estructura de una magnitud, pero no identifica de manera única su significado físico.",
      "examples": [],
      "sections": [
        {
          "id": "dim-deducciones",
          "title": "",
          "subtitle": "Construir las fórmulas desde relaciones conocidas",
          "goal": "Obtén las dimensiones de magnitudes derivadas y reconoce las dimensiones de constantes físicas.",
          "body": "<p>Para deducir una dimensión, parte de una relación física conocida, reemplaza cada magnitud por su dimensión y simplifica las potencias. Los coeficientes puramente numéricos no modifican la dimensión.</p>",
          "key": "Reconstruir una dimensión a partir de su definición es más útil que memorizarla sin comprenderla.",
          "examples": [
            {
              "title": "Constantes físicas: de menor a mayor dificultad",
              "question": "Resuelve los tres ejemplos en orden: resorte, Planck y gravitación. Puedes volver a cada uno conservando el paso en el que te quedaste.",
              "steps": [
                "<strong>1. Resorte · Básico.</strong> En \\(F=kx\\), despeja \\(k=F/x\\). Como \\([F]=MLT^{-2}\\) y \\([x]=L\\), resulta \\([k]=MLT^{-2}/L=MT^{-2}\\). Su unidad SI es N/m.",
                "<strong>2. Planck · Intermedio.</strong> En \\(E=hf\\), despeja \\(h=E/f\\). Como \\([E]=ML^2T^{-2}\\) y \\([f]=T^{-1}\\), resulta \\([h]=ML^2T^{-2}/T^{-1}=ML^2T^{-1}\\). Su unidad SI es J·s.",
                "<strong>3. Gravitación · Avanzado.</strong> En \\(F=Gm_1m_2/r^2\\), despeja \\(G=Fr^2/(m_1m_2)\\). Con \\([F]=MLT^{-2}\\), \\([r]=L\\) y \\([m_1]=[m_2]=M\\), resulta \\([G]=M^{-1}L^3T^{-2}\\). Su unidad SI es m³/(kg·s²)."
              ],
              "interactive": "physical-constants"
            }
          ]
        },
        {
          "id": "dim-reglas",
          "title": "Reglas del álgebra dimensional",
          "subtitle": "Productos, cocientes, potencias y cantidades adimensionales",
          "goal": "Aplica las reglas dimensionales e identifica qué puede sumarse y qué debe ser adimensional.",
          "body": "<div class=\"table-scroll dimensional-rules\" role=\"region\" aria-labelledby=\"section-dim-reglas\" tabindex=\"0\"><table><caption class=\"sr-only\">Cuadro resumen de las reglas del álgebra dimensional</caption><thead><tr><th scope=\"col\">Regla</th><th scope=\"col\">Expresión</th></tr></thead><tbody><tr><th scope=\"row\">Suma y resta</th><td>\\([A\\pm B]=[A]=[B]\\)</td></tr><tr><th scope=\"row\">Multiplicación</th><td>\\([AB]=[A][B]\\)</td></tr><tr><th scope=\"row\">División</th><td>\\(\\left[\\frac AB\\right]=\\frac{[A]}{[B]}\\)</td></tr><tr><th scope=\"row\">Potencias y raíces</th><td>\\([A^n]=[A]^n\\)<span class=\"rule-formula\">\\([\\sqrt A]=[A]^{1/2}\\)</span></td></tr><tr><th scope=\"row\">Número</th><td>\\([2]=[\\pi]=1\\)</td></tr><tr><th scope=\"row\">Funciones matemáticas</th><td>\\([\\sin x]=[\\cos x]=1\\)<span class=\"rule-formula\">\\([e^x]=[\\ln x]=1\\)</span></td></tr></tbody></table></div><p class=\"dimensional-rules-note\">Los ángulos en radianes tienen dimensión uno. Para \\(\\log_a x\\) real: \\(x>0\\), \\(a>0\\) y \\(a\\ne1\\); tanto \\(x\\) como \\(a\\) son adimensionales.</p>",
          "key": "Constante no significa adimensional: distingue los números puros de las constantes físicas.",
          "examples": [
            {
              "title": "Dimensión uno: de menor a mayor dificultad",
              "question": "Resuelve los tres ejemplos en orden: rozamiento, seno y exponencial. Puedes volver a cada uno conservando el paso en el que te quedaste.",
              "steps": [
                "<strong>1. Rozamiento · Básico.</strong> En \\(F_r=\\mu_kF_N\\), despeja \\(\\mu_k=F_r/F_N\\). Ambas fuerzas tienen dimensión \\(MLT^{-2}\\), por lo que \\([\\mu_k]=[F_r]/[F_N]=M^0L^0T^0=1\\). El coeficiente de rozamiento es adimensional.",
                "<strong>2. Seno · Intermedio.</strong> En \\(y=A\\operatorname{sen}(2\\pi t/\\tau)\\), \\(y\\) es un desplazamiento y \\([t]=[\\tau]=T\\). Determina la dimensión de \\(A\\). El argumento y el seno tienen dimensión uno. Como \\([y]=L\\), resulta \\([A]=[y]/[\\operatorname{sen}(2\\pi t/\\tau)]=L/1=L\\).",
                "<strong>3. Exponencial · Avanzado.</strong> En el modelo de frenado \\(v=v_0e^{-bt/m}\\), \\(v_0\\) es rapidez inicial, \\(m\\) es masa, \\(t\\) es tiempo y \\(b\\) es un coeficiente. Determina la dimensión de \\(b\\). El exponente debe ser adimensional: \\([b]T/M=1\\). Al despejar, \\([b]=M/T=MT^{-1}\\)."
              ],
              "interactive": "dimension-one"
            }
          ]
        }
      ]
    },
    {
      "id": "dim-homogeneidad",
      "title": "Principio de homogeneidad",
      "subtitle": "Todos los términos deben ser compatibles",
      "goal": "Comprueba ecuaciones y determina las dimensiones de coeficientes o argumentos.",
      "body": "<p>En una ecuación física, ambos miembros deben tener la misma dimensión. Si hay términos que se suman o restan, <strong>cada término debe tener la misma dimensión</strong>.</p><div class=\"equation\">\\[A+B-C=D\\quad\\Longrightarrow\\quad[A]=[B]=[C]=[D]\\]</div><p>Para aplicar el principio, separa primero los términos. Después calcula la dimensión de cada producto o cociente completo. No supongas que una letra desconocida es adimensional: puede aportar las dimensiones que faltan.</p><p>La homogeneidad es una condición <strong>necesaria, pero no suficiente</strong> para la validez de una fórmula. Una incompatibilidad permite rechazarla; una coincidencia no demuestra que describa correctamente el fenómeno.</p><p>Por ejemplo, \\(d=vt\\) y \\(d=2vt\\) tienen la misma estructura dimensional. El análisis dimensional no determina cuál corresponde a un movimiento específico ni obtiene el factor numérico correcto. Tampoco permite sumar trabajo y torque solo porque compartan dimensión: se necesita compatibilidad física.</p>",
      "key": "Las dimensiones detectan incompatibilidades, pero no reemplazan las leyes ni las condiciones del problema.",
      "examples": [
        {
          "title": "Homogeneidad: de menor a mayor dificultad",
          "question": "Resuelve los cinco ejemplos en orden. Usa Anterior y Siguiente para recorrer cada resolución.",
          "interactive": "homogeneity",
          "steps": [
            "<strong>Aplicación 8. Comprobación de fórmulas</strong><p>Comprueba dimensionalmente \\(d=vt\\) y \\(v_f=v_0+at\\), con distancia \\(d\\), tiempo \\(t\\), velocidad \\(v\\) y aceleración \\(a\\).</p><ol><li><div class=\"equation\">\\[[vt]=(LT^{-1})T=L=[d]\\]</div></li><li>La primera expresión es dimensionalmente homogénea; describe la distancia en un movimiento de rapidez constante bajo las condiciones apropiadas.</li><li><div class=\"equation\">\\[[v_f]=[v_0]=LT^{-1}\\qquad[at]=(LT^{-2})T=LT^{-1}\\]</div></li><li>La segunda expresión también es homogénea. Su aplicación física supone aceleración constante y componentes compatibles.</li></ol>",
            "<strong>Ejemplo complementario. Presión y rapidez</strong><p>En \\(p=Av^2+B\\), \\(p\\) es presión y \\(v\\) rapidez. Halla las dimensiones de A y B.</p><ol><li><div class=\"equation\">\\[[A](LT^{-1})^2=[B]=ML^{-1}T^{-2}\\]</div></li><li><div class=\"equation\">\\[[A]=ML^{-3}\\qquad[B]=ML^{-1}T^{-2}\\]</div></li><li>A tiene dimensión de densidad y B dimensión de presión. Esto indica compatibilidad dimensional, sin identificar necesariamente su naturaleza.</li></ol>",
            "<strong>Aplicación 10. Dos coeficientes desconocidos</strong><p>En la ecuación homogénea \\(20VP=mA+aB\\), \\(V\\) es volumen, \\(P\\) peso, \\(m\\) masa y \\(a\\) aceleración. Encuentra \\([A]\\) y \\([B]\\).</p><ol><li>El peso es una fuerza: \\([P]=MLT^{-2}\\). El volumen tiene dimensión \\(L^3\\).</li><li><div class=\"equation\">\\[[20VP]=L^3(MLT^{-2})=ML^4T^{-2}\\]</div></li><li>Iguala el término \\(mA\\) al miembro izquierdo:</li><li><div class=\"equation\">\\[M[A]=ML^4T^{-2}\\quad\\Rightarrow\\quad[A]=L^4T^{-2}\\]</div></li><li>Iguala ahora el término \\(aB\\):</li><li><div class=\"equation\">\\[(LT^{-2})[B]=ML^4T^{-2}\\quad\\Rightarrow\\quad[B]=ML^3\\]</div></li></ol>",
            "<strong>Aplicación 9. Un exponente adimensional</strong><p>En \\(A=B+C^{SD\\operatorname{sen}\\theta}\\), \\(D\\) es densidad. Determina \\([S]\\) para que el exponente sea adimensional. Se toma \\(C\\) como un número positivo adimensional y un ángulo con \\(\\operatorname{sen}\\theta\\ne0\\).</p><ol><li>El exponente cumple \\([SD\\operatorname{sen}\\theta]=1\\).</li><li><div class=\"equation\">\\[[S](ML^{-3})(1)=1\\]</div></li><li><div class=\"equation\">\\[[S]=\\frac1{ML^{-3}}=M^{-1}L^3\\]</div></li><li>La condición se obtiene del exponente. Al considerar C adimensional, el término exponencial también lo es; por homogeneidad, A y B deben ser adimensionales.</li></ol>",
            "<strong>Ejemplo complementario. Una oscilación</strong><p>En \\(x=A\\operatorname{sen}(\\omega t+\\varphi)\\), \\(x\\) es posición y \\(t\\) tiempo. Halla \\([A]\\), \\([\\omega]\\) y \\([\\varphi]\\).</p><ol><li>El argumento \\(\\omega t+\\varphi\\) debe ser adimensional. Por homogeneidad, \\([\\omega]T=[\\varphi]=1\\).</li><li><div class=\"equation\">\\[[\\omega]=T^{-1}\\qquad[\\varphi]=1\\]</div></li><li>Como el seno es adimensional, \\([x]=[A]\\), por tanto \\([A]=L\\).</li></ol>"
          ]
        }
      ]
    }
  ],
  "workedExamples": [
    {
      "title": "Producto de área y volumen",
      "question": "Si \\(x=AB\\), A es área y B es volumen, determina \\([x]\\).",
      "steps": [
        "Las dimensiones conocidas son \\([A]=L^2\\) y \\([B]=L^3\\).",
        "<div class=\"equation\">\\[[x]=[A][B]=L^2L^3=L^{2+3}=L^5\\]</div>",
        "Respuesta: \\(\\boxed{[x]=L^5}\\)."
      ],
      "sourcePage": 20,
      "number": 1
    },
    {
      "title": "Masa, velocidad y fuerza",
      "question": "Determina \\([A]\\) si \\(A=mv^2/F\\), donde m es masa, v velocidad y F fuerza.",
      "steps": [
        "Sustituye \\([m]=M\\), \\([v]=LT^{-1}\\) y \\([F]=MLT^{-2}\\).",
        "<div class=\"equation\">\\[[A]=\\frac{[m][v]^2}{[F]}=\\frac{M(LT^{-1})^2}{MLT^{-2}}=\\frac{ML^2T^{-2}}{MLT^{-2}}=L\\]</div>",
        "Respuesta: \\(\\boxed{[A]=L}\\)."
      ],
      "sourcePage": 20,
      "number": 2
    },
    {
      "title": "Coeficiente de una fuerza resistente",
      "question": "La ecuación \\(F=-kv^2\\) es dimensionalmente homogénea, con F fuerza y v velocidad. Determina la dimensión de k.",
      "steps": [
        "El signo negativo es un factor numérico y no modifica las dimensiones.",
        "<div class=\"equation\">\\[[F]=[k][v]^2\\quad\\Rightarrow\\quad ML T^{-2}=[k]L^2T^{-2}\\]</div>",
        "<div class=\"equation\">\\[\\boxed{[k]=ML^{-1}}\\]</div>",
        "En una expresión de fuerza dirigida, el signo requiere además una elección de eje y una interpretación física."
      ],
      "sourcePage": 21,
      "number": 3
    },
    {
      "title": "Fuerza por tiempo",
      "question": "Si \\(5Ft=\\sqrt3\\,Bm\\), con F fuerza, t tiempo y m masa, determina \\([B]\\). La raíz afecta únicamente al número 3.",
      "steps": [
        "Los factores \\(5\\) y \\(\\sqrt3\\) tienen dimensión uno.",
        "<div class=\"equation\">\\[[F][t]=[B][m]\\quad\\Rightarrow\\quad(MLT^{-2})T=[B]M\\]</div>",
        "<div class=\"equation\">\\[\\boxed{[B]=LT^{-1}}\\]</div>"
      ],
      "sourcePage": 22,
      "number": 4
    },
    {
      "title": "Área y densidad en una suma",
      "question": "En \\(V=\\alpha A+\\beta D\\), V es volumen, A área y D densidad. Halla \\([\\alpha]\\) y \\([\\beta]\\).",
      "steps": [
        "Por homogeneidad, \\([V]=[\\alpha][A]=[\\beta][D]\\).",
        "<div class=\"equation\">\\[L^3=[\\alpha]L^2\\quad\\Rightarrow\\quad[\\alpha]=L\\]</div>",
        "<div class=\"equation\">\\[L^3=[\\beta]ML^{-3}\\quad\\Rightarrow\\quad[\\beta]=\\frac{L^3}{ML^{-3}}=M^{-1}L^6\\]</div>",
        "Respuesta: \\(\\boxed{[\\alpha]=L,\\quad[\\beta]=M^{-1}L^6}\\)."
      ],
      "sourcePage": 22,
      "number": 5
    },
    {
      "title": "Trabajo, altura y potencia",
      "question": "En \\(W=AgH-BP\\), W es trabajo, g aceleración de la gravedad, H altura y P potencia. Determina \\([A]\\) y \\([B]\\).",
      "steps": [
        "Por homogeneidad, \\([W]=[A][g][H]=[B][P]\\).",
        "<div class=\"equation\">\\[[A]=\\frac{ML^2T^{-2}}{(LT^{-2})L}=M\\]</div>",
        "<div class=\"equation\">\\[[B]=\\frac{ML^2T^{-2}}{ML^2T^{-3}}=T\\]</div>",
        "Respuesta: \\(\\boxed{[A]=M,\\quad[B]=T}\\)."
      ],
      "sourcePage": 26,
      "number": 6
    },
    {
      "title": "Dimensiones dentro de una raíz",
      "question": "La velocidad de un automóvil se expresa como \\(v=\\sqrt{B^2-2AH}\\), donde H es distancia. Determina \\([B][A]\\).",
      "steps": [
        "Eleva al cuadrado: \\(v^2=B^2-2AH\\). Los tres términos deben tener la misma dimensión.",
        "<div class=\"equation\">\\[[B]^2=[v]^2=L^2T^{-2}\\quad\\Rightarrow\\quad[B]=LT^{-1}\\]</div>",
        "<div class=\"equation\">\\[[A][H]=[v]^2\\quad\\Rightarrow\\quad[A]=\\frac{L^2T^{-2}}L=LT^{-2}\\]</div>",
        "<div class=\"equation\">\\[\\boxed{[B][A]=L^2T^{-3}}\\]</div>"
      ],
      "sourcePage": 23,
      "number": 7
    },
    {
      "title": "Energía de un sistema bloque–resorte",
      "question": "En \\(E=Av^2+Bx^2+Ch\\), E es energía, v velocidad, x estiramiento y h altura. Determina \\([ABC]\\).",
      "steps": [
        "Cada término debe tener dimensión de energía, \\(ML^2T^{-2}\\).",
        "<div class=\"equation\">\\[[A]=\\frac{[E]}{[v]^2}=\\frac{ML^2T^{-2}}{L^2T^{-2}}=M\\]</div>",
        "<div class=\"equation\">\\[[B]=\\frac{[E]}{[x]^2}=\\frac{ML^2T^{-2}}{L^2}=MT^{-2}\\]</div>",
        "<div class=\"equation\">\\[[C]=\\frac{[E]}{[h]}=\\frac{ML^2T^{-2}}L=MLT^{-2}\\]</div>",
        "<div class=\"equation\">\\[\\boxed{[ABC]=M(MT^{-2})(MLT^{-2})=M^3LT^{-4}}\\]</div>"
      ],
      "sourcePage": 24,
      "number": 8
    },
    {
      "title": "Exponente de una base numérica",
      "question": "En la expresión \\(\\pi^{km^2/t}\\), m es masa y t tiempo. Halla la dimensión de k para que el exponente sea adimensional.",
      "steps": [
        "La base \\(\\pi\\) es numérica, de modo que el exponente debe ser un número sin dimensiones.",
        "<div class=\"equation\">\\[\\left[\\frac{km^2}{t}\\right]=1\\quad\\Rightarrow\\quad\\frac{[k]M^2}{T}=1\\]</div>",
        "<div class=\"equation\">\\[\\boxed{[k]=M^{-2}T}\\]</div>"
      ],
      "sourcePage": 20,
      "number": 9
    },
    {
      "title": "Logaritmo y homogeneidad",
      "question": "En \\(\\pi y=Sx\\log(ax/v)\\), S es área, a aceleración y v velocidad. Halla \\([y]\\). El argumento del logaritmo se considera positivo.",
      "steps": [
        "El argumento debe ser adimensional: \\([ax/v]=1\\).",
        "<div class=\"equation\">\\[[x]=\\frac{[v]}{[a]}=\\frac{LT^{-1}}{LT^{-2}}=T\\]</div>",
        "El logaritmo y el factor π tienen dimensión uno, así que \\([y]=[S][x]\\).",
        "<div class=\"equation\">\\[\\boxed{[y]=L^2T}\\]</div>"
      ],
      "sourcePage": 26,
      "number": 10
    }
  ],
  "derivedTable": "<div class=\"table-scroll\"><table><thead><tr><th>Magnitud derivada</th><th>Relación de referencia</th><th>Dimensión</th><th>Unidad SI</th></tr></thead><tbody><tr><td>Área</td><td>\\(A=bh\\)</td><td>\\(L^2\\)</td><td>m²</td></tr><tr><td>Volumen</td><td>\\(V=abc\\)</td><td>\\(L^3\\)</td><td>m³</td></tr><tr><td>Densidad</td><td>\\(\\rho=m/V\\)</td><td>\\(ML^{-3}\\)</td><td>kg/m³</td></tr><tr><td>Rapidez y velocidad</td><td>\\(v=d/t\\) (rapidez constante)</td><td>\\(LT^{-1}\\)</td><td>m/s</td></tr><tr><td>Aceleración</td><td>\\(a=\\Delta v/\\Delta t\\)</td><td>\\(LT^{-2}\\)</td><td>m/s²</td></tr><tr><td>Fuerza</td><td>\\(F=ma\\)</td><td>\\(MLT^{-2}\\)</td><td>N</td></tr><tr><td>Trabajo y energía</td><td>\\(W=Fd\\) (fuerza paralela)</td><td>\\(ML^2T^{-2}\\)</td><td>J</td></tr><tr><td>Calor</td><td>\\(Q\\): energía transferida</td><td>\\(ML^2T^{-2}\\)</td><td>J</td></tr><tr><td>Potencia</td><td>\\(\\mathcal P=W/t\\)</td><td>\\(ML^2T^{-3}\\)</td><td>W</td></tr><tr><td>Presión</td><td>\\(p=F_\\perp/A\\)</td><td>\\(ML^{-1}T^{-2}\\)</td><td>Pa</td></tr><tr><td>Impulso</td><td>\\(J_F=F\\Delta t\\) (fuerza constante)</td><td>\\(MLT^{-1}\\)</td><td>N·s</td></tr><tr><td>Cantidad de movimiento</td><td>\\(p_m=mv\\)</td><td>\\(MLT^{-1}\\)</td><td>kg·m/s</td></tr><tr><td>Frecuencia</td><td>\\(f=1/\\tau\\)</td><td>\\(T^{-1}\\)</td><td>Hz</td></tr><tr><td>Carga eléctrica</td><td>\\(q=it\\) (corriente constante)</td><td>\\(IT\\)</td><td>C</td></tr><tr><td>Velocidad angular</td><td>\\(\\omega=\\Delta\\theta/\\Delta t\\)</td><td>\\(T^{-1}\\)</td><td>rad/s</td></tr><tr><td>Torque o momento de una fuerza</td><td>\\(\\tau_F=Fd_\\perp\\)</td><td>\\(ML^2T^{-2}\\)</td><td>N·m</td></tr><tr><td>Constante elástica</td><td>\\(k=F/x\\)</td><td>\\(MT^{-2}\\)</td><td>N/m</td></tr></tbody></table></div>",
  "baseTable": "<div class=\"table-scroll\"><table><thead><tr><th>Magnitud base</th><th>Dimensión</th><th>Unidad SI</th><th>Símbolo</th></tr></thead><tbody><tr><td>Longitud</td><td>\\(L\\)</td><td>metro</td><td>m</td></tr><tr><td>Masa</td><td>\\(M\\)</td><td>kilogramo</td><td>kg</td></tr><tr><td>Tiempo</td><td>\\(T\\)</td><td>segundo</td><td>s</td></tr><tr><td>Temperatura termodinámica</td><td>\\(\\Theta\\)</td><td>kelvin</td><td>K</td></tr><tr><td>Intensidad de corriente eléctrica</td><td>\\(I\\)</td><td>amperio</td><td>A</td></tr><tr><td>Cantidad de sustancia</td><td>\\(N\\)</td><td>mol</td><td>mol</td></tr><tr><td>Intensidad luminosa</td><td>\\(J\\)</td><td>candela</td><td>cd</td></tr></tbody></table></div>",
  "prefixTable": "<div class=\"table-scroll\"><table><thead><tr><th>Prefijo</th><th>Símbolo</th><th>Factor</th></tr></thead><tbody><tr><td>pico</td><td>p</td><td>\\(10^{-12}\\)</td></tr><tr><td>nano</td><td>n</td><td>\\(10^{-9}\\)</td></tr><tr><td>micro</td><td>µ</td><td>\\(10^{-6}\\)</td></tr><tr><td>mili</td><td>m</td><td>\\(10^{-3}\\)</td></tr><tr><td>centi</td><td>c</td><td>\\(10^{-2}\\)</td></tr><tr><td>kilo</td><td>k</td><td>\\(10^3\\)</td></tr><tr><td>mega</td><td>M</td><td>\\(10^6\\)</td></tr><tr><td>giga</td><td>G</td><td>\\(10^9\\)</td></tr></tbody></table></div>"
};
