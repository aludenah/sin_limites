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

Object.assign(window.CHAPTER_PRACTICES, {
  "lenguaje-capitulo-01": {
    "title": "La comunicación",
    "problems": [
      {
        "id": "p01",
        "topic": "Concepto de comunicación",
        "prompt": "¿Qué definición describe mejor la comunicación humana?",
        "options": [
          "La copia exacta de información desde una mente hacia otra.",
          "Un proceso situado en el que se producen e interpretan significados.",
          "La transmisión exclusiva de palabras mediante la voz.",
          "La reacción automática de un organismo ante cualquier estímulo.",
          "El envío de datos que siempre genera la misma interpretación."
        ],
        "answer": 1,
        "solution": "La comunicación humana construye e interpreta significados en una situación concreta; no garantiza una copia exacta ni se limita a la voz."
      },
      {
        "id": "p02",
        "topic": "Elementos de la comunicación",
        "prompt": "Lucía avisa por audio: «La reunión será en la biblioteca». ¿Cuál es el mensaje?",
        "options": [
          "Lucía, porque inicia el intercambio.",
          "La aplicación con la que envía el audio.",
          "La reunión real a la que se refiere.",
          "La información de que la reunión será en la biblioteca.",
          "El español compartido por los participantes."
        ],
        "answer": 3,
        "solution": "El mensaje es el contenido comunicado: que la reunión será en la biblioteca. Lucía es la emisora y el español es parte del código."
      },
      {
        "id": "p03",
        "topic": "Código y canal",
        "prompt": "En una conversación presencial en español, ¿qué relación entre código y canal es correcta?",
        "options": [
          "El español es el canal y el aire es el código.",
          "La voz es el referente y el español es el soporte.",
          "El español es el código y las ondas sonoras viajan por el aire como canal físico.",
          "El aire es el mensaje y las palabras constituyen el ruido.",
          "Código y canal son dos nombres para el mismo elemento."
        ],
        "answer": 2,
        "solution": "El código es el sistema de signos y reglas compartido, mientras que el canal físico permite que la señal llegue a quien la recibe."
      },
      {
        "id": "p04",
        "topic": "Modalidades lingüísticas",
        "prompt": "¿Cómo debe clasificarse un texto escrito en braille?",
        "options": [
          "Como comunicación no lingüística, porque no emplea sonidos.",
          "Como comunicación lingüística escrita y percibida mediante el tacto.",
          "Como señal animal, porque depende de una respuesta sensorial.",
          "Como comunicación oral, porque representa directamente la voz.",
          "Como ruido táctil sin un código convencional."
        ],
        "answer": 1,
        "solution": "El braille representa una lengua mediante convenciones gráficas en relieve; por eso es una modalidad lingüística escrita de acceso táctil."
      },
      {
        "id": "p05",
        "topic": "Lenguas de señas",
        "prompt": "¿Cuál afirmación sobre las lenguas de señas es correcta?",
        "options": [
          "Son repertorios universales de gestos idénticos en todos los países.",
          "Solo acompañan a las lenguas orales y carecen de gramática propia.",
          "Son códigos improvisados que no permiten hablar de ideas abstractas.",
          "Son lenguas naturales completas, con léxico y organización gramatical.",
          "Son formas no humanas de comunicación visual."
        ],
        "answer": 3,
        "solution": "Las lenguas de señas son lenguas naturales plenas. Poseen reglas, vocabulario y recursos para expresar contenidos concretos y abstractos."
      },
      {
        "id": "p06",
        "topic": "Ruido comunicativo",
        "prompt": "Durante una videollamada, la imagen se congela y varias palabras se oyen entrecortadas. ¿Qué elemento describe mejor el problema?",
        "options": [
          "La retroalimentación, porque confirma que todo fue entendido.",
          "El referente, porque cambia el tema de la conversación.",
          "El ruido, porque una interferencia dificulta recibir la señal.",
          "El código, porque deja de existir la lengua compartida.",
          "El emisor, porque necesariamente formuló mal el mensaje."
        ],
        "answer": 2,
        "solution": "Los cortes funcionan como ruido técnico: interfieren con la señal y dificultan la comprensión, aunque el código y el tema sigan siendo los mismos."
      },
      {
        "id": "p07",
        "topic": "Retroalimentación",
        "prompt": "Una estudiante reformula su explicación después de que un compañero dice «no entendí el último paso». Esa respuesta funciona como:",
        "options": [
          "retroalimentación, porque permite ajustar el intercambio.",
          "referente, porque reemplaza aquello de lo que se habla.",
          "canal, porque transporta físicamente todas las señales.",
          "código, porque crea una lengua nueva para la conversación.",
          "ruido, porque toda pregunta impide la comunicación."
        ],
        "answer": 0,
        "solution": "La respuesta del compañero informa cómo fue interpretado el mensaje y permite que la emisora lo aclare; por ello constituye retroalimentación."
      },
      {
        "id": "p08",
        "topic": "Participantes",
        "prompt": "¿Qué ejemplo corresponde principalmente a comunicación intrapersonal?",
        "options": [
          "Dos amigas coordinan una tarea por teléfono.",
          "Una locutora presenta noticias a una audiencia amplia.",
          "Un docente responde preguntas de su clase.",
          "Una persona organiza mentalmente los argumentos antes de exponer.",
          "Un equipo debate una propuesta en una reunión."
        ],
        "answer": 3,
        "solution": "La comunicación intrapersonal ocurre en el procesamiento interno de una misma persona, como ordenar mentalmente ideas antes de expresarlas."
      },
      {
        "id": "p09",
        "topic": "Comunicación directa y mediada",
        "prompt": "¿Cuál situación combina comunicación mediada e interactiva?",
        "options": [
          "Una videollamada en la que ambas personas responden en tiempo real.",
          "Una reflexión silenciosa antes de tomar una decisión.",
          "Un cartel fijo que nadie puede contestar por ese medio.",
          "Una conversación cara a cara sin dispositivo intermediario.",
          "Una sirena automática que emite siempre la misma alerta."
        ],
        "answer": 0,
        "solution": "La videollamada requiere mediación tecnológica y permite alternar los papeles de emisor y receptor, de modo que también es interactiva."
      },
      {
        "id": "p10",
        "topic": "Análisis de una situación",
        "prompt": "En un museo, una guía explica una vasija antigua a visitantes que conocen español. ¿Cuál asociación es correcta?",
        "options": [
          "Referente: la guía; código: la vasija; canal: los visitantes.",
          "Emisor: los visitantes; mensaje: el aire; contexto: el español.",
          "Código: el español; referente: la vasija; contexto: la visita al museo.",
          "Canal: la vasija; referente: el español; mensaje: la guía.",
          "Mensaje: los visitantes; código: el museo; emisor: el contexto."
        ],
        "answer": 2,
        "solution": "El español es el código compartido, la vasija es aquello a lo que se refiere la explicación y la visita al museo aporta el contexto situacional."
      }
    ]
  },
  "lenguaje-capitulo-02": {
    "title": "El lenguaje",
    "problems": [
      {
        "id": "p01",
        "topic": "Facultad del lenguaje",
        "prompt": "En lingüística, el lenguaje humano se entiende principalmente como:",
        "options": [
          "una lista cerrada de palabras memorizadas.",
          "la facultad biológica, cognitiva y social que permite adquirir y usar lenguas.",
          "la capacidad exclusiva de producir sonidos articulados.",
          "un sistema idéntico en todas las comunidades humanas.",
          "cualquier reacción automática ante un estímulo."
        ],
        "answer": 1,
        "solution": "El lenguaje es una capacidad humana sustentada biológicamente y desarrollada en interacción social, que se concreta en distintas lenguas."
      },
      {
        "id": "p02",
        "topic": "Diversidad de lenguas",
        "prompt": "¿Qué hecho demuestra que el lenguaje humano no depende exclusivamente de la voz?",
        "options": [
          "Las lenguas de señas organizan significados con recursos visuales y espaciales.",
          "Todas las lenguas de señas traducen palabra por palabra el español.",
          "Los gestos espontáneos son iguales a una lengua natural completa.",
          "La escritura apareció antes que cualquier lengua hablada o signada.",
          "Solo las señales acústicas pueden combinar unidades."
        ],
        "answer": 0,
        "solution": "Las lenguas de señas muestran que una lengua natural puede emplear la modalidad visual-gestual y poseer una gramática plenamente desarrollada."
      },
      {
        "id": "p03",
        "topic": "Convencionalidad",
        "prompt": "Que distintas lenguas nombren de modo diferente un mismo objeto ejemplifica principalmente la:",
        "options": [
          "inmutabilidad absoluta de los signos.",
          "dependencia natural entre cada sonido y su significado.",
          "convencionalidad de las asociaciones lingüísticas.",
          "imposibilidad de traducir entre lenguas.",
          "ausencia de reglas compartidas."
        ],
        "answer": 2,
        "solution": "La relación entre una forma lingüística y su significado se establece por convenciones compartidas en una comunidad, no por un vínculo natural obligatorio."
      },
      {
        "id": "p04",
        "topic": "Productividad",
        "prompt": "Una niña comprende una oración que nunca había escuchado antes. ¿Qué propiedad del lenguaje destaca?",
        "options": [
          "La productividad, porque reglas finitas permiten crear e interpretar expresiones nuevas.",
          "La imitación, porque toda oración debe repetirse literalmente.",
          "La rigidez, porque el repertorio posible permanece cerrado.",
          "La iconicidad, porque cada palabra se parece a su referente.",
          "La falta de estructura, porque cualquier orden produce el mismo sentido."
        ],
        "answer": 0,
        "solution": "La productividad permite generar y comprender una cantidad abierta de enunciados mediante la combinación sistemática de unidades y reglas."
      },
      {
        "id": "p05",
        "topic": "Doble articulación",
        "prompt": "¿Qué opción ilustra la doble articulación del lenguaje?",
        "options": [
          "Cada sonido aislado comunica siempre una idea completa.",
          "Las unidades con significado se forman combinando unidades menores que pueden distinguir significados.",
          "Todos los mensajes humanos deben incluir simultáneamente voz y escritura.",
          "Una misma oración solo puede analizarse de una manera.",
          "Las palabras carecen de partes y no admiten combinaciones."
        ],
        "answer": 1,
        "solution": "La doble articulación relaciona unidades significativas, como morfemas, con unidades distintivas menores, como fonemas, que se combinan sistemáticamente."
      },
      {
        "id": "p06",
        "topic": "Desplazamiento",
        "prompt": "Hablar sobre una civilización desaparecida o planear el próximo año manifiesta la propiedad de:",
        "options": [
          "retroalimentación.",
          "canalización vocal.",
          "desplazamiento.",
          "imitación refleja.",
          "sinonimia."
        ],
        "answer": 2,
        "solution": "El desplazamiento permite referirse a entidades, tiempos y lugares que no están presentes en la situación inmediata de comunicación."
      },
      {
        "id": "p07",
        "topic": "Adquisición del lenguaje",
        "prompt": "¿Cuál explicación integra mejor la adquisición de una lengua?",
        "options": [
          "Depende solo de memorizar un diccionario durante la infancia.",
          "Es completamente innata: el entorno lingüístico no cumple ninguna función.",
          "Es únicamente cultural y no intervienen capacidades biológicas humanas.",
          "Articula predisposiciones biológicas con exposición e interacción social.",
          "Ocurre de igual manera aunque una persona nunca tenga acceso a una lengua."
        ],
        "answer": 3,
        "solution": "La capacidad humana tiene bases biológicas, pero adquirir una lengua concreta requiere acceso a datos lingüísticos e interacción con otras personas."
      },
      {
        "id": "p08",
        "topic": "Función referencial",
        "prompt": "¿En cuál enunciado predomina la función referencial?",
        "options": [
          "«La Tierra tarda aproximadamente un año en orbitar el Sol». ",
          "«¡Qué alegría volver a verte!». ",
          "«Por favor, cierra la ventana». ",
          "«¿Aló?, ¿me escuchas?». ",
          "«La palabra árbol es un sustantivo». "
        ],
        "answer": 0,
        "solution": "Predomina la función referencial porque el enunciado informa sobre un hecho. Las demás opciones destacan emoción, apelación, contacto o metalenguaje."
      },
      {
        "id": "p09",
        "topic": "Función metalingüística",
        "prompt": "¿En qué caso predomina la función metalingüística?",
        "options": [
          "«Guarda silencio durante el examen». ",
          "«Tus ojos son dos luceros». ",
          "«¿Qué significa la palabra “evidencia”?». ",
          "«Me preocupa el resultado». ",
          "«Buenos días, ¿sigues en línea?». "
        ],
        "answer": 2,
        "solution": "La función metalingüística aparece cuando se usa el lenguaje para preguntar, explicar o reflexionar acerca del propio código lingüístico."
      },
      {
        "id": "p10",
        "topic": "Funciones concurrentes",
        "prompt": "En «¿Me oyes? Por favor, acércate», ¿cuál análisis es más preciso?",
        "options": [
          "Solo hay función poética porque el mensaje tiene dos partes.",
          "Las funciones no pueden coexistir dentro de un mismo enunciado.",
          "Aparecen funciones fática y apelativa, con predominio según la intención de cada parte.",
          "Predomina únicamente la función referencial porque describe un hecho científico.",
          "Es metalingüístico porque define una palabra."
        ],
        "answer": 2,
        "solution": "«¿Me oyes?» comprueba el contacto y «acércate» busca influir en el receptor. Varias funciones pueden concurrir en un mismo intercambio."
      }
    ]
  },
  "lenguaje-capitulo-03": {
    "title": "Planos del lenguaje",
    "problems": [
      {
        "id": "p01",
        "topic": "Lengua",
        "prompt": "En la distinción de Saussure, la lengua es:",
        "options": [
          "cada pronunciación individual producida en un momento concreto.",
          "el sistema social compartido de signos y reglas que posibilita los usos.",
          "la lista de errores que una comunidad debe evitar.",
          "una capacidad biológica idéntica a cualquier idioma particular.",
          "solo el registro formal empleado en textos académicos."
        ],
        "answer": 1,
        "solution": "La lengua es el sistema compartido por una comunidad; ofrece convenciones y relaciones que hacen posibles los actos concretos de habla."
      },
      {
        "id": "p02",
        "topic": "Habla",
        "prompt": "¿Cuál ejemplo corresponde al habla en el sentido saussureano?",
        "options": [
          "El inventario abstracto de fonemas del español.",
          "Las reglas compartidas para formar el plural.",
          "La oración concreta que una estudiante pronuncia durante su exposición.",
          "La totalidad del sistema lingüístico de una comunidad.",
          "La facultad humana general de adquirir lenguas."
        ],
        "answer": 2,
        "solution": "El habla es la realización concreta e individual del sistema en una situación determinada, como un enunciado efectivamente pronunciado."
      },
      {
        "id": "p03",
        "topic": "Relación lengua-habla",
        "prompt": "¿Cómo se relacionan lengua y habla?",
        "options": [
          "Son planos independientes que nunca se influyen.",
          "La lengua existe solo en diccionarios y el habla carece de reglas.",
          "El habla elimina el sistema cada vez que introduce una variación.",
          "El sistema posibilita los usos concretos y estos lo realizan y pueden contribuir a sus cambios.",
          "Son sinónimos exactos de escritura y pronunciación."
        ],
        "answer": 3,
        "solution": "Los dos planos son interdependientes: se usa un sistema compartido al hablar, y los usos sostenidos de la comunidad pueden favorecer cambios en ese sistema."
      },
      {
        "id": "p04",
        "topic": "Variación diatópica",
        "prompt": "El uso habitual de palabras distintas para un mismo alimento según la región es un caso de variación:",
        "options": [
          "diatópica o geográfica.",
          "diafásica o de registro.",
          "diacrónica o histórica.",
          "exclusivamente idiolectal.",
          "metalingüística."
        ],
        "answer": 0,
        "solution": "La variación diatópica comprende diferencias asociadas con áreas geográficas, como preferencias regionales de vocabulario o pronunciación."
      },
      {
        "id": "p05",
        "topic": "Variación diastrática",
        "prompt": "¿Qué factor se relaciona principalmente con la variación diastrática?",
        "options": [
          "La época histórica en la que se documenta un texto.",
          "La ubicación geográfica de dos comunidades alejadas.",
          "La pertenencia a grupos sociales, educativos o profesionales.",
          "El cambio de formalidad de una misma persona ante su audiencia.",
          "Los rasgos únicos de un solo hablante."
        ],
        "answer": 2,
        "solution": "La variación diastrática se vincula con grupos y redes sociales, niveles educativos, profesiones u otras dimensiones de la organización social."
      },
      {
        "id": "p06",
        "topic": "Variación diafásica",
        "prompt": "Una joven conversa informalmente con sus amistades y luego emplea un registro formal al exponer. ¿Qué variación muestra?",
        "options": [
          "Diatópica, porque necesariamente cambió de región.",
          "Diastrática, porque pasó a pertenecer a otro grupo social.",
          "Diacrónica, porque transcurrieron varios siglos.",
          "Diafásica, porque adapta el registro a la situación comunicativa.",
          "Fonológica, porque dejó de compartir el español."
        ],
        "answer": 3,
        "solution": "La variación diafásica consiste en adecuar el registro al propósito, la relación entre participantes, el medio y el grado de formalidad."
      },
      {
        "id": "p07",
        "topic": "Idiolecto",
        "prompt": "¿Qué describe mejor el idiolecto?",
        "options": [
          "La variedad oficial obligatoria de un país.",
          "El conjunto particular de hábitos lingüísticos de una persona.",
          "Cualquier registro formal usado ante desconocidos.",
          "La lengua ancestral de toda una familia lingüística.",
          "Una diferencia que depende solo del lugar de nacimiento."
        ],
        "answer": 1,
        "solution": "El idiolecto reúne rasgos relativamente característicos del uso individual. No equivale al registro, que una misma persona ajusta según la situación."
      },
      {
        "id": "p08",
        "topic": "Variación diacrónica",
        "prompt": "Comparar el vocabulario de documentos del siglo XV con el español actual permite estudiar variación:",
        "options": [
          "diafásica.",
          "diastrática.",
          "diatópica.",
          "diacrónica.",
          "intrapersonal."
        ],
        "answer": 3,
        "solution": "La variación diacrónica examina cómo cambian las lenguas a lo largo del tiempo mediante la comparación de usos de distintos periodos."
      },
      {
        "id": "p09",
        "topic": "Variedad estándar",
        "prompt": "¿Cuál afirmación sobre la variedad estándar es adecuada?",
        "options": [
          "Es lingüísticamente superior y las demás variedades carecen de reglas.",
          "Coincide siempre con la manera espontánea de hablar de toda la población.",
          "Es una variedad codificada para ciertos usos amplios y formales, no una lengua más lógica.",
          "Elimina por completo la diversidad regional y social.",
          "Solo puede existir si la ley la declara lengua oficial."
        ],
        "answer": 2,
        "solution": "El estándar se selecciona y codifica para facilitar usos públicos, educativos o administrativos; esa función no vuelve inferiores a las demás variedades."
      },
      {
        "id": "p10",
        "topic": "Lengua y oficialidad",
        "prompt": "¿Qué diferencia hay entre que una variedad sea una lengua y que tenga estatus oficial?",
        "options": [
          "Ninguna: toda lengua natural es oficial en todos los territorios donde se usa.",
          "La condición de lengua depende de su sistema y uso social; la oficialidad es un reconocimiento jurídico o político.",
          "Una lengua sin estatus oficial no posee gramática ni hablantes nativos.",
          "La oficialidad se determina únicamente por la cantidad de palabras del diccionario.",
          "Solo las variedades escritas pueden ser lenguas, pero todas son oficiales."
        ],
        "answer": 1,
        "solution": "La existencia lingüística de una lengua no depende de una declaración legal. La oficialidad es un estatus institucional definido para determinados territorios o ámbitos."
      }
    ]
  }
});

