const Database = require('./Database')
const v1Routes = require('./Routes/Route')

require('dotenv').config()
let cors = require('cors')


class Server{
    express = require('express')
    mongoose = require('mongoose')
    server = this.express()
    
    constructor(){
        process.on('uncaughtException', this.uncaughtException)
        this.server.use(cors({origin: "*"}))
        this.server.use(this.express.urlencoded({extended: true}))
        this.server.use(this.express.json())

        // start the server
        this.start_server()

        // connect to database
        new Database()

        
        this.server.use('/api/v1', v1Routes)

    }

    start_server=()=>{
        this.server.listen(5000, (err, succ)=>{
            if(err){
                console.log("Server could not start...", err)
                return
            }
            console.log("Server running...")
        })
    }

    uncaughtException=(err)=>{
        console.error("Server Encountered uncaught exception...", err)
        process.exit(0)
    }

}

module.exports = Server