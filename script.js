// =============================================================================
// CROP ROTATION HUB - ENHANCED 3D ANIMATIONS & INTERACTIONS
// Advanced Agricultural Website with Crop-Specific Animations
// =============================================================================

// ========== GLOBAL VARIABLES ==========
let scene, camera, renderer, farmScene;
let crops3D = [];
let rotationCycle = 2;
let animationFrame;
let cropAnimations = [];
let weatherEffects = [];
let growthAnimations = [];
let seasonalLighting;

// Crop Animation Configurations
const CROP_CONFIGS = {
    wheat: {
        color: 0xFFD700,
        name: 'Wheat',
        height: 2.2,
        swaySpeed: 0.008,
        swayAmplitude: 0.15,
        growthRate: 0.02,
        seasonalColors: [0xDDD700, 0xFFD700, 0xFFC700, 0xB8860B],
        animationType: 'sway'
    },
    legumes: {
        color: 0x8BC34A,
        name: 'Legumes',
        height: 1.8,
        swaySpeed: 0.012,
        swayAmplitude: 0.1,
        growthRate: 0.025,
        seasonalColors: [0x4CAF50, 0x8BC34A, 0x66BB6A, 0x388E3C],
        animationType: 'bounce'
    },
    rootCrops: {
        color: 0xFF5722,
        name: 'Root Crops',
        height: 1.2,
        swaySpeed: 0.006,
        swayAmplitude: 0.05,
        growthRate: 0.015,
        seasonalColors: [0xFF7043, 0xFF5722, 0xF4511E, 0xD84315],
        animationType: 'pulse'
    },
    coverCrop: {
        color: 0x4CAF50,
        name: 'Cover Crop',
        height: 1.0,
        swaySpeed: 0.015,
        swayAmplitude: 0.2,
        growthRate: 0.03,
        seasonalColors: [0x66BB6A, 0x4CAF50, 0x43A047, 0x2E7D32],
        animationType: 'wave'
    }
};

// Weather Effect Configurations
const WEATHER_EFFECTS = {
    rain: { intensity: 0.5, duration: 3000, particles: 200 },
    wind: { strength: 1.2, direction: Math.PI / 4, duration: 5000 },
    sunlight: { intensity: 1.5, warmth: 1.1, duration: 4000 },
    seasons: { spring: 0.8, summer: 1.2, autumn: 0.9, winter: 0.4 }
};

// =============================================================================
// ========== INITIALIZATION SYSTEM ==========
// =============================================================================

document.addEventListener('DOMContentLoaded', function() {
    initializeEnhancedApp();
});

function initializeEnhancedApp() {
    console.log('🌾 Initializing Enhanced Crop Rotation Hub...');

    // Initialize 3D environments
    init3DBackground();
    initEnhancedRotationDemo();
    initAdvancedCropRotation3D();

    // Initialize UI components
    initNavigation();
    initCounters();
    initProgressCircles();
    initFormHandlers();
    initScrollAnimations();
    initEnhancedParticles();

    // Initialize crop-specific features
    initCropCalculator();
    initRotationControls();
    initWeatherSystem();
    initSeasonalEffects();
    initCropGrowthAnimations();

    console.log('✅ Enhanced Crop Rotation Hub initialized successfully!');
}

// =============================================================================
// ========== ENHANCED 3D BACKGROUND SCENE ==========
// =============================================================================

function init3DBackground() {
    const container = document.getElementById('three-container');
    if (!container) return;

    // Scene setup with enhanced lighting
    scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0xcccccc, 10, 50); // Add atmospheric fog

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x87CEEB, 0.3); // Sky blue with transparency
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    // Enhanced lighting system
    setupAdvancedLighting();

    // Create floating agricultural elements
    createEnhancedFloatingElements();

    // Setup camera
    camera.position.set(0, 8, 15);
    camera.lookAt(0, 0, 0);

    // Start enhanced animation loop
    animateEnhanced3DBackground();

    // Handle window resize
    window.addEventListener('resize', onWindowResize);
}

function setupAdvancedLighting() {
    // Ambient light for general illumination
    const ambientLight = new THREE.AmbientLight(0x404040, 0.4);
    scene.add(ambientLight);

    // Main directional light (sun)
    const sunLight = new THREE.DirectionalLight(0xffffff, 1.0);
    sunLight.position.set(20, 20, 10);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 2048;
    sunLight.shadow.mapSize.height = 2048;
    sunLight.shadow.camera.near = 0.5;
    sunLight.shadow.camera.far = 50;
    scene.add(sunLight);

    // Store reference for seasonal changes
    seasonalLighting = sunLight;

    // Secondary fill light
    const fillLight = new THREE.DirectionalLight(0x8BC34A, 0.3);
    fillLight.position.set(-10, 10, 5);
    scene.add(fillLight);

    // Ground plane with shadows
    const groundGeometry = new THREE.PlaneGeometry(100, 100);
    const groundMaterial = new THREE.MeshLambertMaterial({ 
        color: 0x3a5f3a,
        transparent: true,
        opacity: 0.3
    });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -2;
    ground.receiveShadow = true;
    scene.add(ground);
}

function createEnhancedFloatingElements() {
    // Create different types of floating elements
    const elementTypes = [
        { geometry: new THREE.ConeGeometry(0.06, 0.2, 6), material: 'leaves', count: 20 },
        { geometry: new THREE.TetrahedronGeometry(0.05), material: 'flowers', count: 10 }
    ];

    const materials = {
        leaves: new THREE.MeshLambertMaterial({ color: 0x228B22 }),
        flowers: new THREE.MeshLambertMaterial({ color: 0xFFB6C1 })
    };

    elementTypes.forEach(type => {
        for (let i = 0; i < type.count; i++) {
            const mesh = new THREE.Mesh(type.geometry, materials[type.material]);

            // Randomize positions
            mesh.position.x = (Math.random() - 0.5) * 40;
            mesh.position.y = Math.random() * 20 - 5;
            mesh.position.z = (Math.random() - 0.5) * 40;

            // Animation properties
            mesh.userData = {
                originalY: mesh.position.y,
                originalX: mesh.position.x,
                originalZ: mesh.position.z,
                speed: Math.random() * 0.02 + 0.01,
                amplitude: Math.random() * 3 + 1,
                rotationSpeed: {
                    x: (Math.random() - 0.5) * 0.02,
                    y: (Math.random() - 0.5) * 0.02,
                    z: (Math.random() - 0.5) * 0.02
                },
                type: type.material,
                phase: Math.random() * Math.PI * 2
            };

            mesh.castShadow = true;
            scene.add(mesh);
        }
    });
}
function animateEnhanced3DBackground() {
    animationFrame = requestAnimationFrame(animateEnhanced3DBackground);

    const time = Date.now() * 0.001;

    // Animate floating elements with different patterns
    scene.children.forEach(child => {
        if (child.userData && child.userData.type) {
            const data = child.userData;

            switch (data.type) {

                case 'leaves':
                    // Swaying motion like falling leaves
                    child.position.y = data.originalY + Math.sin(time * data.speed) * data.amplitude;
                    child.position.x = data.originalX + Math.cos(time * data.speed * 0.5) * 2;
                    child.rotation.z += data.rotationSpeed.z * 2;
                    break;

                case 'flowers':
                    // Circular floating pattern
                    const radius = 3;
                    child.position.x = data.originalX + Math.cos(time * data.speed + data.phase) * radius;
                    child.position.z = data.originalZ + Math.sin(time * data.speed + data.phase) * radius;
                    child.position.y = data.originalY + Math.sin(time * data.speed * 2) * data.amplitude * 0.3;
                    break;
            }
        }
    });

    // Update seasonal lighting
    if (seasonalLighting) {
        seasonalLighting.intensity = 0.8 + Math.sin(time * 0.1) * 0.3;
        seasonalLighting.color.setHSL(0.1, 0.2, 0.5 + Math.sin(time * 0.1) * 0.2);
    }

    renderer.render(scene, camera);
}

