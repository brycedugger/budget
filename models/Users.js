module.exports = function(sequelize, DataTypes) {
  const User = sequelize.define("user", {
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
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { len: [1, 20] }
    },
    pwd: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { min: 6 }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    income: {
      type: DataTypes.DECIMAL(10,2),
      defaultValue: 0
    }
    // last_login: {
    //   type: DataTypes.DATE
    // },
    // status: {
    //   type: DataTypes.ENUM("active", "inactive"),
    //   defaultValue: "active"
    // }
  });

  User.associate = models => {
    User.hasMany(models.Category, {
      onDelete: "cascade"
    });
  };

  return User;
};
