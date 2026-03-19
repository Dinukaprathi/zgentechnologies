import * as THREE from 'three';

export function Mars(loader: THREE.TextureLoader) {
    const texture = loader.load('/planets/mars.jpg');
    const geometry = new THREE.SphereGeometry(0.53, 32, 32);
    const material = new THREE.MeshStandardMaterial({
        map: texture,
        color: 0xdd6666 // Softer red tint for Mars
    });
    const mesh = new THREE.Mesh(geometry, material);

    const pivot = new THREE.Object3D();
    pivot.add(mesh);
    mesh.position.x = 40;

    return { mesh, pivot, rotationSpeed: 0.003, orbitSpeed: 0.002 };
}
