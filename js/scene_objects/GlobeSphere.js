import * as THREE from 'three';
import gsap from 'gsap';
import vertexShader from '../../shaders/globe/vertex.glsl'
import fragmentShader from '../../shaders/globe/fragment.glsl'

export default function GlobeSphere(scene, mouse) {

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

  // Create Scene group
  // ------------------
  const group = new THREE.Group();
  group.add(sphere)
  scene.add(group);

  // const mouse = { x: 0, y: 0 }

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

  this.update = function () {
    // do something
    animate();
  }
}