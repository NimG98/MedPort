// Functions to help with institution actions.

import { ApiRoutes } from "../constants/apiRoutes";

/* Returns the institution's info when given institutionID */
export const getInstitutionInfo = (institutionID, callback) => {
    const url = "/api/institutions/" + institutionID;

    return fetch(url)
        .then(res => {
            if (res.status === 200) {
                return res.json();
            }
        })
        .then(institutionJson => {
            if(institutionJson){
                if(callback){
                    callback(institutionJson);
                }
                return institutionJson;
            }
        })
        .catch(error => {
            console.log(error);
        });
}

/* 
	submits new institution information to server for account creation.
	Note: returns newly created institution's ID on success
*/
export const addInstitution = (institution) => {
	const url = ApiRoutes.institution;
	
	// creating the request
	const request = new Request(url, {
		method: "post",
		body: JSON.stringify(institution),
		headers: {
			"Accept": "application/json, text/plain, */*",
			"Content-Type": "application/json"
		},
	});
	
	// making the request to the server
	// returns a promise
	return fetch(request)
	.then(res => {
		// parse json
		if (res.status === 200) {
			return res.json();
		}
	}).then(institutionInfo => {
		// return institution id
		return institutionInfo._id;
	}).catch(error => {
		// log error
		console.log(error);
	});
}

/* 
	Returns a list of institutions obtained from the server
*/
export const getInstitutions = async () => {
	const url = ApiRoutes.institution;
	
	// return a promise
	return fetch(url).then(res => {
		// parse json
		if (res.status === 200) {
			return res.json();
		}
	}).then(institutions => {
		// return list of institutions
		return institutions;
	}).catch(error => {
		// log error
		console.log(error);
	});
};

/*
	sends server request to delete institution
	Note: admin functionality
*/
export const deleteInstitution = (institutionID) => {
	const url = ApiRoutes.institution + "/" + institutionID;
	
	// creating the request
	const request = new Request(url, {
		method: "delete",
	});
	
	return fetch(request).then(res => {
		if (res.status === 200) {
			return res.json();
		}
	}).then(institutionInfo => {
		// returns deleted institution info
		return institutionInfo;
	}).catch(error => {
		console.log(error);
	});
}

/*
	sends server request to get institution with id, insitutionID
*/
export const getInstitution = (institutionID) => {
	const url = ApiRoutes.institution + "/" + institutionID;
	
	return fetch(url).then(res => {
		if (res.status === 200) {
			return res.json();
		}
	}).then(institutionInfo => {
		return institutionInfo;
	}).catch(error => {
		console.log(error);
	});
}


/*
	sends server request to get list of doctors who belong to the institution with institutionID
*/
export const getDoctorsByInstitution = (institutionID) => {
	const url = ApiRoutes.institution + "/doctors/" + institutionID;
	
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
	sends updated institution object to server
*/
export const updateInstitution = (institutionID, institution) => {
	const url = ApiRoutes.institution + "/" + institutionID;
	
	// creating the request
	const request = new Request(url, {
		method: "put",
		body: JSON.stringify(institution),
		headers: {
			"Accept": "application/json, text/plain, */*",
			"Content-Type": "application/json"
		},
	});
	
	// making the request to the server
	// returns a promise
	return fetch(request)
	.then(res => {
		// parse json
		if (res.status === 200) {
			return res.json();
		}
	}).then(institutionInfo => {
		// returns new institution
		return institutionInfo;
	}).catch(error => {
		// log error
		console.log(error);
	});
}