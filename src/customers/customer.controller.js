const BankAccount = require("../models/customer.model");
const saveAccount = require("../services/saveAccount");
const fetchAccountsData = require("../services/fetchAccountsData");
const isValidDate = require("../services/isValidDate");
const removeDOB = require("../services/removeDOB");
const { createAccount } = require("../models/customer.model");

const validAccountTypes = ["Savings", "Checking", "Current"];

function createAccountController(req, res) {
  const { holderName, dob, accountType, initialBalance } = req.body;

  if (!holderName || !dob || !accountType || initialBalance === undefined) {
    return res
      .status(400)
      .json({ status: "failed", message: "Missing/Invalid input data" });
  }

  const isValid = isValidDate(dob);
  if (!isValid) {
    return res
      .status(400)
      .json({ status: "failed", message: "Invalid date of birth" });
  }

  if (!validAccountTypes.includes(accountType)) {
    return res.status(400).json({
      status: "failed",
      message:
        "Invalid account type. Valid account types are Savings, Checking, Current",
    });
  }

  if (initialBalance < 0) {
    return res.status(400).json({
      status: "failed",
      message: "Initial balance cannot be less than 0",
    });
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

  res
    .status(201)
    .json({ status: "Account created successfully", data: responseAccount });
}

function accountValidationController(req, res) {
  const { accountNumber } = req.params;

  if (!accountNumber) {
    return res
      .status(400)
      .json({ status: "failed", message: "Missing/Invalid account number" });
  }

  const accountsData = fetchAccountsData();
  const account = accountsData.find(
    (account) => account.accountNumber === Number(accountNumber)
  );

  if (!account) {
    return res.status(404).json({
      status: "failed",
      message: "Please reconfirm provided account number",
    });
  }
  const { dob: _, ...responseAccount } = account;

  res.status(200).json({ status: "Successful", data: responseAccount });
}

function getAllAccounts(req, res) {
  const accountsData = fetchAccountsData();

  // Removing dob from the object response to the client
  removeDOB(accountsData);
  res.status(200).json({ status: "Successful", data: accountsData });
}

module.exports = {
  createAccountController,
  accountValidationController,
  getAllAccounts,
};
