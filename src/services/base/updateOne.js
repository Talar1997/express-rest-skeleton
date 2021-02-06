const {logEvents} = require("../../subscribers/events")
const eventEmitter = require('./../../utils/eventEmitter')

module.exports = async (Model, id, modelObject) => {
    const beforeUpdate = await Model.findById(id)

    const afterUpdate = await Model.findByIdAndUpdate(id, modelObject, {
        new: true,
        runValidators: true
    })

    eventEmitter.emit(logEvents.onUpdate, {before: beforeUpdate, after: afterUpdate})

    return afterUpdate
}