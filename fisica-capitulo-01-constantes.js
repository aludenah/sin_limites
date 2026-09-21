(function () {
  'use strict';

  const escapeHTML = value => String(value).replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[character]));
  const math = tex => '\\(' + escapeHTML(tex) + '\\)';
  const groups = Object.freeze({
    'physical-constants': {
      selection: 'selected',
      items: [
        { id: 'spring', label: 'Resorte', difficulty: 'Básico' },
        { id: 'planck', label: 'Planck', difficulty: 'Intermedio' },
        { id: 'gravity', label: 'Gravitación', difficulty: 'Avanzado' }
      ]
    },
    'dimension-one': {
      selection: 'selectedDimension',
      items: [
        { id: 'friction', label: 'Rozamiento', difficulty: 'Básico' },
        { id: 'sine', label: 'Seno', difficulty: 'Intermedio' },
        { id: 'exponential', label: 'Exponencial', difficulty: 'Avanzado' }
      ]
    }
  });
  const cards = Object.keys(groups);
  const constants = Object.freeze({
    spring: {
      name: 'Constante de un resorte',
      question: 'En ' + math('F=kx') + ', ' + math('F') + ' es el módulo de la fuerza elástica y ' + math('x') + ' el módulo de la deformación. Obtén la dimensión de ' + math('k') + '.',
      steps: [
        {
          title: 'Identifica la relación y las magnitudes',
          text: 'En un resorte que cumple la ley de Hooke, F es el módulo de la fuerza elástica y x es el módulo de la deformación. La constante k caracteriza la rigidez del resorte.',
          equations: ['F=kx', '[F]=MLT^{-2}', '[x]=L'],
          hint: 'La deformación es una longitud: cuánto se estira o se comprime el resorte respecto a su longitud natural.'
        },
        {
          title: 'Despeja la constante',
          text: 'Para una deformación distinta de cero, divide ambos lados entre x. Así queda aislada la constante k.',
          equations: ['k=\\frac{F}{x}'],
          hint: 'Primero despejamos la magnitud; después sustituimos sus dimensiones.'
        },
        {
          title: 'Sustituye por dimensiones',
          text: 'La dimensión de un cociente es el cociente de las dimensiones. Reemplaza la fuerza por MLT⁻² y la deformación por L.',
          equations: ['[k]=\\frac{[F]}{[x]}', '[k]=\\frac{MLT^{-2}}{L}'],
          hint: 'El factor L aparece una vez en el numerador y una vez en el denominador.'
        },
        {
          title: 'Simplifica y expresa la unidad SI',
          text: 'Al dividir potencias de la misma base, restamos los exponentes. L¹/L¹ = L⁰ = 1, por lo que se elimina la dimensión de longitud.',
          equations: ['[k]=ML^{1-1}T^{-2}=MT^{-2}'],
          dimension: 'MT^{-2}',
          unit: '\\frac{\\mathrm N}{\\mathrm m}=\\frac{\\mathrm{kg}}{\\mathrm s^{2}}',
          unitName: 'newton por metro',
          hint: 'Ser constante no significa ser adimensional: k tiene dimensión MT⁻².'
        }
      ]
    },
    gravity: {
      name: 'Constante de gravitación G',
      question: 'Deduce la dimensión de ' + math('G') + ' en ' + math('F=Gm_1m_2/r^2') + ', donde ' + math('F') + ' es el módulo de la fuerza gravitatoria, ' + math('m_1') + ' y ' + math('m_2') + ' son masas y ' + math('r') + ' es la distancia entre sus centros.',
      steps: [
        {
          title: 'Identifica la relación y las magnitudes',
          text: 'En la ley de gravitación universal, F es el módulo de la fuerza, m₁ y m₂ son las masas, y r es la distancia entre sus centros. G es la constante de gravitación universal.',
          equations: ['F=G\\frac{m_1m_2}{r^{2}}', '[F]=MLT^{-2}', '[m_1]=[m_2]=M', '[r]=L'],
          hint: 'La distancia está elevada al cuadrado; su dimensión también deberá elevarse al cuadrado.'
        },
        {
          title: 'Despeja la constante',
          text: 'Multiplica ambos lados por r² y divide entre el producto de las masas para aislar G.',
          equations: ['Fr^{2}=Gm_1m_2', 'G=\\frac{Fr^{2}}{m_1m_2}'],
          hint: 'El cuadrado de la distancia queda en el numerador y las dos masas en el denominador.'
        },
        {
          title: 'Sustituye por dimensiones',
          text: 'Reemplaza cada magnitud por su dimensión y conserva las operaciones de la fórmula.',
          equations: ['[G]=\\frac{[F][r]^{2}}{[m_1][m_2]}', '[G]=\\frac{(MLT^{-2})L^{2}}{M\\cdot M}'],
          hint: 'Las longitudes del numerador se multiplican; las masas del denominador forman M².'
        },
        {
          title: 'Simplifica y expresa la unidad SI',
          text: 'Para la masa, restamos 1 − 2 = −1. Para la longitud, sumamos 1 + 2 = 3. El exponente del tiempo sigue siendo −2.',
          equations: ['[G]=M^{1-2}L^{1+2}T^{-2}', '[G]=M^{-1}L^{3}T^{-2}'],
          dimension: 'M^{-1}L^{3}T^{-2}',
          unit: '\\frac{\\mathrm m^{3}}{\\mathrm{kg}\\,\\mathrm s^{2}}',
          unitName: 'metro cúbico por kilogramo y segundo cuadrado',
          hint: 'G tiene dimensiones. Su unidad SI también puede escribirse como N·m²/kg².'
        }
      ]
    },
    planck: {
      name: 'Constante de Planck h',
      question: 'Deduce la dimensión de ' + math('h') + ' en ' + math('E=hf') + ', donde ' + math('E') + ' es la energía de un fotón y ' + math('f') + ' es su frecuencia.',
      steps: [
        {
          title: 'Identifica la relación y las magnitudes',
          text: 'En la relación de Planck, E es la energía de un fotón y f es su frecuencia. La constante h relaciona estas dos magnitudes.',
          equations: ['E=hf', '[E]=ML^{2}T^{-2}', '[f]=T^{-1}'],
          hint: 'La frecuencia tiene dimensión de tiempo inverso.'
        },
        {
          title: 'Despeja la constante',
          text: 'Divide ambos lados entre la frecuencia para aislar h.',
          equations: ['h=\\frac{E}{f}'],
          hint: 'La energía queda en el numerador y la frecuencia en el denominador.'
        },
        {
          title: 'Sustituye por dimensiones',
          text: 'Sustituye la energía por ML²T⁻² y la frecuencia por T⁻¹.',
          equations: ['[h]=\\frac{[E]}{[f]}', '[h]=\\frac{ML^{2}T^{-2}}{T^{-1}}'],
          hint: 'Dividir entre T⁻¹ equivale a multiplicar por T.'
        },
        {
          title: 'Simplifica y expresa la unidad SI',
          text: 'Al dividir las potencias de tiempo, restamos los exponentes: −2 − (−1) = −1. Las potencias de masa y longitud se conservan.',
          equations: ['[h]=ML^{2}T^{-2-(-1)}=ML^{2}T^{-1}'],
          dimension: 'ML^{2}T^{-1}',
          unit: '\\mathrm J\\cdot\\mathrm s=\\frac{\\mathrm{kg}\\,\\mathrm m^{2}}{\\mathrm s}',
          unitName: 'joule segundo',
          hint: 'h tiene dimensión de energía multiplicada por tiempo. Una constante física puede tener dimensiones.'
        }
      ]
    },
    friction: {
      name: 'Coeficiente de rozamiento cinético',
      question: 'En el rozamiento cinético, ' + math('F_r=\\mu_k F_N') + ', donde ' + math('F_r') + ' es el módulo de la fuerza de rozamiento y ' + math('F_N>0') + ' el de la fuerza normal. Determina la dimensión de ' + math('\\mu_k') + '.',
      steps: [
        {
          title: 'Despeja el coeficiente',
          text: 'Divide ambos miembros entre la fuerza normal, que es distinta de cero. La dimensión del cociente es el cociente de las dimensiones.',
          equations: ['F_r=\\mu_k F_N', '\\mu_k=\\frac{F_r}{F_N}', '[\\mu_k]=\\frac{[F_r]}{[F_N]}'],
          hint: 'El coeficiente queda expresado como fuerza entre fuerza.'
        },
        {
          title: 'Sustituye y obtén la dimensión',
          text: 'La fuerza de rozamiento y la fuerza normal tienen la misma dimensión: MLT⁻². Al sustituirlas en el cociente, los factores dimensionales se cancelan y el resultado es uno.',
          equations: ['[F_r]=[F_N]=MLT^{-2}', '[\\mu_k]=\\frac{MLT^{-2}}{MLT^{-2}}', '[\\mu_k]=M^0L^0T^0=1'],
          dimension: '1',
          dimensionLabel: 'Dimensión de μₖ',
          hint: 'El coeficiente de rozamiento es adimensional: su dimensión es uno.'
        }
      ]
    },
    sine: {
      name: 'Dimensión de la amplitud A',
      question: 'En ' + math('y=A\\operatorname{sen}(2\\pi t/\\tau)') + ', ' + math('y') + ' es un desplazamiento, ' + math('t') + ' es tiempo y ' + math('\\tau>0') + ' es el período. Determina la dimensión de ' + math('A') + '.',
      steps: [
        {
          title: 'Identifica la relación y las magnitudes',
          text: 'El desplazamiento y tiene dimensión de longitud. El tiempo t y el período τ tienen dimensión de tiempo. A es la amplitud cuya dimensión buscamos.',
          equations: ['y=A\\operatorname{sen}\\!\\left(\\frac{2\\pi t}{\\tau}\\right)', '[y]=L', '[t]=[\\tau]=T'],
          hint: 'τ representa el período de la oscilación; T representa la dimensión de tiempo.'
        },
        {
          title: 'Obtén la dimensión de A',
          text: 'Expresa las dimensiones de ambos miembros y despeja la dimensión de A. El desplazamiento tiene dimensión L y el seno tiene dimensión uno.',
          equations: ['[y]=[A]\\left[\\operatorname{sen}\\!\\left(\\frac{2\\pi t}{\\tau}\\right)\\right]', '[A]=\\frac{[y]}{\\left[\\operatorname{sen}(2\\pi t/\\tau)\\right]}=\\frac{L}{1}=L'],
          dimension: 'L',
          dimensionLabel: 'Dimensión de A',
          hint: 'La amplitud A tiene dimensión de longitud.'
        }
      ]
    },
    exponential: {
      name: 'Dimensión del coeficiente b',
      question: 'Un modelo de frenado describe la rapidez mediante ' + math('v=v_0e^{-bt/m}') + ', donde ' + math('v_0') + ' es la rapidez inicial, ' + math('m') + ' la masa, ' + math('t') + ' el tiempo y ' + math('b') + ' un coeficiente. Determina la dimensión de ' + math('b') + '.',
      steps: [
        {
          title: 'Identifica la relación y las magnitudes',
          text: 'Para determinar la dimensión de b, identifica las magnitudes que aparecen en el exponente: m es masa y t es tiempo.',
          equations: ['v=v_0e^{-bt/m}', '[m]=M,\\qquad[t]=T'],
          hint: 'El exponente de una función exponencial debe ser adimensional.'
        },
        {
          title: 'Exige dimensión uno en el exponente',
          text: 'El exponente −bt/m debe tener dimensión uno. El signo menos es un factor numérico que no cambia la dimensión.',
          equations: ['\\left[-\\frac{bt}{m}\\right]=1', '\\frac{[b][t]}{[m]}=1', '\\frac{[b]T}{M}=1'],
          hint: 'Esta condición permite encontrar la dimensión de b sin resolver ninguna ecuación de movimiento.'
        },
        {
          title: 'Deduce la dimensión del coeficiente',
          text: 'Multiplica por M y divide entre T para despejar la dimensión de b.',
          equations: ['[b]=\\frac{M}{T}=MT^{-1}'],
          dimension: 'MT^{-1}',
          dimensionLabel: 'Dimensión de b',
          hint: 'El coeficiente b tiene dimensión de masa dividida entre tiempo.'
        }
      ]
    }
  });

  function createSession() {
    const initialState = () => ({ selected: 'spring', selectedDimension: 'friction', spring: 0, planck: 0, gravity: 0, friction: 0, sine: 0, exponential: 0 });
    let state = initialState();
    const snapshot = () => ({ ...state });
    const active = card => state[groups[card].selection];
    function move(card, change) {
      if (!cards.includes(card)) return false;
      const key = active(card);
      state[key] = Math.max(0, Math.min(constants[key].steps.length - 1, change(state[key])));
      return snapshot();
    }
    return Object.freeze({
      snapshot,
      select(value, card = 'physical-constants') {
        if (!cards.includes(card) || !groups[card].items.some(constant => constant.id === value)) return false;
        state[groups[card].selection] = value;
        return snapshot();
      },
      next: card => move(card, step => step + 1),
      previous: card => move(card, step => step - 1),
      restart: card => move(card, () => 0),
      reset() {
        state = initialState();
        return snapshot();
      }
    });
  }

  const session = createSession();
  function activeState(card) {
    const state = session.snapshot();
    const constant = state[groups[card].selection];
    return { constant, step: state[constant], lastStep: constants[constant].steps.length - 1 };
  }
  function panelHTML(card) {
    const state = activeState(card);
    const constant = constants[state.constant];
    const step = constant.steps[state.step];
    const group = groups[card];
    const index = group.items.findIndex(item => item.id === state.constant);
    const progress = 'Ejemplo ' + (index + 1) + ' de 3 · ' + group.items[index].difficulty + ' · ';
    return '<p class="constant-derivation-progress">' + progress + escapeHTML(constant.name) + ' · Paso ' + (state.step + 1) + ' de ' + constant.steps.length + '</p>' +
      (constant.question ? '<div class="constant-derivation-prompt"><p>' + constant.question + '</p></div>' : '') +
      '<h5>' + step.title + '</h5><p>' + step.text + '</p>' +
      '<div class="constant-derivation-equations">' + step.equations.map(tex => '<div>' + math(tex) + '</div>').join('') + '</div>' +
      (step.dimension ? '<dl class="constant-derivation-result"><div><dt>' + escapeHTML(step.dimensionLabel || 'Dimensión') + '</dt><dd>' + math(step.dimension) + '</dd></div>' +
        (step.unit ? '<div><dt>' + escapeHTML(step.unitLabel || 'Unidad SI') + '</dt><dd>' + math(step.unit) + '<span class="constant-derivation-unit-name">' + step.unitName + '</span></dd></div>' : '') + '</dl>' : '') +
      '<p class="constant-derivation-hint">' + step.hint + '</p>';
  }
  function render(example) {
    if (!example || !cards.includes(example.interactive)) return '';
    const card = example.interactive;
    const id = 'constant-derivation-' + card;
    const state = activeState(card);
    const control = ' data-card="' + card + '" aria-controls="' + id + '-panel"';
    return '<section class="constant-derivation" id="' + id + '" aria-labelledby="' + id + '-title">' +
      '<p class="constant-derivation-eyebrow">Ejemplo interactivo · paso a paso</p>' +
      '<h4 id="' + id + '-title">' + escapeHTML(example.title) + '</h4>' +
      '<div class="constant-derivation-question">' + example.question + '</div>' +
      '<div class="constant-derivation-selector constant-derivation-selector-constants" role="group" aria-label="Elige un ejemplo, de menor a mayor dificultad">' +
        groups[card].items.map((item, index) => '<button type="button" data-action="constant-derivation-select"' + control + ' data-constant="' + item.id + '" aria-pressed="' + (state.constant === item.id) + '">' + (index + 1) + '. ' + item.label + ' · ' + item.difficulty + '</button>').join('') + '</div>' +
      '<div class="constant-derivation-panel" id="' + id + '-panel" role="region" aria-label="Resolución paso a paso" aria-live="polite" aria-atomic="true">' + panelHTML(card) + '</div>' +
      '<div class="constant-derivation-navigation" role="group" aria-label="Recorrer la resolución">' +
      '<button type="button" data-action="constant-derivation-previous"' + control + (state.step === 0 ? ' disabled' : '') + '>Anterior</button>' +
      '<button type="button" class="constant-derivation-next" data-action="constant-derivation-next"' + control + (state.step === state.lastStep ? ' disabled' : '') + '>Siguiente</button>' +
      '<button type="button" data-action="constant-derivation-restart"' + control + (state.step === 0 ? ' disabled' : '') + '>Reiniciar</button>' +
      '</div></section>';
  }
  function update(root, card, button) {
    const state = activeState(card);
    const panel = root.querySelector('#constant-derivation-' + card + '-panel');
    const previous = root.querySelector('[data-action="constant-derivation-previous"]');
    const next = root.querySelector('[data-action="constant-derivation-next"]');
    const restart = root.querySelector('[data-action="constant-derivation-restart"]');
    const hadFocus = document.activeElement === button;
    panel.innerHTML = panelHTML(card);
    root.querySelectorAll('[data-action="constant-derivation-select"]').forEach(choice => {
      choice.setAttribute('aria-pressed', String(choice.dataset.constant === state.constant));
    });
    if (previous) previous.disabled = state.step === 0;
    if (next) next.disabled = state.step === state.lastStep;
    if (restart) restart.disabled = state.step === 0;
    if (typeof window.renderMathInElement === 'function') {
      window.renderMathInElement(panel, {
        delimiters: [{ left: '\\(', right: '\\)', display: false }],
        throwOnError: false,
        trust: false
      });
    }
    // Retain mounted controls; transfer focus only if its button becomes disabled.
    if (hadFocus && button.disabled) {
      const target = state.step === state.lastStep ? previous : next;
      if (target && typeof target.focus === 'function') target.focus();
    }
  }
  function handleAction(button) {
    if (!button || !button.dataset || button.disabled) return false;
    const { action, card } = button.dataset;
    if (!cards.includes(card) || !['constant-derivation-select', 'constant-derivation-next', 'constant-derivation-previous', 'constant-derivation-restart'].includes(action)) return false;
    const root = button.closest('#constant-derivation-' + card);
    if (!root || !root.querySelector('#constant-derivation-' + card + '-panel')) return false;
    if (action === 'constant-derivation-select') {
      if (!session.select(button.dataset.constant, card)) return false;
    } else if (action === 'constant-derivation-next') session.next(card);
    else if (action === 'constant-derivation-previous') session.previous(card);
    else session.restart(card);
    update(root, card, button);
    return true;
  }
  function reset() { return session.reset(); }
  window.ConstantDerivations = Object.freeze({ render, handleAction, reset, createSession });
})();