// =============================================================================
// ========== ENHANCED ROTATION DEMO ==========
// =============================================================================

function initEnhancedRotationDemo() {
    const container = document.getElementById('rotation-demo');
    if (!container) return;

    const demoScene = new THREE.Scene();
    const demoCamera = new THREE.PerspectiveCamera(75, container.offsetWidth / container.offsetHeight, 0.1, 1000);
    const demoRenderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

    demoRenderer.setSize(container.offsetWidth, container.offsetHeight);
    demoRenderer.setClearColor(0x87CEEB, 0.2);
    container.appendChild(demoRenderer.domElement);

    // Create enhanced crop visualization
    const cropTypes = Object.keys(CROP_CONFIGS);
    const crops = [];
    const cropRadius = 3;

    cropTypes.forEach((cropType, i) => {
        const config = CROP_CONFIGS[cropType];
        const angle = (i / cropTypes.length) * Math.PI * 2;

        // Create multiple plants per crop type
        for (let j = 0; j < 5; j++) {
            const geometry = new THREE.CylinderGeometry(0.05, 0.1, config.height, 8);
            const material = new THREE.MeshLambertMaterial({ color: config.color });
            const crop = new THREE.Mesh(geometry, material);

            const subAngle = angle + (j - 2) * 0.2;
            const subRadius = cropRadius + (j - 2) * 0.3;

            crop.position.x = Math.cos(subAngle) * subRadius;
            crop.position.z = Math.sin(subAngle) * subRadius;
            crop.position.y = config.height / 2;

            crop.userData = {
                cropType: cropType,
                config: config,
                baseY: config.height / 2,
                phase: Math.random() * Math.PI * 2,
                index: j
            };

            demoScene.add(crop);
            crops.push(crop);
        }
    });

    // Enhanced lighting for demo
    const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
    demoScene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 8, 5);
    demoScene.add(directionalLight);

    demoCamera.position.set(0, 6, 8);
    demoCamera.lookAt(0, 0, 0);

    function animateEnhancedDemo() {
        requestAnimationFrame(animateEnhancedDemo);

        const time = Date.now() * 0.001;

        crops.forEach(crop => {
            const data = crop.userData;
            const config = data.config;

            // Apply crop-specific animations
            switch (config.animationType) {
                case 'sway':
                    crop.rotation.z = Math.sin(time * config.swaySpeed + data.phase) * config.swayAmplitude;
                    crop.position.y = data.baseY + Math.sin(time * config.swaySpeed * 0.5) * 0.1;
                    break;

                case 'bounce':
                    crop.position.y = data.baseY + Math.abs(Math.sin(time * config.swaySpeed + data.phase)) * config.swayAmplitude;
                    crop.scale.y = 1 + Math.sin(time * config.swaySpeed * 2) * 0.1;
                    break;

                case 'pulse':
                    const pulse = (Math.sin(time * config.swaySpeed + data.phase) + 1) * 0.5;
                    crop.scale.set(1 + pulse * 0.2, 1 + pulse * 0.1, 1 + pulse * 0.2);
                    break;

                case 'wave':
                    crop.rotation.z = Math.sin(time * config.swaySpeed + data.phase + data.index * 0.5) * config.swayAmplitude;
                    crop.position.y = data.baseY + Math.sin(time * config.swaySpeed * 2 + data.index * 0.8) * 0.15;
                    break;
            }

            // Color transitions
            const colorIndex = Math.floor(time * 0.2) % config.seasonalColors.length;
            const nextColorIndex = (colorIndex + 1) % config.seasonalColors.length;
            const blend = (time * 0.2) % 1;

            const currentColor = new THREE.Color(config.seasonalColors[colorIndex]);
            const nextColor = new THREE.Color(config.seasonalColors[nextColorIndex]);
            crop.material.color.copy(currentColor.lerp(nextColor, blend));
        });

        demoRenderer.render(demoScene, demoCamera);
    }

    animateEnhancedDemo();
}

// =============================================================================
// ========== ADVANCED CROP ROTATION 3D VISUALIZER ==========
// =============================================================================

function initAdvancedCropRotation3D() {
    const container = document.getElementById('crop-rotation-3d');
    if (!container) return;

    farmScene = new THREE.Scene();
    farmScene.fog = new THREE.Fog(0x87CEEB, 20, 60);

    const farmCamera = new THREE.PerspectiveCamera(75, container.offsetWidth / container.offsetHeight, 0.1, 1000);
    const farmRenderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

    farmRenderer.setSize(container.offsetWidth, container.offsetHeight);
    farmRenderer.setClearColor(0x87CEEB, 1);
    farmRenderer.shadowMap.enabled = true;
    farmRenderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(farmRenderer.domElement);

    // Enhanced lighting system for farm
    setupFarmLighting();

    // Create enhanced ground with texture
    createEnhancedGround();

    // Create initial crop rotation
    createEnhancedCropRotation(2);

    farmCamera.position.set(0, 12, 18);
    farmCamera.lookAt(0, 0, 0);

    function animateEnhancedFarm() {
        requestAnimationFrame(animateEnhancedFarm);

        const time = Date.now() * 0.001;

        // Animate all crops with their specific behaviors
        cropAnimations.forEach(animation => {
            animation.update(time);
        });

        // Update weather effects
        weatherEffects.forEach(effect => {
            if (effect.update) effect.update(time);
        });

        farmRenderer.render(farmScene, farmCamera);
    }

    animateEnhancedFarm();
}

function setupFarmLighting() {
    // Ambient light
    const ambientLight = new THREE.AmbientLight(0x404040, 0.4);
    farmScene.add(ambientLight);

    // Main sun light
    const sunLight = new THREE.DirectionalLight(0xffffff, 1.2);
    sunLight.position.set(15, 15, 10);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 4096;
    sunLight.shadow.mapSize.height = 4096;
    sunLight.shadow.camera.near = 0.5;
    sunLight.shadow.camera.far = 50;
    sunLight.shadow.camera.left = -20;
    sunLight.shadow.camera.right = 20;
    sunLight.shadow.camera.top = 20;
    sunLight.shadow.camera.bottom = -20;
    farmScene.add(sunLight);

    // Atmospheric light
    const skyLight = new THREE.HemisphereLight(0x87CEEB, 0x3a5f3a, 0.3);
    farmScene.add(skyLight);
}

