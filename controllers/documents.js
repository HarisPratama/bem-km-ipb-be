const fs = require('fs')

class DocumentsController {
    static async getPdf(req, res) {
        try {
            const path = `./assets/documents/${req.query.fileName}`
            if (fs.existsSync(path)) {
                res.contentType("application/pdf");
                fs.createReadStream(path).pipe(res)
            } else {
                res.status(404).json({ status: 404, message: 'images not found' })
            }
        } catch (error) {
            res.status(500).json({ status: 500, message: 'Ooops! something error' })
        }
    }
}

module.exports = DocumentsController
