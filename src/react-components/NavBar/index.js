import React from 'react';
import "./styles.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Nav} from "react-bootstrap";

import { redirect } from "../../actions/router";
import { withRouter } from "react-router";

class NavBar extends React.Component{

    constructor(props) {
        super(props);

        this.redirectRequest = this.redirectRequest.bind(this);
    }

    redirectRequest() {
        redirect(this, '/request');
    }

    render(){
        return(
            <div class="nav">
            <Nav className="col-lg-12 d-none d-inline rounded shadow-lg sidebar">
            
            <Nav.Item>
                <Nav.Link onClick={this.redirectRequest}>Request</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link href="/results">Results</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link href="/handw">Health and Wellness</Nav.Link>
            </Nav.Item>
            
            <div class="fixed-bottom">
            <Nav.Item>
                <Nav.Link href="/upload">
                Upload
                </Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link href="/settings">
                Settings
                </Nav.Link>
            </Nav.Item>
            </div>
            </Nav>

            </div>
        );
    }

}

export default withRouter(NavBar);