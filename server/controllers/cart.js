const Cart = require('../models/cart')

class CartController{

    static getAll(req,res,next){
        Cart
        .find({})
        .then(data =>{
            res.send(200).json(data)
        })
        .catch(next)
    }

    static getOne(req,res,next){
        console.log('masuk get one');
        
        Cart
        .findById(req.params.cartId)
        .then(cart =>{
            res.status(200).json(cart)
        })
        .catch(next)
    }

    static getUserCart(req,res,next){
        console.log('masuk get user cart');
        
        Cart
        .find({_id : req.params.cartId})
        .then(data =>{
            res.status(200).json(data)
        })
        .catch(next)
    }

    static create(req,res,next){
        console.log('masuk create');
        
        Cart
        .findOne({userId : req.loggedUser.id, status : 'open'})
        .then(cart =>{
            console.log('ini cart',cart, 'ini user',req.loggedUser.id);
            
            if(cart){
                console.log('ini kok kesini');
                res.status(200).json(cart)
            }else {
                let newCart = new Cart({
                    userId : req.loggedUser.id,
                    status : 'open',
                    cartItemList : []
                })
        
                return newCart.save()
            }
        })
        .then(cart =>{
            res.status(201).json(cart)
        })
        .catch(next)
    }

    static getUserCart(req,res,next){
        Cart
        .findOne({userId : req.params.userId})
        .then(cart =>{
            res.status(200).json(cart)
        })
        .catch(next)
    }

    static updateStatus(req,res,next){
        let setVal = {}
        req.body.status && (setVal.status = req.body.status)
        Cart
        .findByIdAndUpdate(req.params.cartId, setVal,{new : true})
        .then(updated =>{
            res.status(200).json(updated)
        })
        .catch(next)
    }

    static addToCartItemList(req,res,next){
        Cart
        .findByIdAndUpdate(req.params.cartId, {$push : {cartItemList : req.params.cartItemId}}, {new : true})
        .then(updated =>{
            res.status(200).json(updated)
        })
        .catch(next)
    }

    static removeFromCartItemList(req,res,next){
        Cart
        .findByIdAndUpdate(req.params.cartId, {$pull : {cartItemList : req.params.cartItemId}}, {new : true})
        .then(updated =>{
            res.status(200).json(updated)
        })
        .catch(next)
    }

    static delete(req,res,next){
        Cart
        .findByIdAndDelete(req.params.cartId)
        .then(data =>{
            res.status(200).json(data)
        })
        .catch(next)
    }

}

module.exports = CartController