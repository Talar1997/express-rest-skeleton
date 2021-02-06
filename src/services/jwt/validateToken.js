const {promisify} = require('util')
const jwt = require('jsonwebtoken')
const User = require('../../models/user');
const config = require('./../../config/index')


module.exports = async (token) => {
    try {
        if (!token) return {state: false, message: "Token doesn't exists"};

        const decode = await promisify(jwt.verify)(token, config.jwt.secret);

        const user = await User.findById(decode.id);
        if (!user) return {state: false, message: "Owner of this token doesn't exists"};

        const validTo = decode.exp;
        if (validTo < (Date.now() / 1000)) return {state: false, message: "Token is no longer valid (expired)"};

        return {state: true, message: "Token is valid", data: decode}
    } catch (err) {
        return {state: false, message: `Unexpected error: ${err}`};
    }
};