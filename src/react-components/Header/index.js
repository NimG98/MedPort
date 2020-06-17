import React from "react";

import "./styles.css";

import logo from "./static/heart_line_plus_logo.png"

/* The Header Component */
class Header extends React.Component {
  render() {
    return (
      <div className="header">
        <img alt={"logo"} src={logo} className="logo"/>
        <h1>Medical Site Name</h1>
      </div>
    );
  }
}

export default Header;
