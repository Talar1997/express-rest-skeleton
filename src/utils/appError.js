// @author https://github.com/MoathShreim/Nodejs-rest-api-project-structure-Express/blob/master/utils/

class AppError extends Error {
    constructor(statusCode, status, message) {
        super(message)
        this.statusCode = statusCode
        this.status = status
        this.message = message
        this.name = 'AppError'
    }
}

module.exports = AppError