import * as THREE from '../../../node_modules/three/build/three.module.js';

const radiusTop = 7;
const radiusBottom = 7;
const height = 8;
const radialSegments = 16;

export default new THREE.CylinderGeometry(radiusTop, radiusBottom, height, radialSegments);