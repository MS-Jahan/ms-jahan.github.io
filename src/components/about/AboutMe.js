import React from 'react';
import { Link } from 'react-router-dom';

const AboutMe = () => {

    function _calculateAge(birthday) { // birthday is a date
        var ageDifMs = Date.now() - birthday.getTime();
        var ageDate = new Date(ageDifMs); // miliseconds from epoch
        return Math.abs(ageDate.getUTCFullYear() - 1970);
    }

    const birthdate = new Date(2001, 11, 22);
    // const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const myinfo = {
        // birthday: birthdate.getDate() + " " + months[birthdate.getMonth()] + ", " + birthdate.getFullYear(),
        website: document.location.host,  //"ms-jahan.github.io",
        phone: "+880 168 626 1785",
        city: "Narsingdi, Dhaka, Bangladesh",
        age: _calculateAge(birthdate),
        degree: "BSc in CSE (Current)",
        email: "ssarwarjahan@gmail.com",
        freelance: "Available",
        university: "Institute of Science and Technology",
        university_link: "https://ist.edu.bd/"

    }

    return (
        <div className="about-me container">

            <div className="section-title">
                <h2>About</h2>
                <p>Learn more about me</p>
            </div>

            <div className="row">
                <div className="col-lg-4" data-aos="fade-right">
                <img src="assets/img/me.jpg" className="img-fluid" alt=""/>
                </div>
                <div className="col-lg-8 pt-4 pt-lg-0 content" data-aos="fade-left">
                <h3>Software Developer<small> [in future <span role='img' aria-label='grinning-face-with-smiling-eyes-emoji'>😄</span>]</small></h3>
                <p className="fst-italic">
                Hi, there! I’m Md. Sarwar Jahan Sabit, currently completing my BSc in CSE from Institute of Science and Technology, Dhanmondi. I love to solve problems through coding, play Valorant, learn new things everyday and help others.
                </p>
                <div className="row">
                    <div className="col-lg-6">
                    <ul>
                        {/* <li><i className="bi bi-chevron-right"></i> <strong>Age:</strong> <span>{myinfo.age}</span></li> */}
                        <li><i className="bi bi-chevron-right"></i> <strong>Website:</strong> <span><Link to={{pathname: "https://" + myinfo.website}} target="_blank">{myinfo.website}</Link></span></li>
                        <li><i className="bi bi-chevron-right"></i> <strong>Phone:</strong> <span>{myinfo.phone}</span></li>
                        <li><i className="bi bi-chevron-right"></i> <strong>City:</strong> <span>{myinfo.city}</span></li>
                        <li><i className="bi bi-chevron-right"></i> <strong>University:</strong> <span><Link to={{pathname: myinfo.university_link}} target="_blank">{myinfo.university}</Link></span></li>
                    </ul>
                    </div>
                    <div className="col-lg-6">
                    <ul>
                        <li><i className="bi bi-chevron-right"></i> <strong>Age:</strong> <span>{myinfo.age}</span></li>
                        <li><i className="bi bi-chevron-right"></i> <strong>Degree:</strong> <span>{myinfo.degree}</span></li>
                        <li><i className="bi bi-chevron-right"></i> <strong>Email:</strong> <span>{myinfo.email}</span></li>
                        <li><i className="bi bi-chevron-right"></i> <strong>Freelance:</strong> <span>{myinfo.freelance}</span></li>
                    </ul>
                    </div>
                </div>
                {/* <p>
                    Hi, there! I’m Md. Sarwar Jahan Sabit, currently completing my BSc in CSE from Institute of Science and Technology, Dhanmondi. I love to solve problems through coding, play Valorant, learn new things everyday and help others.
                </p> */}
                </div>
            </div>

            </div>
    )
}

export default AboutMe;