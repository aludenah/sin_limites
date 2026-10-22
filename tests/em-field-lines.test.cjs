'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const assets = path.resolve(__dirname, '../assets/em-realistic');
const geometry = JSON.parse(fs.readFileSync(path.join(assets, '02-field-geometry.json'), 'utf8'));
const svg = fs.readFileSync(path.join(assets, '02-campo.svg'), 'utf8');
const lines = geometry.polylines;
const distance = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1]);

// Evaluate the physical model independently of the Python integrator: opposite
// virtual poles, concealed within the bar, approximate its exterior field.
function fieldAt(p) {
  const from = pole => {
    const dx = p[0] - pole[0], dy = p[1] - pole[1];
    const radius = Math.hypot(dx, dy);
    return [dx / radius ** 3, dy / radius ** 3];
  };
  const n = from(geometry.north), s = from(geometry.south);
  return [n[0] - s[0], n[1] - s[1]];
}
function cross(a, b, c) {
  return (b[0] - a[0]) * (c[1] - a[1]) - (b[1] - a[1]) * (c[0] - a[0]);
}
function onSegment(a, b, p) {
  const eps = 1e-8;
  return Math.abs(cross(a, b, p)) < eps &&
    p[0] >= Math.min(a[0], b[0]) - eps && p[0] <= Math.max(a[0], b[0]) + eps &&
    p[1] >= Math.min(a[1], b[1]) - eps && p[1] <= Math.max(a[1], b[1]) + eps;
}
function intersects(a, b, c, d) {
  if (Math.max(a[0], b[0]) < Math.min(c[0], d[0]) ||
      Math.max(c[0], d[0]) < Math.min(a[0], b[0]) ||
      Math.max(a[1], b[1]) < Math.min(c[1], d[1]) ||
      Math.max(c[1], d[1]) < Math.min(a[1], b[1])) return false;
  const abC = cross(a, b, c), abD = cross(a, b, d);
  const cdA = cross(c, d, a), cdB = cross(c, d, b);
  return (abC * abD < 0 && cdA * cdB < 0) ||
    onSegment(a, b, c) || onSegment(a, b, d) || onSegment(c, d, a) || onSegment(c, d, b);
}

assert.equal(lines.length, 10);
assert.equal((svg.match(/data-field-index=/g) || []).length, lines.length);
assert.equal(new Set(lines.map(line => line[0].join(','))).size, lines.length, 'Each trajectory needs its own start');
assert.equal(new Set(lines.map(line => line.at(-1).join(','))).size, lines.length, 'Each trajectory needs its own end');
const allSegments = [];
for (const [index, line] of lines.entries()) {
  assert.ok(line.length > 300);
  assert.ok(distance(line[0], geometry.north) <= 20.001);
  assert.ok(distance(line.at(-1), geometry.south) <= 20.001);
  for (const p of line) {
    assert.ok(p.every(Number.isFinite));
    assert.ok(p[0] > 0 && p[0] < 1200 && p[1] > 100 && p[1] < 640, 'The full field fits within the illustration');
  }
  for (let i = 1; i < line.length; i++) {
    const a = line[i - 1], b = line[i], d = [b[0] - a[0], b[1] - a[1]];
    const f = fieldAt([(a[0] + b[0]) / 2, (a[1] + b[1]) / 2]);
    const alignment = (d[0] * f[0] + d[1] * f[1]) / Math.hypot(...d) / Math.hypot(...f);
    assert.ok(alignment > 0.9999, `Line ${index} must follow B from N to S`);
    allSegments.push({ a, b, line: index, part: i });
  }
}
// Check all distinct segments, including the portions hidden by the magnet.
// A malformed curve cannot be hidden by clipping or by another illustration.
for (let i = 0; i < allSegments.length; i++) {
  const a = allSegments[i];
  for (let j = i + 1; j < allSegments.length; j++) {
    const b = allSegments[j];
    if (a.line === b.line && Math.abs(a.part - b.part) <= 1) continue;
    assert.ok(!intersects(a.a, a.b, b.a, b.b), `Intersecting field segments: line ${a.line}/${a.part} and ${b.line}/${b.part}`);
  }
}
// A red north pole on the left gives rightward field above/below the centre.
assert.ok(fieldAt([600, 200])[0] > 0);
assert.ok(fieldAt([600, 520])[0] > 0);
assert.match(svg, /Exterior: N → S/);
assert.match(svg, /Interior: S → N/);
for (const name of ['01-imanes.svg', '02-campo.svg', '05-biot.svg']) {
  const asset = fs.readFileSync(path.join(assets, name), 'utf8');
  assert.match(asset, /data:image\/webp;base64,/);
  assert.doesNotMatch(asset, /href="(?:\.\.\/|https?:|[^"#]*em-pdf)/);
  const arrows = asset.match(/<path\b[^>]*marker-end="[^"]+"[^>]*\/>/g) || [];
  for (const arrow of arrows) {
    const d = arrow.match(/\bd="([^"]+)"/)[1];
    assert.equal((d.match(/[Mm]/g) || []).length, 1, `${name}: each arrow needs its own path so both arrowheads render`);
  }
  if (name === '01-imanes.svg') assert.equal(arrows.length, 4, 'Two arrows show each attraction/repulsion interaction');
}
console.log('PASS: all 10 magnetic field trajectories are finite, distinct, contained, tangent to B, directed N→S, and free from all pairwise/self intersections; photographic SVGs are self-contained.');
