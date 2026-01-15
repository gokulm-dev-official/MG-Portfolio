const filterBtns = document.querySelectorAll('.filter-buttons button');

if (filterBtns.length > 0) {
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const projectCards = document.querySelectorAll('#projects-grid > a');
            // Remove active class from all
            filterBtns.forEach(b => b.classList.remove('active-filter', 'bg-accent-primary', 'text-white'));
            filterBtns.forEach(b => b.classList.add('hover:bg-white/10'));

            // Add active class to clicked
            btn.classList.add('active-filter', 'bg-accent-primary', 'text-white');
            btn.classList.remove('hover:bg-white/10');

            const filterValue = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');

                if (filterValue === 'all' || category === filterValue) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });

            // AOS refresh to recalculate positions
            if (typeof AOS !== 'undefined') {
                setTimeout(() => {
                    AOS.refresh();
                }, 350);
            }
        });
    });
}
