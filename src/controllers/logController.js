const {getOne} = require('./baseController');
const Log = require('../models/log');
const findAllLogs = require('./log/findAllLogs')

exports.getOneLog = getOne(Log)
exports.getAllLogs = findAllLogs()
