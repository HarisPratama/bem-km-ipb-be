const VideosController = require('../controllers/videos')
const { uploadImage } = require('../middlewares/multer')

const videoRouter = require('express').Router()

videoRouter.get('/', VideosController.getVideos)
videoRouter.post('/', uploadImage, VideosController.postVideo)
videoRouter.delete('/:id', VideosController.deleteVideo)

module.exports = videoRouter
