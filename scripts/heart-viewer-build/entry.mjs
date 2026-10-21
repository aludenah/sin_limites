import {
  ACESFilmicToneMapping, AmbientLight, Box3, Color, DirectionalLight,
  DoubleSide, FrontSide, Group, HemisphereLight, LinearToneMapping,
  MeshPhongMaterial, NoToneMapping, PerspectiveCamera, Raycaster,
  REVISION, Scene, Spherical, SRGBColorSpace, Vector2, Vector3, WebGLRenderer
} from 'three';
export { OrbitControls } from 'three/addons/controls/OrbitControls.js';
export { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// A narrow namespace keeps the existing viewer API while allowing tree shaking.
export const THREE = {
  ACESFilmicToneMapping, AmbientLight, Box3, Color, DirectionalLight,
  DoubleSide, FrontSide, Group, HemisphereLight, LinearToneMapping,
  MeshPhongMaterial, NoToneMapping, PerspectiveCamera, Raycaster,
  REVISION, Scene, Spherical, SRGBColorSpace, Vector2, Vector3, WebGLRenderer
};
