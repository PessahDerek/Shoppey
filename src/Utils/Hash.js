const bcrypt = require('bcrypt')

exports.hashPassword = async(plainTxt, confirm_) => {
    let saltRounds = 12;

    const salt = await bcrypt.genSalt(saltRounds)
    let confHash = bcrypt.hashSync(confirm_, salt)
    let hash = bcrypt.hashSync(plainTxt, salt)
    if(confHash !== hash) this.hashPassword(plainTxt, confirm)
    return hash
}


exports.matchPasswd = async(plain, hashed) => {
    let match = await bcrypt.compareSync(plain, hashed)
    return match
}