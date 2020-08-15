// export const baseUrl = 'http://localhost:5000'; // LEAVE THIS UNCOMMENTED
export const baseUrl = '';
export const ApiRoutes = {
    login: baseUrl + '/api/users/login',
    getUserType: baseUrl  +'/api/users/userType/',
    checkSession: baseUrl + '/api/users/check-session',
    logout: baseUrl + '/api/users/logout',
    createUser: baseUrl + "/api/users",
    profile: baseUrl + "/api/profile/",
    doctorById: baseUrl + "/api/doctors/",
    institution: baseUrl + '/api/institutions',
    doctor: baseUrl + '/api/doctors',
    patientsByDoctorId: baseUrl + "/api/doctors/patients/",
    referral: baseUrl + '/api/referrals',
    patient: baseUrl + '/api/patients',
    user: baseUrl + '/api/users',
    request: baseUrl + '/api/requests',
    requestStatus: baseUrl + '/api/requests/status/',
    files: baseUrl + '/api/files/',
    filesUploaded: baseUrl + '/api/files/uploaded'
}