// 1. LENIS SMOOTH SCROLL INITIALIZATION
const isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent) || window.innerWidth < 768;

const lenis = new Lenis({
    duration: isMobile ? 0.8 : 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: !isMobile,           // Disable on mobile — use native scroll
    wheelMultiplier: 1,
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothTouch: false,               // Always off — causes lag on touch devices
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// 2. GSAP & SCROLLTRIGGER CONFIG
gsap.registerPlugin(ScrollTrigger);

// Connect Lenis to ScrollTrigger
lenis.on('scroll', ScrollTrigger.update);

gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);

// 3. HERO ANIMATIONS (Cinematic Entrance)
const initHero = () => {
    const heroTl = gsap.timeline({ defaults: { ease: "expo.out" } });

    gsap.set("main", { opacity: 1 });

    heroTl.from(".vt-innovation-badge", {
        y: 30,
        opacity: 0,
        duration: 1.5,
    })
    .from("#hero-title span", {
        y: 100,
        opacity: 0,
        duration: 2,
        stagger: 0.1,
    }, "-=1.2")
    .from("#hero-sub", {
        y: 40,
        opacity: 0,
        duration: 1.8,
    }, "-=1.6")
    .from("#hero-btns", {
        y: 30,
        opacity: 0,
        duration: 1.5,
    }, "-=1.6")
    .from(".hero-tech-card", {
        x: 100,
        opacity: 0,
        duration: 2,
        ease: "power4.out"
    }, "-=1.8")
    .from(".vt-hero .flex.flex-wrap.gap-12 > div", {
        y: 20,
        opacity: 0,
        duration: 1.2,
        stagger: 0.1,
    }, "-=1.5");
};

// Cinematic Hero Scroll Effects — desktop only (scrub parallax kills mobile perf)
if (!isMobile) {
    gsap.to(".vt-hero > .vt-container", {
        y: 100,
        opacity: 0,
        scale: 0.9,
        ease: "none",
        scrollTrigger: {
            trigger: ".vt-hero",
            start: "top top",
            end: "bottom top",
            scrub: true
        }
    });

    gsap.to("#three-canvas-container", {
        scale: 1.2,
        yPercent: 20,
        opacity: 0.2,
        ease: "none",
        scrollTrigger: {
            trigger: ".vt-hero",
            start: "top top",
            end: "bottom top",
            scrub: true
        }
    });

    gsap.to(".hero-tech-card", {
        y: -200,
        rotate: -15,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
            trigger: ".vt-hero",
            start: "top top",
            end: "bottom top",
            scrub: true
        }
    });
}

// 4. ROTATING TEXT
const words = [
    "360° Brand Authority", 
    "High-Fidelity Web Design", 
    "Omnipresent SEO & GEO", 
    "Strategic SMM Campaigns", 
    "Marketing Automations",
    "Legendary Brand Identity"
];
let i = 0;
const rotateText = () => {
    const el = document.getElementById("rotating-text");
    if (!el) return;
    
    gsap.to(el, {
        y: -30,
        opacity: 0,
        duration: 0.8,
        ease: "power4.inOut",
        onComplete: () => {
            i = (i + 1) % words.length;
            el.textContent = words[i];
            gsap.fromTo(el, 
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 1, ease: "power4.out" }
            );
        }
    });
};
setInterval(rotateText, 3500);

// 5. MAGNETIC BUTTONS — desktop only (touch devices don't need this)
const initMagneticButtons = () => {
    if (isMobile) return; // Skip entirely on mobile
    const buttons = document.querySelectorAll('.vt-btn-primary, .vt-btn-ghost, .vt-card');
    buttons.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            gsap.to(btn, {
                x: x * 0.2,
                y: y * 0.2,
                duration: 0.5,
                ease: "power2.out"
            });
        });
        
        btn.addEventListener('mouseleave', () => {
            gsap.to(btn, {
                x: 0,
                y: 0,
                duration: 0.5,
                ease: "elastic.out(1, 0.3)"
            });
        });
    });
};

