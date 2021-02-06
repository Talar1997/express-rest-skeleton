require('isomorphic-fetch')
const config = require('../../config')
const AppError = require("../../utils/appError");
const logger = require("../../loaders/logger");
const {status} = require('../../config/constants/statusCodes')

module.exports = async (reCaptcha) => {
    const token = reCaptcha.token
    const secretKey = config.recaptcha.privateKey
    const url = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`

    if (!token) {
        throw new AppError(status.UNAUTHORIZED, 'fail', 'Recaptcha token is required to proceed further')
    }

    return fetch(url, {method: 'post'})
        .then(response => response.json())
        .catch(error => {
            logger.error(`Recaptcha error: ${error}`, error)
            throw new AppError(status.UNAUTHORIZED, 'fail', `Something went wrong with reCaptcha request!`)
        })
        .then(google_response => {
            if(!google_response.success){
                logger.warn(`Recaptcha validation has failed. Consider request from bot or attacker.`)
                throw new AppError(status.UNAUTHORIZED, 'fail', `Recaptcha validation has failed`)
            }
        })
}