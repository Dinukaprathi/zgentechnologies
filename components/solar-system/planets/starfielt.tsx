import * as THREE from 'three';

export function Starfield(loader: THREE.TextureLoader) {
    // Create a group to hold both Milky Way and stars
    const starGroup = new THREE.Group();

    // Create a very large sphere for the distant Milky Way background
    const milkyWayGeometry = new THREE.SphereGeometry(5000, 32, 32);
    const milkyWayTexture = loader.load('/planets/stars.jpg');
    const milkyWayMaterial = new THREE.MeshBasicMaterial({
        map: milkyWayTexture,
        side: THREE.BackSide, // Render on the inside
    });

    const milkyWaySphere = new THREE.Mesh(milkyWayGeometry, milkyWayMaterial);
    starGroup.add(milkyWaySphere);

    // Add procedural stars
    const starsGeometry = new THREE.BufferGeometry();
    const starCount = 3000;
    const positions = [];

    for (let i = 0; i < starCount; i++) {
        const x = THREE.MathUtils.randFloatSpread(4000);
        const y = THREE.MathUtils.randFloatSpread(4000);
        const z = THREE.MathUtils.randFloatSpread(4000);
        positions.push(x, y, z);
    }

    starsGeometry.setAttribute(
        'position',
        new THREE.Float32BufferAttribute(positions, 3)
    );

    const starsMaterial = new THREE.PointsMaterial({
        color: 0xffffff,
        size: 1.5,
        sizeAttenuation: true,
    });

    const starPoints = new THREE.Points(starsGeometry, starsMaterial);
    starGroup.add(starPoints);

    return starGroup;
}
