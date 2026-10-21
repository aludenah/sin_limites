# Heart viewer dependency bundle

The browser loads a single self-hosted ESM file, with no import map or third-party CDN requests. The bundle includes Three.js, OrbitControls and GLTFLoader.

From this directory, rebuild the checked-in `vendor/heart-three-160.mjs` and its license with:

```sh
npm ci
npm run build
```

Dependencies are pinned in `package.json` and `package-lock.json`. Three.js 0.160.1 retains WebGL 1 fallback for older Android devices while preferring WebGL 2. The [official migration guide](https://github.com/mrdoob/three.js/wiki/Migration-Guide#162--r163) documents removal of WebGL 1 in r163. The application does not use skinning, postprocessing or external glTF extensions.

The viewer requests only its required public classes through `entry.mjs`. The build fails if an external module import remains in the output. Third-party code retains its MIT notice in `vendor/THREE-LICENSE.txt`.
