import React from 'react';

const Interests = () => {
    return (
        <div className="interests container">

            <div className="section-title">
                <h2>Interests</h2>
            </div>

            <div className="row">
                <div className="col-lg-3 col-md-4">
                <div className="icon-box">
                <i className="ri-code-s-slash-line" style={{color: '#ffbb2c'}}></i>
                    <h3>Coding</h3>
                </div>
                </div>
                <div className="col-lg-3 col-md-4 mt-4 mt-md-0">
                <div className="icon-box">
                    <i className="ri-terminal-box-fill" style={{color: '#5578ff'}}></i>
                    <h3>Linux</h3>
                </div>
                </div>
                <div className="col-lg-3 col-md-4 mt-4 mt-md-0">
                <div className="icon-box">
                    <i className="ri-riding-line" style={{color: '#e80368'}}></i>
                    <h3>Cycling</h3>
                </div>
                </div>
                <div className="col-lg-3 col-md-4 mt-4 mt-lg-0">
                <div className="icon-box">
                    <i className="ri-bug-line" style={{color: '#e361ff'}}></i>
                    <h3>Debugging</h3>
                </div>
                </div>
                <div className="col-lg-3 col-md-4 mt-4">
                <div className="icon-box">
                    <i className="ri-skull-2-fill" style={{color: '#47aeff'}}></i>
                    <h3>Pentesting</h3>
                </div>
                </div>
                <div className="col-lg-3 col-md-4 mt-4">
                <div className="icon-box">
                    <i className="ri-newspaper-line" style={{color: '#ffa76e'}}></i>
                    <h3>Newspapers</h3>
                </div>
                </div>
                <div className="col-lg-3 col-md-4 mt-4">
                <div className="icon-box">
                    <i className="ri-gamepad-fill" style={{color: '#11dbcf'}}></i>
                    <h3>Gaming</h3>
                </div>
                </div>
                <div className="col-lg-3 col-md-4 mt-4">
                <div className="icon-box">
                    <i className="ri-survey-fill" style={{color: '#4233ff'}}></i>
                    <h3>Research</h3>
                </div>
                </div>
            </div>

        </div>
    );
}

export default Interests;