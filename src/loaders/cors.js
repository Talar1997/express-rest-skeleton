const cors = require('cors')
const options = require('../config/index')
const logger = require('./logger')

module.exports = async (app) => {
    logger.info(`Setting up CORS configuration...`)

    app.use(cors(options.cors))

    logger.info(`CORS has been configured correctly`)
}