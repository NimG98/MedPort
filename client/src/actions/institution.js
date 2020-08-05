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