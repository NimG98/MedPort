import React from 'react';
import { withRouter } from "react-router";
import { Link } from "react-router-dom";

import "./styles.css";

import { getUserProfileImageUrl } from '../../actions/app';
import { redirect } from '../../actions/router';

class ProfileDropdown extends React.Component {

    constructor(props) {
        super(props);

        this.logout = this.logout.bind(this);
    }

    getUserProfileImage() {
        const images = require.context('../../mock-data/user_profile_images', true);
        const profileImageUrl = getUserProfileImageUrl(this.props.appComponent.state.loggedInUser);
        const profileImage = images(profileImageUrl);

        return profileImage;
    }
    

    logout() {
        this.props.appComponent.setState( {loggedInUser: null} );
        redirect(this, '/');
    }

    render() {
        return(
            <div className="profileDropdown">
                <img alt="profileImageforLoggedInUser" className="userProfileImage" src={this.getUserProfileImage()}/>
                <div className="dropdownContent">
                    <Link className="logout" onClick={this.logout} to="/">Log out</Link>
                </div>
            </div>
        );
    }
}
export default withRouter(ProfileDropdown);