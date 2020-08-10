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
import { getUserType, getUserProfileInfo, updateUserProfileInfo } from '../../actions/user';
import { getDoctorByID } from '../../actions/doctor';
import { getInstitutionInfo } from '../../actions/institution';
import { UserType } from '../../constants/userType';

class Profile extends React.Component {

    constructor(props) {
        super(props);

        this.setDoctorInfo = this.setDoctorInfo.bind(this);
        this.setInstitutionInfo = this.setInstitutionInfo.bind(this);
        this.updateUserProfileDetail = this.updateUserProfileDetail.bind(this);

        this.state = {
            user: this.props.appComponent.state.loggedInUser,
            userType: null,
        }
        this.getUserProfileImage = this.getUserProfileImage.bind(this);
    }

    componentDidMount () {
        this.setProfileDetails();
    }

    setProfileDetails = () => {
        console.log(this.state);
        getUserType(this.props.appComponent.state.loggedInUser, null, this).then( (userType) => {
            console.log(this.state);
            return this.state;
        })
        .then( (state) => {
            return getUserProfileInfo(null, null, this).then( (profileInfoJson) => {
                console.log(this.state);
                return this.state;
            })
        }).then( (state) => {
            if(this.state.userType === UserType.patient) {
                getDoctorByID(this.state.doctor, this.setDoctorInfo).then( (doctorJson) => {
                    console.log("doctorJson");
                    console.log(doctorJson)
                    console.log(this.state)
                })
            }
            else if(this.state.userType === UserType.doctor) {
                getInstitutionInfo(this.state.institutionID, this.setInstitutionInfo).then( (institutionJson) => {
                    console.log("institutionJson");
                    console.log(institutionJson)
                    console.log(this.state)
                });
            }
        })
    }

    setDoctorInfo(doctorInfo) {
        this.setState({doctor: doctorInfo.generalProfile});
    }

    setInstitutionInfo(institutionInfo) {
        this.setState({institutionInfo: institutionInfo});
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
                    {this.state.generalProfile && this.state.generalProfile.firstName && this.state.generalProfile.lastName &&
                        <h1 className="loggedInUserProfileName">
                            {this.state.userType === UserType.doctor && "Dr. "}
                            {this.state.generalProfile.firstName + " " + this.state.generalProfile.lastName}
                        </h1>
                    }
                    <Card className="profileInfoCard">
                        <ul>
                            {this.state.generalProfile && this.state.generalProfile.email &&
                                <ProfileDetail detailName="Email" detailValue={this.state.generalProfile.email} isEditable={true} detail="generalProfile.email" profileComponent={this}/>
                            }
                            {this.state.userType === UserType.patient && this.state.address && this.state.postalCode && this.state.HCN && this.state.doctor &&
                            this.state.doctor.firstName && this.state.doctor.lastName &&
                                <div className="specificUserTypeDetails">
                                    <ProfileDetail detailName="Address" detailValue={this.state.address} isEditable={true} detail="address" profileComponent={this}/>
                                    <ProfileDetail detailName="Postal Code" detailValue={this.state.postalCode} isEditable={true} detail="postalCode" profileComponent={this}/>
                                    <ProfileDetail detailName="Health Card Number" detailValue={this.state.HCN} isEditable={false}/>
                                    <ProfileDetail detailName="Doctor" 
                                                   detailValue={this.state.doctor.firstName + " " + this.state.doctor.lastName}
                                                   isEditable={false}/>
                                </div>
                            }
                            {this.state.userType === UserType.doctor && this.state.MID &&
                                <div className="specificUserTypeDetails">
                                    <ProfileDetail detailName="Medical Identification Number" detailValue={this.state.MID} isEditable={false}/>
                                </div>
                            }
                        </ul>
                    </Card>
                    {this.state.userType === UserType.doctor && this.state.institutionInfo &&
                        <Card className="institutionInfoCard">
                            <h3>{this.state.institutionInfo.name}</h3>
                            <ul>
                                <ProfileDetail detailName="Address" detailValue={this.state.institutionInfo.address} isEditable={false}/>
                                <ProfileDetail detailName="Postal Code" detailValue={this.state.institutionInfo.postalCode} isEditable={false}/>
                                <ProfileDetail detailName="Phone Number" detailValue={this.state.institutionInfo.phoneNumber} isEditable={false}/>
                            </ul>
                        </Card>
                    }
                </div>
            </div>
        );
    }

    updateUserProfileDetail(profileDetail, value) {
        updateUserProfileInfo({name: profileDetail, value: value}, this).then( (profileInfoJson) => {
            console.log(profileInfoJson);
            console.log(this.state);
            
        })
        // this.forceUpdate();
    }
}
export default withRouter(Profile);