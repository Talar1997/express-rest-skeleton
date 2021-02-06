const AppError = require("../utils/appError")
const logger = require('./../loaders/logger')

module.exports = async (app) => {
    logger.info(`Setting up API routes...`)

    const v1 = '/api/v1'

    const userRoutes = require('./routes/users')
    app.use(`${v1}/users`, userRoutes)

    const logRoutes = require('./routes/logs')
    app.use(`${v1}/logs`, logRoutes)

    const authRoutes = require('./routes/authorization')
    app.use(`${v1}/authorization`, authRoutes)

    app.use('*', (req, res, next) => {
        const err = new AppError(404, 'fail', 'Undefined route')
        next(err, req, res, next)
    })

    logger.info(`API routes has been set up`)
}