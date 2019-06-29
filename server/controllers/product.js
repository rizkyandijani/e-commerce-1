const Product = require('../models/product')

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
        let setVal = {}
        req.body.name && (setVal.name = req.body.name) 
        req.body.description && (setVal.description = req.body.description)
        req.body.price && (setVal.price = req.body.price)
        req.body.stock && (setVal.stock = req.body.stock)
        req.body.image && (setVal.image = req.body.image)
        setVal.updated_at = new Date()

        Product
        .findByIdAndUpdate(req.params.productId, setVal, {new : true})
        .then(updated =>{
            res.status(200).json(updated)
        })
        .catch(next)
    }

    static delete(req,res,next){
        Product
        .findByIdAndDelete(req.params.productId)
        .then(product =>{
            res.status(200).json(product)
        })
        .catch(next)
    }
}

module.exports = ProductController