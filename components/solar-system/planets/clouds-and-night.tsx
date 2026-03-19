import * as THREE from 'three';

export function Earth(loader: THREE.TextureLoader) {
    const dayTexture = loader.load('https://pub-ea15f1b00be54b729b352df7da2d2a6b.r2.dev/planet-assets/cloud.ktx2');
    
    const geometry = new THREE.SphereGeometry(1, 32, 32);
    const material = new THREE.MeshStandardMaterial({
        map: dayTexture,
        color: new THREE.Color(1, 1, 1),
        roughness: 0.8,
        metalness: 0.1
    });
    const mesh = new THREE.Mesh(geometry, material);

    const pivot = new THREE.Object3D();
    pivot.add(mesh);
    mesh.position.x = 30;

    return { mesh, pivot, rotationSpeed: 0.005, orbitSpeed: 0.003 };
}
