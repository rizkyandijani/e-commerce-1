const router = require('express').Router()
const UserRoute = require('../routes/user')
const ProductRoute = require('../routes/product')
const CartRoute = require('../routes/cart')
const cartItemRoute = require('../routes/cartItem')
const UserController = require('../controllers/user')

router.get('/',(req,res,next)=>{
    res.send('hellooo')
})

router.use('/users',UserRoute)
router.use('/products',ProductRoute)
router.use('/carts', CartRoute)
router.use('/cartItems', cartItemRoute)
// router.use('carts')
router.post('/register',UserController.register)
router.post('/login',UserController.login)


module.exports = router