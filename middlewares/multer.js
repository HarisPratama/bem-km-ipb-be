const multer = require('multer')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './assets/images')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})
const upload = multer({ storage: storage }).array('images', 1)

function uploadImage(req, res, next) {
    upload(req, res, (err) => {
        if (!err) next()
        else next(err)
    })
}

const storage1 = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './assets/documents')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})
const upload1 = multer({ storage: storage1 }).array('files', 2)

function uploadPdf(req, res, next) {
    upload1(req, res, (err) => {
        if (!err) next()
        else next(err)
    })
}

module.exports = { uploadImage, uploadPdf }
