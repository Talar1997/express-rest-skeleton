const User = require('../../models/user');
const {logEvents} = require("../../subscribers/events")
const eventEmitter = require('./../../utils/eventEmitter')

module.exports = async (user) => {
    const newUser = await User.create(user)
    newUser.password = undefined

    eventEmitter.emit(logEvents.onCreate, newUser)

    return newUser
}