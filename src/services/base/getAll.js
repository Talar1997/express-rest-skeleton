const APIFeatures = require('../../utils/apiFeatures')
const {populateTable} = require('../../config/constants/dataToPopulate')


module.exports = async (Model, query) => {
    let newQuery = Object.assign({}, query);
    if (newQuery.limit) delete newQuery.limit;
    if (newQuery.page) delete newQuery.page;
    if (newQuery.sort) delete newQuery.sort;

    const data = Model.find(newQuery).populate(populateTable)

    const features = new APIFeatures(data, query)
        .sort()
        .paginate();

    return await features.query;
}