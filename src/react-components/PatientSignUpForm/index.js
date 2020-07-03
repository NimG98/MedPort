import React from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";

import "./styles.css";

// importing actions/required methods
import { addPatient } from "../../actions/app";
import { redirect } from "../../actions/router";

// import form validators
import { 
	validateName, 
	validateAddress, 
	validatePostalCode, 
	validateHCN, 
	validateEmail, 
	validatePassword, 
	validateUserName } from "../../validators/form-validators"; 

class PatientSignUpForm extends React.Component {
	
	constructor(props) {
		super(props);
		
		this.state = {
			firstName: '',
			lastName: '',
			address: '',
			postalCode: '',
			HCN: '',
			email: '',
			username: '',
			password: '',
			
			errors: {
				firstName: false,
				lastName: false,
				address: false,
				postalCode: false,
				HCN: false,
				email: false,
				username: false,
				password: false,
			},
			
			errorCodes: {
				firstName: '',
				lastName: '',
				address: '',
				postalCode: '',
				HCN: '',
				email: '',
				username: '',
				password: '',
			},
		}
		
		// binding functions
		this.handleInputChange = this.handleInputChange.bind(this);
		this.createPatient = this.createPatient.bind(this);
		this.submit = this.submit.bind(this);
		this.validate = this.validate.bind(this);
		this.setError = this.setError.bind(this);
	}
	
	render() {
		return (
			<form className="PatientSignUpForm" onSubmit={this.submit}>
			
				<div className="title">
					<h2><b>Patient Sign Up</b></h2>
				</div>
			
				<div className="container">
					<label>First Name</label>
					<input 
						type='text' 
						name='firstName' 
						className={this.state.errors.firstName ? 'input-error' : null}
						placeholder='First Name'
						value={this.state.firstName}
						onChange={this.handleInputChange} 
					/>
					{this.state.errors.firstName ? <p className="error-message" >{this.state.errorCodes.firstName}</p> : null}
							
					<label>Last Name</label>
					<input 
						type='text' 
						name='lastName' 
						className={this.state.errors.lastName ? 'input-error' : null}
						placeholder='Last Name'
						value={this.state.lastName}
						onChange={this.handleInputChange} 
					/>
					{this.state.errors.lastName ? <p className="error-message" >{this.state.errorCodes.lastName}</p> : null}
							
					<label>Address</label>
					<input 
						type='text' 
						name='address' 
						className={this.state.errors.address ? 'input-error' : null}
						placeholder='Address'
						value={this.state.address}
						onChange={this.handleInputChange} 
					/>
					{this.state.errors.address ? <p className="error-message" >{this.state.errorCodes.address}</p> : null}
							
					<label>Postal Code</label>
					<input 
						type='text' 
						name='postalCode' 
						className={this.state.errors.postalCode ? 'input-error' : null}
						placeholder='Postal Code'
						value={this.state.postalCode}
						onChange={this.handleInputChange} 
					/>
					{this.state.errors.postalCode ? <p className="error-message" >{this.state.errorCodes.postalCode}</p> : null}
							
					<label>Health Card Number</label>
					<input 
						type='text' 
						name='HCN' 
						className={this.state.errors.HCN ? 'input-error' : null}
						placeholder='Health Card Number'
						value={this.state.HCN}
						onChange={this.handleInputChange} 
					/>
					{this.state.errors.HCN ? <p className="error-message" >{this.state.errorCodes.HCN}</p> : null}
							
					<label>Email</label>
					<input 
						type='email' 
						name='email' 
						className={this.state.errors.email ? 'input-error' : null}
						placeholder='Email'
						value={this.state.email}
						onChange={this.handleInputChange} 
					/>
					{this.state.errors.email ? <p className="error-message" >{this.state.errorCodes.email}</p> : null}
					
					<label>User Name</label>
					<input 
						type='text' 
						name='username' 
						className={this.state.errors.username ? 'input-error' : null}
						placeholder='User Name'
						value={this.state.username}
						onChange={this.handleInputChange} 
					/>
					{this.state.errors.username ? <p className="error-message" >{this.state.errorCodes.username}</p> : null}
							
					<label>Password</label>
					<input 
						type='password' 
						name='password' 
						className={this.state.errors.password ? 'input-error' : null}
						placeholder='Password'
						value={this.state.password}
						onChange={this.handleInputChange} 
					/>
					{this.state.errors.password ? <p className="error-message" >{this.state.errorCodes.password}</p> : null}
				</div>
					
				<Link to="/">
					<button type="button" className="login">Login</button>
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
	
	createPatient = () => {
		return({
			firstName: this.state.firstName,
			lastName: this.state.lastName,
			address: this.state.address,
			postalCode: this.state.postalCode,
			HCN: this.state.HCN,
			email: this.state.email,
			username: this.state.username,
			password: this.state.password,
			doctorID: this.props.referrerID,
		});
	}
	
	/* 
		submits a new patient account and redirects to the login page
	*/
	submit(event) {
		// prevents page reload
		event.preventDefault(); 
		
		const valid = this.validate();
		
		if (valid) {
			const patient = this.createPatient();
			
			const success = addPatient(patient, this.props.code);
			
			redirect(this, "/");
		}
	}
	
	// validates inputs on submission
	validate() {
		
		const valid = (
			validateName('firstName', this.state.firstName, this.setError) &&
			validateName('lastName', this.state.lastName, this.setError) &&
			validateAddress('address', this.state.address, this.setError) &&
			validatePostalCode('postalCode', this.state.postalCode, this.setError) &&
			validateHCN('HCN', this.state.HCN, this.setError) &&
			validateEmail('email', this.state.email, this.setError) &&
			validateUserName('username', this.state.username, this.setError) &&
			validatePassword('password', this.state.password, this.setError));
		
		return valid;
	}
		
	setError(name, value, message) {
		this.setState(prevState => ({
			errors: {
				...prevState.errors,
				[name]: value,
			},
			errorCodes: {
				...prevState.errorCodes,
				[name]: message,
			}
		}));
	}
	
}

export default withRouter(PatientSignUpForm);