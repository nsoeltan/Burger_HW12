module.exports = (sequelize, DataTypes) => {
  var Burger = sequelize.define(
    "Burger",
    {
      burger_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1, 100]
        }
      },
      devoured: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      }
    },
    {
      timestamps: true,
      createdAt: "date_created",
      updatedAt: "date_eaten",
      deletedAt: false
    }
  );

  Burger.associate = models => {
    Burger.belongsTo(models.Customer, {
      foreignKey: {
        allowNull: true
      }
    });
  };

  return Burger;
};
