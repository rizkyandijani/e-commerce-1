if(process.env.NODE_ENV == 'development' || process.env.NODE_ENV == 'test'){
    require('dotenv').config()
}

const express = require("express")
const app = express()
const cors = require('cors')
const port = 3000
const route = require('./routes/index')
const mongoose = require('mongoose')
const errorHandler = require('./middlewares/errorHandler')

let local = 'mongodb://localhost/ecommerce_1' + process.env.NODE_ENV

mongoose.connect(local,{useNewUrlParser : true})


app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(cors())

app.use('/',route)

app.use(errorHandler)

app.listen(port, ()=>{
    console.log(`listening to port: ${port}`);
})

module.exports = app