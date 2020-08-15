import React from 'react';
import { withRouter } from "react-router";

import defaultProfileImage from "./static/default-profile-icon.png";
import { getUserProfileImage, updateUserProfileImage } from '../../actions/user';
import { UserType } from '../../constants/userType';

class ProfileImage extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
            profileImageSrc: null
        }

        this.getUserProfileImage = this.getUserProfileImage.bind(this);
        this.setUserProfileImage = this.setUserProfileImage.bind(this);
    }

    componentDidMount() {
        if(this.props.appComponent.state.userType !== UserType.admin){
            this.getUserProfileImage();
        }
    }
   
    componentDidUpdate(prevProps) {
        if (prevProps.file !== this.props.file) {
            this.setUserProfileImage();
        }
    }

    getUserProfileImage() {
        getUserProfileImage(this).then( (json) => {
            if(json.imageBase64 === null) {
                this.setState({profileImageSrc: defaultProfileImage})
            }
        })
    }

    setUserProfileImage() {
        const file = this.props.file;
        if (file.status === 'done') {
            getBase64(file.originFileObj, profileImageSrc => {
                updateUserProfileImage(profileImageSrc, this)
            });
        }
    }

    render() {

        return(
            <>
                {this.state.profileImageSrc 
                ? <img className={this.props.imgClassName} alt={this.props.altName} src={this.state.profileImageSrc}/> 
                : <img className={this.props.imgClassName} alt={this.props.altName} src={defaultProfileImage}/>
                }
            </>
        );
    }
}

function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

export default withRouter(ProfileImage);