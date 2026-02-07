// Scroll Animations
class ScrollAnimations {
    constructor() {
        this.init();
    }

    init() {
        this.observeElements();
        this.animateStats();
    }

    observeElements() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Observe feature cards
        const cards = document.querySelectorAll('.feature-card, .stat-card');
        cards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(50px)';
            card.style.transition = `all 0.6s ease ${index * 0.1}s`;
            observer.observe(card);
        });

        // Observe sections
        const sections = document.querySelectorAll('.section-header');
        sections.forEach(section => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(30px)';
            section.style.transition = 'all 0.6s ease';
            observer.observe(section);
        });
    }

    animateStats() {
        const statValues = document.querySelectorAll('.stat-value');

        const observerOptions = {
            threshold: 0.5
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                    this.scrambleToTarget(entry.target);
                    entry.target.classList.add('counted');
                }
            });
        }, observerOptions);

        statValues.forEach(stat => observer.observe(stat));
    }

    scrambleToTarget(element) {
        const target = parseInt(element.getAttribute('data-target'));
        const targetStr = target.toLocaleString('de-DE');
        const length = targetStr.replace(/\./g, '').length; // Length without dots
        const duration = 2000; // 2 seconds scramble
        const updateInterval = 50; // Update every 50ms
        const steps = duration / updateInterval;
        let currentStep = 0;

        // Add scramble class for glitch effect
        element.classList.add('scramble');

        const scrambleInterval = setInterval(() => {
            currentStep++;

            // Generate random numbers for scramble effect
            let scrambled = '';
            const progress = currentStep / steps;
            const revealLength = Math.floor(length * progress);

            // Build the scrambled text
            const finalDigits = targetStr.replace(/\./g, '').split('');

            for (let i = 0; i < length; i++) {
                if (i < revealLength) {
                    // Revealed part - show actual digit
                    scrambled += finalDigits[i];
                } else {
                    // Scrambled part - random digit
                    scrambled += Math.floor(Math.random() * 10);
                }
            }

            // Add dots back for German number formatting
            scrambled = this.formatGermanNumber(scrambled);
            element.textContent = scrambled;

            // When done, show final number and remove scramble effect
            if (currentStep >= steps) {
                clearInterval(scrambleInterval);
                element.textContent = targetStr;
                element.classList.remove('scramble');
            }
        }, updateInterval);
    }

    formatGermanNumber(str) {
        // Add dots every 3 digits from the right (German formatting)
        const digits = str.split('');
        let formatted = '';
        for (let i = 0; i < digits.length; i++) {
            if (i > 0 && (digits.length - i) % 3 === 0) {
                formatted += '.';
            }
            formatted += digits[i];
        }
        return formatted;
    }
}

// 3D Tilt Effect for Cards
class TiltEffect {
    constructor() {
        this.cards = document.querySelectorAll('[data-tilt]');
        this.init();
    }

    init() {
        this.cards.forEach(card => {
            card.addEventListener('mousemove', (e) => this.handleMouseMove(e, card));
            card.addEventListener('mouseleave', () => this.handleMouseLeave(card));
        });
    }

    handleMouseMove(e, card) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
    }

    handleMouseLeave(card) {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
    }
}

// Parallax Effect
class ParallaxEffect {
    constructor() {
        this.init();
    }

    init() {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;

            // Parallax for hero section
            const hero = document.querySelector('.hero-content');
            if (hero) {
                hero.style.transform = `translateY(${scrolled * 0.5}px)`;
                hero.style.opacity = 1 - scrolled / 800;
            }

            // Parallax for gradient background
            const gradientBg = document.querySelector('.gradient-bg');
            if (gradientBg) {
                gradientBg.style.transform = `translateY(${scrolled * 0.3}px) scale(${1 + scrolled * 0.0001})`;
            }
        });
    }
}

// Navbar Scroll Effect
class NavbarScroll {
    constructor() {
        this.navbar = document.querySelector('.navbar');
        this.init();
    }

    init() {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                this.navbar.classList.add('scrolled');
            } else {
                this.navbar.classList.remove('scrolled');
            }
        });
    }
}

// Smooth Scroll for Anchor Links
class SmoothScroll {
    constructor() {
        this.init();
    }

    init() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                const href = anchor.getAttribute('href');
                if (href === '#') return;

                e.preventDefault();

                const target = document.querySelector(href);
                if (target) {
                    const offsetTop = target.offsetTop - 80;

                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
}

// Loading Animation
class LoadingAnimation {
    constructor() {
        this.init();
    }

    init() {
        window.addEventListener('load', () => {
            document.body.style.opacity = '0';

            setTimeout(() => {
                document.body.style.transition = 'opacity 0.5s ease';
                document.body.style.opacity = '1';
            }, 100);
        });
    }
}

// Initialize all animations
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new ScrollAnimations();
        new TiltEffect();
        new ParallaxEffect();
        new NavbarScroll();
        new SmoothScroll();
        new LoadingAnimation();
    });
} else {
    new ScrollAnimations();
    new TiltEffect();
    new ParallaxEffect();
    new NavbarScroll();
    new SmoothScroll();
    new LoadingAnimation();
}