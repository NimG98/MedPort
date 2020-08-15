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
import { getPatient, deletePatient, updatePatient } from "../../actions/patient";
import { getDoctor, getDoctors } from "../../actions/doctor";
import { redirect } from "../../actions/router";

// importing validators
import { validateName, validateAddress, validatePostalCode, validateHCN, validateEmail, validateDoctorID} from "../../validators/form-validators";

class AdminPatientView extends React.Component {
	// constants
	infoHeaders = ["Health Card", "First Name", "Last Name", "Email", "Address", "Postal Code", "Doctor"];
	
	componentDidMount() {
		getPatient(this.state.patientID).then(async (patient) => {
			if (patient) {
				this.setState({
					HCN: patient.HCN,
					firstName: patient.generalProfile.firstName,
					lastName: patient.generalProfile.lastName,
					email: patient.generalProfile.email,
					address: patient.address,
					postalCode: patient.postalCode,
					patientInfo: patient,
				});
				
				this.setError(false, "");
				
				// gets doctor info for patient's doctor
				await this.getDoctorInfo(patient.doctor);
				
			} else {
				this.setError(true, "An error occurred, please try again");
			}
		}).catch(error => {
			console.log(error);
			this.setError(true, "An error occurred, please try again");
		});
		
		// get list of all doctors (for editing)
		getDoctors().then(doctors => {
			if (doctors || doctors === []) {
				this.setState({
					doctors: doctors
				});
			} else {
				this.setError(true, "An error occurred, please try again");
			}
		}).catch(error => {
			console.log(error);
			this.setError(true, "An error occurred, please try again");
		})
	}
	
	constructor(props) {
		super(props);
		this.props.history.push("/admin/patients/" + props.match.params.id);
		
		this.state = {
			HCN: '',
			firstName: '',
			lastName: '',
			email: '',
			address: '',
			postalCode: '',
			doctorID: '',
			
			error: false,
			errorCode: '',
			edit: false,
			patientID: props.match.params.id,
			patientInfo: {generalProfile: {}},
			doctors: [],
		}
		
		// binding functions
		this.getTableHeaders = this.getTableHeaders.bind(this);
		this.getDoctorInfo = this.getDoctorInfo.bind(this);
		this.removePatient = this.removePatient.bind(this);
		this.setError = this.setError.bind(this);
		this.toggleEdit = this.toggleEdit.bind(this);
		this.handleClose = this.handleClose.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
		this.updatePatientInfo = this.updatePatientInfo.bind(this);
		this.getPropertiesToChange = this.getPropertiesToChange.bind(this);
		this.validate = this.validate.bind(this);
		this.resetInputs = this.resetInputs.bind(this);
		
	}
	
