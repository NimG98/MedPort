import React from "react";

import "./styles.css";

// importing actions/required methods
import { addInstitution } from "../../actions/app";

//
class InstitutionCreationForm extends React.Component {
	
	constructor(props) {
		super(props);
		
		this.state = {
			name: '',
			address: '',
			postalCode: '',
			phoneNumber: ''
		}
		
		// binding functions
		this.handleInputChange = this.handleInputChange.bind(this);
		this.createInstitution = this.createInstitution.bind(this);
		this.submit = this.submit.bind(this);
	}
	
	render() {
		
		const {
				back,
			} = this.props;
		
		return(
			<form className="InstitutionCreationForm" onSubmit={this.submit}>
				<div className="title">
					<h2><b>Create an Institution</b></h2>
				</div>
			
				<div className="container">
					<label>Name</label>
					<input 
						type='text' 
						name='name' 
						placeholder='Name'
						value={this.state.name}
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
					
					<label>Phone Number</label>
					<input 
						type='tel' 
						name='phoneNumber' 
						placeholder='Phone Number'
						value={this.state.phoneNumber}
						onChange={this.handleInputChange} 
						required />
				</div>
				
				<button type="button" className="back" onClick={back}>Back</button>
				<button type="submit" className="submit">Submit</button>
			</form>
		);
	}
	
	// handles text input changes
	handleInputChange(event) {
		const target = event.target;
		const name = target.name;
		const value = target.value;
		
		this.setState({
			[name]: value
		});
	}
	
	// creates institution object
	createInstitution = () => {
		return({
			name: this.state.name,
			address: this.state.address,
			postalCode: this.state.postalCode,
			phoneNumber: this.state.phoneNumber,
		});
	}
	
	// submit new institution information
	submit(event) {
		// prevents page reload
		event.preventDefault();
		
		// creates the new institution object
		const institution = this.createInstitution();
		
		// server call - returns institution id
		const institutionID = addInstitution(institution);
		
		// invoke submission in parent component
		this.props.submit(institutionID);
	}
}

export default InstitutionCreationForm;