import React, { Component } from 'react'
// import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Redirect } from 'react-router-dom'
import "./Contact.css";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Input,
  Label,
  FormText,
  Alert } from 'reactstrap';

class LoginForm extends Component {
	constructor() {
		super()
		this.state = {
			username: '',
			password: '',
			redirectTo: null,
			loggedIn: true,
			alert: false
		}
		// this.googleSignin = this.googleSignin.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleChange = this.handleChange.bind(this)
	}

	handleChange(event) {
		this.setState({
			[event.target.name]: event.target.value
		})
	}

	handleSubmit(event) {
		event.preventDefault()
		console.log('handleSubmit')
		this.props._login(this.state.username, this.state.password)
		setTimeout(this.alertChange, 1200)
	}

	handleEnter(event) {
		if (event.keyCode === 13) {
			event.preventDefault()
			this.props._login(this.state.username, this.state.password)
			setTimeout(this.alertChange, 1200)
    	}
  	}

	alertChange = () => {
		this.setState({
			alert: true
		})
	}

	render() {
		if (this.state.redirectTo) {
			return <Redirect to={{ pathname: this.state.redirectTo }} />
		} else {
			return (
				<div className="contactForm">
					<form>
						<label htmlFor="username">
							Full Name
						</label>
							<br />
						<input
							className="contactInputText"
							type="text"
							name="Name"
							value={this.state.fullName}
							onChange={this.handleChange}
							placeholder="Tobias Funke"
						/>
							<br />
							<br />
						<label htmlFor="password">
							E-Mail
						</label>
							<br />
						<input
							className="contactInputText"
							type="email"
							name="email"
							onChange={this.handleChange}
							placeholder="example@gmail.com"
							onKeyPress={this.handleTest}
						/>
							<br />
							<br />
						<FormGroup style={{ marginBottom: '0px' }}>
				          <Input
				          	type="textarea"
				          	placeholder="Subject"
				          	name="text"
				          	id="subjectText"
				          	/>
				        </FormGroup>
				        <FormGroup>
				          <Input
				          	type="textarea"
				          	name="text"
				          	id="messageText"
				          	placeholder="Message"
				          />
				        </FormGroup>
				        
						<Button id="contactSendButton" onClick={this.handleSubmit}>Send</Button>
					</form>

					<div>
						{this.state.alert ? (
								<Alert color="danger" style={{ marginTop: "10px" }}>
					        		Incorrect username or password.
					      		</Alert>
		      			) : ("")}
      				</div>

				</div>
			)
		}
	}
}

export default LoginForm
