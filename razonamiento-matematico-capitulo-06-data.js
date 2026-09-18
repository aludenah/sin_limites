'use strict';
window.HISTORY_CONTENT={
  "number": 6,
  "id": "razonamiento-matematico-capitulo-06",
  "progressId": "razonamiento-matematico-capitulo-06",
  "courseId": 2,
  "courseName": "Razonamiento Matemático",
  "title": "Relación de tiempos",
  "intro": "Interpreta expresiones temporales y resuelve problemas de días, meses y años. Usa ciclos de siete días y cuenta con cuidado los días transcurridos.",
  "version": 1,
  "format": "reading",
  "math": true,
  "assessmentFormat": "practice-10",
  "sequenceTitle": "Ruta de resolución",
  "sequenceNote": "Representa los datos, aplica las restricciones y comprueba el resultado. Las figuras forman parte de los problemas; las medidas indicadas prevalecen sobre el tamaño del dibujo.",
  "goals": [
    {
      "title": "Traducir",
      "text": "Expresa ayer, hoy y mañana como desplazamientos respecto de una referencia."
    },
    {
      "title": "Calcular",
      "text": "Reduce los intervalos de días a semanas completas y días restantes."
    },
    {
      "title": "Revisar",
      "text": "Distingue años comunes y bisiestos y cruza correctamente los límites de mes."
    }
  ],
  "timeline": [
    [
      "Paso 1",
      "Expresiones de tiempo"
    ],
    [
      "Paso 2",
      "La semana como ciclo"
    ],
    [
      "Paso 3",
      "Meses y frecuencias semanales"
    ],
    [
      "Paso 4",
      "Años comunes y bisiestos"
    ],
    [
      "Paso 5",
      "Intervalos entre fechas"
    ]
  ],
  "lessons": [
    {
      "title": "Expresiones de tiempo",
      "blocks": [
        {
          "title": "Elegir un día de referencia",
          "paragraphs": [
            "Asigna a hoy el valor 0. Ayer corresponde a \\(-1\\), anteayer a \\(-2\\), mañana a \\(+1\\) y pasado mañana a \\(+2\\). Un valor positivo avanza días y uno negativo retrocede. La referencia es el «hoy» supuesto en el problema, que no tiene por qué coincidir con la fecha en que estudias.",
            "Si se informa que anteayer fue viernes, hoy se obtiene avanzando dos días desde el viernes: domingo. Para llegar a pasado mañana se avanza otros dos: martes. También puedes calcular el desplazamiento directo de anteayer a pasado mañana: \\(+2-(-2)=4\\) días."
          ],
          "id": "rm06-tema1"
        },
        {
          "title": "Componer expresiones desde adentro",
          "paragraphs": [
            "En «el ayer de mañana», mañana fija primero una referencia un día después de hoy; su ayer retrocede un día y vuelve a hoy. En expresiones más largas, resuelve el fragmento interior y aplica las operaciones restantes. Escribir los desplazamientos permite comprobar el resultado sin depender de una frase memorizada.",
            "Los términos poco usuales deben definirse en el enunciado antes de asignarles un valor. No se suman días por la cantidad de palabras: se suman los cambios temporales que cada expresión indica. Al final convierte el desplazamiento neto en el día de la semana solicitado."
          ],
          "id": "rm06-tema2"
        }
      ],
      "examples": [
        {
          "title": "El ayer de pasado mañana",
          "question": "Si hoy es miércoles, ¿qué día corresponde al ayer de pasado mañana?",
          "steps": [
            "Pasado mañana representa \\(+2\\) días.",
            "Su ayer resta uno: \\(+2-1=+1\\).",
            "Un día después de miércoles es jueves."
          ]
        }
      ]
    },
    {
      "title": "La semana como ciclo",
      "blocks": [
        {
          "title": "Separar semanas completas",
          "paragraphs": [
            "Cada siete días se repite el día de la semana. Si un intervalo tiene \\(N=7q+r\\) días, con \\(0\\le r<7\\), solo el residuo \\(r\\) cambia el nombre del día. Por ejemplo, avanzar 23 días equivale, para el día semanal, a avanzar \\(23-21=2\\) días.",
            "Puedes recorrer una rueda semanal o asignar los números 0 a 6 a lunes, martes, miércoles, jueves, viernes, sábado y domingo. Después de domingo se vuelve a lunes. Para retroceder, también se pueden quitar semanas completas y contar hacia atrás el residuo."
          ],
          "id": "rm06-tema3"
        },
        {
          "title": "No contar el día inicial como un día transcurrido",
          "paragraphs": [
            "«Dentro de un día» significa mañana, no hoy. Entre lunes y martes transcurre un día, aunque se nombren dos fechas. Este detalle evita el error frecuente de sumar uno a un intervalo cuando el enunciado pide días transcurridos.",
            "Si se pide cuántas fechas se enumeran incluyendo ambos extremos, la pregunta es distinta: se añade uno a la diferencia cuando la fecha final no es anterior. Indica siempre cuál de las dos cuentas estás usando. En esta práctica, los intervalos se entienden como días transcurridos salvo indicación expresa."
          ],
          "id": "rm06-tema4"
        }
      ],
      "examples": [
        {
          "title": "Cincuenta y dos días después",
          "question": "Si un plazo comienza un martes, ¿qué día será 52 días después?",
          "steps": [
            "Descompón \\(52=7\\times7+3\\).",
            "Siete semanas no cambian el nombre del día; solo falta avanzar tres días.",
            "Desde martes: miércoles, jueves, viernes. Será viernes."
          ]
        }
      ]
    },
    {
      "title": "Meses y frecuencias semanales",
      "blocks": [
        {
          "title": "Cuántos días tiene cada mes",
          "paragraphs": [
            "Enero, marzo, mayo, julio, agosto, octubre y diciembre tienen 31 días. Abril, junio, septiembre y noviembre tienen 30. Febrero tiene 28 en un año común y 29 en uno bisiesto. Para pasar al mes siguiente, avanza después del último día hasta el día 1; no existe un día 0.",
            "En un calendario con columnas semanales, una fecha está siete días después de la que aparece justo encima. Coloca primero el día 1 en su columna correcta y completa por filas. El espacio en blanco antes del 1 pertenece al mes anterior, y no cuenta entre los días del mes estudiado."
          ],
          "id": "rm06-tema5"
        },
        {
          "title": "Días que aparecen cinco veces",
          "paragraphs": [
            "Todo mes contiene cuatro semanas completas: \\(28=4\\times7\\). En un mes de 29 días, el día semanal del día 1 aparece cinco veces. En uno de 30, aparecen cinco veces los dos días semanales consecutivos que empiezan en el día 1. En uno de 31, aparecen cinco veces esos tres primeros días semanales.",
            "Esta regla permite reconstruir el inicio del mes a partir de las frecuencias. Si un mes de 30 días tiene cinco lunes y cinco martes, debe comenzar un lunes. Si comenzara martes, los dos días extra serían martes y miércoles. Comprueba el orden cíclico y no solo qué nombres aparecen."
          ],
          "id": "rm06-tema6"
        }
      ],
      "examples": [
        {
          "title": "Tres días que se repiten cinco veces",
          "question": "Un mes de 31 días comienza un martes. ¿Qué días de la semana aparecen cinco veces?",
          "steps": [
            "Separa \\(31=28+3\\): cuatro semanas completas y tres días adicionales.",
            "Los adicionales son los del inicio del mes: martes, miércoles y jueves.",
            "Esos tres días aparecen cinco veces; los otros cuatro, cuatro veces."
          ]
        }
      ]
    },
    {
      "title": "Años comunes y bisiestos",
      "blocks": [
        {
          "title": "La regla gregoriana completa",
          "paragraphs": [
            "En el calendario gregoriano, un año es bisiesto si es divisible entre 4, excepto si es divisible entre 100 y no entre 400. Así, 2024 y 2000 son bisiestos; 1900 y 2100 no. No basta con comprobar que las dos últimas cifras sean múltiplo de cuatro en un año de cambio de siglo.",
            "El año común tiene 365 días y el bisiesto 366. El día adicional es el 29 de febrero. Por eso, para un intervalo concreto, importa si ese día está incluido entre la fecha de partida y la de llegada, no solo si aparece un año bisiesto escrito en el problema."
          ],
          "id": "rm06-tema7"
        },
        {
          "title": "Qué cambia de un año al siguiente",
          "paragraphs": [
            "Como \\(365=52\\times7+1\\), del 1 de enero de un año común al 1 de enero siguiente el día semanal avanza uno. Como \\(366=52\\times7+2\\), si el año de partida es bisiesto avanza dos. Estas relaciones describen el intervalo completo entre esos dos primeros de enero.",
            "Para dos fechas iguales en años consecutivos, con otros meses y días, cuenta si el intervalo atraviesa un 29 de febrero. No se decide el salto solo con el tipo del año final. Una fecha como el 29 de febrero, además, no existe en todos los años, por lo que requiere una interpretación explícita."
          ],
          "id": "rm06-tema8"
        }
      ],
      "examples": [
        {
          "title": "¿Es bisiesto 2028?",
          "question": "Determina si febrero de 2028 tiene 28 o 29 días.",
          "steps": [
            "2028 es divisible entre 4: \\(2028/4=507\\).",
            "No es divisible entre 100, así que no entra en la excepción de los siglos.",
            "2028 es bisiesto y febrero tiene 29 días."
          ]
        }
      ]
    },
    {
      "title": "Intervalos entre fechas",
      "blocks": [
        {
          "title": "Descomponer por límites de mes",
          "paragraphs": [
            "Para contar días entre fechas de distintos meses, llega primero al último día del mes inicial y luego al día final del siguiente. Desde el 29 de noviembre al 3 de diciembre pasan cuatro días: 30 de noviembre, 1, 2 y 3 de diciembre. Se excluye la fecha de inicio y se incluye la de llegada.",
            "En febrero revisa primero si hay día 29. Del 28 de febrero al 1 de marzo transcurre un día en un año común y dos en uno bisiesto. Si el intervalo abarca varios meses, suma sus longitudes y reduce el total módulo siete solo después de fijar correctamente sus extremos."
          ],
          "id": "rm06-tema9"
        },
        {
          "title": "Comprobar con dos representaciones",
          "paragraphs": [
            "Una línea de tiempo ayuda con pocos días; una tabla de meses ayuda con intervalos largos; un calendario comprueba frecuencias semanales. Elige la representación que haga visibles los datos del enunciado. No es necesario memorizar el día semanal de una fecha si el problema proporciona una referencia.",
            "Revisa si la pregunta pide fecha, nombre del día, cantidad de días o número de apariciones. Un mismo cálculo intermedio puede producir respuestas de tipos distintos. Antes de elegir una alternativa, comprueba la regla del año, la longitud del mes y si los extremos se cuentan de forma inclusiva."
          ],
          "id": "rm06-tema10"
        }
      ],
      "examples": [
        {
          "title": "Cruzar el final de noviembre",
          "question": "Si el 29 de noviembre es viernes, ¿qué día es el 3 de diciembre del mismo año?",
          "steps": [
            "Avanza cuatro días: 30 de noviembre, 1, 2 y 3 de diciembre.",
            "Los días semanales son sábado, domingo, lunes y martes.",
            "El 3 de diciembre es martes. La fecha inicial sirve de referencia y no se cuenta como un día transcurrido."
          ]
        }
      ]
    }
  ],
  "sourceNote": "Base temática: Razonamiento Matemático, Javier Portuguez Pérez y Jimmy Paredes Barbarón, Lumbreras Editores, primera edición, 2020, capítulo 6, pp. 73–81 (páginas impresas). Desarrollo didáctico, figuras y problemas originales de SIN LÍMITES basados en los temas del capítulo."
};
