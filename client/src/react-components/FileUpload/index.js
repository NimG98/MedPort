import React from "react";
import { withRouter } from "react-router";

import 'antd/dist/antd.css';
import "./styles.css";
import { Form, Upload, Card, Select, message, Button, Input }  from "antd";
import { UploadOutlined } from '@ant-design/icons';

import Header from './../Header';
import NavBar from './../NavBar';

import { UserType } from "../../constants/userType";
import { getUserUploadedFiles, addFile } from "../../actions/file";
import { getUserProfileInfo } from "../../actions/user";
import { getPatientsByDoctorID } from "../../actions/doctor";

import moment from "moment";

class FileUpload extends React.Component {

    constructor(props) {
        super(props)
        this.props.history.push("/upload");

        this.state = {
            user: this.props.appComponent.state.loggedInUser,
            userType: this.props.appComponent.state.userType,
            patientsListDropdown: [],
            fileList: [],
            previousFileDownloadLinks: [],
            uploading: false,
        }

        this.displayPatients = this.displayPatients.bind(this);
        this.updatePreviousFilesOnPage = this.updatePreviousFilesOnPage.bind(this);
        this.displayLastUploadedFiles = this.displayLastUploadedFiles.bind(this);
        this.onUploadChange = this.onUploadChange.bind(this);
        this.onFinish = this.onFinish.bind(this);
        this.getBase64 = this.getBase64.bind(this);
    }

    async componentDidMount() {
        if(this.state.userType === UserType.doctor) {
            await this.displayPatients();
        }
        await this.updatePreviousFilesOnPage();
    }

    updatePreviousFilesOnPage = async () => {
        const previousFileDownloadLinks = await this.displayLastUploadedFiles(5);
        this.setState({
            previousFileDownloadLinks: previousFileDownloadLinks.reverse()
        });
    }

    displayLastUploadedFiles = async (numOfFilesToDisplay) => {
        const fileLinks = [];
        const lastFilesList = (await getUserUploadedFiles(this)).slice(-numOfFilesToDisplay);

        for(var fileInfo of lastFilesList) {
            const fileLink = (<a className="previousFileDownloadLink" download={fileInfo.fileName} href={fileInfo.base64}>
                                {fileInfo.fileName}
                            </a>);
            fileLinks.push(fileLink);
        }
        return fileLinks;
    }

    onUploadChange = (data) => {
        var uploadedFileList = [...data.fileList];
        uploadedFileList = uploadedFileList.slice(-1);

        const isPdf = data.file.type === 'application/pdf'
        if (!isPdf) {
            message.error('You can only upload PDF file!');
        }
        const isLt2M = data.file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('PDF must smaller than 2MB!');
        }
        
        if(isPdf && isLt2M){
            this.setState({ listedUploadFile: uploadedFileList });
            const fileName = data.file.name;

            this.getBase64(data.file, fileBase64 => {
                this.setState({ currentUploadFileBase64: fileBase64, currentUploadFileName: fileName })
            });
        }
    }

    onFinish = async (formValues) => {
        if(!this.state.currentUploadFileName || !this.state.currentUploadFileBase64) {
            message.error('Please submit a file!');
            return;
        }
        const uploader = (await getUserProfileInfo())._id;
        if(formValues["patient"] && this.state.userType === UserType.doctor) {
            var patient = this.state.patients[formValues["patient"]]._id;
        } else if (this.state.userType === UserType.patient) {
            var patient = uploader;
        }

        const reportType = formValues["reportType"];
        const dateUploaded = moment(); // current time
        const fileName = this.state.currentUploadFileName;
        const base64 = this.state.currentUploadFileBase64;

        const fileInfo = {uploader, patient, reportType, dateUploaded, fileName, base64}

        await addFile(fileInfo);
        this.setState({ currentUploadFileBase64: null, currentUploadFileName: null })
        await this.updatePreviousFilesOnPage();
    }
    
    getBase64 = (pdf, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(pdf);
    }

    render() {
        return(
            <div>
                <Header appComponent={this.props.appComponent}/>
                <NavBar appComponent={this.props.appComponent} />
                <div className="uploadFileFormPage">
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
                            <p className="uploadReportTypeDescription">
                                    Please input the type of medical file that you are uploading. 
                                    For example, if this file contains a blood test report, then please input "Blood Test".
                            </p>
                            <Form.Item
                                name="reportType"
                                label="Medical Report Type:"
                                className="reportTypeLabel"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input the type of medical report."
                                    },
                                ]}
                            >
                                <Input className="uploadReportTypeInput"/>
                            </Form.Item>
                            <Form.Item
                                name="upload"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please upload a file."
                                    },
                                ]}
                            >
                                <Upload 
                                    fileList={this.state.listedUploadFile}
                                    showUploadList={showUploadListProps}
                                    onChange={this.onUploadChange} 
                                    beforeUpload={() => false}// beforeUpload={this.beforeUpload} 
                                    action="/api/files"                            
                                >
                                    <Button className="uploadButton">
                                        <UploadOutlined /> Click to upload
                                    </Button>
                                </Upload>
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit" className="uploadFormSubmitButton">
                                    Submit
                                </Button>
                            </Form.Item>
                        </Form>
                    </Card>
                    <h3 className="previouslyUploadedFilesTitle">
                        Previously Uploaded Files
                    </h3>
                    <Card className="previouslyUploadedFilesCard">
                        {this.state.previousFileDownloadLinks.length === 0 && <p>No files have been uploaded.</p>}
                        {this.state.previousFileDownloadLinks}
                    </Card>
                </div>
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

const showUploadListProps = {
    showRemoveIcon: false,
}

export default withRouter(FileUpload);