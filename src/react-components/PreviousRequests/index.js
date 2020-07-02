import React from "react";

import "./styles.css";
import 'antd/dist/antd.css';
import { InfoCircleOutlined } from '@ant-design/icons';
import { Tabs, Button, Modal }  from "antd";

import { getUserRequestsByStatus } from "../../actions/app";

const { TabPane } = Tabs;

class PreviousRequests extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            user: this.props.loggedInUser,
            pendingRequests: getUserRequestsByStatus(this.props.loggedInUser, "pending"),
            confirmedRequests: getUserRequestsByStatus(this.props.loggedInUser, "confirmed"),
            modalVisible: false
        };

        this.displayTableHeaders = this.displayTableHeaders.bind(this);
        this.displayTableElements = this.displayTableElements.bind(this);
        this.displayActionNeeded = this.displayActionNeeded.bind(this);
    }

    // user = this.props.loggedInUser;
    // pendingRequests = getUserRequestsByStatus(this.user, "pending");
    // confirmedRequests = getUserRequestsByStatus(this.user, "confirmed");

    tableHeaderNames = ["Created By", "Request To", "Request Type", "Date", "Time", "Reason"];
    actionHeaderName = "Action Needed";

    // onClick = (req) => {
    //     Modal({
    //         title: "Do you want to confirm the following request?",
    //         icon: <InfoCircleOutlined />,
    //         content: "Request by" + req.created_by + "for a" + req.request_type
    //                 + "on" + req.date + "at" + req.time,
    //         onOk() {
    //             console.log('OK! Request confirmed');
    //           },
    //         onCancel() {
    //             console.log('Cancel');
    //         },
    //     });
    // }

    showModal = () => {
        this.setState({
            modalVisible: true,
        });
    };

    handleModalOk = () => {
        this.setState({
            modalVisible: false,
        });
    };
    
    handleModalCancel = () => {
        this.setState({
            modalVisible: false,
        });
    };

    render() {
        return(
            <div className="previousRequests">
                <h1 className="previousRequestsTitle">
                    Previous Requests
                </h1>
                <Tabs defaultActiveKey="1">
                    <TabPane tab="Pending Requests" key="1">
                        <table>
                            <thead>
                                <tr>{this.displayTableHeaders("pending")}</tr>
                            </thead>
                            <tbody>
                                {this.displayTableElements("pending")}
                            </tbody>
                        </table>
                    </TabPane>
                    <TabPane tab="Confirmed Requests" key="2">
                        <table>
                            <thead>
                                <tr>{this.displayTableHeaders("confirmed")}</tr>
                            </thead>
                            <tbody>
                                {this.displayTableElements("confirmed")}
                            </tbody>
                        </table>
                    </TabPane>
                </Tabs>
            </div>
        );
    }

    displayTableHeaders = (status) => {
        var tableHeaders = [];
        var headers = [...this.tableHeaderNames];
        console.log(this.tableHeaderNames)


        if(status === "pending") {
            headers.push(this.actionHeaderName);
        }

        // headers is […] 0: "Created By" 1: "Request To" 2: "Request Type", etc.
        for (var header in headers) {
            tableHeaders.push(<th key={header}>{headers[header]}</th>);
        }

        return (tableHeaders);
    }

    displayTableElements = (status) => {
        var tableRows = [];
        var requestData = [];

        if(status === "pending") {
            requestData = this.state.pendingRequests;
        } else if(status === "confirmed") {
            requestData = this.state.confirmedRequests;
        }

        console.log(requestData)
        console.log(this.state.user)

        

        for(var req in requestData) {
            var actionNeeded = this.displayActionNeeded(requestData[req]);
            tableRows.push(
                <tr key={req}>
                    {/* Later display user's First and Last Name, instead of username */}
                    <td>{requestData[req].created_by}</td>
                    <td>{requestData[req].to}</td>
                    <td>{requestData[req].request_type}</td>
                    <td>{requestData[req].date}</td>
                    <td>{requestData[req].time}</td>
                    <td>{requestData[req].reason}</td>
                    {/* {this.displayActionNeeded(requestData[req])} */}
                    {status === "pending" && actionNeeded}
                </tr>
            );
        }

        return (tableRows);
    }

    // Note: function only called for pending requests, since action is pending
    displayActionNeeded = (req) => {
        // Pending on other person
        if(req.created_by === this.state.user) {
            return (
                <td>
                    Waiting for confirmation
                </td>
            );
        } else {
            return (
                <td>
                    <Button onClick={this.showModal} className="confirm-request-button">
                        Confirm
                    </Button>

                    <Modal
                        title="Do you want to confirm the following request?"
                        icon={<InfoCircleOutlined />}
                        // content={"Request by" + req.created_by + "for a" + req.request_type
                        //         + "on" + req.date + "at" + req.time}
                        onOk={this.handleModalOk}
                        onCancel={this.handleModalCancel}
                        visible={this.state.modalVisible}
                    >
                        {"Request by " + req.created_by + " for a " + req.request_type
                                + " on " + req.date + " at " + req.time}
                    </Modal>
                </td>
            );
        }
    }

}
export default PreviousRequests;