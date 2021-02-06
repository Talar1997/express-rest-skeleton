const {populateTable} = require('../../config/constants/dataToPopulate')

module.exports = async (Model, id) => {
    return Model.findById(id)
        .populate(populateTable);
}