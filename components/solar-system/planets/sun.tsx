import * as THREE from 'three';

export function Sun(loader: THREE.TextureLoader) {
    // Sun texture
    const texture = loader.load('/planets/sun.jpg');
    const geometry = new THREE.SphereGeometry(10, 32, 32);
    const material = new THREE.MeshPhongMaterial({
        map: texture,
        color: 0xff6600, // Dark red/orange tint
        emissive: 0xff3300,
        emissiveIntensity: 2,
    });
    const sunMesh = new THREE.Mesh(geometry, material);

    // Point light for illumination
    const light = new THREE.PointLight(0xffaa00, 15, 0);
    light.position.set(0, 0, 0);

    // include a label key so the caller can render a flag overlay
    return { sunMesh, light, rotationSpeed: 0.0005, labelKey: 'work' };
}
