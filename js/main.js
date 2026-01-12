// Initialize AOS
if (typeof AOS !== 'undefined') {
    AOS.init({
        once: true,
        offset: 50,
        duration: 1000,
        easing: 'ease-out-cubic',
    });
}

// Initialize Typed.js
if (document.getElementById('typed-output') && typeof Typed !== 'undefined') {
    new Typed('#typed-output', {
        strings: ['a Full Stack Developer', 'an AI & Data Science Student', 'a MERN Stack Developer', 'a Problem Solver'],
        typeSpeed: 50,
        backSpeed: 30,
        backDelay: 3000,
        loop: true,
        smartBackspace: true,
    });
}

// Particle.js Init
if (document.getElementById('particles-js') && typeof particlesJS !== 'undefined') {
    particlesJS("particles-js", {
        "particles": {
            "number": { "value": 40, "density": { "enable": true, "value_area": 800 } },
            "color": { "value": "#ffffff" },
            "shape": { "type": "circle" },
            "opacity": { "value": 0.3, "random": true },
            "size": { "value": 3, "random": true },
            "line_linked": { "enable": true, "distance": 150, "color": "#ffffff", "opacity": 0.1, "width": 1 },
            "move": { "enable": true, "speed": 2, "random": true, "direction": "none", "out_mode": "out" }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": { "onhover": { "enable": true, "mode": "grab" }, "onclick": { "enable": true, "mode": "push" } },
            "modes": { "grab": { "distance": 140, "line_linked": { "opacity": 1 } } }
        },
        "retina_detect": true
    });
}

// Mobile Menu Logic
const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-link');

let isMenuOpen = false;

if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
        isMenuOpen = !isMenuOpen;
        if (isMenuOpen) {
            mobileMenu.classList.remove('translate-x-full');
            document.body.style.overflow = 'hidden';
            // Animate burger to X
            menuBtn.children[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            menuBtn.children[1].style.opacity = '0';
            menuBtn.children[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
            menuBtn.children[2].style.width = '1.5rem';
        } else {
            mobileMenu.classList.add('translate-x-full');
            document.body.style.overflow = '';
            // Revert burger
            menuBtn.children[0].style.transform = '';
            menuBtn.children[1].style.opacity = '1';
            menuBtn.children[2].style.transform = '';
            menuBtn.children[2].style.width = '1rem';
        }
    });

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            isMenuOpen = false;
            mobileMenu.classList.add('translate-x-full');
            document.body.style.overflow = '';
            // Reset burger icon
            menuBtn.children[0].style.transform = '';
            menuBtn.children[1].style.opacity = '1';
            menuBtn.children[2].style.transform = '';
            menuBtn.children[2].style.width = '1rem';
        });
    });
}

// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
const html = document.documentElement;

if (themeToggle) {
    // Check local storage
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        html.classList.add('dark');
    } else {
        html.classList.remove('dark');
    }

    themeToggle.addEventListener('click', () => {
        html.classList.toggle('dark');
        if (html.classList.contains('dark')) {
            localStorage.theme = 'dark';
        } else {
            localStorage.theme = 'light';
        }
    });
}

// Stats Counter Animation
const statsSection = document.getElementById('stats-section');
let started = false;

if (statsSection) {
    window.addEventListener('scroll', () => {
        if (window.scrollY + window.innerHeight > statsSection.offsetTop && !started) {
            const dynamicCounters = document.querySelectorAll('.counter');
            dynamicCounters.forEach(counter => {
                counter.innerText = '0';
                const type = counter.getAttribute('data-type');
                const target = +counter.getAttribute('data-target');

                const increment = target / 50;

                const updateCounter = () => {
                    const c = +counter.innerText;
                    if (c < target) {
                        counter.innerText = Math.ceil(c + increment);
                        setTimeout(updateCounter, 20);
                    } else {
                        counter.innerText = target + (type === 'plus' ? '+' : '');
                    }
                };
                updateCounter();
            });
            started = true;
        }
    });
}

// Swiper Init (Testimonials)
if (document.querySelector('.testimonial-swiper')) {
    const swiper = new Swiper('.testimonial-swiper', {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        // breakpoints: {
        //     768: {
        //         slidesPerView: 2,
        //     }
        // }
    });
}

// Back to Top Button
const backToTopBtn = document.getElementById('back-to-top');

if (backToTopBtn) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTopBtn.classList.remove('opacity-0', 'translate-y-20');
        } else {
            backToTopBtn.classList.add('opacity-0', 'translate-y-20');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// Dynamic Year
const yearSpan = document.getElementById('year');
if (yearSpan) {
    yearSpan.innerText = new Date().getFullYear();
}

// Contact Form (Direct Email via Mailto)
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form values
        const name = contactForm.querySelector('input[placeholder=""]').parentElement.querySelector('input').value; // Name input
        const emailInput = contactForm.querySelector('input[type="email"]');
        const subject = contactForm.querySelector('select').value;
        const message = contactForm.querySelector('textarea').value;

        // Validation (basic)
        if (!name || !emailInput.value || !message) {
            alert("Please fill in all fields.");
            return;
        }

        // Simulate loading
        const btn = contactForm.querySelector('button');
        const originalContent = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Preparing Email...';
        btn.disabled = true;

        setTimeout(() => {
            // Create mailto link
            const mailtoLink = `mailto:gokulxmg26@gmail.com?subject=${encodeURIComponent(subject + " - From Portfolio")}&body=${encodeURIComponent("Name: " + name + "\nEmail: " + emailInput.value + "\n\nMessage:\n" + message)}`;

            // Open user's email client
            window.location.href = mailtoLink;

            btn.innerHTML = '<i class="fas fa-check"></i> Redirected!';
            btn.classList.add('bg-green-500');
            contactForm.reset();

            setTimeout(() => {
                btn.innerHTML = originalContent;
                btn.classList.remove('bg-green-500');
                btn.disabled = false;
            }, 3000);
        }, 1000);
    });
}
