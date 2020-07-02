import { MOCK_USERS as users} from "../mock-data/mock";
import { MOCK_REQUESTS as allRequests} from "../mock-data/mock";
import { MOCK_PATIENTS as allPatients} from "../mock-data/mock";
import { MOCK_DOCTORS as allDoctors} from "../mock-data/mock";

/* 
	submits new doctor information to server for account creation
*/
export const addDoctor = (doctor) => {
	// code below requires server call
	return true;
};

/* 
	Returns a list of institutions obtained from the server
 */
export const getInstitutions = () => {
	// code below requires server call
	
	// mock data
	const institutions = [
		{ id: 1, name: 'Hospital A', address: '123 Main St', postalCode: 'B5C 4J6', phoneNumber: '9055558523'},
		{ id: 2, name: 'Clinic B', address: '13 Fake Ave', postalCode: 'A1B 2C3', phoneNumber: '4165551234'},
	]
	
	return institutions;
};

/* 
	submits new institution information to server for account creation.
	Note: returns newly created institution's ID on success
*/
export const addInstitution = (institution) => {
	// code below requires server call
	return 3;
}

/* 
	submits new patient information to server for account creation
	Note: submits patient's used referral code as well
*/
export const addPatient = (patient, code) => {
	// code below requires server call
	return true;
};

// submits referral code to server and gets a refferrerID on success
export const submitReferralCode = (code) => {
	// code below requires server call
	
	// mock data
	const referrals = {
			// code: doctorID
			'P001': 1,
	}
	
	const refferrerID = referrals[code];
	
	return refferrerID;
}

/*
	checks if username already exists on server
	returns true iff username exists, otherwise returns false
*/
export const checkUserName = (username) => {
	// code below requires server call
	
	const formattedUsername = username.toLowerCase();
	
	// mock data
	const users = [
		'user',
		'user2',
		'user3',
	]
	
	return users.includes(formattedUsername);
}

// Validates if the username is associated with a registered user,
// and that the user's password is correct
export const validateLogin = (app, username, password) => {
	var isValid = false;
	
	// code below requires server call
	// to look at the user database and see usernames/passwords

	// users is MOCK_USERS from ../mock-data/mock.js

	isValid = users[username] && users[username].password === password;
	
	if(isValid) {
		app.setState({
			loggedInUser: username
		});
	}

	return isValid;
}

// Gets a list of requests with a certain status from a certain user
export const getUserRequestsByStatus = (username, status) => {

	var userRequests = [];
	
	// code below requires server call
	// to get all of the requests in the database

	// allRequests is MOCK_REQUESTS from ../mock-data/mock.js

	for(var req in allRequests) {
		if((allRequests[req].created_by === username || allRequests[req].to === username) && allRequests[req].status === status) {
			userRequests.push(allRequests[req]);
		}
	}

	return userRequests;
}

// Gets the type of the user (patient/doctor/secretary/admin)
export const getUserType = (username) => {

	// code below requires server call
	// to look at the user database and see usernames/passwords

	// users is MOCK_USERS from ../mock-data/mock.js
	return users[username].type;
}

// Gets the patients assigned to a specific doctor
export const getPatientsByDoctor = (doctorID) => {
	console.log(doctorID);

	var patients = []

	// code below requires server call
	// to look at the patient database

	// allPatients is MOCK_PATIENTS from ../mock-data/mock.js

	for (var patientUsername in allPatients) {
		console.log(patientUsername);
		if(allPatients[patientUsername].doctorID === doctorID) {
			patients.push(allPatients[patientUsername])
		}
	}

	console.log("getPatientsByDoctor");

	return patients;
}

export const getDoctorID = (username) => {
	return allDoctors[username].doctorID;
}