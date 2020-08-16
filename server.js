/* server.js for react-express-authentication */
"use strict";
const log = console.log;

const express = require("express");
const cors = require('cors');
// starting the express server
const app = express();

app.use(cors());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

// mongoose and mongo connection
const { mongoose } = require("./db/mongoose");
mongoose.set('useFindAndModify', false); // for some deprecation issues

// import the mongoose models
const { User } = require("./models/user");
const { Patient } = require("./models/patient");
const { Doctor } = require("./models/doctor");
const { Institution } = require("./models/institution");
const { Referral } = require("./models/referral");
const { Result } = require("./models/result");

// to validate object IDs
const { ObjectID } = require("mongodb");

// body-parser: middleware for parsing HTTP JSON body into a usable object
const bodyParser = require("body-parser");
app.use(bodyParser.json({limit: '50mb'}));

// express-session for managing user sessions
const session = require("express-session");
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

/*** Helper functions below **********************************/
function isMongoError(error) { // checks for first error returned by promise rejection if Mongo database suddently disconnects
	return typeof error === 'object' && error !== null && error.name === "MongoNetworkError"
}

const { generateReferralCode } = require('./helpers/referral');
const { Request } = require("./models/request");
const { File } = require("./models/file");

/* // Our own express middleware to check for
// an active user on the session cookie (indicating a logged in user.)
const sessionChecker = (req, res, next) => {
    if (req.session.user) {
        res.redirect('/dashboard'); // redirect to dashboard if logged in.
    } else {
        next(); // next() moves on to the route.
    }
}; */

// middleware for mongo connection error for routes that need it
const mongoChecker = (req, res, next) => {
	// check mongoose connection established.
	if (mongoose.connection.readyState != 1) {
		log('Issue with mongoose connection')
		res.status(500).send('Internal server error')
		return;
	} else {
		next()
	}
}

// middleware to check if request is made by admin user type
// Note: user AFTER authenticate middleware
const isAdmin = (req, res, next) => {
	if (req.user.userType !== "admin") {
		res.status(401).send("Unauthorized");
		return;
	} else {
		next();
	}
}

/*** Session handling **************************************/
// Create a session cookie
app.use(
    session({
        secret: "oursecret",
        resave: false,
        saveUninitialized: false,
        cookie: {
            expires: 900000, // 15 mins
            httpOnly: true
        }
    })
);

// A route to login and create a session
app.post("/api/users/login", mongoChecker, (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    log(username, password);
    // Use the static method on the User model to find a user
    // by their username and password
    User.findByUsernamePassword(username, password)
        .then(user => {
            // Add the user's id to the session cookie.
            // We can check later if this exists to ensure we are logged in.
            req.session.user = user._id;
            req.session.username = user.username;
            req.session.userType = user.userType
            res.send({ loggedInUser: user.username, userType: user.userType });
        })
        .catch(error => {
            if (isMongoError(error)) {
                res.status(500).send('Internal server error');
            } else {
                log(error);
                res.status(400).send('Bad Request');
            }
        });
});

// A route to logout a user
app.get("/api/users/logout", (req, res) => {
    // Remove the session
    req.session.destroy(error => {
        if (error) {
            res.status(500).send(error);
        } else {
            res.send()
        }
    });
});

// A route to check if a user is logged in on the session cookie
app.get("/api/users/check-session", (req, res) => {
    if (req.session.user) {
        res.send({ loggedInUser: req.session.username, userType: req.session.userType});
    } else {
        res.status(401).send();
    }
});

/*********************************************************/

/*** API Routes below ************************************/
// NOTE: The JSON routes are not protected in this react server (no authentication required). 
//       You can (and should!) add this using similar middleware techniques we used in lecture.

/** User routes below **/
// Set up a POST route to *create* a user of your web app.
app.post("/api/users", mongoChecker, (req, res) => {
    log(req.body);

    // Create a new user
    const user = new User({
        username: req.body.username,
        password: req.body.password,
        userType: req.body.userType
    });

    // Save the user
    user.save().then(user => {
        res.send(user);
    })
    .catch((error) => {
		if (isMongoError(error)) { // check for if mongo server suddenly disconnected before this request.
			res.status(500).send('Internal server error')
		} else {
			res.status(400).send('Bad Request')
		}
	})
});

// Middleware for authentication of resources
const authenticate = (req, res, next) => {
	if (req.session.user) {
		User.findById(req.session.user).then((user) => {
			if (!user) {
				return Promise.reject()
			} else {
				req.user = user
				next()
			}
		}).catch((error) => {
			res.status(401).send("Unauthorized")
		})
	} else {
		res.status(401).send("Unauthorized")
	}
}

