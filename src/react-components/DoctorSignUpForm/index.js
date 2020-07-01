import React from "react";
import { Link } from "react-router-dom";

import "./styles.css";

class DoctorSignUpForm extends React.Component {
	
	constructor(props) {
		super(props);
		
		// bind functions
		this.submit = this.submit.bind(this);
	}
	
	render() {
		
		const {
			firstName,
			lastName,
			email,
			password,
			MID,
			handleChange,
			next
		} = this.props;
		
		return (
			<form className="DoctorSignUpForm" onSubmit={this.submit}>
				<div className="title">
					<h2><b>Doctor Sign Up</b></h2>
				</div>
			
				<div className="container">
					<label>First Name</label>
					<input 
						type='text' 
						name='firstName' 
						placeholder='First Name'
						value={firstName}
						onChange={handleChange} 
						required />
				
					<label>Last Name</label>					
					<input 
						type='text' 
						name='lastName' 
						placeholder='Last Name'
						value={lastName}
						onChange={handleChange} 
						required /> 
								
					<label>Medical ID Number</label>
					<input 
						type='text' 
						name='MID'
						placeholder='Medical ID Number'
						value={MID}
						pattern='[0-9]*'
						onChange={(e) => this.numberChangeHandler(e, handleChange)} 
						required />
			
					<label>Email</label>
					<input 
						type='email' 
						name='email' 
						placeholder='Email'
						value={email}
						onChange={handleChange} 
						required />
				
					<label>Password</label>
					<input 
						type='password' 
						name='password' 
						placeholder='Password'
						value={password}
						onChange={handleChange}  
						required />
				</div>
					
				<Link to="/">	
					<button type="button" className="login">Login</button>
				</Link>
				
				<button type="submit" className="next">Next</button>
			</form>
		);
	}
	
	// onChange handler for number inputs 
	numberChangeHandler(event, handler) {
		if (event.target.validity.valid) {
			handler(event);
		}
	}
	
	// onSubmit event handler
	submit(event) {
		// prevents page reload
		event.preventDefault();
		
		this.props.next();
	}
	
}

export default DoctorSignUpForm;