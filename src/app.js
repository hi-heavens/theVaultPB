const express = require("express");
const compression = require("compression");
const helmet = require("helmet");

const app = express();

app.use(express.json());

app.use(compression());
app.use(helmet());

app.all("*", (req, res, next) => {
  next(new AppError(`The route ${req.originalUrl} does not exist! 💨`, 404));
});

module.exports = app;
