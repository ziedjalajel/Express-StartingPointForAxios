const { DataTypes, Model } = require("sequelize");
const db = require("../_db");

class Cookie extends Model {}

Cookie.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.INTEGER,
      defaultValue: 5
    },
    image: {
      type: DataTypes.STRING,
      defaultValue:
        "https://www.clipartmax.com/png/middle/120-1208683_cute-cookie-by-shrikan-animated-cute-cookies.png"
    }
  },
  {
    sequelize: db
  }
);

module.exports = Cookie;
