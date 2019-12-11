module.exports = function (sequelize, DataTypes) {
    const Transaction = sequelize.define("Transaction", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
            //Reevaluate length after html completed.
            validate: { len: [1, 50] }
        },
        amount: {
            //decimcals cant be passed into integer. 
            //can decimal be an integer?
            //DataTypes.DECIMAL?
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: { min: 1 }
        },
        day: {
            //can slashes be passed into integers or xx/xx/xxxx?
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: { min: 6 }
        }
    });

    Transaction.associate = models => {
        Transaction.hasOne(models.Category, {
            foreignKey: {
                defaultValue: null
            }
        });
    };

    Transaction.associate = models => {
        Transaction.belongsTo(models.BankingAccount, {
            foreignKey: {
                defaultValue: null
            }
        });
    };

    return Transaction;
};
