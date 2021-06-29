// Database
const { Shop, Product } = require("../db/models");

exports.shopFetch = async (shopId, next) => {
  try {
    const shop = await Shop.findByPk(shopId);
    return shop;
  } catch (error) {
    next(error);
  }
};

exports.shopCreate = async (req, res, next) => {
  try {
    if (req.path) {
      req.body.image = `http://${req.get("host")}/${req.file.path}`;
    }
    const newShop = await Shop.create(req.body);
    res.status(201).json(newShop);
  } catch (error) {
    next(error);
  }
};

exports.shopList = async (req, res, next) => {
  try {
    const shops = await Shop.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
      include: [
        {
          model: Product,
          as: "products",
          attributes: ["id"],
        },
      ],
    });
    res.json(shops);
  } catch (error) {
    next(error);
  }
};

exports.shopDetail = async (req, res) => res.json(req.shop);

// exports.shopUpdate = async (req, res, next) => {
//   try {
//     if (req.path) {
//       req.body.image = `http://${req.get("host")}/${req.file.path}`;
//     }
//     await req.shop.update(req.body);
//     res.status(201).json(req.shop);
//   } catch (err) {
//     next(error);
//   }
// };

// exports.shopDelete = async (req, res, next) => {
//   try {
//     await req.shop.destroy();
//     res.status(204).end();
//   } catch (err) {
//     next(error);
//   }
// };
exports.productCreate = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `http://${req.get("host")}/${req.file.path}`;
    }
    req.body.shopId = req.shop.id;
    const newProduct = await Product.create(req.body);
    res.status(201).json(newProduct);
  } catch (error) {
    next(error);
  }
};
