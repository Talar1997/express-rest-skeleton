const nodemailer = require('nodemailer')
const config = require('./../config/index')

module.exports = async () => {
    let transporter = nodemailer.createTransport(config.mailer.transport);
}
