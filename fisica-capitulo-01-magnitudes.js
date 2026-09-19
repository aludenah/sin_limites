(function () {
  'use strict';

  // Dimension and relation are TeX; all remaining content is plain text.
  const items = Object.freeze([
    { id: 'longitud', name: 'Longitud', kind: 'base', unit: 'metro', symbol: 'm', dimension: 'L', example: 'Una mesa tiene una longitud de 2 m.', explanation: 'Mide distancias o extensiones. Es una de las siete magnitudes que el SI toma como punto de partida.' },
    { id: 'masa', name: 'Masa', kind: 'base', unit: 'kilogramo', symbol: 'kg', dimension: 'M', example: 'La masa de una mochila es 3 kg.', explanation: 'Se relaciona con la inercia de un cuerpo. No es lo mismo que el peso, que es una fuerza.' },
    { id: 'tiempo', name: 'Tiempo', kind: 'base', unit: 'segundo', symbol: 's', dimension: 'T', example: 'Un cronómetro registra un intervalo de 12 s.', explanation: 'Permite medir la duración de un suceso o el intervalo entre dos acontecimientos.' },
    { id: 'temperatura', name: 'Temperatura termodinámica', kind: 'base', unit: 'kelvin', symbol: 'K', dimension: '\\Theta', example: 'El agua de un recipiente está a 293 K.', explanation: 'Caracteriza el estado térmico. El símbolo del kelvin es K y se escribe sin el signo de grado.' },
    { id: 'corriente', name: 'Intensidad de corriente eléctrica', kind: 'base', unit: 'amperio', symbol: 'A', dimension: 'I', example: 'Por un cable circula una corriente de 0,5 A.', explanation: 'Expresa cuánta carga atraviesa una sección por unidad de tiempo. En el SI se elige como magnitud base; la carga eléctrica es derivada.' },
    { id: 'sustancia', name: 'Cantidad de sustancia', kind: 'base', unit: 'mol', symbol: 'mol', dimension: 'N', example: 'Una muestra contiene 2 mol de moléculas de agua.', explanation: 'Indica la cantidad de entidades especificadas, como átomos o moléculas. Es distinta de la masa y siempre se debe indicar qué entidades se cuentan.' },
    { id: 'intensidad-luminosa', name: 'Intensidad luminosa', kind: 'base', unit: 'candela', symbol: 'cd', dimension: 'J', example: 'Una fuente tiene una intensidad luminosa de 10 cd en una dirección.', explanation: 'Describe la emisión luminosa de una fuente en una dirección, considerando la sensibilidad visual humana. Aquí J es una dimensión; no es el símbolo de la unidad joule.' },
    { id: 'area', name: 'Área', kind: 'derived', unit: 'metro cuadrado', symbol: 'm²', dimension: 'L^{2}', relation: 'A=bh', example: 'Un rectángulo de 2 m por 3 m tiene un área de 6 m².', explanation: 'Para un rectángulo, multiplica base por altura. Se combinan dos longitudes: L × L = L².' },
    { id: 'volumen', name: 'Volumen', kind: 'derived', unit: 'metro cúbico', symbol: 'm³', dimension: 'L^{3}', relation: 'V=abc', example: 'Una caja de 2 m por 3 m por 1 m ocupa 6 m³.', explanation: 'Para una caja rectangular, multiplica sus tres dimensiones. Se combinan tres longitudes.' },
    { id: 'densidad', name: 'Densidad', kind: 'derived', unit: 'kilogramo por metro cúbico', symbol: 'kg/m³', dimension: 'ML^{-3}', relation: '\\rho=\\frac{m}{V}', example: 'Un cuerpo de 6 kg y volumen 0,002 m³ tiene una densidad media de 3000 kg/m³.', explanation: 'Relaciona la masa con el volumen que ocupa: masa dividida entre longitud al cubo.' },
    { id: 'velocidad', name: 'Velocidad', kind: 'derived', unit: 'metro por segundo', symbol: 'm/s', dimension: 'LT^{-1}', relation: '\\vec v_{\\mathrm m}=\\frac{\\Delta\\vec r}{\\Delta t}', example: 'Un desplazamiento de 20 m hacia el norte en 4 s corresponde a una velocidad media de 5 m/s hacia el norte.', explanation: 'La velocidad media relaciona el desplazamiento con el intervalo de tiempo. Incluye una dirección.' },
    { id: 'aceleracion', name: 'Aceleración', kind: 'derived', unit: 'metro por segundo cuadrado', symbol: 'm/s²', dimension: 'LT^{-2}', relation: '\\vec a_{\\mathrm m}=\\frac{\\Delta\\vec v}{\\Delta t}', example: 'Un auto que pasa de 2 m/s a 8 m/s en 3 s, en la misma dirección, tiene una aceleración media de 2 m/s².', explanation: 'La aceleración media relaciona el cambio de velocidad con el intervalo de tiempo. Su dimensión es velocidad dividida entre tiempo.' },
    { id: 'fuerza', name: 'Fuerza', kind: 'derived', unit: 'newton', symbol: 'N', dimension: 'MLT^{-2}', relation: '\\vec F_{\\mathrm{neta}}=m\\vec a', example: 'Una fuerza neta de 6 N produce una aceleración de 3 m/s² en un cuerpo de 2 kg.', explanation: 'Para masa constante, la fuerza neta es el producto de la masa y la aceleración. Un newton equivale a 1 kg·m/s².' },
    { id: 'energia', name: 'Trabajo y energía', kind: 'derived', unit: 'joule', symbol: 'J', dimension: 'ML^{2}T^{-2}', relation: 'W=Fd\\quad\\text{(mismo sentido)}', example: 'Una fuerza constante de 4 N que actúa en el sentido de un desplazamiento de 3 m realiza un trabajo de 12 J.', explanation: 'El trabajo es una forma de transferir energía. Para una fuerza constante que actúa en el mismo sentido del desplazamiento, se multiplican fuerza y distancia.' },
    { id: 'presion', name: 'Presión', kind: 'derived', unit: 'pascal', symbol: 'Pa', dimension: 'ML^{-1}T^{-2}', relation: 'p=\\frac{F_{\\perp}}{A}', example: 'Una fuerza normal de 20 N repartida uniformemente en 4 m² produce una presión de 5 Pa.', explanation: 'Relaciona la fuerza normal con el área sobre la que actúa. Un pascal equivale a 1 N/m².' },
    { id: 'potencia', name: 'Potencia', kind: 'derived', unit: 'watt', symbol: 'W', dimension: 'ML^{2}T^{-3}', relation: '\\mathcal P_{\\mathrm m}=\\frac{W}{\\Delta t}', example: 'Una máquina que realiza un trabajo de 120 J en 4 s desarrolla una potencia media de 30 W.', explanation: 'Expresa la rapidez con que se realiza trabajo o se transfiere energía. Un watt equivale a 1 J/s.' },
    { id: 'cantidad-movimiento', name: 'Cantidad de movimiento', kind: 'derived', unit: 'kilogramo metro por segundo', symbol: 'kg·m/s', dimension: 'MLT^{-1}', relation: '\\vec p=m\\vec v', example: 'Un cuerpo de 2 kg con velocidad de 3 m/s hacia el este tiene una cantidad de movimiento de 6 kg·m/s hacia el este.', explanation: 'Se obtiene multiplicando la masa por la velocidad. Tiene la misma dirección que la velocidad.' },
    { id: 'torque', name: 'Torque', kind: 'derived', unit: 'newton metro', symbol: 'N·m', dimension: 'ML^{2}T^{-2}', relation: '\\tau=Fd_{\\perp}', example: 'Una fuerza de 10 N con brazo perpendicular de 0,5 m produce un torque de magnitud 5 N·m.', explanation: 'Describe el efecto de giro de una fuerza. Comparte dimensión con la energía, pero expresa otra magnitud: su unidad se escribe N·m, no joule.' },
    { id: 'carga', name: 'Carga eléctrica', kind: 'derived', unit: 'coulomb', symbol: 'C', dimension: 'IT', relation: 'q=I\\Delta t\\quad\\text{(corriente constante)}', example: 'Una corriente constante de 2 A transporta una carga de 6 C en 3 s.', explanation: 'Con corriente constante, la carga transportada es el producto de la corriente por el intervalo de tiempo. Un coulomb equivale a 1 A·s.' },
    { id: 'velocidad-angular', name: 'Velocidad angular', kind: 'derived', unit: 'radián por segundo', symbol: 'rad/s', dimension: 'T^{-1}', relation: '\\omega_{\\mathrm m}=\\frac{\\Delta\\theta}{\\Delta t}', example: 'Un giro de 6 rad en 2 s corresponde a una velocidad angular media de 3 rad/s.', explanation: 'Relaciona el desplazamiento angular con el tiempo. El radián es adimensional en el SI; por ello, la dimensión es T⁻¹, aunque la unidad se escribe rad/s.' }
  ].map(item => Object.freeze(item)));

  const selected = { base: 'longitud', derived: 'area' };
  const kinds = ['base', 'derived'];
  const escapeHTML = text => String(text).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
  const math = tex => '\\(' + escapeHTML(tex) + '\\)';

  function detail(item) {
    return '<h5 class="magnitude-explorer-name">' + escapeHTML(item.name) + '</h5>' +
      '<dl class="magnitude-explorer-facts"><div><dt>Unidad SI</dt><dd>' + escapeHTML(item.unit) + '</dd></div>' +
      '<div><dt>Símbolo de la unidad</dt><dd class="magnitude-explorer-symbol">' + escapeHTML(item.symbol) + '</dd></div>' +
      '<div><dt>Dimensión</dt><dd>' + math(item.dimension) + '</dd></div></dl>' +
      (item.relation ? '<div class="magnitude-explorer-relation"><strong>Relación de referencia</strong><div>' + math(item.relation) + '</div></div>' : '') +
      '<p class="magnitude-explorer-explanation">' + escapeHTML(item.explanation) + '</p>' +
      '<p class="magnitude-explorer-example"><strong>En una situación real</strong>' + escapeHTML(item.example) + '</p>';
  }

  function render(kind) {
    if (!kinds.includes(kind)) return '';
    const group = items.filter(item => item.kind === kind);
    const active = group.find(item => item.id === selected[kind]) || group[0];
    const id = 'magnitude-explorer-' + kind;
    const label = kind === 'base' ? 'Explora las 7 magnitudes base' : 'Explora 13 magnitudes derivadas';
    return '<section class="magnitude-explorer" id="' + id + '" aria-label="' + label + '">' +
      '<p class="magnitude-explorer-instruction">Selecciona una magnitud para descubrir su unidad, dimensión y un ejemplo.</p>' +
      '<div class="magnitude-explorer-choices" role="group" aria-label="' + label + '">' +
      group.map(item => '<button type="button" data-action="magnitude-select" data-kind="' + kind + '" data-id="' + item.id + '" aria-pressed="' + (item.id === active.id) + '" aria-controls="' + id + '-detail">' + escapeHTML(item.name) + '</button>').join('') +
      '</div><div class="magnitude-explorer-detail" id="' + id + '-detail" role="region" aria-label="Detalle de la magnitud seleccionada" aria-live="polite" aria-atomic="true">' + detail(active) + '</div></section>';
  }

  function handleAction(button) {
    if (!button || !button.dataset || button.dataset.action !== 'magnitude-select' || button.disabled) return false;
    const kind = button.dataset.kind;
    if (!kinds.includes(kind)) return false;
    const item = items.find(entry => entry.kind === kind && entry.id === button.dataset.id);
    const root = button.closest('#magnitude-explorer-' + kind);
    const panel = root && root.querySelector('.magnitude-explorer-detail');
    if (!item || !panel) return false;
    if (selected[kind] === item.id) return true;
    selected[kind] = item.id;
    root.querySelectorAll('[data-action="magnitude-select"]').forEach(choice => {
      choice.setAttribute('aria-pressed', String(choice.dataset.id === item.id));
    });
    // Keep the original buttons mounted so keyboard focus never moves.
    panel.innerHTML = detail(item);
    if (typeof window.renderMathInElement === 'function') {
      window.renderMathInElement(panel, {
        delimiters: [{ left: '\\(', right: '\\)', display: false }],
        throwOnError: false,
        trust: false
      });
    }
    return true;
  }

  function reset() {
    selected.base = 'longitud';
    selected.derived = 'area';
  }

  window.MagnitudeExplorer = Object.freeze({ items, render, handleAction, reset });
})();
