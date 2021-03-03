const eventEmitter = require('./../../utils/eventEmitter')
const logger = require("../../loaders/logger")
const {logEvents} = require('./../events')

module.exports = async () => {
    eventEmitter.on(logEvents.onAppError, async (error) => {
        logger.warn(`Handled application error: ${error.name}`, {error: error})
    })
}