import React from "react";

import "./styles.css";
import 'antd/dist/antd.css';
import { InfoCircleOutlined } from '@ant-design/icons';
import { Tabs, Button, Modal }  from "antd";

import { getUserProfileInfo } from '../../actions/user';
import { getUserRequests, setRequestStatus } from "../../actions/request";

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
            pendingRequestsRowData: [],
            confirmedRequestsRowData: []
        };

        this.displayTableHeaders = this.displayTableHeaders.bind(this);
        this.displayTableElements = this.displayTableElements.bind(this);
        this.displayActionNeeded = this.displayActionNeeded.bind(this);

        this.showModal = this.showModal.bind(this);
        this.handleModalOk = this.handleModalOk.bind(this);
        this.handleModalCancel = this.handleModalCancel.bind(this);
    }

    tableHeaderNames = ["Created By", "Request To", "Request Type", "Date", "Time", "Reason"];
    actionHeaderName = "Action Needed";

    async componentDidMount(){
        const pendingTableRowsRequests = await this.displayTableElements("pending");
        const confirmedTableRowsRequests = await this.displayTableElements("confirmed");
        this.setState({
            pendingRequestsRowData: pendingTableRowsRequests,
            confirmedRequestsRowData: confirmedTableRowsRequests
        });
    }

    updateRequestsOnPage = async () => {
        const pendingTableRowsRequests = await this.displayTableElements("pending");
        const confirmedTableRowsRequests = await this.displayTableElements("confirmed");
        this.setState({
            pendingRequestsRowData: pendingTableRowsRequests,
            confirmedRequestsRowData: confirmedTableRowsRequests
        });
    }

    showModal = (modalMessage, openRequest) => {
        console.log("showmodal");
        console.log(this.state);
        this.setState({
            modalVisible: true,
            modalMessage: modalMessage,
            openRequest: openRequest
        });
    };

    handleModalOk = async () => {
        await setRequestStatus(this.state.openRequest._id, "confirmed")
        this.setState({
            modalVisible: false,
            openRequest: null
        });
        await this.updateRequestsOnPage();
    };
    
    handleModalCancel = () => {
        this.setState({
            modalVisible: false,
            openRequest: null
        });
    };

    render() {
        return(
            <div className="previousRequests">
                <h1 className="previousRequestsTitle">
                    Previous Requests
                </h1>
                <Modal
                    title="Do you want to confirm the following request?"
                    icon={<InfoCircleOutlined />}
                    onOk={this.handleModalOk}
                    onCancel={this.handleModalCancel}
                    visible={this.state.modalVisible}
                >
                    {this.state.modalMessage}
                </Modal>
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

    displayTableElements = async (status) => {
        // var tableRows = [];
        var requestData = [];

        await getUserRequests(this);
        if(status === "pending") {
            requestData = this.state.pendingRequests;
        } else if(status === "confirmed") {
            requestData = this.state.confirmedRequests;
        }

        // iterative over all requests
        const tableRowsRequests = [];
        for(var req of requestData) {
            const createdByUser = await getUserProfileInfo(req.createdBy, null, null);
            const createdByName = createdByUser.firstName + " " + createdByUser.lastName;

            const toUser = await getUserProfileInfo(req.receiver, null, null);
            const toName = toUser.firstName + " " + toUser.lastName;

            const loggedInUserProfileId = (await getUserProfileInfo())._id;

            const tableRow =  (<tr key={requestData.indexOf(req)}>
                                    <td>{createdByName}</td>
                                    <td>{toName}</td>
                                    <td>{req.type}</td>
                                    <td>{moment(req.date).format('MMMM Do YYYY')}</td>
                                    <td>{req.time}</td>
                                    <td>{req.reason}</td>
                                    {status === "pending" && this.displayActionNeeded(req, createdByName, loggedInUserProfileId)}
                                </tr>);
                
            if(status === "pending") {
                // this.setState({pendingRequestsRowData: this.state.pendingRequestsRowData.concat([tableRow])})
                tableRowsRequests.push(tableRow);
            } else if(status === "confirmed") {
                // this.setState({confirmedRequestsRowData: this.state.confirmedRequestsRowData.concat([tableRow])})
                tableRowsRequests.push(tableRow);
            }
        }

        return tableRowsRequests;
    }

    // Note: function only called for pending requests, since action is pending
    displayActionNeeded = (req, createdByName, loggedInUserProfileId) => {
        // Pending on other person
        console.log(this.state.user)
        console.log(req.createdBy);

        if(req.createdBy === loggedInUserProfileId) {
            return (
                <td>
                    Waiting for confirmation
                </td>
            );
        } else {
            const modalMessage = "Request by " + createdByName + " for a " + req.type + " on " + moment(req.date).format('MMMM Do YYYY') + " at " + req.time + ".";
            return (
                <td>
                    <Button onClick={() => this.showModal(modalMessage, req)} className="confirm-request-button">
                        Confirm
                    </Button>
                </td>
            );
        }
    }

}
export default PreviousRequests;