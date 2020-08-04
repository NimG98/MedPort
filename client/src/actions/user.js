// Functions to help with user actions.

/* Gets the type of the user (patient/doctor/admin) */
export const getUserType = (username) => {
    const url = "/api/users/userType";
    var userType = null;
    
    return fetch(url)
        .then(res => {
            if (res.status === 200) {
                return res.json();
            }
        })
        .then(json => {
            if (json) {
                userType = json.userType;
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
                app.setState({ loggedInUser: json.loggedInUser });
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