// A route to get the userType of a user
app.get("/api/users/userType/:username", mongoChecker, (req, res) => {
    const username = req.params.username;

    // Use the static method on the User model to find a user
    // by their username and return their userType
    User.findByUsernameUserType(username)
        .then(userType => {
            res.send({ userType: userType });
        })
        .catch(error => {
            log(error);
            res.status(500).send("Internal Server Error");
        });
});

// A route to get the profile info of the loggedInUser
app.get("/api/profile/", mongoChecker, authenticate, (req, res) => {
    if(req.user.userType === "patient") {
        Patient.findOne({user: req.user._id}).then( (patient) => {
            if(!patient){
                res.status(404).send('Resource not found')  // could not find this patient
            } else {
                res.send(patient)
            }
        }).catch(error => {
            log(error);
            res.status(500).send("Internal Server Error");
        })
    } else if(req.user.userType === "doctor"){
        Doctor.findOne({user: req.user._id}).then( (doctor) => {
            if(!doctor){
                res.status(404).send('Resource not found')  // could not find this doctor
            } else {
                res.send(doctor)
            }
        }).catch(error => {
            log(error);
            res.status(500).send("Internal Server Error");
        })
    }
});

// A route to update a field in the profile info of the loggedInUser
// The body will be a json that consists of a change to make to the
//  resource:
/*
  { "op": "replace", "path": "/generalProfile.email", "value": "zsfrf@msf.com" }
*/
app.patch("/api/profile/", mongoChecker, authenticate, (req, res) => {
    // Find the fields to update and their values.

	const fieldsToUpdate = {};
    const propertyToChange = req.body.path.substr(1) // getting rid of the '/' character
    fieldsToUpdate[propertyToChange] = req.body.value;
    
    if(req.user.userType === "patient") {
        Patient.findOneAndUpdate({user: req.user._id}, {$set: fieldsToUpdate}, {new: true, useFindAndModify: false, runValidators: true, context: 'query'}).then( (patient) => {
            if(!patient){
                res.status(404).send('Resource not found')  // could not find this patient
            } else {
                res.send(patient)
            }
        }).catch(error => {
            if (isMongoError(error)) { // check for if mongo server suddenly dissconnected before this request.
                res.status(500).send('Internal server error')
            } else {
                log(error)
                res.status(400).send('Bad Request') // bad request for changing the patient.
            }
        })
    } else if(req.user.userType === "doctor"){
        Doctor.findOneAndUpdate({user: req.user._id}, {$set: fieldsToUpdate}, {new: true, useFindAndModify: false, runValidators: true, context: 'query'}).then( (doctor) => {
            if(!doctor){
                res.status(404).send('Resource not found')  // could not find this doctor
            } else {
                res.send(doctor)
            }
        }).catch(error => {
            if (isMongoError(error)) { // check for if mongo server suddenly dissconnected before this request.
                res.status(500).send('Internal server error')
            } else {
                log(error)
                res.status(400).send('Bad Request') // bad request for changing the doctor.
            }
        })
    }
});

// A route to get the profile image of the loggedInUser
app.get("/api/profile/image", mongoChecker, authenticate, (req, res) => {
    if(req.user.userType === "patient") {
        Patient.findOne({user: req.user._id}).then( (patient) => {
            if(!patient){
                res.status(404).send('Resource not found')  // could not find this patient
            } else {
                if(!patient.generalProfile.profileImage) {
                    res.send({ imageBase64: null }) // no custom set profile picture
                } else {
                    res.send({ imageBase64: patient.generalProfile.profileImage.imageBase64 })
                }
            }
        }).catch(error => {
            log(error);
            res.status(500).send("Internal Server Error");
        })
    } else if(req.user.userType === "doctor"){
        Doctor.findOne({user: req.user._id}).then( (doctor) => {
            if(!doctor){
                res.status(404).send('Resource not found')  // could not find this doctor
            } else {
                if(!doctor.generalProfile.profileImage) {
                    res.send({ imageBase64: null }) // no custom set profile picture
                } else {
                    res.send({ imageBase64: doctor.generalProfile.profileImage.imageBase64 })
                }
            }
        }).catch(error => {
            log(error);
            res.status(500).send("Internal Server Error");
        })
    }
});

