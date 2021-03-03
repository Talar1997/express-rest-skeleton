const handleError = require('../../api/middleware/errorHandler')
const successResponse = require('./../response/successResponse')
const AuthService = require("../../services/authService")
const {status} = require('../../config/constants/statusCodes')

module.exports = () => async (req, res, next) => {
    try {
        let {email, password} = req.body

        let reCaptcha = {
            token: req.body.recaptchaToken,
            remoteIp: req.connection.remoteAddress
        }

        const {
            user,
            expiresTimestamp,
            validTo,
            token
        } = await AuthService.login(email, password, reCaptcha)

        res.header('Access-Control-Allow-Credentials', true)
        res.cookie('authToken', token, {maxAge: expiresTimestamp, Path: "/", httpOnly: true})
        successResponse(res, status.OK, {user}, false, {expires: validTo})
    } catch (error) {
        return handleError(error, req, res, next)
    }
}