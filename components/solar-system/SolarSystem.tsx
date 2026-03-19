'use client';
import { useEffect, useRef, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import gsap from 'gsap';
import * as THREE from 'three';
// @ts-expect-error: three example loader types may not be present in project typings
import { KTX2Loader } from 'three/examples/jsm/loaders/KTX2Loader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Sun } from './planets/sun';
import { Starfield } from './planets/starfielt';
import { Mercury } from './planets/mercury';
import { Venus } from './planets/venus';
import { EarthWithMoon } from './planets/earth';
import { Satellite } from './planets/satellite';
import { Mars } from './planets/mars';
import { Jupiter } from './planets/jupiter';
import { Saturn } from './planets/saturn';
import { Uranus } from './planets/uranus';
import { Neptune } from './planets/neptune';
import Flag from '../ui/Flag';
import { getLabelByKey } from '@/data/labelsUtil';

type PlanetMesh = THREE.Object3D & {
  material?: THREE.Material | THREE.Material[];
  geometry?: THREE.BufferGeometry & { parameters?: { radius?: number } };
};

function setObjectMaterialOpacity(object: THREE.Object3D, opacity: number) {
  object.traverse((child) => {
    if (!(child instanceof THREE.Mesh || child instanceof THREE.Points || child instanceof THREE.Line || child instanceof THREE.Sprite)) {
      return;
    }

    const materials = Array.isArray(child.material) ? child.material : [child.material];
    materials.forEach((material) => {
      const mat = material as THREE.Material & { opacity?: number; transparent?: boolean };
      if (mat.opacity !== undefined) mat.opacity = opacity;
      if (mat.transparent !== undefined) mat.transparent = true;
      mat.needsUpdate = true;
    });
  });
}

function ServicesCarousel({ onClose }: Readonly<{ onClose: () => void }>) {
  return (
    <div className="mx-auto max-w-4xl rounded-t-2xl border border-white/15 bg-black/70 p-6 text-white">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold tracking-wide">Explore Services</h3>
        <button className="rounded border border-white/30 px-3 py-1 text-sm hover:bg-white/10" onClick={onClose}>
          Close
        </button>
      </div>
      <div className="grid gap-3 sm:grid-cols-3">
        <a className="rounded border border-white/20 p-3 hover:bg-white/10" href="/services">Product Engineering</a>
        <a className="rounded border border-white/20 p-3 hover:bg-white/10" href="/services">AI Solutions</a>
        <a className="rounded border border-white/20 p-3 hover:bg-white/10" href="/services">Experience Design</a>
      </div>
    </div>
  );
}

function PromotionCard({
  isVisible,
  onClose,
}: Readonly<{
  isVisible: boolean;
  onClose: () => void;
}>) {
  if (!isVisible) return null;

  return (
    <div className="pointer-events-auto absolute right-5 top-5 z-[1200] w-72 rounded-xl border border-white/20 bg-black/75 p-4 text-white backdrop-blur-sm">
      <p className="text-sm text-white/85">Want to launch your next product faster?</p>
      <a href="/contact" className="mt-3 inline-flex rounded border border-white/40 px-3 py-1.5 text-xs uppercase tracking-wider hover:bg-white/10">
        Talk to us
      </a>
      <button onClick={onClose} className="ml-2 text-xs text-white/70 underline hover:text-white">
        Dismiss
      </button>
    </div>
  );
}

interface SolarSystemProps {
  height?: string;
  isInteractive?: boolean;
  onReady?: () => void;
}

interface SolarSystemState {
  isInitializing: boolean;
  isLoaded: boolean;
  isReady: boolean;
  progress: number;
}

// Wrapper function for solar system initialization and rendering
function useSolarSystemLoader(onReady?: () => void) {
  const [state, setState] = useState<SolarSystemState>({
    isInitializing: true,
    isLoaded: false,
    isReady: false,
    progress: 0
  });

  const initializeSolarSystem = useCallback(() => {
    // Set initializing state
    setState(prev => ({ ...prev, isInitializing: true }));
    
    // Simulate initialization process
    const initTimer = setTimeout(() => {
      setState(prev => ({ ...prev, isInitializing: false }));
    }, 500);

    return () => clearTimeout(initTimer);
  }, []);

  const handleLoadingProgress = useCallback((progress: number) => {
    setState(prev => ({ ...prev, progress }));
  }, []);

  const handleLoaded = useCallback(() => {
    setState(prev => ({ ...prev, isLoaded: true }));
    
    // Small delay before marking as ready for smooth transition
    setTimeout(() => {
      setState(prev => ({ ...prev, isReady: true }));
      onReady?.();
    }, 300);
  }, [onReady]);

  return {
    state,
    initializeSolarSystem,
    handleLoadingProgress,
    handleLoaded
  };
}

interface Planet {
  mesh: PlanetMesh;
  pivot: THREE.Object3D;
  orbitSpeed: number;
  rotationSpeed: number;
  name: string;
  info: {
    description: string;
    diameter: string;
    distance: string;
    year: string;
    day: string;
  };
}

interface HoverState {
  planet: Planet | null;
  position: { x: number; y: number };
}

function canCreateWebGLContext() {
  try {
    const canvas = document.createElement('canvas');
    const gl2 = canvas.getContext('webgl2');
    if (gl2) return true;
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    return !!gl;
  } catch {
    return false;
  }
}

function SolarSystemCore({ height = '600px', isInteractive = true, onLoadingProgress, onLoaded }: SolarSystemProps & {
  onLoadingProgress?: (progress: number) => void;
  onLoaded?: () => void;
}) {
  const router = useRouter();
  const mountRef = useRef<HTMLDivElement>(null);
  const revealRef = useRef<(() => void) | null>(null);
  const clickHandlerRef = useRef<((e: MouseEvent) => void) | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const wheelHandlerRef = useRef<((e: WheelEvent) => void) | null>(null);
  const hoverHandlerRef = useRef<((e: MouseEvent) => void) | null>(null);
  const originalMaterialsRef = useRef<Map<THREE.Object3D, THREE.Material | THREE.Material[]>>(new Map());
  
  const [hoverState, setHoverState] = useState<HoverState>({ planet: null, position: { x: 0, y: 0 } });
  const [selectedPlanet, setSelectedPlanet] = useState<Planet | null>(null);
  const [isZoomed, setIsZoomed] = useState(false);
  const [sunFlagPos, setSunFlagPos] = useState<{ x: number; y: number } | null>(null);
  const [earthFlagPos, setEarthFlagPos] = useState<{ x: number; y: number } | null>(null);
  const [saturnFlagPos, setSaturnFlagPos] = useState<{ x: number; y: number } | null>(null);
  const [marsFlagPos, setMarsFlagPos] = useState<{ x: number; y: number } | null>(null);
  const [is3DLoaded, setIs3DLoaded] = useState(false);
  const [showLoadAnyway, setShowLoadAnyway] = useState(false);
  const [internalProgress, setInternalProgress] = useState(0);
  const [showPromoCard, setShowPromoCard] = useState(false);
  const [cardDismissed, setCardDismissed] = useState(false);
  const [webglError, setWebglError] = useState<string | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Planet data with information
  const planetData = [
    {
      name: 'Mercury',
      info: {
        description: 'The smallest planet and closest to the Sun',
        diameter: '4,879 km',
        distance: '58 million km from Sun',
        year: '88 Earth days',
        day: '59 Earth days'
      }
    },
    {
      name: 'Venus',
      info: {
        description: 'Hottest planet with toxic atmosphere',
        diameter: '12,104 km',
        distance: '108 million km from Sun',
        year: '225 Earth days',
        day: '243 Earth days'
      }
    },
    {
      name: 'Earth',
      info: {
        description: 'Our home planet, the only known planet with life',
        diameter: '12,742 km',
        distance: '150 million km from Sun',
        year: '365 days',
        day: '24 hours'
      }
    },
    {
      name: 'Mars',
      info: {
        description: 'The Red Planet, has polar ice caps',
        diameter: '6,779 km',
        distance: '228 million km from Sun',
        year: '687 Earth days',
        day: '24.6 hours'
      }
    },
    {
      name: 'Jupiter',
      info: {
        description: 'Largest planet, gas giant with Great Red Spot',
        diameter: '139,820 km',
        distance: '778 million km from Sun',
        year: '12 Earth years',
        day: '10 hours'
      }
    },
    {
      name: 'Saturn',
      info: {
        description: 'Famous for its spectacular ring system',
        diameter: '116,460 km',
        distance: '1.4 billion km from Sun',
        year: '29 Earth years',
        day: '11 hours'
      }
    },
    {
      name: 'Uranus',
      info: {
        description: 'Ice giant that rotates on its side',
        diameter: '50,724 km',
        distance: '2.9 billion km from Sun',
        year: '84 Earth years',
        day: '17 hours'
      }
    },
    {
      name: 'Neptune',
      info: {
        description: 'Farthest planet, windiest with supersonic storms',
        diameter: '49,244 km',
        distance: '4.5 billion km from Sun',
        year: '165 Earth years',
        day: '16 hours'
      }
    }
  ];

  useEffect(() => {
    if (!mountRef.current) return;

    if (!canCreateWebGLContext()) {
      setWebglError('WebGL is unavailable or blocked in this browser environment.');
      return;
    }

    const container = mountRef.current;

    // Scene, Camera, Renderer with optimized settings
    const scene = new THREE.Scene();
    const viewportWidth = window.innerWidth;
    const camera = new THREE.PerspectiveCamera(60, viewportWidth / container.clientHeight, 0.1, 2000);
    camera.position.set(0, 50, 80);

    setWebglError(null);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
        preserveDrawingBuffer: false,
        logarithmicDepthBuffer: false,
      });
    } catch (error) {
      console.error('SolarSystem: WebGL renderer initialization failed', error);
      setWebglError('WebGL is unavailable in this browser or environment.');
      return;
    }
    
    renderer.setSize(viewportWidth, container.clientHeight);
    renderer.setClearColor(0x000000, 0); // Transparent background
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 2.2;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.shadowMap.enabled = false; // Disable shadows for better performance
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Limit pixel ratio
    container.appendChild(renderer.domElement);

    // Raycaster for planet selection
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controlsRef.current = controls;

    // Store original camera position and controls target
    const originalCameraPosition = camera.position.clone();
    const originalControlsTarget = controls.target.clone();

    // Loading manager for smooth progress tracking
    const loadingManager = new THREE.LoadingManager();
    // Log loading errors to help diagnose browser-specific failures
    loadingManager.onError = (url) => {
      console.error('LoadingManager: failed to load', url);
    };
    
    // Store reference to reveal animation function
    let startRevealAnimation: (() => void) | null = null;
    
    loadingManager.onLoad = () => {
      setTimeout(() => {
        setIs3DLoaded(true);
        setShowLoadAnyway(false);
        if (onLoaded) {
          onLoaded();
        }
        // Trigger reveal animation immediately after loading
        if (startRevealAnimation) {
          requestAnimationFrame(() => {
            startRevealAnimation!();
          });
        }
      }, 100); // Reduced delay for faster appearance
    };
    
    loadingManager.onProgress = (url, itemsLoaded, itemsTotal) => {
      const progress = (itemsLoaded / itemsTotal) * 100;
      setInternalProgress(progress);
      if (onLoadingProgress) {
        onLoadingProgress(progress);
      }
    };

    // Real loader (used for actual network requests)
    const textureLoader = new THREE.TextureLoader();
    textureLoader.manager = loadingManager;

    // Keep `realLoader` alias used by planet helper modules (they expect a
    // TextureLoader-like object). Point it at our textureLoader so existing
    // code continues to work.
    const realLoader = textureLoader;

    // Progressive model loading - Start with essentials
    // Sun (highest priority)
    const { sunMesh, light: sunLight, rotationSpeed: sunRotSpeed } = Sun(realLoader);
    sunMesh.visible = false; // Initially hidden
    scene.add(sunMesh);
    scene.add(sunLight);

    // Starfield background (load first for immediate visual feedback)
    const stars = Starfield(realLoader);
    stars.visible = false;
    scene.add(stars);

    // --- Shooting Stars ---
    const SHOOTING_STAR_COUNT = 8;
    const shootingStarMeshes: THREE.Line[] = [];
    interface ShootingStar {
      line: THREE.Line;
      velocity: THREE.Vector3;
      life: number;
      maxLife: number;
      active: boolean;
      tailLength: number;
    }
    const shootingStars: ShootingStar[] = [];

    for (let i = 0; i < SHOOTING_STAR_COUNT; i++) {
      const trailPoints = 30;
      const positions = new Float32Array(trailPoints * 3);
      const opacities = new Float32Array(trailPoints);
      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute('alpha', new THREE.BufferAttribute(opacities, 1));

      const material = new THREE.ShaderMaterial({
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        uniforms: {
          uColor: { value: new THREE.Color(0.95, 0.88, 0.75) },
          uBrightness: { value: 1 },
        },
        vertexShader: `
          attribute float alpha;
          varying float vAlpha;
          void main() {
            vAlpha = alpha;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          uniform vec3 uColor;
          uniform float uBrightness;
          varying float vAlpha;
          void main() {
            gl_FragColor = vec4(uColor * uBrightness, vAlpha);
          }
        `,
      });

      const line = new THREE.Line(geometry, material);
      line.frustumCulled = false;
      scene.add(line);

      shootingStarMeshes.push(line);
      shootingStars.push({
        line,
        velocity: new THREE.Vector3(),
        life: 0,
        maxLife: 0,
        active: false,
        tailLength: trailPoints,
      });
    }

    function spawnShootingStar(star: ShootingStar) {
      // Spawn from right-top or left-background
      const spawnType = Math.random() < 0.5 ? 'right' : 'left';
      let x, y, z;
      if (spawnType === 'right') {
        // Right-top corner
        x = 350 + Math.random() * 120;
        y = 320 + Math.random() * 60;
        z = 80 + Math.random() * 120;
      } else {
        // Left-background
        x = -350 - Math.random() * 120;
        y = 220 + Math.random() * 80;
        z = -80 - Math.random() * 120;
      }

      // Direction: mostly downward, slight horizontal toward center
      const dir = new THREE.Vector3(
        spawnType === 'right' ? -0.3 - Math.random() * 0.3 : 0.3 + Math.random() * 0.3,
        -1,
        spawnType === 'right' ? -0.1 - Math.random() * 0.2 : 0.1 + Math.random() * 0.2
      ).normalize();
      const speed = 4 + Math.random() * 3;
      star.velocity.copy(dir).multiplyScalar(speed);

      // Init trail positions to spawn point
      const posArr = star.line.geometry.attributes.position.array as Float32Array;
      const alphaArr = star.line.geometry.attributes.alpha.array as Float32Array;
      for (let j = 0; j < star.tailLength; j++) {
        posArr[j * 3] = x;
        posArr[j * 3 + 1] = y;
        posArr[j * 3 + 2] = z;
        alphaArr[j] = 0;
      }
      star.line.geometry.attributes.position.needsUpdate = true;
      star.line.geometry.attributes.alpha.needsUpdate = true;

      star.life = 0;
      star.maxLife = 60 + Math.random() * 90;
      star.active = true;
    }

    let shootingStarTimer = 0;
    const shootingStarStartTime = Date.now();
    function updateShootingStars() {
      shootingStarTimer++;
      const elapsed = (Date.now() - shootingStarStartTime) / 1000;
      // Only spawn for first 10 seconds
      if (elapsed < 10) {
        if (shootingStarTimer % (45 + Math.floor(Math.random() * 80)) === 0) {
          const inactive = shootingStars.find(s => !s.active);
          if (inactive) spawnShootingStar(inactive);
        }
      }

      shootingStars.forEach(star => {
        if (!star.active) return;
        star.life++;

        const posArr = star.line.geometry.attributes.position.array as Float32Array;
        const alphaArr = star.line.geometry.attributes.alpha.array as Float32Array;

        // Shift trail positions back
        for (let j = star.tailLength - 1; j > 0; j--) {
          posArr[j * 3] = posArr[(j - 1) * 3];
          posArr[j * 3 + 1] = posArr[(j - 1) * 3 + 1];
          posArr[j * 3 + 2] = posArr[(j - 1) * 3 + 2];
        }

        // Move head
        posArr[0] += star.velocity.x;
        posArr[1] += star.velocity.y;
        posArr[2] += star.velocity.z;

        // Gravity pull
        star.velocity.y -= 0.015;

        // Calculate life progress for fade
        const progress = star.life / star.maxLife;
        const brightness = progress < 0.15 ? progress / 0.15 : Math.max(0, 1 - (progress - 0.15) / 0.85);

        // Update trail alpha (head bright, tail fading)
        for (let j = 0; j < star.tailLength; j++) {
          const tailFade = 1 - j / star.tailLength;
          alphaArr[j] = brightness * tailFade * tailFade * 0.9;
        }

        star.line.geometry.attributes.position.needsUpdate = true;
        star.line.geometry.attributes.alpha.needsUpdate = true;

        // Update material brightness
        (star.line.material as THREE.ShaderMaterial).uniforms.uBrightness.value = brightness;

        // Deactivate when life is over
        if (star.life >= star.maxLife) {
          star.active = false;
          for (let j = 0; j < star.tailLength; j++) {
            alphaArr[j] = 0;
          }
          star.line.geometry.attributes.alpha.needsUpdate = true;
        }
      });
    }
    // --- End Shooting Stars ---

    // Planets with enhanced data (progressive loading)
    const mercury = Mercury(realLoader);
    const venus = Venus(realLoader);
    const { mesh: earth, moon, pivot: earthPivot, rotationSpeed, orbitSpeed } = EarthWithMoon(realLoader);

    // Add earthPivot (Earth + Moon group) to the scene
    scene.add(earthPivot);
    const satellite = Satellite(realLoader);
    const mars = Mars(realLoader);
    const jupiter = Jupiter(realLoader);
    const saturn = Saturn(realLoader);
    const uranus = Uranus(realLoader);
    const neptune = Neptune(realLoader);
    
    // Initially hide all planets
    [mercury, venus, satellite, mars, jupiter, saturn, uranus, neptune].forEach((planet) => {
      planet?.mesh && (planet.mesh.visible = false);
    });
    // Hide earth and moon explicitly
    if (earth) earth.visible = false;
    if (moon?.mesh) moon.mesh.visible = false;
    
    // Define complete reveal animation function after all objects are created
    startRevealAnimation = () => {
      // Immediately show all elements at full brightness
      if (stars) {
        stars.visible = true;
        setObjectMaterialOpacity(stars, 0.9);
      }
      
      // Show sun immediately at full brightness
      if (sunMesh) {
        sunMesh.visible = true;
      }
      
      // Show all planets immediately
      const planetList = [mercury, venus, mars, jupiter, saturn, uranus, neptune];
      planetList.forEach((planet) => {
        if (planet?.mesh) {
          planet.mesh.visible = true;
        }
      });
      
      // Show Earth immediately
      if (earth) {
        earth.visible = true;
      }
      
      // Show moon immediately
      if (moon?.mesh) {
        moon.mesh.visible = true;
      }
      
      // Show satellite immediately
      if (satellite?.mesh) {
        satellite.mesh.visible = true;
      }
    };

    // Create Sun planet object
    const sunPlanet: Planet = {
      mesh: sunMesh,
      pivot: new THREE.Object3D(), // Sun doesn't orbit, so empty pivot
      orbitSpeed: 0,
      rotationSpeed: sunRotSpeed,
      name: 'Sun',
      info: {
        description: 'The star at the center of our solar system, providing light and heat to all planets',
        diameter: '1,392,700 km',
        distance: 'Center of Solar System',
        year: 'N/A (stationary)',
        day: '25-35 days (varies by latitude)'
      }
    };

    // Create satellite planet object for interaction
    const satellitePlanet: Planet = {
      mesh: satellite.mesh,
      pivot: satellite.pivot,
      orbitSpeed: satellite.orbitSpeed,
      rotationSpeed: satellite.rotationSpeed,
      name: satellite.name,
      info: {
        description: satellite.info.description,
        diameter: satellite.info.diameter,
        distance: satellite.info.distance,
        year: satellite.info.year,
        day: satellite.info.day
      }
    };

    // Create Earth planet object
    const earthPlanet: Planet = {
      mesh: earth,
      pivot: earthPivot,
      orbitSpeed: orbitSpeed,
      rotationSpeed: rotationSpeed,
      name: 'Earth',
      info: planetData[2].info
    };

    // Add planet data to planets (include Sun as first planet)
    const planets: Planet[] = [
      sunPlanet,
      { ...mercury, ...planetData[0] },
      { ...venus, ...planetData[1] },
      earthPlanet,
      satellitePlanet,
      { ...mars, ...planetData[3] },
      { ...jupiter, ...planetData[4] },
      { ...saturn, ...planetData[5] },
      { ...uranus, ...planetData[6] },
      { ...neptune, ...planetData[7] }
    ];

    // Add planet pivots to scene and hide planets initially
    planets.forEach(p => {
      if (p.pivot && p.pivot instanceof THREE.Object3D) {
        scene.add(p.pivot);
      } else {
        console.warn(`Skipping invalid pivot for planet: ${p.name}`);
      }
      if (p.mesh) p.mesh.visible = false; // Hide for smooth reveal
    });
    // Debug info: log container and renderer element sizes
    try {
      console.info('SolarSystem: container size', container.clientWidth, container.clientHeight);
      const rect = renderer.domElement.getBoundingClientRect();
      console.info('SolarSystem: renderer element rect', rect.width, rect.height);
    } catch (e) {
      console.warn('SolarSystem: failed to read sizes', e);
    }

    // Temporary debug mesh: add a hidden white cube at the origin so we can verify rendering if needed
    let debugBox: THREE.Mesh | null = null;
    try {
      const debugGeo = new THREE.BoxGeometry(2, 2, 2);
      const debugMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
      debugBox = new THREE.Mesh(debugGeo, debugMat);
      debugBox.position.set(0, 0, 0);
      debugBox.visible = false; // keep hidden until real load completes
      scene.add(debugBox);
      console.info('SolarSystem: debug box added to scene (hidden)');
    } catch (e) {
      console.warn('SolarSystem: failed to add debug box', e);
    }

    // Start background KTX2 (Basis) loading and swap into materials when available.
    try {
      const ktx2 = new KTX2Loader()
        .setTranscoderPath('/basis/')
        .detectSupport(renderer);

      const ktxNames = [
        'earth', 'mars', 'jupiter', 'venus', 'mercury', 'neptune', 'saturn',
        'sun', 'stars_milky_way', 'earth_moon', 'saturn_ring_alpha', 'saturn_normal', 'satellite_body'
      ];

      (async () => {
        for (const name of ktxNames) {
          const ktxUrl = `/earth/${name}.ktx2`;
          try {
            const tex = await ktx2.loadAsync(ktxUrl);
            tex.colorSpace = THREE.SRGBColorSpace;
            tex.generateMipmaps = true;
            tex.minFilter = THREE.LinearMipmapLinearFilter;

            // Swap into any material that used the original image
              scene.traverse((obj) => {
                if (obj instanceof THREE.Mesh) {
                  const mat = obj.material as THREE.Material | THREE.Material[] | undefined;
                  if (!mat) return;
                  const mats = Array.isArray(mat) ? mat : [mat];
                  mats.forEach((m) => {
                    const mRec = m as unknown as Record<string, unknown>;
                    const mapVal = mRec['map'];
                    if (!mapVal || typeof mapVal !== 'object') return;
                    const mapRec = mapVal as Record<string, unknown>;
                    const imageVal = mapRec['image'];
                    if (!imageVal || typeof imageVal !== 'object') return;
                    const imageRec = imageVal as Record<string, unknown>;
                    const srcVal = imageRec['src'];
                    if (typeof srcVal === 'string' && srcVal.includes(`${name}.`)) {
                      // assign the ktx2 texture
                      mRec['map'] = tex;
                      // try to set needsUpdate if present
                      const maybeNeedsUpdate = mRec['needsUpdate'];
                      if (typeof maybeNeedsUpdate === 'boolean' || maybeNeedsUpdate === undefined) {
                        (mRec as Record<string, unknown>)['needsUpdate'] = true;
                      }
                    }
                  });
                }
              });
            console.info('KTX2: swapped', ktxUrl);
          } catch {
            // ignore missing ktx2 files, continue
            // console.debug('KTX2 missing or failed for', ktxUrl, e);
          }
        }
      })();
    } catch (e) {
      console.warn('KTX2 loader setup failed', e);
    }
    
      // Fallback: if loading takes too long, allow the user to reveal the scene anyway
      const fallbackTimer = setTimeout(() => {
        console.warn('SolarSystem: loading taking unusually long — showing "Show anyway" option');
        setShowLoadAnyway(true);
      }, 10000); // 10s

      // expose a manual reveal so the UI button can call it
      revealRef.current = () => {
        setIs3DLoaded(true);
        try {
          startRevealAnimation();
        } catch (e) {
          console.warn('SolarSystem: startRevealAnimation not available', e);
        }
        setShowLoadAnyway(false);
      };
    // Create orbital circles for planets (excluding Sun)
    const orbitalCircles: THREE.Line[] = [];
    planets.slice(1).forEach((planet) => {
      // Validate planet mesh before accessing position
      if (!planet.mesh || !planet.mesh.position) {
        console.warn(`Skipping orbital circle for ${planet.name}: mesh or position is undefined`);
        return;
      }
      
      // Get the orbital radius from the planet's position
      const orbitalRadius = planet.mesh.position.length();
      
      const circleGeometry = new THREE.RingGeometry(orbitalRadius - 0.1, orbitalRadius + 0.1, 128);
      const circleMaterial = new THREE.MeshBasicMaterial({
        color: 0x444444,
        transparent: true,
        opacity: 0.3,
        side: THREE.DoubleSide
      });
      
      const circle = new THREE.Mesh(circleGeometry, circleMaterial);
      circle.rotation.x = -Math.PI / 2; // Rotate to lie flat
      scene.add(circle);
      orbitalCircles.push(circle as unknown as THREE.Line);
    });

    // Add Moon orbital circle around Earth
    if (moon?.mesh?.position) {
      const moonOrbitRadius = moon.mesh.position.length();
      const moonCircleGeometry = new THREE.RingGeometry(moonOrbitRadius - 0.05, moonOrbitRadius + 0.05, 128);
      const moonCircleMaterial = new THREE.MeshBasicMaterial({
        color: 0x666666,
        transparent: true,
        opacity: 0.2,
        side: THREE.DoubleSide
      });
      const moonCircle = new THREE.Mesh(moonCircleGeometry, moonCircleMaterial);
      moonCircle.rotation.x = -Math.PI / 2;
      earth.add(moonCircle);
    }

    // Add Moon to Earth
    if (moon?.pivot) {
      earth.add(moon.pivot);
    }
    
    // Add Satellite to Earth orbit
    if (satellite?.pivot) {
      earth.add(satellite.pivot);
    }

    // Store original materials for hover effects
    planets.forEach((planet) => {
      if (planet.mesh.material) {
        originalMaterialsRef.current.set(planet.mesh, planet.mesh.material);
      }
    });

    // Enhanced zoom to planet function
    function zoomToPlanet(planet: Planet) {
      if (isZoomed) {
        // Return to overview
        gsap.to(camera.position, {
          x: originalCameraPosition.x,
          y: originalCameraPosition.y,
          z: originalCameraPosition.z,
          duration: 1.2,
          ease: 'power2.inOut',
          onUpdate: () => {
            camera.lookAt(controls.target);
          },
          onComplete: () => {
            controls.target.copy(originalControlsTarget);
            controls.update();
            setIsZoomed(false);
            setSelectedPlanet(null);
          }
        });
      } else {
        // Zoom to planet
        const planetPosition = new THREE.Vector3();
        planet.mesh.getWorldPosition(planetPosition);

        const geomParams = (planet.mesh.geometry as unknown as { parameters?: { radius?: number } }).parameters;
        const radius = geomParams?.radius ?? 1;
        const distance = radius * 8;

        const targetCameraPos = {
          x: planetPosition.x + distance,
          y: planetPosition.y + distance * 0.5,
          z: planetPosition.z + distance
        };

        gsap.to(controls.target, {
          x: planetPosition.x,
          y: planetPosition.y,
          z: planetPosition.z,
          duration: 1.2,
          ease: 'power2.out',
          onUpdate: () => {
            controls.update();
          }
        });

        gsap.to(camera.position, {
          x: targetCameraPos.x,
          y: targetCameraPos.y,
          z: targetCameraPos.z,
          duration: 1.2,
          ease: 'power2.out',
          onUpdate: () => camera.lookAt(controls.target)
        });

        setIsZoomed(true);
        setSelectedPlanet(planet);
      }
    }

    // Enhanced mouse click handler
    function onMouseClick(event: MouseEvent) {
      const rect = container.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      mouse.x = (x / rect.width) * 2 - 1;
      mouse.y = -(y / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);

      const planetMeshes = planets.map((p) => p.mesh);
      const intersects = raycaster.intersectObjects(planetMeshes);

      if (intersects.length > 0) {
        const clickedMesh = intersects[0].object;
        const planetIndex = planetMeshes.indexOf(clickedMesh);

        if (planetIndex !== -1) {
          const planet = planets[planetIndex];
          // Route to relevant pages for labeled planets; otherwise zoom
          const planetRoutes: Record<string, string> = {
            Sun: '/blog',
            Earth: '/contact',
            Saturn: '/services',
            Mars: '/feedback',
          };

          const route = planetRoutes[planet.name];
          if (route) {
            router.push(route);
            return;
          }
          zoomToPlanet(planet);
        }
      }
    }

    // Enhanced hover handler
    function onMouseMove(event: MouseEvent) {
      const rect = container.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      mouse.x = (x / rect.width) * 2 - 1;
      mouse.y = -(y / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);

      const planetMeshes = planets.map((p) => p.mesh);
      const intersects = raycaster.intersectObjects(planetMeshes);

      // Reset all planets to original materials (skip Sun since it uses MeshBasicMaterial)
      planets.forEach(planet => {
        if (planet.name !== 'Sun') {
          const originalMaterial = originalMaterialsRef.current.get(planet.mesh);
          if (originalMaterial) {
            planet.mesh.material = originalMaterial;
          }
        }
      });

      if (intersects.length > 0) {
        const hoveredMesh = intersects[0].object;
        const planetIndex = planetMeshes.indexOf(hoveredMesh);

        if (planetIndex !== -1) {
          const planet = planets[planetIndex];
          
          // Highlight hovered planet
          if (planet.name === 'Sun' && planet.mesh.material instanceof THREE.MeshBasicMaterial) {
            const highlightedMaterial = planet.mesh.material.clone();
            highlightedMaterial.color.multiplyScalar(1.35); // Increase brightness for hover feedback
            planet.mesh.material = highlightedMaterial;
          } else if (planet.mesh.material instanceof THREE.MeshStandardMaterial) {
            const highlightedMaterial = planet.mesh.material.clone();
            highlightedMaterial.emissive.setHex(0x444444);
            highlightedMaterial.emissiveIntensity = 0.3;
            planet.mesh.material = highlightedMaterial;
          }

          setHoverState({
            planet,
            position: { x: event.clientX, y: event.clientY }
          });
        } else {
          setHoverState({ planet: null, position: { x: 0, y: 0 } });
        }
      } else {
        setHoverState({ planet: null, position: { x: 0, y: 0 } });
      }
    }

    clickHandlerRef.current = onMouseClick;
    hoverHandlerRef.current = onMouseMove;

    // Prevent default wheel behavior
    function onWheel(e: WheelEvent) {
      e.preventDefault();
      e.stopPropagation();
    }
    wheelHandlerRef.current = onWheel;

    // Enhanced lighting
    const pointLight = new THREE.PointLight(0xffffff, 15, 0);
    pointLight.position.set(0, 0, 0);
    scene.add(pointLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(100, 50, 100);
    scene.add(directionalLight);

    scene.add(new THREE.AmbientLight(0xffffff));
    


    // Enhanced animation loop with performance optimizations
    let rafId = 0;
    let lastTime = 0;
    const targetFPS = 60;
    const frameTime = 1000 / targetFPS;
    
    function animate(currentTime = 0) {
      rafId = requestAnimationFrame(animate);
      
      // Throttle to target FPS for smoother performance
      if (currentTime - lastTime < frameTime) return;
      lastTime = currentTime;

      if (is3DLoaded && sunMesh.visible) {
        sunMesh.rotation.y += sunRotSpeed;
      }

      // Enhanced planet movements with subtle variations (counter-clockwise)
      planets.forEach((planet) => {
        // Base orbital and rotational speeds (negative for counter-clockwise)
        planet.pivot.rotation.y -= planet.orbitSpeed;
        planet.mesh.rotation.y += planet.rotationSpeed;
        
        // Add subtle wobble effect
        if (hoverState.planet === planet) {
          planet.mesh.rotation.y += 0.01; // Speed up rotation when hovered
        }
      });

      // Rotate Saturn's rings with enhanced effect
      const saturnRings = (saturn.mesh as unknown as { rings?: THREE.Object3D[] }).rings;
      if (saturnRings) {
        saturnRings.forEach((ring, index) => {
          ring.rotation.z += 0.001 + (index * 0.0002); // Varying ring speeds
        });
      }

      // Enhanced Moon movement
      if (moon && moon.pivot && moon.mesh) {
        moon.pivot.rotation.y += moon.orbitSpeed;
        moon.mesh.rotation.y += moon.rotationSpeed;
      }
      
      // Satellite orbital movement
      if (satellite && satellite.pivot && satellite.mesh) {
        satellite.pivot.rotation.y += satellite.orbitSpeed;
        satellite.mesh.rotation.y += satellite.rotationSpeed;
      }

      // Shooting stars
      updateShootingStars();

      controls.update();
      renderer.render(scene, camera);

      // compute Sun screen position for overlay flag
      try {
        const sunWorld = new THREE.Vector3();
        sunMesh.getWorldPosition(sunWorld);
        const projected = sunWorld.clone().project(camera);
        const sx = (projected.x * 0.5 + 0.5) * renderer.domElement.clientWidth;
        const sy = (-projected.y * 0.5 + 0.5) * renderer.domElement.clientHeight;
        // place flag above the sun with proper spacing
        setSunFlagPos({ x: sx, y: sy - 80 });
      } catch {
        // ignore
      }

      // compute Earth screen position for overlay flag
      try {
        const earthWorld = new THREE.Vector3();
        earth.getWorldPosition(earthWorld);
        const earthProjected = earthWorld.clone().project(camera);
        const ex = (earthProjected.x * 0.5 + 0.5) * renderer.domElement.clientWidth;
        const ey = (-earthProjected.y * 0.5 + 0.5) * renderer.domElement.clientHeight;
        // place flag above the earth with proper spacing
        setEarthFlagPos({ x: ex, y: ey - 60 });
      } catch {
        // ignore
      }

      // compute Saturn screen position for overlay flag
      try {
        const saturnWorld = new THREE.Vector3();
        saturn.mesh.getWorldPosition(saturnWorld);
        const saturnProjected = saturnWorld.clone().project(camera);
        const sx = (saturnProjected.x * 0.5 + 0.5) * renderer.domElement.clientWidth;
        const sy = (-saturnProjected.y * 0.5 + 0.5) * renderer.domElement.clientHeight;
        // place flag above Saturn with proper spacing
        setSaturnFlagPos({ x: sx, y: sy - 60 });
      } catch {
        // ignore
      }

      // compute Mars screen position for overlay flag
      try {
        const marsWorld = new THREE.Vector3();
        mars.mesh.getWorldPosition(marsWorld);
        const marsProjected = marsWorld.clone().project(camera);
        const mx = (marsProjected.x * 0.5 + 0.5) * renderer.domElement.clientWidth;
        const my = (-marsProjected.y * 0.5 + 0.5) * renderer.domElement.clientHeight;
        // place flag above Mars with proper spacing
        setMarsFlagPos({ x: mx, y: my - 60 });
      } catch {
        // ignore
      }
    }

    animate();

    const handleResize = () => {
      if (container) {
        const resizedViewportWidth = window.innerWidth;
        camera.aspect = resizedViewportWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(resizedViewportWidth, container.clientHeight);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      // clear fallback timer if still pending
      try { clearTimeout(fallbackTimer); } catch { /* ignore */ }
      // Enhanced cleanup
      window.removeEventListener('resize', handleResize);
      
      // Remove event listeners
      if (clickHandlerRef.current) {
        container.removeEventListener('click', clickHandlerRef.current);
      }
      if (wheelHandlerRef.current) {
        container.removeEventListener('wheel', wheelHandlerRef.current as EventListener);
      }
      
      // Dispose controls and renderer
      controls.dispose();
      if (renderer.domElement.parentNode === container) {
        renderer.domElement.remove();
      }
      
      cancelAnimationFrame(rafId);
      
      // Enhanced Three.js cleanup
      try {
        const forceFn = (renderer as unknown as { forceContextLoss?: () => void }).forceContextLoss;
        if (forceFn) forceFn();
      } catch (err) {
        console.warn('Error calling forceContextLoss on renderer', err);
      }
      
      // Dispose shooting stars
      shootingStarMeshes.forEach(line => {
        scene.remove(line);
        line.geometry?.dispose();
        if (line.material instanceof THREE.ShaderMaterial) {
          line.material.dispose();
        }
      });

      // Dispose orbital circles
      orbitalCircles.forEach(circle => {
        scene.remove(circle);
        circle.geometry?.dispose();
        if (circle.material) {
          if (Array.isArray(circle.material)) {
            circle.material.forEach(material => material.dispose());
          } else {
            circle.material.dispose();
          }
        }
      });

      // Dispose geometries and materials
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();
          if (Array.isArray(object.material)) {
            object.material.forEach(material => material.dispose());
          } else {
            object.material.dispose();
          }
        }
      });
      
      renderer.dispose();
    };

  // We intentionally keep the effect dependencies minimal because the Three.js
  // scene and controls are managed imperatively. Updating these refs every
  // render would cause expensive re-inits. Disable the exhaustive-deps rule here.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  // Dynamic event listener management
  useEffect(() => {
    const container = mountRef.current;
    const clickHandler = clickHandlerRef.current;
    const hoverHandler = hoverHandlerRef.current;
    
    if (!container || !clickHandler || !hoverHandler) return;

    if (isInteractive) {
      container.addEventListener('click', clickHandler);
      container.addEventListener('mousemove', hoverHandler);
      
      if (wheelHandlerRef.current) {
        container.addEventListener('wheel', wheelHandlerRef.current as EventListener, { passive: false });
      }
      
      if (controlsRef.current) {
        controlsRef.current.enabled = true;
        controlsRef.current.enableZoom = true;
        controlsRef.current.enableRotate = true;
        controlsRef.current.enablePan = true;
      }
    } else {
      container.removeEventListener('click', clickHandler);
      container.removeEventListener('mousemove', hoverHandler);
      
      if (wheelHandlerRef.current) {
        container.removeEventListener('wheel', wheelHandlerRef.current as EventListener);
      }
      
      if (controlsRef.current) {
        controlsRef.current.enabled = false;
      }
    }

    return () => {
      container.removeEventListener('click', clickHandler);
      container.removeEventListener('mousemove', hoverHandler);
      if (wheelHandlerRef.current) container.removeEventListener('wheel', wheelHandlerRef.current as EventListener);
    };
  }, [isInteractive]);

  // 30-second timer for promotional card
  useEffect(() => {
    if (isInteractive && is3DLoaded && !cardDismissed) {
      timerRef.current = setTimeout(() => {
        setShowPromoCard(true);
      }, 30000); // 30 seconds
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [isInteractive, is3DLoaded, cardDismissed]);

  const handleCloseCard = () => {
    setShowPromoCard(false);
    setCardDismissed(true);
  };

  if (webglError) {
    return (
      <div
        ref={mountRef}
        className="solar-system-container"
        style={{
          width: '100vw',
          maxWidth: '100vw',
          marginLeft: 'calc(50% - 50vw)',
          marginRight: 'calc(50% - 50vw)',
          height: height,
          overflow: 'hidden',
          position: 'relative',
          padding: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'radial-gradient(circle at 50% 40%, rgba(140, 0, 0, 0.18), rgba(0, 0, 0, 0.95))',
        }}
      >
        <div className="max-w-md rounded-xl border border-white/20 bg-black/65 p-6 text-center text-white backdrop-blur-sm">
          <h3 className="text-lg font-semibold tracking-wide">3D View Not Available</h3>
          <p className="mt-2 text-sm text-white/80">{webglError}</p>
          <p className="mt-2 text-xs text-white/60">
            Try enabling hardware acceleration, updating GPU drivers, or using a different browser.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={mountRef}
      className="solar-system-container"
      style={{
        width: '100vw',
        maxWidth: '100vw',
        marginLeft: 'calc(50% - 50vw)',
        marginRight: 'calc(50% - 50vw)',
        height: height,
        overflow: 'hidden',
        position: 'relative',
        padding: 0,
        cursor: isInteractive ? 'pointer' : 'default'
      }}
    >
      {/* Smooth Loading Overlay */}
      {!is3DLoaded && (
        <div className="absolute inset-0 flex items-center justify-center z-50 bg-black/20 backdrop-blur-sm transition-opacity duration-500">
          <div className="text-center space-y-3">
            <div className="w-10 h-10 border-2 border-white/40 border-t-white rounded-full animate-spin mx-auto" />
            <div className="text-white/70 text-xs font-light tracking-wider">
              Loading Universe... {Math.round(internalProgress)}%
            </div>
          </div>
        </div>
      )}
      {/* 3D Loading Indicator */}
      {!is3DLoaded && (
        <div className="absolute inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-sm">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 border-2 border-white/40 border-t-white rounded-full animate-spin mx-auto"></div>
            <div className="text-white/80 text-sm font-light tracking-wide">
              Loading 3D Universe... {Math.round(internalProgress)}%
            </div>
            <div className="w-32 h-1 bg-white/30 rounded-full mx-auto overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-white to-white/90 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${internalProgress}%` }}
              ></div>
            </div>
                  {showLoadAnyway && (
                    <div className="mt-4 text-center">
                      <button
                        onClick={() => {
                          if (revealRef.current) revealRef.current();
                        }}
                        className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-md border border-white/20"
                      >
                        Show scene anyway
                      </button>
                    </div>
                  )}
          </div>
        </div>
      )}
      {/* Planet Info Tooltip */}
      {hoverState.planet && isInteractive && (
        <div
          style={{
            position: 'fixed',
            left: hoverState.position.x + 15,
            top: Math.max(hoverState.position.y - 10, 90),
            background: 'rgba(0, 0, 0, 0.9)',
            color: 'white',
            padding: '12px',
            borderRadius: '8px',
            fontSize: '12px',
            maxWidth: '200px',
            zIndex: 1000,
            pointerEvents: 'none',
            transform: 'translateY(-100%)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            backdropFilter: 'blur(10px)'
          }}
        >
          <h4 style={{ margin: '0 0 8px 0', fontSize: '14px', color: '#4fc3f7' }}>
            {hoverState.planet.name}
          </h4>
          <p style={{ margin: '4px 0', opacity: 0.9 }}>{hoverState.planet.info.description}</p>
          <div style={{ fontSize: '10px', opacity: 0.7, marginTop: '8px' }}>
            <div>Diameter: {hoverState.planet.info.diameter}</div>
            <div>Distance: {hoverState.planet.info.distance}</div>
            <div>Year: {hoverState.planet.info.year}</div>
            <div>Day: {hoverState.planet.info.day}</div>
          </div>
        </div>
      )}

      {/* Services Carousel Overlay on Planet Click */}
      {selectedPlanet?.name === 'Saturn' && (
        <div
          className="fixed inset-0 z-[10000] flex items-end justify-center pb-0 bg-black/60 backdrop-blur-sm"
          onClick={() => setSelectedPlanet(null)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') {
              setSelectedPlanet(null);
            }
          }}
        >
          <div
            className="w-full"
            onClick={(e) => e.stopPropagation()}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.stopPropagation();
              }
            }}
          >
            <div className="absolute top-8 left-1/2 -translate-x-1/2 z-50">
              <h2 className="text-2xl md:text-3xl font-thin text-white tracking-widest text-center mb-2">
                {selectedPlanet.name}
              </h2>
              <p className="text-white/60 text-sm font-light tracking-wide text-center">
                {selectedPlanet.info.description}
              </p>
            </div>
            <ServicesCarousel onClose={() => setSelectedPlanet(null)} />
          </div>
        </div>
      )}

      {/* Controls Hint */}
      {isInteractive && !selectedPlanet && (
        <div
          style={{
            position: 'absolute',
            top: '100px',
            right: '20px',
            background: 'rgba(0, 0, 0, 0.7)',
            color: 'white',
            padding: '12px',
            borderRadius: '8px',
            fontSize: '12px',
            zIndex: 1000,
            border: '1px solid rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(5px)'
          }}
        >
          <div><strong>Controls:</strong></div>
          <div>• Click planets to zoom in</div>
          <div>• Hover for quick info</div>
          <div>• Drag to rotate view</div>
          <div>• Scroll to zoom</div>
        </div>
      )}

      {/* Sun Flag Overlay */}
      <Flag head={sunFlagPos} text={getLabelByKey('work')} link="/blog" />
      
      {/* Earth Flag Overlay */}
      <Flag head={earthFlagPos} text={getLabelByKey('contact')} link="/contact" />
      
      {/* Saturn Flag Overlay */}
      <Flag head={saturnFlagPos} text="Services" link="/services" />
      
      {/* Mars Flag Overlay */}
      <Flag head={marsFlagPos} text="Subscribe Us" link="/feedback" />

      {/* 3D Promotion Card */}
      <PromotionCard
        isVisible={showPromoCard}
        onClose={handleCloseCard}
      />
    </div>
  );
}

