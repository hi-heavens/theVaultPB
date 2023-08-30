const express = require("express");
const compression = require("compression");
const helmet = require("helmet");
const createRouter = require("./routes/create.router");

const app = express();

app.use(express.json());

app.use(compression());
app.use(helmet());

app.use("/api/v1", createRouter);

app.all("*", (req, res) => {
  res.status(404).json({
    status: "failed",
    message: `Can't find ${req.originalUrl} on this server!`,
  });
});

module.exports = app;
