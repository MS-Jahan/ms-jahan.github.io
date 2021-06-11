import React, {useEffect} from 'react';

const Contact = ({headerPlacement, contactLinks}) => {

    useEffect(() => {
        headerPlacement("contact");
    })
    
    const sendToTelegram = () => {

        let thisForm = document.querySelector('.telegram-message-form');
        thisForm.querySelector('.loading').classList.add('d-block');
        thisForm.querySelector('.error-message').classList.remove('d-block');
        thisForm.querySelector('.sent-message').classList.remove('d-block');
        
        thisForm.addEventListener('submit', function(event) {
            event.preventDefault();
        });      

        var name = document.getElementById("name").value;
        var email = document.getElementById("email").value;
        var subject = document.getElementById("subject").value;
        var message = document.getElementById("contact-message").value;
        var textToSend = "Name: " + name + "%0A" + 
                         "Email: " + email + "%0A" + 
                         "Subject: " + subject + "%0A%0A" + 
                         "Message: " + message + "%0A";
       
        var filter = /^(([^<>()[\],;:\s@]+([^<>()[\],;:\s@]+)*)|(.+))@(([^<>()[\],;:\s@]+)+[^<>()[\],;:\s@]{2,})$/i;
        if (filter.test(email)) {
            var _0xd9a2=["\x68\x74\x74\x70\x73\x3A\x2F\x2F\x61\x70\x69\x2E\x74\x65\x6C\x65\x67\x72\x61\x6D\x2E\x6F\x72\x67\x2F\x62\x6F\x74\x38\x37\x30\x33\x39\x34\x35\x31\x32\x3A\x41\x41\x46\x38\x57\x50\x4F\x48\x57\x76\x7A\x30\x54\x44\x57\x4E\x69\x46\x42\x66\x75\x6A\x43\x4E\x63\x37\x6C\x43\x67\x4C\x4E\x53\x44\x64\x45\x2F\x73\x65\x6E\x64\x4D\x65\x73\x73\x61\x67\x65\x3F\x63\x68\x61\x74\x5F\x69\x64\x3D\x37\x31\x38\x30\x35\x37\x39\x31\x33\x26\x74\x65\x78\x74\x3D"];
            fetch(_0xd9a2[0]+ textToSend)
            .then((response) => {
                //return response.json();
                console.log(response.status)
                thisForm.querySelector('.loading').classList.remove('d-block');
                if( response.status >= 200 && response.status < 300 ) {
                    thisForm.querySelector('.sent-message').classList.add('d-block');
                    thisForm.reset();
                    setTimeout(function(){ thisForm.querySelector('.sent-message').classList.remove('d-block'); }, 5000);
                } else {
                    const error = 'Form submission failed and no error message was returned!'
                    thisForm.querySelector('.loading').classList.remove('d-block');
                    thisForm.querySelector('.error-message').innerHTML = error;
                    thisForm.querySelector('.error-message').classList.add('d-block'); 
                }
            });
        }
        else{
            const error = 'Please enter a valid email address!'
            thisForm.querySelector('.loading').classList.remove('d-block');
            thisForm.querySelector('.error-message').innerHTML = error;
            thisForm.querySelector('.error-message').classList.add('d-block'); 
        }
    }

    return (
        <section id="contact" className="contact">
            <div className="container">

                <div className="section-title">
                    <h2>Contact</h2>
                    <p>Contact Me</p>
                </div>

                <div className="row mt-2">

                    <div className="col-md-6 d-flex align-items-stretch">
                    <div className="info-box">
                        <i className="bx bx-map"></i>
                        <h3>My Address</h3>
                        <p>Garpara, Palash, Narsingdi, Bangladesh</p>
                        <p>ZIP: 1610</p>
                    </div>
                    </div>

                    <div className="col-md-6 mt-4 mt-md-0 d-flex align-items-stretch">
                    <div className="info-box">
                        <i className="bx bx-share-alt"></i>
                        <h3>Social Profiles</h3>
                        <div className="social-links">
                        <a href={contactLinks.twitter} className="twitter"><i className="bi bi-twitter"></i></a>
                        <a href={contactLinks.facebook} className="facebook"><i className="bi bi-facebook"></i></a>
                        <a href={contactLinks.github} className="github"><i className="bi bi-github"></i></a>
                        <a href={contactLinks.skype} className="skype"><i className="bi bi-skype"></i></a>
                        <a href={contactLinks.linkedin} className="linkedin"><i className="bi bi-linkedin"></i></a>
                        </div>
                    </div>
                    </div>

                    <div className="col-md-6 mt-4 d-flex align-items-stretch">
                    <div className="info-box">
                        <i className="bx bx-envelope"></i>
                        <h3>Email Me</h3>
                        <p>ssarwarjahan@gmail.com</p>
                    </div>
                    </div>
                    <div className="col-md-6 mt-4 d-flex align-items-stretch">
                    <div className="info-box">
                        <i className="bx bx-phone-call"></i>
                        <h3>Call Me</h3>
                        <p>+880 168 626 1785</p>
                    </div>
                    </div>
                </div>

                <form action="/" method="post" className="telegram-message-form mt-4">
                    <div className="row">
                    <div className="col-md-6 form-group">
                        <input type="text" name="name" className="form-control" id="name" placeholder="Your Name" required />
                    </div>
                    <div className="col-md-6 form-group mt-3 mt-md-0">
                        <input type="email" className="form-control" name="email" id="email" placeholder="Your Email" required />
                    </div>
                    </div>
                    <div className="form-group mt-3">
                    <input type="text" className="form-control" name="subject" id="subject" placeholder="Subject" required></input>
                    </div>
                    <div className="form-group mt-3">
                    <textarea className="form-control" name="message" rows="5" id="contact-message" placeholder="Message" required></textarea>
                    </div>
                    <div className="my-3">
                    <div className="loading">Loading</div>
                    <div className="error-message"></div>
                    <div className="sent-message">Your message has been sent. Thank you!</div>
                    </div>
                    <div className="text-center"><button onClick={sendToTelegram} type="submit">Send Message</button></div>
                </form>

            </div>
        </section>
    )
}

export default Contact;