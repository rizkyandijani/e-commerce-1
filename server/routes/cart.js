const router = require('express').Router()
const CartController = require('../controllers/cart')
const { authenticate } = require('../middlewares/auth')

router.use(authenticate)

router.get('/', CartController.getAll)
router.get('/:cartId',CartController.getOne)
router.get('/getUserCart/:cartId', CartController.getUserCart)
router.post('/',CartController.create)
router.patch('/:cartId/checkout', CartController.updateStatus)
router.patch('/:cartId/:cartItemId/add', CartController.addToCartItemList)
router.patch('/:cartId/:cartItemId/remove', CartController.removeFromCartItemList)
router.delete('/:cartId', CartController.delete)

module.exports = router