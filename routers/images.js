const ImagesController = require('../controllers/images')

const imagesRouter = require('express').Router()

imagesRouter.get('/', ImagesController.getImages)
imagesRouter.get('/article', ImagesController.getArticleImage)

module.exports = imagesRouter
