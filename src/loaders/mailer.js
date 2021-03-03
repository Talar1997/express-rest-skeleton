const nodemailer = require('nodemailer')
const config = require('./../config/index')

module.exports = async () => {
    return nodemailer.createTransport(config.mailer.transport)
}
