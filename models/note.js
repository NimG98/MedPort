/* Note model */
'use strict';

const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema({
    creator: {
		type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor',
        required: true
	},
	created: {
		type: Date,
		required: true,
		default: Date.now
	},
	message: {
		type: String,
		required: true,
		trim: true
	},
})

const Note = mongoose.model('Note', NoteSchema)
module.exports = { Note }