import { MOCK_USERS as users} from "../mock-data/mock";
import { MOCK_REQUESTS as allRequests} from "../mock-data/mock";
import { MOCK_PATIENTS as allPatients} from "../mock-data/mock";
import { MOCK_DOCTORS as allDoctors} from "../mock-data/mock";
import { UserType } from "../constants/userType";

// // for debugging 
// const log = console.log

// adds a new doctor to the app component state
export const addDoctor = (app, doctor) => {
	// this would be an api call to the backend
	
	const newDoctors = app.state.doctors.concat(doctor);
	
	app.setState({
		doctors: newDoctors
	});

};

// returns new id, incremented from existing doctor objects
export const createDoctorID = (app) => {
	const doctors = app.state.doctors
	
	if (doctors.length) {
		const lastID = doctors[doctors.length - 1].id;
		return (lastID + 1);
	}
	
	return 1;
	
}

// returns the insitutions list from the app component state
export const getInstitutions = (app) => {
	// this would be an api call to the backend
	
	return(
		app.state.institutions
	)
};

// adds a new institution to the app component state
export const addInstitution = (app, institution) => {
	// this would be an api call to the backend
	
	const newInstitutions = app.state.institutions.concat(institution);
	
	app.setState({
		institutions: newInstitutions
	});
}

// returns new id, incremented from existing institution objects
export const createInstitutionID = (app) => {
	const institutions = app.state.institutions;
	
	if (institutions.length) {
		const lastID = institutions[institutions.length - 1].id;
		return (lastID + 1);
	}
	
	return 1;
	
}

// adds a new patient to the app component state
export const addPatient = (app, patient) => {
	// this would be an api call to the backend
	
	const newPatients = app.state.patients.concat(patient);
	
	app.setState({
		patients: newPatients
	});

};

// returns new id, incremented from existing patient objects
export const createPatientID = (app) => {
	const patients = app.state.patients
	
	if (patients.length) {
		const lastID = patients[patients.length - 1].id;
		return (lastID + 1);
	}
	
	return 1;
	
}

// adds a new secretary to the app component state
export const addSecretary = (app, secretary) => {
	// this would be an api call to the backend
	
	const newSecretaries = app.state.secretaries.concat(secretary);
	
	app.setState({
		secretaries: newSecretaries
	});

};

// returns new id, incremented from existing secretary objects
export const createSecretaryID = (app) => {
	const secretaries = app.state.secretaries;
	
	if (secretaries.length) {
		const lastID = secretaries[secretaries.length - 1].id;
		return (lastID + 1);
	}
	
	return 1;
	
}

// returns referrer ID from referral code in app component state
export const submitReferralCode = (app, code) => {
	// this would be an api call to the backend

	const formattedCode = code.toUpperCase();
	
	const refferrerID = app.state.referrals[formattedCode];
	
	return refferrerID;
}

// removes a particular referral code from the app component state
export const removeReferralCode = (app, code) => {
	// this would be an api call to the backend
	
	const referrals = app.state.referrals;
	
	if (referrals[code]) {
		const newReferrals = Object.assign({}, referrals);
		
		delete newReferrals[code];
		
		app.setState({
			referrals: newReferrals
		});
	}
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
		var patientInfo = getUserProfileInfo(patientUsername);
		if(patientInfo.doctorID === doctorID) {
			patients.push(patientInfo)
		}
	}

	console.log("getPatientsByDoctor");

	return patients;
}

export const getDoctorID = (username) => {
	// code below requires server call
	// to look at the doctor database

	// allDoctors is MOCK_DOCTORS from ../mock-data/mock.js
	return allDoctors[username].doctorID;
}

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

export const getUserProfileInfo = (username) => {
	// code below requires server call
	// to look at the patients and doctor database and see their profile info

	// allPatients is MOCK_PATIENTS, allDoctors is MOCK_DOCTORS from ../mock-data/mock.js
	const userType = getUserType(username);

	if(userType === UserType.patient) {
		return allPatients[username];
	} else if(userType === UserType.doctor) {
		return allDoctors[username];
	}
}