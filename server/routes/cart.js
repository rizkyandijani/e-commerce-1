const router = require('express').Router()
const CartController = require('../controllers/cart')
const { authenticate } = require('../middlewares/auth')
const { authorizeCart } = require('../middlewares/auth')
const { authorizeAdmin } = require('../middlewares/auth')


router.use(authenticate)

router.get('/', CartController.getAll)
router.get('/:cartId',CartController.getOne)
router.get('/getUserCart/:cartId/getbyCart', CartController.getCart)
router.get('/getUserCart/:userId/getAll', CartController.getUserCart)
router.post('/',CartController.create)
router.patch('/:cartId/checkout', authorizeCart,CartController.updateStatusCheckout)
router.patch('/:cartId/closeTransaction', authorizeCart,CartController.updateStatusClose)
router.delete('/:cartId', authorizeAdmin,CartController.delete)

module.exports = router