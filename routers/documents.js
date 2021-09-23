const DocumentsController = require('../controllers/documents')

const documentsRouter = require('express').Router()

documentsRouter.get('/', DocumentsController.getPdf)

module.exports = documentsRouter
