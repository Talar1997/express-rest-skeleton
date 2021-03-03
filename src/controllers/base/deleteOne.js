const AppError = require("../../utils/appError")
const handleError = require("../../api/middleware/errorHandler")
const successResponse = require('../response/successResponse')
const BaseService = require("../../services/baseService")
const {status} = require('../../config/constants/statusCodes')

module.exports = Model => async (req, res, next) => {
    try {
        const id = req.params.id
        const removedDocument = await BaseService.deleteOne(Model, id)
        if (!removedDocument) {
            return handleError(new AppError(status.NOT_FOUND, 'fail', 'No document found with that id'), req, res, next)
        }

        successResponse(res, status.NO_CONTENT, null)
    } catch (error) {
        return handleError(error, req, res, next)
    }
}