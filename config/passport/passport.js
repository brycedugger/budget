//we import passport packages required for authentication
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
//
//We will need the models folder to check passport agains
var db = require("../../models");
//
// Telling passport we want to use a Local Strategy. In other words,
//we want login with a username/email and password
passport.use(
  new LocalStrategy(
    // Our user will sign in using username.
    {
      usernameField: "username"
    },
    function(username, password, done) {
      // When a user tries to sign in this code runs
      db.User.findOne({
        where: {
          username: username
        }
      }).then(function(dbUser) {
        // If there's no user with the given email
        if (!dbUser) {
          return done(null, false, {
            message: "Incorrect email."
          });
        }
        // If there is a user with the given email, but the password the user gives us is incorrect
        else if (!dbUser.validPassword(password)) {
          return done(null, false, {
            message: "Incorrect password."
          });
        }
        // If none of the above, return the user
        return done(null, dbUser);
      });
    }
  )
);
//
// In order to help keep authentication state across HTTP requests,
// Sequelize needs to serialize and deserialize the user
passport.serializeUser(function(user, cb) {
  cb(null, user);
});
//
passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});
//
// Exporting our configured passport
module.exports = passport;

// Old code
/////////////////////////////////////////////////////////////////////
// // Module for bcrypt
// var bCrypt = require("bcrypt-nodejs");

// module.exports = function(passport, user) {
//   var User = user;
//   var LocalStrategy = require("passport-local").Strategy;

//   // Serialize User
//   passport.serializeUser(function(user, done) {
//     done(null, user.id);
//   });

//   // Deserialize User
//   passport.deserializeUser(function(id, done) {
//     User.findByPk(id).then(function(user) {
//       if (user) {
//         done(null, user.get());
//       } else {
//         done(user.errors, null);
//       }
//     });
//   });

//   // Local Signup
//   passport.use(
//     "local-signup",
//     new LocalStrategy(
//       {
//         usernameField: "email",
//         passwordField: "password",
//         passReqToCallback: true // allows to pass back the entire request to the callback
//       },
//       function(req, email, password, done) {
//         var generateHash = function(password) {
//           return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
//         };

//         User.findOne({
//           where: {
//             email: email
//           }
//         }).then(function(user) {
//           if (user) {
//             return done(null, false, {
//               message: "That email is already taken"
//             });
//           } else {
//             var userPassword = generateHash(password);
//             var data = {
//               email: email,
//               pwd: userPassword,
//               firstName: req.body.firstname,
//               lastName: req.body.lastname,
//               userName: req.body.username
//             };
//             User.create(data).then(function(newUser, created) {
//               if (!newUser) {
//                 return done(null, false);
//               }
//               if (newUser) {
//                 return done(null, newUser);
//               }
//             });
//           }
//         });
//       }
//     )
//   );
//   // Local Signin
//   passport.use(
//     "local-signin",
//     new LocalStrategy(
//       {
//         usernameField: "username",
//         passwordField: "password",
//         passReqToCallback: true
//       },
//       function(req, username, password, done) {
//         var User = user;
//         var isValidPassword = function(userpass, password) {
//           return bCrypt.compareSync(password, userpass);
//         };
//         User.findOne({
//           where: {
//             username: username
//           }
//         })
//           .then(function(user) {
//             if (!user) {
//               return done(null, false, {
//                 message: "User does not exist"
//               });
//             }

//             if (!isValidPassword(password)) {
//               return done(null, false, {
//                 message: "Incorrect password"
//               });
//             }

//             var userInfo = user.get();
//             return done(null, userInfo);
//           })
//           .catch(function(err) {
//             console.log("Error:", err);
//             return done(null, false, {
//               message: "Something went wrong with the sign in."
//             });
//           });
//       }
//     )
//   );
// };
