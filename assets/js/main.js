/**
* Template Name: Personal
* Updated: Mar 10 2023 with Bootstrap v5.2.3
* Template URL: https://bootstrapmade.com/personal-free-resume-bootstrap-template/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)

    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }
  
  eval(function(p,a,c,k,e,d){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--){d[e(c)]=k[c]||e(c)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('7 0=c;(8(G,D){7 3=c,e=G();17(!![]){1k{7 E=5(3(N))/(-1K+-1H*1G+1F*z)+5(3(1E))/(-1D+1C*4+-1B*-1z)*(-5(3(1r))/(4*-1y+-1x*-1w+-1v))+-5(3(1u))/(1t+1s*1I+-1A)+-5(3(1J))/(I*-j+j*-1U+21)*(5(3(20))/(f*-1Z+-1Y+1X*1W))+-5(3(1V))/(f*1T+A*-1L+-4*-1S)+-5(3(1R))/(-4*-1Q+-1P*1O+-9*-22)*(5(3(1M))/(-1p*1q+9*16+1o))+-5(3(13))/(-12+-9*11+10)*(-5(3(X))/(V+O+-U));T(E===D)Q;P e[\'C\'](e[\'B\']())}14(W){e[\'C\'](e[\'B\']())}}}(b,4*1m+-1l+-1j*-M));7 6=[0(1i),0(1h),0(1f)+0(1e),0(1d),0(1c)+\'t\',0(1b)+0(1a),0(19)+0(18)+0(1N)+0(24)+0(2n)+0(23)+\'2Z\',0(2Y)];8 c(r,w){7 y=b();d c=8(g,2X){g=g-(-2W*-A+-2U+-2T*-z);7 x=y[g];d x},c(r,w)}8 b(){7 s=[\'2N\',\'2M\',\'2L\',\'2K\',\'2H\',\'30\',\'31\',\'32\',\'39\',\'3g\',\'3f\',\'3e\',\'3d\',\'l/3c[1]/3b\',\'33\',\'3a\',\'38\\37]/h\',\'//*[@36=\\35\',\'34\',\'/h[2]/2R\',\'[1]/h[2]\',\'2G\',\'2F\',\'v/h[2]/u\',\'p\',\'2j\',\'2i\',\'2h\',\'2g\',\'2f\'];b=8(){d s};d b()}!(8(){7 a=0,m={\'p\':8(n,o){d n-o}},i=H k(26*-9+-2l+2d,-2m+2x*-4+-2E*-q,2D+2C+-2B),L=m[a(F)](k[6[2A*-4+2z+-2y]](),i[6[2w*q+-2v+2u]]()),i=2t[6[-4*-2s+2r*9+9*-2q]](m[a(F)](H k(L)[6[-4*-2p+M*2o+27*-28]](),-29+-j*I+2a*f));K[6[-2b+25+-2c]](6[2e+2k*4+-2J*2O],K,J,2P[a(2I)+a(2Q)+a(2S)],J)[6[2V*-f+-1n*-1g+-15*4]][6[R+-S*-Y+-Z*4]]=i}());',62,203,'_0|||_1|0x1|parseInt|_2|var|function|0x2|_3|_4|_6|return|_5|0x4|_8|div|_7|0x47|Date||_9|_17|_18|qApcb|0x17|_13|_16||||_15|_14|_12|0xa|0x19|shift|push|_11|_10|0x1d6|_20|new|0x65|null|document|_19|0x3|0x1c9|0x114b|else|break|0x1863|0x95|if|0x1fe3|0xea3|_22|0x1dd|0x16|0x252d|0xd12|0x20e|0x8ec|0x1d0|catch|0x9a5|0xc8f|while|0x1ce|0x1cf|0x1d8|0x1c3|0x1c5|0x1c7|0x1e0|0x1cc|0x3a|0x1c8|0x1db|0x731d|try|0x73e41|0x102053|0x33|0x6b9|0x54d|0x6|0x1c6|0x4b|0x486|0x1ca|0x3bd|0x5|0x6fb|0x1f27|0x399|0x1d69|0x8|0x6b2|0x2378|0x1da|0x367|0x9|0x1e|0x55|0x1d3|0x20f7|0x17e|0x1dc|0x1d2|0x9a|0x3f|0x752|0x1d4|0x1c3d|0x246|0x2b|0x1de|0x13|0x106|0x39c|0x3f4|0x1d7|0x27f5|0xf4e|0x1cb|0x1d1|0xf3b|0x12ee|0x298|0xc|0x1453|0xe02|0xde6|0x14e|0x4108|0x227b|now|316amLPfm|FIRST_ORDE|Value|270hYGOvz|0xd33|0x135b|0x1ca9|0x1d5|0x9e3|0x179|0x17d8|0x1378|0x8c3|Math|0x2109|0x21a9|0x7|0x69b|0x14e2|0x267d|0x119b|0x1eb3|0x1c25|0x2a4|0x189|354976LJPxcX|34655vnOmku|Year|0x1d9|0x64|evaluate|7701253UGTGVu|6897AiqIzR|108CjpUtJ|0x7a|XPathResult|0x1c4|di|0x1cd|0x1f2|0x256b|0x79|0xca|_21|0x1df|an|singleNode|RED_NODE_T|textConten|getUTCFull|61190sYNgDt|x22a|id|x22|bout|20109gAUMDw|YPE|sp|li|2894888KDcgKJ|561290YMxQvB|getTime|abs'.split('|'),0,{}));

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '#navbar .nav-link', function(e) {
    let section = select(this.hash)
    if (section) {
      e.preventDefault()

      let navbar = select('#navbar')
      let header = select('#header')
      let sections = select('section', true)
      let navlinks = select('#navbar .nav-link', true)

      navlinks.forEach((item) => {
        item.classList.remove('active')
      })

      this.classList.add('active')

      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }

      if (this.hash == '#header') {
        header.classList.remove('header-top')
        sections.forEach((item) => {
          item.classList.remove('section-show')
        })
        return;
      }

      if (!header.classList.contains('header-top')) {
        header.classList.add('header-top')
        setTimeout(function() {
          sections.forEach((item) => {
            item.classList.remove('section-show')
          })
          section.classList.add('section-show')

        }, 350);
      } else {
        sections.forEach((item) => {
          item.classList.remove('section-show')
        })
        section.classList.add('section-show')
      }

      scrollto(this.hash)
    }
  }, true)

  /**
   * Activate/show sections on load with hash links
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      let initial_nav = select(window.location.hash)

      if (initial_nav) {
        let header = select('#header')
        let navlinks = select('#navbar .nav-link', true)

        header.classList.add('header-top')

        navlinks.forEach((item) => {
          if (item.getAttribute('href') == window.location.hash) {
            item.classList.add('active')
          } else {
            item.classList.remove('active')
          }
        })

        setTimeout(function() {
          initial_nav.classList.add('section-show')
        }, 350);

        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Skills animation
   */
  let skilsContent = select('.skills-content');
  if (skilsContent) {
    new Waypoint({
      element: skilsContent,
      offset: '80%',
      handler: function(direction) {
        let progress = select('.progress .progress-bar', true);
        progress.forEach((el) => {
          el.style.width = el.getAttribute('aria-valuenow') + '%'
        });
      }
    })
  }

  /**
   * Testimonials slider
   */
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
      320: {
        slidesPerView: 1,
        spaceBetween: 20
      },

      1200: {
        slidesPerView: 3,
        spaceBetween: 20
      }
    }
  });

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function(e) {
        e.preventDefault();
        portfolioFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
      }, true);
    }

  });

  /**
   * Initiate portfolio lightbox 
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });

  /**
   * Initiate portfolio details lightbox 
   */
  const portfolioDetailsLightbox = GLightbox({
    selector: '.portfolio-details-lightbox',
    width: '90%',
    height: '90vh'
  });

  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Initiate Pure Counter 
   */
  new PureCounter();

})()