// import input validators
import { isHCN, isRequired, isEmail, isPostalCode, isMinLength } from "../../validators/input-validators.js";

// validates the firstName form field
export const validateFirstName = (firstName, setError) => {
	if (!isRequired(firstName)) {
		setError('firstName', true, 'Please fill out this field');
		return false;
	} else if (!isMinLength(firstName, 2)) {
		setError('firstName', true, 'First name must be at least 2 characters long');
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
	} else if (!isMinLength(lastName, 2)) {
		setError('lastName', true, 'Last name must be at least 2 characters long');
		return false;
	} else {
		setError('lastName', false, '');
		return true;
	}
}

// validates the address form field
export const validateAddress = (address, setError) => {
	if (!isRequired(address)) {
		setError('address', true, 'Please fill out this field');
		return false;
	} else if (!isMinLength(address, 4)) {
		setError('address', true, 'Address must be at least 4 characters long');
		return false;
	}else {
		setError('address', false, '');
		return true;
	}
}

// validates the postalCode form field
export const validatePostalCode = (postalCode, setError) => {
	if (!isRequired(postalCode)) {
		setError('postalCode', true, 'Please fill out this field');
		return false;
	} else if (!isPostalCode(postalCode)) {
		setError('postalCode', true, 'Enter a valid postal code');
		return false;
	} else {
		setError('postalCode', false, '');
		return true;
	}
}

// validates the health card number field
export const validateHCN = (HCN, setError) => {
	if (!isRequired(HCN)) {
		setError('HCN', true, 'Please fill out this field');
		return false;
	} else if (!isHCN(HCN)) {
		setError('HCN', true, 'Enter a valid Health Card Number');
		return false;
	} else {
		setError('HCN', false, '');
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
	} else if (!isMinLength(password, 6)) {
		setError('password', true, 'Password must be at least 6 characters long');
		return false;
	} else {
		setError('password', false, '');
		return true;
	}
}