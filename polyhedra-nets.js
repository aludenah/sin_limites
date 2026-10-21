/* Rigid hinged developments for the cube and square pyramid.
 * amount = 0: closed model; amount = 1: a non-overlapping net in z = -1.
 * Each polygon keeps the original engine face ID and vertex order.
 */
(function (root, factory) {
  'use strict';
  if (typeof module === 'object' && module.exports) {
    module.exports = factory(function () { return require('./polyhedra-engine.js'); });
  } else {
    root.PolyhedraNets = factory(function () { return root.PolyhedraEngine; });
  }
})(typeof window !== 'undefined' ? window : globalThis, function (getEngine) {
  'use strict';
  const EPS = 1e-9;
  const supported = Object.freeze(['cube', 'pyramid']);
  const plans = new WeakMap();
  const sub = (a, b) => a.map((x, i) => x - b[i]);
  const dot = (a, b) => a.reduce((sum, x, i) => sum + x * b[i], 0);
  const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
  const norm = v => Math.hypot(...v);
  const unit = v => { const length = norm(v); if (length < EPS) throw new RangeError('La geometría contiene un eje o una cara degenerados.'); return v.map(x => x / length); };

  function modelOf(value) {
    let model = value;
    if (typeof value === 'string') {
      const engine = getEngine();
      if (!engine || typeof engine.getModel !== 'function') throw new Error('El motor de poliedros debe cargarse antes del desarrollo.');
      model = engine.getModel(value);
    }
    if (!model || !supported.includes(model.id)) throw new RangeError('El desarrollo está disponible para el cubo y la pirámide cuadrangular.');
    if (!Array.isArray(model.vertices) || !Array.isArray(model.faces)) throw new TypeError('El modelo necesita vértices y caras.');
    return model;
  }

  function faceNormal(model, face, center) {
    const points = face.vertices.map(i => model.vertices[i]);
    let normal = [0, 0, 0];
    for (let i = 0; i < points.length; i++) {
      const current = points[i], next = points[(i + 1) % points.length];
      normal[0] += (current[1] - next[1]) * (current[2] + next[2]);
      normal[1] += (current[2] - next[2]) * (current[0] + next[0]);
      normal[2] += (current[0] - next[0]) * (current[1] + next[1]);
    }
    normal = unit(normal);
    const faceCenter = [0, 1, 2].map(k => points.reduce((sum, p) => sum + p[k], 0) / points.length);
    if (dot(normal, sub(faceCenter, center)) < 0) normal = normal.map(x => -x);
    return normal;
  }

  function planOf(model) {
    if (plans.has(model)) return plans.get(model);
    const expected = model.id === 'cube' ? [8, 6] : [5, 5];
    if (model.vertices.length !== expected[0] || model.faces.length !== expected[1]) throw new RangeError('El modelo no corresponde al desarrollo seleccionado.');
    for (const p of model.vertices) if (!Array.isArray(p) || p.length !== 3 || !p.every(Number.isFinite)) throw new TypeError('Los vértices deben tener tres coordenadas finitas.');
    const ids = new Set();
    for (const face of model.faces) {
      if (!face || typeof face.id !== 'string' || ids.has(face.id) || !Array.isArray(face.vertices) || face.vertices.length < 3 || !face.vertices.every(i => Number.isInteger(i) && i >= 0 && i < model.vertices.length)) throw new TypeError('Cada cara necesita un identificador único y vértices válidos.');
      ids.add(face.id);
    }
    const onPlane = (face, axis, coordinate) => face.vertices.every(i => Math.abs(model.vertices[i][axis] - coordinate) < EPS);
    const base = model.faces.find(face => onPlane(face, 2, -1));
    const lid = model.id === 'cube' ? model.faces.find(face => onPlane(face, 2, 1)) : null;
    const lidParent = model.id === 'cube' ? model.faces.find(face => onPlane(face, 0, 1)) : null;
    if (!base || (model.id === 'cube' && (!lid || !lidParent))) throw new RangeError('Las coordenadas del modelo no corresponden al desarrollo canónico.');
    const center = [0, 1, 2].map(k => model.vertices.reduce((sum, p) => sum + p[k], 0) / model.vertices.length);
    const normals = new Map(model.faces.map(face => [face.id, faceNormal(model, face, center)]));
    const links = new Map();
    for (const face of model.faces) {
      if (face === base) continue;
      const parent = face === lid ? lidParent : base;
      const shared = face.vertices.filter(i => parent.vertices.includes(i)).sort((a, b) => a - b);
      if (shared.length !== 2) throw new RangeError('Dos caras consecutivas del desarrollo deben compartir una arista.');
      const origin = model.vertices[shared[0]], axis = unit(sub(model.vertices[shared[1]], origin));
      const childNormal = normals.get(face.id), parentNormal = normals.get(parent.id);
      const angle = Math.atan2(dot(axis, cross(childNormal, parentNormal)), Math.max(-1, Math.min(1, dot(childNormal, parentNormal))));
      links.set(face.id, {child: face.id, parent: parent.id, vertices: shared, origin, axis, angle});
    }
    const chains = new Map();
    for (const face of model.faces) {
      const chain = [];
      let id = face.id;
      while (links.has(id)) { const link = links.get(id); chain.push(link); id = link.parent; }
      chains.set(face.id, chain);
    }
    const plan = {base: base.id, links, chains};
    plans.set(model, plan);
    return plan;
  }

  function rotate(point, hinge, amount) {
    const v = sub(point, hinge.origin), theta = hinge.angle * amount, cosine = Math.cos(theta), sine = Math.sin(theta);
    const perpendicular = cross(hinge.axis, v), along = dot(hinge.axis, v);
    return v.map((x, i) => hinge.origin[i] + x * cosine + perpendicular[i] * sine + hinge.axis[i] * along * (1 - cosine));
  }

  function unfold(value, amount) {
    if (typeof amount !== 'number' || !Number.isFinite(amount)) throw new TypeError('La apertura debe ser un número finito.');
    if (amount < 0 || amount > 1) throw new RangeError('La apertura debe estar entre 0 y 1.');
    const model = modelOf(value), plan = planOf(model);
    return model.faces.map(face => ({id: face.id, points: face.vertices.map(i => {
      let point = model.vertices[i].slice();
      if (amount === 0) return point;
      for (const hinge of plan.chains.get(face.id)) point = rotate(point, hinge, amount);
      if (amount === 1 && Math.abs(point[2] + 1) < 1e-8) point[2] = -1;
      return point;
    })}));
  }

  function hinges(value) {
    const model = modelOf(value), plan = planOf(model);
    return [...plan.links.values()].map(link => ({child: link.child, parent: link.parent, vertices: link.vertices.slice(), angle: link.angle}));
  }

  return Object.freeze({supported, unfold, hinges});
});
