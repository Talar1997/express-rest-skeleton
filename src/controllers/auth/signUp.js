const handleError = require('../../api/middleware/errorHandler')
const successResponse = require('./../response/successResponse')
const {status} = require('../../config/constants/statusCodes')
const UserService = require('./../../services/userService')

module.exports = () => async (req, res, next) => {
    try {
        let user = req.body
        let createdUser = await UserService.createUser(user)

        successResponse(res, status.CREATED, {user: createdUser})
    } catch (error) {
        handleError(error, req, res, next)
    }
}