// Functions to help with file actions.

import { ApiRoutes } from "../constants/apiRoutes";

/* Get all files uploaded by the loggedInUser */
export const getUserUploadedFiles = (component) => {
    const url = ApiRoutes.filesUploaded;

    return fetch(url)
        .then(res => {
            if (res.status === 200) {
                return res.json();
            }
        })
        .then(filesArray => {
            if (filesArray) {
                if(component){
                    component.setState({ fileList: filesArray })
                }
                return filesArray;
            }
        })
        .catch(error => {
            console.log(error);
        });
}


/* Upload a new file */
export const addFile = (fileInfo) => {
    const url = ApiRoutes.files;

    const request = new Request(url, {
        method: "post",
        body: JSON.stringify(fileInfo),
        headers: {
            "Accept": "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    });

    return fetch(request)
        .then(res => {
            if (res.status === 200) {
                return res.json();
            }
        })
        .then(fileJson => {
            if (fileJson) {
                return fileJson;
            }
        })
        .catch(error => {
            console.log(error);
        });
}

/* Get all files that are associated with a specific patient */
export const getPatientFiles = (patientId, component) => {
    const url = ApiRoutes.files + patientId;

    return fetch(url)
        .then(res => {
            if (res.status === 200) {
                return res.json();
            }
        })
        .then(filesArray => {
            if (filesArray) {
                if(component){
                    ///////////////////////////////
                }
                return filesArray;
            }
        })
        .catch(error => {
            console.log(error);
        });
}