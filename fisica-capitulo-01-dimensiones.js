(function () {
  'use strict';

  // Relations, dimensions and derivations are TeX. Other fields are plain text.
  // The 17 entries preserve the chapter's reference table, including equal dimensions.
  const items = Object.freeze([
    {
      id: 'area', name: 'Área', relation: 'A=bh', dimension: 'L^{2}', unit: 'm²', unitName: 'metro cuadrado',
      exponents: { M: 0, L: 2, T: 0, I: 0 },
      explanation: 'En un rectángulo, la base y la altura son longitudes. Al multiplicarlas se suman sus exponentes: 1 + 1 = 2.',
      derivation: '[A]=[b][h]=L\\cdot L=L^{2}'
    },
    {
      id: 'volumen', name: 'Volumen', relation: 'V=abc', dimension: 'L^{3}', unit: 'm³', unitName: 'metro cúbico',
      exponents: { M: 0, L: 3, T: 0, I: 0 },
      explanation: 'Para un prisma rectangular, se multiplican largo, ancho y altura. Cada factor aporta una dimensión de longitud.',
      derivation: '[V]=[a][b][c]=L\\cdot L\\cdot L=L^{3}'
    },
    {
      id: 'densidad', name: 'Densidad', relation: '\\rho=\\frac{m}{V}', dimension: 'ML^{-3}', unit: 'kg/m³', unitName: 'kilogramo por metro cúbico',
      exponents: { M: 1, L: -3, T: 0, I: 0 },
      explanation: 'La densidad media es la masa dividida entre el volumen. Al dividir entre L³, su exponente pasa a ser −3.',
      derivation: '[\\rho]=\\frac{[m]}{[V]}=\\frac{M}{L^{3}}=ML^{-3}'
    },
    {
      id: 'velocidad', name: 'Rapidez y velocidad', relation: 'v_{\\mathrm{rap}}=\\frac{d}{\\Delta t},\\quad\\vec v_{\\mathrm m}=\\frac{\\Delta\\vec r}{\\Delta t}', dimension: 'LT^{-1}', unit: 'm/s', unitName: 'metro por segundo',
      exponents: { M: 0, L: 1, T: -1, I: 0 },
      explanation: 'Para rapidez constante, divide la distancia recorrida entre el tiempo. La velocidad media usa el desplazamiento vectorial. Ambas tienen dimensión longitud entre tiempo; distancia y desplazamiento pueden tener valores distintos.',
      derivation: '[v]=\\frac{L}{T}=LT^{-1}'
    },
    {
      id: 'aceleracion', name: 'Aceleración', relation: '\\vec a_{\\mathrm m}=\\frac{\\Delta\\vec v}{\\Delta t}', dimension: 'LT^{-2}', unit: 'm/s²', unitName: 'metro por segundo cuadrado',
      exponents: { M: 0, L: 1, T: -2, I: 0 },
      explanation: 'La aceleración media relaciona el cambio de velocidad con el intervalo de tiempo. Dividir LT⁻¹ entre T resta otra unidad al exponente temporal.',
      derivation: '[a]=\\frac{[v]}{[t]}=\\frac{LT^{-1}}{T}=LT^{-2}'
    },
    {
      id: 'fuerza', name: 'Fuerza', relation: '\\vec F_{\\mathrm{neta}}=m\\vec a', dimension: 'MLT^{-2}', unit: 'N', unitName: 'newton',
      exponents: { M: 1, L: 1, T: -2, I: 0 },
      explanation: 'Para un cuerpo de masa constante, la fuerza neta es masa por aceleración. Un newton equivale a un kilogramo metro por segundo cuadrado.',
      derivation: '[F]=[m][a]=M(LT^{-2})=MLT^{-2}'
    },
    {
      id: 'energia', name: 'Trabajo y energía', relation: 'W=Fd\\quad\\text{(mismo sentido)}', dimension: 'ML^{2}T^{-2}', unit: 'J', unitName: 'joule',
      exponents: { M: 1, L: 2, T: -2, I: 0 },
      explanation: 'Una fuerza constante en el mismo sentido del desplazamiento realiza trabajo W = Fd. Multiplica la dimensión de fuerza por longitud. El trabajo y la energía tienen la misma dimensión.',
      derivation: '[W]=[F][d]=(MLT^{-2})L=ML^{2}T^{-2}'
    },
    {
      id: 'calor', name: 'Calor', relation: '[Q]=[E]', dimension: 'ML^{2}T^{-2}', unit: 'J', unitName: 'joule',
      exponents: { M: 1, L: 2, T: -2, I: 0 },
      explanation: 'El calor es energía transferida debido a una diferencia de temperatura. Por eso tiene dimensión de energía, no de temperatura, y se expresa en joules.',
      derivation: '[Q]=[E]=ML^{2}T^{-2}'
    },
    {
      id: 'potencia', name: 'Potencia', relation: '\\mathcal P_{\\mathrm m}=\\frac{W}{\\Delta t}', dimension: 'ML^{2}T^{-3}', unit: 'W', unitName: 'watt',
      exponents: { M: 1, L: 2, T: -3, I: 0 },
      explanation: 'La potencia media es el trabajo realizado o la energía transferida por unidad de tiempo. Al dividir la energía entre T, el exponente temporal cambia de −2 a −3.',
      derivation: '[\\mathcal P]=\\frac{[W]}{T}=\\frac{ML^{2}T^{-2}}{T}=ML^{2}T^{-3}'
    },
    {
      id: 'presion', name: 'Presión', relation: 'p=\\frac{F_{\\perp}}{A}', dimension: 'ML^{-1}T^{-2}', unit: 'Pa', unitName: 'pascal',
      exponents: { M: 1, L: -1, T: -2, I: 0 },
      explanation: 'La presión relaciona la fuerza normal con el área. Para una fuerza repartida uniformemente, divide su magnitud entre el área: el exponente de longitud queda 1 − 2 = −1.',
      derivation: '[p]=\\frac{[F]}{[A]}=\\frac{MLT^{-2}}{L^{2}}=ML^{-1}T^{-2}'
    },
    {
      id: 'impulso', name: 'Impulso', relation: '\\vec J_F=\\vec F\\,\\Delta t\\quad\\text{(fuerza constante)}', dimension: 'MLT^{-1}', unit: 'N·s', unitName: 'newton segundo',
      exponents: { M: 1, L: 1, T: -1, I: 0 },
      explanation: 'El impulso de una fuerza constante es fuerza por intervalo de tiempo. El impulso de la fuerza neta equivale al cambio de cantidad de movimiento; sus dimensiones coinciden.',
      derivation: '[J_F]=[F]T=(MLT^{-2})T=MLT^{-1}'
    },
    {
      id: 'cantidad-movimiento', name: 'Cantidad de movimiento', relation: '\\vec p_m=m\\vec v', dimension: 'MLT^{-1}', unit: 'kg·m/s', unitName: 'kilogramo metro por segundo',
      exponents: { M: 1, L: 1, T: -1, I: 0 },
      explanation: 'La cantidad de movimiento es masa por velocidad y tiene la dirección de esta. Aquí p con subíndice m designa cantidad de movimiento; no es la presión.',
      derivation: '[p_m]=[m][v]=M(LT^{-1})=MLT^{-1}'
    },
    {
      id: 'frecuencia', name: 'Frecuencia', relation: 'f=\\frac{1}{\\tau}', dimension: 'T^{-1}', unit: 'Hz', unitName: 'hertz',
      exponents: { M: 0, L: 0, T: -1, I: 0 },
      explanation: 'La frecuencia es el número de ciclos por unidad de tiempo. El período τ es la duración de un ciclo; su inverso tiene dimensión T⁻¹.',
      derivation: '[f]=\\frac{1}{[\\tau]}=\\frac{1}{T}=T^{-1}'
    },
    {
      id: 'carga', name: 'Carga eléctrica', relation: 'q=i\\Delta t\\quad\\text{(corriente constante)}', dimension: 'IT', unit: 'C', unitName: 'coulomb',
      exponents: { M: 0, L: 0, T: 1, I: 1 },
      explanation: 'Con corriente constante, la carga transportada es corriente por tiempo. La i minúscula representa la corriente y la I mayúscula su dimensión. Un coulomb equivale a un amperio segundo.',
      derivation: '[q]=[i][\\Delta t]=IT'
    },
    {
      id: 'velocidad-angular', name: 'Velocidad angular', relation: '\\omega_{\\mathrm m}=\\frac{\\Delta\\theta}{\\Delta t}', dimension: 'T^{-1}', unit: 'rad/s', unitName: 'radián por segundo',
      exponents: { M: 0, L: 0, T: -1, I: 0 },
      explanation: 'En una rotación alrededor de un eje fijo, la velocidad angular media es el desplazamiento angular entre el tiempo. El radián es adimensional en el SI; la dimensión es T⁻¹ y la unidad se escribe rad/s.',
      derivation: '[\\omega]=\\frac{[\\theta]}{T}=\\frac{1}{T}=T^{-1}'
    },
    {
      id: 'torque', name: 'Torque o momento de una fuerza', relation: '\\tau_F=Fd_{\\perp}', dimension: 'ML^{2}T^{-2}', unit: 'N·m', unitName: 'newton metro',
      exponents: { M: 1, L: 2, T: -2, I: 0 },
      explanation: 'La magnitud del torque se calcula multiplicando la magnitud de la fuerza por el brazo perpendicular. Describe un efecto de giro. Comparte dimensión con la energía, pero su unidad se escribe N·m, no J.',
      derivation: '[\\tau_F]=[F][d_{\\perp}]=(MLT^{-2})L=ML^{2}T^{-2}'
    },
    {
      id: 'constante-elastica', name: 'Constante elástica', relation: 'k=\\frac{F}{x}', dimension: 'MT^{-2}', unit: 'N/m', unitName: 'newton por metro',
      exponents: { M: 1, L: 0, T: -2, I: 0 },
      explanation: 'Dentro del régimen elástico de un resorte que obedece la ley de Hooke, divide la magnitud de la fuerza elástica entre la magnitud de su deformación. La longitud del numerador se cancela con la del denominador.',
      derivation: '[k]=\\frac{[F]}{[x]}=\\frac{MLT^{-2}}{L}=MT^{-2}'
    }
  ].map(item => Object.freeze({ ...item, exponents: Object.freeze(item.exponents) })));

  const dimensions = Object.freeze({ M: 'Masa', L: 'Longitud', T: 'Tiempo', I: 'Corriente eléctrica' });
  let selected = 'area';
  const escapeHTML = text => String(text).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
  const math = tex => '\\(' + escapeHTML(tex) + '\\)';
  const sameDimension = (first, second) => Object.keys(dimensions).every(key => first.exponents[key] === second.exponents[key]);

  function detailHTML(item) {
    const related = items.filter(other => other.id !== item.id && sameDimension(item, other));
    return '<h5 class="dimension-explorer-name">' + escapeHTML(item.name) + '</h5>' +
      '<dl class="dimension-explorer-facts"><div><dt>Dimensión</dt><dd>' + math(item.dimension) + '</dd></div>' +
      '<div><dt>Unidad SI</dt><dd>' + escapeHTML(item.unit) + '<span>' + escapeHTML(item.unitName) + '</span></dd></div></dl>' +
      '<div class="dimension-explorer-relation"><strong>Relación de referencia</strong><div>' + math(item.relation) + '</div></div>' +
      '<div class="dimension-explorer-derivation"><strong>Cómo se obtiene</strong><div>' + math(item.derivation) + '</div></div>' +
      '<p class="dimension-explorer-explanation">' + escapeHTML(item.explanation) + '</p>' +
      (related.length ? '<div class="dimension-explorer-connections"><strong>También tienen esta dimensión</strong><ul>' + related.map(other => '<li>' + escapeHTML(other.name) + ' <span>(' + escapeHTML(other.unit) + ')</span></li>').join('') + '</ul><p>Compartir dimensión no significa representar la misma magnitud. Selecciona sus nombres arriba para comparar.</p></div>' : '');
  }

  function render() {
    const active = items.find(item => item.id === selected) || items[0];
    return '<section class="dimension-explorer" id="dimension-explorer" aria-label="Tabla interactiva de dimensiones">' +
      '<p class="dimension-explorer-instruction">Elige una de las 17 magnitudes para consultar su dimensión, su unidad y cómo se relaciona con las magnitudes base.</p>' +
      '<div class="dimension-explorer-choices" role="group" aria-label="Magnitudes de la tabla de consulta">' +
      items.map(item => '<button type="button" data-action="dimension-explorer-select" data-id="' + item.id + '" aria-pressed="' + (item.id === active.id) + '" aria-controls="dimension-explorer-detail">' + escapeHTML(item.name) + '</button>').join('') +
      '</div><div class="dimension-explorer-detail" id="dimension-explorer-detail" role="region" aria-label="Detalle de la magnitud seleccionada" aria-live="polite" aria-atomic="true">' + detailHTML(active) + '</div></section>';
  }

  function handleAction(button) {
    if (!button || !button.dataset || button.disabled || button.dataset.action !== 'dimension-explorer-select') return false;
    const item = items.find(entry => entry.id === button.dataset.id);
    const root = button.closest('#dimension-explorer');
    const panel = root && root.querySelector('#dimension-explorer-detail');
    if (!item || !panel) return false;
    if (selected === item.id) return true;
    selected = item.id;
    root.querySelectorAll('[data-action="dimension-explorer-select"]').forEach(choice => choice.setAttribute('aria-pressed', String(choice.dataset.id === item.id)));
    // Update only the detail: the selected button and keyboard focus stay mounted.
    panel.innerHTML = detailHTML(item);
    if (typeof window.renderMathInElement === 'function') {
      window.renderMathInElement(panel, {
        delimiters: [{ left: '\\(', right: '\\)', display: false }],
        throwOnError: false,
        trust: false
      });
    }
    return true;
  }

  function reset() { selected = 'area'; }
  window.DimensionExplorer = Object.freeze({ items, render, handleAction, reset });
})();
