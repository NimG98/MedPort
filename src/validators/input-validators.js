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
	Returns true iff input is a match to the email pattern
	Note: email pattern obtained from https://emailregex.com/
*/
export const isEmail = (input) => {
	return isMatch(input, '^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$');
}

/* 
	Returns true iff input has a length greater than or equal to maxLength,
	otherwise returns false.
*/
export const isLongEnough = (input, minLength) => {
	return input.length >= minLength;
}
