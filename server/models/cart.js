const mongoose = require("mongoose")
const Schema = mongoose.Schema

let cartSchema = new Schema({
    userId : {
        type : String,
    },
    status : {
        type : String,
        required : [true, `form cant be empty`]
    },
    cartItemList : [{type : Schema.Types.ObjectId, ref : 'cartItem'}]
})

let Cart = mongoose.model('cart',cartSchema)

module.exports = Cart