import * as THREE from 'three';

export function Moon(loader: THREE.TextureLoader) {
    const texture = loader.load('/planets/moon.jpg');
    const geometry = new THREE.SphereGeometry(0.27, 32, 32);
    const material = new THREE.MeshStandardMaterial({ map: texture });
    const mesh = new THREE.Mesh(geometry, material);

    const pivot = new THREE.Object3D();
    pivot.add(mesh);
    mesh.position.x = 2; // distance from Earth

    return { mesh, pivot, rotationSpeed: 0.005, orbitSpeed: 0.01 };
}
