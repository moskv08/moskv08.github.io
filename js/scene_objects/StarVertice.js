import * as THREE from 'three';

export default function StarVertice(scene) {

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

  this.update = function () {
    // do something
  }
}