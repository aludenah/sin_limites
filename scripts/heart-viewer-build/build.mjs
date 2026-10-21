import { build } from 'esbuild';
import { copyFile, mkdir, readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const directory = path.dirname(fileURLToPath(import.meta.url));
const vendor = path.resolve(directory, '../../vendor');
await mkdir(vendor, { recursive: true });
await build({
  entryPoints: [path.join(directory, 'entry.mjs')],
  outfile: path.join(vendor, 'heart-three-160.mjs'),
  bundle: true,
  format: 'esm',
  platform: 'browser',
  target: 'es2018',
  minify: true,
  legalComments: 'none',
  banner: { js: '/* Three.js 0.160.1 (MIT) | Copyright 2010-2023 three.js authors | See THREE-LICENSE.txt. Self-contained heart viewer bundle. */' },
  metafile: true
}).then(async result => {
  if (Object.values(result.metafile.outputs).some(output => output.imports.length)) {
    throw new Error('The heart viewer bundle must not have external imports.');
  }
});
await copyFile(path.join(directory, 'node_modules/three/LICENSE'), path.join(vendor, 'THREE-LICENSE.txt'));
const threePackage = JSON.parse(await readFile(path.join(directory, 'node_modules/three/package.json'), 'utf8'));
if (threePackage.version !== '0.160.1') throw new Error('Unexpected Three.js version.');
console.log('Built vendor/heart-three-160.mjs with Three.js ' + threePackage.version);
