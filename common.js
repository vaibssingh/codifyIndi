const { Id } = require('./db')

class Common {
    /**
     *  Common method to send response to client
     * @param res Express res function
     * @param statusCode Status code to be sent with response (200, 300, 400)
     * @param data Data to be sent with response. In case of no data, pass an empty object - {}
     * @param message Message to be sent with response
     */
    sendResponse(res, statusCode, data, message) {
        return res.status(statusCode).json({
            data: data,
            message: message
        });
    }

    /**
     * @function to check for validity of value
     * @param {*} value - Value to check
     */
    nullChecker(value) {
        return (value === undefined || value === '' || value === null || value === []);
    }

    /**
     * @function to increment id key when generating new agency or client
     * @param {*} key - key to increment by 1
     */
    async incrementIdKey(key) {
        try {
            const newCount = await Id.findOneAndUpdate({ key }, {
                $inc: {
                    count: 1
                }
            }, {
                returnOriginal: false,
            })

            return newCount.count

        } catch (e) {
            console.error('Error occurred in incrementing key', e);
            return e
        }
    }
}

const commonClass = new Common()
module.exports = commonClass;