const successResponse = require('./../response/successResponse')
const {status} = require('../../config/constants/statusCodes')

// eslint-disable-next-line no-unused-vars
module.exports = () => async (req, res, next) => {
    res.clearCookie('authToken', {path: '/'})
    const message = "authToken removed successfully"

    //TODO: replace it with 204 No Content when deprecated logout will be removed
    successResponse(res, status.OK, null, false, {message})
}