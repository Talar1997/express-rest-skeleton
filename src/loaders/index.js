const expressLoader = require('./express')
const mongooseLoader = require('./mongoose')
const eventsLoader = require('./subscriptions')
const agendaLoader = require('./agenda')
const jobsLoader = require('./jobs')

exports.init = async ({expressApp}) => {
    const mongoConnection = await mongooseLoader()
    const agenda = await agendaLoader(mongoConnection)
    await jobsLoader(agenda)
    await eventsLoader()
    await expressLoader(expressApp)
}