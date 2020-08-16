/* General profile info model */
'use strict';

const mongoose = require('mongoose');
const validator = require('validator');
const { ProfileImage } = require('./profileImage');


// Both patients and doctors share these common profile details
const GeneralProfileSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minlength: 2,
        trim: true,
    },
    lastName: {
        type: String,
        required: true,
        minlength: 2,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        minlength: 1,
        trim: true,
        validate: {
            validator: validator.isEmail,   // custom validator
            message: 'Not valid email'
        }
    },
    profileImage: {
        type: ProfileImage.schema,
        required: false
    }
})

const GeneralProfile = mongoose.model('GeneralProfile', GeneralProfileSchema)
module.exports = { GeneralProfile }
