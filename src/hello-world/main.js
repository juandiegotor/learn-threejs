import * as THREE from '../../node_modules/three/build/three.module.js';

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
  const fov = 75;
  const aspect = 2;
  const near = 0.1;
  const far = 5;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

  camera.position.z = 2;

  // Create the scene
  const scene = new THREE.Scene();

  // Create a Box Geamotry
  const boxWidth = 1;
  const boxHeight = 1;
  const boxDepth = 1;
  const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

  // Function that creates a cube in the scene
  const makeInstance = (geometry, color, x) => {
    const material = new THREE.MeshPhongMaterial({color});
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    cube.position.x = x;
    return cube;
  };

  // Create cubes
  const cubes = [
    makeInstance(geometry, 0x44aa88, 0),
    makeInstance(geometry, 0x8844aa, -2),
    makeInstance(geometry, 0xaa8844,  2),
  ];

  // Add some lighting
  const color = 0xffffff;
  const intensity = 1;
  const light = new THREE.DirectionalLight(color, intensity);
  light.position.set(-1, 2, 4);
  scene.add(light);

  // Create a function to spin the cubes
  const render = (time) => {
    time *= 0.001;

    // check if the renderer size was modified then adjust the aspect
    if (resizeRendererToDisplaySize(renderer)) {
      // adjust camera aspect on real time
      const canvas = renderer.domElement;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    }

    cubes.forEach((cube, idx) => {
      const speed = 1 + idx * .1;
      const rot = time * speed;
      cube.rotation.x = rot;
      cube.rotation.y = rot;
    });

    renderer.render(scene, camera);
    requestAnimationFrame(render);
  };

  // requestAnimationFrame requests the browser to animate
  requestAnimationFrame(render);
}

main();