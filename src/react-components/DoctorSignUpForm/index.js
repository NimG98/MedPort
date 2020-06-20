import React from "react";

import "./styles.css";

class DoctorSignUpForm extends React.Component {
	
	render() {
		
		const {
			firstName,
			lastName,
			email,
			password,
			MID,
			institutionID,
			handleChange,
			next
		} = this.props;
		
		return (
			<div className="DoctorSignUpForm">
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
					
				<button>Login</button>
				
				<button onClick={next}>Next</button>
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