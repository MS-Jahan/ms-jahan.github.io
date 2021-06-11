
import React, { useEffect } from 'react';
import { init } from '../external/ityped'
import { Link } from "react-router-dom"

const Header = ({runInHomepageOnly, contactLinks}) => {

    // const navStyle = {
    //     color: "white"
    // }

    useEffect(() => {
        document.title = 'Sarwar Jahan'

        const myElement = document.querySelector('#profession');
        init(myElement, { showCursor: false, strings: ['Web Developer', 'App Developer', 'Graphics Designer', 'Linux User', 'Computer Nerd' ] });
    })
    
    const toBlog = () => {
        window.location.replace("https://ms-jahan.github.io/blog/");
    }

    return (
        <header id="header">
            <div className="container">

                <h1><a href="index.html">Sarwar Jahan</a></h1>
                
                <a href="index.html" className="mr-auto">
                    <img src="assets/img/logo.png" alt="" className="img-fluid"/>
                </a>
                <h2>I'm a passionate <span id='profession'></span></h2>

                <nav id="navbar" className="navbar">
                    <ul>
                        {/* <li><Link className="nav-link active" to="/"><a className="nav-link active" href="#header">Home</a></Link></li>
                        <li><Link className="nav-link active" to="/"><a className="nav-link" href="#about">About</a></Link></li>
                        <li><Link className="nav-link active" to="/"><a className="nav-link" href="#resume">Resume</a></Link></li>
                        <li><Link className="nav-link active" to="/"><a className="nav-link" href="#services">Services</a></Link></li>
                        <li><Link className="nav-link active" to="/"><a className="nav-link" href="#portfolio">Portfolio</a></Link></li>
                        <li><Link className="nav-link active" to="/"><a className="nav-link" href="#contact">Contact</a></Link></li> */}
                        
                        <li onClick={runInHomepageOnly}><Link className="nav-link active" to="/">Home</Link></li>
                        <li><Link className="nav-link" to="/about">About</Link></li>
                        <li><Link className="nav-link" to="/resume">Resume</Link></li>
                        <li><Link className="nav-link" to="/services">Services</Link></li>
                        <li onClick={toBlog}><Link className="nav-link" to="/blog">Blog</Link></li>
                        {/* <li><Link className="nav-link" to="/portfolio">Portfolio</Link></li> Maybe later! */}
                        <li><Link className="nav-link" to="/contact">Contact</Link></li>

                    </ul>
                    <i className="bi bi-list mobile-nav-toggle"></i>
                </nav>

                <div className="social-links">
                    <a href={contactLinks.twitter} className="twitter"><i className="bi bi-twitter"></i></a>
                    <a href={contactLinks.facebook} className="facebook"><i className="bi bi-facebook"></i></a>
                    <a href={contactLinks.github} className="github"><i className="bi bi-github"></i></a>
                    <a href={contactLinks.skype} className="skype"><i className="bi bi-skype"></i></a>
                    <a href={contactLinks.linkedin} className="linkedin"><i className="bi bi-linkedin"></i></a>
                </div>

            </div>
        </header>
    );

}

export default Header;