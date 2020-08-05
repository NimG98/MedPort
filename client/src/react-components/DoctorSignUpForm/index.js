import React from "react";
import { Link } from "react-router-dom";

import "./styles.css";

// import form validators
import { validateName, validateMID, validateEmail, validatePassword, validateUserName } from "../../validators/form-validators";

class DoctorSignUpForm extends React.Component {
	
	constructor(props) {
		super(props);
		
		this.state = {
			errors: {
				firstName: false,
				lastName: false,
				MID: false,
				email: false,
				username: false,
				password: false,
			},
			
			errorCodes: {
				firstName: '',
				lastName: '',
				MID: '',
				email: '',
				username: '',
				password: '',
			},
		}
		
		// bind functions
		this.submit = this.submit.bind(this);
		this.validate = this.validate.bind(this);
		this.setError = this.setError.bind(this);
	}
	
	render() {
		
		const {
			firstName,
			lastName,
			email,
			username,
			password,
			MID,
			handleChange,
			back,
		} = this.props;
		
		return (
			<form className="DoctorSignUpForm" onSubmit={this.submit}>
				<div className="title">
					<label><b>Doctor Sign Up</b></label>
				</div>
			
				<div className="container">
					<label>First Name</label>
					<input 
						type='text' 
						name='firstName' 
						className={this.state.errors.firstName ? 'input-error' : null}
						placeholder='First Name'
						value={firstName}
						onChange={handleChange}
					/>
					{this.state.errors.firstName ? <p className="error-message" >{this.state.errorCodes.firstName}</p> : null}
				
					<label>Last Name</label>					
					<input 
						type='text' 
						name='lastName' 
						className={this.state.errors.lastName ? 'input-error' : null}
						placeholder='Last Name'
						value={lastName}
						onChange={handleChange} 
					/> 
					{this.state.errors.lastName ? <p className="error-message" >{this.state.errorCodes.lastName}</p> : null}
								
					<label>Medical ID Number</label>
					<input 
						type='text' 
						name='MID'
						className={this.state.errors.MID ? 'input-error' : null}
						placeholder='Medical ID Number'
						value={MID}
						onChange={handleChange}
					/>
					{this.state.errors.MID ? <p className="error-message" >{this.state.errorCodes.MID}</p> : null}
			
					<label>Email</label>
					<input 
						type='text' 
						name='email' 
						className={this.state.errors.email ? 'input-error' : null}
						placeholder='Email'
						value={email}
						onChange={handleChange} 
					/>
					{this.state.errors.email ? <p className="error-message" >{this.state.errorCodes.email}</p> : null}
					
					<label>User Name</label>
					<input 
						type='text' 
						name='username' 
						className={this.state.errors.username ? 'input-error' : null}
						placeholder='User Name'
						value={username}
						onChange={handleChange}
					/>
					{this.state.errors.username ? <p className="error-message" >{this.state.errorCodes.username}</p> : null}
				
					<label>Password</label>
					<input 
						type='password' 
						name='password' 
						className={this.state.errors.password ? 'input-error' : null}
						placeholder='Password'
						value={password}
						onChange={handleChange}  
					/>
					{this.state.errors.password ? <p className="error-message" >{this.state.errorCodes.password}</p> : null}
				</div>
					
				<button type="button" className="back" onClick={back}>Back</button>
				
				<button type="submit" className="next">Next</button>
			</form>
		);
	}
	
	// onSubmit event handler
	submit(event) {
		// prevents page reload
		event.preventDefault();
		
		const valid = this.validate();
		
		if (valid) {
			this.props.next();
		}
	}
	
	// validates inputs on submission
	validate() {
		
		const valid = (
			validateName('firstName', this.props.firstName, this.setError) &&
			validateName('lastName',this.props.lastName, this.setError) &&
			validateMID('MID', this.props.MID, this.setError) &&
			validateEmail('email', this.props.email, this.setError) &&
			validateUserName('username', this.props.username, this.setError) &&
			validatePassword('password', this.props.password, this.setError));
		
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

export default DoctorSignUpForm;