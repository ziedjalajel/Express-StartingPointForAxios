// Database
const { Product, Shop } = require("../db/models");

exports.productFetch = async (productId, next) => {
  try {
    const product = await Product.findByPk(productId);
    return product;
  } catch (error) {
    next(error);
  }
};

exports.productList = async (req, res, next) => {
  try {
    const products = await Product.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt", "shopId"],
      },
    });
    res.json(products);
  } catch (error) {
    next(error);
  }
};

exports.productDetail = async (req, res) => res.json(req.product);

exports.productUpdate = async (req, res, next) => {
  try {
    if (req.path) {
      req.body.image = `http://${req.get("host")}/${req.file.path}`;
    }
    await req.product.update(req.body);
    res.status(201).json(req.product);
  } catch (err) {
    next(error);
  }
};

exports.productDelete = async (req, res, next) => {
  try {
    await req.product.destroy();
    res.status(204).end();
  } catch (err) {
    next(error);
  }
};
