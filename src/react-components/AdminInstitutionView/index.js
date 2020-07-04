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
import { getInstitution, deleteInstitution, updateInstitution } from "../../actions/app.js";
import { redirect } from "../../actions/router"

class AdminInstitutionView extends React.Component {
	
	// constants
	infoHeaders = ["Name", "Address", "Postal Code", "Phone Number"];
	doctorHeaders = ["Medical ID", "First Name", "Last Name", "Email"];
	
	componentDidMount() {
		const data = getInstitution(this.state.institutionID);
		
		if (data) {
			this.setState({
				name: data.name,
				address: data.address,
				postalCode: data.postalCode,
				phoneNumber: data.phoneNumber,
				institutionInfo: data,
			});
			
			this.setError(false, "");

		} else {
			this.setError(true, "An error occurred, please try again");
		}
	}
	
	constructor(props) {
		super(props);
		
		this.state = {
			name: '',
			address: '',
			postalCode: '',
			phoneNumber: '',
			
			error: false,
			errorCode: '',
			edit: false,
			institutionID: parseInt(props.match.params.id),
			institutionInfo: {doctors: []},
		}
		
		// binding functions
		this.getTableHeaders = this.getTableHeaders.bind(this);
		this.getDoctorTableRows = this.getDoctorTableRows.bind(this);
		this.removeInstitution = this.removeInstitution.bind(this);
		this.setError = this.setError.bind(this);
		this.toggleEdit = this.toggleEdit.bind(this);
		this.handleClose = this.handleClose.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
		this.createInstitution = this.createInstitution.bind(this);
		this.resetInputs = this.resetInputs.bind(this);
		
	}
	
	render() {
		return(
			<div className="AdminInstitutionView">
				<Header appComponent={this.props.appComponent}/>
				<NavBar appComponent={this.props.appComponent} />
				<div className="container">
					{this.state.error ? <Alert type="error" message={this.state.errorCode} className="alert" closable onClose={this.handleClose}></Alert> : null}
				
					<div className="institution-info">
						<h1 className="title">
							Institution Info
						</h1>
						
						<Button
							type="danger"
							className="delete-institution-button"
							onClick={() => this.removeInstitution(this.state.institutionID)}
						>Delete Institution</Button>
						
						<table>
							<thead>
								<tr>{this.getTableHeaders(this.infoHeaders)}</tr>
							</thead>
							<tbody>
								<tr>	
									{this.state.edit ? <td><input name="name" value={this.state.name} onChange={this.handleInputChange}></input></td> : <td>{this.state.institutionInfo.name}</td>}
									{this.state.edit ? <td><input name="address" value={this.state.address} onChange={this.handleInputChange}></input></td> : <td>{this.state.institutionInfo.address}</td>}
									{this.state.edit ? <td><input name="postalCode" value={this.state.postalCode} onChange={this.handleInputChange}></input></td> : <td>{this.state.institutionInfo.postalCode}</td>}
									{this.state.edit ? <td><input name="phoneNumber" value={this.state.phoneNumber} onChange={this.handleInputChange}></input></td> : <td>{this.state.institutionInfo.phoneNumber}</td>}
									{this.state.edit ? <td><Button type="primary" onClick={() => { updateInstitution(this.createInstitution()); this.toggleEdit(); }}>Submit</Button></td> : <td><Button type="primary" onClick={() => this.toggleEdit()}>Edit</Button></td>}
									{this.state.edit ? <td><Button type="danger" onClick={() => { this.resetInputs(); this.toggleEdit(); }} >Cancel</Button></td> : null}
								</tr>
							</tbody>
						</table>
					</div>
					
					<div className="institution-doctors">
						<h1 className="title">
							Doctors
						</h1>
					
						<table>
							<thead>
								<tr>{this.getTableHeaders(this.doctorHeaders)}</tr>
							</thead>
							<tbody>
								{this.getDoctorTableRows()}
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
	
	getDoctorTableRows() {
		let tableRows = [];
		
		this.state.institutionInfo.doctors.map(doctor => (
			tableRows.push(
				<tr key={uid(doctor)}>
					<td>{doctor.MID}</td>
					<td>{doctor.firstName}</td>
					<td>{doctor.lastName}</td>
					<td>{doctor.email}</td>
					<td><Button
							type="primary"
							onClick={() => {redirect(this, "/admin/doctors/" + doctor.doctorID)}}
						>View</Button>
					</td>
				</tr>
			)
		));
		
		return tableRows;
	}
	
	// deletes institution with a specific id
	removeInstitution(institutionID) {
		// api call
		const success = deleteInstitution(institutionID);
		
		if (success) {
			redirect(this, "/admin/institutions");
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
	
	createInstitution = () => {
		return({
			name: this.state.name,
			address: this.state.address,
			postalCode: this.state.postalCode,
			phoneNumber: this.state.phoneNumber,
		});
	}
	
	resetInputs() {
		this.setState({
			name: this.state.institutionInfo.name,
			address: this.state.institutionInfo.address,
			postalCode: this.state.institutionInfo.postalCode,
			phoneNumber: this.state.institutionInfo.phoneNumber,
		});
	}
}

export default withRouter(AdminInstitutionView);