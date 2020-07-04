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

//   constructor(props) {
//     super(props);
//   }

  render() {
    // To make sure no one just visits http://localhost:3000/dashboard
    // without logging in first
    if (document.cookie.indexOf("LoggedInSession=Valid") === -1) {
        window.location.href = "/";
    }
    return (
        <div>
            <Header appComponent={this.props.appComponent}/>
            <NavBar />

            

            
            <div className="container2">
                <Row>
                    
                    <Col className="col-md size-1">
                        <h2 className="RH2">News:</h2>
                        <h5>- news story</h5>
                        <h5>- another news story</h5>
                        <h5>- another news story</h5>
                        <h5>- another news story</h5>
                    </Col>
                    <br/>
                    <Col className="col-md size-1">
                        <h2 className="RH2">Journals:</h2>
                        <h5>- Journal</h5>
                        <h5>- another Journal</h5>
                        <h5>- another Journal</h5>
                        
                    </Col>
                </Row>
                <Row className="size-2">
                <h2 className="RH2">Health News/Latest advancements</h2>
                    
                        <h5>- Health news story</h5>
                        <h5>- another health news story</h5>
                        <h5>- Latest Advancement</h5>
                        <h5>- another Latest Advancement</h5>
                </Row>
            </div>
            
           

            
        </div>
    );
  }

}

export default withRouter(Dashboard);
