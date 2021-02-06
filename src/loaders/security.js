const express = require('express')
const helpers = require('../utils/consoleHelpers')
const helmet = require('helmet')
const xss = require('xss-clean')
const hpp = require('hpp')
const mongoSanitize = require('express-mongo-sanitize')
const cookieParser = require('cookie-parser')
const logger = require('./logger')


module.exports = async (app) => {
    logger.info(`Setting up security configuration...`)

    app.use(cookieParser());
    app.use(helmet());
    app.use(xss());
    app.use(hpp());
    app.use(mongoSanitize());
    app.use(express.json({limit: '15kb'}));

    logger.info(`Security has been configured correctly`)

}