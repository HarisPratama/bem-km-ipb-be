const { comparePassword, hash } = require("../helpers/bcrypt")
const { generateToken } = require("../helpers/jwt")
const UsersModel = require("../models/users")


class UserController {
    static async login(req, res) {
        try {
            const findUser = await UsersModel.findOne({ email: req.body.email })
            if (findUser && comparePassword(req.body.password, findUser.password)) {
                const payload = {
                    _id: findUser._id,
                    name: findUser.name,
                    email: findUser.email,
                    role: findUser.role
                }

                res.status(200).json({ status: 200, message: 'success', token: generateToken(payload), role: findUser.role })
            } else {
                res.status(200).json({ status: 200, message: 'Not found' })
            }
        } catch (error) {
            res.status(500).json({ status: 500, message: 'Oops!! something error' })
        }
    }

    static async register(req, res) {
        try {
            const findUser = await UsersModel.findOne({ email: req.body.email })
            if (findUser) {
                res.status(200).json({ status: 200, message: 'User already registered' })
            } else {
                const newUser = {
                    name: req.body.name,
                    email: req.body.email,
                    password: hash(req.body.password),
                    role: req.body.role,
                    registerAt: new Date()
                }

                const insertUser = new UsersModel(newUser)
                await insertUser.save()
                res.status(200).json({ status: 200, message: 'Success register' })
            }
        } catch (error) {
            res.status(500).json({ status: 500, message: 'Oops!! something error' })
        }
    }


}

module.exports = UserController

