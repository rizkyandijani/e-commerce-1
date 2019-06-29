const mongoose = require("mongoose")
const Schema = mongoose.Schema

let productSchema = new Schema({
    name        : {
        type : String,
        required : [true , `name must be inserted`]
    },
    description : {
        type : String,
        required : [true , `description is required`]
    },
    price       : {
        type : Number,
        required : [true , `price is required`]
    },
    stock       : {
        type : Number,
        required : [true , `stock is required`]
    },
    userId      : {
        type : Schema.Types.ObjectId , ref : 'user',
        required : [true, 'user id is required']
    },
    category : {
        type : String,
        required : [true, 'category is required']
    },
    image       : String,
    created_at  : Date,
    updated_at  : Date,
})

let Product = mongoose.model('product',productSchema)

module.exports = Product