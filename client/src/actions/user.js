// Functions to help with user actions.

/* Gets the type of the user (patient/doctor/admin) */
export const getUserType = (username, callback, component) => {
    const url = "/api/users/userType/" + username
    var userType = null;
    
    return fetch(url)
        .then(res => {
            if (res.status === 200) {
                return res.json();
            }
        })
        .then(json => {
            if (json && json.userType) {
                userType = json.userType;
                if(component) {
                    component.setState({...component.state, userType: json.userType });
                }
                if(callback) {
                    callback(userType);
                }
                return userType;
            }
        })
        .catch(error => {
            console.log(error);
        });
}

// A function to check if a user is logged in on the session cookie
export const readCookie = (app) => {
    const url = "/api/users/check-session";

    fetch(url)
        .then(res => {
            if (res.status === 200) {
                return res.json();
            }
        })
        .then(json => {
            if (json && json.loggedInUser) {
                app.setState({ loggedInUser: json.loggedInUser });
            }
        })
        .catch(error => {
            console.log(error);
        });
};

// A functon to update the login form state
export const updateLoginForm = (loginComp, field) => {
    const value = field.value;
    const name = field.name;

    loginComp.setState({
        [name]: value
    });
};

// A function to send a POST request with the user to be logged in
export const login = (loginComp, app) => {
    // Create our request constructor with all the parameters we need
    const request = new Request("/api/users/login", {
        method: "post",
        body: JSON.stringify(loginComp.state),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    });

    // Send the request with fetch()
    fetch(request)
        .then(res => {
            if (res.status === 200) {
                return res.json();
            }
        })
        .then(json => {
            if (json.loggedInUser !== undefined) {
                app.setState({ loggedInUser: json.loggedInUser, userType: json.userType });
            }
        })
        .catch(error => {
            console.log(error);
        });
};

// A function to send a GET request to logout the current user
export const logout = (app) => {
    const url = "/api/users/logout";

    fetch(url)
        .then(res => {
            app.setState({
                loggedInUser: null,
                message: { type: "", body: "" }
            });
        })
        .catch(error => {
            console.log(error);
        });
};

/* Returns the profile info of the loggedInUser or a different user by username */
export const getUserProfileInfo = (username, callback) => { 
    // get all of the profile info for the loggedInUser
    var url = "/api/profile/";

    // get general profile info for a different user (firstname, lastname, email)
    if(username){
        url += username;
    }

    fetch(url)
        .then(res => {
            if (res.status === 200) {
                return res.json();
            }
        })
        .then(profileInfoJson => {
            if (profileInfoJson) {
                if(callback){
                    callback(profileInfoJson);
                }
                return profileInfoJson;
            }
        })
        .catch(error => {
            console.log(error);
        });
}