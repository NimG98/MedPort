import React from 'react';
import { withRouter } from "react-router";

import "./styles.css";
import 'antd/dist/antd.css';
import { Card, Upload } from "antd";
import ImgCrop from 'antd-img-crop';

import Header from '../Header';
import NavBar from '../NavBar';
import ProfileDetail from '../ProfileDetail';
import uploadPlusImage from './static/opaque-upload-profile.png';
import editProfileImagePencil from './static/pencil-edit-icon.png';

import { getUserProfileImageUrl } from '../../actions/app';
import { getUserType, getUserProfileInfo } from '../../actions/user';
import { getDoctorByID } from '../../actions/doctor';
import { getInstitutionInfo } from '../../actions/institution';
import { UserType } from '../../constants/userType';

class Profile extends React.Component {

    constructor(props) {
        super(props);

        this.setProfileDetails = this.setProfileDetails.bind(this);
        this.setDoctorInfo = this.setDoctorInfo.bind(this);
        this.setInstitutionInfo = this.setInstitutionInfo.bind(this);

        this.state = {
            user: this.props.appComponent.state.loggedInUser,
            userType: null,
        }
        // sets this.state.userType to the appropriate userType
        getUserType(this.props.appComponent.state.loggedInUser, null, this);
        getUserProfileInfo(null, this.setProfileDetails);

        this.getUserProfileImage = this.getUserProfileImage.bind(this);

    }

    setProfileDetails(profileInfo) {
        this.firstName = profileInfo.firstName;
        this.lastName = profileInfo.lastName;
        this.email = profileInfo.email;

        if(this.state.userType === UserType.patient) {
            this.address = profileInfo.address;
            this.postalCode = profileInfo.postalCode;
            this.HCN = profileInfo.HCN;
            getDoctorByID(profileInfo.doctorID, this.setDoctorInfo)
            
        } else if(this.state.userType === UserType.doctor) {
            this.MID = profileInfo.MID;
            getInstitutionInfo(profileInfo.institutionID, this.setInstitutionInfo);
        }
    }

    setDoctorInfo(doctorInfo) {
        this.doctor = doctorInfo.generalProfile;
    }

    setInstitutionInfo(institutionInfo) {
        this.institutionInfo = institutionInfo;
    }

    getUserProfileImage() {
        const images = require.context('../../mock-data/user_profile_images', true);
        const profileImageUrl = getUserProfileImageUrl(this.props.appComponent.state.loggedInUser);
        const profileImage = images(profileImageUrl);

        return profileImage;
    }

    render() {
        return(
            <div className="profilePage">
                <Header appComponent={this.props.appComponent}/>
                <NavBar appComponent={this.props.appComponent} />
                <div className="profilePageContent">
                    <ImgCrop rotate grid shape='round'>
                        <Upload showUploadList={false}>
                            <img alt="bigProfileImageforLoggedInUser" className="bigUserProfileImage" src={this.getUserProfileImage()}/>
                            <img alt="uploadImageOverlay" className="uploadProfileImageOverlay" src={uploadPlusImage} />
                            <img alt="editProfileImagePencil" className="editProfileImagePencil" src={editProfileImagePencil} />
                        </Upload>
                    </ImgCrop>
                    <h1 className="loggedInUserProfileName">
                        {this.state.userType === UserType.doctor && "Dr. "}
                        {this.firstName + " " + this.lastName}
                    </h1>
                    <Card className="profileInfoCard">
                        <ul>
                            <ProfileDetail detailName="Email" detailValue={this.email} isEditable={true}/>
                            {this.state.userType === UserType.patient && 
                                <div className="specificUserTypeDetails">
                                    <ProfileDetail detailName="Address" detailValue={this.address} isEditable={true}/>
                                    <ProfileDetail detailName="Postal Code" detailValue={this.postalCode} isEditable={true}/>
                                    <ProfileDetail detailName="Health Card Number" detailValue={this.HCN} isEditable={false}/>
                                    <ProfileDetail detailName="Doctor" 
                                                   detailValue={this.doctor.firstName + " " + this.doctor.lastName}
                                                   isEditable={false}/>
                                </div>
                            }
                            {this.state.userType === UserType.doctor && 
                                <div className="specificUserTypeDetails">
                                    <ProfileDetail detailName="Medical Identification Number" detailValue={this.MID} isEditable={false}/>
                                </div>
                            }
                        </ul>
                    </Card>
                    {this.state.userType === UserType.doctor && 
                        <Card className="institutionInfoCard">
                            <h3>{this.institutionInfo.name}</h3>
                            <ul>
                                <ProfileDetail detailName="Address" detailValue={this.institutionInfo.address} isEditable={false}/>
                                <ProfileDetail detailName="Postal Code" detailValue={this.institutionInfo.postalCode} isEditable={false}/>
                                <ProfileDetail detailName="Phone Number" detailValue={this.institutionInfo.phoneNumber} isEditable={false}/>
                            </ul>
                        </Card>
                    }
                </div>
            </div>
        );
    }
}
export default withRouter(Profile);