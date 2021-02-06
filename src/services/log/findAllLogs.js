const APIFeatures = require('../../utils/apiFeatures')
const Log = require("../../models/log");

module.exports = async (query) => {
    let nestedObjectFilter;
    let newQuery = Object.assign({}, query);
    if (newQuery.limit) delete newQuery.limit;
    if (newQuery.page) delete newQuery.page;
    if (newQuery.sort) delete newQuery.sort;


    if (newQuery.from) {
        if (newQuery.to === undefined) newQuery.to = Date.now();
        newQuery.issuedAt = {$gte: newQuery.from, $lte: newQuery.to}
        delete newQuery.from;
        delete newQuery.to;
    }

    if (newQuery.targetObject) {
        nestedObjectFilter = newQuery.targetObject;
        newQuery['$text'] = {$search: nestedObjectFilter}
        delete newQuery.targetObject;
    }

    if(newQuery.action){
        let value = newQuery.action
        newQuery['action.method'] = value
        delete newQuery.action
    }

    const data = Log.find(newQuery)
        .populate(["performedBy"])

    const features = new APIFeatures(data, query)
        .sort()
        .paginate();

    return await features.query;
}