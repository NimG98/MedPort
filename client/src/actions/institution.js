// Functions to help with institution actions.

/* Returns the institution's info when given institutionID */
export const getInstitutionInfo = (institutionID, callback) => {
    const url = "/api/institutions/" + institutionID;

    fetch(url)
        .then(res => {
            if (res.status === 200) {
                return res.json();
            }
        })
        .then(institutionJson => {
            if(institutionJson){
                if(callback){
                    callback(institutionJson);
                }
                return institutionJson;
            }
        })
        .catch(error => {
            console.log(error);
        });
}

/* 
	submits new institution information to server for account creation.
	Note: returns newly created institution's ID on success
*/
export const addInstitution = (institution) => {
	const url = "/api/institutions"
	
	// creating the request
	const request = new Request(url {
		method: "post",
		body: JSON.stringify(institution),
		headers: {
			"Accept": "application/json, text/plain, */*",
			"Content-Type": "application/json"
		},
	});
	
	// making the request to the server
	fetch(request)
	.then(res => {
		if (res.status === 200) {
			return res.json();
		}
	})
	.then(institutionInfo => {
		return institutionInfo._id;
	})
	.catch(error => {
		
	});
}

/* 
	Returns a list of institutions obtained from the server
*/
export const getInstitutions = () => {
	// code below requires server call
	return MOCK_INSTITUTIONS;
};