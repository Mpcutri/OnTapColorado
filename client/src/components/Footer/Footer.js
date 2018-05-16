import React from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter } from 'reactstrap';
import "./Footer.css";
import FooterImage from "../../images/footerImage.png";
import Facebook from "./images/facebook.png";
import Instagram from "./images/insta.png";
import Twitter from "./images/twitter.png";
import onTapText from "../../images/onTapWhite.png";


// class Footer extends React.Component {
//   constructor() {
//     super();

//     this.state = {
//     };
//   }
  
//   render () {
//       return (
//       	<div className='footer'>
//           <div className='footer-background' />
//         </div>
//        )
//    }
// } 


class Footer extends React.Component {
  constructor() {
    super();

    this.state = {
    };
  }

  handleFacebook = (e) => {
    e.preventDefault();
    window.location = "www.facebook.com"
  }
  
  render () {
      return (
        <div className='footer-back'>
          <div className='social-icons'>
            <a href="www.facebook.com" target="_blank">
              <img id='facebook' src={Facebook} />
            </a>
            <a href="www.instagram.com" target="_blank">
              <img id='instagram' src={Instagram} />
            </a>
            <a href="www.twitter.com" target="_blank">
              <img id='twitter' src={Twitter} />
            </a>
          </div>
          <div className='divider'>
          </div>
          <div className='footer-links'>
            <Link to="/advertising" style={{ marginLeft: '0px' }}>Advertising</Link>
            <Link to="/privacypolicy">Privacy Policy</Link>
            <Link to="/faqs">FAQs</Link>
            <Link to="/careers">Careers</Link>
          </div>
          <div className='footer-logo'>
            <Link to={"/"}> <img id="footer-logoImage" src={onTapText} /> </Link>
          </div>
        </div>
       )
   }
} 

export default Footer;