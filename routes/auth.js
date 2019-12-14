var authController = require('../controllers/authcontroller.js');
 
module.exports = function(app, passport) {

    // GET route for Signup page
    app.get('/signup', authController.signup);


    // GET route for Signin page
    app.get('/signin', authController.signin);

    // GET route for Dashboard
    app.get('/dashboard',isLoggedIn, authController.dashboard);

    // GET route for Logout
    app.get('/logout',authController.logout);

    // POST route for new user (signup)
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/dashboard',
 
        failureRedirect: '/signup'
        },
    
    ));

    // POST route for signin
    app.post('/signin', passport.authenticate('local-signin', {
        successRedirect: '/dashboard',
 
        failureRedirect: '/signin'
        }
 
    ));

    function isLoggedIn(req, res, next){
        if (req.isAuthenticated())

            return next();

        res.redirect('/signin');

    }
 
}