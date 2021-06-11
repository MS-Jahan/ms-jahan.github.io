import React, {useEffect} from 'react';

const Services = ({headerPlacement}) => {

    useEffect(() => {
        headerPlacement("services");
    })

    return (
        
        <section id="services" className="services">
            <div className="container">

            <div className="section-title">
                <h2>Services</h2>
                <p>My Services</p>
            </div>

            <div className="row">
                <div className="col-lg-4 col-md-6 d-flex align-items-stretch">
                <div className="icon-box">
                    <div className="icon"><i className="bx bxl-dribbble"></i></div>
                    <h4><a href="">Web Development</a></h4>
                    <p>I can design, develope and debug websites in a professional way.</p>
                </div>
                </div>

                <div className="col-lg-4 col-md-6 d-flex align-items-stretch mt-4 mt-md-0">
                <div className="icon-box">
                    <div className="icon"><i className="bx bx-file"></i></div>
                    <h4><a href="">Mobile App Development</a></h4>
                    <p>I'm expert in mobile app development (Java) with 1 year of experience.</p>
                </div>
                </div>

                <div className="col-lg-4 col-md-6 d-flex align-items-stretch mt-4 mt-lg-0">
                <div className="icon-box">
                    <div className="icon"><i className="bx bx-tachometer"></i></div>
                    <h4><a href="">Cross-Platform App Development</a></h4>
                    <p>I'm expert in creating cross-platform apps with both PWA (Progressive Web Apps) and Kivy (Python-based Cross Platform App Development Framework).</p>
                </div>
                </div>

                <div className="col-lg-4 col-md-6 d-flex align-items-stretch mt-4">
                <div className="icon-box">
                    <div className="icon"><i className="bx bx-world"></i></div>
                    <h4><a href="">Graphics Design</a></h4>
                    <p>I have expertise in both Adobe Photoshop and Adobe Illustrator.</p>
                </div>
                </div>

                <div className="col-lg-4 col-md-6 d-flex align-items-stretch mt-4">
                <div className="icon-box">
                    <div className="icon"><i className="bx bx-slideshow"></i></div>
                    <h4><a href="">Data Entry</a></h4>
                    <p>I can work with Microsoft Word, Excel and PowerPoint and I also have a good amount of typing speed.</p>
                </div>
                </div>

                <div className="col-lg-4 col-md-6 d-flex align-items-stretch mt-4">
                <div className="icon-box">
                    <div className="icon"><i className="bx bx-arch"></i></div>
                    <h4><a href="">Linux Expertise</a></h4>
                    <p>I've 4+ years of experience in Linux and can help with problems associated with server management and project deployment in the cloud.</p>
                </div>
                </div>

            </div>

            </div>
        </section>
        
    )
}

export default Services;