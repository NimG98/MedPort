import React from "react";
import { withRouter } from "react-router";

import "./styles.css";
import 'antd/dist/antd.css';

import Header from './../Header';
import NavBar from './../NavBar';
import RequestForm from '../RequestForm';
import PreviousRequests from '../PreviousRequests'

import { Button }  from "antd";

class Request extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            newRequest: false,
            user: this.props.appComponent.state.loggedInUser
        };

        this.onClick = this.onClick.bind(this);
        this.backToPreviousRequestsPage = this.backToPreviousRequestsPage.bind(this);
        this.changeView = this.changeView.bind(this);
        this.getPreviousRequestsPage = this.getPreviousRequestsPage.bind(this);

    }

    onClick() {
        this.setState( {...this.state, newRequest: true} );
    }

    changeView() {
        if(this.state.newRequest) {
            return (<RequestForm loggedInUser={this.state.user} backToPreviousRequestsPage={this.backToPreviousRequestsPage}/>);
        } else {
            return (
            <div className="previousRequestsPage">
                <Button onClick={this.onClick} type="primary" className="new-request-button">
                    Submit a New Request
                </Button>
                {this.getPreviousRequestsPage()}
            </div>);
        }
    }

    backToPreviousRequestsPage() {
        this.setState( {...this.state, newRequest: false} );
    }

    render() {

        // To make sure no one just visits http://localhost:3000/request
        // without logging in first
        if (document.cookie.indexOf("LoggedInSession=Valid") === -1) {
            window.location.href = "/";
        }

        return (
            <div className="request-page">
                <Header appComponent={this.props.appComponent}/>
                <NavBar />
                {this.changeView()}
            </div>
        );
    }
    
    // returns the previous list of requests made by the user in a table format
    getPreviousRequestsPage() {
        return (<PreviousRequests loggedInUser={this.state.user} />)
    }
}

export default withRouter(Request);