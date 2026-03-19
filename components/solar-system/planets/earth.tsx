import * as THREE from 'three';

export function EarthWithMoon(loader: THREE.TextureLoader) {
	// Earth
	const earthTexture = loader.load('/planets/earth.jpg');
	const earthGeometry = new THREE.SphereGeometry(1, 32, 32);
	const earthMaterial = new THREE.MeshStandardMaterial({
		map: earthTexture,
		color: new THREE.Color(1, 1, 1),
		roughness: 0.8,
		metalness: 0.1
	});
	const earthMesh = new THREE.Mesh(earthGeometry, earthMaterial);
	earthMesh.position.x = 30; // distance from Sun

	// Moon
	const moonTexture = loader.load('/planets/moon.jpg');
	const moonGeometry = new THREE.SphereGeometry(0.27, 32, 32);
	const moonMaterial = new THREE.MeshStandardMaterial({ map: moonTexture });
	const moonMesh = new THREE.Mesh(moonGeometry, moonMaterial);
	moonMesh.position.x = 2; // distance from Earth

	// Moon pivot for orbital rotation
	const moonPivot = new THREE.Object3D();
	moonPivot.add(moonMesh);

	// Group
	const earthPivot = new THREE.Object3D();
	earthPivot.add(earthMesh);

	return {
		mesh: earthMesh,
		moon: {
			mesh: moonMesh,
			pivot: moonPivot,
			orbitSpeed: 0.01,
			rotationSpeed: 0.005
		},
		pivot: earthPivot,
		rotationSpeed: 0.005,
		orbitSpeed: 0.003,
		moonOrbitSpeed: 0.01
	};
}
