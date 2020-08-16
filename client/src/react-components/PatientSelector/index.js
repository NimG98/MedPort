import React from 'react';
import { uid } from 'react-uid';

import './styles.css';

// importing actions/required methods
import { getPatients } from "../../actions/patient";

// importing form validators
import { validatePatientID } from "../../validators/form-validators";

// component for selecting a preexisiting institution
class PatientSelector extends React.Component {
	
	constructor(props) {
		super(props);
		
		this.state = {
			patients: [],
			
			errors: {
				patientID: false,
			},
			
			errorCodes: {
				patientID: '',
			},
		}
		
		// binding functions
		this.submit = this.submit.bind(this);
		this.validate = this.validate.bind(this);
		this.setError = this.setError.bind(this);
	}
	
	componentDidMount() {
		// a promise
		getPatients().then(data => {
			this.setState({
				patients: data
			});
		}).catch(error => {
			console.log(error);
		});
	}
	
	render() {
		
		const {
			patientID,
			handleChange,
		} = this.props;
		
		return (
			<div className="PatientSelector">
				<form className="main_form" onSubmit={this.submit}>
					<div className="title">
						<label><b>Select Patient</b></label>
					</div>
				
					<div className="container">
						<table>
							<thead>
								<tr>
									<th>Select Patient</th>
									<th>
										<select
											name="patientID"
											value={patientID}
											className={this.state.errors.patientID ? 'select-error' : null}
											onChange={handleChange}
										>
											{/* default selector value*/}
											<option value="" disabled>Choose Here</option>
											
											{/* iterates over institutions array and displays options */}
											{this.state.patients.map(patient => (
												<option 
													key={uid(patient)} 
													value={patient._id}>
													{patient.generalProfile.firstName + " " + patient.generalProfile.lastName}
												</option>
											))}
										</select>
									</th>
									<th>
										<button type="submit" className="submit">Submit</button>
									</th>
								</tr>
							</thead>
						</table>
					
						{this.state.errors.patientID ? <p className="error-message" >{this.state.errorCodes.patientID}</p> : null}
					</div>
				</form>
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
			validatePatientID(
				'patientID', 
				this.props.patientID, 
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

export default PatientSelector;