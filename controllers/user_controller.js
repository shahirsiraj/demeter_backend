const models = require('../models/index')
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userValidators = require("../validators/user_validators");

const controllers = {

    register: async (req, res) => {

    const data = req.body;
    console.log("BE Registration Data:", data);

    const validationResult = userValidators.registerSchema.validate(data);

    if (validationResult.error) {
      res.statusCode = 400;
      return res.json({
        msg: `registration failed ${validationResult.error.details[0].message}`,
      });
    }

    try {
      const user = await models.user_accounts.findOne({ 
        where: {
          email: req.body.email
        }
       });
      if (user) {
        return res.status(400).json({
          msg: "email already exists, please try another email",
        });
      }
    } catch (err) {
      return res.status(500).json({
        msg: `duplicate check failed ${err}`,
      });
    }


    const hash = await bcrypt.hash(data.password, 10);

       
        try {
            const result = await models.sequelize.transaction(async (t) => {
              const user = await models.user_accounts.create(
                {
                    name: req.body.name,
                    email: req.body.email,
                    password:hash
                },
                {
                    transaction: t
                }
              );
              
              
          
              return user;
            });
          
           
          
          } catch (err) {
          
            
          
            console.log(err)
            return res.json({
                err: err.message
            })
          }



        return res.json()
    }, 

    login: async (req, res) => {
      const data = req.body;
      console.log("login data:", data);
  
      const validationResult = userValidators.loginSchema.validate(data);
  
      if (validationResult.error) {
        return res.status(400).json({
          msg: validationResult.error.details[0].message,
        });
      }
  
      try {
        const user = await models.user_accounts.findOne({ 
          where: { 
            email: data.email
          }
        })
        console.log("User:", user);

        const user_lists = await models.list_data.findAll({ 
          where: { 
            creator_id: user.id
          }
        })

        // console.log(user.dataValues)

        // const user_lists = await models.list_data.findAll({
        //   where:{
        //     creator_id:user.dataValues.id
        //   }
        // })
        // console.log(user_lists)
  
        if (!user) {
          return res.status(401).json({
            msg: "Login failed, please check login details",
          });
        }
  
        console.log("Data Password:", data.password);
        console.log("User Password:", user.password);
        const validLogin = await bcrypt.compare(data.password, user.password);
  
        if (!validLogin) {
          return res.status(401).json({
            msg: "Login failed, please check login details",
          });
        }
  
        const token = jwt.sign(
          {
            email: user.email,
          },
          process.env.JWT_KEY,
          {
            expiresIn: "10 days",
            audience: "front-end",
            issuer: "server",
            subject: user.id.toString(),
          }
        );


        console.log(user, token)
  
        res.json({
          msg: "Login successful",
          user: user,
          token: token,
          lists: user_lists
          // lists: user_lists || []
        });
      } catch (error) {
        console.log("Error:", error);
        res.status(500).json({
          msg: "Internal server error",
        });
      }
    },

    getUser: async (req, res) => {
      const data = req.params 
      console.log('user id:', data)

      try {
        const user = await models.user_accounts.findOne({ 
          where: { 
            id: data

          }
        })
        console.log("User:", user);

        if(!user) {
          return res.status(401).json({
            msg:'user not found!'
          })
        }

        res.json({
          msg: "user found",
          user: user
        });


    } catch (error) {
      console.log("Error:", error);
      res.status(500).json({
        msg: "Internal server error",
      });
    }
  },

  getAllUsers: async (req, res) => {
    

    try {
      const users = await models.user_accounts.findAll()
      console.log("User:", users);

      

      res.json(users)


  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({
      msg: "Internal server error",
    });
  }
},

shareWithUser: async (req, res) => {
    

  try {
    const result = await models.sequelize.transaction(async (t) => {
      const share = await models.user_list_permissions.create(
        {  
        list_id: req.body.list_id,
        user_id:req.body.user_id 
      },
      { transaction: t }
      );
    

    res.json(
      {
        msg:"shared successfully!"
      }
    )

  })
} catch (error) {
  console.log("Error:", error);
  res.status(500).json({
    msg: "Internal server error",
  });
}
},
  


}
    

module.exports = controllers
