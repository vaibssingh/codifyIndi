const { Agency, Client } = require('../db');
const { sendResponse, nullChecker, incrementIdKey } = require('../common');

/**
 * POST
 * API to create new agency and their clients
 * @param {*} req 
 * @param {*} res 
 */
const createAgencyAndClient = async (req, res) => {
    console.log('createAgencyAndClient', req.body);

    if (nullChecker(req.body) || nullChecker(req.body.agencyDetails) || nullChecker(req.body.clientDetails)) {
        return sendResponse(res, 422, null, 'Invalid Input');
    }

    try {
        const agencyData = req.body.agencyDetails;
        const clientData = req.body.clientDetails;

        // check if the agency already exists
        const agency = await Agency.findOne({ name: agencyData.name });
        if (agency !== null) {
            // get new clientId
            const count = await incrementIdKey('clientId');
            clientData.clientId = count;

            //add the existing agencies agencyId to new client
            clientData.agencyId = agency.agencyId

            const newClient = await Client.create(clientData);
            sendResponse(res, 201, newClient, 'New resource created successfully!');

        } else {
            // get new clientId and agencyId and add them to data objects
            const agencyId = await incrementIdKey('agencyId');
            const clientId = await incrementIdKey('clientId');

            agencyData.agencyId = agencyId;

            clientData.clientId = clientId;
            clientData.agencyId = agencyId;

            const newAgency = await Agency.create(agencyData);
            const newClient = await Client.create(clientData);

            sendResponse(res, 201, {newAgency, newClient}, 'New resource created successfully!');
        }
    } catch (e) {
        console.error('Error occurred in creating agency and client', e);
        sendResponse(res, 500, null, 'Sorry, something went wrong!');
    }
};

module.exports = createAgencyAndClient;
