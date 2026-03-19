import * as THREE from 'three';

export function Saturn(loader: THREE.TextureLoader) {
    const texture = loader.load('/planets/saturn.jpg');
    const ringTexture = loader.load('/planets/saturn_ring_alpha.png');

    const geometry = new THREE.SphereGeometry(2.5, 32, 32);
    const material = new THREE.MeshStandardMaterial({
        map: texture,
        color: 0xffe8b0, // Warmer, richer pale yellow
        metalness: 0,
        roughness: 0.6 // Slightly more reflective
    });

    const mesh: THREE.Mesh<THREE.SphereGeometry, THREE.MeshStandardMaterial> & {
        rings?: THREE.Object3D[];
    } = new THREE.Mesh(geometry, material);



    // Procedural ring system
    const ringGeometry1 = new THREE.RingGeometry(3.7, 4.2, 32);
    const ringMaterial1 = new THREE.MeshBasicMaterial({
        map: ringTexture,
        color: 0xddddee,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.8
    });
    const ringMesh1 = new THREE.Mesh(ringGeometry1, ringMaterial1);
    ringMesh1.rotation.x = Math.PI / 2;
    ringMesh1.rotation.z = Math.PI / 12;
    mesh.add(ringMesh1);

    // Inner ring
    const ringGeometry2 = new THREE.RingGeometry(4.5, 5, 32);
    const ringMaterial2 = new THREE.MeshBasicMaterial({
        map: ringTexture,
        color: 0xbbbbcc,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.6
    });
    const ringMesh2 = new THREE.Mesh(ringGeometry2, ringMaterial2);
    ringMesh2.rotation.x = Math.PI / 2;
    ringMesh2.rotation.z = Math.PI / 12;
    mesh.add(ringMesh2);

    // Store ring references for rotation
    mesh.rings = [ringMesh1, ringMesh2];

    const pivot = new THREE.Object3D();
    pivot.add(mesh);
    mesh.position.x = 70;

    return { mesh, pivot, rotationSpeed: 0.002, orbitSpeed: 0.0006 };
}
