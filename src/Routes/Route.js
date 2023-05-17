const express = require('express')
const { newList, signup, login } = require('../Handlers/v1handlers')
const { decodeToken } = require('../Utils/Tokens')
const accessRoutes = require('./AccessRoutes')
const userRoutes = require('./UserRoutes')

 
let v1Routes = express.Router()
v1Routes
    .use(userRoutes)
    .use(accessRoutes)
module.exports = v1Routes
