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
    var textToSend = "URL: " + window.location.href +
                     "Name: " + name + "%0A" + 
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
   
