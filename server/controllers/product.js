const Product = require('../models/product')
const CartItem = require('../models/cartItem')
class ProductController{

    static getAll(req,res,next){
        Product
        .find({})
        .then(products =>{
            res.status(200).json(products)
        })
        .catch(next)
    }

    static getOne(req,res,next){
        Product
        .findById(req.params.productId)
        .then(product =>{
            res.status(200).json(product)
        })
        .catch(next)
    }

    static create(req,res,next){
        let newProduct = new Product({
            name        : req.body.name,
            description : req.body.description,
            price       : req.body.price,
            stock       : req.body.stock,
            image       : req.file.cloudStoragePublicUrl,
            userId      : req.loggedUser.id,
            category    : req.body.category,
            created_at  : new Date(),
            updated_at  : new Date()
        })
        newProduct.save()
        .then(product =>{
            res.status(201).json(product)
        })
        .catch(next)
    }

    static update(req,res,next){
        console.log('iki reqbodyy',req.body);
        
        console.log('masuk update di controller');
        
        let setVal = {}
        if(req.file){
            req.body.name && (setVal.name = req.body.name) 
            req.body.description && (setVal.description = req.body.description)
            req.body.price && (setVal.price = req.body.price)
            req.body.stock && (setVal.stock = req.body.stock)
            req.file.cloudStoragePublicUrl && (setVal.image = req.file.cloudStoragePublicUrl)
            setVal.updated_at = new Date()
        }else{
            req.body.name && (setVal.name = req.body.name) 
            req.body.description && (setVal.description = req.body.description)
            req.body.price && (setVal.price = req.body.price)
            req.body.stock && (setVal.stock = req.body.stock)
            setVal.updated_at = new Date()
        }

        Product
        .findByIdAndUpdate(req.params.productId, setVal, {new : true})
        .then(updated =>{
            res.status(200).json(updated)
        })
        .catch(next)
    }

    static updateQuantity(req,res,next){
        console.log('masuk updatequantity', req.body);
        
        Product
        .findById(req.params.productId)
        .then(product =>{
            console.log('product', product);
            
            let setVal = {}
            req.body.quantity && (setVal.stock = (product.stock - req.body.quantity))
            console.log('ini setval update quantity', setVal);
            
            return Product.findByIdAndUpdate(req.params.productId, setVal, {new : true})
        })
        .then(updated =>{
            res.status(200).json(updated)
        })
        .catch(next)
    }

    static delete(req,res,next){
        let prod;
        Product
        .findByIdAndDelete(req.params.productId)
        .then(product =>{
            prod = product            
            return CartItem.findOneAndDelete({productId : product._id})
        })
        .then(data =>{
            if(data){
            res.status(200).json({
                product : prod,
                CartItem : data
            })
            }else{
                res.status(200).json(prod)
            }
        })
        .catch(next)
    }
}

module.exports = ProductController