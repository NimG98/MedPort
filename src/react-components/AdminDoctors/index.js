import React from "react";
import { withRouter } from "react-router";

// importing styles
import "./styles.css";


// importing components
import Header from "../Header";
import NavBar from "../NavBar";
import AdminDoctorsOverview from "../AdminDoctorsOverview";
import DoctorSignUp from "../DoctorSignUp";


class AdminDoctors extends React.Component {
	status = ["Doctors Overview", "Doctor Creation"]
	
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
			<div className="AdminDoctors">
				<Header appComponent={this.props.appComponent}/>
				<NavBar appComponent={this.props.appComponent} />
				
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
			// Institutions Overview
			0: <AdminDoctorsOverview 
					createDoctor={() => this.setStatus(1)}
				/>,
			// Institution Creation
			1: <DoctorSignUp 
					back={() => this.setStatus(0)}
					submit={() => this.setStatus(0)}
				/>,
		}[index]
	}
	
}

export default withRouter(AdminDoctors);