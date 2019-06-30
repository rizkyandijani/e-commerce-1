const router = require('express').Router()
const CartItemController = require('../controllers/cartItem')

const { authenticate } = require('../middlewares/auth')
const { authorize } = require('../middlewares/auth')
const { authorizeAdmin } = require('../middlewares/auth')

router.use(authenticate)

router.get('/', CartItemController.getAll)
router.get('/:cartItemId',CartItemController.getOne)
router.get('/:cartId/getByCart', CartItemController.getCartProducts)
router.post('/:cartId/:productId',CartItemController.create)
router.patch('/:cartItemId/updateStatus' ,CartItemController.updateStatus)
router.patch('/:cartItemId/increaseQuantity', CartItemController.increaseQuantity)
router.patch('/:cartItemId/decreaseQuantity', CartItemController.decreaseQuantity)
router.delete('/:cartItemId', CartItemController.delete)

module.exports = router