const bcrypt = require('bcrypt')

module.exports = {
    hash: (password) => {
        const salt = bcrypt.genSaltSync(10)
        const hashPassword = bcrypt.hashSync(password, salt)
        return hashPassword
    },
    comparePassword: (password, hashPassword) => {
        return bcrypt.compareSync(password, hashPassword)
    }
}
