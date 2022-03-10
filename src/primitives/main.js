import * as THREE from '../../node_modules/three/build/three.module.js';
import boxGeom from './geometry/box.js';
import circleGeom from './geometry/circle.js';
import coneGem from './geometry/cone.js';
import cylinderGeom from './geometry/cylinder.js';
import dodecahedronGeom from './geometry/dodecahedron.js';
import extrudeGeom from './geometry/extrude.js';
import icosahedronGeom from './geometry/icosahedron.js';

// resizes the renderer if its different from the canvas, and passes the check
// its a good practice to not resize the window if it already matches the
// client size
const resizeRendererToDisplaySize = (renderer) => {
  const canvas = renderer.domElement;
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  const needsResize = canvas.width !== width || canvas.height !== height;
  if (needsResize) {
    // the false at the end indicates that the canvas css won't be modified
    renderer.setSize(width, height, false);
  }
  return needsResize;
};

function main() {
  // Select the canvas where we want to render the scene
  const canvas = document.querySelector('#c');
  const renderer = new THREE.WebGL1Renderer({canvas});

  // Create a camera
  const fov = 40;
  const aspect = 2;
  const near = 0.1;
  const far = 1000;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

  camera.position.z = 120;

  // Create the scene
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xaaaaaa);

  // Add Lights
  {
    const color = 0xffffff;
    const intensity = 1;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(-1, 2, 4);
    scene.add(light);
  }
  {
    const color = 0xFFFFFF;
    const intensity = 1;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(1, -2, -4);
    scene.add(light);
  }

  const objects = [];
  const spread = 15;

  // Takes an object and puts it in the scene
  const addObject = (x, y, obj) => {
    obj.position.x = x * spread;
    obj.position.y = y * spread;

    scene.add(obj);
    objects.push(obj);
  };

  // Returns a material with a random color
  const createMaterial = () => {
    // Double side is used to draw both sides of the triangles
    const material = new THREE.MeshPhongMaterial({side: THREE.DoubleSide});
    const hue = Math.random();
    const saturation = 1;
    const luminance = .5;
    material.color.setHSL(hue, saturation, luminance);

    return material;
  }

  // Creates a mesh from a given geometry and a rando color material and
  // adds it to the scene
  const addSolidGeometry = (x, y, geometry) => {
    const mesh = new THREE.Mesh(geometry, createMaterial());
    addObject(x, y, mesh);
  };

  // add geometries defined in the /geometry folder to the scene
  addSolidGeometry(-2, 2, boxGeom);
  addSolidGeometry(-1, 2, circleGeom);
  addSolidGeometry(0, 2 , coneGem);
  addSolidGeometry(1, 2, cylinderGeom);
  addSolidGeometry(2, 2, dodecahedronGeom);
  addSolidGeometry(-2, 1, extrudeGeom); 
  addSolidGeometry(-1, 1, icosahedronGeom);

  // Create a function to spin the objects
  const render = (time) => {
    time *= 0.001;

    // check if the renderer size was modified then adjust the aspect
    if (resizeRendererToDisplaySize(renderer)) {
      // adjust camera aspect on real time
      const canvas = renderer.domElement;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    }

    objects.forEach((obj, idx) => {
      const speed = 1 + idx * .1;
      const rot = time * speed;
      obj.rotation.x = rot;
      obj.rotation.y = rot;
    });

    renderer.render(scene, camera);
    requestAnimationFrame(render);
  };

  // requestAnimationFrame requests the browser to animate
  requestAnimationFrame(render);
}

main();