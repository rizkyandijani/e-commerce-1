const User = require('../models/user')
const Product = require('../models/product')
// const Cart = require('../models/Cart')

module.exports = function (done) {
    if (process.env.NODE_ENV === 'test') {
        let arrOfPromise = [
            User.deleteMany({}),
            Product.deleteMany({})
        ]

        Promise.all(arrOfPromise)
            .then(() => {
                done()
            }).catch(err => {
                console.log(err);
            })
    }
}