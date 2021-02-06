const dotenv = require('dotenv');
dotenv.config({path: '../config.env'});
const ExceptionsHandler = require("./utils/exceptionsHandler");
const config = require('./config')
const helpers = require('./utils/consoleHelpers');
const loaders = require('./loaders');
const express = require('express');
const server = require('./loaders/connection')
const logger = require("./loaders/logger");

async function startServer() {
    const app = express();

    helpers.welcomeMessage();

    await loaders.init({expressApp: app});

    await server.initializeServer(app)
        .then(server => {
            const port = config.port;
            const connection = config.connection;

            logger.info(`Starting ${config.environment} application...`)
            server.listen(config.port, (error) => {
                if (error) logger.error(`Failed to start REST API.`)
                else logger.info(`REST API is running on ${connection} port ${port}`)
            })
        });
}

startServer();

process.on('unhandledRejection', (err, promise) => new ExceptionsHandler(err, promise));
process.on('uncaughtException', err => new ExceptionsHandler(err));