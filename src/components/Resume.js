import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';


const Resume = ({ headerPlacement }) => {

    useEffect(() => {
        headerPlacement("resume");
    })

    return (
        <section id="resume" className="resume">
            <div className="container">

                <div className="section-title">
                    <h2>Resume</h2>
                    <p>Check My Resume</p>
                </div>

                <div className="row">
                    <div className="col-lg-6">
                        <h3 className="resume-title">Sumary</h3>
                        <div className="resume-item pb-0">
                            <h4>Md. Sarwar Jahan Sabit</h4>
                            <p><em>Innovative and deadline-driven App Developer with 3+ years of experience designing and developing user-centered web and mobile applications from initial concept to final, polished deliverable.</em></p>
                            {/* <p> */}
                            <ul>
                                <li>Palash, Narsingdi, Bangladesh</li>
                                <li>+880 168 626 1785</li>
                                <li>ssarwarjahan@gmail.com</li>
                            </ul>
                            {/* </p> */}
                        </div>

                        <h3 className="resume-title">Education</h3>
                        <div className="resume-item">
                            <h4>Higher School Certificate in Science</h4>
                            <h5>2017 - 2019</h5>
                            <p><em>Palash Thana Central College, Palash, Narsingdi.</em></p>
                            <p>A place of memories. Completed my high school studies there.</p>
                        </div>
                        <div className="resume-item">
                            <h4>BSc in Computer Science and Engineering</h4>
                            <h5>2019 - Present</h5>
                            <p><em>Institute of Science and Technology, Dhanmondi, Dhaka</em></p>
                            <p>A nice place for affordable education. Continuing my studies and preparing for my development life.</p>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <h3 className="resume-title">Professional Experience</h3>
                        <div className="resume-item">
                            <h4>Freelancer</h4>
                            <h5>October, 2021 - Present</h5>
                            <p><em>on <Link to={{ pathname: "https://www.fiverr.com/msjsabit" }} target="_blank">Fiverr</Link></em></p>
                            {/* <p> */}
                            <ul>
                                <li>Django Backend (Python).</li>
                                <li>Webscraping.</li>
                                <li>GUI (Graphical User Interface).</li>
                                <li>Telegram Bot Creation.</li>
                                <li>Wordpress.</li>
                            </ul>
                            {/* </p> */}
                        </div>
                        <div className="resume-item">
                            <h4>Web Developer Intern</h4>
                            <h5>August, 2021 - September, 2021</h5>
                            <p><em>at <Link to={{ pathname: "https://www.linkedin.com/company/glorious-bangladesh/" }} target="_blank">Glorious Bangladesh</Link></em></p>
                            {/* <p> */}
                            <ul>
                                <li>HTML, CSS, Javascript, Bootstrap, React.</li>
                                <li>Django Backend.</li>
                            </ul>
                            {/* </p> */}
                        </div>
                    </div>
                </div>

            </div>
        </section>
    )
}

export default Resume;