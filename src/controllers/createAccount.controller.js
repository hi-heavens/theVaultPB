const BankAccount = require("../models/createAccount.model");
const { saveAccount } = require("../services/saveAccount");

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

  res.json({ message: "Account created", data: createdAccount });
}

module.exports = {
  createAccount,
};
