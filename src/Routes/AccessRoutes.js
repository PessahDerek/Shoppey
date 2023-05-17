const express = require('express')
const {cleanLoginSignup} = require('../MiddleWare/CleanLoginSignup')
const { signup, login } = require('../Handlers/v1handlers')


const accessRoutes = express.Router()
accessRoutes
    .use(cleanLoginSignup)
    .post('/signup', signup)
    .post('/login', login)


module.exports = accessRoutes