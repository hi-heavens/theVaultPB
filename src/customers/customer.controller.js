const BankAccount = require("../models/customer.model");
const saveAccount = require("../services/saveAccount");
const fetchAccountsData = require("../services/fetchAccountsData");
const isValidDate = require("../services/isValidDate");
const removeDOB = require("../services/removeDOB");

const validAccountTypes = ["Savings", "Checking", "Current"];

function createAccount(req, res) {
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

  const createdAccount = new BankAccount(
    holderName,
    dob,
    accountType,
    initialBalance
  );

  saveAccount(createdAccount);

  // Removing dob from the object response to the client
  delete createdAccount.dob;

  res
    .status(201)
    .json({ status: "Account created successfully", data: createdAccount });
}

function accountValidation(req, res) {
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

  res.status(200).json({ status: "Successful", data: account });
}

function getAllAccounts(req, res) {
  const accountsData = fetchAccountsData();

  // Removing dob from the object response to the client
  removeDOB(accountsData);
  res.status(200).json({ status: "Successful", data: accountsData });
}

module.exports = {
  createAccount,
  accountValidation,
  getAllAccounts,
};
