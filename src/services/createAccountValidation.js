const { body } = require("express-validator");

const validAccountTypes = ["Savings", "Checking", "Current"];

const createAccountValidation = [
  body("holderName").notEmpty().trim().isString(),
  body("dob").notEmpty().isDate(),
  body("accountType").notEmpty().isIn(validAccountTypes),
  body("initialBalance").notEmpty().isFloat({ min: 0 }),
];

module.exports = createAccountValidation;
