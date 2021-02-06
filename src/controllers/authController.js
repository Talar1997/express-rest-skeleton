const logout = require('./auth/logout')
const login = require('./auth/login')
const signUp = require('./auth/signUp')
const checkTokenValidation = require('./auth/checkTokenValidation')

exports.checkTokenValidation = checkTokenValidation()
exports.logout = logout()
exports.login = login()
exports.signUp = signUp()