import React from "react";

import "./styles.css";

// importing components
import DoctorSignUp from "./../DoctorSignUp";
import ReferralSignUp from "../ReferralSignUp";

/* Component for user registration */
class SignUp extends React.Component {
	
	// list of all possible status values
	status = ['referral', 'doctor'];
	
	constructor(props) {
		super(props);
		
		this.state = {
			statusIndex: 0,
		};
		
		// binding functions
		this.getSignUpForm = this.getSignUpForm.bind(this);
		this.setStatus = this.setStatus.bind(this);
	}
	
	render() {
		return (
			<div className="SignUp">
				{this.getSignUpForm(this.state.statusIndex)}
			</div>
		);
	}
	
	// returns the appropriate signup form based on the statusIndex
	getSignUpForm = (index) => {
		
		return {
			// referral
			0: <ReferralSignUp
					appComponent={this.props.appComponent} 
					doctorSignUp={() => this.setStatus(1)}
				/>,
			// doctor
			1: <DoctorSignUp appComponent={this.props.appComponent} />,
		}[index]
	}
	
	// sets the statusIndex value
	setStatus (value) {
		this.setState({ statusIndex: value });
	}

}

export default SignUp;