
const List = require('../Models/List')
const Users = require('../Models/Users')
const { matchPasswd } = require('../Utils/Hash')
const NotFoundInDb = require('../Utils/NotFoundInDb')
const { generateToken } = require('../Utils/Tokens')


exports.signup = async(req, res, next) => {
    let user_ = new Users(req.body)
    try {
        let saveUser = await user_.save()
        let user = user_.toObject()
        delete user.password
        delete user.confirmPassword
        delete user.phone
        res.status(200).json({
            message: "Your account has been created successfully",
            userToken: await generateToken(user)
        })
    } catch (error) {
        if(error.code === 11000)return res.status(409).json({
            message: "Account already exists, try a different username and phone or login!"
        })
        res.status(500).json({
            message: "Sorry We couldn't sign you up, try again"
        })
    }
}

exports.login = async(req, res, next) => {
    let { userName, password} = req.body
    let found = await Users.findOne({$or: [{userName: userName}, {phone: userName}]}).select('userName _id password')
    
    if(found === null) return res.status(404).json({
        message: "Sorry We couldn't find your account, try signing up or check your password"
    })
    if(! await matchPasswd(password, found.password)) {
        return res.status(401).json({
            message: "Your password or username is incorrect"
        })
    }
    let user = found.toObject()
    delete user.password

    res.status(200).json({
        message: "Welcom back!",
        token: await generateToken(user)
    })
}

// create a new list
exports.newList = async(req, res, next) => {
    // set owner
    req.body.shoppey = req.user._id
    try {
        let newList = new List(req.body)
        newList.save()
        res.status(200).json({
            message: "Your shopping list has been saved🥳"
        })
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong!"
        })
    }
}

exports.updateList = async(req, res, next) => {
    let { list_id, editedList } = req.body
    await List.findByIdAndUpdate(list_id, editedList)
    .then(doc => {
        if(!doc){
            return new NotFoundInDb(res, 'List')
        }
        res.status(200).json({
            message: "Your shopping list has been updated"
        })
    })
    .catch(err => {
        
    })
}


exports.myLists = async(req, res, next) => {
    console.log(req.user._id)
    let found = await List.find({shoppey: req.user._id})
    res.status(200).json(found)
}

exports.getUser = async(req, res, next) => {
    res.status(200).json({
        user: req.user
    })
}

exports.deleteList = async(req, res, next) => {
    await List.deleteOne({shoppey: req.user._id}, {_id: req.params.list_id})
    .then(doc => {
        console.log(doc)
        res.status(200).json({
            message: "List deleted successfully"
        })
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            message: "We could not delete the list"
        })
    })
}

