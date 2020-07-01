import React from 'react';
import "./styles.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Nav} from "react-bootstrap";

class SideNavP extends React.Component{
    render(){
        return(
            <div class="nav">
            <Nav className="col-lg-12 d-none d-inline rounded shadow-lg sidebar">
            
            <Nav.Item>
                <Nav.Link href="/requestP">Request</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link href="/resultsP">Results</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link href="/handw">Health and Wellness</Nav.Link>
            </Nav.Item>
            
            <div class="fixed-bottom">
            <Nav.Item>
                <Nav.Link href="/uploadP">
                Patient Upload
                </Nav.Link>
            </Nav.Item>
            </div>
            </Nav>

            </div>
        );
    }

}


export default class NavBar
extends React.Component{
    render(){
        return (
            <SideNavP></SideNavP>

        );
    }
}