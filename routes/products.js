const express = require("express");
const router = express.Router();

const {
  productFetch,
  productCreate,
  productList,
  productDetail,
  productUpdate,
  productDelete,
} = require("../controllers/productController");

router.param("productId", async (req, res, next, productId) => {
  const product = await productFetch(productId, next);
  if (product) {
    req.product = product;
    next();
  } else {
    const err = new Error("Product Not Found");
    err.status = 404;
    next(err);
  }
});

router.post("/", productCreate);

router.get("/", productList);

router.get("/:productId", productDetail);

router.put("/:productId", productUpdate);

router.delete("/:productId", productDelete);

module.exports = router;
