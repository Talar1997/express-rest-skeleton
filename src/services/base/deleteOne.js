const {logEvents} = require("../../subscribers/events")
const eventEmitter = require('./../../utils/eventEmitter')

module.exports = async (Model, id) => {
    const removedDocument = await Model.findByIdAndDelete(id)

    eventEmitter.emit(logEvents.onDelete, removedDocument)

    return removedDocument
}