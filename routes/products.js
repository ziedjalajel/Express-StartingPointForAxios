const express = require("express");
const multer = require("multer");
const router = express.Router();

const {
  productFetch,
  productList,
  productDetail,
  productUpdate,
  productDelete,
} = require("../controllers/productController");

const storage = multer.diskStorage({
  destination: "./media",
  filename: (req, file, cb) => {
    cb(null, `${+new Date()}${file.originalname}`);
  },
});

const upload = multer({
  storage,
});

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
//image is the name of the field in the model

router.get("/", productList);

router.get("/:productId", productDetail);

router.put("/:productId", upload.single("image"), productUpdate);

router.delete("/:productId", productDelete);

module.exports = router;
