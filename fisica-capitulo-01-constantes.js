(function () {
  'use strict';

  const escapeHTML = value => String(value).replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[character]));
  const math = tex => '\\(' + escapeHTML(tex) + '\\)';
  const cards = ['spring', 'gravity-planck', 'friction', 'sine'];
  const constants = Object.freeze({
    spring: {
      name: 'Constante de un resorte',
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
      steps: [
        {
          title: 'Identifica la relación y las magnitudes',
          text: 'El coeficiente de rozamiento cinético μₖ es el cociente entre el módulo de la fuerza de rozamiento cinético Fᵣ y el módulo de la fuerza normal Fₙ, con Fₙ mayor que cero. Ambas son fuerzas.',
          equations: ['\\mu_k=\\frac{F_r}{F_N}', '[F_r]=[F_N]=MLT^{-2}'],
          hint: 'Comparamos dos magnitudes de la misma naturaleza: fuerza entre fuerza.'
        },
        {
          title: 'Sustituye por dimensiones',
          text: 'Escribe la dimensión del cociente y reemplaza cada fuerza por MLT⁻².',
          equations: ['[\\mu_k]=\\frac{[F_r]}{[F_N]}', '[\\mu_k]=\\frac{MLT^{-2}}{MLT^{-2}}'],
          hint: 'El numerador y el denominador contienen exactamente los mismos factores dimensionales.'
        },
        {
          title: 'Cancela los factores dimensionales',
          text: 'Al dividir las potencias de cada base, restamos exponentes iguales. Todos quedan en cero; por tanto, el producto es uno.',
          equations: ['[\\mu_k]=M^{1-1}L^{1-1}T^{-2-(-2)}', '[\\mu_k]=M^0L^0T^0=1'],
          hint: 'El coeficiente es adimensional: tiene dimensión uno. Esto no determina su valor numérico.'
        },
        {
          title: 'Distingue dimensión y valor numérico',
          text: 'Si el rozamiento cinético es 30 N y la fuerza normal es 100 N, las unidades se cancelan al dividir. El coeficiente vale 0,30 y su dimensión es uno.',
          equations: ['F_r=30\\,\\mathrm N,\\qquad F_N=100\\,\\mathrm N', '\\mu_k=\\frac{30\\,\\mathrm N}{100\\,\\mathrm N}=0{,}30', '[\\mu_k]=1'],
          dimension: '1',
          unit: '1',
          unitName: 'uno; se omite al escribir el valor',
          hint: 'Dimensión uno no significa valor numérico uno. Escribimos μₖ = 0,30, sin añadir un símbolo de unidad.'
        }
      ]
    },
    sine: {
      name: 'Dimensión del seno y de su argumento',
      steps: [
        {
          title: 'Identifica la relación y las magnitudes',
          text: 'Una oscilación se describe mediante y = A sen(2πt/τ). La amplitud A es una longitud, t es el tiempo y τ es el período, que es mayor que cero.',
          equations: ['y=A\\sin\\!\\left(\\frac{2\\pi t}{\\tau}\\right)', '[A]=L', '[t]=[\\tau]=T'],
          hint: 'τ representa el período de la oscilación; T representa la dimensión de tiempo.'
        },
        {
          title: 'Analiza el argumento del seno',
          text: 'Llama φ al argumento. Los números 2 y π tienen dimensión uno; el cociente entre el tiempo y el período también tiene dimensión uno.',
          equations: ['\\varphi=\\frac{2\\pi t}{\\tau}', '[2]=[\\pi]=1', '[\\varphi]=\\frac{[2][\\pi][t]}{[\\tau]}', '[\\varphi]=\\frac{1\\cdot1\\cdot T}{T}=1'],
          hint: 'El argumento es un ángulo expresado en radianes. El radián es una unidad de dimensión uno.'
        },
        {
          title: 'Deduce la dimensión de la expresión',
          text: 'El seno de un argumento válido es un número de dimensión uno. Multiplicarlo por la amplitud conserva la dimensión de longitud.',
          equations: ['[\\sin\\varphi]=1', '[y]=[A][\\sin\\varphi]', '[y]=L\\cdot1=L'],
          hint: 'La amplitud aporta la dimensión de longitud; el seno aporta un factor adimensional.'
        },
        {
          title: 'Comprueba con valores numéricos',
          text: 'Toma A = 0,20 m, t = 1 s y τ = 12 s. El argumento es π/6 rad, su seno vale 1/2 y el desplazamiento es 0,10 m.',
          equations: ['\\varphi=\\frac{2\\pi(1\\,\\mathrm s)}{12\\,\\mathrm s}=\\frac{\\pi}{6}\\,\\mathrm{rad}', '\\sin\\varphi=\\sin\\!\\left(\\frac{\\pi}{6}\\right)=\\frac12', 'y=(0{,}20\\,\\mathrm m)\\frac12=0{,}10\\,\\mathrm m', '[\\sin\\varphi]=1,\\qquad[y]=L'],
          dimension: 'L',
          unit: '\\mathrm m',
          unitName: 'metro, unidad del desplazamiento y',
          hint: 'El seno vale 1/2, pero tiene dimensión uno. El desplazamiento y conserva dimensión L y se expresa en metros.'
        }
      ]
    }
  });

  function createSession() {
    let state = { spring: 0, gravityPlanck: 'gravity', gravity: 0, planck: 0, friction: 0, sine: 0 };
    const snapshot = () => ({ ...state });
    const active = card => card === 'gravity-planck' ? state.gravityPlanck : card;
    function move(card, change) {
      if (!cards.includes(card)) return false;
      const key = active(card);
      state[key] = Math.max(0, Math.min(3, change(state[key])));
      return snapshot();
    }
    return Object.freeze({
      snapshot,
      select(value) {
        if (value !== 'gravity' && value !== 'planck') return false;
        state.gravityPlanck = value;
        return snapshot();
      },
      next: card => move(card, step => step + 1),
      previous: card => move(card, step => step - 1),
      restart: card => move(card, () => 0),
      reset() {
        state = { spring: 0, gravityPlanck: 'gravity', gravity: 0, planck: 0, friction: 0, sine: 0 };
        return snapshot();
      }
    });
  }

  const session = createSession();
  function activeState(card) {
    const state = session.snapshot();
    const constant = card === 'gravity-planck' ? state.gravityPlanck : card;
    return { constant, step: state[constant] };
  }
  function panelHTML(card) {
    const state = activeState(card);
    const constant = constants[state.constant];
    const step = constant.steps[state.step];
    return '<p class="constant-derivation-progress">' + escapeHTML(constant.name) + ' · Paso ' + (state.step + 1) + ' de 4</p>' +
      '<h5>' + step.title + '</h5><p>' + step.text + '</p>' +
      '<div class="constant-derivation-equations">' + step.equations.map(tex => '<div>' + math(tex) + '</div>').join('') + '</div>' +
      (step.dimension ? '<dl class="constant-derivation-result"><div><dt>Dimensión</dt><dd>' + math(step.dimension) + '</dd></div>' +
        '<div><dt>Unidad SI</dt><dd>' + math(step.unit) + '<span class="constant-derivation-unit-name">' + step.unitName + '</span></dd></div></dl>' : '') +
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
      (card === 'gravity-planck' ? '<div class="constant-derivation-selector" role="group" aria-label="Elige la constante que deseas deducir">' +
        ['gravity', 'planck'].map(key => '<button type="button" data-action="constant-derivation-select"' + control + ' data-constant="' + key + '" aria-pressed="' + (state.constant === key) + '">' + constants[key].name + '</button>').join('') + '</div>' : '') +
      '<div class="constant-derivation-panel" id="' + id + '-panel" role="region" aria-label="Resolución paso a paso" aria-live="polite" aria-atomic="true">' + panelHTML(card) + '</div>' +
      '<div class="constant-derivation-navigation" role="group" aria-label="Recorrer la resolución">' +
      '<button type="button" data-action="constant-derivation-previous"' + control + (state.step === 0 ? ' disabled' : '') + '>Anterior</button>' +
      '<button type="button" class="constant-derivation-next" data-action="constant-derivation-next"' + control + (state.step === 3 ? ' disabled' : '') + '>Siguiente</button>' +
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
    if (next) next.disabled = state.step === 3;
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
      const target = state.step === 3 ? previous : next;
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
      if (card !== 'gravity-planck' || !session.select(button.dataset.constant)) return false;
    } else if (action === 'constant-derivation-next') session.next(card);
    else if (action === 'constant-derivation-previous') session.previous(card);
    else session.restart(card);
    update(root, card, button);
    return true;
  }
  function reset() { return session.reset(); }
  window.ConstantDerivations = Object.freeze({ render, handleAction, reset, createSession });
})();
