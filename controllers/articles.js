const ArticleModel = require("../models/articles")
const { ObjectId } = require('mongodb')
const ArticleCommentModel = require("../models/articleComments")

class ArticlesController {
    static async getArticles(req, res) {
        try {
            const data = await ArticleModel.find()
                .sort({ date: -1 })
                .skip(+req.query.skip)
                .limit(6)
            res.status(200).json({ status: 200, ok: true, data: data })
        } catch (error) {
            res.status(500).json({ status: 200, message: 'Oops!! something error' })
        }
    }

    static async getFilterArticles(req, res) {
        try {
            let sort
            if (req.query.category === 'ASC') sort = 1
            else sort = -1

            const data = await ArticleModel.find({
                $text: { $search: req.query.title }
            })
                .sort({ title: sort })
                .skip(+req.query.skip)
                .limit(6)
            res.status(200).json({ status: 200, ok: true, data: data })
        } catch (error) {
            res.status(500).json({ status: 200, message: 'Oops!! something error' })
        }
    }

    static async getDetailArticle(req, res) {
        try {
            const news = await ArticleModel.findOne({ _id: ObjectId(req.params.id) }).populate('comments')
            res.status(200).json({ status: 200, ok: true, data: news })
        } catch (error) {
            console.log(error.message);
            res.status(500).json({ status: 500, message: 'Ooops! something error' })
        }
    }

    static async postArticle(req, res) {
        try {
            const body = JSON.parse(req.body.data)
            const newArticle = {
                title: body.title,
                desc: body.desc,
                date: new Date(),
                files: req.files
            }
            const insertArticle = new ArticleModel(newArticle)
            await insertArticle.save()
            res.status(200).json({ status: 200, ok: true, message: 'Success add news' })
        } catch (error) {
            console.log(error.message);
            res.status(500).json({ status: 200, message: 'Oops!! something error' })
        }
    }


    static async postComment(req, res) {
        try {
            const body = req.body
            const comment = {
                comment: body.comment,
                name: body.name,
                email: body.email,
                article: body._id,
                date: new Date()
            }
            const insertComment = new ArticleCommentModel(comment)
            await insertComment.save()
            res.status(200).json({ status: 200, ok: true, message: 'Comment has send' })
        } catch (error) {
            res.status(500).json({ status: 500, message: 'Ooops! something error' })
        }
    }

    static async deleteArticle(req, res) {
        try {
            await ArticleModel.deleteOne({ _id: ObjectId(req.params.id) })
            res.status(200).json({ status: 200, ok: true, message: 'Success delete news' })
        } catch (error) {
            console.log(error.message);
            res.status(500).json({ status: 500, message: 'Ooops! something error' })
        }
    }
}

module.exports = ArticlesController
