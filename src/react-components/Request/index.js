import React from "react";

import "./styles.css";
// import 'antd/dist/antd.css';

import Header from './../Header';
import NavBar from './../NavBar';
import RequestForm from '../RequestForm';
import PreviousRequests from '../PreviousRequests'

import { Button }  from "antd";

class Request extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            newRequest: false
        };
    }

    user = this.props.appComponent.state.loggedInUser;

    onClick() {
        this.setState( {newRequest: true} );
    }

    changeView() {
        if(this.state.newRequest) {
            return (<RequestForm loggedInUser={this.user}/>);
        } else {
            return (
            <div>
                <Button onClick={this.onClick} className="new-request-button">
                    Create a New Request
                </Button>
                {this.getPreviousRequestsPage}
            </div>);
        }
    }

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
                {this.changeView}
            </div>
        );
    }
    
    // returns the previous list of requests made by the user in a table format
    getPreviousRequestsPage() {
        return (<PreviousRequests loggedInUser={this.user} />)
    }
}

export default Request;