import { UserType } from "../constants/userType"

// mock data for user database with usernames/passwords
export const MOCK_USERS = {
    // Patient
    user: {
        password: "user",
        type: UserType.patient
    },
    jdoe: {
        password: "12345",
        type: UserType.patient
    },
    // Doctor
    user2: {
        password: "user2",
        type: UserType.doctor
    },
    // Secretary
    user3: {
        password: "user3",
        type: UserType.secretary
    },
    // Admin
    admin: {
        password: "admin",
        type: UserType.admin
    }
}

// mock data for all requests
export const MOCK_REQUESTS = [
    // From patient called "user"
    {
        date: "2020-12-12", 
        time: "08:30",
        created_by: "user",
        to: "user2",
        request_type: "Phone call",
        status: "pending",
        reason: "Follow up questions on my x-rays"
    },
    {
        date: "2020-06-10", 
        time: "14:00",
        created_by: "user",
        to: "user2",
        request_type: "Test",
        status: "confirmed",
        reason: "Want a blood test done"
    },
    // From doctor called "user2"
    {
        date: "2020-07-11", 
        time: "12:30",
        created_by: "user2",
        to: "user",
        request_type: "Test",
        status: "pending",
        reason: "Patient needs a new test following up from the results from the previous test."
    },
    {
        date: "2020-06-03", 
        time: "13:00",
        created_by: "user2",
        to: "jdoe",
        request_type: "Phone call",
        status: "confirmed",
        reason: "Discuss test result and medication options"
    },
    {
        date: "2020-06-01", 
        time: "09:45",
        created_by: "user2",
        to: "user",
        request_type: "Appointment",
        status: "confirmed",
        reason: "Need to come in person to observe growth in movement after last x-ray of broken leg"
    }
]

// mock data for patients
export const MOCK_PATIENTS = {
    "user": {
        firstName: 'UserFn', lastName: 'UserLn', address: '4 User St', postalCode: 'H3B 2JC', HCN: '5555555123XX', email: 'user@user.com', doctorID: 1
    },
    "jdoe": {
        firstName: 'Jane', lastName: 'Doe', address: '123 Main St', postalCode: 'H3B 2JC', HCN: '5555555123XX', email: 'jdoe@example.com', doctorID: 1
    },
    "billybob": {
        firstName: 'Billy', lastName: 'Bob', address: '987 Royal St', postalCode: 'LA1 3C7', HCN: '5555555123XX', email: 'jdoe@example.com', doctorID: 2
    }
}

// mock data for doctors
export const MOCK_DOCTORS = {
    "user2": {
        doctorID: 1, firstName: 'Bob', lastName: 'Builder', MID: 123456,  email: 'b.build@fake.com', password: 'abcdef'
    }
}
