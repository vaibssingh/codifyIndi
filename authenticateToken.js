const {sendResponse, nullChecker} = require('./common');
//since not using proper authentication method, hardcoding token here
const tempToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'

const authenticateToken = (req, res, next) => {
    if (nullChecker(req.header('token'))) {
        return sendResponse(res, 403, null, 'No token present')
    }
    else {
        const token = req.header('token');
        if (token === tempToken) {
            next();
        } else {
            return sendResponse(res, 403, null, 'Invalid token');
        }
    }
}

module.exports = authenticateToken