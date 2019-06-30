const router = require('express').Router()
const ProductController = require('../controllers/product')
const { authenticate } = require('../middlewares/auth')
const { authorize } = require('../middlewares/auth')
const upload = require('../helpers/images')

router.get('/',ProductController.getAll)
router.get('/:productId',ProductController.getOne)

router.use(authenticate)

router.post('/',upload.multer.single('image'),upload.sendUploadToGCS,ProductController.create)
router.patch('/:productId', authorize, upload.multer.single('image'),upload.sendUploadToGCS,ProductController.update)
router.patch('/:productId/updateQuantity', ProductController.updateQuantity)
router.delete('/:productId', authorize,ProductController.delete)

module.exports = router
