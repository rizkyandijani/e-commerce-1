const User = require('../models/user')
const { compare } = require('../helpers/bcrypt')
const { sign } = require('../helpers/jwt')

class UserController{
    
    static login(req,res,next){
        console.log('req body di login',req.body);
        
        if(req.body.email == '' && req.body.password == '' ){
            console.log('masuk kosong semua');
            
            throw ({code : 400, message : 'form cannot be empty'})
        }
        else if(req.body.email == ''){
            throw ({code : 400, message : 'email is required'})
        }else if(req.body.password == ''){
            throw ({code : 400, message : 'password is required'})
        }
        User.findOne({email : req.body.email})
        .then(user =>{
            if(user){
                console.log('user di login server',user);
                
                let check = compare(req.body.password, user.password)
                if(check){
                    let payload = {
                        id : user._id,
                        email : user.email
                    }
                    let token = sign(payload, `${process.env.SECRET_KEY}`)
                    res.status(200).send({
                        message : 'logged in',
                        token,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        email: user.email,
                        _id : user._id
                    })
                }else{
                    throw ({code : 404 , message : 'wrong password/username'})
                }
            }else{
                throw ({code : 404 , message : 'wrong password/username'})
            }
        })
        .catch(next)
    }

    static register(req,res,next){
        let user = new User({
            firstName : req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password
        })
        user.save()
        .then(value =>{
            res.status(201).json(value)
        })
        .catch(next)
            
    }

    static getAll(req,res,next){
        User
        .find({})
        .then(data =>{
            res.status(200).json(data)
        })
        .catch(next)
    }
    
    static getOne(req,res,next){
        // console.log('masuk get one',req.params.userId);
        
        User
        .findOne({_id : req.params.userId})
        .then(data =>{
            // console.log('ini data',data);
            if(data){
                res.status(200).json(data)
            }else{
                throw ({code : 404, message : `user not found`})
            }
        })
        .catch(next)
    }

    static update(req,res,next){
        console.log('===============',req.body);
        if(req.body.firstName === '' || req.body.lastName === '' || req.body.email === ''){
            throw ({ code : 400, message : `form can't be empty` })
        }else{
            let setVal = {}
            req.body.firstName && (setVal.firstName = req.body.firstName) 
            req.body.lastName && (setVal.lastName = req.body.lastName)
            req.body.email && (setVal.email = req.body.email)
            
            User
            .findByIdAndUpdate(req.params.userId, setVal, {new : true, runValidators : true})        
            .then(updated =>{
                // console.log(updated);
                res.status(200).json(updated)
            })
            .catch(next)
        }
    }
    static delete(req,res,next){
        User
        .findByIdAndDelete(req.params.userId)
        .then(data =>{
            console.log(data);
            res.status(200).json(data)
        })
        .catch(next)
    }
}

module.exports = UserController

