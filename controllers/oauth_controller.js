const passport = require('../passport-config')



const controllers = {
    authPage: (req, res) => {
        res.render('pages/auth');
      },
    errorPage: (req, res) => res.send('Error logging in'), 
    passportAuthentication: passport.authenticate('google', { scope: ['profile', 'email'] }),


    
}


module.exports = controllers