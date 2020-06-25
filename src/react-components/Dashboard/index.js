import React from "react";


class Dashboard extends React.Component {
    render() {

        // To make sure no one just visits http://localhost:3000/dashboard
        // without logging in first
        if (document.cookie.indexOf("LoggedInSession=Valid") == -1) {
            window.location.href = "/";
        }

        return (
            <div>Hello</div>
        );
    }
}

export default Dashboard;
