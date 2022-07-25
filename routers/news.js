const NewsController = require('../controllers/news');
const { uploadImage } = require('../middlewares/multer');

const router = require('express').Router();

router.get('/', NewsController.getNews);
router.post('/', uploadImage, NewsController.postNews);
router.get('/filter', NewsController.getFilterNews);
router.post('/comment', NewsController.postComment);
router.put('/:id', NewsController.updateNews);
router.get('/:id', NewsController.getDetailNews);
router.delete('/:id', NewsController.deleteNews);

module.exports = router;
