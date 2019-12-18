var db = require("../models");
var passport = require("../config/passport/passport");

module.exports = function(app, passport) {
  /* Using the passport.authenticate middleware with our local strategy.
     If the user has valid login credentials, send them to the dashboard page.
     Otherwise the user will be sent an error */
  app.post("/signin", passport.authenticate("local"), function(req, res) {
    console.log(req.user.id);
    res.redirect("/dashboard/" + req.user.id);
  });

  /* Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
     how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
     otherwise send back an error */
  app.post("/signup", function(req, res) {
    db.User.create({
      email: req.body.email,
      pwd: req.body.password,
      firstName: req.body.firstname,
      lastName: req.body.lastname,
      userName: req.body.username
    })
      .then(function(result) {
        res.redirect("/login/");
        console.log(result.id);
      })
      .catch(function(err) {
        console.log(err);
        res.json(err);
      });
  });

  // Route for logging user out
  app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/login");
  });
};
