const cursor = document.getElementById('cursor');
let cursorDot, cursorOutline;

if (cursor) {
    cursorDot = cursor.querySelector('.cursor-dot');
    cursorOutline = cursor.querySelector('.cursor-outline');

    let mouseX = 0;
    let mouseY = 0;
    let outlineX = 0;
    let outlineY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        // Dot follows immediately
        if (cursorDot) {
            cursorDot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
            // Ensure cursor container is positioned 0,0
            cursor.style.left = '0px';
            cursor.style.top = '0px';
        }
    });

    function animateCursor() {
        if (!cursorOutline) return;

        let distX = mouseX - outlineX;
        let distY = mouseY - outlineY;

        outlineX += distX * 0.15;
        outlineY += distY * 0.15;

        cursorOutline.style.transform = `translate(${outlineX}px, ${outlineY}px) translate(-50%, -50%)`;

        requestAnimationFrame(animateCursor);
    }

    animateCursor();

    // Hover interactions
    const interactables = document.querySelectorAll('a, button, input, textarea, .glass-card, .hover-trigger');

    interactables.forEach(el => {
        el.addEventListener('mouseenter', () => {
            if (cursorOutline) {
                cursorOutline.style.width = '50px';
                cursorOutline.style.height = '50px';
                cursorOutline.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                cursorOutline.style.borderColor = 'transparent';
            }
        });

        el.addEventListener('mouseleave', () => {
            if (cursorOutline) {
                cursorOutline.style.width = '32px';
                cursorOutline.style.height = '32px';
                cursorOutline.style.backgroundColor = 'transparent';
                cursorOutline.style.borderColor = 'rgba(255, 255, 255, 0.5)';
            }
        });
    });
}
