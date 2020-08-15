import React from "react";
import { uid } from 'react-uid';
import { withRouter } from "react-router";

// importing styles
import "./styles.css";
import 'antd/dist/antd.css';

// importing actions/required methods
import { getDoctors, deleteDoctor } from "../../actions/doctor";
import { redirect } from "../../actions/router"

// importing components
import { Alert, Button, Popconfirm } from "antd";

class AdminDoctorsOverview extends React.Component {
	headers = ["Medical ID", "First Name", "Last Name", "Email"];
	
	componentDidMount() {
		getDoctors().then(doctors => {
			if (doctors) {
				this.setState({
					doctors: doctors
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
			doctors: [],
		}
		
		// binding functions
		this.getTableHeaders = this.getTableHeaders.bind(this);
		this.getTableRows = this.getTableRows.bind(this);
		this.removeDoctor = this.removeDoctor.bind(this);
		this.setError = this.setError.bind(this);
		this.handleClose = this.handleClose.bind(this);
	}
	
	render() {
		
		const {
			createDoctor
		} = this.props;
		
		return(
			<div className="AdminDoctorsOverview">
				<div className="container">
					{this.state.error ? <Alert type="error" message={this.state.errorCode} className="alert" closable onClose={this.handleClose}></Alert> : null}
					<h1 className="title">
						Doctors Overview
					</h1>
					
					<Button
						type="primary"
						className="create-doctor-button"
						onClick={createDoctor}
					>Create Doctor</Button>
					
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
		
		this.state.doctors.map(doctor => (
			tableRows.push(
				<tr key={uid(doctor)}>
					<td>{doctor.MID}</td>
					<td>{doctor.generalProfile.firstName}</td>
					<td>{doctor.generalProfile.lastName}</td>
					<td>{doctor.generalProfile.email}</td>
					<td><Button
							type="primary"
							onClick={() => {redirect(this, "/admin/doctors/" + doctor._id)}}
						>View</Button>
					</td>
					<td>
						<Popconfirm
							title="Delete this doctor?"
							onConfirm={(e) => {this.removeDoctor(doctor._id)}}
							onCancel={(e) => {}}
							okText="Yes"
							cancelText="No"
						>
							<Button 
								type="danger"
							>Delete</Button>
						</Popconfirm>
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
				// delete Doctor
				const filtered = this.state.doctors.filter(doctor => doctor._id !== doctorID);
				
				this.setState({
					doctors: filtered
				});
			} else {
				// set error message
				this.setError(true, "An error occurred, please try again.");
			}
		}).catch(error => {
			console.log(error);
			// set error message
			this.setError(true, "An error occurred, please try again.");
		});
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

export default withRouter(AdminDoctorsOverview);