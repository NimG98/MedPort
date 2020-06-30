import React from "react";

import "./styles.css";
// import 'antd/dist/antd.css';
import { InfoCircleOutlined } from '@ant-design/icons';
import { Tabs, Button, Modal }  from "antd";

import { getUserRequestsByStatus } from "../../actions/app";


class PreviousRequests extends React.Component {

    constructor(props) {
        super(props);
    }

    user = this.props.loggedInUser;
    pendingRequests = getUserRequestsByStatus(user, "pending");
    confirmedRequests = getUserRequestsByStatus(user, "confirmed");

    tableHeaderNames = ["Created By", "Request To", "Request Type", "Date", "Time", "Reason"];
    actionHeaderName = "Action Needed";

    onClick = (req) => {
        Modal({
            title: "Do you want to confirm the following request?",
            icon: <InfoCircleOutlined />,
            content: "Request by" + req.created_by + "for a" + req.request_type
                    + "on" + req.date + "at" + req.time,
            onOk() {
                console.log('OK! Request confirmed');
              },
            onCancel() {
                console.log('Cancel');
            },
        });
    }

    render() {
        return(
            <div className="previousRequests">
                <h1 className="previousRequestsTitle">
                    Previous Requests
                </h1>
                <Tabs defaultActiveKey="1">
                    <TabPane tab="Pending Requests" key="1">
                        <table>
                            <tbody>
                                {this.displayTableHeaders("pending")}
                            </tbody>
                        </table>
                    </TabPane>
                    <TabPane tab="Confirmed Requests" key="2">
                        <table>
                            <tbody>
                                {this.displayTableHeaders()}
                            </tbody>
                        </table>
                    </TabPane>
                </Tabs>
            </div>
        );
    }

    displayTableHeaders = (status) => {
        tableHeaders = []
        headers = this.tableHeaderNames;

        if(status === "pending") {
            headers.push(this.actionHeaderName);
        }

        for (header in headers) {
            tableHeaders.push(<th>{header}</th>);
        }

        return (tableHeaders);
    }

    displayTableElements = (status) => {
        tableRows = []

        if(status === "pending") {
            requestData = this.pendingRequests;
        } else if(status === "confirmed") {
            requestData = this.confirmedRequests;
        }

        for(req in requestData) {
            tableRows.push(
                <tr>
                    {/* Later display user's First and Last Name, instead of username */}
                    <td>{req.created_by}</td>
                    <td>{req.to}</td>
                    <td>{req.request_type}</td>
                    <td>{req.date}</td>
                    <td>{req.time}</td>
                    <td>{req.reason}</td>
                </tr>
            );
        }

        return (tableRows);
    }

    // Note: function only called for pending requests, since action is pending
    displayActionNeeded = (req) => {
        // Pending on other person
        if(req.created_by === this.user) {
            return (
                <td>
                    Waiting for confirmation
                </td>
            );
        } else {
            return (
                <Button onClick={this.onClick(req)} className="confirm-request-button">
                    Confirm
                </Button>
            );
        }
    }

}
export default PreviousRequests;