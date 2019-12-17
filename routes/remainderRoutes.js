var db = require("../models");

module.exports = function(app) {
    app.get("/api/remainder/:id", (req, res) => {
        db.sequelize.query("SELECT u.income, sum(amount) AS remainder FROM users AS u LEFT JOIN categories AS cat ON cat.UserID = u.id LEFT JOIN expenses AS exp ON exp.CategoryId = cat.id",
        { type: db.sequelize.QueryTypes.SELECT,
            where: { id: req.params.id }})
          .then(data => {
            res.status(200).json(data);
          })
          .catch(err => {
            console.log(err);
            res.status(400).json({ error: err });
          });
    });
};