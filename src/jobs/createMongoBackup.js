const logger = require("./../loaders/logger")
const createMongoBackup = require('./../utils/createMongoBackup')
const config = require('./../config/index')

module.exports = async (job, done) => {
    await createMongoBackup(config.database.backupPath)

    logger.info('createMongoBackup has finished the job')

    done()
}