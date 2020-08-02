var routes = require('express').Router();
const authenticateToken = require('../authenticateToken');

// file imports
const createAgencyAndClient = require('./createClient');
const updateClient = require('./updateClient');
const getMaxBill = require('./getMaxBill');

// route declarations
routes.post('/createAgencyAndClient', authenticateToken, createAgencyAndClient);
routes.put('/updateClient', authenticateToken, updateClient);
routes.get('/getMaxBill', authenticateToken, getMaxBill);

module.exports = routes;
