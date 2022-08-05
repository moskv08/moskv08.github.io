/* Info
    SceneManager is responsible exclusively for setting up and updating the scene.
    SceneManager has (at least) two public methods that are called by the main: 
    
    1.  update()
    2.  onWindowResize()
*/

import * as THREE from 'three';
import gsap from 'gsap';
import GlobeSphere from './scene_objects/GlobeSphere';
import AtmoSphere from './scene_objects/AtmoSphere';
import StarVertice from './scene_objects/StarVertice';

export default function SceneManager(canvas) {

  const screenDimensions = {
    // width: canvas.width,
    // height: canvas.height
    width: innerWidth,
    height: innerHeight
  }

  const mouse = { x: 0, y: 0 }

  const scene = buildScene();
  const renderer = buildRender(screenDimensions);
  const camera = buildCamera(screenDimensions);
  const sceneSubjects = createSceneSubjects(scene, mouse);

  function createSceneSubjects(scene, mouse) {
    const sceneSubjects = [
      new GlobeSphere(scene, mouse),
      new AtmoSphere(scene),
      new StarVertice(scene)
    ];

    return sceneSubjects;
  }

  camera.position.z = 15;

  function buildScene() {
    const scene = new THREE.Scene();
    return scene;
  }

  function buildRender({ width, height }) {
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    const DPR = (window.devicePixelRatio) ? window.devicePixelRatio : 1;
    renderer.setPixelRatio(DPR);
    renderer.setSize(width, height);
    document.body.appendChild(renderer.domElement);

    return renderer;
  }

  function buildCamera({ width, height }) {
    const aspectRatio = width / height;  // the canvas default: 2 (300px/150px)
    const fieldOfView = 75;
    const nearPlane = 0.1;
    const farPlane = 1000;

    const camera = new THREE.PerspectiveCamera(fieldOfView, aspectRatio, nearPlane, farPlane);

    return camera;
  }

  // Spin Sphere
  addEventListener('mousemove', event => {
    mouse.x = (event.clientX / screenDimensions.width) * 2 - 1;
    mouse.y = (event.clientY / screenDimensions.height) * 2 + 1;
  });

  addEventListener('mousedown', event => {
    gsap.to(camera.position, {
      z: 13,
      duration: 2
    });
  });

  addEventListener('mouseup', event => {
    gsap.to(camera.position, {
      z: 15,
      duration: 3
    });
  });

  addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

  });

  this.onWindowsResize = function () {

  }

  this.onClick = function () {

  }

  // Calls the update() function of every SceneSubject
  this.update = function () {
    for (let i = 0; i < sceneSubjects.length; i++)
      sceneSubjects[i].update();

    renderer.render(scene, camera);
  }

}