import React from "react";
import { uid } from 'react-uid';
import { withRouter } from "react-router";

// importing styles
import "./styles.css";
import 'antd/dist/antd.css';

// importing actions/required methods
import { getInstitutions, deleteInstitution } from "../../actions/app";
import { redirect } from "../../actions/router"

// importing components
import Header from "../Header";
import NavBar from "../NavBar";
import { Alert, Button } from "antd";

class InstitutionsOverview extends React.Component {
	
	headers = ["Name", "Address", "Postal Code", "Phone Number"];
	
	componentDidMount() {
		const data = getInstitutions();
		
		this.setState({
			error: false,
			errorCode: '',
			institutions: data
		});
	}
	
	constructor(props) {
		super(props);
		
		this.state = {
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
		return(
			<div className="InstitutionsOverview">
				<Header appComponent={this.props.appComponent}/>
				<NavBar />
				
				<div className="container">
					{this.state.error ? <Alert type="error" message={this.state.errorCode} className="alert" closable onClose={this.handleClose}></Alert> : null}
					<h1 className="title">
						Institutions Overview
					</h1>
					
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
							onClick={() => {redirect(this, "/admin/institutions/" + institution.id)}}
						>Edit</Button>
					</td>
					<td>
						<Button 
							type="danger"
							onClick={() => {this.removeInstitution(institution.id)}}
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
			const filtered = this.state.institutions.filter(institution => institution.id !== institutionID);
			
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

export default withRouter(InstitutionsOverview);