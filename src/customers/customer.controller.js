const { validationResult } = require("express-validator");
const saveAccount = require("../services/saveAccount");
const fetchAccountsData = require("../services/fetchAccountsData");
const isValidDate = require("../services/isValidDate");
const removeDOB = require("../services/removeDOB");
const { createAccount } = require("../models/customer.model");

function createAccountController(req, res) {
  try {
    const errors = validationResult(req);
    const { holderName, dob, accountType, initialBalance } = req.body;

    if (!errors.isEmpty()) {
      const errorArr = errors.array()[0];
      throw new Error(
        `${errorArr.msg}: '${errorArr.value}' in ${errorArr.path}`
      );
    }

    if (initialBalance < 0) {
      throw new Error("Initial balance cannot be less than 0");
    }

    const newAccount = createAccount(
      holderName,
      dob,
      accountType,
      initialBalance
    );

    saveAccount(newAccount);

    // Removing dob from the object response to the client
    const { dob: _, ...responseAccount } = newAccount;

    res.status(201).json({ status: true, data: responseAccount });
  } catch (error) {
    return res.status(400).json({ status: false, message: error.message });
  }
}

function accountValidationController(req, res) {
  const { accountNumber } = req.params;

  try {
    if (!accountNumber) {
      throw new Error("Missing/Invalid account number");
    }

    const accountsData = fetchAccountsData();
    const account = accountsData.find(
      (account) => account.accountNumber === accountNumber
    );

    if (!account) {
      throw new Error("Please reconfirm provided account number");
    }
    // Removing dob from the object response to the client
    const { dob: _, ...responseAccount } = account;

    res.status(200).json({ status: true, data: responseAccount });
  } catch (error) {
    return res.status(400).json({ status: false, message: error.message });
  }
}

function getAllAccountsController(req, res) {
  try {
    const accountsData = fetchAccountsData();
    if (!accountsData.length) {
      throw new Error("No account found");
    }
    // Removing dob from the object response
    removeDOB(accountsData);
    res.status(200).json({ status: true, data: accountsData });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
}

module.exports = {
  createAccountController,
  accountValidationController,
  getAllAccountsController,
};
