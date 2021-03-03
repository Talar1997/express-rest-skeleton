const logger = require('./../loaders/logger')

class ExceptionsHandler {
    constructor(err, promise) {
        logger.error(`UNHANDLED REJECTION! Shutting down...`, {error: err})
        logger.error(err)
        logger.error(promise)
        process.exit(1)
    }
}

module.exports = ExceptionsHandler