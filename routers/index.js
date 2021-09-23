const router = require('express').Router()

const userRouter = require('./users')
const newsRouter = require('./news')
const imagesRouter = require('./images')
const documentsRouter = require('./documents')
const articleRouter = require('./article')
const videoRouter = require('./videos')
const kambioRouter = require('./kambio')
const wofRouter = require('./wof')

router.use('/user', userRouter)
router.use('/news', newsRouter)
router.use('/articles', articleRouter)
router.use('/images', imagesRouter)
router.use('/file', documentsRouter)
router.use('/videos', videoRouter)
router.use('/kambio', kambioRouter)
router.use('/wof', wofRouter)

module.exports = router
