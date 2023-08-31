const BankAccount = require("../models/customer.model");
const saveAccount = require("../services/saveAccount");
const fetchAccountsData = require("../services/fetchAccountsData");

function createAccount(req, res) {
  const { holderName, dob, accountType, initialBalance } = req.body;

  if (!holderName || !dob || !accountType || initialBalance === undefined) {
    return res
      .status(400)
      .json({ status: "failed", error: "Missing/Invalid input data" });
  }
  if (initialBalance < 0) {
    return res.status(400).json({
      status: "failed",
      error: "Initial balance cannot be less than 0",
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

  res.json({ message: "Account created successfully", data: createdAccount });
}

function accountValidation(req, res) {
  const { accountNumber } = req.params;

  if (!accountNumber) {
    return res
      .status(400)
      .json({ status: "failed", error: "Missing/Invalid account number" });
  }

  const accountsData = fetchAccountsData();
  const account = accountsData.find(
    (account) => account.accountNumber === Number(accountNumber)
  );

  if (!account) {
    return res.status(404).json({
      status: "failed",
      error: "Please reconfirm provided account number",
    });
  }

  res.json({ message: "Success", data: account });
}

module.exports = {
  createAccount,
  accountValidation,
};
