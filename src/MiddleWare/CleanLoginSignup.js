

exports.cleanLoginSignup = (req, res, next) => {
    let allKeys = ['userName', 'password', 'confirmPassword', 'phone']
    console.log(req.url)
    for(let key of Object.keys(req.body)){
        if(!allKeys.includes(key)) return res.status(400).json({
            message: "We mzee😂😂"
        })
    }
    // ensure all re6quired fields are present
    let signup = req.url.includes('signup')
    if(!signup){
        delete req.body.confirmPassword
        delete req.body.phone
    }
    if(Object.keys(req.body).length !== (signup ? 4 : 2)) return res.status(400).json({
        message: "All fields are required!"
    })

    // trim 
    for(let field of Object.keys(req.body)){
        req.body[field] = req.body[field].trim()
    }
    // check passwords match
    if(signup){
        if(req.body.password !== req.body.confirmPassword) return res.status(400).json({
            message: "Passwords do not match"
        })
    }
    // check min length is 4
    if(req.body.password.length < 4) return res.status(400).json({
        message: "Password length is too short"
    });

    next()
}