import React from 'react';
import { uid } from 'react-uid';

import './styles.css';

// importing actions/required methods
import { getInstitutions } from "../../actions/app";

// importing form validators
import { validateInstitutionID } from "../../validators/form-validators";

// component for selecting a preexisiting institution
class InstitutionSelector extends React.Component {
	
	constructor(props) {
		super(props);
		
		this.state = {
			institutions: [],
			
			errors: {
				institutionID: false,
			},
			
			errorCodes: {
				institutionID: '',
			},
		}
		
		// binding functions
		this.submit = this.submit.bind(this);
		this.validate = this.validate.bind(this);
		this.setError = this.setError.bind(this);
	}
	
	componentDidMount() {
		const data = getInstitutions();
		
		this.setState({
			institutions: data
		});
	}
	
	render() {
		
		const {
			institutionID,
			handleChange,
			next,
			back
		} = this.props;
		
		return (
			<div className="InstitutionSelector">
				<form className="main_form" onSubmit={this.submit}>
					<div className="title">
						<label><b>Select Your Institution</b></label>
					</div>
				
					<div className="container">
						<select
							name="institutionID"
							value={institutionID}
							className={this.state.errors.institutionID ? 'select-error' : null}
							onChange={handleChange}
						>
							{/* default selector value*/}
							<option value="" disabled>Choose Here</option>
							
							{/* iterates over institutions array and displays options */}
							{this.state.institutions.map(institution => (
								<option 
									key={uid(institution)} 
									value={institution.id}>
									{institution.name}
								</option>
							))}
						</select>
						{this.state.errors.institutionID ? <p className="error-message" >{this.state.errorCodes.institutionID}</p> : null}
					</div>
					
					<button type="button" className="back" onClick={back}>Back</button>
					<button type="submit" className="submit">Submit</button>
				</form>
				
				<div className="secondary_form">
					<p>Can't find your institution? </p>
					<a type="button" className="create" onClick={next}>Create</a>
				</div>
			</div>
		);
	}
	
	// onSubmit event handler
	submit(event) {
		// prevents page reload
		event.preventDefault();
		
		const valid = this.validate();
		
		if (valid) {
			this.props.submit();
		}
	}
	
	// validates inputs on submission
	validate() {
		
		const valid = (
			validateInstitutionID(
				'institutionID', 
				this.props.institutionID, 
				this.setError
			)
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

export default InstitutionSelector;