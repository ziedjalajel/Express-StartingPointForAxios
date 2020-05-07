const express = require("express");
const router = express.Router();

const {
  fetchCookie,
  cookieCreate,
  cookieList,
  cookieDetail,
  cookieUpdate,
  cookieDelete
} = require("../controllers/cookieController");

router.param("cookieId", async (req, res, next, cookieId) => {
  const cookie = await fetchCookie(cookieId, next);
  if (cookie) {
    req.cookie = cookie;
    next();
  } else {
    const err = new Error("Cookie Not Found");
    err.status = 404;
    next(err);
  }
});

router.post("/", cookieCreate);

router.get("/", cookieList);

router.get("/:cookieId", cookieDetail);

router.put("/:cookieId", cookieUpdate);

router.delete("/:cookieId", cookieDelete);

module.exports = router;
