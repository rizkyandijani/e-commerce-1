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

let user = ''


describe('User tests', function(){

    describe('POST /register', function(){
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
                user = res.body
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

        it('should send an object error with 400 status code ',function(done){
            const newUser = {
                firstName : 'rizky',
                lastName : 'andi',
                email : 'rizky@mail.com',
                password : '12345',
            }
            chai
            .request(app)
            .post('/register')
            .send(newUser)
            .end(function(err,res){
                expect(err).to.be.null
                expect(res).to.have.status(400)
                expect(res.body.message).to.equal(
                    `user validation failed: email: email already taken`
                )
                // expect(res.body).to.have.property('email')
                done()
            })
        })

        it('should send an object error with 400 status code ',function(done){
            const newUser = {
                firstName : 'rizky',
                lastName : 'andi',
                email : 'andi@mailcom',
                password : '12345',
            }
            chai
            .request(app)
            .post('/register')
            .send(newUser)
            .end(function(err,res){
                expect(err).to.be.null
                expect(res).to.have.status(400)
                expect(res.body.message).to.equal(
                    `user validation failed: email: ${newUser.email} is not a valid email`
                )
                // expect(res.body).to.have.property('email')
                done()
            })
        })

        it('should send an object error with 400 status code ',function(done){
            const newUser = {
                firstName : 'rizky',
                lastName : 'andi',
                email : 'andi@mail.com',
                password : '123',
            }
            chai
            .request(app)
            .post('/register')
            .send(newUser)
            .end(function(err,res){
                expect(err).to.be.null
                expect(res).to.have.status(400)
                expect(res.body.message).to.equal(
                    `user validation failed: password: Password length must be between 8 to 13`
                )
                // expect(res.body).to.have.property('email')
                done()
            })
        })

        it('should send an object error with 400 status code ',function(done){
            const newUser = {
                firstName : '',
                lastName : 'andi',
                email : 'jani@mail.com',
                password : '123456789',
            }
            chai
            .request(app)
            .post('/register')
            .send(newUser)
            .end(function(err,res){
                expect(err).to.be.null
                expect(res).to.have.status(400)
                expect(res.body.message).to.equal(
                    `user validation failed: firstName: first name is required`
                )
                done()
            })
        })

        it('should send an object error with 400 status code ',function(done){
            const newUser = {
                firstName : 'rizky',
                lastName : '',
                email : 'jani@mail.com',
                password : '123456789',
            }
            chai
            .request(app)
            .post('/register')
            .send(newUser)
            .end(function(err,res){
                expect(err).to.be.null
                expect(res).to.have.status(400)
                expect(res.body.message).to.equal(
                    `user validation failed: lastName: last name is required`
                )
                done()
            })
        })
        
        it('should send an object error with 400 status code ',function(done){
            const newUser = {
                firstName : 'rizky',
                lastName : 'andi',
                email : '',
                password : '123456789',
            }
            chai
            .request(app)
            .post('/register')
            .send(newUser)
            .end(function(err,res){
                expect(err).to.be.null
                expect(res).to.have.status(400)
                expect(res.body.message).to.equal(
                    `user validation failed: email: email must be inserted`
                )
                done()
            })
        })

        it('should send an object error with 400 status code ',function(done){
            const newUser = {
                firstName : 'rizky',
                lastName : 'andi',
                email : 'andi@mail.com',
                password : '',
            }
            chai
            .request(app)
            .post('/register')
            .send(newUser)
            .end(function(err,res){
                expect(err).to.be.null
                expect(res).to.have.status(400)
                expect(res.body.message).to.equal(
                    `user validation failed: password: Password is required`
                )
                done()
            })
        })
    })

    describe('GET /users', function(){
        it('should send an array with 200 code', function(done){
            chai
            .request(app)
            .get('/users')
            .end(function(err,res){
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('array');
                done();
            })
        })
    })

    describe('GET /users/:userId ', function(){
        it('should send an object with 200 status code',function(done){
            chai
            .request(app)
            .get(`/users/${user._id}`)
            .end(function(err,res){
                // console.log(res);
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('object')
                expect(res.body).to.have.property('_id');
                expect(res.body).to.have.property('firstName');
                expect(res.body).to.have.property('lastName');
                expect(res.body).to.have.property('email');
                expect(res.body).to.have.property('password')
                expect(res.body._id).to.equal(user._id)
                done()
            })
        })

        it('should send an object with 404 status code',function(done){
            chai
            .request(app)
            .get(`/users/5d10a5d35ae3f76349f19584`)
            .end(function(err,res){
                // console.log(res);
                expect(err).to.be.null;
                expect(res).to.have.status(404);
                expect(res.body).to.be.an('object')
                expect(res.body.message).to.equal(`user not found`)
                done()
            })
        })
    })

    describe('POST /login', function(){
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

        it(`should send an error with 404 status code`,function(done){
            const newUser = {
                email: 'rizky@mai.com',
                password: '12345'
            }
            chai
            .request(app)
            .post('/login')
            .send(newUser)
            .end(function(err,res){
                expect(err).to.be.null;
                expect(res).to.have.status(404);
                expect(res.body.message).to.equal(
                    `wrong password/username`
                )
                done()
            })
        })

        it(`should send an error with 404 status code`,function(done){
            const newUser = {
                email: 'rizky@mail.com',
                password: '1234'
            }
            chai
            .request(app)
            .post('/login')
            .send(newUser)
            .end(function(err,res){
                expect(err).to.be.null;
                expect(res).to.have.status(404);
                expect(res.body.message).to.equal(
                    `wrong password/username`
                )
                done()
            })
        })

        it(`should send an error with 400 status code`,function(done){
            const newUser = {
                email: '',
                password: '12345'
            }
            chai
            .request(app)
            .post('/login')
            .send(newUser)
            .end(function(err,res){
                expect(err).to.be.null;
                expect(res).to.have.status(400);
                expect(res.body.message).to.equal(
                    `email is required`
                )
                done()
            })
        })

        it(`should send an error with 400 status code`,function(done){
            const newUser = {
                email: 'rizky@mail.com',
                password: ''
            }
            chai
            .request(app)
            .post('/login')
            .send(newUser)
            .end(function(err,res){
                expect(err).to.be.null;
                expect(res).to.have.status(400);
                expect(res.body.message).to.equal(
                    `password is required`
                )
                done()
            })
        })

        it(`should send an error with 400 status code`,function(done){
            const newUser = {
                email: '',
                password: ''
            }
            chai
            .request(app)
            .post('/login')
            .send(newUser)
            .end(function(err,res){
                expect(err).to.be.null;
                expect(res).to.have.status(400);
                expect(res.body.message).to.equal(
                    `form cannot be empty`
                )
                done()
            })
        })
    })

    describe(' PATCH users/:userId ',function(){
        it('should send an object with 200 status code',function(done){
            let data = {
                firstName : 'moody',
                lastName : 'jamil',
                email : 'andi@mail.com'
            }
            chai
            .request(app)
            .patch(`/users/${user._id}`)
            .send(data)
            .end(function(err,res){
                // console.log(res);
                expect(err).to.be.null
                expect(res).to.have.status(200)
                expect(res).to.be.an('object')
                expect(res.body).to.have.property('firstName')
                expect(res.body).to.have.property('lastName')
                expect(res.body).to.have.property('email')
                expect(res.body.firstName).to.equal(data.firstName);
                expect(res.body.lastName).to.equal(data.lastName);
                expect(res.body.email).to.equal(data.email);
                done()
            })
        })

        it('should send an object with 400 status code',function(done){
            let data = {
                firstName : '',
                lastName : 'jani',
                email : 'andi@mail.com'
            }
            chai
            .request(app)
            .patch(`/users/${user._id}`)
            .send(data)
            .end(function(err,res){
                // console.log(res);
                expect(err).to.be.null
                expect(res).to.have.status(400)
                expect(res).to.be.an('object')
                expect(res.body.message).to.equal(
                    `form can't be empty`
                )
                done()
            })
        })

        it('should send an object with 400 status code',function(done){
            let data = {
                firstName : 'moody',
                lastName : '',
                email : 'andi@mail.com'
            }
            chai
            .request(app)
            .patch(`/users/${user._id}`)
            .send(data)
            .end(function(err,res){
                // console.log(res);
                expect(err).to.be.null
                expect(res).to.have.status(400)
                expect(res).to.be.an('object')
                expect(res.body.message).to.equal(
                    `form can't be empty`
                )
                done()
            })
        })

        it('should send an object with 400 status code',function(done){
            let data = {
                firstName : 'moody',
                lastName : 'jani',
                email : ''
            }
            chai
            .request(app)
            .patch(`/users/${user._id}`)
            .send(data)
            .end(function(err,res){
                // console.log(res);
                expect(err).to.be.null
                expect(res).to.have.status(400)
                expect(res).to.be.an('object')
                expect(res.body.message).to.equal(
                    `form can't be empty`
                )
                done()
            })
        })

        it('should send an object with 400 status code',function(done){
            let data = {
                firstName : 'moody',
                lastName : 'jamil',
                email : 'andi@mailcom'
            }
            chai
            .request(app)
            .patch(`/users/${user._id}`)
            .send(data)
            .end(function(err,res){
                // console.log(res);
                expect(err).to.be.null
                expect(res).to.have.status(400)
                expect(res).to.be.an('object')
                expect(res.body.message).to.equal(
                    `Validation failed: email: ${data.email} is not a valid email`
                )
                done()
            })
        })

        it('should send an object with 400 status code',function(done){
            let data = {
                firstName : 'moody',
                lastName : 'jamil',
                email : 'andimail.com'
            }
            chai
            .request(app)
            .patch(`/users/${user._id}`)
            .send(data)
            .end(function(err,res){
                // console.log(res);
                expect(err).to.be.null
                expect(res).to.have.status(400)
                expect(res).to.be.an('object')
                expect(res.body.message).to.equal(
                    `Validation failed: email: ${data.email} is not a valid email`
                )
                done()
            })
        })
    })

    describe('DELETE /users/:userId', function(){
        it('should return an object with 200 status code', function(done){
            chai
            .request(app)
            .delete(`/users/${user._id}`)
            .end(function(err,res){
                expect(err).to.be.null
                expect(res).to.have.status(200)
                expect(res).to.be.an('object')
                expect(res.body).to.have.property('firstName')
                expect(res.body).to.have.property('lastName')
                expect(res.body).to.have.property('email')
                expect(res.body).to.have.property('password')
                done()
            })
        })
    })

})