import { MOCK_USERS as users} from "../mock-data/mock";
import { MOCK_REQUESTS as allRequests} from "../mock-data/mock";
import { MOCK_PATIENTS as allPatients} from "../mock-data/mock";
import { MOCK_DOCTORS as allDoctors} from "../mock-data/mock";
import { MOCK_INSTITUTIONS } from "../mock-data/mock";
import { MOCK_REFERRALS } from "../mock-data/mock";
import { MOCK_USERNAMES } from "../mock-data/mock";
import { MOCK_ADMIN_INSTITUTION_INFO } from "../mock-data/mock";
import { MOCK_ADMIN_DOCTORS } from "../mock-data/mock"; 
import { MOCK_ADMIN_DOCTOR_INFO } from "../mock-data/mock";
import { MOCK_ADMIN_PATIENTS } from "../mock-data/mock"; 
import { UserType } from "../constants/userType";

/* 
	Returns a list of institutions obtained from the server
*/
export const getInstitutions = () => {
	// code below requires server call
	return MOCK_INSTITUTIONS;
};

/* 
	Returns the info of an institution based on institutionID
 */
export const getInstitutionInfo = (institutionID) => {
	// code below requires server call
	const allInstitutions = getInstitutions();
	for(var institution in allInstitutions) {
		if(allInstitutions[institution].id === institutionID) {
			return allInstitutions[institution];
		}
	}
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

/* Validates if the username is associated with a registered user,
and that the user's password is correct */
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

/* Gets a list of requests with a certain status from a certain user */
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

/* Gets the patients assigned to a specific doctor */
export const getPatientsByDoctor = (doctorID) => {

	var patients = []

	// code below requires server call
	// to look at the patient database

	// allPatients is MOCK_PATIENTS from ../mock-data/mock.js

	for (var patientUsername in allPatients) {
		var patientInfo = null;//getUserProfileInfo(patientUsername);
		if(patientInfo.doctorID === doctorID) {
			patients.push(patientInfo)
		}
	}

	return patients;
}

/* Returns the doctor ID of a doctor by username */
export const getDoctorID = (username) => {
	// code below requires server call
	// to look at the doctor database

	// allDoctors is MOCK_DOCTORS from ../mock-data/mock.js
	return allDoctors[username].doctorID;
}

/* Returns the image url of the profile image associated with a user
If no image set, it returns the default image url */
export const getUserProfileImageUrl = (username) => {
	const defaultProfileImageUrl = "./default-profile-icon.png";
	
	var userProfileImageUrl = null;

	// code below requires server call
	// to look at the user database and see user's profile pics

	// users is MOCK_USERS from ../mock-data/mock.js

	if(users[username].image) {
		userProfileImageUrl = users[username].image;
	} else {
		userProfileImageUrl = defaultProfileImageUrl;
	}

	return userProfileImageUrl;
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

/*
	sends server request to get doctor with id, doctorID
*/
export const getDoctor = (doctorID) => {
	// code below requires server call
	const doctor = MOCK_ADMIN_DOCTOR_INFO.find(element => element.id === doctorID);
	
	return doctor;
}

/*
	sends updated doctor object to server
*/
export const updateDoctor = (doctor) => {
	// code below requires server call
	return true;
}

/* 
	Returns a list of patients obtained from the server
*/
export const getPatients = () => {
	// code below requires server call
	return MOCK_ADMIN_PATIENTS;
}

/*
	sends server request to delete patient
	Note: admin functionality
*/
export const deletePatient = (patientID) => {
	// code below requires server call
	return true;
}

/*
	sends server request to get patient with id, patientID
*/
export const getPatient = (patientID) => {
	// code below requires server call
	const patient = MOCK_ADMIN_PATIENTS.find(element => element.id === patientID);
	
	return patient;
}

/*
	sends updated patient object to server
*/
export const updatePatient = (patient) => {
	// code below requires server call
	return true;
}

