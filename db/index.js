const db = require("./_db");

// Require our models. Running each module registers the model into sequelize
// so any other part of the application could call sequelize.model('Cookie')
// to get access to the Cookie model.
require("./models");

module.exports = db;
