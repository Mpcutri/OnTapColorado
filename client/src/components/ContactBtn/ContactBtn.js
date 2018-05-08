import React from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter } from 'reactstrap';
import "./ContactBtn.css";
import ContactImg from "../../images/contactImg.png";

class ContactBtn extends React.Component {
  constructor() {
    super();

    this.state = {
    	open: false
    };
  }
  
  openContactModal() {
  }
  
  render () {
      return (
      	<div className='contactButton'>
            <span className='contactImage'
            onClick={ () => { this.openContactModal(); }}
            style={{ position: "relative", zIndex: "5", cursor: "pointer", backgroundColor: "rgba(136, 135, 135, 0.65)", padding: "20px", borderRadius: '10px', position: "fixed", border: "none" }}>
            	<img style={{ height: "20px", width: "25px" }} src={ContactImg} />
            </span>
        </div>
       )

   }
} 


export default ContactBtn;