import React, { useEffect } from 'react';

const Services = ({ headerPlacement }) => {

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

                <br/>
                <iframe title='fiverr_affiliate' src="https://www.fiverr.com/gig_widgets?id=U2FsdGVkX19g0PRzc/oowWa/psM+fd1YtFkADpB0dXQBc7AvOHzUeT/JJLFzNwV79Gm0nyMUwqdIadf/y9wG2LmEhdzY9u5Z2yLK3paKER5nPpr3/qd9cBbdXuSBnOM2ptcgeuwcbgFImfQrRkNHEowefZB4Xxp7JKuqtge/pMl21J466GKp/8jcS/byeQ33NdaoJIR5jQo7M1kFVWyhAdyrFqKD7WEBttLczCgTsAPK3UBc/EWnOKrQidmZJzIN+ay/9+1Yjazno7+roUWHSLIvfo8egl2NxT+rnKpv4Maaz40L8WGx2dxmNsXHxKD0ENTIz4Nbm8l1YIuIXPU0sorW9045WU+WHE3udNT57DBlOmMDNyqG37QECIKJj2Iidx6Ou83ZVVuAfgXURy+Z2DVGMiUkC2J3CC8nPiW8+PDjVoh5KtG3bUDSnjtbesdAPdHjjOkU7Zy4OVto11/DbTnFlzjTZcXFE2HJ5Pj0K/RcEnMaddAYLY+emaEPt707Br4/U9PejN7BiqLCKnGLhTG/Vp9y6fhGQW8vtmgkNPc=&affiliate_id=413728&strip_google_tagmanager=true" loading="lazy" data-with-title="true" class="fiverr_nga_frame" frameborder="0" height="350" width="100%" referrerpolicy="no-referrer-when-downgrade" data-mode="specific_gig" onload=" var frame = this; var script = document.createElement('script'); script.addEventListener('load', function() { window.FW_SDK.register(frame); }); script.setAttribute('src', 'https://www.fiverr.com/gig_widgets/sdk'); document.body.appendChild(script); " ></iframe>
                <br/>

                <div className="row">
                    <div className="col-lg-4 col-md-6 d-flex align-items-stretch">
                        <div className="icon-box">
                            <div className="icon"><i className="bx bxl-dribbble"></i></div>
                            <h4><a href="">Web Development</a></h4>
                            <p>I can design, develope and debug websites using HTML, CSS, Javascript, Bootstrap, React, Django, PWA.</p>
                        </div>
                    </div>

                    <div className="col-lg-4 col-md-6 d-flex align-items-stretch mt-4 mt-md-0">
                        <div className="icon-box">
                            <div className="icon"><i className="bx bx-file"></i></div>
                            <h4><a href="">Mobile App Development</a></h4>
                            <p>I'm expert in mobile app development (Java, Flutter and PWA) with 1 year of experience.</p>
                        </div>
                    </div>

                    <div className="col-lg-4 col-md-6 d-flex align-items-stretch mt-4 mt-lg-0">
                        <div className="icon-box">
                            <div className="icon"><i className="bx bx-tachometer"></i></div>
                            <h4><a href="">Cross-Platform App Development</a></h4>
                            <p>I'm expert in creating cross-platform apps with Flutter, PWA (Progressive Web Apps) and Kivy (Python-based Cross Platform App Development Framework).</p>
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

                    <div className="col-lg-4 col-md-6 d-flex align-items-stretch mt-4">
                        <div className="icon-box">
                            <div className="icon"><i className="bx bx-arch"></i></div>
                            <h4><a href="">Webscraping</a></h4>
                            <p>I can program webscrapers using requests, selenium etc module in Python.</p>
                        </div>
                    </div>

                    <div className="col-lg-4 col-md-6 d-flex align-items-stretch mt-4">
                        <div className="icon-box">
                            <div className="icon"><i className="bx bx-arch"></i></div>
                            <h4><a href="">Telegram Bot Creation</a></h4>
                            <p>I can create Telegram Bots and integrate various APIs and functionalities.</p>
                        </div>
                    </div>

                    <div className="col-lg-4 col-md-6 d-flex align-items-stretch mt-4">
                        <div className="icon-box">
                            <div className="icon"><i className="bx bx-arch"></i></div>
                            <h4><a href="">Tech Support</a></h4>
                            <p>I can give solution to your day-to-day tech problems.</p>
                        </div>
                    </div>

                </div>

            </div>
        </section>

    )
}

export default Services;