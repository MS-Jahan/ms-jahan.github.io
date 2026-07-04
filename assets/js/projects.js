/**
 * Projects Dynamic Loader
 * Loads and displays projects from projects.json with search, filtering, and pagination
 */

class ProjectsManager {
    constructor() {
        this.allProjects = [];
        this.filteredProjects = [];
        this.featuredProjects = [];
        this.currentPage = 1;
        this.projectsPerPage = 9;
        this.activeCategories = []; // No default filter — show all on load
        this.searchQuery = '';
        this.init();
    }

    async init() {
        try {
            await this.loadProjects();
            this.setupUI();
            this.applyFilters();
            this.renderFeatured();
            this.renderProjects();
        } catch (error) {
            console.error('Failed to initialize projects:', error);
            this.showError('Failed to load projects. Please try again later.');
        }
    }

    async loadProjects() {
        const response = await fetch('/data/projects.json');
        const data = await response.json();
        this.allProjects = data.projects;

        // Extract unique categories from all projects
        const categoriesSet = new Set();
        this.allProjects.forEach(project => {
            if (project.categories && Array.isArray(project.categories)) {
                project.categories.forEach(cat => categoriesSet.add(cat));
            }
        });

        // Convert to array and sort alphabetically
        this.categories = Array.from(categoriesSet).sort();

        // Separate featured (flagship) projects from the rest
        this.featuredProjects = this.allProjects
            .filter(p => p.featured === true)
            .sort((a, b) => (a.featured_order || 99) - (b.featured_order || 99));
        this.allProjects = this.allProjects.filter(p => p.featured !== true);

        // Sort non-featured by stars desc, then last_updated desc
        this.allProjects.sort((a, b) => {
            const starDiff = (b.stars || 0) - (a.stars || 0);
            if (starDiff !== 0) return starDiff;
            return (b.last_updated || '').localeCompare(a.last_updated || '');
        });
    }

    setupUI() {
        const projectsSection = document.querySelector('#projects .container');
        if (!projectsSection) return;

        // Create controls container
        const controlsHTML = `
            <div class="projects-controls mb-4">
                <!-- Search Bar -->
                <div class="search-container">
                    <div class="search-wrapper">
                        <i class="bi bi-search search-icon"></i>
                        <input
                            type="text"
                            class="form-control"
                            id="projectSearch"
                            placeholder="Search projects by name, description, or technology..."
                            autocomplete="off"
                        >
                        <button type="button" id="clearSearch">
                            <i class="bi bi-x-lg"></i>
                        </button>
                    </div>
                </div>

                <!-- Category Filters -->
                <div class="filter-section">
                    <div class="filter-header">
                        <strong>Filter by Category:</strong>
                        <button class="btn btn-sm" id="clearFilters">Clear All</button>
                    </div>
                    <div class="category-filters" id="categoryFilters">
                        ${this.renderCategoryButtons()}
                    </div>
                </div>

                <!-- Results Info -->
                <div class="text-center">
                    <div class="results-info">
                        <span id="resultsCount">Loading...</span>
                    </div>
                </div>
            </div>

            <!-- Projects Container -->
            <div class="row" id="projectsContainer">
                <div class="col-12 text-center">
                    <div class="spinner-border" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                </div>
            </div>

            <!-- Pagination -->
            <div class="row mt-4">
                <div class="col-12">
                    <nav aria-label="Projects pagination">
                        <ul class="pagination justify-content-center" id="pagination"></ul>
                    </nav>
                </div>
            </div>
        `;

        // Find the section title and insert controls after it
        const sectionTitle = projectsSection.querySelector('.section-title');

        // Insert featured band placeholder before controls
        const featuredHTML = `
            <div id="featuredBand" class="featured-band mb-5"></div>
        `;
        sectionTitle.insertAdjacentHTML('afterend', featuredHTML);
        document.getElementById('featuredBand').insertAdjacentHTML('afterend', controlsHTML);

        // Remove old static projects
        const oldProjects = projectsSection.querySelectorAll('.row:not(.mb-3)');
        oldProjects.forEach(row => {
            if (!row.id && row.querySelector('.card')) {
                row.remove();
            }
        });

        this.attachEventListeners();
    }

