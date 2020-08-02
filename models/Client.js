const mongoose = require('mongoose');

const ClientSchema = mongoose.Schema({
    clientId: {
        type: Number,
        required: true
    },
    agencyId: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: Number,
        required: true
    },
    totalBill: {
        type: Number,
        required: true
    }
})

module.exports = ClientSchema;