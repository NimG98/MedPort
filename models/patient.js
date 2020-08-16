/* Patient model */
'use strict';

const mongoose = require('mongoose');
const { GeneralProfile } = require('./generalProfile');
const validator = require('validator')

const PatientSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    generalProfile: {
        type: GeneralProfile.schema,
        required: true
    },
    address: {
        type: String,
        required: true,
        minlength: 4,
        trim: true,
    }, 
    postalCode: {
        type: String,
        required: true,
        validate: {
            validator: (value) => {
                return validator.isPostalCode(value, "CA")   // custom validator
            },
            message: 'Not valid postal code'
        }
    },
    HCN: {
        type: String,
        required: true,
        validate: {
            validator: (value) => {
                return /^[0-9]{4}[ -]?[0-9]{3}[ -]?[0-9]{3}[ -]?[a-zA-Z]{2}$/.test(value)
            },
            message: 'Not valid Health Card Number'
        }
    },
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor',
        required: true
    }
})

// middleware for deleting a doctor document
PatientSchema.pre("remove", async function(next) {
	// deletes the referenced user document
	await this.model('User').remove({ _id: this.user });
	// calls the next middleware
	next();
});

const Patient = mongoose.model('Patient', PatientSchema)
module.exports = { Patient }