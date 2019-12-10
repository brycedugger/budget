module.exports = function(sequelize, DataTypes) {
  const User = sequelize.define("User", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { len: [1, 20] }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { len: [1, 20] }
    }
  });

  User.associate = models => {
    User.belongsTo(models.Profile, {
      foreignKey: {
        defaultValue: false
      }
    });
  };

  User.associate = models => {
    User.hasMany(models.BankingAccount, {
      onDelete: "cascade"
    });
  };

  return User;
};
