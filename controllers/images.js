const fs = require('fs')

class ImagesController {
    static async getImages(req, res) {
        try {
            const path = `./assets/images/${req.query.fileName}`
            if (fs.existsSync(path)) {
                res.contentType("image/jpeg");
                fs.createReadStream(path).pipe(res)
            } else {
                res.status(404).json({ status: 404, message: 'images not found' })
            }
        } catch (error) {
            res.status(500).json({ status: 500, message: 'Ooops! something error' })
        }
    }

    static async getArticleImage(req, res) {
        try {
            const path = `./assets/documents/${req.query.fileName}`
            if (fs.existsSync(path)) {
                res.contentType("image/jpeg");
                fs.createReadStream(path).pipe(res)
            } else {
                res.status(404).json({ status: 404, message: 'images not found' })
            }
        } catch (error) {
            res.status(500).json({ status: 500, message: 'Ooops! something error' })
        }
    }
}

module.exports = ImagesController
