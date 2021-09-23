const WofModel = require("../models/wof")
const { ObjectId } = require('mongodb')

class wofController {

    static async getWof(req, res) {
        try {
            let { academic, skip } = req.query

            if (academic === 'true') academic = true
            else academic = false

            const wof = await WofModel.find({ academic: academic })
                .sort({ date: -1 })
                .skip(+skip)
                .limit(6)

            res.status(200).json({ status: 200, ok: true, data: wof })
        } catch (error) {
            res.status(500).json({ status: 500, message: 'Oops!! something error' })
        }
    }

    static async getFilterWof(req, res) {
        try {
            let sort
            if (req.query.category === 'oldest') sort = -1
            else sort = 1

            const data = await WofModel.find({
                month: req.query.month,
                academic: req.query.academic,
                $text: { $search: req.query.title }
            })
                .sort({ date: sort })
                .skip(+req.query.skip)
                .limit(6)
            res.status(200).json({ status: 200, ok: true, data: data })
        } catch (error) {
            res.status(500).json({ status: 200, message: 'Oops!! something error' })
        }
    }

    static async getDetailWof(req, res) {
        try {
            const wof = await WofModel.findOne({ _id: ObjectId(req.params.id) })
            res.status(200).json({ status: 200, ok: true, data: wof })
        } catch (error) {
            res.status(500).json({ status: 500, message: 'Oops!! something error' })
        }
    }

    static async postWof(req, res) {
        try {
            const body = JSON.parse(req.body.data)
            const data = {
                title: body.title,
                desc: body.desc,
                name: body.name,
                month: body.month,
                academic: body.academic,
                date: new Date(),
                files: req.files
            }
            const insertwof = new WofModel(data)
            await insertwof.save()
            res.status(200).json({ status: 200, ok: true, message: 'Success add' })
        } catch (error) {
            res.status(500).json({ status: 500, message: 'Oops!! something error' })
        }
    }

    static async deleteWof(req, res) {
        try {
            await WofModel.deleteOne({ _id: ObjectId(req.params.id) })
            res.status(200).json({ status: 200, ok: true, message: 'Success delete' })
        } catch (error) {
            console.log(error.message);
            res.status(500).json({ status: 500, message: 'Ooops! something error' })
        }
    }

}

module.exports = wofController
