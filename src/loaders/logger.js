const moment = require('moment')
const winston = require('winston')
const config = require('./../config/index')

const directoryName = moment(new Date()).format('DD-MM-YYYY')

const logger = winston.createLogger({
    levels: winston.config.npm.levels,
    format: winston.format.combine(
        winston.format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        winston.format.errors({ stack: true }),
        winston.format.splat(),
        winston.format.json(),
    ),
    transports: [
        new winston.transports.File({ filename: `${config.logs.path}/${directoryName}/error.log`, level: 'error' }),
        new winston.transports.File({ filename: `${config.logs.path}/${directoryName}/combined.log`}),
    ],
})

if (config.environment === 'PRODUCTION') {
    logger.add(new winston.transports.Console({
        format: winston.format.combine(
            winston.format.cli(),
            winston.format.splat(),
        ),
        level: 'info',
    }))
}
else{
    logger.add(new winston.transports.Console({
        format: winston.format.combine(
            winston.format.cli(),
            winston.format.splat(),
        ),
    }))
}



module.exports = logger