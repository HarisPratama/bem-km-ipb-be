const mongoose = require('mongoose')
const { Schema } = require('mongoose')

const WofSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    academic: {
        type: Boolean,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    month: {
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
}, {
    toJSON: { virtuals: true }
})

WofSchema.index({ title: 'text' })
const WofModel = mongoose.model('Wof', WofSchema)

module.exports = WofModel
