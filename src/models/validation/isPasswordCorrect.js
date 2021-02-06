const validator = require('validator')

module.exports = async (password) => {
    return validator.matches(password, /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,128}$/)
}