
const express = require('express');
const passport = require('../passport-config')
; // Import passport configuration

const router = express.Router();


var userProfile;

const auth_controller = require('../controllers/oauth_controller')

// router.get('/', auth_controller.AuthPage);

// router.get('/success', (req, res) => res.send(req.userProfile) );
router.get('/error',auth_controller.errorPage );

router.get('/auth/google', auth_controller.passportAuthentication );

router.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/error' }),
  (req, res) => {
    // console.log(res)
    let data = res

    res.redirect('/success');
  }
);

module.exports = router;