	render() {
		return(
			<div className="AdminPatientView">
				<Header appComponent={this.props.appComponent}/>
				<NavBar appComponent={this.props.appComponent} />
				<div className="container">
					{this.state.error ? <Alert type="error" message={this.state.errorCode} className="alert" closable onClose={this.handleClose}></Alert> : null}
				
					<div className="patient-info">
						<h1 className="title">
							Patient Info
						</h1>
						
						<Popconfirm
							title="Delete this patient?"
							onConfirm={(e) => this.removePatient(this.state.patientID)}
							onCancel={(e) => {}}
							okText="Yes"
							cancelText="No"
						>
							<Button
								type="danger"
								className="delete-patient-button"
							>Delete Patient</Button>
						</Popconfirm>
						
						<table>
							<thead>
								<tr>{this.getTableHeaders(this.infoHeaders)}</tr>
							</thead>
							<tbody>
								<tr>	
									{this.state.edit ? <td><input name="HCN" value={this.state.HCN} onChange={this.handleInputChange}></input></td> : <td>{this.state.patientInfo.HCN}</td>}
									{this.state.edit ? <td><input name="firstName" value={this.state.firstName} onChange={this.handleInputChange}></input></td> : <td>{this.state.patientInfo.generalProfile.firstName}</td>}
									{this.state.edit ? <td><input name="lastName" value={this.state.lastName} onChange={this.handleInputChange}></input></td> : <td>{this.state.patientInfo.generalProfile.lastName}</td>}
									{this.state.edit ? <td><input name="email" value={this.state.email} onChange={this.handleInputChange}></input></td> : <td>{this.state.patientInfo.generalProfile.email}</td>}
									{this.state.edit ? <td><input name="address" value={this.state.address} onChange={this.handleInputChange}></input></td> : <td>{this.state.patientInfo.address}</td>}
									{this.state.edit ? <td><input name="postalCode" value={this.state.postalCode} onChange={this.handleInputChange}></input></td> : <td>{this.state.patientInfo.postalCode}</td>}
									{this.state.edit ? <td><select name="doctorID" value={this.state.doctorID} onChange={this.handleInputChange}>{this.state.doctors.map(doctor => (<option key={uid(doctor)} value={doctor._id}>{doctor.generalProfile.firstName + " " + doctor.generalProfile.lastName}</option>))}</select></td> : <td>{this.state.patientInfo.doctorName}</td>}
									{this.state.edit ? <td><Button type="primary" onClick={() => {this.updatePatientInfo(this.state.patientID)}}>Submit</Button></td> : <td><Button type="primary" onClick={() => this.toggleEdit()}>Edit</Button></td>}
									{this.state.edit ? <td><Button type="danger" onClick={() => { this.resetInputs(); this.toggleEdit(); }} >Cancel</Button></td> : null}
								</tr>
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
	
	getDoctorInfo(doctorID) {
		return getDoctor(doctorID).then(doctor => {
			if (doctor) {
				const newPatientInfo = {...this.state.patientInfo};
				newPatientInfo.doctorName = doctor.generalProfile.firstName + " " + doctor.generalProfile.lastName;
				
				this.setState({
					doctorID: doctor._id,
					patientInfo: newPatientInfo
				});
			} else {
				this.setError(true, "An error occurred, please try again");
			}
		}).catch(error => {
			console.log(error);
			this.setError(true, "An error occurred, please try again");
		});
	}
	
	// deletes patient with a specific id
	removePatient(patientID) {
		// api call
		const success = deletePatient(patientID);
		
		if (success) {
			redirect(this, "/admin/patients");
		} else {
			// set error message
			this.setError(true, "An error occurred, please try again.");
		}
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
	
	updatePatientInfo(patientID) {
		const valid = this.validate();
		
		if (valid) {
			updatePatient(patientID, this.getPropertiesToChange()).then(async (patient) => {
				if (patient) {
					// set patient info
					this.setState({
						HCN: patient.HCN,
						firstName: patient.generalProfile.firstName,
						lastName: patient.generalProfile.lastName,
						email: patient.generalProfile.email,
						address: patient.address,
						postalCode: patient.postalCode,
						patientInfo: patient,
					});
					
					// gets doctor info for patient's doctor
					await this.getDoctorInfo(patient.doctor);
					
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
	
	getPropertiesToChange = () => {
		return [
			{"op": "replace", "path": "/generalProfile/firstName", "value": this.state.firstName},
			{"op": "replace", "path": "/generalProfile/lastName", "value": this.state.lastName},
			{"op": "replace", "path": "/generalProfile/email", "value": this.state.email},
			{"op": "replace", "path": "/HCN", "value": this.state.HCN},
			{"op": "replace", "path": "/address", "value": this.state.address},
			{"op": "replace", "path": "/postalCode", "value": this.state.postalCode},
			{"op": "replace", "path": "/doctor", "value": this.state.doctorID}
		];
	}
	
	// validates inputs on submission
	validate() {
		
		const valid = (
			validateName('firstName', this.state.firstName, (name, val, msg) => this.setError(val, msg)) &&
			validateName('lastName',this.state.lastName, (name, val, msg) => this.setError(val, msg)) &&
			validateHCN('HCN', this.state.HCN, (name, val, msg) => this.setError(val, msg)) &&
			validateEmail('email', this.state.email, (name, val, msg) => this.setError(val, msg)) &&
			validateAddress('address', this.state.address, (name, val, msg) => this.setError(val, msg)) &&
			validatePostalCode('postalCode', this.state.postalCode, (name, val, msg) => this.setError(val, msg)) &&
			validateDoctorID('doctorID', this.state.doctorID, (name, val, msg) => this.setError(val, msg)) 
		);
		
		return valid;
	}
	
	resetInputs() {
		this.setState({
			firstName: this.state.patientInfo.generalProfile.firstName,
			lastName: this.state.patientInfo.generalProfile.lastName,
			address: this.state.patientInfo.address,
			postalCode: this.state.patientInfo.postalCode,
			HCN: this.state.patientInfo.HCN,
			email: this.state.patientInfo.generalProfile.email,
			doctorID: this.state.patientInfo.doctor,
		});
	}
}

export default withRouter(AdminPatientView);