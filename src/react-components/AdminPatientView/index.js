import React from "react";
import { uid } from 'react-uid';
import { withRouter } from "react-router";

// importing styles
import "./styles.css";

// importing components
import Header from "../Header";
import NavBar from "../NavBar";
import { Alert, Button } from "antd";

// importing actions/required methods
import { getPatient, deletePatient, updatePatient } from "../../actions/app";
import { redirect } from "../../actions/router"

class AdminPatientView extends React.Component {
	// constants
	infoHeaders = ["Health Card", "First Name", "Last Name", "Email", "Address", "Postal Code", "Doctor"];
	
	componentDidMount() {
		const data = getPatient(this.state.patientID);
		
		if (data) {
			this.setState({
				HCN: data.HCN,
				firstName: data.firstName,
				lastName: data.lastName,
				email: data.email,
				address: data.address,
				postalCode: data.postalCode,
				doctorID: data.doctorID,
				patientInfo: data,
			});
			
			this.setError(false, "");
			
		} else {
			this.setError(true, "An error occurred, please try again");
		}
	}
	
	constructor(props) {
		super(props);
		
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
			patientID: parseInt(props.match.params.id),
			patientInfo: {},
		}
		
		// binding functions
		this.getTableHeaders = this.getTableHeaders.bind(this);
		this.removePatient = this.removePatient.bind(this);
		this.setError = this.setError.bind(this);
		this.toggleEdit = this.toggleEdit.bind(this);
		this.handleClose = this.handleClose.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
		this.createPatient = this.createPatient.bind(this);
		this.resetInputs = this.resetInputs.bind(this);
		
	}
	
	render() {
		return(
			<div className="AdminPatientView">
				<Header appComponent={this.props.appComponent}/>
				<NavBar />
				<div className="container">
					{this.state.error ? <Alert type="error" message={this.state.errorCode} className="alert" closable onClose={this.handleClose}></Alert> : null}
				
					<div className="patient-info">
						<h1 className="title">
							Patient Info
						</h1>
						
						<Button
							type="danger"
							className="delete-patient-button"
							onClick={() => this.removePatient(this.state.patientID)}
						>Delete Patient</Button>
						
						<table>
							<thead>
								<tr>{this.getTableHeaders(this.infoHeaders)}</tr>
							</thead>
							<tbody>
								<tr>	
									{this.state.edit ? <td><input name="HCN" value={this.state.HCN} onChange={this.handleInputChange}></input></td> : <td>{this.state.patientInfo.HCN}</td>}
									{this.state.edit ? <td><input name="firstName" value={this.state.firstName} onChange={this.handleInputChange}></input></td> : <td>{this.state.patientInfo.firstName}</td>}
									{this.state.edit ? <td><input name="lastName" value={this.state.lastName} onChange={this.handleInputChange}></input></td> : <td>{this.state.patientInfo.lastName}</td>}
									{this.state.edit ? <td><input name="email" value={this.state.email} onChange={this.handleInputChange}></input></td> : <td>{this.state.patientInfo.email}</td>}
									{this.state.edit ? <td><input name="address" value={this.state.address} onChange={this.handleInputChange}></input></td> : <td>{this.state.patientInfo.address}</td>}
									{this.state.edit ? <td><input name="postalCode" value={this.state.postalCode} onChange={this.handleInputChange}></input></td> : <td>{this.state.patientInfo.postalCode}</td>}
									{this.state.edit ? <td><input name="doctorID" value={this.state.doctorID} onChange={this.handleInputChange}></input></td> : <td>{this.state.patientInfo.doctorID}</td>}
									{this.state.edit ? <td><Button type="primary" onClick={() => { updatePatient(this.createPatient()); this.toggleEdit(); }}>Submit</Button></td> : <td><Button type="primary" onClick={() => this.toggleEdit()}>Edit</Button></td>}
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
	
	createPatient = () => {
		return({
			patientID: this.state.patientID,
			firstName: this.state.firstName,
			lastName: this.state.lastName,
			address: this.state.address,
			postalCode: this.state.postalCode,
			HCN: this.state.HCN,
			email: this.state.email,
			doctorID: this.state.doctorID,
		});
	}
	
	resetInputs() {
		this.setState({
			firstName: this.state.patientInfo.firstName,
			lastName: this.state.patientInfo.lastName,
			address: this.state.patientInfo.address,
			postalCode: this.state.patientInfo.postalCode,
			HCN: this.state.patientInfo.HCN,
			email: this.state.patientInfo.email,
			doctorID: this.state.patientInfo.doctorID,
		});
	}
}

export default withRouter(AdminPatientView);