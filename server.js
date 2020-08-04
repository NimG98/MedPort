/* server.js for react-express-authentication */
"use strict";
const log = console.log;

const express = require("express");
// starting the express server
const app = express();

// mongoose and mongo connection
const { mongoose } = require("./db/mongoose");
mongoose.set('useFindAndModify', false); // for some deprecation issues

// import the mongoose models
const { User } = require("./models/user");

// to validate object IDs
const { ObjectID } = require("mongodb");

// body-parser: middleware for parsing HTTP JSON body into a usable object
const bodyParser = require("body-parser");
app.use(bodyParser.json());

// express-session for managing user sessions
const session = require("express-session");
app.use(bodyParser.urlencoded({ extended: true }));

/*** Helper functions below **********************************/
function isMongoError(error) { // checks for first error returned by promise rejection if Mongo database suddently disconnects
	return typeof error === 'object' && error !== null && error.name === "MongoNetworkError"
}

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

/*** Session handling **************************************/
// Create a session cookie
app.use(
    session({
        secret: "oursecret",
        resave: false,
        saveUninitialized: false,
        cookie: {
            expires: 300000, // 5 mins
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
            res.send({ loggedInUser: user.username });
        })
        .catch(error => {
            if (isMongoError(error)) {
                res.status(500).send(error);
            } else {
                res.status(400).send(error);
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
        res.send({ loggedInUser: req.session.username });
    } else {
        res.status(401).send();
    }
});

// A route to get the userType of a user
app.get("/api/users/userType", mongoChecker, (req, res) => {
    const username = req.body.username;

    log(username);
    // Use the static method on the User model to find a user
    // by their username and return their userType
    User.findByUsernameUserType(username)
        .then(user => {
            res.send({ userType: user.userType });
        })
        .catch(error => {
            if (isMongoError(error)) {
                res.status(500).send(error);
            } else {
                res.status(400).send(error);
            }
        });
});

/*********************************************************/

/*** API Routes below ************************************/
// NOTE: The JSON routes are not protected in this react server (no authentication required). 
//       You can (and should!) add this using similar middleware techniques we used in lecture.


/** User routes below **/
// Set up a POST route to *create* a user of your web app.
app.post("/users", mongoChecker, (req, res) => {
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
