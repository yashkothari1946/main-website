import * as THREE from 'https://cdn.skypack.dev/three@0.132.2';

const container = document.getElementById('three-canvas-container');

// ─── MOBILE: completely skip Three.js to avoid GPU lag ───
const isMobileDevice = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent) || window.innerWidth < 768;
if (isMobileDevice && container) {
    container.style.display = 'none';
}

if (container && !isMobileDevice) {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
        alpha: true, 
        antialias: false,                  // Disabled for better perf
        powerPreference: "high-performance"
    });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5)); // Cap at 1.5×
    container.appendChild(renderer.domElement);

    // 1. NEURAL CORE (Glass Orb) — reduced subdivision for perf
    const orbGeometry = new THREE.IcosahedronGeometry(2, 10); // was 64
    const orbMaterial = new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        emissive: 0xebf8ff,
        emissiveIntensity: 0.2,
        metalness: 0.1,
        roughness: 0.1,
        transmission: 0.9,
        thickness: 0.5,
        transparent: true,
        opacity: 0.9,
        clearcoat: 1,
        clearcoatRoughness: 0.1
    });

    const orb = new THREE.Mesh(orbGeometry, orbMaterial);
    scene.add(orb);

    // 2. PARTICLE NEURAL NETWORK
    const particlesCount = 800; // Reduced from 2000 for smooth 60fps
    const positions = new Float32Array(particlesCount * 3);
    const colors = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount; i++) {
        const x = (Math.random() - 0.5) * 15;
        const y = (Math.random() - 0.5) * 15;
        const z = (Math.random() - 0.5) * 15;
        
        positions[i * 3] = x;
        positions[i * 3 + 1] = y;
        positions[i * 3 + 2] = z;

        colors[i * 3] = 0.0; // R
        colors[i * 3 + 1] = 0.78; // G (0.78 * 255 = 200, Cyan)
        colors[i * 3 + 2] = 0.90; // B (0.90 * 255 = 230, Cyan)
    }

    const particlesGeometry = new THREE.BufferGeometry();
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.04,
        vertexColors: true,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending
    });

    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    // 3. LIGHTING (Dynamic & Clean Light Theme)
    const mainLight = new THREE.PointLight(0x007CC3, 12, 20); // Sky Blue
    mainLight.position.set(5, 5, 5);
    scene.add(mainLight);

    const cyanLight = new THREE.PointLight(0x00C8E6, 12, 20); // Cyan
    cyanLight.position.set(-5, -5, 5);
    scene.add(cyanLight);

    const ambientLight = new THREE.AmbientLight(0xffffff, 1.5); // Bright Ambient Light
    scene.add(ambientLight);

    camera.position.z = 6;

    // 4. INTERACTION & MOUSE TRACKING (throttled via rAF)
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    let mousePending = false;

    window.addEventListener('mousemove', (e) => {
        if (!mousePending) {
            mousePending = true;
            requestAnimationFrame(() => {
                mouseX = (e.clientX / window.innerWidth - 0.5);
                mouseY = (e.clientY / window.innerHeight - 0.5);
                mousePending = false;
            });
        }
    }, { passive: true });

    // 5. ANIMATION LOOP
    const animate = () => {
        requestAnimationFrame(animate);
        
        const time = Date.now() * 0.0005;
        
        // Orb Motion
        orb.rotation.y += 0.002;
        orb.rotation.z += 0.001;
        
        // Subtle Organic Pulse
        const scale = 1 + Math.sin(time * 2) * 0.03;
        orb.scale.set(scale, scale, scale);
        
        // Particles Motion
        particles.rotation.y = time * 0.1;
        
        // Mouse Smooth Follow
        targetX += (mouseX - targetX) * 0.05;
        targetY += (mouseY - targetY) * 0.05;
        
        scene.rotation.y = targetX * 0.5;
        scene.rotation.x = -targetY * 0.5;

        // Dynamic Lighting Reactivity
        mainLight.position.x = Math.sin(time) * 10;
        mainLight.position.z = Math.cos(time) * 10;

        renderer.render(scene, camera);
    };

    animate();

    // 6. RESPONSIVENESS
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}
