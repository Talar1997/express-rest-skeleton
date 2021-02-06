const AppError = require('../../utils/appError')
const successResponse = require('./../response/successResponse')
const validateToken = require('./../../services/jwt/validateToken')
const {status} = require('../../config/constants/statusCodes')
const handleError = require('../../api/middleware/errorHandler')

module.exports = () => async (req, res, next) => {
    const token = req.cookies['authToken'];
    let {state, message, data} = await validateToken(token);
    if (!state) handleError(new AppError(401, 'fail', message), req, res, next);
    else {
        const extraResponseData = {valid: true, message: "Token is still valid", expires: data.exp};
        successResponse(res, status.OK, null, false, extraResponseData);
    }
};