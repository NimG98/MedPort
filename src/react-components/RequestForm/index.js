import React from "react";
import { withRouter } from "react-router";

import "./styles.css";
import 'antd/dist/antd.css';
import { Row, Card, Form, Input, Button, Select, DatePicker, TimePicker} from "antd";

import { getPatientsByDoctor, getUserType, getDoctorID } from "../../actions/app";
import { UserType } from "../../constants/userType";
import { LeftOutlined } from "@ant-design/icons";

const { TextArea } = Input;

class RequestForm extends React.Component {

    constructor(props) {
        super(props);
        console.log("requestform", this.props.loggedInUser);

        this.state = {
            user: this.props.loggedInUser,
            userType: getUserType(this.props.loggedInUser),
            
        }
        // this.userType = getUserType(this.state.user);
        // this.patients = getPatientsByDoctor(getDoctorID(this.state.user));
        this.onClick = this.onClick.bind(this);
        this.onFinish = this.onFinish.bind(this);
        this.displayPatients = this.displayPatients.bind(this);
        // this.getPatients = this.getPatients.bind(this);
    }

    onFinish = (formValues) => {
        console.log("Request submitted with the following values: ", formValues);
    }

    getPatients () {
        if(this.state.userType === UserType.doctor) {
            console.log("being called")
            const patients = getPatientsByDoctor(getDoctorID(this.state.user))
            // this.setState({ ...this.state, patients: patients})
            console.log(patients);
            return patients;
        }
    }

    onClick() {
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
                                {this.displayPatients(this.getPatients())}
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

    displayPatients = (patients) => {
        var patientNameElements = [];

        for (var patientInfo in patients) {
            patientNameElements.push(<Select.Option key={patientInfo}>{patients[patientInfo].firstName + " " + patients[patientInfo].lastName}</Select.Option>)
        }

        return (<Select>{patientNameElements}</Select>)
    }

}
export default withRouter(RequestForm);