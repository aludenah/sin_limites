window.DIMENSIONAL_CONTENT = {
  "title": "Análisis Dimensional",
  "intro": "Aprende a medir y clasificar magnitudes físicas y analizar las dimensiones de una ecuación. La teoría incluye aplicaciones explicadas, un mapa conceptual y 25 problemas resueltos para estudiar antes de la práctica.",
  "sourceNote": "Fuente: Magnitudes físicas, Colección Esencial, Lumbreras Editores (material proporcionado). Contenido adaptado con notación revisada y aclaraciones sobre el alcance del análisis dimensional.",
  "lessons": [
    {
      "id": "dim-magnitudes",
      "title": "Magnitudes físicas y su clasificación por origen",
      "subtitle": "Magnitud, valor numérico y unidad",
      "goal": "Identifica las siete magnitudes base del SI y distingue las magnitudes derivadas.",
      "body": "<p>Una <strong>magnitud física</strong> es una propiedad de un cuerpo o fenómeno que puede expresarse cuantitativamente mediante un número y una referencia de medida. Medir consiste en compararla con una unidad de la misma naturaleza.</p><div class=\"equation\">\\[\\ell=2\\,\\mathrm m\\qquad\\underbrace{2}_{\\text{valor numérico}}\\quad\\underbrace{\\mathrm m}_{\\text{unidad}}\\]</div><p>La longitud es la magnitud; 2 es su valor numérico; el metro es la unidad. Si escribimos 200 cm, describimos la misma longitud con otra unidad. Una balanza permite medir masa; una regla, longitud; un cronómetro, intervalos de tiempo; una probeta graduada, volumen.</p><h4>Magnitudes fundamentales o base</h4><p>Son las magnitudes elegidas como punto de partida para expresar las demás. El <strong>Sistema Internacional de Unidades (SI)</strong> utiliza siete.</p><div data-magnitude-explorer=\"base\"></div><p>Los símbolos \\(L,M,T,\\Theta,I,N,J\\) indican dimensiones; no son los símbolos de las unidades. Por ejemplo, \\(M\\) representa la dimensión de masa y kg es el símbolo del kilogramo. El contexto distingue \\(J\\), usado aquí como dimensión luminosa, de J como símbolo del joule.</p><h4>Magnitudes derivadas</h4><p>Se relacionan con las magnitudes base mediante productos, cocientes o potencias. El área se obtiene de dos longitudes; el volumen, de tres; la densidad relaciona masa y volumen; la velocidad relaciona desplazamiento y tiempo.</p><div data-magnitude-explorer=\"derived\"></div><p>Una fuerza elástica puede medirse en newtons; la velocidad de un automóvil, en metros por segundo. El litro y el mililitro son unidades de volumen utilizadas con frecuencia, aunque la unidad coherente del SI es el metro cúbico.</p>",
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
      "title": "El lenguaje del análisis dimensional",
      "subtitle": "Distinguir dimensión y unidad",
      "goal": "Interpreta los corchetes dimensionales y reconoce la estructura de una magnitud.",
      "body": "<p>El <strong>análisis dimensional</strong> estudia las relaciones entre magnitudes mediante sus dimensiones. La dimensión expresa cómo depende una magnitud de las magnitudes base; la unidad es la referencia con la que se mide.</p><p>Escribimos \\([Q]\\) para indicar la dimensión de la magnitud \\(Q\\). Por ejemplo, \\([m]=M\\), \\([d]=L\\) y \\([t]=T\\). En mecánica, una expresión dimensional suele tener la forma siguiente:</p><div class=\"equation\">\\[[Q]=M^aL^bT^c\\]</div><p>Los exponentes pueden ser positivos, negativos, fraccionarios o cero. Cuando intervienen magnitudes eléctricas, térmicas u otras, también se emplean las dimensiones \\(I,\\Theta,N,J\\). No toda relación física puede describirse únicamente con \\(M,L,T\\).</p><h4>La dimensión no depende de la unidad elegida</h4><p>La longitud puede expresarse en metros, centímetros o kilómetros: en todos los casos tiene dimensión \\(L\\). Tanto m/s como km/h son unidades de una magnitud con dimensión \\(LT^{-1}\\).</p><p>Una ecuación dimensional describe una propiedad, no un valor numérico. La operación \\(8\\,\\mathrm m+2\\,\\mathrm{kg}=10\\,\\mathrm s\\) no tiene sentido físico. En cambio, \\(8\\,\\mathrm m+100\\,\\mathrm{cm}=9\\,\\mathrm m\\) compara y suma longitudes.</p><h4>Tabla de consulta interactiva</h4><div data-dimension-explorer></div><p>En este explorador, \\(i\\) es la corriente eléctrica y \\(I\\) su dimensión; \\(\\tau\\) es un período y \\(T\\) la dimensión de tiempo. Una misma letra puede representar magnitudes distintas en problemas distintos: siempre lee su significado.</p><p><strong>Compartir dimensión no significa ser la misma magnitud.</strong> El trabajo y el torque tienen dimensión \\(ML^2T^{-2}\\), pero representan conceptos físicos diferentes. La dimensión, por sí sola, tampoco determina si una magnitud es escalar o vectorial.</p>",
      "key": "La dimensión describe la estructura de una magnitud, pero no identifica de manera única su significado físico.",
      "examples": []
    },
    {
      "id": "dim-deducciones",
      "title": "Deducción de dimensiones",
      "subtitle": "Construir las fórmulas desde relaciones conocidas",
      "goal": "Obtén las dimensiones de once magnitudes y reconoce las dimensiones de constantes físicas.",
      "body": "<p>Para deducir una dimensión, parte de una relación física conocida, reemplaza cada magnitud por su dimensión y simplifica las potencias. Los coeficientes puramente numéricos no modifican la dimensión.</p><p>Por ejemplo, el área de un triángulo es \\(A=bh/2\\). Aunque su fórmula difiere de la del rectángulo, ambas áreas tienen dimensión \\(L^2\\). La dimensión no depende de la forma geométrica.</p><ol><li>Escribe la fórmula que relaciona las magnitudes.</li><li>Coloca corchetes y sustituye las dimensiones conocidas.</li><li>Multiplica, divide o eleva las potencias.</li><li>Comprueba que el resultado corresponde a la unidad de la magnitud.</li></ol><p>Las siguientes once deducciones reúnen el desarrollo de la aplicación del material de estudio. La fuerza, la velocidad y la aceleración pueden tratarse por sus módulos para hallar dimensiones; sus direcciones no cambian el resultado dimensional.</p>",
      "key": "Reconstruir una dimensión a partir de su definición es más útil que memorizarla sin comprenderla.",
      "examples": [
        {
          "title": "Aplicación 6. Once magnitudes derivadas",
          "question": "Determina las dimensiones de área, volumen, velocidad, aceleración, fuerza, densidad, trabajo, potencia, presión, frecuencia y carga eléctrica.",
          "steps": [
            "<strong>a. Área de un rectángulo.</strong> \\(A=bh\\), de modo que \\([A]=[b][h]=L\\cdot L=L^2\\). Base y altura son longitudes.",
            "<strong>b. Volumen de un prisma rectangular.</strong> \\(V=abc\\); por tanto, \\([V]=[a][b][c]=L^3\\).",
            "<strong>c. Rapidez y velocidad.</strong> Para rapidez constante, \\(v=d/t\\), así que \\([v]=L/T=LT^{-1}\\). La velocidad vectorial también tiene esa dimensión, utilizando desplazamiento e intervalo de tiempo.",
            "<strong>d. Aceleración.</strong> \\(a=\\Delta v/\\Delta t\\), luego \\([a]=LT^{-1}/T=LT^{-2}\\).",
            "<strong>e. Fuerza.</strong> De \\(F=ma\\): \\([F]=[m][a]=M(LT^{-2})=MLT^{-2}\\).",
            "<strong>f. Densidad.</strong> \\(\\rho=m/V\\), por lo que \\([\\rho]=M/L^3=ML^{-3}\\).",
            "<strong>g. Trabajo.</strong> Para fuerza constante paralela al desplazamiento, \\(W=Fd\\). Entonces \\([W]=(MLT^{-2})L=ML^2T^{-2}\\). El trabajo general incluye un factor \\(\\cos\\theta\\), que es adimensional.",
            "<strong>h. Potencia media.</strong> \\(\\mathcal P=W/t\\), de donde \\([\\mathcal P]=ML^2T^{-2}/T=ML^2T^{-3}\\).",
            "<strong>i. Presión.</strong> \\(p=F_\\perp/A\\). Entonces \\([p]=MLT^{-2}/L^2=ML^{-1}T^{-2}\\).",
            "<strong>j. Frecuencia.</strong> \\(f=1/\\tau\\), con período \\(\\tau\\); por tanto, \\([f]=T^{-1}\\).",
            "<strong>k. Carga eléctrica.</strong> Para corriente constante, \\(q=it\\). Así, \\([q]=[i][t]=IT\\). Esta dimensión requiere la magnitud base corriente eléctrica."
          ],
          "sourcePage": 11
        },
        {
          "title": "Ejemplo complementario. Impulso y cantidad de movimiento",
          "question": "Compara las dimensiones de \\(J_F=F\\Delta t\\) y \\(p_m=mv\\).",
          "steps": [
            "<div class=\"equation\">\\[[J_F]=(MLT^{-2})T=MLT^{-1}\\]</div>",
            "<div class=\"equation\">\\[[p_m]=M(LT^{-1})=MLT^{-1}\\]</div>",
            "Comparten dimensión, lo que es compatible con la relación entre impulso y cambio de cantidad de movimiento."
          ]
        },
        {
          "title": "Ejemplo complementario. Constante de un resorte",
          "question": "En \\(F=kx\\), \\(F\\) es el módulo de la fuerza elástica y \\(x\\) la deformación. Obtén la dimensión de \\(k\\).",
          "steps": [
            "Despeja \\(k=F/x\\).",
            "<div class=\"equation\">\\[[k]=\\frac{MLT^{-2}}{L}=MT^{-2}\\]</div>",
            "Su unidad SI es N/m. Una constante física puede tener dimensiones."
          ]
        },
        {
          "title": "Ejemplo complementario. Gravitación y constante de Planck",
          "question": "Deduce las dimensiones de \\(G\\) en \\(F=Gm_1m_2/r^2\\) y de \\(h\\) en \\(E=hf\\).",
          "steps": [
            "En la ley de gravitación, \\(r\\) es distancia y \\(m_1,m_2\\) son masas.",
            "<div class=\"equation\">\\[[G]=\\frac{[F][r]^2}{[m_1][m_2]}=\\frac{MLT^{-2}L^2}{M^2}=M^{-1}L^3T^{-2}\\]</div>",
            "En la relación de Planck, \\(E\\) es energía y \\(f\\) frecuencia.",
            "<div class=\"equation\">\\[[h]=\\frac{[E]}{[f]}=\\frac{ML^2T^{-2}}{T^{-1}}=ML^2T^{-1}\\]</div>",
            "G y h son constantes físicas con dimensiones; no deben confundirse con números como 2 o π."
          ]
        }
      ]
    },
    {
      "id": "dim-reglas",
      "title": "Reglas del álgebra dimensional",
      "subtitle": "Productos, cocientes, potencias y cantidades adimensionales",
      "goal": "Aplica las reglas dimensionales e identifica qué puede sumarse y qué debe ser adimensional.",
      "body": "<h4>Regla 1. Sumas y diferencias de magnitudes compatibles</h4><p>Al sumar o restar magnitudes de la misma naturaleza, el resultado conserva esa dimensión. Si \\(v_1\\) y \\(v_2\\) son velocidades comparables, \\([v_1+v_2]=[v_1-v_2]=LT^{-1}\\). No se suman los símbolos dimensionales como si fueran cantidades: no se escribe que la dimensión sea \\(2LT^{-1}\\).</p><p>Aunque el resultado numérico de una diferencia sea cero, la cantidad conserva su tipo: \\(5\\,\\mathrm m-5\\,\\mathrm m=0\\,\\mathrm m\\). Una resta de longitudes no se transforma por ello en una masa.</p><h4>Regla 2. Multiplicación, división y potencias</h4><div class=\"equation\">\\[[AB]=[A][B]\\qquad\\left[\\frac AB\\right]=\\frac{[A]}{[B]}\\qquad[A^n]=[A]^n\\]</div><div class=\"equation\">\\[L\\cdot LT^{-1}=L^2T^{-1}\\qquad\\frac{M^4T^2}{MT^{-1}}=M^3T^3\\]</div><p>Al multiplicar se suman exponentes de la misma base; al dividir se restan; al elevar a una potencia se multiplican. Las raíces son potencias fraccionarias.</p><h4>Regla 3. Dimensión uno</h4><p>Los números y las constantes matemáticas son adimensionales: \\([2]=[\\pi]=[\\sqrt5]=1\\). «Adimensional» significa <strong>dimensión uno</strong>, no valor numérico igual a uno ni dimensión cero. El cociente entre dos longitudes puede valer 3 y seguir siendo adimensional.</p><div class=\"equation\">\\[\\left[\\frac{d_1}{d_2}\\right]=\\frac LL=1\\qquad M^0L^0T^0=1\\]</div><p>Los ángulos planos medidos en radianes son adimensionales, pues se definen mediante un cociente de longitudes. El radián sigue siendo una unidad útil para expresar que la cantidad es un ángulo.</p><h4>Funciones matemáticas</h4><p>Los argumentos de seno, coseno, exponencial y logaritmo deben ser adimensionales. También lo es el exponente de una expresión exponencial con base numérica, como \\(e^x\\).</p><div class=\"equation\">\\[[\\sin\\theta]=[\\cos\\theta]=[\\log b]=[e^x]=1\\qquad[\\theta]=[b]=[x]=1\\]</div><p>Esto no elimina las condiciones matemáticas: para un logaritmo real, su argumento debe ser positivo; su base debe ser positiva y distinta de uno. Si se usa \\(\\log(Q/Q_0)\\), \\(Q\\) y \\(Q_0\\) deben tener la misma dimensión.</p><p>Una potencia de una cantidad dimensional con exponente numérico fijo, como \\(v^2\\), sí puede tener dimensiones. Lo que debe ser adimensional es el exponente, no necesariamente la base de toda potencia.</p>",
      "key": "Constante no significa adimensional: distingue los números puros de las constantes físicas.",
      "examples": [
        {
          "title": "Aplicación 7. Una expresión con presión y área",
          "question": "Si \\(Y=\\pi\\,\\dfrac{pA}{m\\sin\\alpha}\\), con presión \\(p\\), área \\(A\\), masa \\(m\\) y \\(\\sin\\alpha\\ne0\\), determina la dimensión de \\(Y\\) e indica con qué magnitud es compatible.",
          "steps": [
            "Usa \\([p]=ML^{-1}T^{-2}\\), \\([A]=L^2\\), \\([m]=M\\), \\([\\pi]=[\\sin\\alpha]=1\\).",
            "<div class=\"equation\">\\[[Y]=\\frac{(ML^{-1}T^{-2})L^2}{M}=LT^{-2}\\]</div>",
            "El resultado es <strong>compatible con una aceleración</strong>. La dimensión no basta por sí sola para identificar de manera única la magnitud."
          ],
          "sourcePage": 14
        },
        {
          "title": "Ejemplo complementario. Productos y cocientes",
          "question": "Halla la dimensión de \\(Q=Fv/t\\), donde \\(F\\) es fuerza, \\(v\\) rapidez y \\(t\\) tiempo.",
          "steps": [
            "<div class=\"equation\">\\[[Q]=\\frac{(MLT^{-2})(LT^{-1})}{T}=ML^2T^{-4}\\]</div>",
            "La potencia de M es 1; la de L es 1+1=2; la de T es −2−1−1=−4."
          ]
        }
      ]
    },
    {
      "id": "dim-homogeneidad",
      "title": "Principio de homogeneidad",
      "subtitle": "Todos los términos deben ser compatibles",
      "goal": "Comprueba ecuaciones y determina las dimensiones de coeficientes o argumentos.",
      "body": "<p>En una ecuación física, ambos miembros deben tener la misma dimensión. Si hay términos que se suman o restan, <strong>cada término debe tener la misma dimensión</strong>.</p><div class=\"equation\">\\[A+B-C=D\\quad\\Longrightarrow\\quad[A]=[B]=[C]=[D]\\]</div><p>Para aplicar el principio, separa primero los términos. Después calcula la dimensión de cada producto o cociente completo. No supongas que una letra desconocida es adimensional: puede aportar las dimensiones que faltan.</p><div class=\"equation\">\\[x=At^2+Bt+C\\quad\\Longrightarrow\\quad[A]T^2=[B]T=[C]=L\\]</div><p>Así, \\([A]=LT^{-2}\\), \\([B]=LT^{-1}\\) y \\([C]=L\\). Los tres coeficientes pueden tener dimensiones distintas aunque formen parte de la misma expresión.</p><h4>Qué permite comprobar</h4><p>La homogeneidad es una condición <strong>necesaria, pero no suficiente</strong> para la validez de una fórmula. Una incompatibilidad permite rechazarla; una coincidencia no demuestra que describa correctamente el fenómeno.</p><p>Por ejemplo, \\(d=vt\\) y \\(d=2vt\\) tienen la misma estructura dimensional. El análisis dimensional no determina cuál corresponde a un movimiento específico ni obtiene el factor numérico correcto. Tampoco permite sumar trabajo y torque solo porque compartan dimensión: se necesita compatibilidad física.</p>",
      "key": "Las dimensiones detectan incompatibilidades, pero no reemplazan las leyes ni las condiciones del problema.",
      "examples": [
        {
          "title": "Aplicación 8. Comprobación de fórmulas",
          "question": "Comprueba dimensionalmente \\(d=vt\\) y \\(v_f=v_0+at\\), con distancia \\(d\\), tiempo \\(t\\), velocidad \\(v\\) y aceleración \\(a\\).",
          "steps": [
            "<div class=\"equation\">\\[[vt]=(LT^{-1})T=L=[d]\\]</div>",
            "La primera expresión es dimensionalmente homogénea; describe la distancia en un movimiento de rapidez constante bajo las condiciones apropiadas.",
            "<div class=\"equation\">\\[[v_f]=[v_0]=LT^{-1}\\qquad[at]=(LT^{-2})T=LT^{-1}\\]</div>",
            "La segunda expresión también es homogénea. Su aplicación física supone aceleración constante y componentes compatibles."
          ],
          "sourcePage": 15
        },
        {
          "title": "Aplicación 9. Un exponente adimensional",
          "question": "En \\(A=B+C^{SD\\sin\\theta}\\), \\(D\\) es densidad. Determina \\([S]\\) para que el exponente sea adimensional. Se toma \\(C\\) como un número positivo adimensional y un ángulo con \\(\\sin\\theta\\ne0\\).",
          "steps": [
            "El exponente cumple \\([SD\\sin\\theta]=1\\).",
            "<div class=\"equation\">\\[[S](ML^{-3})(1)=1\\]</div>",
            "<div class=\"equation\">\\[[S]=\\frac1{ML^{-3}}=M^{-1}L^3\\]</div>",
            "La condición se obtiene del exponente. Al considerar C adimensional, el término exponencial también lo es; por homogeneidad, A y B deben ser adimensionales."
          ],
          "sourcePage": 16
        },
        {
          "title": "Aplicación 10. Dos coeficientes desconocidos",
          "question": "En la ecuación homogénea \\(20VP=mA+aB\\), \\(V\\) es volumen, \\(P\\) peso, \\(m\\) masa y \\(a\\) aceleración. Encuentra \\([A]\\) y \\([B]\\).",
          "steps": [
            "El peso es una fuerza: \\([P]=MLT^{-2}\\). El volumen tiene dimensión \\(L^3\\).",
            "<div class=\"equation\">\\[[20VP]=L^3(MLT^{-2})=ML^4T^{-2}\\]</div>",
            "Iguala el término \\(mA\\) al miembro izquierdo:",
            "<div class=\"equation\">\\[M[A]=ML^4T^{-2}\\quad\\Rightarrow\\quad[A]=L^4T^{-2}\\]</div>",
            "Iguala ahora el término \\(aB\\):",
            "<div class=\"equation\">\\[(LT^{-2})[B]=ML^4T^{-2}\\quad\\Rightarrow\\quad[B]=ML^3\\]</div>"
          ],
          "sourcePage": 16
        },
        {
          "title": "Ejemplo complementario. Una oscilación",
          "question": "En \\(x=A\\sin(\\omega t+\\varphi)\\), \\(x\\) es posición y \\(t\\) tiempo. Halla \\([A]\\), \\([\\omega]\\) y \\([\\varphi]\\).",
          "steps": [
            "El argumento \\(\\omega t+\\varphi\\) debe ser adimensional. Por homogeneidad, \\([\\omega]T=[\\varphi]=1\\).",
            "<div class=\"equation\">\\[[\\omega]=T^{-1}\\qquad[\\varphi]=1\\]</div>",
            "Como el seno es adimensional, \\([x]=[A]\\), por tanto \\([A]=L\\)."
          ]
        },
        {
          "title": "Ejemplo complementario. Presión y rapidez",
          "question": "En \\(p=Av^2+B\\), \\(p\\) es presión y \\(v\\) rapidez. Halla las dimensiones de A y B.",
          "steps": [
            "<div class=\"equation\">\\[[A](LT^{-1})^2=[B]=ML^{-1}T^{-2}\\]</div>",
            "<div class=\"equation\">\\[[A]=ML^{-3}\\qquad[B]=ML^{-1}T^{-2}\\]</div>",
            "A tiene dimensión de densidad y B dimensión de presión. Esto indica compatibilidad dimensional, sin identificar necesariamente su naturaleza."
          ]
        }
      ]
    },
    {
      "id": "dim-exponentes",
      "title": "Cálculo de exponentes y límites del método",
      "subtitle": "Deducir relaciones de potencias",
      "goal": "Construye un sistema de exponentes y reconoce qué información falta para establecer una ley física.",
      "body": "<p>Si suponemos una relación de potencias \\(Q=C A^aB^b\\), con C adimensional, podemos obtener restricciones sobre los exponentes \\(a,b\\). Sustituimos dimensiones, agrupamos potencias de cada base y comparamos sus exponentes.</p><ol><li>Identifica la magnitud buscada y las variables de las que se supone que depende.</li><li>Declara cuáles constantes son adimensionales.</li><li>Escribe la ecuación dimensional y agrupa \\(M,L,T\\), u otras bases si hacen falta.</li><li>Iguala exponentes de cada base y resuelve el sistema.</li><li>Interpreta el resultado y revisa las condiciones del modelo.</li></ol><p>Este procedimiento usa álgebra y propiedades de potencias; no requiere derivadas ni integrales.</p><h4>Límites del análisis dimensional</h4><p>El método no obtiene factores adimensionales como \\(1/2\\), \\(2\\pi\\) o un coeficiente que deba medirse. El resultado depende de las variables elegidas y de la forma de relación supuesta. Si hay grupos adimensionales, puede quedar indeterminada parte de la relación.</p><p>Una fórmula homogénea todavía debe contrastarse con un modelo físico o con experimentos. La coincidencia dimensional tampoco permite distinguir, por sí sola, energía de torque, ni rapidez de velocidad.</p><h4>Organiza lo aprendido</h4><p>Las magnitudes se clasifican por su <strong>origen</strong> en fundamentales y derivadas, y por su <strong>naturaleza</strong> en escalares y vectoriales. Las dimensiones expresan su relación con las magnitudes base. A partir de ellas podemos deducir dimensiones, comprobar homogeneidad y calcular exponentes.</p>",
      "key": "Los exponentes pueden deducirse bajo una hipótesis; los factores numéricos y la validez física requieren más información.",
      "examples": [
        {
          "title": "Ejemplo complementario. Energía, densidad, rapidez y volumen",
          "question": "Supón \\(E=C\\rho^av^bV^c\\), donde E es energía, \\(\\rho\\) densidad, \\(v\\) rapidez, \\(V\\) volumen y C adimensional. Encuentra a, b y c.",
          "steps": [
            "<div class=\"equation\">\\[ML^2T^{-2}=(ML^{-3})^a(LT^{-1})^b(L^3)^c=M^aL^{-3a+b+3c}T^{-b}\\]</div>",
            "Para M: \\(a=1\\). Para T: \\(-b=-2\\), luego \\(b=2\\).",
            "Para L: \\(-3a+b+3c=2\\). Con los valores anteriores, \\(-3+2+3c=2\\), así que \\(c=1\\).",
            "<div class=\"equation\">\\[E=C\\rho v^2V\\]</div>",
            "El análisis dimensional no determina el valor de C."
          ]
        },
        {
          "title": "Ejemplo complementario. Período de un resorte",
          "question": "Se propone \\(\\tau=Cm^ak^b\\), con período \\(\\tau\\), masa m, constante elástica k y C adimensional. Halla a y b.",
          "steps": [
            "Usa \\([k]=MT^{-2}\\).",
            "<div class=\"equation\">\\[T=M^a(MT^{-2})^b=M^{a+b}T^{-2b}\\]</div>",
            "Iguala exponentes: \\(a+b=0\\) y \\(-2b=1\\).",
            "<div class=\"equation\">\\[a=\\frac12\\qquad b=-\\frac12\\qquad\\tau=C\\sqrt{\\frac mk}\\]</div>",
            "En el modelo ideal de oscilaciones de un sistema masa–resorte, la dinámica da C=2π; el método dimensional no obtiene ese valor."
          ]
        },
        {
          "title": "Ejemplo complementario. Período de un péndulo",
          "question": "Si se supone \\(\\tau=C\\ell^ag^b\\), con longitud \\(\\ell\\), aceleración gravitatoria g y C adimensional, calcula a y b.",
          "steps": [
            "<div class=\"equation\">\\[T=L^a(LT^{-2})^b=L^{a+b}T^{-2b}\\]</div>",
            "Las condiciones son \\(a+b=0\\) y \\(-2b=1\\).",
            "<div class=\"equation\">\\[a=\\frac12\\qquad b=-\\frac12\\qquad\\tau=C\\sqrt{\\frac\\ell g}\\]</div>",
            "En un péndulo simple de pequeña amplitud, C=2π. Para otras amplitudes puede intervenir además el ángulo, que es adimensional."
          ]
        }
      ]
    }
  ],
  "workedExamples": [
    {
      "title": "Fenómenos físicos y químicos",
      "question": "Indica si son fenómenos físicos (F) o químicos (Q): I. Dilatación del mercurio en un termómetro. II. Oxidación de un clavo. III. Freír pescado. IV. Evaporación del agua del mar.",
      "steps": [
        "I. <strong>Físico.</strong> La dilatación cambia el volumen del mercurio sin cambiar su identidad química.",
        "II. <strong>Químico.</strong> El hierro reacciona y se forman productos de oxidación.",
        "III. <strong>Químico.</strong> Durante la cocción ocurren transformaciones químicas en los alimentos.",
        "IV. <strong>Físico.</strong> La evaporación cambia el estado del agua.",
        "Respuesta: <strong>F, Q, Q, F.</strong>"
      ],
      "sourcePage": 18,
      "number": 1
    },
    {
      "title": "Reconoce una magnitud derivada",
      "question": "¿Cuál no es una magnitud fundamental del SI: masa, tiempo, longitud, temperatura o área?",
      "steps": [
        "Masa, tiempo, longitud y temperatura termodinámica son magnitudes base del SI.",
        "El área se obtiene mediante el producto de longitudes, de modo que \\([A]=L^2\\).",
        "Respuesta: <strong>área.</strong>"
      ],
      "sourcePage": 18,
      "number": 2
    },
    {
      "title": "Cuenta las magnitudes derivadas",
      "question": "¿Cuántas no son fundamentales en el SI: presión, área, temperatura, longitud, intensidad de corriente y fuerza?",
      "steps": [
        "Temperatura, longitud e intensidad de corriente son magnitudes base.",
        "Presión, área y fuerza se expresan en función de magnitudes base.",
        "Respuesta: <strong>3 magnitudes derivadas.</strong>"
      ],
      "sourcePage": 19,
      "number": 3
    },
    {
      "title": "Escalares en una lista",
      "question": "¿Cuántas son escalares: distancia, velocidad, masa, temperatura y aceleración?",
      "steps": [
        "Distancia, masa y temperatura no necesitan una dirección para quedar descritas.",
        "Velocidad y aceleración son vectoriales.",
        "Respuesta: <strong>3 escalares.</strong>"
      ],
      "sourcePage": 19,
      "number": 4
    },
    {
      "title": "La excepción vectorial",
      "question": "¿Cuál no es vectorial: aceleración, fuerza, velocidad, desplazamiento o volumen?",
      "steps": [
        "Aceleración, fuerza, velocidad y desplazamiento necesitan dirección y sentido.",
        "El volumen se expresa con un valor numérico y una unidad, sin dirección.",
        "Respuesta: <strong>volumen.</strong>"
      ],
      "sourcePage": 19,
      "number": 5
    },
    {
      "title": "Escalares y vectoriales",
      "question": "Clasifica densidad, fuerza de tensión, trabajo, tiempo, velocidad y aceleración. Indica cuántas son escalares y cuántas vectoriales.",
      "steps": [
        "Escalares: densidad, trabajo y tiempo.",
        "Vectoriales: fuerza de tensión, velocidad y aceleración.",
        "Respuesta: <strong>3 escalares y 3 vectoriales.</strong>"
      ],
      "sourcePage": 19,
      "number": 6
    },
    {
      "title": "Producto de área y volumen",
      "question": "Si \\(x=AB\\), A es área y B es volumen, determina \\([x]\\).",
      "steps": [
        "Las dimensiones conocidas son \\([A]=L^2\\) y \\([B]=L^3\\).",
        "<div class=\"equation\">\\[[x]=[A][B]=L^2L^3=L^{2+3}=L^5\\]</div>",
        "Respuesta: \\(\\boxed{[x]=L^5}\\)."
      ],
      "sourcePage": 20,
      "number": 7
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
      "number": 8
    },
    {
      "title": "Un cociente de productos",
      "question": "Calcula \\([B]\\) en \\(B=Fd^2/(mv^2)\\), con F fuerza, d distancia, m masa y v velocidad.",
      "steps": [
        "<div class=\"equation\">\\[[Fd^2]=(MLT^{-2})L^2=ML^3T^{-2}\\]</div>",
        "<div class=\"equation\">\\[[mv^2]=M(LT^{-1})^2=ML^2T^{-2}\\]</div>",
        "<div class=\"equation\">\\[[B]=\\frac{ML^3T^{-2}}{ML^2T^{-2}}=L\\]</div>",
        "Respuesta: \\(\\boxed{[B]=L}\\)."
      ],
      "sourcePage": 20,
      "number": 9
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
      "number": 10
    },
    {
      "title": "Una razón trigonométrica elevada a una potencia",
      "question": "En \\((\\sec19^\\circ)^{RF/a}\\), F es fuerza y a aceleración. Determina \\([R]\\) para que el exponente sea adimensional.",
      "steps": [
        "La secante de 19° es un número. Por ello, \\([RF/a]=1\\).",
        "<div class=\"equation\">\\[\\frac{[R](MLT^{-2})}{LT^{-2}}=1\\quad\\Rightarrow\\quad[R]M=1\\]</div>",
        "<div class=\"equation\">\\[\\boxed{[R]=M^{-1}}\\]</div>"
      ],
      "sourcePage": 21,
      "number": 11
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
      "number": 12
    },
    {
      "title": "Un factor numérico bajo una raíz",
      "question": "Si \\(E=\\sqrt2\\,kv^2\\), E es energía y v velocidad, determina \\([k]\\). La raíz afecta únicamente al número 2.",
      "steps": [
        "El factor \\(\\sqrt2\\) es adimensional. Por homogeneidad, \\([E]=[k][v]^2\\).",
        "<div class=\"equation\">\\[ML^2T^{-2}=[k](LT^{-1})^2\\]</div>",
        "<div class=\"equation\">\\[\\boxed{[k]=M}\\]</div>"
      ],
      "sourcePage": 21,
      "number": 13
    },
    {
      "title": "Encuentra un exponente",
      "question": "En \\(d=v^x/(a\\sin\\theta)\\), d es distancia, v velocidad y a aceleración. Si \\(\\sin\\theta\\ne0\\), ¿cuál es x?",
      "steps": [
        "<div class=\"equation\">\\[L=\\frac{(LT^{-1})^x}{LT^{-2}}=L^{x-1}T^{2-x}\\]</div>",
        "Compara exponentes: para L, \\(x-1=1\\); para T, \\(2-x=0\\).",
        "Ambas condiciones dan \\(\\boxed{x=2}\\)."
      ],
      "sourcePage": 22,
      "number": 14
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
      "number": 15
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
      "number": 16
    },
    {
      "title": "Una suma dentro de un cociente",
      "question": "Si \\(R=(A+B)\\sin\\alpha/C^2\\), A es velocidad y C densidad. Determina \\([R]\\).",
      "steps": [
        "Para que \\(A+B\\) sea admisible, \\([B]=[A]=LT^{-1}\\). La suma conserva esa dimensión.",
        "<div class=\"equation\">\\[[R]=\\frac{[A+B][\\sin\\alpha]}{[C]^2}=\\frac{LT^{-1}}{(ML^{-3})^2}\\]</div>",
        "<div class=\"equation\">\\[\\boxed{[R]=M^{-2}L^7T^{-1}}\\]</div>"
      ],
      "sourcePage": 23,
      "number": 17
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
      "number": 18
    },
    {
      "title": "Coeficientes en una fuerza",
      "question": "La ecuación \\(F=ka+mv/b\\) es homogénea. F es fuerza, a aceleración, m masa y v velocidad. Obtén \\([k]\\) y \\([b]\\), e indica con qué magnitudes son compatibles.",
      "steps": [
        "<div class=\"equation\">\\[[k]=\\frac{[F]}{[a]}=\\frac{MLT^{-2}}{LT^{-2}}=M\\]</div>",
        "<div class=\"equation\">\\[[b]=\\frac{[m][v]}{[F]}=\\frac{M(LT^{-1})}{MLT^{-2}}=T\\]</div>",
        "Respuesta: <strong>k tiene dimensión de masa y b de tiempo.</strong> Su interpretación concreta depende del modelo físico."
      ],
      "sourcePage": 24,
      "number": 19
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
      "number": 20
    },
    {
      "title": "Amplitud de una oscilación",
      "question": "La amplitud A de un movimiento cumple \\(A=\\sqrt{B^2+(v/W)^2}\\), donde A es longitud y v velocidad. Determina \\([B][W]\\).",
      "steps": [
        "Eleva al cuadrado: \\(A^2=B^2+(v/W)^2\\).",
        "<div class=\"equation\">\\[[B]^2=[A]^2=L^2\\quad\\Rightarrow\\quad[B]=L\\]</div>",
        "<div class=\"equation\">\\[\\frac{[v]^2}{[W]^2}=L^2\\quad\\Rightarrow\\quad[W]^2=\\frac{L^2T^{-2}}{L^2}=T^{-2}\\]</div>",
        "Por ello, \\([W]=T^{-1}\\). En este problema W no representa trabajo: se trata de una constante por determinar.",
        "<div class=\"equation\">\\[\\boxed{[B][W]=LT^{-1}}\\]</div>"
      ],
      "sourcePage": 24,
      "number": 21
    },
    {
      "title": "Exponentes de una energía cinética",
      "question": "Una energía cinética se propone como \\(E=km^av^b\\), con m masa, v velocidad y k una constante adimensional. Determina a y b.",
      "steps": [
        "<div class=\"equation\">\\[ML^2T^{-2}=M^a(LT^{-1})^b=M^aL^bT^{-b}\\]</div>",
        "Para M: \\(a=1\\). Para L: \\(b=2\\). La condición temporal, \\(-b=-2\\), coincide.",
        "Respuesta: \\(\\boxed{a=1,\\quad b=2}\\).",
        "La forma es \\(E=kmv^2\\); el análisis dimensional no permite obtener el valor clásico \\(k=1/2\\)."
      ],
      "sourcePage": 25,
      "number": 22
    },
    {
      "title": "Aceleración centrípeta",
      "question": "En un movimiento circular de radio R, se propone \\(a_{\\mathrm{cp}}=kv^aR^b\\), con rapidez v y k adimensional. Determina los exponentes a y b.",
      "steps": [
        "<div class=\"equation\">\\[LT^{-2}=(LT^{-1})^aL^b=L^{a+b}T^{-a}\\]</div>",
        "Para T: \\(-a=-2\\), entonces \\(a=2\\).",
        "Para L: \\(a+b=1\\), entonces \\(2+b=1\\), de donde \\(b=-1\\).",
        "Respuesta: \\(\\boxed{a=2,\\quad b=-1}\\), compatible con \\(a_{\\mathrm{cp}}=kv^2/R\\)."
      ],
      "sourcePage": 25,
      "number": 23
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
      "number": 24
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
      "number": 25
    }
  ],
  "derivedTable": "<div class=\"table-scroll\"><table><thead><tr><th>Magnitud derivada</th><th>Relación de referencia</th><th>Dimensión</th><th>Unidad SI</th></tr></thead><tbody><tr><td>Área</td><td>\\(A=bh\\)</td><td>\\(L^2\\)</td><td>m²</td></tr><tr><td>Volumen</td><td>\\(V=abc\\)</td><td>\\(L^3\\)</td><td>m³</td></tr><tr><td>Densidad</td><td>\\(\\rho=m/V\\)</td><td>\\(ML^{-3}\\)</td><td>kg/m³</td></tr><tr><td>Rapidez y velocidad</td><td>\\(v=d/t\\) (rapidez constante)</td><td>\\(LT^{-1}\\)</td><td>m/s</td></tr><tr><td>Aceleración</td><td>\\(a=\\Delta v/\\Delta t\\)</td><td>\\(LT^{-2}\\)</td><td>m/s²</td></tr><tr><td>Fuerza</td><td>\\(F=ma\\)</td><td>\\(MLT^{-2}\\)</td><td>N</td></tr><tr><td>Trabajo y energía</td><td>\\(W=Fd\\) (fuerza paralela)</td><td>\\(ML^2T^{-2}\\)</td><td>J</td></tr><tr><td>Calor</td><td>\\(Q\\): energía transferida</td><td>\\(ML^2T^{-2}\\)</td><td>J</td></tr><tr><td>Potencia</td><td>\\(\\mathcal P=W/t\\)</td><td>\\(ML^2T^{-3}\\)</td><td>W</td></tr><tr><td>Presión</td><td>\\(p=F_\\perp/A\\)</td><td>\\(ML^{-1}T^{-2}\\)</td><td>Pa</td></tr><tr><td>Impulso</td><td>\\(J_F=F\\Delta t\\) (fuerza constante)</td><td>\\(MLT^{-1}\\)</td><td>N·s</td></tr><tr><td>Cantidad de movimiento</td><td>\\(p_m=mv\\)</td><td>\\(MLT^{-1}\\)</td><td>kg·m/s</td></tr><tr><td>Frecuencia</td><td>\\(f=1/\\tau\\)</td><td>\\(T^{-1}\\)</td><td>Hz</td></tr><tr><td>Carga eléctrica</td><td>\\(q=it\\) (corriente constante)</td><td>\\(IT\\)</td><td>C</td></tr><tr><td>Velocidad angular</td><td>\\(\\omega=\\Delta\\theta/\\Delta t\\)</td><td>\\(T^{-1}\\)</td><td>rad/s</td></tr><tr><td>Torque o momento de una fuerza</td><td>\\(\\tau_F=Fd_\\perp\\)</td><td>\\(ML^2T^{-2}\\)</td><td>N·m</td></tr><tr><td>Constante elástica</td><td>\\(k=F/x\\)</td><td>\\(MT^{-2}\\)</td><td>N/m</td></tr></tbody></table></div>",
  "baseTable": "<div class=\"table-scroll\"><table><thead><tr><th>Magnitud base</th><th>Dimensión</th><th>Unidad SI</th><th>Símbolo</th></tr></thead><tbody><tr><td>Longitud</td><td>\\(L\\)</td><td>metro</td><td>m</td></tr><tr><td>Masa</td><td>\\(M\\)</td><td>kilogramo</td><td>kg</td></tr><tr><td>Tiempo</td><td>\\(T\\)</td><td>segundo</td><td>s</td></tr><tr><td>Temperatura termodinámica</td><td>\\(\\Theta\\)</td><td>kelvin</td><td>K</td></tr><tr><td>Intensidad de corriente eléctrica</td><td>\\(I\\)</td><td>amperio</td><td>A</td></tr><tr><td>Cantidad de sustancia</td><td>\\(N\\)</td><td>mol</td><td>mol</td></tr><tr><td>Intensidad luminosa</td><td>\\(J\\)</td><td>candela</td><td>cd</td></tr></tbody></table></div>",
  "prefixTable": "<div class=\"table-scroll\"><table><thead><tr><th>Prefijo</th><th>Símbolo</th><th>Factor</th></tr></thead><tbody><tr><td>pico</td><td>p</td><td>\\(10^{-12}\\)</td></tr><tr><td>nano</td><td>n</td><td>\\(10^{-9}\\)</td></tr><tr><td>micro</td><td>µ</td><td>\\(10^{-6}\\)</td></tr><tr><td>mili</td><td>m</td><td>\\(10^{-3}\\)</td></tr><tr><td>centi</td><td>c</td><td>\\(10^{-2}\\)</td></tr><tr><td>kilo</td><td>k</td><td>\\(10^3\\)</td></tr><tr><td>mega</td><td>M</td><td>\\(10^6\\)</td></tr><tr><td>giga</td><td>G</td><td>\\(10^9\\)</td></tr></tbody></table></div>"
};
