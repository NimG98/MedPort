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

/* Returns a list of the patients under a specific doctor */
export const getPatientsByDoctorID = (doctorID) => {
    const url = ApiRoutes.patientsByDoctorId + doctorID;

    return fetch(url)
        .then(res => {
            if (res.status === 200) {
                return res.json();
            }
        })
        .then(patientsArray => {
            if(patientsArray){
                return patientsArray;
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

/* 
	Returns a list of doctors obtained from the server
*/
export const getDoctors = () => {
	const url = ApiRoutes.doctor;
	
	return fetch(url).then(res => {
		if (res.status === 200) {
			return res.json();
		}
	}).then(doctors => {
		return doctors;
	}).catch(error => {
		console.log(error);
	});
}

/*
	sends server request to delete doctor
	Note: admin functionality
*/
export const deleteDoctor = (doctorID) => {
	const url = ApiRoutes.doctor + "/" + doctorID;
	
	// creating the request
	const request = new Request(url, {
		method: "delete",
	});
	
	return fetch(request).then(res => {
		if (res.status === 200) {
			return res.json();
		}
	}).then(doctor => {
		return doctor;
	}).catch(error => {
		console.log(error);
	});
}

/*
	sends server request to get doctor with id, doctorID
*/
export const getDoctor = (doctorID) => {
	const url = ApiRoutes.doctor + "/" + doctorID;
	
	return fetch(url).then(res => {
		if (res.status === 200) {
			return res.json();
		}
	}).then(doctor => {
		return doctor;
	}).catch(error => {
		console.log(error);
	});
}

export const getPatientsByDoctor = (doctorID) => {
	const url = ApiRoutes.doctor + "/patients/" + doctorID;
	
	return fetch(url).then(res => {
		if (res.status === 200) {
			return res.json();
		}
	}).then(patients => {
		return patients;
	}).catch(error => {
		console.log(error);
	}); 
}

/*
	sends updated doctor object to server
*/
export const updateDoctor = (doctorID, propertiesToChange) => {
	const url = ApiRoutes.doctor + "/" + doctorID;
	
	// creating the request
	const request = new Request(url, {
		method: 'PATCH',
		body: JSON.stringify(propertiesToChange),
		headers: {
			"Accept": "application/json, text/plain, */*",
			"Content-Type": "application/json"
		},
	});
	
	// making the request to the server
	return fetch(request).then(res => {
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
}