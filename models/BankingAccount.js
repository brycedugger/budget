module.exports = function(sequelize, DataTypes) {
  const BankingAccount = sequelize.define("BankingAccount", {
    accountNumber: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    fundsAvailable: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  });

  BankingAccount.associate = models => {
    BankingAccount.belongsTo(models.User, {
      foreignKey: {
        defaultValue: null
      }
    });
  };

  return BankingAccount;
};
