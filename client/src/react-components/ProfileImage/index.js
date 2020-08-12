import React from 'react';
import { withRouter } from "react-router";

import defaultProfileImage from "./static/default-profile-icon.png";
import { getUserProfileImage, updateUserProfileImage } from '../../actions/user';

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
        this.getUserProfileImage();
    }
   
    componentDidUpdate(prevProps) {
        if (prevProps.file !== this.props.file) {
            this.setUserProfileImage();
        }
    }

    getUserProfileImage() {
        getUserProfileImage(this).then( (json) => {
            console.log(json.imageBase64);
            if(json.imageBase64 === null) {
                this.setState({profileImageSrc: defaultProfileImage})
            }
        })
    }

    setUserProfileImage() {
        const file = this.props.file;
        console.log("setUserProfileImage")
        if (file.status === 'done') {
            getBase64(file.originFileObj, profileImageSrc => {
                //this.setState({profileImageSrc})
                updateUserProfileImage(profileImageSrc, this).then( () => {
                    console.log(this.state)
                });
            });
        }
    }

    render() {
        /* if(this.state.profileImageSrc) {
            return(
                <img className={this.props.imgClassName} alt={this.props.altName} src={this.state.profileImageSrc}/>
            );
        } else{
            console.log("else statement")
            return(
                <img className={this.props.imgClassName} alt={this.props.altName} src={defaultProfileImage}/>
            );
        } */

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