function createEnhancedGround() {
    // Main ground
    const groundGeometry = new THREE.PlaneGeometry(40, 40, 32, 32);

    // Create heightmap for terrain variation
    const vertices = groundGeometry.attributes.position.array;
    for (let i = 2; i < vertices.length; i += 3) {
        vertices[i] = Math.random() * 0.3 - 0.15; // Small height variations
    }
    groundGeometry.attributes.position.needsUpdate = true;
    groundGeometry.computeVertexNormals();

    const groundMaterial = new THREE.MeshLambertMaterial({ 
        color: 0x4a3728,
        transparent: false
    });

    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -1;
    ground.receiveShadow = true;
    farmScene.add(ground);

    // Add field boundaries
    createFieldBoundaries();
}

function createFieldBoundaries() {
    const boundaryMaterial = new THREE.MeshLambertMaterial({ color: 0x2d1810 });

    // Create fence posts
    for (let i = -20; i <= 20; i += 4) {
        const postGeometry = new THREE.CylinderGeometry(0.1, 0.1, 2, 8);
        const post = new THREE.Mesh(postGeometry, boundaryMaterial);
        post.position.set(i, 0, -20);
        post.castShadow = true;
        farmScene.add(post);

        const post2 = new THREE.Mesh(postGeometry, boundaryMaterial);
        post2.position.set(i, 0, 20);
        post2.castShadow = true;
        farmScene.add(post2);
    }
}

function createEnhancedCropRotation(cycle) {
    // Clear existing crops and animations
    crops3D.forEach(crop => farmScene.remove(crop));
    crops3D = [];
    cropAnimations = [];

    const cropTypeKeys = Object.keys(CROP_CONFIGS);
    const plotSize = 4;
    const plotSpacing = 6;

    for (let i = 0; i < cycle; i++) {
        const cropType = cropTypeKeys[i % cropTypeKeys.length];
        const config = CROP_CONFIGS[cropType];

        // Create plot base
        const plotGeometry = new THREE.BoxGeometry(plotSize, 0.3, plotSize);
        const plotMaterial = new THREE.MeshLambertMaterial({ color: 0x6D4C41 });
        const plot = new THREE.Mesh(plotGeometry, plotMaterial);

        plot.position.x = (i - (cycle - 1) / 2) * plotSpacing;
        plot.position.y = -0.85;
        plot.castShadow = true;
        plot.receiveShadow = true;

        farmScene.add(plot);
        crops3D.push(plot);

        // Create enhanced crops on plot
        createCropsOnPlot(plot, config, cropType, i);
    }

    updateRotationInfo(cycle);
}

function createCropsOnPlot(plot, config, cropType, plotIndex) {
    const cropsPerRow = 4;
    const spacing = 0.8;

    for (let row = 0; row < cropsPerRow; row++) {
        for (let col = 0; col < cropsPerRow; col++) {
            // Create main crop geometry
            const cropGeometry = new THREE.CylinderGeometry(0.08, 0.12, config.height, 8);
            const cropMaterial = new THREE.MeshLambertMaterial({ 
                color: config.color,
                transparent: true,
                opacity: 0.9
            });
            const crop = new THREE.Mesh(cropGeometry, cropMaterial);

            // Position crop
            crop.position.x = plot.position.x + (col - (cropsPerRow - 1) / 2) * spacing;
            crop.position.z = (row - (cropsPerRow - 1) / 2) * spacing;
            crop.position.y = config.height / 2 - 0.7;

            crop.castShadow = true;
            crop.receiveShadow = true;

            farmScene.add(crop);
            crops3D.push(crop);

            // Create crop-specific animation
            const animation = createCropAnimation(crop, config, cropType, row, col, plotIndex);
            cropAnimations.push(animation);

            // Add crop details (leaves, flowers, etc.)
            addCropDetails(crop, config, cropType);
        }
    }
}

function createCropAnimation(crop, config, cropType, row, col, plotIndex) {
    const baseY = crop.position.y;
    const baseScale = { x: 1, y: 1, z: 1 };
    const phase = (row * 4 + col) * 0.3 + plotIndex * 0.5;

    return {
        crop: crop,
        config: config,
        cropType: cropType,
        baseY: baseY,
        baseScale: baseScale,
        phase: phase,
        growthStage: Math.random(),

        update: function(time) {
            switch (this.config.animationType) {
                case 'sway':
                    // Wheat-like swaying motion
                    this.crop.rotation.z = Math.sin(time * this.config.swaySpeed + this.phase) * this.config.swayAmplitude;
                    this.crop.rotation.x = Math.cos(time * this.config.swaySpeed * 0.7 + this.phase) * this.config.swayAmplitude * 0.5;
                    break;

                case 'bounce':
                    // Legume-like bouncing growth
                    const bounce = Math.abs(Math.sin(time * this.config.swaySpeed + this.phase));
                    this.crop.position.y = this.baseY + bounce * this.config.swayAmplitude * 0.5;
                    this.crop.scale.y = this.baseScale.y + bounce * 0.2;
                    break;

                case 'pulse':
                    // Root crop underground pulsing
                    const pulse = (Math.sin(time * this.config.swaySpeed + this.phase) + 1) * 0.5;
                    this.crop.scale.x = this.baseScale.x + pulse * 0.3;
                    this.crop.scale.z = this.baseScale.z + pulse * 0.3;
                    this.crop.position.y = this.baseY - pulse * 0.1;
                    break;

                case 'wave':
                    // Cover crop wave motion
                    this.crop.rotation.z = Math.sin(time * this.config.swaySpeed + this.phase + row * 0.5) * this.config.swayAmplitude;
                    this.crop.position.y = this.baseY + Math.sin(time * this.config.swaySpeed * 2 + col * 0.8) * 0.1;
                    break;
            }

            // Seasonal color changes
            const seasonalPhase = (time * 0.1) % (Math.PI * 2);
            const colorIndex = Math.floor((seasonalPhase / (Math.PI * 2)) * this.config.seasonalColors.length);
            const nextIndex = (colorIndex + 1) % this.config.seasonalColors.length;
            const blend = ((seasonalPhase / (Math.PI * 2)) * this.config.seasonalColors.length) % 1;

            const currentColor = new THREE.Color(this.config.seasonalColors[colorIndex]);
            const nextColor = new THREE.Color(this.config.seasonalColors[nextIndex]);
            this.crop.material.color.copy(currentColor.lerp(nextColor, blend));

            // Growth animation
            this.growthStage += this.config.growthRate * 0.01;
            if (this.growthStage > 1) this.growthStage = 1;

            this.crop.scale.y = this.baseScale.y * (0.1 + this.growthStage * 0.9);
        }
    };
}

