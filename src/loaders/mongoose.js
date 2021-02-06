const mongoose = require('mongoose')
const config = require('../config/index')
const logger = require('./logger')

module.exports = async () => {
    logger.info(`Connecting to database...`)

    const connectionString = config.database.uri
    const dbConfig = {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    }

    const connection = await mongoose.connect(connectionString, dbConfig)
        .then((connection) => {
            logger.info(`Database connected successfully`)
            return connection
        })
        .catch((error) => logger.error(`Database connection failed`, {error: error}))

    return connection.connection.db;
}