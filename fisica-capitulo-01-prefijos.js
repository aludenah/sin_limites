(function () {
  'use strict';

  const items = Object.freeze([
    { id: 'pico', name: 'pico', symbol: 'p', exponent: -12 },
    { id: 'nano', name: 'nano', symbol: 'n', exponent: -9 },
    { id: 'micro', name: 'micro', symbol: 'µ', exponent: -6 },
    { id: 'mili', name: 'mili', symbol: 'm', exponent: -3 },
    { id: 'centi', name: 'centi', symbol: 'c', exponent: -2 },
    { id: 'kilo', name: 'kilo', symbol: 'k', exponent: 3 },
    { id: 'mega', name: 'mega', symbol: 'M', exponent: 6 },
    { id: 'giga', name: 'giga', symbol: 'G', exponent: 9 }
  ].map(item => Object.freeze(item)));
  const noPrefix = Object.freeze({ id: 'none', name: 'Sin prefijo', symbol: '', exponent: 0 });
  const choices = [...items.slice(0, 5), noPrefix, ...items.slice(5)];
  const units = Object.freeze({ m: 'metro (m)', g: 'gramo (g)', s: 'segundo (s)' });
  const initial = () => ({ value: '1', from: 'kilo', to: 'none', unit: 'm' });
  let state = initial();
  const escapeHTML = text => String(text).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
  const findPrefix = id => choices.find(item => item.id === id);
  const superscript = value => String(value).replace(/[-\d]/g, char => ({ '-': '⁻', '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴', '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹' }[char]));

  // Keep decimal digits as text: multiplying by a power of ten is exact.
  // Returns { negative, digits, exponent }, or null for an incomplete/invalid input.
  function parseNumber(raw) {
    if (typeof raw !== 'string' && typeof raw !== 'number') return null;
    const text = String(raw).trim();
    if (!text || text.length > 80) return null;
    const match = /^([+-]?)(?:(\d+)(?:[.,](\d+))?|[.,](\d+))(?:[eE]([+-]?\d+))?$/.exec(text);
    if (!match) return null;
    const power = Number(match[5] || 0);
    if (!Number.isInteger(power) || Math.abs(power) > 300) return null;
    const fraction = match[3] || match[4] || '';
    let digits = ((match[2] || '') + fraction).replace(/^0+/, '');
    if (!digits) return { negative: false, digits: '0', exponent: 0 };
    let exponent = power - fraction.length;
    while (digits.endsWith('0')) { digits = digits.slice(0, -1); exponent++; }
    return { negative: match[1] === '-', digits, exponent };
  }

  function formatDecimal(decimal) {
    if (decimal.digits === '0') return '0';
    const sign = decimal.negative ? '−' : '';
    const position = decimal.digits.length + decimal.exponent;
    if (position > 12 || position <= -6 || decimal.digits.length > 16) {
      const mantissa = decimal.digits[0] + (decimal.digits.length > 1 ? ',' + decimal.digits.slice(1) : '');
      return sign + mantissa + ' × 10' + superscript(position - 1);
    }
    const plain = position <= 0 ? '0.' + '0'.repeat(-position) + decimal.digits
      : position >= decimal.digits.length ? decimal.digits + '0'.repeat(position - decimal.digits.length)
      : decimal.digits.slice(0, position) + '.' + decimal.digits.slice(position);
    const parts = plain.split('.');
    return sign + parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '\u202f') + (parts[1] ? ',' + parts[1] : '');
  }

  // Format an input after an integer power-of-ten shift; null signals invalid input.
  function formatNumber(raw, shift = 0) {
    const decimal = parseNumber(raw);
    if (!decimal || !Number.isInteger(shift) || Math.abs(shift) > 600) return null;
    return formatDecimal({ ...decimal, exponent: decimal.exponent + shift });
  }

  // Return a formatted exact conversion, or null for an invalid value/prefix.
  function convert(raw, fromId, toId) {
    const from = findPrefix(fromId), to = findPrefix(toId);
    return from && to ? formatNumber(raw, from.exponent - to.exponent) : null;
  }

  function detailHTML() {
    const item = findPrefix(state.from);
    const symbol = item.symbol + state.unit;
    return '<h5 class="prefix-explorer-name">' + escapeHTML(item.name) + '</h5>' +
      '<dl class="prefix-explorer-facts"><div><dt>Símbolo del prefijo</dt><dd>' + (item.symbol ? escapeHTML(item.symbol) : 'Ninguno') + '</dd></div>' +
      '<div><dt>Factor</dt><dd>10<sup>' + item.exponent + '</sup></dd></div>' +
      '<div><dt>Equivalencia</dt><dd>1 ' + escapeHTML(symbol) + ' = ' + escapeHTML(formatNumber('1', item.exponent)) + ' ' + state.unit + '</dd></div></dl>' +
      '<p class="prefix-explorer-rule">' + (item.exponent === 0 ? 'Sin prefijo, el factor es 1: la unidad conserva su valor.'
        : 'Para pasar de ' + escapeHTML(symbol) + ' a ' + state.unit + ', multiplica por 10<sup>' + item.exponent + '</sup>.') + '</p>';
  }

  function resultHTML() {
    const from = findPrefix(state.from), to = findPrefix(state.to);
    const converted = convert(state.value, state.from, state.to);
    if (converted === null) return '<span class="prefix-explorer-error">Escribe un número completo. Puedes usar coma o punto decimal; por ejemplo, 2,5.</span>';
    return '<strong>' + escapeHTML(formatNumber(state.value)) + ' ' + escapeHTML(from.symbol + state.unit) + ' = ' + escapeHTML(converted) + ' ' + escapeHTML(to.symbol + state.unit) + '</strong>' +
      '<span>El valor numérico se multiplica por 10<sup>' + (from.exponent - to.exponent) + '</sup> (' + from.exponent + ' − (' + to.exponent + ')). La cantidad física es la misma.</span>';
  }

  function options(selected) {
    return choices.map(item => '<option value="' + item.id + '"' + (item.id === selected ? ' selected' : '') + '>' + escapeHTML(item.name + (item.symbol ? ' (' + item.symbol + ')' : '')) + '</option>').join('');
  }

  function render() {
    return '<section class="prefix-explorer" id="prefix-explorer" aria-label="Explorador interactivo de prefijos">' +
      '<p class="prefix-explorer-instruction">Selecciona un prefijo para descubrir su factor y prueba tus propias conversiones.</p>' +
      '<div class="prefix-explorer-choices" role="group" aria-label="Prefijo de origen">' +
      items.map(item => '<button type="button" data-action="prefix-explorer-select" data-prefix="' + item.id + '" aria-pressed="' + (item.id === state.from) + '" aria-controls="prefix-explorer-detail prefix-explorer-result"><strong>' + escapeHTML(item.symbol) + '</strong><span>' + item.name + '</span><small>10<sup>' + item.exponent + '</sup></small></button>').join('') +
      '</div><div class="prefix-explorer-detail" id="prefix-explorer-detail" role="region" aria-label="Detalle del prefijo" aria-live="polite" aria-atomic="true">' + detailHTML() + '</div>' +
      '<p class="prefix-explorer-case"><strong>Atención a las mayúsculas:</strong> m significa mili (10<sup>−3</sup>) y M significa mega (10<sup>6</sup>). Como unidad, m también es el símbolo del metro; en mm, la primera m es el prefijo.</p>' +
      '<div class="prefix-explorer-converter"><h5>Prueba una conversión</h5>' +
      '<div class="prefix-explorer-fields"><div><label for="prefix-explorer-value">Valor</label><input id="prefix-explorer-value" data-action="prefix-explorer-value" type="text" inputmode="decimal" maxlength="40" autocomplete="off" spellcheck="false" value="' + escapeHTML(state.value) + '" aria-describedby="prefix-explorer-value-hint" aria-invalid="' + (parseNumber(state.value) === null) + '"></div>' +
      '<div><label for="prefix-explorer-unit">Unidad sin prefijo</label><select id="prefix-explorer-unit" data-action="prefix-explorer-unit">' + Object.keys(units).map(unit => '<option value="' + unit + '"' + (state.unit === unit ? ' selected' : '') + '>' + units[unit] + '</option>').join('') + '</select></div>' +
      '<div><label for="prefix-explorer-from">Prefijo de origen</label><select id="prefix-explorer-from" data-action="prefix-explorer-from">' + options(state.from) + '</select></div>' +
      '<div><label for="prefix-explorer-to">Prefijo de destino</label><select id="prefix-explorer-to" data-action="prefix-explorer-to">' + options(state.to) + '</select></div></div>' +
      '<p id="prefix-explorer-value-hint" class="prefix-explorer-hint">Admite coma o punto decimal. Escribe los números sin separadores de miles.</p>' +
      '<div id="prefix-explorer-result" class="prefix-explorer-result" role="status" aria-live="polite" aria-atomic="true">' + resultHTML() + '</div>' +
      '<p id="prefix-explorer-mass-note" class="prefix-explorer-mass-note"' + (state.unit === 'g' ? '' : ' hidden') + '>En masa, los prefijos se añaden a g (por ejemplo, mg y kg). La unidad base del SI para la masa es el kilogramo, kg.</p>' +
      '</div></section>';
  }

  function update(root, updateDetail) {
    const result = root.querySelector('#prefix-explorer-result');
    if (result) result.innerHTML = resultHTML();
    const input = root.querySelector('#prefix-explorer-value');
    if (input) input.setAttribute('aria-invalid', String(parseNumber(state.value) === null));
    if (!updateDetail) return;
    const detail = root.querySelector('#prefix-explorer-detail');
    if (detail) detail.innerHTML = detailHTML();
    root.querySelectorAll('[data-action="prefix-explorer-select"]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.prefix === state.from)));
    const from = root.querySelector('#prefix-explorer-from');
    if (from) from.value = state.from;
    const note = root.querySelector('#prefix-explorer-mass-note');
    if (note) note.hidden = state.unit !== 'g';
  }

  function handleAction(button) {
    if (!button || !button.dataset || button.disabled || button.dataset.action !== 'prefix-explorer-select') return false;
    const item = items.find(entry => entry.id === button.dataset.prefix);
    const root = button.closest('#prefix-explorer');
    if (!item || !root) return false;
    state.from = item.id;
    update(root, true);
    return true;
  }

  function handleInput(input) {
    if (!input || !input.dataset || input.disabled) return false;
    const field = ({ 'prefix-explorer-value': 'value', 'prefix-explorer-from': 'from', 'prefix-explorer-to': 'to', 'prefix-explorer-unit': 'unit' })[input.dataset.action];
    if (!field) return false;
    const root = input.closest('#prefix-explorer');
    if (!root) return false;
    if (field === 'unit' && !Object.prototype.hasOwnProperty.call(units, input.value)) return false;
    if ((field === 'from' || field === 'to') && !findPrefix(input.value)) return false;
    state[field] = input.value;
    // Only results and details change; all focused controls remain mounted.
    update(root, field === 'from' || field === 'unit');
    return true;
  }

  function reset() { state = initial(); }
  window.PrefixExplorer = Object.freeze({ items, render, handleAction, handleInput, reset, parseNumber, convert, formatNumber });
})();
