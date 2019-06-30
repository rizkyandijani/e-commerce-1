const Cart = require('../models/cart')
const User = require('../models/user')
const { nodeMailer } = require('../helpers/nodeMailer')
class CartController{

    static getAll(req,res,next){
        console.log('masuk get all controller');
        
        Cart
        .find({})
        .then(data =>{
            console.log(data);
            res.status(200).json(data)
        })
        .catch(next)
    }

    static getOne(req,res,next){
        console.log('masuk get one');
        
        Cart
        .findById(req.params.cartId)
        .populate({
            path : 'cartItemList',
            populate : {
                path : 'productId'
            }
        })
        .then(cart =>{
            res.status(200).json(cart)
        })
        .catch(next)
    }

    static getCart(req,res,next){
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
                    totalPrice : 0,
                    receiver : 'none',
                    address : 'none',
                    phoneNumber : 'none',
                    cartItemList : [],
                    created_at : new Date()
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
        console.log('masuk get user by user id', req.params.userId);
        
        Cart
        .find({userId : req.params.userId})
        .populate({
            path : 'cartItemList',
            populate : {
                path : 'productId'
            }
        })
        .then(cart =>{
            let arr = []
            cart.forEach(el =>{
                if(el.status !== 'open'){
                    arr.push(el)
                }
            })
            console.log('then',arr);
            
            res.status(200).json(arr)
        })
        .catch(next)
    }

    static updateStatusCheckout(req,res,next){
        console.log('jalan update ckeckout di controlller',req.body);
        
        let setVal = {}
        setVal.status = 'processed'
        req.body.totalPrice && (setVal.totalPrice = req.body.totalPrice)
        req.body.cartItemList && (setVal.cartItemList = req.body.cartItemList)
        req.body.receiver && (setVal.receiver = req.body.receiver)
        req.body.address && (setVal.address = req.body.address)
        req.body.phoneNumber && (setVal.phoneNumber = req.body.phoneNumber)
        setVal.created_at = `${new Date().getMonth()}-${new Date().getDate()}-${new Date().getFullYear()}`
        console.log('ini setVal', setVal);
        let updatedCart;
        Cart
        .findByIdAndUpdate(req.params.cartId, setVal,{new : true})
        .then(updated =>{
            updatedCart = updated

            return User.findById(updated.userId)

        })
        .then(user =>{
            if(user){
                nodeMailer(user.email,'alert',updatedCart._id)
            }
            res.status(200).json(updatedCart)

        })
        .catch(next)
    }

    static updateStatusClose(req,res,next){
        console.log('masuk status close update');
        
        let setVal = {}
        setVal.status = 'closed'

        Cart
        .findByIdAndUpdate(req.params.cartId, setVal, {new : true})
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