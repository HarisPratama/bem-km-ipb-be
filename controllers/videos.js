const { ObjectId } = require('mongodb')
const VideoModel = require("../models/videos")

class VideosController {
    static async getVideos(req, res) {
        try {
            const videos = await VideoModel.find().sort({ date: -1 })
            res.status(200).json({ status: 200, ok: true, data: videos })
        } catch (error) {
            res.status(500).json({ status: 500, message: 'Oops!! something error' })
        }
    }

    static async postVideo(req, res) {
        try {
            const body = JSON.parse(req.body.data)
            const video = {
                url: body.url,
                date: new Date(),
                images: req.files
            }

            const insertVideo = new VideoModel(video)
            await insertVideo.save()
            res.status(200).json({ status: 200, ok: true, message: 'Success add video' })
        } catch (error) {
            res.status(500).json({ status: 500, message: 'Oops!! something error' })
        }
    }

    static async deleteVideo(req, res) {
        try {
            await VideoModel.deleteOne({ _id: ObjectId(req.params.id) })
            res.status(200).json({ status: 200, ok: true, message: 'Success delete video' })
        } catch (error) {
            res.status(500).json({ status: 500, message: 'Ooops! something error' })
        }
    }
}

module.exports = VideosController
