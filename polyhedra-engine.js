(function (root, factory) {
  'use strict';
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  if (root) root.PolyhedraEngine = api;
})(typeof window !== 'undefined' ? window : typeof globalThis !== 'undefined' ? globalThis : null, function () {
  'use strict';
  // Coordinates are exact constructions up to floating point. No WebGL or external mesh is used.
  const EPS = 1e-9;
  const dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
  const sub = (a, b) => a.map((x, i) => x - b[i]);
  const mul = (a, k) => a.map(x => x * k);
  const add = (a, b) => a.map((x, i) => x + b[i]);
  const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
  const length = a => Math.hypot(...a);
  const unit = a => {
    const scale = Math.max(...a.map(Math.abs)), scaled = a.map(x => x / scale);
    return mul(scaled, 1 / length(scaled));
  };
  const center = points => mul(points.reduce(add, [0, 0, 0]), 1 / points.length);
  function freeze(value) {
    if (value && typeof value === 'object' && !Object.isFrozen(value)) {
      Object.values(value).forEach(freeze);
      Object.freeze(value);
    }
    return value;
  }
  function vector(value, name) {
    if (!Array.isArray(value) || value.length !== 3 || value.some(n => typeof n !== 'number' || !Number.isFinite(n))) throw new TypeError(name + ' must contain three finite numbers.');
    return value.slice();
  }
  function finite(value, name) {
    if (typeof value !== 'number' || !Number.isFinite(value)) throw new TypeError(name + ' must be finite.');
    return value;
  }
  function basis(normal) {
    const axis = Math.abs(normal[0]) < .8 ? [1, 0, 0] : [0, 1, 0];
    const u = unit(cross(axis, normal));
    return {u, v: cross(normal, u)};
  }
  function numericListOrder(a, b) {
    for (let i = 0; i < Math.min(a.length, b.length); i++) if (a[i] !== b[i]) return a[i] - b[i];
    return a.length - b.length;
  }
  function orderedFace(ids, vertices, normal) {
    const c = center(ids.map(id => vertices[id])), {u, v} = basis(normal);
    const ordered = ids.slice().sort((a, b) => {
      const x = sub(vertices[a], c), y = sub(vertices[b], c);
      return Math.atan2(dot(x, v), dot(x, u)) - Math.atan2(dot(y, v), dot(y, u));
    });
    const first = ordered.indexOf(Math.min(...ordered));
    return ordered.slice(first).concat(ordered.slice(0, first));
  }
  // Supporting planes group coplanar triangles into one polygonal face.
  function convexFaces(vertices) {
    const found = new Map();
    for (let i = 0; i < vertices.length - 2; i++) for (let j = i + 1; j < vertices.length - 1; j++) for (let k = j + 1; k < vertices.length; k++) {
      const raw = cross(sub(vertices[j], vertices[i]), sub(vertices[k], vertices[i]));
      if (length(raw) < EPS) continue;
      let n = unit(raw), distances = vertices.map(v => dot(n, sub(v, vertices[i])));
      const min = Math.min(...distances), max = Math.max(...distances);
      if (min < -EPS && max > EPS) continue;
      if (min >= -EPS) { n = mul(n, -1); distances = distances.map(x => -x); }
      const ids = distances.map((d, index) => Math.abs(d) <= EPS * 10 ? index : -1).filter(x => x >= 0);
      if (ids.length < 3) continue;
      const key = ids.join(',');
      if (!found.has(key)) found.set(key, {members: ids, normal: n});
    }
    return [...found.values()].sort((a, b) => numericListOrder(a.members, b.members)).map((face, i) => {
      const order = orderedFace(face.members, vertices, face.normal);
      return {id: 'f' + i, vertices: order, normal: face.normal, center: center(order.map(id => vertices[id]))};
    });
  }
  function makeModel(id, name, regular, vertices) {
    const faces = convexFaces(vertices), pairs = new Map();
    for (const face of faces) for (let i = 0; i < face.vertices.length; i++) {
      const pair = [face.vertices[i], face.vertices[(i + 1) % face.vertices.length]].sort((a, b) => a - b), key = pair.join(',');
      if (!pairs.has(key)) pairs.set(key, {vertices: pair, faces: []});
      pairs.get(key).faces.push(face.id);
    }
    const edges = [...pairs.values()].sort((a, b) => numericListOrder(a.vertices, b.vertices)).map((edge, i) => ({id: 'e' + i, vertices: edge.vertices, faces: edge.faces}));
    return freeze({id, name, regular, vertices, faces, edges, counts: {vertices: vertices.length, edges: edges.length, faces: faces.length}, radius: Math.max(...vertices.map(length))});
  }
  const phi = (1 + Math.sqrt(5)) / 2, inversePhi = 1 / phi, signs = [-1, 1];
  const cube = [[-1,-1,-1],[1,-1,-1],[1,1,-1],[-1,1,-1],[-1,-1,1],[1,-1,1],[1,1,1],[-1,1,1]];
  const icosahedron = [], dodecahedron = [];
  for (const x of signs) for (const y of signs) for (const z of signs) dodecahedron.push([x, y, z]);
  for (const a of signs) for (const b of signs) {
    icosahedron.push([0, a, b * phi], [a, b * phi, 0], [b * phi, 0, a]);
    dodecahedron.push([0, a * inversePhi, b * phi], [a * inversePhi, b * phi, 0], [b * phi, 0, a * inversePhi]);
  }
  const r = Math.sqrt(2);
  const models = freeze({
    cube: makeModel('cube', 'Cubo o hexaedro regular', true, cube),
    tetrahedron: makeModel('tetrahedron', 'Tetraedro regular', true, [[1,1,1],[-1,-1,1],[-1,1,-1],[1,-1,-1]]),
    octahedron: makeModel('octahedron', 'Octaedro regular', true, [[r,0,0],[-r,0,0],[0,r,0],[0,-r,0],[0,0,r],[0,0,-r]]),
    dodecahedron: makeModel('dodecahedron', 'Dodecaedro regular', true, dodecahedron),
    icosahedron: makeModel('icosahedron', 'Icosaedro regular', true, icosahedron),
    pyramid: makeModel('pyramid', 'Pirámide de base cuadrada', false, cube.slice(0, 4).map(v => v.slice()).concat([[0,0,1]]))
  });
  function getModel(id = 'cube') {
    if (typeof id !== 'string' || !Object.prototype.hasOwnProperty.call(models, id)) throw new RangeError('Unknown polyhedron: ' + String(id));
    return models[id];
  }
  function resolveModel(value) {
    if (typeof value === 'string' || value === undefined) return getModel(value);
    if (!value || !Array.isArray(value.vertices) || !Array.isArray(value.edges)) throw new TypeError('A polyhedron model is required.');
    for (const p of value.vertices) vector(p, 'Vertex');
    for (const edge of value.edges) if (!Array.isArray(edge.vertices) || edge.vertices.length !== 2 || edge.vertices.some(i => !Number.isInteger(i) || i < 0 || i >= value.vertices.length)) throw new TypeError('Invalid edge.');
    return value;
  }
  function hull2D(points, tolerance) {
    if (points.length < 3) return points.slice();
    const sorted = points.slice().sort((a, b) => a.uv[0] - b.uv[0] || a.uv[1] - b.uv[1]);
    const turn = (a, b, c) => (b.uv[0] - a.uv[0]) * (c.uv[1] - a.uv[1]) - (b.uv[1] - a.uv[1]) * (c.uv[0] - a.uv[0]);
    const lower = [], upper = [];
    for (const point of sorted) {
      while (lower.length > 1 && turn(lower[lower.length - 2], lower[lower.length - 1], point) <= tolerance) lower.pop();
      lower.push(point);
    }
    for (const point of sorted.slice().reverse()) {
      while (upper.length > 1 && turn(upper[upper.length - 2], upper[upper.length - 1], point) <= tolerance) upper.pop();
      upper.push(point);
    }
    return lower.slice(0, -1).concat(upper.slice(0, -1));
  }
  function section(modelOrId, config = {}) {
    const model = resolveModel(modelOrId);
    if (!config || typeof config !== 'object') throw new TypeError('A plane configuration is required.');
    const raw = vector(config.normal === undefined ? [0, 0, 1] : config.normal, 'Normal');
    if (raw.every(x => x === 0)) throw new RangeError('The plane normal must be nonzero.');
    const normal = unit(raw), offset = finite(config.offset === undefined ? 0 : config.offset, 'Offset');
    const radius = Math.max(1, ...model.vertices.map(length)), epsilon = EPS * radius * 10, points = [];
    const append = point => {
      if (!points.some(p => length(sub(p, point)) <= epsilon)) points.push(point);
    };
    for (const edge of model.edges) {
      const a = model.vertices[edge.vertices[0]], b = model.vertices[edge.vertices[1]], da = dot(normal, a) - offset, db = dot(normal, b) - offset;
      const onA = Math.abs(da) <= epsilon, onB = Math.abs(db) <= epsilon;
      if (onA) append(a.slice());
      if (onB) append(b.slice());
      if (!onA && !onB && ((da < 0 && db > 0) || (da > 0 && db < 0))) append(add(a, mul(sub(b, a), da / (da - db))));
    }
    const {u, v} = basis(normal), origin = mul(normal, offset);
    const hull = hull2D(points.map(p => ({point: p, uv: [dot(sub(p, origin), u), dot(sub(p, origin), v)]})), epsilon * epsilon);
    const kind = hull.length === 0 ? 'empty' : hull.length === 1 ? 'point' : hull.length === 2 ? 'segment' : 'polygon';
    let twiceArea = 0, perimeter = 0;
    if (kind === 'polygon') for (let i = 0; i < hull.length; i++) {
      const a = hull[i].uv, b = hull[(i + 1) % hull.length].uv;
      twiceArea += a[0] * b[1] - a[1] * b[0];
      perimeter += Math.hypot(b[0] - a[0], b[1] - a[1]);
    }
    return {points: hull.map(p => p.point), polygon2D: hull.map(p => p.uv), sides: kind === 'polygon' ? hull.length : 0, kind, area: Math.abs(twiceArea) / 2, perimeter, normal, offset};
  }
  // Angles are radians. Rotate about y, then x. Orthographic positive z is nearer the viewer.
  function rotatePoint(point, config = {}) {
    const p = vector(point, 'Point'), yaw = finite(config.yaw === undefined ? 0 : config.yaw, 'Yaw'), pitch = finite(config.pitch === undefined ? 0 : config.pitch, 'Pitch');
    const x = p[0] * Math.cos(yaw) + p[2] * Math.sin(yaw), z = -p[0] * Math.sin(yaw) + p[2] * Math.cos(yaw);
    return [x, p[1] * Math.cos(pitch) - z * Math.sin(pitch), p[1] * Math.sin(pitch) + z * Math.cos(pitch)];
  }
  function project(point, config = {}) {
    const p = rotatePoint(point, config), scale = finite(config.scale === undefined ? 1 : config.scale, 'Scale'), cx = finite(config.cx === undefined ? 0 : config.cx, 'Center x'), cy = finite(config.cy === undefined ? 0 : config.cy, 'Center y');
    return {x: cx + scale * p[0], y: cy - scale * p[1], depth: p[2]};
  }
  const presets = freeze({
    'cube-triangle': {normal: [1, 1, 1], offset: 2 / Math.sqrt(3), label: 'Triángulo'},
    'cube-square': {normal: [0, 0, 1], offset: 0, label: 'Cuadrado'},
    'cube-pentagon': {normal: [1, 1, 2], offset: 1 / Math.sqrt(6), label: 'Pentágono'},
    'cube-hexagon': {normal: [1, 1, 1], offset: 0, label: 'Hexágono'}
  });
  return freeze({getModel, section, rotatePoint, project, presets, ids: Object.keys(models), epsilon: EPS});
});
