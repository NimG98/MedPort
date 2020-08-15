import React from "react";
import { uid } from 'react-uid';
import { withRouter } from "react-router";

// importing styles
import "./styles.css";
import 'antd/dist/antd.css';

// importing actions/required methods
import { getPatients, deletePatient } from "../../actions/patient";
import { redirect } from "../../actions/router"

// importing components
import { Alert, Button } from "antd";

class AdminPatientsOverview extends React.Component {
	headers = ["Health Card", "First Name", "Last Name", "Email", "Address", "Postal Code"];
	
	async componentDidMount() {
		await getPatients().then((patients) => {
			if (patients || patients === []) {
				
				// set patients in state
				this.setState({
					patients: patients
				});
				
			} else {
				this.setError(true, "An error occurred, please try again.");
			}
		}).catch(error => {
			console.log(error);
			this.setError(true, "An error occurred, please try again.");
		});		
	}
	
	constructor(props) {
		super(props);
		
		this.state = {
			error: false,
			errorCode: '',
			patients: [],
		}
		
		// binding functions
		this.getTableHeaders = this.getTableHeaders.bind(this);
		this.getTableRows = this.getTableRows.bind(this);
		this.removePatient = this.removePatient.bind(this);
		this.setError = this.setError.bind(this);
		this.handleClose = this.handleClose.bind(this);
	}
	
	render() {
		
		const {
			createPatient
		} = this.props;
		
		return(
			<div className="AdminPatientsOverview">
				<div className="container">
					{this.state.error ? <Alert type="error" message={this.state.errorCode} className="alert" closable onClose={this.handleClose}></Alert> : null}
					<h1 className="title">
						Patients Overview
					</h1>
					
					<Button
						type="primary"
						className="create-patient-button"
						onClick={createPatient}
					>Create Patient</Button>
					
					<table>
						<thead>
							<tr>{this.getTableHeaders()}</tr>
						</thead>
			
						<tbody>
							{this.getTableRows()}
						</tbody>
					</table>
				</div>
				
			</div>
		);
	}
	
	getTableHeaders() {
		let tableHeaders = [];
		
		this.headers.map(header => (
			tableHeaders.push(<th key={uid(header)}>{header}</th>)
		));
		
		return tableHeaders;
	}
	
	getTableRows() {
		let tableRows = [];
		
		this.state.patients.map((patient) => {
			
			tableRows.push(
				<tr key={uid(patient)}>
					<td>{patient.HCN}</td>
					<td>{patient.generalProfile.firstName}</td>
					<td>{patient.generalProfile.lastName}</td>
					<td>{patient.generalProfile.email}</td>
					<td>{patient.address}</td>
					<td>{patient.postalCode}</td>
					<td><Button
							type="primary"
							onClick={() => {redirect(this, "/admin/patients/" + patient._id)}}
						>View</Button>
					</td>
					<td>
						<Button 
							type="danger"
							onClick={() => {this.removePatient(patient._id)}}
						>Delete</Button>
					</td>
				</tr>
			)
		});
		
		return tableRows;
	}
	
	// deletes doctor with a specific id
	removePatient(patientID) {
		// api call
		const success = deletePatient(patientID);
		
		if (success) {
			// delete Patient
			const filtered = this.state.patients.filter(patient => patient._id !== patientID);
			
			this.setState({
				patients: filtered
			});
		} else {
			// set error message
			this.setError(true, "An error occurred, please try again.");
		}
	}
	
	// sets error value in component state
	setError(value, message) {
		this.setState({
			error: value,
			errorCode: message
		});
	}
	
	// antd alert close handler
	handleClose = () => {
		this.setState({
			error: false,
			errorCode: ''
		});
	}
}

export default withRouter(AdminPatientsOverview);