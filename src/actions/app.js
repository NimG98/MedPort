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

// returns the insitutions list from the app component state
export const getInstitutions = (app) => {
	// this would be an api call to the backend
	
	return(
		app.state.institutions
	)
};