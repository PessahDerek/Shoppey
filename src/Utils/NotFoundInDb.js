

class NotFoundInDb{
    
    constructor(res, item, message=""){
        res.status(404).json({
            message: item + " not found. " + message
        })
    }
}

module.exports = NotFoundInDb