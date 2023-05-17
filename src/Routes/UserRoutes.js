const express = require('express');
const { decodeToken } = require('../Utils/Tokens');
const { newList, myLists, deleteList, getUser } = require('../Handlers/v1handlers');

// useroutes
const userRoutes = express.Router();
userRoutes
    .use(decodeToken)
    .post('/create-list', newList)
    
    .get('/my-lists', myLists)
    .get('/user', getUser)
    
    .delete('/delete-list:list_id', deleteList)


module.exports = userRoutes