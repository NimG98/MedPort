import React from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";

import "./styles.css";

// importing actions/required methods
import { addSecretary } from "../../actions/app";
import { redirect } from "../../actions/router";

class SecretarySignUpForm extends React.Component {
	
	constructor(props) {
		super(props);
		
		this.state = {
			firstName: '',
			lastName: '',
			email: '',
			password: '',
			/* error: false,
			errorCode: '', */
		}
		
		// binding functions
		this.handleInputChange = this.handleInputChange.bind(this);
		// this.setError = this.setError.bind(this);
		this.createSecretary = this.createSecretary.bind(this);
		this.submit = this.submit.bind(this);
	}
	
	render() {
		return (
			<form className="SecretarySignUpForm" onSubmit={this.submit}>
				{/* this.state.error ? <h2>{this.state.errorCode}</h2> : null */}
			
				<div className="title">
					<h2><b>Secretary Sign Up</b></h2>
				</div>
			
				<div className="container">
					<label>First Name</label>
					<input 
						type='text' 
						name='firstName' 
						placeholder='First Name'
						value={this.state.firstName}
						onChange={this.handleInputChange} 
						required />
							
					<label>Last Name</label>
					<input 
						type='text' 
						name='lastName' 
						placeholder='Last Name'
						value={this.state.lastName}
						onChange={this.handleInputChange} 
						required />
							
					<label>Email</label>
					<input 
						type='email' 
						name='email' 
						placeholder='Email'
						value={this.state.email}
						onChange={this.handleInputChange} 
						required />
							
					<label>Password</label>
					<input 
						type='password' 
						name='password' 
						placeholder='Password'
						value={this.state.password}
						onChange={this.handleInputChange} 
						required />
				</div>
					
				<Link to="/">
					<button className="login">Login</button>
				</Link>	
				
				<button type="submit" className="submit">Submit</button>
				
			</form>
		);
	}
	
	/* handles text input changes */
	handleInputChange = (event) => {
		const target = event.target;
		const name = target.name;
		const value = target.value;
		
		this.setState({
			[name]: value
		});
	}
	
	createSecretary = () => {
		return({
			firstName: this.state.firstName,
			lastName: this.state.lastName,
			email: this.state.email,
			password: this.state.password,
			institutionID: this.props.referrerID,
		});
	}
	
	submit() {
		const secretary = this.createSecretary();
		
		const success = addSecretary(secretary, this.props.code);
		
		redirect(this, "/");
		
		/* if (success) {
			redirect(this, "/");
		} else {
			this.setError(true, 'Submission error, please try again.');
		} */
	}
	
	// general error code handler
	/* setError(value, code) {
		this.setState({
			error: value,
			errorCode: code
		});
	} */
}

export default withRouter(SecretarySignUpForm);