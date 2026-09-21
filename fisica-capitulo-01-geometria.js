(function () {
  'use strict';

  const escapeHTML = value => String(value).replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[character]));
  const math = tex => '\\(' + escapeHTML(tex) + '\\)';
  const magnitudes = Object.freeze([
    {
      "id": "area",
      "name": "Área",
      "caption": "Rectángulo · dos longitudes"
    },
    {
      "id": "volume",
      "name": "Volumen",
      "caption": "Prisma rectangular · tres longitudes"
    },
    {
      "id": "density",
      "name": "Densidad",
      "caption": "Masa por unidad de volumen"
    },
    {
      "id": "velocity",
      "name": "Velocidad",
      "caption": "Desplazamiento en un intervalo de tiempo"
    },
    {
      "id": "acceleration",
      "name": "Aceleración",
      "caption": "Cambio de velocidad en un intervalo de tiempo"
    },
    {
      "id": "force",
      "name": "Fuerza",
      "caption": "Fuerza neta sobre un cuerpo de masa constante"
    }
  ]);
  const steps = Object.freeze({
    area: [
      {
        title: 'Identifica las longitudes',
        text: 'En un rectángulo, la base b y la altura h son longitudes. Cada una tiene dimensión L.',
        equations: ['[b]=L', '[h]=L'],
        hint: 'Necesitamos dos medidas de longitud para calcular el área.'
      },
      {
        title: 'Escribe la fórmula del área',
        text: 'Multiplica la base por la altura del rectángulo.',
        equations: ['A=b\\cdot h'],
        hint: 'A representa el área; b y h representan las medidas de sus lados.'
      },
      {
        title: 'Sustituye por dimensiones',
        text: 'Coloca corchetes para expresar dimensiones. En un producto, se multiplican las dimensiones de sus factores.',
        equations: ['[A]=[b]\\cdot[h]', '[A]=L\\cdot L'],
        hint: 'Sustituimos [b] y [h] por L: aparecen dos factores de longitud.'
      },
      {
        title: 'Simplifica y distingue la unidad',
        text: 'Al multiplicar potencias de la misma base, se suman sus exponentes.',
        equations: ['[A]=L^{1+1}=L^{2}'],
        dimension: 'L^{2}', unit: '\\mathrm{m}^{2}', unitName: 'metro cuadrado',
        hint: 'L² expresa la dimensión del área. Si las longitudes se miden en metros, el área se expresa en metros cuadrados.'
      }
    ],
    volume: [
      {
        title: 'Identifica las longitudes',
        text: 'En un prisma rectangular, a, b y c son tres longitudes perpendiculares entre sí: largo, ancho y altura.',
        equations: ['[a]=L', '[b]=L', '[c]=L'],
        hint: 'Necesitamos tres medidas de longitud para calcular el volumen.'
      },
      {
        title: 'Escribe la fórmula del volumen',
        text: 'Multiplica el largo por el ancho y por la altura del prisma rectangular.',
        equations: ['V=a\\cdot b\\cdot c'],
        hint: 'V representa el volumen; a, b y c representan las medidas de sus aristas.'
      },
      {
        title: 'Sustituye por dimensiones',
        text: 'Coloca corchetes para expresar dimensiones. Sustituye la dimensión de cada longitud por L.',
        equations: ['[V]=[a]\\cdot[b]\\cdot[c]', '[V]=L\\cdot L\\cdot L'],
        hint: 'Cada una de las tres longitudes aporta un factor L.'
      },
      {
        title: 'Simplifica y distingue la unidad',
        text: 'Los tres factores de longitud tienen exponente 1. Al multiplicarlos, sumamos sus exponentes.',
        equations: ['[V]=L^{1+1+1}=L^{3}'],
        dimension: 'L^{3}', unit: '\\mathrm{m}^{3}', unitName: 'metro cúbico',
        hint: 'L³ expresa la dimensión del volumen. Si las longitudes se miden en metros, el volumen se expresa en metros cúbicos.'
      }
    ],
    density: [
      {
        "title": "Identifica masa y volumen",
        "text": "La densidad relaciona la masa m de un cuerpo con el volumen V que ocupa. La masa tiene dimensión M y el volumen tiene dimensión L³.",
        "equations": [
          "[m]=M",
          "[V]=L^{3}"
        ],
        "hint": "El volumen ya es una magnitud derivada: reúne tres factores de longitud."
      },
      {
        "title": "Escribe la fórmula de la densidad",
        "text": "Divide la masa entre el volumen del cuerpo para obtener su densidad media.",
        "equations": [
          "\\rho=\\frac{m}{V}"
        ],
        "hint": "La letra griega ρ (rho) representa la densidad. No confundas masa con peso."
      },
      {
        "title": "Sustituye por dimensiones",
        "text": "La dimensión de un cociente es el cociente de las dimensiones de sus magnitudes.",
        "equations": [
          "[\\rho]=\\frac{[m]}{[V]}",
          "[\\rho]=\\frac{M}{L^{3}}"
        ],
        "hint": "Sustituimos la masa por M y el volumen por L³."
      },
      {
        "title": "Simplifica y distingue la unidad",
        "text": "Una potencia en el denominador puede escribirse con exponente negativo.",
        "equations": [
          "[\\rho]=ML^{-3}"
        ],
        "dimension": "ML^{-3}",
        "unit": "\\frac{\\mathrm{kg}}{\\mathrm{m}^{3}}",
        "unitName": "kilogramo por metro cúbico",
        "hint": "ML⁻³ es la dimensión de la densidad; kg/m³ es su unidad en el SI."
      }
    ],
    velocity: [
      {
        "title": "Identifica desplazamiento y tiempo",
        "text": "En un movimiento rectilíneo, el desplazamiento Δx tiene dimensión de longitud y el intervalo Δt tiene dimensión de tiempo.",
        "equations": [
          "[\\Delta x]=L",
          "[\\Delta t]=T"
        ],
        "hint": "Δx = x_f − x_i indica el cambio de posición sobre la recta."
      },
      {
        "title": "Escribe la fórmula de la velocidad",
        "text": "La velocidad media sobre una recta se obtiene dividiendo el desplazamiento entre el intervalo de tiempo.",
        "equations": [
          "v_{\\mathrm m}=\\frac{\\Delta x}{\\Delta t}"
        ],
        "hint": "Usamos el desplazamiento, que puede ser positivo o negativo, no la distancia total recorrida."
      },
      {
        "title": "Sustituye por dimensiones",
        "text": "Reemplaza el desplazamiento por L y el intervalo de tiempo por T.",
        "equations": [
          "[v]=\\frac{[\\Delta x]}{[\\Delta t]}",
          "[v]=\\frac{L}{T}"
        ],
        "hint": "El signo y la dirección de la velocidad no cambian su dimensión."
      },
      {
        "title": "Simplifica y distingue la unidad",
        "text": "Dividir entre T equivale a multiplicar por T elevado a −1.",
        "equations": [
          "[v]=LT^{-1}"
        ],
        "dimension": "LT^{-1}",
        "unit": "\\frac{\\mathrm m}{\\mathrm s}",
        "unitName": "metro por segundo",
        "hint": "LT⁻¹ expresa la dimensión de la velocidad; m/s es su unidad en el SI."
      }
    ],
    acceleration: [
      {
        "title": "Identifica velocidad y tiempo",
        "text": "Compara las velocidades inicial y final sobre una misma recta. Su diferencia Δv tiene dimensión de velocidad y el intervalo Δt tiene dimensión de tiempo.",
        "equations": [
          "[\\Delta v]=LT^{-1}",
          "[\\Delta t]=T"
        ],
        "hint": "Restar dos velocidades conserva su dimensión: Δv = v_f − v_i."
      },
      {
        "title": "Escribe la fórmula de la aceleración",
        "text": "La aceleración media es el cambio de velocidad dividido entre el intervalo de tiempo.",
        "equations": [
          "a_{\\mathrm m}=\\frac{\\Delta v}{\\Delta t}",
          "\\Delta v=v_f-v_i"
        ],
        "hint": "Las velocidades se comparan con el mismo eje y sentido positivo."
      },
      {
        "title": "Sustituye por dimensiones",
        "text": "El cambio de velocidad aporta LT⁻¹. Después dividimos entre la dimensión T del intervalo.",
        "equations": [
          "[a]=\\frac{[\\Delta v]}{[\\Delta t]}",
          "[a]=\\frac{LT^{-1}}{T}"
        ],
        "hint": "Hay un factor de tiempo en la velocidad y otro en el denominador de la aceleración."
      },
      {
        "title": "Simplifica y distingue la unidad",
        "text": "Al dividir potencias de tiempo, restamos sus exponentes: −1 − 1 = −2.",
        "equations": [
          "[a]=LT^{-1-1}=LT^{-2}"
        ],
        "dimension": "LT^{-2}",
        "unit": "\\frac{\\mathrm m}{\\mathrm s^{2}}",
        "unitName": "metro por segundo cuadrado",
        "hint": "LT⁻² es la dimensión de la aceleración; m/s² es su unidad en el SI."
      }
    ],
    force: [
      {
        "title": "Identifica masa y aceleración",
        "text": "Para un cuerpo de masa constante, la fuerza neta se relaciona con su masa m y su aceleración a.",
        "equations": [
          "[m]=M",
          "[a]=LT^{-2}"
        ],
        "hint": "La fuerza neta es la resultante de todas las fuerzas que actúan sobre el cuerpo."
      },
      {
        "title": "Escribe la segunda ley de Newton",
        "text": "Multiplica la masa por la aceleración. La fuerza neta y la aceleración tienen la misma dirección.",
        "equations": [
          "F_{\\mathrm{neta}}=m\\cdot a"
        ],
        "hint": "Usamos los módulos de la fuerza neta y de la aceleración para deducir dimensiones."
      },
      {
        "title": "Sustituye por dimensiones",
        "text": "En un producto se multiplican las dimensiones. Sustituye m por M y a por LT⁻².",
        "equations": [
          "[F]=[m]\\cdot[a]",
          "[F]=M\\cdot(LT^{-2})"
        ],
        "hint": "La masa aporta M; la aceleración aporta L y T⁻²."
      },
      {
        "title": "Simplifica y distingue la unidad",
        "text": "Reúne los factores de masa, longitud y tiempo para expresar la dimensión de la fuerza.",
        "equations": [
          "[F]=MLT^{-2}",
          "1\\,\\mathrm N=1\\,\\mathrm{kg}\\cdot\\mathrm m/\\mathrm s^{2}"
        ],
        "dimension": "MLT^{-2}",
        "unit": "\\mathrm N",
        "unitName": "newton",
        "hint": "MLT⁻² expresa la dimensión de la fuerza. El newton equivale a un kilogramo metro por segundo cuadrado."
      }
    ]
  });

  function createSession() {
    let shape = 'area';
    let step = 0;
    const snapshot = () => ({ shape, step });
    return Object.freeze({
      snapshot,
      select(value) {
        if (!magnitudes.some(item => item.id === value)) return false;
        if (value !== shape) { shape = value; step = 0; }
        return snapshot();
      },
      next() { step = Math.min(3, step + 1); return snapshot(); },
      previous() { step = Math.max(0, step - 1); return snapshot(); },
      reset() { shape = 'area'; step = 0; return snapshot(); }
    });
  }

  const session = createSession();

  function figureHTML(shape, step) {
    if (shape !== 'area' && shape !== 'volume') return window.DimensionalDerivationFigures?.render(shape, step) || '';
    const dimensions = step >= 2;
    const result = step === 3;
    const label = shape === 'area'
      ? 'Rectángulo de base b y altura h. Ambas medidas son longitudes.'
      : 'Prisma rectangular con largo a, ancho b y altura c. Las tres medidas son longitudes.';
    const start = '<svg class="geometry-derivation-figure" viewBox="0 0 380 320" role="img" aria-label="' + label + '" xmlns="http://www.w3.org/2000/svg">' +
      '<rect width="380" height="320" fill="#fff"/>';
    if (shape === 'area') {
      return start + '<rect class="geometry-outline" x="92" y="80" width="230" height="158"/>' +
        '<path class="geometry-edge" d="M92 80V238H322"/>' +
        '<path class="geometry-guide" d="M92 253V270M322 253V270M92 263H322M66 80H80M66 238H80M72 80V238"/>' +
        '<text class="geometry-length" x="207" y="296">' + (dimensions ? '[b] = L' : 'b') + '</text>' +
        '<text class="geometry-length" x="39" y="166"' + (dimensions ? ' transform="rotate(-90 39 166)"' : '') + '>' + (dimensions ? '[h] = L' : 'h') + '</text>' +
        '<text class="geometry-symbol" x="207" y="168">' + (result ? '[A] = L²' : 'A') + '</text></svg>';
    }
    return start + '<path class="geometry-hidden" d="M141 67V196H310M141 196L83 252"/>' +
      '<path class="geometry-outline" d="M83 123L141 67H310V196L252 252H83ZM83 123H252V252M252 123L310 67"/>' +
      '<path class="geometry-edge" d="M83 123V252H252L310 196"/>' +
      '<text class="geometry-length" x="168" y="285">' + (dimensions ? '[a] = L' : 'a') + '</text>' +
      '<text class="geometry-length" x="303" y="269">' + (dimensions ? '[b] = L' : 'b') + '</text>' +
      '<text class="geometry-length" x="49" y="191"' + (dimensions ? ' transform="rotate(-90 49 191)"' : '') + '>' + (dimensions ? '[c] = L' : 'c') + '</text>' +
      '<text class="geometry-symbol" x="168" y="183">' + (result ? '[V] = L³' : 'V') + '</text></svg>';
  }

  function panelHTML(state) {
    const item = steps[state.shape][state.step];
    return '<div class="geometry-derivation-visual">' + figureHTML(state.shape, state.step) +
      '<p>' + magnitudes.find(magnitude => magnitude.id === state.shape).caption + '</p></div>' +
      '<div class="geometry-derivation-work"><h5>' + item.title + '</h5><p>' + item.text + '</p>' +
      '<div class="geometry-derivation-equations">' + item.equations.map(tex => '<div>' + math(tex) + '</div>').join('') + '</div>' +
      (item.dimension ? '<dl class="geometry-derivation-result"><div><dt>Dimensión</dt><dd>' + math(item.dimension) + '</dd></div><div><dt>Unidad SI</dt><dd>' + math(item.unit) + '<span class="geometry-derivation-unit-name">' + item.unitName + '</span></dd></div></dl>' : '') +
      '<p class="geometry-derivation-hint">' + item.hint + '</p></div>';
  }

  function render() {
    const state = session.snapshot();
    return '<section class="geometry-derivation" id="geometry-derivation" aria-labelledby="geometry-derivation-title">' +
      '<h4 id="geometry-derivation-title">Magnitudes derivadas: deducción paso a paso</h4>' +
      '<div class="geometry-derivation-selector" role="group" aria-label="Elige una magnitud">' +
      magnitudes.map(item => '<button type="button" data-action="geometry-derivation-select" data-shape="' + item.id + '" aria-pressed="' + (state.shape === item.id) + '" aria-controls="geometry-derivation-panel">' + item.name + '</button>').join('') + '</div>' +
      '<p class="geometry-derivation-progress" id="geometry-derivation-progress">Paso ' + (state.step + 1) + ' de 4</p>' +
      '<div class="geometry-derivation-panel" id="geometry-derivation-panel" role="region" aria-label="Resolución paso a paso" aria-live="polite" aria-atomic="true">' + panelHTML(state) + '</div>' +
      '<div class="geometry-derivation-navigation" role="group" aria-label="Recorrer la resolución">' +
      '<button type="button" data-action="geometry-derivation-previous"' + (state.step === 0 ? ' disabled' : '') + '>Anterior</button>' +
      '<button type="button" class="geometry-derivation-next" data-action="geometry-derivation-next"' + (state.step === 3 ? ' disabled' : '') + '>Siguiente</button>' +
      '<button type="button" data-action="geometry-derivation-reset"' + (state.step === 0 ? ' disabled' : '') + '>Reiniciar</button>' +
      '</div></section>';
  }

  function update(root, button) {
    const state = session.snapshot();
    const panel = root.querySelector('#geometry-derivation-panel');
    const progress = root.querySelector('#geometry-derivation-progress');
    const previous = root.querySelector('[data-action="geometry-derivation-previous"]');
    const next = root.querySelector('[data-action="geometry-derivation-next"]');
    const restart = root.querySelector('[data-action="geometry-derivation-reset"]');
    panel.innerHTML = panelHTML(state);
    if (progress) progress.textContent = 'Paso ' + (state.step + 1) + ' de 4';
    root.querySelectorAll('[data-action="geometry-derivation-select"]').forEach(choice => {
      choice.setAttribute('aria-pressed', String(choice.dataset.shape === state.shape));
    });
    const hadFocus = document.activeElement === button;
    if (previous) previous.disabled = state.step === 0;
    if (next) next.disabled = state.step === 3;
    if (restart) restart.disabled = state.step === 0;
    if (typeof window.renderMathInElement === 'function') {
      window.renderMathInElement(panel, {
        delimiters: [{ left: '\\(', right: '\\)', display: false }],
        throwOnError: false,
        trust: false
      });
    }
    // Controls remain mounted; move focus only when its button becomes disabled.
    if (hadFocus && button.disabled) {
      const target = state.step === 3 ? previous : next;
      if (target && typeof target.focus === 'function') target.focus();
    }
  }

  function handleAction(button) {
    if (!button || !button.dataset || button.disabled) return false;
    const action = button.dataset.action;
    if (!['geometry-derivation-select', 'geometry-derivation-next', 'geometry-derivation-previous', 'geometry-derivation-reset'].includes(action)) return false;
    const root = button.closest('#geometry-derivation');
    if (!root || !root.querySelector('#geometry-derivation-panel')) return false;
    if (action === 'geometry-derivation-select') {
      if (!session.select(button.dataset.shape)) return false;
    } else if (action === 'geometry-derivation-next') session.next();
    else if (action === 'geometry-derivation-previous') session.previous();
    else {
      // Restart the selected exercise, without switching from volume to area.
      const shape = session.snapshot().shape;
      session.reset();
      session.select(shape);
    }
    update(root, button);
    return true;
  }

  function reset() { session.reset(); }
  window.GeometryDerivation = Object.freeze({ render, handleAction, reset, createSession });
})();
