import React, { useEffect } from 'react';
import AboutMe from "./about/AboutMe"
import Counts from "./about/Counts"
import Skills from "./about/Skills"
import Interests from "./about/Interests"
import Testimonials from "./about/Testimonials"

const About = ({headerPlacement, Scripts}) => {
    
    useEffect(() => {
        headerPlacement("about");
    })

    return (
        <section id="about" className="about">
            <AboutMe />
            <Counts Scripts={Scripts}/>
            <Skills Scripts={Scripts}/>
            <Interests />
            <Testimonials />
        </section>
    )
}

export default About;