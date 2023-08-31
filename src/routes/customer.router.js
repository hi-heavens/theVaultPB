const express = require("express");
const {
  createAccount,
  accountValidation,
} = require("../controllers/customer.controller");

const router = express.Router();

router.post("/create-account", createAccount);
router.get("/account/:accountNumber", accountValidation);

module.exports = router;
