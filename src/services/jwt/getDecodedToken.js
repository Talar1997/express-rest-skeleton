const validateToken = require('./validateToken')

module.exports = async token => await validateToken(token)