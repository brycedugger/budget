module.exports = function(sequelize, DataTypes) {
  const TransactionCategory = sequelize.define("TransactionCategory", {
    role: DataTypes.STRING
  });
  const Category = sequelize.define("Category", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { len: [1, 20] }
    }
  });

  Category.associate = models => {
    Category.belongsToMany(
      models.Transaction,
      { through: TransactionCategory },
      {
        onDelete: null
      }
    );
  };

  return Category;
};
