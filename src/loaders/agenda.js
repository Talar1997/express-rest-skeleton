const logger = require('./logger')
const Agenda = require('agenda')
const config = require('./../config/index')

module.exports = async (mongoConnection) => {
    logger.info(`Setting up agenda.js...`)

    const agenda = new Agenda({
        mongo: mongoConnection,
        db: { collection: config.agenda.dbCollection },
        processEvery: config.agenda.pooltime,
        maxConcurrency: config.agenda.concurrency,
    })

    logger.info(`Agenda has been set up`)

    return agenda
}