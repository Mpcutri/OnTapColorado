import React, { Component } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom';
import { Button } from 'reactstrap';
import "./SignUp.css";
import { Alert } from 'reactstrap';

class SignupForm extends Component {
	constructor() {
		super()
		this.state = {
			brewery: '',
			breweryURL: '',
			username: '',
			password: '',
			confirmPassword: '',
			location: '',
			website: '',
			phone_number: '',
			beer: [],
			redirectTo: null,
			alert: false
		}
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
		console.log("click worked!");
		// TODO - validate!
		axios
			.post('/auth/signup', {
				brewery: this.state.brewery,
				breweryURL: this.state.breweryURL,
				username: this.state.username,
				password: this.state.password,
				location: this.state.location,
				website: this.state.website,
				phone_number: this.state.phone_number,
				beer: this.state.beer
			})
			.then(response => {
				console.log(response)
				if (!response.data.errmsg) {
					console.log('youre good')
					console.log(response.data)
					this.setState({
			            alert: true
			          })
				} else {
					console.log('duplicate')
				}
			})
	}
	render() {
		if (this.state.redirectTo) {
			return <Redirect to={{ pathname: this.state.redirectTo }} />
		}
		return (
		<div>
			<div className="SignUpForm">
				<label htmlFor="brewery">Brewery Name</label>
					<br />
				<input
					type="text"
					name="brewery"
					value={this.state.brewery}
					placeholder=". . ."
					onChange={this.handleChange}
				/>
					<br />
					<br />
				<label htmlFor="username">Username</label>
					<br />
				<input
					type="text"
					name="username"
					value={this.state.username}
					placeholder=". . ."
					onChange={this.handleChange}
				/>
					<br />
					<br />
				<label htmlFor="password">Password</label>
					<br />
				<input
					type="password"
					name="password"
					value={this.state.password}
					placeholder=". . ."
					onChange={this.handleChange}
				/>
					<br />
					<br />
				<label htmlFor="confirmPassword">Confirm Password</label>
					<br />
				<input
					type="password"
					name="confirmPassword"
					value={this.state.confirmPassword}
					placeholder=". . ."
					onChange={this.handleChange}
				/>
					<br />
					<br />
				<Button id="signUpSubmit-button" onClick={this.handleSubmit}>Sign up</Button>
			</div>

			<div>
				{this.state.alert ? (
						<Alert color="success" style={{ marginTop: "10px" }}>
			        		You have successfully created an account! <a href="#" className="alert-link">Login here!</a>
			      		</Alert>
      			) : ("")}
      		</div>
      	</div>
		)
	}
}

export default SignupForm
