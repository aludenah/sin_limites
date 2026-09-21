(function () {
  'use strict';

  const asset = 'assets/fisica-capitulo-01/piedra.svg';
  const items = Object.freeze([
    { id: 'mass', name: 'Masa', instrument: 'Balanza', question: '¿Cuánta masa tiene?', description: 'Colocamos la piedra sobre una balanza ajustada a cero. Su lectura expresa la masa de la piedra.', units: [{ id: 'g', label: 'g', name: 'gramos', value: '162' }, { id: 'kg', label: 'kg', name: 'kilogramos', value: '0,162' }] },
    { id: 'length', name: 'Longitud', instrument: 'Regla', question: '¿Cuánto mide de largo?', description: 'Alineamos un extremo con el cero de la regla y leemos la posición del otro extremo. Medimos la longitud entre esos dos extremos.', units: [{ id: 'cm', label: 'cm', name: 'centímetros', value: '6' }, { id: 'm', label: 'm', name: 'metros', value: '0,06' }] },
    { id: 'volume', name: 'Volumen', instrument: 'Probeta', question: '¿Cuánto espacio ocupa?', description: 'Sumergimos por completo la piedra, sin burbujas y sin derramar agua. El aumento del volumen indicado por la probeta corresponde al volumen de la piedra.', units: [{ id: 'cm3', label: 'cm³', name: 'centímetros cúbicos', value: '60' }, { id: 'm3', label: 'm³', name: 'metros cúbicos', value: '0,000060' }] },
    { id: 'temperature', name: 'Temperatura', instrument: 'Termómetro', question: '¿Cuál es su temperatura?', description: 'Ponemos la sonda del termómetro en contacto con la piedra y esperamos hasta que la lectura se estabilice.', units: [{ id: 'C', label: '°C', name: 'grados Celsius', value: '24' }, { id: 'K', label: 'K', name: 'kelvin', value: '297,15' }] }
  ].map(item => Object.freeze({ ...item, units: Object.freeze(item.units.map(unit => Object.freeze(unit))) })));
  let selected = 'mass';
  let submerged = false;
  let units = { mass: 'g', length: 'cm', volume: 'cm3', temperature: 'C' };

  const escapeHTML = value => String(value).replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[character]));
  const activeItem = () => items.find(item => item.id === selected);
  const activeUnit = item => item.units.find(unit => unit.id === units[item.id]);
  const stone = (x, y, width, height, attributes = '') => '<image href="' + asset + '" x="' + x + '" y="' + y + '" width="' + width + '" height="' + height + '" ' + attributes + '/>';
  const svg = (label, content) => '<svg class="stone-instrument-svg" viewBox="0 0 400 310" role="img" aria-label="' + escapeHTML(label) + '" xmlns="http://www.w3.org/2000/svg">' + content + '</svg>';

  function instrumentHTML(item) {
    const unit = activeUnit(item);
    if (item.id === 'mass') {
      return svg('Piedra sobre una balanza. Lectura: ' + unit.value + ' ' + unit.name + '.',
        '<ellipse cx="200" cy="282" rx="135" ry="9" fill="#eaf0f4"/>' +
        '<path d="M104 220H296L321 263Q322 273 310 273H90Q78 273 79 263Z" fill="#e8eff5" stroke="#54718a" stroke-width="2"/>' +
        '<path d="M164 203V221M236 203V221" stroke="#54718a" stroke-width="7"/>' +
        '<rect x="86" y="188" width="228" height="16" rx="8" fill="#d3dde5" stroke="#54718a" stroke-width="2"/>' +
        stone(60, 37.5, 280, 186.667) +
        '<rect x="141" y="231" width="118" height="29" rx="5" fill="#e1efe8" stroke="#54718a"/>' +
        '<text x="200" y="252" text-anchor="middle" fill="#173c39" font-size="19" font-weight="700">' + escapeHTML(unit.value + ' ' + unit.label) + '</text>' +
        '<circle cx="290" cy="247" r="6" fill="#678ca4"/>');
    }
    if (item.id === 'length') {
      const ticks = Array.from({ length: 31 }, (_, index) => {
        const x = 66 + index * 8;
        const major = index % 5 === 0;
        return '<path d="M' + x + ' 227v' + (major ? 22 : 11) + '" stroke="#5a7082"/>' + (major ? '<text x="' + x + '" y="272" text-anchor="middle" font-size="15" fill="#244664">' + index / 5 + '</text>' : '');
      }).join('');
      return svg('Longitud de la piedra entre los extremos señalados: 6 centímetros. La regla empieza en cero.',
        '<defs><clipPath id="stone-ruler-crop"><rect x="66" y="16" width="240" height="196"/></clipPath></defs>' +
        stone(-15.8, -25, 402.7, 268.467, 'clip-path="url(#stone-ruler-crop)"') +
        '<path d="M66 158V223M306 154V223" stroke="#008994" stroke-width="1.5" stroke-dasharray="4 4"/>' +
        '<path d="M66 210H306M66 205V215M306 205V215" stroke="#008994" stroke-width="2"/>' +
        '<rect x="49" y="227" width="305" height="60" rx="5" fill="#f6efe0" stroke="#b5a47d" stroke-width="1.5"/>' + ticks +
        '<text x="326" y="273" text-anchor="middle" font-size="14" fill="#244664">cm</text>' +
        '<rect x="151" y="194" width="70" height="29" rx="6" fill="#fff"/>' +
        '<text x="186" y="214" text-anchor="middle" font-size="18" font-weight="700" fill="#007d86">6 cm</text>');
    }
    if (item.id === 'volume') {
      const level = submerged ? 86 : 152;
      const marks = Array.from({ length: 11 }, (_, index) => {
        const value = index * 20;
        const y = 262 - index * 22;
        return '<path d="M219 ' + y + 'h25" stroke="#54718a"/>' + (index % 2 === 0 ? '<text x="259" y="' + (y + 5) + '" font-size="13" fill="#244664">' + value + '</text>' : '');
      }).join('');
      return svg(submerged ? 'Piedra completamente sumergida. El nivel del agua subió de 100 a 160 mililitros.' : 'Probeta con 100 mililitros de agua. La piedra está fuera del agua.',
        '<path d="M78 29V260Q78 276 96 276H226Q244 276 244 260V29" fill="#f9fcff" stroke="#6c899f" stroke-width="2.5"/>' +
        '<path d="M81 ' + level + 'H241V260Q241 273 226 273H96Q81 273 81 260Z" fill="#b7e0ed"/>' +
        (submerged ? stone(57, 157, 210, 140) : stone(279, 43, 119, 80)) +
        '<path d="M81 ' + level + 'H241" stroke="#168ba1" stroke-width="2"/>' +
        '<path d="M63 152H252" stroke="#597b98" stroke-dasharray="4 4" opacity=".65"/>' + marks +
        '<text x="259" y="24" font-size="13" fill="#244664">mL</text>' +
        '<path d="M68 29H90M232 29H254M68 280H254" stroke="#6c899f" stroke-width="3"/>' +
        '<rect x="10" y="' + (level - 12) + '" width="57" height="25" rx="5" fill="#fff" stroke="#168ba1"/>' +
        '<text x="38" y="' + (level + 6) + '" text-anchor="middle" font-size="14" fill="#00798a" font-weight="700">' + (submerged ? '160' : '100') + '</text>' +
        (submerged ? '<text x="299" y="163" font-size="12" fill="#54718a">100 mL</text><text x="299" y="180" font-size="12" fill="#54718a">iniciales</text>' : '<text x="339" y="137" text-anchor="middle" font-size="12" fill="#54718a">Piedra fuera</text>'));
    }
    return svg('Sonda de un termómetro en contacto con la piedra. Lectura estable: ' + unit.value + ' ' + unit.name + '.',
      stone(-12, 100, 290, 194) +
      '<path d="M200 184L257 130" stroke="#486277" stroke-width="7" stroke-linecap="round"/>' +
      '<path d="M200 184L257 130" stroke="#d7e1e7" stroke-width="3" stroke-linecap="round"/>' +
      '<path d="M258 132Q237 103 265 75" fill="none" stroke="#375c75" stroke-width="5"/>' +
      '<rect x="249" y="31" width="126" height="102" rx="17" fill="#e7eff5" stroke="#54718a" stroke-width="2"/>' +
      '<rect x="260" y="50" width="104" height="43" rx="6" fill="#e1efe8" stroke="#7e9c99"/>' +
      '<text x="312" y="77" text-anchor="middle" fill="#173c39" font-size="18" font-weight="700">' + escapeHTML(unit.value + ' ' + unit.label) + '</text>' +
      '<circle cx="312" cy="111" r="7" fill="#6d96aa"/>' +
      '<circle cx="198" cy="186" r="5" fill="#008994"/>' +
      '<path d="M198 198V269H278" fill="none" stroke="#008994" stroke-width="1.5"/>' +
      '<text x="284" y="273" fill="#007d86" font-size="13">Contacto</text>');
  }

  function resultHTML(item) {
    const unit = activeUnit(item);
    if (item.id === 'volume' && !submerged) {
      return '<p class="stone-result-label">Volumen de la piedra</p><p class="stone-pending">Sumerge la piedra para medirlo.</p><p class="stone-result-note">Lectura inicial del agua: <strong>100 mL</strong>.</p>';
    }
    return '<p class="stone-result-label">' + escapeHTML(item.name) + ' de la piedra</p>' +
      '<p class="stone-reading">' + escapeHTML(unit.value) + '<span>' + escapeHTML(unit.label) + '</span></p>' +
      '<dl class="stone-result-parts"><div><dt>Magnitud</dt><dd>' + escapeHTML(item.name) + '</dd></div><div><dt>Valor numérico</dt><dd>' + escapeHTML(unit.value) + '</dd></div><div><dt>Unidad</dt><dd>' + escapeHTML(unit.name) + '</dd></div></dl>' +
      (item.id === 'volume' ? '<p class="stone-result-note"><strong>160 mL − 100 mL = 60 mL = 60 cm³</strong><br>El aumento corresponde al espacio que ocupa la piedra.</p>' : '') +
      '<p class="stone-same-measure">La misma medición, expresada en otra unidad.</p>';
  }

  function detailHTML(item) {
    const unit = activeUnit(item);
    return '<div class="stone-scene" id="stone-scene">' + instrumentHTML(item) + '</div><div class="stone-detail-content">' +
      '<span class="stone-instrument-label">' + escapeHTML(item.instrument) + '</span><h4>' + escapeHTML(item.question) + '</h4><p class="stone-description">' + escapeHTML(item.description) + '</p>' +
      (item.id === 'volume' ? '<button class="stone-submerge" type="button" data-action="stone-submerge" aria-pressed="' + submerged + '" aria-controls="stone-scene stone-result">' + (submerged ? 'Sacar piedra' : 'Sumergir piedra') + '</button>' : '') +
      '<div class="stone-unit-row"><span>Expresar en:</span><div class="stone-units" role="group" aria-label="Unidad de ' + escapeHTML(item.name.toLowerCase()) + '">' + item.units.map(choice => '<button type="button" data-action="stone-unit" data-unit="' + choice.id + '" aria-label="Expresar en ' + escapeHTML(choice.name) + '" aria-pressed="' + (choice.id === unit.id) + '" aria-controls="stone-scene stone-result">' + escapeHTML(choice.label) + '</button>').join('') + '</div></div>' +
      '<div class="stone-result" id="stone-result" role="status" aria-live="polite" aria-atomic="true">' + resultHTML(item) + '</div></div>';
  }

  function render() {
    return '<section class="stone-explorer" id="stone-explorer" aria-labelledby="stone-title">' +
      '<header class="stone-header"><span class="stone-kicker">Explora y mide</span><h3 id="stone-title">¿Qué podemos medir en una piedra?</h3><p>Toca una magnitud para descubrir cómo medirla. Cambia la unidad y compara la lectura.</p></header>' +
      '<div class="stone-map" role="group" aria-label="Elige una magnitud de la piedra"><img class="stone-overview" src="' + asset + '" width="600" height="400" alt="Piedra irregular con magnitudes que podemos medir" loading="lazy">' +
      items.map(item => '<button type="button" class="stone-choice stone-choice-' + item.id + '" data-action="stone-select" data-id="' + item.id + '" aria-pressed="' + (selected === item.id) + '" aria-controls="stone-detail"><strong>' + escapeHTML(item.name) + '</strong><span>' + escapeHTML(item.instrument) + '</span></button>').join('') + '</div>' +
      '<div class="stone-detail" id="stone-detail" role="region" aria-label="Medición de la magnitud seleccionada">' + detailHTML(activeItem()) + '</div><p class="stone-example-note">Mediciones de ejemplo.</p></section>';
  }

  function updateMeasurement(root, item) {
    const scene = root.querySelector('#stone-scene');
    const result = root.querySelector('#stone-result');
    if (scene) scene.innerHTML = instrumentHTML(item);
    if (result) result.innerHTML = resultHTML(item);
    root.querySelectorAll('[data-action="stone-unit"]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.unit === units[item.id])));
    const submergeButton = root.querySelector('[data-action="stone-submerge"]');
    if (submergeButton) {
      submergeButton.textContent = submerged ? 'Sacar piedra' : 'Sumergir piedra';
      submergeButton.setAttribute('aria-pressed', String(submerged));
    }
  }

  function handleAction(button) {
    if (!button || !button.dataset || button.disabled || typeof button.closest !== 'function') return false;
    const action = button.dataset.action;
    if (!['stone-select', 'stone-unit', 'stone-submerge'].includes(action)) return false;
    const root = button.closest('#stone-explorer');
    const panel = root && root.querySelector('#stone-detail');
    if (!panel) return false;
    if (action === 'stone-select') {
      const item = items.find(entry => entry.id === button.dataset.id);
      if (!item) return false;
      if (selected === item.id) return true;
      selected = item.id;
      root.querySelectorAll('[data-action="stone-select"]').forEach(choice => choice.setAttribute('aria-pressed', String(choice.dataset.id === selected)));
      panel.innerHTML = detailHTML(item);
      return true;
    }
    const item = activeItem();
    if (action === 'stone-unit') {
      if (!item.units.some(unit => unit.id === button.dataset.unit)) return false;
      units[item.id] = button.dataset.unit;
    } else {
      if (item.id !== 'volume') return false;
      submerged = !submerged;
    }
    // Keep the pressed control mounted so keyboard focus does not disappear.
    updateMeasurement(root, item);
    return true;
  }

  function reset() {
    selected = 'mass';
    submerged = false;
    units = { mass: 'g', length: 'cm', volume: 'cm3', temperature: 'C' };
  }
  function getState() { return { selected, submerged, units: { ...units } }; }
  window.StoneExplorer = Object.freeze({ items, render, handleAction, reset, getState });
})();
