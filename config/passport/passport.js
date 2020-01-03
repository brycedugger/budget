// Importing passport packages required for authentication
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;

// Importing models
var db = require("../../models");

// Using Local Strategy for username/password login
passport.use(
  new LocalStrategy(
    // User will sign in using username.
    {
      usernameField: "username"
    },
    function(username, password, done) {
      // When a user tries to sign in this runs
      db.User.findOne({
        where: {
          username: username
        }
      }).then(function(dbUser) {
        // If there's no user with the given email
        if (!dbUser) {
          return done(null, false, {
            message: "Incorrect Username."
          });
        }
        // If there is a user with the given email, but the password the user gives us is incorrect
        else if (!dbUser.validPassword(password)) {
          return done(null, false, {
            message: "Incorrect Password."
          });
        }
        // If none of the above, return the user
        return done(null, dbUser);
      });
    }
  )
);

// In order to help keep authentication state across HTTP requests,
// Sequelize needs to serialize and deserialize the user
passport.serializeUser(function(user, cb) {
  cb(null, user);
});
//
passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

// Exporting our configured passport
module.exports = passport;
