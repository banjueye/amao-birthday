// ============================================
// INTERACTIVE 3D NEON PARTICLE CAKE
// Controlled by single hand tracking
// ============================================

// --- THREE.JS SETUP ---
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

// Neon lighting
const ambientLight = new THREE.AmbientLight(0x00ffff, 0.3);
scene.add(ambientLight);

const pointLight1 = new THREE.PointLight(0xff00ff, 1.5);
pointLight1.position.set(5, 5, 5);
scene.add(pointLight1);

const pointLight2 = new THREE.PointLight(0x00ffff, 1.5);
pointLight2.position.set(-5, -5, 5);
scene.add(pointLight2);

const pointLight3 = new THREE.PointLight(0xffff00, 1);
pointLight3.position.set(0, 5, -5);
scene.add(pointLight3);

// --- PARTICLE SYSTEM VARIABLES ---
let particles;
let basePositions = []; // Original positions for each particle
let particleCount = 5000; // More particles for better cake detail
let handOpenness = 0; // 0 = closed, 1 = open
let lastWristPosition = null;
let targetRotation = { x: 0, y: 0, z: 0 };
let currentRotation = { x: 0, y: 0, z: 0 };
let rotationVelocity = { x: 0, y: 0, z: 0 };

// --- NEON COLOR PALETTE ---
const neonColors = [
    { r: 0, g: 1, b: 1 },      // Cyan
    { r: 1, g: 0, b: 1 },      // Magenta
    { r: 1, g: 0.5, b: 0 },    // Orange
    { r: 1, g: 1, b: 0 },      // Yellow
    { r: 0.5, g: 0, b: 1 },    // Purple
    { r: 1, g: 0, b: 0.5 },    // Pink
];

function getNeonColor(layer, index) {
    const colorIndex = Math.floor((layer + index * 0.1) % neonColors.length);
    const baseColor = neonColors[colorIndex];
    // Add some variation and brightness
    return {
        r: baseColor.r * (0.8 + Math.random() * 0.4),
        g: baseColor.g * (0.8 + Math.random() * 0.4),
        b: baseColor.b * (0.8 + Math.random() * 0.4)
    };
}

