https://stark-headland-93903.herokuapp.com/

*** Submitting late 10:10pm

# team34 Introduction

Our application is called MedPort and is a site for displaying medical test reports and results in one convenient place for patients and doctors to review.

# Features

- Upload Test Results
    - Both doctors and patients can upload and view test reports
- View Results and Communicate
    - Underneath a test report is a comment section that a doctor and patient can communicate with
- Requests
    - Patients and doctors can send requests to each other to set appointments for phone calls, in-person appointments, or for another medical test.

# Login Credentials

## Patient Credentials

Username: **user**

Password: **user**

## Doctor Credentials

Username: **user2**

Password: **user2**

## Admin Credentials

Username: **admin**

Password: **admin**

# Instructions

*Disclaimer*: Please do not refresh the page in between the instructions, otherwise the user will be logged out.

## Patient

1. Starting at the home page, read the website description features on the bottom of the page.

2. Click `Sign up` in the "Don't have an account? Sign up" statement (underneath the login box).

3. Enter `P001` as the patient referral code , and then press `Next`.

4. Enter in random information for the patient's profile details and then press `Submit`\
(you must input something for every field, otherwise it will notify you and block you from proceeding).\
    - input valid "First Name" and "Last Name"
        - minimum 2 characters
        - ex. `Jack`, `Doe`
    - input valid "Address"
        - minimum 4 characters
        - ex. `123 Street`
    - input valid "Postal Code"
        - ex. `M5S 2E4`
    - input valid "Health Card Number"
        - ex. `1234-123-123-ab`
    - input valid "Email"
        - needs "@"
        - ex. `user@user.com`
    - input valid "Username"
        - minimum 3 characters
        - ex. `user3`
    - input valid "Password"
        - minimum 6 characters
        - ex. `password`
5. Log in using the [patient credentials](#patient-credentials) and you will be taken to the dashboard.
    - If you want to navigate back to this dashboard, press the heart website logo.
    
6. Click `Requests` on the navbar on the left-hand side.
    - On the "Pending Requests" tab, you will see requests that is in the pending state that were made either by you (patient) or a doctor.\
      A request is pending if the person to whom the request was sent to has not yet accepted the request.
    - You can see there is a request pending on you (patient). You can click the `Confirm` button to confirm this request.
    - You can click the "Confirmed Requests" tab to see previous and upcoming events from requests that have been confirmed by both parties.
   
7. Click `Submit a new Request` to send a request to your doctor, fill out the fields to fill out a request, and then press `Submit`.
    - You can press the back button beside the "Submit a New Request" title to go back to the table of requests.

8. Click `Results` on the navbar on the left-hand side. 
    - "File" would show the test report.
    - You can see the doctor's notes attached to the file.
    - Type in a comment below to add to the test result for the doctor to see, then press `Comment`.

9. Click `Upload` on the navbar on the left-hand side. 
    - You can see previously uploaded files on the bottom.
    - Click `Browse` or `Upload` to open up a window to select a test report file to upload.
    
10. Hover over the user profile icon on the top right of the site, and click `Profile`.
    - You can see the patients's personal info, health card number, and assigned doctor.
    - You can press the edit button beside the personal info to edit the personal details.
    - You can click on the profile icon or pencil to select a new file as a profile picture.
    
11. Hover over the user profile icon on the top right of the site, and click `Log out`.


## Doctor

1. Starting at the home page, read the website description features on the bottom of the page.

2. Click `Sign up` in the "Don't have an account? Sign up" statement (underneath the login box).

3. Click `Are you a Doctor? Sign Up`

4. Enter in random information for the doctor's profile details and then press `Next`\
(you must input something for every field, otherwise it will notify you and block you from proceeding).\
    - input valid "First Name" and "Last Name"
        - minimum 2 characters
        - ex. `Jack`, `Doe`
    - input valid "Medical ID Number"
        - ex. `abcd12345678`
    - input valid "Email"
        - needs "@"
        - ex. `user@user.com`
    - input valid "Username"
        - minimum 3 characters
        - ex. `user3`
    - input valid "Password"
        - minimum 6 characters
        - ex. `password`
        
5. i. Select an existing institution and press `Submit`.

   ii. Press `Create` to link your medical institution since it wasn't there before.
       - fill out the info for the institution and press `Submit`
   
6. Log in using the [doctor credentials](#doctor-credentials) and you will be taken to the dashboard.
    - If you want to navigate back to this dashboard from other pages, press the heart website logo.
    
7. Click `Requests` on the navbar on the left-hand side.
    - On the "Pending Requests" tab, you will see requests that is in the pending state that were made either by you (doctor) or a patient.\
      A request is pending if the person to whom the request was sent to has not yet accepted the request.
    - You can see there is a request pending on you (doctor). You can click the `Confirm` button to confirm this request.
    - You can click the "Confirmed Requests" tab to see previous and upcoming events from requests that have been confirmed by both parties.
   
8. Click `Submit a new Request`, select which patient you want to send the request to, and fill out the fields to fill out a request and then press `Submit`.
    - You can press the back button beside the "Submit a New Request" title to go back to the table of requests.

9. Click `Results` on the navbar on the left-hand side. 
    - "File" would show the test report.
    - You can see your notes and the patient's comment attached to the file.
    - Type in a comment below to add to the test result for the patient to see, then press `Comment`.

10. Click `Upload` on the navbar on the left-hand side. 
    - You can see previously uploaded files on the bottom.
    - Click `Browse` or `Upload` to open up a window to select a test report file to upload.
    
11. Hover over the user profile icon on the top right of the site, and click `Profile`.
    - You can see the doctor's personal info, medical ID number, and assigned medical institution info.
    - You can press the edit button beside the personal info to edit the personal details.
    - You can click on the profile icon or pencil to select a new file as a profile picture.
    
12. Hover over the user profile icon on the top right of the site, and click `Log out`.


## Admin

1. Log in using the [admin credentials](#admin-credentials) and you will be taken to the admin dashboard.
    - If you want to navigate back to this dashboard from other pages, press the heart website logo.
2. Press Red Delete button on St. Josephs Hospital
3. Press the Blue Create Insitution Button on the top-right corner of the view
4. Fill out into an click submit
5. Click Blue View button on top institution (Hospital A)
6. Click Blue Edit button on institution info table
7. Play around with the info 
8. Click Submit
9. Click Blue View button on first doctor (Bob)
10. Click Blue View button on first patient (UserFn)
11. Click Blue Edit button on patient info table
12. Edit info and Cancel
13. Click Red Delete Patient button on top-right corner
14. Done
