var db = require("../models");
var path = require("path");

module.exports = function(app) {
  // Load index page
  app.get("/test", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/HTML/test.html"));
  });
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/HTML/index.html"));
  });
  app.get("/budget", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/HTML/budget.html"));
  });
  app.get("/expenses", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/HTML/expenses.html"));
  });
  app.get("/profile", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/HTML/profile.html"));
  });
  app.get("/login", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/HTML/login.html"));
  });
  // app.get("/signup", function(req, res) {
  //   res.sendFile(path.join(__dirname, "../public/HTML/signup.html"));
  // });
  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.send("404");
  });
};
