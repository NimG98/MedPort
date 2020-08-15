import React from 'react';
import { uid } from 'react-uid';

import './styles.css';

// importing actions/required methods
import { getDoctors } from "../../actions/doctor";

// importing form validators
import { validateDoctorID } from "../../validators/form-validators";

// component for selecting a preexisiting institution
class AdminDoctorSelector extends React.Component {
	
	constructor(props) {
		super(props);
		
		this.state = {
			doctors: [],
			
			errors: {
				doctorID: false,
			},
			
			errorCodes: {
				doctorID: '',
			},
		}
		
		// binding functions
		this.submit = this.submit.bind(this);
		this.validate = this.validate.bind(this);
		this.setError = this.setError.bind(this);
	}
	
	componentDidMount() {
		// a promise
		getDoctors().then(data => {
			this.setState({
				doctors: data
			});
		}).catch(error => {
			console.log(error);
		});
	}
	
	render() {
		
		const {
			doctorID,
			handleChange,
			back,
		} = this.props;
		
		return (
			<div className="AdminDoctorSelector">
				<form className="main_form" onSubmit={this.submit}>
					<div className="title">
						<label><b>Select Patient's Doctor</b></label>
					</div>
				
					<div className="container">
						<select
							name="doctorID"
							value={doctorID}
							className={this.state.errors.doctorID ? 'select-error' : null}
							onChange={handleChange}
						>
							{/* default selector value*/}
							<option value="" disabled>Choose Here</option>
							
							{/* iterates over institutions array and displays options */}
							{this.state.doctors.map(doctor => (
								<option 
									key={uid(doctor)} 
									value={doctor._id}>
									{doctor.generalProfile.firstName + " " + doctor.generalProfile.lastName}
								</option>
							))}
						</select>
						{this.state.errors.doctorID ? <p className="error-message" >{this.state.errorCodes.doctorID}</p> : null}
					</div>
					
					<button type="button" className="back" onClick={back}>Back</button>
					<button type="submit" className="submit">Submit</button>
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
			validateDoctorID(
				'doctorID', 
				this.props.doctorID, 
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

export default AdminDoctorSelector;