/**
 * Certificates & Achievements Dynamic Loader
 * Fetches /data/certificates.json and renders card grid + achievements list.
 */

(function () {
    async function load() {
        const certContainer = document.getElementById('certificates-cards');
        const achieveContainer = document.getElementById('achievements-list');
        if (!certContainer && !achieveContainer) return;

        try {
            const res = await fetch('/data/certificates.json');
            if (!res.ok) throw new Error('HTTP ' + res.status);
            const data = await res.json();

            if (certContainer) renderCertificates(certContainer, data.certificates || []);
            if (achieveContainer) renderAchievements(achieveContainer, data.achievements || []);
        } catch (err) {
            console.error('Failed to load certificates:', err);
            if (certContainer) certContainer.innerHTML = '<p class="text-center text-muted">Certificates unavailable.</p>';
            if (achieveContainer) achieveContainer.innerHTML = '';
        }
    }

    function renderCertificates(container, certs) {
        if (!certs.length) {
            container.innerHTML = '<p class="text-center text-muted">No certificates found.</p>';
            return;
        }
        container.innerHTML = `<div class="row">${certs.map(c => `
            <div class="col-lg-4 col-md-6 mb-4">
                <div class="cert-card h-100">
                    <div class="cert-card-icon"><i class="bi bi-patch-check-fill"></i></div>
                    <div class="cert-card-body">
                        <h5 class="cert-title">${c.title}</h5>
                        <p class="cert-issuer"><i class="bi bi-building me-1"></i>${c.issuer}</p>
                        <p class="cert-date"><i class="bi bi-calendar3 me-1"></i>${c.date}</p>
                    </div>
                    <div class="cert-card-footer">
                        ${c.credential_url
                            ? `<a href="${c.credential_url}" target="_blank" class="btn cert-verify-btn"><i class="bi bi-box-arrow-up-right me-1"></i>Verify</a>`
                            : `<span class="cert-no-link">Certificate issued</span>`}
                    </div>
                </div>
            </div>`).join('')}
        </div>`;
    }

    function renderAchievements(container, achievements) {
        if (!achievements.length) {
            container.innerHTML = '';
            return;
        }
        container.innerHTML = `
            <div class="achievements-header"><i class="bi bi-trophy-fill me-2"></i>CTF &amp; Competition Achievements</div>
            <ul class="achievements-list">
                ${achievements.map(a => `
                    <li class="achievement-item">
                        <i class="bi bi-award-fill achievement-icon"></i>
                        <div>
                            <strong>${a.title}</strong>
                            <span class="achievement-desc"> — ${a.description}</span>
                        </div>
                    </li>`).join('')}
            </ul>`;
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', load);
    } else {
        load();
    }
})();
