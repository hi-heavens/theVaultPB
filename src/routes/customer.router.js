const express = require("express");
const {
  createAccount,
  accountValidation,
  getAllAccounts,
} = require("../controllers/customer.controller");

const router = express.Router();

router.post("/create-account", createAccount);
router.get("/account/:accountNumber", accountValidation);
router.get("/get-accounts", getAllAccounts);

module.exports = router;
