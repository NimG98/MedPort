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

// submits referral code to server and gets a refferrerID on success
export const submitReferralCode = (code) => {
	// code below requires server call
	
	// dummy data
	const referrals = {
			// code: doctorID
			'P001': 1,
			// code: institutionID
			'S001': 1,
	}

	// performed before function call
	// const formattedCode = code.toUpperCase();
	
	const refferrerID = referrals[code];
	
	return refferrerID;
}

/* REMOVE */
// performed in the backend
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