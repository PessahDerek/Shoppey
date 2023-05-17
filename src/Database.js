require('dotenv').config()

class Database {
    url = process.env.DB
    mongoose = require('mongoose')

    constructor(){
        this.connect()
        // handle errors
        this.mongoose.connection
            .on('error', (err)=>this.reconnect)
            .on('disconnected', ()=>this.reconnect)

    }
    connect(){
        this.mongoose.connect(process.env.DB, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        .then(()=>{
            console.log("Database connected")
        })
        .catch(err => {
            return console.log("Could not connect to db because of", err)
        })
    }

    reconnect() {
        console.log("retrying connection to database...")
        setTimeout(() => {
            this.connect()
        }, 5000);
    }
}

module.exports = Database
