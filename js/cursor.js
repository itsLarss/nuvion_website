// Custom Cursor
class CustomCursor {
    constructor() {
        this.dot = document.querySelector('.cursor-dot');
        this.outline = document.querySelector('.cursor-outline');

        if (!this.dot || !this.outline) return;

        this.pos = { x: 0, y: 0 };
        this.mouse = { x: 0, y: 0 };
        this.speed = 0.15;

        this.init();
    }

    init() {
        document.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
        });

        // Hover effects
        const interactiveElements = document.querySelectorAll('a, button, .feature-card, .stat-card');

        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                this.dot.style.transform = 'translate(-50%, -50%) scale(1.5)';
                this.outline.style.transform = 'translate(-50%, -50%) scale(1.5)';
                this.outline.style.borderColor = '#00ccff';
            });

            el.addEventListener('mouseleave', () => {
                this.dot.style.transform = 'translate(-50%, -50%) scale(1)';
                this.outline.style.transform = 'translate(-50%, -50%) scale(1)';
                this.outline.style.borderColor = '#00ff88';
            });
        });

        this.animate();
    }

    animate() {
        // Smooth follow
        this.pos.x += (this.mouse.x - this.pos.x) * this.speed;
        this.pos.y += (this.mouse.y - this.pos.y) * this.speed;

        this.dot.style.left = this.mouse.x + 'px';
        this.dot.style.top = this.mouse.y + 'px';

        this.outline.style.left = this.pos.x + 'px';
        this.outline.style.top = this.pos.y + 'px';

        requestAnimationFrame(() => this.animate());
    }
}

// Initialize
if (window.innerWidth > 768) { // Only on desktop
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            new CustomCursor();
        });
    } else {
        new CustomCursor();
    }
}