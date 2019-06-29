const router = require('express').Router()
const CartItemController = require('../controllers/cartItem')

router.get('/', CartItemController.getAll)
router.get('/:cartItemId',CartItemController.getOne)
router.get('/:cartId/getByCard', CartItemController.getCartProducts)
router.post('/:cartId/:productId',CartItemController.create)
router.patch('/:cartItemId/updateStatus', CartItemController.updateStatus)
router.patch('/:cartItemId/increaseQuantity', CartItemController.increaseQuantity)
router.patch('/:cartItemId/decreaseQuantity', CartItemController.decreaseQuantity)
router.delete('/:cartItemId', CartItemController.delete)

module.exports = router