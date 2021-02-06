const eventEmitter = require('./../../utils/eventEmitter')
const {logEvents} = require('./../events')
const {createInfoLog} = require("./../../services/logService")

eventEmitter.on(logEvents.onDelete , async (removedDocument) => {
    await createInfoLog(removedDocument)
})