function addCropDetails(crop, config, cropType) {
    switch (cropType) {
        case 'wheat':
            // Add wheat ears
            const earGeometry = new THREE.SphereGeometry(0.03, 4, 3);
            const earMaterial = new THREE.MeshLambertMaterial({ color: 0xDAA520 });
            const ear = new THREE.Mesh(earGeometry, earMaterial);
            ear.position.y = config.height * 0.4;
            ear.scale.set(1, 2, 1);
            crop.add(ear);
            break;

        case 'legumes':
            // Add leaves
            for (let i = 0; i < 3; i++) {
                const leafGeometry = new THREE.ConeGeometry(0.05, 0.1, 3);
                const leafMaterial = new THREE.MeshLambertMaterial({ color: 0x228B22 });
                const leaf = new THREE.Mesh(leafGeometry, leafMaterial);
                leaf.position.y = config.height * (0.2 + i * 0.2);
                leaf.position.x = (Math.random() - 0.5) * 0.1;
                leaf.rotation.z = Math.random() * Math.PI * 2;
                crop.add(leaf);
            }
            break;

        case 'rootCrops':
            // Add root bulge at base
            const rootGeometry = new THREE.SphereGeometry(0.08, 6, 4);
            const rootMaterial = new THREE.MeshLambertMaterial({ color: 0xCD853F });
            const root = new THREE.Mesh(rootGeometry, rootMaterial);
            root.position.y = -config.height * 0.3;
            root.scale.set(1.2, 0.8, 1.2);
            crop.add(root);
            break;

        case 'coverCrop':
            // Add multiple small branches
            for (let i = 0; i < 2; i++) {
                const branchGeometry = new THREE.CylinderGeometry(0.02, 0.02, config.height * 0.6, 4);
                const branchMaterial = new THREE.MeshLambertMaterial({ color: 0x32CD32 });
                const branch = new THREE.Mesh(branchGeometry, branchMaterial);
                branch.position.y = config.height * 0.2;
                branch.rotation.z = (Math.random() - 0.5) * Math.PI * 0.3;
                branch.rotation.x = (Math.random() - 0.5) * Math.PI * 0.3;
                crop.add(branch);
            }
            break;
    }
}

// =============================================================================
// ========== WEATHER & SEASONAL EFFECTS ==========
// =============================================================================

function initWeatherSystem() {
    console.log('🌤️ Initializing weather system...');

    // Add weather control buttons
    addWeatherControls();

    // Start with mild weather
    activateWeatherEffect('sunlight');
}

function addWeatherControls() {
    const controlsContainer = document.createElement('div');
    controlsContainer.className = 'weather-controls';
    controlsContainer.innerHTML = `
        <div class="weather-buttons">
            <button class="weather-btn" data-weather="rain">🌧️ Rain</button>
            <button class="weather-btn" data-weather="wind">💨 Wind</button>
            <button class="weather-btn" data-weather="sunlight">☀️ Sunlight</button>
            <button class="weather-btn" data-weather="clear">🌤️ Clear</button>
        </div>
    `;

    const rotationVisualizer = document.querySelector('.rotation-visualizer');
    if (rotationVisualizer) {
        rotationVisualizer.appendChild(controlsContainer);

        // Add event listeners
        controlsContainer.querySelectorAll('.weather-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const weather = btn.dataset.weather;
                activateWeatherEffect(weather);

                // Update button states
                controlsContainer.querySelectorAll('.weather-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            });
        });
    }
}

function activateWeatherEffect(weatherType) {
    // Clear existing weather effects
    clearWeatherEffects();

    switch (weatherType) {
        case 'rain':
            createRainEffect();
            break;
        case 'wind':
            createWindEffect();
            break;
        case 'sunlight':
            createSunlightEffect();
            break;
        case 'clear':
            // Just clear effects
            break;
    }
}

function createRainEffect() {
    if (!farmScene) return;

    const rainEffect = {
        particles: [],
        geometry: new THREE.BufferGeometry(),
        material: new THREE.PointsMaterial({
            color: 0x4169E1,
            size: 0.1,
            transparent: true,
            opacity: 0.6
        }),

        init: function() {
            const positions = [];
            const velocities = [];

            for (let i = 0; i < WEATHER_EFFECTS.rain.particles; i++) {
                positions.push(
                    (Math.random() - 0.5) * 50, // x
                    Math.random() * 30 + 10,     // y
                    (Math.random() - 0.5) * 50   // z
                );
                velocities.push(0, -Math.random() * 0.5 - 0.2, 0);
            }

            this.geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
            this.geometry.setAttribute('velocity', new THREE.Float32BufferAttribute(velocities, 3));

            this.points = new THREE.Points(this.geometry, this.material);
            farmScene.add(this.points);
        },

        update: function(time) {
            const positions = this.geometry.attributes.position.array;
            const velocities = this.geometry.attributes.velocity.array;

            for (let i = 0; i < positions.length; i += 3) {
                positions[i + 1] += velocities[i + 1]; // y position

                // Reset particle if it falls below ground
                if (positions[i + 1] < -1) {
                    positions[i + 1] = 30;
                    positions[i] = (Math.random() - 0.5) * 50;
                    positions[i + 2] = (Math.random() - 0.5) * 50;
                }
            }

            this.geometry.attributes.position.needsUpdate = true;
        }
    };

    rainEffect.init();
    weatherEffects.push(rainEffect);

    // Enhance crop swaying in rain
    cropAnimations.forEach(animation => {
        animation.rainIntensity = 1.5;
    });
}

function createWindEffect() {
    // Increase sway amplitude for all crops
    cropAnimations.forEach(animation => {
        animation.windStrength = WEATHER_EFFECTS.wind.strength;
        animation.originalSwayAmplitude = animation.config.swayAmplitude;
        animation.config.swayAmplitude *= WEATHER_EFFECTS.wind.strength;
    });

    // Add wind duration timer
    setTimeout(() => {
        cropAnimations.forEach(animation => {
            animation.config.swayAmplitude = animation.originalSwayAmplitude || animation.config.swayAmplitude / WEATHER_EFFECTS.wind.strength;
            animation.windStrength = 1;
        });
    }, WEATHER_EFFECTS.wind.duration);
}

function createSunlightEffect() {
    if (!seasonalLighting) return;

    // Enhance lighting
    seasonalLighting.intensity = WEATHER_EFFECTS.sunlight.intensity;
    seasonalLighting.color.setHex(0xFFFFAA);

    // Add warm glow to crops
    cropAnimations.forEach(animation => {
        animation.crop.material.emissive.setHex(0x221100);
    });

    // Reset after duration
    setTimeout(() => {
        seasonalLighting.intensity = 1.0;
        seasonalLighting.color.setHex(0xFFFFFF);
        cropAnimations.forEach(animation => {
            animation.crop.material.emissive.setHex(0x000000);
        });
    }, WEATHER_EFFECTS.sunlight.duration);
}

function clearWeatherEffects() {
    weatherEffects.forEach(effect => {
        if (effect.points) {
            farmScene.remove(effect.points);
        }
    });
    weatherEffects = [];

    // Reset crop properties
    cropAnimations.forEach(animation => {
        animation.rainIntensity = 1;
        animation.windStrength = 1;
        if (animation.crop.material.emissive) {
            animation.crop.material.emissive.setHex(0x000000);
        }
    });
}

function initSeasonalEffects() {
    // Cycle through seasons automatically
    setInterval(() => {
        const seasons = ['spring', 'summer', 'autumn', 'winter'];
        const currentSeason = seasons[Math.floor(Date.now() / 10000) % seasons.length];
        applySeasonalEffects(currentSeason);
    }, 10000); // Change season every 10 seconds
}

