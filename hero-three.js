import * as THREE from 'https://cdn.skypack.dev/three@0.132.2';

const container = document.getElementById('three-canvas-container');
if (container) {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
        alpha: true, 
        antialias: true,
        powerPreference: "high-performance"
    });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 1. NEURAL CORE (Glass Orb)
    const orbGeometry = new THREE.IcosahedronGeometry(2, 64);
    const orbMaterial = new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        metalness: 0.1,
        roughness: 0.05,
        transmission: 0.95,
        thickness: 1.5,
        transparent: true,
        opacity: 0.8,
        envMapIntensity: 2,
        clearcoat: 1,
        clearcoatRoughness: 0.1
    });

    const orb = new THREE.Mesh(orbGeometry, orbMaterial);
    scene.add(orb);

    // 2. PARTICLE NEURAL NETWORK
    const particlesCount = 2000;
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
        colors[i * 3 + 1] = 0.48; // G (0.48 * 255 = 124, matches #007CC3)
        colors[i * 3 + 2] = 0.76; // B
    }

    const particlesGeometry = new THREE.BufferGeometry();
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.03,
        vertexColors: true,
        transparent: true,
        opacity: 0.6,
        blending: THREE.AdditiveBlending
    });

    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    // 3. LIGHTING (Dynamic & Dramatic)
    const mainLight = new THREE.PointLight(0x007CC3, 10, 20);
    mainLight.position.set(5, 5, 5);
    scene.add(mainLight);

    const purpleLight = new THREE.PointLight(0x6366F1, 8, 20);
    purpleLight.position.set(-5, -5, 5);
    scene.add(purpleLight);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
    scene.add(ambientLight);

    camera.position.z = 6;

    // 4. INTERACTION & MOUSE TRACKING
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    window.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX / window.innerWidth - 0.5);
        mouseY = (e.clientY / window.innerHeight - 0.5);
    });

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
