const jwt = require('jsonwebtoken')
const config = require('./../../config/index')

module.exports = (id) => {
    return jwt.sign({id}, config.jwt.secret, {expiresIn: config.jwt.expiresIn})
}
