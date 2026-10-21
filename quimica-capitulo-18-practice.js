'use strict';
window.CHAPTER_PRACTICES=window.CHAPTER_PRACTICES||{};
window.CHAPTER_PRACTICES['quimica-capitulo-18']={
  title:'Ácidos, bases, neutralización y pH',
  problems:[
    {
      id:'quim18-p01',level:'Básico',
      prompt:'En NH₃ + H₂O ⇌ NH₄⁺ + OH⁻, ¿qué especie actúa como base de Brønsted–Lowry?',
      options:['H₂O, porque dona un protón.','NH₄⁺, porque es el ácido conjugado.','NH₃, porque acepta un protón.','OH⁻, porque contiene un átomo de oxígeno.','Ninguna, porque no aparece NaOH.'],answer:2,
      solution:'<p>NH₃ acepta un protón del agua y se convierte en NH₄⁺. Aceptar un protón caracteriza a una base de Brønsted–Lowry. En esta reacción, H₂O actúa como ácido al donar ese protón.</p>'
    },
    {
      id:'quim18-p02',level:'Básico',
      prompt:'¿Cuál de las siguientes parejas corresponde a un ácido y su base conjugada?',
      options:['CH₃COOH y CH₃COO⁻.','HCl y NaOH.','Na⁺ y Cl⁻.','H₃O⁺ y OH⁻.','H₂O y NaCl.'],answer:0,
      solution:'<p>CH₃COOH pierde un protón y forma CH₃COO⁻. Las dos especies difieren en un protón y una unidad de carga. HCl y NaOH pueden reaccionar, pero no forman por ello un par conjugado.</p>'
    },
    {
      id:'quim18-p03',level:'Básico',
      prompt:'¿Qué afirmación distingue correctamente la fuerza de un ácido de su concentración?',
      options:['Todo ácido fuerte tiene siempre el mismo pH.','Un ácido débil no puede prepararse concentrado.','Diluir un ácido fuerte lo convierte necesariamente en un ácido débil.','La concentración expresa el porcentaje de ionización, exclusivamente.','La fuerza se relaciona con su ionización; la concentración expresa cantidad de soluto por volumen.'],answer:4,
      solution:'<p>Fuerza y concentración describen características diferentes. La primera se relaciona con el equilibrio de ionización o reacción con el agua; la segunda, con la cantidad de soluto por volumen. Un ácido fuerte puede estar diluido.</p>'
    },
    {
      id:'quim18-p04',level:'Intermedio',
      prompt:'Para HCl 1,0 × 10⁻³ mol/L a 25 °C, suponiendo comportamiento ideal y disociación completa, ¿cuál es el pH aproximado?',
      options:['1,00.','3,00.','7,00.','11,00.','13,00.'],answer:1,
      solution:'<p>A esta concentración, el aporte del agua es despreciable y [H₃O⁺] ≈ 10⁻³ mol/L. Por tanto, pH ≈ −log₁₀(10⁻³) = 3,00.</p>'
    },
    {
      id:'quim18-p05',level:'Intermedio',
      prompt:'Una disolución ideal de NaOH 0,010 mol/L está a 25 °C. ¿Qué pareja de valores corresponde a su pOH y pH, respectivamente?',
      options:['12,00 y 2,00.','2,00 y 2,00.','7,00 y 7,00.','2,00 y 12,00.','1,00 y 13,00.'],answer:3,
      solution:'<p>El NaOH aporta aproximadamente 0,010 mol/L de OH⁻. Así, pOH ≈ −log₁₀(10⁻²) = 2,00. A 25 °C, pH + pOH = 14,00, por lo que pH ≈ 12,00.</p>'
    },
    {
      id:'quim18-p06',level:'Intermedio',
      prompt:'Se diluyen 10,0 mL de HCl 0,100 mol/L hasta un volumen final de 100,0 mL. ¿Cuál es el pH ideal aproximado a 25 °C?',
      options:['1,00.','1,50.','2,00.','3,00.','7,00.'],answer:2,
      solution:'<p>En la dilución se conserva el soluto: C₂ = C₁V₁/V₂ = 0,100 × 10,0/100,0 = 0,0100 mol/L. Como el HCl es fuerte, pH ≈ −log₁₀(0,0100) = 2,00. El volumen final es 100,0 mL.</p>'
    },
    {
      id:'quim18-p07',level:'Intermedio',
      prompt:'¿Qué volumen de NaOH 0,100 mol/L se requiere para alcanzar la equivalencia con 25,0 mL de HCl 0,200 mol/L?',
      options:['50,0 mL.','12,5 mL.','25,0 mL.','5,00 mL.','100,0 mL.'],answer:0,
      solution:'<p>HCl y NaOH reaccionan en proporción 1:1. La muestra contiene 0,200 × 0,0250 = 0,00500 mol de ácido. Se necesitan los mismos moles de base: V = n/C = 0,00500/0,100 = 0,0500 L = 50,0 mL.</p>'
    },
    {
      id:'quim18-p08',level:'Avanzado',
      prompt:'Se mezclan 10,0 mL de HCl 0,100 mol/L con 20,0 mL de NaOH 0,100 mol/L. Con volúmenes aditivos y comportamiento ideal a 25 °C, ¿cuál es el pH aproximado de la mezcla?',
      options:['1,48.','3,00.','7,00.','12,00.','12,52.'],answer:4,
      solution:'<p>n(HCl) = 0,00100 mol y n(NaOH) = 0,00200 mol. Sobran 0,00100 mol de base en 0,0300 L, de modo que [OH⁻] ≈ 0,0333 mol/L. pOH ≈ 1,48 y pH ≈ 14,00 − 1,48 = 12,52. No se promedian los pH iniciales.</p>'
    },
    {
      id:'quim18-p09',level:'Avanzado',
      prompt:'¿Cuál afirmación distingue correctamente el punto de equivalencia del punto final de una titulación?',
      options:['Ambos se definen siempre por un pH exactamente igual a 7.','La equivalencia responde a la proporción estequiométrica; el punto final es la señal experimental elegida.','La equivalencia exige que no quede ningún ion en la disolución.','El punto final solo depende del volumen inicial de agua y nunca del indicador.','El color de cualquier indicador cambia exactamente en el mismo pH.'],answer:1,
      solution:'<p>La equivalencia se define por las cantidades y la ecuación de reacción. El punto final es una señal observable, por ejemplo el viraje de un indicador. Debe elegirse para aproximar la equivalencia, pero no es idéntico a ella. Los indicadores tienen intervalos de viraje distintos.</p>'
    },
    {
      id:'quim18-p10',level:'Avanzado',
      prompt:'Se comparan disoluciones acuosas de NaCl y NH₄Cl a 25 °C. En el tratamiento ácido-base introductorio, ¿qué interpretación es correcta?',
      options:['Las dos sales producen obligatoriamente pH 7 porque toda sal es neutra.','NH₄Cl es básico porque contiene cloro.','NaCl produce una disolución ácida porque proviene de HCl.','NaCl es aproximadamente neutro; NH₄Cl puede ser ácido porque NH₄⁺ reacciona con el agua como ácido.','La acidez de NH₄Cl demuestra que todos los iones cloruro son ácidos fuertes.'],answer:3,
      solution:'<p>En el modelo introductorio, Na⁺ y Cl⁻ no modifican apreciablemente el equilibrio ácido-base del agua. En cambio, NH₄⁺ + H₂O ⇌ NH₃ + H₃O⁺ permite explicar la acidez de NH₄Cl. El comportamiento de una sal depende de sus iones; neutralización no significa siempre pH 7.</p>'
    }
  ]
};
