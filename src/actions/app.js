import { MOCK_USERS as users} from "../mock-data/mock";
import { MOCK_REQUESTS as allRequests} from "../mock-data/mock";
import { MOCK_PATIENTS as allPatients} from "../mock-data/mock";
import { MOCK_DOCTORS as allDoctors} from "../mock-data/mock";
import { MOCK_INSTITUTIONS } from "../mock-data/mock";
import { MOCK_REFERRALS } from "../mock-data/mock";
import { MOCK_USERNAMES } from "../mock-data/mock";
import { MOCK_ADMIN_INSTITUTION_INFO } from "../mock-data/mock";
import { MOCK_ADMIN_DOCTORS } from "../mock-data/mock"; 

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
	return MOCK_INSTITUTIONS;
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
	const refferrerID = MOCK_REFERRALS[code];
	
	return refferrerID;
}

/*
	checks if username already exists on server
	returns true iff username exists, otherwise returns false
*/
export const checkUserName = (username) => {
	// code below requires server call
	const formattedUsername = username.toLowerCase();
	
	return MOCK_USERNAMES.includes(formattedUsername);
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

export const getUserProfileImageUrl = (username) => {
	// code below requires server call
	// to look at the user database and see user's profile pics

	// users is MOCK_USERS from ../mock-data/mock.js

	const defaultProfileImageUrl = "./default-profile-icon.png";
	
	var userProfileImageUrl = null;

	if(users[username].image) {
		userProfileImageUrl = users[username].image;
	} else {
		userProfileImageUrl = defaultProfileImageUrl;
	}

	return userProfileImageUrl;
}

/*
	sends server request to delete institution
	Note: admin functionality
*/
export const deleteInstitution = (institutionID) => {
	// code below requires server call
	return true;
}

/*
	sends server request to get institution with id, insitutionID
*/
export const getInstitution = (institutionID) => {
	// code below requires server call
	const institution = MOCK_ADMIN_INSTITUTION_INFO.find(element => element.id === institutionID);
	
	return institution;
}

/*
	sends updated institution object to server
*/
export const updateInstitution = (institution) => {
	// code below requires server call
	return true;
}

/* 
	Returns a list of doctors obtained from the server
*/
export const getDoctors = () => {
	// code below requires server call
	return MOCK_ADMIN_DOCTORS;
}

/*
	sends server request to delete doctor
	Note: admin functionality
*/
export const deleteDoctor = (doctorID) => {
	// code below requires server call
	return true;
}