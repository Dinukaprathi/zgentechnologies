import * as THREE from 'three';

export function Satellite(loader: THREE.TextureLoader) {
    const satelliteGroup = new THREE.Group();

    // Main satellite body (cylindrical with solar panels)
    const bodyGeometry = new THREE.CylinderGeometry(0.8, 0.8, 2.5, 16);
    
    const bodyMaterial = new THREE.MeshPhongMaterial({
        color: 0xC0C0C0, // Metallic silver
        shininess: 100,
        specular: 0x444444
    });
    
    const satelliteBody = new THREE.Mesh(bodyGeometry, bodyMaterial);
    satelliteGroup.add(satelliteBody);

    // Communication dish
    const dishGeometry = new THREE.ConeGeometry(1.2, 0.3, 16);
    const dishMaterial = new THREE.MeshPhongMaterial({
        color: 0xFFFFFF,
        shininess: 150,
        specular: 0x666666
    });
    
    const dish = new THREE.Mesh(dishGeometry, dishMaterial);
    dish.position.set(0, 1.8, 0);
    dish.rotation.x = Math.PI; // Point upward
    satelliteGroup.add(dish);

    // Solar panels (left and right)
    const createSolarPanel = (side: number) => {
        const panelGroup = new THREE.Group();
        
        // Panel base
        const panelGeometry = new THREE.BoxGeometry(3, 2, 0.1);
        const panelMaterial = new THREE.MeshPhongMaterial({
            color: 0x001133, // Dark blue
            shininess: 80,
            transparent: true,
            opacity: 0.9
        });
        
        const panel = new THREE.Mesh(panelGeometry, panelMaterial);
        panelGroup.add(panel);
        
        // Solar cell grid
        for (let i = 0; i < 6; i++) {
            for (let j = 0; j < 4; j++) {
                const cellGeometry = new THREE.PlaneGeometry(0.4, 0.4);
                const cellMaterial = new THREE.MeshPhongMaterial({
                    color: 0x003366,
                    shininess: 200,
                    transparent: true,
                    opacity: 0.8
                });
                
                const cell = new THREE.Mesh(cellGeometry, cellMaterial);
                cell.position.set(
                    -1.25 + (i * 0.5),
                    -0.75 + (j * 0.5),
                    0.051
                );
                panelGroup.add(cell);
            }
        }
        
        panelGroup.position.set(side * 2.5, 0, 0);
        return panelGroup;
    };
    
    const leftPanel = createSolarPanel(-1);
    const rightPanel = createSolarPanel(1);
    satelliteGroup.add(leftPanel);
    satelliteGroup.add(rightPanel);

    // Antenna array
    const createAntenna = (x: number, z: number, height: number = 1) => {
        const antennaGeometry = new THREE.CylinderGeometry(0.02, 0.02, height, 8);
        const antennaMaterial = new THREE.MeshPhongMaterial({
            color: 0x888888,
            shininess: 100
        });
        
        const antenna = new THREE.Mesh(antennaGeometry, antennaMaterial);
        antenna.position.set(x, height / 2 + 1.25, z);
        return antenna;
    };
    
    // Multiple antennas
    satelliteGroup.add(createAntenna(0.3, 0.3, 0.8));
    satelliteGroup.add(createAntenna(-0.3, 0.3, 1.2));
    satelliteGroup.add(createAntenna(0.3, -0.3, 1.0));
    satelliteGroup.add(createAntenna(-0.3, -0.3, 0.9));

    // Thruster nozzles
    const createThruster = (x: number, z: number) => {
        const thrusterGeometry = new THREE.ConeGeometry(0.1, 0.3, 8);
        const thrusterMaterial = new THREE.MeshPhongMaterial({
            color: 0x444444,
            shininess: 50
        });
        
        const thruster = new THREE.Mesh(thrusterGeometry, thrusterMaterial);
        thruster.position.set(x, -1.25, z);
        thruster.rotation.x = Math.PI; // Point downward
        return thruster;
    };
    
    satelliteGroup.add(createThruster(0.4, 0.4));
    satelliteGroup.add(createThruster(-0.4, 0.4));
    satelliteGroup.add(createThruster(0.4, -0.4));
    satelliteGroup.add(createThruster(-0.4, -0.4));

    // Blinking navigation lights
    const createNavLight = (position: THREE.Vector3, color: number) => {
        const lightGeometry = new THREE.SphereGeometry(0.05, 8, 8);
        const lightMaterial = new THREE.MeshPhongMaterial({
            color: color,
            emissive: color,
            emissiveIntensity: 0.5
        });
        
        const light = new THREE.Mesh(lightGeometry, lightMaterial);
        light.position.copy(position);
        return light;
    };
    
    const redLight = createNavLight(new THREE.Vector3(0, 1.25, 0.8), 0xFF0000);
    const greenLight = createNavLight(new THREE.Vector3(0, 1.25, -0.8), 0x00FF00);
    const blueLight = createNavLight(new THREE.Vector3(0.8, 0, 0), 0x0066FF);
    
    satelliteGroup.add(redLight);
    satelliteGroup.add(greenLight);
    satelliteGroup.add(blueLight);

    // Orbital properties
    const orbitRadius = 45; // Distance from Earth
    const orbitSpeed = 0.0005; // Much slower orbital speed
    const rotationSpeed = 0.0002; // Much slower rotation speed

    // Position satellite in orbit around Earth
    satelliteGroup.position.set(orbitRadius, 0, 0);
    
    // Create orbital pivot
    const satellitePivot = new THREE.Object3D();
    satellitePivot.add(satelliteGroup);

    // Animation variables
    let time = 0;
    let lightBlinkTime = 0;

    // Animation function
    const animate = () => {
        time += 0.016; // ~60fps
        lightBlinkTime += 0.016;
        
        // Orbit around Earth
        satellitePivot.rotation.y += orbitSpeed;
        
        // Satellite self-rotation
        satelliteGroup.rotation.y += rotationSpeed;
        
        // Solar panels always face the sun (simplified)
        leftPanel.rotation.y = Math.sin(time * 0.5) * 0.3;
        rightPanel.rotation.y = Math.sin(time * 0.5) * 0.3;
        
        // Blinking navigation lights
        const blinkIntensity = Math.sin(lightBlinkTime * 8) > 0.5 ? 1 : 0.2;
        redLight.material.emissiveIntensity = blinkIntensity;
        
        const blinkIntensity2 = Math.sin(lightBlinkTime * 6 + 1) > 0.5 ? 1 : 0.2;
        greenLight.material.emissiveIntensity = blinkIntensity2;
        
        const blinkIntensity3 = Math.sin(lightBlinkTime * 4 + 2) > 0.5 ? 1 : 0.2;
        blueLight.material.emissiveIntensity = blinkIntensity3;
        
        requestAnimationFrame(animate);
    };
    
    animate();

    // Satellite information
    const satelliteInfo = {
        name: 'Communications Satellite',
        description: 'Advanced orbital communications satellite providing global connectivity and internet services',
        diameter: '12m × 8m × 6m',
        distance: '35,786 km above Earth',
        year: '24 hours orbital period',
        day: 'Continuous operation',
        type: 'Geostationary Communications Satellite',
        altitude: '35,786 km above Earth',
        orbitalPeriod: '24 hours (synchronous with Earth rotation)',
        purpose: 'Telecommunications, Internet, GPS Navigation',
        launched: '2023',
        mass: '3,500 kg',
        powerGeneration: '15 kW (Solar panels)',
        status: 'Operational'
    };

    return {
        pivot: satellitePivot,
        mesh: satelliteGroup,
        orbitSpeed: orbitSpeed,
        rotationSpeed: rotationSpeed,
        name: 'Communications Satellite',
        info: satelliteInfo
    };
}