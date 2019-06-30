const chai      = require('chai')
const chaiHttp  = require('chai-http')
const app       = require('../app')
const clearUser = require('../helpers/clearUser')
chai.use(chaiHttp)

// before(function(done){
//     clearUser(done)
// })

// after(function(done){
//     clearUser(done)
// })

const expect    = chai.expect

let token1 = '';
let token2 = '';

let product1 = '';
let product2 = '';


describe(`Product test`, function(){ 
//================REGISTER USER, LOGIN USER,POST PRODUCT CORRECT ====================

    describe('POST /products 1', function(){
        
        it(`should send an object of inserted user with 201 status code`,function(done){
            const newUser = {
                firstName : 'admin',
                lastName: 'admin',
                email: 'master@holygrail.com',
                password: 'admin'
            }
            chai
            .request(app)
            .post('/register')
            .send(newUser)
            .end(function(err,res){
                expect(err).to.be.null;
                expect(res).to.have.status(201);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('_id');
                expect(res.body).to.have.property('firstName');
                expect(res.body).to.have.property('lastName');
                expect(res.body).to.have.property('email');
                expect(res.body).to.have.property('password');
                expect(res.body.firstName).to.equal(newUser.firstName);
                expect(res.body.lastName).to.equal(newUser.lastName);
                expect(res.body.email).to.equal(newUser.email);
                done()
            })
        })
    
        it(`should send an object of inserted user with 200 status code`,function(done){
            const newUser = {
                email: 'master@holygrail.com',
                password: 'admin'
            }
            chai
            .request(app)
            .post('/login')
            .send(newUser)
            .end(function(err,res){
                token1 = res.body.token
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('_id');
                expect(res.body).to.have.property('firstName');
                expect(res.body).to.have.property('lastName');
                expect(res.body).to.have.property('email');
                expect(res.body).to.have.property('token');
                expect(res.body.email).to.equal(newUser.email);
                expect(res.body.message).to.equal(
                    `logged in`
                )
                done()
            })
        })
            
    //     it('should return an object with 201 status code', function(done){
    //         let newProduct = {
    //             name : 'balenciaga',
    //             description : 'sepatu sneakers BNIB size 43, nego halus, WA 09000080',
    //             price: 8000000,
    //             stock: '1',
    //             image : 'wwasasdasd',
    //         }
    //         chai
    //         .request(app)
    //         .post(`/products`)
    //         .send(newProduct)
    //         .set('token', token1)
    //         .end(function(err,res){
    //             product1 = res.body
    //             expect(err).to.be.null
    //             expect(res).to.have.status(201)
    //             expect(res.body).to.be.an('object')
    //             expect(res.body).to.have.property('_id')                
    //             expect(res.body).to.have.property('name')
    //             expect(res.body).to.have.property('description')
    //             expect(res.body).to.have.property('price')
    //             expect(res.body).to.have.property('stock')
    //             expect(res.body).to.have.property('image')
    //             expect(res.body).to.have.property('userId')
    //             expect(res.body).to.have.property('created_at')
    //             expect(res.body).to.have.property('updated_at')
    //             expect(res.body.name).to.equal(newProduct.name)
    //             expect(res.body.description).to.equal(newProduct.description)
    //             expect(res.body.price).to.equal(newProduct.price)
    //             expect(res.body.stock).to.equal(newProduct.stock)
    //             expect(res.body.image).to.equal(newProduct.image)
    //             done()
    //         })
    //     })
    // })
//================GET ALL PRODUCT CORRECT ====================
    describe('GET /products', function(){
        it('should return an array with 200 status code ', function(done){
            chai
            .request(app)
            .get('/products')
            .end(function(err,res){
                expect(err).to.be.null
                expect(res).to.have.status(200)
                expect(res.body).to.be.an('array')
                done()
            })
        })
    })
//================GET ONE PRODUCT CORRECT ====================

    // describe('GET /products/:productId', function(){
    //     it('should return an object with 200 status code', function(done){
    //         chai
    //         .request(app)
    //         .get(`/products/${product1._id}`)
    //         .end(function(err,res){
    //             expect(err).to.be.null
    //             expect(res).to.have.status(200)
    //             expect(res.body).to.be.an('object')
    //             expect(res.body).to.have.property('_id')                
    //             expect(res.body).to.have.property('name')
    //             expect(res.body).to.have.property('description')
    //             expect(res.body).to.have.property('price')
    //             expect(res.body).to.have.property('stock')
    //             expect(res.body).to.have.property('image')
    //             expect(res.body).to.have.property('userId')
    //             expect(res.body).to.have.property('created_at')
    //             expect(res.body).to.have.property('updated_at')
    //             expect(res.body._id).to.equal(`${product1._id}`)
    //             done()
    //         })
    //     })
    // })

//================REGISTER USER2, LOGIN2, POST PRODUCT2 CORRECT ====================


    describe('POST /products 2', function(){
        
        it(`should send an object of inserted user with 201 status code`,function(done){
            const newUser = {
                firstName : 'andi',
                lastName: 'jani',
                email: 'andi@mail.com',
                password: '12345'
            }
            chai
            .request(app)
            .post('/register')
            .send(newUser)
            .end(function(err,res){
                expect(err).to.be.null;
                expect(res).to.have.status(201);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('_id');
                expect(res.body).to.have.property('firstName');
                expect(res.body).to.have.property('lastName');
                expect(res.body).to.have.property('email');
                expect(res.body).to.have.property('password');
                expect(res.body.firstName).to.equal(newUser.firstName);
                expect(res.body.lastName).to.equal(newUser.lastName);
                expect(res.body.email).to.equal(newUser.email);
                done()
            })
        })
    
        it(`should send an object of inserted user with 200 status code`,function(done){
            const newUser = {
                email: 'andi@mail.com',
                password: '12345'
            }
            chai
            .request(app)
            .post('/login')
            .send(newUser)
            .end(function(err,res){
                console.log('login di product',res.body);
                token2 = res.body.token
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('_id');
                expect(res.body).to.have.property('firstName');
                expect(res.body).to.have.property('lastName');
                expect(res.body).to.have.property('email');
                expect(res.body).to.have.property('token');
                expect(res.body.email).to.equal(newUser.email);
                expect(res.body.message).to.equal(
                    `logged in`
                )
                done()
            })
        })
            
        it('should return an object with 201 status code', function(done){
            let newProduct = {
                name : 'air max',
                description : 'sepatu sneakers air max second 80% size 40, nego halus, WA 100000080',
                price: 1005000,
                stock: '1',
                image : 'asccccccc',
            }
            chai
            .request(app)
            .post(`/products`)
            .send(newProduct)
            .set('token', token2)
            .end(function(err,res){
                product2 = res.body
                expect(err).to.be.null
                expect(res).to.have.status(201)
                expect(res.body).to.be.an('object')
                expect(res.body).to.have.property('_id')                
                expect(res.body).to.have.property('name')
                expect(res.body).to.have.property('description')
                expect(res.body).to.have.property('price')
                expect(res.body).to.have.property('stock')
                expect(res.body).to.have.property('image')
                expect(res.body).to.have.property('userId')
                expect(res.body).to.have.property('created_at')
                expect(res.body).to.have.property('updated_at')
                expect(res.body.name).to.equal(newProduct.name)
                expect(res.body.description).to.equal(newProduct.description)
                expect(res.body.price).to.equal(newProduct.price)
                expect(res.body.stock).to.equal(newProduct.stock)
                expect(res.body.image).to.equal(newProduct.image)
                done()
            })
        })
    })

//============PATCH NOT AUTHORIZED =============//


    describe('PATCH /products/:productId', function(){
        it(`should return an object with 401 status code`, function(done){
            let data = {
                name : 'vans oldskool trasher',
                price : 2000000
            }
            
            chai
            .request(app)
            .patch(`/products/${product1._id}`)
            .send(data)
            .set('token', token2)
            .end(function(err,res){
                expect(err).to.be.null
                expect(res).to.have.status(401)
                expect(res).to.be.an('object')
                expect(res.body.message).to.equal(
                    `you're not authorized for this action`
                )
                done()
            })
        })
    })

//============PATCH CORRECT =============//
    describe('PATCH /products/:productId', function(){
        it(`should return an object with 200 status code`, function(done){
            let data = {
                name : 'vans oldskool trasher',
                price : 2000000
            }
            
            chai
            .request(app)
            .patch(`/products/${product1._id}`)
            .send(data)
            .set('token', token1)
            .end(function(err,res){
                expect(err).to.be.null
                expect(res).to.have.status(200)
                expect(res).to.be.an('object')
                expect(res.body).to.have.property('_id')
                expect(res.body).to.have.property('name')
                expect(res.body).to.have.property('description')
                expect(res.body).to.have.property('price')
                expect(res.body).to.have.property('stock')
                expect(res.body).to.have.property('image')
                expect(res.body).to.have.property('userId')
                expect(res.body).to.have.property('created_at')
                expect(res.body).to.have.property('updated_at')
                expect(res.body._id).to.equal(`${product1._id}`)
                expect(res.body.name).to.equal(`${data.name}`)
                expect(res.body.price).to.equal(data.price)
                expect(res.body.updated_at).to.be.a('string')
                expect(res.body.updated_at).to.not.equal(product1.updated_at)

                done()
            })
        })
    })

//============DELETE NOT AUTHORIZED=============//


    describe('DELETE /products/:productId', function(){
        it(`should return an object with 401 status code`, function(done){
            chai
            .request(app)
            .delete(`/products/${product1._id}`)
            .set('token',token2)
            .end(function(err,res){
                expect(err).to.be.null
                expect(res).to.have.status(401)
                expect(res).to.be.an('object')
                expect(res.body.message).to.equal(
                    `you're not authorized for this action`
                )
                done()
            })
        })
    })

//============DELETE CORRECT =============//

    describe('DELETE /products/:productId', function(){
        it(`should return an object with 200 status code`, function(done){
            chai
            .request(app)
            .delete(`/products/${product1._id}`)
            .set('token',token1)
            .end(function(err,res){
                expect(err).to.be.null
                expect(res).to.have.status(200)
                expect(res).to.be.an('object')
                expect(res.body).to.have.property('_id')
                expect(res.body).to.have.property('name')
                expect(res.body).to.have.property('description')
                expect(res.body).to.have.property('price')
                expect(res.body).to.have.property('stock')
                expect(res.body).to.have.property('image')
                expect(res.body).to.have.property('userId')
                expect(res.body).to.have.property('created_at')
                expect(res.body).to.have.property('updated_at')
                done()
            })
        })
    })

})