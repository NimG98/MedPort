/* Patient model */
'use strict';

const mongoose = require('mongoose');

const InstitutionSchema = new mongoose.Schema({
    // add stuff
})

const Institution = mongoose.model('Institution', InstitutionSchema)
module.exports = { Institution }