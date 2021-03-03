const eventEmitter = require('./../../utils/eventEmitter')
const {logEvents} = require('./../events')
const {createInfoLog} = require("./../../services/logService")

eventEmitter.on(logEvents.onUpdate , async (updatedDocument) => {
    await createInfoLog(updatedDocument)
})