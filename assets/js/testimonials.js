/**
 * Testimonials Dynamic Loader
 * Fetches /data/testimonials.json, injects Swiper slides, then (re)inits Swiper.
 * Preserves the autoplay/pagination config originally in main.js.
 */

(function () {
    async function load() {
        const wrapper = document.querySelector('.testimonials-slider .swiper-wrapper');
        if (!wrapper) return;

        let data;
        try {
            const res = await fetch('/data/testimonials.json');
            if (!res.ok) throw new Error('HTTP ' + res.status);
            data = await res.json();
        } catch (err) {
            console.error('Failed to load testimonials:', err);
            return; // leave whatever main.js rendered, if anything
        }

        const items = data.testimonials || [];
        if (!items.length) return;

        wrapper.innerHTML = items.map(t => `
            <div class="swiper-slide">
                <div class="testimonial-item">
                    <p>
                        <i class="bx bxs-quote-alt-left quote-icon-left"></i>${t.quote}<i class="bx bxs-quote-alt-right quote-icon-right"></i>
                    </p>
                    <img src="${t.image}" class="testimonial-img" alt="${t.name}" loading="lazy">
                    <h3>${t.name}</h3>
                    <h4>${t.role_html || t.role || ''}</h4>
                </div>
            </div>`).join('');

        // Destroy any Swiper instance main.js already attached to the empty slider
        const slider = document.querySelector('.testimonials-slider');
        if (slider && slider.swiper) {
            slider.swiper.destroy(true, true);
        }

        // Re-init with the original config
        if (typeof Swiper !== 'undefined' && slider) {
            new Swiper('.testimonials-slider', {
                speed: 600,
                loop: true,
                autoplay: {
                    delay: 5000,
                    disableOnInteraction: false
                },
                slidesPerView: 'auto',
                pagination: {
                    el: '.swiper-pagination',
                    type: 'bullets',
                    clickable: true
                },
                breakpoints: {
                    320: { slidesPerView: 1, spaceBetween: 20 },
                    1200: { slidesPerView: 2, spaceBetween: 20 }
                }
            });
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', load);
    } else {
        load();
    }
})();
