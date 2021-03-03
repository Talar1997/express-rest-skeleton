const eventEmitter = require('./../../utils/eventEmitter')
const {logEvents} = require('./../events')
const {createInfoLog} = require("./../../services/logService")

module.exports = async () => {
    eventEmitter.on(logEvents.onUpdate, async (updatedDocument) => {
        await createInfoLog(updatedDocument)
    })
}