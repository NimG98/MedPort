import React from "react";

import "./styles.css";

// importing components
import DoctorSignUp from "./../DoctorSignUp";
import ReferralForm from "../ReferralForm";

/* Component for user registration */
class SignUp extends React.Component {
	
	// list of all possible status values
	status = ['referral', 'doctor', 'secretary', 'patient'];
	
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
				{this.state.statusIndex ? null: <button onClick={ () => this.nextStatus(this.state.statusIndex) }>Are you a Physician?</button>}
				{/* for testing */}
				<button onClick={ () => this.nextStatus(this.state.statusIndex) }>{this.status[this.state.statusIndex]}</button>
			</div>
		);
	}
	
	// returns the appropriate signup form based on the statusIndex
	getSignUpForm = (index) => {
		
		return {
			// referral
			0: <ReferralForm 
					appComponent={this.props.appComponent} 
					setStatus={this.setStatus}
				/>,
			// doctor
			1: <DoctorSignUp appComponent={this.props.appComponent} />,
			// secretary
			2: <p>Secretary Signup</p>,
			// patient
			3: <p>Patient Signup.</p>,
		}[index]
	}
	
	// sets the statusIndex value
	setStatus (value) {
		this.setState({ statusIndex: value });
	}
	
	// sets statusIndex to the next status value
	// for testing
	nextStatus(statusIndex) {
		this.setStatus((this.state.statusIndex + 1) % 4);
	}
}

export default SignUp;