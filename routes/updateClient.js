const { Client } = require('../db');
const { sendResponse, nullChecker } = require('../common');

/**
 * POST
 * API to update client details
 * @param {*} req 
 * @param {*} res 
 */
const updateClient = async (req, res) => {
    console.log('updateClient called', req.body);

    //check for missing keys
    if (nullChecker(req.body.name) || nullChecker(req.body.email) || nullChecker(req.body.phoneNumber) || nullChecker(req.body.totalBill)) {
        return sendResponse(res, 422, null, 'Invalid Input');
    }

    try {
        const name = req.body.name
        const email = req.body.email;
        const phoneNumber = req.body.phoneNumber;
        const totalBill = req.body.totalBill;

        const clientObject = {
            name,
            email,
            phoneNumber,
            totalBill,
        }

        //find client by name and perform update operation
        const updateClient = await Client.findOneAndUpdate({ name }, { $set: clientObject })

        if (updateClient === null) {
            return sendResponse(res, 404, null, 'Resource does not exists.');
        }
        else {
            return sendResponse(res, 200, null, 'Client data updated successfully!');
        }

    } catch (e) {
        console.error('Error occurred in updating client details', e);
        sendResponse(res, 500, null, 'Something went wrong!')
    }
}

module.exports = updateClient;