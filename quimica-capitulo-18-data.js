window.HISTORY_CONTENT={
  number:18,
  id:'quimica-capitulo-18',
  progressId:'quimica-capitulo-18',
  courseId:17,
  courseName:'Química',
  title:'Ácidos, bases, neutralización y pH',
  intro:'Relaciona lo que observas en el laboratorio con las especies presentes en una disolución, calcula su pH e interpreta una neutralización.',
  version:1,
  format:'reading',
  assessmentFormat:'practice-10',
  laboratory:{id:'chemistry-ph-lab',anchor:'chemistry-ph-lab',label:'Entrar al laboratorio de pH'},
  goals:[
    {title:'Reconocer',text:'Distingue modelos ácido-base, pares conjugados y la diferencia entre fuerza y concentración.'},
    {title:'Calcular',text:'Relaciona pH, pOH y concentración; resuelve diluciones y mezclas de ácidos y bases fuertes.'},
    {title:'Experimentar e interpretar',text:'Usa una curva de titulación, compara indicadores y explica el punto de equivalencia con cantidades de sustancia.'}
  ],
  sequenceTitle:'Una ruta para interpretar el laboratorio',
  sequenceNote:'Esta secuencia organiza el razonamiento; no representa una cronología histórica. Los cálculos del laboratorio usan un modelo ideal a 25 °C.',
  timeline:[
    ['Identifica','Reconoce el ácido, la base y las especies que aportan a la disolución.'],
    ['Cuenta','Convierte concentraciones y volúmenes en moles antes de mezclar.'],
    ['Relaciona','Compara los moles según la ecuación química y determina qué queda en exceso.'],
    ['Calcula','Usa el volumen total para hallar concentraciones y, después, el pH.'],
    ['Contrasta','Compara el resultado con la curva, el medidor y el intervalo de viraje del indicador.']
  ],
  sourceNote:'El laboratorio modela HCl y NaOH en agua a 25 °C: disociación completa, volúmenes aditivos y comportamiento ideal. La teoría también presenta casos que requieren otros equilibrios y que no se simulan aquí.',
  lessons:[
    {
      title:'Entra al laboratorio: de la observación a las partículas',
      blocks:[
        {
          id:'quim18-laboratorio',
          title:'Una gota puede cambiar la interpretación',
          paragraphs:['Elige las condiciones de la muestra, añade titulante y compara tres representaciones: el recipiente, las especies de la disolución y la curva de pH. Antes de cada adición, predice qué cambiará; después utiliza las cantidades para explicar el resultado.'],
          interactive:'chemistry-ph-lab'
        },
        {
          id:'quim18-modelos',
          title:'Tres modelos para describir ácidos y bases',
          paragraphs:['En agua, el protón se encuentra hidratado; H₃O⁺ representa el ion hidronio. La notación H⁺ es una abreviatura frecuente. El modelo elegido debe corresponder a la reacción que se estudia.'],
          headers:['Modelo','Ácido','Base'],
          rows:[
            ['Arrhenius','Aumenta la concentración de H₃O⁺ en disolución acuosa.','Aumenta la concentración de OH⁻ en disolución acuosa.'],
            ['Brønsted–Lowry','Dona un protón en una reacción.','Acepta un protón en una reacción.'],
            ['Lewis','Acepta un par de electrones.','Dona un par de electrones.']
          ],
          takeaway:'Una sustancia se reconoce por su comportamiento químico; un cambio de color es una evidencia que necesita interpretación.',
          sources:[{label:'OpenStax: ácidos y bases de Brønsted–Lowry',url:'https://openstax.org/books/chemistry-2e/pages/14-1-bronsted-lowry-acids-and-bases'},{label:'OpenStax: ácidos y bases de Lewis',url:'https://openstax.org/books/chemistry-2e/pages/15-2-lewis-acids-and-bases'}]
        }
      ],
      examples:[{title:'El amoníaco acepta un protón',question:'En NH₃ + H₂O ⇌ NH₄⁺ + OH⁻, ¿qué especie actúa como base de Brønsted–Lowry?',steps:['NH₃ se transforma en NH₄⁺ al recibir un protón.','Por ello, NH₃ actúa como base y el agua como ácido en esta reacción.','El papel ácido o básico se establece observando la transferencia.']}]
    },
    {
      title:'Fuerza, concentración y pares conjugados',
      blocks:[
        {
          id:'quim18-fuerza',
          title:'Fuerte no significa concentrado',
          paragraphs:['La fuerza ácido-base se relaciona con el equilibrio de ionización o reacción con el agua. En los cálculos introductorios, HCl y NaOH se tratan como electrolitos fuertes completamente disociados. Un ácido débil, como el ácido acético, establece un equilibrio y no convierte toda su cantidad inicial en iones.','La concentración expresa cuánto soluto hay por volumen de disolución. Un ácido fuerte puede estar diluido y uno débil puede estar concentrado. Comparar sus pH exige considerar ambas características; el nombre «fuerte» no determina por sí solo un pH único.'],
          sources:[{label:'OpenStax: fuerza relativa de ácidos y bases',url:'https://openstax.org/books/chemistry-2e/pages/14-3-relative-strengths-of-acids-and-bases'}]
        },
        {
          id:'quim18-conjugados',
          title:'Un protón conecta un par conjugado',
          paragraphs:['Cuando un ácido dona un protón queda su base conjugada; cuando una base lo acepta se forma su ácido conjugado. Los integrantes de un par conjugado difieren en un protón y en una unidad de carga.','En CH₃COOH + H₂O ⇌ CH₃COO⁻ + H₃O⁺, los pares son CH₃COOH/CH₃COO⁻ y H₃O⁺/H₂O. El agua puede donar o aceptar protones según la reacción: es una especie anfiprótica.'],
          takeaway:'Una pareja ácido-base conjugada no se obtiene eligiendo dos sustancias cualesquiera llamadas ácido y base.'
        }
      ],
      examples:[{title:'Dos etiquetas diferentes',question:'Se prepara HCl 0,001 mol/L y ácido acético 0,10 mol/L. ¿Qué información comunica cada dato?',steps:['HCl se clasifica como ácido fuerte; ácido acético, como ácido débil.','Los números indican que la concentración analítica del ácido acético es mayor.','No se calcula el pH del ácido débil suponiendo que se ioniza completamente: requiere su equilibrio.']}]
    },
    {
      title:'pH, pOH y dilución',
      blocks:[
        {
          id:'quim18-escala',
          title:'Una escala logarítmica',
          paragraphs:['Para disoluciones suficientemente diluidas, usamos la aproximación pH = −log₁₀[H₃O⁺] y pOH = −log₁₀[OH⁻], con concentraciones en mol/L. Una unidad de pH corresponde a un factor de diez en [H₃O⁺]. El pH se define rigurosamente mediante la actividad; el laboratorio utiliza concentraciones como modelo ideal.','A 25 °C, K_w = [H₃O⁺][OH⁻] = 1,0 × 10⁻¹⁴ y pH + pOH = 14,00. Una disolución neutra tiene [H₃O⁺] = [OH⁻]; a esta temperatura su pH es 7,00. El valor neutro cambia con la temperatura. El intervalo 0–14 es habitual, pero no es un límite universal.'],
          sources:[{label:'OpenStax: pH y pOH',url:'https://openstax.org/books/chemistry-2e/pages/14-2-ph-and-poh'}]
        },
        {
          id:'quim18-dilucion',
          title:'Añadir agua cambia la concentración',
          paragraphs:['Si solo se añade agua, la cantidad analítica de soluto se conserva: C₁V₁ = C₂V₂. V₂ es el volumen final de la disolución, no el volumen de agua añadido. Para un ácido fuerte en un intervalo donde predomina su aporte de H₃O⁺, diluir diez veces eleva el pH aproximadamente una unidad.','Al diluir mucho, la autoionización del agua deja de ser despreciable. Diluir un ácido con agua pura no lo convierte por sí solo en una base: el pH se acerca al valor neutro. El laboratorio incorpora ese aporte del agua también cerca de la equivalencia.'],
          takeaway:'Primero calcula la nueva concentración; después aplica la relación de pH que corresponda.'
        }
      ],
      examples:[{title:'Una dilución diez veces mayor',question:'Se diluyen 10,0 mL de HCl 0,100 mol/L hasta un volumen final de 100,0 mL. Calcula el pH ideal a 25 °C.',steps:['C₂ = (0,100 × 10,0)/100,0 = 0,0100 mol/L.','El HCl es fuerte y, a esta concentración, [H₃O⁺] ≈ 0,0100 mol/L.','pH ≈ −log₁₀(10⁻²) = 2,00.']}]
    },
    {
      title:'Neutralización: cuenta antes de calcular el pH',
      blocks:[
        {
          id:'quim18-estequiometria',
          title:'La ecuación establece la proporción',
          paragraphs:['Para HCl y NaOH, la ecuación global es HCl + NaOH → NaCl + H₂O. En disolución acuosa, la ecuación iónica neta puede escribirse H₃O⁺ + OH⁻ → 2 H₂O. Los iones Na⁺ y Cl⁻ permanecen en la disolución como espectadores.','La proporción es 1:1. Convierte cada volumen a litros y calcula n = C × V. Compara los moles de ácido y base; una misma cantidad de mililitros no garantiza neutralización si las concentraciones son diferentes. Otros ácidos o bases pueden requerir proporciones distintas.'],
          sources:[{label:'OpenStax: análisis cuantitativo y titulaciones',url:'https://openstax.org/books/chemistry-2e/pages/4-5-quantitative-chemical-analysis'}]
        },
        {
          id:'quim18-exceso',
          title:'El exceso y el volumen total determinan el resultado',
          paragraphs:['En una mezcla de ácido y base fuertes, resta las cantidades que reaccionan. Si queda ácido en exceso, calcula su aporte de H₃O⁺; si queda base, el de OH⁻. Divide los moles en exceso entre el volumen total de la mezcla. Después determina pH o pOH.','No promedies los pH iniciales. El pH es logarítmico y la mezcla implica una reacción. En la equivalencia ideal HCl–NaOH a 25 °C, el aporte estequiométrico neto es cero; los iones del agua siguen presentes y el pH es 7,00.']
        }
      ],
      examples:[{title:'Queda ácido después de mezclar',question:'Mezclamos 20,0 mL de HCl 0,100 mol/L con 10,0 mL de NaOH 0,100 mol/L. Calcula el pH ideal.',steps:['n(HCl) = 0,100 × 0,0200 = 0,00200 mol; n(NaOH) = 0,00100 mol.','Sobran 0,00100 mol de ácido en 0,0300 L: [H₃O⁺] ≈ 0,0333 mol/L.','pH ≈ −log₁₀(0,0333) = 1,48. No se neutralizó toda la muestra.']}]
    },
    {
      title:'Titulación: interpreta la curva y el indicador',
      blocks:[
        {
          id:'quim18-titulacion',
          title:'Encontrar una concentración desconocida',
          paragraphs:['En una titulación se añade una disolución de concentración conocida, el titulante, a un volumen medido de muestra. El punto de equivalencia se alcanza cuando las cantidades añadidas guardan la proporción de la ecuación química. Para HCl–NaOH: C_ácidoV_ácido = C_baseV_base.','La curva representa pH frente al volumen de titulante añadido. Su cambio pronunciado cerca de la equivalencia exige adiciones pequeñas para interpretar mejor esa región. El punto de equivalencia no significa que hayan desaparecido todos los iones.'],
          sources:[{label:'OpenStax: titulaciones ácido-base',url:'https://openstax.org/books/chemistry-2e/pages/14-7-acid-base-titrations'}]
        },
        {
          id:'quim18-indicadores',
          title:'El color pertenece al indicador',
          paragraphs:['Un indicador cambia de color dentro de un intervalo de pH. El punto final es la señal experimental elegida para detener la titulación; debe aproximarse a la equivalencia, pero ambos conceptos no son idénticos. Un medidor de pH aporta otra forma de seguir el proceso.','El HCl y el NaOH acuosos del modelo son incoloros. El laboratorio representa colores aproximados al añadir un indicador en cantidad despreciable. Cambiar el indicador no cambia por sí solo los moles de ácido o base ni el pH calculado.'],
          headers:['Indicador','Observación orientadora'],
          rows:[['Azul de bromotimol','Amarillo en medio ácido; transición hacia verde y azul aproximadamente entre pH 6,0 y 7,6.'],['Fenolftaleína','Incolora en medio ácido; vira hacia rosado aproximadamente entre pH 8,2 y 10.'],['Indicador universal','Mezcla de indicadores con una escala amplia de colores; permite una estimación aproximada del pH.']],
          takeaway:'Elige el intervalo de viraje de acuerdo con la curva; una señal visible no es una medición exacta universal.'
        }
      ],
      examples:[{title:'Del volumen medido a la concentración',question:'Una muestra de 25,0 mL de HCl alcanza la equivalencia al añadir 30,0 mL de NaOH 0,100 mol/L. ¿Cuál era la concentración del ácido?',steps:['La proporción HCl:NaOH es 1:1; en la equivalencia, n(ácido) = n(base).','n(base) = 0,100 × 0,0300 = 0,00300 mol.','C(ácido) = 0,00300/0,0250 = 0,120 mol/L.']}]
    },
    {
      title:'Más allá del modelo: sales y amortiguadores',
      blocks:[
        {
          id:'quim18-sales',
          title:'Neutralizar no siempre produce pH 7',
          paragraphs:['Algunos iones de las sales reaccionan con el agua. En el tratamiento introductorio, NaCl produce una disolución aproximadamente neutra; NH₄Cl puede producir una ácida porque NH₄⁺ dona un protón al agua. El acetato de sodio puede producir una básica por el comportamiento del ion acetato.','En una titulación de ácido débil con base fuerte, la equivalencia puede ser básica; en una de base débil con ácido fuerte, puede ser ácida. Calcular esos pH requiere considerar equilibrios que el laboratorio HCl–NaOH de este capítulo no representa.'],
          sources:[{label:'OpenStax: hidrólisis de sales',url:'https://openstax.org/books/chemistry-2e/pages/14-4-hydrolysis-of-salts'}]
        },
        {
          id:'quim18-amortiguadores',
          title:'Resistir un cambio no significa impedirlo',
          paragraphs:['Una disolución amortiguadora contiene cantidades adecuadas de un ácido débil y su base conjugada, o de una base débil y su ácido conjugado. Puede consumir pequeñas cantidades de ácido o base añadidos y así reducir el cambio de pH. Su capacidad es limitada.','Una mezcla de HCl y NaOH no es automáticamente un amortiguador. Para interpretar un experimento, comprueba qué especies quedan, sus cantidades y los equilibrios pertinentes. Los modelos son útiles cuando se reconocen sus condiciones y sus límites.'],
          sources:[{label:'OpenStax: disoluciones amortiguadoras',url:'https://openstax.org/books/chemistry-2e/pages/14-6-buffers'}]
        }
      ],
      examples:[{title:'Una afirmación demasiado general',question:'Alguien concluye: «Si llego a la equivalencia, siempre obtengo pH 7». ¿Qué dato necesita añadir?',steps:['La equivalencia se define por la proporción estequiométrica, no por un pH fijo.','En el modelo HCl–NaOH a 25 °C se obtiene pH 7,00.','Con reactivos débiles, la hidrólisis de los iones puede producir otro pH; también importa la temperatura.']}]
    }
  ]
};
