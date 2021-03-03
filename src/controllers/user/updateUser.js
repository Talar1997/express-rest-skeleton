const handleError = require('../../api/middleware/errorHandler')
const successResponse = require('../response/successResponse')
const UserService = require("../../services/userService")
const AppError = require("../../utils/appError")
const {status} = require('../../config/constants/statusCodes')

module.exports = () => async (req, res, next) => {
    try {
        const id = req.params.id
        const user = req.body

        const document = await UserService.updateUser(id, user)
        if (!document) {
            return handleError(new AppError(status.NOT_FOUND, 'fail', 'No document found with that id'), req, res, next)
        }

        successResponse(res, status.OK, {doc: document})
    } catch (error) {
        return handleError(error, req, res, next)
    }
}