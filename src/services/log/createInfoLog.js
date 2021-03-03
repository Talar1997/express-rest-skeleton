const createLog = require('./createLog')
const {severities} = require('../../config/constants/logSeverities')
const httpContext = require("express-http-context")
const logger = require("../../loaders/logger")

module.exports = async (obj, level = severities.INFO) => {
    const userDetails = httpContext.get('userDetails')
    const requestDetails = httpContext.get('requestDetails')
    const stringObject = JSON.stringify(obj)

    if(typeof userDetails !== "undefined" && requestDetails !== "undefined"){
        await createLog(requestDetails, userDetails, level, obj, stringObject)
    }
    else{
        logger.warn("HttpContext doesn't provide necessary data to create log")
    }
}