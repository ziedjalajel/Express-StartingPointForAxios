const express = require("express");
const bodyParser = require("body-parser");

// Database
const db = require("./db");

// Routes
const cookieRoutes = require("./routes/cookies");

const app = express();

app.use(bodyParser.json());

app.use("/cookies", cookieRoutes);

app.use((req, res, next) => {
  const err = new Error("Path Not Found");
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    message: err.message || "Internal Server Error"
  });
});

const run = async () => {
  await db.sync();
  await app.listen(8000, () => {
    console.log("The application is running on localhost:8000");
  });
};

run();