// --- CREATE REALISTIC CAKE SHAPE ---
function createCakeParticles() {
    const geometry = new THREE.BufferGeometry();
    const positions = [];
    const colors = [];
    basePositions = [];
    
    // Cake parameters for realistic look
    const layers = 4; // More layers for better cake structure
    const particlesPerLayer = Math.floor(particleCount * 0.7 / layers);
    
    // Create cake layers with frosting
    for (let layer = 0; layer < layers; layer++) {
        const layerHeight = -1.5 + layer * 0.6; // Stack layers
        const layerRadius = 1.4 - layer * 0.12; // Tapered layers
        const layerParticles = layer === layers - 1 ? 
            particlesPerLayer + Math.floor(particleCount * 0.3) : 
            particlesPerLayer;
        
        // Cake body particles (denser in center)
        for (let i = 0; i < layerParticles * 0.7; i++) {
            const angle = Math.random() * Math.PI * 2;
            const radius = Math.sqrt(Math.random()) * layerRadius * 0.85; // Denser towards center
            const x = Math.cos(angle) * radius;
            const z = Math.sin(angle) * radius;
            const y = layerHeight + (Math.random() - 0.5) * 0.25; // Layer thickness
            
            positions.push(x, y, z);
            basePositions.push(x, y, z);
            
            const color = getNeonColor(layer, i);
            colors.push(color.r, color.g, color.b);
        }
        
        // Frosting edge particles (on the rim)
        const frostingParticles = layerParticles * 0.3;
        for (let i = 0; i < frostingParticles; i++) {
            const angle = Math.random() * Math.PI * 2;
            const radius = layerRadius * (0.9 + Math.random() * 0.1); // On the edge
            const x = Math.cos(angle) * radius;
            const z = Math.sin(angle) * radius;
            const y = layerHeight + (Math.random() - 0.5) * 0.3;
            
            positions.push(x, y, z);
            basePositions.push(x, y, z);
            
            // Brighter frosting colors
            const color = getNeonColor(layer + 1, i);
            colors.push(color.r * 1.2, color.g * 1.2, color.b * 1.2);
        }
    }
    
    // Add decorative elements on top
    const topDecorations = Math.floor(particleCount * 0.15);
    
    // Sprinkles/confetti on top
    for (let i = 0; i < topDecorations * 0.6; i++) {
        const angle = Math.random() * Math.PI * 2;
        const radius = Math.random() * 0.9;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        const y = 1.3 + Math.random() * 0.15;
        
        positions.push(x, y, z);
        basePositions.push(x, y, z);
        
        const color = getNeonColor(Math.floor(Math.random() * neonColors.length), i);
        colors.push(color.r, color.g, color.b);
    }
    
    // Candle flames (bright particles on top)
    const candleCount = 5;
    for (let c = 0; c < candleCount; c++) {
        const candleAngle = (c / candleCount) * Math.PI * 2;
        const candleRadius = 0.3 + Math.random() * 0.2;
        const candleX = Math.cos(candleAngle) * candleRadius;
        const candleZ = Math.sin(candleAngle) * candleRadius;
        const candleY = 1.4;
        
        // Candle base
        for (let i = 0; i < 20; i++) {
            const x = candleX + (Math.random() - 0.5) * 0.05;
            const z = candleZ + (Math.random() - 0.5) * 0.05;
            const y = candleY - Math.random() * 0.2;
            
            positions.push(x, y, z);
            basePositions.push(x, y, z);
            colors.push(1, 1, 0.5); // Yellow candle
        }
        
        // Flame particles (bright and animated)
        for (let i = 0; i < 15; i++) {
            const x = candleX + (Math.random() - 0.5) * 0.03;
            const z = candleZ + (Math.random() - 0.5) * 0.03;
            const y = candleY + Math.random() * 0.15;
            
            positions.push(x, y, z);
            basePositions.push(x, y, z);
            colors.push(1, 0.5 + Math.random() * 0.5, 0); // Orange/yellow flame
        }
    }
    
    // Side decorations (swirls)
    const sideDecorations = Math.floor(particleCount * 0.15);
    for (let i = 0; i < sideDecorations; i++) {
        const layer = Math.floor(Math.random() * layers);
        const layerHeight = -1.5 + layer * 0.6;
        const angle = Math.random() * Math.PI * 2;
        const radius = 1.3 - layer * 0.12;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        const y = layerHeight + (Math.random() - 0.5) * 0.4;
        
        positions.push(x, y, z);
        basePositions.push(x, y, z);
        
        const color = getNeonColor(layer, i);
        colors.push(color.r * 1.3, color.g * 1.3, color.b * 1.3);
    }
    
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    
    // Create material with neon glow effect
    const material = new THREE.PointsMaterial({
        size: 0.1,
        vertexColors: true,
        transparent: true,
        opacity: 0.95,
        sizeAttenuation: true,
        blending: THREE.AdditiveBlending // For neon glow effect
    });
    
    particles = new THREE.Points(geometry, material);
    scene.add(particles);
}

// Initialize cake
createCakeParticles();

