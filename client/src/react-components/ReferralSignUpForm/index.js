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
		} = this.props;
		
		return (
			<div className="ReferralSignUpForm">
				<form className="main_form" onSubmit={this.submit}>
					<div className="title">
						<label><b>Enter Referral Code</b></label>
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
						<button type="button" className="login" >Log in</button>
					</Link>
						
					<button type="submit" className="next">Next</button>
				</form>
				
				<div className="secondary_form">
					<p>Are you a Doctor? </p>
					{/* <button className="signup" onClick={doctorSignUp}>Sign Up</button> */}
					<a className="signup" onClick={doctorSignUp}>Sign Up</a>
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