Object.assign(window.CHAPTER_PRACTICES, {
  "lenguaje-capitulo-04": {
    "title": "La realidad lingüística del Perú",
    "problems": [
      {
        "id": "p01",
        "topic": "Diversidad lingüística",
        "prompt": "Según el registro oficial vigente, ¿cómo se distribuyen las lenguas indígenas u originarias del Perú?",
        "options": [
          "48 en total: 4 andinas y 44 amazónicas.",
          "48 en total: 44 andinas y 4 amazónicas.",
          "47 en total: 3 andinas y 44 amazónicas.",
          "50 en total: 5 andinas y 45 amazónicas.",
          "34 en total: 4 andinas y 30 amazónicas."
        ],
        "answer": 0,
        "solution": "El registro oficial reconoce 48 lenguas indígenas u originarias: cuatro se agrupan como andinas y cuarenta y cuatro como amazónicas."
      },
      {
        "id": "p02",
        "topic": "Oficialidad",
        "prompt": "¿Qué afirmación describe correctamente la oficialidad de las lenguas en el Perú?",
        "options": [
          "Solo el castellano puede emplearse ante cualquier institución pública.",
          "Todas las lenguas indígenas son cooficiales de igual modo en cada distrito del país.",
          "El castellano es oficial y las lenguas indígenas también lo son en las zonas donde predominan.",
          "Una lengua se vuelve oficial automáticamente cuando posee más de mil hablantes.",
          "La oficialidad depende de que la lengua use el alfabeto latino."
        ],
        "answer": 2,
        "solution": "La Constitución reconoce el castellano como idioma oficial y también las lenguas originarias en las zonas donde predominan, según la ley."
      },
      {
        "id": "p03",
        "topic": "Familias lingüísticas",
        "prompt": "¿Qué es una familia lingüística?",
        "options": [
          "Una lista de lenguas que se escriben con las mismas letras.",
          "Un conjunto de lenguas emparentadas históricamente por un origen común.",
          "Cualquier grupo de dialectos hablados dentro de una sola provincia.",
          "Una lengua oficial y todas las traducciones de sus documentos.",
          "Un repertorio de palabras prestadas entre pueblos vecinos."
        ],
        "answer": 1,
        "solution": "Una familia reúne lenguas cuyo parentesco histórico puede demostrarse. Compartir territorio, escritura o préstamos no basta para establecer ese origen común."
      },
      {
        "id": "p04",
        "topic": "Diversidad quechua",
        "prompt": "¿Cuál es la descripción lingüística más adecuada del quechua?",
        "options": [
          "Es una variedad idéntica en todos los países andinos y carece de diferencias regionales.",
          "Es únicamente un alfabeto empleado para escribir otras lenguas de los Andes.",
          "Es una familia o conjunto de variedades emparentadas cuya diversidad interna debe reconocerse.",
          "Es una lengua amazónica sin presencia histórica en la región andina.",
          "Es un dialecto del castellano formado después de la independencia."
        ],
        "answer": 2,
        "solution": "Quechua designa variedades históricamente emparentadas, con diferencias regionales relevantes. Reconocerlas evita presentar su compleja diversidad como una forma única e invariable."
      },
      {
        "id": "p05",
        "topic": "Escritura del quechua",
        "prompt": "¿Por qué muchos alfabetos normalizados del quechua emplean las vocales a, i, u?",
        "options": [
          "Porque sus hablantes son incapaces de pronunciar sonidos cercanos a e u o.",
          "Porque representan un sistema de tres fonemas vocálicos, aunque ciertas realizaciones puedan sonar próximas a [e] o [o].",
          "Porque e y o fueron prohibidas en todas las lenguas originarias del Perú.",
          "Porque el quechua no tuvo ninguna tradición oral antes de adoptar ese alfabeto.",
          "Porque cada letra del castellano debe eliminarse de la escritura quechua."
        ],
        "answer": 1,
        "solution": "La escritura a, i, u representa el sistema fonológico de numerosas variedades quechuas. La pronunciación puede incluir realizaciones cercanas a [e] y [o] en ciertos contextos."
      },
      {
        "id": "p06",
        "topic": "Lenguas andinas",
        "prompt": "¿Cuál lista contiene las cuatro lenguas indígenas clasificadas oficialmente como andinas?",
        "options": [
          "Quechua, aimara, jaqaru y kawki.",
          "Quechua, shipibo-konibo, awajún y asháninka.",
          "Aimara, kukama kukamiria, matsigenka y shawi.",
          "Jaqaru, bora, ticuna y yine.",
          "Kawki, castellano, portugués y quechua."
        ],
        "answer": 0,
        "solution": "El registro oficial clasifica como andinas al quechua, aimara, jaqaru y kawki. Las demás lenguas originarias reconocidas se clasifican como amazónicas."
      },
      {
        "id": "p07",
        "topic": "Familia Aru",
        "prompt": "¿Qué relación existe entre el aimara, el jaqaru y el kawki?",
        "options": [
          "Son tres nombres oficiales del castellano andino.",
          "Pertenecen a la familia lingüística Aru.",
          "Son variedades de una lengua amazónica de la familia Pano.",
          "Carecen de parentesco y solo comparten el alfabeto latino.",
          "Son las únicas lenguas quechuas reconocidas por el Estado."
        ],
        "answer": 1,
        "solution": "Aimara, jaqaru y kawki se vinculan históricamente dentro de la familia Aru. Familia lingüística y lengua individual no son categorías equivalentes."
      },
      {
        "id": "p08",
        "topic": "Lengua materna",
        "prompt": "En un censo, una persona declara que aprendió primero asháninka en su hogar. ¿Qué indica ese dato?",
        "options": [
          "Que el asháninka es su lengua materna o primera lengua.",
          "Que no puede aprender castellano como segunda lengua.",
          "Que todas las personas de su distrito hablan únicamente asháninka.",
          "Que su primera lengua tiene menor complejidad gramatical.",
          "Que debe abandonar esa lengua para acceder a servicios públicos."
        ],
        "answer": 0,
        "solution": "La lengua materna o primera lengua es la adquirida inicialmente, con frecuencia en el entorno familiar. El dato no determina inferioridad, monolingüismo ni capacidad futura."
      },
      {
        "id": "p09",
        "topic": "Contacto de lenguas",
        "prompt": "Una hablante bilingüe traslada al castellano un patrón frecuente de su lengua originaria. ¿Cómo conviene analizarlo?",
        "options": [
          "Como prueba de que ninguna de las dos lenguas posee reglas.",
          "Como interferencia que debe atribuirse siempre a falta de inteligencia.",
          "Como transferencia lingüística propia del contacto entre sistemas.",
          "Como evidencia de que las dos lenguas pertenecen necesariamente a la misma familia.",
          "Como un cambio que convierte de inmediato esa forma en norma oficial."
        ],
        "answer": 2,
        "solution": "La transferencia ocurre cuando rasgos de una lengua influyen en el uso de otra. Es un fenómeno sistemático de contacto, no un déficit intelectual del hablante."
      },
      {
        "id": "p10",
        "topic": "Revitalización",
        "prompt": "¿Qué medida favorece mejor la continuidad de una lengua originaria amenazada?",
        "options": [
          "Restringirla a ceremonias y evitar que la aprendan niñas y niños.",
          "Sustituirla por castellano en la escuela y en los servicios de salud.",
          "Documentarla sin consultar ni involucrar a sus comunidades hablantes.",
          "Fortalecer su transmisión intergeneracional y su uso en educación, medios y servicios públicos.",
          "Reducir sus variedades a una sola pronunciación sin participación comunitaria."
        ],
        "answer": 3,
        "solution": "La revitalización requiere hablantes, transmisión entre generaciones y ámbitos reales de uso. La educación y los servicios pertinentes deben desarrollarse con participación comunitaria."
      }
    ]
  },
  "lenguaje-capitulo-05": {
    "title": "Historia de la lengua española",
    "problems": [
      {
        "id": "p01",
        "topic": "Origen del español",
        "prompt": "Desde el punto de vista genealógico, ¿de qué procede principalmente el español?",
        "options": [
          "Del árabe clásico llevado a Roma.",
          "Del latín hablado que evolucionó en la península ibérica.",
          "De una mezcla planificada de vasco y griego.",
          "Del germánico visigodo sin influencia latina.",
          "Del castellano americano medieval."
        ],
        "answer": 1,
        "solution": "El español es una lengua iberorromance: deriva históricamente del latín hablado. Otras lenguas aportaron contacto e influencia, pero no reemplazan esa genealogía."
      },
      {
        "id": "p02",
        "topic": "Romanización",
        "prompt": "¿Qué hecho iniciado en 218 a. C. fue decisivo para la formación posterior de las lenguas romances hispánicas?",
        "options": [
          "La llegada de los visigodos a Toledo.",
          "La publicación de la gramática de Nebrija.",
          "El inicio de la conquista romana de la península ibérica.",
          "La conquista musulmana de al-Ándalus.",
          "La fundación de la Real Academia Española."
        ],
        "answer": 2,
        "solution": "La intervención romana comenzó en 218 a. C. y extendió el latín mediante un proceso prolongado de romanización, base histórica de los romances peninsulares."
      },
      {
        "id": "p03",
        "topic": "Sustrato prerromano",
        "prompt": "¿Cuál afirmación sobre las lenguas prerromanas de la península ibérica es correcta?",
        "options": [
          "Todas desaparecieron antes del contacto con el latín y no dejaron huellas.",
          "El vasco sobrevivió, y otras lenguas pudieron dejar influencias de sustrato.",
          "Eran dialectos escritos del latín clásico.",
          "Originaron el árabe andalusí durante el siglo XIII.",
          "Fueron introducidas por la Real Academia Española."
        ],
        "answer": 1,
        "solution": "Antes de Roma existían varias lenguas en la península. El vasco continuó vivo y el contacto con otras lenguas prerromanas dejó posibles huellas de sustrato."
      },
      {
        "id": "p04",
        "topic": "Migraciones germánicas",
        "prompt": "¿Qué formulación corrige adecuadamente un relato sobre las migraciones del siglo V en Hispania?",
        "options": [
          "En 409 entraron suevos, vándalos y alanos; después los visigodos alcanzaron una posición dominante.",
          "En 409 los tártaros y mongoles fundaron el reino visigodo de Toledo.",
          "En 409 desapareció el latín y toda la población empezó a hablar gótico.",
          "Los visigodos llegaron en 1492 junto con la expedición de Colón.",
          "Los hunos crearon directamente la lengua castellana mediante un decreto."
        ],
        "answer": 0,
        "solution": "Suevos, vándalos y alanos atravesaron los Pirineos en 409. Los visigodos se consolidaron después; tártaros y mongoles no corresponden a este proceso."
      },
      {
        "id": "p05",
        "topic": "Conquista de 711",
        "prompt": "¿Cuál descripción de la conquista iniciada en 711 es históricamente más precisa?",
        "options": [
          "Un ejército romano recuperó Hispania para hablar latín clásico.",
          "Fuerzas musulmanas bajo autoridad omeya, integradas en gran parte por bereberes, cruzaron el estrecho.",
          "Los reyes visigodos invitaron pacíficamente a toda la población árabe para fundar Castilla.",
          "Los pueblos americanos ocuparon al-Ándalus antes de la llegada europea.",
          "La Real Academia organizó una campaña militar para unificar la ortografía."
        ],
        "answer": 1,
        "solution": "En 711 comenzó una conquista militar vinculada al poder omeya, con contingentes mayoritariamente bereberes. No fue simplemente una invitación general de los visigodos."
      },
      {
        "id": "p06",
        "topic": "Contacto con el árabe",
        "prompt": "¿Cómo se relaciona el árabe con la historia del español?",
        "options": [
          "Es el antepasado genealógico exclusivo del español.",
          "No tuvo ninguna relación con las hablas romances peninsulares.",
          "Influyó por contacto, sobre todo en el léxico, mientras el español siguió siendo una lengua romance.",
          "Reemplazó definitivamente al latín en todas las áreas de la península.",
          "Fue creado a partir del castellano en el siglo XV."
        ],
        "answer": 2,
        "solution": "El contacto prolongado aportó numerosos arabismos y otras influencias. Sin embargo, la filiación del español sigue siendo romance, derivada del latín hablado."
      },
      {
        "id": "p07",
        "topic": "Alfonso X",
        "prompt": "¿Qué papel se asocia con Alfonso X en el siglo XIII?",
        "options": [
          "Impulsó el uso escrito del castellano en obras jurídicas, científicas e históricas.",
          "Dirigió la conquista romana iniciada en 218 a. C.",
          "Fundó la Real Academia Española en 1713.",
          "Escribió la primera gramática castellana publicada en 1492.",
          "Introdujo las lenguas prerromanas después de la Reconquista."
        ],
        "answer": 0,
        "solution": "La corte de Alfonso X promovió en el siglo XIII una amplia producción escrita en castellano, importante para su elaboración cultural y administrativa."
      },
      {
        "id": "p08",
        "topic": "Nebrija",
        "prompt": "¿Qué obra vinculada con Antonio de Nebrija apareció en 1492?",
        "options": [
          "La primera edición del diccionario académico del siglo XVIII.",
          "Una gramática de la lengua castellana.",
          "La traducción visigoda de todas las leyes romanas.",
          "El primer texto latino conocido en la península.",
          "Un decreto que prohibió todas las variedades americanas."
        ],
        "answer": 1,
        "solution": "Nebrija publicó en 1492 su Gramática de la lengua castellana, obra clave de la tradición gramatical europea aplicada a una lengua romance vernácula."
      },
      {
        "id": "p09",
        "topic": "Español en América",
        "prompt": "¿Qué efecto tuvo el contacto del español con lenguas americanas?",
        "options": [
          "Eliminó toda diversidad regional del español.",
          "Produjo préstamos como papa, canoa o chocolate y nuevas configuraciones dialectales.",
          "Convirtió al español en una lengua no romance.",
          "Impuso una pronunciación idéntica en todo el continente.",
          "Hizo desaparecer de inmediato todas las lenguas originarias."
        ],
        "answer": 1,
        "solution": "El contacto incorporó voces de distintas lenguas americanas y participó en historias dialectales diversas. No anuló la genealogía romance ni uniformó el continente."
      },
      {
        "id": "p10",
        "topic": "Secuencia histórica",
        "prompt": "¿Cuál secuencia está ordenada de la más antigua a la más reciente?",
        "options": [
          "711 → 218 a. C. → 1492 → Alfonso X → 409.",
          "409 → 218 a. C. → Alfonso X → 711 → 1492.",
          "218 a. C. → 409 → 711 → Alfonso X → 1492.",
          "Alfonso X → 711 → 409 → 218 a. C. → 1492.",
          "1492 → Alfonso X → 711 → 409 → 218 a. C."
        ],
        "answer": 2,
        "solution": "La secuencia correcta va de la romanización iniciada en 218 a. C. a las entradas de 409, la conquista de 711, Alfonso X y 1492."
      }
    ]
  },
  "lenguaje-capitulo-06": {
    "title": "Fonología y Fonética",
    "problems": [
      {
        "id": "p01",
        "topic": "Fonética",
        "prompt": "¿Qué estudia principalmente la fonética?",
        "options": [
          "La organización de los sonidos como unidades distintivas abstractas.",
          "La producción, las propiedades acústicas y la percepción física de los sonidos del habla.",
          "Solo las reglas ortográficas para usar mayúsculas.",
          "El origen histórico de todas las palabras del diccionario.",
          "La estructura narrativa de los textos literarios."
        ],
        "answer": 1,
        "solution": "La fonética examina cómo se producen, transmiten y perciben físicamente los sonidos del habla; puede estudiar dimensiones articulatorias, acústicas y auditivas."
      },
      {
        "id": "p02",
        "topic": "Fonología",
        "prompt": "¿Cuál es el objeto central de la fonología?",
        "options": [
          "Las características físicas de cualquier ruido ambiental.",
          "El sistema de contrastes sonoros que permite distinguir significados en una lengua.",
          "La forma visual de las letras manuscritas.",
          "La traducción automática entre dos idiomas.",
          "La biografía de quienes elaboran diccionarios."
        ],
        "answer": 1,
        "solution": "La fonología analiza cómo una lengua organiza fonemas y otros patrones sonoros con función distintiva, no solamente sus propiedades físicas observables."
      },
      {
        "id": "p03",
        "topic": "Notación",
        "prompt": "¿Qué correspondencia entre unidad y notación es correcta?",
        "options": [
          "Fonema [p], sonido ⟨p⟩ y grafema /p/.",
          "Fonema /p/, sonido [p] y grafema ⟨p⟩.",
          "Fonema ⟨p⟩, sonido /p/ y grafema [p].",
          "Fonema (p), sonido {p} y grafema //p//.",
          "Fonema «p», sonido /p/ y grafema [p]."
        ],
        "answer": 1,
        "solution": "Por convención, los fonemas se escriben entre barras / /, las realizaciones fonéticas entre corchetes [ ] y los grafemas entre ángulos ⟨ ⟩."
      },
      {
        "id": "p04",
        "topic": "Pares mínimos",
        "prompt": "¿Qué muestra el contraste entre pala y bala en una variedad que distingue ambas palabras?",
        "options": [
          "Que /p/ y /b/ son fonemas diferentes porque el cambio puede distinguir significados.",
          "Que p y b son dos nombres para un mismo grafema.",
          "Que toda diferencia de escritura carece de efecto sonoro.",
          "Que pala y bala son alófonos de una palabra única.",
          "Que el acento es el único rasgo capaz de cambiar significados."
        ],
        "answer": 0,
        "solution": "Pala y bala forman un par mínimo: difieren en un segmento y tienen significados distintos. Por ello, /p/ y /b/ contrastan como fonemas."
      },
      {
        "id": "p05",
        "topic": "Alófonos",
        "prompt": "En gran parte del español, [b] y [β̞] pueden realizar el fonema /b/ según el contexto. ¿Qué son entre sí?",
        "options": [
          "Dos grafemas del alfabeto oficial.",
          "Dos fonemas que siempre distinguen palabras.",
          "Dos alófonos o realizaciones fonéticas de un mismo fonema.",
          "Dos sílabas con diferente acento léxico.",
          "Dos signos de puntuación equivalentes."
        ],
        "answer": 2,
        "solution": "[b] y [β̞] son realizaciones condicionadas del fonema /b/ en muchas variedades. Alternar entre ellas no suele crear una diferencia léxica."
      },
      {
        "id": "p06",
        "topic": "Sonido y escritura",
        "prompt": "¿Qué demuestra que /k/ pueda escribirse con c en casa, qu en queso y k en kilo?",
        "options": [
          "Que el español carece de fonemas consonánticos.",
          "Que siempre existe una correspondencia exacta de una letra por fonema.",
          "Que la relación entre fonemas y grafemas no es necesariamente uno a uno.",
          "Que c, qu y k son tres vocales del español.",
          "Que toda diferencia ortográfica produce un significado distinto."
        ],
        "answer": 2,
        "solution": "Un mismo fonema puede representarse mediante grafías diferentes según la palabra y el contexto. Escritura y sistema sonoro se relacionan, pero no coinciden punto por punto."
      },
      {
        "id": "p07",
        "topic": "Letras y dígrafos",
        "prompt": "¿Cuál afirmación distingue correctamente letras y dígrafos en la ortografía española actual?",
        "options": [
          "El alfabeto tiene 27 letras; ch, ll, rr, gu y qu son combinaciones de dos letras.",
          "El alfabeto tiene 32 letras porque todo dígrafo cuenta como letra independiente.",
          "Ch y ll son letras, pero a, e, i, o y u son dígrafos.",
          "Gu y qu son fonemas, nunca secuencias ortográficas.",
          "La h representa siempre un fonema consonántico en español general."
        ],
        "answer": 0,
        "solution": "El abecedario español consta de 27 letras. Ch, ll, rr, gu y qu funcionan como dígrafos en determinados usos, no como letras adicionales."
      },
      {
        "id": "p08",
        "topic": "Variación dialectal",
        "prompt": "¿Por qué no se fija un único número de fonemas consonánticos para todas las variedades del español?",
        "options": [
          "Porque cada hablante inventa un alfabeto nuevo al conversar.",
          "Porque fenómenos como seseo y yeísmo modifican los contrastes presentes en cada sistema dialectal.",
          "Porque los fonemas se cuentan según la cantidad de palabras de un texto.",
          "Porque la fonología excluye cualquier diferencia entre dialectos.",
          "Porque las vocales se transforman en letras al cambiar de región."
        ],
        "answer": 1,
        "solution": "El seseo elimina el contraste /s/–/θ/ y el yeísmo el de /ʝ/–/ʎ/ en muchas variedades. Por eso los inventarios fonológicos dialectales pueden diferir."
      },
      {
        "id": "p09",
        "topic": "Articulación",
        "prompt": "¿Cómo se clasifica fonéticamente [p] en una pronunciación habitual del español?",
        "options": [
          "Vocal abierta, posterior y sonora.",
          "Consonante oclusiva, bilabial y sorda.",
          "Consonante fricativa, dental y sonora.",
          "Consonante nasal, palatal y sonora.",
          "Vocal cerrada, anterior y átona."
        ],
        "answer": 1,
        "solution": "[p] se articula cerrando ambos labios, interrumpiendo el aire y sin vibración laríngea: es una consonante oclusiva bilabial sorda."
      },
      {
        "id": "p10",
        "topic": "Acento prosódico",
        "prompt": "¿Qué evidencia aporta la serie término, termino y terminó?",
        "options": [
          "Que la posición del acento puede participar en distinciones de significado y categoría gramatical.",
          "Que las tres formas se pronuncian y significan exactamente lo mismo.",
          "Que el español solo permite el acento en la última sílaba.",
          "Que cada tilde representa un fonema consonántico diferente.",
          "Que la entonación convierte siempre un sustantivo en verbo."
        ],
        "answer": 0,
        "solution": "El desplazamiento del acento distingue término, termino y terminó. Es un fenómeno prosódico capaz de diferenciar palabras o formas gramaticales."
      }
    ]
  }
});

