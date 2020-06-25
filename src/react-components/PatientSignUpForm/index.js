import React from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";

import "./styles.css";

// importing actions/required methods
import { addPatient, createPatientID} from "../../actions/app";
import { redirect } from "../../actions/router";

class PatientSignUpForm extends React.Component {
	
	constructor(props) {
		super(props);
		
		this.state = {
			firstName: '',
			lastName: '',
			address: '',
			postalCode: '',
			HCN: '',
			email: '',
			password: '',
		}
		
		// binding functions
		this.handleInputChange = this.handleInputChange.bind(this);
		this.createPatient = this.createPatient.bind(this);
		this.submit = this.submit.bind(this);
	}
	
	render() {
		return (
			<form className="PatientSignUpForm" onSubmit={this.submit}>
				<div className="title">
					<h2><b>Patient Sign Up</b></h2>
				</div>
			
				<div className="container">
					<label>First Name</label>
					<input 
						type='text' 
						name='firstName' 
						placeholder='First Name'
						value={this.state.firstName}
						onChange={this.handleInputChange} 
						required />
							
					<label>Last Name</label>
					<input 
						type='text' 
						name='lastName' 
						placeholder='Last Name'
						value={this.state.lastName}
						onChange={this.handleInputChange} 
						required />
							
					<label>Address</label>
					<input 
						type='text' 
						name='address' 
						placeholder='Address'
						value={this.state.address}
						onChange={this.handleInputChange} 
						required />
							
					<label>Postal Code</label>
					<input 
						type='text' 
						name='postalCode' 
						placeholder='Postal Code'
						value={this.state.postalCode}
						onChange={this.handleInputChange} 
						required />
							
					<label>Health Card Number</label>
					<input 
						type='text' 
						name='HCN' 
						placeholder='Health Card Number'
						value={this.state.HCN}
						onChange={this.handleInputChange} 
						required />
							
					<label>Email</label>
					<input 
						type='email' 
						name='email' 
						placeholder='Email'
						value={this.state.email}
						onChange={this.handleInputChange} 
						required />
							
					<label>Password</label>
					<input 
						type='password' 
						name='password' 
						placeholder='Password'
						value={this.state.password}
						onChange={this.handleInputChange} 
						required />
				</div>
					
				<Link to="/">
					<button className="login">Login</button>
				</Link>	
				
				<button type="submit" className="submit">Submit</button>
				
			</form>
		);
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
	
	createPatient = () => {
		return({
			id: createPatientID(this.props.appComponent),
			firstName: this.state.firstName,
			lastName: this.state.lastName,
			address: this.state.address,
			postalCode: this.state.postalCode,
			HCN: this.state.HCN,
			email: this.state.email,
			password: this.state.password,
			doctorID: this.props.referrerID,
		});
	}
	
	submit() {
		const patient = this.createPatient();
		
		addPatient(this.props.appComponent, patient);
		
		this.props.deleteCode();
		
		redirect(this, "/");
	}
}

export default withRouter(PatientSignUpForm);