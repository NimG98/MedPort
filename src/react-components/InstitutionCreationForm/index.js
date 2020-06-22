import React from "react";

import "./styles.css";

// importing actions/required methods
import { addInstitution, createInstitutionID } from "../../actions/app";

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
			<div className="InstitutionCreationForm">
				<label>Name</label>
				<input 
					type='text' 
					name='name' 
					value={this.state.name}
					onChange={this.handleInputChange} />
				
				<label>Address</label>					
				<input 
					type='text' 
					name='address' 
					value={this.state.address}
					onChange={this.handleInputChange} /> 
					
				<label>Postal Code</label>
				<input 
					type='text' 
					name='postalCode'
					value={this.state.postalCode}
					onChange={this.handleInputChange} />
				
				<label>Phone Number</label>
				<input 
					type='tel' 
					name='phoneNumber' 
					value={this.state.phoneNumber}
					onChange={this.handleInputChange} />
				
				<button onClick={back}>Back</button>
				<button onClick={this.submit}>Submit</button>
			</div>
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
			id: createInstitutionID(this.props.appComponent),
		});
	}
	
	// submit new institution information
	submit() {
		const institution = this.createInstitution();
		
		// add institiution to app component institutions list
		addInstitution(this.props.appComponent, institution);
		
		// set doctor's institutionID
		this.props.setInstitutionID(institution.id);
		
		// invoke submission in parent component
		this.props.submit();
	}
}

export default InstitutionCreationForm;