import React from "react";
import { uid } from 'react-uid';

import "./styles.css";

// importing components
import Header from './../Header';
import NavBar from './../NavBar';
import PatientSelector from "../PatientSelector";
import { Alert, Button } from "antd";

// importing actions
import { getFilesForPatient, getLoggedInPatientFiles } from "../../actions/file";
import { redirect } from "../../actions/router"

// importing constants
import { UserType } from "../../constants/userType";

class ResultsOverview extends React.Component {
	
	// constants
	tableHeaders = ["File Name", "Report Type"];
	
	componentDidMount() {
		
		if (this.props.appComponent.state.userType === UserType.patient) {
			
			getLoggedInPatientFiles().then(files => {
				if (files || files === []) {
					
					this.setState({
						files: files
					});
					
					this.setError(false, '');
				} else {
					this.setError(true, "An error occurred, please try again");
				}
			}).catch(error => {
				console.log(error);
				this.setError(true, "An error occurred, please try again");
			})
		} /* else if (this.props.appComponent.state.userType === UserType.doctor) {
			
			getUserUploadedFiles(this).then(files => {
				if (files || files === []) {
					this.setState({
						files: files
					});
					
					this.setError(false, '');
				} else {
					this.setError(true, "An error occurred, please try again");
				}
			}).catch(error => {
				console.log(error);
				this.setError(true, "An error occurred, please try again");
			});
		} */
	}
	
	constructor(props) {
		super(props);
		this.props.history.push("/results");
		
		this.state = {
			files: [],
			error: '',
			errorCode: '',
			patientID: '',
		}
		
		// binding functions
		this.setError = this.setError.bind(this);
		this.getTableHeaders = this.getTableHeaders.bind(this);
		this.getTableRows = this.getTableRows.bind(this);
		this.handleClose = this.handleClose.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
		this.submit = this.submit.bind(this);
	}
	
	render() {
		return(
			<div className="ResultsOverview">
				<Header appComponent={this.props.appComponent}/>
				<NavBar appComponent={this.props.appComponent} />
				
				{this.state.error ? <Alert type="error" message={this.state.errorCode} className="alert" closable onClose={this.handleClose}></Alert> : null}
				
				{this.props.appComponent.state.userType === UserType.doctor ? <PatientSelector patientID={this.state.patientID} handleChange={this.handleInputChange} submit={this.submit} /> : null}
				
				<div className="container">
					<h1 className="title">
						Results Overview
					</h1>
					
					<table>
						<thead>
							<tr>{this.getTableHeaders(this.tableHeaders)}</tr>
						</thead>
						<tbody>
							{this.getTableRows()}
						</tbody>
					</table>
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
	
	getTableRows() {
		const tableRows = [];
		
		this.state.files.map(file => {
			tableRows.push(
				<tr key={uid(file)}>
					<td>{file.fileName}</td>
					<td>{file.reportType}</td>
					<td><Button
							type="primary"
							onClick={() => {redirect(this, "/results/" + file._id)}}
						>View</Button>
					</td>
				</tr>
			)
		});
		
		return tableRows;
	}
	
	// general error code handler
	setError(value, code) {
		this.setState({
			error: value,
			errorCode: code
		});
	}
	
	// antd alert close handler
	handleClose = () => {
		this.setState({
			error: false,
			errorCode: ''
		});
	}
	
	/* handles text input changes
	   Note: converts to uppercase */
	handleInputChange = (event) => {
		const target = event.target;
		const name = target.name;
		const value = target.value;
		
		this.setState({
			[name]: value
		});
	}
	
	submit() {
		getFilesForPatient(this.state.patientID).then(files => {
			if (files || files === []) {
				this.setState({
					files: files
				});
			} else {
				this.setError(true, "An error occurred, please try again");
			}
		}).catch(error => {
			console.log(error);
			this.setError(true, "An error occurred, please try again");
		})
	}
}

export default ResultsOverview;