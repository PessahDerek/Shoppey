const jwt = require('jsonwebtoken')

let secret = "goShop20232022IDEA!"

exports.generateToken = async(user) => {
    try {
        let token = jwt.sign(user, secret)
        return token
    } catch (error) {
        process.send("Sorry We can't handle this request at the moment")
    }
    
}

exports.decodeToken = (req, res, next) => {
    if(req.url.includes(('login'||'signup'))) return next()
    try {
        let decoded = jwt.verify(req.headers.token, secret)
        req.user = decoded
        next()
    } catch (error) {
        res.status(400).json({
            message: "Signup/Sign in to complete this operation"
        })
    }
    
}  
