const initApp = () => {
    renderJourney();
    renderExperience();
    renderProjects();
    renderCertifications();
    renderSkills();
    renderStats();

    // Re-initialize AOS after dynamic content loading
    setTimeout(() => {
        if (typeof AOS !== 'undefined') {
            AOS.refresh();
        }
    }, 500);
};

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}

function renderExperience() {
    const container = document.getElementById('experience-container');
    if (!container || !portfolioData.experience) return;

    container.innerHTML = portfolioData.experience.map((exp, index) => {
        return `
        <div class="glass-card p-8 rounded-2xl relative group hover:-translate-y-1 transition-all duration-300" data-aos="fade-up" data-aos-delay="${index * 100}">
            <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div class="flex items-center gap-4">
                    <div class="w-14 h-14 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                        <i class="fas ${exp.icon} text-2xl ${exp.color}"></i>
                    </div>
                    <div>
                        <h3 class="text-2xl font-bold">${exp.role}</h3>
                        <p class="text-accent-primary font-medium">${exp.company}</p>
                    </div>
                </div>
                <div class="text-left md:text-right">
                    <span class="inline-block px-4 py-2 rounded-full glass-border bg-white/5 text-sm font-bold text-gray-300 mb-2">
                        <i class="far fa-calendar-alt mr-2 text-accent-secondary"></i> ${exp.period}
                    </span>
                    <p class="text-sm text-gray-500"><i class="fas fa-map-marker-alt mr-2"></i> ${exp.location}</p>
                </div>
            </div>
            
            <p class="text-gray-400 mb-6 leading-relaxed">
                ${exp.description}
            </p>

            <ul class="grid md:grid-cols-2 gap-4">
                ${exp.highlights.map(hl => `
                    <li class="flex items-start gap-3">
                        <i class="fas fa-check-circle text-accent-primary mt-1 text-sm"></i>
                        <span class="text-gray-300 text-sm">${hl}</span>
                    </li>
                `).join('')}
            </ul>
        </div>
        `;
    }).join('');
}

function renderJourney() {
    const container = document.querySelector('#journey .space-y-12');
    if (!container) return;

    container.innerHTML = portfolioData.journey.map((item, index) => {
        const isEven = index % 2 === 0;
        const colorClass = item.className.includes('accent') ? `text-${item.className}` : `text-${item.className}`;
        const dotColor = item.className === 'accent-primary' ? 'bg-accent-primary' : (item.className === 'accent-secondary' ? 'bg-accent-secondary' : 'bg-purple-500');
        const shadowColor = item.className === 'accent-primary' ? '#667eea' : (item.className === 'accent-secondary' ? '#f5576c' : 'purple');

        const dateBlock = `
            <div class="${isEven ? 'md:text-right' : 'order-1 md:order-2 md:text-left text-right'}" data-aos="${isEven ? 'fade-right' : 'fade-left'}">
                <span class="inline-block px-4 py-2 rounded-full glass-border bg-white/5 ${colorClass} font-bold mb-2">${item.period}</span>
                <h3 class="text-2xl font-bold font-heading text-gray-100 dark:text-white">${item.title}</h3>
                <p class="text-gray-500 dark:text-gray-400">${item.subtitle}</p>
            </div>
        `;

        const cardBlock = `
            <div class="${isEven ? '' : 'order-2 md:order-1'}" data-aos="${isEven ? 'fade-left' : 'fade-right'}">
                <div class="glass-card p-8 rounded-xl relative hover:-translate-y-2 transition-transform duration-300 ${isEven ? 'md:ml-8' : 'md:mr-8'} group-hover:border-${item.className}/50">
                    ${item.highlights.length > 0 ? `
                    <ul class="space-y-3 text-gray-300 mb-6">
                        ${item.highlights.map(hl => `
                        <li class="flex items-start gap-3">
                            <i class="fas fa-check-circle ${colorClass} mt-1"></i>
                            <span class="text-gray-600 dark:text-gray-300">${hl}</span>
                        </li>`).join('')}
                    </ul>` : `
                    <p class="text-gray-600 dark:text-gray-300 mb-4">${item.description}</p>
                    `}
                    <div class="flex flex-wrap gap-2">
                        ${item.tags.map(tag => `
                        <span class="px-3 py-1 text-xs rounded-full bg-${dotColor.replace('bg-', '')}/20 text-gray-700 dark:text-gray-300 border border-${dotColor.replace('bg-', '')}/30">${tag}</span>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;

        return `
            <div class="relative grid md:grid-cols-2 gap-8 items-center group">
                <div class="absolute left-0 md:left-1/2 w-4 h-4 ${dotColor} rounded-full shadow-[0_0_10px_${shadowColor}] transform -translate-x-1/2 hidden md:block z-10"></div>
                ${isEven ? dateBlock + cardBlock : cardBlock + dateBlock}
            </div>
        `;
    }).join('');
}

