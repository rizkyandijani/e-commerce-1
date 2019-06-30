const { verify } = require('../helpers/jwt')
const User = require('../models/user')
const Product = require('../models/product')
const Cart = require('../models/cart')
module.exports = {
    authenticate: function(req,res,next){
        console.log('ini di auth',req.headers);
        if(req.headers.hasOwnProperty('token')){
            console.log('masuk auth', req.headers);
            
            let decoded = verify(req.headers.token,`${process.env.SECRET_KEY}`)
            console.log('ini decoded ==', decoded);
            
            User.findOne(
                {email : decoded.email}
            )
            .then(user =>{
                if(user){
                    console.log('ini user di auth', user);
                    
                    req.loggedUser = decoded
                    next()
                }else {
                    next({msg : `token is not recognized`, code : 401})
                }
            })
            .catch(next)
        }
        else{
            next({msg : `you need to login first`, code: 401})
        }
    }, 
    authorize : function(req,res,next){
        let option = {
           _id : req.params.productId,
           userId : req.loggedUser.id
        }

        Product
        .findOne(option)
        .then(product =>{
            if(product){
                next()
            }else{
                throw ({code : 401, message : `you're not authorized for this action`})
            }
        })
        .catch(next)
    },

    authorizeCart : function(req,res,next){
        let option = {
            _id : req.params.cartId,
            userId : req.loggedUser.id
        }

        Cart
        .findOne(option)
        .then(product =>{
            if(product){
                next()
            }else{
                throw ({code : 401, message : `you're not authorized for this action`})
            }
        })
    },

    authorizeAdmin : function(req,res,next){
        if(req.loggedUser.email === 'master@holygrail.com'){
            next()
        }else{
            throw ({code : 401, message : "you're not authorized for this action"})
        }
    }
}