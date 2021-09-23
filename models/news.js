const mongoose = require('mongoose')
const { Schema } = require('mongoose')

const NewsSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    images: {
        type: Array,
        required: true
    },
}, {
    toJSON: { virtuals: true }
})

NewsSchema.virtual('comments', {
    ref: 'NewsComments',
    localField: '_id',
    foreignField: 'news',
    justOne: false
})

NewsSchema.index({ title: 'text' })
const NewsModel = mongoose.model('News', NewsSchema)

module.exports = NewsModel
