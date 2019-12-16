var authController = require("../controllers/authcontroller.js");

module.exports = function(app) {
  // GET route for Signup page
  app.get("/signup", authController.signup);
};
