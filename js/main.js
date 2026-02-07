// Main JavaScript file

// Scramble Text Effect (Universal)
class ScrambleText {
    constructor() {
        this.chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*';
        this.init();
    }

    init() {
        // Auto-scramble elements with data-scramble attribute
        const scrambleElements = document.querySelectorAll('[data-scramble]');

        scrambleElements.forEach(element => {
            const mode = element.getAttribute('data-scramble');
            const delay = parseInt(element.getAttribute('data-scramble-delay')) || 0;

            setTimeout(() => {
                if (mode === 'continuous') {
                    this.continuousScramble(element);
                } else if (mode === 'hover') {
                    this.hoverScramble(element);
                } else if (mode === 'once') {
                    this.scrambleOnce(element);
                }
            }, delay);
        });
    }

    // Continuous scramble (like Minecraft $k)
    continuousScramble(element) {
        const originalText = element.getAttribute('data-text') || element.textContent;
        const length = originalText.length;

        setInterval(() => {
            let scrambled = '';
            for (let i = 0; i < length; i++) {
                if (originalText[i] === ' ') {
                    scrambled += ' ';
                } else {
                    scrambled += Math.floor(Math.random() * 10);
                }
            }
            element.textContent = scrambled;
        }, 50);
    }

    // Scramble on hover
    hoverScramble(element) {
        const originalText = element.textContent;
        let scrambleInterval;

        element.addEventListener('mouseenter', () => {
            let iteration = 0;
            const maxIterations = originalText.length * 2;

            clearInterval(scrambleInterval);

            scrambleInterval = setInterval(() => {
                element.textContent = originalText
                    .split('')
                    .map((char, index) => {
                        if (index < iteration / 2) {
                            return originalText[index];
                        }
                        if (char === ' ') return ' ';
                        return this.chars[Math.floor(Math.random() * this.chars.length)];
                    })
                    .join('');

                iteration++;

                if (iteration >= maxIterations) {
                    clearInterval(scrambleInterval);
                    element.textContent = originalText;
                }
            }, 30);
        });
    }

    // Scramble once on view
    scrambleOnce(element) {
        const originalText = element.textContent;
        let iteration = 0;
        const maxIterations = originalText.length * 2;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !element.classList.contains('scrambled')) {
                    element.classList.add('scrambled');

                    const interval = setInterval(() => {
                        element.textContent = originalText
                            .split('')
                            .map((char, index) => {
                                if (index < iteration / 2) {
                                    return originalText[index];
                                }
                                if (char === ' ') return ' ';
                                return this.chars[Math.floor(Math.random() * this.chars.length)];
                            })
                            .join('');

                        iteration++;

                        if (iteration >= maxIterations) {
                            clearInterval(interval);
                            element.textContent = originalText;
                        }
                    }, 30);
                }
            });
        }, { threshold: 0.5 });

        observer.observe(element);
    }
}

// Mobile Navigation Toggle
class MobileNav {
    constructor() {
        this.toggle = document.querySelector('.nav-toggle');
        this.navLinks = document.querySelector('.nav-links');
        this.init();
    }

    init() {
        if (!this.toggle) return;

        this.toggle.addEventListener('click', () => {
            this.navLinks.classList.toggle('active');
            this.toggle.classList.toggle('active');

            // Animate hamburger
            const spans = this.toggle.querySelectorAll('span');
            if (this.toggle.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translateY(10px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translateY(-10px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });

        // Close menu when clicking a link
        const links = this.navLinks.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', () => {
                this.navLinks.classList.remove('active');
                this.toggle.classList.remove('active');

                const spans = this.toggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            });
        });
    }
}

// Download Button Tracking
class DownloadTracker {
    constructor() {
        this.init();
    }

    init() {
        const downloadButtons = document.querySelectorAll('.btn-download, .btn-primary');

        downloadButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                // Add ripple effect
                const ripple = document.createElement('span');
                ripple.style.position = 'absolute';
                ripple.style.width = '20px';
                ripple.style.height = '20px';
                ripple.style.background = 'rgba(255, 255, 255, 0.5)';
                ripple.style.borderRadius = '50%';
                ripple.style.transform = 'scale(0)';
                ripple.style.animation = 'ripple 0.6s ease-out';

                const rect = button.getBoundingClientRect();
                ripple.style.left = (e.clientX - rect.left) + 'px';
                ripple.style.top = (e.clientY - rect.top) + 'px';

                button.appendChild(ripple);

                setTimeout(() => ripple.remove(), 600);

                console.log('Download button clicked');
            });
        });
    }
}

