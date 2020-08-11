import React from "react";
import { uid } from 'react-uid';
import { withRouter } from "react-router";

// importing styles
import "./styles.css";
import 'antd/dist/antd.css';

// importing actions/required methods
import { getInstitutions, deleteInstitution } from "../../actions/institution";
import { redirect } from "../../actions/router"

// importing components
import { Alert, Button } from "antd";

class AdminInstitutionsOverview extends React.Component {
	
	headers = ["Name", "Address", "Postal Code", "Phone Number"];
	
	componentDidMount() {
		getInstitutions().then(data => {
			this.setState({
				institutions: data
			});
		}).catch(error => {
			console.log(error);
		});
	}
	
	constructor(props) {
		super(props);
		
		this.state = {
			error: false,
			errorCode: '',
			institutions: [],
		}
		
		// binding functions
		this.getTableHeaders = this.getTableHeaders.bind(this);
		this.getTableRows = this.getTableRows.bind(this);
		this.removeInstitution = this.removeInstitution.bind(this);
		this.setError = this.setError.bind(this);
		this.handleClose = this.handleClose.bind(this);
	}
	
	render() {
		
		const {
			createInstitution
		} = this.props;
		
		return(
			<div className="AdminInstitutionsOverview">
				<div className="container">
					{this.state.error ? <Alert type="error" message={this.state.errorCode} className="alert" closable onClose={this.handleClose}></Alert> : null}
					<h1 className="title">
						Institutions Overview
					</h1>
					
					<Button
						type="primary"
						className="create-institution-button"
						onClick={createInstitution}
					>Create Institution</Button>
					
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
		
		this.state.institutions.map(institution => (
			tableRows.push(
				<tr key={uid(institution)}>
					<td>{institution.name}</td>
					<td>{institution.address}</td>
					<td>{institution.postalCode}</td>
					<td>{institution.phoneNumber}</td>
					<td><Button
							type="primary"
							onClick={() => {redirect(this, "/admin/institutions/" + institution._id)}}
						>View</Button>
					</td>
					<td>
						<Button 
							type="danger"
							onClick={() => {this.removeInstitution(institution._id)}}
						>Delete</Button>
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
			// delete Institution
			const filtered = this.state.institutions.filter(institution => institution._id !== institutionID);
			
			this.setState({
				institutions: filtered
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

export default withRouter(AdminInstitutionsOverview);