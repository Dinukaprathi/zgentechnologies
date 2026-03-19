import * as THREE from 'three';

export function Uranus(loader: THREE.TextureLoader) {
    const texture = loader.load('/planets/uranus.jpg');
    const geometry = new THREE.SphereGeometry(1.5, 32, 32);
    const material = new THREE.MeshStandardMaterial({
        map: texture,
        color: 0x4dd2ff // Cyan-blue tint to enhance Uranus' true color
    });
    const mesh = new THREE.Mesh(geometry, material);

    const pivot = new THREE.Object3D();
    pivot.add(mesh);
    mesh.position.x = 85;

    return { mesh, pivot, rotationSpeed: 0.001, orbitSpeed: 0.0004 };
}
