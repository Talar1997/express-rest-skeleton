const {logEvents} = require("../../subscribers/events")
const eventEmitter = require('./../../utils/eventEmitter')

module.exports = async (Model, modelObject) => {
    const createdDocument = await Model.create(modelObject)

    eventEmitter.emit(logEvents.onCreate, createdDocument)

    return createdDocument
}