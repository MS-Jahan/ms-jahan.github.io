
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
                    <a href={contactLinks.fiverr} className="website fiverr-icon" target="_blank" style={{ width: '22px', height: '22px' }}>
                        <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: '100%', height: '100%' }}>
                            <path d="M23.004 15.588a.995.995 0 1 0 .002-1.99.995.995 0 0 0-.002 1.99zm-.996-3.705h-.85c-.546 0-.84.41-.84 1.092v2.466h-1.61v-3.558h-.684c-.547 0-.84.41-.84 1.092v2.466h-1.61v-4.874h1.61v.74c.264-.574.626-.74 1.163-.74h1.972v.74c.264-.574.625-.74 1.162-.74h.527v1.316zm-6.786 1.501h-3.359c.088.546.43.858 1.006.858.43 0 .732-.175.83-.487l1.425.4c-.351.848-1.22 1.364-2.255 1.364-1.748 0-2.549-1.355-2.549-2.515 0-1.14.703-2.505 2.45-2.505 1.856 0 2.471 1.384 2.471 2.408 0 .224-.01.37-.02.477zm-1.562-.945c-.04-.42-.342-.81-.889-.81-.508 0-.81.225-.908.81h1.797zM7.508 15.44h1.416l1.767-4.874h-1.62l-.86 2.837-.878-2.837H5.72l1.787 4.874zm-6.6 0H2.51v-3.558h1.524v3.558h1.591v-4.874H2.51v-.302c0-.332.235-.536.606-.536h.918V8.412H2.85c-1.162 0-1.943.712-1.943 1.755v.4H0v1.316h.908v3.558z"/>
                        </svg>
                    </a>
                    <a href={contactLinks.upwork} className="website upwork-icon" target="_blank" title="Upwork" aria-label="Upwork">
                        <span style={{ fontSize: '14px', fontWeight: 700, letterSpacing: '-0.04em', textTransform: 'lowercase' }}>up</span>
                    </a>
                    <a href={contactLinks.upworkAgency} className="website upwork-agency-icon" target="_blank" title="Upwork Agency" aria-label="Upwork Agency">
                        <i className="bi bi-buildings"></i>
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