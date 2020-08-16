import React from 'react';
import { withRouter } from "react-router";
import { Link } from "react-router-dom";

import "./styles.css";

import { redirect } from '../../actions/router';
import { logout } from '../../actions/user';
import { UserType } from '../../constants/userType';
import ProfileImage from '../ProfileImage';

class ProfileDropdown extends React.Component {

    constructor(props) {
        super(props);

        this.logout = this.logout.bind(this);
        this.goToProfile = this.goToProfile.bind(this);
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
                <ProfileImage altName="profileImageforLoggedInUser" imgClassName="userProfileImage" appComponent={this.props.appComponent}/>
                {/* <img alt="profileImageforLoggedInUser" className="userProfileImage" src={this.getUserProfileImage()}/> */}
                <div className="dropdownContent">
                    {this.props.appComponent.state.userType !== UserType.admin &&
                        <Link className="profileLink" onClick={this.goToProfile} to="/profile">Profile</Link>
                    }
                    <Link className="logout" onClick={this.logout} to="/">Log out</Link>
                </div>
            </div>
        );
    }
}
export default withRouter(ProfileDropdown);