// A route to update the profile image of the loggedInUser
// { "imageBase64": "..." }
app.post("/api/profile/image", mongoChecker, authenticate, (req, res) => {
    // Find the fields to update and their values.
	const fieldToUpdate = {};
    const imagePropertyLocation = "generalProfile.profileImage.imageBase64"
    fieldToUpdate[imagePropertyLocation] = req.body.imageBase64;
    
    if(req.user.userType === "patient") {
        Patient.findOneAndUpdate({user: req.user._id}, {$set: fieldToUpdate}, {new: true, useFindAndModify: false, runValidators: true, context: 'query'}).then( (patient) => {
            if(!patient){
                res.status(404).send('Resource not found')  // could not find this patient
            } else {
                res.send({ imageBase64: patient.generalProfile.profileImage.imageBase64 })
            }
        }).catch(error => {
            if (isMongoError(error)) { // check for if mongo server suddenly dissconnected before this request.
                res.status(500).send('Internal server error')
            } else {
                log(error)
                res.status(400).send('Bad Request') // bad request for changing the patient.
            }
        })
    } else if(req.user.userType === "doctor"){
        Doctor.findOneAndUpdate({user: req.user._id}, {$set: fieldToUpdate}, {new: true, useFindAndModify: false, runValidators: true, context: 'query'}).then( (doctor) => {
            if(!doctor){
                res.status(404).send('Resource not found')  // could not find this doctor
            } else {
                res.send({ imageBase64: doctor.generalProfile.profileImage.imageBase64 })
            }
        }).catch(error => {
            if (isMongoError(error)) { // check for if mongo server suddenly dissconnected before this request.
                res.status(500).send('Internal server error')
            } else {
                log(error)
                res.status(400).send('Bad Request') // bad request for changing the doctor.
            }
        })
    }
});

// A route to get the general profile info (firstName, lastName, email) of another user (patient/doctor)
app.get("/api/profile/:id", mongoChecker, authenticate, (req, res) => {
    const id = req.params.id; // patient or doctor Id

    if(!ObjectID.isValid(id)) {
		res.status(404).send("Resource not found");
		return;
    }

    Patient.findById(id).then( (patient) => {
        if(!patient){
            Doctor.findById(id).then( (doctor) => {
                if(!doctor){
                    res.status(404).send('Resource not found')  // could not find this patient/doctor
                } else {
                    res.send(doctor.generalProfile)
                }
            })
        } else {
            res.send(patient.generalProfile)
        }
    }).catch(error => {
        log(error);
        res.status(500).send("Internal Server Error");
    })

});

// a route that checks if a given username already exists
app.post("/api/users/check-username", mongoChecker, (req, res) => {
	const username = req.body.username;
	
	User.findOne({ username: username }).then(user => {
		if (!user) {
			// username DNE
			res.status(404).send("Resource not found");
		} else {
			// username exists
			res.send("Username Exists");
		}
	}).catch(error => {
		log(error);
		res.status(500).send("Internal Server Error");
	});
});

/** Referral routes below **/

// returns a newly created referral
/* Depricated - referrals are instead created on doctor creation */
app.get("/api/referrals", mongoChecker, authenticate, (req, res) => {
	
	// find doctor that made request
	Doctor.findOne({ user: req.user._id }).then(doctor => {
		if (!doctor) {
			// user is not a doctor
			res.status(401).send("Unauthorized");
		} else {
			// create new referral
			const referral = new Referral({
				code: generateReferralCode(),
				doctorID: doctor._id
			});
			
			// save the referral
			referral.save().then(referral => {
				res.send(referral);
			}).catch(error => {
				log(error);
				res.status(500).send('Internal server error');
				return;
			});
		}
	}).catch(error => {
		log(error);
		res.status(500).send('Internal server error');
		return;
	});
	
});

// verifies referral code and returns referrerID
app.post("/api/referrals", mongoChecker, (req, res) => {
	const refCode = req.body.code;
	
	Referral.findOne({ code: refCode }).then(referral => {
		if(!referral) {
			res.status(404).send("Resource not found");
		} else {
            res.send(referral.doctorID);
        }
	}).catch(error => {
		log(error);
		res.status(500).send('Internal server error');
		return;
	});
});