// --- ANIMATED BACKGROUND ---
function createAnimatedBackground() {
    const bgCanvas = document.getElementById('background-canvas');
    const bgCtx = bgCanvas.getContext('2d');
    bgCanvas.width = window.innerWidth;
    bgCanvas.height = window.innerHeight;
    
    const stars = [];
    const starCount = 200;
    
    // Create stars
    for (let i = 0; i < starCount; i++) {
        stars.push({
            x: Math.random() * bgCanvas.width,
            y: Math.random() * bgCanvas.height,
            radius: Math.random() * 1.5,
            speed: Math.random() * 0.5 + 0.2,
            opacity: Math.random()
        });
    }
    
    function animateBackground() {
        bgCtx.fillStyle = '#0a0a0a';
        bgCtx.fillRect(0, 0, bgCanvas.width, bgCanvas.height);
        
        // Animated gradient overlay
        const gradient = bgCtx.createRadialGradient(
            bgCanvas.width / 2,
            bgCanvas.height / 2,
            0,
            bgCanvas.width / 2,
            bgCanvas.height / 2,
            Math.max(bgCanvas.width, bgCanvas.height) / 2
        );
        const time = Date.now() * 0.0005;
        gradient.addColorStop(0, `rgba(0, 255, 255, ${0.1 + Math.sin(time) * 0.05})`);
        gradient.addColorStop(0.5, `rgba(255, 0, 255, ${0.05 + Math.cos(time * 1.2) * 0.03})`);
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        bgCtx.fillStyle = gradient;
        bgCtx.fillRect(0, 0, bgCanvas.width, bgCanvas.height);
        
        // Draw and animate stars
        bgCtx.fillStyle = '#ffffff';
        stars.forEach(star => {
            star.y += star.speed;
            if (star.y > bgCanvas.height) {
                star.y = 0;
                star.x = Math.random() * bgCanvas.width;
            }
            
            star.opacity += (Math.random() - 0.5) * 0.02;
            star.opacity = Math.max(0.3, Math.min(1, star.opacity));
            
            bgCtx.globalAlpha = star.opacity;
            bgCtx.beginPath();
            bgCtx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
            bgCtx.fill();
        });
        bgCtx.globalAlpha = 1;
        
        requestAnimationFrame(animateBackground);
    }
    
    animateBackground();
    
    // Resize handler
    window.addEventListener('resize', () => {
        bgCanvas.width = window.innerWidth;
        bgCanvas.height = window.innerHeight;
    });
}

createAnimatedBackground();

// --- HAND TRACKING SETUP (MediaPipe) ---
const videoElement = document.querySelector('.input_video');

const hands = new Hands({
    locateFile: (file) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
    }
});

hands.setOptions({
    maxNumHands: 1, // Only one hand needed
    modelComplexity: 1,
    minDetectionConfidence: 0.7,
    minTrackingConfidence: 0.7
});

hands.onResults((results) => {
    if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
        const hand = results.multiHandLandmarks[0];
        const wrist = hand[0]; // Wrist landmark
        
        // Detect if hand is open or closed
        // Check distance from fingertips to wrist
        const fingertips = [
            hand[4],  // Thumb tip
            hand[8],  // Index tip
            hand[12], // Middle tip
            hand[16], // Ring tip
            hand[20]  // Pinky tip
        ];
        
        const palmBase = hand[9]; // Middle finger MCP (palm center)
        
        let totalDistance = 0;
        fingertips.forEach(tip => {
            const dx = tip.x - palmBase.x;
            const dy = tip.y - palmBase.y;
            const dz = tip.z - palmBase.z;
            totalDistance += Math.sqrt(dx * dx + dy * dy + dz * dz);
        });
        
        // Normalize openness (0 = closed, 1 = fully open)
        handOpenness = Math.min(1, Math.max(0, (totalDistance - 0.15) * 3));
        
        // Calculate rotation based on wrist movement
        if (lastWristPosition) {
            const dx = wrist.x - lastWristPosition.x;
            const dy = wrist.y - lastWristPosition.y;
            
            // Calculate rotation angle
            const angle = Math.atan2(dy, dx);
            
            // Calculate rotation speed based on movement distance
            const movementDistance = Math.sqrt(dx * dx + dy * dy);
            const rotationSpeed = movementDistance * 10; // Scale factor
            
            // Apply rotation to Y axis (horizontal rotation)
            targetRotation.y += angle * rotationSpeed;
            
            // Also use vertical movement for X rotation
            targetRotation.x += dy * 5;
            
            // Use hand tilt for Z rotation
            const thumbBase = hand[2];
            const pinkyBase = hand[17];
            const tilt = (thumbBase.y - pinkyBase.y) * 2;
            targetRotation.z = tilt;
        }
        
        lastWristPosition = { x: wrist.x, y: wrist.y, z: wrist.z };
        
    } else {
        // No hand detected
        handOpenness = 0;
        lastWristPosition = null;
    }
});

