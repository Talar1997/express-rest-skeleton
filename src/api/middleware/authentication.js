const httpContext = require("express-http-context")
const AppError = require("../../utils/appError")
const User = require('../../models/user')
const getDecodedToken = require('./../../services/jwt/getDecodedToken')
const {status} = require('../../config/constants/statusCodes')

exports.protect = async (req, res, next) => {
    const token = req.cookies['authToken']
    let {state, message, data} = await getDecodedToken(token)
    if (!state) return next(new AppError(status.UNAUTHORIZED, 'fail', message), req, res, next)
    else {
        req.user = await User.findById(data.id)
        httpContext.set('userDetails', req.user)
        next()
    }
}