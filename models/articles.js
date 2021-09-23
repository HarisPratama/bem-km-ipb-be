const mongoose = require('mongoose')
const { Schema } = require('mongoose')

const ArticleSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    desc: {
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

ArticleSchema.virtual('comments', {
    ref: 'ArticleComments',
    localField: '_id',
    foreignField: 'article',
    justOne: false
})

ArticleSchema.index({ title: 'text' })
const ArticleModel = mongoose.model('Articles', ArticleSchema)

module.exports = ArticleModel
