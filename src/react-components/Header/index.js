import React from "react";

import "./styles.css";

// import logo from "./static/heart_line_plus_logo.png"
// import logo from "./static/heart-with-electrocardiogram.png"
// import logo from "./static/heart.png"
// import logo from "./static/caduceus.png"
// import logo from "./static/Untitled.png"
// import logo from "./static/kissclipart-healthcare-knowledge-icon-clipart-computer-icons-m-e9f3438eb9615f46.png"
import logo from "./static/heart (2).png"


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
