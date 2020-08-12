// Functions to help with doctor actions.

import { ApiRoutes } from "../constants/apiRoutes";

/* Returns the doctor document info when given doctorID */
export const getDoctorByID = (doctorID, callback) => {
    const url = ApiRoutes.doctorById + doctorID;

    return fetch(url)
        .then(res => {
            if (res.status === 200) {
                return res.json();
            }
        })
        .then(doctorJson => {
            if(doctorJson){
                if(callback){
                    callback(doctorJson);
                }
                return doctorJson;
            }
        })
        .catch(error => {
            console.log(error);
        });
}

/* 
	submits new doctor information to server for account creation
*/
export const addDoctor = (doctor) => {
	const url = ApiRoutes.doctor;
	
	// creating the request
	const request = new Request(url, {
		method: "post",
		body: JSON.stringify(doctor),
		headers: {
			"Accept": "application/json, text/plain, */*",
			"Content-Type": "application/json"
		},
	});
	
	// making the request to the server
	return fetch(request)
	.then(res => {
		// parse json
		if (res.status === 200) {
			return res.json();
		}
	}).then(doctorInfo => {
		// return newly created doctor object
		return doctorInfo;
	}).catch(error => {
		// log error
		console.log(error);
	});
};