import React, { useEffect } from 'react';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import './App.css';
import Header from "./components/Header"
import About from "./components/About"
import Resume from "./components/Resume"
import Services from "./components/Services"
//import Portfolio from "./components/Portfolio"
import Contact from "./components/Contact"
import Scripts from './components/Scripts'
import HeaderPlacement from "./components/HeaderPlacement"


function App() {
  const links = [
    "assets/vendor/bootstrap/js/bootstrap.bundle.min.js", 
    "assets/vendor/glightbox/js/glightbox.min.js",
    "assets/vendor/glightbox/js/glightbox.min.js",
    "assets/vendor/isotope-layout/isotope.pkgd.min.js",
    // "assets/vendor/telegram-message-form/validate.js",
    "assets/vendor/purecounter/purecounter.js",
    "assets/vendor/swiper/swiper-bundle.min.js",
    "assets/vendor/waypoints/noframework.waypoints.js",
    "assets/js/main.js"
  ];

  const runInHomepageOnly = () => {
    let header = document.querySelector('#header')
    let sections = document.querySelectorAll('section')

    if (window.location.pathname === '/') {
        header.classList.remove('header-top')
        sections.forEach((item) => {
        item.classList.remove('section-show')
        });
        //console.log("header is not null")
    }
  }

  useEffect(() => {
    runInHomepageOnly();
  });

  
 
  links.forEach(link => {
    Scripts(link);
  });

  
  const contactLinks = {
    facebook: "https://www.facebook.com/mdsarwarjahan.sabit",
    twitter: "https://twitter.com/MS_Jahan_Sabit",
    github: "https://github.com/MS-Jahan",
    linkedin: "https://www.linkedin.com/in/mdsarwarjahan-sabit/",
    skype: "https://join.skype.com/invite/pj94atkmP0vi",
    website: "https://" + document.location.host,
    fiverr: "https://www.fiverr.com/msjsabit"

  }

  return (
    <Router>
      <div className="App">
        <Header runInHomepageOnly={runInHomepageOnly} contactLinks={contactLinks}/>
        <Switch>
          {/* <Route path="/" exact component={Header} /> */}
          <Route path="/about">
            <About Scripts={Scripts} headerPlacement={HeaderPlacement} />
          </Route>
          <Route path="/resume">
            <Resume headerPlacement={HeaderPlacement} />
          </Route>
          <Route path="/services">
            <Services headerPlacement={HeaderPlacement} />
          </Route>
          {/* <Route path="/portfolio">
            <Portfolio headerPlacement={HeaderPlacement} />
          </Route> */}
          {/* <Route path="/blog">
            <Portfolio headerPlacement={HeaderPlacement} />
          </Route> */}
          <Route path="/contact" contactLinks={contactLinks}>
            <Contact contactLinks={contactLinks} headerPlacement={HeaderPlacement} />
          </Route>
        </Switch>
      </div>
    </Router>
    
  );
}

export default App;