function renderProjects(showAll = false) {
    const container = document.getElementById('projects-grid');
    const showAllBtn = document.getElementById('show-all-projects-btn');
    const btnContainer = document.getElementById('projects-button-container');
    
    if (!container || !portfolioData.projects) return;

    // Initially show only 4 or all if showAll is true
    const displayLimit = showAll ? portfolioData.projects.length : 4;
    const projectsToDisplay = portfolioData.projects.slice(0, displayLimit);

    container.innerHTML = projectsToDisplay.map((project, index) => {
        // Just for layout variety, making 1st and 4th items span 2 cols if on large screen
        const isLarge = index === 0 || index === 3;
        const colClass = isLarge ? 'lg:col-span-2' : '';

        return `
        <a href="${project.link}" target="_blank" class="group glass-card rounded-2xl overflow-hidden hover:-translate-y-3 transition-transform duration-500 relative ${colClass} block"
            data-category="${project.category}">
            <div class="absolute inset-0 bg-gradient-to-t from-dark to-transparent opacity-80 z-10"></div>
            
            <img src="${project.image}" alt="${project.title}"
                class="w-full h-96 object-cover transform group-hover:scale-110 transition duration-700"
                onerror="this.onerror=null; this.src='https://placehold.co/1200x600/2a2a2a/ffffff?text=${encodeURIComponent(project.title)}'">

            <div class="absolute bottom-0 left-0 right-0 p-8 z-20 translate-y-4 group-hover:translate-y-0 transition duration-500">
                <div class="flex gap-2 mb-4 opacity-0 group-hover:opacity-100 transition duration-500 delay-100">
                    ${project.tech.map(t => `<span class="px-3 py-1 text-xs rounded-full bg-${project.color}-600/80 text-white backdrop-blur-md">${t}</span>`).join('')}
                </div>
                <h3 class="text-2xl font-bold font-heading mb-2 text-white">${project.title}</h3>
                <p class="text-gray-300 line-clamp-2 md:line-clamp-none mb-6 max-w-xl">${project.description}</p>
                <div class="flex gap-4 opacity-0 group-hover:opacity-100 transition duration-500 delay-200">
                    <span class="px-6 py-2 bg-white text-black rounded-lg font-bold hover:bg-gray-200 transition flex items-center gap-2">
                        View Project <i class="fas fa-external-link-alt text-xs"></i>
                    </span>
                </div>
            </div>
        </a>
        `;
    }).join('');

    // Toggle button text and functionality
    if (portfolioData.projects.length <= 4) {
        if (btnContainer) btnContainer.classList.add('hidden');
    } else {
        if (btnContainer) btnContainer.classList.remove('hidden');
        if (showAllBtn) {
            if (showAll) {
                showAllBtn.innerHTML = `View Less <i class="fas fa-arrow-up ml-2 group-hover:-translate-y-1 transition-transform"></i>`;
                showAllBtn.onclick = () => renderProjects(false);
            } else {
                showAllBtn.innerHTML = `View All Projects <i class="fas fa-arrow-right ml-2 group-hover:translate-x-1 transition-transform"></i>`;
                showAllBtn.onclick = () => renderProjects(true);
            }
        }
    }

    // AOS refresh
    setTimeout(() => { if (typeof AOS !== 'undefined') AOS.refresh(); }, 100);
}
function renderCertifications(showAll = false) {
    const container = document.querySelector('#certifications .grid');
    const showAllBtn = document.getElementById('show-all-certs-btn');
    const btnContainer = document.getElementById('certs-button-container');
    
    if (!container || !portfolioData.certifications) return;

    // Show only 6 initially or all if showAll is true
    const displayLimit = showAll ? portfolioData.certifications.length : 6;
    const certsToDisplay = portfolioData.certifications.slice(0, displayLimit);

    container.innerHTML = certsToDisplay.map((cert, index) => {
        return `
        <div class="group glass-card rounded-xl overflow-hidden hover:-translate-y-2 transition-transform duration-300"
            data-aos="fade-up" data-aos-delay="${index * 100}">
            <!-- Certificate Image -->
            <div class="relative h-48 overflow-hidden">
                <img src="${cert.image}" alt="${cert.title}" 
                    class="w-full h-full object-cover transform group-hover:scale-110 transition duration-500"
                    onerror="this.onerror=null; this.src='https://placehold.co/400x250/1a1a2e/667eea?text=${encodeURIComponent(cert.title)}'">
                <div class="absolute inset-0 bg-gradient-to-t from-dark/90 to-transparent"></div>
                <!-- Badge -->
                <div class="absolute top-4 left-4">
                    <div class="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-lg flex items-center justify-center shadow-lg">
                        <i class="${cert.icon} text-xl ${cert.color}"></i>
                    </div>
                </div>
            </div>
            <!-- Details -->
            <div class="p-5">
                <h4 class="font-bold text-white text-lg mb-1">${cert.title}</h4>
                <p class="text-sm text-gray-400 mb-3">${cert.issuer}</p>
                <div class="flex justify-between items-center text-sm text-gray-500">
                    <span>Issued: ${cert.date}</span>
                    <button class="view-cert-btn text-accent-primary hover:text-accent-secondary transition-colors" 
                        data-image="${cert.image}" data-title="${cert.title}">
                        View <i class="fas fa-expand ml-1"></i>
                    </button>
                </div>
            </div>
        </div>
        `;
    }).join('');

    // Toggle button functionality
    if (portfolioData.certifications.length <= 6) {
        if (btnContainer) btnContainer.classList.add('hidden');
    } else {
        if (btnContainer) btnContainer.classList.remove('hidden');
        if (showAllBtn) {
            if (showAll) {
                showAllBtn.innerHTML = `Show Less <i class="fas fa-minus-circle ml-2 group-hover:-translate-y-1 transition-transform text-accent-primary"></i>`;
                showAllBtn.onclick = () => renderCertifications(false);
            } else {
                showAllBtn.innerHTML = `Show All Certificates <i class="fas fa-plus-circle ml-2 group-hover:scale-110 transition-transform text-accent-primary"></i>`;
                showAllBtn.onclick = () => renderCertifications(true);
            }
        }
    }

    // AOS refresh
    setTimeout(() => { if (typeof AOS !== 'undefined') AOS.refresh(); }, 100);

    // Add modal functionality
    initCertificateModal();
}

