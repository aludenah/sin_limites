(function (global) {
  'use strict';

  /* Quasistatic teaching model; all inputs and outputs use SI units.
     Magnet: each turn samples the same smooth axial flux profile,
       Phi(x) = p B0 A [1 + (x / s)^2]^(-3/2).
     This is a prescribed flux profile, not a full 3D field solution for a
     particular magnet or coil. The winding is ideal, the load purely resistive;
     self-inductance, transients, eddy currents and radiation are omitted.
     Generator: a rigid N-turn loop rotates at angular speed omega in a uniform
     field; theta is the angle between B and the positive surface normal.
       Phi = B A cos(theta), epsilon = -N dPhi/dt.
     Positive current follows the winding orientation associated with the
     positive surface normal. Opening the circuit removes conduction current,
     not induced emf. An external agent supplies the mechanical energy.
  */
  const TAU = 2 * Math.PI;
  const DEFAULTS = Object.freeze({
    position: -.15, velocity: 0, turns: 150, polarity: 1,
    resistance: 30, closed: true, field: .08, area: .005, scale: .09,
    angle: 0, angularSpeed: TAU
  });
  const LIMITS = Object.freeze({
    position: Object.freeze([-.25, .25]),
    velocity: Object.freeze([-.5, .5]),
    turns: Object.freeze([50, 300]),
    resistance: Object.freeze([10, 100]),
    field: Object.freeze([0, .2]),
    area: Object.freeze([.001, .02]),
    scale: Object.freeze([.03, .2]),
    angularSpeed: Object.freeze([-6 * TAU, 6 * TAU])
  });
  const ASSUMPTIONS = Object.freeze({
    model: 'Flujo prescrito y circuito resistivo ideal en régimen cuasiestático.',
    sameFluxInEveryTurn: true,
    selfInductance: false,
    fieldReaction: false,
    generatorField: 'uniforme',
    mechanicalDrive: 'externo',
    units: 'SI'
  });
  function bounded(value, key) {
    const n = typeof value === 'number' && Number.isFinite(value) ? value : DEFAULTS[key];
    const bounds = LIMITS[key];
    return Math.max(bounds[0], Math.min(bounds[1], n));
  }
  function normalizeSettings(input) {
    const source = input && typeof input === 'object' && !Array.isArray(input) ? input : {};
    const angle = typeof source.angle === 'number' && Number.isFinite(source.angle) ? source.angle : DEFAULTS.angle;
    return {
      position: bounded(source.position, 'position'),
      velocity: bounded(source.velocity, 'velocity'),
      turns: Math.round(bounded(source.turns, 'turns')),
      polarity: source.polarity === -1 ? -1 : 1,
      resistance: bounded(source.resistance, 'resistance'),
      closed: typeof source.closed === 'boolean' ? source.closed : DEFAULTS.closed,
      field: bounded(source.field, 'field'),
      area: bounded(source.area, 'area'),
      scale: bounded(source.scale, 'scale'),
      angle: ((angle % TAU) + TAU) % TAU,
      angularSpeed: bounded(source.angularSpeed, 'angularSpeed')
    };
  }
  function result(settings, fluxPerTurn, fluxRatePerTurn) {
    // Canonicalize -0 so stopped and symmetry states display a plain zero.
    const clean = value => value === 0 ? 0 : value;
    const emf = clean(-settings.turns * fluxRatePerTurn);
    const current = clean(settings.closed ? emf / settings.resistance : 0);
    return Object.assign({}, settings, {
      fluxPerTurn: clean(fluxPerTurn),
      fluxLinkage: clean(settings.turns * fluxPerTurn),
      fluxRatePerTurn: clean(fluxRatePerTurn),
      emf,
      current,
      power: current * current * settings.resistance,
      assumptions: ASSUMPTIONS
    });
  }
  function magnet(input) {
    const s = normalizeSettings(input), u = s.position / s.scale;
    const factor = s.polarity * s.field * s.area;
    const fluxPerTurn = factor / Math.pow(1 + u * u, 1.5);
    const fluxGradient = -3 * factor * s.position / (s.scale * s.scale) / Math.pow(1 + u * u, 2.5);
    const output = result(s, fluxPerTurn, fluxGradient * s.velocity);
    output.fluxGradient = fluxGradient; // Wb/m per turn.
    return output;
  }
  function generator(input) {
    const s = normalizeSettings(input), factor = s.field * s.area;
    return result(s, factor * Math.cos(s.angle), -factor * s.angularSpeed * Math.sin(s.angle));
  }
  const api = Object.freeze({
    constants: Object.freeze({TAU, DEFAULTS, LIMITS, ASSUMPTIONS}),
    normalizeSettings, magnet, generator
  });
  if (typeof module === 'object' && module.exports) module.exports = api;
  if (global) global.InductionEngine = api;
})(typeof window !== 'undefined' ? window : typeof globalThis !== 'undefined' ? globalThis : this);
