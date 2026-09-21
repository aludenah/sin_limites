(function () {
  'use strict';

  const escapeHTML = value => String(value).replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[character]));
  const math = tex => '\\(' + escapeHTML(tex) + '\\)';
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
    ]
  });

  function createSession() {
    let shape = 'area';
    let step = 0;
    const snapshot = () => ({ shape, step });
    return Object.freeze({
      snapshot,
      select(value) {
        if (value !== 'area' && value !== 'volume') return false;
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
      '<p>' + (state.shape === 'area' ? 'Rectángulo · dos longitudes' : 'Prisma rectangular · tres longitudes') + '</p></div>' +
      '<div class="geometry-derivation-work"><h5>' + item.title + '</h5><p>' + item.text + '</p>' +
      '<div class="geometry-derivation-equations">' + item.equations.map(tex => '<div>' + math(tex) + '</div>').join('') + '</div>' +
      (item.dimension ? '<dl class="geometry-derivation-result"><div><dt>Dimensión</dt><dd>' + math(item.dimension) + '</dd></div><div><dt>Unidad SI</dt><dd>' + math(item.unit) + '<span class="geometry-derivation-unit-name">' + item.unitName + '</span></dd></div></dl>' : '') +
      '<p class="geometry-derivation-hint">' + item.hint + '</p></div>';
  }

  function render() {
    const state = session.snapshot();
    return '<section class="geometry-derivation" id="geometry-derivation" aria-labelledby="geometry-derivation-title">' +
      '<h4 id="geometry-derivation-title">Área y volumen: deducción paso a paso</h4>' +
      '<div class="geometry-derivation-selector" role="group" aria-label="Elige una magnitud">' +
      '<button type="button" data-action="geometry-derivation-select" data-shape="area" aria-pressed="' + (state.shape === 'area') + '" aria-controls="geometry-derivation-panel">Área</button>' +
      '<button type="button" data-action="geometry-derivation-select" data-shape="volume" aria-pressed="' + (state.shape === 'volume') + '" aria-controls="geometry-derivation-panel">Volumen</button></div>' +
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
