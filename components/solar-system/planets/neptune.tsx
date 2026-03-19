import * as THREE from 'three';

export function Neptune(loader: THREE.TextureLoader) {
    const texture = loader.load('/planets/neptune.jpg');
    const geometry = new THREE.SphereGeometry(1.5, 32, 32);
    const material = new THREE.MeshStandardMaterial({
        map: texture,
        color: 0x0066ff // Deep blue tint to enhance Neptune's true color
    });
    const mesh = new THREE.Mesh(geometry, material);

    const pivot = new THREE.Object3D();
    pivot.add(mesh);
    mesh.position.x = 100;

    return { mesh, pivot, rotationSpeed: 0.001, orbitSpeed: 0.0003 };
}
