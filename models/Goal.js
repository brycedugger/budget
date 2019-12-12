module.exports = function(sequelize, DataTypes) {
  const Goal = sequelize.define("Goal", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    amount: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  });

  Goal.associate = models => {
    Goal.belongsTo(models.Category, {
      foreignKey: {
        defaultValue: null
      }
    });
  };

  return Goal;
};
