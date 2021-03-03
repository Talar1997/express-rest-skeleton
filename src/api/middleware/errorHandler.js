const AppError = require('../../utils/appError')
const {logEvents} = require("../../subscribers/events")
const eventEmitter = require('./../../utils/eventEmitter')
const {status} = require('./../../config/constants/statusCodes')

module.exports = (error, req, res, next) => {
    eventEmitter.emit(logEvents.onAppError, error)

    if (error.name === 'ValidationError')
        return next(new AppError(status.UNPROCESSABLE_ENTITY, 'fail', `Validation failed. ${error.message}`), req, res, next)
    if (error.name === 'CastError')
        return next(new AppError(status.NOT_FOUND, 'fail', 'CastError. Provided data are incorrect'), req, res, next)
    if (error.name === 'AppError')
        return next(error, req, res, next)
    else
        return next(new AppError(status.SERVER_ERROR, 'fail', `Unhandler error. ${error.name}. ${error.message}`), req, res, next)
}

