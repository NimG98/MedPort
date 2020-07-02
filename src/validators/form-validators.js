// import input validators
import { isRequired, isMinLength, isMaxLength, isEmail, isPhoneNumber, isPostalCode, isMID, isHCN } from "./input-validators";


// validates the name form field
export const validateName = (fieldName, name, setError) => {
	if (!isRequired(name)) {
		setError(fieldName, true, 'Please fill out this field');
		return false;
	} else if (!isMinLength(name, 2)) {
		setError(fieldName, true, 'Minimum 2 characters');
		return false;
	} else {
		setError(fieldName, false, '');
		return true;
	}
}

// validates the address form field
export const validateAddress = (fieldName, address, setError) => {
	if (!isRequired(address)) {
		setError(fieldName, true, 'Please fill out this field');
		return false;
	} else if (!isMinLength(address, 4)) {
		setError(fieldName, true, 'Minimum 4 characters');
		return false;
	}else {
		setError(fieldName, false, '');
		return true;
	}
}

// validates the postalCode form field
export const validatePostalCode = (fieldName, postalCode, setError) => {
	if (!isRequired(postalCode)) {
		setError(fieldName, true, 'Please fill out this field');
		return false;
	} else if (!isPostalCode(postalCode)) {
		setError(fieldName, true, 'Enter a valid postal code');
		return false;
	}else {
		setError(fieldName, false, '');
		return true;
	}
}

// validates the phoneNumber form field
export const validatePhoneNumber = (fieldName, phoneNumber, setError) => {
	if (!isRequired(phoneNumber)) {
		setError(fieldName, true, 'Please fill out this field');
		return false;
	} else if (!isPhoneNumber(phoneNumber)) {
		setError(fieldName, true, 'Enter a valid phone number');
		return false;
	}else {
		setError(fieldName, false, '');
		return true;
	}
}

// validates the email form field
export const validateEmail = (fieldName, email, setError) => {
	if (!isRequired(email)) {
		setError(fieldName, true, 'Please fill out this field');
		return false;
	} else if (!isEmail(email)) {
		setError(fieldName, true, 'Enter a valid email address');
		return false;
	} else {
		setError(fieldName, false, '');
		return true;
	}
}

// validates the password form field
export const validatePassword = (fieldName, password, setError) => {
	if (!isRequired(password)) {
		setError(fieldName, true, 'Please fill out this field');
		return false;
	} else if (!isMinLength(password, 6)) {
		setError(fieldName, true, 'Minimum 6 characters');
		return false;
	} else {
		setError(fieldName, false, '');
		return true;
	}
}

// validates the MID form field
export const validateMID = (fieldName, MID, setError) => {
	if (!isRequired(MID)) {
		setError(fieldName, true, 'Please fill out this field');
		return false;
	} else if (!isMID(MID)) {
		setError(fieldName, true, 'Enter a valid Medical ID Number');
		return false;
	} else {
		setError(fieldName, false, '');
		return true;
	}
}

// validates the health card number field
export const validateHCN = (fieldName, HCN, setError) => {
	if (!isRequired(HCN)) {
		setError(fieldName, true, 'Please fill out this field');
		return false;
	} else if (!isHCN(HCN)) {
		setError(fieldName, true, 'Enter a valid Health Card Number');
		return false;
	} else {
		setError(fieldName, false, '');
		return true;
	}
}

// validates the institutionID field
export const validateInstitutionID = (fieldName, institutionID, setError) => {
	if (!isRequired(institutionID)) {
		setError(fieldName, true, 'Please fill out this field');
		return false;
	} else {
		setError(fieldName, false, '');
		return true;
	}
}

// validates the referral code field
// Note specific to referral sign up form
export const validateReferralCode = (referralCode, setError) => {
	if (!isRequired(referralCode)) {
		setError(true, 'Please fill out this field');
		return false;
	} else {
		setError(false, '');
		return true;
	}
}