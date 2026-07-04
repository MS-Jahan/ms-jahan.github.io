/**
 * Skills Dynamic Loader
 * Renders skills.json as an icon grid (replaces hardcoded progress bars).
 * Maps skill names -> icon classes (boxicons/remixicon/bootstrap-icons),
 * falls back to a generic chip when no icon is known.
 */

const SkillsIcons = (() => {
    // name (lowercase contains) -> icon class
    const ICON_MAP = {
        'html': 'bx bxl-html5',
        'css': 'bx bxl-css3',
        'tailwind': 'bx bxl-tailwind-css',
        'bootstrap': 'bx bxl-bootstrap',
        'javascript': 'bx bxl-javascript',
        'typescript': 'bx bxl-typescript',
        'js': 'bx bxl-javascript',
        'ts': 'bx bxl-typescript',
        'react': 'bx bxl-react',
        'next': 'bx bxl-nextjs',
        'vue': 'bx bxl-vuejs',
        'angular': 'bx bxl-angular',
        'node': 'bx bxl-nodejs',
        'python': 'bx bxl-python',
        'django': 'ri-stack-line',
        'flask': 'ri-flask-line',
        'fastapi': 'ri-rocket-line',
        'php': 'bx bxl-php',
        'laravel': 'bx bxl-laravel',
        'wordpress': 'bx bxl-wordpress',
        'flutter': 'ri-smartphone-line',
        'dart': 'ri-smartphone-line',
        'android': 'bx bxl-android',
        'kotlin': 'bx bxl-kotlin',
        'java': 'bx bxl-java',
        'c++': 'bx bxl-c-plus-plus',
        'c#': 'bx bxl-c-plus-plus',
        'go': 'bx bxl-go-lang',
        'rust': 'ri-ship-2-line',
        'docker': 'bx bxl-docker',
        'kubernetes': 'bx bxl-kubernetes',
        'aws': 'bx bxl-aws',
        'google cloud': 'bx bxl-google-cloud',
        'azure': 'bx bxl-windows',
        'linux': 'bx bxl-linux',
        'github': 'bx bxl-github',
        'git': 'bx bxl-git',
        'gitlab': 'bx bxl-gitlab',
        'mysql': 'ri-database-2-line',
        'postgres': 'ri-database-2-line',
        'mongodb': 'bx bxl-mongodb',
        'redis': 'ri-database-2-line',
        'sqlite': 'ri-database-2-line',
        'prisma': 'ri-database-2-line',
        'figma': 'bx bxl-figma',
        'photoshop': 'bx bxl-photoshop',
        'illustrator': 'bx bxl-adobe',
        'sass': 'bx bxl-sass',
        'less': 'bx bxl-sass',
        'telegram': 'bx bxl-telegram',
        'whatsapp': 'bx bxl-whatsapp',
        'slack': 'bx bxl-slack',
        'discord': 'bx bxl-discord-alt',
        'gemini': 'bi bi-stars',
        'openai': 'bi bi-robot',
        'ai': 'bi bi-robot',
        'n8n': 'ri-node-tree',
        'make': 'ri-flow-chart',
        'playwright': 'ri-test-tube-line',
        'selenium': 'ri-test-tube-line',
        'scraper': 'ri-download-cloud-2-line',
        'scraping': 'ri-download-cloud-2-line',
        'cloudflare': 'ri-cloud-line',
        'coolify': 'ri-cloud-line',
        'github actions': 'ri-settings-3-line',
        'vps': 'ri-server-line',
        'cpanel': 'ri-server-line',
        'photoshop': 'bx bxl-photoshop',
        'nest': 'bi bi-diagram-3',
        'nestjs': 'bi bi-diagram-3',
        'pwa': 'ri-apps-2-line',
        'kivy': 'ri-apps-2-line',
        'drissionpage': 'ri-window-line',
        'flaresolverr': 'ri-shield-flash-line',
        'notion': 'bi bi-journal-text',
        'json': 'bi bi-braces',
        'rest': 'bi bi-cloud-arrow-up-down',
        'api': 'bi bi-cloud-arrow-up-down',
        'cp': 'bi bi-trophy',
        'linux/vps': 'bx bxl-linux'
    };

    function iconFor(name) {
        const lower = (name || '').toLowerCase();
        for (const key in ICON_MAP) {
            if (lower.includes(key)) return ICON_MAP[key];
        }
        return 'bi bi-code-slash';
    }

    async function load() {
        const grid = document.getElementById('skills-grid');
        if (!grid) return;
        try {
            const res = await fetch('/data/skills.json');
            if (!res.ok) throw new Error('skills.json HTTP ' + res.status);
            const data = await res.json();
            render(grid, data.skills || []);
        } catch (err) {
            console.error('Failed to load skills:', err);
            grid.innerHTML = '<p class="text-center text-muted">Skills unavailable right now.</p>';
        }
    }

    function render(grid, categories) {
        if (!categories.length) {
            grid.innerHTML = '<p class="text-center text-muted">No skills data.</p>';
            return;
        }
        grid.innerHTML = categories.map(cat => {
            const items = (cat.items || []).map(it => {
                const icon = iconFor(it.name);
                const lvl = (typeof it.level === 'number') ? `${it.level}%` : '';
                return `
                    <div class="skill-icon-card" title="${it.name}${lvl ? ' — ' + lvl : ''}">
                        <i class="${icon} skill-icon"></i>
                        <span class="skill-icon-label">${it.name}</span>
                        ${lvl ? `<span class="skill-icon-level">${lvl}</span>` : ''}
                    </div>`;
            }).join('');
            return `
                <div class="skill-category">
                    <h5 class="skill-category-title">${cat.category}</h5>
                    <div class="skill-icon-grid">${items}</div>
                </div>`;
        }).join('');
    }

    function init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', load);
        } else {
            load();
        }
    }

    return { init };
})();

SkillsIcons.init();
