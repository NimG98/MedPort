import React from "react";

import "./styles.css";

import Header from './../Header';
import NavBar from './../NavBar';
import PatientRequest from './../PatientRequest';
import DoctorRequest from './../DoctorRequest';


class Request extends React.Component {

    constructor(props) {
        super(props);
    }

    userType = this.props.appComponent.state.loggedInUser;

    render() {

        // To make sure no one just visits http://localhost:3000/request
        // without logging in first
        if (document.cookie.indexOf("LoggedInSession=Valid") === -1) {
            window.location.href = "/";
        }

        return (
            <div className="request-page">
                <Header />
                <NavBar />
                {this.getRequestsPage(this.userType)}
            </div>
        );
    }

    // returns the appropriate requests page based on the user type
	getRequestsPage = (userType) => {
		
		return {
			// Patient's page for requests
			"patient": <PatientRequest appComponent={this.props.appComponent} />,
			// Doctor's page for requests
			"doctor": <DoctorRequest appComponent={this.props.appComponent} />
		}[userType]
	}
}

export default Request;