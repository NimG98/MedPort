import { ApiRoutes } from '../constants/apiRoutes';

/* 
	Gets new referral code from server
 */
export const getReferralCode = (code) => {
	const url = ApiRoutes.referral;
	
	return fetch(url).then(res => {
		if (res.status === 200) {
			// parse json
            return res.json();
        }
	}).then(referrerID => {
		// return the referrer id
		return referrerID;
	}).catch(error => {
		// log error
		console.log(error);
	});
}

/* 
	Submits referral code to server and gets a refferrerID on success
 */
export const submitReferralCode = (code) => {
	const url = ApiRoutes.referral;
	
	// creating the request
	const request = new Request(url, {
		method: "post",
		body: JSON.stringify({ code: code }),
		headers: {
			"Accept": "application/json, text/plain, */*",
			"Content-Type": "application/json"
		},
	});
	
	// making the request to the server
	return fetch(request)
	.then(res => {
		// parse json
		if (res.status === 200) {
			return res.json();
		}
	}).then(referrerID => {
		// return referrer id
		return referrerID;
	}).catch(error => {
		// log error
		console.log(error);
	});
}