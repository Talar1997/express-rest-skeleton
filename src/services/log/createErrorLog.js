const createLog = require('./createLog')
const {severities} = require('../../config/constants/logSeverities')

module.exports = async (requestDetails, obj, level = severities.ERROR) => {
    const error = {
        _id: null,
        name: obj.name,
        stack: obj.stack,
    }
    const errorAsString = JSON.stringify(obj.name) + ': ' + JSON.stringify(obj.stack)
    await createLog(requestDetails, level, error, errorAsString)
}