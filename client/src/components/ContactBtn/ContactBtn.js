import React from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter } from 'reactstrap';
import "./ContactBtn.css";
import ContactImg from "../../images/contactImg.png";
import Contact from '../../pages/Contact';



const style = {
  signupButton: {
    float: 'right',
    backgroundColor: "#e43b36",
    margin: "30px 2.5px 2.5px",
    color: "white",
    border: "none",
    borderRadius: "5px",
    padding: "5px 15px"
  },
  loginButton: {
    float: 'right',
    backgroundColor: "rgb(236, 103, 99)",
    margin: "30px 2.5px 2.5px",
    color: "white",
    border: "none",
    borderRadius: "5px",
    padding: "20px"
  },
  navbarHeader: {
    float: 'none'
  },
  loginButton: {
    paddingLeft: '20px',
    paddingRight: '20px',
    marginLeft: "10px"
  },
  homePage: {
    fontSize: '30px'
  },
  loginForm: {
    textAlign: "center"
  },
  footerText: {
    textAlign: "center", 
    borderTop: "solid", 
    borderWidth: "1px", 
    borderColor: "#e9ecef"
  }
}

class ContactBtn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };
    this.toggle = this.toggle.bind(this)
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }
  
  render () {
      return (
        <div>
      	<div className='contactButton'>
            <span className='contactImage'
            onClick={this.toggle}
            style={{ position: "relative", zIndex: "5", cursor: "pointer", backgroundColor: "rgba(136, 135, 135, 0.65)", padding: "20px", borderRadius: '10px', position: "fixed", border: "none" }}>
            	<img style={{ height: "20px", width: "25px" }} src={ContactImg} />
            </span>
        </div>

        <div>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>
              Contact Us!
          </ModalHeader>

          <div>
            <ModalBody className="contactModal">
              <Contact />
            </ModalBody>

            <ModalBody style={style.footerText}>
              <h6>
                Garunteed response within the next 48 hours.
              </h6>
            </ModalBody>
          </div>
        </Modal>

      </div>
      </div>

       )
   }
} 


export default ContactBtn;