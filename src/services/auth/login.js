const User = require('../../models/user')
const createToken = require('../jwt/createToken')
const config = require('../../config')
const AppError = require('../../utils/appError')
const {status} = require('../../config/constants/statusCodes')
const reCaptchaService = require('./reCaptchaService')

module.exports = async (email, password, reCaptchaDetails) => {

    await reCaptchaService(reCaptchaDetails)
        .catch(error => {throw error})

    if (!email || !password) {
        throw new AppError(status.UNAUTHORIZED, 'fail', 'Please provide email or password')
    }
    
    let user = await User.findOne({email}).select('+password')

    //If user doesn't exists, decrypt random password to increase response time
    if (!user) {
        const user = new User
        const passwordToCompare = "$2a$12$ePZSHmwvU3kwxn//g1Ptxe3QMxiuluwMKDSG81Na7oai40XNq3OAm"
        await user.comparePassword(password, passwordToCompare)
        throw new AppError(status.UNAUTHORIZED, 'fail', 'Name or Password is wrong')
    }

    if (!await user.comparePassword(password, user.password)) {
        throw new AppError(status.UNAUTHORIZED, 'fail', 'Name or Password is wrong')
    }

    if (!user.active) {
        throw new AppError(status.UNAUTHORIZED, 'fail', 'This account is inactive')
    }

    const token = createToken(user.id)

    const loginDateTime = new Date(Date.now())
    user = await User.findByIdAndUpdate(user.id, {lastLogin: loginDateTime})
    user.lastLogin = loginDateTime
    user.password = undefined

    const expiresTimestamp = config.jwt.expiresIn * 1000
    const validTo = Date.now() + expiresTimestamp

    return {
        user,
        expiresTimestamp,
        validTo,
        token
    }
}