const revealSections = () => {
    // 1. INITIAL STATES (Hide before animating)
    gsap.set(".reveal-up", { opacity: 0, y: 50 });
    gsap.set(".reveal-left", { opacity: 0, x: -50 });
    gsap.set(".reveal-right", { opacity: 0, x: 50 });
    gsap.set(".vt-card", { opacity: 0, y: 60 });

    // FAQ Accordion
    const faqs = document.querySelectorAll('.faq-item');
    faqs.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all other FAQs
            faqs.forEach(f => f.classList.remove('active'));
            
            // Toggle current
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // Reveal Cards
    gsap.utils.toArray('.vt-card').forEach((card, i) => {
        gsap.to(card, {
            scrollTrigger: {
                trigger: card,
                start: "top 90%",
                toggleActions: "play none none none"
            },
            y: 0,
            opacity: 1,
            duration: 1,
            delay: i % 3 * 0.1,
            ease: "power4.out"
        });
    });

    // Generic Reveals
    gsap.utils.toArray('.reveal-up').forEach((el) => {
        gsap.to(el, {
            scrollTrigger: {
                trigger: el,
                start: "top 90%",
            },
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power4.out"
        });
    });

    gsap.utils.toArray('.reveal-left').forEach((el) => {
        gsap.to(el, {
            scrollTrigger: {
                trigger: el,
                start: "top 90%",
            },
            x: 0,
            opacity: 1,
            duration: 1,
            ease: "power4.out"
        });
    });

    gsap.utils.toArray('.reveal-right').forEach((el) => {
        gsap.to(el, {
            scrollTrigger: {
                trigger: el,
                start: "top 90%",
            },
            x: 0,
            opacity: 1,
            duration: 1,
            ease: "power4.out"
        });
    });
    
    // Stats Counter
    gsap.utils.toArray('.counter').forEach(el => {
        const target = parseInt(el.getAttribute('data-target'));
        gsap.to(el, {
            scrollTrigger: {
                trigger: el,
                start: "top 90%",
            },
            innerText: target,
            duration: 2,
            snap: { innerText: 1 },
            ease: "power1.inOut"
        });
    });
};

// 6. APPLE-STYLE SHOWCASE (Horizontal Scroll & Parallax)
const setupHorizontalScroll = () => {
    const section = document.querySelector('.horizontal-scroll-container');
    const wrapper = document.querySelector('.horizontal-scroll-wrapper');
    if (!section || !wrapper) return;

    let scrollTween = gsap.to(wrapper, {
        x: () => -(wrapper.scrollWidth - window.innerWidth),
        ease: "none",
        scrollTrigger: {
            trigger: section,
            pin: true,
            scrub: 1,
            end: () => "+=" + (wrapper.scrollWidth - window.innerWidth),
            invalidateOnRefresh: true,
        }
    });
};

const setupShowcase = () => {
    const wrapper = document.querySelector('.apple-scroll-wrapper');
    if (!wrapper) return;

    gsap.from(".apple-scroll-item", {
        scrollTrigger: {
            trigger: ".apple-scroll-wrapper",
            start: "top 80%",
        },
        x: 100,
        opacity: 0,
        duration: 1.2,
        stagger: 0.1,
        ease: "power4.out"
    });
};

// 7. BACKGROUND TRANSITIONS & THEME SYNC
gsap.to("body", {
    scrollTrigger: {
        trigger: ".vt-section-dark",
        start: "top center",
        end: "bottom center",
        onEnter: () => {
            gsap.to("body", { backgroundColor: "#F1F5F9", duration: 1 });
            document.body.classList.add("theme-light");
            document.body.classList.remove("theme-dark");
        },
        onLeaveBack: () => {
            gsap.to("body", { backgroundColor: "#FFFFFF", duration: 1 });
            document.body.classList.add("theme-light");
            document.body.classList.remove("theme-dark");
        },
        onLeave: () => {
            gsap.to("body", { backgroundColor: "#FFFFFF", duration: 1 });
            document.body.classList.add("theme-light");
            document.body.classList.remove("theme-dark");
        },
        onEnterBack: () => {
            gsap.to("body", { backgroundColor: "#F1F5F9", duration: 1 });
            document.body.classList.add("theme-light");
            document.body.classList.remove("theme-dark");
        },
    }
});

// 8. MOBILE OPTIMIZATION
if (isMobile) {
    // Kill Three.js canvas
    const canvas = document.getElementById('three-canvas-container');
    if (canvas) canvas.style.display = 'none';
    // Reduce default animation cost
    gsap.defaults({ duration: 0.6, ease: 'power2.out' });
    // Reduce stagger on reveal animations
    gsap.globalTimeline.timeScale(1.3);
}

// 9. REFRESH ON RESIZE
window.addEventListener('resize', () => {
    ScrollTrigger.refresh();
});

// Initialize all
window.addEventListener('load', () => {
    initHero();
    revealSections();
    setupHorizontalScroll();
    setupShowcase();
    initMagneticButtons();
    
    // Smooth reveal for main content
    gsap.to("main", { opacity: 1, duration: 1 });
});