/** Patient routes below **/
// A route to make a new patient
app.post("/api/patients", mongoChecker, (req, res) => {
    // create a new user
	const newUser = new User({
		username: req.body.username,
		password: req.body.password,
		userType: "patient"
	});
	
	// Create a new patient
	const patient = new Patient({
		user: newUser._id,
		generalProfile: {
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			email: req.body.email
		},
		address: req.body.address,
		postalCode: req.body.postalCode,
		HCN: req.body.HCN,
		doctor: req.body.doctorID
	});
	
	// save the user
	newUser.save().then(user => {
		// save the patient
		patient.save().then(patient => {
			res.send(patient);
		}).catch(error => {
			// check for if mongo server suddenly disconnected before this request.
			if (isMongoError(error)) { 
				log(error);
				res.status(500).send('Internal Server Error')
			} else {
				log(error);
				res.status(400).send('Bad Request')
			}
		});
	}).catch(error => {
		// check for if mongo server suddenly disconnected before this request.
		if (isMongoError(error)) { 
			log(error);
			res.status(500).send('Internal Server Error')
		} else {
            log(error);
			res.status(400).send('Bad Request')
		}
	});
});

// A route to get list of all patients
// Note: admin route
app.get("/api/patients", mongoChecker, authenticate, (req, res) => {
	// query for all patients
	Patient.find().then(patients => {
		res.send(patients);
	}).catch(error => {
		log(error);
		res.status(500).send('Internal Server Error');
	});
})

// A route to delete a patient document
// Note: admin route
app.delete("/api/patients/:id", mongoChecker, authenticate, isAdmin, (req, res) => {
	const patientID = req.params.id;
	
	if(!ObjectID.isValid(patientID)) {
		res.status(404).send("Resource not found");
		return;
    }
	
	Patient.findById(patientID).then(patient => {
		if (!patient) {
			res.status(404).send("Resource Not Found");
			return;
		} else {
			patient.remove().then(patient => {
				res.send(patient);
			}).catch(error => {
				log(error);
				res.status(500).send("Internal Server Error");
				return;
			})
		}
	}).catch(error => {
		log(error);
		res.status(500).send("Internal Server Error");
	});
});

// A route to get the patient document given the patient's id
app.get("/api/patients/:id", mongoChecker, authenticate, isAdmin, (req, res) => {
	const patientID = req.params.id;
	
	if(!ObjectID.isValid(patientID)) {
		res.status(404).send("Resource not found");
		return;
    }
	
	Patient.findById(patientID).then(patient => {
		if (!patient) {
			res.status(404).send("Resource Not Found");
			return;
		} else {
			res.send(patient);
		}
	}).catch(error => {
		log(error);
		res.status(500).send("Internal Server Error");
	});
})

// A route to update a doctor with doctorID
// Note: admin route
app.patch("/api/patients/:id", mongoChecker, authenticate, isAdmin, (req, res) => {
	const patientID = req.params.id;
	
	if(!ObjectID.isValid(patientID)) {
		res.status(404).send("Resource not found");
		return;
    }
	
	// getting the proerties to change and thier values
	const fieldsToUpdate = {};
	req.body.map((change) => {
		// getting the property name
		const path = change.path.substr(1)
		const propertyToChange = path.split("/").join(".");
		fieldsToUpdate[propertyToChange] = change.value
	})
	
	Patient.findByIdAndUpdate(patientID, {$set: fieldsToUpdate}, {new: true, useFindAndModify: false, runValidators: true, context: 'query'}).then(patient => {
		if (!patient) {
			res.status(404).send("Resource Not Found");
			return;
		} else {
			res.send(patient);
		}
	}).catch(error => {
		if (isMongoError(error)) {
			res.status(500).send('Internal server error')
		} else {
            console.log(error);
			res.status(400).send('Bad Request')
		}
	});
});

/** Doctor routes below **/

// A route to make a new doctor
app.post("/api/doctors", mongoChecker, (req, res) => {
	
	// create a new user
	const newUser = new User({
		username: req.body.username,
		password: req.body.password,
		userType: "doctor"
	});
	
	// Create a new doctor
	const doctor = new Doctor({
		user: newUser._id,
		generalProfile: {
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			email: req.body.email
		},
		MID: req.body.MID,
		institutionID: req.body.institutionID
	});
	
	// create new referral
	const referral = new Referral({
		code: generateReferralCode(),
		doctorID: doctor._id
	});
	
	// save the user
	newUser.save().then(user => {
		// save the doctor
		doctor.save().then(doctor => {
			// save the doctor's referral object
			referral.save().then(referral => {
				res.send(doctor);
			}).catch(error => {
				log(error);
				res.status(500).send("Internal Server Error");
			});
		}).catch(error => {
			// check for if mongo server suddenly disconnected before this request.
			if (isMongoError(error)) {
				log(error);
				res.status(500).send('Internal Server Error')
			} else {
				log(error);
				res.status(400).send('Bad Request')
			}
		});
		
	}).catch(error => {
		// check for if mongo server suddenly disconnected before this request.
		if (isMongoError(error)) {
			log(error);
			res.status(500).send('Internal Server Error')
		} else {
            log(error);
			res.status(400).send('Bad Request')
		}
	});

});

