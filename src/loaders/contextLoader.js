const httpContext = require("express-http-context")
const logger = require('./logger')

module.exports = async (app) => {
    logger.info('Creating httpContext...')

    app.use(httpContext.middleware);

    app.use((req, res, next) => {
        const details = {
            remoteIp: req.connection.remoteAddress,
            method: req.method,
            url: req.originalUrl
        }
        httpContext.set('requestDetails', details)
        next()
    })

    logger.info('Context has been created')
}