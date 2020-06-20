import React from "react";

import "./styles.css";

// importing components
import DoctorSignUpForm from "./../DoctorSignUpForm";

// importing actions/required methods
// import { addDoctor } from "../../actions/app";

// doctor signup component (controls the multi-step registration process)
class DoctorSignUp extends React.Component {
	
	// possible status values
	status = ['registration', 'select instition', 'create instituton'];
	
	constructor(props) {
		super(props);
		
		this.state = {
			firstName: '',
			lastName: '',
			email: '',
			password: '',
			MID: '',
			institutionID: '',
			statusIndex: 0,
		}
		
		// binding functions
		this.getSignUpForm = this.getSignUpForm.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
		this.nextStatus = this.nextStatus.bind(this);
	}
	
	render() {
		
		const { appComponent } = this.props;
		
		return (
			<div className="DoctorSignUp">
				{this.getSignUpForm(this.state.statusIndex)}
			</div>
		);
	}
	
	// handles text input changes 
	handleInputChange = (event) => {
		const target = event.target;
		const name = target.name;
		const value = target.value;
		
		this.setState({
			[name]: value
		});
	}
	
	// returns the appropriate signup form based on the statusIndex
	getSignUpForm = (index) => {
		
		return {
			// doctor registration
			0: <DoctorSignUpForm 
				firstName={this.state.firstName}
				lastName={this.state.lastName}
				email={this.state.email}
				password={this.state.password}
				MID={this.state.MID}
				institutionID={this.state.institutionID}
				handleChange={this.handleInputChange}
				next={this.nextStatus}
			   />,
			// institution selection
			1: <p>Institution Selection</p>,
			// institution registration
			2: <p>Institution Registation</p>,
		}[index];
	}
	
	// sets next statusIndex for next status value
	nextStatus() {
		const newIndex = (this.state.statusIndex + 1) % 3;
		this.setState({
			statusIndex: newIndex
		});
	}
	
}

export default DoctorSignUp;