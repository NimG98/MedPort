import { ApiRoutes } from '../constants/apiRoutes';

/* 
	submits new patient information to server for account creation
*/
export const addPatient = (patient) => {
	const url = ApiRoutes.patient;
	
	// creating the request
	const request = new Request(url, {
		method: "post",
		body: JSON.stringify(patient),
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
	}).then(patient => {
		// return patient
		return patient;
	}).catch(error => {
		// log error
		console.log(error);
	});
	
};