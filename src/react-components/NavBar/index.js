import React from 'react';
import "./styles.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Nav} from "react-bootstrap";
import { Card, Button }  from "antd";
import { redirect } from "../../actions/router";
import { withRouter } from "react-router";

class NavBar extends React.Component{

    constructor(props) {
        super(props);

        this.redirectRequest = this.redirectRequest.bind(this);
        this.changeVal = this.changeVal.bind(this);
        this.state={
            collapse: false
        };
    }

    redirectRequest(val) {
        redirect(this, val);
    }
    changeVal =() =>{
        if(this.state.collapse){
            this.setState( {...this.state, collapse: false} );
        }else{
            this.setState( {...this.state, collapse: true} );
        }
    }

    render(){
        
        return(
            
                <div className={this.state.collapse ? "nav3" : "nav2"}>
                
                
                <Nav className="col-lg-12 d-none d-inline rounded shadow-lg sidebar">
                {this.state.collapse &&
                    <div>
                        <div type="button" className="butt2" onClick={this.changeVal}>&#9776;</div>
                    </div>
                }
                {this.state.collapse === false &&
                    <div>
                        <div type="button" className="butt" onClick={this.changeVal}>&#9776;</div>
                    </div>
                }
                <Nav.Item>
                    <Nav.Link onClick={() => this.redirectRequest("/request")}>Request</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link onClick={() => this.redirectRequest("/results")}>Results</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="/profiles">Profiles</Nav.Link>
                </Nav.Item>
                
                <div className="fixed-bottom">
                <Nav.Item>
                    <Nav.Link onClick={() => this.redirectRequest("/upload")}>
                    Upload
                    </Nav.Link>
                </Nav.Item>
                
                <Nav.Item>
                    <Nav.Link onClick={() => this.redirectRequest("/setting")}>
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