// Economía y Educación Cívica · capítulos 1–6
Object.assign(window.CHAPTER_PRACTICES,{
  "economia-capitulo-01": {
    "title": "La ciencia económica",
    "problems": [
      {
        "topic": "Objeto de estudio",
        "prompt": "Una municipalidad debe elegir entre dos proyectos porque su presupuesto no alcanza para ambos. ¿Qué problema económico se manifiesta?",
        "options": [
          "La equivalencia entre economía y contabilidad.",
          "La asignación de recursos escasos entre usos alternativos.",
          "La desaparición de todas las necesidades.",
          "La inexistencia de costos por usar recursos públicos.",
          "La imposibilidad de valorar alternativas."
        ],
        "answer": 1,
        "solution": "El presupuesto tiene usos alternativos y no permite realizarlos todos. La elección ante restricciones constituye un problema de asignación y escasez.",
        "id": "p01"
      },
      {
        "topic": "Escasez",
        "prompt": "¿Cuál de los siguientes casos muestra escasez sin implicar necesariamente pobreza?",
        "options": [
          "Un estudiante abandona clases por falta de recursos.",
          "Un hogar no logra cubrir servicios básicos.",
          "Una persona de altos ingresos no dispone de tiempo para todos sus proyectos.",
          "Un hogar no puede acceder a alimentación suficiente.",
          "Una familia carece de vivienda adecuada."
        ],
        "answer": 2,
        "solution": "La escasez se refiere a recursos limitados frente a usos deseados. El tiempo puede ser escaso incluso cuando no existen privaciones monetarias.",
        "id": "p02"
      },
      {
        "topic": "Costo de oportunidad",
        "prompt": "Raúl elige estudiar. Sus alternativas eran trabajar por S/ 70 o ayudar en un negocio por S/ 40; prefiere el trabajo de S/ 70. ¿Qué ingreso sacrifica como costo de oportunidad?",
        "options": [
          "S/ 40.",
          "S/ 30.",
          "S/ 0.",
          "S/ 70.",
          "S/ 110."
        ],
        "answer": 3,
        "solution": "La mejor alternativa descartada es trabajar por S/ 70. No se suman los ingresos de actividades que eran alternativas mutuamente excluyentes.",
        "id": "p03"
      },
      {
        "topic": "Costo económico",
        "prompt": "Un taller cobra S/ 25 y asistir impide realizar un trabajo que pagaría S/ 60. Sin otros costos, ¿cuál es el costo económico total de asistir?",
        "options": [
          "S/ 25.",
          "S/ 60.",
          "S/ 35.",
          "S/ 150.",
          "S/ 85."
        ],
        "answer": 4,
        "solution": "Se suma el desembolso explícito de S/ 25 y el ingreso alternativo sacrificado de S/ 60: el costo económico total es S/ 85.",
        "id": "p04"
      },
      {
        "topic": "Inducción",
        "prompt": "Una investigadora compara compras en varios mercados y propone una regularidad general. ¿Qué razonamiento predomina?",
        "options": [
          "Inductivo.",
          "Deductivo.",
          "Normativo por definición.",
          "Contable exclusivamente.",
          "Una identidad sin observaciones."
        ],
        "answer": 0,
        "solution": "La inducción parte de casos particulares y busca formular regularidades generales. La propuesta todavía debe contrastarse con evidencia adicional.",
        "id": "p05"
      },
      {
        "topic": "Deducción",
        "prompt": "A partir de un modelo, se predice que un precio mayor reducirá la cantidad demandada si lo demás permanece constante. ¿Qué método se utiliza?",
        "options": [
          "Valoración moral de precios.",
          "Deducción.",
          "Inducción desde nuevos casos.",
          "Clasificación de necesidades.",
          "Recolección censal sin teoría."
        ],
        "answer": 1,
        "solution": "Se obtiene una consecuencia particular a partir de supuestos y relaciones generales del modelo. Ese es el sentido del razonamiento deductivo.",
        "id": "p06"
      },
      {
        "topic": "Ceteris paribus",
        "prompt": "En una comparación económica, ceteris paribus significa:",
        "options": [
          "Impedir el uso de datos estadísticos.",
          "Asegurar que una teoría nunca pueda cambiar.",
          "Mantener constantes los demás factores relevantes.",
          "Suponer que todas las personas son idénticas.",
          "Eliminar cualquier incertidumbre para siempre."
        ],
        "answer": 2,
        "solution": "La expresión aísla una relación al mantener constantes otros factores relevantes. Es un supuesto analítico y debe explicitarse.",
        "id": "p07"
      },
      {
        "topic": "Eficiencia y equidad",
        "prompt": "Una medida aumenta la producción total, pero sus beneficios se concentran en pocos hogares. ¿Qué conclusión es más adecuada?",
        "options": [
          "Toda distribución desigual impide aumentar la producción.",
          "La equidad solo mide unidades producidas.",
          "La eficiencia elimina la necesidad de estudiar beneficiarios.",
          "El resultado productivo y la distribución deben evaluarse por separado.",
          "Más producción demuestra siempre mayor equidad."
        ],
        "answer": 3,
        "solution": "Eficiencia y equidad responden a preguntas diferentes. Aumentar la producción no demuestra cómo se reparten sus beneficios.",
        "id": "p08"
      },
      {
        "topic": "Economía política",
        "prompt": "Investigar cómo la propiedad de los recursos influye en la negociación entre grupos corresponde especialmente a:",
        "options": [
          "La medición exclusiva de unidades físicas.",
          "La eliminación de las instituciones del análisis.",
          "El cálculo de un promedio sin contexto.",
          "La equivalencia entre precio y justicia.",
          "La economía política."
        ],
        "answer": 4,
        "solution": "La economía política relaciona instituciones, propiedad y poder con resultados económicos. Puede estudiarse desde diferentes enfoques.",
        "id": "p09"
      },
      {
        "topic": "Causalidad",
        "prompt": "Durante una temporada suben a la vez ventas de helados y consumo de agua. ¿Qué afirmación es más rigurosa?",
        "options": [
          "La coincidencia no prueba causalidad; la temperatura podría influir en ambas.",
          "Comprar helados causa necesariamente todo el consumo de agua.",
          "La coincidencia demuestra que no existe ningún otro factor.",
          "Toda correlación es una ley económica definitiva.",
          "Los datos observados carecen siempre de utilidad."
        ],
        "answer": 0,
        "solution": "Una tercera variable, como el calor, puede explicar movimientos conjuntos. Observar correlación orienta hipótesis, pero no demuestra por sí solo causalidad.",
        "id": "p10"
      }
    ]
  },
  "economia-capitulo-02": {
    "title": "División de la economía",
    "problems": [
      {
        "topic": "Economía positiva",
        "prompt": "¿Cuál es un enunciado positivo, aunque necesite comprobarse?",
        "options": [
          "El Estado debería priorizar este gasto sobre los demás.",
          "Es preferible sacrificar crecimiento para lograr mayor igualdad.",
          "El aumento del pasaje redujo el número de viajes.",
          "El transporte debe ser gratuito por justicia.",
          "La distribución actual es moralmente inaceptable."
        ],
        "answer": 2,
        "solution": "El enunciado propone una relación observable entre precio y viajes. Puede contrastarse, por lo que es positivo independientemente de que resulte verdadero.",
        "id": "p01"
      },
      {
        "topic": "Economía normativa",
        "prompt": "¿Qué enunciado expresa directamente un juicio normativo?",
        "options": [
          "Una encuesta registró menos abandono escolar.",
          "El gasto por estudiante se calcula dividiendo gasto entre matrícula.",
          "El precio nominal de un libro pasó de S/ 20 a S/ 24.",
          "El presupuesto debería priorizar el acceso igualitario a educación.",
          "El presupuesto educativo aumentó respecto del año anterior."
        ],
        "answer": 3,
        "solution": "La propuesta utiliza un criterio de prioridad y justicia. Las demás opciones describen hechos o procedimientos de cálculo.",
        "id": "p02"
      },
      {
        "topic": "Descripción",
        "prompt": "Una entidad realiza una encuesta, ordena respuestas y publica una tabla de empleo. Esta actividad corresponde principalmente a:",
        "options": [
          "Una decisión normativa ya ejecutada.",
          "La creación de una ley universal sin datos.",
          "Una política monetaria.",
          "Una reforma constitucional.",
          "Economía descriptiva."
        ],
        "answer": 4,
        "solution": "La economía descriptiva recoge y organiza datos sobre hechos económicos. Explicar sus causas constituye una tarea analítica posterior o complementaria.",
        "id": "p03"
      },
      {
        "topic": "Microeconomía",
        "prompt": "¿Cuál es una pregunta microeconómica?",
        "options": [
          "¿Cómo varían los costos de una panadería al producir más?",
          "¿Cómo evoluciona la inflación del país?",
          "¿Cuál es la producción real agregada de la economía?",
          "¿Qué explica el desempleo nacional?",
          "¿Cómo se comporta la demanda agregada?"
        ],
        "answer": 0,
        "solution": "Los costos de una empresa y sus decisiones de producción son preguntas microeconómicas. El tamaño de la empresa no cambia esta clasificación.",
        "id": "p04"
      },
      {
        "topic": "Macroeconomía",
        "prompt": "¿Qué investigación corresponde a macroeconomía?",
        "options": [
          "La estrategia de un vendedor en un mercado particular.",
          "La relación entre producción nacional y desempleo agregado.",
          "La preferencia de una familia entre dos productos.",
          "El precio de una entrada de cine específica.",
          "El costo de un horno de una panadería."
        ],
        "answer": 1,
        "solution": "La producción nacional y el desempleo agregado se estudian a escala del conjunto económico. Las otras preguntas se centran en agentes o mercados específicos.",
        "id": "p05"
      },
      {
        "topic": "Magnitudes nominales",
        "prompt": "Una tienda vende 50 unidades a S/ 6 y luego 50 a S/ 8. ¿Qué ocurrió?",
        "options": [
          "El ingreso por ventas permaneció igual.",
          "El aumento demuestra mayor productividad laboral.",
          "Aumentaron las ventas nominales, pero no la cantidad vendida.",
          "La cantidad vendida aumentó un tercio.",
          "La cantidad vendida cayó un cuarto."
        ],
        "answer": 2,
        "solution": "El ingreso pasó de S/ 300 a S/ 400, mientras la cantidad siguió en 50. El cambio monetario se explica por el precio.",
        "id": "p06"
      },
      {
        "topic": "Política fiscal",
        "prompt": "¿Cuál es un instrumento del ámbito fiscal?",
        "options": [
          "La elección de compra de una sola familia.",
          "La capacidad física de una máquina.",
          "La utilidad marginal de un consumidor.",
          "El gasto en construcción de infraestructura pública.",
          "La tasa de referencia del banco central."
        ],
        "answer": 3,
        "solution": "La política fiscal se relaciona con ingresos, gasto y financiamiento públicos. La inversión pública es una decisión de ese ámbito.",
        "id": "p07"
      },
      {
        "topic": "Política monetaria",
        "prompt": "Una modificación de la tasa de referencia del BCRP pertenece al ámbito de:",
        "options": [
          "Política de clasificación de bienes.",
          "Reforma del sistema de normas morales.",
          "Contabilidad doméstica exclusivamente.",
          "Medición de necesidades básicas por sí sola.",
          "Política monetaria."
        ],
        "answer": 4,
        "solution": "La tasa de referencia es un instrumento de política monetaria. El BCRP tiene autonomía y finalidad constitucional de preservar la estabilidad monetaria.",
        "id": "p08"
      },
      {
        "topic": "Desarrollo",
        "prompt": "La producción real crece, pero no mejoran servicios ni oportunidades para gran parte de la población. ¿Qué conclusión es válida?",
        "options": [
          "El crecimiento observado no demuestra por sí solo desarrollo integral.",
          "Crecimiento y desarrollo son siempre sinónimos exactos.",
          "La producción real no puede crecer en ese contexto.",
          "El acceso a servicios es irrelevante para el desarrollo.",
          "Todo crecimiento elimina automáticamente la pobreza."
        ],
        "answer": 0,
        "solution": "El desarrollo incorpora capacidades y condiciones de vida. Para evaluarlo se requiere información adicional al crecimiento de la producción.",
        "id": "p09"
      },
      {
        "topic": "Evaluación de políticas",
        "prompt": "Después de un programa mejora el empleo. ¿Qué hace falta para atribuirle causalmente la mejora?",
        "options": [
          "Descartar cualquier información previa.",
          "Comparar con una alternativa pertinente y considerar otros cambios.",
          "Suponer que todo lo posterior fue causado por el programa.",
          "Reemplazar los datos por la intención declarada.",
          "Observar únicamente un caso favorable."
        ],
        "answer": 1,
        "solution": "La evaluación necesita un contrafactual o comparación adecuada. Otros factores pueden haber contribuido al cambio observado.",
        "id": "p10"
      }
    ]
  },
  "economia-capitulo-03": {
    "title": "Necesidades y pobreza",
    "problems": [
      {
        "topic": "Necesidad y deseo",
        "prompt": "Una estudiante necesita trasladarse y desea una marca específica de bicicleta. ¿Qué distinción es correcta?",
        "options": [
          "Necesidad y marca son siempre términos idénticos.",
          "Ningún servicio puede satisfacer transporte.",
          "Elegir una marca elimina la escasez.",
          "Trasladarse es la necesidad; la bicicleta elegida es un satisfactor deseado.",
          "La marca es la única necesidad posible."
        ],
        "answer": 3,
        "solution": "La necesidad puede satisfacerse mediante alternativas. El deseo concreta una opción, que no tiene que ser la única viable.",
        "id": "p01"
      },
      {
        "topic": "Concurrencia",
        "prompt": "Al mismo tiempo, un hogar necesita reparar el techo y comprar materiales de estudio, pero debe priorizar. ¿Qué característica aparece?",
        "options": [
          "Ausencia de restricciones.",
          "Utilidad total negativa necesariamente.",
          "Identidad entre todos los satisfactores.",
          "Pobreza extrema demostrada sin medición.",
          "Concurrencia de necesidades."
        ],
        "answer": 4,
        "solution": "Las necesidades concurrentes se presentan simultáneamente y exigen priorización cuando no pueden atenderse todas de inmediato.",
        "id": "p02"
      },
      {
        "topic": "Complementariedad",
        "prompt": "Para participar en una clase virtual se requieren dispositivo y conexión. En este caso son:",
        "options": [
          "Recursos complementarios para esa actividad.",
          "Dos sustitutos perfectos en todos los usos.",
          "Prueba de ausencia de necesidades.",
          "Bienes necesariamente gratuitos.",
          "Recursos que nunca tienen costo de oportunidad."
        ],
        "answer": 0,
        "solution": "Los recursos se usan conjuntamente para atender la actividad. Contar con solo uno puede no permitir el acceso.",
        "id": "p03"
      },
      {
        "topic": "Utilidad marginal",
        "prompt": "La utilidad total aumenta de 24 a 30 al consumir una unidad adicional. ¿Cuál es la utilidad marginal de esa unidad?",
        "options": [
          "−6 unidades.",
          "6 unidades de utilidad.",
          "54 unidades.",
          "30 unidades.",
          "24 unidades."
        ],
        "answer": 1,
        "solution": "La utilidad marginal es el incremento de utilidad total: 30 − 24 = 6. Las unidades son hipotéticas dentro del ejercicio.",
        "id": "p04"
      },
      {
        "topic": "Utilidad total",
        "prompt": "Si la utilidad marginal pasa de 8 a 5 y continúa siendo positiva, la utilidad total:",
        "options": [
          "Permanece obligatoriamente constante.",
          "Se iguala al precio de mercado.",
          "Sigue aumentando, pero con un incremento menor.",
          "Disminuye necesariamente.",
          "Se vuelve siempre negativa."
        ],
        "answer": 2,
        "solution": "Una utilidad marginal positiva agrega satisfacción total. Que sea decreciente significa que el incremento es menor, no que la total deba caer.",
        "id": "p05"
      },
      {
        "topic": "Clasificación de necesidades",
        "prompt": "¿Cómo debe interpretarse la clasificación escolar de necesidades primarias, secundarias y suntuarias?",
        "options": [
          "Como una lista idéntica para toda sociedad y época.",
          "Como autorización para negar atención de salud.",
          "Como una medición oficial de pobreza por sí sola.",
          "Como una herramienta contextual que no establece una jerarquía de derechos.",
          "Como prueba de que educación no puede ser un derecho."
        ],
        "answer": 3,
        "solution": "Las categorías didácticas dependen del contexto. No reemplazan los derechos ni justifican considerar prescindibles educación o salud.",
        "id": "p06"
      },
      {
        "topic": "Pobreza y escasez",
        "prompt": "¿Cuál es la distinción más precisa?",
        "options": [
          "Toda persona que elige es necesariamente pobre extrema.",
          "Solo existe escasez en hogares sin ingresos.",
          "Pobreza significa únicamente falta de monedas.",
          "Escasez y pobreza son siempre equivalentes.",
          "La escasez obliga a elegir usos; la pobreza expresa privaciones de bienestar."
        ],
        "answer": 4,
        "solution": "Los recursos tienen usos alternativos en todas las economías. La pobreza requiere evaluar condiciones de vida mediante criterios específicos.",
        "id": "p07"
      },
      {
        "topic": "Línea hipotética",
        "prompt": "Un hogar de 5 personas gasta S/ 1800. Las líneas hipotéticas por persona son S/ 500 total y S/ 250 alimentaria. Se clasifica como:",
        "options": [
          "Pobre monetario no extremo.",
          "Pobre extremo.",
          "No pobre monetario.",
          "Imposible calcular por no conocer ingresos.",
          "Hogar con gasto per cápita de S/ 1800."
        ],
        "answer": 0,
        "solution": "El gasto por persona es 1800 ÷ 5 = S/ 360. Está por debajo de la línea total y por encima de la alimentaria.",
        "id": "p08"
      },
      {
        "topic": "Umbral del hogar",
        "prompt": "Con una línea hipotética total de S/ 480 por persona, ¿cuál es el umbral para un hogar de 4 integrantes?",
        "options": [
          "S/ 480.",
          "S/ 1920.",
          "S/ 120.",
          "S/ 484.",
          "S/ 960."
        ],
        "answer": 1,
        "solution": "Se multiplica el umbral por persona por el número de integrantes: 480 × 4 = S/ 1920. La cifra es hipotética.",
        "id": "p09"
      },
      {
        "topic": "Medición no monetaria",
        "prompt": "¿Qué evidencia complementa una medición monetaria de pobreza?",
        "options": [
          "El total de billetes sin conocer el hogar.",
          "La preferencia política de la persona.",
          "La disponibilidad de agua segura y condiciones de vivienda.",
          "Únicamente el nombre de una marca consumida.",
          "Solo el precio de un producto de lujo."
        ],
        "answer": 2,
        "solution": "Las condiciones de vivienda y acceso a servicios informan sobre privaciones que el gasto monetario por sí solo puede no revelar.",
        "id": "p10"
      }
    ]
  },
  "economia-capitulo-04": {
    "title": "Bienes y servicios",
    "problems": [
      {
        "topic": "Bien económico",
        "prompt": "Un servicio se ofrece sin cobro al usuario, pero utiliza personal y equipos. ¿Qué afirmación es correcta?",
        "options": [
          "Debe ser libre porque no tiene precio para el usuario.",
          "No utiliza recursos si es financiado públicamente.",
          "Nunca tiene costo de oportunidad.",
          "No puede satisfacer necesidades.",
          "Puede ser económico porque utiliza recursos escasos aunque sea gratuito al usuario."
        ],
        "answer": 4,
        "solution": "Gratuidad para el usuario y ausencia de escasez son conceptos distintos. Trabajo y equipos tienen usos alternativos y costos.",
        "id": "p01"
      },
      {
        "topic": "Destino",
        "prompt": "Un horno nuevo se utiliza durante años en una panadería. Por destino y duración, es:",
        "options": [
          "De capital y duradero.",
          "De consumo y no duradero.",
          "Libre y no duradero.",
          "Intermedio por ser siempre destruido al primer uso.",
          "De consumo solo por tener un precio."
        ],
        "answer": 0,
        "solution": "El horno contribuye a producir otros bienes y se usa repetidamente. Por ello es capital físico y bien duradero.",
        "id": "p02"
      },
      {
        "topic": "Intermedio y final",
        "prompt": "La harina que compra una familia para cocinar para sí misma se considera, por su uso en ese caso:",
        "options": [
          "Bien Giffen por definición.",
          "Bien final de consumo.",
          "Bien intermedio de la panadería.",
          "Bien de capital fijo.",
          "Bien necesariamente libre."
        ],
        "answer": 1,
        "solution": "La clasificación depende del destino. Comprada para uso final del hogar, la harina es un bien final de consumo.",
        "id": "p03"
      },
      {
        "topic": "Sustitutos",
        "prompt": "Si sube el precio del té y algunos consumidores compran más café, manteniendo lo demás constante, ambos actúan como:",
        "options": [
          "Factores fijos de producción.",
          "Servicios colectivos estatales.",
          "Sustitutos en ese contexto.",
          "Complementarios necesariamente.",
          "Bienes públicos idénticos."
        ],
        "answer": 2,
        "solution": "El café sustituye parte del consumo de té. La relación se identifica por el comportamiento de demanda en el contexto analizado.",
        "id": "p04"
      },
      {
        "topic": "Complementarios",
        "prompt": "¿Qué pareja representa más claramente complementariedad en un uso específico?",
        "options": [
          "Dos marcas intercambiables de agua.",
          "Autobús y bicicleta como alternativas de viaje.",
          "Dos productos que nunca se usan juntos.",
          "Impresora y cartucho compatible.",
          "Té y café como bebidas alternativas."
        ],
        "answer": 3,
        "solution": "La impresora requiere el cartucho compatible para ese uso. Los bienes complementarios se emplean conjuntamente.",
        "id": "p05"
      },
      {
        "topic": "Bien inferior",
        "prompt": "Al aumentar el ingreso de un hogar, disminuye su demanda de un producto. Manteniendo lo demás constante, ese producto es:",
        "options": [
          "Necesariamente defectuoso.",
          "Siempre Giffen.",
          "Libre en cualquier lugar.",
          "Normal por definición.",
          "Inferior para ese hogar en el intervalo considerado."
        ],
        "answer": 4,
        "solution": "Inferior describe la respuesta de demanda al ingreso. No determina la calidad del bien ni prueba el comportamiento excepcional de Giffen.",
        "id": "p06"
      },
      {
        "topic": "Fungibilidad",
        "prompt": "¿Qué precisión evita una confusión del material escolar?",
        "options": [
          "Fungible se refiere a sustitución por equivalentes y no es sinónimo exacto de no duradero.",
          "Todo bien duradero es necesariamente un inmueble.",
          "Todo bien intangible carece de utilidad.",
          "Todo bien final es un bien de consumo.",
          "Todo bien natural es libre."
        ],
        "answer": 0,
        "solution": "La fungibilidad es una propiedad jurídica distinta de la duración. Los criterios de clasificación deben mantenerse separados.",
        "id": "p07"
      },
      {
        "topic": "Valor agregado",
        "prompt": "Sin otros insumos, una cadena vende materia prima por S/ 30, producto intermedio por S/ 50 y producto final por S/ 90. ¿Cuál es el valor agregado de la última etapa?",
        "options": [
          "S/ 140.",
          "S/ 40.",
          "S/ 90.",
          "S/ 170.",
          "S/ 50."
        ],
        "answer": 1,
        "solution": "El valor agregado de esa etapa es 90 − 50 = S/ 40. Se resta el insumo adquirido, sin sumar repetidamente su valor.",
        "id": "p08"
      },
      {
        "topic": "Servicios",
        "prompt": "Un taller municipal atiende a un grupo de vecinos. Por proveedor y destinatarios, se clasifica como:",
        "options": [
          "Intermedio y fungible como criterios de proveedor.",
          "Exclusivamente industrial secundario.",
          "Público y colectivo.",
          "Privado e individual.",
          "Libre e intangible necesariamente sin costos."
        ],
        "answer": 2,
        "solution": "El proveedor es municipal y el servicio se dirige a un grupo. Estas categorías no prueban por sí solas que sea un bien público económico puro.",
        "id": "p09"
      },
      {
        "topic": "Giffen",
        "prompt": "¿Qué afirmación sobre bienes inferiores y Giffen es correcta?",
        "options": [
          "Giffen significa que el bien es gratuito.",
          "Un bien es Giffen solo por ser un alimento básico.",
          "Giffen e inferior describen exactamente la misma relación.",
          "No todo bien inferior presenta comportamiento Giffen.",
          "Todo bien inferior es automáticamente Giffen."
        ],
        "answer": 3,
        "solution": "Inferior relaciona demanda con ingreso; Giffen se refiere a una respuesta excepcional al precio propio. Son propiedades distintas.",
        "id": "p10"
      }
    ]
  },
  "economia-capitulo-05": {
    "title": "Proceso económico y sectores productivos",
    "problems": [
      {
        "topic": "Fases",
        "prompt": "¿Qué secuencia contiene las cinco fases del esquema estudiado?",
        "options": [
          "Producción, circulación, distribución, consumo e inversión.",
          "Producción, inflación, desempleo, comercio y pobreza.",
          "Oferta, ley, moral, ciudadanía y capital.",
          "Ahorro, ahorro, consumo, consumo y precio.",
          "Interpelación, censura, producción, consumo y elección."
        ],
        "answer": 0,
        "solution": "El esquema del material distingue esas cinco fases, que se relacionan y pueden desarrollarse simultáneamente.",
        "id": "p01"
      },
      {
        "topic": "Producción",
        "prompt": "Una docente presta una clase. ¿Qué afirmación es correcta?",
        "options": [
          "La clase no puede satisfacer necesidades.",
          "Produce un servicio que puede generar valor económico.",
          "Solo se produce cuando se fabrica un objeto.",
          "Los servicios no utilizan factores productivos.",
          "La docencia pertenece siempre al sector primario."
        ],
        "answer": 1,
        "solution": "La producción incluye bienes y servicios. Enseñar utiliza recursos y trabajo para atender una necesidad educativa.",
        "id": "p02"
      },
      {
        "topic": "Circulación",
        "prompt": "La venta de un servicio digital sin traslado de objetos muestra que circulación significa:",
        "options": [
          "Eliminación de todos los mercados.",
          "Consumo de capital fijo necesariamente.",
          "Intercambio y conexión entre agentes, además del movimiento físico cuando lo hay.",
          "Únicamente transporte en camiones.",
          "Pago de salarios exclusivamente."
        ],
        "answer": 2,
        "solution": "La circulación económica incluye transacciones. Puede existir intercambio sin transporte de un objeto material.",
        "id": "p03"
      },
      {
        "topic": "Distribución",
        "prompt": "¿Qué caso corresponde a distribución del ingreso?",
        "options": [
          "La colocación de productos en una estantería.",
          "El embalaje físico de un pedido.",
          "El recorrido de un camión sin pagos.",
          "El pago de remuneraciones por el trabajo realizado.",
          "El traslado de cajas de un almacén a otro."
        ],
        "answer": 3,
        "solution": "Distribuir ingreso es asignar recursos monetarios a participantes. No equivale al reparto físico de mercaderías.",
        "id": "p04"
      },
      {
        "topic": "Ahorro",
        "prompt": "Un hogar tiene ingreso disponible de S/ 2700 y consumo de S/ 2300. ¿Cuál es su ahorro?",
        "options": [
          "S/ 5000.",
          "S/ 2300.",
          "S/ 2700.",
          "−S/ 400.",
          "S/ 400."
        ],
        "answer": 4,
        "solution": "En la identidad simplificada, ahorro = ingreso disponible − consumo: 2700 − 2300 = S/ 400.",
        "id": "p05"
      },
      {
        "topic": "Inversión real",
        "prompt": "¿Qué operación constituye más claramente inversión real?",
        "options": [
          "Comprar una máquina nueva para aumentar capacidad productiva.",
          "Comprar una acción ya existente a otra persona.",
          "Pagar una cena para consumo personal.",
          "Cambiar billetes de igual valor.",
          "Recibir una remuneración sin adquirir activos."
        ],
        "answer": 0,
        "solution": "La máquina nueva amplía o renueva capacidad de producción. La compra de un título existente es una operación financiera y no crea por sí sola capital físico.",
        "id": "p06"
      },
      {
        "topic": "Sectores",
        "prompt": "La elaboración industrial de conservas pertenece al sector:",
        "options": [
          "Doméstico sin producción.",
          "Secundario.",
          "Primario por vender alimentos.",
          "Terciario por usar trabajadores.",
          "Financiero exclusivamente."
        ],
        "answer": 1,
        "solution": "Transformar materia prima mediante manufactura corresponde al sector secundario. El tipo de alimento no convierte la transformación en extracción.",
        "id": "p07"
      },
      {
        "topic": "Sectores",
        "prompt": "El transporte de pasajeros y la atención educativa pertenecen al sector:",
        "options": [
          "Extractivo exclusivamente.",
          "Agrícola por definición.",
          "Terciario.",
          "Primario.",
          "Secundario en todos los casos."
        ],
        "answer": 2,
        "solution": "Ambas actividades prestan servicios. En la clasificación de tres sectores corresponden al terciario.",
        "id": "p08"
      },
      {
        "topic": "Flujo circular",
        "prompt": "En el modelo simple, cuando hogares ofrecen trabajo a empresas y reciben salarios, se observa:",
        "options": [
          "Solo circulación de productos finales.",
          "Una ausencia total de intercambio.",
          "Una inversión física obligatoria de cada hogar.",
          "Un flujo real de trabajo y otro monetario en sentido contrario.",
          "Dos flujos monetarios idénticos."
        ],
        "answer": 3,
        "solution": "El trabajo es el flujo real que va a las empresas; la remuneración es el flujo monetario que vuelve a los hogares.",
        "id": "p09"
      },
      {
        "topic": "Valor agregado",
        "prompt": "Una empresa vende producción por S/ 900 y utiliza insumos intermedios por S/ 500. ¿Cuál es su valor agregado en el ejercicio?",
        "options": [
          "S/ 1400.",
          "S/ 900.",
          "S/ 500.",
          "S/ 1800.",
          "S/ 400."
        ],
        "answer": 4,
        "solution": "El valor agregado se obtiene restando consumo intermedio al valor de producción: 900 − 500 = S/ 400. No equivale automáticamente a ganancia.",
        "id": "p10"
      }
    ]
  },
  "economia-capitulo-06": {
    "title": "Teoría de la producción y costos de producción",
    "problems": [
      {
        "topic": "Factores",
        "prompt": "¿Cuál es un ejemplo de capital físico productivo?",
        "options": [
          "La necesidad de alimentación.",
          "Una máquina utilizada en una fábrica.",
          "La habilidad adquirida por una trabajadora.",
          "Una hora de esfuerzo laboral.",
          "Un recurso natural sin transformar."
        ],
        "answer": 1,
        "solution": "Una máquina producida para generar otros bienes es capital físico. Las habilidades son capital humano y el esfuerzo constituye trabajo.",
        "id": "p01"
      },
      {
        "topic": "Horizonte temporal",
        "prompt": "El corto plazo se define porque:",
        "options": [
          "La producción debe ser cero.",
          "Los costos variables desaparecen por definición.",
          "Existe al menos un factor productivo fijo.",
          "Siempre dura exactamente un año.",
          "Todos los factores pueden ajustarse sin restricción."
        ],
        "answer": 2,
        "solution": "La distinción depende de la posibilidad de ajustar factores, no de un número universal de meses o años.",
        "id": "p02"
      },
      {
        "topic": "Productividad media",
        "prompt": "Cinco trabajadores producen 150 unidades durante una jornada. ¿Cuál es el producto medio del trabajo?",
        "options": [
          "145 unidades por trabajador.",
          "5 unidades por trabajador.",
          "150 unidades por trabajador.",
          "30 unidades por trabajador.",
          "750 unidades por trabajador."
        ],
        "answer": 3,
        "solution": "PMe = Q/L = 150/5 = 30 unidades por trabajador en la jornada considerada.",
        "id": "p03"
      },
      {
        "topic": "Producto marginal",
        "prompt": "Con 4 trabajadores se producen 80 unidades y con 5 se producen 95. Manteniendo lo demás constante, el producto marginal del quinto es:",
        "options": [
          "19 unidades.",
          "20 unidades.",
          "175 unidades.",
          "95 unidades.",
          "15 unidades."
        ],
        "answer": 4,
        "solution": "PMg = ΔQ/ΔL = (95 − 80)/(5 − 4) = 15. No se confunde con el producto medio de 95/5.",
        "id": "p04"
      },
      {
        "topic": "Rendimientos",
        "prompt": "Si el producto marginal disminuye de 12 a 7, pero sigue positivo, el producto total:",
        "options": [
          "Aumenta con un incremento menor.",
          "Cae necesariamente.",
          "Se vuelve negativo.",
          "Permanece siempre constante.",
          "Se iguala al costo total."
        ],
        "answer": 0,
        "solution": "Un marginal positivo añade producto. Que disminuya implica un incremento menor; el total cae solo si el marginal es negativo.",
        "id": "p05"
      },
      {
        "topic": "Costo total",
        "prompt": "Con CF = S/ 120 y CV = S/ 280, el costo total es:",
        "options": [
          "S/ 33 600.",
          "S/ 400.",
          "S/ 160.",
          "S/ 280.",
          "S/ 120."
        ],
        "answer": 1,
        "solution": "CT = CF + CV = 120 + 280 = S/ 400. Los dos componentes corresponden al mismo nivel de producción y periodo.",
        "id": "p06"
      },
      {
        "topic": "Costo medio",
        "prompt": "Una empresa produce 25 unidades con CT = S/ 500. Su costo total medio es:",
        "options": [
          "S/ 12 500 por unidad.",
          "S/ 25 por unidad.",
          "S/ 20 por unidad.",
          "S/ 525 por unidad.",
          "S/ 475 por unidad."
        ],
        "answer": 2,
        "solution": "CMe = CT/Q = 500/25 = S/ 20 por unidad. El costo medio es una razón y no una suma.",
        "id": "p07"
      },
      {
        "topic": "Costo marginal",
        "prompt": "CT aumenta de S/ 320 a S/ 380 cuando Q pasa de 20 a 25. El costo adicional medio del tramo es:",
        "options": [
          "S/ 15,20 por unidad.",
          "S/ 16 por unidad.",
          "S/ 700 por unidad.",
          "S/ 12 por unidad.",
          "S/ 60 por unidad."
        ],
        "answer": 3,
        "solution": "CMg del tramo = ΔCT/ΔQ = (380 − 320)/(25 − 20) = 60/5 = S/ 12 por unidad adicional en promedio.",
        "id": "p08"
      },
      {
        "topic": "Producción cero",
        "prompt": "En el modelo básico de corto plazo, si Q = 0, CF = S/ 100 y CV = 0, ¿qué afirmación es correcta?",
        "options": [
          "CT es cero y CMe es cero.",
          "CT es S/ 100 y CMe es S/ 100.",
          "CT es negativo y CMe es positivo.",
          "CF desaparece automáticamente.",
          "CT es S/ 100 y el costo medio no está definido."
        ],
        "answer": 4,
        "solution": "El costo fijo persiste: CT = 100 + 0. CMe = CT/Q no se calcula dividiendo entre cero.",
        "id": "p09"
      },
      {
        "topic": "Costos medios",
        "prompt": "Para Q = 20, CF = S/ 100 y CV = S/ 180. ¿Cuál es la combinación correcta?",
        "options": [
          "CFMe = 5; CVMe = 9; CMe = 14.",
          "CFMe = 100; CVMe = 180; CMe = 280.",
          "CFMe = 9; CVMe = 5; CMe = 4.",
          "CFMe = 5; CVMe = 9; CMe = 45.",
          "CFMe = 20; CVMe = 20; CMe = 40."
        ],
        "answer": 0,
        "solution": "Al dividir cada componente entre 20 se obtiene 5 y 9. El costo medio total es (100 + 180)/20 = 14, igual a la suma de ambos promedios.",
        "id": "p10"
      }
    ]
  },
  "educacion-civica-capitulo-01": {
    "title": "Educación cívica y las normas",
    "problems": [
      {
        "topic": "Formación cívica",
        "prompt": "Una asamblea escucha críticas y exige argumentos antes de decidir. ¿Qué práctica cívica desarrolla?",
        "options": [
          "Concentración de decisiones sin explicación.",
          "Deliberación democrática y respeto al disenso.",
          "Obediencia sin posibilidad de preguntar.",
          "Exclusión de toda posición minoritaria.",
          "Sustitución de derechos por preferencias personales."
        ],
        "answer": 1,
        "solution": "Deliberar supone escuchar, justificar y respetar a quienes discrepan. La participación democrática no se limita a contar votos.",
        "id": "p01"
      },
      {
        "topic": "Norma moral",
        "prompt": "Una persona actúa honestamente por convicción de conciencia. ¿Qué fundamento normativo destaca el caso?",
        "options": [
          "Electoral exclusivamente.",
          "Constituyente en todo caso.",
          "Moral.",
          "Reglamentario por definición.",
          "Tributario necesariamente."
        ],
        "answer": 2,
        "solution": "El caso destaca la convicción personal sobre lo correcto, propia del fundamento moral. La misma conducta puede tener además relevancia jurídica.",
        "id": "p02"
      },
      {
        "topic": "Norma religiosa",
        "prompt": "Una regla de una comunidad basada en sus creencias pertenece principalmente al ámbito:",
        "options": [
          "Electoral.",
          "De organización parlamentaria.",
          "De jerarquía presupuestal.",
          "Religioso.",
          "Fiscal."
        ],
        "answer": 3,
        "solution": "El criterio decisivo es el fundamento en la fe y en la comunidad religiosa. No implica que esa regla sea automáticamente ley estatal.",
        "id": "p03"
      },
      {
        "topic": "Norma jurídica",
        "prompt": "¿Qué rasgo caracteriza principalmente a una norma jurídica?",
        "options": [
          "Que depende solo de la aprobación de amistades.",
          "Que toda infracción recibe siempre prisión.",
          "Que nunca crea facultades, solo castigos.",
          "Que puede emitirse por cualquier persona con autoridad informal.",
          "Su pertenencia al ordenamiento y la garantía institucional de cumplimiento."
        ],
        "answer": 4,
        "solution": "La norma jurídica cuenta con reconocimiento institucional y mecanismos de exigibilidad. Sus consecuencias y autoridades competentes varían según la materia.",
        "id": "p04"
      },
      {
        "topic": "Bilateralidad",
        "prompt": "Una norma reconoce una facultad a una persona y una obligación correlativa a otra. Esto expresa:",
        "options": [
          "Bilateralidad.",
          "Ausencia de regulación.",
          "Simple duración de la norma.",
          "Unanimidad moral.",
          "Supresión del procedimiento."
        ],
        "answer": 0,
        "solution": "La bilateralidad relaciona derechos o facultades con deberes correlativos. No se refiere a que una regla deba tener dos artículos.",
        "id": "p05"
      },
      {
        "topic": "Coacción",
        "prompt": "¿Qué diferencia la posibilidad institucional de exigir una regla de su ejecución efectiva?",
        "options": [
          "Ninguna necesita límites jurídicos.",
          "La primera es coercibilidad; la segunda puede implicar coacción regulada.",
          "La primera elimina derechos; la segunda nunca requiere competencia.",
          "Ambas equivalen siempre a una condena penal.",
          "La primera es un contrato y la segunda una costumbre."
        ],
        "answer": 1,
        "solution": "El respaldo potencial y la ejecución efectiva son conceptos distintos. La actuación material debe respetar competencia, procedimiento y derechos.",
        "id": "p06"
      },
      {
        "topic": "Jerarquía",
        "prompt": "Si un reglamento contradice una ley que debe desarrollar, ¿qué criterio permite cuestionarlo?",
        "options": [
          "La prioridad de la voluntad de quien firma el reglamento.",
          "La derogación automática de la Constitución.",
          "La subordinación jerárquica del reglamento a la ley.",
          "La superioridad automática de todo decreto sobre toda ley.",
          "La inexistencia de jerarquía normativa."
        ],
        "answer": 2,
        "solution": "El artículo 51 establece jerarquía normativa. Un reglamento no puede transgredir la ley que desarrolla.",
        "id": "p07"
      },
      {
        "topic": "Leyes orgánicas",
        "prompt": "¿Cuál es una precisión correcta sobre leyes orgánicas y ordinarias?",
        "options": [
          "Toda ley ordinaria puede desconocer las materias reservadas.",
          "Las orgánicas son únicamente normas morales.",
          "Las ordinarias carecen de fuerza obligatoria.",
          "Tienen rango legal y se distinguen por materias y procedimientos.",
          "Toda ley orgánica supera a la Constitución."
        ],
        "answer": 3,
        "solution": "La distinción no crea una superioridad general de todas las leyes orgánicas. Importan la reserva material y los procedimientos de aprobación.",
        "id": "p08"
      },
      {
        "topic": "Competencia",
        "prompt": "Una ordenanza municipal regula un asunto completamente ajeno a sus atribuciones. Además de jerarquía, debe examinarse:",
        "options": [
          "Solo el número de páginas de la ordenanza.",
          "Únicamente la popularidad del alcalde.",
          "El tamaño del edificio municipal.",
          "La cantidad de copias impresas.",
          "La competencia de la autoridad."
        ],
        "answer": 4,
        "solution": "Tener capacidad normativa no habilita a regular cualquier materia. La competencia define el ámbito de actuación de la autoridad.",
        "id": "p09"
      },
      {
        "topic": "Debido procedimiento",
        "prompt": "Una autoridad sanciona sin regla aplicable ni posibilidad de defensa. ¿Qué evaluación corresponde?",
        "options": [
          "El respaldo estatal no reemplaza legalidad, competencia y procedimiento.",
          "La autoridad puede sancionar por mera incomodidad.",
          "Toda sanción estatal es válida por definición.",
          "La defensa solo importa cuando la autoridad lo desea.",
          "La costumbre de sancionar elimina los límites."
        ],
        "answer": 0,
        "solution": "El Estado de derecho exige fundamento jurídico y garantías. La existencia de una autoridad no convierte cualquier decisión en legítima.",
        "id": "p10"
      }
    ]
  },
  "educacion-civica-capitulo-02": {
    "title": "La Constitución Política",
    "problems": [
      {
        "topic": "Constitución",
        "prompt": "La Constitución cumple principalmente la función de:",
        "options": [
          "Ser un programa personal del gobierno de turno.",
          "Eliminar la necesidad de instituciones de control.",
          "Organizar el poder, reconocer derechos y fijar límites a las autoridades.",
          "Administrar únicamente el presupuesto de una familia.",
          "Reemplazar todas las decisiones judiciales concretas."
        ],
        "answer": 2,
        "solution": "La Constitución establece estructura, competencias, derechos y garantías. Su supremacía limita a quienes ejercen poder público.",
        "id": "p01"
      },
      {
        "topic": "Parte dogmática",
        "prompt": "Un artículo que reconoce libertad e igualdad se vincula especialmente con la parte:",
        "options": [
          "Administrativa contable.",
          "Reglamentaria municipal.",
          "De inventario patrimonial.",
          "Dogmática.",
          "Orgánica exclusivamente."
        ],
        "answer": 3,
        "solution": "La parte dogmática reúne derechos, valores y principios. La orgánica se refiere principalmente a organización y competencias estatales.",
        "id": "p02"
      },
      {
        "topic": "Parte orgánica",
        "prompt": "La regulación de las competencias de un poder del Estado corresponde especialmente a la parte:",
        "options": [
          "Dogmática como único ámbito.",
          "De costumbres privadas.",
          "De deseos personales.",
          "De precios de mercado.",
          "Orgánica."
        ],
        "answer": 4,
        "solution": "La estructura y funciones de las instituciones integran el contenido orgánico. Deben servir a la protección de los derechos.",
        "id": "p03"
      },
      {
        "topic": "Historia constitucional",
        "prompt": "¿Qué relación histórica es correcta?",
        "options": [
          "1823: primera Constitución de la República peruana.",
          "1826: Constitución de vigencia ininterrumpida hasta hoy.",
          "1860: texto elaborado en el año 1993.",
          "1979: primera Constitución republicana.",
          "1993: texto que nunca recibió reformas."
        ],
        "answer": 0,
        "solution": "La primera Constitución republicana es la de 1823. Su aplicación debe estudiarse en el contexto de la independencia.",
        "id": "p04"
      },
      {
        "topic": "Poderes constituidos",
        "prompt": "Un ministerio no puede sustituir la Constitución por resolución porque:",
        "options": [
          "Un cambio de ministro crea automáticamente un nuevo orden constitucional.",
          "Actúa con competencias limitadas como órgano constituido.",
          "Toda resolución tiene más jerarquía que la Constitución.",
          "La Constitución solo obliga a particulares.",
          "Las competencias públicas son ilimitadas."
        ],
        "answer": 1,
        "solution": "Los órganos constituidos reciben competencias del ordenamiento. Una resolución ministerial no tiene poder ni jerarquía para reemplazar la Constitución.",
        "id": "p05"
      },
      {
        "topic": "Estructura",
        "prompt": "¿Qué título de la Constitución se refiere a las garantías constitucionales?",
        "options": [
          "Título III.",
          "Título VI.",
          "Título V.",
          "Título I.",
          "Título II."
        ],
        "answer": 2,
        "solution": "El título V trata las garantías constitucionales. El título VI regula la reforma constitucional.",
        "id": "p06"
      },
      {
        "topic": "Reforma ordinaria",
        "prompt": "Según el artículo 206 reformado, la vía con referéndum exige inicialmente:",
        "options": [
          "Únicamente firmas sin votación parlamentaria.",
          "Mayoría de una comisión municipal.",
          "La firma de cualquier autoridad regional.",
          "Mayoría absoluta del número legal de miembros de cada cámara.",
          "Solo la aprobación de un ministerio."
        ],
        "answer": 3,
        "solution": "La reforma exige aprobación de cada cámara con mayoría absoluta y ratificación por referéndum en esta vía. No basta un acto ejecutivo.",
        "id": "p07"
      },
      {
        "topic": "Reforma sin referéndum",
        "prompt": "¿Qué condición permite omitir referéndum por la vía prevista en el artículo 206?",
        "options": [
          "Una votación simple en una sola cámara.",
          "Dos reuniones de una comisión durante el mismo día.",
          "Un acuerdo exclusivo del Consejo de Ministros.",
          "Una resolución de cualquier gobierno local.",
          "Más de dos tercios en cada cámara en dos legislaturas ordinarias sucesivas."
        ],
        "answer": 4,
        "solution": "La regla exige votación superior a dos tercios del número legal en cada cámara y en dos legislaturas ordinarias sucesivas.",
        "id": "p08"
      },
      {
        "topic": "Iniciativa ciudadana",
        "prompt": "El artículo 206 establece para la iniciativa ciudadana de reforma constitucional firmas verificadas equivalentes al:",
        "options": [
          "0,3% de la población electoral.",
          "3% de todos los habitantes sin distinción.",
          "30% del número de ministros.",
          "50% de las empresas registradas.",
          "100% del padrón de una escuela."
        ],
        "answer": 0,
        "solution": "La iniciativa corresponde a ciudadanos equivalentes al 0,3% de la población electoral, con firmas comprobadas. Iniciativa no significa reforma ya aprobada.",
        "id": "p09"
      },
      {
        "topic": "Actualización normativa",
        "prompt": "¿Qué afirmación refleja la reforma de la Ley 31988?",
        "options": [
          "La reforma constitucional pasó a depender de una sola alcaldía.",
          "El Congreso se organiza en Senado y Cámara de Diputados.",
          "La Constitución quedó reemplazada por un reglamento.",
          "Se eliminaron todos los controles parlamentarios.",
          "Los ministerios asumieron permanentemente toda la función legislativa."
        ],
        "answer": 1,
        "solution": "La Ley 31988 restablece la bicameralidad y modifica competencias y procedimientos. El libro de 2021 describe el sistema anterior.",
        "id": "p10"
      }
    ]
  },
  "educacion-civica-capitulo-03": {
    "title": "Los derechos y mecanismos de protección",
    "problems": [
      {
        "topic": "Universalidad",
        "prompt": "Una persona extranjera conserva sus derechos humanos porque estos:",
        "options": [
          "Se compran mediante un pago al Estado.",
          "Existen solo durante elecciones.",
          "Desaparecen sin una cuenta bancaria.",
          "Se fundamentan en la dignidad de toda persona.",
          "Dependen exclusivamente de su nacionalidad."
        ],
        "answer": 3,
        "solution": "La universalidad comprende a todas las personas. Algunos derechos políticos tienen requisitos específicos, pero ello no elimina los derechos humanos.",
        "id": "p01"
      },
      {
        "topic": "Indivisibilidad",
        "prompt": "Negar educación con el argumento de que solo interesa la libertad civil desconoce principalmente:",
        "options": [
          "La obligación de clasificar por precios.",
          "La exclusividad de los derechos para adultos.",
          "La superioridad automática de una generación.",
          "La inexistencia de derechos sociales.",
          "La indivisibilidad e interdependencia de los derechos."
        ],
        "answer": 4,
        "solution": "Los derechos se relacionan y no se sustituyen por generaciones. Educación y libertades contribuyen conjuntamente al ejercicio de la dignidad.",
        "id": "p02"
      },
      {
        "topic": "Iusnaturalismo",
        "prompt": "¿Qué enfoque fundamenta derechos en la condición humana anterior al reconocimiento estatal?",
        "options": [
          "Iusnaturalismo.",
          "Una equivalencia estricta entre precio y justicia.",
          "La idea de que solo existen permisos temporales.",
          "La negación de todo criterio de justicia.",
          "Un cálculo de costos de producción."
        ],
        "answer": 0,
        "solution": "El iusnaturalismo fundamenta derechos en la naturaleza humana o criterios de justicia anteriores a su reconocimiento por normas positivas.",
        "id": "p03"
      },
      {
        "topic": "Obligaciones estatales",
        "prompt": "Actuar frente a abusos de particulares contra derechos corresponde a la obligación estatal de:",
        "options": [
          "Limitar derechos sin motivación.",
          "Proteger.",
          "Renunciar a toda supervisión.",
          "Sustituir cualquier proceso por castigo inmediato.",
          "Aceptar cualquier discriminación privada."
        ],
        "answer": 1,
        "solution": "Proteger exige medidas frente a vulneraciones por terceros. Se distingue del deber de abstención estatal propio de respetar.",
        "id": "p04"
      },
      {
        "topic": "Instrumentos",
        "prompt": "¿Qué afirmación sobre la Declaración Universal de 1948 es correcta?",
        "options": [
          "Fue emitida por la Corte Interamericana en 1969.",
          "Deroga automáticamente todas las constituciones.",
          "Es una declaración fundamental y no constituye por sí misma un tratado.",
          "Es una sentencia penal contra todas las personas.",
          "Es un reglamento municipal peruano."
        ],
        "answer": 2,
        "solution": "La Declaración Universal fue adoptada por la ONU en 1948. Debe distinguirse de los tratados y de las decisiones judiciales.",
        "id": "p05"
      },
      {
        "topic": "Hábeas corpus",
        "prompt": "En un caso educativo se denuncia una detención arbitraria. ¿Qué garantía se relaciona principalmente con el derecho afectado?",
        "options": [
          "Referéndum.",
          "Revocatoria.",
          "Iniciativa legislativa.",
          "Hábeas corpus.",
          "Acción popular como respuesta a toda detención."
        ],
        "answer": 3,
        "solution": "El hábeas corpus protege la libertad individual y derechos conexos. Las otras opciones tienen objetos diferentes.",
        "id": "p06"
      },
      {
        "topic": "Hábeas data",
        "prompt": "Un conflicto sobre acceso a información pública y protección de datos personales se relaciona especialmente con:",
        "options": [
          "Censura ministerial.",
          "Revocatoria municipal.",
          "Elección parlamentaria.",
          "Indulto presidencial.",
          "Hábeas data."
        ],
        "answer": 4,
        "solution": "El hábeas data protege los derechos de los incisos 5 y 6 del artículo 2, conforme a las condiciones del proceso.",
        "id": "p07"
      },
      {
        "topic": "Control de normas",
        "prompt": "¿Qué proceso se dirige contra normas con rango de ley que contravienen la Constitución?",
        "options": [
          "Acción de inconstitucionalidad.",
          "Solicitud de indulto.",
          "Revocatoria de una persona.",
          "Demanda de rendición de cuentas como sustituto del proceso.",
          "Interpelación de un ministro."
        ],
        "answer": 0,
        "solution": "La acción de inconstitucionalidad examina normas con rango de ley. Se diferencia del control de determinadas normas infralegales mediante acción popular.",
        "id": "p08"
      },
      {
        "topic": "Sistema interamericano",
        "prompt": "¿Cuál es la ruta correcta para una petición individual dentro del sistema interamericano?",
        "options": [
          "Denuncia exclusiva ante una municipalidad extranjera.",
          "Presentación ante la Comisión, cumpliendo sus requisitos.",
          "Demanda directa de cualquier persona ante la Corte como primera vía.",
          "Solicitud ante la CIJ contra otra persona.",
          "Votación del Senado peruano para toda petición."
        ],
        "answer": 1,
        "solution": "Las personas presentan peticiones ante la Comisión. La eventual remisión contenciosa a la Corte sigue las reglas de la Convención Americana.",
        "id": "p09"
      },
      {
        "topic": "Corte Internacional de Justicia",
        "prompt": "La CIJ se diferencia de la Corte Interamericana porque:",
        "options": [
          "Sustituye automáticamente a todos los jueces nacionales.",
          "Organiza las elecciones de los Estados miembros.",
          "Resuelve controversias entre Estados dentro de su jurisdicción y emite opiniones consultivas autorizadas.",
          "Recibe cualquier denuncia penal individual del mundo.",
          "Es una oficina municipal de San José."
        ],
        "answer": 2,
        "solution": "La CIJ es el órgano judicial principal de la ONU, con sede en La Haya. No funciona como tribunal penal general ni recibe demandas individuales de derechos humanos.",
        "id": "p10"
      }
    ]
  },
  "educacion-civica-capitulo-04": {
    "title": "Ciudadanía y mecanismos de participación y de control ciudadanos",
    "problems": [
      {
        "topic": "Nacionalidad y ciudadanía",
        "prompt": "Una niña peruana tiene derechos humanos, pero todavía no vota en elecciones nacionales. Esto muestra que:",
        "options": [
          "Los menores carecen de todos los derechos.",
          "La nacionalidad solo existe desde los 70 años.",
          "Tener un derecho obliga a ejercer todos los cargos políticos.",
          "Solo se pertenece a una comunidad al votar.",
          "Nacionalidad, derechos humanos y ejercicio de ciudadanía electoral no son idénticos."
        ],
        "answer": 4,
        "solution": "La nacionalidad y los derechos no dependen de la edad electoral. El sufragio exige condiciones específicas de ciudadanía.",
        "id": "p01"
      },
      {
        "topic": "Ciudadanía",
        "prompt": "El artículo 30 de la Constitución vincula la ciudadanía peruana con:",
        "options": [
          "Ser peruano mayor de dieciocho años y la inscripción electoral para su ejercicio.",
          "Ser propietario de una empresa.",
          "Contar con estudios universitarios concluidos.",
          "Pertenecer obligatoriamente a un partido.",
          "Tener un ingreso superior a un umbral económico."
        ],
        "answer": 0,
        "solution": "La ciudadanía y su ejercicio se rigen por edad, nacionalidad e inscripción electoral. No dependen de riqueza o educación universitaria.",
        "id": "p02"
      },
      {
        "topic": "Voto",
        "prompt": "La expresión voto secreto significa que:",
        "options": [
          "La autoridad decide el voto del elector.",
          "La opción electoral individual debe poder mantenerse reservada.",
          "La fecha electoral nunca puede publicarse.",
          "El conteo debe ocultarse a toda fiscalización.",
          "Cada persona puede votar varias veces."
        ],
        "answer": 1,
        "solution": "El secreto protege la libertad de la opción individual. No equivale a falta de transparencia en organización o resultados.",
        "id": "p03"
      },
      {
        "topic": "Instituciones electorales",
        "prompt": "¿Qué entidad organiza los procesos electorales?",
        "options": [
          "Contraloría como organizadora electoral.",
          "Consejo de Ministros como reemplazo permanente.",
          "ONPE.",
          "BCRP.",
          "Defensoría del Pueblo."
        ],
        "answer": 2,
        "solution": "La organización de los procesos corresponde a la ONPE. JNE y RENIEC cumplen funciones diferentes dentro del sistema electoral.",
        "id": "p04"
      },
      {
        "topic": "Iniciativa legislativa",
        "prompt": "Un grupo quiere presentar una propuesta de ley. El mecanismo pertinente es:",
        "options": [
          "Remoción de una autoridad designada.",
          "Indulto presidencial.",
          "Hábeas corpus.",
          "Iniciativa legislativa ciudadana.",
          "Revocatoria de autoridades."
        ],
        "answer": 3,
        "solution": "El objetivo es proponer una norma. La iniciativa legislativa es distinta de los mecanismos para controlar o retirar autoridades.",
        "id": "p05"
      },
      {
        "topic": "Referéndum",
        "prompt": "¿Cuál de estas materias está excluida del referéndum por el artículo 32?",
        "options": [
          "Materias de descentralización permitidas.",
          "Ordenanzas municipales conforme al procedimiento.",
          "Reforma constitucional conforme a sus requisitos.",
          "Aprobación de normas permitidas con rango de ley.",
          "La supresión o disminución de derechos fundamentales."
        ],
        "answer": 4,
        "solution": "El artículo 32 excluye reducir o suprimir derechos fundamentales, además de materias tributarias, presupuestales y tratados internacionales en vigor.",
        "id": "p06"
      },
      {
        "topic": "Revocatoria",
        "prompt": "¿Qué describe mejor la revocatoria ciudadana?",
        "options": [
          "Control sobre continuidad de determinadas autoridades elegidas comprendidas por la ley.",
          "Destitución automática de cualquier autoridad nacional por una firma.",
          "Aprobación de una nueva Constitución sin trámite.",
          "Intercambio de representantes entre ministerios.",
          "Solicitud de una opinión sobre un tratado."
        ],
        "answer": 0,
        "solution": "La revocatoria tiene autoridades, requisitos y calendario regulados. No constituye una facultad genérica de retirar a cualquier funcionario.",
        "id": "p07"
      },
      {
        "topic": "Remoción",
        "prompt": "En el esquema de la Ley 26300, la remoción se diferencia de revocatoria por referirse a:",
        "options": [
          "La sustitución automática del padrón electoral.",
          "Determinadas autoridades designadas en los supuestos legales.",
          "Todos los electores que no votaron.",
          "Cualquier docente por decisión informal.",
          "Todo congresista por una petición vecinal."
        ],
        "answer": 1,
        "solution": "La remoción se refiere a autoridades designadas comprendidas por la ley. Su ámbito no alcanza indiscriminadamente a todos los cargos públicos.",
        "id": "p08"
      },
      {
        "topic": "Rendición de cuentas",
        "prompt": "Vecinos buscan respuestas sobre ejecución presupuestal y uso de recursos. Su objetivo se vincula principalmente con:",
        "options": [
          "La eliminación de toda representación.",
          "Una sentencia penal ya emitida.",
          "Rendición de cuentas.",
          "Un indulto colectivo.",
          "La aprobación automática de una ley."
        ],
        "answer": 2,
        "solution": "La rendición de cuentas exige explicación sobre recursos en los supuestos legales. No equivale por sí sola a destitución o condena.",
        "id": "p09"
      },
      {
        "topic": "Participación responsable",
        "prompt": "Antes de impulsar un mecanismo ciudadano, conviene:",
        "options": [
          "Suponer que todos los mecanismos tienen idéntico efecto.",
          "Omitir a las personas afectadas.",
          "Tratar las firmas como una sentencia automática.",
          "Precisar el objetivo, la autoridad competente y los requisitos vigentes.",
          "Difundir cualquier acusación sin verificarla."
        ],
        "answer": 3,
        "solution": "La participación eficaz necesita evidencia, competencia y procedimiento. El mecanismo se elige según lo que se busca lograr.",
        "id": "p10"
      }
    ]
  },
  "educacion-civica-capitulo-05": {
    "title": "El Estado y el Gobierno",
    "problems": [
      {
        "topic": "Estado y gobierno",
        "prompt": "El cambio de autoridades después de unas elecciones modifica principalmente:",
        "options": [
          "El gobierno, sin extinguir por sí mismo al Estado.",
          "La existencia de toda la población.",
          "La nacionalidad de todas las personas automáticamente.",
          "La totalidad del territorio por definición.",
          "Todos los derechos humanos a voluntad."
        ],
        "answer": 0,
        "solution": "El gobierno está integrado por autoridades temporales. El Estado tiene continuidad jurídica e institucional.",
        "id": "p01"
      },
      {
        "topic": "Nación",
        "prompt": "¿Qué concepto remite principalmente a vínculos históricos, culturales y de pertenencia?",
        "options": [
          "Circunscripción presupuestal únicamente.",
          "Nación.",
          "Gabinete ministerial.",
          "Costo de oportunidad.",
          "Reglamento de una oficina."
        ],
        "answer": 1,
        "solution": "La nación expresa vínculos de identidad y pertenencia. No es idéntica al conjunto de autoridades de un gobierno.",
        "id": "p02"
      },
      {
        "topic": "Elementos estatales",
        "prompt": "¿Qué conjunto representa elementos de análisis del Estado?",
        "options": [
          "Exclusivamente símbolos y ceremonias.",
          "Únicamente autoridades temporales.",
          "Población, territorio, poder soberano y organización jurídica.",
          "Precio, costo marginal, ingreso y ahorro.",
          "Solo ministerios sin población ni territorio."
        ],
        "answer": 2,
        "solution": "El Estado requiere una población y un ámbito territorial, con poder y organización jurídica. No se reduce a su gobierno temporal.",
        "id": "p03"
      },
      {
        "topic": "Soberanía",
        "prompt": "En un Estado constitucional, soberanía significa:",
        "options": [
          "Permiso para eliminar derechos sin control.",
          "Ausencia absoluta de normas.",
          "Obligación de concentrar todos los poderes.",
          "Poder estatal ejercido dentro del orden constitucional y sus obligaciones.",
          "Facultad personal ilimitada de cualquier funcionario."
        ],
        "answer": 3,
        "solution": "La soberanía no autoriza arbitrariedad. El poder emana del pueblo y se ejerce conforme a la Constitución y las leyes.",
        "id": "p04"
      },
      {
        "topic": "Características",
        "prompt": "Según el artículo 43, el gobierno peruano es:",
        "options": [
          "Federal por definición constitucional.",
          "Una suma de Estados soberanos municipales.",
          "Patrimonio privado de los ministros.",
          "Incompatible con toda autonomía local.",
          "Unitario, representativo y descentralizado."
        ],
        "answer": 4,
        "solution": "La unidad del Estado coexiste con descentralización y representación. No elimina la autonomía regional y local dentro de sus competencias.",
        "id": "p05"
      },
      {
        "topic": "Deberes estatales",
        "prompt": "¿Cuál es un deber primordial del Estado?",
        "options": [
          "Garantizar la plena vigencia de los derechos humanos.",
          "Impedir cualquier forma de control ciudadano.",
          "Sustituir todos los tribunales por decisiones informales.",
          "Proteger solo a quienes apoyan al gobierno.",
          "Eliminar toda diversidad cultural."
        ],
        "answer": 0,
        "solution": "El artículo 44 incluye garantizar derechos, proteger a la población y promover bienestar general, entre otros deberes.",
        "id": "p06"
      },
      {
        "topic": "Clasificaciones",
        "prompt": "¿Qué pareja corresponde a niveles territoriales de gobierno y no a poderes estatales?",
        "options": [
          "Senado y Cámara de Diputados como niveles territoriales.",
          "Regional y local.",
          "Legislativo y Judicial.",
          "Ejecutivo y Legislativo.",
          "Judicial y Ejecutivo."
        ],
        "answer": 1,
        "solution": "Regional y local describen niveles de gobierno. Los poderes estatales son una clasificación funcional e institucional distinta.",
        "id": "p07"
      },
      {
        "topic": "Descentralización",
        "prompt": "La autonomía municipal significa que una municipalidad:",
        "options": [
          "Puede sustituir al Congreso en toda materia.",
          "No tiene obligación de rendir cuentas.",
          "Actúa en asuntos de su competencia dentro del ordenamiento.",
          "Es un Estado soberano independiente.",
          "Puede desconocer cualquier derecho fundamental."
        ],
        "answer": 2,
        "solution": "La autonomía es una capacidad de decisión en competencias propias. No elimina unidad del Estado, legalidad ni controles.",
        "id": "p08"
      },
      {
        "topic": "Emergencia",
        "prompt": "¿Cuál es el plazo máximo inicial del estado de emergencia previsto en el artículo 137?",
        "options": [
          "5 años.",
          "206 días.",
          "Sin límite temporal.",
          "60 días.",
          "45 días."
        ],
        "answer": 3,
        "solution": "El estado de emergencia tiene un plazo máximo inicial de 60 días. No debe confundirse con los 45 días del estado de sitio.",
        "id": "p09"
      },
      {
        "topic": "Garantías",
        "prompt": "Durante un régimen de excepción, hábeas corpus y amparo:",
        "options": [
          "Desaparecen automáticamente para todos los casos.",
          "Solo existen si una autoridad decide crearlos nuevamente.",
          "Se convierten en permisos para vulnerar derechos.",
          "Son sustituidos siempre por una encuesta.",
          "No quedan suspendidos por la sola declaración del régimen."
        ],
        "answer": 4,
        "solution": "El artículo 200 mantiene estas garantías. Las restricciones y actuaciones estatales siguen sujetas a control dentro del marco constitucional.",
        "id": "p10"
      }
    ]
  },
  "educacion-civica-capitulo-06": {
    "title": "El Poder Legislativo y el Poder Ejecutivo",
    "problems": [
      {
        "topic": "Bicameralidad",
        "prompt": "La estructura del Congreso restablecida por la Ley 31988 comprende:",
        "options": [
          "Gobiernos regionales convertidos en Senado.",
          "Senado y Cámara de Diputados.",
          "Únicamente una cámara de 130 congresistas.",
          "Consejo de Ministros y Poder Judicial.",
          "ONPE y RENIEC como cámaras."
        ],
        "answer": 1,
        "solution": "La reforma restablece dos cámaras legislativas. El esquema unicameral del libro corresponde al régimen anterior.",
        "id": "p01"
      },
      {
        "topic": "Composición",
        "prompt": "El artículo 90 reformado fija los siguientes mínimos:",
        "options": [
          "60 senadores y 60 diputados.",
          "130 senadores y 130 diputados.",
          "60 senadores y 130 diputados.",
          "130 senadores y 60 diputados.",
          "30 senadores y 60 diputados."
        ],
        "answer": 2,
        "solution": "Los mínimos constitucionales son 60 y 130. El artículo prevé condiciones para aumentar números mediante ley orgánica.",
        "id": "p02"
      },
      {
        "topic": "Diputados",
        "prompt": "¿A qué cámara corresponde interpelar y censurar ministros?",
        "options": [
          "Consejo regional de cualquier departamento.",
          "Junta Nacional de Justicia.",
          "RENIEC.",
          "Cámara de Diputados.",
          "Senado como única cámara de control ministerial."
        ],
        "answer": 3,
        "solution": "La reforma atribuye esos mecanismos de responsabilidad política a la Cámara de Diputados. Las competencias de las cámaras son diferenciadas.",
        "id": "p03"
      },
      {
        "topic": "Senado",
        "prompt": "¿Qué atribución corresponde al Senado?",
        "options": [
          "Administrar todas las municipalidades.",
          "Organizar materialmente cada elección nacional.",
          "Dictar sentencias penales en todos los procesos comunes.",
          "Sustituir permanentemente al Consejo de Ministros.",
          "Revisar propuestas legislativas remitidas por Diputados."
        ],
        "answer": 4,
        "solution": "El artículo 102-A atribuye al Senado aprobar, modificar o rechazar las propuestas remitidas por Diputados, además de otras competencias.",
        "id": "p04"
      },
      {
        "topic": "Formación de leyes",
        "prompt": "En el esquema ordinario estudiado, después de aprobar una propuesta, Diputados la remite a:",
        "options": [
          "El Senado para su revisión.",
          "Una municipalidad para reemplazar el procedimiento.",
          "La ONPE para que la promulgue.",
          "El RENIEC para que la convierta en sentencia.",
          "Una empresa privada para que la haga obligatoria."
        ],
        "answer": 0,
        "solution": "La revisión del Senado forma parte del procedimiento bicameral. Iniciativa, dictamen y aprobación de una cámara no equivalen por sí solos a ley vigente.",
        "id": "p05"
      },
      {
        "topic": "Decreto legislativo",
        "prompt": "Un decreto legislativo se caracteriza por ser:",
        "options": [
          "Una propuesta que nunca requiere competencia.",
          "Una norma con rango de ley emitida por el Ejecutivo bajo delegación de materia y plazo.",
          "Una norma moral sin efectos jurídicos.",
          "Una sentencia judicial sobre un caso privado.",
          "Una ordenanza vecinal informal."
        ],
        "answer": 1,
        "solution": "La delegación legislativa está limitada por materia y plazo. No autoriza al Ejecutivo a regular libremente cualquier asunto.",
        "id": "p06"
      },
      {
        "topic": "Poder Ejecutivo",
        "prompt": "El presidente del Consejo de Ministros tiene entre sus funciones:",
        "options": [
          "Disolver libremente el Senado.",
          "Modificar la Constitución mediante una firma.",
          "Coordinar las funciones de los demás ministros.",
          "Reemplazar a todos los jueces en sus causas.",
          "Dirigir el padrón electoral como función exclusiva."
        ],
        "answer": 2,
        "solution": "La coordinación ministerial es una función del presidente del Consejo. No supone asumir competencias de órganos autónomos o de otros poderes.",
        "id": "p07"
      },
      {
        "topic": "Refrendo",
        "prompt": "El refrendo ministerial exigido para los actos presidenciales se relaciona con:",
        "options": [
          "La propiedad privada de la función pública.",
          "La sustitución de la Constitución por costumbre.",
          "La facultad de votar dos veces en elecciones.",
          "La validez constitucional del acto y la responsabilidad ministerial.",
          "La eliminación de todo control político."
        ],
        "answer": 3,
        "solution": "El artículo 120 exige refrendación ministerial. El refrendo vincula al ministro con la responsabilidad por la actuación correspondiente.",
        "id": "p08"
      },
      {
        "topic": "Interpelación",
        "prompt": "Interpelar a un ministro significa principalmente:",
        "options": [
          "Destituirlo siempre sin debate.",
          "Condenarlo penalmente de manera automática.",
          "Elegirlo como senador.",
          "Aprobar una reforma constitucional.",
          "Exigir que responda ante la cámara competente, sin equivaler automáticamente a censura."
        ],
        "answer": 4,
        "solution": "La interpelación requiere respuestas y permite control político. Se distingue de censura, que tiene requisitos y consecuencias propias.",
        "id": "p09"
      },
      {
        "topic": "Disolución",
        "prompt": "¿Qué límite establece el artículo 134 reformado?",
        "options": [
          "El Senado no puede ser disuelto por el presidente.",
          "Ambas cámaras pueden disolverse por cualquier desacuerdo.",
          "Diputados puede disolverse sin convocar elecciones.",
          "La disolución elimina permanentemente el Parlamento.",
          "El último año del mandato permite disolver sin condiciones."
        ],
        "answer": 0,
        "solution": "El artículo permite, bajo condiciones, disolver la Cámara de Diputados. Mantiene al Senado y establece límites temporales y convocatoria electoral.",
        "id": "p10"
      }
    ]
  }
});

