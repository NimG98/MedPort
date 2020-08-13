import React from "react";

import "./styles.css";
import 'antd/dist/antd.css';
import { InfoCircleOutlined } from '@ant-design/icons';
import { Tabs, Button, Modal }  from "antd";

import { getUserProfileInfo } from '../../actions/user';
import { getUserRequests } from "../../actions/request";

import moment from 'moment';

const { TabPane } = Tabs;

class PreviousRequests extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            user: this.props.loggedInUser,
            pendingRequests: null,
            confirmedRequests: null,
            modalVisible: false,
            pendingRequestsRowData: null,
            confirmedRequestsRowData: null
        };

        this.displayTableHeaders = this.displayTableHeaders.bind(this);
        this.displayTableElements = this.displayTableElements.bind(this);
        this.displayActionNeeded = this.displayActionNeeded.bind(this);
    }

    tableHeaderNames = ["Created By", "Request To", "Request Type", "Date", "Time", "Reason"];
    actionHeaderName = "Action Needed";

    componentDidMount(){
        this.displayTableElements("pending");
        this.displayTableElements("confirmed");
    }


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
                                {/* {this.displayTableElements("pending")} */}
                                {this.state.pendingRequestsRowData}
                            </tbody>
                        </table>
                    </TabPane>
                    <TabPane tab="Confirmed Requests" key="2">
                        <table>
                            <thead>
                                <tr>{this.displayTableHeaders("confirmed")}</tr>
                            </thead>
                            <tbody>
                                {/* {this.displayTableElements("confirmed")} */}
                                {this.state.confirmedRequestsRowData}
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

        getUserRequests(this).then( requests => {
            if(status === "pending") {
                requestData = this.state.pendingRequests;
            } else if(status === "confirmed") {
                requestData = this.state.confirmedRequests;
            }
            console.log(requestData)
    
            for(var req in requestData) {
                // var actionNeeded = this.displayActionNeeded(requestData[req]);
                var createdByName = null;
                var toName = null;
                getUserProfileInfo(requestData[req].createdBy, null, null).then( createdByUser => {
                    createdByName = createdByUser.firstName + " " + createdByUser.lastName;
                    return getUserProfileInfo(requestData[req].receiver, null, null);
                })
                .then( toUser => {
                    toName = toUser.firstName + " " + toUser.lastName;
                    return "hello"
                })
                .then( (whatever) => {
                    tableRows.push(
                        <tr key={req}>
                            <td>{createdByName}</td>
                            <td>{toName}</td>
                            <td>{requestData[req].type}</td>
                            <td>{moment(requestData[req].date).format('MMMM Do YYYY')}</td>
                            <td>{requestData[req].time}</td>
                            <td>{requestData[req].reason}</td>
                            {status === "pending" && this.displayActionNeeded(requestData[req], createdByName)}
                        </tr>
                    );
                    return tableRows
                })
                .then( tableRows => {
                    if(status === "pending") {
                        this.setState({pendingRequestsRowData: tableRows})
                    } else if(status === "confirmed") {
                        this.setState({confirmedRequestsRowData: tableRows})
                    }
                })
            }
        })
    }

    // Note: function only called for pending requests, since action is pending
    displayActionNeeded = (req, createdByName) => {
        // Pending on other person
        if(req.createdBy === this.state.user) {
            return (
                <td>
                    Waiting for confirmation
                </td>
            );
        } else {
            const modalMessage = "Request by " + createdByName + " for a " + req.type + " on " + moment(req.date).format('MMMM Do YYYY') + " at " + req.time + ".";
            return (
                <td>
                    <Button onClick={this.showModal} className="confirm-request-button">
                        Confirm
                    </Button>

                    <Modal
                        title="Do you want to confirm the following request?"
                        icon={<InfoCircleOutlined />}
                        onOk={this.handleModalOk}
                        onCancel={this.handleModalCancel}
                        visible={this.state.modalVisible}
                    >
                        {modalMessage}
                    </Modal>
                </td>
            );
        }
    }

}
export default PreviousRequests;