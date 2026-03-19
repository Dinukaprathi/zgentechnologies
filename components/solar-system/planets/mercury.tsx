import * as THREE from 'three';

export function Mercury(loader: THREE.TextureLoader) {
    const texture = loader.load('/planets/mercury.jpg');
    const geometry = new THREE.SphereGeometry(0.38, 32, 32);
    const material = new THREE.MeshStandardMaterial({ map: texture });
    const mesh = new THREE.Mesh(geometry, material);

    const pivot = new THREE.Object3D();
    pivot.add(mesh);
    mesh.position.x = 15; // distance from Sun

    return { mesh, pivot, rotationSpeed: 0.002, orbitSpeed: 0.001 };
}
