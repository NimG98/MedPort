import React from "react";

import "./styles.css";

// importing components
import ReferralSignUpForm from "../ReferralSignUpForm";
import PatientSignUpForm from "../PatientSignUpForm";

// importing actions/required methods
import { submitReferralCode } from "../../actions/app";

class ReferralSignUp extends React.Component {
	
	status = ['referral', 'patient']
	
	constructor(props) {
		super(props);
		
		this.state = {
			code: '',
			referrerID: '',
			error: false,
			errorCode: '',
			statusIndex: 0,
		}
		
		// binding functions
		this.handleInputChange = this.handleInputChange.bind(this);
		this.getSignUpForm = this.getSignUpForm.bind(this);
		this.setStatus = this.setStatus.bind(this);
		this.setReferrerID = this.setReferrerID.bind(this);
		this.setError = this.setError.bind(this);
		this.submit = this.submit.bind(this);
		
	}
	
	render() {
		return(
			<div className="SignUp">
				{this.getSignUpForm(this.state.statusIndex)}
			</div>
		);
	}
	
	/* handles text input changes
	   Note: converts to uppercase */
	handleInputChange = (event) => {
		const target = event.target;
		const name = target.name;
		const value = target.value;
		const formattedValue = value.toUpperCase();
		
		this.setState({
			[name]: formattedValue
		});
	}
	
	// returns the appropriate signup form based on the statusIndex
	getSignUpForm = (index) => {
		
		return {
			// referral
			0: <ReferralSignUpForm
					error={this.state.error}
					errorCode={this.state.errorCode}
					setError={this.setError}
					code={this.state.code} 
					handleChange={this.handleInputChange}
					doctorSignUp={this.props.doctorSignUp}
					submit={this.submit}
				/>,
			// patient
			1: <PatientSignUpForm 
					code={this.state.code}
					referrerID={this.state.referrerID}
				/>,
		}[index]
	}
	
	// sets the statusIndex value
	setStatus (value) {
		this.setState({ 
			statusIndex: value 
		});
	}
	
	// sets the referrerId value
	setReferrerID(id) {
		this.setState({
			referrerID: id
		});
	}
	
	// general error code handler
	setError(value, code) {
		this.setState({
			error: value,
			errorCode: code
		});
	}
	
	/* 
		retrieves referrerID based on referral code and redirects to appropriate signup page
	*/
	submit() {
		const code = this.state.code;
		
		const referrerID = submitReferralCode(code);
		
		if (referrerID) {
			
			// sets the referrerID
			this.setReferrerID(referrerID);
			
			// patient referral code
			this.setStatus(1);
			
		} else {
			// invalid referral code
			this.setError(true, 'Invalid Referral Code')
		}
	}
	
}

export default ReferralSignUp;