function renderSkills() {
    const container = document.querySelector('#skills .grid');
    if (!container) return;

    const iconMap = {
        'Code': 'fa-code',
        'Layout': 'fa-layer-group',
        'Server': 'fa-server',
        'Database': 'fa-database',
        'Smartphone': 'fa-mobile-alt',
        'Brain': 'fa-brain',
        'BarChart3': 'fa-chart-bar',
        'GitBranch': 'fa-code-branch',
        'Users': 'fa-users',
        'Desktop': 'fa-desktop'
    };

    const colorMap = [
        'text-blue-400',
        'text-purple-400',
        'text-pink-400',
        'text-teal-400',
        'text-orange-400',
        'text-indigo-400',
        'text-green-400',
        'text-yellow-400'
    ];

    container.innerHTML = portfolioData.skills.map((skill, index) => {
        const icon = iconMap[skill.icon] || 'fa-tools';
        const color = colorMap[index % colorMap.length];

        return `
        <div class="glass-card p-6 rounded-2xl group hover:-translate-y-2 transition-all duration-300" data-aos="fade-up" data-aos-delay="${index * 50}">
            <div class="flex items-center gap-4 mb-6">
                <div class="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                    <i class="fas ${icon} text-2xl ${color}"></i>
                </div>
                <h3 class="text-xl font-bold">${skill.category}</h3>
            </div>
            <div class="flex flex-wrap gap-2">
                ${skill.items.map(item => `
                    <span class="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-sm text-gray-300 hover:bg-white/10 hover:text-white hover:border-white/20 transition-all cursor-default">
                        ${item}
                    </span>
                `).join('')}
            </div>
        </div>
        `;
    }).join('');

    // Update the grid layout in index.html to support more categories
    container.className = "grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto";
}

function initCertificateModal() {
    const modal = document.getElementById('certificate-modal');
    const modalImage = document.getElementById('modal-image');
    const modalTitle = document.getElementById('modal-title');
    const closeBtn = document.getElementById('close-modal');
    const viewBtns = document.querySelectorAll('.view-cert-btn');

    if (!modal) return;

    viewBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const image = btn.getAttribute('data-image');
            const title = btn.getAttribute('data-title');

            modalImage.src = image;
            modalTitle.textContent = title;
            modal.classList.remove('hidden');
            modal.classList.add('flex');
            document.body.style.overflow = 'hidden';
        });
    });

    closeBtn?.addEventListener('click', () => {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
        document.body.style.overflow = '';
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.add('hidden');
            modal.classList.remove('flex');
            document.body.style.overflow = '';
        }
    });
}

function renderStats() {
    const container = document.getElementById('stats-section');
    if (!container || !portfolioData.stats) return;

    container.innerHTML = portfolioData.stats.map(stat => `
        <div class="glass-card p-6 rounded-2xl text-center group hover:-translate-y-2 transition-transform duration-300"
            data-aos="fade-up" data-aos-delay="${stat.delay}">
            <div class="text-4xl ${stat.color} mb-2"><i class="fas ${stat.icon}"></i></div>
            <div class="text-3xl font-bold font-heading mb-1 counter" data-target="${stat.value}">0</div>
            <div class="text-sm text-gray-400">${stat.label}</div>
        </div>
    `).join('');
}
