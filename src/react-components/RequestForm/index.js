import React from "react";
import { withRouter } from "react-router";

import "./styles.css";
// import 'antd/dist/antd.css';
import { Row, Card, Form, Input, Button, Select, DatePicker, TimePicker} from "antd";

import { getPatientsByDoctor, getUserType, getDoctorID } from "../../actions/app";
import { UserType } from "../../constants/userType";

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

    render() {

        return(
            <div className="patientRequest">
                <h1 className="requestTitle">
                    Submit a request
                </h1>
                <Card className="requestFormCard">
                    <Form
                        name="patientRequestForm"
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
                                <Select.Option>Phone Call</Select.Option>
                                <Select.Option>Appointment</Select.Option>
                                <Select.Option>Test</Select.Option>
                            </Select>
                        </Form.Item>
                        <Row className="request-date-time">
                            <Form.Item
                                name="date"
                                label="Date:"
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
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please select a time.',
                                    },
                                ]}
                            >
                                <TimePicker use12Hours format="h:mm"/>
                            </Form.Item>
                            <Form.Item
                                name="reason"
                                label="Reason:"
                            >
                                <Input placeholder="Input your reason for submitting this request" autoSize />
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit" className="request-form-button">
                                    Submit
                                </Button>
                            </Form.Item>
                        </Row>
                    </Form>
                </Card>
            </div>
        );
    }

    displayPatients = (patients) => {
        var patientNameElements = [];

        for (var patientInfo in patients) {
            patientNameElements.push(<Select.Option>{patients[patientInfo].firstName + " " + patients[patientInfo].lastName}</Select.Option>)
        }

        return (<Select>{patientNameElements}</Select>)
    }

}
export default withRouter(RequestForm);