const KambioController = require('../controllers/kambio')
const { uploadImage } = require('../middlewares/multer')

const kambioRouter = require('express').Router()

kambioRouter.get('/', KambioController.getKambio)
kambioRouter.post('/', uploadImage, KambioController.postKambio)
kambioRouter.get('/:id', KambioController.getDetailKambio)
kambioRouter.delete('/:id', KambioController.deleteKambio)

module.exports = kambioRouter
