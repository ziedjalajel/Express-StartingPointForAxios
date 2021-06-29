const express = require("express");
const multer = require("multer");
const router = express.Router();

const {
  shopFetch,
  shopCreate,
  shopList,
  productCreate,
  shopDetail,
  //   shopUpdate,
  //   shopDelete,
} = require("../controllers/shopController");

const storage = multer.diskStorage({
  destination: "./media",
  filename: (req, file, cb) => {
    cb(null, `${+new Date()}${file.originalname}`);
  },
});

const upload = multer({
  storage,
});

router.param("shopId", async (req, res, next, shopId) => {
  const shop = await shopFetch(shopId, next);
  if (shop) {
    req.shop = shop;
    next();
  } else {
    const err = new Error("Shop Not Found");
    err.status = 404;
    next(err);
  }
});
//image is the name of the field in the model
router.post("/", upload.single("image"), shopCreate);
router.post("/:shopId/products", upload.single("image"), productCreate);
router.get("/", shopList);

router.get("/:shopId", shopDetail);

// router.put("/:shopId", upload.single("image"), shopUpdate);

// router.delete("/:shopId", shopDelete);

module.exports = router;
