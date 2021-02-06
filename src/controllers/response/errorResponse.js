const {status} = require('../../config/constants/statusCodes')
const {environment} = require('./../../config/index')

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || status.SERVER_ERROR;
    err.status = err.status || 'error';

    let stack = environment === 'DEVELOPMENT' ? err.stack : undefined;

    res.status(err.statusCode).json({
        status: err.status,
        error: err,
        message: err.message,
        stack: stack
    });

};