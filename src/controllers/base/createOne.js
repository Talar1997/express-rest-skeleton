const handleError = require("../../api/middleware/errorHandler")
const successResponse = require('../response/successResponse')
const {status} = require('../../config/constants/statusCodes')
const BaseService = require('./../../services/baseService')

module.exports = Model => async (req, res, next) => {
    try {
        const modelObject = req.body
        const createdDocument = await BaseService.createOne(Model, modelObject)

        successResponse(res, status.CREATED, {doc: createdDocument})
    } catch (error) {
        return handleError(error, req, res, next);
    }
}