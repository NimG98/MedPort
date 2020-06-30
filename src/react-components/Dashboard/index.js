import React from "react";


import "./styles.css";
import 'antd/dist/antd.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col} from 'react-bootstrap'
//import $ from 'jquery';
//import Popper from 'popper.js';
//import 'bootstrap/dist/js/bootstrap.bundle.min';

import { withRouter } from "react-router";

import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import 'antd/dist/antd.css';
//import { Sidenav } from 'rsuite';
//import 'rsuite/lib/styles/index.less';
import Header from './../Header';
import NavBar from './../NavBar';
/* Component for the Dashboard */
class Dashboard extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    // To make sure no one just visits http://localhost:3000/dashboard
    // without logging in first
    if (document.cookie.indexOf("LoggedInSession=Valid") === -1) {
        window.location.href = "/";
    }
    return (
        <div>
            <Header />
            
            
            <Container>
                <Row>
                    <NavBar appComponent={this.props.appComponent}/>
                    <Col className="col-md size-1">
                        <h2>News:</h2>
                        <h5>- news story</h5>
                        <h5>-another news story</h5>
                    </Col>
                    <br/>
                    <Col className="col-md size-1">
                        <h2>Journals:</h2>
                        <h5>- news story</h5>
                        <h5>-another news story</h5>
                    </Col>
                </Row>
                <Row className="size-2">
                <h2>Health News/Latest advancemnets</h2>
                    
                        <h5>- news story</h5>
                        <h5>-another news story</h5>
                </Row>
            </Container>
            
           

            
        </div>
    );
  }

}

export default withRouter(Dashboard);
