import { UserType } from "../constants/userType"

// mock data for user database with usernames/passwords
export const MOCK_USERS = {
    // Patient
    user: {
        password: "user",
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