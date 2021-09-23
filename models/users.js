const mongoose = require('mongoose')
const { Schema } = require('mongoose')

const UsersSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        index: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    registerAt: {
        type: Date,
        required: true
    },
})

const UsersModel = mongoose.model('User', UsersSchema)

module.exports = UsersModel
