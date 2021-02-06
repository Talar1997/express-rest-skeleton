const config = require('../../config')
const AppError = require("../../utils/appError");
const logger = require("../../loaders/logger");
const ReCaptchaV2 = require('recaptcha-v2').Recaptcha
const {status} = require('../../config/constants/statusCodes')

module.exports = async (reCaptcha) => {
    this.success = null
    if (!reCaptcha.token) {
        throw new AppError(status.UNAUTHORIZED, 'fail', 'Recaptcha token is required to proceed further')
    }

    let data = {
        remoteip: reCaptcha.remoteIp,
        response: reCaptcha.token,
        secret: config.recaptcha.privateKey
    };

    let recaptcha = new ReCaptchaV2(config.recaptcha.siteKey, config.recaptcha.privateKey, data, false);

    const verifyPromise = new Promise((resolve, reject) => {
        recaptcha.verify((success, error_code) => {
            if (success) resolve()
            else reject(error_code)
        })
    })

    return await verifyPromise
        .catch((errorCode) => {
            logger.warn(`Recaptcha validation has failed. Consider request from bot or attacker.`, errorCode)
            throw new AppError(status.UNAUTHORIZED, 'fail', `Recaptcha validation has failed`)
        })
}