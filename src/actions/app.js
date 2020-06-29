// for debugging 
const log = console.log

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

/* 
	submits new secretary information to server for account creation
	Note: submits secretary's used referral code as well
*/
export const addSecretary = (secretary, code) => {
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
			// code: institutionID
			'S001': 2,
	}

	// performed before function call
	// const formattedCode = code.toUpperCase();
	
	const refferrerID = referrals[code];
	
	return refferrerID;
}