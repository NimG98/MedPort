import React from "react";

import "./styles.css";

// importing components
import ReferralSignUpForm from "../ReferralSignUpForm";
import PatientSignUpForm from "../PatientSignUpForm";
import SecretarySignUpForm from "../SecretarySignUpForm";

// importing actions/required methods
import { submitReferralCode, removeReferralCode } from "../../actions/app";

class ReferralSignUp extends React.Component {
	
	status = ['referral', 'secretary', 'patient']
	
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
		this.deleteCode = this.deleteCode.bind(this);
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
					code={this.state.code} 
					handleChange={this.handleInputChange}
					doctorSignUp={this.props.doctorSignUp}
					submit={this.submit}
				/>,
			// patient
			1: <PatientSignUpForm 
					deleteCode={this.deleteCode}
					referrerID={this.state.referrerID}
					appComponent={this.props.appComponent}
				/>,
			// secretary
			2: <SecretarySignUpForm 
					deleteCode={this.deleteCode}
					referrerID={this.state.referrerID}
					appComponent={this.props.appComponent}
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
	
	// deletes the referral code on signup success
	deleteCode() {
		removeReferralCode(this.props.appComponent, this.state.code)
		
		this.setState({
			code: ''
		});
	}
	
	/* 
		retrieves referrerID based on referral code and redirects to appropriate signup page
	*/
	submit() {
		const code = this.state.code;
		
		const referrerID = submitReferralCode(this.props.appComponent, this.state.code);
		
		if (referrerID) {
			
			if (code.startsWith('P')) {
				// sets the referrerID
				this.setReferrerID(referrerID);
				
				// secretary referral code
				this.setStatus(1);
			} else if (code.startsWith('S')) {
				// sets the referrerID
				this.setReferrerID(referrerID);
				
				// patient referral code
				this.setStatus(2);
			} else {
				// invalid referral code
				this.setError(true, 'An Error Occurred');
			}
		} else {
			// wrong referral code
			this.setError(true, 'Invalid Referral Code')
		}
	}
	
}

export default ReferralSignUp;