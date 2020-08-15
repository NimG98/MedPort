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

/* 
	Returns a list of patients obtained from the server
*/
export const getPatients = () => {
	const url = ApiRoutes.patient;
	
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
	sends server request to delete patient
	Note: admin functionality
*/
export const deletePatient = (patientID) => {
	// code below requires server call
	return true;
}