    renderCategoryButtons() {
        return this.categories.map(category => `
            <button
                class="btn btn-sm btn-outline-primary category-filter ${this.activeCategories.includes(category) ? 'active' : ''}"
                data-category="${category}"
            >
                ${category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
        `).join('');
    }

    attachEventListeners() {
        // Search
        const searchInput = document.getElementById('projectSearch');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.searchQuery = e.target.value.toLowerCase();
                this.currentPage = 1;
                this.applyFilters();
                this.renderProjects();
            });
        }

        // Clear search
        const clearSearch = document.getElementById('clearSearch');
        if (clearSearch) {
            clearSearch.addEventListener('click', () => {
                searchInput.value = '';
                this.searchQuery = '';
                this.currentPage = 1;
                this.applyFilters();
                this.renderProjects();
            });
        }

        // Category filters
        const categoryButtons = document.querySelectorAll('.category-filter');
        categoryButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const category = e.target.dataset.category;
                this.toggleCategory(category);
                e.target.classList.toggle('active');
                this.currentPage = 1;
                this.applyFilters();
                this.renderProjects();
            });
        });

        // Clear all filters
        const clearFilters = document.getElementById('clearFilters');
        if (clearFilters) {
            clearFilters.addEventListener('click', () => {
                this.activeCategories = [];
                document.querySelectorAll('.category-filter').forEach(btn => {
                    btn.classList.remove('active');
                });
                this.currentPage = 1;
                this.applyFilters();
                this.renderProjects();
            });
        }
    }

    renderFeatured() {
        const band = document.getElementById('featuredBand');
        if (!band || this.featuredProjects.length === 0) return;

        band.innerHTML = `
            <div class="featured-band-header mb-3">
                <h4 class="featured-band-title">
                    <i class="bi bi-star-fill me-2"></i>Featured Projects
                </h4>
                <p class="featured-band-subtitle">Flagship work — click any card for full details</p>
            </div>
            <div class="row" id="featuredCards">
                ${this.featuredProjects.map(p => this.createFeaturedCard(p)).join('')}
            </div>
        `;

        // Attach click listeners to featured cards
        band.querySelectorAll('.featured-card-clickable').forEach(el => {
            el.addEventListener('click', () => {
                const name = el.dataset.projectName;
                const project = this.featuredProjects.find(p => p.name === name);
                if (project) this.showProjectDetail(project);
            });
        });
    }

    createFeaturedCard(project) {
        const techList = (project.tech_stack || project.technologies || '').slice
            ? (Array.isArray(project.tech_stack) ? project.tech_stack.slice(0, 4).join(', ') : project.technologies)
            : project.technologies;

        const liveBtn = project.demo_url
            ? `<a href="${project.demo_url}" class="btn btn-primary btn-sm" target="_blank" onclick="event.stopPropagation()">
                   <i class="bi bi-box-arrow-up-right me-1"></i>Live Demo
               </a>` : '';
        const ghBtn = project.github_url && !project.is_private
            ? `<a href="${project.github_url}" class="btn btn-outline-secondary btn-sm" target="_blank" onclick="event.stopPropagation()" title="GitHub">
                   <i class="bi bi-github"></i>
               </a>` : '';

        return `
            <div class="col-lg-4 col-md-6 mb-4">
                <div class="card featured-card h-100 featured-card-clickable" data-project-name="${project.name}" style="cursor:pointer;" title="Click for full details">
                    <div class="featured-badge-wrap">
                        <span class="featured-badge"><i class="bi bi-star-fill me-1"></i>Featured</span>
                    </div>
                    <img
                        src="${project.image || ''}"
                        class="card-img-top"
                        alt="${project.title}"
                        loading="lazy"
                        onerror="this.src='https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png'"
                    >
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title">${project.title}</h5>
                        <p class="card-text flex-grow-1">${this.truncateText(project.description, 120)}</p>
                        <p class="card-text"><small class="text-muted">${techList || ''}</small></p>
                        <div class="mt-auto d-flex gap-2" onclick="event.stopPropagation()">
                            ${liveBtn}
                            ${ghBtn}
                            <button class="btn btn-sm btn-outline-info ms-auto" onclick="event.stopPropagation(); (()=>{const p=window._projectsManager.featuredProjects.find(x=>x.name==='${project.name}');if(p)window._projectsManager.showProjectDetail(p);})()">
                                <i class="bi bi-info-circle me-1"></i>Details
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    showProjectDetail(project) {
        // Accept a project name string and resolve it
        if (typeof project === 'string') {
            project = this.allProjects.find(p => p.name === project)
                || this.featuredProjects.find(p => p.name === project);
        }
        if (!project) return;

        // Build modal if not present
        let modal = document.getElementById('projectDetailModal');
        if (!modal) {
            modal = document.createElement('div');
            modal.innerHTML = `
                <div class="modal fade" id="projectDetailModal" tabindex="-1" aria-labelledby="projectDetailLabel" aria-hidden="true">
                  <div class="modal-dialog modal-lg modal-dialog-scrollable">
                    <div class="modal-content project-modal-content">
                      <div class="modal-header project-modal-header">
                        <h5 class="modal-title" id="projectDetailLabel"></h5>
                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <div class="modal-body" id="projectDetailBody"></div>
                      <div class="modal-footer project-modal-footer" id="projectDetailFooter"></div>
                    </div>
                  </div>
                </div>
            `;
            document.body.appendChild(modal.firstElementChild);
            modal = document.getElementById('projectDetailModal');
        }

        const techStack = Array.isArray(project.tech_stack) && project.tech_stack.length
            ? project.tech_stack.map(t => `<span class="tech-chip">${t}</span>`).join('')
            : (project.technologies ? `<span class="tech-chip">${project.technologies}</span>` : '');

        const mainFeatures = Array.isArray(project.main_features) && project.main_features.length
            ? `<ul>${project.main_features.map(f => `<li>${f}</li>`).join('')}</ul>` : '';

        // Fallback meta line for projects without rich detail (stars/forks/last updated)
        const hasStars = (typeof project.stars === 'number' && project.stars > 0) || project.forks;
        const metaLine = (!project.unique_aspects && hasStars)
            ? `<p class="text-muted small"><i class="bi bi-star me-1"></i>${project.stars || 0} stars &middot; ${project.forks || 0} forks &middot; updated ${project.last_updated || 'n/a'}</p>`
            : '';

        document.getElementById('projectDetailLabel').textContent = project.title;
        document.getElementById('projectDetailBody').innerHTML = `
            <img src="${project.image || ''}" alt="${project.title}" class="img-fluid rounded mb-3 project-modal-img"
                 onerror="this.style.display='none'">
            <div class="mb-3">
                <h6 class="modal-section-label">Overview</h6>
                <p>${project.unique_aspects || project.description}</p>
                ${metaLine}
            </div>
            ${mainFeatures ? `<div class="mb-3"><h6 class="modal-section-label">Key Features</h6>${mainFeatures}</div>` : ''}
            ${techStack ? `<div class="mb-3">
                <h6 class="modal-section-label">Tech Stack</h6>
                <div class="tech-stack-chips">${techStack}</div>
            </div>` : ''}
        `;
        document.getElementById('projectDetailFooter').innerHTML = `
            ${project.demo_url ? `<a href="${project.demo_url}" class="btn btn-primary" target="_blank"><i class="bi bi-box-arrow-up-right me-1"></i>Live Demo</a>` : ''}
            ${(project.github_url && !project.is_private) ? `<a href="${project.github_url}" class="btn btn-outline-light" target="_blank"><i class="bi bi-github me-1"></i>GitHub</a>` : ''}
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        `;

        const bsModal = bootstrap.Modal.getOrCreate(modal);
        bsModal.show();
    }

    toggleCategory(category) {
        const index = this.activeCategories.indexOf(category);
        if (index > -1) {
            this.activeCategories.splice(index, 1);
        } else {
            this.activeCategories.push(category);
        }
    }

    applyFilters() {
        this.filteredProjects = this.allProjects.filter(project => {
            // Search filter
            if (this.searchQuery) {
                const searchableText = `
                    ${project.name}
                    ${project.title}
                    ${project.description}
                    ${project.technologies}
                    ${project.categories.join(' ')}
                `.toLowerCase();

                if (!searchableText.includes(this.searchQuery)) {
                    return false;
                }
            }

            // Category filter
            if (this.activeCategories.length > 0) {
                const hasCategory = project.categories.some(cat =>
                    this.activeCategories.includes(cat)
                );
                if (!hasCategory) {
                    return false;
                }
            }

            return true;
        });

        this.updateResultsCount();
    }

    updateResultsCount() {
        const resultsCount = document.getElementById('resultsCount');
        if (resultsCount) {
            const total = this.filteredProjects.length;
            const showing = Math.min(this.projectsPerPage, total - (this.currentPage - 1) * this.projectsPerPage);

            let text = `Showing ${showing} of ${total} project${total !== 1 ? 's' : ''}`;
            if (this.activeCategories.length > 0) {
                text += ` in: ${this.activeCategories.join(', ')}`;
            }
            if (this.searchQuery) {
                text += ` matching "${this.searchQuery}"`;
            }

            resultsCount.textContent = text;
        }
    }

    renderProjects() {
        const container = document.getElementById('projectsContainer');
        if (!container) return;

        const startIndex = (this.currentPage - 1) * this.projectsPerPage;
        const endIndex = startIndex + this.projectsPerPage;
        const projectsToShow = this.filteredProjects.slice(startIndex, endIndex);

        if (projectsToShow.length === 0) {
            container.innerHTML = `
                <div class="col-12">
                    <div class="empty-state">
                        <i class="bi bi-inbox"></i>
                        <p>No projects found matching your criteria.</p>
                        <button class="btn" onclick="projectsManager.clearAllFilters()">
                            Clear Filters
                        </button>
                    </div>
                </div>
            `;
            return;
        }

        container.innerHTML = projectsToShow.map(project => this.createProjectCard(project)).join('');

        // Make regular cards clickable to open detail modal
        container.querySelectorAll('.project-card-clickable').forEach(el => {
            el.addEventListener('click', () => {
                const name = el.dataset.projectName;
                const project = this.allProjects.find(p => p.name === name);
                if (project) this.showProjectDetail(project);
            });
        });

        this.renderPagination();
    }

    createProjectCard(project) {
        const techBadge = project.technologies ?
            `<small class="text-muted">${project.technologies}</small>` : '';

        // Create category badges with gradient colors
        const categoryBadges = project.categories.slice(0, 3).map(cat => {
            const badgeClass = `badge-${cat}`;
            return `<span class="badge ${badgeClass}">${cat}</span>`;
        }).join('');

        // Split into explicit Live Demo / GitHub buttons per the video rule
        const liveBtn = project.demo_url && project.demo_url !== ''
            ? `<a href="${project.demo_url}" class="btn btn-primary" target="_blank" onclick="event.stopPropagation()">
                   <i class="bi bi-box-arrow-up-right me-1"></i>Live
               </a>` : '';
        const ghBtn = project.github_url && !project.is_private
            ? `<a href="${project.github_url}" class="btn btn-outline-secondary" target="_blank" title="GitHub" onclick="event.stopPropagation()">
                   <i class="bi bi-github"></i>
               </a>` : '';
        const detailsBtn = `<button class="btn btn-sm btn-outline-info ms-auto" onclick="event.stopPropagation(); window._projectsManager.showProjectDetail(${JSON.stringify(project.name).replace(/"/g,'&quot;')})" title="Details">
                   <i class="bi bi-info-circle me-1"></i>Details
               </button>`;

        return `
            <div class="col-lg-4 col-md-6 mb-4">
                <div class="card h-100 project-card-clickable" data-project-name="${project.name}" style="cursor:pointer;" title="Click for details">
                    <img
                        src="${project.image}"
                        class="card-img-top"
                        alt="${project.title}"
                        loading="lazy"
                        onerror="this.src='https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png'"
                    >
                    <div class="card-body d-flex flex-column">
                        <div class="badge-container">
                            ${categoryBadges}
                        </div>
                        <h5 class="card-title">${project.title}</h5>
                        <p class="card-text flex-grow-1">
                            <span class="description-truncated">${this.truncateText(project.description, 150)}</span>
                            <span class="description-full">${project.description}</span>
                        </p>
                        <p class="card-text">${techBadge}</p>
                        <div class="mt-auto d-flex gap-2 align-items-center" onclick="event.stopPropagation()">
                            ${liveBtn}
                            ${ghBtn}
                            ${detailsBtn}
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    truncateText(text, maxLength) {
        if (text.length <= maxLength) return text;
        return text.substr(0, maxLength) + '...';
    }

    renderPagination() {
        const pagination = document.getElementById('pagination');
        if (!pagination) return;

        const totalPages = Math.ceil(this.filteredProjects.length / this.projectsPerPage);

        if (totalPages <= 1) {
            pagination.innerHTML = '';
            return;
        }

        let paginationHTML = '';

        // Previous button
        paginationHTML += `
            <li class="page-item ${this.currentPage === 1 ? 'disabled' : ''}">
                <a class="page-link" href="#" data-page="${this.currentPage - 1}">Previous</a>
            </li>
        `;

        // Page numbers
        for (let i = 1; i <= totalPages; i++) {
            if (
                i === 1 ||
                i === totalPages ||
                (i >= this.currentPage - 2 && i <= this.currentPage + 2)
            ) {
                paginationHTML += `
                    <li class="page-item ${i === this.currentPage ? 'active' : ''}">
                        <a class="page-link" href="#" data-page="${i}">${i}</a>
                    </li>
                `;
            } else if (
                i === this.currentPage - 3 ||
                i === this.currentPage + 3
            ) {
                paginationHTML += `<li class="page-item disabled"><span class="page-link">...</span></li>`;
            }
        }

        // Next button
        paginationHTML += `
            <li class="page-item ${this.currentPage === totalPages ? 'disabled' : ''}">
                <a class="page-link" href="#" data-page="${this.currentPage + 1}">Next</a>
            </li>
        `;

        pagination.innerHTML = paginationHTML;

        // Attach pagination event listeners
        pagination.querySelectorAll('a.page-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const page = parseInt(e.target.dataset.page);
                if (page && page !== this.currentPage) {
                    this.currentPage = page;
                    this.renderProjects();
                }
            });
        });
    }

    clearAllFilters() {
        this.activeCategories = [];
        this.searchQuery = '';
        this.currentPage = 1;

        document.getElementById('projectSearch').value = '';
        document.querySelectorAll('.category-filter').forEach(btn => {
            btn.classList.remove('active');
        });

        this.applyFilters();
        this.renderProjects();
    }

    showError(message) {
        const container = document.getElementById('projectsContainer');
        if (container) {
            container.innerHTML = `
                <div class="col-12">
                    <div class="alert alert-danger" role="alert">
                        <i class="bi bi-exclamation-triangle-fill me-2"></i>
                        ${message}
                    </div>
                </div>
            `;
        }
    }
}

// Initialize when DOM is ready
let projectsManager;
function bootProjectsManager() {
    projectsManager = new ProjectsManager();
    window._projectsManager = projectsManager; // exposed for inline onclick handlers
}
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bootProjectsManager);
} else {
    bootProjectsManager();
}