// Main SolarSystem component with initialization wrapper
export default function SolarSystem({ height = '600px', isInteractive = true, onReady }: Readonly<SolarSystemProps>) {
  const { state, initializeSolarSystem, handleLoadingProgress, handleLoaded } = useSolarSystemLoader(onReady);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    // Initialize solar system
    const cleanup = initializeSolarSystem();
    
    // Start rendering after initialization
    const renderTimer = setTimeout(() => {
      setShouldRender(true);
    }, 100);

    return () => {
      cleanup?.();
      clearTimeout(renderTimer);
    };
  }, [initializeSolarSystem]);

  // Show loading state during initialization
  if (!shouldRender || state.isInitializing) {
    return (
      <div 
        className="solar-system-container"
        style={{
          width: '100vw',
          maxWidth: '100vw',
          marginLeft: 'calc(50% - 50vw)',
          marginRight: 'calc(50% - 50vw)',
          height: height,
          overflow: 'hidden',
          position: 'relative',
          padding: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <div className="text-center space-y-3">
          <div className="w-8 h-8 border-2 border-white/40 border-t-white rounded-full animate-spin mx-auto" />
          <div className="text-white/80 text-xs font-light tracking-wider">
            Initializing Solar System...
          </div>
        </div>
      </div>
    );
  }

  // Render with smooth fade-in when ready
  return (
    <div 
      style={{
        opacity: state.isReady ? 1 : 0.95,
        transition: 'opacity 0.4s ease-out'
      }}
    >
      <SolarSystemCore
        height={height}
        isInteractive={isInteractive}
        onLoadingProgress={handleLoadingProgress}
        onLoaded={handleLoaded}
      />
    </div>
  );
}