// A route to get a list of all doctors
// Note: admin route
app.get("/api/doctors", mongoChecker, authenticate, isAdmin, (req, res) => {
	
	// query for all doctors
	Doctor.find().then(doctors => {
		res.send(doctors);
	}).catch(error => {
		log(error);
		res.status(500).send("Internal Server Error");
	});
	
});

// A route to get a list of patients for the logged in doctor
app.get("/api/doctors/patients", mongoChecker, authenticate, (req, res) => {
    Doctor.findOne({user: req.user._id}).then(doctor => {
		if(!doctor){
			console.log("doctor404", doctor)
			res.status(404).send('Resource not found')
			return;
		} else {
			console.log("doctor", doctor);
			return doctor._id;
		}
	}).then(doctorID => {
		Patient.find({doctor: doctorID}).then(patients => {
			if (!patients) {
				console.log("patient 404", patient)
				res.status(404).send('Resource not found')
				return;
			} else {
				console.log("patients", patients);
				res.send(patients);
			}  
		})
	}).catch(error => {
		log(error);
		res.status(500).send("Internal Server Error");
	})
});

// A route to get the doctor document given the doctor's id
app.get("/api/doctors/:id", mongoChecker, authenticate, (req, res) => {
    const doctorId = req.params.id;

    if(!ObjectID.isValid(doctorId)) {
		res.status(404).send("Resource not found");
		return;
    }
    
    Doctor.findById(doctorId).then( doctor => {
        if(!doctor) {
			res.status(404).send("Resource not found");
		} else {
            res.send(doctor);
        }
    }).catch(error => {
        log(error);
        res.status(500).send("Internal Server Error");
    })
});


// A route to delete a doctor with a given doctor's id
// Note: admin route
app.delete("/api/doctors/:id", mongoChecker, authenticate, isAdmin, (req, res) => {
	const doctorID = req.params.id;
	
	if(!ObjectID.isValid(doctorID)) {
		res.status(404).send("Resource not found");
		return;
    }
	
	Doctor.findById(doctorID).then(doctor => {
		if (!doctor) {
			res.status(404).send("Resource Not Found");
			return;
		} else {
			doctor.remove().then(doctor => {
				res.send(doctor);
			}).catch(error => {
				log(error);
				res.status(500).send("Internal Server Error");
				return;
			})
		}
	}).catch(error => {
		log(error);
		res.status(500).send("Internal Server Error");
	});
})

// A route to update a doctor with doctorID
// Note: admin route
app.patch("/api/doctors/:id", mongoChecker, authenticate, isAdmin, (req, res) => {
	const doctorID = req.params.id;
	
	if(!ObjectID.isValid(doctorID)) {
		res.status(404).send("Resource not found");
		return;
    }
	
	// getting the proerties to change and thier values
	const fieldsToUpdate = {};
	req.body.map((change) => {
		// getting the property name
		const path = change.path.substr(1)
		const propertyToChange = path.split("/").join(".");
		fieldsToUpdate[propertyToChange] = change.value
	})
	
	Doctor.findByIdAndUpdate(doctorID, {$set: fieldsToUpdate}, {new: true, useFindAndModify: false, runValidators: true, context: 'query'}).then(doctor => {
		if (!doctor) {
			res.status(404).send("Resource Not Found");
			return;
		} else {
			res.send(doctor);
		}
	}).catch(error => {
		if (isMongoError(error)) {
			res.status(500).send('Internal server error')
		} else {
            console.log(error);
			res.status(400).send('Bad Request')
		}
	});
});

// A route to get a list of patients for the logged in doctor
app.get("/api/doctors/patients", mongoChecker, authenticate, (req, res) => {
    Doctor.findOne({user: req.user._id}).then(doctor => {
		if(!doctor){
			res.status(404).send('Resource not found')
			return;
		} else {
			return doctor._id;
		}
	}).then(doctorID => {
		Patient.find({doctor: doctorID}).then(patients => {
			if (!patients) {
				res.status(404).send('Resource not found')
				return;
			} else {
				res.send(patients);
			}  
		})
	}).catch(error => {
		log(error);
		res.status(500).send("Internal Server Error");
	})
});

