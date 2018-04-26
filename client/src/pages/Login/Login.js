import React, { Component } from 'react'
// import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Redirect } from 'react-router-dom'
import { Button } from 'reactstrap';
import "./Login.css";

class LoginForm extends Component {
	constructor() {
		super()
		this.state = {
			username: '',
			password: '',
			redirectTo: null
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
		// this.forceUpdate()
		this.setState({
			redirectTo: '/'
		})
	}

	render() {
		if (this.state.redirectTo) {
			return <Redirect to={{ pathname: this.state.redirectTo }} />
		} else {
			return (
				<div className="LoginForm">
					<form>
						<label htmlFor="username">
							Username
						</label>
							<br />
						<input
							type="text"
							name="username"
							value={this.state.username}
							onChange={this.handleChange}
							placeholder=". . ."
						/>
							<br />
							<br />
						<label htmlFor="password">
							Password
						</label>
							<br />
						<input
							type="password"
							name="password"
							value={this.state.password}
							onChange={this.handleChange}
							placeholder=". . ."
						/>
							<br />
							<br />
						<Button id="submitButton" onClick={this.handleSubmit}>Login</Button>
					</form>
				</div>
			)
		}
	}
}

export default LoginForm
