// import input validators
import { isMatch, isRequired, isEmail, isLongEnough } from "../../validators/input-validators.js";

// validates the firstName form field
export const validateFirstName = (firstName, setError) => {
	if (!isRequired(firstName)) {
		setError('firstName', true, 'Please fill out this field');
		return false;
	} else {
		setError('firstName', false, '');
		return true;
	}
	
}

// validates the lastName form field
export const validateLastName = (lastName, setError) => {
	if (!isRequired(lastName)) {
		setError('lastName', true, 'Please fill out this field');
		return false;
	} else {
		setError('lastName', false, '');
		return true;
	}
}

// validates the MID form field
export const validateMID = (MID, setError) => {
	if (!isRequired(MID)) {
		setError('MID', true, 'Please fill out this field');
		return false;
	} else if (!isMatch(MID, '^([a-zA-Z]{4})([0-9]{8})$')) {
		setError('MID', true, 'Enter a valid Medical ID Number');
		return false;
	} else {
		setError('MID', false, '');
		return true;
	}
}

// validates the email form field
export const validateEmail = (email, setError) => {
	if (!isRequired(email)) {
		setError('email', true, 'Please fill out this field');
		return false;
	} else if (!isEmail(email)) {
		setError('email', true, 'Please enter a valid email address');
		return false;
	} else {
		setError('email', false, '');
		return true;
	}
}

// validates the password form field
export const validatePassword = (password, setError) => {
	if (!isRequired(password)) {
		setError('password', true, 'Please fill out this field');
		return false;
	} else if (!isLongEnough(password, 6)) {
		setError('password', true, 'Password must be at least 6 characters long');
		return false;
	} else {
		setError('password', false, '');
		return true;
	}
}