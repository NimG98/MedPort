// import input validators
import { isRequired, isPhoneNumber, isPostalCode, isMinLength } from "../../validators/input-validators";

// validates the name form field
export const validateName = (name, setError) => {
	if (!isRequired(name)) {
		setError('name', true, 'Please fill out this field');
		return false;
	} else if (!isMinLength(name, 2)) {
		setError('name', true, 'Name must be at least 2 characters long');
		return false;
	} else {
		setError('name', false, '');
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
	}else {
		setError('postalCode', false, '');
		return true;
	}
}

// validates the phoneNumber form field
export const validatePhoneNumber = (phoneNumber, setError) => {
	if (!isRequired(phoneNumber)) {
		setError('phoneNumber', true, 'Please fill out this field');
		return false;
	} else if (!isPhoneNumber(phoneNumber)) {
		setError('phoneNumber', true, 'Enter a valid phone number');
		return false;
	}else {
		setError('phoneNumber', false, '');
		return true;
	}
}