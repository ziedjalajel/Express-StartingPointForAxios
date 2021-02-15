const express = require("express");
const bodyParser = require("body-parser");

// Database
const db = require("./db/models");

// Routes
const productRoutes = require("./routes/products");

const app = express();

app.use(bodyParser.json());

app.use("/products", productRoutes);

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
  await db.sequelize.sync();
  await app.listen(8000, () => {
    console.log("The application is running on localhost:8000");
  });
};

run();
