// Functions to help with user actions.

import { ApiRoutes } from "../constants/apiRoutes";

/* Gets the type of the user (patient/doctor/admin) */
export const getUserType = (username, callback, component) => {
    const url = ApiRoutes.getUserType + username;
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
    fetch(ApiRoutes.checkSession)
        .then(res => {
            if (res.status === 200) {
                return res.json();
            }
        })
        .then(json => {
            if (json && json.loggedInUser) {
                app.setState({ loggedInUser: json.loggedInUser, userType: json.userType });
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
    const request = new Request(ApiRoutes.login, {
        method: "post",
        body: JSON.stringify(loginComp.state),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    });

    // Send the request with fetch()
    return fetch(request)
        .then(res => {
            if (res.status === 200) {
                return res.json();
            }
        })
        .then(json => {
            if (json.loggedInUser !== undefined) {
                app.setState({ loggedInUser: json.loggedInUser, userType: json.userType });
                loginComp.displayInvalidCredentials(false);
            } else {
                loginComp.displayInvalidCredentials(true);
            }
        })
        .catch(error => {
            loginComp.displayInvalidCredentials(true);
            console.log(error);
        });
};

// A function to send a GET request to logout the current user
export const logout = (app) => {
    const url = ApiRoutes.logout;

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
    var url = ApiRoutes.profile;

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

/*
	checks if username already exists on server
	returns true iff username exists, otherwise returns false
*/
export const checkUserName = (username) => {
	// code below requires server call
	const url = ApiRoutes.user + "/check-username";
	
	// creating the request
	const request = new Request(url, {
		method: "post",
		body: JSON.stringify({ username: username }),
		headers: {
			"Accept": "application/json, text/plain, */*",
			"Content-Type": "application/json"
		},
	});
	
	return fetch(request).then(res => {
		if (res.status === 200) {
			// username exists
			return true;
		} else if (res.status === 404) {
			// username DNE
			return false;
		}
	}).catch(error => {
		console.log(error);
	});
}