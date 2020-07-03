import React from "react";
import { withRouter } from "react-router";

// importing styles
import "./styles.css";


// importing components
import Header from "../Header";
import NavBar from "../NavBar";
import AdminInstitutionsOverview from "../AdminInstitutionsOverview";
import InstitutionCreationForm from "../InstitutionCreationForm";

class AdminInstitutions extends React.Component {
	
	status = ["Institutions Overview", "Institution Creation"]
	
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
			<div className="AdminInstitutions">
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
			// Institutions Overview
			0: <AdminInstitutionsOverview 
					createInstitution={() => this.setStatus(1)}
				/>,
			// Institution Creation
			1: <InstitutionCreationForm 
					back={() => this.setStatus(0)}
					submit={() => this.setStatus(0)}
				/>,
		}[index]
	}
	
}

export default withRouter(AdminInstitutions);