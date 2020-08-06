/* Patient model */
'use strict';

const mongoose = require('mongoose');
const validator = require('validator');

const InstitutionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        trim: true,
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
            message: 'Not valid email'
        }
    },
    phoneNumber: {
        type: String,
        required: true,
        validate: {
            validator: (value) => {
                return /^[0-9]{10,11}$/.test(value)
            },
            message: 'Not valid phone number'
        }
    }
})

const Institution = mongoose.model('Institution', InstitutionSchema)
module.exports = { Institution }