// Custom Scroll Animations utilizing Intersection Observer or just simple classes
// AOS is handling most view-based animations. 
// This file is for more complex timeline sequences if needed later.

console.log("Animations initialized");

// Example: Parallax effect for mouse movement on hero section
const hero = document.getElementById('hero');
const mouseParallaxElements = document.querySelectorAll('.parallax-mouse');

if (hero) {
    hero.addEventListener('mousemove', (e) => {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;

        mouseParallaxElements.forEach(el => {
            const speed = el.getAttribute('data-speed') || 20;
            const xOffset = (x - 0.5) * speed;
            const yOffset = (y - 0.5) * speed;
            el.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
        });
    });
}
