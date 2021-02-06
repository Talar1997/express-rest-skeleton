const AppError = require("../../utils/appError")
const handleError = require("../../api/middleware/errorHandler")
const successResponse = require('../response/successResponse')
const BaseService = require("../../services/baseService");
const {status} = require('../../config/constants/statusCodes')

module.exports = Model => async (req, res, next) => {
    try {
        const id = req.params.id
        const modelObject = req.body
        const afterUpdate = await BaseService.updateOne(Model, id, modelObject)
        if (!afterUpdate) {
            return handleError(new AppError(status.NOT_FOUND, 'fail', 'No document found with that id'), req, res, next)
        }

        successResponse(res, status.OK, {doc: afterUpdate})
    } catch (error) {
        return handleError(error, req, res, next)
    }
}