/* Doctor model */
'use strict';

const mongoose = require('mongoose');

const FileSchema = new mongoose.Schema({
    base64: {
        type: String,
        required: true
    },
    fileName: {
        type: String,
        required: true,
        trim: true
    },
    dateUploaded: {
        type: Date,
        required: true
    },
    uploader: {
        type: mongoose.Schema.Types.ObjectId,
        // no "ref", since objectId coudld be from Patient schema or Doctor schema
        // example call to specifiy model: 
        // File.findOne(...).populate({path: 'uploader', model: 'Doctor'})
        required: true
    },
    patient: { // patient who the file is about
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient',
        required: true
    },
    reportType: {
        type: String,
        minlength: 5,
        required: true
    }
})

const File = mongoose.model('File', FileSchema)
module.exports = { File }