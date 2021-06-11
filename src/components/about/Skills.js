import React from 'react';
//import Waypoint from "../../external/waypoints/noframework.waypoints";

const Skills = ({Scripts}) => {
    
    Scripts("assets/vendor/waypoints/noframework.waypoints.js");
    Scripts("assets/js/main.js");

    return (
        <div className="skills container">

            <div className="section-title">
                <h2>Skills</h2>
            </div>

            <div className="row skills-content">

                <div className="col-lg-6">

                    <div className="progress">
                        <span className="skill">HTML <i className="val">100%</i></span>
                        <div className="progress-bar-wrap">
                        <div className="progress-bar" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
                    </div>

                    <div className="progress">
                        <span className="skill">CSS <i className="val">82%</i></span>
                        <div className="progress-bar-wrap">
                        <div className="progress-bar" role="progressbar" aria-valuenow="82" aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
                    </div>

                    <div className="progress">
                        <span className="skill">JavaScript <i className="val">75%</i></span>
                        <div className="progress-bar-wrap">
                        <div className="progress-bar" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
                    </div>
                    <div className="progress">
                        <span className="skill">Python <i className="val">83%</i></span>
                        <div className="progress-bar-wrap">
                        <div className="progress-bar" role="progressbar" aria-valuenow="83" aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
                    </div>
                    <div className="progress">
                        <span className="skill">React <i className="val">75%</i></span>
                        <div className="progress-bar-wrap">
                        <div className="progress-bar" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
                    </div>
                    <div className="progress">
                        <span className="skill">Cross-Platform App (PWA and Kivy) <i className="val">92%</i></span>
                        <div className="progress-bar-wrap">
                        <div className="progress-bar" role="progressbar" aria-valuenow="92" aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
                    </div>

                </div>

                <div className="col-lg-6">

                    <div className="progress">
                        <span className="skill">PHP <i className="val">71%</i></span>
                        <div className="progress-bar-wrap">
                        <div className="progress-bar" role="progressbar" aria-valuenow="71" aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
                    </div>

                    <div className="progress">
                        <span className="skill">WordPress/CMS <i className="val">82%</i></span>
                        <div className="progress-bar-wrap">
                        <div className="progress-bar" role="progressbar" aria-valuenow="82" aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
                    </div>

                    <div className="progress">
                        <span className="skill">C/C++ (CP Only)<i className="val">51%</i></span>
                        <div className="progress-bar-wrap">
                        <div className="progress-bar" role="progressbar" aria-valuenow="51" aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
                    </div>

                    <div className="progress">
                        <span className="skill">Android Development (Java)<i className="val">74%</i></span>
                        <div className="progress-bar-wrap">
                        <div className="progress-bar" role="progressbar" aria-valuenow="74" aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
                    </div>

                    <div className="progress">
                        <span className="skill">Photoshop <i className="val">89%</i></span>
                        <div className="progress-bar-wrap">
                        <div className="progress-bar" role="progressbar" aria-valuenow="89" aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
                    </div>

                    <div className="progress">
                        <span className="skill">Illustrator <i className="val">87%</i></span>
                        <div className="progress-bar-wrap">
                        <div className="progress-bar" role="progressbar" aria-valuenow="87" aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
                    </div>

                </div>

            </div>

            </div>
    )
}

export default Skills;