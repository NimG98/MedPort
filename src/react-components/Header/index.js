import React from "react";
import { withRouter } from "react-router";

import "./styles.css";
import logo from "./static/heart (2).png"

import { redirect } from "../../actions/router";

/* The Header Component */
class Header extends React.Component {

    constructor(props) {
        super(props);

        console.log(this.props);

        this.state = {
          user: this.props.appComponent.state.loggedInUser
        };

        this.onClick = this.onClick.bind(this);
    }

    onClick() {
        if(this.state.user){
            redirect(this, '/dashboard');

        } else {
            redirect(this, '/');
        }
    }

    render() {
        return (
            <div className="header">
                <img alt={"logo"} src={logo} className="logo" onClick={this.onClick}/>
                <h1>Medical Site Name</h1>
            </div>
        );
    }
}

export default withRouter(Header);
