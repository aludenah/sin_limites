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

Object.assign(window.CHAPTER_PRACTICES,{
  "historia-del-peru-capitulo-01": {
    "title": "Historia del Perú: conceptos básicos y periodización",
    "problems": [
      {
        "id": "p01",
        "options": [
          "Ordenar gobernantes sin examinar sus sociedades.",
          "Relacionar cambios en la producción, el poder y la vida de distintos grupos.",
          "Considerar que las fronteras actuales existieron siempre.",
          "Aceptar cualquier tradición como una descripción literal.",
          "Explicar todos los cambios únicamente por el clima."
        ],
        "answer": 1,
        "topic": "Objeto de estudio",
        "prompt": "¿Qué investigación corresponde mejor a una explicación histórica del Perú?",
        "solution": "La historia explica procesos sociales mediante evidencias. Incluye decisiones, economía, cultura y relaciones de poder; no se limita a una lista de autoridades ni a una sola causa."
      },
      {
        "id": "p02",
        "options": [
          "La primera es una interpretación y el segundo una fecha exacta.",
          "Ambos términos designan solamente una ceremonia en Lima.",
          "El proceso excluye campañas militares y decisiones regionales.",
          "La primera es un acontecimiento; el segundo incluye cambios y acciones de mayor duración.",
          "La proclamación demuestra que todas las relaciones sociales cambiaron ese día."
        ],
        "answer": 3,
        "topic": "Hecho y proceso",
        "prompt": "La proclamación de 1821 y el proceso de independencia se diferencian porque:",
        "solution": "Un acontecimiento puede formar parte de un proceso sin agotarlo. La independencia involucró territorios, actores y etapas diferentes, además de continuidades sociales."
      },
      {
        "id": "p03",
        "options": [
          "Examinar su propósito y contrastarla con testimonios y registros de otros grupos.",
          "Aceptarla por ser un documento de la época.",
          "Descartarla sin leerla por proceder de una autoridad.",
          "Usarla como prueba directa de la opinión de cada habitante.",
          "Decidir su veracidad solo por la antigüedad del papel."
        ],
        "answer": 0,
        "topic": "Crítica de fuentes",
        "prompt": "Un funcionario colonial asegura que una medida fue aceptada por toda la población. ¿Cómo evaluar su afirmación?",
        "solution": "Ser una fuente contemporánea no garantiza imparcialidad. El documento informa sobre la posición del funcionario; la aceptación general requiere evidencias adicionales."
      },
      {
        "id": "p04",
        "options": [
          "Excluir a los gobernantes de cualquier explicación.",
          "Probar que la geografía determina una única organización.",
          "Sustituir las evidencias por recuerdos personales.",
          "Suponer que todos los miembros tenían el mismo poder.",
          "Reconocer la participación de actores colectivos en los procesos históricos."
        ],
        "answer": 4,
        "topic": "Protagonistas",
        "prompt": "Estudiar el trabajo de comunidades en el mantenimiento de canales permite:",
        "solution": "Las decisiones y el trabajo colectivos también transforman la sociedad. Reconocerlos no elimina diferencias internas ni impide estudiar a las autoridades."
      },
      {
        "id": "p05",
        "options": [
          "José de la Riva Agüero y Osma.",
          "Fernando Silva Santisteban.",
          "José Carlos Mariátegui.",
          "Max Uhle.",
          "Rafael Larco Hoyle."
        ],
        "answer": 2,
        "topic": "Historiografía",
        "prompt": "¿Qué autor se asocia especialmente con el análisis de la tierra, la cuestión indígena y las relaciones económicas desde una perspectiva marxista?",
        "solution": "Mariátegui dio un lugar central a esos problemas en su interpretación de la realidad peruana. Identificar su enfoque no significa confundir todas sus interpretaciones con hechos indiscutibles."
      },
      {
        "id": "p06",
        "options": [
          "Jorge Basadre.",
          "Florentino Ameghino.",
          "Aleš Hrdlička.",
          "Julio C. Tello.",
          "Paul Rivet."
        ],
        "answer": 0,
        "topic": "Historia republicana",
        "prompt": "Un estudio analiza las posibilidades y oportunidades desaprovechadas de la república. ¿Con qué historiador se relaciona mejor ese énfasis?",
        "solution": "Basadre dedicó una parte central de su obra a la república, sus dificultades y posibilidades. Los otros autores se asocian con problemas de arqueología o poblamiento."
      },
      {
        "id": "p07",
        "options": [
          "La independencia jurídica elimina cualquier influencia económica.",
          "Toda deuda convierte automáticamente a un país en colonia.",
          "La soberanía jurídica y las relaciones económicas son dimensiones diferentes.",
          "La dependencia solo puede existir antes de 1821.",
          "La autonomía significa ausencia absoluta de intercambio."
        ],
        "answer": 2,
        "topic": "Periodización de Macera",
        "prompt": "En el esquema de autonomía y dependencia, una república puede ser políticamente independiente y económicamente dependiente porque:",
        "solution": "Macera utiliza la dependencia como criterio interpretativo. El poder económico externo no equivale necesariamente a dominio colonial ni anula por sí mismo la soberanía jurídica."
      },
      {
        "id": "p08",
        "options": [
          "Autonomía, dependencia y aislamiento.",
          "Perú antiguo, Perú colonial y Perú republicano.",
          "Lítico, Arcaico y República Aristocrática.",
          "Horizonte Temprano, Horizonte Medio y república.",
          "Conquista, Formativo e independencia."
        ],
        "answer": 1,
        "topic": "Silva Santisteban",
        "prompt": "¿Qué secuencia corresponde a la periodización general de Fernando Silva Santisteban?",
        "solution": "El esquema distingue tres grandes etapas. Es útil para ubicarse, pero dentro de cada una hubo sociedades, regiones y ritmos de cambio diferentes."
      },
      {
        "id": "p09",
        "options": [
          "Los centros de Chavín mantuvieron relaciones con otras regiones.",
          "Las fronteras actuales ayudan a localizar sitios antiguos.",
          "Una crónica puede estudiarse como fuente escrita.",
          "Una misma región tuvo diferentes organizaciones a lo largo del tiempo.",
          "Los habitantes de Chavín ejercían ciudadanía en la república peruana."
        ],
        "answer": 4,
        "topic": "Anacronismo",
        "prompt": "¿Cuál de las siguientes afirmaciones contiene un anacronismo?",
        "solution": "La ciudadanía republicana pertenece a un contexto muy posterior a Chavín. Aplicarla a sus habitantes traslada una institución fuera de su época."
      },
      {
        "id": "p10",
        "options": [
          "Modificar la fecha del hallazgo para que coincida.",
          "Considerar que los periodos son divisiones naturales inmutables.",
          "Ignorar toda evidencia que contradiga el esquema.",
          "Verificar el hallazgo y revisar el esquema si las evidencias lo requieren.",
          "Descartar la periodización sin examinar el nuevo contexto."
        ],
        "answer": 3,
        "topic": "Evidencia y periodización",
        "prompt": "Un nuevo hallazgo no encaja en una periodización aceptada. ¿Qué procedimiento es más adecuado?",
        "solution": "Las periodizaciones son herramientas explicativas. La revisión debe apoyarse en evidencias comprobadas, no en acomodar los datos ni en rechazar un esquema sin análisis."
      }
    ]
  },
  "historia-del-peru-capitulo-02": {
    "title": "Poblamiento americano",
    "problems": [
      {
        "id": "p01",
        "options": [
          "El origen de todas las especies humanas en América.",
          "La formación del Estado peruano republicano.",
          "El comienzo de la alfarería en Chavín.",
          "La expansión de los primeros imperios andinos.",
          "La llegada y dispersión de Homo sapiens en América."
        ],
        "answer": 4,
        "topic": "Pregunta central",
        "prompt": "¿Qué estudia específicamente el poblamiento americano?",
        "solution": "Poblamiento y origen de la especie son preguntas distintas. Los grupos que ingresaron a América ya eran Homo sapiens y poseían conocimientos y formas de cooperación."
      },
      {
        "id": "p02",
        "options": [
          "La elevación del nivel del mar por deshielo.",
          "El descenso del nivel del mar al quedar agua retenida en grandes masas de hielo.",
          "La construcción de un paso artificial.",
          "La desaparición de todas las plantas de Asia.",
          "El desplazamiento de la Antártida hasta Alaska."
        ],
        "answer": 1,
        "topic": "Beringia",
        "prompt": "¿Qué cambio favoreció la exposición de Beringia durante fases frías del Pleistoceno?",
        "solution": "La retención de agua en los hielos redujo el nivel marino y dejó expuestas tierras. Beringia era una región extensa, no un puente angosto de hielo."
      },
      {
        "id": "p03",
        "options": [
          "El ingreso exclusivo por un corredor de Panamá.",
          "La llegada austral mediante la Antártida.",
          "Una raíz americana demostrada por el viaje Kon-Tiki.",
          "El origen de la humanidad en las pampas argentinas.",
          "La difusión de Chavín desde la costa norte."
        ],
        "answer": 3,
        "topic": "Autoctonismo",
        "prompt": "¿Qué propuesta se asocia con Florentino Ameghino?",
        "solution": "Ameghino defendió un origen americano de la humanidad. La revisión de restos y contextos dejó esa propuesta sin sustento; se estudia como parte de la historia de la investigación."
      },
      {
        "id": "p04",
        "options": [
          "Reconociendo su énfasis asiático y revisando su cronología y simplificaciones.",
          "Aceptando sus antiguas clasificaciones raciales como prueba suficiente.",
          "Suponiendo que toda su propuesta conserva validez sin cambios.",
          "Confundiéndola con un origen humano en Argentina.",
          "Afirmando que se basó en la cerámica de Valdivia."
        ],
        "answer": 0,
        "topic": "Hrdlička",
        "prompt": "¿Cómo debe valorarse la propuesta de Hrdlička?",
        "solution": "La conexión con el noreste de Asia es importante. Eso no valida automáticamente una única migración tardía ni las antiguas clasificaciones físicas usadas por el autor."
      },
      {
        "id": "p05",
        "options": [
          "Rivet — origen de Homo sapiens en las pampas.",
          "Ameghino — ingreso asiático por Beringia.",
          "Mendes Correia — propuesta de una ruta austral mediante la Antártida.",
          "Hrdlička — civilización andina originada en Valdivia.",
          "Heyerdahl — excavación de Monte Verde II."
        ],
        "answer": 2,
        "topic": "Comparación de teorías",
        "prompt": "¿Qué asociación es correcta?",
        "solution": "Mendes Correia planteó la ruta austral. La asociación identifica una propuesta histórica, que no cuenta con evidencia suficiente para explicar el poblamiento inicial."
      },
      {
        "id": "p06",
        "options": [
          "Que los primeros americanos llegaron necesariamente de Polinesia.",
          "Que toda semejanza cultural prueba una migración.",
          "Que Beringia nunca fue transitable.",
          "Que una travesía determinada desde Sudamérica hacia Polinesia era viable.",
          "Que la humanidad se originó en América del Sur."
        ],
        "answer": 3,
        "topic": "Prueba experimental",
        "prompt": "La expedición Kon-Tiki demuestra principalmente:",
        "solution": "La expedición prueba viabilidad bajo ciertas condiciones. No demuestra que esa migración ocurriera en la antigüedad y su dirección fue desde América hacia Polinesia."
      },
      {
        "id": "p07",
        "options": [
          "La idea de que Clovis representa la primera presencia humana en todo el continente.",
          "La existencia de seres humanos antes de la alfarería.",
          "La necesidad de fechar materiales arqueológicos.",
          "La existencia de ocupaciones en Sudamérica.",
          "La importancia de conservar contextos de excavación."
        ],
        "answer": 0,
        "topic": "Monte Verde",
        "prompt": "La ocupación de Monte Verde II, cercana a 14 500 años de antigüedad, cuestiona principalmente:",
        "solution": "Monte Verde II es anterior a Clovis y se encuentra muy al sur. Demuestra presencia previa en ese lugar, pero no fija por sí solo la primera llegada al continente."
      },
      {
        "id": "p08",
        "options": [
          "Una roca antigua y una fotografía sin procedencia.",
          "Una semejanza física y una tradición sin fecha.",
          "Un objeto llamativo sin registro y una fecha estimada a simple vista.",
          "Una hipótesis popular y ausencia de análisis del sitio.",
          "Huellas humanas identificables, contexto conservado y dataciones compatibles."
        ],
        "answer": 4,
        "topic": "Evaluación de hallazgos",
        "prompt": "¿Qué combinación fortalece una afirmación de presencia humana muy antigua?",
        "solution": "La antigüedad necesita vincularse de manera segura con actividad humana. Contexto y datación permiten evaluar esa relación y contrastar los resultados."
      },
      {
        "id": "p09",
        "options": [
          "14 500 años de antigüedad significa exactamente 14 500 a. n. e.",
          "Una edad expresada en años AP debe distinguirse de una fecha a. n. e.",
          "AP usa cada año una referencia distinta según la fecha de lectura.",
          "La fecha de una roca equivale siempre a la de su talla.",
          "La calibración elimina toda incertidumbre arqueológica."
        ],
        "answer": 1,
        "topic": "Sistemas de fechas",
        "prompt": "¿Qué afirmación interpreta correctamente las fechas arqueológicas?",
        "solution": "AP o BP usa convencionalmente 1950 como referencia. Las fechas de calendario y las edades no son expresiones equivalentes, y el radiocarbono requiere calibración."
      },
      {
        "id": "p10",
        "options": [
          "Elegir siempre el trayecto más corto en un mapa actual.",
          "Suponer que toda costa antigua está hoy expuesta.",
          "Comprobar que sus condiciones de uso sean compatibles con las fechas de ocupación.",
          "Considerar que cualquier paso terrestre fue habitable en todo momento.",
          "Descartar recursos marinos por no ser agricultura."
        ],
        "answer": 2,
        "topic": "Rutas de dispersión",
        "prompt": "Para evaluar una posible ruta costera o interior, lo más importante es:",
        "solution": "Una ruta necesita condiciones de tránsito y subsistencia en el periodo estudiado. Un trazado posible hoy no demuestra que fuera utilizable durante la primera dispersión."
      }
    ]
  },
  "historia-del-peru-capitulo-03": {
    "title": "Comunidad primitiva en el Perú",
    "problems": [
      {
        "id": "p01",
        "options": [
          "Ausencia total de conocimiento del territorio.",
          "Una prueba de agricultura intensiva en todos los lugares.",
          "Una estrategia de aprovechamiento de recursos conocidos y variables.",
          "Una consecuencia inevitable de no tener cultura.",
          "La existencia de un gobierno centralizado de toda la costa."
        ],
        "answer": 2,
        "topic": "Ambiente y movilidad",
        "prompt": "El traslado estacional entre lomas, valles y litoral puede explicarse como:",
        "solution": "La movilidad podía organizarse según ciclos de recursos. No implica desorientación ni permite deducir por sí sola la forma de gobierno."
      },
      {
        "id": "p02",
        "options": [
          "Que pertenece a una secuencia anterior a la presencia habitual de alfarería.",
          "Que carece de cualquier conocimiento técnico.",
          "Que nunca tuvo arquitectura colectiva.",
          "Que todos sus habitantes eran cazadores nómadas.",
          "Que su población no mantuvo intercambios."
        ],
        "answer": 0,
        "topic": "Categorías arqueológicas",
        "prompt": "¿Qué significa principalmente llamar precerámico a un contexto?",
        "solution": "Precerámico es una categoría vinculada a una tecnología. La ausencia de vasijas no impide textiles, edificios, sedentarismo ni organización compleja."
      },
      {
        "id": "p03",
        "options": [
          "Caral — cerámica moche del valle de Supe.",
          "Toquepala — mantos funerarios de Paracas.",
          "Lauricocha — geoglifos de la costa sur.",
          "Paiján — arquitectura inca de Cusco.",
          "Chivateros — aprovisionamiento y trabajo de piedra en el valle del Chillón."
        ],
        "answer": 4,
        "topic": "Sitios del Lítico",
        "prompt": "¿Qué asociación entre sitio y evidencia es correcta?",
        "solution": "Chivateros permite estudiar obtención y talla de materia prima lítica. Los demás pares mezclan sitios, periodos o evidencias diferentes."
      },
      {
        "id": "p04",
        "options": [
          "La administración escrita del Estado Wari.",
          "Representaciones vinculadas a la caza y actividades colectivas.",
          "Las genealogías exactas de todos los habitantes.",
          "La fecha de invención de la metalurgia en América.",
          "La organización de los talleres textiles paracas."
        ],
        "answer": 1,
        "topic": "Arte rupestre",
        "prompt": "Las escenas de Toquepala permiten investigar principalmente:",
        "solution": "Las pinturas muestran figuras y relaciones que pueden interpretarse en conexión con la caza. No revelan automáticamente todos los significados rituales de sus autores."
      },
      {
        "id": "p05",
        "options": [
          "Recoger únicamente frutos silvestres sin intervenir.",
          "Encontrar una llama domesticada en un rebaño.",
          "Observar cambios heredables asociados a selección prolongada.",
          "Sembrar y cuidar plantas sin haber comprobado cambios heredables en ellas.",
          "Identificar una población vegetal domesticada en varios contextos."
        ],
        "answer": 3,
        "topic": "Producción de alimentos",
        "prompt": "¿Qué situación describe cultivo, pero no demuestra por sí sola domesticación?",
        "solution": "Cultivar es intervenir en el crecimiento. La domesticación implica cambios heredables en poblaciones; ambos procesos se relacionan, pero no son idénticos."
      },
      {
        "id": "p06",
        "options": [
          "El origen del Estado inca.",
          "El cultivo temprano y el uso de plantas como zapallo, maní y algodón.",
          "La expansión de los geoglifos nasca.",
          "La construcción de la Portada del Sol.",
          "La administración republicana de las haciendas."
        ],
        "answer": 1,
        "topic": "Nanchoc",
        "prompt": "Nanchoc es una referencia importante para estudiar:",
        "solution": "Las evidencias de Nanchoc ayudan a reconstruir producción vegetal temprana y dieta. El algodón recuerda que cultivar también podía proporcionar fibras y materiales."
      },
      {
        "id": "p07",
        "options": [
          "Cahuachi, en la costa sur.",
          "Garagay, en Lima.",
          "Sipán, en Lambayeque.",
          "Maranga, en el valle del Rímac.",
          "Telarmachay, en Junín."
        ],
        "answer": 4,
        "topic": "Pastoreo",
        "prompt": "¿Qué sitio es especialmente relevante para investigar la relación entre cazadores de camélidos y el desarrollo del pastoreo?",
        "solution": "Telarmachay es un abrigo altoandino estudiado en relación con el manejo de camélidos. La domesticación se reconstruye como proceso prolongado, no como un hecho instantáneo."
      },
      {
        "id": "p08",
        "options": [
          "Que la agricultura eliminó necesariamente toda pesca.",
          "Que la presencia de plantas impide hablar de sedentarismo.",
          "Que pesca y cultivo pudieron coexistir en su economía.",
          "Que todos los alimentos eran importados.",
          "Que el sitio pertenece obligatoriamente al periodo Inca."
        ],
        "answer": 2,
        "topic": "Economías combinadas",
        "prompt": "Una aldea contiene restos de pescado, redes y plantas cultivadas. La conclusión más adecuada es:",
        "solution": "Las actividades de subsistencia no se reemplazaron siempre de manera completa. Su combinación podía diversificar recursos y reducir riesgos."
      },
      {
        "id": "p09",
        "options": [
          "Distinguir la fase precerámica Mito de fases posteriores con cerámica.",
          "Atribuir todas sus ocupaciones a un mismo año.",
          "Considerar que las manos cruzadas son una escritura descifrada.",
          "Trasladar sus rasgos a todos los sitios de la costa norte.",
          "Afirmar que toda fase del sitio careció de edificios rituales."
        ],
        "answer": 0,
        "topic": "Kotosh",
        "prompt": "¿Qué precaución es correcta al estudiar Kotosh?",
        "solution": "Un sitio puede contener varias fases. Distinguirlas evita atribuir cerámica o arquitectura de un momento a toda la secuencia de ocupación."
      },
      {
        "id": "p10",
        "options": [
          "Demuestra que Chavín fue anterior a todas las aldeas.",
          "Prueba que la alfarería es indispensable para cualquier centro complejo.",
          "Permite conocer con certeza los nombres de todos sus gobernantes.",
          "Combina organización compleja y arquitectura monumental en un contexto precerámico.",
          "Muestra que pesca y agricultura no podían relacionarse."
        ],
        "answer": 3,
        "topic": "Caral",
        "prompt": "¿Por qué Caral es importante para discutir el origen de la civilización andina?",
        "solution": "Caral obliga a ampliar los criterios usados para reconocer complejidad social. Sus obras y relaciones económicas no dependen de la presencia de cerámica."
      }
    ]
  },
  "historia-del-peru-capitulo-04": {
    "title": "Teorías sobre el origen de la cultura peruana",
    "problems": [
      {
        "id": "p01",
        "options": [
          "Las comunidades cazadoras y recolectoras ya poseían conocimientos y prácticas culturales.",
          "La cultura apareció únicamente con la cerámica.",
          "Solo las sociedades con Estado tienen cultura.",
          "La cultura depende de escribir con alfabeto.",
          "Las sociedades sin templos carecen de aprendizaje social."
        ],
        "answer": 0,
        "topic": "Cultura y complejidad",
        "prompt": "¿Qué afirmación utiliza correctamente el concepto de cultura?",
        "solution": "Cultura es un concepto amplio. El capítulo estudia el origen de sociedades complejas, no el inicio de toda capacidad cultural."
      },
      {
        "id": "p02",
        "options": [
          "Desde Caral hacia Egipto y después a México.",
          "Desde la república peruana hacia Chavín.",
          "Desde Australia por la Antártida hasta la costa norte.",
          "Desde Tiahuanaco hacia las pampas para originar Homo sapiens.",
          "Desde Mesoamérica hacia la costa peruana y luego hacia la sierra."
        ],
        "answer": 4,
        "topic": "Uhle",
        "prompt": "¿Qué recorrido de influencia propuso el inmigracionismo de Max Uhle?",
        "solution": "Uhle defendió un impulso externo mesoamericano que llegaría a la costa. La propuesta es histórica: no se considera demostrada como origen de la civilización andina."
      },
      {
        "id": "p03",
        "options": [
          "Cupisnique como colonia maya.",
          "Valdivia como capital de los incas.",
          "Chavín como cultura matriz y una explicación con raíces amazónicas.",
          "Moche como origen de Homo sapiens.",
          "Caral como centro derivado de la república."
        ],
        "answer": 2,
        "topic": "Tello",
        "prompt": "¿Qué combinación corresponde a la propuesta de Julio C. Tello?",
        "solution": "Tello destacó el desarrollo autóctono y relacionó la iconografía chavín con la Amazonía. Los centros anteriores a Chavín obligaron a revisar su condición de matriz inicial absoluta."
      },
      {
        "id": "p04",
        "options": [
          "Niega la existencia de cerámica fuera de Chavín.",
          "Sostiene que los primeros humanos surgieron en Argentina.",
          "Identifica únicamente el clima como causa de toda cultura.",
          "Propone antecedentes exteriores comunes, en vez de una simple derivación maya del Perú.",
          "Afirma que no hubo relaciones entre regiones."
        ],
        "answer": 3,
        "topic": "Kauffmann Doig",
        "prompt": "¿Qué distingue el aloctonismo de la explicación de Uhle?",
        "solution": "En una formulación conocida, Kauffmann Doig destacó Valdivia como antecedente. La antigüedad cerámica no demuestra por sí sola una raíz única de toda organización social."
      },
      {
        "id": "p05",
        "options": [
          "Clovis.",
          "Cupisnique.",
          "Monte Verde.",
          "Lauricocha.",
          "Tiahuanaco."
        ],
        "answer": 1,
        "topic": "Larco Hoyle",
        "prompt": "¿Qué tradición ocupó un lugar central en la defensa de un origen costeño formulada por Larco Hoyle?",
        "solution": "Larco Hoyle destacó Cupisnique y la costa norte al discutir la primacía de Chavín. Su énfasis permite reconocer trayectorias costeñas propias."
      },
      {
        "id": "p06",
        "options": [
          "Un origen humano en las pampas.",
          "Un aislamiento absoluto y permanente.",
          "El hologenismo, que relaciona procesos internos y aportes externos.",
          "La idea de que toda semejanza implica conquista.",
          "Una explicación que elimina la capacidad de decisión local."
        ],
        "answer": 2,
        "topic": "Hologenismo",
        "prompt": "Una comunidad adopta una técnica externa y la transforma según recursos locales. ¿Qué enfoque permite explicar mejor ambas dimensiones?",
        "solution": "El enfoque de Luis G. Lumbreras destaca el desarrollo interno y la adaptación de aportes. Recibir una técnica no convierte a una población en receptora pasiva de toda su cultura."
      },
      {
        "id": "p07",
        "options": [
          "Solo cuál de las dos resulta más vistosa.",
          "El país actual donde se exhiben.",
          "La popularidad de la hipótesis en redes sociales.",
          "Fechas, técnicas, materias primas y contextos de circulación.",
          "La nacionalidad del primer coleccionista."
        ],
        "answer": 3,
        "topic": "Pruebas de contacto",
        "prompt": "Dos vasijas de regiones distintas se parecen. ¿Qué conviene investigar antes de afirmar una transmisión directa?",
        "solution": "Una semejanza admite varias explicaciones, como intercambio, imitación o soluciones similares. Las evidencias adicionales permiten distinguirlas."
      },
      {
        "id": "p08",
        "options": [
          "La cerámica es una condición indispensable para la complejidad social.",
          "Toda sociedad posee cultura.",
          "La arquitectura requiere trabajo.",
          "Las teorías deben contrastarse con evidencias.",
          "Las poblaciones pueden intercambiar recursos."
        ],
        "answer": 0,
        "topic": "Caral y los criterios",
        "prompt": "El estudio de Caral cuestiona principalmente la idea de que:",
        "solution": "Caral presenta organización y arquitectura complejas en un contexto precerámico. Por ello no basta usar la alfarería como único indicador de civilización."
      },
      {
        "id": "p09",
        "options": [
          "Control político permanente del lugar de origen.",
          "Migración de toda la población del lugar receptor.",
          "Ausencia de producción local en la región.",
          "Identidad completa de las religiones de ambos lugares.",
          "Circulación de bienes entre lugares."
        ],
        "answer": 4,
        "topic": "Difusión y poder",
        "prompt": "Un objeto importado, con procedencia bien identificada, demuestra de manera más directa:",
        "solution": "La procedencia apoya la existencia de circulación. Conquista, migración y adopción religiosa requieren evidencias específicas adicionales."
      },
      {
        "id": "p10",
        "options": [
          "Aceptar la conclusión por la fama de su autor.",
          "Revisar esa conclusión y evaluar por separado los demás aportes del investigador.",
          "Eliminar toda la obra del autor sin examinarla.",
          "Cambiar las fechas para conservar la teoría.",
          "Suponer que todas las hipótesis son igualmente válidas."
        ],
        "answer": 1,
        "topic": "Evaluación de teorías",
        "prompt": "Si nuevos fechados contradicen una conclusión clásica, el procedimiento más adecuado es:",
        "solution": "El conocimiento se revisa mediante evidencias. Una conclusión refutada no invalida automáticamente todas las observaciones o métodos de quien la formuló."
      }
    ]
  },
  "historia-del-peru-capitulo-05": {
    "title": "Formativo andino",
    "problems": [
      {
        "id": "p01",
        "options": [
          "Inicio de toda cultura y desaparición de la cooperación.",
          "Generalización de la ciudadanía republicana.",
          "Abandono completo de la agricultura por la ganadería.",
          "Ampliación agrícola, especialización y consolidación de centros ceremoniales.",
          "Sustitución inmediata de todas las regiones por un Estado único."
        ],
        "answer": 3,
        "topic": "Formativo",
        "prompt": "¿Qué conjunto de procesos caracteriza mejor el Formativo andino?",
        "solution": "El Formativo reúne transformaciones productivas, sociales y rituales. No es el comienzo de toda cultura ni de toda arquitectura, pues existen antecedentes precerámicos."
      },
      {
        "id": "p02",
        "options": [
          "Son nombres idénticos para fechas fijas en toda América.",
          "Pertenecen a esquemas con criterios distintos y sus límites no son equivalencias exactas.",
          "El Horizonte Temprano es posterior a la república.",
          "El Formativo solo estudia monumentos incas.",
          "Ambos excluyen cualquier referencia a Chavín."
        ],
        "answer": 1,
        "topic": "Periodizaciones",
        "prompt": "¿Qué relación es más precisa entre Formativo y Horizonte Temprano?",
        "solution": "El esquema del Formativo resalta transformaciones sociales; el Horizonte Temprano se relaciona con difusión amplia de estilos. Deben compararse sin igualar automáticamente todas sus fases."
      },
      {
        "id": "p03",
        "options": [
          "Kuntur Wasi — Titicaca — geoglifos.",
          "Sechín — Nasca — mantos funerarios.",
          "Pacopampa — Paracas — puquios.",
          "Kotosh Wairajirca — Cusco — palacios incas.",
          "Garagay — Lima — disposición monumental en U y frisos."
        ],
        "answer": 4,
        "topic": "Centros ceremoniales",
        "prompt": "¿Qué asociación es correcta?",
        "solution": "Garagay es un centro del valle limeño con arquitectura en U y frisos. Las otras opciones mezclan regiones y manifestaciones culturales."
      },
      {
        "id": "p04",
        "options": [
          "Demostrar que ambos centros tuvieron siempre un mismo gobernante.",
          "Afirmar que toda la cerámica fue producida en un solo taller.",
          "Plantear preguntas sobre contactos y circulación de estilos.",
          "Eliminar la necesidad de fechar las piezas.",
          "Concluir que la costa no tuvo procesos propios."
        ],
        "answer": 2,
        "topic": "Cupisnique",
        "prompt": "La semejanza entre cerámicas de Cupisnique y Chavín permite inicialmente:",
        "solution": "Las semejanzas orientan hipótesis que deben contrastarse con contextos y cronologías. No demuestran por sí mismas subordinación política ni producción en un único lugar."
      },
      {
        "id": "p05",
        "options": [
          "Centro ceremonial en Áncash, cerca de los ríos Mosna y Huachecsa.",
          "Capital republicana situada en el valle del Rímac.",
          "Centro de geoglifos en la pampa de Nasca.",
          "Puerto colonial en el lago Titicaca.",
          "Cantera lítica ubicada junto al río Chillón."
        ],
        "answer": 0,
        "topic": "Chavín",
        "prompt": "¿Qué descripción corresponde a Chavín de Huántar?",
        "solution": "Chavín de Huántar se ubica en el Callejón de Conchucos y fue un centro ceremonial de gran importancia. Su localización favoreció contactos interregionales."
      },
      {
        "id": "p06",
        "options": [
          "Portada del Sol, monolito Bennett y Akapana.",
          "Geoglifos, Cantalloc y Cahuachi.",
          "Señor de Sipán, Señora de Cao y Huaca Rajada.",
          "Huaca Pucllana, Maranga y decoración interlocking.",
          "Lanzón, Estela de Raimondi y Obelisco Tello."
        ],
        "answer": 4,
        "topic": "Escultura lítica",
        "prompt": "¿Qué conjunto está asociado con Chavín?",
        "solution": "Las tres piezas son referencias de la litoescultura chavín. Los otros conjuntos pertenecen a Tiahuanaco, Nasca, Moche o Lima."
      },
      {
        "id": "p07",
        "options": [
          "Que todas estuvieron bajo una misma administración política.",
          "Que hubo semejanzas culturales.",
          "Que existieron motivos comparables.",
          "Que conviene investigar contactos.",
          "Que es necesario estudiar la procedencia de los objetos."
        ],
        "answer": 0,
        "topic": "Influencia cultural",
        "prompt": "La presencia de estilos chavín en regiones alejadas no basta para demostrar:",
        "solution": "Un horizonte cultural puede abarcar un espacio mayor que el control directo de un centro. Para afirmar dominación política se necesitan evidencias administrativas y territoriales."
      },
      {
        "id": "p08",
        "options": [
          "Afirmar que todas aparecieron el mismo año.",
          "Considerar que existieron únicamente para crear Moche.",
          "Negar que sus cronologías puedan superponerse.",
          "Estudiar tradiciones con continuidades y cambios entre periodos, sin negar su historia propia.",
          "Clasificarlas como sociedades sin manifestaciones culturales."
        ],
        "answer": 3,
        "topic": "Culturas de transición",
        "prompt": "¿Qué significa usar la expresión «culturas puente»?",
        "solution": "Es una categoría didáctica de transición. Cada tradición posee una trayectoria propia y puede atravesar límites convencionales, como ocurre con parte de Vicús."
      },
      {
        "id": "p09",
        "options": [
          "Trepanación y modificación de la forma son siempre el mismo procedimiento.",
          "La cicatrización demuestra la muerte inmediata en todos los casos.",
          "Trepanar abre parte del cráneo; modificar su forma durante el crecimiento es otra práctica.",
          "Un cráneo permite conocer con certeza todos los medicamentos empleados.",
          "La modificación craneal demuestra por sí sola una intervención terapéutica."
        ],
        "answer": 2,
        "topic": "Paracas",
        "prompt": "¿Qué distinción es correcta al estudiar prácticas craneales en Paracas?",
        "solution": "Las prácticas tienen técnicas y propósitos diferentes. La cicatrización puede indicar supervivencia, pero no identifica automáticamente sustancias o causas de la operación."
      },
      {
        "id": "p10",
        "options": [
          "Todos los habitantes vestían diariamente el mismo conjunto.",
          "Aporta evidencia de trabajo especializado y tratamiento funerario que debe compararse con otros contextos.",
          "La cantidad de mantos revela el nombre exacto del gobernante.",
          "Los textiles no pueden informar sobre diferencias sociales.",
          "El hallazgo demuestra que toda la costa sur tuvo una única capital."
        ],
        "answer": 1,
        "topic": "Textiles y contexto",
        "prompt": "Un fardo funerario conserva numerosos textiles finos. ¿Cuál es la conclusión más prudente?",
        "solution": "Los textiles permiten estudiar técnica, identidad y diferencias de acceso. Un contexto funerario particular no representa automáticamente la vida cotidiana de toda la población."
      }
    ]
  },
  "historia-del-peru-capitulo-06": {
    "title": "Primer Desarrollo Regional",
    "problems": [
      {
        "id": "p01",
        "options": [
          "El Intermedio Tardío posterior a Wari.",
          "El Intermedio Temprano, con cronologías regionales parcialmente superpuestas.",
          "El Horizonte Tardío de expansión inca.",
          "La etapa colonial temprana.",
          "El Arcaico inferior anterior a los centros ceremoniales."
        ],
        "answer": 1,
        "topic": "Periodización",
        "prompt": "El Primer Desarrollo Regional se relaciona principalmente con:",
        "solution": "Intermedio Temprano e Intermedio Tardío son etapas diferentes. El temario incluye además Tiahuanaco, cuyo apogeo se superpone con el Horizonte Medio."
      },
      {
        "id": "p02",
        "options": [
          "Altiplano, Portada del Sol y camellones.",
          "Costa sur, Cahuachi y geoglifos.",
          "Huánuco, manos cruzadas y Kotosh Mito.",
          "Casma, relieves líticos del Formativo inicial.",
          "Costa norte, huacas del Sol y la Luna, cerámica escultórica y metalurgia."
        ],
        "answer": 4,
        "topic": "Moche",
        "prompt": "¿Qué conjunto corresponde a Moche?",
        "solution": "Moche se desarrolló en valles de la costa norte. Las huacas y la producción especializada son referencias centrales; las demás opciones corresponden a otras sociedades o sitios."
      },
      {
        "id": "p03",
        "options": [
          "Suponer una única capital invariable sin contrastar evidencias.",
          "Negar toda diferenciación social en Moche.",
          "Investigar diversidad de autoridades y centros a lo largo de la historia moche.",
          "Excluir a las mujeres de cualquier pregunta sobre autoridad.",
          "Considerar que todos los entierros tuvieron idéntico tratamiento."
        ],
        "answer": 2,
        "topic": "Poder regional",
        "prompt": "Los hallazgos de Sipán, Cao y otros centros aconsejan:",
        "solution": "Los contextos revelan jerarquías y distintos centros. La Señora de Cao también amplía el estudio de la participación femenina en posiciones de autoridad y ritual."
      },
      {
        "id": "p04",
        "options": [
          "Cahuachi, cerámica policroma y geoglifos de la costa sur.",
          "Maranga, cerámica interlocking y valle del Rímac.",
          "Lanzón, galerías y confluencia del Mosna y Huachecsa.",
          "Kalasasaya, monolitos y altiplano.",
          "Sipán, Huaca Rajada y costa norte."
        ],
        "answer": 0,
        "topic": "Nasca",
        "prompt": "¿Qué asociación identifica mejor a Nasca?",
        "solution": "Cahuachi fue un centro ceremonial nasca. La policromía y los geoglifos son referencias de su tradición y paisaje cultural, sin reducir toda su historia a esos rasgos."
      },
      {
        "id": "p05",
        "options": [
          "La primera es una escultura y el segundo una vasija.",
          "Ambos designan exclusivamente una plaza ceremonial.",
          "La primera siempre elimina heladas y el segundo siempre capta agua subterránea.",
          "La primera capta o conduce agua subterránea; el segundo eleva la superficie cultivada.",
          "Ambos prueban por sí solos la misma forma de gobierno."
        ],
        "answer": 3,
        "topic": "Tecnología hidráulica",
        "prompt": "¿Qué diferencia distingue una galería filtrante de un camellón?",
        "solution": "Son soluciones técnicas diferentes. Su funcionamiento y administración deben estudiarse en cada contexto; ninguna obra revela por sí sola toda la organización política."
      },
      {
        "id": "p06",
        "options": [
          "Aceptar una sola explicación para todas sin contrastar datos.",
          "Considerarlas rutas modernas por aparecer en mapas actuales.",
          "Evaluar hipótesis rituales, paisajísticas y astronómicas según cada conjunto.",
          "Afirmar que una alineación explica la totalidad de las figuras.",
          "Excluir su relación con actividades humanas por su gran tamaño."
        ],
        "answer": 2,
        "topic": "Geoglifos",
        "prompt": "¿Cuál es una forma adecuada de interpretar las líneas de Nasca y Palpa?",
        "solution": "Los geoglifos son diversos y fueron realizados durante siglos. Las hipótesis deben relacionarse con fechas, formas y contextos, evitando una explicación única no demostrada."
      },
      {
        "id": "p07",
        "options": [
          "La cultura Lima y los valles de la costa central.",
          "Paracas y la península de Ica.",
          "Recuay y la sierra de Áncash.",
          "Pucará y el norte del Titicaca.",
          "Moche y todos los valles de la costa norte."
        ],
        "answer": 0,
        "topic": "Lima",
        "prompt": "Maranga, Huaca Pucllana y la decoración interlocking se asocian con:",
        "solution": "Estos centros y estilos son referencias para estudiar Lima. El interlocking incluye seres estilizados entrelazados, pero no representa toda la diversidad de su cerámica."
      },
      {
        "id": "p08",
        "options": [
          "Su centro principal fue Cahuachi en Ica.",
          "Solo se desarrolló durante el Lítico peruano.",
          "Su apogeo coincidió con la formación de la república.",
          "Fue necesariamente una colonia gobernada desde Chavín.",
          "Su centro principal está en la actual Bolivia y su influencia alcanzó los Andes meridionales."
        ],
        "answer": 4,
        "topic": "Tiahuanaco",
        "prompt": "¿Qué afirmación ubica correctamente a Tiahuanaco?",
        "solution": "Tiahuanaco se desarrolló en la cuenca del Titicaca y articuló redes amplias. Su apogeo entre los siglos VI y IX se superpone con el Horizonte Medio."
      },
      {
        "id": "p09",
        "options": [
          "Eliminar todo riesgo climático sin mantenimiento.",
          "Transportar agua exclusivamente por túneles subterráneos.",
          "Sustituir cualquier forma de agricultura por pastoreo.",
          "Favorecer drenaje y manejo del agua, y moderar ciertas heladas bajo condiciones adecuadas.",
          "Funcionar únicamente como caminos ceremoniales."
        ],
        "answer": 3,
        "topic": "Campos elevados",
        "prompt": "¿Qué explicación describe mejor una función de los waru waru?",
        "solution": "Los campos elevados y sus canales tienen funciones hidráulicas y pueden ofrecer ventajas térmicas. Sus resultados dependen de las condiciones y del trabajo de mantenimiento."
      },
      {
        "id": "p10",
        "options": [
          "Recuay, Moche y Nasca fueron nombres de una única capital.",
          "Recuay aporta una trayectoria serrana de Áncash; Moche y Nasca permiten comparar distintas regiones costeñas.",
          "Moche apareció solo después de la desaparición de todos los nasca.",
          "Todas las culturas regionales quedaron aisladas sin intercambios.",
          "La expansión Wari reemplazó todas las tradiciones en una misma fecha."
        ],
        "answer": 1,
        "topic": "Comparación regional",
        "prompt": "¿Qué comparación es correcta?",
        "solution": "El periodo reúne trayectorias diversas, parcialmente contemporáneas y conectadas. La expansión Wari se superpuso con procesos regionales, sin un reemplazo instantáneo general."
      }
    ]
  }
});
