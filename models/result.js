/* Result model */
'use strict';

const mongoose = require('mongoose');

const ResultSchema = new mongoose.Schema({
    file: {
		type: mongoose.Schema.Types.ObjectId,
        ref: 'File',
        required: true
	},
	notes: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Note',
	}]
})

const Result = mongoose.model('Result', ResultSchema)
module.exports = { Result }