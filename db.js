const mongoose = require('mongoose');

const AgencySchema = require('./models/Agency')
const ClientSchema = require('./models/Client');
const IdSchema = require('./models/Id');

const Agency = mongoose.model('agency', AgencySchema);
const Client = mongoose.model('client', ClientSchema);
const Id = mongoose.model('id_count', IdSchema);

module.exports = {
    Agency,
    Client,
    Id
}