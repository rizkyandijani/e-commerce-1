const CartItem = require('../models/cartItem')
const Product = require('../models/product')

class CartItemController{

    static getAll(req,res,next){
        CartItem
        .find({})
        .then(data =>{
            res.status(200).json(data)
        })
        .catch(next)
    }

    static getOne(req,res,next){
        CartItem
        .findById(req.params.cartItemId)
        .then(item =>{
            if(item){
                res.status(200).json(item)
            }else{
                throw ({code : 404, message : 'cart Item not found'})
            }
        })
        .catch(next)
    }

    static getCartProducts(req,res,next){
        console.log('masuk get cart product');
        
        CartItem
        .find({cartId : req.params.cartId})
        .populate('productId')
        .then(data =>{
            res.status(200).json(data)
        })
        .catch(next)
    }

    static create(req,res,next){
        console.log('loh kok masuk create');
        
        let stock = 0
        Product
        .findById(req.params.productId)
        .then(el =>{
            stock = el.stock
            return CartItem.findOne({productId : req.params.productId, cartId : req.params.cartId, status : 'open'})
        })
        .then(item =>{
            if(item){
                if(item.quantity < stock){
                    let setVal = {}
                    setVal.quantity = item.quantity + 1
                    setVal.productId = req.params.productId
                    return CartItem.findByIdAndUpdate(item._id, setVal, {new : true})
                }else{
                    throw ({code : 400, message : `you can't add more than product stocks`})
                }
            }else{
                let newCartItem = new CartItem({
                    productId : req.params.productId,
                    quantity : 1,
                    status : 'open',
                    cartId : req.params.cartId,
                    totalPrice : 1
                    })
                return newCartItem.save()
            }
        })
        .then(item =>{
            res.status(200).json(item)
        })
        .catch(next)        
    }

    static updateStatus(req,res,next){
        console.log('masuk update status cartItem');
        
        let setVal = {}
        setVal.status = 'close'

        CartItem
        .findByIdAndUpdate(req.params.cartItemId, setVal, {new : true})
        .then(updated =>{
            console.log('ini updated', updated);
            
            res.status(200).json(updated)
        })
        .catch(next)
    }

    static increaseQuantity(req,res,next){
        console.log('masuk increase nih');
        
        CartItem
        .findById(req.params.cartItemId)
        .populate('productId')
        .then(data =>{
            console.log('data di increase', data);
            
            if(data.productId.stock === data.quantity){
                throw({code : 400, message : 'cannot add more quantity of the order'})
            }else if(data.quantity < data.productId.stock){
                let setVal = {}
                setVal.quantity = data.quantity + 1
                setVal.productId = data.productId._id
                return CartItem.findByIdAndUpdate(req.params.cartItemId, setVal, {new : true})
            }
        })
        .then(updated =>{
            res.status(200).json(updated)
        })
        .catch(next)
    }

    static decreaseQuantity(req,res,next){
        CartItem
        .findById(req.params.cartItemId)
        .populate('productId')
        .then(data =>{
            console.log('data di decrease', data);
            if((data.quantity - 1) === 0){
                return CartItem.findByIdAndDelete(req.params.cartItemId)
            }else if((data.quantity - 1 ) > 0){
                let setVal = {}
                setVal.quantity = data.quantity - 1
                setVal.productId = data.productId._id
                return CartItem.findByIdAndUpdate(req.params.cartItemId, setVal, {new : true})
            }
        })
        .then(updated =>{
            res.status(200).json(updated)
        })
        .catch(next)
    }

    static delete(req,res,next){
        CartItem
        .findByIdAndDelete(req.params.cartItemId)
        .then(data =>{
            res.status(200).json(data)
        })
        .catch(next)
    }

}

module.exports = CartItemController