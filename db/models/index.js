// Require our models. Running each module registers the model into sequelize
// so any other part of the application could call sequelize.model('Cookie')
// to get access to the Cookie model.
const Cookie = require("./Cookie");

// You can define your model relationships here in the future

// exported just in case, but can also be fetched via db.model('Cookie') etc.
module.exports = {
  Cookie
};
