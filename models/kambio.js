const mongoose = require('mongoose')
const { Schema } = require('mongoose')

const KambioSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    location: {
        type: String
    },
    taksonomi: {
        type: Array
    },
    type: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    files: {
        type: Array,
        required: true
    }
})

KambioSchema.index({ title: 'text' })
const KambioModel = mongoose.model('Kambio', KambioSchema)

module.exports = KambioModel
