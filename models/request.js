/* Request model */
'use strict';

const mongoose = require('mongoose');
const validator = require('validator')

const RequestSchema = new mongoose.Schema({
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        // no "ref", since objectId coudld be from Patient schema or Doctor schema
        // example call to specifiy model: 
        // Request.findOne(...).populate({path: 'createdBy', model: 'Doctor'})
        required: true
    },
    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        // no "ref", since objectId coudld be from Patient schema or Doctor schema
        // example call to specifiy model: 
        // Request.findOne(...).populate({path: 'receiver', model: 'Patient'})
        required: true
    },
    type: {
        type: String,
		enum: ["Test", "Phone call", "Appointment"],
		required: true
    },
    status: {
        type: String,
        enum: ["pending", "confirmed"],
		required: true
    },
    reason: {
        type: String,
        required: false
    },
    date: {
        type: Date,
        required: true
    },
    time: {
        type: String,
        required: true,
        validate: {
            validator: (value) => {
                return /^(1[0-2]|0?[1-9]):[0-5][0-9] (AM|PM)$/.test(value)
            },
            message: 'Not valid time'
        }
    }

})

const Request = mongoose.model('Request', RequestSchema)
module.exports = { Request }