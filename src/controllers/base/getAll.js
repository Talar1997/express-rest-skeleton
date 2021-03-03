const handleError = require("../../api/middleware/errorHandler")
const successResponse = require('../response/successResponse')
const {status} = require('../../config/constants/statusCodes')
const BaseService = require('./../../services/baseService')

module.exports = Model => async (req, res, next) => {
    try {
        const query = req.query
        const documents = await BaseService.getAll(Model, query)

        successResponse(res, status.OK, documents, true)
    } catch (error) {
        return handleError(error, req, res, next)
    }
}