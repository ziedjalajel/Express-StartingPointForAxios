const SequelizeSlugify = require("sequelize-slugify");

module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define("Product", {
    name: {
      type: DataTypes.STRING,
    },
    slug: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    },
    price: {
      type: DataTypes.INTEGER,
      defaultValue: 5,
      validate: {
        min: 1,
      },
    },
    image: {
      type: DataTypes.STRING,
    },
  });

  SequelizeSlugify.slugifyModel(Product, {
    source: ["name"],
  });
  //relations
  Product.associate = (models) => {
    models.Shop.hasMany(Product, {
      foreignKey: "shopId",
      as: "products",
      allowNull: false,
    });
    Product.belongsTo(models.Shop, {
      foreignKey: "shopId",
    });
  };
  return Product;
};
