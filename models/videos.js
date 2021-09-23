const mongoose = require('mongoose')
const { Schema } = require('mongoose')

const VideoSchema = new Schema({
    date: {
        type: Date,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    images: {
        type: Array,
        required: true
    }
})

const VideoModel = mongoose.model('Videos', VideoSchema)

module.exports = VideoModel
