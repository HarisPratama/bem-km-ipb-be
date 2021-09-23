const { uploadImage } = require('../middlewares/multer')
const wofController = require('../controllers/wof')

const wofRouter = require('express').Router()

wofRouter.get('/', wofController.getWof)
wofRouter.post('/', uploadImage, wofController.postWof)
wofRouter.get('/filter', wofController.getFilterWof)
wofRouter.get('/:id', wofController.getDetailWof)
wofRouter.delete('/:id', wofController.deleteWof)

module.exports = wofRouter
