const mongoose = require('mongoose')
const { Schema } = require('mongoose')

const CommentsSchema = new Schema({
    comment: {
        required: true,
        type: String
    },
    name: {
        required: true,
        type: String
    },
    email: {
        required: true,
        type: String
    },
    article: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Articles'
    },
    date: {
        required: true,
        type: Date
    }
})

const ArticleCommentModel = mongoose.model('ArticleComments', CommentsSchema)

module.exports = ArticleCommentModel
