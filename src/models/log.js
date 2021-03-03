const mongoose = require('mongoose')

Schema = mongoose.Schema

const logSchema = new mongoose.Schema({
    issuedAt: {
        type: Number,
        default: Date.now(),
        select: false,
    },
    issuedAtISO: {
        type: Date,
        default: new Date(Date.now()),
    },
    performedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    level:{
        type: String,
        enum: ['INFO', 'WARNING', 'ERROR', 'CRITICAL']
    },
    remoteIp: {
        type: String,
        required: false
    },
    action: {
        method: {
            type: String,
            enum: ['POST', 'PATCH', 'DELETE', 'GET'],
            required: true,
        },
        url: {
            type: String,
            required: true
        }
    },
    targetObject: {
        type: Object,
        required: false
    },
    targetObjectString:{
        type: String,
        required: false,
        select: true,
    },
    details: {
        type: String,
        required: false
    }
})

logSchema.index({name: 'text', 'targetObjectString': 'text'})

const Log = mongoose.model('Log', logSchema)
module.exports = Log