const chai      = require('chai')
const chaiHttp  = require('chai-http')
const app       = require('../app')
const clearUser = require('../helpers/clearUser')
chai.use(chaiHttp)

const expect    = chai.expect

let user = ''
let product = ''
let token1 = ''
let cartItem = ''


describe.only(`Cart Item test`, function(){
    describe(`POST /cardItems`, function(){
        it(`should send an object of inserted user with 201 status code`,function(done){
            const newUser = {
                firstName : 'rizky',
                lastName: 'andijani',
                email: 'rizky@mail.com',
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
                email: 'rizky@mail.com',
                password: '12345'
            }
            chai
            .request(app)
            .post('/login')
            .send(newUser)
            .end(function(err,res){
                user = res.body
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

        it('should return an object with 201 status code', function(done){
            let newProduct = {
                name : 'balenciaga',
                description : 'sepatu sneakers BNIB size 43, nego halus, WA 09000080',
                price: 8000000,
                stock: '1',
                image : 'wwasasdasd',
            }
            chai
            .request(app)
            .post(`/products`)
            .send(newProduct)
            .set('token', token1)
            .end(function(err,res){
                product = res.body
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
        
        it(`should send an object with 201 status code`, function(done){
            const newCartItem = {
                productId : product._id,
                quantity : 1
            }

            chai
            .request(app)
            .post('/cardItems')
            .send(newCartItem)
            .set('token', token1)
            .end(function(err,res){
                cartItem = res.body
                expect(err).to.be.null
                expect(res).to.have.status(201)
                expect(res.body).to.be.an('object')
                expect(res.body).to.have.property('_id')
                expect(res.body).to.have.property('userId')
                expect(res.body).to.have.property('productId')
                expect(res.body).to.have.property('status')
                expect(res.body.userId).to.equal(newCartItem.userId)
                expect(res.body.status).to.equal('open')
                expect(res.body.productId).to.equal(newCartItem.productId)
                done()
            })
        })
    })

    describe('GET /cardItems',function(){
        it(`should send an array with 200 status code`, function(done){
            chai
            .request(app)
            .get('/cardItems')
            .set('token', token1)
            .end(function(err,res){
                expect(err).to.be.null
                expect(res).to.have.status(200)
                expect(res.body).to.be.an('array')
                done()
            })
        })
    })

    describe('GET /cardItems/:cartItemId',function(){
        it(`should send an object with 200 status code`, function(done){
            chai
            .request(app)
            .get(`/cardItems/${cartItem._id}`)
            .set('token', token1)
            .end(function(err,res){
                expect(err).to.be.null
                expect(res).to.have.status(200)
                expect(res.body).to.be.an('object')
                expect(res.body).to.have.property('_id')
                expect(res.body).to.have.property('productId')
                expect(res.body).to.have.property('quantity')
                expect(res.body).to.have.property('totalPrice')
                expect(res.body._id).to.equal(cartItem._id)                
                expect(res.body.quantity).to.equal(cartItem.quantity)
                done()
            })
        })
    })

    describe('PATCH /cardItems/:cardItemId', function(){
        it(`should send an object with 200 status code`, function(done){
            let newCartItem = {
                quantity : 3
            }
            
            chai
            .request(app)
            .patch(`/cartItems/${cartItem._id}`)
            .send(newCartItem)
            .set('token',token1)
            .end(function(err,res){
                expect(err).to.be.null
                expect(res).to.have.status(200)
                expect(res.body).to.be.an('object')
                expect(res.body).to.have.property('_id')
                expect(res.body).to.have.property('productId')
                expect(res.body).to.have.property('quantity')
                expect(res.body).to.have.property('totalPrice')
                expect(res.body.quantity).to.equal(cartItem.quantity)
                done()
            })
        })
    })

    describe('DELETE /cardItems/:cardItemId', function(){
        it(`should send an object with 200 status code`, function(done){
            chai
            .request(app)
            .delete(`/cartItems/${cartItem._id}`)
            .set('token',token1)
            .end(function(err,res){
                expect(err).to.be.null
                expect(res).to.have.status(200)
                expect(res.body).to.be.an('object')
                expect(res.body).to.have.property('_id')
                expect(res.body).to.have.property('productId')
                expect(res.body).to.have.property('quantity')
                expect(res.body).to.have.property('totalPrice')
                done()
            })
        })
    })

})