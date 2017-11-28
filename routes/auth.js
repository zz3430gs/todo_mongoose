var express = require('express');
var router = express.Router();
var passport = require('passport');

/*GET the authentication page */
router.get('/', function (req, res, next) {
    res.render('authentication');
});

/*POST to login*/
router.post('/login', passport.authenticate('local-login', {
    successRedirect: '/',
    failureRedirect: '/auth',
    failureFlash: true
}));

/*POST to sign up */
router.post('/signup', passport.authenticate('local-signup',{
    successRedirect: '/',
    failureRedirect: '/auth',
    failureFlash: true
}));

/*GET logout*/
router.get('/logout', function (req, res, next) {
    req.logout();  // passport provides this
    res.redirect('/');
});

module.exports = router;

//https://frozen-mesa-86216.herokuapp.com/ - astropix

//https://github.com/zz3430gs/astropix

//https://github.com/zz3430gs/favorite_color_app_auth