// Razonamiento Verbal: capítulos 1–6.
Object.assign(window.CHAPTER_PRACTICES,{
  "razonamiento-verbal-capitulo-01": {
    "title": "Relaciones semánticas",
    "problems": [
      {
        "id": "p01",
        "prompt": "En «La explicación fue diáfana: todos comprendieron el procedimiento», diáfana puede sustituirse por:",
        "options": [
          "clara",
          "extensa",
          "rápida",
          "severa",
          "incierta"
        ],
        "answer": 0,
        "solution": "Diáfana alude aquí a una explicación clara y comprensible. La pista es que todos comprendieron; no se informa sobre su duración ni sobre la rapidez."
      },
      {
        "id": "p02",
        "prompt": "En «Al conocer la noticia, el equipo quedó abatido», ¿qué palabra mantiene el significado de abatido?",
        "options": [
          "derribado",
          "desanimado",
          "distraído",
          "entusiasmado",
          "inmóvil"
        ],
        "answer": 1,
        "solution": "En este contexto, abatido describe el estado de ánimo del equipo. Desanimado conserva esa acepción; derribado llevaría la palabra a un sentido físico no indicado."
      },
      {
        "id": "p03",
        "prompt": "En «Mostró una actitud hostil hacia el visitante», ¿cuál es el antónimo contextual de hostil?",
        "options": [
          "reservada",
          "agresiva",
          "amistosa",
          "indiferente",
          "desconocida"
        ],
        "answer": 2,
        "solution": "Hostil expresa enemistad o rechazo. Amistosa invierte esa actitud; indiferente expresa ausencia de interés y reservada, cautela, no amistad."
      },
      {
        "id": "p04",
        "prompt": "¿Qué pareja presenta antonimia morfológica, formada sobre una misma base?",
        "options": [
          "alegría : tristeza",
          "subir : bajar",
          "joven : anciano",
          "posible : imposible",
          "comprar : vender"
        ],
        "answer": 3,
        "solution": "Imposible se forma sobre posible con un prefijo negativo. Las otras parejas pueden oponerse por el significado, pero no comparten una base con un afijo de negación."
      },
      {
        "id": "p05",
        "prompt": "¿Qué término es hiperónimo de violín, guitarra y violonchelo?",
        "options": [
          "melodía",
          "orquesta",
          "arco",
          "músico",
          "instrumento de cuerda"
        ],
        "answer": 4,
        "solution": "Violín, guitarra y violonchelo son tipos de instrumento de cuerda. Orquesta es un conjunto de músicos; arco es un utensilio y melodía es una sucesión de sonidos."
      },
      {
        "id": "p06",
        "prompt": "Bajo el hiperónimo fruta, ¿qué relación existe entre pera y manzana?",
        "options": [
          "cohiponimia",
          "sinonimia",
          "antonimia",
          "meronimia",
          "holonimia"
        ],
        "answer": 0,
        "solution": "Pera y manzana designan clases diferentes incluidas en fruta. Por compartir ese hiperónimo son cohipónimos; no son palabras de igual significado ni partes una de otra."
      },
      {
        "id": "p07",
        "prompt": "En la pareja página : libro, leída en ese orden, la relación es:",
        "options": [
          "género : especie",
          "parte : todo",
          "todo : parte",
          "causa : efecto",
          "sinónimo : sinónimo"
        ],
        "answer": 1,
        "solution": "Una página es parte de un libro. Página funciona como merónimo respecto de libro; invertir la pareja produciría el orden todo : parte."
      },
      {
        "id": "p08",
        "prompt": "Biblioteca, lector, préstamo y bibliotecario se relacionan principalmente porque:",
        "options": [
          "son sinónimos intercambiables",
          "designan todos una clase de libro",
          "pertenecen al mismo ámbito temático",
          "son antónimos por parejas",
          "nombran exclusivamente objetos"
        ],
        "answer": 2,
        "solution": "Los términos se vinculan con el uso y la organización de libros, pero nombran lugares, personas y actividades distintas. La asociación temática no los hace sinónimos."
      },
      {
        "id": "p09",
        "prompt": "¿Qué concepto queda definido por los rasgos «figura plana cerrada formada por tres lados rectos»?",
        "options": [
          "recta",
          "círculo",
          "ángulo",
          "triángulo",
          "cuadrilátero"
        ],
        "answer": 3,
        "solution": "Los rasgos reunidos delimitan un triángulo. La pregunta exige reconstruir la definición completa; círculo carece de lados rectos y cuadrilátero tiene cuatro."
      },
      {
        "id": "p10",
        "prompt": "¿Qué concepto interviene de manera necesaria en las definiciones de dentista, dentadura y dentífrico?",
        "options": [
          "hospital",
          "anestesia",
          "dolor",
          "cepillo",
          "diente"
        ],
        "answer": 4,
        "solution": "Dentista se relaciona profesionalmente con los dientes; dentadura es su conjunto y dentífrico es un producto para limpiarlos. Hospital, anestesia y dolor no son necesarios en todas esas definiciones."
      }
    ]
  },
  "razonamiento-verbal-capitulo-02": {
    "title": "Series verbales y términos excluidos",
    "problems": [
      {
        "id": "p01",
        "prompt": "Completa la serie de unidades de tiempo de menor a mayor duración: segundo, minuto, hora, …",
        "options": [
          "instante",
          "día",
          "reloj",
          "calendario",
          "ayer"
        ],
        "answer": 1,
        "solution": "Día continúa el aumento de duración después de hora. Reloj y calendario son instrumentos o sistemas relacionados con el tiempo, no unidades que continúen la serie."
      },
      {
        "id": "p02",
        "prompt": "Completa la serie manteniendo la clase instrumento de cuerda: violín, guitarra, violonchelo, …",
        "options": [
          "trompeta",
          "flauta",
          "arpa",
          "tambor",
          "clarinete"
        ],
        "answer": 2,
        "solution": "El arpa produce sonido mediante cuerdas. Trompeta, flauta y clarinete son instrumentos de viento; tambor es de percusión."
      },
      {
        "id": "p03",
        "prompt": "Completa la serie por parejas: abrir, cerrar; entrar, salir; ascender, …",
        "options": [
          "avanzar",
          "llegar",
          "subir",
          "descender",
          "caminar"
        ],
        "answer": 3,
        "solution": "Las parejas reúnen antónimos. Descender se opone a ascender; subir es semejante a ascender y rompería la oposición."
      },
      {
        "id": "p04",
        "prompt": "Completa la serie de pares sinónimos: reparar, arreglar; iniciar, comenzar; concluir, …",
        "options": [
          "aplazar",
          "proponer",
          "reanudar",
          "repetir",
          "terminar"
        ],
        "answer": 4,
        "solution": "Concluir y terminar son sinónimos en el sentido de dar fin a algo. La relación se establece dentro de cada pareja, no entre todos los verbos indiscriminadamente."
      },
      {
        "id": "p05",
        "prompt": "Completa respetando todo : parte: libro, página; bicicleta, rueda; árbol, …",
        "options": [
          "tronco",
          "bosque",
          "semilla",
          "vivero",
          "jardinero"
        ],
        "answer": 0,
        "solution": "El tronco es parte del árbol, como la página del libro y la rueda de la bicicleta. Bosque es un conjunto; semilla se relaciona con su origen y no conserva el vínculo pedido."
      },
      {
        "id": "p06",
        "prompt": "¿Qué término se excluye del grupo de sinónimos de valentía: coraje, arrojo, audacia, valor, cobardía?",
        "options": [
          "coraje",
          "cobardía",
          "arrojo",
          "audacia",
          "valor"
        ],
        "answer": 1,
        "solution": "Coraje, arrojo, audacia y valor pueden expresar valentía. Cobardía expresa falta de valor y no pertenece al grupo sinonímico."
      },
      {
        "id": "p07",
        "prompt": "¿Qué término se excluye del grupo formado por cuatro planetas del sistema solar?",
        "options": [
          "Marte",
          "Venus",
          "Luna",
          "Saturno",
          "Neptuno"
        ],
        "answer": 2,
        "solution": "Marte, Venus, Saturno y Neptuno son planetas. La Luna es el satélite natural de la Tierra, aunque todos sean cuerpos celestes."
      },
      {
        "id": "p08",
        "prompt": "¿Qué término se excluye por no pertenecer al ámbito de la astronomía?",
        "options": [
          "telescopio",
          "órbita",
          "galaxia",
          "receta culinaria",
          "observatorio"
        ],
        "answer": 3,
        "solution": "Telescopio, órbita, galaxia y observatorio se relacionan con el estudio de los astros. Receta culinaria pertenece a la preparación de alimentos; no comparte ese ámbito."
      },
      {
        "id": "p09",
        "prompt": "Completa las dos secuencias intercaladas: lunes, enero, martes, febrero, miércoles, …",
        "options": [
          "jueves",
          "abril",
          "domingo",
          "semana",
          "marzo"
        ],
        "answer": 4,
        "solution": "Las posiciones impares contienen días sucesivos; las pares, meses sucesivos. Después de enero y febrero, corresponde marzo en la sexta posición."
      },
      {
        "id": "p10",
        "prompt": "Si el criterio es partes de un libro impreso, ¿qué término se excluye?",
        "options": [
          "bibliotecario",
          "portada",
          "lomo",
          "página",
          "contraportada"
        ],
        "answer": 0,
        "solution": "Portada, lomo, página y contraportada son partes del libro. Bibliotecario nombra una persona vinculada con los libros, pero no una parte de ellos."
      }
    ]
  },
  "razonamiento-verbal-capitulo-03": {
    "title": "Analogías",
    "problems": [
      {
        "id": "p01",
        "prompt": "DOCENTE : ENSEÑAR :: ¿Qué pareja conserva la relación agente : función?",
        "options": [
          "LIBRO : BIBLIOTECA",
          "PÁGINA : LIBRO",
          "CENTINELA : VIGILAR",
          "HARINA : PAN",
          "ENSEÑAR : DOCENTE"
        ],
        "answer": 2,
        "solution": "El docente tiene como función enseñar y el centinela, vigilar. Enseñar : docente invierte el orden; las demás opciones presentan relaciones diferentes."
      },
      {
        "id": "p02",
        "prompt": "ÁRBOL : TRONCO ::",
        "options": [
          "FLOR : ROSA",
          "ISLA : ARCHIPIÉLAGO",
          "AGUA : JARRA",
          "LIBRO : PÁGINA",
          "PINO : ROBLE"
        ],
        "answer": 3,
        "solution": "Árbol : tronco expresa todo : parte. Libro : página conserva ese orden y vínculo. Flor : rosa es género : especie; isla : archipiélago invierte conjunto y elemento."
      },
      {
        "id": "p03",
        "prompt": "JARRA : AGUA ::",
        "options": [
          "AGUA : RÍO",
          "LIBRO : PÁGINA",
          "MÚSICO : GUITARRA",
          "FLOR : PÉTALO",
          "FLORERO : FLORES"
        ],
        "answer": 4,
        "solution": "La jarra contiene agua y el florero contiene flores: recipiente : contenido. Una página o un pétalo son partes estructurales, no contenidos equivalentes."
      },
      {
        "id": "p04",
        "prompt": "AVE : CÓNDOR ::",
        "options": [
          "FLOR : ROSA",
          "BICICLETA : PEDAL",
          "BANDADA : AVE",
          "CÓNDOR : PLUMA",
          "ROSA : CLAVEL"
        ],
        "answer": 0,
        "solution": "Cóndor es un tipo de ave y rosa es un tipo de flor. Se mantiene género : especie. Bandada : ave corresponde a conjunto : elemento."
      },
      {
        "id": "p05",
        "prompt": "ARCHIPIÉLAGO : ISLA ::",
        "options": [
          "OCÉANO : AGUA",
          "CONSTELACIÓN : ESTRELLA",
          "ÁRBOL : RAMA",
          "ANIMAL : PERRO",
          "ISLA : ARCHIPIÉLAGO"
        ],
        "answer": 1,
        "solution": "Un archipiélago es un conjunto de islas; una constelación agrupa estrellas en una figura aparente. La relación es conjunto : elemento y conserva el orden."
      },
      {
        "id": "p06",
        "prompt": "VELOZ : RÁPIDO ::",
        "options": [
          "ACEPTAR : RECHAZAR",
          "ÁRBOL : BOSQUE",
          "CONTENTO : ALEGRE",
          "CALOR : FRÍO",
          "DOCENTE : AULA"
        ],
        "answer": 2,
        "solution": "Veloz y rápido presentan sinonimia, al igual que contento y alegre. Las parejas de oposición o asociación temática no reproducen ese vínculo."
      },
      {
        "id": "p07",
        "prompt": "ACEPTAR : RECHAZAR ::",
        "options": [
          "REPARAR : ARREGLAR",
          "LEER : LIBRO",
          "CASA : HABITACIÓN",
          "UNIR : SEPARAR",
          "COMENZAR : INICIAR"
        ],
        "answer": 3,
        "solution": "Aceptar y rechazar son acciones opuestas; unir y separar también. Reparar : arreglar y comenzar : iniciar presentan sinonimia, no oposición."
      },
      {
        "id": "p08",
        "prompt": "En la relación causa : efecto, FRICCIÓN : CALOR se corresponde con:",
        "options": [
          "MÉDICO : HOSPITAL",
          "DOLOR : GOLPE",
          "JARRA : AGUA",
          "INFANCIA : ADOLESCENCIA",
          "GOLPE : DOLOR"
        ],
        "answer": 4,
        "solution": "La fricción puede producir calor y un golpe puede producir dolor. Dolor : golpe invierte el orden; infancia : adolescencia expresa sucesión, no la misma relación causal."
      },
      {
        "id": "p09",
        "prompt": "INFANCIA : ADOLESCENCIA :: ¿Qué pareja mantiene la sucesión temporal?",
        "options": [
          "PRIMAVERA : VERANO",
          "VERANO : PRIMAVERA",
          "DÍA : RELOJ",
          "MINUTO : SEGUNDO",
          "ÁRBOL : BOSQUE"
        ],
        "answer": 0,
        "solution": "Primavera antecede a verano en la sucesión de estaciones, como infancia antecede a adolescencia. Invertir ese orden rompería la dirección del par base."
      },
      {
        "id": "p10",
        "prompt": "ROSA : CLAVEL :: ¿Qué pareja mantiene la cogeneridad entre especies distintas?",
        "options": [
          "FLOR : ROSA",
          "ROBLE : PINO",
          "ROSA : PÉTALO",
          "ÁRBOL : TRONCO",
          "BOSQUE : ÁRBOL"
        ],
        "answer": 1,
        "solution": "Rosa y clavel son tipos de flor; roble y pino, tipos de árbol. Cada pareja comparte una clase. Flor : rosa cambia a género : especie y árbol : tronco a todo : parte."
      }
    ]
  },
  "razonamiento-verbal-capitulo-04": {
    "title": "Oraciones incompletas",
    "problems": [
      {
        "id": "p01",
        "prompt": "Completa: «Durante la escasez de agua, la comunidad acordó … su consumo para evitar que el depósito se agotara».",
        "options": [
          "derrochar",
          "duplicar",
          "ignorar",
          "reducir",
          "aumentar"
        ],
        "answer": 3,
        "solution": "Escasez y evitar que se agotara indican la necesidad de disminuir el uso del agua. Reducir expresa esa medida; aumentar o duplicar irían contra la finalidad."
      },
      {
        "id": "p02",
        "prompt": "Completa: «Aunque las críticas lo …, el investigador … con su proyecto sin abandonarlo».",
        "options": [
          "animaron – renunció",
          "fortalecieron – desistió",
          "alegraron – abandonó",
          "convencieron – cesó",
          "desalentaron – continuó"
        ],
        "answer": 4,
        "solution": "Aunque introduce una dificultad que no impide avanzar. Desalentaron expresa esa dificultad y continuó concuerda con sin abandonarlo; las otras parejas contradicen el cierre."
      },
      {
        "id": "p03",
        "prompt": "Completa: «Después de inspirar, debemos … el aire lentamente, es decir, expulsarlo de los pulmones».",
        "options": [
          "exhalar",
          "inhalar",
          "retener",
          "absorber",
          "contener"
        ],
        "answer": 0,
        "solution": "La aclaración expulsarlo de los pulmones define exhalar. Inhalar es introducir aire; retener y contener implican mantenerlo dentro."
      },
      {
        "id": "p04",
        "prompt": "Completa con concordancia y tiempo adecuados: «El profesor y la coordinadora … los resultados ayer».",
        "options": [
          "revisó",
          "revisaron",
          "revisará",
          "revisas",
          "reviso"
        ],
        "answer": 1,
        "solution": "El sujeto compuesto exige plural y ayer sitúa el hecho en el pasado. Revisaron satisface ambas condiciones."
      },
      {
        "id": "p05",
        "prompt": "Completa: «Las propuestas … recibieron el reconocimiento del jurado por aportar soluciones nuevas».",
        "options": [
          "innovador",
          "innovadora",
          "innovadoras",
          "innovación",
          "innovar"
        ],
        "answer": 2,
        "solution": "Propuestas es femenino plural y requiere un adjetivo concordante. Innovadoras además recoge la idea de aportar soluciones nuevas."
      },
      {
        "id": "p06",
        "prompt": "Completa: «Antes de aceptar la afirmación como verdadera, la científica … los datos para … su exactitud».",
        "options": [
          "ocultó – demostrar",
          "alteró – garantizar",
          "inventó – conservar",
          "verificó – comprobar",
          "desechó – medir"
        ],
        "answer": 3,
        "solution": "Verificar los datos permite comprobar su exactitud antes de aceptar una afirmación. Ocultarlos, alterarlos o inventarlos no proporciona esa comprobación."
      },
      {
        "id": "p07",
        "prompt": "Completa: «La artesana … la arcilla hasta darle forma de cuenco».",
        "options": [
          "leyó",
          "disolvió",
          "escuchó",
          "evaporó",
          "modeló"
        ],
        "answer": 4,
        "solution": "Dar forma a una materia moldeable es modelar. La arcilla y el resultado cuenco son rastros que delimitan esa acción."
      },
      {
        "id": "p08",
        "prompt": "Completa: «Prometió guardar el secreto y no … a nadie».",
        "options": [
          "revelarlo",
          "rebelarlo",
          "relevarlo",
          "revocarlo",
          "revalidarlo"
        ],
        "answer": 0,
        "solution": "Revelar un secreto significa darlo a conocer. La frase guardar el secreto exige no revelarlo; rebelar tiene otro significado y no funciona en esa construcción."
      },
      {
        "id": "p09",
        "prompt": "Completa: «El informe carece … pruebas suficientes para sostener esa conclusión».",
        "options": [
          "en",
          "de",
          "a",
          "con",
          "desde"
        ],
        "answer": 1,
        "solution": "La construcción es carecer de algo. La preposición de une el verbo con aquello que falta y respeta la estructura gramatical."
      },
      {
        "id": "p10",
        "prompt": "Completa: «Al detectar resultados … entre sí, el equipo decidió … el experimento para comprobarlos de nuevo».",
        "options": [
          "idénticos – ocultar",
          "concordantes – abandonar",
          "inconsistentes – repetir",
          "uniformes – impedir",
          "precisos – suprimir"
        ],
        "answer": 2,
        "solution": "Inconsistentes indica falta de concordancia, lo que justifica repetir el experimento para comprobar. Las otras acciones no satisfacen la finalidad explícita de comprobar de nuevo."
      }
    ]
  },
  "razonamiento-verbal-capitulo-05": {
    "title": "Conectores lógicos",
    "problems": [
      {
        "id": "p01",
        "prompt": "Completa con el nexo causal: «La planta se marchitó … no recibió agua».",
        "options": [
          "sin embargo",
          "por tanto",
          "es decir",
          "además",
          "porque"
        ],
        "answer": 4,
        "solution": "La falta de agua explica el marchitamiento. Porque introduce esa causa; por tanto presentaría una consecuencia y los demás enlaces no expresan el vínculo solicitado."
      },
      {
        "id": "p02",
        "prompt": "Completa: «Se interrumpió el suministro eléctrico; …, la sala quedó a oscuras».",
        "options": [
          "por eso",
          "sin embargo",
          "en cambio",
          "es decir",
          "además de"
        ],
        "answer": 0,
        "solution": "La oscuridad se presenta como resultado del corte de electricidad. Por eso introduce esa consecuencia y encaja en la construcción."
      },
      {
        "id": "p03",
        "prompt": "Completa con un conector de oposición: «Preparó la exposición con cuidado, … olvidó un dato importante».",
        "options": [
          "porque",
          "pero",
          "por eso",
          "para que",
          "o sea"
        ],
        "answer": 1,
        "solution": "Pero contrapone el cuidado de la preparación con el olvido de un dato. La segunda idea no se presenta como explicación equivalente ni como finalidad."
      },
      {
        "id": "p04",
        "prompt": "Completa con un conector concesivo: «… llovía intensamente, los estudiantes llegaron a la biblioteca».",
        "options": [
          "Porque",
          "Por tanto",
          "Aunque",
          "Además",
          "Es decir"
        ],
        "answer": 2,
        "solution": "Aunque presenta la lluvia como dificultad que no impidió llegar. Porque la convertiría en causa, relación distinta de la solicitada."
      },
      {
        "id": "p05",
        "prompt": "Completa la condición: «Podrás consultar el libro … lo devuelvas dentro del plazo acordado».",
        "options": [
          "puesto que",
          "sin embargo",
          "por consiguiente",
          "siempre que",
          "además"
        ],
        "answer": 3,
        "solution": "Siempre que introduce la condición para consultar el libro: devolverlo a tiempo. No se afirma simplemente una causa ya conocida."
      },
      {
        "id": "p06",
        "prompt": "Completa expresando finalidad: «La docente reorganizó los ejemplos … todos comprendieran la explicación».",
        "options": [
          "aunque",
          "ya que",
          "por tanto",
          "es decir",
          "para que"
        ],
        "answer": 4,
        "solution": "Para que introduce el propósito de reorganizar los ejemplos. La forma comprendieran se integra con la finalidad expresada."
      },
      {
        "id": "p07",
        "prompt": "Completa: «La biblioteca ofrece préstamos de libros; …, organiza talleres de lectura».",
        "options": [
          "además",
          "por el contrario",
          "sin embargo",
          "es decir",
          "a pesar de"
        ],
        "answer": 0,
        "solution": "Además agrega otro servicio compatible con el préstamo. Los talleres no reformulan qué significa prestar libros ni se oponen a ese servicio."
      },
      {
        "id": "p08",
        "prompt": "Completa con un conector aclarativo: «El recipiente es hermético, …, no deja pasar aire».",
        "options": [
          "por eso",
          "es decir",
          "aunque",
          "en cambio",
          "además de"
        ],
        "answer": 1,
        "solution": "El segundo segmento explica el significado de hermético. Es decir introduce una reformulación aclarativa; no se está narrando un resultado posterior."
      },
      {
        "id": "p09",
        "prompt": "Completa: «No entendía … se fue; después explicó el …: salió … se sentía mal».",
        "options": [
          "porque – por qué – porqué",
          "porqué – porque – por qué",
          "por qué – porqué – porque",
          "por que – porque – porqué",
          "porqué – por qué – porque"
        ],
        "answer": 2,
        "solution": "Por qué introduce una pregunta indirecta; el porqué es un sustantivo equivalente a motivo; porque introduce la causa de la salida."
      },
      {
        "id": "p10",
        "prompt": "Completa: «No eligió la versión impresa, … la digital; … tiene conexión, no podrá descargarla».",
        "options": [
          "si no – sino",
          "sino – sino",
          "si no – si no",
          "sino – si no",
          "porque – conque"
        ],
        "answer": 3,
        "solution": "Sino rectifica la negación: no impresa, sino digital. Si no introduce la condición negativa de carecer de conexión; son dos funciones y dos grafías distintas."
      }
    ]
  },
  "razonamiento-verbal-capitulo-06": {
    "title": "La comprensión lectora y la jerarquía textual",
    "problems": [
      {
        "id": "p01",
        "prompt": "<strong>Lee el texto:</strong><span class=\"practice-passage\">La biblioteca del barrio amplió su horario y organizó clubes de lectura. También habilitó una mesa para intercambiar recomendaciones y reservó una sala para que los vecinos estudiaran juntos. Estas medidas convirtieron el local en un espacio de encuentro y aprendizaje compartido. El préstamo de libros sigue siendo importante, pero ya no es la única actividad que reúne a la comunidad. Ahora los usuarios pueden conversar sobre lo que leen y colaborar en nuevos proyectos.</span><strong>¿Cuál es el tema central del texto?</strong>",
        "options": [
          "La biblioteca barrial como espacio de encuentro y aprendizaje",
          "Los horarios de los trabajadores municipales",
          "La historia de la impresión de libros",
          "Las ventajas de estudiar siempre en soledad",
          "El precio de los libros nuevos"
        ],
        "answer": 0,
        "solution": "El conjunto describe cómo varias actividades amplían la función de la biblioteca en la comunidad. El horario es solo un detalle; el tema integra encuentro y aprendizaje."
      },
      {
        "id": "p02",
        "prompt": "<strong>Lee el texto:</strong><span class=\"practice-passage\">La biblioteca del barrio amplió su horario y organizó clubes de lectura. También habilitó una mesa para intercambiar recomendaciones y reservó una sala para que los vecinos estudiaran juntos. Estas medidas convirtieron el local en un espacio de encuentro y aprendizaje compartido. El préstamo de libros sigue siendo importante, pero ya no es la única actividad que reúne a la comunidad. Ahora los usuarios pueden conversar sobre lo que leen y colaborar en nuevos proyectos.</span><strong>¿Qué enunciado expresa mejor la idea principal?</strong>",
        "options": [
          "Los préstamos de libros han dejado de existir",
          "La biblioteca amplió sus funciones para favorecer el encuentro y el aprendizaje compartido",
          "La única actividad importante es intercambiar recomendaciones",
          "Todos los vecinos prefieren estudiar en su casa",
          "Los clubes de lectura impiden realizar otros proyectos"
        ],
        "answer": 1,
        "solution": "La idea elegida integra horario, clubes, sala de estudio y colaboración. El texto afirma que el préstamo sigue siendo importante, por lo que no puede sostenerse que desapareció."
      },
      {
        "id": "p03",
        "prompt": "<strong>Lee el texto:</strong><span class=\"practice-passage\">La biblioteca del barrio amplió su horario y organizó clubes de lectura. También habilitó una mesa para intercambiar recomendaciones y reservó una sala para que los vecinos estudiaran juntos. Estas medidas convirtieron el local en un espacio de encuentro y aprendizaje compartido. El préstamo de libros sigue siendo importante, pero ya no es la única actividad que reúne a la comunidad. Ahora los usuarios pueden conversar sobre lo que leen y colaborar en nuevos proyectos.</span><strong>¿Qué idea secundaria sirve como ejemplo concreto de la transformación descrita?</strong>",
        "options": [
          "Toda biblioteca del mundo tiene el mismo horario",
          "Los usuarios dejaron de pedir libros prestados",
          "Se reservó una sala para que los vecinos estudiaran juntos",
          "La lectura solo puede practicarse individualmente",
          "El barrio construyó una universidad"
        ],
        "answer": 2,
        "solution": "La sala de estudio compartido es un dato explícito que ejemplifica la función comunitaria. Las otras afirmaciones no aparecen o contradicen el texto."
      },
      {
        "id": "p04",
        "prompt": "En «Lucía encontró una carta. La leyó al llegar a casa», ¿a qué se refiere la en La leyó?",
        "options": [
          "a Lucía",
          "a casa",
          "al momento de llegar",
          "a una carta",
          "a una lectura futura"
        ],
        "answer": 3,
        "solution": "La recupera el objeto mencionado antes: una carta. La concordancia y el verbo leer permiten reconocer esa referencia anafórica."
      },
      {
        "id": "p05",
        "prompt": "En «Solo necesitaba esto: tiempo para revisar el informe», esto constituye:",
        "options": [
          "una anáfora que recupera una persona anterior",
          "un sinónimo de informe",
          "un conector de consecuencia",
          "la idea secundaria de un texto ausente",
          "una catáfora que anticipa tiempo para revisar el informe"
        ],
        "answer": 4,
        "solution": "Esto anuncia una información que se especifica después de los dos puntos. Esa dirección hacia un contenido posterior corresponde a la catáfora."
      },
      {
        "id": "p06",
        "prompt": "En «Compró un violín. El instrumento necesitaba una reparación», instrumento sustituye a violín mediante:",
        "options": [
          "hiperonimia",
          "antonimia",
          "meronimia",
          "oposición causal",
          "cambio de sujeto sin referencia"
        ],
        "answer": 0,
        "solution": "Instrumento es un término más general que incluye violín. El contexto permite que retome el mismo objeto mediante una sustitución por hiperónimo."
      },
      {
        "id": "p07",
        "prompt": "<strong>Lee el texto:</strong><span class=\"practice-passage\">El huerto vecinal produce hortalizas para varias familias, pero su valor no se limita a la cosecha. Los vecinos aprenden a distribuir tareas, intercambian conocimientos y acuerdan turnos de riego. Cuando aparece un problema, buscan una solución entre todos. Así, el cultivo compartido también fortalece la cooperación. Considerarlo únicamente una fuente de alimentos dejaría fuera una parte esencial de lo que aporta al barrio.</span><strong>¿Qué afirmación recoge mejor la idea principal?</strong>",
        "options": [
          "El huerto solo importa por la cantidad de hortalizas",
          "El huerto ofrece alimentos y, además, fortalece la cooperación vecinal",
          "Distribuir turnos de riego impide la cooperación",
          "Los vecinos no necesitan ponerse de acuerdo",
          "El barrio abandonó el cultivo de alimentos"
        ],
        "answer": 1,
        "solution": "La idea central integra el aporte alimentario y el social. Tareas, conocimientos y soluciones conjuntas sustentan la cooperación; limitarlo a la cosecha contradice el texto."
      },
      {
        "id": "p08",
        "prompt": "<strong>Lee el texto:</strong><span class=\"practice-passage\">El huerto vecinal produce hortalizas para varias familias, pero su valor no se limita a la cosecha. Los vecinos aprenden a distribuir tareas, intercambian conocimientos y acuerdan turnos de riego. Cuando aparece un problema, buscan una solución entre todos. Así, el cultivo compartido también fortalece la cooperación. Considerarlo únicamente una fuente de alimentos dejaría fuera una parte esencial de lo que aporta al barrio.</span><strong>¿Qué función cumple la mención de los turnos de riego?</strong>",
        "options": [
          "Introduce un tema sin relación con el huerto",
          "Niega que el huerto produzca alimentos",
          "Ejemplifica una práctica de organización y cooperación",
          "Presenta la conclusión de que nadie colabora",
          "Demuestra que solo una persona toma decisiones"
        ],
        "answer": 2,
        "solution": "Acordar turnos es un ejemplo concreto de coordinación. La idea apoya la afirmación general sobre cooperación, pero no representa por sí sola todo el mensaje."
      },
      {
        "id": "p09",
        "prompt": "<strong>Lee el texto:</strong><span class=\"practice-passage\">Reconocer cada palabra de un texto no garantiza comprenderlo. Para construir su sentido, el lector necesita relacionar las ideas, identificar a qué se refieren las expresiones y distinguir lo central de lo secundario. Por eso, una lectura muy rápida puede resultar insuficiente si no permite establecer esos vínculos. Comprender supone una actividad interpretativa, además de la decodificación de las palabras.</span><strong>¿Cuál es la idea principal del texto?</strong>",
        "options": [
          "Leer rápidamente garantiza entender cualquier texto",
          "Conocer las palabras vuelve innecesaria la interpretación",
          "Toda información de un texto tiene la misma importancia",
          "Comprender requiere interpretar relaciones entre ideas, además de reconocer palabras",
          "La comprensión depende únicamente de la pronunciación"
        ],
        "answer": 3,
        "solution": "El texto contrasta reconocimiento de palabras e interpretación. Su afirmación central es que comprender requiere construir relaciones y jerarquías, no solo decodificar."
      },
      {
        "id": "p10",
        "prompt": "¿Qué afirmación distingue correctamente tema central e idea principal?",
        "options": [
          "El tema es siempre la primera oración y la idea principal la última",
          "Ambos deben reducirse a una sola palabra",
          "La idea principal es cualquier dato repetido muchas veces",
          "El tema solo aparece en textos con título",
          "El tema nombra el asunto; la idea principal afirma algo central sobre él"
        ],
        "answer": 4,
        "solution": "La diferencia es funcional: el tema identifica de qué se trata y la idea principal expresa qué se sostiene fundamentalmente. Ninguno depende de una posición fija ni de la existencia de título."
      }
    ]
  }
});
