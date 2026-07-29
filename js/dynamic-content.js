const initApp = async () => {
    renderJourney();
    renderExperience();
    renderProjects();
    renderCertifications();
    renderSkills();
    
    await fetchDynamicStats();
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

async function fetchDynamicStats() {
    let lcSolved = null;
    let lcCalendar = null;
    let ghData = null;

    // Fetch LeetCode Solved Stats
    try {
        const lcRes = await fetch('https://alfa-leetcode-api.onrender.com/GokulVisionX/solved');
        if (lcRes.ok) lcSolved = await lcRes.json();
    } catch (e) {
        console.error("Error fetching LC solved:", e);
    }
    
    // Fetch LeetCode Calendar Stats
    try {
        const lcStreakRes = await fetch('https://alfa-leetcode-api.onrender.com/GokulVisionX/calendar');
        if (lcStreakRes.ok) lcCalendar = await lcStreakRes.json();
    } catch (e) {
        console.error("Error fetching LC calendar:", e);
    }
    
    // Fetch GitHub Stats
    try {
        const ghRes = await fetch('https://github-contributions-api.jogruber.de/v4/gokulm-dev-official');
        if (ghRes.ok) {
            const raw = await ghRes.json();
            const total = Object.values(raw.total || {}).reduce((a, b) => a + b, 0);
            const contributions = (raw.contributions || []).map(c => ({
                date: c.date,
                contributionCount: c.count
            }));
            ghData = { totalContributions: total, contributions };
        }
    } catch (e) {
        console.error("Error fetching GitHub stats from primary API:", e);
    }

    if (!ghData) {
        try {
            const ghRes = await fetch('https://github-contributions-api.deno.dev/gokulm-dev-official.json');
            if (ghRes.ok) ghData = await ghRes.json();
        } catch (e) {
            console.error("Error fetching GitHub stats from fallback API:", e);
        }
    }
    
    renderAdvancedStats(ghData, lcSolved, lcCalendar);
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
        return `
        <div class="project-card group relative rounded-2xl overflow-hidden block h-[450px]"
            data-category="${project.category}" data-aos="fade-up" data-aos-delay="${index * 100}">
            
            <!-- Background Image -->
            <img src="${project.image}" alt="${project.title}"
                class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                onerror="this.onerror=null; this.src='https://placehold.co/1200x600/2a2a2a/ffffff?text=${encodeURIComponent(project.title)}'">

            <!-- Bottom Gradient (Always visible for title readability) -->
            <div class="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/90 to-transparent pointer-events-none"></div>
            
            <!-- Default State (Shows Title at bottom) -->
            <div class="absolute inset-x-0 bottom-0 p-6 transition-all duration-500 ease-in-out group-hover:opacity-0 group-hover:translate-y-4">
                <h3 class="text-2xl font-bold font-heading text-white drop-shadow-md">${project.title}</h3>
            </div>

            <!-- Hover Overlay (Multiple Detailing) -->
            <div class="absolute inset-0 bg-[#0f1115]/95 backdrop-blur-md p-8 flex flex-col translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] border border-white/10 z-20">
                
                <!-- Title -->
                <h3 class="text-2xl font-bold font-heading text-${project.color}-400 mb-4 transform -translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">${project.title}</h3>
                
                <!-- Description -->
                <p class="text-gray-300 text-sm leading-relaxed mb-6 transform -translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-200 line-clamp-5">${project.description}</p>
                
                <!-- Tech Stack Tags -->
                <div class="flex flex-wrap gap-2 mb-8 transform -translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-300">
                    ${project.tech.map((t) => `<span class="px-2.5 py-1 text-xs font-medium rounded bg-${project.color}-500/10 text-${project.color}-200 border border-${project.color}-500/30 shadow-[0_0_8px_rgba(0,0,0,0.5)]">${t}</span>`).join('')}
                </div>
                
                <!-- Action Buttons -->
                <div class="mt-auto transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-400">
                    <a href="${project.link}" target="_blank" class="w-full inline-flex items-center justify-center gap-2 py-3 rounded-lg bg-${project.color}-600 hover:bg-${project.color}-500 text-white font-bold tracking-wide transition-colors shadow-lg shadow-${project.color}-500/25">
                        <i class="fas fa-external-link-alt"></i> View Live Project
                    </a>
                </div>
            </div>
            
            <!-- External Neon Glow -->
            <div class="card-glow absolute inset-0 -z-10 bg-${project.color}-500/40 blur-2xl opacity-0 group-hover:opacity-100 transition duration-500 pointer-events-none rounded-2xl"></div>
        </div>
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
                    <div class="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-lg flex items-center justify-center shadow-lg overflow-hidden p-1.5">
                        ${cert.logo ? 
                            `<img src="${cert.logo}" alt="${cert.issuer} Logo" class="w-full h-full object-contain">` :
                            `<i class="${cert.icon} text-xl ${cert.color}"></i>`
                        }
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
    // Deprecated, removed old stats grid
}

function renderAdvancedStats(ghData, lcSolved, lcCalendar) {
    // 1. Render GitHub Stats
    if (ghData) {
        try {
            document.getElementById('gh-total-commits').innerText = ghData.totalContributions || 0;
            
            // Calculate current and longest streak
            let currentStreak = 0;
            let longestStreak = 0;
            let tempStreak = 0;
            let timelineData = [];
            
            // Flatten contributions and filter out future days
            const pastDays = [];
            const now = new Date();
            const todayStr = now.getFullYear() + '-' + String(now.getMonth() + 1).padStart(2, '0') + '-' + String(now.getDate()).padStart(2, '0');
            
            if (Array.isArray(ghData.contributions)) {
                for (const item of ghData.contributions) {
                    if (Array.isArray(item)) {
                        for (const day of item) {
                            if (day.date <= todayStr) {
                                pastDays.push(day);
                            }
                        }
                    } else if (item && typeof item === 'object') {
                        if (item.date <= todayStr) {
                            pastDays.push(item);
                        }
                    }
                }
            }
            
            for (const day of pastDays) {
                if (day.contributionCount > 0) {
                    tempStreak++;
                    if (tempStreak > longestStreak) longestStreak = tempStreak;
                } else {
                    tempStreak = 0;
                }
                
                // Timeline for last 30 days
                timelineData.push({
                    x: new Date(day.date).getTime(),
                    y: day.contributionCount
                });
            }
            
            // Count backwards from end for current streak
            let streakIndex = pastDays.length - 1;
            
            // GitHub streak grace period: if today is 0, we can still have a streak from yesterday
            if (streakIndex >= 0 && pastDays[streakIndex].contributionCount === 0) {
                streakIndex--;
            }
            
            for (; streakIndex >= 0; streakIndex--) {
                if (pastDays[streakIndex].contributionCount > 0) {
                    currentStreak++;
                } else {
                    break;
                }
            }
            
            document.getElementById('gh-longest-streak').innerText = longestStreak;
            
            // Render Streak Radial Chart
            if (typeof ApexCharts !== 'undefined') {
                new ApexCharts(document.querySelector("#gh-streak-chart"), {
                    series: [currentStreak > 0 ? (currentStreak/longestStreak)*100 : 0],
                    chart: { type: 'radialBar', height: 160, sparkline: { enabled: true } },
                    plotOptions: {
                        radialBar: {
                            hollow: { size: '60%' },
                            track: { background: 'transparent' },
                            dataLabels: {
                                name: { show: false },
                                value: { fontSize: '24px', fontWeight: 'bold', color: '#fff', formatter: () => currentStreak }
                            }
                        }
                    },
                    stroke: { lineCap: 'round' },
                    colors: ['#667eea']
                }).render();

                // Render Timeline Chart
                new ApexCharts(document.querySelector("#gh-timeline-chart"), {
                    series: [{ name: 'Contributions', data: timelineData.slice(-30) }],
                    chart: { type: 'area', height: 200, toolbar: { show: false }, background: 'transparent' },
                    colors: ['#764ba2'],
                    fill: { type: 'gradient', gradient: { shadeIntensity: 1, opacityFrom: 0.7, opacityTo: 0.1, stops: [0, 90, 100] } },
                    dataLabels: { enabled: false },
                    stroke: { curve: 'smooth', width: 2 },
                    xaxis: { type: 'datetime', labels: { style: { colors: '#6b7280' } }, axisBorder: { show: false }, axisTicks: { show: false } },
                    yaxis: { show: false },
                    grid: { borderColor: '#ffffff1a', strokeDashArray: 4, yaxis: { lines: { show: true } }, xaxis: { lines: { show: true } } },
                    theme: { mode: 'dark' }
                }).render();
            }
        } catch (e) {
            console.error("Error rendering GitHub stats:", e);
        }
    }

    // 2. Render LeetCode Stats
    if (lcSolved) {
        try {
            document.getElementById('lc-easy').innerText = lcSolved.easySolved || 0;
            document.getElementById('lc-medium').innerText = lcSolved.mediumSolved || 0;
            document.getElementById('lc-hard').innerText = lcSolved.hardSolved || 0;
            
            const total = lcSolved.solvedProblem || 0;
            document.getElementById('lc-easy-bar').style.width = ((lcSolved.easySolved || 0) / 800 * 100) + '%';
            document.getElementById('lc-medium-bar').style.width = ((lcSolved.mediumSolved || 0) / 1600 * 100) + '%';
            document.getElementById('lc-hard-bar').style.width = ((lcSolved.hardSolved || 0) / 700 * 100) + '%';
            
            // Render Total Radial
            if (typeof ApexCharts !== 'undefined') {
                new ApexCharts(document.querySelector("#lc-total-chart"), {
                    series: [(total / 3000) * 100],
                    chart: { type: 'radialBar', height: 180, sparkline: { enabled: true } },
                    plotOptions: {
                        radialBar: {
                            hollow: { size: '65%' },
                            track: { background: '#2a2a2a' },
                            dataLabels: {
                                name: { show: false },
                                value: { fontSize: '28px', fontWeight: 'bold', color: '#fff', formatter: () => total, offsetY: 10 }
                            }
                        }
                    },
                    stroke: { lineCap: 'round' },
                    colors: ['#ffa116']
                }).render();
            }
        } catch(e) {
            console.error("Error rendering LC stats:", e);
        }
    }

    if (lcCalendar && lcCalendar.submissionCalendar) {
        const heatmap = document.getElementById('lc-heatmap');
        if (heatmap) {
            const cal = JSON.parse(lcCalendar.submissionCalendar);
            
            const getLocalYMD = (date) => {
                const y = date.getFullYear();
                const m = String(date.getMonth() + 1).padStart(2, '0');
                const dStr = String(date.getDate()).padStart(2, '0');
                return `${y}-${m}-${dStr}`;
            };

            const normalizedCal = {};
            for (const [ts, count] of Object.entries(cal)) {
                normalizedCal[getLocalYMD(new Date(parseInt(ts) * 1000))] = count;
            }
            
            // Generate last 52 weeks (approx 364 days)
            const weeks = 52;
            let currentDay = new Date();
            currentDay.setHours(0,0,0,0);
            
            const startDate = new Date(currentDay);
            startDate.setDate(startDate.getDate() - (weeks * 7) + 1);
            
            let html = '';
            for (let w = 0; w < weeks; w++) {
                html += '<div class="lc-heatmap-col">';
                for (let d = 0; d < 7; d++) {
                    const cellDate = new Date(startDate);
                    cellDate.setDate(cellDate.getDate() + (w * 7) + d);
                    const dateStr = getLocalYMD(cellDate);
                    
                    let levelClass = '';
                    if (normalizedCal[dateStr]) {
                        const count = normalizedCal[dateStr];
                        if (count === 1) levelClass = 'lc-lvl-1';
                        else if (count === 2) levelClass = 'lc-lvl-2';
                        else if (count === 3) levelClass = 'lc-lvl-3';
                        else levelClass = 'lc-lvl-4';
                    }
                    html += `<div class="lc-heatmap-cell ${levelClass}" title="${cellDate.toDateString()} - ${normalizedCal[dateStr] || 0} submissions"></div>`;
                }
                html += '</div>';
            }
            heatmap.innerHTML = html;
        }
    }
}
