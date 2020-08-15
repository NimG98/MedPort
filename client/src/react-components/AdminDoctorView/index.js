import React from "react";
import { uid } from 'react-uid';
import { withRouter } from "react-router";

// importing styles
import "./styles.css";

// importing components
import Header from "../Header";
import NavBar from "../NavBar";
import { Alert, Button, Popconfirm } from "antd";

// importing actions/required methods
import { getDoctor, deleteDoctor, updateDoctor, getPatientsByDoctor } from "../../actions/doctor";
import { getInstitution, getInstitutions } from "../../actions/institution";
import { redirect } from "../../actions/router"

// importing form validators
import { validateInstitutionID, validateName, validateMID, validateEmail } from "../../validators/form-validators";

class AdminDoctorView extends React.Component {
	
	// constants
	infoHeaders = ["Medical ID", "First Name", "Last Name", "Email", "Institution"];
	patientHeaders = ["Health Card", "First Name", "Last Name", "Address", "Email"];
	
	componentDidMount() {
		// get doctor info
		getDoctor(this.state.doctorID).then(async (doctor) => {
			if (doctor) {
				this.setState({
					MID: doctor.MID,
					firstName: doctor.generalProfile.firstName,
					lastName: doctor.generalProfile.lastName,
					email: doctor.generalProfile.email,
					doctorInfo: doctor,
				});
				
				this.setError(false, "");
				
				// gets institution info for doctor's insitution
				await this.getInstitutionInfo(doctor.institutionID);
				
			} else {
				this.setError(true, "An error occurred, please try again");
			}
		}).catch(error => {
			console.log(error);
			this.setError(true, "An error occurred, please try again");
		});
		
		// get list of patients that belong to doctor
		getPatientsByDoctor(this.state.doctorID).then(patients => {
			if (patients || patients === []) {
				this.setState({
					patients: patients
				});
			} else {
				this.setError(true, "An error occurred, please try again");
			}
		}).catch(error => {
			console.log(error);
			this.setError(true, "An error occurred, please try again");
		});
		
		// get list of all institutions (for editing)
		getInstitutions().then(institutions => {
			if (institutions || institutions === []) {
				this.setState({
					institutions: institutions
				});
			} else {
				this.setError(true, "An error occurred, please try again")
			}
		}).catch(error => {
			console.log(error);
			this.setError(true, "An error occurred, please try again")
		});
		
	}
	
	constructor(props) {
		super(props);
		
		this.state = {
			MID: '',
			firstName: '',
			lastName: '',
			email: '',
			institution: '',
			
			error: false,
			errorCode: '',
			edit: false,
			doctorID: props.match.params.id,
			doctorInfo: {generalProfile: {}},
			patients: [],
			institutions: [],
		}
		
		// binding functions
		this.getTableHeaders = this.getTableHeaders.bind(this);
		this.getPatientTableRows = this.getPatientTableRows.bind(this);
		this.getInstitutionInfo = this.getInstitutionInfo.bind(this);
		this.removeDoctor = this.removeDoctor.bind(this);
		this.updateDoctorInfo = this.updateDoctorInfo.bind(this);
		this.validate = this.validate.bind(this);
		this.setError = this.setError.bind(this);
		this.toggleEdit = this.toggleEdit.bind(this);
		this.handleClose = this.handleClose.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
		this.getPropertiesToChange = this.getPropertiesToChange.bind(this);
		this.resetInputs = this.resetInputs.bind(this);
		
	}
	
	render() {
		return(
			<div className="AdminDoctorView">
				<Header appComponent={this.props.appComponent}/>
				<NavBar appComponent={this.props.appComponent} />
				<div className="container">
					{this.state.error ? <Alert type="error" message={this.state.errorCode} className="alert" closable onClose={this.handleClose}></Alert> : null}
				
					<div className="doctor-info">
						<h1 className="title">
							Doctor Info
						</h1>
						
						<Popconfirm
							title="Delete this doctor?"
							onConfirm={(e) => this.removeDoctor(this.state.doctorID)}
							onCancel={(e) => {}}
							okText="Yes"
							cancelText="No"
						>
							<Button
								type="danger"
								className="delete-doctor-button"
							>Delete Doctor</Button>
						</Popconfirm>
						
						<table>
							<thead>
								<tr>{this.getTableHeaders(this.infoHeaders)}</tr>
							</thead>
							<tbody>
								<tr>	
									{this.state.edit ? <td><input name="MID" value={this.state.MID} onChange={this.handleInputChange}></input></td> : <td>{this.state.doctorInfo.MID}</td>}
									{this.state.edit ? <td><input name="firstName" value={this.state.firstName} onChange={this.handleInputChange}></input></td> : <td>{this.state.doctorInfo.generalProfile.firstName}</td>}
									{this.state.edit ? <td><input name="lastName" value={this.state.lastName} onChange={this.handleInputChange}></input></td> : <td>{this.state.doctorInfo.generalProfile.lastName}</td>}
									{this.state.edit ? <td><input name="email" value={this.state.email} onChange={this.handleInputChange}></input></td> : <td>{this.state.doctorInfo.generalProfile.email}</td>}
									{this.state.edit ? <td><select name="institution" value={this.state.institution} onChange={this.handleInputChange}>{this.state.institutions.map(institution => (<option key={uid(institution)} value={institution._id}>{institution.name}</option>))}</select></td> : <td>{this.state.doctorInfo.institution}</td>}
									{this.state.edit ? <td><Button type="primary" onClick={() => {this.updateDoctorInfo(this.state.doctorID)}}>Submit</Button></td> : <td><Button type="primary" onClick={() => this.toggleEdit()}>Edit</Button></td>}
									{this.state.edit ? <td><Button type="danger" onClick={() => { this.resetInputs(); this.toggleEdit(); }} >Cancel</Button></td> : null}
								</tr>
							</tbody>
						</table>
					</div>
					
					<div className="doctor-patients">
						<h1 className="title">
							Patients
						</h1>
					
						<table>
							<thead>
								<tr>{this.getTableHeaders(this.patientHeaders)}</tr>
							</thead>
							<tbody>
								{this.getPatientTableRows()}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		);
	}
	
