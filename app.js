const express = require("express");
// const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

// Database
const db = require("./db/models");

// Routes
const productRoutes = require("./routes/products");
const shopRoutes = require("./routes/shops");

const app = express();
// Middleware
app.use(cors());
app.use(express.json());
// Routes
app.use("/shops", shopRoutes);
app.use("/products", productRoutes);
//it suppose to be like this
// app.use("/media", express.static(path.join(__dirname, "media")));
//it works like this too and it looks shorter and prettier:
app.use("/media", express.static("media"));

app.use((req, res, next) => {
  const err = new Error("Path Not Found");
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    message: err.message || "Internal Server Error",
  });
});

const run = async () => {
  await app.listen(8000, () => {
    console.log("The application is running on localhost:8000");
  });
};

run();
