const express = require('express')
const foodController = require('../controllers/food_list_controller')
const authMiddleware = require("../middleware/middleware");
const router = express.Router()

router.post('/createnewlist', authMiddleware, foodController.createFoodList)
router.post('/additemtolist', authMiddleware, foodController.addFoodItemToList)
router.patch('/updateitem', authMiddleware, foodController.updateFoodItemInList)
router.delete('/deleteitem', authMiddleware, foodController.deleteFoodItemFromList)
router.get('getlist', authMiddleware, foodController.getFoodListWithItems)





module.exports = router