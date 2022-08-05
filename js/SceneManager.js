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

  const mouse = { x: 0, y: 0 }

  const screenDimensions = {
    // width: canvas.width,
    // height: canvas.height
    width: innerWidth,
    height: innerHeight
  }

  const scene = buildScene();
  const renderer = buildRender(screenDimensions);
  const camera = buildCamera(screenDimensions);
  const sceneSubjects = createSceneSubjects(scene, mouse);

  camera.position.z = 15;

  function buildScene() {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#000");

    return scene;
  }

  function buildRender({ width, height }) {
    const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true });
    const DPR = (window.devicePixelRatio) ? window.devicePixelRatio : 1;
    renderer.setPixelRatio(DPR);
    renderer.setSize(width, height);

    renderer.gammaInput = true;
    renderer.gammaOutput = true;

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

  function createSceneSubjects(scene, mouse) {
    const sceneSubjects = [
      new GlobeSphere(scene, mouse),
      new AtmoSphere(scene),
      new StarVertice(scene)
    ];

    return sceneSubjects;
  }

  this.onWindowResize = function () {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

    // !ISSUE
    //   const { width, height } = canvas;

    //   screenDimensions.width = width;
    //   screenDimensions.height = height;

    //   camera.aspect = width / height;
    //   camera.updateProjectionMatrix;

    //   renderer.setSize(width, height);
  }

  this.onMouseMove = function (event) {
    mouse.x = (event.clientX / screenDimensions.width) * 2 - 1;
    mouse.y = (event.clientY / screenDimensions.height) * 2 + 1;
  }

  this.onMouseClick = function (zoom, duration) {
    gsap.to(camera.position, {
      z: zoom,
      duration: duration
    });
  }

  // Calls the update() function of every SceneSubject
  this.update = function () {
    for (let i = 0; i < sceneSubjects.length; i++)
      sceneSubjects[i].update();

    renderer.render(scene, camera);
  }

}