function applySeasonalEffects(season) {
    const seasonMultiplier = WEATHER_EFFECTS.seasons[season];

    if (seasonalLighting) {
        seasonalLighting.intensity = seasonMultiplier;

        switch (season) {
            case 'spring':
                seasonalLighting.color.setHex(0xAAFFAA);
                break;
            case 'summer':
                seasonalLighting.color.setHex(0xFFFFAA);
                break;
            case 'autumn':
                seasonalLighting.color.setHex(0xFFAAAA);
                break;
            case 'winter':
                seasonalLighting.color.setHex(0xAAAAFF);
                break;
        }
    }

    // Update crop growth rates
    cropAnimations.forEach(animation => {
        animation.seasonalMultiplier = seasonMultiplier;
    });
}

function initCropGrowthAnimations() {
    // Add growth stages visualization
    const growthControls = document.createElement('div');
    growthControls.className = 'growth-controls';
    growthControls.innerHTML = `
        <div class="growth-buttons">
            <button class="growth-btn" data-stage="seedling">🌱 Seedling</button>
            <button class="growth-btn" data-stage="growth">🌿 Growth</button>
            <button class="growth-btn" data-stage="mature">🌾 Mature</button>
            <button class="growth-btn" data-stage="harvest">🚜 Harvest</button>
        </div>
    `;

    const rotationVisualizer = document.querySelector('.rotation-visualizer');
    if (rotationVisualizer) {
        rotationVisualizer.appendChild(growthControls);

        // Add event listeners
        growthControls.querySelectorAll('.growth-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const stage = btn.dataset.stage;
                setGrowthStage(stage);

                // Update button states
                growthControls.querySelectorAll('.growth-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            });
        });
    }
}

function setGrowthStage(stage) {
    const stages = {
        seedling: 0.2,
        growth: 0.5,
        mature: 1.0,
        harvest: 0.8
    };

    const targetGrowth = stages[stage];

    cropAnimations.forEach(animation => {
        // Animate to target growth stage
        const startGrowth = animation.growthStage;
        const duration = 2000; // 2 seconds
        const startTime = Date.now();

        const animateGrowth = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);

            animation.growthStage = startGrowth + (targetGrowth - startGrowth) * progress;

            if (progress < 1) {
                requestAnimationFrame(animateGrowth);
            }
        };

        animateGrowth();
    });
}

// =============================================================================
// ========== ENHANCED PARTICLE SYSTEM ==========
// =============================================================================

function initEnhancedParticles() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'enhanced-particles';
    hero.appendChild(particlesContainer);

    // Create different types of particles
    const particleTypes = ['seed', 'leaf', 'pollen', 'droplet'];

    function createEnhancedParticle() {
        const type = particleTypes[Math.floor(Math.random() * particleTypes.length)];
        const particle = document.createElement('div');
        particle.className = `particle particle-${type}`;

        // Set particle properties based on type
        switch (type) {
            case 'seed':
                particle.innerHTML = '🌰';
                break;
            case 'leaf':
                particle.innerHTML = '🍃';
                break;
            case 'pollen':
                particle.innerHTML = '✨';
                break;
            case 'droplet':
                particle.innerHTML = '💧';
                break;
        }

        particle.style.left = Math.random() * window.innerWidth + 'px';
        particle.style.fontSize = (Math.random() * 10 + 10) + 'px';
        particle.style.animationDuration = (Math.random() * 15 + 5) + 's';
        particle.style.animationDelay = Math.random() * 2 + 's';
        particle.style.opacity = Math.random() * 0.7 + 0.3;

        particlesContainer.appendChild(particle);

        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, 20000);
    }

    // Create particles at different intervals
    setInterval(() => createEnhancedParticle(), 800);
}

// =============================================================================
// ========== ENHANCED UI COMPONENTS ==========
// =============================================================================

// Navigation (enhanced version)
function initNavigation() {
    const hamburger = document.querySelector('.nav-hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }

            if (hamburger && navMenu) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    });

    // Enhanced scroll effect
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.style.background = 'rgba(255,255,255,0.98)';
                navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.15)';
            } else {
                navbar.style.background = 'rgba(255,255,255,0.95)';
                navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
            }
        }
    });
}

// Counter Animations (enhanced)
function initCounters() {
    const counters = document.querySelectorAll('.stat-number[data-count]');

    const animateCounter = (counter) => {
        const target = parseInt(counter.getAttribute('data-count'));
        const duration = 2500;
        const increment = target / (duration / 16);
        let current = 0;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                counter.textContent = target;
                clearInterval(timer);
                // Add completion effect
                counter.style.transform = 'scale(1.1)';
                setTimeout(() => {
                    counter.style.transform = 'scale(1)';
                }, 200);
            } else {
                counter.textContent = Math.floor(current);
            }
        }, 16);
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    });

    counters.forEach(counter => observer.observe(counter));
}

// Progress Circles (enhanced)
function initProgressCircles() {
    const circles = document.querySelectorAll('.progress-circle[data-percent]');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const circle = entry.target;
                const percent = parseInt(circle.getAttribute('data-percent'));

                // Animate progress circle
                let currentPercent = 0;
                const animateProgress = () => {
                    if (currentPercent <= percent) {
                        const degrees = (currentPercent / 100) * 360;
                        circle.style.background = `conic-gradient(var(--accent-green) ${degrees}deg, var(--light-green) ${degrees}deg)`;
                        currentPercent += 2;
                        requestAnimationFrame(animateProgress);
                    }
                };

                setTimeout(animateProgress, 300);
                observer.unobserve(circle);
            }
        });
    });

    circles.forEach(circle => observer.observe(circle));
}

// Form Handlers (enhanced)
function initFormHandlers() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            };

            // Enhanced form submission with loading state
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;

            setTimeout(() => {
                showNotification('Thank you! Your message has been sent successfully.', 'success');
                contactForm.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 1500);
        });
    }
}

// Scroll Animations (enhanced)
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.team-card, .benefit-card, .workshop-card, .portal-tool, .story-card');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    entry.target.classList.add('animated');
                }, index * 150);
                observer.unobserve(entry.target);
            }
        });
    });

    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(50px)';
        element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(element);
    });
}

// =============================================================================
// ========== CROP CALCULATOR & TOOLS ==========
// =============================================================================

function initCropCalculator() {
    window.calculateRotation = function() {
        const farmSize = document.getElementById('farm-size').value;
        const currentCrop = document.getElementById('current-crop').value;
        const soilType = document.getElementById('soil-type').value;

        if (!farmSize || !currentCrop || !soilType) {
            showNotification('Please fill in all fields', 'error');
            return;
        }

        const recommendations = generateEnhancedRecommendations(farmSize, currentCrop, soilType);
        displayEnhancedResults(recommendations);
    };
}

