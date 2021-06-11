//import React from "react"

const select = (el, all = false) => {
    el = el.trim()
    if (all) {
        return [...document.querySelectorAll(el)]
    } else {
        return document.querySelector(el)
    }
}

const scrollto = (el) => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    })
}

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

const HeaderPlacement = (componentName) => {

    /**
   * Scrool with ofset on links with a class name .scrollto
   */
    on('click', '#navbar .nav-link', function (e) {
        var selectFromHash = "#" + componentName
        let section = select(selectFromHash)
        if (section) {
            //e.preventDefault()

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

            if (!header.classList.contains('header-top')) {
                header.classList.add('header-top')
                setTimeout(function () {
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

            scrollto(selectFromHash)
        }
    }, true)


    /**
   * Activate/show sections on load with hash links
   */
    let initial_nav = select("#" + componentName)

    if (initial_nav) {
        let header = select('#header')
        let navlinks = select('#navbar .nav-link', true)

        header.classList.add('header-top')

        navlinks.forEach((item) => {
            if(item === initial_nav){
                item.classList.add('active')
            }
            else{
                item.classList.remove('active')
            }
        })


        setTimeout(function () {
            initial_nav.classList.add('section-show')
        }, 350);

        scrollto(window.location.hash)
    }

}

export default HeaderPlacement;