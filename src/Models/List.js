const mongoose = require('mongoose')

const shoppingList = mongoose.Schema({
    title: {type: String, required: true},
    shoppey: {type: String, required: true},
    budget: {type: Number},
    items: {type: [], default: []},
    notes: {type: String, required: false},
    shopped: {type: Boolean, default: false},
    cost: {type: Number,},
    shareWith: {type: []},
})

shoppingList.pre("save", function(next){
    console.log('shoppingList.save')
    if(!this.title) this.title = "List "+ new Date().getDate() + "/" + new Date().getMonth() + "/" + new Date().getFullYear();
    next()
})


module.exports = mongoose.model('shoppingList', shoppingList)