// Easter Egg: Konami Code
class KonamiCode {
    constructor() {
        this.sequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
        this.current = 0;
        this.init();
    }

    init() {
        document.addEventListener('keydown', (e) => {
            if (e.key === this.sequence[this.current]) {
                this.current++;

                if (this.current === this.sequence.length) {
                    this.activate();
                    this.current = 0;
                }
            } else {
                this.current = 0;
            }
        });
    }

    activate() {
        console.log('🎮 Konami Code activated!');

        // Add rainbow effect
        const style = document.createElement('style');
        style.innerHTML = `
            @keyframes rainbow {
                0% { filter: hue-rotate(0deg); }
                100% { filter: hue-rotate(360deg); }
            }
            body {
                animation: rainbow 3s linear infinite !important;
            }
        `;
        document.head.appendChild(style);

        setTimeout(() => style.remove(), 10000);
    }
}

// Performance Monitor (dev only)
class PerformanceMonitor {
    constructor() {
        this.fps = 0;
        this.lastTime = performance.now();
        this.init();
    }

    init() {
        if (window.location.search.includes('debug')) {
            this.createMonitor();
            this.update();
        }
    }

    createMonitor() {
        const monitor = document.createElement('div');
        monitor.id = 'perf-monitor';
        monitor.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: rgba(0, 0, 0, 0.8);
            color: #00ff88;
            padding: 10px;
            font-family: monospace;
            font-size: 12px;
            border-radius: 8px;
            z-index: 10000;
            border: 1px solid #00ff88;
        `;
        document.body.appendChild(monitor);
    }

    update() {
        const now = performance.now();
        const delta = now - this.lastTime;
        this.fps = Math.round(1000 / delta);
        this.lastTime = now;

        const monitor = document.getElementById('perf-monitor');
        if (monitor) {
            monitor.innerHTML = `
                FPS: ${this.fps}<br>
                Memory: ${(performance.memory?.usedJSHeapSize / 1048576).toFixed(2)} MB
            `;
        }

        requestAnimationFrame(() => this.update());
    }
}

// Preload Images
class ImagePreloader {
    constructor() {
        this.images = [];
        this.init();
    }

    init() {
        // Add any images that should be preloaded
        const imageSources = [
            // Add image URLs here
        ];

        imageSources.forEach(src => {
            const img = new Image();
            img.src = src;
            this.images.push(img);
        });
    }
}

// Initialize everything
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new ScrambleText();
        new MobileNav();
        new DownloadTracker();
        new KonamiCode();
        new PerformanceMonitor();
        new ImagePreloader();
    });
} else {
    new ScrambleText();
    new MobileNav();
    new DownloadTracker();
    new KonamiCode();
    new PerformanceMonitor();
    new ImagePreloader();
}

// Add CSS for ripple animation
const rippleStyle = document.createElement('style');
rippleStyle.innerHTML = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// Console Easter Egg
console.log(`
%c███╗   ██╗██╗   ██╗██╗   ██╗██╗ ██████╗ ███╗   ██╗
%c████╗  ██║██║   ██║██║   ██║██║██╔═══██╗████╗  ██║
%c██╔██╗ ██║██║   ██║██║   ██║██║██║   ██║██╔██╗ ██║
%c██║╚██╗██║██║   ██║╚██╗ ██╔╝██║██║   ██║██║╚██╗██║
%c██║ ╚████║╚██████╔╝ ╚████╔╝ ██║╚██████╔╝██║ ╚████║
%c╚═╝  ╚═══╝ ╚═════╝   ╚═══╝  ╚═╝ ╚═════╝ ╚═╝  ╚═══╝

%cWillkommen zur NUVION Developer Console! 🚀
%cTipp: Probiere den Konami Code aus... ⬆️⬆️⬇️⬇️⬅️➡️⬅️➡️BA
`,
    'color: #00ff88',
    'color: #00ff88',
    'color: #00ff88',
    'color: #00ff88',
    'color: #00ff88',
    'color: #00ff88',
    'color: #00ccff; font-size: 14px; font-weight: bold;',
    'color: #a0a0b0; font-size: 12px;'
);