const express = require('express')
const userController = require('../controllers/user_controller')

const router = express.Router()

router.post('/register', userController.register)
router.post('/login', userController.login)
router.get('/getuser', userController.getUser)
router.get('/getallusers', userController.getAllUsers)
router.post('/share',userController.shareWithUser)




module.exports = router