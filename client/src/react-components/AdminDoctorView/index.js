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
import { getDoctor, deleteDoctor, updateDoctor } from "../../actions/doctor";
import { redirect } from "../../actions/router"

class AdminDoctorView extends React.Component {
	
	// constants
	infoHeaders = ["Medical ID", "First Name", "Last Name", "Email", "Institution"];
	patientHeaders = ["Health Card", "First Name", "Last Name", "Address", "Email"];
	
	componentDidMount() {
		getDoctor(this.state.doctorID).then(doctor => {
			if (doctor) {
				this.setState({
					MID: doctor.MID,
					firstName: doctor.generalProfile.firstName,
					lastName: doctor.generalProfile.lastName,
					email: doctor.generalProfile.email,
					institutionID: doctor.institutionID,
					doctorInfo: doctor,
				});
				
				this.setError(false, "");
				
			} else {
				this.setError(true, "An error occurred, please try again");
			}
		}).catch(error => {
			console.log(error);
			this.setError(true, "An error occurred, please try again");
		});
	}
	
	constructor(props) {
		super(props);
		
		this.state = {
			MID: '',
			firstName: '',
			lastName: '',
			email: '',
			institutionID: '',
			
			error: false,
			errorCode: '',
			edit: false,
			doctorID: props.match.params.id,
			doctorInfo: {generalProfile: {}},
			patients: [],
		}
		
		// binding functions
		this.getTableHeaders = this.getTableHeaders.bind(this);
		this.getPatientTableRows = this.getPatientTableRows.bind(this);
		this.removeDoctor = this.removeDoctor.bind(this);
		this.setError = this.setError.bind(this);
		this.toggleEdit = this.toggleEdit.bind(this);
		this.handleClose = this.handleClose.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
		this.createDoctor = this.createDoctor.bind(this);
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
									{this.state.edit ? <td><input name="institutionID" value={this.state.institutionID} onChange={this.handleInputChange}></input></td> : <td>{this.state.doctorInfo.institutionID}</td>}
									{this.state.edit ? <td><Button type="primary" onClick={() => { updateDoctor(this.createDoctor()); this.toggleEdit(); }}>Submit</Button></td> : <td><Button type="primary" onClick={() => this.toggleEdit()}>Edit</Button></td>}
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
	
	createDoctor = () => {
		return({
			firstName: this.state.firstName,
			lastName: this.state.lastName,
			email: this.state.email,
			MID: this.state.MID,
			institutionID: this.state.institutionID,
		});
	}
	
	resetInputs() {
		this.setState({
			firstName: this.state.doctorInfo.generalProfile.firstName,
			lastName: this.state.doctorInfo.generalProfile.lastName,
			email: this.state.doctorInfo.generalProfile.email,
			MID: this.state.doctorInfo.MID,
			institutionID: this.state.doctorInfo.institutionID,
		});
	}
}

export default withRouter(AdminDoctorView);