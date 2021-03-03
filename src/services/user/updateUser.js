const bcrypt = require('bcryptjs')
const AppError = require("../../utils/appError")
const User = require("../../models/user")
const eventEmitter = require("../../utils/eventEmitter")
const {logEvents} = require("../../subscribers/events")
const {status} = require('./../../config/constants/statusCodes')
const validatePassword = require('./../../models/validation/isPasswordCorrect')

module.exports = async (id, userObject) => {
    const beforeUpdate = await User.findById(id)
    let passwordHasBeenChanged = false

    if (userObject.password) {
        const isPasswordCorrect = await validatePassword(userObject.password)

        if (isPasswordCorrect) {
            userObject.password = await bcrypt.hash(userObject.password, 12)
            passwordHasBeenChanged = true
        } else {
            throw new AppError(status.UNPROCESSABLE_ENTITY, 'fail', 'Validation failed!')
        }
    }

    const updatedUser = await User.findByIdAndUpdate(id, userObject, {
        new: true,
        runValidators: true
    })

    beforeUpdate.password = undefined
    if(passwordHasBeenChanged) {
        updatedUser.password = "Password has been changed"
    }

    eventEmitter.emit(logEvents.onUpdate, {before: beforeUpdate, after: updatedUser})

    updatedUser.password = undefined
    return updatedUser
}