const moment = require('moment')
const Log = require("../../models/log")
const logger = require('./../../loaders/logger')

/**
 * @param olderThan - how many days have to be subtract from today.
 * @returns {Promise<void>}
 */
module.exports = async (olderThan) => {
    const lastYearTimestamp = moment().subtract(olderThan, 'd').valueOf()

    const results = await Log.deleteMany({
        issuedAt: { $lte: lastYearTimestamp }
    })

    logger.warn(`Logs from ${lastYearTimestamp} has been removed. Removed ${results.deletedCount} logs`, results)

    return results
}