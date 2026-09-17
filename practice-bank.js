// One chapter practice; source metadata preserves equivalent previous achievements.
window.CHAPTER_PRACTICES = {
  "fisica-capitulo-01": {
    "title": "Análisis dimensional",
    "problems": [
      {
        "id": "p01",
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
        "level": "Básico",
        "source": {
          "kind": "practice",
          "id": "p1"
        }
      },
      {
        "id": "p02",
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
        "level": "Básico",
        "source": {
          "kind": "practice",
          "id": "p2"
        }
      },
      {
        "id": "p03",
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
        "level": "Básico",
        "source": {
          "kind": "practice",
          "id": "p3"
        }
      },
      {
        "id": "p04",
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
        "level": "Intermedio",
        "source": {
          "kind": "practice",
          "id": "p4"
        }
      },
      {
        "id": "p05",
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
        "level": "Intermedio",
        "source": {
          "kind": "practice",
          "id": "p5"
        }
      },
      {
        "id": "p06",
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
        "level": "Intermedio",
        "source": {
          "kind": "practice",
          "id": "p6"
        }
      },
      {
        "id": "p07",
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
        "level": "Intermedio",
        "source": {
          "kind": "practice",
          "id": "p7"
        }
      },
      {
        "id": "p08",
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
        "level": "Intermedio",
        "source": {
          "kind": "practice",
          "id": "p8"
        }
      },
      {
        "id": "p09",
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
        "level": "Avanzado",
        "source": {
          "kind": "practice",
          "id": "p9"
        }
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
        "level": "Avanzado",
        "source": {
          "kind": "practice",
          "id": "p10"
        }
      }
    ]
  },
  "fisica-capitulo-02": {
    "title": "Vectores",
    "problems": [
      {
        "id": "p01",
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
        "level": "Básico",
        "source": {
          "kind": "practice",
          "id": "p1"
        }
      },
      {
        "id": "p02",
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
        "level": "Básico",
        "source": {
          "kind": "practice",
          "id": "p2"
        }
      },
      {
        "id": "p03",
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
        "level": "Intermedio",
        "source": {
          "kind": "practice",
          "id": "p3"
        }
      },
      {
        "id": "p04",
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
        "level": "Intermedio",
        "source": {
          "kind": "practice",
          "id": "p4"
        }
      },
      {
        "id": "p05",
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
        "level": "Intermedio",
        "source": {
          "kind": "practice",
          "id": "p5"
        }
      },
      {
        "id": "p06",
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
        "level": "Intermedio",
        "source": {
          "kind": "practice",
          "id": "p6"
        }
      },
      {
        "id": "p07",
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
        "level": "Intermedio",
        "source": {
          "kind": "practice",
          "id": "p7"
        }
      },
      {
        "id": "p08",
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
        "level": "Avanzado",
        "source": {
          "kind": "practice",
          "id": "p8"
        }
      },
      {
        "id": "p09",
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
        "level": "Avanzado",
        "source": {
          "kind": "practice",
          "id": "p9"
        }
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
        "level": "Avanzado",
        "source": {
          "kind": "practice",
          "id": "p10"
        }
      }
    ]
  },
  "historia-universal-pdf-02": {
    "title": "Antropogénesis",
    "problems": [
      {
        "prompt": "La relación evolutiva entre humanos y chimpancés actuales se explica por…",
        "solution": "Los dos linajes comparten ancestros y han seguido evolucionando.",
        "level": "Básico",
        "id": "p01",
        "options": [
          "la transformación reciente de chimpancés en humanos",
          "la ausencia de parentesco",
          "la descendencia de humanos a partir de gorilas actuales",
          "un ancestro común",
          "una decisión de cambiar de especie"
        ],
        "answer": 3,
        "topic": "Una evolución ramificada",
        "source": {
          "kind": "quiz",
          "lesson": 0,
          "id": "u1a"
        }
      },
      {
        "prompt": "¿Qué representación describe mejor la evolución humana?",
        "solution": "La evidencia muestra diversidad de especies, extinciones y coexistencias.",
        "level": "Básico",
        "id": "p02",
        "options": [
          "Una escalera con una meta obligatoria",
          "Un árbol con ramas, algunas coexistentes",
          "Una sola especie sin cambios",
          "Una lista de pueblos actuales de inferior a superior",
          "Un cambio ocurrido en una generación"
        ],
        "answer": 1,
        "topic": "Una evolución ramificada",
        "source": {
          "kind": "quiz",
          "lesson": 0,
          "id": "u1b"
        }
      },
      {
        "prompt": "En un conjunto de estratos no alterados, una capa inferior suele ser…",
        "solution": "La superposición permite establecer relaciones de anterioridad, si no hubo alteraciones.",
        "level": "Básico",
        "id": "p03",
        "options": [
          "siempre del mismo año",
          "más reciente por definición",
          "imposible de estudiar",
          "una prueba de escritura",
          "más antigua que la situada encima"
        ],
        "answer": 4,
        "topic": "Cómo se investiga la hominización",
        "source": {
          "kind": "quiz",
          "lesson": 1,
          "id": "u2a"
        }
      },
      {
        "prompt": "¿Qué afirmación sobre la datación es correcta?",
        "solution": "Cada técnica tiene materiales, rangos y márgenes de incertidumbre específicos.",
        "level": "Básico",
        "id": "p04",
        "options": [
          "El carbono 14 fecha cualquier roca",
          "Un hueso revela siempre un año exacto",
          "El método debe elegirse según material y antigüedad",
          "El contexto nunca importa",
          "Todos los fósiles tienen menos de mil años"
        ],
        "answer": 2,
        "topic": "Cómo se investiga la hominización",
        "source": {
          "kind": "quiz",
          "lesson": 1,
          "id": "u2b"
        }
      },
      {
        "prompt": "¿Qué evidencia es especialmente útil para estudiar locomoción bípeda?",
        "solution": "La anatomía y las huellas permiten inferir cómo se desplazaba un organismo.",
        "level": "Básico",
        "id": "p05",
        "options": [
          "La forma de la pelvis y las huellas",
          "La presencia de un alfabeto",
          "Un calendario escrito",
          "Una moneda",
          "Un templo de piedra"
        ],
        "answer": 0,
        "topic": "Bipedismo y cambios anatómicos",
        "source": {
          "kind": "quiz",
          "lesson": 2,
          "id": "u3a"
        }
      },
      {
        "prompt": "¿Qué relación temporal está mejor respaldada?",
        "solution": "Los homininos bípedos tempranos conservaban cerebros relativamente pequeños.",
        "level": "Básico",
        "id": "p06",
        "options": [
          "La escritura precedió al bipedismo",
          "La agricultura produjo los primeros primates",
          "Todos los rasgos humanos surgieron a la vez",
          "El bipedismo precedió a grandes aumentos cerebrales posteriores",
          "El bipedismo apareció después de las ciudades"
        ],
        "answer": 3,
        "topic": "Bipedismo y cambios anatómicos",
        "source": {
          "kind": "quiz",
          "lesson": 2,
          "id": "u3b"
        }
      },
      {
        "prompt": "¿Qué especie participó en dispersiones humanas tempranas fuera de África?",
        "solution": "Homo erectus está documentado en África y Eurasia mucho antes de las migraciones recientes de nuestra especie.",
        "level": "Básico",
        "id": "p07",
        "options": [
          "Homo sapiens como única posibilidad",
          "Homo erectus",
          "Un chimpancé actual",
          "Un gorila actual",
          "Una especie nacida después de la agricultura"
        ],
        "answer": 1,
        "topic": "Diversidad del género Homo",
        "source": {
          "kind": "quiz",
          "lesson": 3,
          "id": "u4a"
        }
      },
      {
        "prompt": "La relación entre neandertales y Homo sapiens incluye…",
        "solution": "Fósiles y ADN permiten reconstruir coexistencia y mezcla entre algunas poblaciones.",
        "level": "Básico",
        "id": "p08",
        "options": [
          "ausencia total de contacto",
          "una transformación instantánea de todos los neandertales",
          "convivencia con dinosaurios no avianos",
          "el mismo origen que la escritura",
          "coexistencia e intercambios genéticos"
        ],
        "answer": 4,
        "topic": "Diversidad del género Homo",
        "source": {
          "kind": "quiz",
          "lesson": 3,
          "id": "u4b"
        }
      },
      {
        "prompt": "¿Dónde se originó Homo sapiens según la evidencia disponible?",
        "solution": "Los fósiles y los estudios genéticos sitúan el origen de nuestra especie en África.",
        "level": "Básico",
        "id": "p09",
        "options": [
          "En la Europa medieval",
          "En América durante el Neolítico",
          "En África",
          "En Australia después de la escritura",
          "En Mesopotamia con las ciudades"
        ],
        "answer": 2,
        "topic": "Homo sapiens y cultura acumulativa",
        "source": {
          "kind": "quiz",
          "lesson": 4,
          "id": "u5a"
        }
      },
      {
        "prompt": "Transmitir una técnica y mejorarla entre generaciones es un ejemplo de…",
        "solution": "La cultura acumulativa combina transmisión social e innovación.",
        "level": "Básico",
        "id": "p10",
        "options": [
          "cultura acumulativa",
          "cambio de especie inmediato",
          "ausencia de aprendizaje",
          "fósil sin contexto",
          "datación radiométrica"
        ],
        "answer": 0,
        "topic": "Homo sapiens y cultura acumulativa",
        "source": {
          "kind": "quiz",
          "lesson": 4,
          "id": "u5b"
        }
      }
    ]
  },
  "historia-universal-pdf-03": {
    "title": "Comunidad primitiva en el mundo",
    "problems": [
      {
        "prompt": "Que una sociedad no haya dejado escritura significa que…",
        "solution": "Los restos materiales y ambientales permiten investigar sociedades sin escritura.",
        "level": "Básico",
        "id": "p01",
        "options": [
          "careció de historia",
          "no tuvo conocimientos",
          "debe estudiarse también mediante otras evidencias",
          "no modificó su ambiente",
          "no mantuvo relaciones sociales"
        ],
        "answer": 2,
        "topic": "Estudiar sociedades sin escritura",
        "source": {
          "kind": "quiz",
          "lesson": 0,
          "id": "u1b"
        }
      },
      {
        "prompt": "Un desplazamiento estacional hacia recursos conocidos indica…",
        "solution": "La movilidad puede responder a conocimientos del ambiente y de sus ciclos.",
        "level": "Básico",
        "id": "p02",
        "options": [
          "una estrategia organizada de movilidad",
          "ausencia de planificación",
          "agricultura necesariamente",
          "escritura obligatoria",
          "vida urbana"
        ],
        "answer": 0,
        "topic": "Subsistencia y movilidad",
        "source": {
          "kind": "quiz",
          "lesson": 1,
          "id": "u2a"
        }
      },
      {
        "prompt": "¿Qué aporta mayor sustento para conocer la función de una herramienta?",
        "solution": "Distintos indicios permiten contrastar la función propuesta.",
        "level": "Básico",
        "id": "p03",
        "options": [
          "Usar solo su color",
          "Combinar huellas de uso, residuos y contexto",
          "Suponer que toda piedra era un arma",
          "Ignorar dónde apareció",
          "Asignarle un nombre moderno"
        ],
        "answer": 1,
        "topic": "Tecnología y aprovechamiento del fuego",
        "source": {
          "kind": "quiz",
          "lesson": 2,
          "id": "u3a"
        }
      },
      {
        "prompt": "¿Qué conclusión es prudente ante una pintura prehistórica?",
        "solution": "Las imágenes son evidencia, pero su interpretación requiere contexto.",
        "level": "Básico",
        "id": "p04",
        "options": [
          "Su significado debe investigarse y puede ser incierto",
          "Todas tuvieron una única función conocida",
          "Permite conocer palabras exactas",
          "Demuestra una religión moderna concreta",
          "No aporta información alguna"
        ],
        "answer": 0,
        "topic": "Expresión simbólica y vida social",
        "source": {
          "kind": "quiz",
          "lesson": 3,
          "id": "u4b"
        }
      },
      {
        "prompt": "Un asentamiento estable junto a recursos silvestres abundantes demuestra que…",
        "solution": "Algunas comunidades podían reducir su movilidad sin cultivar.",
        "level": "Básico",
        "id": "p05",
        "options": [
          "todo poblado ya tenía escritura",
          "sedentarismo y agricultura no son conceptos idénticos",
          "la pesca exige metalurgia",
          "no existió recolección",
          "la agricultura surgió simultáneamente en el mundo"
        ],
        "answer": 1,
        "topic": "Mesolítico y nuevos ambientes",
        "source": {
          "kind": "quiz",
          "lesson": 4,
          "id": "u5b"
        }
      },
      {
        "prompt": "La domesticación se diferencia del amansamiento porque involucra…",
        "solution": "La domesticación es un proceso poblacional y heredable, no solo conductual individual.",
        "level": "Básico",
        "id": "p06",
        "options": [
          "cambios en poblaciones a lo largo de generaciones",
          "solo acostumbrar un individuo",
          "únicamente construir una casa",
          "fabricar una herramienta de hierro",
          "aprender a escribir"
        ],
        "answer": 0,
        "topic": "Producir alimentos",
        "source": {
          "kind": "quiz",
          "lesson": 5,
          "id": "u6a"
        }
      },
      {
        "prompt": "¿Qué riesgo puede aumentar al depender mucho de pocas cosechas?",
        "solution": "Una producción concentrada puede resultar vulnerable a sequías, plagas u otros problemas.",
        "level": "Básico",
        "id": "p07",
        "options": [
          "La imposibilidad de almacenar",
          "La desaparición de enfermedades",
          "La eliminación de conflictos",
          "La ausencia de plagas",
          "La vulnerabilidad ante una mala temporada"
        ],
        "answer": 4,
        "topic": "Aldeas y sedentarismo",
        "source": {
          "kind": "quiz",
          "lesson": 6,
          "id": "u7b"
        }
      },
      {
        "prompt": "¿Qué evidencia sugiere contactos entre regiones?",
        "solution": "Los materiales no locales permiten estudiar circulación e intercambio.",
        "level": "Básico",
        "id": "p08",
        "options": [
          "Solo una piedra local común",
          "La ausencia de objetos",
          "Un material cuya fuente geológica está lejos del asentamiento",
          "Un único hoyo sin contexto",
          "La forma circular del poblado"
        ],
        "answer": 2,
        "topic": "Tecnologías e intercambio",
        "source": {
          "kind": "quiz",
          "lesson": 7,
          "id": "u8a"
        }
      },
      {
        "prompt": "El bronce de estaño combina principalmente…",
        "solution": "Es una aleación de cobre y estaño.",
        "level": "Básico",
        "id": "p09",
        "options": [
          "hierro y carbono",
          "oro y plata",
          "cobre y oxígeno únicamente",
          "cobre y estaño",
          "piedra y arcilla"
        ],
        "answer": 3,
        "topic": "Cobre, bronce y hierro",
        "source": {
          "kind": "quiz",
          "lesson": 8,
          "id": "u9a"
        }
      },
      {
        "prompt": "¿Qué afirmación interpreta mejor la revolución neolítica?",
        "solution": "La expresión destaca su alcance; los procesos fueron regionales y graduales.",
        "level": "Básico",
        "id": "p10",
        "options": [
          "Una mejora instantánea para todos",
          "Una única fecha mundial",
          "Cambios profundos y prolongados, con efectos diversos",
          "La aparición inmediata de todos los imperios",
          "El fin completo de la caza"
        ],
        "answer": 2,
        "topic": "De las aldeas a sociedades complejas",
        "source": {
          "kind": "quiz",
          "lesson": 9,
          "id": "u10b"
        }
      }
    ]
  },
  "historia-universal-pdf-04": {
    "title": "Esclavismo y Mesopotamia",
    "problems": [
      {
        "prompt": "¿Qué dato permite reconocer con mayor claridad una situación de esclavitud?",
        "options": [
          "La venta de una persona privada de libertad",
          "El cultivo de cereales",
          "El uso de herramientas",
          "La residencia en una ciudad",
          "La entrega de una ofrenda"
        ],
        "answer": 0,
        "solution": "La privación de libertad y la posibilidad de vender a la persona indican una relación de esclavitud.",
        "level": "Aplicación",
        "id": "p01",
        "topic": "Esclavismo y formas de dependencia",
        "source": {
          "kind": "quiz",
          "lesson": 0,
          "id": "u1a"
        }
      },
      {
        "prompt": "¿Qué afirmación describe mejor el trabajo en Mesopotamia?",
        "options": [
          "Todos eran esclavos",
          "Coexistían distintas condiciones de libertad y dependencia",
          "No existían campesinos",
          "Nadie pagaba tributos",
          "Todos tenían derechos iguales"
        ],
        "answer": 1,
        "solution": "Templos, palacios y hogares articulaban trabajadores de condiciones diversas; no debe homogeneizarse la población.",
        "level": "Aplicación",
        "id": "p02",
        "topic": "Esclavismo y formas de dependencia",
        "source": {
          "kind": "quiz",
          "lesson": 0,
          "id": "u1b"
        }
      },
      {
        "prompt": "¿Qué asociación geográfica es correcta?",
        "solution": "La región mesopotámica se vincula a las cuencas del Tigris y el Éufrates.",
        "level": "Básico",
        "id": "p03",
        "options": [
          "Egipto — Indo y Ganges",
          "Mesopotamia — Tigris y Éufrates",
          "Mesopotamia — Nilo",
          "Egipto — Huang He",
          "Mesopotamia — Amazonas"
        ],
        "answer": 1,
        "topic": "Ríos, agricultura y ciudades",
        "source": {
          "kind": "quiz",
          "lesson": 1,
          "id": "u2a"
        }
      },
      {
        "prompt": "¿Qué afirmación explica mejor el surgimiento de Estados?",
        "solution": "La formación estatal fue un proceso multicausal.",
        "level": "Básico",
        "id": "p04",
        "options": [
          "Los ríos los crearon automáticamente",
          "Solo importó una invención aislada",
          "Toda aldea fue un imperio",
          "No hubo decisiones humanas",
          "Intervinieron factores ambientales, económicos y políticos"
        ],
        "answer": 4,
        "topic": "Ríos, agricultura y ciudades",
        "source": {
          "kind": "quiz",
          "lesson": 1,
          "id": "u2b"
        }
      },
      {
        "prompt": "¿Qué ciudad se asocia con el desarrollo urbano temprano del sur mesopotámico?",
        "solution": "Uruk fue uno de los grandes centros urbanos tempranos de Mesopotamia.",
        "level": "Básico",
        "id": "p05",
        "options": [
          "Atenas",
          "Roma",
          "Uruk",
          "Tenochtitlan",
          "Cartago"
        ],
        "answer": 2,
        "topic": "Sumer: ciudades y escritura",
        "source": {
          "kind": "quiz",
          "lesson": 2,
          "id": "u3a"
        }
      },
      {
        "prompt": "La escritura cuneiforme recibe su nombre de…",
        "solution": "Muchos signos se producían presionando un instrumento sobre arcilla.",
        "level": "Básico",
        "id": "p06",
        "options": [
          "las impresiones con forma de cuña",
          "el uso exclusivo de letras latinas",
          "la forma circular del papiro",
          "los jeroglíficos del Nilo",
          "la impresión con máquinas modernas"
        ],
        "answer": 0,
        "topic": "Sumer: ciudades y escritura",
        "source": {
          "kind": "quiz",
          "lesson": 2,
          "id": "u3b"
        }
      },
      {
        "prompt": "Hammurabi se vincula principalmente con…",
        "solution": "Fue un rey de Babilonia conocido por la estela que contiene disposiciones legales.",
        "level": "Básico",
        "id": "p07",
        "options": [
          "la democracia ateniense",
          "la unificación de Italia",
          "la escritura latina",
          "Babilonia y una colección de disposiciones legales",
          "las pirámides de Guiza"
        ],
        "answer": 3,
        "topic": "Reinos e imperios mesopotámicos",
        "source": {
          "kind": "quiz",
          "lesson": 3,
          "id": "u4a"
        }
      },
      {
        "prompt": "¿Qué distingue un imperio de una ciudad-Estado?",
        "solution": "La escala de dominación territorial es una diferencia importante.",
        "level": "Básico",
        "id": "p08",
        "options": [
          "La ausencia de autoridades",
          "El dominio de múltiples territorios y poblaciones",
          "La inexistencia de tributos",
          "El uso obligatorio de papiro",
          "Tener solo un barrio urbano"
        ],
        "answer": 1,
        "topic": "Reinos e imperios mesopotámicos",
        "source": {
          "kind": "quiz",
          "lesson": 3,
          "id": "u4b"
        }
      },
      {
        "prompt": "Un zigurat se relaciona principalmente con…",
        "options": [
          "un anfiteatro romano",
          "una fábrica moderna",
          "un complejo religioso",
          "una tumba imperial china",
          "un puerto fenicio"
        ],
        "answer": 2,
        "solution": "El zigurat era una construcción escalonada asociada al espacio sagrado mesopotámico.",
        "level": "Aplicación",
        "id": "p09",
        "topic": "Cultura y legado mesopotámicos",
        "source": {
          "kind": "quiz",
          "lesson": 4,
          "id": "u5a"
        }
      },
      {
        "prompt": "El sistema sexagesimal utiliza como base…",
        "options": [
          "diez",
          "dos",
          "cien",
          "sesenta",
          "doce"
        ],
        "answer": 3,
        "solution": "La base sesenta se reconoce en herencias de la medición del tiempo y los ángulos.",
        "level": "Aplicación",
        "id": "p10",
        "topic": "Cultura y legado mesopotámicos",
        "source": {
          "kind": "quiz",
          "lesson": 4,
          "id": "u5b"
        }
      }
    ]
  },
  "historia-universal-pdf-05": {
    "title": "Egipto",
    "problems": [
      {
        "prompt": "El Bajo Egipto se encontraba principalmente en…",
        "solution": "Bajo se refiere a la parte final del curso del río.",
        "level": "Básico",
        "id": "p01",
        "options": [
          "la zona sur del valle por definición",
          "el valle del Éufrates",
          "la península itálica",
          "la región del Indo",
          "el delta del Nilo, al norte"
        ],
        "answer": 4,
        "topic": "Egipto: el Nilo y el Estado faraónico",
        "source": {
          "kind": "quiz",
          "lesson": 0,
          "id": "u1a"
        }
      },
      {
        "prompt": "La unificación egipcia se sitúa convencionalmente hacia…",
        "solution": "Se asocia con el proceso de formación estatal de comienzos del periodo dinástico.",
        "level": "Básico",
        "id": "p02",
        "options": [
          "3100 a. C.",
          "3100 d. C.",
          "1789 d. C.",
          "476 d. C.",
          "1492 d. C."
        ],
        "answer": 0,
        "topic": "Unificación de Egipto",
        "source": {
          "kind": "exam",
          "id": "e3"
        }
      },
      {
        "prompt": "Las grandes pirámides de Guiza se asocian con el…",
        "options": [
          "Imperio romano",
          "Imperio Nuevo exclusivamente",
          "Periodo ptolemaico",
          "Reino persa aqueménida",
          "Imperio Antiguo"
        ],
        "answer": 4,
        "solution": "Su construcción corresponde al tercer milenio a. C., durante el Imperio Antiguo.",
        "level": "Aplicación",
        "id": "p03",
        "topic": "Periodos del Egipto faraónico",
        "source": {
          "kind": "quiz",
          "lesson": 1,
          "id": "u2a"
        }
      },
      {
        "prompt": "La alternancia de imperios y periodos intermedios muestra…",
        "options": [
          "cambios en el grado de centralización política",
          "una cultura sin cambios",
          "la ausencia de Estado",
          "el fin permanente de la agricultura",
          "que todos los faraones gobernaron juntos"
        ],
        "answer": 0,
        "solution": "La autoridad estatal varió: hubo centralización y también fragmentación, sin desaparecer toda continuidad cultural.",
        "level": "Aplicación",
        "id": "p04",
        "topic": "Periodos del Egipto faraónico",
        "source": {
          "kind": "quiz",
          "lesson": 1,
          "id": "u2b"
        }
      },
      {
        "prompt": "La función de los escribas incluía…",
        "solution": "La formación en escritura era importante para administrar y comunicar.",
        "level": "Básico",
        "id": "p05",
        "options": [
          "elaborar registros administrativos y otros textos",
          "solo combatir en todas las guerras",
          "eliminar cualquier tributo",
          "impedir toda actividad religiosa",
          "fabricar exclusivamente armas"
        ],
        "answer": 0,
        "topic": "Trabajo, creencias y escritura en Egipto",
        "source": {
          "kind": "quiz",
          "lesson": 2,
          "id": "u3a"
        }
      },
      {
        "prompt": "La momificación se relaciona principalmente con…",
        "solution": "La conservación del cuerpo formó parte de ciertos tratamientos funerarios.",
        "level": "Básico",
        "id": "p06",
        "options": [
          "el sistema democrático ateniense",
          "la fabricación de monedas",
          "el alfabeto romano",
          "prácticas funerarias y creencias sobre la vida después de la muerte",
          "la agricultura mecanizada"
        ],
        "answer": 3,
        "topic": "Trabajo, creencias y escritura en Egipto",
        "source": {
          "kind": "quiz",
          "lesson": 2,
          "id": "u3b"
        }
      },
      {
        "prompt": "¿Qué afirmación sobre los jeroglíficos es adecuada?",
        "solution": "Podían representar sonidos, palabras y funciones complementarias.",
        "level": "Básico",
        "id": "p07",
        "options": [
          "Fueron únicamente decoración sin lenguaje",
          "Constituyeron un sistema de escritura con signos de distintos valores",
          "Eran letras latinas modernas",
          "Solo representaban números decimales actuales",
          "Se imprimían con tipos móviles"
        ],
        "answer": 1,
        "topic": "Escritura egipcia",
        "source": {
          "kind": "exam",
          "id": "e5"
        }
      },
      {
        "prompt": "¿Qué afirmación sobre las pirámides es más rigurosa?",
        "options": [
          "Fueron construidas sin recursos",
          "Todas fueron puertos",
          "Su construcción exigió una organización compleja del trabajo",
          "Prueban que todos los egipcios eran esclavos",
          "Carecían de función funeraria"
        ],
        "answer": 2,
        "solution": "La evidencia permite estudiar equipos, abastecimiento y organización estatal; no autoriza una generalización sobre esclavitud.",
        "level": "Aplicación",
        "id": "p08",
        "topic": "Escritura, conocimientos y monumentos",
        "source": {
          "kind": "quiz",
          "lesson": 3,
          "id": "u4b"
        }
      },
      {
        "prompt": "Egipto pasó a dominio romano en…",
        "options": [
          "476 d. C.",
          "1492 d. C.",
          "3100 a. C.",
          "30 a. C.",
          "1789 d. C."
        ],
        "answer": 3,
        "solution": "La incorporación a Roma ocurrió en 30 a. C., después de Accio y del final del gobierno de Cleopatra VII.",
        "level": "Aplicación",
        "id": "p09",
        "topic": "Egipto ante los imperios y su legado",
        "source": {
          "kind": "quiz",
          "lesson": 4,
          "id": "u5a"
        }
      },
      {
        "prompt": "La etapa ptolemaica permite estudiar…",
        "options": [
          "la ausencia de ciudades",
          "una época anterior a las pirámides",
          "el origen de la escritura china",
          "la conquista de América",
          "contactos entre tradiciones egipcias y griegas"
        ],
        "answer": 4,
        "solution": "El reino ptolemaico reunió prácticas e instituciones de origen egipcio y griego en un nuevo contexto político.",
        "level": "Aplicación",
        "id": "p10",
        "topic": "Egipto ante los imperios y su legado",
        "source": {
          "kind": "quiz",
          "lesson": 4,
          "id": "u5b"
        }
      }
    ]
  },
  "historia-universal-pdf-06": {
    "title": "India y China antiguas",
    "problems": [
      {
        "prompt": "Harappa y Mohenjo-daro pertenecen a la civilización del…",
        "options": [
          "Indo",
          "Nilo",
          "Tíber",
          "Éufrates",
          "Danubio"
        ],
        "answer": 0,
        "solution": "Son centros urbanos del valle del Indo, conocidos por sus restos arqueológicos.",
        "level": "Aplicación",
        "id": "p01",
        "topic": "El medio geográfico y la civilización del Indo",
        "source": {
          "kind": "quiz",
          "lesson": 0,
          "id": "u1a"
        }
      },
      {
        "prompt": "¿Por qué hay límites para conocer las instituciones del Indo?",
        "options": [
          "No se han encontrado ciudades",
          "Su escritura no tiene un desciframiento aceptado",
          "Todos los restos son modernos",
          "No existió comercio",
          "Sus ríos estaban en Egipto"
        ],
        "answer": 1,
        "solution": "La arqueología informa sobre su sociedad, pero la escritura no descifrada limita el acceso a sus propios registros.",
        "level": "Aplicación",
        "id": "p02",
        "topic": "El medio geográfico y la civilización del Indo",
        "source": {
          "kind": "quiz",
          "lesson": 0,
          "id": "u1b"
        }
      },
      {
        "prompt": "En el esquema de los varnas, los brahmanes se asocian al…",
        "options": [
          "gobierno romano",
          "comercio fenicio exclusivamente",
          "ejército persa",
          "sacerdocio y los rituales",
          "cultivo del Nilo"
        ],
        "answer": 3,
        "solution": "Los brahmanes ocupaban la posición vinculada al saber ritual y sacerdotal en ese orden normativo.",
        "level": "Aplicación",
        "id": "p03",
        "topic": "Sociedad y tradiciones de la India védica",
        "source": {
          "kind": "quiz",
          "lesson": 1,
          "id": "u2b"
        }
      },
      {
        "prompt": "Ashoka se relaciona con…",
        "options": [
          "la fundación de Roma",
          "las pirámides de Guiza",
          "el Imperio carolingio",
          "la conquista de América",
          "el Imperio maurya y el patrocinio del budismo"
        ],
        "answer": 4,
        "solution": "Ashoka fue un soberano maurya del siglo III a. C. y favoreció la difusión budista.",
        "level": "Aplicación",
        "id": "p04",
        "topic": "Budismo y unificación maurya",
        "source": {
          "kind": "quiz",
          "lesson": 2,
          "id": "u3a"
        }
      },
      {
        "prompt": "¿Qué resume mejor una enseñanza budista?",
        "options": [
          "Superar el sufrimiento mediante un camino ético y de comprensión",
          "Conquistar todos los territorios",
          "Eliminar toda reflexión",
          "Garantizar un alma individual eterna",
          "Adorar obligatoriamente al emperador Qin"
        ],
        "answer": 0,
        "solution": "El budismo propone un camino de liberación del sufrimiento; no se resume en la eternidad de un alma individual.",
        "level": "Aplicación",
        "id": "p05",
        "topic": "Budismo y unificación maurya",
        "source": {
          "kind": "quiz",
          "lesson": 2,
          "id": "u3b"
        }
      },
      {
        "prompt": "El Huang He es conocido como el río…",
        "options": [
          "Nilo",
          "Amarillo",
          "Tíber",
          "Ganges",
          "Jordán"
        ],
        "answer": 1,
        "solution": "Huang He corresponde al río Amarillo, una de las grandes cuencas del norte de China.",
        "level": "Aplicación",
        "id": "p06",
        "topic": "China antigua: territorio y primeras sociedades",
        "source": {
          "kind": "quiz",
          "lesson": 3,
          "id": "u4a"
        }
      },
      {
        "prompt": "La educación moral y el ejemplo del gobernante son centrales en el…",
        "options": [
          "culto romano a Marte",
          "código de Hammurabi exclusivamente",
          "sistema feudal europeo",
          "confucianismo",
          "urbanismo del Indo"
        ],
        "answer": 3,
        "solution": "Confucio atribuyó importancia al aprendizaje, la virtud y la responsabilidad en las relaciones sociales.",
        "level": "Aplicación",
        "id": "p07",
        "topic": "Confucianismo y taoísmo",
        "source": {
          "kind": "quiz",
          "lesson": 4,
          "id": "u5a"
        }
      },
      {
        "prompt": "¿Cuál es una interpretación adecuada de wu wei?",
        "options": [
          "No actuar nunca bajo ninguna circunstancia",
          "Conquistar mediante guerras continuas",
          "Prohibir todo aprendizaje",
          "Construir solo con bronce",
          "Actuar sin forzar o imponer de manera excesiva"
        ],
        "answer": 4,
        "solution": "Wu wei alude a la acción sin forzamiento; traducirlo como inactividad absoluta pierde su sentido filosófico.",
        "level": "Aplicación",
        "id": "p08",
        "topic": "Confucianismo y taoísmo",
        "source": {
          "kind": "quiz",
          "lesson": 4,
          "id": "u5b"
        }
      },
      {
        "prompt": "La unificación imperial Qin se sitúa en…",
        "options": [
          "221 a. C.",
          "1789 d. C.",
          "476 d. C.",
          "1492 d. C.",
          "1917 d. C."
        ],
        "answer": 0,
        "solution": "En 221 a. C., Qin Shi Huang culminó la conquista de los reinos rivales y encabezó un imperio unificado.",
        "level": "Aplicación",
        "id": "p09",
        "topic": "La unificación Qin y los aportes chinos",
        "source": {
          "kind": "quiz",
          "lesson": 5,
          "id": "u6a"
        }
      },
      {
        "prompt": "¿Qué afirmación sobre los aportes chinos es correcta?",
        "options": [
          "Todos fueron inventados por Qin",
          "Se desarrollaron en distintas épocas y circularon mediante intercambios",
          "Aparecieron en un mismo año",
          "No tuvieron usos prácticos",
          "La pólvora precedió siempre a la agricultura"
        ],
        "answer": 1,
        "solution": "Los avances tienen cronologías diferentes; su influencia dependió también de transmisión y adaptación.",
        "level": "Aplicación",
        "id": "p10",
        "topic": "La unificación Qin y los aportes chinos",
        "source": {
          "kind": "quiz",
          "lesson": 5,
          "id": "u6b"
        }
      }
    ]
  },
  "historia-universal-presentacion-01": {
    "title": "La ciencia histórica",
    "problems": [
      {
        "id": "p01",
        "prompt": "La crisis económica iniciada en 1929 y la expansión del fascismo se estudian como un conjunto de procesos de varios años. ¿Qué escala temporal se está utilizando?",
        "options": [
          "Coyuntura",
          "Un instante aislado",
          "Una fecha conmemorativa",
          "Una estructura permanente e inmutable",
          "Una predicción"
        ],
        "answer": 0,
        "solution": "Se analiza una coyuntura: procesos relacionados de mediana duración. Una sesión de la caída bursátil puede estudiarse como acontecimiento; la crisis y sus efectos requieren una escala más amplia.",
        "topic": "Tiempo histórico",
        "source": {
          "kind": "reading",
          "id": "q1",
          "index": 0
        }
      },
      {
        "id": "p02",
        "prompt": "¿Cuál expresa mejor la utilidad de estudiar historia?",
        "options": [
          "Predecir con exactitud todos los hechos futuros",
          "Memorizar nombres sin explicar procesos",
          "Comprender el presente y orientar decisiones sobre el futuro",
          "Demostrar que ninguna sociedad cambia",
          "Aceptar todos los testimonios sin contrastarlos"
        ],
        "answer": 2,
        "solution": "La historia permite comprender cómo se formaron las sociedades y reflexionar sobre decisiones presentes. Ofrece experiencias y argumentos; no predice el futuro con exactitud.",
        "topic": "Importancia",
        "source": {
          "kind": "reading",
          "id": "q2",
          "index": 1
        }
      },
      {
        "id": "p03",
        "prompt": "Una investigadora contrasta una carta, una vasija y una entrevista para reconstruir un proceso social. En conjunto, estos testimonios son…",
        "options": [
          "disciplinas auxiliares",
          "periodizaciones tradicionales",
          "fuerzas productivas",
          "fuentes históricas",
          "escuelas historiográficas"
        ],
        "answer": 3,
        "solution": "Son fuentes históricas: evidencias utilizadas para investigar el pasado. Las disciplinas auxiliares aportan herramientas para examinarlas; no son los testimonios mismos.",
        "topic": "Fuentes",
        "source": {
          "kind": "reading",
          "id": "q3",
          "index": 2
        }
      },
      {
        "id": "p04",
        "prompt": "Para leer las formas de escritura de un manuscrito antiguo, ¿qué disciplina resulta especialmente pertinente?",
        "options": [
          "Numismática",
          "Paleografía",
          "Heráldica",
          "Economía",
          "Paleontología"
        ],
        "answer": 1,
        "solution": "La paleografía estudia escrituras antiguas y ayuda a leer manuscritos. La numismática se ocupa de monedas; la heráldica, de escudos; y la paleontología, de fósiles.",
        "topic": "Disciplinas",
        "source": {
          "kind": "reading",
          "id": "q4",
          "index": 3
        }
      },
      {
        "id": "p05",
        "prompt": "Selecciona la combinación de enunciados correctos.",
        "options": [
          "Solo I y II",
          "Solo II y IV",
          "I, II y III",
          "Solo III",
          "I, III y IV"
        ],
        "answer": 4,
        "solution": "I es correcta: una crónica es una fuente escrita. II es falsa: la arqueología tiene como evidencia central los restos materiales en su contexto. III y IV corresponden a fuentes orales y etnológicas.",
        "topic": "Clasificación de fuentes",
        "statements": [
          "I. Las crónicas son fuentes escritas.",
          "II. Los documentos escritos son la principal evidencia arqueológica.",
          "III. Las entrevistas a testigos son fuentes orales.",
          "IV. Las costumbres vigentes pueden estudiarse como fuentes etnológicas."
        ],
        "source": {
          "kind": "reading",
          "id": "q5",
          "index": 4
        }
      },
      {
        "id": "p06",
        "prompt": "Si una periodización usa acontecimientos europeos como límites para explicar por igual a todas las sociedades, ¿qué problema presenta?",
        "options": [
          "Eurocentrismo",
          "Interdisciplinariedad",
          "Crítica documental",
          "Diversidad de fuentes",
          "Análisis de la duración"
        ],
        "answer": 0,
        "solution": "El problema es el eurocentrismo: generalizar referencias europeas como si organizaran por igual todas las trayectorias históricas. Conviene contrastarlas con procesos y cronologías regionales.",
        "topic": "Periodización tradicional",
        "source": {
          "kind": "reading",
          "id": "q6",
          "index": 5
        }
      },
      {
        "id": "p07",
        "prompt": "En la periodización materialista, el criterio principal para distinguir etapas es…",
        "options": [
          "el nombre de los grandes gobernantes",
          "la caída de capitales europeas",
          "la organización económica y las relaciones sociales",
          "el cambio de un calendario por otro",
          "la existencia de fotografías"
        ],
        "answer": 2,
        "solution": "El criterio central es cómo se organizan la producción, la propiedad y las relaciones entre grupos sociales. Las fechas ayudan a situar los procesos, pero no son el criterio principal de división.",
        "topic": "Periodización materialista",
        "source": {
          "kind": "reading",
          "id": "q7",
          "index": 6
        }
      },
      {
        "topic": "Crítica de fuentes",
        "prompt": "Dos testimonios sobre una protesta ofrecen versiones diferentes. ¿Qué procedimiento ayuda más a investigarla?",
        "options": [
          "Elegir el testimonio más largo",
          "Aceptar solo el de la persona con mayor autoridad",
          "Descartar ambos por ser diferentes",
          "Copiar la versión más repetida",
          "Examinar la autoría, el contexto y la finalidad de cada testimonio y contrastarlos con otras evidencias"
        ],
        "answer": 4,
        "solution": "La crítica de fuentes estudia quién produjo cada testimonio, en qué circunstancias y con qué finalidad. El contraste permite reconocer coincidencias, diferencias y posibles sesgos; una discrepancia no vuelve inútil una fuente.",
        "id": "p08"
      },
      {
        "topic": "Protagonistas de la historia",
        "prompt": "Una investigación explica una reforma educativa considerando a docentes, familias, estudiantes y autoridades. ¿Qué enfoque sobre los protagonistas aplica?",
        "options": [
          "Solo las autoridades producen cambios históricos",
          "Los cambios involucran individuos y grupos sociales con distintas formas de participación",
          "Las familias están fuera de la historia",
          "Todos los participantes tienen necesariamente el mismo poder",
          "Las decisiones individuales nunca influyen en los procesos"
        ],
        "answer": 1,
        "solution": "Los procesos históricos resultan de acciones y relaciones entre individuos, grupos e instituciones. Reconocer varios protagonistas permite comparar sus intereses y su capacidad de intervenir, sin suponer que todos tuvieron el mismo poder.",
        "id": "p09"
      },
      {
        "topic": "Historiografía",
        "prompt": "Un estudio analiza durante varios siglos la alimentación, el clima y la vida cotidiana mediante aportes de la geografía y la economía. ¿Con qué orientación historiográfica se relaciona especialmente?",
        "options": [
          "La escuela de los Annales",
          "Una explicación centrada exclusivamente en batallas",
          "La predicción exacta del futuro",
          "La memorización de gobernantes como única tarea histórica",
          "La sustitución de las evidencias por leyendas"
        ],
        "answer": 0,
        "solution": "La escuela de los Annales amplió la investigación hacia la vida social, la economía, los ambientes y distintas duraciones históricas, mediante el diálogo con otras disciplinas. El caso presenta esas características.",
        "id": "p10"
      }
    ]
  }
};