// A route to get a list of the patients who has a doctor with the given doctor id
app.get("/api/doctors/patients/:id", mongoChecker, authenticate, (req, res) => {
    const doctorId = req.params.id;

    if(!ObjectID.isValid(doctorId)) {
		res.status(404).send("Resource not found");
		return;
    }
    
    Patient.find({doctor: doctorId}).then( patients => {
        if (!patients) {
          res.status(404).send("Resource Not Found");
          return;
        } else {
          res.send(patients);
        }
    }).catch(error => {
        log(error);
        res.status(500).send("Internal Server Error");
    })
});

/** Institution routes below **/

// A route to make a new institution (can be called when new user made)
app.post("/api/institutions", mongoChecker, (req, res) => {
    // Create a new institution
    const institution = new Institution({
        name: req.body.name,
        address: req.body.address,
        postalCode: req.body.postalCode,
        phoneNumber: req.body.phoneNumber
    });

    // Save the user
    institution.save().then(institution => {
        res.send(institution);
    })
    .catch((error) => {
		if (isMongoError(error)) { // check for if mongo server suddenly disconnected before this request.
			res.status(500).send('Internal server error')
		} else {
            log(error);
			res.status(400).send('Bad Request')
		}
	})
});

// A route to get a list of all institutions 
app.get("/api/institutions", mongoChecker, (req, res) => {
	
	// query for all institutions
	Institution.find().then(institutions => {
		res.send(institutions);
	}).catch(error => {
		log(error);
		res.status(500).send("Internal Server Error");
	});
	
});

// A route to update an institution with institutionID
// Note: admin route
app.put("/api/institutions/:id", mongoChecker, authenticate, isAdmin, (req, res) => {
	const institutionID = req.params.id;
	
	if (!ObjectID.isValid(institutionID)) {
		res.status(404).send("Resource not found");
		return;
    }
	
	Institution.findOneAndReplace({ _id: institutionID }, req.body, {new: true, useFindAndModify: false}).then(institution => {
		if (!institution) {
			res.status(404).send("Resource Not Found");
			return;
		} else {
			res.send(institution);
		}
	}).catch(error => {
		if (isMongoError(error)) {
			res.status(500).send('Internal server error')
		} else {
            console.log(error);
			res.status(400).send('Bad Request')
		}
	});
});

// A route to get the institution document given the institution's id
app.get("/api/institutions/:id", mongoChecker, authenticate, (req, res) => {
    const institutionId = req.params.id;

    if(!ObjectID.isValid(institutionId)) {
		res.status(404).send("Resource not found");
		return;
    }
    
    Institution.findById(institutionId).then( institution => {
        if(!institution) {
			res.status(404).send("Resource not found");
		} else {
            res.send(institution);
        }
    }).catch(error => {
        log(error);
        res.status(500).send("Internal Server Error");
    })
});

// A route to get the doctors associated with a given institution's id
// Note: admin route
app.get("/api/institutions/doctors/:id", mongoChecker, authenticate, isAdmin, (req, res) => {
	const institutionID = req.params.id;
	
	if (!ObjectID.isValid(institutionID)) {
		res.status(404).send("Resource not found");
		return;
    }
	
	Doctor.find({ institutionID: institutionID }).then(doctors => {
		if (!doctors) {
			res.status(404).send("Resource Not Found");
			return;
		} else {
			res.send(doctors);
		}
	}).catch(error => {
		log(error);
		res.status(500).send("Internal Server Error");
	});
})


// A route to delete an institution document with a given id
// Note: admin route
app.delete("/api/institutions/:id", mongoChecker, authenticate, isAdmin, (req, res) => {
	const institutionID = req.params.id;
	
	if (!ObjectID.isValid(institutionID)) {
		res.status(404).send("Resource not found");
		return;
    }
	
	Institution.findById(institutionID).then(institution => {
		if (!institution) {
			res.status(404).send("Resource Not Found");
			return;
		} else {
			institution.remove().then(institution => {
				res.send(institution);
			}).catch(error => {
				log(error);
				res.status(500).send("Internal Server Error");
				return;
			});
		}
	}).catch(error => {
		log(error);
		res.status(500).send("Internal Server Error");
	});
});

/** Request routes below **/

