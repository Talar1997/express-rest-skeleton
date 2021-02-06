const User = require('../models/user');1
const base = require('./baseController');
const updateUser = require('./user/updateUser')

exports.getAllUsers = base.getAll(User);
exports.getUser = base.getOne(User);
exports.updateUser = updateUser();
exports.deleteUser = base.deleteOne(User);