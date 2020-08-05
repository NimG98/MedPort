/* Doctor model */
'use strict';

const mongoose = require('mongoose');
const { GeneralProfile } = require('./generalProfile');

const DoctorSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    generalInfo: GeneralProfile.schema,
    MID: {
        type: String,
        required: true,
        validate: {
            validator: (value) => {
                return /^([a-zA-Z]{4})([0-9]{8})$/.test(value)
            },
            message: 'Not valid Medical ID Number'
        }
    },
    institutionID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Institution'
    }
})

const Doctor = mongoose.model('Doctor', DoctorSchema)
module.exports = { Doctor }