// A route to make a new request created by the current loggedInUser
app.post("/api/requests", mongoChecker, authenticate, (req, res) => {

    if(!ObjectID.isValid(req.body.createdBy)) {
		res.status(404).send("Resource not found");
		return;
    }

    if(!ObjectID.isValid(req.body.receiver)) {
		res.status(404).send("Resource not found");
		return;
    }

    // Create a new request
	const request = new Request({
        createdBy: req.body.createdBy,
        receiver: req.body.receiver,
        type: req.body.type,
        status: "pending",
        date: req.body.date,
        time: req.body.time
    });
    // Set optional field "reason"
    if(req.body.reason) {
        request.set("reason", req.body.reason)
    }
    // Set the model schema type of objectId for "createdBy" and "reciever"
    if(req.user.userType === "patient") {
        request.populate({path: 'createdBy', model: 'Patient'})
        request.populate({path: 'receiver', model: 'Doctor'})
    } else if(req.user.userType === "doctor") {
        request.populate({path: 'createdBy', model: 'Doctor'})
        request.populate({path: 'receiver', model: 'Patient'})
    }
    
	// save the request
	request.save().then(request => {
		res.send(request);
	}).catch(error => {
		// check for if mongo server suddenly disconnected before this request.
		if (isMongoError(error)) { 
			log(error);
			res.status(500).send('Internal Server Error')
		} else {
            log(error);
			res.status(400).send('Bad Request')
		}
	});
});

// A route to get all requests created by the current loggedInUser
app.get("/api/requests", mongoChecker, authenticate, (req, res) => {
    // Current loggedInUser is a patient; get their patient id, by checking user id
    if(req.user.userType === "patient") {
        Patient.findOne({user: req.user._id}).then( (patient) => {
            if(!patient){
                res.status(404).send('Resource not found')  // could not find this patient
            } else {
                return patient._id;
            }
        // Find all requests created by this patient, by checking if "createdBy" is the same as the patient's id
        }).then( creatorId => {
            Request.find({ $or:[{createdBy: creatorId}, {receiver: creatorId}] }).then( (requests) => {
                res.send(requests); // array of requests
            })
        }).catch(error => {
            log(error);
            res.status(500).send("Internal Server Error");
        })
    // Current loggedInUser is a doctor; get their doctor id, by checking user id
    } else if(req.user.userType === "doctor"){
        Doctor.findOne({user: req.user._id}).then( (doctor) => {
            if(!doctor){
                res.status(404).send('Resource not found')  // could not find this doctor
            } else {
                return doctor._id;
            }
        // Find all requests created by this doctor, by checking if "createdBy" is the same as the doctor's id
        }).then( creatorId => {
            Request.find({ $or:[{createdBy: creatorId}, {receiver: creatorId}] }).then( (requests) => {
                res.send(requests); // array of requests
            })
        }).catch(error => {
            log(error);
            res.status(500).send("Internal Server Error");
        })
    }
})

// A route to update the status of a request
// { "status": "confirmed" }
app.patch("/api/requests/status/:id", mongoChecker, authenticate, (req, res) => {
    const requestId = req.params.id;

    if(!ObjectID.isValid(requestId)) {
		res.status(404).send("Resource not found");
		return;
    }

    // Find the fields to update and their values.
	const fieldToUpdate = {};
    const imagePropertyLocation = "status"
    fieldToUpdate[imagePropertyLocation] = req.body.status;

    Request.findByIdAndUpdate(requestId, {$set: fieldToUpdate}, {new: true, useFindAndModify: false, runValidators: true, context: 'query'}).then( (request) => {
        if(!request){
            res.status(404).send('Resource not found')  // could not find this request
        } else {
            res.send(request)
        }
    }).catch(error => {
        if (isMongoError(error)) { // check for if mongo server suddenly dissconnected before this request.
            res.status(500).send('Internal server error')
        } else {
            log(error)
            res.status(400).send('Bad Request') // bad request for changing the request.
        }
    })
});

/** File routes below **/

// A route to make a new file created by the current loggedInUser
app.post("/api/files", mongoChecker, authenticate, (req, res) => {

    if(!ObjectID.isValid(req.body.uploader)) {
		res.status(404).send("Resource not found");
		return;
    }

    // Create a new file
	const file = new File({
        uploader: req.body.uploader,
        patient: req.body.patient,
        dateUploaded: req.body.dateUploaded,
        reportType: req.body.reportType,
        fileName: req.body.fileName,
        base64: req.body.base64
    });
	
	// Create a new result
	const result = new Result({
		file: file._id,
		notes: []
	});

    // Set the model schema type of objectId for "createdBy" and "reciever"
    if(req.user.userType === "patient") {
        file.populate({path: 'uploader', model: 'Patient'})
    } else if(req.user.userType === "doctor") {
        file.populate({path: 'uploader', model: 'Doctor'})
    }
    
	// save the file
	file.save().then(file => {
		// save the result
		result.save().then(result => {
			res.send(file);
		}).catch(error => {
			// check for if mongo server suddenly disconnected before this request.
			if (isMongoError(error)) { 
				log(error);
				res.status(500).send('Internal Server Error')
				return;
			} else {
				log(error);
				res.status(400).send('Bad Request')
				return;
			}
		});
	}).catch(error => {
		// check for if mongo server suddenly disconnected before this request.
		if (isMongoError(error)) { 
			log(error);
			res.status(500).send('Internal Server Error')
		} else {
            log(error);
			res.status(400).send('Bad Request')
		}
	});
});

