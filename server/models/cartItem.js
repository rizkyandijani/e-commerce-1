const mongoose = require("mongoose")
const Schema = mongoose.Schema
const Product = require('../models/product')

let cartItemSchema = new Schema({
    productId : {
        type : Schema.Types.ObjectId, ref: 'product',
        required : [true, `form can't be empty`]
    },
    totalPrice : {
        type : Number,
        min : 1,
        max : 999999999,
        required : [true , `form can't be empty`]
    },
    quantity: {
        type : Number,
        min : 1,
        max : 99
    },
    status: {
        type : String,
        required : [true , `form can't be empty`]
    },
    cartId : {
        type : String,
        required : [true , `form can't be empty`]
    }
})

cartItemSchema.pre('findOneAndUpdate', function(next){
    console.log('cek this', this._update.quantity);
    
    Product
    .findById(this._update.productId)
    .then(product =>{
        console.log('ini product di model', product);
        
       this._update.totalPrice = product.price * (this._update.quantity)
       console.log(this);
       
       next()
    })
})

cartItemSchema.pre('save', function(next){
    Product
    .findById(this.productId)
    .then(product =>{
       this.totalPrice = product.price * this.quantity
       console.log(this);
       
       next()
    })
})


let CartItem = mongoose.model('cartItem',cartItemSchema)

module.exports = CartItem
