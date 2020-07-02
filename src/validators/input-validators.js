import { checkUserName } from "../actions/app";

/* 
	Returns true iff input is not empty, otherwise returns false. 
*/
export const isRequired = (input) => {
	if (input) {
		return true;
	}
	
	return false;
}

/* 
	Returns true iff there is a pattern match in the input, 
	otherwise returns false. 
*/
export const isMatch = (input, pattern) => {
	const regex = new RegExp(pattern);
	
	return regex.test(input);
}

/* 
	Returns true iff input has a length greater than or equal to minLength,
	otherwise returns false.
*/
export const isMinLength = (input, minLength) => {
	return input.length >= minLength;
}

/* 
	Returns true iff input has a length less than or equal to maxLength,
	otherwise returns false.
*/
export const isMaxLength = (input, maxLength) => {
	return input.length <= maxLength;
}

/* 
	Returns true iff input is a match to the email pattern,
	Otherwise returns false.
	Note: email pattern obtained from https://emailregex.com/
*/
export const isEmail = (input) => {
	return isMatch(input, '^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$');
}

/* 
	Returns true iff input is a match to the phone number pattern,
	Otherwise returns false. 
*/
export const isPhoneNumber = (input) => {
	return isMatch(input, '^[0-9]{10,11}$');
}

/* 
	Returns true iff input is a match to the postal code pattern,
	Otherwise returns false. 
*/
export const isPostalCode = (input) => {
	return isMatch(input, '^[a-zA-Z][0-9][a-zA-Z][ -]?[0-9][a-zA-Z][0-9]$');
}

/* 
	Returns true iff input is a match to the Medical ID Number pattern,
	Otherwise returns false. 
*/
export const isMID = (input) => {
	return isMatch(input, '^([a-zA-Z]{4})([0-9]{8})$');
}

/* 
	Returns true iff input is a match to the Health Card Number pattern,
	Otherwise returns false. 
*/
export const isHCN = (input) => {
	return isMatch(input, '^[0-9]{4}[ -]?[0-9]{3}[ -]?[0-9]{3}[ -]?[a-zA-Z]{2}$');
}

export const isNewUserName = (username) => {
	return !checkUserName(username);
}