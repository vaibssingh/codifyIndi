const mongoose = require('mongoose');

const IdSchema = mongoose.Schema({
    key: {
        type: String,
        required: true
    },
    count: {
        type: Number,
        required: true
    }
});

module.exports = IdSchema;