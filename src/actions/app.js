import { MOCK_USERS as users} from "../mock-data/mock";
import { MOCK_REQUESTS as allRequests} from "../mock-data/mock";
import { MOCK_PATIENTS as allPatients} from "../mock-data/mock";
import { MOCK_DOCTORS as allDoctors} from "../mock-data/mock";
import { MOCK_INSTITUTIONS } from "../mock-data/mock";
import { MOCK_REFERRALS } from "../mock-data/mock";
import { MOCK_USERNAMES } from "../mock-data/mock";
import { UserType } from "../constants/userType";

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

/* 
	Submits referral code to server and gets a refferrerID on success
 */
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

/* Gets the type of the user (patient/doctor/secretary/admin) */
export const getUserType = (username) => {

	// code below requires server call
	// to look at the user database and see usernames/passwords

	// users is MOCK_USERS from ../mock-data/mock.js
	return users[username].type;
}

/* Gets the patients assigned to a specific doctor */
export const getPatientsByDoctor = (doctorID) => {
	console.log(doctorID);

	var patients = []

	// code below requires server call
	// to look at the patient database

	// allPatients is MOCK_PATIENTS from ../mock-data/mock.js

	for (var patientUsername in allPatients) {
		console.log(patientUsername);
		var patientInfo = getUserProfileInfo(patientUsername);
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

/* Returns the doctor username when given doctorID */
export const getDoctorbyID = (doctorID) => {
	// code below requires server call
	// to look at the doctor database

	// allDoctors is MOCK_DOCTORS from ../mock-data/mock.js
	for(var doctor in allDoctors) {
		if(allDoctors[doctor].doctorID === doctorID) {
			return doctor;
		}
	}
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

/* Returns the profile info of a user by username */
export const getUserProfileInfo = (username) => {

	const userType = getUserType(username);

	// code below requires server call
	// to look at the patients and doctor database and see their profile info

	// allPatients is MOCK_PATIENTS, allDoctors is MOCK_DOCTORS from ../mock-data/mock.js
	if(userType === UserType.patient) {
		return allPatients[username];
	} else if(userType === UserType.doctor) {
		return allDoctors[username];
	}
}