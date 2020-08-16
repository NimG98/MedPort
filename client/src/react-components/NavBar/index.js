import React from 'react';
import "./styles.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Nav} from "react-bootstrap";
import { redirect } from "../../actions/router";
import { withRouter } from "react-router";
import { UserType } from "../../constants/userType";

class NavBar extends React.Component{

    constructor(props) {
        super(props);

        this.redirectRequest = this.redirectRequest.bind(this);
        this.state={
            userType: this.props.appComponent.state.userType,
        };
    }

    redirectRequest(val) {
        redirect(this, val);
    }

    render(){
        return(
            <div className={"nav2"}>
                {this.state.userType === UserType.admin &&

                    <Nav className="col-lg-12 d-none d-inline rounded shadow-lg sidebar">
                        <Nav.Item>
                            <Nav.Link onClick={() => this.redirectRequest("/admin/institutions")}>Institutions</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link onClick={() => this.redirectRequest("/admin/doctors")}>Doctors</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link onClick={() => this.redirectRequest("/admin/patients")}>Patients</Nav.Link>
                        </Nav.Item>

                        <div className="fixed-bottom">

                        <Nav.Item>
                            <Nav.Link onClick={() => this.redirectRequest("/setting")} disabled="true">
                            Settings
                            </Nav.Link>
                        </Nav.Item>
                        </div>
                    </Nav>
                }
                {this.state.userType === UserType.patient &&
                    <Nav className="col-lg-12 d-none d-inline rounded shadow-lg sidebar">
                        <Nav.Item>
                            <Nav.Link onClick={() => this.redirectRequest("/request")}>Request</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link onClick={() => this.redirectRequest("/results")}>Results</Nav.Link>
                        </Nav.Item>
                        <div className="fixed-bottom">
                        <Nav.Item>
                            <Nav.Link onClick={() => this.redirectRequest("/upload")}>
                            Upload
                            </Nav.Link>
                        </Nav.Item>
                        </div>
                    </Nav>
                }
                {this.state.userType === UserType.doctor &&
                    <Nav className="col-lg-12 d-none d-inline rounded shadow-lg sidebar">
                        <Nav.Item>
                            <Nav.Link onClick={() => this.redirectRequest("/request")}>Request</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link onClick={() => this.redirectRequest("/results")}>Results</Nav.Link>
                        </Nav.Item>
                        <div className="fixed-bottom">
                        <Nav.Item>
                            <Nav.Link onClick={() => this.redirectRequest("/upload")}>
                            Upload
                            </Nav.Link>
                        </Nav.Item>
                        </div>
                    </Nav>
                }
            </div>
        );
    }
}

export default withRouter(NavBar);