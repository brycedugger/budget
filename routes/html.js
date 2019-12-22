var path = require("path");

// Requiring our custom middleware for checking if a user is logged in
// var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {
  app.get("/", function(req, res) {
    // res.redirect("/signup");
    // res.sendFile(path.join(__dirname, "../public/HTML/signup.html"));
    res.sendFile(path.join(__dirname, "../public/HTML/a.html"));
  });

  app.get(
    "/dashboard/",
    /* isAuthenticated, */ function(req, res) {
      res.sendFile(path.join(__dirname, "../public/HTML/dashboard.html"));
    }
  );

  app.get(
    "/budget/",
    /* isAuthenticated, */ function(req, res) {
      res.sendFile(path.join(__dirname, "../public/HTML/budget.html"));
    }
  );

  app.get(
    "/expenses/",
    /* isAuthenticated, */ function(req, res) {
      res.sendFile(path.join(__dirname, "../public/HTML/expenses.html"));
    }
  );

  app.get(
    "/profile/",
    /* isAuthenticated, */ function(req, res) {
      res.sendFile(path.join(__dirname, "../public/HTML/profile.html"));
    }
  );

  app.get("/login", function(req, res) {
    // Checking if user is authenticated. If so, by pass the login page
    // if (req.user) {
    //   res.redirect("/dashboard" + req.user.id);
    // }
    res.sendFile(path.join(__dirname, "../public/HTML/login.html"));
  });

  app.get("/signup", function(req, res) {
    // Checking if user is authenticated. If so, by pass the signup page
    // if (req.user) {
    //   res.redirect("/dashboard" + req.user.id);
    // }
    res.sendFile(path.join(__dirname, "../public/HTML/a.html"));
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/HTML/404.html"));
  });
};
