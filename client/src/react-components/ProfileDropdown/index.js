import React from 'react';
import { withRouter } from "react-router";
import { Link } from "react-router-dom";

import "./styles.css";

import { getUserProfileImageUrl } from '../../actions/app';
import { redirect } from '../../actions/router';
import { logout } from '../../actions/user';

class ProfileDropdown extends React.Component {

    constructor(props) {
        super(props);

        this.logout = this.logout.bind(this);
        this.getUserProfileImage = this.getUserProfileImage.bind(this);
        this.goToProfile = this.goToProfile.bind(this);
    }

    getUserProfileImage() {
        const images = require.context('../../mock-data/user_profile_images', true);
        const profileImageUrl = getUserProfileImageUrl(this.props.appComponent.state.loggedInUser);
        const profileImage = images(profileImageUrl);

        return profileImage;
    }
    

    logout() {
        this.props.history.push("/");
        logout(this.props.appComponent);
    }

    goToProfile() {
        redirect(this, '/profile')
    }

    render() {
        return(
            <div className="profileDropdown">
                <img alt="profileImageforLoggedInUser" className="userProfileImage" src={this.getUserProfileImage()}/>
                <div className="dropdownContent">
                    <Link className="profileLink" onClick={this.goToProfile} to="/profile">Profile</Link>
                    <Link className="logout" onClick={this.logout} to="/">Log out</Link>
                </div>
            </div>
        );
    }
}
export default withRouter(ProfileDropdown);