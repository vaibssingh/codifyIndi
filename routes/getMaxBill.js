const { Client } = require('../db');
const { sendResponse } = require('../common');

/**
 * @function API to get max totalBill among all the clients with the agency info
 * @param {*} req 
 * @param {*} res 
 */
const getMaxBill = async (req, res) => {
    try {
        // using aggregate to get all related info in one call hence avoids doing multiple calls to db
        const aggregateQuery = [
            // filter out  the required fields and get the totalBill with max amount
            {
                $project: {
                    _id: 0,
                    totalBill: { $max: '$totalBill' },
                    name: 1,
                    agencyId: 1,
                }
            },
            // sort in descending order
            {
                $sort: {
                    totalBill: -1
                }
            },
            // pass the document with max totalBill for lookup stage
            {
                $limit: 1
            },
            {
                $lookup: {
                    from: 'agencies',
                    localField: 'agencyId',
                    foreignField: 'agencyId',
                    as: 'agencyInfo'
                }
            },
            {
                $unwind: '$agencyInfo'
            },
            {
                $project: {
                    agencyId: 1,
                    name: 1,
                    totalBill: 1,
                    agencyName: '$agencyInfo.name'
                }
            }
        ];

        const result = await Client.aggregate(aggregateQuery)
        sendResponse(res, 200, result, 'Client and agency info with max totalBill amount')

    } catch (e) {
        console.error('Error occurred in getting max value', e);
        sendResponse(res, 500, null, 'Something went wrong!')
    }

}

module.exports = getMaxBill;