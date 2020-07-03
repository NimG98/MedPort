import React from "react";
import { withRouter } from "react-router";

import "./styles.css";

// importing components
import Header from "../Header";
import DoctorSignUp from "../DoctorSignUp";
import ReferralSignUp from "../ReferralSignUp";

// importing actions/required methods
import { redirect } from "../../actions/router";

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
				<Header appComponent={this.props.appComponent}/>
				{this.getSignUpForm(this.state.statusIndex)}
			</div>
		);
	}
	
	// returns the appropriate signup form based on the statusIndex
	getSignUpForm = (index) => {
		
		return {
			// referral
			0: <ReferralSignUp 
					doctorSignUp={() => this.setStatus(1)}
				/>,
			// doctor
			1: <DoctorSignUp 
					submit={() => redirect(this, "/")}
					back={() => this.setStatus(0)}
			   />,
		}[index]
	}
	
	// sets the statusIndex value
	setStatus (value) {
		this.setState({ statusIndex: value });
	}

}

export default withRouter(SignUp);