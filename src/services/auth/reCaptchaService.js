const reCaptchaV2Service = require('./reCaptchaV2')
const reCaptchaV3Service = require('./reCaptchaV3')
const config = require('../../config')

module.exports = async (reCaptcha) => {
    if (config.recaptcha.required === true){
        const recaptchaVersion = config.recaptcha.version

        if(recaptchaVersion === 2) return await reCaptchaV2Service(reCaptcha)
        if(recaptchaVersion === 3) return await reCaptchaV3Service(reCaptcha)
    }
}