	getTableHeaders(headers) {
		let tableHeaders = [];
		
		headers.map(header => (
			tableHeaders.push(<th key={uid(header)}>{header}</th>)
		));
		
		return tableHeaders;
	}
	
	getPatientTableRows() {
		let tableRows = [];
		
		this.state.patients.map(patient => (
			tableRows.push(
				<tr key={uid(patient)}>
					<td>{patient.HCN}</td>
					<td>{patient.generalProfile.firstName}</td>
					<td>{patient.generalProfile.lastName}</td>
					<td>{patient.address}</td>
					<td>{patient.generalProfile.email}</td>
					<td><Button
							type="primary"
							onClick={() => {redirect(this, "/admin/patients/" + patient._id)}}
						>View</Button>
					</td>
				</tr>
			)
		));
		
		return tableRows;
	}
	
	// gets insitution info from institutionID
	getInstitutionInfo(institutionID) {
		return getInstitution(institutionID).then(institution => {
			if (institution) {
				const newDoctorInfo = {...this.state.doctorInfo};
				newDoctorInfo.institution = institution.name;
				
				this.setState({
					institution: institution._id,
					doctorInfo: newDoctorInfo
				});
			} else {
				this.setError(true, "An error occurred, please try again");
			}
		}).catch(error => {
			console.log(error);
			this.setError(true, "An error occurred, please try again");
		});
	}
	
	// deletes doctor with a specific id
	removeDoctor(doctorID) {
		// api call
		deleteDoctor(doctorID).then(doctorInfo => {
			if (doctorInfo) {
				redirect(this, "/admin/doctors");
			} else {
				// set error message
				this.setError(true, "An error occurred, please try again.");
			}
		}).catch(error => {
			console.log(error);
			this.setError(true, "An error occurred, please try again.");
		});		
	}
	
	updateDoctorInfo(doctorID) {
		const valid = this.validate();
		
		if (valid) {
			updateDoctor(doctorID, this.getPropertiesToChange()).then(async (doctor) => {
				if (doctor) {
					// set doctor info
					this.setState({
						MID: doctor.MID,
						firstName: doctor.generalProfile.firstName,
						lastName: doctor.generalProfile.lastName,
						email: doctor.generalProfile.email,
						doctorInfo: doctor
					});
					
					// get doctor's institution info
					await this.getInstitutionInfo(doctor.institutionID);
					
					// toggle edit
					this.toggleEdit();
				} else {
					this.setError(true, "An error occurred, please try again.");
				}
			}).catch(error => {
				console.log(error);
				this.setError(true, "An error occurred, please try again.");
			});
		}
	}
	
	// validates inputs on submission
	validate() {
		
		const valid = (
			validateName('firstName', this.state.firstName, (name, val, msg) => this.setError(val, msg)) &&
			validateName('lastName',this.state.lastName, (name, val, msg) => this.setError(val, msg)) &&
			validateMID('MID', this.state.MID, (name, val, msg) => this.setError(val, msg)) &&
			validateEmail('email', this.state.email, (name, val, msg) => this.setError(val, msg)) &&
			validateInstitutionID('institution', this.state.institution, (name, val, msg) => this.setError(val, msg))
		);
		
		return valid;
	}
	
	setError(value, message) {
		this.setState({
			error: value,
			errorCode: message
		});
	}
	
	toggleEdit() {
		this.setState({
			edit: !this.state.edit
		});
	}
	
	// antd alert close handler
	handleClose = () => {
		this.setState({
			error: false,
			errorCode: ''
		});
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
	
	getPropertiesToChange = () => {
		return [
			{"op": "replace", "path": "/generalProfile/firstName", "value": this.state.firstName},
			{"op": "replace", "path": "/generalProfile/lastName", "value": this.state.lastName},
			{"op": "replace", "path": "/generalProfile/email", "value": this.state.email},
			{"op": "replace", "path": "/MID", "value": this.state.MID},
			{"op": "replace", "path": "/institutionID", "value": this.state.institution}
		];
	}
	
	resetInputs() {
		this.setState({
			firstName: this.state.doctorInfo.generalProfile.firstName,
			lastName: this.state.doctorInfo.generalProfile.lastName,
			email: this.state.doctorInfo.generalProfile.email,
			MID: this.state.doctorInfo.MID,
			institution: this.state.doctorInfo.institution,
		});
	}
}

export default withRouter(AdminDoctorView);