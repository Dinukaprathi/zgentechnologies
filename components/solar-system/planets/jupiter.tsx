import * as THREE from 'three';

export function Jupiter(loader: THREE.TextureLoader) {
    const texture = loader.load('/planets/jupiter.jpg');
        const geometry = new THREE.SphereGeometry(3.5, 32, 32);
    const material = new THREE.MeshStandardMaterial({
        map: texture,
        color: 0x888899 // Darker tint to reduce brightness
    });
    const mesh = new THREE.Mesh(geometry, material);

    const pivot = new THREE.Object3D();
    pivot.add(mesh);
    mesh.position.x = 55;

    return { mesh, pivot, rotationSpeed: 0.001, orbitSpeed: 0.0008 };
}
