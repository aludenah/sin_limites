(function () {
  'use strict';

  const labels = Object.freeze({
    density: 'Cuerpo de masa m y volumen V. La densidad relaciona ambas magnitudes.',
    velocity: 'Un mismo móvil pasa de la posición inicial a la final durante un intervalo de tiempo. Su desplazamiento es hacia la derecha.',
    acceleration: 'Un mismo móvil aumenta su velocidad hacia la derecha entre dos instantes. La flecha de velocidad final es más larga que la inicial.',
    force: 'Sobre un cuerpo de masa constante m actúa una fuerza neta hacia la derecha. Su aceleración tiene la misma dirección.'
  });
  const text = (x, y, value, size = 22, color = '#08727b') => '<text x="' + x + '" y="' + y + '" style="font-size:' + size + 'px;fill:' + color + ';text-anchor:middle">' + value.replace(/_([fim])/g, '<tspan baseline-shift="sub" font-size="72%">$1</tspan>') + '</text>';
  const arrow = (x1, y, x2, color = '#00828b') => '<path d="M' + x1 + ' ' + y + 'H' + x2 + 'M' + (x2 - 10) + ' ' + (y - 6) + 'L' + x2 + ' ' + y + 'L' + (x2 - 10) + ' ' + (y + 6) + '" fill="none" stroke="' + color + '" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>';
  const cart = (x, y) => '<rect class="geometry-outline" x="' + x + '" y="' + y + '" width="42" height="27" rx="4"/><circle class="geometry-outline" cx="' + (x + 10) + '" cy="' + (y + 32) + '" r="5"/><circle class="geometry-outline" cx="' + (x + 32) + '" cy="' + (y + 32) + '" r="5"/>';

  function density(step) {
    const dimensions = step >= 2;
    return '<path class="geometry-hidden" d="M133 81V187H288M133 187L91 226"/>' +
      '<path class="geometry-outline" d="M91 120L133 81H288V187L246 226H91ZM91 120H246V226M246 120L288 81"/>' +
      '<path class="geometry-edge" d="M91 120V226H246L288 187"/>' +
      text(170, 179, dimensions ? '[m] = M' : 'm', 25, '#092f4a') +
      text(190, 47, dimensions ? '[V] = L³' : 'Volumen V', 23) +
      '<path class="geometry-guide" d="M190 57V78"/>' +
      text(190, 282, step === 3 ? '[ρ] = ML⁻³' : 'ρ = m / V', 27, '#092f4a');
  }

  function velocity(step) {
    const dimensions = step >= 2;
    return text(82, 32, 'Inicio', 18, '#52697c') + text(286, 32, 'Final', 18, '#52697c') +
      text(184, 70, dimensions ? '[Δx] = L' : 'Δx = x_f − x_i', 22) + arrow(82, 88, 286) +
      cart(61, 118) + cart(265, 118) +
      '<path class="geometry-guide" d="M40 160H338M82 160V174M286 160V174"/>' +
      text(82, 199, 'xᵢ', 23) + text(286, 199, 'x_f', 23) +
      text(184, 237, dimensions ? '[Δt] = T' : 'Δt = t_f − t_i', 22) +
      text(184, 289, step === 3 ? '[v] = LT⁻¹' : 'v_m = Δx / Δt', 25, '#092f4a');
  }

  function acceleration(step) {
    const dimensions = step >= 2;
    return text(83, 30, 'Instante inicial', 18, '#52697c') + text(276, 30, 'Instante final', 18, '#52697c') +
      text(83, 71, dimensions ? '[vᵢ] = LT⁻¹' : 'vᵢ', dimensions ? 20 : 24) +
      text(276, 71, dimensions ? '[v_f] = LT⁻¹' : 'v_f', dimensions ? 20 : 24) +
      arrow(61, 91, 111) + arrow(226, 91, 326) + cart(61, 119) + cart(226, 119) +
      '<path class="geometry-guide" d="M35 161H340"/>' +
      text(82, 191, 'tᵢ', 22) + text(247, 191, 't_f', 22) +
      text(190, 227, dimensions ? '[Δv] = LT⁻¹' : 'Δv = v_f − v_i', 22) +
      text(190, 260, dimensions ? '[Δt] = T' : 'Intervalo Δt', 21) +
      text(190, 302, step === 3 ? '[a] = LT⁻²' : 'a_m = Δv / Δt', 25, '#092f4a');
  }

  function force(step) {
    const dimensions = step >= 2;
    return arrow(88, 66, 198, '#52697c') +
      text(144, 45, dimensions ? '[a] = LT⁻²' : 'a', dimensions ? 22 : 25, '#52697c') +
      '<rect class="geometry-outline" x="74" y="110" width="137" height="108" rx="3"/>' +
      '<path class="geometry-edge" d="M74 218H211"/>' +
      text(142, 173, dimensions ? '[m] = M' : 'm', 25, '#092f4a') +
      arrow(211, 164, 337) + text(279, 143, 'F neta', 24) +
      text(190, 256, 'Masa constante', 19, '#52697c') +
      text(190, 298, step === 3 ? '[F] = MLT⁻²' : 'F neta = ma', 27, '#092f4a');
  }

  const figures = Object.freeze({ density, velocity, acceleration, force });
  function render(shape, step) {
    if (!Object.prototype.hasOwnProperty.call(figures, shape)) return '';
    const currentStep = Number.isInteger(step) ? Math.max(0, Math.min(3, step)) : 0;
    return '<svg class="geometry-derivation-figure" viewBox="0 0 380 320" role="img" aria-label="' + labels[shape] + '" xmlns="http://www.w3.org/2000/svg"><rect width="380" height="320" fill="#fff"/>' + figures[shape](currentStep) + '</svg>';
  }

  window.DimensionalDerivationFigures = Object.freeze({ render });
})();
