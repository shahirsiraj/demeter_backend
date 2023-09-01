const express = require('express')
const listController = require('../controllers/food_list_controller')

const router = express.Router()

router.post('/createlist', listController.createFoodList)
router.post('/getlist', listController.getFoodListWithItems)
router.post('/getalluserlists', listController.getAllUserLists)
router.delete('/deleteitem', listController.deleteFoodItemFromList)




module.exports = router