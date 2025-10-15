/**
 * Projects Dynamic Loader
 * Loads and displays projects from projects.json with search, filtering, and pagination
 */

class ProjectsManager {
    constructor() {
        this.allProjects = [];
        this.filteredProjects = [];
        this.currentPage = 1;
        this.projectsPerPage = 9;
        this.activeCategories = ['creative']; // Default filter
        this.searchQuery = '';
        this.init();
    }

    async init() {
        try {
            await this.loadProjects();
            this.setupUI();
            this.applyFilters();
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
        this.categories = data.categories;
    }

    setupUI() {
        const projectsSection = document.querySelector('#projects .container');
        if (!projectsSection) return;

        // Create controls container
        const controlsHTML = `
            <div class="projects-controls mb-4">
                <!-- Search Bar -->
                <div class="row mb-3">
                    <div class="col-12">
                        <div class="input-group">
                            <span class="input-group-text"><i class="bi bi-search"></i></span>
                            <input
                                type="text"
                                class="form-control"
                                id="projectSearch"
                                placeholder="Search projects by name, description, or technology..."
                                autocomplete="off"
                            >
                            <button class="btn btn-outline-secondary" type="button" id="clearSearch">
                                <i class="bi bi-x-lg"></i>
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Category Filters -->
                <div class="row mb-3">
                    <div class="col-12">
                        <div class="filter-header mb-2">
                            <strong>Filter by Category:</strong>
                            <button class="btn btn-sm btn-link" id="clearFilters">Clear All</button>
                        </div>
                        <div class="category-filters" id="categoryFilters">
                            ${this.renderCategoryButtons()}
                        </div>
                    </div>
                </div>

                <!-- Results Info -->
                <div class="row mb-3">
                    <div class="col-12">
                        <div class="results-info">
                            <span id="resultsCount">Loading...</span>
                        </div>
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
        sectionTitle.insertAdjacentHTML('afterend', controlsHTML);

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
                <div class="col-12 text-center py-5">
                    <i class="bi bi-inbox" style="font-size: 3rem; color: #ccc;"></i>
                    <p class="mt-3 text-muted">No projects found matching your criteria.</p>
                    <button class="btn btn-primary" onclick="projectsManager.clearAllFilters()">
                        Clear Filters
                    </button>
                </div>
            `;
            return;
        }

        container.innerHTML = projectsToShow.map(project => this.createProjectCard(project)).join('');
        this.renderPagination();
    }

    createProjectCard(project) {
        const techBadge = project.technologies ?
            `<small class="text-muted">${project.technologies}</small>` : '';

        const categoryBadges = project.categories.slice(0, 3).map(cat =>
            `<span class="badge bg-secondary me-1">${cat}</span>`
        ).join('');

        const buttonText = project.demo_url && project.demo_url !== '' ? 'View Demo' : 'View Project';
        const buttonUrl = project.demo_url && project.demo_url !== '' ? project.demo_url : project.github_url;

        return `
            <div class="col-lg-4 col-md-6 mb-4">
                <div class="card h-100">
                    <img
                        src="${project.image}"
                        class="card-img-top"
                        alt="${project.title}"
                        loading="lazy"
                        onerror="this.src='https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png'"
                    >
                    <div class="card-body d-flex flex-column">
                        <div class="mb-2">
                            ${categoryBadges}
                        </div>
                        <h5 class="card-title">${project.title}</h5>
                        <p class="card-text flex-grow-1">${this.truncateText(project.description, 150)}</p>
                        <p class="card-text">${techBadge}</p>
                        <div class="mt-auto">
                            <a href="${buttonUrl}" class="btn btn-primary" target="_blank">${buttonText}</a>
                            ${project.github_url ?
                                `<a href="${project.github_url}" class="btn btn-outline-secondary ms-2" target="_blank">
                                    <i class="bi bi-github"></i>
                                </a>` : ''}
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
                    // Scroll to projects section
                    document.querySelector('#projects').scrollIntoView({ behavior: 'smooth' });
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
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        projectsManager = new ProjectsManager();
    });
} else {
    projectsManager = new ProjectsManager();
}
