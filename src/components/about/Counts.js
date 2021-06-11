import React from 'react';

const Counts = ({Scripts}) => {

    Scripts("assets/vendor/purecounter/purecounter.js");

    return (
        <div className="counts container">

        <div className="row">

            <div className="col-lg-3 col-md-6">
            <div className="count-box">
                <i className="bi bi-emoji-smile"></i>
                <span data-purecounter-start="0" data-purecounter-end="3" data-purecounter-duration="1" className="purecounter"></span>
                <p>Happy Clients</p>
            </div>
            </div>

            <div className="col-lg-3 col-md-6 mt-5 mt-md-0">
            <div className="count-box">
                <i className="bi bi-journal-richtext"></i>
                <span data-purecounter-start="0" data-purecounter-end="36" data-purecounter-duration="1" className="purecounter"></span>
                <p>Projects</p>
            </div>
            </div>

            <div className="col-lg-3 col-md-6 mt-5 mt-lg-0">
            <div className="count-box">
                <i className="bi bi-headset"></i>
                <span data-purecounter-start="0" data-purecounter-end="100" data-purecounter-duration="1" className="purecounter"></span>
                <p>Hours Of Support</p>
            </div>
            </div>

            <div className="col-lg-3 col-md-6 mt-5 mt-lg-0">
            <div className="count-box">
                <i className="bi bi-award"></i>
                <span data-purecounter-start="0" data-purecounter-end="0" data-purecounter-duration="1" className="purecounter"></span>
                <p>Awards (Currently)</p>
            </div>
            </div>

        </div>

        </div>
    )
}

export default Counts;