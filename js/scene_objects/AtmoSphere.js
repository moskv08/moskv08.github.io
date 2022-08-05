import * as THREE from 'three';
import gsap from 'gsap';

import atmosphereVertexShader from '../../shaders/atmosphere/vertex.glsl'
import atmosphereFragmentShader from '../../shaders/atmosphere/fragment.glsl'

export default function AtmoSphere(scene) {

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

  this.update = function () {
    // do something
  }
}