const successResponse = require('./../response/successResponse')
const handleError = require("../../api/middleware/errorHandler")
const LogService = require("../../services/logService")
const {status} = require('../../config/constants/statusCodes')

module.exports = () => async (req, res, next) => {
    try {
        const query = req.query
        const documents = await LogService.findAllLogs(query)

        successResponse(res, status.OK, documents, true)
    } catch (error) {
        return handleError(error, req, res, next)
    }
}