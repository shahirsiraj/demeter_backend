const models = require('../models/index')

const controllers = {

    createFoodList: async (req, res) => {
        try {
            console.log(req.body)
            const result = await models.sequelize.transaction(async (t) => {
                const creator = await models.user_accounts.findOne({ where: { id: req.body.creator_id } });
        
                if (!creator) {
                    throw new Error("Creator not found"); 
                }
        
                 const newList = await models.list_data.create(
                    {
                        list_name: req.body.list_name,
                        creator_id: req.body.creator_id
                    },
                    { transaction: t }
                );

                // const newListId = await models.list_data.findOne({ where: { list_name: req.body.list_name } });

                // const sharedWith = await models.user_list_permissions.create(
                //     {
                //         list_id:newList.id,
                //         shared_with:req.body.share
                //     }
                // )
                // console.log(newList.dataValues.id)
                res.json(
                    {
                        id: newList.dataValues.id,
                        list_name: newList.dataValues.list_name,
                        creator_id: newList.dataValues.creator_id
                    }
                )
            });
            
        } catch (error) {
            console.error("Error:", error); 
        }

    
        

    },
        

    addFoodItemToList: async (req,res) => {

        try {
            console.log(req.body)
            const result = await models.sequelize.transaction(async (t) => {


                const addItemToFoodPlaces = await models.food_places.create(
                    {
                    name: req.body.name,
                    address: req.body.address,
                    opening_hours: req.body.opening_hours,
                    photos: req.body.photos,
                    rating:req.body.rating,
                    }

                ) 
                console.log(addItemToFoodPlaces.id)

                const list = await models.list_data.findOne({ where: { list_name: 'test_list' } });
        
                if (!list) {
                    throw new Error("list not found"); 
                }

                // const checkOwnership = await models.list_data.findOne({ where: { creator_id: req.body.creator_id } });

                // if (!checkOwnership) {
                //     const checkPermissions = await models.user_list_permissions.findOne({ where: { shared_with: req.body.user } });
        
                //     if (!checkPermissions) {
                //         return res.status(403).json({
                //             message: "Access denied"
                //         });
                //     }
                // }
               

                

                // const checkPermissions = await models.user_list_permissions.findOne({ where: {}}

              const addItemToList = await models.food_list_data.create(
                {
                    list_id: 1,
                    food_id: addItemToFoodPlaces.id
                },
                {
                    transaction: t
                }
              );


              console.log(addItemToList)

          
            })
          
          
          
          } catch (err) {
            console.log(err)
            return res.json({
                err: err.message
            })
          }


        return res.json({
            msg:'item successfully added!'
        })
        
    },

    updateFoodItemInList: async (req, res) => {
        try {
            const { food_list_id, food_item_id, name, address, opening_hours, photos, rating } = req.body;
    
            const list = await models.list_data.findOne({ where: { id: food_list_id } });
    
            if (!list) {
                throw new Error("List not found");

            }

            let checkOwnership = await models.list_data.findOne({ where: { creator_id: req.body.user } });

            if (!checkOwnership) {
            const checkPermissions = await models.user_list_permissions.findOne({ where: { shared_with: req.body.user } });

            if (!checkPermissions) {
                return res.status(403).json({
                    message: "Access denied"
                });
            }
        }
    
            const foodPlace = await models.food_places.findOne({ where: { id: food_item_id } });
    
            if (!foodPlace) {
                throw new Error("Food item not found");
            }
    
            await foodPlace.update({
                name: name,
                address: address,
                opening_hours: opening_hours,
                photos: photos,
                rating: rating
            });
    
            return res.json({
                message: "Food item updated successfully"
            });
        } catch (err) {
            console.error(err);
            return res.status(500).json({
                error: err.message
            });
        }
    },

    deleteFoodItemFromList: async (req, res) => {
        try {
            const { food_list_id, food_item_id } = req.body;
    
            const list = await models.food_list_data.findOne({ where: { id: food_list_id } });
    
            if (!list) {
                throw new Error("List not found");
            }
            let checkOwnership = await models.list_data.findOne({ where: { creator_id: req.body.user } });

            if (!checkOwnership) {
            const checkPermissions = await models.user_list_permissions.findOne({ where: { shared_with: req.body.user } });

            if (!checkPermissions) {
                return res.status(403).json({
                    message: "Access denied"
                });
            }
        }
    
            const foodPlace = await models.food_places.findOne({ where: { id: food_item_id } });
    
            if (!foodPlace) {
                throw new Error("Food item not found");
            }
    
            await foodPlace.destroy();
    
            return res.json({
                message: "Food item deleted successfully"
            });
        } catch (err) {
            console.error(err);
            return res.status(500).json({
                error: err.message
            });
        }
    },

    getFoodListWithItems: async (req, res) => {
        try {

            // let checkOwnership = await models.list_data.findOne({ where: { creator_id: req.body.user } });

        //     if (!checkOwnership) {
        //     const checkPermissions = await models.user_list_permissions.findOne({ where: { shared_with: req.body.user } });

        //     if (!checkPermissions) {
        //         return res.status(403).json({
        //             message: "Access denied"
        //         });
        //     }
        // }
            const foodListId = req.body.list_id; 
            
            console.log(foodListId)// Assuming the route parameter is named foodListId
            
            const foodList = await models.list_data.findAll({
                where: { id: foodListId},
                include: [{
                    model: models.food_list_data,
                    include: models.food_places
                }]
            });
    
            if (!foodList) {
                throw new Error("Food list not found");
            }

            const formattedResponse = foodList.flatMap(item => item.food_list_data.map(data => data.food_place));

        return res.json(formattedResponse);;
        } catch (err) {
            console.error(err);
            return res.status(500).json({
                error: err.message
            });
        }
    },
    

    
}

module.exports = controllers