// A route to get all files uploaded by the current loggedInUser
app.get("/api/files/uploaded", mongoChecker, authenticate, (req, res) => {
    // Current loggedInUser is a patient; get their patient id, by checking user id
    if(req.user.userType === "patient") {
        Patient.findOne({user: req.user._id}).then( (patient) => {
            if(!patient){
                res.status(404).send('Resource not found')  // could not find this patient
            } else {
                return patient._id;
            }
        // Find all files uploaded by this patient, by checking if "uploader" is the same as the patient's id
        }).then( uploaderId => {
            File.find({ uploader: uploaderId }).then( (files) => {
                res.send(files); // array of files
            })
        }).catch(error => {
            log(error);
            res.status(500).send("Internal Server Error");
        })
    // Current loggedInUser is a doctor; get their doctor id, by checking user id
    } else if(req.user.userType === "doctor"){
        Doctor.findOne({user: req.user._id}).then( (doctor) => {
            if(!doctor){
                res.status(404).send('Resource not found')  // could not find this doctor
            } else {
                return doctor._id;
            }
        // Find all files created by this doctor, by checking if "uploader" is the same as the doctor's id
        }).then( uploaderId => {
            File.find({ uploader: uploaderId }).then( (files) => {
                res.send(files); // array of files
            })
        }).catch(error => {
            log(error);
            res.status(500).send("Internal Server Error");
        })
    }
})

// get files about the curent logged in patient
app.get("/api/files/patients", mongoChecker, authenticate, (req, res) => {
	Patient.findOne({user: req.user._id}).then( (patient) => {
		if(!patient){
			res.status(404).send('Resource not found')  // could not find this patient
			return;
		} else {
			return patient._id;
		}
	// Find all files uploaded by this patient, by checking if "uploader" is the same as the patient's id
	}).then( patientID => {
		File.find({ patient: patientID }).then( (files) => {
			if (!files) {
				res.status(404).send('Resource not found')
				return;
			} else {
				res.send(files);
			}  
		})
	}).catch(error => {
		log(error);
		res.status(500).send("Internal Server Error");
	})
})

// A route to get all files that are about a specific patient
app.get("/api/files/patients/:patientId", mongoChecker, authenticate, (req, res) => {
    const patientId = req.params.patientId;

    if(!ObjectID.isValid(patientId)) {
		res.status(404).send("Resource not found");
		return;
    }

    // Find all files that are associated to this patient, by checking if "patient" is the same as the patient's id
    File.find({ patient: patientId }).then( (files) => {
        res.send(files); // array of files
    }).catch(error => {
        log(error);
        res.status(500).send("Internal Server Error");
    })
})

app.get('/api/news', (req, res) => {
    request(
      { url: 'https://newsapi.org/v2/top-headlines?country=ca&category=health&apiKey=64a619f995b14d4cad1e409027ef7f4b' },
      (error, response, body) => {
        if (error || response.statusCode !== 200) {
          return res.status(500).json({ type: 'error', message: err.message });
        }
  
        res.json(JSON.parse(body));
      }
    )
  });


/*** Webpage routes below **********************************/
// Serve the build
app.use(express.static(__dirname + "/client/build"));

// All routes other than above will go to index.html
app.get("*", (req, res) => {
    // check for page routes that we expect in the frontend to provide correct status code.
    const goodPageRoutes = ["/", "/signup", "/dashboard", "/upload", "/request", "/admin/institutions", "/admin/doctors", "/admin/patients", "/results", "/profile"];
    if (!goodPageRoutes.includes(req.url)) {
        // if url not in expected page routes, set status to 404.
        res.status(404);
    }

    // send index.html
    res.sendFile(__dirname + "/client/build/index.html");
});

/*************************************************/
// Express server listening...
const port = process.env.PORT || 5000;
app.listen(port, () => {
    log(`Listening on port ${port}...`);
});
