/* Profile image model */
'use strict';

const mongoose = require('mongoose');
const validator = require('validator')

const ProfileImageSchema = new mongoose.Schema({
    imageBase64: {
        type: String,
    }
})

const ProfileImage = mongoose.model('ProfileImage', ProfileImageSchema)
module.exports = { ProfileImage }