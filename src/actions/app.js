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

/* 
	submits new patient information to server for account creation
	Note: submits patient's used referral code as well
*/
export const addPatient = (patient, code) => {
	// code below requires server call
	return true;
};

/* 
	submits new secretary information to server for account creation
	Note: submits patient's used referral code as well
*/
export const addSecretary = (secretary, code) => {
	// code below requires server call
	return true;

};

// submits referral code to server and gets a refferrerID on success
export const submitReferralCode = (code) => {
	// code below requires server call
	
	// dummy data
	const referrals = {
			// code: doctorID
			'P001': 1,
			// code: institutionID
			'S001': 2,
	}

	// performed before function call
	// const formattedCode = code.toUpperCase();
	
	const refferrerID = referrals[code];
	
	return refferrerID;
}