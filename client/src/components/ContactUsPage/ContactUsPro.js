import React from "react";
import './ContactUs.css'
import {Container} from 'react-bootstrap';
import {Grid} from '@material-ui/core';
import emailjs from 'emailjs-com';
import NavbarProfessional from "../Navbar/NavbarProfessional";


const ContactUsPro = (props) =>  {

    function sendEmail(e){
        e.preventDefault();

        emailjs.sendForm('Gmail', 'template_y0d2h2z', e.target, 'user_jMQkwGVAyo12RtnoSuRjY')
          .then((result) => {
              console.log(result.text);
          }, (error) => {
              console.log(error.text);
          });
          e.target.reset();
          window.alert(" Your message has been sent! ");
    }

    return(
        <div className ="ContactUs">
            <NavbarProfessional/>
            <div className = "ContactUsChildDiv">

            <form className = "contact-form" onSubmit={sendEmail}>

                <h1 className = "contactUsText"> Contact Us</h1>
                <label> Subject </label>
                <textarea placeholder ="Write the subject here" name="subject"/>
                <label> Your message </label>
                <textarea placeholder = "Write your message here" name="message"/>

                <input type="submit" value="Send" />
            </form>

            </div>
        </div>
    );
}

export default ContactUsPro;