/* Doctor model */
'use strict';

const mongoose = require('mongoose');
const { GeneralProfile } = require('./generalProfile');

const DoctorSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    generalProfile: {
        type: GeneralProfile.schema,
        required: true
    },
    MID: {
        type: String,
        required: true,
        validate: {
            validator: function(value) {
                return /^([a-zA-Z]{4})([0-9]{8})$/.test(value)
            },
            message: 'Not valid Medical ID Number'
        }
    },
    institutionID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Institution',
        required: true
    }
})

// middleware for deleting a doctor document
DoctorSchema.pre("remove", async function(next) {
	// deletes the referenced user document
	await this.model('User').remove({ _id: this.user });
	// deleted the doctor's referral document
	await this.model('Referral').remove({ doctorID: this._id});
	// update patient's doctor to null
	await this.model('Patient').updateMany({ doctor: this._id }, { doctor: null });
	// calls the next middleware
	next();
});

const Doctor = mongoose.model('Doctor', DoctorSchema)
module.exports = { Doctor }