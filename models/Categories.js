module.exports = function (sequelize, DataTypes) {
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
        Category.belongsTo(models.Transaction, {
            foreignKey: {
                defaultValue: null
            }
        });
    };

    Category.associate = models => {
        Category.belongsTo(models.Budget, {
            foreignKey: {
                defaultValue: null
            }
        });
    };

    return Category;
};
