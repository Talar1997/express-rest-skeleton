const config = require('./../config/index')
const { MongoTransferer, MongoDBDuplexConnector, LocalFileSystemDuplexConnector } = require('mongodb-snapshot')
const moment = require('moment')
const logger = require("../loaders/logger")
const eventEmitter = require("./../utils/eventEmitter")
const events = require('./../subscribers/events')

module.exports = async (basePath) => {
    const mongoDBDuplexConnector = new MongoDBDuplexConnector({
        connection: {
            uri: config.database.uri,
            dbname: config.database.name,
        },
    })

    const backupName = moment(new Date()).format('DD-MM-YYYY-HHmmss')

    logger.info(`Backup process has been started. Backup filename: ${backupName}.tar`)

    try{
        const localFileSystemDuplexConnector = new LocalFileSystemDuplexConnector({
            connection: {
                path: `${basePath}/${backupName}.tar`,
            },
        })

        const mongoTransferer = new MongoTransferer({
            source: mongoDBDuplexConnector,
            targets: [localFileSystemDuplexConnector],
        })

        for await (const { total, write } of mongoTransferer) {
            if(total - write === 0){
                logger.info('Backup has been created successfully')
                eventEmitter.emit(events.backup.onSuccess, {backupName})
            }
        }
    }catch(error){
        logger.error(`An error ocurred during database backup process. ${error}`, error)
        eventEmitter.emit(events.backup.onError, {error})
    }
}