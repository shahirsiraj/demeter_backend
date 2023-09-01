require('dotenv').config();
const axios = require('axios');
const modals = require('./models/index');
const express = require('express');
const passport = require('./passport-config'); // Import passport configuration
const session = require('express-session');
const userRouter = require('./routers/user_routers');
const authRouter = require('./routers/auth_router')
const foodRouter = require('./routers/food_router')
const listRouter = require('./routers/list_router')
const google_maps=require('./controllers/google_places_controller')
const cors = require('cors')

const app = express();
const port =  7800;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())

app.set('view engine', 'ejs');

app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: 'SECRET'
}));

app.get('/', function (req, res) {
  res.render('pages/auth');
});

app.post('/search', google_maps.searchForPlaces)


app.use(passport.initialize());
app.use(passport.session());


let userProfile

app.get('/', function(req, res) {
  res.render('pages/auth');
});

// app.use('/', authRouter); // Use authController routes
app.use('/api/v1/users', userRouter); 

app.use('/api/v1/food_list', listRouter)

app.use('/api/v1/food_items', foodRouter)

    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
  // })
  // .catch((error) => {
  //   console.error('Database sync error:', error);
  // });
