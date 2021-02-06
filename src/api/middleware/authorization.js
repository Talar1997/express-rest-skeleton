const AppError = require("../../utils/appError")
const {status} = require('../../config/constants/statusCodes')

exports.restrictTo = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(new AppError(status.FORBIDDEN, 'fail', 'You are not allowed to do this action'), req, res, next);
        }
        next();
    };
};