const cameraUtils = new Camera(videoElement, {
    onFrame: async () => {
        await hands.send({ image: videoElement });
    },
    width: 640,
    height: 480
});

cameraUtils.start();

// --- ANIMATION LOOP ---
function animate() {
    requestAnimationFrame(animate);
    
    if (particles) {
        // Smooth rotation interpolation with momentum
        const rotationSpeed = 0.15;
        const damping = 0.95;
        
        // Apply rotation velocity
        currentRotation.x += rotationVelocity.x;
        currentRotation.y += rotationVelocity.y;
        currentRotation.z += rotationVelocity.z;
        
        // Smooth interpolation towards target
        const deltaX = targetRotation.x - currentRotation.x;
        const deltaY = targetRotation.y - currentRotation.y;
        const deltaZ = targetRotation.z - currentRotation.z;
        
        rotationVelocity.x += deltaX * rotationSpeed;
        rotationVelocity.y += deltaY * rotationSpeed;
        rotationVelocity.z += deltaZ * rotationSpeed;
        
        // Apply damping
        rotationVelocity.x *= damping;
        rotationVelocity.y *= damping;
        rotationVelocity.z *= damping;
        
        // Apply rotation to particles
        particles.rotation.x = currentRotation.x;
        particles.rotation.y = currentRotation.y;
        particles.rotation.z = currentRotation.z;
        
        // Add subtle automatic rotation when hand isn't controlling
        if (handOpenness === 0 && !lastWristPosition) {
            particles.rotation.y += 0.003;
        }
        
        // Get particle positions
        const positions = particles.geometry.attributes.position.array;
        
        // Calculate explosion factor based on hand openness
        // Smooth transition
        const explosionFactor = handOpenness * 3; // Max explosion distance
        
        // Apply explosion effect
        for (let i = 0; i < positions.length; i += 3) {
            const baseX = basePositions[i];
            const baseY = basePositions[i + 1];
            const baseZ = basePositions[i + 2];
            
            // Calculate direction from center
            const distanceFromCenter = Math.sqrt(baseX * baseX + baseY * baseY + baseZ * baseZ);
            const directionX = distanceFromCenter > 0 ? baseX / distanceFromCenter : 0;
            const directionY = distanceFromCenter > 0 ? baseY / distanceFromCenter : 0;
            const directionZ = distanceFromCenter > 0 ? baseZ / distanceFromCenter : 0;
            
            // Push particles away from center
            const pushDistance = explosionFactor;
            positions[i] = baseX + directionX * pushDistance;
            positions[i + 1] = baseY + directionY * pushDistance;
            positions[i + 2] = baseZ + directionZ * pushDistance;
        }
        
        particles.geometry.attributes.position.needsUpdate = true;
        
        // Animate lights for extra neon effect
        const time = Date.now() * 0.001;
        pointLight1.position.x = Math.sin(time) * 5;
        pointLight1.position.y = Math.cos(time) * 5;
        pointLight2.position.x = Math.cos(time) * -5;
        pointLight2.position.y = Math.sin(time) * -5;
    }
    
    renderer.render(scene, camera);
}

animate();

// --- WINDOW RESIZE HANDLER ---
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    
    const bgCanvas = document.getElementById('background-canvas');
    bgCanvas.width = window.innerWidth;
    bgCanvas.height = window.innerHeight;
});

// --- ERROR HANDLING ---
window.addEventListener('error', (e) => {
    console.error('Error:', e);
});
