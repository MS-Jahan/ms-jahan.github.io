
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
                    <a href={contactLinks.fiverr} className="website" target="_blank"><i className="bi bi-laptop"></i></a>
                    <a href={contactLinks.upwork} className="website upwork-icon" target="_blank" style={{ width: '22px', height: '22px' }}>
                        <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: '100%', height: '100%' }}>
                            <path d="M18.561 13.158c-1.102 0-2.135-.467-3.074-1.227l.228-1.076.008-.042c.207-1.143.849-3.06 2.839-3.06 1.492 0 2.703 1.212 2.703 2.703-.001 1.489-1.212 2.702-2.704 2.702zm0-8.14c-2.539 0-4.51 1.649-5.31 4.366-1.22-1.834-2.148-4.036-2.687-5.892H7.828v7.112c-.002 1.406-1.141 2.546-2.547 2.548-1.405-.002-2.543-1.143-2.545-2.548V3.492H0v7.112c0 2.914 2.37 5.303 5.281 5.303 2.913 0 5.283-2.389 5.283-5.303v-1.19c.529 1.107 1.182 2.229 1.974 3.221l-1.673 7.873h2.797l1.213-5.71c1.063.679 2.285 1.109 3.686 1.109 3 0 5.439-2.452 5.439-5.45 0-3-2.439-5.439-5.439-5.439z"/>
                        </svg>
                    </a>
                    <a href={contactLinks.website} className="website" target="_blank"><i className="bi bi-globe"></i></a>
                    <a href={contactLinks.twitter} className="twitter" target="_blank"><i className="bi bi-twitter"></i></a>
                    <a href={contactLinks.facebook} className="facebook" target="_blank"><i className="bi bi-facebook"></i></a>
                    <a href={contactLinks.github} className="github" target="_blank"><i className="bi bi-github"></i></a>
                    <a href={contactLinks.skype} className="skype" target="_blank"><i className="bi bi-skype"></i></a>
                    <a href={contactLinks.linkedin} className="linkedin" target="_blank"><i className="bi bi-linkedin"></i></a>
                </div>

            </div>
        </header>
    );

}

export default Header;