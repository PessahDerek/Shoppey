const mongoose = require('mongoose')
const { hashPassword } = require('../Utils/Hash')

const users = mongoose.Schema({
    userName: {type: String, required: true},
    phone: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    confirmPassword: {type: String, required: true}
})


users.pre('save', async function (next){
    this.password = await hashPassword(this.password, this.confirmPassword)
    next()
})

module.exports = mongoose.model('Users', users)
