module.exports = function(sequelize, DataTypes) {
  const Budget = sequelize.define("Budget", {
    amount: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      defaultValue: 0
    }
  });

  Budget.associate = models => {
    Budget.belongsTo(models.User, {
      foreignKey: {
        defaultValue: null
      }
    });
  };

  Budget.associate = models => {
    Budget.belongsTo(models.Category, {
      foreignKey: {
        defaultValue: null
      }
    });
  };

  return Budget;
};
