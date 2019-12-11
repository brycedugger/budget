module.exports = function (sequelize, DataTypes) {
    const Budget = sequelize.define("Budget", {
        amount: {
            //decimcals cant be passed into integer. 
            //can decimal be an integer?
            //DataTypes.DECIMAL?
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: { min: 1 }
        }
    });

    Budget.associate = models => {
        Budget.belongsTo(models.User, {
            foreignKey: {
                defaultValue: false
            }
        });
    };

    Budget.associate = models => {
        Budget.hasOne(models.Category, {
            foreignKey: {
                defaultValue: false
            }
        });
    };

    return Budget;
};
