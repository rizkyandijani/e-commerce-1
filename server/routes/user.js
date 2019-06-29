const router = require('express').Router()
const UserController = require('../controllers/user')

router.get('/',UserController.getAll)
router.get('/:userId',UserController.getOne)
router.patch('/:userId',UserController.update)
router.delete('/:userId',UserController.delete)

module.exports = router