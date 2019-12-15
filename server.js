require("dotenv").config();
var express = require("express");
var exphbs = require("express-handlebars");

var db = require("./models");

var app = express();
var PORT = process.env.PORT || 4000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// Module for authentication
var passport = require("passport");
var session = require("express-session");

// Module for JSON formatting
var bodyParser = require("body-parser");

//For BodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// For Passport
app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

// Static directory
app.use(express.static("public"));

// Routes
require("./routes/apiRoutes")(app);
require("./routes/userRoutes")(app);
require("./routes/categoryRoutes")(app);
require("./routes/expenseRoutes")(app);
require("./routes/htmlRoutes")(app);

// // Auth Routes
// var authRoute = require("./routes/auth")(app, passport);

// // Load Passport Strategies
// require("./config/passport/passport.js").default(passport, db.user);

var syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function() {
  app.listen(PORT, function() {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});

module.exports = app;
