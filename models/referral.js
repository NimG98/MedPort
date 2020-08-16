/* Referral Model */
"use strict";

const mongoose = require('mongoose');

const ReferralSchema = new mongoose.Schema({
	code: {
		type: String,
		required: true,
	},
	doctorID: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Doctor",
		required: true
	}
});

const Referral = mongoose.model('Referral', ReferralSchema);
module.exports = { Referral };