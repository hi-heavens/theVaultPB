const express = require("express");
const createController = require("../controllers/create.controller");

const router = express.Router();

router.post("/create-account", createController.createAccount);

module.exports = router;
