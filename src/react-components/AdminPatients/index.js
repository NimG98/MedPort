import React from "react";
import { withRouter } from "react-router";

// importing styles
import "./styles.css";


// importing components
import Header from "../Header";
import NavBar from "../NavBar";
import AdminPatientsOverview from "../AdminPatientsOverview";
import PatientSignUpForm from "../PatientSignUpForm";

class AdminPatients extends React.Component {
	
	status = ["Patients Overview", "Patient Creation"]
	
	constructor(props) {
		super(props);
		
		this.state = {
			statusIndex: 0,
		}
		
		// binding functions
		this.setStatus = this.setStatus.bind(this);
		this.getView = this.getView.bind(this);
	}
	
	render() {
		return(
			<div className="AdminPatients">
				<Header appComponent={this.props.appComponent}/>
				<NavBar />
				
				{this.getView(this.state.statusIndex)}
			</div>
		);
	}
	
	// sets the statusIndex value
	setStatus (value) {
		this.setState({ statusIndex: value });
	}
	
	// returns the appropriate view based on the statusIndex
	getView = (index) => {
		return {
			// Patients Overview
			0: <AdminPatientsOverview 
					createPatient={() => this.setStatus(1)}
				/>,
			// Patient Creation
			1: <PatientSignUpForm 
					code=""
					referrerID={null}
					back={() => this.setStatus(0)}
					submit={() => this.setStatus(0)}
				/>,
		}[index]
	}
	
}

export default withRouter(AdminPatients);