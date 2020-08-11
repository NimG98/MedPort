/* Patient model */
'use strict';

const mongoose = require('mongoose');
const { GeneralProfile } = require('./generalProfile');
const validator = require('validator')

const PatientSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    generalProfile: GeneralProfile.schema,
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

const Patient = mongoose.model('Patient', PatientSchema)
module.exports = { Patient }