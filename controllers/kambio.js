const KambioModel = require("../models/kambio")
const { ObjectId } = require('mongodb')

class KambioController {

    static async getKambio(req, res) {
        try {
            const kambio = await KambioModel.find({ type: req.query.type }).sort({ date: -1 }).skip(req.query.skip).limit(10)
            res.status(200).json({ status: 200, ok: true, data: kambio })
        } catch (error) {
            res.status(500).json({ status: 500, message: 'Oops!! something error' })
        }
    }

    static async getDetailKambio(req, res) {
        try {
            const kambio = await KambioModel.findOne({ _id: ObjectId(req.params.id) })
            res.status(200).json({ status: 200, ok: true, data: kambio })
        } catch (error) {
            res.status(500).json({ status: 500, message: 'Oops!! something error' })
        }
    }

    static async postKambio(req, res) {
        try {
            const body = JSON.parse(req.body.data)
            const data = {
                title: body.title,
                desc: body.desc,
                location: body.location,
                taksonomi: body.taksonomi,
                type: body.type,
                date: new Date(),
                files: req.files
            }
            const insertKambio = new KambioModel(data)
            await insertKambio.save()
            res.status(200).json({ status: 200, ok: true, message: 'Success add' })
        } catch (error) {
            res.status(500).json({ status: 500, message: 'Oops!! something error' })
        }
    }

    static async deleteKambio(req, res) {
        try {
            await KambioModel.deleteOne({ _id: ObjectId(req.params.id) })
            res.status(200).json({ status: 200, ok: true, message: 'Success delete' })
        } catch (error) {
            console.log(error.message);
            res.status(500).json({ status: 500, message: 'Ooops! something error' })
        }
    }

}

module.exports = KambioController
