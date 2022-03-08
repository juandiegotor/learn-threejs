import * as THREE from '../../../node_modules/three/build/three.module.js';

const radius = 7;
const height = 8;
const segments = 16;

export default new THREE.ConeGeometry(radius, height, segments);