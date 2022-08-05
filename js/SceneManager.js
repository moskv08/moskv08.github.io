import * as THREE from 'three';
import gsap from 'gsap';
import vertexShader from '../shaders/globe/vertex.glsl'
import fragmentShader from '../shaders/globe/fragment.glsl'

import atmosphereVertexShader from '../shaders/atmosphere/vertex.glsl'
import atmosphereFragmentShader from '../shaders/atmosphere/fragment.glsl'

export default function SceneManager(){


  const screenDimensions = {
    // width: canvas.width,
    // height: canvas.height
    width: innerWidth,
    height: innerHeight
  }

  const scene = buildScene();
  const renderer = buildRender(screenDimensions);
  const camera = buildCamera(screenDimensions);

  const sceneObjects = [];

  // Create Sphere
  // -------------
  const sphereGeometry = new THREE.SphereBufferGeometry(5, 50, 50);
  const shaderMaterial = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: {
      globeTexture: {
        value: new THREE.TextureLoader().load('./img/globe.jpg')
      }
    }
  });
  const sphere = new THREE.Mesh(sphereGeometry, shaderMaterial);

  // Create Atmosphere
  // -----------------
  const atmosphereGeometry = new THREE.SphereBufferGeometry(5, 50, 50);
  const atmosphereShaderMaterial = new THREE.ShaderMaterial({
    vertexShader: atmosphereVertexShader,
    fragmentShader: atmosphereFragmentShader,
    blending: THREE.AdditiveBlending,
    side: THREE.BackSide
  });
  const atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereShaderMaterial);
  scene.add(atmosphere);

  // Create Star Points
  // ------------------
  const starGeometry = new THREE.BufferGeometry(5, 50, 50);
  const starMaterial = new THREE.PointsMaterial({ color: 0xffffff });
  const stars = new THREE.Points(starGeometry, starMaterial);
  scene.add(stars);

  const starVertices = [];
  for (let index = 0; index < 10000; index++) {
    const x = (Math.random() - 0.5) * 2000;
    const y = (Math.random() - 0.5) * 2000;
    const z = -Math.random() * 10000;
    starVertices.push(x, y, z);
  }

  starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));

  // Create Scene group
  // ------------------
  const group = new THREE.Group();
  group.add(sphere)
  scene.add(group);

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

  const mouse = { x: 0, y: 0 }

  function animate() {
    requestAnimationFrame(animate)
    renderer.render(scene, camera)
    sphere.rotation.y += 0.002

    gsap.to(group.rotation, {
      x: mouse.y * 0.1,
      y: mouse.x * 0.5,
      duration: 2
    });
  }
  animate();

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
    console.log(event);
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

    renderer.setSize( window.innerWidth, window.innerHeight );

  });
}