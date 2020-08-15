import React from 'react';
import { uid } from 'react-uid';

import './styles.css';

//importing components
import AdminDoctorSelector from "../AdminDoctorSelector";
import PatientSignUpForm from "../PatientSignUpForm";

// component for selecting a preexisiting institution
class AdminPatientSignUp extends React.Component {
	
	constructor(props) {
		super(props);
		
		this.state = {
			doctorID: '',
			
			statusIndex: 0,
		}
		
		// binding functions
		this.setStatus = this.setStatus.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
	}
	
	render() {
		
		const {
			back
		} = this.props;
		
		return (
			<div className="AdminPatientSignUp">
				{this.getSignUpForm(this.state.statusIndex)}
			</div>
		);
	}
	
	// returns the appropriate signup form based on the statusIndex
	getSignUpForm = (index) => {
		
		return {
			// referral
			0: <AdminDoctorSelector 
					handleChange={this.handleInputChange}
					doctorID={this.state.doctorID}
					back={this.props.back}
					submit={() => this.setStatus(1)}
				/>,
			// patient
			1: <PatientSignUpForm 
					code=""
					referrerID={this.state.doctorID}
					back={() => this.setStatus(0)}
					submit={this.props.submit}
				/>,
		}[index]
	}
	
	// sets the statusIndex value
	setStatus (value) {
		this.setState({ 
			statusIndex: value 
		});
	}
	
	/* handles text input changes */
	handleInputChange = (event) => {
		const target = event.target;
		const name = target.name;
		const value = target.value;
		
		this.setState({
			[name]: value
		});
	}
	
}

export default AdminPatientSignUp;