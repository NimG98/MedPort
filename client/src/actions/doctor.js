// Functions to help with doctor actions.

/* Returns the doctor document info when given doctorID */
export const getDoctorByID = (doctorID, callback) => {
    const url = "/api/doctors/" + doctorID;

    fetch(url)
        .then(res => {
            if (res.status === 200) {
                return res.json();
            }
        })
        .then(doctorJson => {
            if(doctorJson){
                if(callback){
                    callback(doctorJson);
                }
                return doctorJson;
            }
        })
        .catch(error => {
            console.log(error);
        });
}