var db = require("../models");

module.exports = function(app) {
  // Get all examples
  app.get("/api/examples", function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      res.json(dbExamples);
    });
  });

  // Create a new example
  app.post("/api/examples", function(req, res) {
    db.Example.create(req.body).then(function(dbExample) {
      res.json(dbExample);
    });
  });

  // Delete an example by id
  app.delete("/api/examples/:id", function(req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function(dbExample) {
      res.json(dbExample);
    });
  });

  app.post("/api/users", (req, res) => {
    const { firstName, lastName } = req.body;
    console.log(firstName);
    console.log(lastName);
    db.User.create({
      firstName,
      lastName
    })
      .then(newUser => {
        res.json(newUser);
      })
      .catch(err => {
        console.log(err);
        res.status(400).json({ error: err });
      });
  });

  app.post("/api/accounts", (req, res) => {
    const { accountNumber, fundsAvailable, UserId } = req.body;
    console.log(accountNumber);
    console.log(fundsAvailable);
    console.log(UserId);
    db.BankingAccount.create({
      accountNumber,
      fundsAvailable,
      UserId
    })
      .then(newAcc => {
        res.json(newAcc);
      })
      .catch(err => {
        console.log(err);
        res.status(400).json({ error: err });
      });
  });

  app.post("/api/profile", (req, res) => {
    const { username, password } = req.body;
    console.log(username);
    console.log(password);
    db.Profile.create({
      username,
      password
    })
      .then(newAcc => {
        res.json(newAcc);
      })
      .catch(err => {
        console.log(err);
        res.status(400).json({ error: err });
      });
  });
};
