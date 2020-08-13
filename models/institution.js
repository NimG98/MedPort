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
            message: 'Not valid postal code'
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

// middleware for deleting an institution document
InstitutionSchema.pre("remove", async function(next) {
	// update doctor's institutionID to nul
	await this.model('Doctor').updateMany({ institutionID: this._id }, { institutionID: null });
	// calls the next middleware
	next();
});

const Institution = mongoose.model('Institution', InstitutionSchema)
module.exports = { Institution }
