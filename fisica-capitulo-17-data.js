'use strict';
window.HISTORY_CONTENT={
  "number": 17,
  "id": "fisica-capitulo-17",
  "progressId": "fisica-capitulo-17",
  "courseId": 16,
  "courseName": "Física",
  "title": "Electromagnetismo",
  "intro": "Del campo magnético a la electricidad: explora fuerzas, mueve un imán a través de una bobina y descubre cómo un generador transforma movimiento en energía eléctrica.",
  "version": 1,
  "format": "reading",
  "assessmentFormat": "practice-10",
  "induction": {
    "id": "induction-lab",
    "anchor": "induction-lab",
    "label": "Abrir el laboratorio de inducción"
  },
  "goals": [
    {
      "title": "Interpretar campos y fuerzas",
      "text": "Reconoce el sentido del campo magnético y aplica las reglas de la mano derecha y las expresiones de fuerza."
    },
    {
      "title": "Experimentar y explicar",
      "text": "Relaciona el cambio de flujo con la fem inducida; distingue la fem de la corriente en un circuito abierto."
    },
    {
      "title": "Transformar energía",
      "text": "Interpreta las señales de un generador y justifica de dónde procede la energía que entrega."
    }
  ],
  "sequenceTitle": "Del campo a la generación eléctrica",
  "sequenceNote": "Explora primero, contrasta tus observaciones con el modelo y termina con diez problemas de aplicación.",
  "timeline": [
    [
      "Explora",
      "Mueve el imán, observa las señales y formula una predicción."
    ],
    [
      "Reconoce",
      "Representa campos magnéticos y sus fuentes."
    ],
    [
      "Calcula",
      "Analiza las fuerzas sobre cargas y conductores."
    ],
    [
      "Relaciona",
      "Distingue flujo y cambio de flujo."
    ],
    [
      "Genera",
      "Explica la inducción y el origen de la energía eléctrica."
    ]
  ],
  "lessons": [
    {
      "title": "Laboratorio: del movimiento a la electricidad",
      "blocks": [
        {
          "id": "fis17-laboratorio",
          "title": "Toma el control del experimento",
          "paragraphs": [
            "Entra al laboratorio y observa la bobina, el imán y los instrumentos. Comienza con pocas espiras, mueve el imán lentamente y repite el recorrido con mayor rapidez. Antes de cada prueba, predice si cambiarán el signo de la señal, su magnitud o ambos.",
            "Compara un imán detenido cerca de la bobina con uno que se desplaza. Después abre el interruptor mientras hay una fem inducida. ¿Qué instrumento puede seguir mostrando una señal y cuál debe indicar cero? Usa el generador para comparar una vuelta completa con la gráfica de la fem.",
            "Los retos del laboratorio se guardan con tu avance. La calificación del capítulo corresponde a los diez problemas de la práctica. Los dibujos y sus movimientos representan un modelo didáctico: no reproducen cada detalle de una bobina real."
          ],
          "interactive": "induction-lab"
        },
        {
          "id": "fis17-metodo",
          "title": "Una prueba que permita comparar",
          "paragraphs": [
            "Modifica una variable cada vez. Conserva posición y rapidez al comparar el número de espiras; conserva las espiras y el recorrido al invertir los polos. Describe el resultado con una observación medible, como «la fem cambió de signo», en lugar de «el imán produjo más energía».",
            "La posición se mide en metros, la rapidez en metros por segundo, la fem en voltios y la corriente en amperios. Un valor negativo indica sentido opuesto al sentido positivo elegido; no significa que la magnitud sea imposible."
          ],
          "takeaway": "Pregunta, predice, cambia una variable, observa y explica. Una gráfica adquiere sentido cuando identificas sus ejes y unidades."
        }
      ],
      "examples": [
        {
          "title": "Compara dos recorridos",
          "question": "¿Cómo investigarías si aumentar la rapidez aumenta la magnitud de la fem?",
          "steps": [
            "Usa el mismo imán, la misma bobina y el mismo estado del interruptor en ambas pruebas.",
            "Compara la señal en una misma posición del recorrido, primero con menor rapidez y luego con mayor rapidez.",
            "Registra las dos magnitudes de fem. La comparación debe hacerse en posiciones equivalentes, porque el cambio de flujo también depende de la posición."
          ]
        }
      ]
    },
    {
      "title": "Campo magnético: fuentes, líneas y sentido",
      "blocks": [
        {
          "id": "fis17-campo",
          "title": "Un campo que se representa con dirección",
          "paragraphs": [
            "El campo magnético B es una magnitud vectorial cuya unidad del SI es el tesla (T). Una brújula permite reconocer su dirección local. Las líneas de campo son una representación: su tangente indica la dirección y una mayor densidad de líneas sugiere mayor intensidad.",
            "En el exterior de un imán de barra, las líneas salen del polo norte y entran en el sur; dentro del imán continúan del sur al norte y forman lazos cerrados. Cortar un imán no separa un polo norte aislado de un polo sur aislado.",
            "En un dibujo plano, el símbolo ⊙ representa un vector que sale hacia quien observa y ⊗ representa uno que entra en la hoja."
          ],
          "sources": [
            {
              "label": "Campos magnéticos y líneas · OpenStax",
              "url": "https://openstax.org/books/university-physics-volume-2/pages/11-2-magnetic-fields-and-lines"
            }
          ]
        },
        {
          "id": "fis17-corriente-campo",
          "title": "La corriente también produce campo",
          "paragraphs": [
            "Alrededor de un conductor rectilíneo con corriente, el campo forma circunferencias. Abraza imaginariamente el conductor con la mano derecha: el pulgar apunta en el sentido de la corriente convencional y los dedos curvados indican el sentido del campo.",
            "Para un hilo rectilíneo muy largo, en el vacío y a distancia r del eje: B = μ₀I/(2πr). A este nivel usamos μ₀ ≈ 4π × 10⁻⁷ T·m/A. La expresión es una aproximación para puntos alejados de los extremos y situados fuera del conductor; no se aplica en r = 0.",
            "En una bobina, muchas espiras contribuyen al campo. Si los dedos siguen la corriente de las espiras, el pulgar señala el campo interior y el extremo que actúa como polo norte."
          ],
          "sources": [
            {
              "label": "Campo de un hilo rectilíneo · OpenStax",
              "url": "https://openstax.org/books/university-physics-volume-2/pages/12-2-magnetic-field-due-to-a-thin-straight-wire"
            }
          ]
        }
      ],
      "examples": [
        {
          "title": "Campo de un conductor largo",
          "question": "Un hilo largo lleva 5 A. ¿Cuál es B a 2 cm de él, aproximadamente en el vacío?",
          "steps": [
            "Convierte la distancia: 2 cm = 0,02 m.",
            "Sustituye: B = (4π × 10⁻⁷ × 5)/(2π × 0,02) = 5 × 10⁻⁵ T.",
            "El resultado es 50 μT. Su sentido se obtiene con la mano derecha; la fórmula anterior da la magnitud."
          ]
        }
      ]
    },
    {
      "title": "Fuerzas sobre cargas y conductores",
      "blocks": [
        {
          "id": "fis17-fuerza-carga",
          "title": "La fuerza depende del movimiento",
          "paragraphs": [
            "Una carga q con velocidad v en un campo B experimenta la fuerza magnética vectorial F = q(v × B). Su magnitud es F = |q|vB sen θ, donde θ es el ángulo entre la velocidad y el campo. Es nula si la carga está en reposo o si su velocidad es paralela al campo, y máxima si ambos son perpendiculares.",
            "Para una carga positiva, el producto vectorial se orienta con la mano derecha desde v hacia B por el giro menor. Para una carga negativa, invierte ese sentido. La fuerza es perpendicular a la velocidad: por sí sola no realiza trabajo sobre una carga puntual ni cambia su rapidez, aunque sí puede cambiar la dirección de su movimiento."
          ],
          "sources": [
            {
              "label": "Fuerza magnética y mano derecha · OpenStax",
              "url": "https://openstax.org/books/university-physics-volume-2/pages/11-2-magnetic-fields-and-lines"
            }
          ]
        },
        {
          "id": "fis17-fuerza-hilo",
          "title": "Un conductor puede experimentar una fuerza",
          "paragraphs": [
            "Para un tramo recto de longitud L, con corriente I, completamente inmerso en un campo uniforme: F = BIL sen θ. Aquí θ es el ángulo entre el sentido de la corriente convencional y B. La dirección se determina mediante L × B, tomando L en el sentido de la corriente.",
            "Distingue dos preguntas: una corriente produce su propio campo y, además, un campo externo puede ejercer una fuerza sobre el conductor. En motores, fuerzas sobre distintos tramos de una bobina producen un torque que puede hacerla girar."
          ],
          "sources": [
            {
              "label": "Fuerza sobre un conductor · OpenStax",
              "url": "https://openstax.org/books/university-physics-volume-2/pages/11-4-magnetic-force-on-a-current-carrying-conductor"
            }
          ]
        }
      ],
      "examples": [
        {
          "title": "Del dato al vector",
          "question": "Un tramo de 0,20 m conduce 3 A hacia la derecha en un campo uniforme de 0,50 T que entra en la hoja. ¿Qué fuerza experimenta?",
          "steps": [
            "La corriente y el campo son perpendiculares, por lo que sen 90° = 1.",
            "La magnitud es F = 0,50 × 3 × 0,20 = 0,30 N.",
            "La mano derecha aplicada a corriente hacia la derecha y campo hacia dentro da una fuerza hacia arriba en la hoja."
          ]
        }
      ]
    },
    {
      "title": "Flujo magnético y ley de Faraday",
      "blocks": [
        {
          "id": "fis17-flujo",
          "title": "Cuánto campo atraviesa una superficie",
          "paragraphs": [
            "En una espira plana de área A y campo uniforme, el flujo es Φ = BA cos θ. El ángulo θ se mide entre B y la normal a la superficie, no entre B y el plano. La normal es una dirección perpendicular a la espira que elegimos para fijar el signo.",
            "La unidad del flujo es el weber: 1 Wb = 1 T·m². Si el campo es perpendicular al plano, |Φ| = BA; si es paralelo al plano, Φ = 0. Para un campo no uniforme se suman las contribuciones de pequeñas áreas; la fórmula BA cos θ requiere la uniformidad indicada."
          ],
          "headers": [
            "Situación",
            "Ángulo con la normal",
            "Flujo por espira"
          ],
          "rows": [
            [
              "B en el sentido de la normal",
              "0°",
              "+BA"
            ],
            [
              "B paralelo al plano",
              "90°",
              "0"
            ],
            [
              "B opuesto a la normal",
              "180°",
              "−BA"
            ]
          ],
          "sources": [
            {
              "label": "Flujo y ley de Faraday · OpenStax",
              "url": "https://openstax.org/books/university-physics-volume-2/pages/13-1-faradays-law"
            }
          ]
        },
        {
          "id": "fis17-faraday",
          "title": "La fem depende del cambio de flujo",
          "paragraphs": [
            "Para N espiras con el mismo flujo, la ley de Faraday se escribe ε = −N dΦ/dt. Si se pide la fem media durante un intervalo, ε_media = −N ΔΦ/Δt. La fem se mide en voltios; a pesar de su nombre tradicional «fuerza electromotriz», no es una fuerza medida en newtons.",
            "El flujo puede cambiar porque varía B, el área o la orientación de la espira. Un flujo grande y constante produce fem inducida nula. En cambio, incluso al pasar el flujo por cero puede existir una fem si está cambiando en ese instante."
          ],
          "takeaway": "Flujo y fem son magnitudes distintas. La pendiente de la gráfica del flujo determina la fem, con signo opuesto y factor N."
        }
      ],
      "examples": [
        {
          "title": "Fem media en una bobina",
          "question": "Una bobina de 100 espiras pasa de 0,002 Wb a 0,008 Wb por espira en 0,30 s. ¿Cuál es su fem media?",
          "steps": [
            "El cambio de flujo es ΔΦ = 0,008 − 0,002 = +0,006 Wb.",
            "ε_media = −100 × 0,006/0,30 = −2 V. Su magnitud es 2 V.",
            "El signo depende de la orientación de referencia elegida. La fem instantánea solo coincide con esta media si el flujo varía linealmente en ese intervalo."
          ]
        }
      ]
    },
    {
      "title": "Ley de Lenz: sentido y circuito abierto",
      "blocks": [
        {
          "id": "fis17-lenz",
          "title": "Oponerse al cambio, no siempre al campo",
          "paragraphs": [
            "La ley de Lenz establece que la corriente inducida, si puede circular, crea un campo que se opone al cambio de flujo que la origina. Si aumenta un flujo entrante, la corriente inducida produce campo saliente; si disminuye ese flujo entrante, produce campo entrante para oponerse a la disminución.",
            "Para decidir el sentido, sigue tres pasos: identifica el sentido del campo externo, determina si su flujo aumenta o disminuye y elige el campo inducido que se opone a ese cambio. Finalmente aplica la mano derecha a la espira. No basta con decir que el campo inducido siempre es opuesto al externo."
          ],
          "sources": [
            {
              "label": "Ley de Lenz y energía · OpenStax",
              "url": "https://openstax.org/books/university-physics-volume-2/pages/13-2-lenzs-law"
            }
          ]
        },
        {
          "id": "fis17-abierto",
          "title": "Fem no significa siempre corriente",
          "paragraphs": [
            "Una bobina abierta puede presentar una fem inducida entre sus terminales mientras cambia el flujo. Al no existir una trayectoria conductora cerrada, la corriente sostenida del circuito es cero. En el modelo resistivo cerrado, I = ε/R, donde R es la resistencia total.",
            "En el laboratorio se desprecia la autoinducción, la capacitancia y los transitorios de conexión; por ello la corriente sigue instantáneamente a ε/R cuando el circuito está cerrado. Una bobina real puede responder de otra manera durante cambios rápidos. La polaridad de una lectura exige mantener la misma conexión y referencia de medida."
          ],
          "takeaway": "Al abrir el interruptor, compara fem y corriente por separado. No concluyas que desapareció la inducción solo porque el amperímetro marca cero."
        }
      ],
      "examples": [
        {
          "title": "Dos instrumentos, dos conclusiones",
          "question": "Un flujo cambiante induce una fem de 3 V en una bobina. La resistencia total del circuito cerrado es 15 Ω. ¿Qué cambia al abrirlo?",
          "steps": [
            "En el modelo resistivo cerrado, I = 3/15 = 0,20 A.",
            "Al abrirlo, la corriente sostenida pasa a cero porque la trayectoria conductora queda interrumpida.",
            "Si el flujo continúa cambiando de la misma manera, puede mantenerse una fem de 3 V. La inducción depende del flujo cambiante, no de la existencia de una corriente cerrada."
          ]
        }
      ]
    },
    {
      "title": "El generador: movimiento, señal y energía",
      "blocks": [
        {
          "id": "fis17-generador",
          "title": "Una vuelta que produce una señal alterna",
          "paragraphs": [
            "Una bobina de N espiras y área A que gira con velocidad angular constante ω en un campo uniforme B tiene, si θ = ωt comienza en 0, flujo por espira Φ = BA cos(ωt). La fem es ε = NBAω sen(ωt), con amplitud ε₀ = NBA|ω|. El ángulo vuelve a medirse desde la normal.",
            "Cuando el flujo alcanza un máximo o un mínimo, su pendiente es cero y la fem instantánea es cero. Cuando el flujo cruza por cero, la magnitud de su pendiente y la de la fem son máximas. Una vuelta dura T = 2π/|ω|; la frecuencia es f = 1/T.",
            "En este generador ideal de corriente alterna, el signo de la fem cambia cada media vuelta. Duplicar las espiras duplica la amplitud sin cambiar la frecuencia; duplicar la rapidez angular duplica tanto la amplitud como la frecuencia."
          ],
          "sources": [
            {
              "label": "Generadores eléctricos · OpenStax",
              "url": "https://openstax.org/books/university-physics-volume-2/pages/13-6-electric-generators-and-back-emf"
            }
          ]
        },
        {
          "id": "fis17-energia",
          "title": "La electricidad tiene un aporte de energía",
          "paragraphs": [
            "El generador transforma trabajo mecánico en energía eléctrica. Si alimenta una resistencia, esta recibe potencia P = I²R = εI en el modelo ideal. Mantener el giro bajo carga requiere trabajo externo contra el efecto electromagnético: el imán no es una reserva de energía ilimitada.",
            "Usa el laboratorio para cerrar una explicación completa: describe qué se mueve, qué flujo cambia, qué fem aparece y cuándo circula corriente. Distingue observaciones del instrumento de idealizaciones del modelo. Después aplica esas relaciones a los diez problemas del capítulo."
          ],
          "takeaway": "Un generador convierte energía. Para obtener energía eléctrica de forma continua hay que aportar energía mecánica."
        }
      ],
      "examples": [
        {
          "title": "Amplitud de un generador",
          "question": "Una bobina de 200 espiras y área 0,010 m² gira a 20 rad/s en un campo uniforme de 0,050 T. ¿Cuál es la fem máxima?",
          "steps": [
            "Los datos ya están en unidades del SI.",
            "ε₀ = NBAω = 200 × 0,050 × 0,010 × 20 = 2 V.",
            "Su valor instantáneo depende del ángulo: ε = 2 sen θ V. A θ = 90° vale +2 V y a θ = 270° vale −2 V, con la referencia elegida."
          ]
        }
      ]
    }
  ]
};
