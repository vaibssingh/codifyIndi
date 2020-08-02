const mongoose = require('mongoose');

const AgencySchema = {
    agencyId: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    address1: {
        type: String,
        required: true
    },
    address2: String,
    state: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: Number,
        required: true
    },
}

module.exports = AgencySchema