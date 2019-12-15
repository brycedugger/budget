var db = require("../models");
var path = require("path");

module.exports = function(app) {
  // Load index page
  app.get("/home", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/HTML/test.html"));
  });

  // // Render 404 page for any unmatched routes
  // app.get("*", function(req, res) {
  //   res.render("404");
  // });
};