function generateEnhancedRecommendations(farmSize, currentCrop, soilType) {
    const cropDatabase = {
        wheat: {
            next: ['legumes', 'root_crops'],
            soil_benefit: 'Depletes nitrogen, rotate with nitrogen-fixing legumes',
            pest_control: 'Breaks cereal pest cycles, reduces wheat diseases',
            market_value: 'High demand, stable prices'
        },
        rice: {
            next: ['legumes', 'vegetables'],
            soil_benefit: 'Benefits from nitrogen-fixing rotation crops',
            pest_control: 'Reduces water-borne pests and diseases',
            market_value: 'Staple crop, consistent market'
        },
        maize: {
            next: ['legumes', 'small_grains'],
            soil_benefit: 'Heavy nitrogen feeder, needs legume companion',
            pest_control: 'Disrupts corn borer and rootworm cycles',
            market_value: 'Versatile crop, multiple market channels'
        },
        cotton: {
            next: ['cereals', 'legumes'],
            soil_benefit: 'Deep roots improve soil structure',
            pest_control: 'Breaks cotton-specific pest cycles',
            market_value: 'Cash crop, weather-dependent prices'
        }
    };

    const soilFactors = {
        clay: {
            advice: 'Excellent for root crops, improve drainage for better yields',
            crops: ['root_crops', 'rice'],
            management: 'Add organic matter, avoid compaction'
        },
        sandy: {
            advice: 'Good drainage, requires frequent fertilization',
            crops: ['legumes', 'vegetables'],
            management: 'Increase organic matter, regular irrigation'
        },
        loam: {
            advice: 'Ideal for most crops, maintain organic content',
            crops: ['wheat', 'maize', 'legumes'],
            management: 'Balanced nutrition, crop rotation'
        },
        silt: {
            advice: 'Fertile but prone to compaction',
            crops: ['cereals', 'vegetables'],
            management: 'Minimize tillage, cover crops'
        }
    };

    const current = cropDatabase[currentCrop] || { 
        next: ['legumes'], 
        soil_benefit: 'General rotation needed',
        pest_control: 'Standard pest management',
        market_value: 'Variable market conditions'
    };

    const soil = soilFactors[soilType] || soilFactors.loam;

    return {
        farmSize: farmSize,
        currentCrop: currentCrop,
        soilType: soilType,
        recommendations: current.next,
        soilAdvice: soil.advice,
        soilManagement: soil.management,
        cropAdvice: current.soil_benefit,
        pestControl: current.pest_control,
        marketInsight: current.market_value,
        estimatedYieldIncrease: calculateYieldIncrease(farmSize, currentCrop),
        recommendedCycle: farmSize > 5 ? '4-year rotation' : '3-year rotation',
        sustainabilityScore: calculateSustainabilityScore(currentCrop, soilType)
    };
}

function calculateYieldIncrease(farmSize, currentCrop) {
    let baseIncrease = 15;

    // Adjust based on farm size
    if (farmSize > 10) baseIncrease += 5;
    if (farmSize > 20) baseIncrease += 3;

    // Adjust based on crop type
    const cropMultipliers = {
        wheat: 1.2,
        rice: 1.0,
        maize: 1.3,
        cotton: 1.1
    };

    const multiplier = cropMultipliers[currentCrop] || 1.0;
    const finalIncrease = Math.round(baseIncrease * multiplier);

    return `${finalIncrease}-${finalIncrease + 10}%`;
}

function calculateSustainabilityScore(currentCrop, soilType) {
    let score = 70; // Base score

    // Crop sustainability factors
    const cropScores = {
        wheat: 10,
        legumes: 20,
        maize: 5,
        cotton: -5
    };

    // Soil compatibility
    const soilBonus = {
        loam: 15,
        clay: 10,
        silt: 8,
        sandy: 5
    };

    score += cropScores[currentCrop] || 0;
    score += soilBonus[soilType] || 0;

    return Math.min(100, Math.max(0, score));
}

function displayEnhancedResults(recommendations) {
    const resultsContainer = document.getElementById('rotation-results');

    const html = `
        <div class="enhanced-results-card">
            <div class="results-header">
                <h4><i class="fas fa-lightbulb"></i> Personalized Crop Rotation Plan</h4>
                <div class="sustainability-badge">
                    <span class="sustainability-score">${recommendations.sustainabilityScore}%</span>
                    <span class="sustainability-label">Sustainability Score</span>
                </div>
            </div>

            <div class="result-tabs">
                <button class="tab-btn active" data-tab="overview">Overview</button>
                <button class="tab-btn" data-tab="soil">Soil Management</button>
                <button class="tab-btn" data-tab="market">Market Insights</button>
            </div>

            <div class="tab-content active" id="overview-tab">
                <div class="result-grid">
                    <div class="result-item highlight">
                        <i class="fas fa-chart-line"></i>
                        <div>
                            <strong>Expected Yield Increase</strong>
                            <span class="value">${recommendations.estimatedYieldIncrease}</span>
                        </div>
                    </div>
                    <div class="result-item">
                        <i class="fas fa-calendar-alt"></i>
                        <div>
                            <strong>Recommended Cycle</strong>
                            <span class="value">${recommendations.recommendedCycle}</span>
                        </div>
                    </div>
                    <div class="result-item">
                        <i class="fas fa-seedling"></i>
                        <div>
                            <strong>Next Crops</strong>
                            <span class="value">${recommendations.recommendations.join(', ')}</span>
                        </div>
                    </div>
                    <div class="result-item">
                        <i class="fas fa-bug"></i>
                        <div>
                            <strong>Pest Control</strong>
                            <span class="value">${recommendations.pestControl}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="tab-content" id="soil-tab">
                <div class="advice-section">
                    <div class="advice-item">
                        <h5><i class="fas fa-mountain"></i> Soil Analysis</h5>
                        <p><strong>Type:</strong> ${recommendations.soilType}</p>
                        <p><strong>Advice:</strong> ${recommendations.soilAdvice}</p>
                        <p><strong>Management:</strong> ${recommendations.soilManagement}</p>
                    </div>
                    <div class="advice-item">
                        <h5><i class="fas fa-seedling"></i> Crop Benefits</h5>
                        <p>${recommendations.cropAdvice}</p>
                    </div>
                </div>
            </div>

            <div class="tab-content" id="market-tab">
                <div class="market-section">
                    <div class="market-item">
                        <h5><i class="fas fa-dollar-sign"></i> Market Insights</h5>
                        <p>${recommendations.marketInsight}</p>
                    </div>
                    <div class="profit-projection">
                        <h5><i class="fas fa-chart-bar"></i> Profit Projection</h5>
                        <div class="projection-chart">
                            <div class="projection-bar" style="width: ${recommendations.sustainabilityScore}%">
                                <span>${recommendations.sustainabilityScore}% projected improvement</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="results-actions">
                <button class="btn-primary" onclick="downloadEnhancedPlan()">
                    <i class="fas fa-download"></i> Download Complete Plan
                </button>
                <button class="btn-secondary" onclick="scheduleConsultation()">
                    <i class="fas fa-calendar"></i> Schedule Consultation
                </button>
            </div>
        </div>
    `;

    resultsContainer.innerHTML = html;

    // Initialize tab functionality
    initResultTabs();

    // Scroll to results
    resultsContainer.scrollIntoView({ behavior: 'smooth' });

    // Show success notification
    showNotification('Personalized rotation plan generated!', 'success');
}

function initResultTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabId = button.dataset.tab + '-tab';

            // Update button states
            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // Update content visibility
            tabContents.forEach(content => content.classList.remove('active'));
            document.getElementById(tabId).classList.add('active');
        });
    });
}

// Rotation Controls (enhanced)
function initRotationControls() {
    const rotationButtons = document.querySelectorAll('.rotation-btn');

    rotationButtons.forEach(button => {
        button.addEventListener('click', () => {
            rotationButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const cycle = parseInt(button.getAttribute('data-cycle'));
            rotationCycle = cycle;

            // Show loading state
            button.textContent = 'Loading...';
            button.disabled = true;

            setTimeout(() => {
                createEnhancedCropRotation(cycle);
                button.textContent = button.dataset.originalText || `${cycle}-Year Rotation`;
                button.disabled = false;

                showNotification(`Switched to ${cycle}-year rotation cycle`, 'info');
            }, 1000);
        });

        // Store original text
        button.dataset.originalText = button.textContent;
    });
}

// =============================================================================
// ========== UTILITY FUNCTIONS ==========
// =============================================================================

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `enhanced-notification ${type}`;

    const icons = {
        success: 'fas fa-check-circle',
        error: 'fas fa-exclamation-circle',
        info: 'fas fa-info-circle',
        warning: 'fas fa-exclamation-triangle'
    };

    notification.innerHTML = `
        <i class="${icons[type]}"></i>
        <span>${message}</span>
        <button class="close-notification" onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
    `;

    // Enhanced styling
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${getNotificationColor(type)};
        color: white;
        padding: 1.2rem 1.8rem;
        border-radius: 12px;
        box-shadow: 0 6px 20px rgba(0,0,0,0.3);
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 0.8rem;
        max-width: 400px;
        animation: slideInRight 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        border-left: 4px solid rgba(255,255,255,0.3);
    `;

    document.body.appendChild(notification);

    // Enhanced auto-remove
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }
    }, 6000);
}

function getNotificationColor(type) {
    const colors = {
        success: 'linear-gradient(45deg, #4CAF50, #45a049)',
        error: 'linear-gradient(45deg, #f44336, #da190b)',
        info: 'linear-gradient(45deg, #2196F3, #0b7dda)',
        warning: 'linear-gradient(45deg, #ff9800, #e68900)'
    };
    return colors[type] || colors.info;
}

function downloadEnhancedPlan() {
    showNotification('Generating comprehensive rotation plan...', 'info');

    setTimeout(() => {
        showNotification('Complete rotation plan downloaded successfully!', 'success');
    }, 2500);
}

function scheduleConsultation() {
    showNotification('Opening consultation scheduler...', 'info');

    setTimeout(() => {
        showNotification('Consultation request submitted! We will contact you soon.', 'success');
    }, 1500);
}

function updateRotationInfo(cycle) {
    const rotationData = {
        2: {
            title: '2-Year Basic Rotation System',
            crops: ['Cereal (Wheat/Maize)', 'Legume (Beans/Peas)'],
            benefits: [
                'Quick nitrogen recharge cycle',
                'Simple implementation for beginners',
                '10-15% average yield increase',
                'Reduced fertilizer dependency'
            ],
            timeline: 'Ideal for small farms (1-5 hectares)',
            difficulty: 'Beginner-friendly'
        },
        3: {
            title: '3-Year Diversified Rotation System',
            crops: ['Cereal grain', 'Legume/cover crop', 'Root/tuber crop'],
            benefits: [
                'Enhanced soil structure development',
                'Superior weed control management',
                '12-18% average yield increase',
                'Balanced nutrient cycling'
            ],
            timeline: 'Suitable for medium farms (5-15 hectares)',
            difficulty: 'Intermediate level'
        },
        4: {
            title: '4-Year Advanced Rotation System',
            crops: ['Cereal', 'Legume', 'Root crop', 'Oilseed/Cover crop'],
            benefits: [
                'Maximum ecological resilience',
                'Optimal nutrient cycling efficiency',
                '15-25% average yield increase',
                'Enhanced biodiversity support'
            ],
            timeline: 'Best for large farms (15+ hectares)',
            difficulty: 'Advanced management required'
        }
    };

    const data = rotationData[cycle];

    if (document.getElementById('rotation-title')) {
        document.getElementById('rotation-title').textContent = data.title;
    }

    const cropsContainer = document.getElementById('rotation-crops');
    if (cropsContainer) {
        cropsContainer.innerHTML = `
            <h5><i class="fas fa-seedling"></i> Crop Sequence:</h5>
            <div class="crop-timeline">
                ${data.crops.map((crop, index) => `
                    <div class="crop-year">
                        <div class="year-number">${index + 1}</div>
                        <div class="crop-name">${crop}</div>
                    </div>
                `).join('')}
            </div>
            <div class="rotation-meta">
                <div class="meta-item">
                    <i class="fas fa-chart-bar"></i>
                    <span>${data.timeline}</span>
                </div>
                <div class="meta-item">
                    <i class="fas fa-graduation-cap"></i>
                    <span>${data.difficulty}</span>
                </div>
            </div>
        `;
    }

    const benefitsContainer = document.getElementById('rotation-benefits');
    if (benefitsContainer) {
        benefitsContainer.innerHTML = `
            <h5><i class="fas fa-star"></i> Key Benefits:</h5>
            <div class="benefits-list">
                ${data.benefits.map(benefit => `
                    <div class="benefit-item">
                        <i class="fas fa-check-circle"></i>
                        <span>${benefit}</span>
                    </div>
                `).join('')}
            </div>
        `;
    }
}

function onWindowResize() {
    if (camera && renderer) {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }
}

// Cleanup
window.addEventListener('beforeunload', () => {
    if (animationFrame) {
        cancelAnimationFrame(animationFrame);
    }
});

// =============================================================================
// ========== ENHANCED CSS INJECTION ==========
// =============================================================================

const enhancedStyles = document.createElement('style');
enhancedStyles.textContent = `
    /* Weather Controls */
    .weather-controls {
        margin: 2rem 0;
        text-align: center;
    }

    .weather-buttons {
        display: flex;
        gap: 1rem;
        justify-content: center;
        flex-wrap: wrap;
    }

    .weather-btn {
        padding: 0.8rem 1.5rem;
        background: linear-gradient(45deg, var(--light-green), rgba(200, 230, 201, 0.8));
        border: 2px solid var(--secondary-green);
        border-radius: 25px;
        color: var(--primary-green);
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
        font-size: 0.9rem;
    }

    .weather-btn:hover, .weather-btn.active {
        background: linear-gradient(45deg, var(--accent-green), var(--secondary-green));
        color: white;
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(139, 195, 74, 0.3);
    }

    /* Growth Controls */
    .growth-controls {
        margin: 2rem 0;
        text-align: center;
    }

    .growth-buttons {
        display: flex;
        gap: 1rem;
        justify-content: center;
        flex-wrap: wrap;
    }

    .growth-btn {
        padding: 0.8rem 1.2rem;
        background: white;
        border: 2px solid var(--accent-green);
        border-radius: 20px;
        color: var(--primary-green);
        font-weight: 500;
        cursor: pointer;
        transition: all 0.3s ease;
        font-size: 0.85rem;
    }

    .growth-btn:hover, .growth-btn.active {
        background: var(--accent-green);
        color: white;
        transform: scale(1.05);
    }

    /* Enhanced Results Card */
    .enhanced-results-card {
        background: linear-gradient(135deg, white, #f8f9fa);
        padding: 2.5rem;
        border-radius: 15px;
        box-shadow: 0 15px 35px rgba(0,0,0,0.1);
        margin-top: 2rem;
        border: 1px solid rgba(139, 195, 74, 0.2);
    }

    .results-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 2rem;
        padding-bottom: 1rem;
        border-bottom: 2px solid var(--light-green);
    }

    .sustainability-badge {
        background: linear-gradient(45deg, var(--accent-green), var(--secondary-green));
        color: white;
        padding: 1rem;
        border-radius: 12px;
        text-align: center;
        min-width: 120px;
    }

    .sustainability-score {
        display: block;
        font-size: 1.8rem;
        font-weight: bold;
    }

    .sustainability-label {
        font-size: 0.8rem;
        opacity: 0.9;
    }

    /* Result Tabs */
    .result-tabs {
        display: flex;
        gap: 1rem;
        margin-bottom: 2rem;
        border-bottom: 2px solid var(--light-green);
    }

    .tab-btn {
        padding: 1rem 1.5rem;
        background: none;
        border: none;
        color: var(--light-text);
        font-weight: 600;
        cursor: pointer;
        border-bottom: 3px solid transparent;
        transition: all 0.3s ease;
    }

    .tab-btn.active, .tab-btn:hover {
        color: var(--primary-green);
        border-bottom-color: var(--accent-green);
    }

    .tab-content {
        display: none;
    }

    .tab-content.active {
        display: block;
        animation: fadeIn 0.3s ease;
    }

    .result-item.highlight {
        background: linear-gradient(135deg, var(--accent-green), var(--secondary-green));
        color: white;
        transform: scale(1.05);
    }

    .result-item.highlight .value {
        color: white;
        font-weight: bold;
    }

    /* Market Section */
    .market-section {
        display: grid;
        gap: 1.5rem;
    }

    .profit-projection {
        background: var(--light-green);
        padding: 1.5rem;
        border-radius: 10px;
    }

    .projection-chart {
        background: white;
        border-radius: 8px;
        padding: 1rem;
        margin-top: 1rem;
    }

    .projection-bar {
        background: linear-gradient(45deg, var(--accent-green), var(--secondary-green));
        height: 30px;
        border-radius: 15px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-weight: 600;
        font-size: 0.9rem;
        transition: width 1s ease;
    }

    /* Results Actions */
    .results-actions {
        display: flex;
        gap: 1rem;
        justify-content: center;
        margin-top: 2rem;
        padding-top: 1.5rem;
        border-top: 1px solid var(--light-green);
    }

    .results-actions button {
        padding: 1rem 2rem;
        border-radius: 10px;
        font-weight: 600;
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }

    /* Crop Timeline */
    .crop-timeline {
        display: flex;
        gap: 1rem;
        margin: 1rem 0;
        flex-wrap: wrap;
        justify-content: center;
    }

    .crop-year {
        background: linear-gradient(135deg, white, var(--light-green));
        padding: 1rem;
        border-radius: 10px;
        text-align: center;
        border: 2px solid var(--accent-green);
        min-width: 120px;
        transition: transform 0.3s ease;
    }

    .crop-year:hover {
        transform: translateY(-3px);
        box-shadow: 0 6px 15px rgba(139, 195, 74, 0.3);
    }

    .year-number {
        background: var(--accent-green);
        color: white;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        margin: 0 auto 0.5rem;
    }

    .crop-name {
        font-weight: 600;
        color: var(--primary-green);
        font-size: 0.9rem;
    }

    .rotation-meta {
        display: flex;
        gap: 2rem;
        justify-content: center;
        margin-top: 1.5rem;
        flex-wrap: wrap;
    }

    .meta-item {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        color: var(--light-text);
        font-size: 0.9rem;
    }

    .meta-item i {
        color: var(--accent-green);
    }

    /* Benefits List */
    .benefits-list {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 1rem;
        margin-top: 1rem;
    }

    .benefit-item {
        display: flex;
        align-items: flex-start;
        gap: 0.8rem;
        padding: 1rem;
        background: rgba(139, 195, 74, 0.1);
        border-radius: 8px;
        transition: all 0.3s ease;
    }

    .benefit-item:hover {
        background: rgba(139, 195, 74, 0.2);
        transform: translateX(5px);
    }

    .benefit-item i {
        color: var(--accent-green);
        margin-top: 0.2rem;
        font-size: 1.1rem;
    }

    .benefit-item span {
        color: var(--primary-green);
        font-weight: 500;
        line-height: 1.4;
    }

    /* Enhanced Particles */
    .enhanced-particles {
        position: absolute;
        width: 100%;
        height: 100%;
        overflow: hidden;
        pointer-events: none;
    }

    .particle {
        position: absolute;
        animation: enhancedParticleFloat 15s linear infinite;
        pointer-events: none;
    }

    .particle-seed { animation-timing-function: ease-in-out; }
    .particle-leaf { animation-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94); }
    .particle-pollen { animation-timing-function: linear; }
    .particle-droplet { animation-timing-function: ease-in; }

    @keyframes enhancedParticleFloat {
        0% {
            transform: translateY(100vh) rotate(0deg);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translateY(-10vh) rotate(360deg);
            opacity: 0;
        }
    }

    /* Enhanced Notifications */
    .enhanced-notification {
        border-radius: 12px !important;
        backdrop-filter: blur(10px);
        font-weight: 500;
    }

    .close-notification {
        background: none;
        border: none;
        color: inherit;
        cursor: pointer;
        padding: 0.2rem;
        border-radius: 50%;
        transition: background 0.3s ease;
    }

    .close-notification:hover {
        background: rgba(255,255,255,0.2);
    }

    /* Animations */
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }

    @keyframes slideInRight {
        from { 
            transform: translateX(100%); 
            opacity: 0; 
        }
        to { 
            transform: translateX(0); 
            opacity: 1; 
        }
    }

    @keyframes slideOutRight {
        from { 
            transform: translateX(0); 
            opacity: 1; 
        }
        to { 
            transform: translateX(100%); 
            opacity: 0; 
        }
    }

    /* Responsive Design */
    @media (max-width: 768px) {
        .weather-buttons, .growth-buttons {
            flex-direction: column;
            align-items: center;
        }

        .results-header {
            flex-direction: column;
            gap: 1rem;
            text-align: center;
        }

        .result-tabs {
            flex-wrap: wrap;
            justify-content: center;
        }

        .crop-timeline {
            flex-direction: column;
            align-items: center;
        }

        .rotation-meta {
            flex-direction: column;
            align-items: center;
        }

        .results-actions {
            flex-direction: column;
            align-items: center;
        }
    }
`;

document.head.appendChild(enhancedStyles);

console.log('🌾 Enhanced Crop Rotation Hub loaded successfully with advanced animations!');
