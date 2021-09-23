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
    news: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'News'
    },
    date: {
        required: true,
        type: Date
    }
})

const NewsCommentModel = mongoose.model('NewsComments', CommentsSchema)

module.exports = NewsCommentModel
