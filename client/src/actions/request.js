// Functions to help with request actions.

import { ApiRoutes } from "../constants/apiRoutes";

/* Get all requests made by the loggedInUser */
export const getUserRequests = (component) => {
    const url = ApiRoutes.request;

    return fetch(url)
        .then(res => {
            if (res.status === 200) {
                return res.json();
            }
        })
        .then(requestsArray => {
            if (requestsArray) {
                if(component){
                    console.log("here fetch then component")
                    const pendingRequests = requestsArray.filter( request => request.status === "pending");
                    const confirmedRequests = requestsArray.filter( request => request.status === "confirmed");
                    component.setState({ pendingRequests: pendingRequests, confirmedRequests: confirmedRequests });
                }
                console.log("requestsArray", requestsArray)
                return requestsArray;
            }
        })
        .catch(error => {
            console.log(error);
        });
}