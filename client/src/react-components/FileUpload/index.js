import React from "react";

// import 'bootstrap/dist/css/bootstrap.min.css';
// import { Container, Form, Card, Col, Row} from 'react-bootstrap'
import 'antd/dist/antd.css';
import "./styles.css";
import { Form, Upload, Card, Select, message, Button }  from "antd";
import { UploadOutlined } from '@ant-design/icons';

import Header from './../Header';
import NavBar from './../NavBar';

import { UserType } from "../../constants/userType";


class FileUpload extends React.Component {

    constructor(props) {
        super(props)
        this.props.history.push("/upload");

        this.state = {
            user: this.props.appComponent.state.loggedInUser,
            userType: this.props.appComponent.state.userType,
            patientsListDropdown: [],
            fileList: [],
            uploading: false,
        }

        this.displayPatients = this.displayPatients.bind(this);
    }

    async componentDidMount() {
        if(this.state.userType === UserType.doctor) {
            await this.displayPatients();
        }
        await this.getPreviouslyUploadedFiles();
    }

    getPreviouslyUploadedFiles = async () => {

    }

    uploadFile() {

    }

    handlePreview() {

    }

    render() {
        return(
            <div className="uploadFileFormPage">
                <Header appComponent={this.props.appComponent}/>
                <NavBar appComponent={this.props.appComponent} />
                
                <h1 className="uploadFileTitle">
                    Upload a Medical File
                </h1>
                <Card className="uploadCard">
                    <Form 
                        name="upload-form"
                        className="uploadForm"
                        onFinish={this.onFinish}
                        layout="vertical"
                    >
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
                            name="upload"
                            label="Upload"
                        >
                            <Upload 
                                showUploadList = {showDownloadIcon=true, showRemoveIcon=false}
                                onPreview={this.handlePreview}
                                onChange={this.uploadFile} beforeUpload={beforeUpload} listType="picture" action="/api/files"
                                defaultFileList={this.state.fileList}
                            
                            >
                                <Button>
                                    <UploadOutlined /> Click to upload
                                </Button>
                            </Upload>
                        </Form.Item>
                        {/* <div className="mb-3">
                            <Form.File id="formcheck-api-custom" custom>
                            <Form.File.Input isValid />
                            <Form.File.Label data-browse="Upload">
                                Please select a file to upload.
                            </Form.File.Label>
                            </Form.File>
                        </div> */}
                    </Form>
                </Card>
                <h3 className="previouslyUploadedFilesTitle">
                    Upload a Medical File
                </h3>
                <Card className="card2">
                    File1
                </Card>
                <Card className="card2">
                    File2
                </Card>
                <Card className="card2">
                    File3
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

function beforeUpload(file) {
    const isPdf = file.type === 'image/pdf'
    if (!isPdf) {
        message.error('You can only upload PDF file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('PDF must smaller than 2MB!');
    }
    return isPdf && isLt2M;
}

function getBase64(pdf, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(pdf);
}

export default Upload;