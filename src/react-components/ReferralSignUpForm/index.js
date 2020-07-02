import React from "react";
import { Link } from "react-router-dom";

import "./styles.css";

// importing form validators
import { validateReferralCode } from "../../validators/form-validators";

class ReferralSignUpForm extends React.Component {
	
	constructor(props) {
		super(props);
		
		// binding functions
		this.submit = this.submit.bind(this);
		this.validate = this.validate.bind(this);
	}
	
	render() {
		
		const {
			error,
			errorCode,
			code,
			handleChange,
			doctorSignUp,
			submit,
		} = this.props;
		
		return (
			<div className="ReferralSignUpForm">
				<form className="main_form" onSubmit={this.submit}>
					<div className="title">
						<h2><b>Enter Referral Code</b></h2>
					</div>
					
					<div className="container">
						<input 
							type='text' 
							name='code' 
							className={error ? 'input-error' : null}
							placeholder='Referral Code'
							value={code}
							onChange={handleChange} />
						{error ? <p className="error-message" >{errorCode}</p> : null}
					</div>
						
					<Link to="/">	
						<button type="button" className="login" >Login</button>
					</Link>
						
					<button type="submit" className="next">Next</button>
				</form>
				
				<div className="secondary_form">
					<h3>Are you a Doctor? </h3>
					<button className="signup" onClick={doctorSignUp}>Sign Up</button>
				</div>
			</div>
		)
	}
	
	submit(event) {
		// prevents page reload
		event.preventDefault();
		
		const valid = this.validate();
		
		if (valid) {
			this.props.submit();
		}
	}
	
	// validates inputs on submission
	validate() {
		
		const valid = (
			validateReferralCode(this.props.code, this.props.setError)
		);
		
		return valid;
	}
	
}



export default ReferralSignUpForm;