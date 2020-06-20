import React from "react";

import "./styles.css";

// import DoctorSignUp from "./../DoctorSignUp";

/* Component for user registration */
class SignUp extends React.Component {
	
	// list of all possible status values
	status = ['referral', 'doctor', 'secretary', 'patient'];
	
	constructor(props) {
		super(props);
		
		this.state = {
			statusIndex: 0,
		};
	}
	
	render() {
		return (
			<div className="SignUp">
				{this.getSignUpForm(this.state.statusIndex)}
				{/* for testing */}
				<button onClick={ () => this.nextStatus(this.state.statusIndex) }>{this.status[this.state.statusIndex]}</button>
			</div>
		);
	}
	
	// returns the appropriate signup form based on the statusIndex
	getSignUpForm(index) {
		return(
			<React.Fragment>
				{
					{
						// referral
						0: <p>Enter Referral Code.</p>,
						// doctor
						// 1: <DoctorSignUp appComponent={this.props.appComponent} />,
						1: <p>Doctor SignUp</p>,
						// secretary
						2: <p>Secretary Signup</p>,
						// patient
						3: <p>Patient Signup.</p>,
					}[index]
				}
			</React.Fragment>
		)
	}
	
	// sets the statusIndex value
	setStatus (value) {
		this.setState({ statusIndex: value });
	}
	
	// sets statusIndex to the next status value
	// for testing
	nextStatus (statusIndex) {
		this.setStatus((this.state.statusIndex + 1) % 4);
	}
}

export default SignUp;