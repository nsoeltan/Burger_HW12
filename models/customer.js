module.exports = (sequelize, DataTypes) => {
  var Customer = sequelize.define(
    "Customer",
    {
      customer_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1, 100]
        }
      }
    },
    {
      timestamps: true,
      createdAt: "date_created",
      updatedAt: false,
      deletedAt: false
    }
  );

  Customer.associate = models => {
    Customer.hasMany(models.Burger);
  };

  return Customer;
};
