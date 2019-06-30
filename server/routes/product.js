const router = require('express').Router()
const ProductController = require('../controllers/product')
const { authenticate } = require('../middlewares/auth')
const { authorizeAdmin } = require('../middlewares/auth')
const upload = require('../helpers/images')

router.get('/',ProductController.getAll)
router.get('/:productId',ProductController.getOne)

router.use(authenticate)


router.post('/', authorizeAdmin,upload.multer.single('image'),upload.sendUploadToGCS,ProductController.create)
router.patch('/:productId', authorizeAdmin, upload.multer.single('image'),upload.sendUploadToGCS,ProductController.update)
router.patch('/:productId/updateQuantity', authorizeAdmin,ProductController.updateQuantity)
router.delete('/:productId', authorizeAdmin,ProductController.delete)

module.exports = router
