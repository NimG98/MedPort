// for debugging 
const log = console.log

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
	// this would be an api call to the backend
	var isValid = false;

	const users = app.state.doctors.concat(app.state.patients, app.state.secretaries);

	for(var i=0; i<users.length; i++){
		if(users[i].email === username) {
			if(users[i].password === password) {
				isValid = true;
				break;
			}
		}
	}

	return isValid;
}