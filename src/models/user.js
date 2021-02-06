const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const {roles} = require("../config/constants/roles")
const validatePassword = require('./validation/isPasswordCorrect')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please fill your name'],
        unique: false,
    },
    email: {
        type: String,
        required: [true, 'Please fill your email'],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, ' Please provide a valid email'],
        select: true

    },
    password: {
        type: String,
        required: [true, 'Please fill password'],
        minLength: 8,
        maxLength: 128,
        validate: {
            validator: (v) => {
                return validatePassword(v)
            },
            message: `Password should contain 1 upper case, 1 lower case, 1 number or special character and at least 8 characters length (max 128)`
        },
        select: false
    },
    role: {
        type: String,
        enum: [roles.ADMIN, roles.USER],
        default: roles.USER,
        select: true,
    },
    active: {
        type: Boolean,
        default: true,
        select: true
    },
    added: {
        type: Date,
        select: true,
    },
    lastLogin: {
        type: Date,
        select: true,
        required: false,
    }
});

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

userSchema.methods.comparePassword = async function (typedPassword, originalPassword) {
    return await bcrypt.compare(typedPassword, originalPassword);
};

const User = mongoose.model('User', userSchema);
module.exports = User;