'use strict';
// Expedientes originales de ficción para SIN LÍMITES. No describen instituciones ni estudios reales.
window.TEXT_DETECTIVE_CASES=[
  {
    "id": "vitrina-vacia",
    "title": "La vitrina vacía",
    "kicker": "EXPEDIENTE 01 · MUSEO",
    "subtitle": "Una ausencia, una versión apresurada y dos documentos que puedes contrastar.",
    "scene": "museum",
    "difficulty": "Básico",
    "documents": [
      {
        "id": "museo-registro",
        "title": "Registro de la sala costera",
        "type": "Registro de sala",
        "sentences": [
          {
            "id": "museo-s1",
            "text": "El lunes por la mañana, la vitrina central apareció vacía; un panel cercano anunciaba la renovación de la sala costera."
          },
          {
            "id": "museo-s2",
            "text": "La ficha de esa vitrina identificaba el mapa costero expuesto hasta el domingo con el código MC-17."
          },
          {
            "id": "museo-s3",
            "text": "Una publicación vecinal afirmó: «Si la vitrina está vacía, el mapa se ha perdido»."
          },
          {
            "id": "museo-s4",
            "text": "El registro del lunes no consignó préstamos de piezas a otras instituciones."
          }
        ]
      },
      {
        "id": "museo-informe",
        "title": "Informe del taller de conservación",
        "type": "Informe interno",
        "sentences": [
          {
            "id": "museo-s5",
            "text": "A las 8:10 del lunes, el taller de conservación del museo recibió la pieza MC-17 para revisar pequeñas deformaciones del papel."
          },
          {
            "id": "museo-s6",
            "text": "La orden de trabajo indicó que la pieza permanecería en el taller hasta completar la revisión, sin fijar una fecha de retorno."
          },
          {
            "id": "museo-s7",
            "text": "El equipo acordó acompañar la vitrina con una reproducción mientras duraran los trabajos de la sala."
          },
          {
            "id": "museo-s8",
            "text": "El responsable aclaró que la ausencia de una pieza en la exhibición debe interpretarse con los registros de su ubicación y no basta para afirmar que se ha perdido."
          }
        ]
      }
    ],
    "questions": [
      {
        "id": "museo-explicita",
        "kind": "explicit",
        "prompt": "¿A qué hora recibió el taller la pieza MC-17? Selecciona el fragmento que contiene el dato.",
        "options": [
          {
            "id": "a",
            "text": "A las 7:10 del domingo."
          },
          {
            "id": "b",
            "text": "A las 8:10 del domingo."
          },
          {
            "id": "c",
            "text": "A las 8:10 del lunes."
          },
          {
            "id": "d",
            "text": "A las 10:08 del lunes."
          },
          {
            "id": "e",
            "text": "El informe no indica la hora."
          }
        ],
        "correctOptionId": "c",
        "evidenceSets": [
          [
            "museo-s5"
          ]
        ],
        "explanation": "El informe señala de forma explícita las 8:10 del lunes. Para esta respuesta basta localizar ese dato; no hay que deducirlo.",
        "distractorFeedback": {
          "a": "El documento sitúa la recepción el lunes. Revisa también el orden de las cifras de la hora.",
          "b": "La hora coincide, pero el día no. El domingo aparece en la ficha de exhibición, no como fecha de recepción.",
          "d": "Has invertido las cifras de la hora: el informe dice 8:10.",
          "e": "La primera oración del informe sí proporciona una hora precisa."
        }
      },
      {
        "id": "museo-inferencia",
        "kind": "inference",
        "prompt": "Al relacionar el código de la ficha con la recepción del taller, ¿qué puedes concluir? Conecta esos dos fragmentos.",
        "options": [
          {
            "id": "a",
            "text": "El mapa que se exhibía en la vitrina fue recibido en el taller del museo el lunes."
          },
          {
            "id": "b",
            "text": "La pieza recibida era la reproducción que reemplazaría al mapa."
          },
          {
            "id": "c",
            "text": "El mapa fue prestado a otra institución el domingo."
          },
          {
            "id": "d",
            "text": "La revisión del mapa terminó ese mismo lunes."
          },
          {
            "id": "e",
            "text": "La publicación vecinal demuestra que el mapa se perdió."
          }
        ],
        "correctOptionId": "a",
        "evidenceSets": [
          [
            "museo-s2",
            "museo-s5"
          ]
        ],
        "explanation": "La ficha vincula el mapa costero con MC-17; el informe registra la recepción de MC-17 en el taller. Al unir ambos datos identificas qué objeto fue recibido. No se informa que la revisión haya terminado.",
        "distractorFeedback": {
          "b": "La reproducción se menciona como reemplazo en la exhibición, pero el código MC-17 identifica el mapa de la ficha.",
          "c": "Los dos documentos sitúan la pieza identificada dentro del museo; no registran ese préstamo.",
          "d": "La recepción no equivale al término del trabajo. No se fija una fecha de retorno.",
          "e": "La publicación expresa una conclusión apresurada. Debes contrastarla con los documentos."
        }
      },
      {
        "id": "museo-principal",
        "kind": "main",
        "prompt": "¿Qué idea principal integra el contraste entre la publicación vecinal y la aclaración del responsable? Usa esos dos fragmentos como respaldo.",
        "options": [
          {
            "id": "a",
            "text": "Las vitrinas centrales deberían mostrar siempre reproducciones."
          },
          {
            "id": "b",
            "text": "Las deformaciones del papel obligan a cerrar todos los museos."
          },
          {
            "id": "c",
            "text": "La renovación de una sala termina siempre el lunes."
          },
          {
            "id": "d",
            "text": "Una ausencia en la exhibición debe interpretarse mediante registros antes de concluir que una pieza se ha perdido."
          },
          {
            "id": "e",
            "text": "El único asunto importante del caso es la hora de recepción de MC-17."
          }
        ],
        "correctOptionId": "d",
        "evidenceSets": [
          [
            "museo-s3",
            "museo-s8"
          ]
        ],
        "explanation": "El caso contrapone una afirmación basada solo en una vitrina vacía con un criterio de verificación mediante registros. La hora, el código y la revisión son detalles que permiten aplicar ese criterio; no constituyen por sí solos la idea principal.",
        "distractorFeedback": {
          "a": "Convierte una medida temporal de esta sala en una regla para todas las vitrinas.",
          "b": "Añade una obligación general que ningún documento sostiene.",
          "c": "No existe esa regla ni se anuncia que los trabajos hayan concluido.",
          "e": "La hora es un dato particular. No integra el contraste entre una conjetura y su verificación."
        }
      }
    ],
    "theme": "La verificación de una ausencia en la exhibición de un museo.",
    "summary": "Caso de ficción: el código de la ficha permite identificar el mapa recibido en el taller. El expediente enseña a contrastar una conjetura con datos y a distinguir esos detalles de la idea principal."
  },
  {
    "id": "titular-apresurado",
    "title": "El titular apresurado",
    "kicker": "EXPEDIENTE 02 · REDACCIÓN",
    "subtitle": "Una mejora observada y una noticia cuyo alcance debes examinar.",
    "scene": "newsroom",
    "difficulty": "Intermedio",
    "documents": [
      {
        "id": "noticia-informe",
        "title": "Notas de un ensayo preliminar",
        "type": "Informe de lectura",
        "sentences": [
          {
            "id": "noticia-s1",
            "text": "Durante una semana, veinte estudiantes voluntarios usaron una aplicación de lectura; su puntuación media pasó de 12 a 15 puntos sobre 20."
          },
          {
            "id": "noticia-s2",
            "text": "El grupo no se formó al azar y no hubo un grupo de comparación que siguiera trabajando sin la aplicación."
          },
          {
            "id": "noticia-s3",
            "text": "Esa misma semana, los participantes también recibieron ejercicios adicionales y volvieron a trabajar con el formato de la prueba."
          },
          {
            "id": "noticia-s4",
            "text": "El informe describió el cambio registrado en ese grupo, sin atribuirlo a una causa única."
          }
        ]
      },
      {
        "id": "noticia-edicion",
        "title": "Intercambio de edición",
        "type": "Nota editorial",
        "sentences": [
          {
            "id": "noticia-s5",
            "text": "El primer borrador del titular decía: «Una aplicación mejora la comprensión de todos los estudiantes»."
          },
          {
            "id": "noticia-s6",
            "text": "La editora pidió distinguir entre lo observado en los veinte voluntarios y una afirmación válida para cualquier estudiante."
          },
          {
            "id": "noticia-s7",
            "text": "El informe no incluyó resultados de otras edades ni un seguimiento posterior a esa semana."
          },
          {
            "id": "noticia-s8",
            "text": "La versión publicada presentó el ensayo como preliminar y señaló que harían falta comparaciones más controladas para evaluar el efecto de la aplicación."
          }
        ]
      }
    ],
    "questions": [
      {
        "id": "noticia-explicita",
        "kind": "explicit",
        "prompt": "¿Cuál fue la puntuación media del grupo al finalizar la semana? Selecciona el fragmento que la indica.",
        "options": [
          {
            "id": "a",
            "text": "12 puntos sobre 20."
          },
          {
            "id": "b",
            "text": "15 puntos sobre 20."
          },
          {
            "id": "c",
            "text": "20 puntos sobre 20."
          },
          {
            "id": "d",
            "text": "3 puntos sobre 20."
          },
          {
            "id": "e",
            "text": "La puntuación final no fue registrada."
          }
        ],
        "correctOptionId": "b",
        "evidenceSets": [
          [
            "noticia-s1"
          ]
        ],
        "explanation": "El texto indica que la media pasó de 12 a 15 puntos sobre 20. La pregunta pide el resultado final, no el inicial ni la diferencia entre ambos.",
        "distractorFeedback": {
          "a": "12 corresponde a la puntuación inicial.",
          "c": "20 es el máximo de la escala, no la media final.",
          "d": "3 es la diferencia entre 15 y 12; la pregunta pide la puntuación final.",
          "e": "La primera oración sí registra el valor final."
        }
      },
      {
        "id": "noticia-inferencia",
        "kind": "inference",
        "prompt": "¿Por qué los datos no permiten atribuir la mejora únicamente a la aplicación? Relaciona el dato sobre la comparación con el factor adicional de esa semana.",
        "options": [
          {
            "id": "a",
            "text": "Porque una puntuación media nunca puede aumentar en una semana."
          },
          {
            "id": "b",
            "text": "Porque todos los estudiantes del país utilizaron el mismo recurso."
          },
          {
            "id": "c",
            "text": "Porque el resultado demuestra que la aplicación carece de cualquier efecto."
          },
          {
            "id": "d",
            "text": "Porque los veinte participantes obtuvieron exactamente la misma puntuación."
          },
          {
            "id": "e",
            "text": "Porque no se aisló su efecto de otros cambios, como los ejercicios adicionales, mediante una comparación controlada."
          }
        ],
        "correctOptionId": "e",
        "evidenceSets": [
          [
            "noticia-s2",
            "noticia-s3"
          ]
        ],
        "explanation": "La falta de un grupo de comparación y la práctica adicional impiden separar sus posibles aportes al cambio. Esto limita la explicación causal; no demuestra que la aplicación funcione ni que sea inútil.",
        "distractorFeedback": {
          "a": "No hay una regla que impida esa mejora. La dificultad está en explicar su causa.",
          "b": "El ensayo solo incluyó veinte voluntarios; no a todos los estudiantes.",
          "c": "No poder aislar el efecto tampoco demuestra que sea inexistente.",
          "d": "Una media no implica que todas las puntuaciones individuales sean iguales."
        }
      },
      {
        "id": "noticia-principal",
        "kind": "main",
        "prompt": "¿Qué idea principal integra el criterio de la editora y la versión que se publicó? Conecta esos dos fragmentos.",
        "options": [
          {
            "id": "a",
            "text": "Toda aplicación de lectura debe ser retirada después de una semana."
          },
          {
            "id": "b",
            "text": "El fin de una noticia es conservar un titular llamativo aunque exceda los datos."
          },
          {
            "id": "c",
            "text": "Al comunicar un resultado preliminar, las conclusiones deben respetar el alcance y las limitaciones de los datos."
          },
          {
            "id": "d",
            "text": "La información central consiste exclusivamente en que participaron veinte estudiantes."
          },
          {
            "id": "e",
            "text": "Un aumento de tres puntos prueba una mejora permanente en cualquier lector."
          }
        ],
        "correctOptionId": "c",
        "evidenceSets": [
          [
            "noticia-s6",
            "noticia-s8"
          ]
        ],
        "explanation": "La editora limita la generalización y la noticia publicada reconoce que el ensayo es preliminar. Ambas decisiones desarrollan una idea común: comunicar de manera proporcional a la evidencia disponible. La cifra de participantes y el aumento de la media son detalles relevantes, pero no abarcan esa idea.",
        "distractorFeedback": {
          "a": "Ninguno de los documentos propone retirar la aplicación.",
          "b": "La corrección editorial busca precisamente evitar que el titular exceda los datos.",
          "d": "El número de participantes es un detalle; falta integrar el criterio con el que se comunica el resultado.",
          "e": "El estudio no ofrece seguimiento permanente ni resultados de todos los lectores."
        }
      }
    ],
    "theme": "La comunicación responsable de resultados preliminares.",
    "summary": "Caso de ficción: se registró una mejora en un grupo, pero no se aisló su causa ni se justificó una generalización universal. El informe y la edición permiten separar un resultado observado de una conclusión excesiva."
  },
  {
    "id": "biblioteca-en-movimiento",
    "title": "La biblioteca en movimiento",
    "kicker": "EXPEDIENTE 03 · BARRIO",
    "subtitle": "Un salón con menos visitas y un servicio que también ocurre fuera de sus paredes.",
    "scene": "library",
    "difficulty": "Avanzado",
    "documents": [
      {
        "id": "biblioteca-balance",
        "title": "Balance de enero y febrero",
        "type": "Registro de servicios",
        "sentences": [
          {
            "id": "biblioteca-s1",
            "text": "La biblioteca registró 1200 atenciones presenciales en enero y 900 en febrero."
          },
          {
            "id": "biblioteca-s2",
            "text": "El bibliobús pasó de 200 atenciones en enero a 450 en febrero; la orientación remota pasó de 100 a 250, respectivamente."
          },
          {
            "id": "biblioteca-s3",
            "text": "El balance contabiliza atenciones, no personas distintas: una misma persona puede utilizar un servicio varias veces y acudir a más de un canal."
          },
          {
            "id": "biblioteca-s4",
            "text": "El horario del local y el número de días de atención se mantuvieron iguales en ambos meses."
          }
        ]
      },
      {
        "id": "biblioteca-reunion",
        "title": "Acta de la reunión vecinal",
        "type": "Acta de evaluación",
        "sentences": [
          {
            "id": "biblioteca-s5",
            "text": "Al comentar las visitas al local, un vecino afirmó: «Si viene menos gente al salón, la biblioteca ya no es útil para el barrio»."
          },
          {
            "id": "biblioteca-s6",
            "text": "La dirección informó que en febrero el bibliobús incorporó dos paradas en zonas alejadas del local."
          },
          {
            "id": "biblioteca-s7",
            "text": "La orientación remota permitió atender consultas sobre búsqueda de libros y fuentes de información sin exigir la presencia en el salón."
          },
          {
            "id": "biblioteca-s8",
            "text": "El acta acordó valorar la utilidad del servicio considerando sus distintos canales, sin confundir el número de atenciones con el de personas distintas."
          }
        ]
      }
    ],
    "questions": [
      {
        "id": "biblioteca-explicita",
        "kind": "explicit",
        "prompt": "¿Cuántas atenciones presenciales se registraron en febrero? Selecciona el fragmento que contiene la cifra.",
        "options": [
          {
            "id": "a",
            "text": "900 atenciones."
          },
          {
            "id": "b",
            "text": "1200 atenciones."
          },
          {
            "id": "c",
            "text": "450 atenciones."
          },
          {
            "id": "d",
            "text": "250 atenciones."
          },
          {
            "id": "e",
            "text": "1600 atenciones."
          }
        ],
        "correctOptionId": "a",
        "evidenceSets": [
          [
            "biblioteca-s1"
          ]
        ],
        "explanation": "La primera oración distingue 1200 atenciones presenciales en enero y 900 en febrero. Las otras cifras corresponden a otros canales o a un total calculado, no al dato solicitado.",
        "distractorFeedback": {
          "b": "1200 corresponde a enero, no a febrero.",
          "c": "450 corresponde al bibliobús en febrero.",
          "d": "250 corresponde a la orientación remota en febrero.",
          "e": "1600 suma las atenciones de los tres canales en febrero; la pregunta pide solo las presenciales."
        }
      },
      {
        "id": "biblioteca-inferencia",
        "kind": "inference",
        "prompt": "Al sumar los tres canales, ¿qué conclusión numérica resulta válida? Conecta el registro presencial con el del bibliobús y la orientación remota.",
        "options": [
          {
            "id": "a",
            "text": "La biblioteca perdió exactamente 300 usuarios distintos."
          },
          {
            "id": "b",
            "text": "El total se mantuvo en 1500 atenciones durante ambos meses."
          },
          {
            "id": "c",
            "text": "Las atenciones remotas fueron más numerosas que las presenciales en febrero."
          },
          {
            "id": "d",
            "text": "El total aumentó de 1500 a 1600 atenciones, pese a la disminución del canal presencial."
          },
          {
            "id": "e",
            "text": "El total de febrero fue de 700 atenciones."
          }
        ],
        "correctOptionId": "d",
        "evidenceSets": [
          [
            "biblioteca-s1",
            "biblioteca-s2"
          ]
        ],
        "explanation": "Enero: 1200 + 200 + 100 = 1500 atenciones. Febrero: 900 + 450 + 250 = 1600. El total creció en 100 atenciones aunque las presenciales bajaron en 300. Son atenciones, no una cuenta de personas únicas.",
        "distractorFeedback": {
          "a": "Los registros cuentan atenciones; no permiten identificar cuántas personas distintas se ganaron o perdieron.",
          "b": "1500 corresponde a enero; al sumar los tres canales de febrero se obtiene 1600.",
          "c": "En febrero hubo 250 atenciones remotas frente a 900 presenciales.",
          "e": "700 suma bibliobús y orientación remota en febrero, pero omite las 900 atenciones presenciales."
        }
      },
      {
        "id": "biblioteca-principal",
        "kind": "main",
        "prompt": "¿Qué idea principal integra el contraste entre la afirmación del vecino y el criterio que acordó el acta? Usa esos dos fragmentos.",
        "options": [
          {
            "id": "a",
            "text": "Las bibliotecas deben abandonar sus locales y funcionar únicamente por bibliobús."
          },
          {
            "id": "b",
            "text": "La utilidad de la biblioteca debe evaluarse considerando sus diversos canales y el significado de sus indicadores."
          },
          {
            "id": "c",
            "text": "El único aporte de la biblioteca consiste en conservar el mismo horario cada mes."
          },
          {
            "id": "d",
            "text": "Una disminución de atenciones presenciales demuestra que ningún vecino necesita leer."
          },
          {
            "id": "e",
            "text": "El número de atenciones siempre es idéntico al número de personas distintas."
          }
        ],
        "correctOptionId": "b",
        "evidenceSets": [
          [
            "biblioteca-s5",
            "biblioteca-s8"
          ]
        ],
        "explanation": "El vecino juzga todo el servicio a partir de un solo canal; el acta propone una evaluación más amplia y una interpretación cuidadosa de los indicadores. Las paradas del bibliobús y las consultas remotas desarrollan esa idea central. El aumento del total no permite, por sí solo, medir toda la utilidad social del servicio.",
        "distractorFeedback": {
          "a": "La diversificación no implica eliminar el local. El acta considera todos los canales.",
          "c": "El horario es un dato secundario, no la idea que organiza la discusión sobre utilidad.",
          "d": "Generaliza una cifra de atenciones y añade una conclusión que los textos no sostienen.",
          "e": "El balance aclara que una persona puede generar varias atenciones y usar más de un canal."
        }
      }
    ],
    "theme": "La evaluación integral de los servicios de una biblioteca.",
    "summary": "Caso de ficción: las atenciones presenciales disminuyeron, pero el total de los tres canales aumentó. Para interpretar el servicio hay que mirar el conjunto y distinguir atenciones de personas únicas; ninguna cifra aislada demuestra toda su utilidad."
  }
];
