const ArticlesController = require('../controllers/articles')
const { uploadPdf } = require('../middlewares/multer')
const articleRouter = require('express').Router()

articleRouter.get('/', ArticlesController.getArticles)
articleRouter.get('/filter', ArticlesController.getFilterArticles)
articleRouter.post('/', uploadPdf, ArticlesController.postArticle)
articleRouter.post('/comment', ArticlesController.postComment)
articleRouter.get('/:id', ArticlesController.getDetailArticle)
articleRouter.delete('/:id', ArticlesController.deleteArticle)

module.exports = articleRouter
