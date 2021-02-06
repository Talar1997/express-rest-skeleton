const Log = require('./../../models/log')
const logger = require("../../loaders/logger");

module.exports = async (requestDetails, userDetails, level, targetObject, targetObjectString = null) => {
    let logObject = {
        performedBy: userDetails._id,
        remoteIp: requestDetails.remoteIp,
        action: {
            method: requestDetails.method,
            url: requestDetails.url
        },
        targetId: targetObject._id,
        targetObject: targetObject,
        targetObjectString: targetObjectString,
        level: level,
        issuedAtISO: new Date(Date.now()),
        issuedAt: Date.now()
    }

    await Log.create(logObject).catch(error => logger.error("An error occurred", {error: error}))
};