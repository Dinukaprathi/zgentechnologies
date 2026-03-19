import * as THREE from 'three';

export function Venus(loader: THREE.TextureLoader) {
    const texture = loader.load('/planets/venus.jpg');
    const geometry = new THREE.SphereGeometry(0.95, 32, 32);
    const material = new THREE.MeshStandardMaterial({ map: texture });
    const mesh = new THREE.Mesh(geometry, material);

    const pivot = new THREE.Object3D();
    pivot.add(mesh);
    mesh.position.x = 20;

    return { mesh, pivot, rotationSpeed: 0.001, orbitSpeed: 0.0005 };
}
