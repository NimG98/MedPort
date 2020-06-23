import React from "react";
import { Link } from "react-router-dom";

import "./styles.css";

class DoctorSignUpForm extends React.Component {
	
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
			<div className="DoctorSignUpForm">
				<div className="title">
					<h2><b>Doctor Sign Up</b></h2>
				</div>
			
				<div className="container">
					<label>First Name</label>
					<input 
						type='text' 
						name='firstName' 
						value={firstName}
						onChange={handleChange} />
				
					<label>Last Name</label>					
					<input 
						type='text' 
						name='lastName' 
						value={lastName}
						onChange={handleChange} /> 
								
					<label>Medical ID Number</label>
					<input 
						type='text' 
						name='MID'
						value={MID}
						pattern='[0-9]*'
						onChange={(e) => this.numberChangeHandler(e, handleChange)} />
			
					<label>Email</label>
					<input 
						type='email' 
						name='email' 
						value={email}
						onChange={handleChange} />
				
					<label>Password</label>
					<input 
						type='password' 
						name='password' 
						value={password}
						onChange={handleChange}  />
				</div>
					
				<Link to="/">	
					<button className="login">Login</button>
				</Link>
				
				<button onClick={next} className="next">Next</button>
			</div>
		);
	}
	
	// onChange handler for number inputs 
	numberChangeHandler(event, handler) {
		if (event.target.validity.valid) {
			handler(event);
		}
	}
	
}

export default DoctorSignUpForm;