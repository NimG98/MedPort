import React from "react";
import { withRouter } from "react-router";

import "./styles.css";
import 'antd/dist/antd.css';
import { Row, Card, Form, Input, Button, Select, DatePicker, TimePicker} from "antd";

import { getUserProfileInfo } from '../../actions/user';
import { getPatientsByDoctorID } from "../../actions/doctor";

import { UserType } from "../../constants/userType";
import { LeftOutlined } from "@ant-design/icons";
import { addRequest } from "../../actions/request";

import moment from 'moment';

const { TextArea } = Input;

class RequestForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            user: this.props.appComponent.state.loggedInUser,
            userType: this.props.appComponent.state.userType,
            patientsListDropdown: []
        }
        this.onClick = this.onClick.bind(this);
        this.onFinish = this.onFinish.bind(this);
        this.displayPatients = this.displayPatients.bind(this);
    }

    async componentDidMount() {
        if(this.state.userType === UserType.doctor) {
            await this.displayPatients();
        }
    }

    onFinish = async (formValues) => {
        const createdByUser = await getUserProfileInfo();
        const createdBy = createdByUser._id;
        if(formValues["patient"] && this.state.userType === UserType.doctor){
            var receiver = this.state.patients[formValues["patient"]]._id;
        } else if (this.state.userType === UserType.patient) {
            var receiver = createdByUser.doctor;
        }
        
        const requestTypes = ["Phone call", "Appointment", "Test"];
        const type = requestTypes[formValues["requestType"]];

        const date = moment(formValues["date"]).format('YYYY-MM-DD');
        const time = moment(formValues["time"]).format('h:mm A');

        var requestInfo = {createdBy, receiver, type, date, time};

        if(formValues["reason"]){
            const reason = formValues["reason"];
            requestInfo["reason"] = reason;
        }
        
        await addRequest(requestInfo);
        this.props.backToPreviousRequestsPage();
    }

    onClick = () => {
        this.props.backToPreviousRequestsPage();
    }

    render() {

        return(
            <div className="newRequestFormPage">
                <h1 className="requestTitle">
                    Submit a request
                </h1>
                <Button onClick={this.onClick} className="back-to-previous-req-button">
                    <LeftOutlined />
                </Button>
                <Card className="requestFormCard">
                    <Form
                        name="request-form"
                        className="requestForm"
                        onFinish={this.onFinish}
                        layout="vertical"
                    >
                        {/* Only display this element if user is a doctor */}
                        {this.state.userType === UserType.doctor &&
                            <Form.Item
                                name="patient"
                                label="Patient:"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please select a Patient.',
                                    },
                                ]}
                            >
                                {this.state.patientsListDropdown}
                            </Form.Item>
                        }
                        <Form.Item
                            name="requestType"
                            label="Request Type:"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please select an option.',
                                },
                            ]}
                        >
                            <Select>
                                <Select.Option key={0}>Phone Call</Select.Option>
                                <Select.Option key={1}>Appointment</Select.Option>
                                <Select.Option key={2}>Test</Select.Option>
                            </Select>
                        </Form.Item>
                        <Row className="request-date-time">
                            <Form.Item
                                name="date"
                                label="Date:"
                                className="requestDateFormItem"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please select a date.',
                                    },
                                ]}
                            >
                                <DatePicker />
                            </Form.Item>
                            <Form.Item
                                name="time"
                                label="Time:"
                                className="requestTimeFormItem"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please select a time.',
                                    },
                                ]}
                            >
                                <TimePicker use12Hours format="h:mm A"/>
                            </Form.Item>
                        </Row>
                        <Form.Item
                            name="reason"
                            label="Reason:"
                        >
                            <TextArea placeholder="Input your reason for submitting this request" autoSize className="requestReasonInput"/>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="request-form-button">
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
            </div>
        );
    }

    displayPatients = async () => {
        var patientNameElements = [];
        const doctorID = (await getUserProfileInfo())._id;
        const patients = await getPatientsByDoctorID(doctorID);
        this.setState({patients: patients})

        for (var patientInfo of patients) {
            patientNameElements.push(<Select.Option key={patients.indexOf(patientInfo)}>{patientInfo.generalProfile.firstName + " " + patientInfo.generalProfile.lastName}</Select.Option>)
        }

        const patientsListDropdown = <Select>{patientNameElements}</Select>;
        this.setState({patientsListDropdown: patientsListDropdown})
    }

}
export default withRouter(RequestForm);