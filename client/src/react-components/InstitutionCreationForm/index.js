import React from "react";

import "./styles.css";

// importing actions/required methods
import { addInstitution } from "../../actions/institution";

// import form validators
import { validateName, validateAddress, validatePostalCode, validatePhoneNumber } from "../../validators/form-validators";

//
class InstitutionCreationForm extends React.Component {
	
	constructor(props) {
		super(props);
		
		this.state = {
			name: '',
			address: '',
			postalCode: '',
			phoneNumber: '',
			
			errors: {
				name: false,
				address: false,
				postalCode: false,
				phoneNumber: false,
			},
			
			errorCodes: {
				name: '',
				address: '',
				postalCode: '',
				phoneNumber: '',
			},
		}
		
		// binding functions
		this.handleInputChange = this.handleInputChange.bind(this);
		this.createInstitution = this.createInstitution.bind(this);
		this.submit = this.submit.bind(this);
		this.validate = this.validate.bind(this);
		this.setError = this.setError.bind(this);
	}
	
	render() {
		
		const {
				back,
			} = this.props;
		
		return(
			<form className="InstitutionCreationForm" onSubmit={this.submit}>
				<div className="title">
					<label><b>Create an Institution</b></label>
				</div>
			
				<div className="container">
					<label>Name</label>
					<input 
						type='text' 
						name='name' 
						className={this.state.errors.name ? 'input-error' : null}
						placeholder='Name'
						value={this.state.name}
						onChange={this.handleInputChange} 
					/>
					{this.state.errors.name ? <p className="error-message" >{this.state.errorCodes.name}</p> : null}
					
					<label>Address</label>					
					<input 
						type='text' 
						name='address' 
						className={this.state.errors.address ? 'input-error' : null}
						placeholder='Address'
						value={this.state.address}
						onChange={this.handleInputChange} 
					/> 
					{this.state.errors.address ? <p className="error-message" >{this.state.errorCodes.address}</p> : null}
						
					<label>Postal Code</label>
					<input 
						type='text' 
						name='postalCode'
						className={this.state.errors.postalCode ? 'input-error' : null}
						placeholder='Postal Code'
						value={this.state.postalCode}
						onChange={this.handleInputChange} 
					/>
					{this.state.errors.postalCode ? <p className="error-message" >{this.state.errorCodes.postalCode}</p> : null}
					
					<label>Phone Number</label>
					<input 
						type='text' 
						name='phoneNumber' 
						className={this.state.errors.phoneNumber ? 'input-error' : null}
						placeholder='Phone Number'
						value={this.state.phoneNumber}
						onChange={this.handleInputChange} 
					/>
					{this.state.errors.phoneNumber ? <p className="error-message" >{this.state.errorCodes.phoneNumber}</p> : null}
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
		
		// validate form inputs
		const valid = this.validate();
		
		if (valid) {
			// creates the new institution object
			const institution = this.createInstitution();
			
			// server call - returns institution id
			const institutionID = addInstitution(institution);
			
			// invoke submission in parent component
			this.props.submit(institutionID);
		}
	}
	
	// validates inputs on submission
	validate() {
		
		const valid = (
			validateName('name', this.state.name, this.setError) &&
			validateAddress('address', this.state.address, this.setError) &&
			validatePostalCode('postalCode', this.state.postalCode, this.setError) &&
			validatePhoneNumber('phoneNumber', this.state.phoneNumber, this.setError)
		);
		
		return valid;
	}
		
	setError(name, value, message) {
		this.setState(prevState => ({
			errors: {
				...prevState.errors,
				[name]: value,
			},
			errorCodes: {
				...prevState.errorCodes,
				[name]: message,
			}
		}));
	}
}

export default InstitutionCreationForm;